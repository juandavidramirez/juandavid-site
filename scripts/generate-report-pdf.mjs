#!/usr/bin/env node
/**
 * Genera el PDF descargable del reporte de investigación a partir de /investigacion/pdf.
 *
 * Uso (con el sitio corriendo, en local o en producción):
 *   npm run report:pdf                         → usa http://localhost:3000
 *   npm run report:pdf -- http://localhost:3002
 *
 * Salida: public/files/Reporte_Bridging_the_Skill_Gap_Juan_David_Ramirez.pdf
 * Requiere Google Chrome (o Chromium). Ruta configurable con CHROME_PATH.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const url = `${base}/investigacion/pdf`;
// Archivo real; los botones lo enlazan como /docs/... para contar descargas (app/docs/[file]/route.ts).
const out = join(root, "public", "files", "Reporte_Bridging_the_Skill_Gap_Juan_David_Ramirez.pdf");

const candidates = [
  process.env.CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("No encontré Chrome. Define CHROME_PATH con la ruta del ejecutable.");
  process.exit(1);
}

// Comprueba que la página responde antes de imprimir.
try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
} catch (err) {
  console.error(`No pude abrir ${url} (${err.message}). ¿Está corriendo el sitio?`);
  process.exit(1);
}

mkdirSync(dirname(out), { recursive: true });
execFileSync(
  chrome,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=20000",
    `--print-to-pdf=${out}`,
    url,
  ],
  { stdio: ["ignore", "ignore", "inherit"] },
);

const kb = Math.round(statSync(out).size / 1024);
console.log(`PDF generado: ${out} (${kb} KB)`);
