"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigation, site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href={navigation.home} className={styles.brand} aria-label={`${site.name} — inicio`} onClick={close}>
          <Wordmark primary={site.brand.primary} secondary={site.brand.secondary} />
        </Link>

        <nav aria-label="Principal" className={styles.nav}>
          <ul id="site-menu" className={`${styles.links} ${open ? styles.open : ""}`}>
            {navigation.items.map((item) => (
              <li key={item.label}>
                {item.disabled ? (
                  <span className={styles.disabled} aria-disabled="true">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className={styles.link} onClick={close}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
            <li className={styles.menuCta}>
              <ButtonLink cta={navigation.cta} />
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <ButtonLink cta={navigation.cta} className={styles.cta} />
          <p className={styles.langs}>
            {navigation.languages.map((lang, i) => (
              <span key={lang.label}>
                {i > 0 && <span aria-hidden="true"> I </span>}
                {lang.href && !lang.active ? (
                  <a href={lang.href} hrefLang={lang.label.toLowerCase()}>
                    {lang.label}
                  </a>
                ) : (
                  <span
                    aria-current={lang.active ? "true" : undefined}
                    className={lang.active ? undefined : styles.langOff}
                    title={lang.active ? undefined : "Próximamente"}
                  >
                    {lang.label}
                  </span>
                )}
              </span>
            ))}
          </p>
          <button
            ref={toggleRef}
            type="button"
            className={styles.toggle}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? navigation.closeLabel : navigation.menuLabel}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
