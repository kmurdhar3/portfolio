import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.profile.name} — ${site.profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function photoDataUrl() {
  "use cache";
  cacheLife("max");
  const photo = await readFile(path.join(process.cwd(), "public", "me.jpg"));
  return `data:image/jpeg;base64,${photo.toString("base64")}`;
}

export default async function OpengraphImage() {
  const { profile } = site;
  const photoSrc = await photoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0b0c0b",
          color: "#ecece7",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1, paddingRight: 48 }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#4ade80",
            }}
          >
            {profile.role}
          </div>
          <div style={{ display: "flex", fontSize: 68, fontWeight: 700, marginTop: 28, lineHeight: 1.05 }}>
            {profile.name}
          </div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 28, color: "#c9cbc2", lineHeight: 1.3 }}>
            {profile.headline}
          </div>
          <div style={{ display: "flex", marginTop: "auto", fontSize: 22, color: "#a3a59c" }}>
            {profile.status}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img
          src={photoSrc}
          alt=""
          width={340}
          height={340}
          style={{ borderRadius: 32, objectFit: "cover", alignSelf: "center", border: "4px solid #4ade80" }}
        />
      </div>
    ),
    size,
  );
}
