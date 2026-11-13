"use client";

import Script from "next/script";
import { useSyncExternalStore } from "react";
import { CLARITY_ID, GA_ID, getConsent, setConsent, subscribeConsent, type Consent } from "@/lib/analytics";
import styles from "./Analytics.module.css";

// En el servidor no hay elección todavía: "pending" evita mostrar el aviso antes de leer localStorage.
const useConsent = () =>
  useSyncExternalStore<Consent | null | "pending">(subscribeConsent, getConsent, () => "pending");

/** Carga Google Analytics y Microsoft Clarity solo con consentimiento y muestra el aviso de cookies mientras no haya respuesta. */
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
          <Script id="clarity-init" strategy="afterInteractive">
            {`if (!/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)) {
  (function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "${CLARITY_ID}");
  // La persona ya aceptó en el aviso: se lo indicamos a Clarity.
  window.clarity("consent");
}`}
          </Script>
        </>
      )}

      {consent === null && (
        <div className={styles.banner} role="region" aria-label="Aviso de cookies">
          <p>
            Uso cookies de Google Analytics y Microsoft Clarity para entender cómo se usa el sitio y qué
            recursos son útiles. Solo se activan si aceptas.
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
