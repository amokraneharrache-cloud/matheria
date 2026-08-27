import { PACK_REVISION_EXPRESS_LABEL, PACK_REVISION_EXPRESS_PRICE } from "@/lib/offers";
import { CONTACT_EMAIL } from "@/lib/site";

/**
 * Séquence nurture evergreen, réservée aux leads `marketing_consent = true`.
 *
 * Règle de conception : chaque email doit avoir une raison pédagogique
 * d'exister. Un email qui ne sert qu'à rappeler l'offre n'a pas sa place dans
 * une boîte de réception.
 */

export const NURTURE_STEPS = [
  "nurture_1",
  "nurture_2",
  "nurture_3",
  "nurture_4",
  "nurture_5",
] as const;

export type NurtureStepKey = (typeof NURTURE_STEPS)[number];
export type SequenceStepKey = "email_0" | NurtureStepKey;

export type SequenceContext = {
  siteUrl: string;
  unsubscribeUrl: string;
};

export type RenderedEmail = {
  subject: string;
  text: string;
  html: string;
};

export type SequenceStep = {
  key: NurtureStepKey;
  /** Délai en jours après la création du lead. */
  delayDays: number;
  /** true si l'email présente explicitement l'offre payante. */
  promotional: boolean;
  render: (context: SequenceContext) => RenderedEmail;
};

// --- Helpers de rendu --------------------------------------------------------

const UTM_CAMPAIGN = "lead_nurture";

