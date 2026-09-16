import Image from "next/image";
import type { Project } from "@/content";
import { ScanBracket } from "./ScanBracket";

function ProjectMark({ project }: { project: Project }) {
  if (project.logo) {
    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-void">
        <Image
          src={project.logo}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6 object-contain grayscale contrast-125"
        />
      </div>
    );
  }
  return (
    <div
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center border border-line font-display text-xs text-ink-dim"
    >
      {project.name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function NodeCard({ project }: { project: Project }) {
  const idTag = `SUBJ-${project.id.slice(0, 3).toUpperCase()}`;

  return (
    <div className="group relative border border-line bg-surface p-5 transition-colors focus-within:border-ink-bright hover:border-ink-bright">
      <ScanBracket interactive tone="bright" />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <ProjectMark project={project} />
          <div>
            <p className="font-data text-[10px] tracking-[0.15em] text-ink-dim">{idTag}</p>
            <h3 className="mt-1 font-display text-lg text-ink-bright">{project.name}</h3>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span
            className={`border px-2 py-0.5 font-data text-[10px] tracking-wide ${
              project.tag === "PRIMARY"
                ? "border-ink-bright text-ink-bright"
                : "border-line text-ink-dim"
            }`}
          >
            {project.tag}
          </span>
          {project.ai && (
            <span className="border border-line px-2 py-0.5 font-data text-[10px] tracking-wide text-ink-dim">
              AI
            </span>
          )}
        </div>
      </div>

      <p className="mt-3 font-prose text-sm leading-relaxed text-ink">{project.description}</p>

      <dl className="mt-4 space-y-1 border-t border-line pt-3 font-data text-[11px]">
        <div className="readout-row">
          <dt className="text-ink-dim">EMPLOYER</dt>
          <dd className="text-ink">{project.employer}</dd>
        </div>
        <div className="readout-row">
          <dt className="text-ink-dim">TYPE</dt>
          <dd className="text-right text-ink">{project.type}</dd>
        </div>
        <div className="readout-row">
          <dt className="text-ink-dim">STACK</dt>
          <dd className="text-right text-ink">{project.stack.join(" · ")}</dd>
        </div>
        <div className="readout-row">
          <dt className="text-ink-dim">STATUS</dt>
          <dd className="text-ink-bright">{project.status}</dd>
        </div>
      </dl>
    </div>
  );
}
