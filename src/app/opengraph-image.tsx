import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, projects } from "@/content";

export const dynamic = "force-static";
export const alt = `${profile.handle} — Subject of Interest`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the site's dark theme tokens (src/app/globals.css).
const VOID = "#05070d";
const LINE = "#1a2231";
const INK = "#bcc5d6";
const INK_DIM = "#7a869c";
const AMBER = "#f5b82e";
const BLUE = "#4aa8ff";
const GREEN = "#3ddc97";

function toDataUri(data: string) {
  return `data:image/png;base64,${data}`;
}

function Corner({ top, left }: { top: boolean; left: boolean }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 26,
        height: 26,
        [top ? "top" : "bottom"]: -2,
        [left ? "left" : "right"]: -2,
        [top ? "borderTop" : "borderBottom"]: `3px solid ${AMBER}`,
        [left ? "borderLeft" : "borderRight"]: `3px solid ${AMBER}`,
      }}
    />
  );
}

export default async function Image() {
  // Literal paths, so the bundler traces just these two files rather than the whole project.
  const [headshot, logo] = (
    await Promise.all([
      readFile(join(process.cwd(), "public/headshot.png"), "base64"),
      readFile(join(process.cwd(), "public/logos/olareign-dark.png"), "base64"),
    ])
  ).map(toDataUri);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `radial-gradient(70% 90% at 0% 0%, rgba(74,168,255,0.22), transparent 70%), radial-gradient(60% 80% at 100% 100%, rgba(245,184,46,0.16), transparent 70%), ${VOID}`,
          color: INK,
          padding: "52px 60px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: 48 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
            <span style={{ color: AMBER }}>{profile.subjectId}</span>
            <span style={{ color: BLUE }}>● ANALYZING</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: AMBER, fontSize: 24, letterSpacing: 4, marginBottom: 18 }}>● SUBJECT IDENTIFIED</span>
            <span style={{ color: "#ffffff", fontSize: 66, fontWeight: 700, lineHeight: 1.05 }}>{profile.name}</span>
            <span style={{ color: INK, fontSize: 27, marginTop: 22 }}>{profile.positioning}</span>
            <span style={{ color: INK_DIM, fontSize: 22, marginTop: 12 }}>
              {projects.length} projects on file · <span style={{ color: GREEN, marginLeft: 10 }}>open to work</span>
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", borderTop: `1px solid ${LINE}`, paddingTop: 22 }}>
            <img src={logo} height={30} alt="" />
          </div>
        </div>

        <div style={{ display: "flex", position: "relative", width: 330, height: 440, alignSelf: "center", border: `1px solid ${LINE}` }}>
          <img src={headshot} width={330} height={440} style={{ objectFit: "cover" }} alt="" />
          <Corner top left />
          <Corner top left={false} />
          <Corner top={false} left />
          <Corner top={false} left={false} />
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 92,
              background: AMBER,
              color: VOID,
              fontSize: 16,
              fontWeight: 700,
              padding: "3px 8px",
              letterSpacing: 2,
            }}
          >
            {`${profile.handle.toUpperCase()} · LOCKED`}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
