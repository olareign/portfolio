"use client";

import { useEffect, useState } from "react";
import { THEME_CHANGE_EVENT, currentTheme, toggleTheme } from "@/lib/theme";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const sync = () => setIsLight(currentTheme() === "light");
    // Client-only: reflects the attribute the blocking init script already set on <html>.
    sync();
    window.addEventListener(THEME_CHANGE_EVENT, sync);
    return () => window.removeEventListener(THEME_CHANGE_EVENT, sync);
  }, []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="font-data text-[11px] tracking-wide text-ink-dim transition-colors hover:text-accent-amber sm:text-xs"
    >
      {isLight ? "☾ DARK" : "☀ LIGHT"}
    </button>
  );
}
