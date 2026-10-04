import Image from "next/image";
import { hero } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <Eyebrow className={styles.eyebrow}>
            {hero.eyebrow.map((word, i) => (
              <span key={word}>
                {i > 0 && <span className={styles.dot} aria-hidden="true">·</span>}
                {word}
              </span>
            ))}
          </Eyebrow>
          <h1 id="hero-title" className={styles.title}>
            <RichText value={hero.title} />
          </h1>
          <p className={styles.description}>{hero.description}</p>
          <div className={styles.ctas}>
            {hero.ctas.map((cta) => (
              <ButtonLink key={cta.label} cta={cta} arrow={cta.variant !== "outline"} />
            ))}
          </div>
        </div>

        <div className={styles.portrait}>
          <Image
            src={hero.image.src}
            alt={hero.image.alt}
            width={hero.image.width}
            height={hero.image.height}
            sizes="(max-width: 900px) 90vw, 560px"
            preload
            fetchPriority="high"
            quality={80}
          />
        </div>
      </div>
      {/* Figma "image 740": light ribbons crossing the hero, behind the portrait. */}
      <Image
        className={styles.wave}
        src="/images/decor/wave-hero-lines.webp"
        alt=""
        width={1774}
        height={887}
        sizes="(max-width: 900px) 220vw, 110vw"
        aria-hidden="true"
      />
    </section>
  );
}
