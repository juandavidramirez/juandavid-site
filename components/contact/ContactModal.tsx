"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { contactPage } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { ContactForm } from "./ContactForm";
import styles from "./ContactModal.module.css";

type Props = {
  /** Texto del botón que abre el pop-up. */
  label?: string;
  variant?: "primary" | "outline";
  className?: string;
  /** Título y descripción del pop-up; por defecto, los de la página de contacto. */
  title?: string;
  description?: string;
};

/**
 * Botón "Hablemos" que abre el formulario de contacto en un pop-up, sin salir de la página.
 * Usa <dialog> nativo: atrapa el foco, cierra con Esc y devuelve el foco al botón.
 * Reutilizable en cualquier página (reporte, inicio, etc.).
 */
export function ContactModal({
  label = "Hablemos",
  variant = "primary",
  className,
  title = "Hablemos",
  description = contactPage.description,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  // Se monta el formulario al abrir: así cada apertura empieza limpia y el antispam mide desde ahí.
  const [formKey, setFormKey] = useState(0);
  const titleId = useId();
  const descId = useId();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const show = () => {
    setFormKey((k) => k + 1);
    setOpen(true);
    ref.current?.showModal();
  };
  const close = () => ref.current?.close();

  return (
    <>
      <Button type="button" variant={variant} arrow className={className} onClick={show} aria-haspopup="dialog">
        {label}
      </Button>

      <dialog
        ref={ref}
        className={styles.dialog}
        aria-labelledby={titleId}
        aria-describedby={descId}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          // Clic en el fondo (fuera de la tarjeta) cierra el pop-up.
          if (e.target === e.currentTarget) close();
        }}
      >
        <div className={styles.card}>
          <button type="button" className={styles.close} onClick={close} aria-label="Cerrar">
            <X size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <p id={descId} className={styles.description}>
            {description}
          </p>
          {open && (
            <div className={styles.form}>
              <ContactForm key={formKey} />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
