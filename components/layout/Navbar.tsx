"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Content } from "@/content";
import { CtaButton } from "@/components/ui/CtaButton";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useLang } from "@/components/i18n/LangProvider";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import styles from "./Navbar.module.css";

type Props = { site: Content["site"]; navigation: Content["navigation"] };

export function Navbar({ site, navigation }: Props) {
  const { ui } = useLang();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // Si hay un pop-up abierto (p. ej. Hablemos), Esc lo cierra a él y el menú sigue abierto.
      if (e.key === "Escape" && !document.querySelector("dialog[open]")) {
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
        <Link href={navigation.home} className={styles.brand} aria-label={ui.nav.homeAria} onClick={close}>
          <Wordmark primary={site.brand.primary} secondary={site.brand.secondary} />
        </Link>

        <nav aria-label={ui.nav.label} className={styles.nav}>
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
              <CtaButton cta={navigation.cta} />
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <CtaButton cta={navigation.cta} className={styles.cta} />
          <LanguageSwitcher className={styles.langFull} />
          <LanguageSwitcher className={styles.langCompact} compact />
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
