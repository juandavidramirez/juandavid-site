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

/*
 * Temporary: "Conoce más" (Áreas de impacto) and "Conoce más de mí" (Sobre mí) → LinkedIn
 * until the portfolio / about pages exist.
 *
 * Internal routes (per language) live in content/es/links.ts and content/en/links.ts.
 */
