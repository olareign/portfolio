import Image from "next/image";
import { profile } from "@/content";

export function Footer() {
  const timestamp = new Date().toISOString().replace("T", " ").slice(0, 19);

  return (
    <footer className="flex flex-col items-center justify-between gap-4 px-4 py-6 font-data text-[11px] tracking-wide text-ink-dim sm:flex-row sm:px-10">
      <span>{profile.subjectId}</span>
      <div className="h-6">
        <Image
          src="/logos/olareign-dark.png"
          alt={profile.handle}
          width={323}
          height={154}
          className="theme-logo-dark h-6 w-auto"
        />
        <Image
          src="/logos/olareign-light.png"
          alt={profile.handle}
          width={325}
          height={154}
          className="theme-logo-light h-6 w-auto"
        />
      </div>
      <span>END OF FILE</span>
      <span aria-hidden>{timestamp} UTC</span>
    </footer>
  );
}
