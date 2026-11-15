"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { profile, projects } from "@/content";

const BOOT_LINES = [
  "> boot --machine",
  "> scan --subject olareign",
  `<DIR> operational_history/    2022—2026`,
  `<DIR> analyzed_entities/      ${projects.length} records`,
  "<DIR> detected_capabilities/",
  "FACIAL RECOGNITION ............ RUNNING",
];

const BOOT_DURATION_MS = 1500;
const LOCK_DURATION_MS = 1500;
const SESSION_KEY = "soi-booted";

type Phase = "boot" | "lock" | "done";

const CORNERS = [
  "top-0 left-0 border-t-2 border-l-2",
  "top-0 right-0 border-t-2 border-r-2",
  "bottom-0 left-0 border-b-2 border-l-2",
  "bottom-0 right-0 border-b-2 border-r-2",
] as const;

/** Brackets start wide, then snap onto the face. */
function LockBracket() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {CORNERS.map((pos) => (
        <m.span
          key={pos}
          className={`absolute h-5 w-5 border-accent-amber ${pos}`}
          initial={{ opacity: 0, scale: 1.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

/**
 * First-visit intro: a terminal boot log types out, then the Machine acquires the subject's face,
 * classifies them and hands off to the page. Plays once per browser session; skipped under reduced motion.
 */
export function SubjectLockSequence() {
  const reduceMotion = useReducedMotion();
  const [shouldPlay, setShouldPlay] = useState(false);
  const [phase, setPhase] = useState<Phase>("boot");
  const [typedChars, setTypedChars] = useState(0);

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
          window.setTimeout(() => setPhase("lock"), 150);
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

  // Any key or tap skips the intro.
  useEffect(() => {
    if (!shouldPlay || phase === "done") return;
    const skip = () => setPhase("done");
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [shouldPlay, phase]);

  if (!shouldPlay || phase === "done") return null;

  const typedText = fullText.slice(0, typedChars);

  return (
    <AnimatePresence>
      <m.div
        aria-hidden
        className="fixed inset-0 z-[90] flex items-center justify-center bg-void px-6"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
      >
        {phase === "boot" && (
          <pre className="w-full max-w-lg whitespace-pre-wrap font-data text-xs text-ink-dim sm:text-sm">
            {typedText}
            <span className="animate-pulse text-accent-amber motion-reduce:animate-none">_</span>
          </pre>
        )}

        {phase === "lock" && (
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-10">
            <m.div
              className="relative h-56 w-44 overflow-hidden border border-line sm:h-72 sm:w-56"
              initial={{ opacity: 0, filter: "grayscale(1) contrast(1.4)" }}
              animate={{ opacity: 1, filter: ["grayscale(1) contrast(1.4)", "grayscale(1) contrast(1.4)", "grayscale(0) contrast(1)"] }}
              transition={{ duration: 1, times: [0, 0.5, 1] }}
            >
              <Image src="/headshot.png" alt="" fill sizes="224px" className="object-cover" priority />
              <div className="feed-scan" />
              <div className="absolute left-[24%] top-[20%] h-[46%] w-[52%]">
                <LockBracket />
              </div>
            </m.div>

            <div className="text-center sm:text-left">
              <p className="font-display text-[clamp(1.75rem,6vw,3.5rem)] leading-none text-ink-bright">
                {profile.handle.toUpperCase()}
              </p>
              <m.div
                className="mt-4 space-y-1 font-data text-xs tracking-[0.18em]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.3 }}
              >
                <p className="text-accent-amber">● SUBJECT IDENTIFIED</p>
                <p className="text-ink-dim">
                  CLASSIFICATION <span className="text-accent-blue">RELEVANT</span>
                </p>
                <p className="text-ink-dim">
                  STATUS <span className="text-accent-green">OPEN TO WORK</span>
                </p>
              </m.div>
            </div>
          </div>
        )}

        <p className="absolute bottom-6 font-data text-[10px] tracking-[0.2em] text-ink-dim">PRESS ANY KEY TO SKIP</p>
      </m.div>
    </AnimatePresence>
  );
}
