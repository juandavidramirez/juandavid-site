import type {
  BlogPost,
  CTA,
  ImageAsset,
  ImpactArea,
  ImpactLocation,
  ImpactStat,
  RichText,
} from "./types";
import { SUBSTACK_URL } from "./site";

/**
 * Home page content. Every text, number, link and image on the Home lives here.
 * Headings use segments: `{ text, accent?: "yellow" | "blue" | "white" }`.
 */

export const hero: {
  eyebrow: string[];
  title: RichText;
  description: string;
  ctas: CTA[];
  image: ImageAsset;
} = {
  eyebrow: ["Tecnología", "Innovación", "Impacto humano"],
  title: [{ text: "Tecnología\ncon propósito" }],
  description:
    "Diseño estrategias de IA, lidero procesos de innovación y formo equipos, para que empresas y personas adopten la tecnología con criterio y la usen a su favor.",
  ctas: [
    { label: "Hablemos", href: "/contact", variant: "primary" },
    { label: "Conoce mi trabajo", href: "/#areas", variant: "outline" },
  ],
  image: {
    src: "/images/hero-portrait.webp",
    alt: "Retrato de Juan David Ramírez sonriendo, con gafas y suéter azul oscuro",
    width: 1264,
    height: 1244,
  },
};

export const purpose: {
  id: string;
  eyebrow: string;
  title: RichText;
  description: string;
  cta: CTA;
  image: ImageAsset;
} = {
  id: "proposito",
  eyebrow: "Mi propósito",
  title: [
    { text: "Creo en la tecnología como " },
    { text: "un puente", accent: "yellow" },
    { text: ", no como fin" },
  ],
  description:
    "Usar la tecnología y la innovación para generar oportunidades, fortalecer capacidades y acompañar a personas y organizaciones que trabajen por un impacto real.",
  // Sin href hasta que exista la página "Sobre mí".
  cta: { label: "Conoce más de mí", variant: "primary" },
  image: {
    src: "/images/purpose.webp",
    alt: "Juan David Ramírez conversando con un grupo de estudiantes sentados en círculo en un aula",
    width: 763,
    height: 507,
  },
};

export const globalImpact: {
  id: string;
  eyebrow: string;
  title: RichText;
  mapLabel: string;
  closeLabel: string;
  zoomInLabel: string;
  zoomOutLabel: string;
  zoomResetLabel: string;
} = {
  id: "impacto",
  eyebrow: "Impacto global",
  // Figma decía "Impactyo"; corregido como errata evidente.
  title: [{ text: "Impacto en\nnúmeros" }],
  mapLabel: "Mapa de lugares donde he trabajado. Selecciona un punto para ver el detalle.",
  closeLabel: "Cerrar",
  zoomInLabel: "Acercar el mapa",
  zoomOutLabel: "Alejar el mapa",
  zoomResetLabel: "Restablecer la vista del mapa",
};

/** Figures shown over the map, in reading order. */
export const impactStats: ImpactStat[] = [
  { value: "+ 4.000", label: "Personas impactadas directamente" },
  { value: "+10", label: "Programas y proyectos liderados", accent: "yellow" },
  { value: "6", label: "Paises: Colombia, EE.UU., Argentina, Suecia, México, España", accent: "blue" },
  { value: "+300", label: "Organizaciones fortalecidad", accent: "white" },
];

/**
 * Map points. coordinates = [longitude, latitude].
 * TODO(Juan David): ajusta ciudades, títulos y descripciones reales.
 */
export const impactLocations: ImpactLocation[] = [
  {
    city: "Medellín",
    country: "Colombia",
    coordinates: [-75.57, 6.24],
    title: "Colombia",
    description: "Estrategia digital, innovación y formación en organizaciones de educación e impacto social.",
    category: "Educación",
  },
  {
    city: "Ciudad de México",
    country: "México",
    coordinates: [-99.13, 19.43],
    title: "México",
    description: "Programas y proyectos de tecnología con impacto social.",
    category: "Innovación",
  },
  {
    city: "Nueva York",
    country: "Estados Unidos",
    coordinates: [-74.0, 40.71],
    title: "Estados Unidos",
    description: "Colaboración con organizaciones de educación y tecnología.",
    category: "Tecnología",
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    coordinates: [-58.38, -34.6],
    title: "Argentina",
    description: "Acompañamiento a equipos y organizaciones sociales.",
    category: "Talento",
  },
  {
    city: "Madrid",
    country: "España",
    coordinates: [-3.7, 40.42],
    title: "España",
    description: "Proyectos de innovación y desarrollo de capacidades.",
    category: "Innovación",
  },
  {
    city: "Estocolmo",
    country: "Suecia",
    coordinates: [18.07, 59.33],
    title: "Suecia",
    description: "Formación e intercambio sobre liderazgo e impacto.",
    category: "Liderazgo",
  },
];

