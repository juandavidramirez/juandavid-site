import type { Metadata } from "next";
import { ContinuousSurface } from "@/components/layout/ContinuousSurface";
import { Hero } from "@/components/sections/Hero";
import { Purpose } from "@/components/sections/Purpose";
import { GlobalImpact } from "@/components/sections/GlobalImpact";
import { ImpactAreas } from "@/components/sections/ImpactAreas";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { languageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return { alternates: languageAlternates(lang, "/") };
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  return (
    <>
      <Hero lang={lang} />
      <ContinuousSurface>
        <Purpose lang={lang} />
        <GlobalImpact lang={lang} />
        <ImpactAreas lang={lang} />
      </ContinuousSurface>
      <BlogPreview lang={lang} />
      <ContactCTA lang={lang} />
    </>
  );
}
