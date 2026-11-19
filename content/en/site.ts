import type * as Es from "../es/site";
import { externalLinks, internalLinks } from "./links";
import { site as esSite } from "../es/site";

/** Global English content: brand, navigation, socials, footer, SEO. Same shape as content/es/site.ts. */

export const site: typeof Es.site = {
  ...esSite, // url, name, brand and handles are shared
  locale: "en_US",
  lang: "en",
  title: "Juan David Ramírez · Technology with purpose",
  description:
    "I design AI strategies, lead innovation processes and train teams, so that companies and people adopt technology with good judgment and make it work for them.",
};

export const navigation: typeof Es.navigation = {
  home: internalLinks.home,
  items: [
    { label: "About me", href: internalLinks.sections.purpose },
    { label: "My impact", href: internalLinks.sections.impact },
    { label: "My work", href: internalLinks.sections.areas },
    { label: "Research", href: internalLinks.research },
    { label: "Blog", href: internalLinks.sections.blog },
    { label: "Contact", href: internalLinks.sections.contact },
  ],
  cta: { label: "Let's talk", href: internalLinks.contactForm, variant: "primary" },
  menuLabel: "Open menu",
  closeLabel: "Close menu",
};

export const social: typeof Es.social = [
  { network: "linkedin", label: "LinkedIn", href: externalLinks.linkedin },
  { network: "instagram", label: "Instagram", href: externalLinks.instagram },
  { network: "substack", label: "Substack", href: externalLinks.substackProfile },
];

export const footer: typeof Es.footer = {
  brand: { primary: "JuanDavid", secondary: "Ramírez" },
  descriptor: "Technology · Impact · Education",
  links: navigation.items,
  statement: "A more human future is possible",
};
