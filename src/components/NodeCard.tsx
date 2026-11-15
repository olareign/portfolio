import type { CSSProperties } from "react";
import type { Project } from "@/content";
import { EMPLOYER_TONE, STATUS_TONE } from "@/lib/project-tones";
import { ProjectMark } from "./ProjectMark";
import { ScanBracket } from "./ScanBracket";

const REVEAL_STAGGER_MS = 55;

interface NodeCardProps {
  project: Project;
  /** Position within the currently visible list — drives the counter and the reveal stagger. */
  index: number;
  total: number;
  onOpen: (project: Project) => void;
}

export function NodeCard({ project, index, total, onOpen }: NodeCardProps) {
  const featured = project.tag === "PRIMARY";
  const status = STATUS_TONE[project.status];
  const employer = EMPLOYER_TONE[project.employer];
  const counter = `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  const revealDelay: CSSProperties = { animationDelay: `${index * REVEAL_STAGGER_MS}ms` };

  return (
    <article
      style={revealDelay}
      className={`node-card group relative flex flex-col overflow-hidden border border-line bg-surface p-5 transition-[border-color,transform] duration-200 focus-within:border-accent-amber hover:-translate-y-1 hover:border-accent-amber motion-reduce:hover:translate-y-0`}
    >
      <span className={`absolute inset-x-0 top-0 h-0.5 ${employer.bar}`} aria-hidden />
      <span className="node-card-sweep" aria-hidden />
      <ScanBracket interactive tone="relevant" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <ProjectMark project={project} large={featured} />
          <div>
            <p className="font-data text-[10px] tracking-[0.15em] text-ink-dim">
              <span className="tabular-nums">{counter}</span> ·{" "}
              <span className={employer.text}>{project.employer.toUpperCase()}</span>
            </p>
            <h3 className={`mt-1 font-display text-ink-bright ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
              {/* Stretched button: the whole card opens the case file, with one focus stop. */}
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:shadow-none"
              >
                {project.name}
              </button>
            </h3>
            <p className="mt-0.5 font-data text-[11px] text-ink-dim">{project.type}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span
            className={`border px-2 py-0.5 font-data text-[10px] tracking-wide ${
              featured ? "border-accent-amber bg-accent-amber font-bold text-void" : "border-line text-ink-dim"
            }`}
          >
            {project.tag}
          </span>
          {project.ai && (
            <span className="border border-accent-blue/60 px-2 py-0.5 font-data text-[10px] tracking-wide text-accent-blue">
              AI
            </span>
          )}
        </div>
      </div>

      <p className={`mt-4 font-prose leading-relaxed text-ink ${featured ? "max-w-3xl text-base" : "text-sm"}`}>
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="border border-line bg-void/60 px-2 py-0.5 font-data text-[10px] tracking-wide text-ink transition-colors group-hover:border-line-live"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5 font-data text-[11px]">
        <span className={`flex items-center gap-1.5 ${status.text}`}>
          <span
            className={`h-1.5 w-1.5 ${status.dot} ${project.status === "LIVE" ? "animate-pulse motion-reduce:animate-none" : ""}`}
            aria-hidden
          />
          {project.status}
        </span>
        <span className="text-ink-dim transition-colors group-hover:text-accent-amber" aria-hidden>
          OPEN FILE →
        </span>
      </div>
    </article>
  );
}
