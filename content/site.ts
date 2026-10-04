import type { NavItem, SocialLink, CTA } from "./types";

/**
 * Global, cross-page content: brand, navigation, socials, footer, SEO.
 * Edit freely — no component changes required.
 */

// TODO(Juan David): confirma estas URLs públicas.
export const SUBSTACK_URL = "https://juandavidramirez.substack.com";

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
  items: NavItem[];
  cta: CTA;
  languages: { label: string; href?: string; active?: boolean }[];
  menuLabel: string;
  closeLabel: string;
} = {
  items: [
    { label: "Sobre mi", href: "/#proposito" },
    { label: "Mi trabajo", href: "/#areas" },
    { label: "Blog", href: "/#blog" },
    { label: "Contacto", href: "/contact" },
  ],
  cta: { label: "Hablemos", href: "/contact", variant: "primary" },
  // Without an `href` a language is rendered as unavailable (no broken link).
  languages: [
    { label: "Es", active: true },
    { label: "En" },
  ],
  menuLabel: "Abrir menú",
  closeLabel: "Cerrar menú",
};

export const social: SocialLink[] = [
  // TODO(Juan David): reemplaza por tus perfiles reales.
  { network: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/juandavidramirez" },
  { network: "instagram", label: "Instagram", href: "https://www.instagram.com/juandavidramirez" },
  { network: "substack", label: "Substack", href: SUBSTACK_URL },
];

export const footer = {
  brand: { primary: "JuanDa", secondary: "Ramírez" },
  descriptor: "Tecnología · Impacto · Educación",
  links: navigation.items,
  statement: "Un futuro más humano es posible",
};
