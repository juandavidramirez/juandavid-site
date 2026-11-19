import type { Locale } from "@/content";

/**
 * Language routing shared by proxy.ts and the language switcher.
 *
 * Public URLs:  Spanish  /            /contact     /investigacion      /investigacion/pdf
 *               English  /en          /en/contact  /en/research        /en/research/pdf
 * Internally every page lives in app/[lang]/… with the Spanish folder names
 * (/en/research is rewritten to /en/investigacion).
 */

export const LOCALE_COOKIE = "jd-lang";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Spanish segment → English public segment (only pages whose name changes). */
const SLUGS: [es: string, en: string][] = [["/investigacion", "/research"]];

function swapPrefix(path: string, from: string, to: string) {
  return path === from || path.startsWith(`${from}/`) ? to + path.slice(from.length) : null;
}

/** "/investigacion/pdf" → "/en/research/pdf"; "/" → "/en". */
export function toEnglishPath(spanishPath: string) {
  let rest = spanishPath || "/";
  for (const [es, en] of SLUGS) rest = swapPrefix(rest, es, en) ?? rest;
  return rest === "/" ? "/en" : `/en${rest}`;
}

/** "/en/research" → "/investigacion"; "/en" → "/". */
export function toSpanishPath(englishPath: string) {
  let rest = englishPath.replace(/^\/en(?=\/|$)/, "") || "/";
  for (const [es, en] of SLUGS) rest = swapPrefix(rest, en, es) ?? rest;
  return rest;
}

/** Public English path → internal route ("/en/research" → "/en/investigacion"). */
export function englishToInternal(englishPath: string) {
  let rest = englishPath.replace(/^\/en(?=\/|$)/, "") || "/";
  for (const [es, en] of SLUGS) rest = swapPrefix(rest, en, es) ?? rest;
  return rest === "/" ? "/en" : `/en${rest}`;
}

export function localeOfPath(path: string): Locale {
  return /^\/en(\/|$)/.test(path) ? "en" : "es";
}

/** The same page in the other language. */
export function alternatePath(path: string, target: Locale) {
  const current = localeOfPath(path);
  if (current === target) return path;
  return target === "en" ? toEnglishPath(path) : toSpanishPath(path);
}

/**
 * Picks es/en from an Accept-Language header: the first of the two in the person's order of preference.
 * Any other language (or none) falls back to Spanish.
 */
export function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return "es";
  const langs = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().toLowerCase().split(";");
      const q = Number(params.find((p) => p.trim().startsWith("q="))?.split("=")[1] ?? 1);
      return { primary: tag.split("-")[0], q: Number.isNaN(q) ? 0 : q };
    })
    .filter((l) => l.q > 0)
    .sort((a, b) => b.q - a.q);
  const hit = langs.find((l) => l.primary === "en" || l.primary === "es");
  return hit?.primary === "en" ? "en" : "es";
}
