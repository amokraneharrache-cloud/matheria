import { randomBytes } from "node:crypto";
import { absoluteUrl } from "@/lib/site";
import { CONSENT_VERSION } from "@/lib/email/consentText";

// Le wording et sa version vivent dans `consentText` (sans dépendance serveur)
// pour être partagés avec les composants client des formulaires.
export { CONSENT_VERSION, MARKETING_CONSENT_LABEL } from "@/lib/email/consentText";

export type MarketingConsentFields = {
  marketing_consent: boolean;
  marketing_consent_at: string | null;
  consent_version: string | null;
  unsubscribe_token: string;
};

/**
 * Construit les champs de consentement à stocker pour un nouveau lead.
 *
 * Le jeton de désinscription est généré pour tout le monde — y compris les
 * personnes sans opt-in — afin qu'un lien de désinscription reste utilisable si
 * la personne consent plus tard, sans avoir à modifier la ligne.
 */
export function buildConsentFields(hasConsent: boolean): MarketingConsentFields {
  const consented = hasConsent === true;

  return {
    marketing_consent: consented,
    // La contrainte SQL exige une date dès que le consentement est vrai.
    marketing_consent_at: consented ? new Date().toISOString() : null,
    consent_version: consented ? CONSENT_VERSION : null,
    unsubscribe_token: generateUnsubscribeToken(),
  };
}

/**
 * Jeton opaque de 32 octets. Aléatoire cryptographique, jamais dérivé de
 * l'email : l'URL publique de désinscription ne doit rien révéler.
 */
export function generateUnsubscribeToken() {
  return randomBytes(32).toString("hex");
}

export function unsubscribeUrl(token: string) {
  return absoluteUrl(`/api/email/unsubscribe?t=${encodeURIComponent(token)}`);
}

/**
 * Normalise une source d'acquisition en un petit vocabulaire fermé.
 * Aucune donnée personnelle ne doit transiter par ce champ.
 */
export function normalizeAcquisitionSource(utmSource?: unknown, referrer?: unknown) {
  const raw = typeof utmSource === "string" ? utmSource.trim().toLowerCase() : "";

  if (raw) {
    if (raw.includes("tiktok")) return "tiktok";
    if (raw.includes("instagram") || raw === "ig") return "instagram";
    if (raw.includes("youtube") || raw === "yt") return "youtube";
    if (raw.includes("google")) return "organic_google";
    if (raw.includes("email") || raw.includes("newsletter")) return "email";
    return raw.slice(0, 40);
  }

  const ref = typeof referrer === "string" ? referrer.trim().toLowerCase() : "";
  if (!ref) {
    return "direct";
  }
  if (ref.includes("google.")) return "organic_google";
  if (ref.includes("tiktok.")) return "tiktok";
  if (ref.includes("instagram.")) return "instagram";
  if (ref.includes("youtube.") || ref.includes("youtu.be")) return "youtube";

  return "autre";
}
