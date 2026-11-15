"use client";

import { useEffect, useState } from "react";
import { sections } from "./sections";

/** Id of the section currently crossing the middle of the viewport. */
export function useActiveSection() {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      // A thin band across the middle: exactly one section owns it at a time.
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return activeId;
}
