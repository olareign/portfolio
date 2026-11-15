"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const HOLD_MS = 1700;
const TYPE_MS = 45;

/** Types out each item in turn, like a console cycling through what it's tracking. */
export function FocusCycler({ items }: { items: string[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [chars, setChars] = useState(items[0]?.length ?? 0);

  const current = items[index] ?? "";

  useEffect(() => {
    if (reduceMotion || items.length < 2) return;
    const done = chars >= current.length;
    const id = window.setTimeout(
      () => {
        if (done) {
          setIndex((i) => (i + 1) % items.length);
          setChars(0);
        } else {
          setChars((c) => c + 1);
        }
      },
      done ? HOLD_MS : TYPE_MS
    );
    return () => window.clearTimeout(id);
  }, [chars, current.length, items.length, reduceMotion]);

  return (
    <p className="font-data text-xs tracking-[0.12em] text-ink-dim">
      <span className="sr-only">Works with {items.join(", ")}</span>
      <span aria-hidden>
        TRACKING ▸ <span className="text-accent-blue">{current.slice(0, chars)}</span>
        <span className="animate-pulse motion-reduce:animate-none">_</span>
      </span>
    </p>
  );
}
