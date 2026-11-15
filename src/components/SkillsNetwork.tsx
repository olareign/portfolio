"use client";

import { useState } from "react";
import { projects } from "@/content";

type NodeRef = { kind: "skill" | "project"; id: string };

const SKILLS = [...new Set(projects.flatMap((p) => p.stack))].sort(
  (a, b) => projects.filter((p) => p.stack.includes(b)).length - projects.filter((p) => p.stack.includes(a)).length
);

const WIDTH = 900;
const ROW = 30;
const PAD_Y = 24;
const HEIGHT = Math.max(SKILLS.length, projects.length) * ROW + PAD_Y * 2;
const SKILL_X = 250;
const PROJECT_X = 650;

/** Spreads `count` rows evenly over the drawing height and returns the y of row `index`. */
function rowY(index: number, count: number) {
  const span = HEIGHT - PAD_Y * 2;
  return PAD_Y + (span / count) * (index + 0.5);
}

const LINKS = projects.flatMap((project, pi) =>
  project.stack.map((skill) => ({
    skill,
    project: project.id,
    y1: rowY(SKILLS.indexOf(skill), SKILLS.length),
    y2: rowY(pi, projects.length),
  }))
);

function isLinked(active: NodeRef, link: (typeof LINKS)[number]) {
  return active.kind === "skill" ? link.skill === active.id : link.project === active.id;
}

/** Skills on the left, projects on the right, a line for every "this project uses this". */
export function SkillsNetwork() {
  const [hovered, setHovered] = useState<NodeRef | null>(null);
  const [pinned, setPinned] = useState<NodeRef | null>(null);
  const active = hovered ?? pinned;

  const litSkills = new Set(active ? LINKS.filter((l) => isLinked(active, l)).map((l) => l.skill) : []);
  const litProjects = new Set(active ? LINKS.filter((l) => isLinked(active, l)).map((l) => l.project) : []);

  function nodeProps(ref: NodeRef, label: string) {
    const isPinned = pinned?.kind === ref.kind && pinned.id === ref.id;
    return {
      role: "button",
      tabIndex: 0,
      "aria-pressed": isPinned,
      "aria-label": label,
      className: "cursor-pointer outline-none",
      onMouseEnter: () => setHovered(ref),
      onMouseLeave: () => setHovered(null),
      onFocus: () => setHovered(ref),
      onBlur: () => setHovered(null),
      onClick: () => setPinned(isPinned ? null : ref),
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setPinned(isPinned ? null : ref);
        }
      },
    };
  }

  const summary = active
    ? active.kind === "skill"
      ? `${active.id} · used in ${litProjects.size} of ${projects.length} projects`
      : `${projects.find((p) => p.id === active.id)?.name} · ${litSkills.size} technologies`
    : "Hover or tap a node to trace its connections";

  return (
    <div className="mt-12">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-data text-xs tracking-[0.15em] text-accent-blue">SIGNAL MAP</p>
        <p className="font-data text-[11px] text-ink-dim" aria-live="polite">
          {summary}
        </p>
      </div>

      <div className="mt-3 overflow-x-auto border border-line bg-surface/80">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="block h-auto w-full min-w-[640px] font-data"
          role="group"
          aria-label="Which technologies each project uses"
        >
          {LINKS.map((link) => {
            const lit = active ? isLinked(active, link) : false;
            const mid = (SKILL_X + PROJECT_X) / 2;
            return (
              <path
                key={`${link.skill}-${link.project}`}
                d={`M ${SKILL_X} ${link.y1} C ${mid} ${link.y1}, ${mid} ${link.y2}, ${PROJECT_X} ${link.y2}`}
                fill="none"
                strokeWidth={lit ? 1.5 : 1}
                className={`transition-[stroke,opacity] duration-200 ${
                  lit ? "stroke-accent-amber opacity-100" : active ? "stroke-line-live opacity-25" : "stroke-line-live opacity-70"
                }`}
              />
            );
          })}

          {SKILLS.map((skill, i) => {
            const y = rowY(i, SKILLS.length);
            const lit = litSkills.has(skill);
            return (
              <g key={skill} {...nodeProps({ kind: "skill", id: skill }, `${skill}, technology`)}>
                <rect x={0} y={y - ROW / 2} width={SKILL_X + 8} height={ROW} fill="transparent" />
                <text
                  x={SKILL_X - 14}
                  y={y}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fontSize={13}
                  className={`transition-colors duration-200 ${lit ? "fill-accent-amber" : active ? "fill-ink-dim" : "fill-ink-bright"}`}
                >
                  {skill}
                </text>
                <rect
                  x={SKILL_X - 4}
                  y={y - 4}
                  width={8}
                  height={8}
                  className={`transition-colors duration-200 ${lit ? "fill-accent-amber" : "fill-accent-blue"}`}
                />
              </g>
            );
          })}

          {projects.map((project, i) => {
            const y = rowY(i, projects.length);
            const lit = litProjects.has(project.id);
            return (
              <g key={project.id} {...nodeProps({ kind: "project", id: project.id }, `${project.name}, project`)}>
                <rect x={PROJECT_X - 8} y={y - ROW / 2} width={WIDTH - PROJECT_X + 8} height={ROW} fill="transparent" />
                <rect
                  x={PROJECT_X - 4}
                  y={y - 4}
                  width={8}
                  height={8}
                  className={`transition-colors duration-200 ${lit ? "fill-accent-amber" : "fill-ink-dim"}`}
                />
                <text
                  x={PROJECT_X + 14}
                  y={y}
                  dominantBaseline="middle"
                  fontSize={13}
                  className={`transition-colors duration-200 ${lit ? "fill-accent-amber" : active ? "fill-ink-dim" : "fill-ink"}`}
                >
                  {project.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
