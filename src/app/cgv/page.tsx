import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import {
  PACK_REVISION_EXPRESS_LABEL,
  PACK_REVISION_EXPRESS_PRICE,
} from "@/lib/offers";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const pagePath = "/cgv";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente du Pack Révision Express SprintMaths : prix, paiement, accès, rétractation et remboursement.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: `Conditions générales de vente | ${SITE_NAME}`,
    description:
      "Conditions applicables à l’achat du Pack Révision Express SprintMaths.",
    url: absoluteUrl(pagePath),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CgvPage() {
  return (
    <LegalPageLayout
      title="Conditions générales de vente"
      description="Ces conditions générales de vente encadrent l’achat du Pack Révision Express SprintMaths par des particuliers en France. Elles peuvent évoluer pour rester alignées avec le service et les obligations applicables."
      updatedAt="13 juillet 2026"
    >
      <LegalSection title="Objet">
        <p>
          Les présentes conditions générales de vente ont pour objet de définir
          les conditions dans lesquelles SprintMaths vend aux consommateurs un
          accès numérique au service SprintMaths.
        </p>
      </LegalSection>

      <LegalSection title="Produit vendu">
        <p>
          Le produit vendu est le {PACK_REVISION_EXPRESS_LABEL}. Il donne accès
          à une web app de révision en mathématiques comprenant notamment des
          exercices, corrections, méthodes, plans de révision et outils de suivi
          selon le périmètre disponible au moment de l’achat.
        </p>
        <p>
          Le service est fourni sous forme numérique. Il n’y a pas de livraison
          physique.
        </p>
      </LegalSection>

      <LegalSection title="Prix et paiement">
        <p>
          Le prix public du {PACK_REVISION_EXPRESS_LABEL} est de{" "}
          {PACK_REVISION_EXPRESS_PRICE} € TTC, en paiement unique.
        </p>
        <p>
          Le prix applicable est celui affiché au moment de la commande. Aucun
          abonnement ni prélèvement récurrent n&apos;est associé à cet achat.
        </p>
        <p>
          Le paiement est effectué via Stripe, prestataire de paiement sécurisé.
          SprintMaths ne stocke pas les données complètes de carte bancaire.
        </p>
      </LegalSection>

      <LegalSection title="Accès au service">
        <p>
          Après paiement, l’accès au service est fourni au moyen d’un code d’accès
          unique permettant de créer l’espace élève sur SprintMaths.
        </p>
        <p>
          Le code est envoyé automatiquement par email après confirmation du
          paiement. En cas de difficulté d’accès après paiement, l’acheteur peut
          contacter {CONTACT_EMAIL}.
        </p>
      </LegalSection>

      <LegalSection title="Codes d’accès uniques">
        <p>
          Chaque code d’accès est personnel, unique et destiné à un seul espace
          élève. Il ne doit pas être partagé publiquement ni utilisé pour créer
          plusieurs espaces.
        </p>
        <p>
          SprintMaths peut révoquer un code en cas d’utilisation manifestement
          abusive, frauduleuse ou contraire aux présentes conditions.
        </p>
      </LegalSection>

      <LegalSection title="Absence d’abonnement">
        <p>
          Le Pack Révision Express SprintMaths est vendu en paiement unique. Il ne
          s’agit pas d’un abonnement et aucun prélèvement récurrent n’est prévu.
        </p>
      </LegalSection>

      <LegalSection title="Nature numérique du service">
        <p>
          SprintMaths est un service numérique accessible depuis un navigateur web,
          sur ordinateur, tablette ou téléphone compatible. L’utilisateur est
          responsable de disposer d’une connexion internet et d’un équipement
          compatible.
        </p>
      </LegalSection>

      <LegalSection title="Droit de rétractation">
        <p>
          Pour les contenus ou services numériques fournis avant la fin du délai
          légal de rétractation, le droit de rétractation peut être écarté si le
          consommateur a donné son accord exprès pour l’exécution immédiate du
          service et reconnu qu’il perd son droit de rétractation.
        </p>
        <p>
          Le parcours de paiement et la formulation affichée avant achat doivent
          être vérifiés afin de confirmer si ces conditions sont bien remplies.
          À défaut, le droit légal de rétractation applicable aux consommateurs
          peut s’appliquer.
        </p>
      </LegalSection>

      <LegalSection title="Remboursement">
        <p>
          Une demande de remboursement peut être adressée à {CONTACT_EMAIL}
          dans les 7 jours suivant l’achat si l’accès ne correspond pas aux
          attentes de l’acheteur. La demande est étudiée selon les présentes CGV
          et la politique de remboursement publiée par SprintMaths.
        </p>
        <p>
          En cas de double paiement, d’erreur de paiement ou d’accès non reçu
          après paiement, l’acheteur est invité à contacter {CONTACT_EMAIL}
          avec l’email utilisé lors du paiement.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité pédagogique">
        <p>
          SprintMaths aide les élèves à structurer leurs révisions et à s’entraîner
          en mathématiques. Le service ne remplace pas l’enseignement scolaire,
          un professeur, ni un accompagnement individualisé complet.
        </p>
        <p>
          Les scores et notes /20 affichés dans SprintMaths sont indicatifs. Ils
          servent à suivre le travail dans le service et ne constituent pas une
          prédiction de note au bac. SprintMaths ne garantit pas une note, une
          progression déterminée, ni la réussite à un examen.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Les données personnelles sont traitées conformément à la politique de
          confidentialité de SprintMaths. Cette politique précise les données
          collectées, les finalités, les prestataires techniques et les droits
          des personnes concernées.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question sur une commande, un accès ou les présentes
          conditions, l’acheteur peut écrire à : {CONTACT_EMAIL}.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes conditions sont soumises au droit français. En cas de
          différend, les parties sont invitées à rechercher une solution amiable
          avant toute autre démarche.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
