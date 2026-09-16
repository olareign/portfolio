"use client";

import { useEffect, useState } from "react";
import { profile, hud } from "@/content";
import { ThemeToggle } from "./ThemeToggle";

function formatClock(date: Date) {
  return date.toLocaleTimeString("en-GB", { hour12: false });
}

export function HudBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    // Client-only: Date must not be read during SSR, or the server and client markup diverge.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-10 items-center justify-between border-b border-line bg-void/95 px-3 font-data text-[11px] tracking-wide text-ink sm:px-4 sm:text-xs">
      <span className="text-ink-bright">{profile.subjectId}</span>
      <span className="hidden items-center gap-1.5 text-ink-dim sm:flex">
        <span className="h-1.5 w-1.5 animate-pulse bg-ink-bright motion-reduce:animate-none" aria-hidden />
        ● {hud.status}
      </span>
      <div className="flex items-center gap-4">
        <time aria-hidden className="tabular-nums text-ink">
          {now ? formatClock(now) : "--:--:--"}
        </time>
        <ThemeToggle />
      </div>
    </header>
  );
}
