/**
 * Consentiment de cookies (mock a localStorage, coherent amb la resta de l'app).
 *
 * Desa la decisió de l'usuari sota la clau `cookie-consent`. No hi ha backend:
 * és una preferència del navegador, no de l'usuari autenticat.
 */

export type CookieConsent = "accepted" | "rejected";

const STORAGE_KEY = "cookie-consent";

/** Retorna la decisió desada, o `null` si l'usuari encara no n'ha pres cap. */
export function getConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    // localStorage no disponible (mode privat, etc.) → tractem com sense decisió.
    return null;
  }
}

/** Desa la decisió de l'usuari. */
export function saveConsent(decision: CookieConsent): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, decision);
  } catch {
    // Si no es pot escriure, ho ignorem silenciosament.
  }
}
