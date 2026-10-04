import Image from "next/image";
import { purpose } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import styles from "./Purpose.module.css";

export function Purpose() {
  return (
    <section id={purpose.id} className={styles.section} aria-labelledby="purpose-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.media}>
          <Image
            src={purpose.image.src}
            alt={purpose.image.alt}
            width={purpose.image.width}
            height={purpose.image.height}
            sizes="(max-width: 900px) 92vw, 617px"
            quality={85}
          />
        </div>
        <div className={styles.copy}>
          <Eyebrow>{purpose.eyebrow}</Eyebrow>
          <h2 id="purpose-title" className={`h2 ${styles.title}`}>
            <RichText value={purpose.title} />
          </h2>
          <p className={styles.description}>{purpose.description}</p>
          <ButtonLink cta={purpose.cta} className={styles.cta} />
        </div>
      </div>
    </section>
  );
}
