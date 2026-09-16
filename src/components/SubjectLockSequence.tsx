"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { profile } from "@/content";

const BOOT_LINES = [
  "> scan --subject olareign",
  "<DIR> operational_history/",
  "<DIR> analyzed_entities/",
  "<DIR> detected_capabilities/",
  "MATCH FOUND: 0x88",
];

const BOOT_DURATION_MS = 1500;
const LOCK_DURATION_MS = 800;
const SESSION_KEY = "soi-booted";

type Phase = "boot" | "lock" | "done";

const CORNERS = [
  "top-0 left-0 border-t border-l",
  "top-0 right-0 border-t border-r",
  "bottom-0 left-0 border-b border-l",
  "bottom-0 right-0 border-b border-r",
] as const;

function LockBracket({ finalColor }: { finalColor: string }) {
  return (
    <div className="pointer-events-none absolute -inset-3" aria-hidden>
      {CORNERS.map((pos) => (
        <m.span
          key={pos}
          className={`absolute h-4 w-4 ${pos}`}
          initial={{ opacity: 0, scale: 0.7, borderColor: "#E4372B" }}
          animate={{
            opacity: 1,
            scale: 1,
            borderColor: ["#E4372B", "#E4372B", finalColor],
          }}
          transition={{ duration: LOCK_DURATION_MS / 1000, times: [0, 0.6, 1], ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function SubjectLockSequence() {
  const reduceMotion = useReducedMotion();
  const [shouldPlay, setShouldPlay] = useState(false);
  const [phase, setPhase] = useState<Phase>("boot");
  const [typedChars, setTypedChars] = useState(0);
  const [inkBright, setInkBright] = useState("#FFFFFF");

  const fullText = useMemo(() => BOOT_LINES.join("\n"), []);

  useEffect(() => {
    if (reduceMotion) return;
    let alreadyBooted = false;
    try {
      alreadyBooted = window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      alreadyBooted = false;
    }
    // Client-only: sessionStorage must not be read during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!alreadyBooted) setShouldPlay(true);
  }, [reduceMotion]);

  useEffect(() => {
    if (!shouldPlay || phase !== "boot") return;
    const perChar = BOOT_DURATION_MS / fullText.length;
    const id = window.setInterval(() => {
      setTypedChars((c) => {
        const next = c + 1;
        if (next >= fullText.length) {
          window.clearInterval(id);
          window.setTimeout(() => {
            const resolved = getComputedStyle(document.documentElement).getPropertyValue("--ink-bright").trim();
            if (resolved) setInkBright(resolved);
            setPhase("lock");
          }, 150);
        }
        return next;
      });
    }, perChar);
    return () => window.clearInterval(id);
  }, [shouldPlay, phase, fullText.length]);

  useEffect(() => {
    if (phase !== "lock") return;
    const id = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // sessionStorage unavailable — fine, sequence just replays next load
      }
      setPhase("done");
    }, LOCK_DURATION_MS + 350);
    return () => window.clearTimeout(id);
  }, [phase]);

  if (!shouldPlay || phase === "done") return null;

  const typedText = fullText.slice(0, typedChars);

  return (
    <AnimatePresence>
      <m.div
        aria-hidden
        className="fixed inset-0 z-[60] flex items-center justify-center bg-void px-6"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {phase === "boot" && (
          <pre className="w-full max-w-lg whitespace-pre-wrap font-data text-xs text-ink-dim sm:text-sm">
            {typedText}
            <span className="animate-pulse motion-reduce:animate-none">_</span>
          </pre>
        )}

        {phase === "lock" && (
          <div className="relative">
            <LockBracket finalColor={inkBright} />
            <p className="font-display text-[clamp(1.75rem,6vw,3.5rem)] text-ink-bright">
              {profile.handle.toUpperCase()}
            </p>
            <m.p
              className="mt-2 font-data text-xs tracking-[0.2em] text-accent-red"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0.6] }}
              transition={{ duration: LOCK_DURATION_MS / 1000, times: [0, 0.3, 0.7, 1] }}
            >
              ● SUBJECT IDENTIFIED
            </m.p>
          </div>
        )}
      </m.div>
    </AnimatePresence>
  );
}
