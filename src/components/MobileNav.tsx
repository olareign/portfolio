"use client";

import { sections } from "@/lib/sections";
import { useActiveSection } from "@/lib/use-active-section";

/** Bottom section bar for phones, where the left rail is hidden. */
export function MobileNav() {
  const activeId = useActiveSection();

  return (
    <nav
      aria-label="Section navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-void/95 pb-[env(safe-area-inset-bottom)] sm:hidden"
    >
      <ul className="flex justify-between px-1">
        {sections.map((section, i) => {
          const active = section.id === activeId;
          return (
            <li key={section.id} className="min-w-0 flex-1">
              <a
                href={`#${section.id}`}
                aria-current={active ? "location" : undefined}
                className={`flex flex-col items-center gap-0.5 border-t-2 py-2 font-data transition-colors ${
                  active ? "border-accent-amber text-accent-amber" : "border-transparent text-ink-dim"
                }`}
              >
                <span className="text-[10px] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className="max-w-full truncate text-[8px] tracking-[0.08em]">{section.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
