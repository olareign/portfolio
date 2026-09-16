import { contact, books } from "@/content";
import { BookSlider } from "./BookSlider";

export function Contact({ num }: { num: number }) {
  return (
    <section id="contact" className="border-b border-line py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="font-data text-xs tracking-[0.2em] text-ink-dim">
            {String(num).padStart(2, "0")}
          </p>
          <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">
            ESTABLISH CONTACT
          </h2>

          <div className="mt-8 max-w-lg divide-y divide-line font-data text-sm">
            <div className="readout-row py-3">
              <span className="text-ink-dim">EMAIL</span>
              <a href={`mailto:${contact.email}`} className="text-ink-bright hover:underline">
                {contact.email}
              </a>
            </div>
            <div className="readout-row py-3">
              <span className="text-ink-dim">PHONE</span>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="text-ink-bright hover:underline"
              >
                {contact.phone}
              </a>
            </div>
            <div className="readout-row py-3">
              <span className="text-ink-dim">LINKEDIN</span>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-ink-bright hover:underline"
              >
                in/abdulrasaq-taofeeq-olarewaju
              </a>
            </div>
            <div className="readout-row py-3">
              <span className="text-ink-dim">GITHUB</span>
              <a
                href={contact.github}
                target="_blank"
                rel="noreferrer"
                className="text-ink-bright hover:underline"
              >
                github.com/olareign
              </a>
            </div>
          </div>

          <a
            href={`mailto:${contact.email}`}
            className="mt-8 inline-block border border-ink-bright px-5 py-2.5 font-data text-xs tracking-wide text-ink-bright transition-colors hover:bg-ink-bright hover:text-void"
          >
            OPEN CHANNEL
          </a>
        </div>

        {books.length > 0 && <BookSlider />}
      </div>
    </section>
  );
}
