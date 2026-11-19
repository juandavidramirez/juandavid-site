import type * as Es from "../es/home";
import { externalLinks, internalLinks } from "./links";

/** English Home content. Same shape as content/es/home.ts. */

export const hero: typeof Es.hero = {
  title: [{ text: "From AI\nto impact" }],
  handwritten: "Technology · Impact · Education",
  description:
    "I design AI strategies, lead innovation processes and train teams, so that companies and people adopt technology with good judgment and make it work for them.",
  ctas: [
    { label: "Let's talk", href: internalLinks.contactForm, variant: "primary" },
    { label: "See my work", href: internalLinks.sections.areas, variant: "outline" },
  ],
  image: {
    src: "/images/hero-portrait.webp",
    alt: "Portrait of Juan David Ramírez smiling, wearing glasses and a dark blue sweater",
    width: 1264,
    height: 1244,
  },
  profiles: [
    {
      icon: "sparkles",
      title: "AI strategist",
      description: "I design and implement AI strategies that strengthen organizations and people.",
    },
    {
      icon: "search",
      title: "Researcher",
      description: "I explore how AI is transforming the way we work, innovate, learn and teach.",
    },
    {
      icon: "rocket",
      title: "Social entrepreneur",
      description: "I build solutions to social problems.",
    },
    {
      icon: "graduation-cap",
      title: "Educator",
      description: "I train people and teams so they can be part of the change.",
    },
  ],
};

export const purpose: typeof Es.purpose = {
  id: "about",
  eyebrow: "About me",
  title: [
    { text: "I help people and companies amplify their " },
    { text: "impact", accent: "yellow" },
    { text: " with technology" },
  ],
  description:
    "I'm a humanist engineer with a master's in Technology and Social Innovation from Sweden. For more than 8 years I've led technology and AI in impact organizations and trained people across Latin America and Europe.",
  cta: { label: "Learn more about me", href: externalLinks.linkedin, external: true, variant: "primary" },
  image: {
    src: "/images/purpose.webp",
    alt: "Juan David Ramírez talking with a group of students sitting in a circle in a classroom",
    width: 763,
    height: 507,
  },
};

export const globalImpact: typeof Es.globalImpact = {
  id: "impact",
  eyebrow: "Global impact",
  title: [{ text: "Impact in\nnumbers" }],
  mapLabel: "Map of places where I've worked. Select a point to see the details.",
  closeLabel: "Close",
  zoomInLabel: "Zoom in on the map",
  zoomOutLabel: "Zoom out of the map",
  zoomResetLabel: "Reset the map view",
};

export const impactStats: typeof Es.impactStats = [
  { value: "+ 4,000", label: "People directly impacted" },
  { value: "+10", label: "Programs and projects led", accent: "yellow" },
  { value: "6", label: "Countries: Colombia, USA, Argentina, Sweden, Mexico, Spain", accent: "blue" },
  { value: "+300", label: "Organizations strengthened", accent: "white" },
];