export const impactAreas: {
  id: string;
  eyebrow: string;
  title: RichText;
  cta: CTA;
  items: ImpactArea[];
} = {
  id: "areas",
  eyebrow: "Áreas en las que genero impacto",
  title: [
    { text: "Del conocimiento a la\n" },
    { text: "acción", accent: "yellow" },
    { text: " real" },
  ],
  // Sin href hasta que exista la subpágina correspondiente.
  cta: { label: "Leer más", variant: "primary" },
  items: [
    {
      icon: "brain-circuit",
      title: "Estrategia de IA",
      description:
        "Diseño e implemento estrategias de inteligencia artificial realistas y sostenibles — alineadas al propósito y la capacidad real de cada organización, no a la moda del momento.",
    },
    {
      icon: "lightbulb",
      title: "Innovación para impacto",
      description:
        "Impulso procesos de innovación que resuelven problemas reales de organizaciones y comunidades, conectando tecnología con propósito social.",
    },
    {
      icon: "users",
      title: "Desarrollo de talento y liderazgo",
      description:
        "Formo y acompaño a personas y equipos para que puedan liderar el cambio digital — no solo ejecutarlo.",
    },
  ],
};

export const blog: {
  id: string;
  eyebrow: string;
  title: RichText;
  cta: CTA;
  readLabel: string;
  posts: BlogPost[];
} = {
  id: "blog",
  eyebrow: "Blog",
  title: [
    { text: "Algunas de las\nideas que he\n" },
    { text: "construído", accent: "yellow" },
  ],
  // Agrega `href` (y `external: true`) cuando esté definido el link al blog.
  cta: { label: "Todos los artículos", variant: "outline" },
  readLabel: "Leer en Substack",
  // TODO(Juan David): reemplaza `url` por el link exacto de cada artículo.
  posts: [
    {
      title: "The efficiency Trap",
      category: "Trabajo",
      date: "2025-05-11",
      readingTime: "5 min de lectura",
      url: SUBSTACK_URL,
      image: {
        src: "/images/blog/efficiency-trap.webp",
        alt: "Persona relajada frente a un escritorio con laptop mirando un atardecer sobre la ciudad",
        width: 900,
        height: 600,
      },
    },
    {
      title: "La rebeldía silenciosa",
      category: "Balance",
      date: "2025-05-21",
      readingTime: "2 min de lectura",
      url: SUBSTACK_URL,
      image: {
        src: "/images/blog/rebeldia-silenciosa.webp",
        alt: "Hombre armando un rompecabezas en la sala mientras la televisión está encendida",
        width: 900,
        height: 600,
      },
    },
    {
      title: "The Guilt of not moving forward",
      category: "Productividad",
      date: "2025-05-13",
      readingTime: "3 min de lectura",
      url: SUBSTACK_URL,
      image: {
        src: "/images/blog/guilt-of-not-moving-forward.webp",
        alt: "Cuaderno abierto con la nota 'Progress isn't always visible' junto a una taza de café y una laptop",
        width: 900,
        height: 675,
      },
    },
  ],
};

export const contact: {
  id: string;
  eyebrow: string;
  title: RichText;
  description: string;
  cta: CTA;
  handwritten: string;
} = {
  id: "contacto",
  eyebrow: "Trabajemos juntos",
  title: [{ text: "¿Cómo podemos\ntrabajar juntos?" }],
  description:
    "Si estás explorando una idea, necesitas apoyo en una estrategia de IA, o quieres fortalecer el impacto de tu organización, conversemos.",
  cta: { label: "Hablemos", href: "/contact", variant: "primary" },
  handwritten: "Ideas de hoy para un mañana más humano...",
};
