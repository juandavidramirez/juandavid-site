import { after } from "next/server";
import { OUTBOUND, isCountable, recordHit } from "@/lib/downloads";

/** /go/<destino> → cuenta el clic y redirige al sitio externo (p. ej. la tesis en DiVA). */
export async function GET(request: Request, ctx: RouteContext<"/go/[target]">) {
  const { target } = await ctx.params;
  const item = OUTBOUND[target];
  if (!item) return new Response("No encontrado", { status: 404 });

  if (isCountable(request)) after(() => recordHit(item.id));

  return new Response(null, {
    status: 302,
    headers: { Location: item.url, "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
  });
}
