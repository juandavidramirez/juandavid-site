import type { Locale } from "@/content";
import { alternatePath } from "./i18n";

/**
 * Canonical + hreflang for a page. `spanishPath` is the page's Spanish URL ("/", "/investigacion").
 * Each version declares itself canonical and points to the other language.
 */
export function languageAlternates(lang: string, spanishPath: string) {
  const es = spanishPath;
  const en = alternatePath(spanishPath, "en");
  return {
    canonical: (lang as Locale) === "en" ? en : es,
    languages: { es, en, "x-default": es },
  };
}
