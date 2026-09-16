import Image from "next/image";
import { bio, certifications } from "@/content";
import { CertificatePreview } from "./CertificatePreview";
import { ScanBracket } from "./ScanBracket";

export function Dossier({ num }: { num: number }) {
  return (
    <section id="dossier" className="border-b border-line py-16">
      <p className="font-data text-xs tracking-[0.2em] text-ink-dim">{String(num).padStart(2, "0")}</p>
      <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">SUBJECT FILE</h2>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_260px]">
        <div className="max-w-[70ch] space-y-4">
          {bio.paragraphs.map((p) => (
            <p key={p} className="font-prose text-sm leading-relaxed text-ink sm:text-base">
              {p}
            </p>
          ))}
        </div>

        <div className="space-y-6">
          <div className="relative w-full max-w-[200px]">
            <ScanBracket tone="bright" />
            <Image
              src="/headshot.png"
              alt="Abdulrasaq Taofeeq Olarewaju"
              width={200}
              height={264}
              className="w-full grayscale contrast-110"
            />
            <p className="mt-2 font-data text-[10px] tracking-[0.2em] text-ink-dim">
              SUBJ-0x88 · VISUAL RECORD
            </p>
          </div>
          <div>
            <p className="font-data text-xs tracking-[0.15em] text-ink-dim">CERTIFICATIONS</p>
            <ul className="mt-2 space-y-1">
              {certifications.map((c) => (
                <li key={c.name}>
                  <CertificatePreview certification={c} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-data text-xs tracking-[0.15em] text-ink-dim">EDUCATION</p>
            <p className="mt-2 font-data text-sm text-ink-bright">{bio.education}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
