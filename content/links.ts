/**
 * Single source of truth for every link destination on the site.
 * External URLs come from the Notion page "Links Sitio web"
 * (Personal Brand 2026 – Juan David Ramírez). Update them here only.
 */

export const externalLinks = {
  linkedin: "https://www.linkedin.com/in/juandaramirezj/",
  instagram: "https://www.instagram.com/soyjuandar/",
  /** Substack profile (social icon). */
  substackProfile: "https://substack.com/@juandaramirez",
  /** Publication home ("Todos los artículos"). */
  blog: "https://juandaramirez.substack.com/",
  articles: {
    efficiencyTrap:
      "https://juandaramirez.substack.com/p/the-efficiency-trap?r=1o2sye&utm_campaign=post-expanded-share&utm_medium=web",
    rebeldiaSilenciosa:
      "https://juandaramirez.substack.com/p/la-rebeldia-silenciosa?r=1o2sye&utm_campaign=post-expanded-share&utm_medium=web",
    guiltOfNotMovingForward:
      "https://juandaramirez.substack.com/p/the-guilt-of-not-moving-forward?r=1o2sye&utm_campaign=post-expanded-share&utm_medium=web",
  },
} as const;

/** Internal routes and Home sections (not in Notion: these are the site's own pages). */
export const internalLinks = {
  home: "/",
  /** Contact form page (the "Hablemos" CTAs). */
  contactForm: "/contact",
  sections: {
    purpose: "/#proposito",
    impact: "/#impacto",
    areas: "/#areas",
    blog: "/#blog",
    contact: "/#contacto",
  },
} as const;

/*
 * Temporary: "Conoce más" (Áreas de impacto) → LinkedIn until the portfolio page exists.
 *
 * No destination defined in Notion yet — these CTAs render without navigation
 * (see `href` left out in content/home.ts):
 * - "Conoce más de mí" (Mi propósito)  → future "Sobre mí" page
 * - "En" language switch                → future English version
 */
