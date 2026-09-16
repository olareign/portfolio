"use client";

import { useId, useState } from "react";
import type { Certification } from "@/content";
import { Modal } from "./Modal";

export function CertificatePreview({ certification }: { certification: Certification }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-left font-data text-sm text-ink-bright underline decoration-line underline-offset-4 transition-colors hover:decoration-ink-bright"
      >
        {certification.name}
      </button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        titleId={titleId}
        title={certification.name.toUpperCase()}
        widthClassName="max-w-3xl"
      >
        <div className="h-[70vh] border border-line bg-void">
          <iframe
            src={certification.fileUrl}
            title={`${certification.name} certificate`}
            className="h-full w-full"
          />
        </div>
        <div className="mt-3 flex gap-3">
          <a
            href={certification.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="border border-line px-4 py-2 font-data text-xs tracking-wide text-ink transition-colors hover:border-ink-bright hover:text-ink-bright"
          >
            OPEN IN NEW TAB
          </a>
          <a
            href={certification.fileUrl}
            download
            className="border border-line px-4 py-2 font-data text-xs tracking-wide text-ink transition-colors hover:border-ink-bright hover:text-ink-bright"
          >
            DOWNLOAD
          </a>
        </div>
      </Modal>
    </>
  );
}
