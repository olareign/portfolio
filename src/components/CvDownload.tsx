"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/content";
import { Modal } from "./Modal";

type Status = "idle" | "loading" | "error";

export function CvDownload() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"description" | "link">("description");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) textareaRef.current?.focus();
  }, [open]);

  async function submit() {
    setStatus("loading");
    setError(null);
    try {
      const body =
        mode === "link" ? { jobUrl: jobUrl.trim() } : { jobDescription: jobDescription.trim() };
      const res = await fetch("/api/tailor-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Something went wrong." }));
        throw new Error(data.error || "Something went wrong.");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "olareign-cv-tailored.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setStatus("idle");
      setOpen(false);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const canSubmit =
    status !== "loading" &&
    (mode === "link" ? jobUrl.trim().length > 0 : jobDescription.trim().length > 20);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <a
          href="#dossier"
          className="border border-ink-bright px-5 py-2.5 font-data text-xs tracking-wide text-ink-bright transition-colors hover:bg-ink-bright hover:text-void"
        >
          OPEN DOSSIER
        </a>
        <a
          href={profile.cvUrl}
          download
          className="border border-line px-5 py-2.5 font-data text-xs tracking-wide text-ink transition-colors hover:border-ink-bright hover:text-ink-bright"
        >
          DOWNLOAD CV
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border border-line px-5 py-2.5 font-data text-xs tracking-wide text-ink transition-colors hover:border-ink-bright hover:text-ink-bright"
        >
          PERSONALIZE FOR A ROLE
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} titleId="tailor-cv-heading" title="PERSONALIZE CV">
        <p className="font-prose text-xs text-ink-dim">
          Paste a job description or link. An AI re-emphasizes real experience from the actual CV
          to match it — it never invents new skills or history.
        </p>

        <div className="mt-4 flex gap-2 font-data text-[11px] tracking-wide">
          <button
            type="button"
            onClick={() => setMode("description")}
            className={`border px-3 py-1.5 ${mode === "description" ? "border-ink-bright text-ink-bright" : "border-line text-ink-dim"}`}
          >
            JOB DESCRIPTION
          </button>
          <button
            type="button"
            onClick={() => setMode("link")}
            className={`border px-3 py-1.5 ${mode === "link" ? "border-ink-bright text-ink-bright" : "border-line text-ink-dim"}`}
          >
            JOB LINK
          </button>
        </div>

        <div className="mt-3">
          {mode === "description" ? (
            <textarea
              ref={textareaRef}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the job description here…"
              rows={6}
              className="w-full border border-line bg-void p-3 font-prose text-sm text-ink outline-none focus-visible:border-ink-bright"
            />
          ) : (
            <input
              type="url"
              value={jobUrl}
              onChange={(e) => setJobUrl(e.target.value)}
              placeholder="https://…"
              className="w-full border border-line bg-void p-3 font-prose text-sm text-ink outline-none focus-visible:border-ink-bright"
            />
          )}
        </div>

        {error && <p className="mt-3 font-data text-xs text-accent-red">{error}</p>}

        <div className="mt-4 flex items-center justify-between">
          <p className="font-data text-[11px] text-ink-dim">
            {status === "loading" ? "● ANALYZING JOB…" : ""}
          </p>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={submit}
            className="border border-ink-bright px-5 py-2 font-data text-xs tracking-wide text-ink-bright transition-colors hover:bg-ink-bright hover:text-void disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === "loading" ? "GENERATING…" : "GENERATE TAILORED CV"}
          </button>
        </div>
      </Modal>
    </>
  );
}
