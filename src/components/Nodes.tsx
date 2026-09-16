import { projects } from "@/content";
import { NodeCard } from "./NodeCard";

export function Nodes({ num }: { num: number }) {
  return (
    <section id="nodes" className="border-b border-line py-16">
      <p className="font-data text-xs tracking-[0.2em] text-ink-dim">{String(num).padStart(2, "0")}</p>
      <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">
        ANALYZED ENTITIES
      </h2>
      <p className="mt-3 max-w-xl font-prose text-sm text-ink-dim">
        Projects flagged and processed. SafePick is the primary entity — owned end-to-end.
        Everything else is contributor work, tagged by employer.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <NodeCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
