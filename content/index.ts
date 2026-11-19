import * as es from "./es";
import * as en from "./en";

/**
 * Site languages. Spanish is the default and lives at unprefixed URLs (/ , /investigacion);
 * English lives under /en (/en, /en/research). See proxy.ts and lib/i18n.ts.
 */
export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export type Content = typeof es;

// The annotation makes TypeScript check that the English content has exactly the Spanish shape:
// a missing text in content/en/* fails the build.
const dictionaries: Record<Locale, Content> = { es, en };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function getContent(lang: string): Content {
  return dictionaries[isLocale(lang) ? lang : defaultLocale];
}
