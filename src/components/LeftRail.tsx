"use client";

import { sections } from "@/lib/sections";
import { useActiveSection } from "@/lib/use-active-section";

export function LeftRail() {
  const activeId = useActiveSection();

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-0 left-0 top-10 z-40 hidden w-10 flex-col items-center justify-between border-r border-line bg-void/70 py-6 sm:flex"
    >
      <span className="rail-progress absolute right-0 top-0 h-full w-px bg-accent-amber" aria-hidden />
      <span className="rail-label font-data text-[10px] tracking-[0.3em] text-ink-dim">
        SUBJECT OF INTEREST
      </span>
      <ul className="flex flex-col items-center gap-6">
        {sections.map((section, i) => {
          const active = section.id === activeId;
          return (
            <li key={section.id} className="rail-label">
              <a
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                className={`font-data text-[10px] tracking-[0.2em] transition-colors hover:text-accent-amber focus-visible:text-accent-amber ${
                  active ? "text-accent-amber" : "text-ink-dim"
                }`}
              >
                {String(i + 1).padStart(2, "0")} {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
