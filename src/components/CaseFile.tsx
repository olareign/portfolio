import Image from "next/image";
import type { Project } from "@/content";
import { EMPLOYER_TONE, STATUS_TONE } from "@/lib/project-tones";
import { Modal } from "./Modal";
import { ProjectMark } from "./ProjectMark";

interface CaseFileProps {
  project: Project | null;
  onClose: () => void;
}

/** Full record for one project: what it is, the subject's role, outcomes and where to see it. */
export function CaseFile({ project, onClose }: CaseFileProps) {
  if (!project) return null;
  const status = STATUS_TONE[project.status];
  const employer = EMPLOYER_TONE[project.employer];

  return (
    <Modal
      open
      onClose={onClose}
      titleId="case-file-heading"
      title={`CASE FILE · ${project.name.toUpperCase()}`}
      widthClassName="max-w-2xl"
    >
      {project.preview && (
        <div className="relative mb-5 aspect-[16/10] overflow-hidden border border-line">
          <Image
            src={project.preview}
            alt={`${project.name} screenshot`}
            fill
            sizes="(min-width: 768px) 640px, 100vw"
            className="object-cover object-top"
          />
        </div>
      )}

      <div className="flex items-start gap-3">
        <ProjectMark project={project} large />
        <div>
          <p className="font-data text-[11px] tracking-[0.12em] text-ink-dim">{project.type}</p>
          <p className="mt-1 font-prose text-sm leading-relaxed text-ink">{project.description}</p>
        </div>
      </div>

      <dl className="mt-5 space-y-1.5 border-t border-line pt-4 font-data text-[11px]">
        <div className="readout-row">
          <dt className="text-ink-dim">ROLE</dt>
          <dd className="text-right text-ink-bright">{project.role}</dd>
        </div>
        <div className="readout-row">
          <dt className="text-ink-dim">EMPLOYER</dt>
          <dd className={employer.text}>{project.employer}</dd>
        </div>
        <div className="readout-row">
          <dt className="text-ink-dim">STATUS</dt>
          <dd className={status.text}>● {project.status}</dd>
        </div>
        {project.ai && (
          <div className="readout-row">
            <dt className="text-ink-dim">CLASSIFICATION</dt>
            <dd className="text-accent-blue">AI-INTEGRATED</dd>
          </div>
        )}
      </dl>

      {project.highlights && project.highlights.length > 0 && (
        <div className="mt-5">
          <p className="font-data text-[11px] tracking-[0.15em] text-accent-amber">FINDINGS</p>
          <ul className="mt-2 space-y-1.5">
            {project.highlights.map((item) => (
              <li key={item} className="flex gap-2 font-prose text-sm leading-relaxed text-ink">
                <span className="text-accent-amber" aria-hidden>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5">
        <p className="font-data text-[11px] tracking-[0.15em] text-accent-amber">STACK</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="border border-line bg-void/60 px-2 py-0.5 font-data text-[11px] text-ink">
              {tech}
            </li>
          ))}
        </ul>
      </div>

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block border border-accent-amber bg-accent-amber px-5 py-2.5 font-data text-xs font-bold tracking-wide text-void transition-colors hover:bg-transparent hover:text-accent-amber"
        >
          VISIT {new URL(project.url).hostname.toUpperCase()} ↗
        </a>
      )}
    </Modal>
  );
}
