"use client";

import { useRef, useState } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { projects, timeline, timelineRange, type TimelineEntry, type TimelineTrack } from "@/content";

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const YEARS = Array.from(
  { length: timelineRange.end - timelineRange.start + 1 },
  (_, i) => timelineRange.start + i
);

const TRACK_TONE: Record<TimelineTrack, { fill: string; text: string }> = {
  tobams: { fill: "bg-accent-blue", text: "text-accent-blue" },
  pacifylabs: { fill: "bg-accent-amber", text: "text-accent-amber" },
};

function yearToPct(year: number) {
  const clamped = Math.min(Math.max(year, timelineRange.start), timelineRange.end);
  return ((clamped - timelineRange.start) / (timelineRange.end - timelineRange.start)) * 100;
}

function endYearOf(entry: TimelineEntry) {
  return entry.endYear === "present" ? timelineRange.end : entry.endYear;
}

function isActiveIn(entry: TimelineEntry, year: number) {
  return entry.startYear <= year && year <= endYearOf(entry);
}

interface TrackBarProps {
  entry: TimelineEntry;
  scanned: boolean;
  year: number;
}

function TrackBar({ entry, scanned, year }: TrackBarProps) {
  const left = yearToPct(entry.startYear);
  const width = yearToPct(endYearOf(entry)) - left;
  const active = isActiveIn(entry, year);
  const tone = TRACK_TONE[entry.track];
  const projectCount = projects.filter((p) => p.employer === entry.org).length;

  return (
    <div
      className={`grid grid-cols-1 gap-2 py-4 transition-opacity duration-300 sm:grid-cols-[180px_1fr] sm:gap-6 ${
        active ? "" : "opacity-35"
      }`}
    >
      <div>
        <p className={`font-data text-sm ${active ? tone.text : "text-ink-bright"}`}>{entry.org}</p>
        <p className="font-data text-xs text-ink-dim">{entry.role}</p>
        <p className="mt-1 font-data text-[11px] text-ink-dim">
          {entry.startYear} — {entry.endYear === "present" ? "PRESENT" : entry.endYear} · {entry.location}
        </p>
      </div>
      <div>
        <div className="relative h-2 border border-line bg-surface">
          <m.div
            className={`absolute inset-y-0 left-0 ${tone.fill}`}
            initial={{ width: 0 }}
            animate={{ width: scanned ? `${width}%` : 0 }}
            style={{ left: `${left}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <span
            className="absolute -inset-y-1.5 w-px bg-ink-bright transition-[left] duration-300"
            style={{ left: `${yearToPct(year)}%` }}
            aria-hidden
          />
        </div>
        <p className="mt-2 max-w-md font-prose text-sm leading-relaxed text-ink">{entry.summary}</p>
        <p className="mt-1.5 font-data text-[11px] text-ink-dim">
          {active ? (
            <>
              <span className={tone.text}>● ACTIVE IN {year}</span> · {projectCount} projects on file
            </>
          ) : (
            <>○ NOT ACTIVE IN {year}</>
          )}
        </p>
      </div>
    </div>
  );
}

export function Timeline({ num }: { num: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduceMotion = useReducedMotion();
  const scanned = inView || Boolean(reduceMotion);
  const [year, setYear] = useState<number>(timelineRange.end);

  return (
    <section id="timeline" ref={ref} className="reveal border-b border-line py-16">
      <p className="font-data text-xs tracking-[0.2em] text-accent-amber">{String(num).padStart(2, "0")}</p>
      <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">
        OPERATIONAL HISTORY
      </h2>
      <p className="mt-3 font-data text-xs text-ink-dim">SELECT A YEAR TO REPLAY IT</p>

      <div className="relative mt-6 overflow-hidden border-t border-line pt-4">
        <div className="relative flex justify-between" role="group" aria-label="Year">
          {YEARS.map((y) => {
            const selected = y === year;
            return (
              <button
                key={y}
                type="button"
                aria-pressed={selected}
                onClick={() => setYear(y)}
                className={`border px-2.5 py-1 font-data text-xs tabular-nums transition-colors sm:text-sm ${
                  selected
                    ? "border-accent-amber bg-accent-amber font-bold text-void"
                    : "border-line bg-void/80 text-ink-dim hover:border-accent-amber hover:text-accent-amber"
                }`}
              >
                {y}
              </button>
            );
          })}
        </div>

        <div className="mt-2 overflow-hidden" aria-hidden>
          <div className="ticker flex w-max gap-1 font-data text-[10px] text-ink-dim/60">
            {Array.from({ length: 12 }).map((_, loop) =>
              MONTHS.map((month, i) => <span key={`${loop}-${i}`}>{month}</span>)
            )}
          </div>
        </div>
      </div>

      <div className="reading-panel mt-4 divide-y divide-line">
        {timeline.map((entry) => (
          <TrackBar key={entry.id} entry={entry} scanned={scanned} year={year} />
        ))}
      </div>
    </section>
  );
}
