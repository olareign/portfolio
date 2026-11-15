"use client";

import { useState } from "react";
import { projects, type Project } from "@/content";
import { NodeCard } from "./NodeCard";

type FilterId = "all" | Project["employer"] | "ai";

interface Filter {
  id: FilterId;
  label: string;
  matches: (project: Project) => boolean;
}

const FILTERS: Filter[] = [
  { id: "all", label: "ALL", matches: () => true },
  { id: "Pacifylabs", label: "PACIFYLABS", matches: (p) => p.employer === "Pacifylabs" },
  { id: "Tobams Group", label: "TOBAMS GROUP", matches: (p) => p.employer === "Tobams Group" },
  { id: "ai", label: "AI-INTEGRATED", matches: (p) => Boolean(p.ai) },
];

const TALLIES = [
  { label: "ENTITIES", value: projects.length, tone: "text-ink-bright" },
  { label: "LIVE", value: projects.filter((p) => p.status === "LIVE").length, tone: "text-accent-green" },
  { label: "AI-INTEGRATED", value: projects.filter((p) => p.ai).length, tone: "text-accent-blue" },
  { label: "OWNED END-TO-END", value: projects.filter((p) => p.tag === "PRIMARY").length, tone: "text-accent-amber" },
];

export function Nodes({ num }: { num: number }) {
  const [filterId, setFilterId] = useState<FilterId>("all");
  const filter = FILTERS.find((f) => f.id === filterId) ?? FILTERS[0];
  const visible = projects.filter(filter.matches);

  return (
    <section id="nodes" className="border-b border-line py-16">
      <p className="font-data text-xs tracking-[0.2em] text-accent-amber">{String(num).padStart(2, "0")}</p>
      <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">
        ANALYZED ENTITIES
      </h2>
      <p className="mt-3 max-w-xl font-prose text-sm text-ink-dim">
        Projects flagged and processed. SafePick is the primary entity — owned end-to-end.
        Everything else is contributor work, tagged by employer.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
        {TALLIES.map((tally) => (
          <div key={tally.label} className="bg-surface px-4 py-3">
            <dd className={`font-display text-2xl tabular-nums ${tally.tone}`}>
              {String(tally.value).padStart(2, "0")}
            </dd>
            <dt className="mt-0.5 font-data text-[10px] tracking-[0.15em] text-ink-dim">{tally.label}</dt>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const active = f.id === filter.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilterId(f.id)}
              className={`border px-3 py-1.5 font-data text-[11px] tracking-[0.12em] transition-colors ${
                active
                  ? "border-accent-amber bg-accent-amber font-bold text-void"
                  : "border-line bg-void/80 text-ink-dim hover:border-accent-amber hover:text-accent-amber"
              }`}
            >
              {f.label} <span className="tabular-nums opacity-70">{projects.filter(f.matches).length}</span>
            </button>
          );
        })}
      </div>

      {/* Keyed by filter so the cards replay their staggered reveal whenever the selection changes. */}
      <div key={filter.id} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <NodeCard key={project.id} project={project} index={i} total={visible.length} />
        ))}
      </div>
    </section>
  );
}
