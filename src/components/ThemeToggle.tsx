"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "soi-theme";

export function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Client-only: reflects the attribute the blocking init script already set on <html>.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLight(document.documentElement.dataset.theme === "light");
  }, []);

  function toggle() {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.dataset.theme = next ? "light" : "dark";
    try {
      localStorage.setItem(STORAGE_KEY, next ? "light" : "dark");
    } catch {
      // localStorage unavailable — theme just won't persist across visits
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="font-data text-[11px] tracking-wide text-ink-dim transition-colors hover:text-ink-bright sm:text-xs"
    >
      {isLight ? "☾ DARK" : "☀ LIGHT"}
    </button>
  );
}
