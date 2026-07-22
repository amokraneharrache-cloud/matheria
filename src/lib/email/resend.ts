import { Resend } from "resend";
import { CONTACT_EMAIL } from "@/lib/site";

type SendAccessCodeEmailParams = {
  to: string;
  accessCode: string;
  siteUrl: string;
  customerEmail?: string;
};

type SendPlanningRevisionEmailParams = {
  to: string;
  siteUrl: string;
};

let resendClient: Resend | null = null;

function getResendApiKey() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY non configurée côté serveur.");
  }

  return apiKey;
}

function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(getResendApiKey());
  }

  return resendClient;
}

function getEmailConfig() {
  const from = process.env.SPRINTMATHS_EMAIL_FROM;
  const replyTo = process.env.SPRINTMATHS_EMAIL_REPLY_TO;

  if (!from) {
    throw new Error("SPRINTMATHS_EMAIL_FROM non configurée côté serveur.");
  }

  if (!replyTo) {
    throw new Error("SPRINTMATHS_EMAIL_REPLY_TO non configurée côté serveur.");
  }

  return { from, replyTo };
}

export function isResendEmailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.SPRINTMATHS_EMAIL_FROM &&
      process.env.SPRINTMATHS_EMAIL_REPLY_TO,
  );
}

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/+$/, "");
}

export async function sendPlanningRevisionEmail(params: SendPlanningRevisionEmailParams) {
  const { from, replyTo } = getEmailConfig();
  const siteUrl = normalizeSiteUrl(params.siteUrl);
  const planningUrl = `${siteUrl}/planning-revision-bac-maths`;
  const printableUrl = `${siteUrl}/planning-bac-maths-2027.html`;
  const diagnosticUrl = `${siteUrl}/diagnostic`;
  const correctedSubjectsUrl = `${siteUrl}/sujets-type-bac-maths-terminale#sujet-corrige-guide`;
  const offerUrl = `${siteUrl}/bac-maths-2027?utm_source=planning_email&utm_medium=email&utm_campaign=rentree_2026#offre`;

  const text = `Bonjour,

C'est bien noté : voici ton planning de révision Bac Maths 2027.

L'idée n'est pas de tout revoir au hasard, mais de travailler les chapitres qui rapportent le plus (suites, limites, dérivation et convexité, logarithme, intégrales, probabilités, géométrie dans l'espace) et de t'entraîner sur des exercices type bac.

1) Ouvre ton planning :
${planningUrl}

Version imprimable (à garder sur ton bureau) :
${printableUrl}

2) Identifie tes chapitres prioritaires avec le diagnostic gratuit :
${diagnosticUrl}

3) Entraîne-toi sur un sujet type bac corrigé pas à pas :
${correctedSubjectsUrl}

4) Si tu veux réunir les méthodes, exercices guidés et sujets type bac dans un parcours complet, découvre le Pack Révision Express à 39 € en paiement unique :
${offerUrl}

Une question ? Réponds directement à cet email ou écris à ${CONTACT_EMAIL}.

À bientôt,
L'équipe SprintMaths`;

  const linkBlock = (label: string, url: string) =>
    `<p style="margin: 16px 0 4px;"><strong>${label}</strong><br><a href="${url}" style="color: #1e3a8a;">${url}</a></p>`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; max-width: 560px;">
      <p>Bonjour,</p>
      <p>C'est bien noté : voici ton planning de révision Bac Maths 2027.</p>
      <p>L'idée n'est pas de tout revoir au hasard, mais de travailler les chapitres qui rapportent le plus (suites, limites, dérivation et convexité, logarithme, intégrales, probabilités, géométrie dans l'espace) et de t'entraîner sur des exercices type bac.</p>
      <p style="margin: 24px 0;">
        <a href="${planningUrl}" style="display: inline-block; background: #1e3a8a; color: #ffffff; padding: 12px 24px; border-radius: 9999px; font-weight: 700; text-decoration: none;">Ouvrir mon planning</a>
      </p>
      ${linkBlock("Version imprimable (à garder sur ton bureau) :", printableUrl)}
      ${linkBlock("Identifie tes chapitres prioritaires avec le diagnostic gratuit :", diagnosticUrl)}
      ${linkBlock("Entraîne-toi sur un sujet type bac corrigé pas à pas :", correctedSubjectsUrl)}
      ${linkBlock("Découvre le Pack Révision Express à 39 € en paiement unique :", offerUrl)}
      <p style="margin-top: 24px;">Une question ? Réponds directement à cet email ou écris à <a href="mailto:${CONTACT_EMAIL}" style="color: #1e3a8a;">${CONTACT_EMAIL}</a>.</p>
      <p>À bientôt,<br>L'équipe SprintMaths</p>
    </div>
  `;

  return getResendClient().emails.send({
    from,
    to: params.to,
    replyTo,
    subject: "Ton planning Bac Maths 2027 — 30 jours",
    html,
    text,
  });
}

export async function sendAccessCodeEmail(params: SendAccessCodeEmailParams) {
  const { from, replyTo } = getEmailConfig();
  const siteUrl = normalizeSiteUrl(params.siteUrl);
  const merciUrl = `${siteUrl}/merci`;
  const connexionUrl = `${siteUrl}/connexion`;

  const text = `Bonjour,

Merci pour votre réservation du Pack Révision Express SprintMaths.

Voici votre code d'accès personnel :

${params.accessCode}

Pour créer l'espace élève :
${merciUrl}

Si vous avez déjà créé l'espace :
${connexionUrl}

Ce code est personnel et utilisable une seule fois pour créer l'espace élève.

Besoin d'aide ? Écrivez à ${CONTACT_EMAIL}.

À bientôt,
L'équipe SprintMaths`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <p>Bonjour,</p>
      <p>Merci pour votre réservation du Pack Révision Express SprintMaths.</p>
      <p>Voici votre code d'accès personnel :</p>
      <p style="font-size: 24px; font-weight: 700; letter-spacing: 0.08em; color: #4f46e5;">${params.accessCode}</p>
      <p>Pour créer l'espace élève :<br><a href="${merciUrl}">${merciUrl}</a></p>
      <p>Si vous avez déjà créé l'espace :<br><a href="${connexionUrl}">${connexionUrl}</a></p>
      <p>Ce code est personnel et utilisable une seule fois pour créer l'espace élève.</p>
      <p>Besoin d'aide ? Écrivez à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
      <p>À bientôt,<br>L'équipe SprintMaths</p>
    </div>
  `;

  return getResendClient().emails.send({
    from,
    to: params.to,
    replyTo,
    subject: "Votre code d'accès SprintMaths",
    html,
    text,
  });
}
