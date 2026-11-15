"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { contact, profile, projects } from "@/content";
import { OPEN_CONSOLE_EVENT, requestProjectFilter, type ProjectFilterId } from "@/lib/events";
import { sections } from "@/lib/sections";
import { toggleTheme } from "@/lib/theme";

interface Command {
  id: string;
  group: "GO TO" | "FILTER ENTITIES" | "ACTIONS";
  label: string;
  run: () => void | Promise<void>;
}

function goTo(id: string) {
  document.getElementById(id)?.scrollIntoView();
}

function openExternal(url: string) {
  window.open(url, "_blank", "noreferrer");
}

function buildCommands(): Command[] {
  const employers = [...new Set(projects.map((p) => p.employer))];
  const filters: Array<{ id: ProjectFilterId; label: string }> = [
    { id: "all", label: "All projects" },
    ...employers.map((employer) => ({ id: employer, label: `${employer} projects` })),
    { id: "ai", label: "AI-integrated projects" },
  ];

  return [
    ...sections.map(
      (section): Command => ({
        id: `goto-${section.id}`,
        group: "GO TO",
        label: section.label,
        run: () => goTo(section.id),
      })
    ),
    ...filters.map(
      (filter): Command => ({
        id: `filter-${filter.id}`,
        group: "FILTER ENTITIES",
        label: filter.label,
        run: () => {
          requestProjectFilter(filter.id);
          goTo("nodes");
        },
      })
    ),
    { id: "copy-email", group: "ACTIONS", label: "Copy email address", run: () => navigator.clipboard.writeText(contact.email) },
    { id: "theme", group: "ACTIONS", label: "Toggle light / dark", run: toggleTheme },
    { id: "cv", group: "ACTIONS", label: "Download CV", run: () => openExternal(profile.cvUrl) },
    { id: "dosinex", group: "ACTIONS", label: "Open Dosinex", run: () => openExternal(profile.cvBuilderUrl) },
    { id: "github", group: "ACTIONS", label: "Open GitHub", run: () => openExternal(contact.github) },
    { id: "linkedin", group: "ACTIONS", label: "Open LinkedIn", run: () => openExternal(contact.linkedin) },
  ];
}

const commands = buildCommands();

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName));
}

/** Keyboard-first console: ⌘K / Ctrl+K or "/" opens it, type to narrow, Enter to run. */
export function CommandConsole() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return commands;
    return commands.filter((c) => `${c.group} ${c.label}`.toLowerCase().includes(needle));
  }, [query]);

  useEffect(() => {
    function show() {
      setQuery("");
      setCursor(0);
      setOpen(true);
    }
    function onKey(event: KeyboardEvent) {
      const shortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      const slash = event.key === "/" && !isTypingTarget(event.target);
      if (shortcut || slash) {
        event.preventDefault();
        show();
      }
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_CONSOLE_EVENT, show);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_CONSOLE_EVENT, show);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  if (!open) return null;

  function run(command: Command | undefined) {
    if (!command) return;
    setOpen(false);
    void command.run();
  }

  function onKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") setOpen(false);
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      setCursor((c) => Math.min(c + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      run(matches[cursor]);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-void/85 px-4 pt-[14vh]"
      onClick={(event) => {
        if (event.target === event.currentTarget) setOpen(false);
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command console"
        className="w-full max-w-lg border border-accent-amber bg-surface"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 font-data text-sm">
          <span className="text-accent-amber" aria-hidden>
            &gt;
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setCursor(0);
            }}
            placeholder="Ask the Machine — try “entities”, “copy”, “dark”"
            aria-label="Command"
            className="w-full bg-transparent text-ink-bright outline-none placeholder:text-ink-dim focus-visible:shadow-none"
          />
        </div>

        <ul className="max-h-[50vh] overflow-y-auto py-1" role="listbox" aria-label="Commands">
          {matches.length === 0 && (
            <li className="px-4 py-3 font-data text-xs text-ink-dim">NO MATCHING COMMAND</li>
          )}
          {matches.map((command, i) => {
            const selected = i === cursor;
            return (
              <li key={command.id} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => run(command)}
                  onMouseEnter={() => setCursor(i)}
                  className={`flex w-full items-center justify-between gap-3 px-4 py-2 text-left font-data text-xs focus-visible:shadow-none ${
                    selected ? "bg-accent-amber text-void" : "text-ink"
                  }`}
                >
                  <span>{command.label}</span>
                  <span className={`text-[10px] tracking-[0.12em] ${selected ? "text-void/70" : "text-ink-dim"}`}>
                    {command.group}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <p className="border-t border-line px-4 py-2 font-data text-[10px] tracking-wide text-ink-dim">
          ↑↓ SELECT · ENTER RUN · ESC CLOSE
        </p>
      </div>
    </div>,
    document.body
  );
}
