import { contact, profile } from "@/content";
import { BookShelf } from "./BookShelf";
import { ContactForm } from "./ContactForm";

export function Contact({ num }: { num: number }) {
  return (
    <section id="contact" className="reveal border-b border-line py-16">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <div>
          <p className="font-data text-xs tracking-[0.2em] text-accent-amber">
            {String(num).padStart(2, "0")}
          </p>
          <h2 className="mt-1 font-display text-2xl text-ink-bright sm:text-3xl">
            ESTABLISH CONTACT
          </h2>

          <p className="mt-4 flex items-center gap-2 font-data text-xs text-accent-green">
            <span className="h-1.5 w-1.5 animate-pulse bg-accent-green motion-reduce:animate-none" aria-hidden />
            {profile.availability.toUpperCase()}
          </p>

          <div className="reading-panel mt-6 max-w-lg divide-y divide-line font-data text-sm">
            <div className="readout-row py-3">
              <span className="text-ink-dim">EMAIL</span>
              <a href={`mailto:${contact.email}`} className="text-ink-bright transition-colors hover:text-accent-amber">
                {contact.email}
              </a>
            </div>
            <div className="readout-row py-3">
              <span className="text-ink-dim">PHONE</span>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="text-ink-bright transition-colors hover:text-accent-amber"
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
                className="text-ink-bright transition-colors hover:text-accent-amber"
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
                className="text-ink-bright transition-colors hover:text-accent-amber"
              >
                github.com/olareign
              </a>
            </div>
          </div>

        </div>

        <ContactForm />
      </div>

      <BookShelf />
    </section>
  );
}
