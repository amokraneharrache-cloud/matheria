// Données du bloc succès post-opt-in du formulaire planning.
// Module TS pur (sans JSX) : consommé par PlanningLeadForm et importable
// tel quel dans les tests QA Node (le harness ne transpile pas le TSX).
import type { SprintMathsEventName } from "@/lib/tracking";

export const PLANNING_LEAD_MAGNET = "planning_bac_maths_2027";
export const PLANNING_SUCCESS_CTA_LOCATION = "planning_success_state";
export const PLANNING_SUCCESS_INTENT = "post_optin_next_step";

export type PlanningSuccessLink = {
  href: string;
  label: string;
  eventName: SprintMathsEventName;
  kind: "primary" | "secondary";
};

// Les 3 prochaines étapes proposées après l'opt-in, dans l'ordre d'affichage.
export const PLANNING_SUCCESS_LINKS: readonly PlanningSuccessLink[] = [
  {
    href: "/diagnostic",
    label: "Faire le diagnostic gratuit",
    eventName: "click_planning_success_diagnostic",
    kind: "primary",
  },
  {
    href: "/sujets-type-bac-maths-terminale#sujet-corrige-guide",
    label: "Voir un sujet type bac corrigé",
    eventName: "click_planning_success_subjects",
    kind: "secondary",
  },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Essayer un exercice guidé",
    eventName: "click_planning_success_typebac",
    kind: "secondary",
  },
] as const;

// Lien secondaire discret vers l'offre : jamais le CTA principal du bloc.
export const PLANNING_SUCCESS_OFFER_LINK = {
  href: "/bac-maths-2027#offre",
  label: "Découvrir le Pack Révision Express",
  eventName: "click_planning_success_offer" satisfies SprintMathsEventName,
  offer: "pack_revision_express_bac_2027",
} as const;
