import { after } from "next/server";
import { DOWNLOADS, isCountable, recordHit } from "@/lib/downloads";

/** /docs/<archivo>.pdf → cuenta la descarga y redirige al PDF real en /files/. */
export async function GET(request: Request, ctx: RouteContext<"/docs/[file]">) {
  const { file } = await ctx.params;
  const item = DOWNLOADS[file];
  if (!item) return new Response("No encontrado", { status: 404 });

  if (isCountable(request)) after(() => recordHit(item.id));

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/files/${encodeURIComponent(file)}`,
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
