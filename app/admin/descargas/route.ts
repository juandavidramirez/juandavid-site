import { timingSafeEqual } from "node:crypto";
import { getStats } from "@/lib/downloads";

/**
 * Panel privado con el conteo de descargas: /admin/descargas
 * Protegido con usuario y contraseña del navegador (Basic Auth). La contraseña es la variable STATS_PASSWORD
 * (en Vercel → Settings → Environment Variables). El usuario puede ser cualquiera.
 */
export const dynamic = "force-dynamic";

function authorized(request: Request) {
  const expected = process.env.STATS_PASSWORD;
  if (!expected) return false;
  const header = request.headers.get("authorization") ?? "";
  if (!header.startsWith("Basic ")) return false;
  const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
  const password = decoded.slice(decoded.indexOf(":") + 1);
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

export async function GET(request: Request) {
  if (!process.env.STATS_PASSWORD) {
    return new Response("Falta configurar STATS_PASSWORD en Vercel.", { status: 503 });
  }
  if (!authorized(request)) {
    return new Response("Acceso restringido", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Descargas", charset="UTF-8"' },
    });
  }

  const { configured, dates, items } = await getStats();
  const max = Math.max(1, ...items.flatMap((i) => i.days));
  const fmt = (d: string) => new Date(`${d}T12:00:00`).toLocaleDateString("es-CO", { day: "numeric", month: "short" });

  const cards = items
    .map(
      (it) => `<div class="card"><p class="label">${esc(it.label)}</p><p class="num">${it.total}</p>
      <p class="sub">${it.last7} en 7 días · ${it.last30} en 30 días</p></div>`,
    )
    .join("");

  const rows = dates
    .map(
      (d, di) => `<tr><th>${fmt(d)}</th>${items
        .map((it) => {
          const v = it.days[di];
          return `<td><span class="bar" style="width:${Math.round((v / max) * 100)}%"></span><b>${v || ""}</b></td>`;
        })
        .join("")}</tr>`,
    )
    .join("");

  const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow"><title>Descargas · Juan David Ramírez</title>
<style>
:root{--navy:#011128;--pale:#cbe4ee;--gold:#ffbd42;--blue:#4a7af5}
*{box-sizing:border-box}body{margin:0;background:radial-gradient(40% 40% at 0 0,rgba(74,122,245,.6),transparent 70%),var(--navy);color:var(--pale);font:16px/1.5 Manrope,system-ui,sans-serif;padding:32px 16px}
main{max-width:960px;margin:0 auto}h1{margin:0;font-size:32px;color:#fff}h1 span{color:var(--gold)}
.note{margin:8px 0 0;color:rgba(203,228,238,.75);font-size:14px}.warn{margin-top:16px;padding:12px 16px;border:1px solid var(--gold);border-radius:16px}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin-top:28px}
.card{padding:20px;border-radius:24px;border:1px solid rgba(74,122,245,.7);background:linear-gradient(160deg,rgba(3,60,170,.55),rgba(1,30,90,.75))}
.label{margin:0;font-size:13px;letter-spacing:.15em;text-transform:uppercase}.num{margin:6px 0 0;font-size:48px;font-weight:700;line-height:1;color:var(--gold)}.sub{margin:8px 0 0;font-size:14px}
h2{margin:36px 0 12px;font-size:20px;color:#fff}.wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;font-size:14px}
th,td{padding:6px 8px;border-bottom:1px solid rgba(203,228,238,.1);text-align:left;white-space:nowrap}thead th{color:rgba(203,228,238,.7);font-weight:600}
td{position:relative;min-width:120px}.bar{position:absolute;left:8px;top:50%;height:10px;transform:translateY(-50%);border-radius:5px;background:rgba(113,192,253,.35);max-width:calc(100% - 40px)}td b{position:relative;margin-left:4px;color:#fff}
</style></head><body><main>
<h1>Descargas del <span>reporte</span></h1>
<p class="note">Conteo en el servidor, sin cookies. No incluye rastreadores ni vistas previas de enlaces. Fechas en hora de Colombia.</p>
${configured ? "" : '<p class="warn">Falta conectar la base de datos (Upstash) en Vercel: por ahora no se está contando.</p>'}
<div class="cards">${cards}</div>
<h2>Últimos 30 días</h2>
<div class="wrap"><table><thead><tr><th>Día</th>${items.map((i) => `<th>${esc(i.label)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table></div>
</main></body></html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
