import type { Metadata } from "next";
import Link from "next/link";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const pagePath = "/politique-confidentialite";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité de SprintMaths : données collectées, finalités, prestataires, conservation, cookies et droits RGPD.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: `Politique de confidentialité | ${SITE_NAME}`,
    description:
      "Informations sur le traitement des données personnelles dans SprintMaths.",
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
      description="Cette politique décrit les données personnelles susceptibles d’être collectées par SprintMaths, leurs finalités, les prestataires utilisés et les droits des utilisateurs."
    >
      <LegalSection title="Responsable du traitement">
        <p>
          Le responsable du traitement est l’éditeur du service SprintMaths. Les
          informations administratives complètes de l’éditeur sont en cours de
          finalisation et seront tenues à jour sur les mentions légales.
        </p>
        <p>Contact : {CONTACT_EMAIL}.</p>
      </LegalSection>

      <LegalSection title="Données collectées">
        <p>
          Selon l’utilisation du service, SprintMaths peut collecter les données
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
          <li>
            Choix concernant les emails facultatifs, date et version du
            consentement, source d’acquisition et état de désinscription.
          </li>
          <li>Informations techniques strictement nécessaires au fonctionnement du site.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Finalités">
        <p>Ces données peuvent être utilisées pour :</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Fournir l’accès au Pack Révision Express SprintMaths.</li>
          <li>Créer ou retrouver un espace élève.</li>
          <li>Adapter l’expérience de révision au niveau et à l’objectif indiqués.</li>
          <li>Enregistrer les résultats de sessions et afficher la progression.</li>
          <li>Répondre aux demandes de support, d’accès ou de remboursement.</li>
          <li>Suivre les demandes issues du diagnostic gratuit.</li>
          <li>
            Envoyer, uniquement avec un consentement facultatif, des conseils,
            exercices et informations sur les offres SprintMaths.
          </li>
          <li>Assurer la sécurité et le bon fonctionnement technique du service.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Emails facultatifs et désinscription">
        <p>
          La réception du planning ou du résultat du diagnostic ne dépend pas de
          l’inscription aux emails de conseils. La case proposée dans les
          formulaires est facultative et n’est jamais précochée.
        </p>
        <p>
          En cas d’accord, SprintMaths peut utiliser l’adresse email, la source
          d’acquisition et les informations générales fournies dans le formulaire
          pour envoyer des conseils de révision, des exercices et, ponctuellement,
          des informations sur ses offres. La base juridique de ces envois est le
          consentement.
        </p>
        <p>
          Ce consentement peut être retiré à tout moment grâce au lien de
          désinscription présent dans chaque email, ou en écrivant à {CONTACT_EMAIL}.
          Le retrait n’empêche pas l’envoi des messages strictement nécessaires à
          une demande ou à un achat.
        </p>
      </LegalSection>

      <LegalSection title="Mesure d’audience et campagnes publicitaires">
        <p>
          SprintMaths prépare une infrastructure de mesure d’audience afin de
          comprendre les grandes étapes du tunnel public : démarrage du
          diagnostic, diagnostic terminé, affichage de l’offre, clic vers le
          paiement Stripe et création réussie de l’espace élève.
        </p>
        <p>
          Lorsque l’adresse d’arrivée contient des paramètres de campagne,
          SprintMaths peut conserver localement des paramètres UTM tels que
          utm_source, utm_medium, utm_campaign, utm_content ou utm_term.
        </p>
        <p>
          Selon le mode de tracking configuré, SprintMaths peut utiliser Google Tag
          Manager, Google Analytics 4, Google Ads, Meta, TikTok ou Snapchat pour
          mesurer des campagnes publicitaires futures. Lorsque le mode est off ou
          internal, ces pixels publicitaires ne sont pas activés directement par
          le site.
        </p>
        <p>
          SprintMaths exclut volontairement des événements envoyés aux outils de
          mesure publicitaire :
        </p>
        <ul className="list-disc space-y-2 pl-6">
          <li>le pseudo ou prénom de l’élève ;</li>
          <li>les scores détaillés ;</li>
          <li>les notes indicatives /20 ;</li>
          <li>les chapitres faibles ;</li>
          <li>l’historique pédagogique et les détails de progression.</li>
        </ul>
        <p>
          Une préférence locale peut être gérée depuis la page{" "}
          <Link href="/preferences-confidentialite" className="font-semibold text-blue-900 underline underline-offset-4">
            Préférences confidentialité
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="Bases légales">
        <p>
          Les bases légales susceptibles de s’appliquer sont notamment
          l’exécution d’un contrat pour fournir l’accès au service acheté,
          l’intérêt légitime pour assurer la sécurité et répondre au support, le
          consentement lorsque celui-ci est requis, et le respect d’obligations
          légales le cas échéant.
        </p>
      </LegalSection>

      <LegalSection title="Conservation">
        <p>
          Les données sont conservées pour une durée proportionnée aux finalités
          poursuivies : gestion de l’accès, suivi de progression, support
          client, obligations comptables ou fiscales éventuelles.
        </p>
        <p>
          L’historique local stocké dans le navigateur peut être supprimé par
          l’utilisateur en vidant les données du site dans son navigateur.
        </p>
        <p>
          Les données liées aux emails facultatifs sont conservées pendant une
          durée raisonnable au regard de la relation avec SprintMaths. La preuve
          du consentement et la désinscription peuvent être conservées afin de
          respecter le choix exprimé et d’éviter tout nouvel envoi non souhaité.
        </p>
      </LegalSection>

      <LegalSection title="Prestataires techniques">
        <p>SprintMaths utilise des prestataires techniques pour fournir le service :</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Supabase : base de données et services techniques associés.</li>
          <li>Stripe : traitement sécurisé des paiements.</li>
          <li>
            Resend : envoi des emails transactionnels et, lorsque la personne y
            a consenti, des emails de conseils et d’offres.
          </li>
          <li>Vercel : hébergement et déploiement du site et de l’application.</li>
        </ul>
        <p>
          Ces prestataires peuvent traiter certaines données pour le compte de
          SprintMaths, selon leurs propres conditions et politiques de
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
          Pour exercer ces droits, il est possible d’écrire à {CONTACT_EMAIL}.
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
          SprintMaths utilise des mécanismes de stockage local pour le bon
          fonctionnement du service et pour la mesure d’audience lorsque le mode
          de tracking le permet.
        </p>
        <p>
          Le service peut utiliser le stockage local du navigateur pour conserver
          le profil élève, l’historique de progression sur l’appareil de
          l’utilisateur, les paramètres UTM de campagne et la préférence locale
          de mesure d’audience.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question relative à cette politique ou aux données
          personnelles, contactez : {CONTACT_EMAIL}.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
