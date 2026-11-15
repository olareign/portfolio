import type { CSSProperties } from "react";
import Image from "next/image";
import type { Project } from "@/content";
import { ScanBracket } from "./ScanBracket";

const STATUS_TONE: Record<Project["status"], { text: string; dot: string }> = {
  LIVE: { text: "text-accent-green", dot: "bg-accent-green" },
  "IN PROGRESS": { text: "text-accent-amber", dot: "bg-accent-amber" },
  SHIPPED: { text: "text-accent-blue", dot: "bg-accent-blue" },
};

// Each employer gets its own signal colour, matching the timeline tracks.
const EMPLOYER_TONE: Record<Project["employer"], { bar: string; text: string }> = {
  Pacifylabs: { bar: "bg-accent-amber", text: "text-accent-amber" },
  "Tobams Group": { bar: "bg-accent-blue", text: "text-accent-blue" },
};

const REVEAL_STAGGER_MS = 55;

function ProjectMark({ project, large }: { project: Project; large: boolean }) {
  const box = large ? "h-12 w-12" : "h-9 w-9";
  if (project.logo) {
    return (
      <div className={`flex ${box} shrink-0 items-center justify-center border border-line bg-void`}>
        <Image
          src={project.logo}
          alt=""
          width={32}
          height={32}
          className={`${large ? "h-8 w-8" : "h-6 w-6"} object-contain`}
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className={`flex ${box} shrink-0 items-center justify-center border border-line font-display text-xs text-ink-dim`}
    >
      {project.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

interface NodeCardProps {
  project: Project;
  /** Position within the currently visible list — drives the counter and the reveal stagger. */
  index: number;
  total: number;
}

export function NodeCard({ project, index, total }: NodeCardProps) {
  const featured = project.tag === "PRIMARY";
  const status = STATUS_TONE[project.status];
  const employer = EMPLOYER_TONE[project.employer];
  const counter = `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;
  const revealDelay: CSSProperties = { animationDelay: `${index * REVEAL_STAGGER_MS}ms` };

  return (
    <article
      style={revealDelay}
      className={`node-card group relative flex flex-col overflow-hidden border border-line bg-surface p-5 transition-[border-color,transform] duration-200 focus-within:border-accent-amber hover:-translate-y-1 hover:border-accent-amber motion-reduce:hover:translate-y-0 ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <span className={`absolute inset-x-0 top-0 h-0.5 ${employer.bar}`} aria-hidden />
      <span className="node-card-sweep" aria-hidden />
      <ScanBracket interactive tone="relevant" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <ProjectMark project={project} large={featured} />
          <div>
            <p className="font-data text-[10px] tracking-[0.15em] text-ink-dim">
              <span className="tabular-nums">{counter}</span> · <span className={employer.text}>{project.employer.toUpperCase()}</span>
            </p>
            <h3 className={`mt-1 font-display text-ink-bright ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>
              {project.name}
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

      <p className={`mt-4 font-prose leading-relaxed text-ink ${featured ? "max-w-2xl text-base" : "text-sm"}`}>
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
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="text-ink-dim transition-colors hover:text-accent-amber"
          >
            VISIT ↗
          </a>
        ) : (
          project.platform && <span className="truncate text-ink-dim">{project.platform}</span>
        )}
      </div>
    </article>
  );
}
