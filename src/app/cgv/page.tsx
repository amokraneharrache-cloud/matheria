import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const pagePath = "/cgv";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente du Pack Révision Express Matheria : prix, paiement, accès, codes, rétractation et remboursement.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: `Conditions générales de vente | ${SITE_NAME}`,
    description:
      "Conditions applicables à l’achat du Pack Révision Express Matheria.",
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
      description="Ces conditions générales de vente encadrent l’achat du Pack Révision Express Matheria par des particuliers en France. Elles doivent être complétées et validées avant une commercialisation réelle."
    >
      <LegalSection title="Objet">
        <p>
          Les présentes conditions générales de vente ont pour objet de définir
          les conditions dans lesquelles [NOM / SOCIÉTÉ À COMPLÉTER] vend aux
          consommateurs un accès numérique au service Matheria.
        </p>
      </LegalSection>

      <LegalSection title="Produit vendu">
        <p>
          Le produit vendu est le Pack Révision Express Matheria. Il donne accès
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
          Le prix du Pack Révision Express Matheria est de 39 € TTC, en paiement
          unique.
        </p>
        <p>
          Le paiement est effectué via Stripe, prestataire de paiement sécurisé.
          Matheria ne stocke pas les données complètes de carte bancaire.
        </p>
      </LegalSection>

      <LegalSection title="Accès au service">
        <p>
          Après paiement, l’accès au service est fourni au moyen d’un code d’accès
          unique permettant de créer l’espace élève sur Matheria.
        </p>
        <p>
          À ce stade, tant qu’aucun webhook Stripe n’est encore intégré, l’envoi
          ou la génération du code peut nécessiter une intervention manuelle du
          fondateur. En cas de difficulté d’accès après paiement, l’acheteur peut
          contacter contact@matheria.fr.
        </p>
      </LegalSection>

      <LegalSection title="Codes d’accès uniques">
        <p>
          Chaque code d’accès est personnel, unique et destiné à un seul espace
          élève. Il ne doit pas être partagé publiquement ni utilisé pour créer
          plusieurs espaces.
        </p>
        <p>
          Matheria peut révoquer un code en cas d’utilisation manifestement
          abusive, frauduleuse ou contraire aux présentes conditions.
        </p>
      </LegalSection>

      <LegalSection title="Absence d’abonnement">
        <p>
          Le Pack Révision Express Matheria est vendu en paiement unique. Il ne
          s’agit pas d’un abonnement et aucun prélèvement récurrent n’est prévu.
        </p>
      </LegalSection>

      <LegalSection title="Nature numérique du service">
        <p>
          Matheria est un service numérique accessible depuis un navigateur web,
          sur ordinateur, tablette ou téléphone compatible. L’utilisateur est
          responsable de disposer d’une connexion internet et d’un équipement
          compatible.
        </p>
      </LegalSection>

      <LegalSection title="Droit de rétractation">
        <p>
          [SECTION À COMPLÉTER / FAIRE VALIDER JURIDIQUEMENT] Pour les contenus
          ou services numériques fournis avant la fin du délai légal de
          rétractation, le droit de rétractation peut être écarté si le
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
          Les demandes de remboursement sont traitées selon la politique de
          remboursement publiée sur la page Remboursement de Matheria.
        </p>
        <p>
          En cas de double paiement, d’erreur de paiement ou d’accès non reçu
          après paiement, l’acheteur est invité à contacter contact@matheria.fr
          avec l’email utilisé lors du paiement.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité pédagogique">
        <p>
          Matheria aide les élèves à structurer leurs révisions et à s’entraîner
          en mathématiques. Le service ne remplace pas l’enseignement scolaire,
          un professeur, ni un accompagnement individualisé complet.
        </p>
        <p>
          Matheria ne garantit pas une note, une progression déterminée, ni la
          réussite à un examen.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Les données personnelles sont traitées conformément à la politique de
          confidentialité de Matheria. Cette politique précise les données
          collectées, les finalités, les prestataires techniques et les droits
          des personnes concernées.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute question sur une commande, un accès ou les présentes
          conditions, l’acheteur peut écrire à : contact@matheria.fr.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes conditions sont soumises au droit français. [CLAUSE DE
          MÉDIATION / TRIBUNAL COMPÉTENT À COMPLÉTER SI NÉCESSAIRE]
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
