# Estado del sitio — juandavidramirez.com

Última actualización: 8 de noviembre de 2026.

Este documento resume qué está publicado, las decisiones de diseño que tomamos y lo que falta. Para instrucciones técnicas (cómo cambiar textos, imágenes, links, etc.) ver `README.md`.

---

## 1. Infraestructura

| Elemento | Estado |
|---|---|
| Código | GitHub privado: `juandavidramirez/juandavid-site` (rama `main`) |
| Ruta local | Google Drive → `Educación/AI & Data Science/AI Implementation/Claude/Personal website` |
| Hosting | Vercel, despliegue automático con cada `git push` a `main` |
| Dominio | `www.juandavidramirez.com` (principal). `juandavidramirez.com` redirige a `www`. DNS en Porkbun, HTTPS activo |
| Stack | Next.js 16 (App Router) + TypeScript + CSS Modules. Sin librerías de UI |
| Dependencias locales | `node_modules` y `.next` viven en `~/Documents/juandavid-site-deps/` (enlaces simbólicos) para que Drive no los sincronice |
| Contenido | Todo el copy, links e imágenes en `content/` (`home.ts`, `site.ts`, `links.ts`, `contact.ts`); los componentes no tienen textos ni URLs |

---

## 2. Estado actual por sección

### Navbar
- Wordmark "JuanDavidRamírez" (Montserrat 600 + 300).
- Menú: Sobre mí · Mi impacto · Mi trabajo · Blog · Contacto (anclas del Home). Botón "Hablemos" → `/contact`.
- Selector Es | En: "En" deshabilitado hasta que exista la versión en inglés.
- Desde 1100 px hacia abajo, menú hamburguesa.

### Hero
- Titular: **"De la IA / al impacto"**. Sin eyebrow superior.
- Descripción actual del Hero y botones "Hablemos" (→ `/contact`) y "Conoce mi trabajo" (→ sección Lo que hago).
- Texto manuscrito bajo los botones: "Tecnología · Impacto · Educación".
- Foto a la derecha, con ondas detrás: las inferiores (asset original del Figma) y las superiores (cintas sedosas dibujadas en SVG, aproximación al Figma).
- Cuatro tarjetas de perfil alrededor de la foto (como en el Figma: dos arriba a la derecha, dos abajo):
  - Estado normal: ícono + título.
  - Hover / foco / toque: se expanden hacia abajo y muestran la descripción.
  - Perfiles: Estratega de IA, Investigador, Emprendedor social, Educador.
- Responsive: composición lateral por encima de 1340 px; por debajo, foto bajo el texto y tarjetas en grid (2 columnas en tablet, 1 en móvil).

### Sobre mí
- Eyebrow "SOBRE MÍ". Título: "Ayudo a personas y empresas a amplificar su **impacto** con tecnología" ("impacto" en dorado).
- Texto: ingeniero humanista, máster en Tecnología e Innovación Social (Suecia), 8+ años.
- Botón "Conoce más de mí" → LinkedIn (temporal).

### Impacto global (mapa)
- Mapa SVG interactivo (no imagen) con zoom limitado 1×–3×, botones + / − / restablecer, pellizco en móvil y arrastre solo con zoom.
- 14 experiencias en 12 pines. Las de la misma ciudad comparten pin con paginación ‹ › (Medellín: Makaia, Perficient, Enseña por Colombia).
- Cada pin abre una mini-card: imagen, organización/evento, ciudad y descripción. En móvil la card se acopla abajo.
- Una onda cruza bajo las métricas y se funde con la sección siguiente.

### Lo que hago
- Eyebrow "LO QUE HAGO". Título "Las tres áreas en las que **trabajo**".
- Tres columnas alineadas (subgrid): Estrategia de IA · Innovación para impacto · Educación y desarrollo de talento.
- Botón "Conoce más" → LinkedIn (temporal).

