import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const pagePath = "/remboursement";

export const metadata: Metadata = {
  title: "Politique de remboursement",
  description:
    "Politique de remboursement Matheria : délai de demande, accès non reçu, erreur de paiement, droit de rétractation à valider.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: `Politique de remboursement | ${SITE_NAME}`,
    description:
      "Informations pratiques pour demander un remboursement ou signaler un problème d’accès Matheria.",
    url: absoluteUrl(pagePath),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RemboursementPage() {
  return (
    <LegalPageLayout
      title="Politique de remboursement"
      description="Cette page explique comment demander un remboursement ou signaler un problème d’accès après l’achat du Pack Révision Express Matheria."
    >
      <LegalSection title="Principe général">
        <p>
          Matheria souhaite traiter les demandes de remboursement de manière
          claire et raisonnable, notamment en cas de problème d’accès, d’erreur
          de paiement ou de situation exceptionnelle.
        </p>
        <p>
          Cette politique doit être relue et validée avant une vente réelle afin
          d’être cohérente avec le parcours de paiement Stripe et les obligations
          applicables aux services numériques.
        </p>
      </LegalSection>

      <LegalSection title="Délai de demande">
        <p>
          [DÉLAI À COMPLÉTER / VALIDER] Toute demande de remboursement doit être
          adressée à contact@matheria.fr dans un délai de [X JOURS À COMPLÉTER]
          après le paiement, avec l’email utilisé lors de l’achat et, si possible,
          le reçu Stripe.
        </p>
      </LegalSection>

      <LegalSection title="Accès non reçu">
        <p>
          Si l’acheteur n’a pas reçu son code d’accès après paiement, il peut
          contacter contact@matheria.fr. Matheria vérifiera le paiement et
          fournira un accès dans les meilleurs délais.
        </p>
        <p>
          Si l’accès ne peut pas être fourni malgré un paiement confirmé, un
          remboursement pourra être proposé.
        </p>
      </LegalSection>

      <LegalSection title="Erreur de paiement">
        <p>
          En cas de double paiement, de montant incorrect ou d’achat effectué par
          erreur manifeste, l’acheteur est invité à contacter Matheria rapidement
          à contact@matheria.fr.
        </p>
        <p>
          Après vérification, un remboursement total ou partiel pourra être
          effectué via Stripe.
        </p>
      </LegalSection>

      <LegalSection title="Droit de rétractation">
        <p>
          [SECTION À COMPLÉTER / FAIRE VALIDER JURIDIQUEMENT] Le Pack Révision
          Express Matheria est un service numérique. Selon le parcours de
          paiement et le moment où l’accès est fourni, le droit de rétractation
          du consommateur peut s’appliquer ou être écarté si les conditions
          légales sont remplies.
        </p>
        <p>
          Avant les ventes réelles, il faut vérifier que le consentement exprès à
          l’exécution immédiate du service et la reconnaissance de la perte du
          droit de rétractation, si utilisés, sont correctement recueillis.
        </p>
      </LegalSection>

      <LegalSection title="Cas non remboursables à préciser">
        <p>
          [À COMPLÉTER / VALIDER] Certaines demandes peuvent être refusées,
          notamment lorsque l’accès a été fourni, utilisé normalement, et qu’aucun
          dysfonctionnement bloquant n’est constaté. Cette clause doit être
          adaptée au parcours réel et validée juridiquement.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute demande liée à un remboursement ou à un accès, écrivez à
          contact@matheria.fr avec l’email utilisé lors du paiement.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
