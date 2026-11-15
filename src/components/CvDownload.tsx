import { profile } from "@/content";

const SECONDARY_CTA =
  "border border-line bg-void/80 px-5 py-2.5 font-data text-xs tracking-wide text-ink transition-colors hover:border-accent-blue hover:text-accent-blue";

export function CvDownload() {
  return (
    <div className="flex flex-wrap gap-3">
      <a
        href="#dossier"
        className="border border-accent-amber bg-accent-amber px-5 py-2.5 font-data text-xs font-bold tracking-wide text-void transition-colors hover:bg-transparent hover:text-accent-amber"
      >
        OPEN DOSSIER
      </a>
      <a href={profile.cvUrl} download className={SECONDARY_CTA}>
        DOWNLOAD CV
      </a>
      <a href={profile.cvBuilderUrl} target="_blank" rel="noreferrer" className={SECONDARY_CTA}>
        PERSONALIZE FOR A ROLE ↗
      </a>
    </div>
  );
}
