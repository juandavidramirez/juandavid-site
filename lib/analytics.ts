/**
 * Google Analytics 4 con consentimiento.
 * - GA solo se carga si la persona acepta el aviso de cookies (la elección se guarda en localStorage).
 * - Descargas de PDF y clics a sitios externos (DiVA) los registra GA4 solo ("medición mejorada").
 * - `track()` envía eventos propios (p. ej. abrir el pop-up de contacto). Sin consentimiento no hace nada.
 */

export const GA_ID = "G-3GBVEEYYRG";

export type Consent = "granted" | "denied";
const KEY = "jd-analytics-consent";
const listeners = new Set<() => void>();

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent | null) {
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    /* almacenamiento bloqueado: la elección vale solo para esta visita */
  }
  listeners.forEach((l) => l());
}

export function subscribeConsent(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

type Gtag = (...args: unknown[]) => void;

export function track(event: string, params: Record<string, unknown> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", event, params);
}
