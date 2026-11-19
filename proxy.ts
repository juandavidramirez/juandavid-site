import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, detectLocale, englishToInternal, toEnglishPath, toSpanishPath } from "@/lib/i18n";

/**
 * Language routing (see lib/i18n.ts):
 * - Spanish pages keep their current URLs; English pages live under /en.
 * - Language preference: the cookie set by the language switcher; without it, the browser language
 *   (Accept-Language) on the first visit. Crawlers are never redirected.
 * - Internally, every page is served from app/[lang]/…
 */

const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|skype|discord|embedly|headless|lighthouse/i;

/** Print sources for the PDFs: always served in their own language (the PDF script runs headless). */
const isPrintPage = (path: string) => /\/pdf$/.test(path);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const chosen = cookie === "en" || cookie === "es" ? cookie : null;
  const isBot = BOT_UA.test(request.headers.get("user-agent") ?? "");

  const redirect = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.redirect(url);
  };
  const rewrite = (path: string) => {
    const url = request.nextUrl.clone();
    url.pathname = path;
    return NextResponse.rewrite(url);
  };

  // /es/... is never public: Spanish URLs have no prefix.
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    return redirect(pathname.slice(3) || "/");
  }

  // English URLs.
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    // Old or internal Spanish slug under /en → its English public URL.
    const canonical = toEnglishPath(toSpanishPath(pathname));
    if (canonical !== pathname) return redirect(canonical);
    if (chosen === "es" && !isBot && !isPrintPage(pathname)) return redirect(toSpanishPath(pathname));
    return rewrite(englishToInternal(pathname));
  }

  // Spanish URLs (no prefix).
  if (!isBot && !isPrintPage(pathname)) {
    const preferred = chosen ?? detectLocale(request.headers.get("accept-language"));
    if (preferred === "en") return redirect(toEnglishPath(pathname));
  }
  return rewrite(pathname === "/" ? "/es" : `/es${pathname}`);
}

export const config = {
  // Pages only: no API, counted downloads, admin panel, Next internals or files with an extension.
  matcher: ["/((?!api/|docs/|go/|admin/|files/|images/|_next/|_vercel/|.*\\.[a-zA-Z0-9]+$).*)"],
};
