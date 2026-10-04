import { ContinuousSurface } from "@/components/layout/ContinuousSurface";
import { Hero } from "@/components/sections/Hero";
import { Purpose } from "@/components/sections/Purpose";
import { GlobalImpact } from "@/components/sections/GlobalImpact";
import { ImpactAreas } from "@/components/sections/ImpactAreas";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ContinuousSurface>
        <Purpose />
        <GlobalImpact />
        <ImpactAreas />
      </ContinuousSurface>
      <BlogPreview />
      <ContactCTA />
    </>
  );
}
