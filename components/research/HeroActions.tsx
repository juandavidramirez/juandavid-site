"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Download, ExternalLink } from "lucide-react";
import styles from "./HeroActions.module.css";

type Option = { label: string; href?: string; kind: "download" | "external" };

type Props = {
  report: { label: string; href?: string };
  thesis: { label: string; options: Option[] };
  /** "outline" cuando otro botón (p. ej. Hablemos) es el principal. */
  reportVariant?: "primary" | "outline";
};

/**
 * Botones del hero del reporte: "Descargar reporte" y un desplegable
 * "Descargar tesis" (PDF o lectura en DiVA). Sin href, cada acción queda
 * visible pero deshabilitada.
 */
export function HeroActions({ report, thesis, reportVariant = "primary" }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.actions}>
      {report.href ? (
        <a href={report.href} download className={`${styles.btn} ${styles[reportVariant]}`}>
          <Download size={16} strokeWidth={1.8} aria-hidden="true" />
          {report.label}
        </a>
      ) : (
        <span className={`${styles.btn} ${styles[reportVariant]} ${styles.disabled}`} aria-disabled="true">
          <Download size={16} strokeWidth={1.8} aria-hidden="true" />
          {report.label}
        </span>
      )}

      <div ref={wrapRef} className={styles.dropdown}>
        <button
          type="button"
          className={`${styles.btn} ${styles.outline}`}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          {thesis.label}
          <ChevronDown size={16} strokeWidth={1.8} aria-hidden="true" className={styles.chevron} />
        </button>
        <ul id={menuId} className={styles.menu} hidden={!open}>
          {thesis.options.map((o) => {
            const Icon = o.kind === "download" ? Download : ExternalLink;
            const inner = (
              <>
                <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                {o.label}
              </>
            );
            return (
              <li key={o.label}>
                {o.href ? (
                  <a
                    href={o.href}
                    className={styles.item}
                    onClick={() => setOpen(false)}
                    {...(o.kind === "download"
                      ? { download: true }
                      : { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {inner}
                  </a>
                ) : (
                  <span className={`${styles.item} ${styles.disabled}`} aria-disabled="true">
                    {inner}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
