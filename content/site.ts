import type { NavItem, SocialLink, CTA } from "./types";
import { externalLinks, internalLinks } from "./links";

/**
 * Global, cross-page content: brand, navigation, socials, footer, SEO.
 * Edit freely — no component changes required.
 */

export const site = {
  /**
   * Used for canonical URLs, sitemap and Open Graph.
   * Priority: NEXT_PUBLIC_SITE_URL (custom domain) → Vercel production URL → localhost.
   */
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),
  locale: "es_CO",
  lang: "es",
  name: "Juan David Ramírez",
  title: "Juan David Ramírez · Tecnología con propósito",
  description:
    "Diseño estrategias de IA, lidero procesos de innovación y formo equipos, para que empresas y personas adopten la tecnología con criterio y la usen a su favor.",
  /** Wordmark: first segment SemiBold, second Light (Montserrat). */
  brand: { primary: "JuanDavid", secondary: "Ramírez" },
  twitterHandle: undefined as string | undefined,
};

export const navigation: {
  /** Destination of the wordmark (navbar and footer). */
  home: string;
  items: NavItem[];
  cta: CTA;
  languages: { label: string; href?: string; active?: boolean }[];
  menuLabel: string;
  closeLabel: string;
} = {
  home: internalLinks.home,
  items: [
    { label: "Sobre mí", href: internalLinks.sections.purpose },
    { label: "Mi impacto", href: internalLinks.sections.impact },
    { label: "Mi trabajo", href: internalLinks.sections.areas },
    { label: "Blog", href: internalLinks.sections.blog },
    { label: "Contacto", href: internalLinks.sections.contact },
  ],
  cta: { label: "Hablemos", href: internalLinks.contactForm, variant: "primary" },
  // Without an `href` a language is rendered as unavailable (no broken link).
  languages: [
    { label: "Es", active: true },
    { label: "En" },
  ],
  menuLabel: "Abrir menú",
  closeLabel: "Cerrar menú",
};

export const social: SocialLink[] = [
  { network: "linkedin", label: "LinkedIn", href: externalLinks.linkedin },
  { network: "instagram", label: "Instagram", href: externalLinks.instagram },
  { network: "substack", label: "Substack", href: externalLinks.substackProfile },
];

export const footer = {
  brand: { primary: "JuanDavid", secondary: "Ramírez" }, // same as the header
  descriptor: "Tecnología · Impacto · Educación",
  links: navigation.items,
  statement: "Un futuro más humano es posible",
};
