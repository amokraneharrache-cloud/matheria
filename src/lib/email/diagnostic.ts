import { CONTACT_EMAIL } from "@/lib/site";
import {
  getDiagnosticDomain,
  type DiagnosticDomainId,
} from "@/lib/diagnostic";

type DiagnosticEmailParams = {
  siteUrl: string;
  score: number;
  total: number;
  weakDomains: readonly DiagnosticDomainId[];
};

function trackedUrl(siteUrl: string, path: string, content: string) {
  const base = siteUrl.replace(/\/+$/, "");
  const separator = path.includes("?") ? "&" : "?";
  return `${base}${path}${separator}utm_source=email&utm_medium=email&utm_campaign=diagnostic_result&utm_content=${content}`;
}

export function renderDiagnosticEmail(params: DiagnosticEmailParams) {
  const planningUrl = trackedUrl(
    params.siteUrl,
    "/planning-revision-bac-maths",
    "planning",
  );
  const priorities = params.weakDomains
    .map((id) => getDiagnosticDomain(id))
    .filter((domain) => Boolean(domain));
  const priorityText = priorities.length
    ? priorities.map((domain, index) => `${index + 1}. ${domain?.label}`).join("\n")
    : "Aucune priorité nette sur ce mini-test : entretiens tes acquis avec des exercices variés.";
  const priorityHtml = priorities.length
    ? `<ol>${priorities.map((domain) => `<li><strong>${domain?.label}</strong></li>`).join("")}</ol>`
    : "<p>Aucune priorité nette sur ce mini-test : entretiens tes acquis avec des exercices variés.</p>";
  const resourceText = priorities
    .map((domain) => {
      const resource = domain?.resources[0];
      return resource
        ? `${domain?.label} : ${trackedUrl(params.siteUrl, resource.href, domain?.id ?? "resource")}`
        : "";
    })
    .filter(Boolean)
    .join("\n");
  const resourceHtml = priorities
    .map((domain) => {
      const resource = domain?.resources[0];
      return resource
        ? `<li><a href="${trackedUrl(params.siteUrl, resource.href, domain?.id ?? "resource")}" style="color:#1e3a8a;font-weight:600;">${resource.label}</a></li>`
        : "";
    })
    .filter(Boolean)
    .join("");

  const subject = `Ton bilan du mini-test SprintMaths : ${params.score}/${params.total}`;
  const text = `Bonjour,

Voici ton résultat au mini-test de prérequis pour la Terminale spécialité maths :

Score : ${params.score}/${params.total}

Priorités :
${priorityText}

${resourceText ? `Ressources conseillées :\n${resourceText}\n\n` : ""}Construis maintenant ton planning de travail :
${planningUrl}

Ce résultat porte sur 10 questions seulement. Il ne prédit ni une note au Bac ni un niveau scolaire officiel.

Bonnes révisions,
L’équipe SprintMaths

—
Une question ? Réponds à cet email ou écris à ${CONTACT_EMAIL}.`;

  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#0f172a;line-height:1.65;font-size:16px;max-width:560px;margin:0 auto;padding:8px;">
<p>Bonjour,</p>
<p>Voici ton résultat au mini-test de prérequis pour la Terminale spécialité maths.</p>
<div style="margin:24px 0;padding:20px;background:#eff6ff;border-radius:12px;text-align:center;"><strong style="font-size:30px;color:#1e3a8a;">${params.score}/${params.total}</strong></div>
<h2 style="font-size:20px;">Tes priorités</h2>
${priorityHtml}
${resourceHtml ? `<h2 style="font-size:20px;">Ressources conseillées</h2><ul>${resourceHtml}</ul>` : ""}
<p style="margin:26px 0;"><a href="${planningUrl}" style="display:inline-block;background:#1e3a8a;color:#fff;padding:13px 22px;border-radius:9999px;font-weight:700;text-decoration:none;">Construire mon planning</a></p>
<p style="font-size:14px;color:#64748b;">Ce résultat porte sur 10 questions seulement. Il ne prédit ni une note au Bac ni un niveau scolaire officiel.</p>
<p>Bonnes révisions,<br>L’équipe SprintMaths</p>
<hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0 16px;">
<p style="font-size:13px;color:#64748b;">Une question ? Réponds à cet email ou écris à <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
</div>`;

  return { subject, text, html };
}
