"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const LINE_HEIGHT = 16;
const FONT_SIZE = 10;
const COLUMN_GAP = 136;
const FRAME_INTERVAL_MS = 1000 / 30;
const LOCK_LIFE_MS = 2600;
const LOCK_EVERY_MS = 850;
const MAX_LOCKS = 7;
const SWEEP_SPEED = 90;
const SWEEP_REACH = 90;
const POINTER_LOCK_THROTTLE_MS = 260;
/** Below this width the stream runs directly behind body copy, so it is drawn fainter. */
const COMPACT_WIDTH = 1024;
const COMPACT_INTENSITY = 0.55;

type LockTone = "bright" | "amber" | "blue" | "red";

// The Machine colour-codes what it tags; the feed borrows the same vocabulary.
const LOCK_KINDS: ReadonlyArray<{ label: string; tone: LockTone }> = [
  { label: "RELEVANT", tone: "amber" },
  { label: "TRACKING", tone: "amber" },
  { label: "MATCH", tone: "blue" },
  { label: "INDEXED", tone: "blue" },
  { label: "CROSS-REF", tone: "blue" },
  { label: "IRRELEVANT", tone: "bright" },
];
const HOT_KIND = { label: "ANOMALY", tone: "red" } as const;
const HOT_CHANCE = 0.14;
const HEX_DIGITS = "0123456789ABCDEF";

interface Column {
  x: number;
  /** px per second; negative streams upward. */
  speed: number;
  offset: number;
  tokens: string[];
}

interface Lock {
  col: number;
  row: number;
  born: number;
  label: string;
  tone: LockTone;
}

interface Palette {
  dim: string;
  bright: string;
  red: string;
  amber: string;
  blue: string;
  line: string;
  font: string;
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hex(length: number) {
  let out = "";
  for (let i = 0; i < length; i++) out += HEX_DIGITS[randInt(0, 15)];
  return out;
}

function pad(value: number, length = 2) {
  return String(value).padStart(length, "0");
}

// Everything the feed prints is synthetic noise — no real identifiers, and only private-range addresses.
const TOKEN_GENERATORS: Array<() => string> = [
  () => `0x${hex(8)}`,
  () => `${randInt(10, 89)}.${pad(randInt(0, 9999), 4)}N ${randInt(10, 179)}.${pad(randInt(0, 9999), 4)}E`,
  () => `CAM ${pad(randInt(1, 9999), 4)}`,
  () => `PKT ${randInt(64, 1500)}B`,
  () => `10.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`,
  () => `${pad(randInt(0, 23))}:${pad(randInt(0, 59))}:${pad(randInt(0, 59))}.${pad(randInt(0, 999), 3)}`,
  () => `ID ${hex(4)}-${hex(4)}`,
  () => `SIG ${(Math.random() * 100).toFixed(1)}%`,
  () => `${hex(2)} ${hex(2)} ${hex(2)} ${hex(2)}`,
];

function makeToken() {
  // Blank rows keep the stream airy so page copy stays readable on top of it.
  if (Math.random() < 0.3) return "";
  return TOKEN_GENERATORS[randInt(0, TOKEN_GENERATORS.length - 1)]();
}

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => styles.getPropertyValue(name).trim() || fallback;
  return {
    dim: read("--ink-dim", "#6e6e6e"),
    bright: read("--ink-bright", "#ffffff"),
    red: read("--accent-red", "#f0483c"),
    amber: read("--accent-amber", "#f5b82e"),
    blue: read("--accent-blue", "#4aa8ff"),
    line: read("--line-live", "#3a3a3a"),
    font: `${FONT_SIZE}px ${read("--font-space-mono", "monospace")}, monospace`,
  };
}

