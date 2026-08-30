import { Resend } from "resend";
import { PACK_REVISION_EXPRESS_LABEL } from "@/lib/offers";
import { CONTACT_EMAIL } from "@/lib/site";
import { renderEmail0, type SequenceStep } from "@/lib/email/sequence";
import { renderDiagnosticEmail } from "@/lib/email/diagnostic";
import type { DiagnosticDomainId } from "@/lib/diagnostic";

type SendAccessCodeEmailParams = {
  to: string;
  accessCode: string;
  siteUrl: string;
  customerEmail?: string;
};

type SendPlanningRevisionEmailParams = {
  to: string;
  siteUrl: string;
  /**
   * Lien de désinscription. Optionnel : l'email 0 est transactionnel, il ne
   * l'affiche pas. Il est accepté pour homogénéiser la signature côté runner.
   */
  unsubscribeUrl?: string;
};

type SendNurtureEmailParams = {
  to: string;
  siteUrl: string;
  unsubscribeUrl: string;
  step: SequenceStep;
};

type SendDiagnosticEmailParams = {
  to: string;
  siteUrl: string;
  score: number;
  total: number;
  weakDomains: readonly DiagnosticDomainId[];
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

  // Email transactionnel : il délivre ce qui a été demandé. Il ne contient
  // aucune offre commerciale et n'a donc pas d'en-tête de désinscription.
  const email = renderEmail0({
    siteUrl,
    unsubscribeUrl: params.unsubscribeUrl ?? "",
  });

  return getResendClient().emails.send({
    from,
    to: params.to,
    replyTo,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
}

export async function sendDiagnosticResultEmail(params: SendDiagnosticEmailParams) {
  const { from, replyTo } = getEmailConfig();
  const email = renderDiagnosticEmail({
    siteUrl: normalizeSiteUrl(params.siteUrl),
    score: params.score,
    total: params.total,
    weakDomains: params.weakDomains,
  });

  return getResendClient().emails.send({
    from,
    to: params.to,
    replyTo,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });
}

/**
 * Envoi d'une étape de la séquence nurture.
 *
 * L'appelant DOIT avoir vérifié `marketing_consent = true` et l'absence de
 * désinscription : cette fonction ne refait pas ce contrôle, elle envoie.
 */
export async function sendNurtureEmail(params: SendNurtureEmailParams) {
  const { from, replyTo } = getEmailConfig();
  const siteUrl = normalizeSiteUrl(params.siteUrl);

  const email = params.step.render({
    siteUrl,
    unsubscribeUrl: params.unsubscribeUrl,
  });

  return getResendClient().emails.send({
    from,
    to: params.to,
    replyTo,
    subject: email.subject,
    html: email.html,
    text: email.text,
    headers: {
      // RFC 8058 : désinscription en un clic depuis Gmail/Outlook, sans
      // ouvrir la page. Améliore nettement la délivrabilité et évite que la
      // personne passe par le bouton "spam" pour se débarrasser des emails.
      "List-Unsubscribe": `<${params.unsubscribeUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
}

export async function sendAccessCodeEmail(params: SendAccessCodeEmailParams) {
  const { from, replyTo } = getEmailConfig();
  const siteUrl = normalizeSiteUrl(params.siteUrl);
  const merciUrl = `${siteUrl}/merci`;
  const connexionUrl = `${siteUrl}/connexion`;

  const text = `Bonjour,

Merci pour votre achat du ${PACK_REVISION_EXPRESS_LABEL}.

Voici votre code d'accès personnel :

${params.accessCode}

1) Pour créer l'espace élève et accéder au pack :
${merciUrl}

2) Si vous avez déjà créé l'espace :
${connexionUrl}

Ce code est personnel et utilisable une seule fois pour créer l'espace élève.
Le pack est une web app accessible depuis un navigateur sur téléphone, tablette et ordinateur.

Besoin d'aide ? Écrivez à ${CONTACT_EMAIL}.

À bientôt,
L'équipe SprintMaths`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6;">
      <p>Bonjour,</p>
      <p>Merci pour votre achat du <strong>${PACK_REVISION_EXPRESS_LABEL}</strong>.</p>
      <p>Voici votre code d'accès personnel :</p>
      <p style="font-size: 24px; font-weight: 700; letter-spacing: 0.08em; color: #4f46e5;">${params.accessCode}</p>
      <p><strong>1) Pour créer l'espace élève et accéder au pack :</strong><br><a href="${merciUrl}">${merciUrl}</a></p>
      <p><strong>2) Si vous avez déjà créé l'espace :</strong><br><a href="${connexionUrl}">${connexionUrl}</a></p>
      <p>Ce code est personnel et utilisable une seule fois pour créer l'espace élève.</p>
      <p>Le pack est une web app accessible depuis un navigateur sur téléphone, tablette et ordinateur.</p>
      <p>Besoin d'aide ? Écrivez à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
      <p>À bientôt,<br>L'équipe SprintMaths</p>
    </div>
  `;

  return getResendClient().emails.send({
    from,
    to: params.to,
    replyTo,
    subject: "Votre accès au Pack Révision Express SprintMaths",
    html,
    text,
  });
}
