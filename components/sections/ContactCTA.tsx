import Image from "next/image";
import { contact } from "@/content/home";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import styles from "./ContactCTA.module.css";

export function ContactCTA() {
  return (
    <section id={contact.id} className={styles.section} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 id="contact-title" className={`h2 h2-lg ${styles.title}`}>
            <RichText value={contact.title} />
          </h2>
          <p className={styles.description}>{contact.description}</p>
          <ButtonLink cta={contact.cta} className={styles.cta} />
        </div>
        <div className={styles.note} aria-hidden="true">
          <Image className={styles.arrow} src="/images/decor/hand-arrow.svg" alt="" width={95} height={108} />
          <p className={styles.hand}>{contact.handwritten}</p>
        </div>
      </div>
    </section>
  );
}
