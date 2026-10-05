import type {
  BlogPost,
  HeroProfile,
  CTA,
  ImageAsset,
  ImpactArea,
  ImpactLocation,
  ImpactStat,
  RichText,
} from "./types";
import { externalLinks, internalLinks } from "./links";

/**
 * Home page content. Every text, number, link and image on the Home lives here.
 * Headings use segments: `{ text, accent?: "yellow" | "blue" | "white" }`.
 */

export const hero: {
  title: RichText;
  /** Handwritten line under the CTAs. */
  handwritten: string;
  description: string;
  ctas: CTA[];
  image: ImageAsset;
  /** Facets around the portrait (order = position: top-right, right, lower-right, lower-middle). */
  profiles: HeroProfile[];
} = {
  title: [{ text: "De la IA\nal impacto" }],
  handwritten: "Tecnología · Impacto · Educación",
  description:
    "Diseño estrategias de IA, lidero procesos de innovación y formo equipos, para que empresas y personas adopten la tecnología con criterio y la usen a su favor.",
  ctas: [
    { label: "Hablemos", href: internalLinks.contactForm, variant: "primary" },
    { label: "Conoce mi trabajo", href: internalLinks.sections.areas, variant: "outline" },
  ],
  image: {
    src: "/images/hero-portrait.webp",
    alt: "Retrato de Juan David Ramírez sonriendo, con gafas y suéter azul oscuro",
    width: 1264,
    height: 1244,
  },
  profiles: [
    {
      icon: "sparkles",
      title: "Estratega de IA",
      description: "Diseño e implemento estrategias de IA que fortalecen a organizaciones y personas.",
    },
    {
      icon: "search",
      title: "Investigador",
      description: "Descubro cómo la IA transforma nuestra forma de trabajar, innovar, aprender y enseñar.",
    },
    {
      icon: "rocket",
      title: "Emprendedor social",
      description: "Construyo soluciones a problemáticas sociales.",
    },
    {
      icon: "graduation-cap",
      title: "Educador",
      description: "Formo a personas y equipos para que sean parte del cambio.",
    },
  ],
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
  eyebrow: "Sobre mí",
  title: [
    { text: "Ayudo a personas y empresas a amplificar su " },
    { text: "impacto", accent: "yellow" },
    { text: " con tecnología" },
  ],
  description:
    "Soy ingeniero humanista, con un máster en Tecnología e Innovación Social de Suecia. Por más de 8 años he liderado tecnología e IA en organizaciones de impacto, y formado personas en América Latina y Europa.",
  // Temporal: LinkedIn hasta que exista la página "Sobre mí".
  cta: { label: "Conoce más de mí", href: externalLinks.linkedin, external: true, variant: "primary" },
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
 * `card` is the mini-card shown on selection. Entries with the same city share one pin
 * (the card shows ‹ › to move between them). Images in /public/images/map/ are
 * temporary map crops: replace `card.image.src` with the real photo (any size).
 * TODO(Juan David): ajusta ciudades, textos e imágenes reales.
 */
export const impactLocations: ImpactLocation[] = [
  {
    city: "Los Ángeles",
    country: "Estados Unidos",
    coordinates: [-118.24, 34.05],
    card: {
      title: "Propel",
      description: "Lideré tecnología, datos e IA para fortalecer organizaciones sociales y amplificar su impacto en Latinoamérica.",
      image: { src: "/images/map/los-angeles.webp", alt: "Mapa del sur de California con Los Ángeles destacada" },
    },
  },
  {
    city: "Buenos Aires",
    country: "Argentina",
    coordinates: [-58.38, -34.6],
    card: {
      title: "Acámica",
      description: "Experiencia en una EdTech latinoamericana enfocada en formación tecnológica y nuevas habilidades para el trabajo.",
      image: { src: "/images/map/buenos-aires.webp", alt: "Mapa de Argentina con Buenos Aires destacada" },
    },
  },
  {
    city: "Bogotá",
    country: "Colombia",
    coordinates: [-74.07, 4.71],
    card: {
      title: "ProTalento",
      description: "Cofundé una EdTech que preparó a cientos de jóvenes para desarrollar habilidades digitales y acceder a oportunidades laborales.",
      image: { src: "/images/map/bogota.webp", alt: "Mapa de Colombia con Bogotá destacada" },
    },
  },
  {
    city: "Medellín",
    country: "Colombia",
    coordinates: [-75.57, 6.24],
    card: {
      title: "Makaia",
      description: "Lideré proyectos de transformación digital que llevaron conectividad, educación tecnológica e IoT a comunidades rurales.",
      image: { src: "/images/map/medellin.webp", alt: "Mapa de Colombia con Medellín destacada" },
    },
  },
  {
    city: "Medellín",
    country: "Colombia",
    coordinates: [-75.57, 6.24],
    card: {
      title: "Perficient",
      description: "Diseñé estrategias de aprendizaje digital y una plataforma de formación para equipos tecnológicos en Latinoamérica.",
      image: { src: "/images/map/medellin.webp", alt: "Mapa de Colombia con Medellín destacada" },
    },
  },
  {
    city: "Medellín",
    country: "Colombia",
    coordinates: [-75.57, 6.24],
    card: {
      title: "Enseña por Colombia",
      description: "Enseñé y desarrollé proyectos educativos con jóvenes de comunidades vulnerables como parte de la red Teach For All.",
      image: { src: "/images/map/medellin.webp", alt: "Mapa de Colombia con Medellín destacada" },
    },
  },
  {
    city: "Cali",
    country: "Colombia",
    coordinates: [-76.53, 3.45],
    card: {
      title: "Universidad Icesi",
      description: "Estudié Ingeniería de Sistemas, donde comenzó mi camino entre tecnología, educación e impacto social.",
      image: { src: "/images/map/cali.webp", alt: "Mapa de Colombia con Cali destacada" },
    },
  },
  {
    city: "São Paulo",
    country: "Brasil",
    coordinates: [-46.63, -23.55],
    card: {
      title: "SHAPE LATAM 2018",
      description: "Encuentro regional de jóvenes líderes de la Global Shapers Community del Foro Económico Mundial.",
      image: { src: "/images/map/sao-paulo.webp", alt: "Mapa de Brasil con São Paulo destacada" },
    },
  },
  {
    city: "León",
    country: "México",
    coordinates: [-101.68, 21.12],
    card: {
      title: "SHAPE LATAM 2019",
      description: "Encuentro latinoamericano de Global Shapers para conectar líderes jóvenes y proyectos de impacto de la región.",
      image: { src: "/images/map/leon.webp", alt: "Mapa de México con León destacada" },
    },
  },
  {
    city: "Múnich",
    country: "Alemania",
    coordinates: [11.58, 48.14],
    card: {
      title: "One Young World Summit 2021",
      description: "Participé en el encuentro global de jóvenes líderes de One Young World, junto a delegados de más de 190 países.",
      image: { src: "/images/map/munich.webp", alt: "Mapa de Alemania con Múnich destacada" },
    },
  },
  {
    city: "Belfast",
    country: "Irlanda del Norte",
    coordinates: [-5.93, 54.6],
    card: {
      title: "One Young World Summit 2023",
      description: "Volví a encontrarme con la comunidad global de One Young World para intercambiar ideas sobre liderazgo e impacto.",
      image: { src: "/images/map/belfast.webp", alt: "Mapa de Irlanda con Belfast destacada" },
    },
  },
  {
    city: "Bilbao",
    country: "España",
    coordinates: [-2.93, 43.26],
    card: {
      title: "SHAPE Europe & Eurasia 2023",
      description: "Participé en el encuentro europeo de Global Shapers que reunió a jóvenes líderes y proyectos de impacto de más de 100 hubs.",
      image: { src: "/images/map/bilbao.webp", alt: "Mapa del norte de España con Bilbao destacada" },
    },
  },
  {
    city: "Estocolmo",
    country: "Suecia",
    coordinates: [18.07, 59.33],
    card: {
      title: "Swedish Institute",
      description: "Participé en la comunidad y programas de liderazgo del Swedish Institute como becario de Global Professionals.",
      image: { src: "/images/map/estocolmo.webp", alt: "Mapa de Suecia con Estocolmo destacada" },
    },
  },
  {
    city: "Malmö",
    country: "Suecia",
    coordinates: [13.0, 55.6],
    card: {
      title: "Malmö University",
      description: "Cursé mi maestría en Computer Science e innovación para el cambio en una sociedad digital, con una beca del Swedish Institute.",
      image: { src: "/images/map/malmo.webp", alt: "Mapa del sur de Suecia con Malmö destacada" },
    },
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
  eyebrow: "Lo que hago",
  title: [
    { text: "Las tres áreas en\nlas que " },
    { text: "trabajo", accent: "yellow" },
  ],
  // Temporal: LinkedIn hasta que exista la subpágina de portafolio.
  cta: { label: "Conoce más", href: externalLinks.linkedin, external: true, variant: "primary" },
  items: [
    {
      icon: "brain-circuit",
      title: "Estrategia de IA",
      description:
        "Diseño e implemento estrategias de IA para empresas y personas: dónde usarla y cómo llevarla a la práctica.",
    },
    {
      icon: "lightbulb",
      title: "Innovación para impacto",
      description:
        "Lidero proyectos de innovación que resuelven un problema concreto de una organización o comunidad.",
    },
    {
      icon: "users",
      title: "Educación y desarrollo de talento",
      description:
        "Diseño e imparto programas de formación y mentoría para que las personas desarrollen sus habilidades en un mundo con IA.",
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
    { text: "Ideas para un\nfuturo más\n" },
    { text: "humano", accent: "yellow" },
  ],
  cta: { label: "Todos los artículos", href: externalLinks.blog, external: true, variant: "outline" },
  readLabel: "Leer en Substack",
  posts: [
    {
      title: "The efficiency Trap",
      category: "Trabajo",
      date: "2025-05-11",
      readingTime: "5 min de lectura",
      url: externalLinks.articles.efficiencyTrap,
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
      url: externalLinks.articles.rebeldiaSilenciosa,
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
      url: externalLinks.articles.guiltOfNotMovingForward,
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
  cta: { label: "Hablemos", href: internalLinks.contactForm, variant: "primary" },
  handwritten: "Más ideas.\nMás conexiones.\nMejores oportunidades.",
};
