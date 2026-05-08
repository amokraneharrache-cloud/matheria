import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME, siteUrl } from "@/lib/site";

const pagePath = "/mentions-legales";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales de SprintMaths : éditeur, hébergeur, propriété intellectuelle, responsabilité et contact.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: `Mentions légales | ${SITE_NAME}`,
    description:
      "Informations légales relatives au site et à l’application web SprintMaths.",
    url: absoluteUrl(pagePath),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageLayout
      title="Mentions légales"
      description="Cette page présente les informations d’identification de l’éditeur du site SprintMaths, ainsi que les informations relatives à l’hébergement et à la propriété intellectuelle."
    >
      <LegalSection title="Éditeur du site">
        <p>
          Le site SprintMaths, accessible à l’adresse {siteUrl}, est édité
          par :
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Nom / société : [NOM / SOCIÉTÉ À COMPLÉTER]</li>
          <li>Forme juridique : [À COMPLÉTER]</li>
          <li>Adresse : [À COMPLÉTER]</li>
          <li>Email : {CONTACT_EMAIL}</li>
          <li>Directeur de publication : [À COMPLÉTER]</li>
        </ul>
      </LegalSection>

      <LegalSection title="Hébergeur">
        <p>
          Le site est hébergé par Vercel Inc., 440 N Barranca Avenue #4133,
          Covina, CA 91723, United States.
        </p>
        <p>
          Cette information doit être vérifiée et mise à jour si l’hébergeur ou
          les coordonnées d’hébergement changent.
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          Les contenus présents sur le site et dans l’application SprintMaths,
          notamment les textes, interfaces, exercices, corrections, marques,
          logos et éléments graphiques, sont protégés par les règles applicables
          en matière de propriété intellectuelle, sauf mention contraire.
        </p>
        <p>
          Toute reproduction, représentation, adaptation ou exploitation non
          autorisée de tout ou partie de ces contenus est interdite.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          SprintMaths met à disposition une web app de révision en mathématiques.
          Les informations, exercices et corrections sont fournis avec un objectif
          pédagogique et peuvent évoluer.
        </p>
        <p>
          L’éditeur ne garantit pas l’absence d’erreur, l’exhaustivité des
          contenus, ni un résultat scolaire ou une réussite à un examen.
          L’utilisateur reste responsable de son organisation de travail et de
          l’usage qu’il fait du service.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative au site ou à ces mentions légales, vous
          pouvez écrire à : {CONTACT_EMAIL}.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