export const impactLocations: typeof Es.impactLocations = [
  {
    city: "Los Angeles",
    country: "United States",
    coordinates: [-118.24, 34.05],
    card: {
      title: "Propel",
      description: "I led technology, data and AI to strengthen social organizations and amplify their impact across Latin America.",
      image: { src: "/images/map/los-angeles.webp", alt: "Map of Southern California with Los Angeles highlighted" },
    },
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    coordinates: [-58.38, -34.6],
    card: {
      title: "Acámica",
      description: "Experience at a Latin American edtech focused on tech training and new skills for work.",
      image: { src: "/images/map/buenos-aires.webp", alt: "Map of Argentina with Buenos Aires highlighted" },
    },
  },
  {
    city: "Bogotá",
    country: "Colombia",
    coordinates: [-74.07, 4.71],
    card: {
      title: "ProTalento",
      description: "I co-founded an edtech that prepared hundreds of young people to build digital skills and access job opportunities.",
      image: { src: "/images/map/bogota.webp", alt: "Map of Colombia with Bogotá highlighted" },
    },
  },
  {
    city: "Medellín",
    country: "Colombia",
    coordinates: [-75.57, 6.24],
    card: {
      title: "Makaia",
      description: "I led digital transformation projects that brought connectivity, tech education and IoT to rural communities.",
      image: { src: "/images/map/medellin.webp", alt: "Map of Colombia with Medellín highlighted" },
    },
  },
  {
    city: "Medellín",
    country: "Colombia",
    coordinates: [-75.57, 6.24],
    card: {
      title: "Perficient",
      description: "I designed digital learning strategies and a training platform for tech teams across Latin America.",
      image: { src: "/images/map/medellin.webp", alt: "Map of Colombia with Medellín highlighted" },
    },
  },
  {
    city: "Medellín",
    country: "Colombia",
    coordinates: [-75.57, 6.24],
    card: {
      title: "Enseña por Colombia",
      description: "I taught and developed education projects with young people from vulnerable communities as part of the Teach For All network.",
      image: { src: "/images/map/medellin.webp", alt: "Map of Colombia with Medellín highlighted" },
    },
  },
  {
    city: "Cali",
    country: "Colombia",
    coordinates: [-76.53, 3.45],
    card: {
      title: "Universidad Icesi",
      description: "I studied Systems Engineering, where my path between technology, education and social impact began.",
      image: { src: "/images/map/cali.webp", alt: "Map of Colombia with Cali highlighted" },
    },
  },
  {
    city: "São Paulo",
    country: "Brazil",
    coordinates: [-46.63, -23.55],
    card: {
      title: "SHAPE LATAM 2018",
      description: "Regional gathering of young leaders from the World Economic Forum's Global Shapers Community.",
      image: { src: "/images/map/sao-paulo.webp", alt: "Map of Brazil with São Paulo highlighted" },
    },
  },
  {
    city: "León",
    country: "Mexico",
    coordinates: [-101.68, 21.12],
    card: {
      title: "SHAPE LATAM 2019",
      description: "Latin American Global Shapers gathering to connect young leaders and impact projects from across the region.",
      image: { src: "/images/map/leon.webp", alt: "Map of Mexico with León highlighted" },
    },
  },
  {
    city: "Munich",
    country: "Germany",
    coordinates: [11.58, 48.14],
    card: {
      title: "One Young World Summit 2021",
      description: "I took part in One Young World's global summit of young leaders, alongside delegates from more than 190 countries.",
      image: { src: "/images/map/munich.webp", alt: "Map of Germany with Munich highlighted" },
    },
  },
  {
    city: "Belfast",
    country: "Northern Ireland",
    coordinates: [-5.93, 54.6],
    card: {
      title: "One Young World Summit 2023",
      description: "I reconnected with the One Young World global community to exchange ideas on leadership and impact.",
      image: { src: "/images/map/belfast.webp", alt: "Map of Ireland with Belfast highlighted" },
    },
  },
  {
    city: "Bilbao",
    country: "Spain",
    coordinates: [-2.93, 43.26],
    card: {
      title: "SHAPE Europe & Eurasia 2023",
      description: "I took part in the European Global Shapers gathering, which brought together young leaders and impact projects from more than 100 hubs.",
      image: { src: "/images/map/bilbao.webp", alt: "Map of northern Spain with Bilbao highlighted" },
    },
  },
  {
    city: "Stockholm",
    country: "Sweden",
    coordinates: [18.07, 59.33],
    card: {
      title: "Swedish Institute",
      description: "I took part in the Swedish Institute's community and leadership programs as a Global Professionals scholar.",
      image: { src: "/images/map/estocolmo.webp", alt: "Map of Sweden with Stockholm highlighted" },
    },
  },
  {
    city: "Malmö",
    country: "Sweden",
    coordinates: [13.0, 55.6],
    card: {
      title: "Malmö University",
      description: "I did my master's in Computer Science: Innovation for Change in a Digital Society, with a Swedish Institute scholarship.",
      image: { src: "/images/map/malmo.webp", alt: "Map of southern Sweden with Malmö highlighted" },
    },
  },
];

export const impactAreas: typeof Es.impactAreas = {
  id: "work",
  eyebrow: "What I do",
  title: [
    { text: "The three areas\nI " },
    { text: "work in", accent: "yellow" },
  ],
  cta: { label: "Learn more", href: externalLinks.linkedin, external: true, variant: "primary" },
  items: [
    {
      icon: "brain-circuit",
      title: "AI strategy",
      description: "I design and implement AI strategies for companies and people: where to use it and how to put it into practice.",
    },
    {
      icon: "lightbulb",
      title: "Innovation for impact",
      description: "I lead innovation projects that solve a concrete problem for an organization or community.",
    },
    {
      icon: "users",
      title: "Education and talent development",
      description: "I design and deliver training and mentoring programs so people can develop their skills in a world with AI.",
    },
  ],
};

export const blog: typeof Es.blog = {
  id: "blog",
  eyebrow: "Blog",
  title: [
    { text: "Ideas for a\nmore " },
    { text: "human", accent: "yellow" },
    { text: "\nfuture" },
  ],
  cta: { label: "All articles", href: externalLinks.blog, external: true, variant: "outline" },
  readLabel: "Read on Substack",
  posts: [
    {
      title: "The efficiency Trap",
      category: "Work",
      date: "2025-05-11",
      readingTime: "5 min read",
      url: externalLinks.articles.efficiencyTrap,
      image: {
        src: "/images/blog/efficiency-trap.webp",
        alt: "Relaxed person at a desk with a laptop, looking at a sunset over the city",
        width: 900,
        height: 600,
      },
    },
    {
      title: "La rebeldía silenciosa",
      category: "Balance",
      date: "2025-05-21",
      readingTime: "2 min read",
      url: externalLinks.articles.rebeldiaSilenciosa,
      image: {
        src: "/images/blog/rebeldia-silenciosa.webp",
        alt: "Man putting together a puzzle in the living room while the TV is on",
        width: 900,
        height: 600,
      },
    },
    {
      title: "The Guilt of not moving forward",
      category: "Productivity",
      date: "2025-05-13",
      readingTime: "3 min read",
      url: externalLinks.articles.guiltOfNotMovingForward,
      image: {
        src: "/images/blog/guilt-of-not-moving-forward.webp",
        alt: "Open notebook with the note 'Progress isn't always visible' next to a cup of coffee and a laptop",
        width: 900,
        height: 675,
      },
    },
  ],
};

export const contact: typeof Es.contact = {
  id: "contact",
  eyebrow: "Let's work together",
  title: [{ text: "How can we\nwork together?" }],
  description:
    "If you're exploring an idea, need support with an AI strategy, or want to strengthen your organization's impact, let's talk.",
  cta: { label: "Let's talk", href: internalLinks.contactForm, variant: "primary" },
  handwritten: "More ideas.\nMore connections.\nBetter opportunities.",
};
