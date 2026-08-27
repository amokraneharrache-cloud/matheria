/**
 * Wording de consentement et sa version.
 *
 * Ce module est volontairement sans dépendance serveur (`node:crypto`,
 * variables d'environnement…) pour pouvoir être importé par les composants
 * client des formulaires. Le texte affiché à l'utilisateur et la version
 * enregistrée comme preuve viennent ainsi de la même source.
 */

/** À incrémenter à chaque modification du texte ci-dessous. */
export const CONSENT_VERSION = "2026-08-v1";

/** Texte exact de la case à cocher, facultative et jamais précochée. */
export const MARKETING_CONSENT_LABEL =
  "Je souhaite recevoir par email les conseils de révision, exercices et offres SprintMaths. Je peux me désinscrire à tout moment.";

/** Phrase affichée sous le champ email, qui décrit l'usage de base. */
export const TRANSACTIONAL_NOTICE =
  "Ton email sert à t'envoyer la ressource demandée.";
