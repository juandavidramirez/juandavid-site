import type { RichText } from "./types";
import { externalLinks, internalLinks } from "./links";

/**
 * Reporte corto de la tesis de maestría (página /investigacion).
 * Fuente: REPORTE_CORTO_ES.md (Drive → Becas Maestría y otras/PhD/Research - Thesis Assistant).
 * Los textos están tal cual el reporte; solo se separaron en piezas para el diseño.
 */

export type Finding = {
  id: string;
  number: string;
  /** Título corto para el índice visual. */
  short: string;
  title: RichText;
  icon: string;
  found: string[];
  means: string;
  recommend: string;
  /** Frase destacada (ya presente en el texto del hallazgo). */
  highlight?: { text: string; source: string };
  visual: "pilots" | "barriers" | "route" | "profile" | "trust" | "measure";
};

export const research = {
  metaTitle: "IA y formación de talento tech en Colombia",
  metaDescription:
    "Reporte corto de la tesis de maestría de Juan David Ramírez Jaramillo (Malmö University, 2025): seis hallazgos sobre cómo se usa la IA generativa para formar talento tech en Colombia y una guía de cinco pasos y cinco principios.",

  hero: {
    eyebrow: "Investigación · Tesis de maestría",
    title: [{ text: "Bridging the " }, { text: "Skill\u00a0Gap", accent: "yellow" }] as RichText,
    subtitle: "El papel de la IA en el desarrollo del talento tech en Colombia",
    tagline: "Lo que encontré y lo que recomiendo",
    meta: "Reporte corto de mi tesis de maestría · Malmö University · Septiembre de 2025",
    // Botones del hero. Sin href se ven pero quedan deshabilitados.
    actions: {
      // PDF generado desde /investigacion/pdf con: npm run report:pdf
      report: {
        label: "Descargar reporte",
        href: "/docs/Reporte_Bridging_the_Skill_Gap_Juan_David_Ramirez.pdf" as string | undefined,
      },
      thesis: {
        label: "Descargar tesis",
        options: [
          {
            label: "Descargar PDF",
            href: "/docs/Tesis_Bridging_the_Skill_Gap_Juan_David_Ramirez.pdf" as string | undefined,
            kind: "download" as const,
          },
          // Registro de la tesis en DiVA (Malmö University).
          {
            label: "Leer en DiVA",
            // Pasa por /go/diva para contar el clic (lib/downloads.ts) y redirige a DiVA.
            href: "/go/diva" as string | undefined,
            kind: "external" as const,
          },
        ],
      },
    },
    stats: [
      { value: "13", label: "personas entrevistadas" },
      { value: "7", label: "organizaciones" },
      { value: "10", label: "estudios académicos revisados" },
    ],
    index: [
      { label: "Por qué", href: "#por-que" },
      { label: "Cómo", href: "#como" },
      { label: "Hallazgos", href: "#hallazgos" },
      { label: "La guía", href: "#guia" },
      { label: "Conclusión", href: "#conclusion" },
      { label: "Trabajemos juntos", href: "#trabajemos", cta: true },
    ],
  },

  why: {
    eyebrow: "Por qué hice este estudio",
    title: [{ text: "Lo que hoy sabes puede quedarse " }, { text: "corto", accent: "yellow" }, { text: " rápidamente" }] as RichText,
    paragraphs: [
      "En el sector tecnológico, lo que hoy sabes hacer puede quedarse corto en un par de años. Las empresas necesitan actualizar a sus equipos dentro de su campo (upskilling) y, cada vez más, ayudar a las personas a pasar a roles nuevos (reskilling). La inteligencia artificial generativa (Claude, Gemini, ChatGPT) promete hacer ese aprendizaje más personalizado, más ágil y más barato.",
      "Quise entender si esa promesa se estaba cumpliendo en Colombia: cómo se está usando la IA generativa para formar talento tech, qué lo frena y qué se podría hacer para aprovecharla mejor.",
    ],
    upskilling: { label: "Upskilling", text: "Actualizar a los equipos dentro de su campo" },
    reskilling: { label: "Reskilling", text: "Ayudar a las personas a pasar a roles nuevos" },
    promise: ["Más personalizado", "Más ágil", "Más barato"],
    question: ["¿Cómo se está usando?", "¿Qué lo frena?", "¿Qué se podría hacer mejor?"],
  },

  method: {
    eyebrow: "Cómo lo hice",
    title: [{ text: "Un estudio " }, { text: "cualitativo", accent: "yellow" }, { text: " con profesionales y empresas" }] as RichText,
    paragraphs: [
      "Fue un estudio cualitativo, exploratorio e inductivo. Entre enero y abril de 2025 conversé a fondo, en entrevistas semiestructuradas, con 13 personas de 7 organizaciones que forman talento tecnológico en el país: 6 profesionales de tecnología, 4 líderes de talento humano y formación, y 3 educadores. Participaron empresas de software multinacionales y colombianas, una edtech y dos universidades, ICESI y EAFIT. Además revisé 10 estudios académicos recientes y contrasté lo que escuché con la política nacional de IA (CONPES 4144 de 2025 y la Hoja de Ruta de MinCiencias de 2024).",
      "Para analizar las entrevistas usé análisis temático (thematic analysis). Partí de códigos definidos desde la guía de entrevista y sumé los que fueron apareciendo en las conversaciones, hasta llegar a 43 códigos agrupados en 9 categorías. Al leerlos y compararlos una y otra vez, se consolidaron en 5 temas y 14 hallazgos generales, que finalmente se resumieron en los 6 hallazgos específicos de este reporte.",
    ],
    analysis: [
      { value: "43", label: "códigos" },
      { value: "9", label: "categorías" },
      { value: "5", label: "temas" },
      { value: "14", label: "hallazgos generales" },
      { value: "6", label: "hallazgos específicos" },
    ],
    people: [
      { label: "Profesionales de tecnología", value: 6, color: "#ffbd42", icon: "cpu" },
      { label: "Líderes de talento humano y formación", value: 4, color: "#71c0fd", icon: "users" },
      { label: "Educadores", value: 3, color: "#4a7af5", icon: "graduation-cap" },
    ],
    orgs: [
      { label: "Empresas de software", detail: "multinacionales y colombianas", icon: "network" },
      { label: "Una edtech", detail: "", icon: "lightbulb" },
      { label: "Dos universidades", detail: "ICESI y EAFIT", icon: "graduation-cap" },
    ],
    sources: [
      { label: "Entrevistas a fondo", detail: "13 personas · ene a abr 2025" },
      { label: "Revisión de literatura", detail: "10 estudios académicos recientes" },
      { label: "Política nacional de IA", detail: "CONPES 4144 de 2025 · Hoja de Ruta de MinCiencias 2024" },
    ],
  },

  findingsIntro: {
    eyebrow: "Lo que encontré y lo que recomiendo",
    title: [{ text: "Seis " }, { text: "hallazgos", accent: "yellow" }] as RichText,
    labels: { found: "Qué encontré", means: "Qué significa", recommend: "Qué recomiendo" },
  },

  findings: [
    {
      id: "hallazgo-1",
      number: "01",
      short: "La IA entró por la puerta de atrás",
      title: [{ text: "La IA ya entró a la formación, pero por la " }, { text: "puerta de atrás", accent: "yellow" }],
      icon: "sparkles",
      visual: "pilots",
      found: [
        "Hay usos reales: generar borradores de contenido, analizar encuestas de clima y satisfacción, armar rutas de aprendizaje en plataformas, asistentes que sugieren qué estudiar para llegar a un rol en tres años, y laboratorios internos donde los empleados prueban la IA en problemas del negocio. Algunos de esos laboratorios incluso terminaron en servicios que se venden a clientes.",
        "Pero casi todo son pilotos sueltos, impulsados por una persona o un equipo entusiasta, desconectados de la estrategia de formación. Una de las empresas, con perfil muy tecnológico, todavía no usaba IA para formar a su gente. Ninguna de las organizaciones tenía un marco coherente para hacerlo.",
      ],
      means:
        "El problema no es la falta de interés. Es que nadie sabe muy bien por dónde empezar, y sin un marco los pilotos duran unos meses y se olvidan. Además, cuando la iniciativa nace en un área distinta a la de formación, aparecen problemas de quién es dueño de qué.",
      recommend:
        "Antes de comprar herramientas o lanzar pilotos, definir para qué se va a usar la IA en la formación, con una meta pedagógica clara. Y conectar los experimentos que ya existen con el área responsable de formar a la gente, para que lo que se aprende en un laboratorio llegue a los programas de formación.",
    },
    {
      id: "hallazgo-2",
      number: "02",
      short: "El freno es la preparación",
      title: [{ text: "El freno no es la tecnología, es la " }, { text: "preparación", accent: "yellow" }, { text: " de las personas y de las organizaciones" }],
      icon: "users",
      visual: "barriers",
      found: [
        "Las barreras que más pesan son humanas y organizacionales. Las áreas de talento humano tienen grandes habilidades relacionales, pero suelen ver la IA como \"algo técnico, que no es lo mío\". Muchos docentes tienen acceso a las herramientas, pero no entienden bien cómo funcionan, y eso limita cómo las usan en clase.",
        "También pesa la moda: varios entrevistados advirtieron sobre invertir en tecnología porque está de moda, sin entender para qué sirve. Y fuera de las grandes ciudades sigue habiendo un problema básico de conectividad, equipos y datos móviles.",
      ],
      means:
        "Hay una paradoja: quienes deberían liderar la formación en IA son, muchas veces, quienes menos la usan o quienes poco la entienden. Estar \"listo\" para la IA no es tener las herramientas, es tener personas que sepan liderarla y una comprensión compartida de qué se busca.",
      recommend:
        "Formar primero a quienes forman: equipos de talento humano, líderes de formación y docentes. Crear un espacio de decisión compartida, como un consejo asesor, donde talento humano, instructores, líderes técnicos, gerentes y aprendices definan juntos el propósito de la estrategia. Y en contextos con baja conectividad, adaptar el diseño (por ejemplo, contenidos cortos por canales que la gente ya usa) en lugar de suponer que todos tienen acceso.",
    },
    {
      id: "hallazgo-3",
      number: "03",
      short: "Sin propósito, la gente se desconecta",
      title: [{ text: "Dar acceso no basta: sin " }, { text: "propósito", accent: "yellow" }, { text: ", la gente se desconecta" }],
      icon: "target",
      visual: "route",
      found: [
        "Incluso con plataformas, contenido y licencias disponibles, muchas personas no se animan a aprender algo nuevo. No es rechazo, es inercia. Las personas empiezan con entusiasmo y lo pierden rápido si no entienden para qué les sirve en su rol o en su carrera. Un profesional lo resumió así: si le muestran una ruta, avanza; si le tiran todo el contenido, se apaga.",
        "También encontré que la IA puede cambiar el rol del formador: si se usa solo para hacer lo mismo más rápido, se desperdicia; si libera al formador de tareas mecánicas, le deja tiempo para lo que más transforma, como el pensamiento crítico, la creatividad y el liderazgo.",
      ],
      highlight: { text: "Si le muestran una ruta, avanza; si le tiran todo el contenido, se apaga.", source: "Un profesional de tecnología" },
      means:
        "La IA no motiva por sí sola. Funciona cuando organiza y orienta el aprendizaje hacia una meta que la persona reconoce como suya.",
      recommend:
        "Diseñar rutas de aprendizaje por rol y por meta personal, no catálogos de cursos. Usar la IA para mostrar el camino (qué aprender, en qué orden y para qué) y no solo para producir más contenido. Y usar el tiempo que la IA ahorra para que los formadores diseñen retos y acompañen mejor.",
    },
    {
      id: "hallazgo-4",
      number: "04",
      short: "Aprender a aprender",
      title: [{ text: "Los perfiles están cambiando, y la habilidad clave es " }, { text: "aprender a aprender", accent: "yellow" }],
      icon: "brain",
      visual: "profile",
      found: [
        "Las empresas ya buscan perfiles híbridos: personas que programen, pero que también entiendan el negocio, analicen datos y sepan liderar y comunicar. Hasta los roles de coordinación de proyectos ahora deben entender datos e IA.",
        "La habilidad que más se valora es aprender rápido, saber buscar información y saber verificar si lo que se encontró es correcto. Al mismo tiempo, muchas empresas siguen filtrando por títulos formales y no por habilidades demostradas.",
      ],
      highlight: { text: "Ya no es una lista de cursos, es otra lógica de formación.", source: "Un educador" },
      means:
        "Formar para un cargo fijo ya no alcanza. Como dijo un educador, ya no es una lista de cursos, es otra lógica de formación. Y si las empresas no reconocen lo que se aprende por caminos distintos a un título, el impacto de cualquier formación con IA queda limitado.",
      recommend:
        "Incluir en todo programa las habilidades de aprender, desaprender y verificar información. Formar por combinaciones de habilidades (técnica, negocio, datos, comunicación) y no solo por herramientas. Y avanzar hacia procesos de selección y promoción que reconozcan habilidades demostradas, no solo títulos.",
    },
    {
      id: "hallazgo-5",
      number: "05",
      short: "La confianza se tiene que ganar",
      title: [{ text: "Hay interés, pero la " }, { text: "confianza", accent: "yellow" }, { text: " se tiene que ganar" }],
      icon: "heart-handshake",
      visual: "trust",
      found: [
        "Los entrevistados ven el potencial, pero desconfían. Les preocupa que la IA dé respuestas que suenan bien y están mal (incluso a profesionales técnicos les pasa), que tenga sesgos y que no sea transparente. Una empresa decidió no automatizar decisiones críticas porque no quería que la IA se viera como un oráculo.",
        "A esto se suma que la política pública colombiana va en la dirección correcta, pero todavía no se traduce en guías prácticas, sobre todo para la educación. Varios entrevistados dijeron que cada quien está haciendo lo que puede.",
      ],
      means:
        "Mientras no haya reglas claras desde afuera, cada organización tiene que poner las suyas. Y la formación no puede limitarse a enseñar a usar la herramienta: tiene que enseñar a cuestionarla.",
      recommend:
        "Crear políticas internas de uso responsable de la IA, con participación de talento humano y no solo de los equipos legales o técnicos. Mantener siempre a una persona revisando lo que la IA produce, sobre todo en decisiones que afectan a personas. Y enseñar a dudar, contrastar y no dar por válida cualquier respuesta automática.",
    },
    {
      id: "hallazgo-6",
      number: "06",
      short: "Nadie está midiendo si funciona",
      title: [{ text: "Nadie está " }, { text: "midiendo", accent: "yellow" }, { text: " si funciona" }],
      icon: "search",
      visual: "measure",
      found: [
        "Ninguna de las empresas participantes había pensado cómo evaluar la formación apoyada en IA. No había plan, ni indicadores, ni una idea de cómo se vería el éxito.",
        "Algunos entrevistados lo reconocieron como un problema: si no se sabe si ahorra tiempo o mejora el desempeño, es muy difícil justificar ampliar la iniciativa.",
      ],
      means:
        "Hoy la IA se ve sobre todo como una herramienta para producir contenido, no como parte de una estrategia que hay que seguir y rendir cuentas. Es el punto más débil y, a la vez, la mayor oportunidad.",
      recommend:
        "Definir desde el inicio qué se considera éxito. Medir si la formación mejora el desempeño, cierra brechas específicas o ayuda a avanzar en la carrera, no solo cuántos cursos se completaron. Usar la IA para analizar datos de progreso y retroalimentación, pero con personas interpretando los resultados. Y preguntar a los aprendices cómo viven la IA: si confían en ella y si se sienten apoyados o reemplazados.",
    },
  ] satisfies Finding[],

  guide: {
    eyebrow: "La guía",
    title: [{ text: "Cómo pasar de pilotos sueltos a una " }, { text: "estrategia", accent: "yellow" }] as RichText,
    intro:
      "Con estos hallazgos construí una guía práctica para empresas e instituciones educativas que quieran integrar la IA generativa en la formación de su talento. Tiene dos partes que funcionan juntas:",
    parts: [
      { label: "Cinco pasos", text: "dicen qué hacer y en qué orden." },
      { label: "Cinco principios", text: "dicen cómo saber si se está haciendo bien en cada paso." },
    ],
    origin: {
      title: "De dónde vienen los pasos",
      text: "Los pasos siguen el modelo ADDIE (Analizar, Diseñar, Desarrollar, Implementar, Evaluar), uno de los marcos más usados en el mundo para diseñar programas de formación. No lo inventé. Lo usé como estructura para organizar, en cada etapa, las recomendaciones que salieron de las entrevistas y de la literatura. La ventaja es que muchos equipos de formación ya lo conocen, así que la IA entra en un proceso familiar y no como algo aparte.",
    },
    stepsTitle: "Los cinco pasos",
    steps: [
      {
        letter: "A",
        name: "Analizar",
        what: "Entender qué necesita la organización antes de adoptar nada",
        ai: [
          "Diagnosticar qué habilidades requiere cada rol (la IA puede analizar descripciones de cargo y perfiles).",
          "Evaluar si la organización está preparada: liderazgo, capacidad de los formadores y apertura al cambio, no solo tecnología.",
          "Involucrar desde el inicio a talento humano, formadores, líderes técnicos y aprendices.",
          "Definir para qué se usará la IA.",
        ],
      },
      {
        letter: "D",
        name: "Diseñar",
        what: "Definir qué se va a aprender, cómo y con qué recursos",
        ai: [
          "Crear rutas de aprendizaje personalizadas según la meta de cada persona.",
          "Simular con IA cómo viviría el programa alguien en el rol de destino, para detectar temas faltantes.",
          "Que expertos humanos validen y ajusten todo.",
        ],
      },
      {
        letter: "D",
        name: "Desarrollar",
        what: "Producir los materiales y actividades",
        ai: [
          "Usar la IA para hacer borradores de textos, casos, ejercicios o presentaciones.",
          "Crear versiones del mismo contenido para distintos roles o niveles.",
          "Revisión humana de todo lo que la IA produce.",
        ],
      },
      {
        letter: "I",
        name: "Implementar",
        what: "Llevar la formación a las personas",
        ai: [
          "Empezar con pilotos pequeños en ambientes controlados, como laboratorios internos.",
          "Acompañar a aprendices y formadores en el cambio.",
          "Usar asistentes de IA que respondan dudas, sugieran el siguiente paso y hagan seguimiento, lo que permite llegar a más personas con menos recursos.",
        ],
      },
      {
        letter: "E",
        name: "Evaluar",
        what: "Medir el impacto y ajustar",
        ai: [
          "Medir cambios en desempeño y brechas cerradas, no solo cursos completados.",
          "Usar la IA para analizar progreso y retroalimentación, con personas interpretando.",
          "Evaluar también la confianza y la percepción de los aprendices.",
        ],
      },
    ],
    principlesTitle: "Los cinco principios",
    principlesIntro:
      "Los principios no son un paso más. Salieron de tensiones que aparecieron una y otra vez en las entrevistas, y aplican en las cinco etapas. Funcionan como preguntas de control antes de cada decisión.",
    principles: [
      {
        name: "Uso intencional y preparación",
        meaning: "La IA se adopta por una estrategia de aprendizaje clara, con apoyo del liderazgo, no por moda o presión del mercado",
        question: "¿Para qué estamos usando la IA aquí, y estamos preparados para hacerlo?",
        icon: "target",
      },
      {
        name: "Integridad y ética del aprendizaje",
        meaning: "Todo lo que produce la IA se revisa con criterio pedagógico y ético",
        question: "¿Quién revisó esto y con qué criterio?",
        icon: "user-round-check",
      },
      {
        name: "Personalización con propósito",
        meaning: "La personalización responde a necesidades reales del rol y a las metas de la persona",
        question: "¿Esto acerca a la persona a una meta que ella reconoce como suya?",
        icon: "rocket",
      },
      {
        name: "Aprendizaje activo y reflexivo",
        meaning: "Se aprende experimentando, con autonomía y cuestionando la IA, no consumiendo contenido de forma pasiva",
        question: "¿La persona está haciendo y pensando, o solo recibiendo contenido?",
        icon: "lightbulb",
      },
      {
        name: "Equidad y acceso",
        meaning: "Las soluciones deben ser accesibles y asequibles, sobre todo en contextos con pocos recursos",
        question: "¿Esto reduce o amplía las brechas de acceso que ya existen?",
        icon: "globe",
      },
    ],
    example: {
      title: "Un ejemplo de cómo se combinan",
      text: "En el paso de Desarrollar, la IA permite producir materiales rápido. El principio de integridad exige que una persona los revise, el de aprendizaje activo pide que esos materiales sean retos y no solo lecturas, y el de equidad recuerda que deben funcionar también donde la conectividad es baja.",
      /** Índices de principios que el ejemplo activa en el paso Desarrollar (índice 2). */
      step: 2,
      principles: [1, 3, 4],
    },
  },

  conclusion: {
    eyebrow: "La conclusión",
    title: [{ text: "No depende de la herramienta, sino de " }, { text: "cómo se use", accent: "yellow" }] as RichText,
    text: "La IA generativa sí puede ayudar a cerrar la brecha de habilidades en Colombia. Puede hacer la formación más accesible, más barata y más ajustada a cada persona, y abrir la puerta a roles que antes estaban fuera de alcance. Pero ese resultado no depende de la herramienta, sino de cómo se use: con un propósito claro, con personas preparadas para liderarla, con criterio humano en cada paso y con una forma de medir si funciona.",
    conditions: ["Un propósito claro", "Personas preparadas para liderarla", "Criterio humano en cada paso", "Una forma de medir si funciona"],
    question:
      "La pregunta de fondo no es solo qué puede hacer la IA, porque hoy puede hacer casi todo lo que imaginemos, sino qué tipo de espacios de aprendizaje y desarrollo queremos crear, a quién queremos incluir y cómo los vamos a evaluar.",
  },

  next: {
    eyebrow: "Lo que sigue",
    title: [{ text: "¿Siguen siendo " }, { text: "ciertos", accent: "yellow" }, { text: " estos hallazgos?" }] as RichText,
    text: "Las entrevistas se hicieron en marzo y abril de 2025. La IA generativa cambia muy rápido, y es probable que algunas cosas ya no se vean igual. Por eso la siguiente etapa de este trabajo es contrastar los hallazgos con lo que está pasando hoy: qué ha avanzado, qué sigue igual y qué apareció que no estaba en el radar.",
    timeline: [
      { when: "2025", label: "Entrevistas, literatura y política pública" },
      { when: "2025", label: "Hallazgos y guía" },
      { when: "Hoy", label: "Contrastar con lo que está pasando", current: true },
    ],
    checks: ["Qué ha avanzado", "Qué sigue igual", "Qué apareció que no estaba en el radar"],
  },

  collaborate: {
    eyebrow: "Trabajemos juntos",
    title: [{ text: "Me encantaría " }, { text: "conversar", accent: "yellow" }, { text: " contigo" }] as RichText,
    intro:
      "Si trabajas en estos temas, quieres conocer la guía o hablar de la investigación, o quieres ser parte de la siguiente fase, hablemos. Esta invitación es tanto para personas como para organizaciones.",
    options: [
      {
        label: "Conversemos sobre la investigación",
        text: "Te la presento a ti o a tu equipo e intercambiamos ideas. Si te interesan estos temas, podemos explorar preguntas o proyectos en conjunto.",
      },
      {
        label: "Sé parte de la siguiente fase",
        text: "Me cuentas cómo ha cambiado el uso de la IA en tu trabajo desde 2025 y contrastamos tu experiencia con los hallazgos. Te comparto los resultados actualizados antes de publicarlos.",
      },
      {
        label: "Apliquemos la guía",
        text: "Revisamos en qué punto estás tú o tu organización y diseñamos un piloto pequeño, con una forma clara de medir si funciona.",
      },
    ],
    audiences: [
      {
        label: "Personas",
        items: ["Profesionales de tecnología", "Líderes de talento humano y formación", "Docentes", "Investigadores"],
      },
      {
        label: "Organizaciones",
        items: ["Empresas de tecnología", "Edtechs y ONG", "Instituciones de educación superior"],
      },
    ],
    closing: "Más ideas. Más conexiones.",
    author: "Juan David Ramírez Jaramillo",
    cta: "Hablemos",
  },
};
