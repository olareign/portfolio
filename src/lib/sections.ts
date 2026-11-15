import { articles } from "@/content";

export interface SiteSection {
  id: string;
  /** Short name used in the rail, mobile bar and console. */
  label: string;
  /** What the HUD reports while this section is on screen. */
  status: string;
}

const hasArchive = articles.length > 0;

/** Page sections in scroll order — the single list every navigation surface reads. */
export const sections: SiteSection[] = [
  { id: "hero", label: "SUBJECT", status: "SUBJECT IDENTIFIED" },
  { id: "timeline", label: "HISTORY", status: "REPLAYING HISTORY" },
  { id: "nodes", label: "ENTITIES", status: "ANALYZING ENTITIES" },
  { id: "capabilities", label: "CAPABILITIES", status: "MAPPING CAPABILITIES" },
  ...(hasArchive ? [{ id: "archive", label: "ARCHIVE", status: "READING ARCHIVE" }] : []),
  { id: "dossier", label: "FILE", status: "OPENING SUBJECT FILE" },
  { id: "contact", label: "CONTACT", status: "CHANNEL AVAILABLE" },
];
