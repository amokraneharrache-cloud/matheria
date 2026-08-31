# Couverture des annales Bac Maths Terminale — J62

Audit live réalisé le 31 août 2026 à 09:07 CEST (Europe/Paris) sur `/annales-bac-maths-terminale`, puis vérification du catalogue et des PDF officiels dans le repository.

## Gate de complétude

| État | Sujets affichés | Sujets avec corrigé détaillé complet | Sujets incomplets | Couverture |
| --- | ---: | ---: | ---: | ---: |
| Avant J62 (production auditée) | 10 | 2 | 8 | 20 % |
| Après J62 (code validé) | 10 | 10 | 0 | **100 %** |

Un corrigé est compté uniquement lorsque les quatre exercices du sujet disposent d'une méthode, d'étapes de calcul, d'une justification, d'un résultat explicite et d'une erreur fréquente lorsque pertinente.

## Inventaire complet

| Sujet | PDF officiel | Exercices | Corrigé | Route | Review maths |
| --- | --- | ---: | --- | --- | --- |
| 2026 Métropole–La Réunion–Mayotte J1 | [26-MATJ1ME1](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-517598.pdf) | 4/4 | Détaillé | `/sujet-bac-maths-2026-corrige#jour-1` | Existant, vérifié live |
| 2026 Métropole–La Réunion–Mayotte J2 | [26-MATJ2ME1](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517817.pdf) | 4/4 | Détaillé | `/sujet-bac-maths-2026-corrige#jour-2` | Existant, vérifié live |
| 2026 Antilles-Guyane J1 | [26-MATJ1AG1](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-517718.pdf) | 4/4 | Détaillé | `/annales/bac-maths-2026/antilles-guyane-jour-1-corrige` | Review 1 + 2 validées |
| 2026 Antilles-Guyane J2 | [26-MATJ2AG1](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517928.pdf) | 4/4 | Détaillé | `/annales/bac-maths-2026/antilles-guyane-jour-2-corrige` | Review 1 + 2 validées |
| 2026 Amérique du Nord J1 | [26-MATJ1AN1](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-1-517034.pdf) | 4/4 | Détaillé | `/annales/bac-maths-2026/amerique-du-nord-jour-1-corrige` | Review 1 + 2 validées |
| 2026 Amérique du Nord J2 | [26-MATJ2AN1](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517037.pdf) | 4/4 | Détaillé | `/annales/bac-maths-2026/amerique-du-nord-jour-2-corrige` | Review 1 + 2 validées |
| 2026 Centres étrangers groupe 1 J1 | [26-MATJ1G11](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-1-517247.pdf) | 4/4 | Détaillé | `/annales/bac-maths-2026/centres-etrangers-groupe-1-jour-1-corrige` | Review 1 + 2 validées |
| 2026 Centres étrangers groupe 1 J2 | [26-MATJ2G11](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517376.pdf) | 4/4 | Détaillé | `/annales/bac-maths-2026/centres-etrangers-groupe-1-jour-2-corrige` | Review 1 + 2 validées |
| 2026 Asie J1 | [26-MATJ1JA1](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-517442.pdf) | 4/4 | Détaillé | `/annales/bac-maths-2026/asie-jour-1-corrige` | Review 1 + 2 validées |
| 2026 Asie J2 | [26-MATJ2JA1](https://www.education.gouv.fr/sites/default/files/document/baccalaureat-general-2026-mathematiques-jour-2-517439.pdf) | 4/4 | Détaillé | `/annales/bac-maths-2026/asie-jour-2-corrige` | Review 1 + 2 validées |

## Journal de review mathématique

Les 32 nouveaux exercices ont été relus une première fois contre le PDF officiel puis recalculés indépendamment. Une seconde passe a ciblé les signes, domaines, hypothèses, arrondis, probabilités conditionnelles, primitives, valeurs initiales, notations et conclusions. Les identités et valeurs numériques clés sont verrouillées par `scripts/qa/annales-math-review.test.mjs`.

| Groupe | Review 1 | Review 2 | Corrections après review |
| --- | --- | --- | --- |
| Probabilités et combinatoire | Lois, conditionnements, espérances et variances recalculés | Complémentaires, dénominateurs conditionnels et arrondis vérifiés | Précisions de rédaction et distinction intersection/conditionnelle |
| Suites, limites et équations différentielles | Points fixes, récurrences, seuils et solutions recalculés | Domaines, monotonie, valeurs initiales et interprétation des rangs vérifiés | Seuils et sens des inégalités explicités |
| Analyse et intégrales | Dérivées, primitives, convexité, aires et volumes recalculés | Signes, bornes, changements de variable et unités vérifiés | Justifications de signe et de domaine renforcées |
| Géométrie dans l'espace | Coordonnées, produits scalaires, plans, distances et volumes recalculés | Colinéarité, appartenance et conclusions géométriques vérifiées | Hypothèses de normalité et projection explicitées |

## Garde-fous

- `npm run test:annales` impose 10/10 sujets, 40/40 exercices et une route interne non vide par carte.
- Les huit routes nouvelles sont générées statiquement, indexables et ajoutées au sitemap normal.
- Le crawler local a obtenu HTTP 200 sur les 12 routes critiques (hub, chapitre, ancienne correction 2026, huit nouvelles corrections et sitemap).
- QA Chrome : desktop et mobile, aucun overflow, 10 liens de correction, accordéons fonctionnels et aucune erreur console.

## Résultat

**COVERAGE 100 % — 10 sujets sur 10, 40 exercices sur 40.**
