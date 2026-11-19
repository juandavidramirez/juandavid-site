import type { MetadataRoute } from "next";
import { site } from "@/content/es/site";
import { toEnglishPath } from "@/lib/i18n";

// Spanish URLs of every public page; the English version is derived (/en, /en/research…).
const routes = ["/", "/contact", "/investigacion"];

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => new URL(path, site.url).toString();
  return routes.flatMap((path) => {
    const languages = { es: abs(path), en: abs(toEnglishPath(path)) };
    const priority = path === "/" ? 1 : 0.6;
    return [
      { url: languages.es, changeFrequency: "monthly" as const, priority, alternates: { languages } },
      { url: languages.en, changeFrequency: "monthly" as const, priority, alternates: { languages } },
    ];
  });
}
