import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Caveat, Manrope, Montserrat } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/analytics/Analytics";
import { LangProvider } from "@/components/i18n/LangProvider";
import { getContent, isLocale, locales } from "@/content";
import { languageAlternates } from "@/lib/seo";
import "../globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "600"],
  variable: "--font-montserrat",
  display: "swap",
});
const caveat = Caveat({ subsets: ["latin"], weight: "400", variable: "--font-caveat", display: "swap" });

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const { site } = getContent(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: site.title, template: `%s · ${site.name}` },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    alternates: languageAlternates(lang, "/"),
    openGraph: {
      type: "website",
      locale: site.locale,
      alternateLocale: lang === "en" ? ["es_CO"] : ["en_US"],
      url: lang === "en" ? "/en" : "/",
      siteName: site.name,
      title: site.title,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      creator: site.twitterHandle,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#011128",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const content = getContent(lang);

  return (
    <html lang={lang} className={`${manrope.variable} ${montserrat.variable} ${caveat.variable}`}>
      <body>
        <LangProvider value={{ lang, ui: content.ui, contactPage: content.contactPage }}>
          <a className="skip-link" href="#main">
            {content.ui.skipLink}
          </a>
          <Navbar site={content.site} navigation={content.navigation} />
          <main id="main">{children}</main>
          <Footer lang={lang} />
          <Analytics />
        </LangProvider>
      </body>
    </html>
  );
}