function buildColumns(width: number, height: number): Column[] {
  const count = Math.max(3, Math.floor(width / COLUMN_GAP));
  const gap = width / count;
  const rows = Math.ceil(height / LINE_HEIGHT) + 2;
  return Array.from({ length: count }, (_, i) => ({
    x: Math.round(gap * i + gap * 0.18),
    speed: (Math.random() < 0.5 ? -1 : 1) * (14 + Math.random() * 46),
    offset: Math.random() * LINE_HEIGHT,
    tokens: Array.from({ length: rows }, makeToken),
  }));
}

/**
 * Full-viewport ambient layer: the Machine sifting a live data feed. Streams of synthetic telemetry
 * scroll past, a sweep band reads through them, and acquisition brackets lock onto individual
 * records (and onto whatever sits nearest the pointer) before moving on.
 */
export function MachineFeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let columns: Column[] = [];
    let locks: Lock[] = [];
    let palette = readPalette();
    let charWidth = FONT_SIZE * 0.6;
    let intensity = 1;
    let sweepY = 0;
    let lastFrame = 0;
    let lastLock = 0;
    let lastPointerLock = 0;
    let frameId = 0;

    const tokenY = (column: Column, row: number) => row * LINE_HEIGHT + column.offset - LINE_HEIGHT;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      intensity = width < COMPACT_WIDTH ? COMPACT_INTENSITY : 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = palette.font;
      charWidth = ctx.measureText("0").width;
      columns = buildColumns(width, height);
      locks = [];
    }

    function addLock(col: number, row: number, now: number) {
      if (!columns[col]?.tokens[row]) return;
      const kind = Math.random() < HOT_CHANCE ? HOT_KIND : LOCK_KINDS[randInt(0, LOCK_KINDS.length - 1)];
      locks.push({ col, row, born: now, label: kind.label, tone: kind.tone });
      if (locks.length > MAX_LOCKS) locks.shift();
    }

    function lockRandom(now: number) {
      for (let attempt = 0; attempt < 6; attempt++) {
        const col = randInt(0, columns.length - 1);
        const row = randInt(2, columns[col].tokens.length - 3);
        if (columns[col].tokens[row]) {
          addLock(col, row, now);
          return;
        }
      }
    }

    function advance(dt: number) {
      for (let c = 0; c < columns.length; c++) {
        const column = columns[c];
        column.offset += column.speed * dt;
        // Keep offset inside one line and recycle the token that just left the viewport.
        let shift = 0;
        while (column.offset >= LINE_HEIGHT) {
          column.offset -= LINE_HEIGHT;
          column.tokens.pop();
          column.tokens.unshift(makeToken());
          shift += 1;
        }
        while (column.offset < 0) {
          column.offset += LINE_HEIGHT;
          column.tokens.shift();
          column.tokens.push(makeToken());
          shift -= 1;
        }
        if (shift !== 0) {
          for (const lock of locks) if (lock.col === c) lock.row += shift;
        }
      }
      sweepY += SWEEP_SPEED * dt;
      if (sweepY > height + SWEEP_REACH) sweepY = -SWEEP_REACH;
    }

    function drawStreams() {
      if (!ctx) return;
      ctx.font = palette.font;
      ctx.textBaseline = "middle";
      for (const column of columns) {
        for (let row = 0; row < column.tokens.length; row++) {
          const token = column.tokens[row];
          if (!token) continue;
          const y = tokenY(column, row);
          const proximity = Math.max(0, 1 - Math.abs(y - sweepY) / SWEEP_REACH);
          ctx.fillStyle = proximity > 0.45 ? palette.blue : palette.dim;
          ctx.globalAlpha = (0.16 + proximity * 0.42) * intensity;
          ctx.fillText(token, column.x, y);
        }
      }
    }

    function drawSweep() {
      if (!ctx) return;
      ctx.globalAlpha = 0.22 * intensity;
      ctx.fillStyle = palette.blue;
      ctx.fillRect(0, sweepY, width, 1);
    }

    function drawLocks(now: number) {
      if (!ctx) return;
      let previous: { x: number; y: number } | null = null;
      for (const lock of locks) {
        const column = columns[lock.col];
        const token = column?.tokens[lock.row];
        if (!column || !token) continue;

        const age = now - lock.born;
        const fade = Math.min(1, age / 160) * Math.min(1, (LOCK_LIFE_MS - age) / 500) * intensity;
        if (fade <= 0) continue;

        const y = tokenY(column, lock.row);
        const boxWidth = token.length * charWidth + 12;
        const boxHeight = LINE_HEIGHT + 4;
        // Brackets start wide and snap inward onto the record.
        const settle = 1 + 0.9 * Math.pow(Math.max(0, 1 - age / 260), 2);
        const cx = column.x + (token.length * charWidth) / 2;
        const left = cx - (boxWidth * settle) / 2;
        const right = cx + (boxWidth * settle) / 2;
        const top = y - (boxHeight * settle) / 2;
        const bottom = y + (boxHeight * settle) / 2;
        const corner = 5;
        const color = palette[lock.tone];

        if (previous) {
          ctx.globalAlpha = fade * 0.16;
          ctx.strokeStyle = palette.line;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(previous.x, previous.y);
          ctx.lineTo(cx, y);
          ctx.stroke();
        }
        previous = { x: cx, y };

        ctx.globalAlpha = fade * 0.85;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(left, top + corner);
        ctx.lineTo(left, top);
        ctx.lineTo(left + corner, top);
        ctx.moveTo(right - corner, top);
        ctx.lineTo(right, top);
        ctx.lineTo(right, top + corner);
        ctx.moveTo(right, bottom - corner);
        ctx.lineTo(right, bottom);
        ctx.lineTo(right - corner, bottom);
        ctx.moveTo(left + corner, bottom);
        ctx.lineTo(left, bottom);
        ctx.lineTo(left, bottom - corner);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.fillText(token, column.x, y);
        ctx.globalAlpha = fade * 0.7;
        ctx.fillText(lock.label, left, top - 8);
      }
    }

    function draw(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      drawStreams();
      drawSweep();
      drawLocks(now);
      ctx.globalAlpha = 1;
    }

    function frame(now: number) {
      frameId = window.requestAnimationFrame(frame);
      const elapsed = now - lastFrame;
      if (elapsed < FRAME_INTERVAL_MS) return;
      lastFrame = now;
      // Clamp so a backgrounded tab doesn't fast-forward the feed on return.
      advance(Math.min(elapsed, 100) / 1000);
      locks = locks.filter(
        (lock) => now - lock.born < LOCK_LIFE_MS && lock.row >= 0 && lock.row < columns[lock.col].tokens.length
      );
      if (now - lastLock > LOCK_EVERY_MS) {
        lastLock = now;
        lockRandom(now);
      }
      draw(now);
    }

    function start() {
      if (reduceMotion || frameId) return;
      lastFrame = performance.now();
      frameId = window.requestAnimationFrame(frame);
    }

    function stop() {
      window.cancelAnimationFrame(frameId);
      frameId = 0;
    }

    function onPointerMove(event: PointerEvent) {
      const now = performance.now();
      if (now - lastPointerLock < POINTER_LOCK_THROTTLE_MS || columns.length === 0) return;
      lastPointerLock = now;
      let col = 0;
      for (let c = 1; c < columns.length; c++) {
        if (Math.abs(columns[c].x - event.clientX) < Math.abs(columns[col].x - event.clientX)) col = c;
      }
      const row = Math.round((event.clientY - columns[col].offset + LINE_HEIGHT) / LINE_HEIGHT);
      addLock(col, row, now);
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    function onResize() {
      resize();
      if (reduceMotion) draw(performance.now());
    }

    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      if (reduceMotion) draw(performance.now());
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    resize();
    if (reduceMotion) {
      // Still frame only: the data is there, nothing moves.
      draw(performance.now());
    } else {
      start();
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
    }
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduceMotion]);

  return <canvas ref={canvasRef} aria-hidden className="machine-feed pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
