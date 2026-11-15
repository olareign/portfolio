"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { profile } from "@/content";
import { ScanBracket } from "./ScanBracket";

const MATCH_BASE = 99;
const MATCH_TICK_MS = 900;

/** Jitters the last decimals of the match score so the readout feels like a live measurement. */
function useLiveMatch() {
  const reduceMotion = useReducedMotion();
  const [match, setMatch] = useState("99.72");

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setMatch((MATCH_BASE + 0.6 + Math.random() * 0.39).toFixed(2));
    }, MATCH_TICK_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return match;
}

/** Hero portrait framed as the Machine's camera feed: scan sweep, face acquisition box, live readout. */
export function SubjectFeed() {
  const match = useLiveMatch();

  return (
    <figure className="relative mx-auto w-full max-w-[300px] border border-line bg-surface lg:mx-0 lg:max-w-none">
      <ScanBracket tone="relevant" />

      <div className="flex items-center justify-between border-b border-line px-3 py-2 font-data text-[10px] tracking-[0.18em] text-ink-dim">
        <span className="flex items-center gap-1.5">
          <span className="feed-rec h-1.5 w-1.5 bg-accent-red" aria-hidden />
          REC
        </span>
        <span>{profile.subjectId} · LIVE FEED</span>
      </div>

      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src="/headshot.png"
          alt={`Portrait of ${profile.name}`}
          width={1092}
          height={1440}
          priority
          sizes="(min-width: 1024px) 320px, 300px"
          className="h-full w-full object-cover"
        />

        <div className="feed-scan" aria-hidden />

        {/* Face acquisition box — coordinates are percentages of the 3:4 portrait frame. */}
        <div className="feed-face absolute left-[28%] top-[23%] h-[41%] w-[44%]" aria-hidden>
          <ScanBracket tone="relevant" />
          <span className="absolute -top-5 left-0 whitespace-nowrap bg-accent-amber px-1.5 py-0.5 font-data text-[9px] font-bold tracking-[0.18em] text-void">
            {profile.handle.toUpperCase()} · LOCKED
          </span>
          <span className="absolute left-1/2 top-full h-[200%] w-px bg-accent-amber/40" />
          <span className="absolute right-full top-1/2 h-px w-[200%] bg-accent-amber/40" />
        </div>
      </div>

      <figcaption className="space-y-1 border-t border-line px-3 py-2.5 font-data text-[10px] tracking-[0.12em]">
        <div className="readout-row">
          <span className="text-ink-dim">DESIGNATION</span>
          <span className="text-accent-amber">RELEVANT</span>
        </div>
        <div className="readout-row">
          <span className="text-ink-dim">FACIAL MATCH</span>
          <span className="tabular-nums text-accent-blue">{match}%</span>
        </div>
        <div className="readout-row">
          <span className="text-ink-dim">STATUS</span>
          <span className="text-accent-green">OPEN TO WORK</span>
        </div>
      </figcaption>
    </figure>
  );
}
