import { Resend } from "resend";

type SendAccessCodeEmailParams = {
  to: string;
  accessCode: string;
  siteUrl: string;
  customerEmail?: string;
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

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/+$/, "");
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
