import type { Metadata } from "next";
import { contactPage } from "@/content/contact";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className={styles.section} aria-labelledby="contact-page-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <Eyebrow>{contactPage.eyebrow}</Eyebrow>
          <h1 id="contact-page-title" className={`h2 ${styles.title}`}>
            <RichText value={contactPage.title} />
          </h1>
          <p className={styles.description}>{contactPage.description}</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