export function trackedUrl(siteUrl: string, path: string, stepKey: SequenceStepKey) {
  const base = siteUrl.replace(/\/+$/, "");
  const [pathname, hash] = path.split("#");
  const separator = pathname.includes("?") ? "&" : "?";
  const utm = `utm_source=email&utm_medium=email&utm_campaign=${UTM_CAMPAIGN}&utm_content=${stepKey}`;

  return `${base}${pathname}${separator}${utm}${hash ? `#${hash}` : ""}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FONT_STACK =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";

function button(label: string, url: string) {
  return `<p style="margin:24px 0;"><a href="${url}" style="display:inline-block;background:#1e3a8a;color:#ffffff;padding:14px 26px;border-radius:9999px;font-weight:700;text-decoration:none;font-size:16px;">${escapeHtml(
    label,
  )}</a></p>`;
}

function secondaryLink(label: string, url: string) {
  return `<p style="margin:16px 0;"><a href="${url}" style="color:#1e3a8a;font-weight:600;">${escapeHtml(
    label,
  )}</a></p>`;
}

/**
 * Enveloppe HTML commune. Largeur contrainte, taille de police confortable en
 * mobile, aucune image et aucune pièce jointe : le rendu reste lisible partout
 * et la délivrabilité n'est pas pénalisée.
 */
function layout(body: string, context: SequenceContext, options: { marketing: boolean }) {
  const footer = options.marketing
    ? `<p style="margin:0 0 8px;">Tu reçois cet email parce que tu as demandé à recevoir les conseils de révision SprintMaths.</p>
       <p style="margin:0;"><a href="${context.unsubscribeUrl}" style="color:#64748b;">Se désinscrire en un clic</a></p>`
    : `<p style="margin:0;">Une question ? Réponds directement à cet email ou écris à <a href="mailto:${CONTACT_EMAIL}" style="color:#64748b;">${CONTACT_EMAIL}</a>.</p>`;

  return `<div style="font-family:${FONT_STACK};color:#0f172a;line-height:1.65;font-size:16px;max-width:560px;margin:0 auto;padding:8px;">
${body}
<hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0 16px;">
<div style="font-size:13px;line-height:1.6;color:#64748b;">
${footer}
</div>
</div>`;
}

function textFooter(context: SequenceContext, options: { marketing: boolean }) {
  if (!options.marketing) {
    return `\n\n—\nUne question ? Réponds directement à cet email ou écris à ${CONTACT_EMAIL}.`;
  }

  return `\n\n—\nTu reçois cet email parce que tu as demandé à recevoir les conseils de révision SprintMaths.\nSe désinscrire : ${context.unsubscribeUrl}`;
}

// --- EMAIL 0 — livraison immédiate (transactionnel) --------------------------

/**
 * Email de livraison. Il part pour TOUS les leads, avec ou sans consentement
 * marketing : c'est l'exécution de ce qui a été promis au moment de la saisie.
 *
 * Il ne contient donc AUCUNE offre commerciale — un email transactionnel n'est
 * pas un support de prospection, et la personne n'a rien demandé de tel.
 */
export function renderEmail0(context: SequenceContext): RenderedEmail {
  const step: SequenceStepKey = "email_0";
  const planning = trackedUrl(context.siteUrl, "/planning-revision-bac-maths", step);
  const printable = trackedUrl(context.siteUrl, "/planning-bac-maths-2027.html", step);
  const diagnostic = trackedUrl(context.siteUrl, "/diagnostic", step);

  const subject = "Ton planning Bac Maths 2027 (+ la première chose à faire)";

  const text = `Bonjour,

Voici ton planning de révision Bac Maths 2027, sur 30 jours :
${planning}

Version imprimable, à garder sur ton bureau :
${printable}

AVANT DE LE LIRE EN ENTIER : fais ça d'abord.

Ouvre le planning et surligne les 3 chapitres sur lesquels tu es le moins à
l'aise. Uniquement 3. C'est par eux que tu commences demain.

La raison est simple : un planning ne sert à rien s'il te fait réviser dans
l'ordre du programme. Ce qui fait gagner des points, c'est de travailler en
premier ce qui te coûte le plus cher le jour de l'épreuve.

Si tu ne sais pas lesquels choisir, le diagnostic gratuit te les désigne en
5 minutes :
${diagnostic}

Bonnes révisions,
L'équipe SprintMaths${textFooter(context, { marketing: false })}`;

  const html = layout(
    `<p>Bonjour,</p>
<p>Voici ton <strong>planning de révision Bac Maths 2027</strong>, sur 30 jours.</p>
${button("Ouvrir mon planning", planning)}
${secondaryLink("Version imprimable, à garder sur ton bureau", printable)}
<div style="margin:28px 0;padding:18px 20px;background:#eff6ff;border-left:4px solid #1e3a8a;border-radius:8px;">
  <p style="margin:0 0 10px;font-weight:700;">Avant de le lire en entier : fais ça d'abord.</p>
  <p style="margin:0;">Ouvre le planning et <strong>surligne les 3 chapitres</strong> sur lesquels tu es le moins à l'aise. Uniquement 3. C'est par eux que tu commences demain.</p>
</div>
<p>La raison est simple : un planning ne sert à rien s'il te fait réviser dans l'ordre du programme. Ce qui fait gagner des points, c'est de travailler en premier ce qui te coûte le plus cher le jour de l'épreuve.</p>
<p>Si tu ne sais pas lesquels choisir, le diagnostic gratuit te les désigne en 5 minutes :</p>
${secondaryLink("Faire le diagnostic gratuit", diagnostic)}
<p style="margin-top:28px;">Bonnes révisions,<br>L'équipe SprintMaths</p>`,
    context,
    { marketing: false },
  );

  return { subject, text, html };
}

// --- SÉQUENCE NURTURE (consentement marketing requis) ------------------------

const nurture1: SequenceStep = {
  key: "nurture_1",
  delayDays: 2,
  promotional: false,
  render: (context) => {
    const step: SequenceStepKey = "nurture_1";
    const methode = trackedUrl(context.siteUrl, "/methodes-maths-terminale/etudier-une-suite", step);

    const subject = "L'erreur de récurrence qui coûte le plus de points";

    const text = `Bonjour,

Il y a une erreur que les correcteurs voient sur une copie de Terminale sur
trois. Elle ne vient pas d'un manque de niveau : elle vient d'un réflexe.

LE PIÈGE

On demande de montrer par récurrence que, pour u(0) = 2 et
u(n+1) = 3u(n) - 2, on a u(n) = 3^n + 1.

Beaucoup d'élèves écrivent l'hérédité comme ceci :

  « u(n+1) = 3^(n+1) + 1
    donc 3u(n) - 2 = 3^(n+1) + 1
    donc u(n) = 3^n + 1  ✓ »

C'est faux. Pas le calcul : le raisonnement. On est parti de ce qu'il
fallait démontrer pour retomber sur l'hypothèse. C'est l'inverse d'une
démonstration, et ça vaut zéro à l'hérédité.

LA VERSION CORRECTE

On part de l'hypothèse et on avance :

  Supposons u(n) = 3^n + 1 pour un entier n fixé.
  Alors u(n+1) = 3u(n) - 2
              = 3(3^n + 1) - 2
              = 3^(n+1) + 3 - 2
              = 3^(n+1) + 1.
  La propriété est vraie au rang n+1.

Même calcul, sens opposé. Le second rapporte tous les points.

LE RÉFLEXE À GARDER

Dans une hérédité, la première ligne après « Supposons » doit toujours être
u(n+1) = … (la relation de récurrence), jamais le résultat visé.

Révise la méthode complète ici :
${methode}

À bientôt,
L'équipe SprintMaths${textFooter(context, { marketing: true })}`;

    const html = layout(
      `<p>Bonjour,</p>
<p>Il y a une erreur que les correcteurs voient sur une copie de Terminale sur trois. Elle ne vient pas d'un manque de niveau : elle vient d'un réflexe.</p>

<p style="font-weight:700;margin-top:26px;">Le piège</p>
<p>On demande de montrer par récurrence que, pour <code>u₀ = 2</code> et <code>u(n+1) = 3u(n) − 2</code>, on a <code>u(n) = 3ⁿ + 1</code>.</p>
<p>Beaucoup d'élèves écrivent l'hérédité comme ceci :</p>
<div style="margin:16px 0;padding:16px 18px;background:#fef2f2;border-left:4px solid #dc2626;border-radius:8px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px;line-height:1.8;">
u(n+1) = 3<sup>n+1</sup> + 1<br>
donc 3u(n) − 2 = 3<sup>n+1</sup> + 1<br>
donc u(n) = 3<sup>n</sup> + 1 ✓
</div>
<p><strong>C'est faux.</strong> Pas le calcul : le raisonnement. On est parti de ce qu'il fallait démontrer pour retomber sur l'hypothèse. C'est l'inverse d'une démonstration, et ça vaut zéro à l'hérédité.</p>

<p style="font-weight:700;margin-top:26px;">La version correcte</p>
<div style="margin:16px 0;padding:16px 18px;background:#ecfdf5;border-left:4px solid #059669;border-radius:8px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px;line-height:1.8;">
Supposons u(n) = 3<sup>n</sup> + 1 pour un entier n fixé.<br>
Alors u(n+1) = 3u(n) − 2<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 3(3<sup>n</sup> + 1) − 2<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 3<sup>n+1</sup> + 3 − 2<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 3<sup>n+1</sup> + 1.
</div>
<p>Même calcul, sens opposé. Le second rapporte tous les points.</p>

<p style="font-weight:700;margin-top:26px;">Le réflexe à garder</p>
<p>Dans une hérédité, la première ligne après « Supposons » doit toujours être <code>u(n+1) = …</code> (la relation de récurrence), <strong>jamais</strong> le résultat visé.</p>
${button("Revoir la méthode complète", methode)}
<p style="margin-top:24px;">À bientôt,<br>L'équipe SprintMaths</p>`,
      context,
      { marketing: true },
    );

    return { subject, text, html };
  },
};

const nurture2: SequenceStep = {
  key: "nurture_2",
  delayDays: 4,
  promotional: false,
  render: (context) => {
    const step: SequenceStepKey = "nurture_2";
    const diagnostic = trackedUrl(context.siteUrl, "/diagnostic", step);

    const subject = "Pourquoi relire son cours ne marche pas";

    const text = `Bonjour,

Question simple : la dernière fois que tu as « révisé les suites », qu'as-tu
fait exactement ?

Si la réponse est « j'ai relu le cours », c'est probablement pour ça que tu as
l'impression de ne pas progresser. Relire produit une sensation de maîtrise
sans produire de maîtrise. Tu reconnais le cours, tu ne sais pas le refaire.

LA MÉTHODE DES 3 PASSAGES

Sur un chapitre, un passage utile ressemble à ça :

1. LIRE — 15 minutes maximum.
   Tu lis la fiche méthode, pas le chapitre entier. Objectif : savoir quels
   types de questions tombent.

2. REFAIRE SANS MODÈLE — 30 minutes.
   Tu prends un exercice déjà corrigé, tu caches la correction, tu le refais.
   C'est ce passage qui fait progresser, et c'est celui que tout le monde
   saute.

3. TESTER EN CONDITIONS — 20 minutes.
   Un exercice type bac, chronométré, sans regarder le cours.

Le point important : si tu ne peux faire qu'une seule des trois étapes
aujourd'hui, fais la 2. Jamais la 1.

DANS QUEL ORDRE PRENDRE LES CHAPITRES

Pas dans l'ordre du programme. Dans l'ordre de ce qui te coûte des points.
Le diagnostic gratuit te donne cet ordre en 5 minutes :
${diagnostic}

À bientôt,
L'équipe SprintMaths${textFooter(context, { marketing: true })}`;

    const html = layout(
      `<p>Bonjour,</p>
<p>Question simple : la dernière fois que tu as « révisé les suites », qu'as-tu fait exactement ?</p>
<p>Si la réponse est <em>« j'ai relu le cours »</em>, c'est probablement pour ça que tu as l'impression de ne pas progresser. Relire produit une <strong>sensation</strong> de maîtrise sans produire de maîtrise. Tu reconnais le cours, tu ne sais pas le refaire.</p>

<p style="font-weight:700;margin-top:26px;">La méthode des 3 passages</p>
<p style="margin:14px 0 6px;"><strong>1. Lire — 15 minutes maximum.</strong><br>
Tu lis la fiche méthode, pas le chapitre entier. Objectif : savoir quels types de questions tombent.</p>
<p style="margin:14px 0 6px;"><strong>2. Refaire sans modèle — 30 minutes.</strong><br>
Tu prends un exercice déjà corrigé, tu caches la correction, tu le refais. C'est ce passage qui fait progresser, et c'est celui que tout le monde saute.</p>
<p style="margin:14px 0 6px;"><strong>3. Tester en conditions — 20 minutes.</strong><br>
Un exercice type bac, chronométré, sans regarder le cours.</p>

<div style="margin:24px 0;padding:16px 18px;background:#eff6ff;border-left:4px solid #1e3a8a;border-radius:8px;">
  <p style="margin:0;">Si tu ne peux faire qu'<strong>une seule</strong> des trois étapes aujourd'hui, fais la <strong>2</strong>. Jamais la 1.</p>
</div>

<p style="font-weight:700;margin-top:26px;">Dans quel ordre prendre les chapitres</p>
<p>Pas dans l'ordre du programme. Dans l'ordre de ce qui te coûte des points.</p>
${button("Trouver mes chapitres prioritaires", diagnostic)}
<p style="margin-top:24px;">À bientôt,<br>L'équipe SprintMaths</p>`,
      context,
      { marketing: true },
    );

    return { subject, text, html };
  },
};

const nurture3: SequenceStep = {
  key: "nurture_3",
  delayDays: 7,
  promotional: false,
  render: (context) => {
    const step: SequenceStepKey = "nurture_3";
    const correction = trackedUrl(
      context.siteUrl,
      "/methodes-maths-terminale/probabilites-conditionnelles",
      step,
    );
    const exercices = trackedUrl(context.siteUrl, "/exercices-maths-terminale/probabilites", step);

    const subject = "Mini-défi : le test qui se trompe (réponse en bas)";

    const text = `Bonjour,

Cinq minutes, un stylo. Ce type de question tombe régulièrement au bac, et
la réponse intuitive est presque toujours fausse.

L'ÉNONCÉ

Dans une usine, 3 % des pièces produites sont défectueuses.
Un test de contrôle est appliqué à chaque pièce :

  - si la pièce est défectueuse, le test la détecte dans 98 % des cas ;
  - si la pièce est saine, le test la déclare défectueuse dans 1 % des cas.

On prélève une pièce au hasard et le test la déclare DÉFECTUEUSE.
Quelle est la probabilité qu'elle le soit réellement ?

Prends 3 minutes avant de descendre. Note ton intuition d'abord.

...

...

...

LA RÉPONSE

Notons D « la pièce est défectueuse » et T « le test est positif ».

  P(D) = 0,03      P(T|D) = 0,98      P(T|D̄) = 0,01

Formule des probabilités totales :

  P(T) = P(D) x P(T|D) + P(D̄) x P(T|D̄)
       = 0,03 x 0,98 + 0,97 x 0,01
       = 0,0294 + 0,0097
       = 0,0391

Donc :

  P(D|T) = P(D ∩ T) / P(T) = 0,0294 / 0,0391 ≈ 0,752

Environ 75 %.

POURQUOI C'EST CONTRE-INTUITIF

La plupart des gens répondent 98 %. Mais 98 %, c'est P(T|D) — la probabilité
que le test détecte une pièce défectueuse. Ce n'est pas la question posée.

L'énoncé demande P(D|T), l'inverse. Et comme les pièces saines sont
beaucoup plus nombreuses, leurs 1 % de faux positifs pèsent lourd :
0,0097 faux positifs contre 0,0294 vrais positifs.

Le réflexe à garder : dans un exercice de probabilités conditionnelles,
écris toujours explicitement laquelle des deux tu cherches, P(A|B) ou
P(B|A). La moitié des erreurs vient de là.

La méthode complète :
${correction}

S'entraîner sur d'autres exercices :
${exercices}

À bientôt,
L'équipe SprintMaths${textFooter(context, { marketing: true })}`;

    const html = layout(
      `<p>Bonjour,</p>
<p>Cinq minutes, un stylo. Ce type de question tombe régulièrement au bac, et la réponse intuitive est presque toujours fausse.</p>

<p style="font-weight:700;margin-top:26px;">L'énoncé</p>
<div style="margin:16px 0;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;">
  <p style="margin:0 0 10px;">Dans une usine, <strong>3 %</strong> des pièces produites sont défectueuses. Un test de contrôle est appliqué à chaque pièce :</p>
  <ul style="margin:0 0 10px;padding-left:20px;">
    <li>si la pièce est défectueuse, le test la détecte dans <strong>98 %</strong> des cas ;</li>
    <li>si la pièce est saine, le test la déclare défectueuse dans <strong>1 %</strong> des cas.</li>
  </ul>
  <p style="margin:0;">On prélève une pièce au hasard et le test la déclare <strong>défectueuse</strong>. Quelle est la probabilité qu'elle le soit réellement ?</p>
</div>
<p><em>Prends 3 minutes avant de descendre. Note ton intuition d'abord.</em></p>
<p style="text-align:center;color:#cbd5e1;letter-spacing:8px;margin:32px 0;">• • •</p>

<p style="font-weight:700;">La réponse</p>
<p>Notons D « la pièce est défectueuse » et T « le test est positif ».</p>
<div style="margin:16px 0;padding:16px 18px;background:#f8fafc;border-radius:8px;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:14px;line-height:1.9;">
P(D) = 0,03&nbsp;&nbsp;&nbsp;P(T|D) = 0,98&nbsp;&nbsp;&nbsp;P(T|D̄) = 0,01<br><br>
P(T) = 0,03 × 0,98 + 0,97 × 0,01<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;= 0,0294 + 0,0097 = 0,0391<br><br>
<strong>P(D|T) = 0,0294 / 0,0391 ≈ 0,752</strong>
</div>
<p><strong>Environ 75 %.</strong></p>

<p style="font-weight:700;margin-top:26px;">Pourquoi c'est contre-intuitif</p>
<p>La plupart des gens répondent 98 %. Mais 98 %, c'est <code>P(T|D)</code> — la probabilité que le test détecte une pièce défectueuse. Ce n'est pas la question posée.</p>
<p>L'énoncé demande <code>P(D|T)</code>, l'inverse. Et comme les pièces saines sont beaucoup plus nombreuses, leurs 1 % de faux positifs pèsent lourd : 0,0097 faux positifs contre 0,0294 vrais positifs.</p>
<div style="margin:24px 0;padding:16px 18px;background:#eff6ff;border-left:4px solid #1e3a8a;border-radius:8px;">
  <p style="margin:0;">Dans un exercice de probabilités conditionnelles, écris toujours explicitement laquelle des deux tu cherches : <code>P(A|B)</code> ou <code>P(B|A)</code>. La moitié des erreurs vient de là.</p>
</div>
${button("Revoir la méthode complète", correction)}
${secondaryLink("S'entraîner sur d'autres exercices", exercices)}
<p style="margin-top:24px;">À bientôt,<br>L'équipe SprintMaths</p>`,
      context,
      { marketing: true },
    );

    return { subject, text, html };
  },
};

const nurture4: SequenceStep = {
  key: "nurture_4",
  delayDays: 10,
  promotional: true,
  render: (context) => {
    const step: SequenceStepKey = "nurture_4";
    const offre = trackedUrl(context.siteUrl, "/bac-maths-2027#offre", step);

    const subject = `Ce qu'il y a dans le Pack Révision Express (${PACK_REVISION_EXPRESS_PRICE} €)`;

    const text = `Bonjour,

Jusqu'ici je ne t'ai envoyé que des ressources gratuites, et elles le
resteront. Mais il existe une version payante de SprintMaths, et il serait
étrange de ne jamais te dire ce que c'est. Voilà, une fois, clairement.

CE QUE C'EST

${PACK_REVISION_EXPRESS_LABEL} — ${PACK_REVISION_EXPRESS_PRICE} € en paiement
unique, sans abonnement. Une web app, accessible sur téléphone, tablette et
ordinateur.

CE QU'IL Y A DEDANS

  - 176 questions d'entraînement Terminale
  - 12 exercices guidés, découpés étape par étape
  - 3 sujets type bac dans le Mode Bac
  - 13 fiches méthodes avec erreurs fréquentes et exemples
  - Des plans de révision sur 7 ou 14 jours
  - Le suivi de tes sessions, scores et chapitres travaillés

QUEL PROBLÈME ÇA RÉSOUT

Un problème précis : savoir quoi faire à chaque séance. Les ressources
gratuites du site répondent à une question à la fois. Le pack enchaîne les
questions dans un ordre décidé à l'avance, et enregistre où tu en es — donc
tu ne repars pas de zéro à chaque session, et tu ne révises pas trois fois
le chapitre que tu maîtrises déjà.

CE QUI EST DIFFÉRENT DU GRATUIT

Honnêtement : le contenu pédagogique est de la même main. La différence
n'est pas la qualité des explications, c'est la structure et le suivi. Si tu
es capable de t'organiser seul avec le planning et les pages gratuites, tu
n'as pas besoin du pack. C'est vrai et je préfère l'écrire.

POUR QUI C'EST UTILE

  - Tu entres en Terminale spécialité maths.
  - Tu as des bases fragiles, ou tu sais que tu travailles sans méthode.
  - Ou tu es autonome mais tu veux un parcours déjà ordonné.

Voir le détail et les captures d'écran :
${offre}

Ressources d'entraînement créées par SprintMaths, non officielles. Les
sujets type bac ne sont pas des annales officielles.

À bientôt,
L'équipe SprintMaths${textFooter(context, { marketing: true })}`;

    const html = layout(
      `<p>Bonjour,</p>
<p>Jusqu'ici je ne t'ai envoyé que des ressources gratuites, et elles le resteront. Mais il existe une version payante de SprintMaths, et il serait étrange de ne jamais te dire ce que c'est. Voilà, une fois, clairement.</p>

<p style="font-weight:700;margin-top:26px;">Ce que c'est</p>
<p><strong>${PACK_REVISION_EXPRESS_LABEL}</strong> — ${PACK_REVISION_EXPRESS_PRICE} € en paiement unique, sans abonnement. Une web app, accessible sur téléphone, tablette et ordinateur.</p>

<p style="font-weight:700;margin-top:26px;">Ce qu'il y a dedans</p>
<ul style="padding-left:20px;margin:12px 0;">
  <li>176 questions d'entraînement Terminale</li>
  <li>12 exercices guidés, découpés étape par étape</li>
  <li>3 sujets type bac dans le Mode Bac</li>
  <li>13 fiches méthodes avec erreurs fréquentes et exemples</li>
  <li>Des plans de révision sur 7 ou 14 jours</li>
  <li>Le suivi de tes sessions, scores et chapitres travaillés</li>
</ul>

<p style="font-weight:700;margin-top:26px;">Quel problème ça résout</p>
<p>Un problème précis : <strong>savoir quoi faire à chaque séance</strong>. Les ressources gratuites du site répondent à une question à la fois. Le pack enchaîne les questions dans un ordre décidé à l'avance, et enregistre où tu en es — donc tu ne repars pas de zéro à chaque session, et tu ne révises pas trois fois le chapitre que tu maîtrises déjà.</p>

<p style="font-weight:700;margin-top:26px;">Ce qui est différent du gratuit</p>
<div style="margin:16px 0;padding:16px 18px;background:#f8fafc;border-left:4px solid #94a3b8;border-radius:8px;">
  <p style="margin:0;">Honnêtement : le contenu pédagogique est de la même main. La différence n'est pas la qualité des explications, c'est la <strong>structure et le suivi</strong>. Si tu es capable de t'organiser seul avec le planning et les pages gratuites, tu n'as pas besoin du pack. C'est vrai et je préfère l'écrire.</p>
</div>

<p style="font-weight:700;margin-top:26px;">Pour qui c'est utile</p>
<ul style="padding-left:20px;margin:12px 0;">
  <li>Tu entres en Terminale spécialité maths.</li>
  <li>Tu as des bases fragiles, ou tu sais que tu travailles sans méthode.</li>
  <li>Ou tu es autonome mais tu veux un parcours déjà ordonné.</li>
</ul>
${button("Voir le détail du pack", offre)}
<p style="font-size:13px;color:#64748b;margin-top:20px;">Ressources d'entraînement créées par SprintMaths, non officielles. Les sujets type bac ne sont pas des annales officielles.</p>
<p style="margin-top:24px;">À bientôt,<br>L'équipe SprintMaths</p>`,
      context,
      { marketing: true },
    );

    return { subject, text, html };
  },
};

const nurture5: SequenceStep = {
  key: "nurture_5",
  delayDays: 14,
  promotional: true,
  render: (context) => {
    const step: SequenceStepKey = "nurture_5";
    const offre = trackedUrl(context.siteUrl, "/bac-maths-2027#offre", step);
    const planning = trackedUrl(context.siteUrl, "/planning-revision-bac-maths", step);

    const subject = "Trois questions qu'on me pose sur le pack";

    const text = `Bonjour,

Dernier email de cette série. Trois questions reviennent souvent — voici des
réponses franches, y compris quand la réponse est « non ».

« J'AI DÉJÀ UN BON NIVEAU. C'EST POUR MOI ? »

Probablement pas, si ton problème n'est pas la méthode. Le pack est construit
pour structurer le travail de quelqu'un qui s'éparpille. Si tu as déjà 16 de
moyenne et une organisation qui tient, tu apprendras plus en faisant des
annales officielles qu'avec un parcours guidé. Prends les sujets zéro et les
sujets tombés, ils sont gratuits et officiels.

« JE SUIS EN RETARD, C'EST TROP TARD ? »

Non, mais il faut réduire la cible. En retard, l'erreur est de vouloir tout
rattraper : on survole 12 chapitres et on n'en maîtrise aucun. Trois
chapitres solides rapportent plus que douze chapitres survolés. Le planning
gratuit suffit pour ça :
${planning}

« QUELLE DIFFÉRENCE AVEC LES RESSOURCES GRATUITES ? »

Le contenu pédagogique est le même auteur et la même exigence. Ce que le
pack ajoute : un ordre décidé à l'avance, des exercices guidés découpés
étape par étape, un mode bac chronométré, et le suivi de ce que tu as déjà
travaillé. C'est de l'organisation, pas du contenu secret. Si ce n'est pas
ton problème, garde tes 39 €.

Si c'est ton problème :
${offre}

C'est le dernier email de cette séquence. Tu ne recevras plus de message
au sujet du pack. Les prochains emails, s'il y en a, seront des ressources
de révision.

Bon courage pour cette année,
L'équipe SprintMaths${textFooter(context, { marketing: true })}`;

    const html = layout(
      `<p>Bonjour,</p>
<p>Dernier email de cette série. Trois questions reviennent souvent — voici des réponses franches, y compris quand la réponse est « non ».</p>

<p style="font-weight:700;margin-top:26px;">« J'ai déjà un bon niveau. C'est pour moi ? »</p>
<p>Probablement pas, si ton problème n'est pas la méthode. Le pack est construit pour structurer le travail de quelqu'un qui s'éparpille. Si tu as déjà 16 de moyenne et une organisation qui tient, tu apprendras plus en faisant des annales officielles qu'avec un parcours guidé. Prends les sujets zéro et les sujets tombés, ils sont gratuits et officiels.</p>

<p style="font-weight:700;margin-top:26px;">« Je suis en retard, c'est trop tard ? »</p>
<p>Non, mais il faut réduire la cible. En retard, l'erreur est de vouloir tout rattraper : on survole 12 chapitres et on n'en maîtrise aucun. <strong>Trois chapitres solides rapportent plus que douze chapitres survolés.</strong> Le planning gratuit suffit pour ça.</p>
${secondaryLink("Reprendre le planning", planning)}

<p style="font-weight:700;margin-top:26px;">« Quelle différence avec les ressources gratuites ? »</p>
<p>Le contenu pédagogique est le même auteur et la même exigence. Ce que le pack ajoute : un ordre décidé à l'avance, des exercices guidés découpés étape par étape, un mode bac chronométré, et le suivi de ce que tu as déjà travaillé. C'est de l'organisation, pas du contenu secret. Si ce n'est pas ton problème, garde tes ${PACK_REVISION_EXPRESS_PRICE} €.</p>
${button("Voir le pack", offre)}

<div style="margin:28px 0 0;padding:16px 18px;background:#f8fafc;border-radius:8px;">
  <p style="margin:0;font-size:14px;color:#475569;">C'est le dernier email de cette séquence. Tu ne recevras plus de message au sujet du pack. Les prochains emails, s'il y en a, seront des ressources de révision.</p>
</div>
<p style="margin-top:24px;">Bon courage pour cette année,<br>L'équipe SprintMaths</p>`,
      context,
      { marketing: true },
    );

    return { subject, text, html };
  },
};

export const NURTURE_SEQUENCE: SequenceStep[] = [
  nurture1,
  nurture2,
  nurture3,
  nurture4,
  nurture5,
];

export function getNurtureStep(key: string): SequenceStep | undefined {
  return NURTURE_SEQUENCE.find((step) => step.key === key);
}

/**
 * Étapes dues pour un lead donné, à une date donnée.
 * Ne tient pas compte de l'état déjà envoyé : c'est l'appelant (le runner) qui
 * croise avec `email_sequence_sends`.
 */
export function dueSteps(createdAt: Date, now: Date): SequenceStep[] {
  const elapsedDays = (now.getTime() - createdAt.getTime()) / 86_400_000;
  return NURTURE_SEQUENCE.filter((step) => elapsedDays >= step.delayDays);
}
