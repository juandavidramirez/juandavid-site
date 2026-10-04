import Link from "next/link";
import { footer, navigation, social } from "@/content/site";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <Link href={navigation.home} aria-label="Inicio">
            <Wordmark primary={footer.brand.primary} secondary={footer.brand.secondary} />
          </Link>
          <p className={styles.descriptor}>{footer.descriptor}</p>
        </div>

        <nav aria-label="Pie de página">
          <ul className={styles.links}>
            {footer.links
              .filter((l) => !l.disabled)
              .map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
          </ul>
        </nav>

        <ul className={styles.social}>
          {social.map((s) => (
            <li key={s.network}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                <Icon name={s.network} size={s.network === "substack" ? 26 : 24} />
              </a>
            </li>
          ))}
        </ul>

        <p className={styles.statement}>{footer.statement}</p>
      </div>
    </footer>
  );
}
