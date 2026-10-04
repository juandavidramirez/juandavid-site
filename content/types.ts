/**
 * Content schema for the site. Components only render these shapes;
 * all copy, links and image references live in `content/*.ts`.
 */

export type Accent = "yellow" | "blue" | "white";

/** Rich text as segments, so headings can carry any number of highlights. */
export type TextSegment = { text: string; accent?: Accent };
export type RichText = TextSegment[];

export type Link = {
  label: string;
  href: string;
  /** Opens in a new tab with rel="noopener noreferrer". */
  external?: boolean;
};

export type CTA = Link & { variant?: "primary" | "outline" };

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type NavItem = Link & {
  /** Rendered as a non-interactive, visibly disabled item. */
  disabled?: boolean;
};

export type SocialNetwork = "linkedin" | "instagram" | "substack" | "x" | "youtube";
export type SocialLink = { network: SocialNetwork; label: string; href: string };

export type ImpactLocation = {
  city: string;
  country: string;
  /** [longitude, latitude] */
  coordinates: [number, number];
  title?: string;
  description?: string;
  category?: string;
  year?: string;
};

export type ImpactStat = {
  value: string;
  label: string;
  accent?: Accent;
};

export type ImpactArea = {
  icon: "gear" | "bulb" | "people";
  title: string;
  description: string;
};

export type BlogPost = {
  title: string;
  category: string;
  /** ISO date (YYYY-MM-DD); formatted at render time. */
  date: string;
  readingTime: string;
  url: string;
  image: ImageAsset;
};
