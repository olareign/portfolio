"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content";
import { requestConsole } from "@/lib/events";
import { sections } from "@/lib/sections";
import { useActiveSection } from "@/lib/use-active-section";
import { ThemeToggle } from "./ThemeToggle";

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-GB", { hour12: false });
}

export function HudBar() {
  const [now, setNow] = useState<Date | null>(null);
  const activeId = useActiveSection();
  const status = sections.find((s) => s.id === activeId)?.status ?? sections[0].status;

  useEffect(() => {
    // Client-only: Date must not be read during SSR, or the server and client markup diverge.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-between border-b border-line bg-void/95 px-3 font-data text-[11px] tracking-wide text-ink sm:px-4 sm:text-xs">
      <span className="text-accent-amber">{profile.subjectId}</span>
      <span className="hidden items-center gap-1.5 text-ink-dim sm:flex" aria-live="polite">
        <span className="h-1.5 w-1.5 animate-pulse bg-accent-blue motion-reduce:animate-none" aria-hidden />
        {/* Keyed so the label re-types itself each time the section changes. */}
        <span key={status} className="hud-status">
          {status}
        </span>
      </span>
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={requestConsole}
          aria-label="Open command console"
          className="border border-line px-1.5 py-0.5 text-[10px] text-ink-dim transition-colors hover:border-accent-amber hover:text-accent-amber"
        >
          <span className="hidden sm:inline">⌘K</span>
          <span className="sm:hidden">&gt;_</span>
        </button>
        <time aria-hidden className="hidden tabular-nums text-ink sm:inline">
          {now ? formatClock(now) : "--:--:--"}
        </time>
        <ThemeToggle />
      </div>
    </header>
  );
}
