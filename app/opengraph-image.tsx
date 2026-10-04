import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";
import { hero } from "@/content/home";
import { richTextToString } from "@/components/ui/RichText";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  // Satori can't read WebP; use a PNG copy of the hero portrait.
  const portrait = await readFile(join(process.cwd(), "public/images/og-portrait.png"));
  const src = `data:image/png;base64,${portrait.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "radial-gradient(60% 70% at 0% 0%, #4a7af5 0%, #0355e2 35%, #011128 75%)",
          color: "#cbe4ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 80px", width: 680 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase" }}>{hero.eyebrow.join(" · ")}</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.1, marginTop: 28 }}>{richTextToString(hero.title)}</div>
          <div style={{ fontSize: 30, marginTop: 36, color: "#ffffff" }}>{site.name}</div>
          <div style={{ width: 80, height: 6, borderRadius: 3, background: "#ffbd42", marginTop: 20 }} />
        </div>
        <img src={src} width={520} height={512} style={{ position: "absolute", right: 0, bottom: 0 }} alt="" />
      </div>
    ),
    size,
  );
}
