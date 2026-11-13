/**
 * Conteo de descargas en el servidor, sin cookies ni datos personales.
 *
 * Los botones apuntan a /docs/<archivo> y /go/<destino>. Esas rutas suman 1 en Upstash Redis
 * (contador total y por día) y redirigen al archivo real en /files/ o al sitio externo.
 * Así se cuentan también las personas que rechazan cookies o usan bloqueadores.
 *
 * Requiere las variables que crea la integración de Upstash en Vercel:
 *   KV_REST_API_URL + KV_REST_API_TOKEN  (o UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN)
 * Sin ellas, las rutas redirigen igual y simplemente no cuentan.
 */

export type TrackedItem = { id: string; label: string };

/** Archivos descargables: nombre público en /docs → archivo real en /files. */
export const DOWNLOADS: Record<string, TrackedItem> = {
  "Reporte_Bridging_the_Skill_Gap_Juan_David_Ramirez.pdf": { id: "reporte", label: "Descargar reporte (PDF)" },
  "Tesis_Bridging_the_Skill_Gap_Juan_David_Ramirez.pdf": { id: "tesis", label: "Descargar tesis (PDF)" },
};

/** Enlaces externos contados: /go/<clave> → URL. */
export const OUTBOUND: Record<string, TrackedItem & { url: string }> = {
  diva: {
    id: "diva",
    label: "Leer la tesis en DiVA",
    url: "https://mau.diva-portal.org/smash/record.jsf?pid=diva2:1993589",
  },
};

export const TRACKED_ITEMS: TrackedItem[] = [...Object.values(DOWNLOADS), ...Object.values(OUTBOUND)];

/** Rastreadores y vistas previas de enlaces (WhatsApp, LinkedIn, Slack…) no cuentan como descarga. */
const BOT_UA =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|skype|discord|embedly|pinterest|quora|vkshare|headless|lighthouse|curl|wget|python|httpclient|axios|node-fetch|go-http|java\//i;

export function isCountable(request: Request) {
  if (request.method !== "GET") return false;
  const h = request.headers;
  if (h.get("purpose") === "prefetch" || h.get("sec-purpose")?.includes("prefetch")) return false;
  const ua = h.get("user-agent") ?? "";
  return ua.length > 0 && !BOT_UA.test(ua);
}

function redisConfig() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function redis(commands: (string | number)[][]): Promise<unknown[] | null> {
  const cfg = redisConfig();
  if (!cfg) return null;
  const res = await fetch(`${cfg.url}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Upstash ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: string }[];
  return json.map((r) => r.result ?? null);
}

/** Fecha en hora de Colombia, formato AAAA-MM-DD. */
export function dayKey(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(date);
}

export async function recordHit(id: string) {
  try {
    await redis([
      ["INCR", `dl:${id}:total`],
      ["INCR", `dl:${id}:${dayKey()}`],
    ]);
  } catch (err) {
    console.error("[downloads] no se pudo registrar", id, err);
  }
}

export type ItemStats = TrackedItem & { total: number; last7: number; last30: number; days: number[] };

/** Totales y últimos 30 días (más reciente primero) de cada elemento contado. */
export async function getStats(): Promise<{ configured: boolean; dates: string[]; items: ItemStats[] }> {
  const dates = Array.from({ length: 30 }, (_, i) => dayKey(new Date(Date.now() - i * 86_400_000)));
  const configured = redisConfig() !== null;
  const empty = TRACKED_ITEMS.map((it) => ({ ...it, total: 0, last7: 0, last30: 0, days: dates.map(() => 0) }));
  if (!configured) return { configured, dates, items: empty };

  const keys = TRACKED_ITEMS.flatMap((it) => [`dl:${it.id}:total`, ...dates.map((d) => `dl:${it.id}:${d}`)]);
  const [values] = (await redis([["MGET", ...keys]])) as [(string | null)[]];
  const per = dates.length + 1;
  const items = TRACKED_ITEMS.map((it, i) => {
    const slice = values.slice(i * per, (i + 1) * per).map((v) => Number(v ?? 0));
    const days = slice.slice(1);
    return {
      ...it,
      total: slice[0],
      last7: days.slice(0, 7).reduce((a, b) => a + b, 0),
      last30: days.reduce((a, b) => a + b, 0),
      days,
    };
  });
  return { configured, dates, items };
}
