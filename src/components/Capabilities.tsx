import { stack, stats } from "@/content";
import { SkillsNetwork } from "./SkillsNetwork";
import { StatCounter } from "./StatCounter";

export function Capabilities({ num }: { num: number }) {
  return (
    <section id="capabilities" className="reveal border-b border-line py-16">
      <p className="font-data text-xs tracking-[0.2em] text-accent-amber">{String(num).padStart(2, "0")}</p>
      <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">
        DETECTED CAPABILITIES
      </h2>

      <div className="reading-panel mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {stack.map((group) => (
          <div key={group.label}>
            <p className="font-data text-xs tracking-[0.15em] text-accent-blue">{group.label}</p>
            <ul className="mt-2 space-y-1">
              {group.items.map((item) => (
                <li key={item} className="font-data text-sm text-ink-bright">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <SkillsNetwork />

      <div className="reading-panel mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <StatCounter key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}
