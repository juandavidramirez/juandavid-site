import type { Metadata } from "next";
import { getContent } from "@/content";
import { languageAlternates } from "@/lib/seo";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RichText } from "@/components/ui/RichText";
import styles from "./page.module.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  const { contactPage } = getContent(lang);
  return {
    title: contactPage.metaTitle,
    description: contactPage.metaDescription,
    alternates: languageAlternates(lang, "/contact"),
  };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  const { contactPage } = getContent(lang);
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
