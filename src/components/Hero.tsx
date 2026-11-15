import { profile, stack } from "@/content";
import { ScanBracket } from "./ScanBracket";
import { SubjectFeed } from "./SubjectFeed";
import { FocusCycler } from "./FocusCycler";
import { SubjectLockSequence } from "./SubjectLockSequence";
import { CvDownload } from "./CvDownload";

// "(learning)" entries stay in the capabilities table; the hero only cycles what's used in production.
const focusItems = stack.flatMap((group) => group.items).filter((item) => !item.includes("(learning)"));

export function Hero() {
  return (
    <section
      id="hero"
      className="relative grid items-center gap-10 border-b border-line pb-16 pt-10 sm:pt-16 lg:grid-cols-[1fr_320px] lg:gap-10"
    >
      <div className="relative">
        <p className="mb-4 font-data text-xs tracking-[0.2em] text-accent-amber">
          ● SUBJECT IDENTIFIED
        </p>

        <div className="relative inline-block pl-2 pr-4 pt-2">
          <ScanBracket tone="relevant" />
          <h1 className="max-w-3xl font-display text-[clamp(2rem,7vw,5rem)] leading-[1.05] text-ink-bright">
            {profile.name}
          </h1>
        </div>

        <p className="mt-6 max-w-xl font-data text-sm text-ink sm:text-base">
          {profile.positioning}
        </p>
        <p className="mt-1 font-data text-xs text-ink-dim">
          {profile.location} · {profile.availability}
        </p>

        <div className="mt-5">
          <FocusCycler items={focusItems} />
        </div>

        <div className="mt-8">
          <CvDownload />
        </div>
      </div>

      <SubjectFeed />

      <SubjectLockSequence />
    </section>
  );
}
