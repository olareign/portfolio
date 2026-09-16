import { profile } from "@/content";
import { ScanBracket } from "./ScanBracket";
import { WireframeObjectLoader } from "./wireframe/WireframeObjectLoader";
import { SubjectLockSequence } from "./SubjectLockSequence";
import { CvDownload } from "./CvDownload";

export function Hero() {
  return (
    <section id="hero" className="relative grid gap-10 border-b border-line pb-16 pt-10 sm:pt-16 lg:grid-cols-[1fr_320px] lg:gap-6">
      <div className="relative">
        <p className="mb-4 font-data text-xs tracking-[0.2em] text-ink-dim">
          ● SUBJECT IDENTIFIED
        </p>

        <div className="relative inline-block pl-2 pr-4 pt-2">
          <ScanBracket tone="bright" />
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

        <div className="mt-8">
          <CvDownload />
        </div>
      </div>

      <div className="h-56 w-full opacity-80 lg:h-full" aria-hidden>
        <WireframeObjectLoader />
      </div>

      <SubjectLockSequence />
    </section>
  );
}
