import type { Metadata } from "next";
import { LegalPageLayout, LegalSection } from "@/components/legal/LegalPageLayout";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";

const pagePath = "/remboursement";

export const metadata: Metadata = {
  title: "Politique de remboursement",
  description:
    "Politique de remboursement SprintMaths : demande possible sous 7 jours, accès non reçu, erreur de paiement et absence de garantie de résultat scolaire.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: `Politique de remboursement | ${SITE_NAME}`,
    description:
      "Informations pratiques pour demander un remboursement ou signaler un problème d’accès SprintMaths.",
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
      description="Cette page explique comment demander un remboursement ou signaler un problème d’accès après l’achat du Pack Révision Express SprintMaths."
    >
      <LegalSection title="Principe général">
        <p>
          SprintMaths propose une garantie 7 jours : si l’accès ne correspond
          pas à vos attentes, vous pouvez demander un remboursement dans les 7
          jours suivant l’achat.
        </p>
        <p>
          La demande est étudiée selon les CGV, le parcours de paiement Stripe
          et les obligations applicables aux services numériques.
        </p>
      </LegalSection>

      <LegalSection title="Délai de demande">
        <p>
          Toute demande de remboursement doit être adressée à {CONTACT_EMAIL}
          dans les 7 jours suivant le paiement, avec l’email utilisé lors de
          l’achat et, si possible, le reçu Stripe.
        </p>
      </LegalSection>

      <LegalSection title="Accès non reçu">
        <p>
          Si l’acheteur n’a pas reçu son code d’accès après paiement, il peut
          contacter {CONTACT_EMAIL}. SprintMaths vérifiera le paiement et
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
          erreur manifeste, l’acheteur est invité à contacter SprintMaths rapidement
          à {CONTACT_EMAIL}.
        </p>
        <p>
          Après vérification, un remboursement total ou partiel pourra être
          effectué via Stripe.
        </p>
      </LegalSection>

      <LegalSection title="Droit de rétractation">
        <p>
          Le Pack Révision Express SprintMaths est un service numérique. Selon
          le parcours de paiement et le moment où l’accès est fourni, le droit de
          rétractation du consommateur peut s’appliquer ou être écarté si les
          conditions légales sont remplies.
        </p>
        <p>
          Les modalités applicables dépendent des informations affichées au
          moment du paiement et des consentements effectivement recueillis.
        </p>
      </LegalSection>

      <LegalSection title="Cas pouvant limiter le remboursement">
        <p>
          Certaines demandes peuvent être refusées, notamment lorsque l’accès a
          été fourni, utilisé normalement, et qu’aucun dysfonctionnement bloquant
          n’est constaté.
        </p>
      </LegalSection>

      <LegalSection title="Absence de garantie de résultat scolaire">
        <p>
          SprintMaths aide à structurer les révisions et à s’entraîner, mais ne
          garantit ni une note au bac, ni une mention, ni une progression
          déterminée. La note indicative /20 affichée dans le service sert
          uniquement de repère dans SprintMaths.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Pour toute demande liée à un remboursement ou à un accès, écrivez à
          {CONTACT_EMAIL} avec l’email utilisé lors du paiement.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
