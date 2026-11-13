"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { GA_ID, getConsent, setConsent, subscribeConsent, type Consent } from "@/lib/analytics";
import styles from "./Analytics.module.css";

// En el servidor no hay elección todavía: "pending" evita mostrar el aviso antes de leer localStorage.
const useConsent = () =>
  useSyncExternalStore<Consent | null | "pending">(subscribeConsent, getConsent, () => "pending");

/** Carga Google Analytics solo con consentimiento y muestra el aviso de cookies mientras no haya respuesta. */
export function Analytics() {
  const consent = useConsent();

  return (
    <>
      {consent === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
// En local no se envían visitas, para no ensuciar los datos.
if (!/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)) gtag('config', '${GA_ID}');`}
          </Script>
        </>
      )}

      {consent === null && (
        <div className={styles.banner} role="region" aria-label="Aviso de cookies">
          <p>
            Uso cookies de Google Analytics para saber qué páginas y recursos son útiles. Solo se activan si
            aceptas.
          </p>
          <div className={styles.actions}>
            <button type="button" className={styles.accept} onClick={() => setConsent("granted")}>
              Aceptar
            </button>
            <button type="button" className={styles.reject} onClick={() => setConsent("denied")}>
              Rechazar
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** Enlace del pie de página para cambiar la elección (vuelve a mostrar el aviso). */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        // Si ya estaba aceptado, recargar desactiva GA en esta pestaña al volver a elegir.
        const wasGranted = getConsent() === "granted";
        setConsent(null);
        if (wasGranted) window.location.reload();
      }}
    >
      Preferencias de cookies
    </button>
  );
}