### Blog
- Título "Ideas para un futuro más **humano**". Botón "Todos los artículos" → juandaramirez.substack.com.
- Tres artículos con su URL específica de Substack: The Efficiency Trap, La rebeldía silenciosa, The Guilt of not moving forward.

### Trabajemos juntos
- Titular "¿Cómo podemos trabajar juntos?", botón "Hablemos" → `/contact`.
- Texto manuscrito: "Más ideas. / Más conexiones. / Mejores oportunidades." con flecha dibujada.

### Footer
- "JuanDavidRamírez" (igual al header) + "Tecnología · Impacto · Educación".
- Links del menú, LinkedIn, Instagram, Substack. Frase "Un futuro más humano es posible".

### Página /contact
- Formulario (nombre, email, asunto opcional, mensaje) con validación, anti-spam y envío vía Resend.

---

## 3. Decisiones de diseño relevantes

| Decisión | Por qué |
|---|---|
| Fondo continuo para Sobre mí → Impacto → Lo que hago (`ContinuousSurface`) | Cada sección tenía su degradado y se veían líneas de corte entre secciones |
| Tarjetas del Hero según el Figma, con las inferiores cerca del borde de la pantalla | Efecto "cortado" para invitar al scroll |
| Corte responsive del Hero en 1340 px | Por debajo las tarjetas no caben alrededor de la foto sin chocar |
| Hover de tarjetas que solo crece hacia abajo; acordeón vertical en pantallas pequeñas | Evitar parpadeo y choques entre tarjetas (problema visto en tablet) |
| Pines agrupados por ciudad | Varias experiencias en Medellín quedaban superpuestas |
| Sin zoom con la rueda del mouse en el mapa | Para no atrapar el scroll de la página |
| Botones sin destino se ven como botón pero no navegan | Evitar links rotos o placeholders (`#`) |
| Todos los links en `content/links.ts` (fuente: Notion "Links Sitio web") | Un solo lugar para cambiar destinos |

---

## 4. Pendientes

### Contenido
- **Imágenes del mapa:** las actuales son recortes del mapa (temporales). Reemplazar en `content/home.ts` → `impactLocations[].card.image.src`.
- **Cifra de países del mapa:** dice "6 — Colombia, EE.UU., Argentina, Suecia, México, España"; con los pines actuales son 9 (+ Brasil, Alemania, Irlanda del Norte).
- **Frase del footer** "Un futuro más humano es posible": confirmar si se mantiene.
- **Erratas a revisar en las cifras:** "Paises" (sin tilde) y "fortalecidad".
- **Ondas superiores del Hero:** son una aproximación. Para que sean idénticas, exportar esa capa desde Figma (PNG 2x).

### Links temporales (→ LinkedIn)
- "Conoce más de mí" (Sobre mí) → futura página Sobre mí.
- "Conoce más" (Lo que hago) → futura página de portafolio.
- Selector "En" → futura versión en inglés.

### Configuración
- **Formulario de contacto:** cargar en Vercel `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Opcional: verificar el dominio en Resend para enviar desde `contacto@juandavidramirez.com`.
- **`NEXT_PUBLIC_SITE_URL`:** definir `https://www.juandavidramirez.com` en Vercel y redesplegar, para que canonical, sitemap y Open Graph usen el dominio (si aún no se hizo).

---

## 5. Exploraciones de diseño (`design-explorations/`)

Mockups estáticos, no forman parte del sitio ni se publican.

| Carpeta | Contenido | Resultado |
|---|---|---|
| `hero-option-1/2/3` | Tres composiciones de perfiles (refinamiento, orbital, nodos) | Se eligió la orbital |
| `orbital-v2/` | Satélites con hover vs. estáticos; opción 1b solo a la derecha | Base de las tarjetas actuales |
| `hero-copy/`, `hero-copy-v2/`, `hero-copy-v3/` | Alternativas de titular y eyebrow | Se eligió "De la IA al impacto" (v3, opción 3) |
