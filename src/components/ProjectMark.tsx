import Image from "next/image";
import type { Project } from "@/content";

/** Project logo on a light tile (brand marks are drawn for light backgrounds), or an initials monogram. */
export function ProjectMark({ project, large = false }: { project: Project; large?: boolean }) {
  const box = large ? "h-12 w-12" : "h-9 w-9";
  if (project.logo) {
    return (
      <div className={`flex ${box} shrink-0 items-center justify-center border border-line bg-white`}>
        <Image
          src={project.logo}
          alt=""
          width={64}
          height={64}
          className={`${large ? "h-9 w-9" : "h-7 w-7"} object-contain`}
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
