import type { Project } from "@/content";

/** Filter ids the project list understands; shared with the command console. */
export type ProjectFilterId = "all" | Project["employer"] | "ai";

export const PROJECT_FILTER_EVENT = "soi:project-filter";

/** Asks the project list to switch filter (dispatched by the command console). */
export function requestProjectFilter(filter: ProjectFilterId) {
  window.dispatchEvent(new CustomEvent<ProjectFilterId>(PROJECT_FILTER_EVENT, { detail: filter }));
}

export const OPEN_CONSOLE_EVENT = "soi:open-console";

/** Opens the command console (dispatched by the HUD button). */
export function requestConsole() {
  window.dispatchEvent(new Event(OPEN_CONSOLE_EVENT));
}
