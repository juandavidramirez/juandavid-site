# Juan David Ramírez — sitio personal

Next.js 16 (App Router) + TypeScript + CSS Modules. Sin librerías de UI; el mapa se dibuja como SVG en el servidor (d3-geo) y solo los puntos interactivos usan JavaScript en el navegador.

## Ejecutar localmente

```bash
npm install
cp .env.example .env.local   # completa las variables
npm run dev                  # http://localhost:3000
```

Producción:

```bash
npm run build
npm start
```

`npm run lint` revisa el código.

## Variables de entorno

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pública (canonical, sitemap, Open Graph). Ej. `https://www.tudominio.com`. Opcional en Vercel hasta que conectes dominio propio: si falta, se usa la URL de producción de Vercel. |
| `RESEND_API_KEY` | API key de [Resend](https://resend.com). Solo servidor. |
| `CONTACT_TO_EMAIL` | Correo donde llegan los mensajes (varios separados por coma). |
| `CONTACT_FROM_EMAIL` | Remitente, de un dominio verificado en Resend. Para pruebas: `onboarding@resend.dev` (solo entrega al correo de tu cuenta Resend). |

### Configurar el email
1. Crea una cuenta en Resend y verifica tu dominio (Domains → Add domain → registros DNS).
2. Crea una API key y ponla en `RESEND_API_KEY`.
3. Define `CONTACT_TO_EMAIL` y `CONTACT_FROM_EMAIL`.

El formulario (`/contact`) valida en cliente y servidor (`lib/contact.ts`), evita doble envío, y tiene protección anti-spam básica: campo trampa oculto, tiempo mínimo de llenado y límite de 5 envíos / 10 min por IP. El endpoint es `app/api/contact/route.ts`.

## Dónde está el contenido

Todo el texto, cifras, links e imágenes viven en `content/` — no hace falta tocar componentes:

| Archivo | Contenido |
|---|---|
| `content/links.ts` | **Todos los destinos de enlaces**: redes, Substack, artículos (fuente: página de Notion "Links Sitio web") y rutas internas |
| `content/site.ts` | Nombre/wordmark, SEO, navegación, idiomas, redes sociales, footer |
| `content/home.ts` | Hero, Propósito, Impacto global, cifras, ubicaciones del mapa, áreas, blog, CTA de contacto |
| `content/contact.ts` | Textos de la página y el formulario de contacto |
| `content/types.ts` | Forma de los datos (TypeScript avisa si falta algo) |

### Títulos con palabras resaltadas
Los títulos son listas de segmentos; `accent` puede ser `"yellow"`, `"blue"` o `"white"`. `\n` crea salto de línea:

```ts
title: [
  { text: "Creo en la tecnología como " },
  { text: "un puente", accent: "yellow" },
  { text: ", no como fin" },
]
```

### Cambiar imágenes
Pon el archivo en `public/images/` (WebP recomendado) y actualiza `src`, `alt`, `width` y `height` en `content/home.ts`. `width/height` son las dimensiones reales del archivo (evitan saltos de layout). Next/Image genera versiones AVIF/WebP optimizadas.

### Íconos de las áreas de impacto
En `content/home.ts → impactAreas.items`, cada área tiene `icon`. Por defecto es el nombre de un ícono de [Lucide](https://lucide.dev/icons); los disponibles están registrados en `components/ui/AreaIcon.tsx` (`brain-circuit`, `brain`, `network`, `cpu`, `lightbulb`, `target`, `rocket`, `users`, `graduation-cap`, `user-round-check`, …). Para usar otro ícono de Lucide, impórtalo y agrégalo a ese registro (así solo se incluyen los que usas).

Para usar tu propia imagen o SVG, ponla en `public/images/icons/` y escribe:

```ts
{ title: "…", description: "…", icon: "/images/icons/ai-strategy.svg", iconType: "image" }
```

### Cambiar un link
Todos los destinos viven en `content/links.ts` (`externalLinks` e `internalLinks`); el resto del contenido solo los referencia. Un CTA sin `href` se muestra como botón pero sin navegación, útil mientras su página no exista.

### Agregar un artículo del blog
Agrega su URL en `content/links.ts → externalLinks.articles` y luego, en `content/home.ts → blog.posts`:

```ts
{
  title: "Título",
  category: "Trabajo",
  date: "2025-06-01",            // ISO; se muestra como "1 JUN, 2025"
  readingTime: "4 min de lectura",
  url: externalLinks.articles.miArticulo,
  image: { src: "/images/blog/slug.webp", alt: "…", width: 900, height: 600 },
}
```

El componente `BlogPreview` solo recibe esta lista, así que más adelante puede venir del RSS de Substack sin rediseñarlo.

### Ubicaciones del mapa
En `content/home.ts → impactLocations`. `coordinates` es `[longitud, latitud]`:

```ts
{
  city: "Bogotá",                // opcional; se muestra bajo el título
  country: "Colombia",
  coordinates: [-74.07, 4.71],
  card: {
    title: "Colombia",
    description: "Una o dos líneas: qué pasó allí.",
    image: { src: "/images/map/bogota.webp", alt: "Descripción de la imagen" },
  },
}
```

Al seleccionar un punto aparece su **mini-card** (imagen + título + ciudad + descripción). La imagen puede tener cualquier tamaño: se recorta a 16:9 con `object-fit: cover`. Las imágenes actuales en `public/images/map/` son temporales (recortes del mapa); reemplázalas por fotos reales cambiando `card.image.src`. `category` y `year` existen en el tipo pero aún no se muestran (reservados para una futura vista ampliada). La card es `components/sections/ImpactLocationCard.tsx`; su posición junto al punto la maneja `ImpactMapPins.tsx`.

Los puntos se proyectan solos y las líneas punteadas los unen en el orden de la lista.

**Zoom del mapa** (`components/sections/ZoomableMap.tsx`): rango 1×–3× con botones `+ / − / restablecer`, pellizco en pantallas táctiles y arrastre solo cuando hay zoom (sin zoom con la rueda del mouse, para no atrapar el scroll de la página). Al abrir un punto, el mapa se acerca a él. Los límites (`MIN`, `MAX`, `STEP`, `FOCUS_SCALE`) están al inicio de ese archivo; los textos accesibles de los botones, en `globalImpact` de `content/home.ts`. Las cifras (`impactStats`) están en el mismo archivo; su posición sobre el mapa en desktop está en `components/sections/GlobalImpact.module.css`.

## Trabajar con el proyecto dentro de Google Drive
Para que Drive no sincronice miles de archivos, `node_modules` y `.next` son enlaces simbólicos a `~/Documents/juandavid-site-deps/`. Si clonas el repo en otra máquina no aplica: `npm install` crea `node_modules` normal. Si el enlace se rompe, recréalo:

```bash
mkdir -p ~/Documents/juandavid-site-deps/node_modules ~/Documents/juandavid-site-deps/next-cache
ln -s ~/Documents/juandavid-site-deps/node_modules node_modules
ln -s ~/Documents/juandavid-site-deps/next-cache .next
npm install
```

`next.config.ts` ajusta solo la raíz de Turbopack cuando detecta ese enlace; en Vercel no tiene efecto.

## Estructura

```
app/                 rutas (/, /contact, /api/contact), metadata, sitemap, robots, OG image, icono
components/layout/   Navbar, Footer
components/sections/ Hero, Purpose, GlobalImpact (+ ImpactMapPins, ImpactStats), ImpactAreas, BlogPreview, ContactCTA
components/ui/       Button, Eyebrow, RichText, Icon, AreaIcon, Wordmark
components/contact/  ContactForm
content/             contenido editable
lib/                 mapa (proyección), validación de contacto, formato de fechas
public/images/       assets locales (fotos, ondas, flecha)
```

Los tokens de diseño (colores, tipografías, espaciados, tamaños fluidos con `clamp()`) están al inicio de `app/globals.css`.

## Agregar una página nueva
1. Crea `app/about/page.tsx` (exporta `metadata` con título y descripción).
2. Si necesita contenido, crea `content/about.ts`.
3. Cambia el link en `content/site.ts → navigation.items` (p. ej. `"/#proposito"` → `"/about"`).
4. Añade la ruta a `app/sitemap.ts`.

Un ítem de navegación sin página puede marcarse `disabled: true` y se muestra deshabilitado sin link roto.

## Desplegar
La opción más simple es [Vercel](https://vercel.com): importa el repositorio, configura las variables de entorno y despliega. Cualquier host compatible con Next.js (Node 20+) funciona con `npm run build && npm start`.

## Pendientes de contenido
Marcados con `TODO(Juan David)` en `content/`:
- Destino sin definir en Notion (hoy sin navegación): "Conoce más de mí" (ver comentario al final de `content/links.ts`).
- "Conoce más" (Áreas de impacto) apunta temporalmente a LinkedIn; cambiar cuando exista la subpágina de portafolio.
- Ciudades, descripciones e imágenes reales de los puntos del mapa (las actuales son provisionales).
- La versión en inglés: el selector "En" está visible pero deshabilitado hasta que exista.
