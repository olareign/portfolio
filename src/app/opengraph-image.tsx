import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile, contact } from "@/content";

export const dynamic = "force-static";
export const alt = `${profile.handle} — Subject of Interest`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "src/assets/og-logo-light.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFFFFF",
          color: "#3A3A3A",
          padding: "56px 64px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
          <span style={{ color: "#000000" }}>{profile.subjectId}</span>
          <span style={{ color: "#8A8A8A" }}>● ANALYZING</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ color: "#8A8A8A", fontSize: 24, letterSpacing: 4, marginBottom: 16 }}>
            ● SUBJECT IDENTIFIED
          </span>
          <span
            style={{
              color: "#000000",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
            }}
          >
            {profile.name}
          </span>
          <span style={{ color: "#3A3A3A", fontSize: 30, marginTop: 24 }}>
            {profile.positioning}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#8A8A8A",
            borderTop: "1px solid #E2E2E2",
            paddingTop: 24,
          }}
        >
          <img src={logoSrc} height={28} alt="" />
          <span>{contact.github.replace("https://", "")}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
