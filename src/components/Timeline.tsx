"use client";

import { useRef } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { timeline, timelineRange, type TimelineEntry } from "@/content";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const YEARS = Array.from(
  { length: timelineRange.end - timelineRange.start + 1 },
  (_, i) => timelineRange.start + i
);

function yearToPct(year: number) {
  const clamped = Math.min(Math.max(year, timelineRange.start), timelineRange.end);
  return ((clamped - timelineRange.start) / (timelineRange.end - timelineRange.start)) * 100;
}

function TrackBar({ entry, scanned }: { entry: TimelineEntry; scanned: boolean }) {
  const endYear = entry.endYear === "present" ? timelineRange.end : entry.endYear;
  const left = yearToPct(entry.startYear);
  const width = yearToPct(endYear) - left;

  return (
    <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
      <div>
        <p className="font-data text-sm text-ink-bright">{entry.org}</p>
        <p className="font-data text-xs text-ink-dim">{entry.role}</p>
        <p className="mt-1 font-data text-[11px] text-ink-dim">{entry.location}</p>
      </div>
      <div>
        <div className="relative h-2 border border-line bg-surface">
          <m.div
            className="absolute inset-y-0 left-0 bg-ink-bright/80"
            initial={{ width: 0 }}
            animate={{ width: scanned ? `${width}%` : 0 }}
            style={{ left: `${left}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        <p className="mt-2 max-w-md font-prose text-sm leading-relaxed text-ink">{entry.summary}</p>
      </div>
    </div>
  );
}

export function Timeline({ num }: { num: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const scanned = inView || Boolean(reduceMotion);

  return (
    <section id="timeline" ref={ref} className="border-b border-line py-16">
      <p className="font-data text-xs tracking-[0.2em] text-ink-dim">{String(num).padStart(2, "0")}</p>
      <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">
        OPERATIONAL HISTORY
      </h2>

      <div className="relative mt-10 overflow-hidden border-t border-line pt-4">
        <div className="relative flex justify-between font-data text-xs text-ink-dim sm:text-sm">
          {YEARS.map((year, i) => (
            <m.span
              key={year}
              initial={{ color: "var(--ink-dim)" }}
              animate={{ color: scanned ? "var(--ink-bright)" : "var(--ink-dim)" }}
              transition={{ delay: i * 0.35, duration: 0.4 }}
            >
              {year}
              {year === timelineRange.end ? "►" : ""}
            </m.span>
          ))}
        </div>

        <div className="mt-1 overflow-hidden" aria-hidden>
          <div className="ticker flex w-max gap-1 font-data text-[10px] text-ink-dim/60">
            {Array.from({ length: 12 }).map((_, loop) =>
              MONTHS.map((month, i) => <span key={`${loop}-${i}`}>{month}</span>)
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 divide-y divide-line">
        {timeline.map((entry) => (
          <TrackBar key={entry.id} entry={entry} scanned={scanned} />
        ))}
      </div>
    </section>
  );
}
