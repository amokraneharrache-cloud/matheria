import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const pagePath = "/politique-confidentialite";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de Matheria : données collectées, finalités, prestataires, conservation, cookies et droits RGPD.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: `Politique de confidentialité | ${SITE_NAME}`,
    description:
      "Informations sur le traitement des données personnelles dans Matheria.",
    url: absoluteUrl(pagePath),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      description="Cette politique décrit les données personnelles susceptibles d’être collectées par Matheria, leurs finalités, les prestataires utilisés et les droits des utilisateurs."
    >
      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement est [NOM / SOCIÉTÉ À COMPLÉTER], [FORME
          JURIDIQUE À COMPLÉTER], situé à [ADRESSE À COMPLÉTER].
        </p>
        <p>Contact : contact@matheria.fr.</p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Selon l’utilisation du service, Matheria peut collecter les données
          suivantes :
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Email du parent ou de l’acheteur.</li>
          <li>Pseudo ou prénom saisi pour l’élève.</li>
          <li>Niveau scolaire, objectif d’examen et niveau ressenti.</li>
          <li>Difficultés déclarées dans le diagnostic.</li>
          <li>Scores, nombre de questions, chapitres travaillés et historique de sessions.</li>
          <li>Historique local conservé dans le navigateur de l’utilisateur.</li>
          <li>Données de leads issues du diagnostic gratuit.</li>
          <li>Informations techniques strictement nécessaires au fonctionnement du site.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Finalités">
        <p>Ces données peuvent être utilisées pour :</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Fournir l’accès au Pack Révision Express Matheria.</li>
          <li>Créer ou retrouver un espace élève.</li>
          <li>Adapter l’expérience de révision au niveau et à l’objectif indiqués.</li>
          <li>Enregistrer les résultats de sessions et afficher la progression.</li>
          <li>Répondre aux demandes de support, d’accès ou de remboursement.</li>
          <li>Suivre les demandes issues du diagnostic gratuit.</li>
          <li>Assurer la sécurité et le bon fonctionnement technique du service.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Bases légales">
        <p>
          [À COMPLÉTER / FAIRE VALIDER] Les bases légales susceptibles de
          s’appliquer sont notamment l’exécution d’un contrat pour fournir
          l’accès au service acheté, l’intérêt légitime pour assurer la sécurité
          et répondre au support, le consentement lorsque celui-ci est requis, et
          le respect d’obligations légales le cas échéant.
        </p>
      </LegalSection>

      <LegalSection title="Conservation">
        <p>
          [DURÉES À COMPLÉTER / FAIRE VALIDER] Les données sont conservées pour
          une durée proportionnée aux finalités poursuivies : gestion de l’accès,
          suivi de progression, support client, obligations comptables ou
          fiscales éventuelles.
        </p>
        <p>
          L’historique local stocké dans le navigateur peut être supprimé par
          l’utilisateur en vidant les données du site dans son navigateur.
        </p>
      </LegalSection>

      <LegalSection title="Prestataires techniques">
        <p>Matheria utilise des prestataires techniques pour fournir le service :</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Supabase : base de données et services techniques associés.</li>
          <li>Stripe : traitement sécurisé des paiements.</li>
          <li>Vercel : hébergement et déploiement du site et de l’application.</li>
        </ul>
        <p>
          Ces prestataires peuvent traiter certaines données pour le compte de
          Matheria, selon leurs propres conditions et politiques de
          confidentialité.
        </p>
      </LegalSection>

      <LegalSection title="Droits RGPD">
        <p>
          Sous réserve des conditions prévues par la réglementation applicable,
          les personnes concernées peuvent demander l’accès, la rectification,
          l’effacement, la limitation du traitement, l’opposition au traitement,
          ou la portabilité de leurs données.
        </p>
        <p>
          Pour exercer ces droits, il est possible d’écrire à contact@matheria.fr.
          Une vérification d’identité peut être demandée lorsque cela est
          nécessaire.
        </p>
        <p>
          En cas de difficulté non résolue, l’utilisateur peut contacter
          l’autorité de contrôle compétente, notamment la CNIL en France.
        </p>
      </LegalSection>

      <LegalSection title="Cookies et stockage local">
        <p>
          À ce stade, Matheria utilise uniquement des cookies ou mécanismes de
          stockage strictement techniques nécessaires au fonctionnement du site,
          lorsque c’est le cas.
        </p>
        <p>
          Le service peut utiliser le stockage local du navigateur pour conserver
          le profil élève et l’historique de progression sur l’appareil de
          l’utilisateur. [À VÉRIFIER SI DES OUTILS DE MESURE D’AUDIENCE OU DE
          MARKETING SONT AJOUTÉS]
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative à cette politique ou aux données
          personnelles, contactez : contact@matheria.fr.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
