"use client";

import { useEffect, useState } from "react";

function readInk() {
  if (typeof window === "undefined") return "#B8B8B8";
  return getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#B8B8B8";
}

/** Tracks the current theme's --ink value so canvas/WebGL content (which can't read CSS vars) can match it. */
export function useThemeInk() {
  const [ink, setInk] = useState(readInk);

  useEffect(() => {
    const observer = new MutationObserver(() => setInk(readInk()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return ink;
}
