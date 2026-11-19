"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/content";
import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, alternatePath } from "@/lib/i18n";
import { useLang } from "./LangProvider";
import styles from "./LanguageSwitcher.module.css";

const OPTIONS: Locale[] = ["es", "en"];

/** Saves the choice and opens the same page in the chosen language (full load, so <html lang> updates). */
function switchLanguage(target: Locale, current: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${target}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
  if (target === current) return;
  const { pathname, search } = window.location;
  window.location.assign(alternatePath(pathname, target) + search);
}

/**
 * "Idioma / Language" selector. Choosing a language saves it in a cookie (it then wins over the
 * browser language) and opens the same page in that language.
 * `compact` shows only the current code (ES/EN) — used in the mobile navbar.
 */
export function LanguageSwitcher({ className, compact = false }: { className?: string; compact?: boolean }) {
  const { lang, ui } = useLang();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey, true);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey, true);
    };
  }, [open]);

  const choose = (target: Locale) => {
    setOpen(false);
    switchLanguage(target, lang);
  };

  return (
    <div ref={wrapRef} className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <button
        type="button"
        className={`${styles.button} ${compact ? styles.compact : ""}`}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={compact ? `${ui.language.button}: ${lang.toUpperCase()}` : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{compact ? lang.toUpperCase() : ui.language.button}</span>
        <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" className={styles.chevron} />
      </button>
      <ul id={menuId} className={styles.menu} hidden={!open} aria-label={ui.language.menuLabel}>
        {OPTIONS.map((o) => (
          <li key={o}>
            <button
              type="button"
              className={styles.option}
              aria-current={o === lang ? "true" : undefined}
              lang={o}
              onClick={() => choose(o)}
            >
              <b>{o.toUpperCase()}</b>
              <span>{ui.language.names[o]}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
