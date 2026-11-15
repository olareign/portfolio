"use client";

import { useState } from "react";
import { contact, profile } from "@/content";

const FIELD =
  "mt-1.5 w-full border border-line bg-void p-3 font-prose text-sm text-ink outline-none transition-colors focus-visible:border-accent-amber";

/**
 * Composes the message in the visitor's own mail app. There is no mail backend on this site,
 * so nothing typed here is sent or stored until they press send in their mail client.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const ready = name.trim().length > 0 && message.trim().length > 0;

  function composeHref() {
    const subject = `Portfolio enquiry from ${name.trim()}`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message.trim())}`;
  }

  return (
    <form
      className="border border-line bg-surface/90 p-5"
      onSubmit={(event) => {
        event.preventDefault();
        if (ready) window.location.href = composeHref();
      }}
    >
      <p className="font-data text-xs tracking-[0.15em] text-accent-blue">TRANSMIT A MESSAGE</p>

      <label className="mt-4 block font-data text-[11px] tracking-[0.12em] text-ink-dim">
        YOUR NAME
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          required
          className={FIELD}
        />
      </label>

      <label className="mt-4 block font-data text-[11px] tracking-[0.12em] text-ink-dim">
        MESSAGE
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={5}
          required
          placeholder={`What would you like ${profile.handle} to build or join?`}
          className={FIELD}
        />
      </label>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-data text-[10px] tracking-wide text-ink-dim">OPENS IN YOUR MAIL APP — NOTHING IS STORED HERE</p>
        <button
          type="submit"
          disabled={!ready}
          className="border border-accent-amber bg-accent-amber px-5 py-2.5 font-data text-xs font-bold tracking-wide text-void transition-colors hover:bg-transparent hover:text-accent-amber disabled:cursor-not-allowed disabled:opacity-40"
        >
          OPEN CHANNEL ↗
        </button>
      </div>
    </form>
  );
}
