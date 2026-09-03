# Tracking

## Funnel Measurement Contract — J65

Ce contrat sépare une interaction d'interface, une demande transactionnelle
réellement enregistrée et un consentement marketing. Aucun de ces événements ne
doit contenir d'email ni de réponse détaillée au diagnostic.

| Event | Déclencheur code exact | Succès serveur requis ? | Signification analytique |
| --- | --- | --- | --- |
| `diagnostic_start` | Clic sur le bouton qui fait passer le diagnostic de l'introduction à la première question | Non | Une personne a réellement commencé le questionnaire |
| `diagnostic_complete` | Validation de la réponse à la dixième et dernière question, après calcul local du score | Non | Les 10 questions ont été terminées et le résultat a été calculé côté client |
| `diagnostic_result_view` | Même transition finale que `diagnostic_complete`, juste avant l'affichage de l'état résultat | Non | Le parcours a atteint l'écran de résultat ; à ce jour son volume doit être identique à `diagnostic_complete` |
| `diagnostic_email_request` | Réponse `success` de `/api/leads/diagnostic` avec `saved=true` | Oui, persistance Supabase prouvée | Une demande transactionnelle de bilan a été enregistrée, avec ou sans consentement marketing |
| `lead_magnet_request` | Réponse `success` de `/api/leads/planning` avec `saved=true` | Oui, persistance Supabase prouvée | Une demande transactionnelle de planning a été enregistrée, avec ou sans consentement marketing |
| `email_optin` | Après `saved=true`, uniquement si la case de consentement marketing soumise valait explicitement `true` | Oui, plus consentement explicite | Un consentement marketing réel a été enregistré ; ce n'est ni une vue de formulaire ni une simple demande d'email |

Avant le correctif J65, `diagnostic_email_request` et `lead_magnet_request`
partaient avant la réponse serveur, tandis que `email_optin` partait après toute
réponse `success`, même avec `marketingConsent=false`. Ce contrat trop large
explique qu'un volume GA4 ait pu dépasser les lignes Supabase et compter des
`email_optin` sans aucun consentement réel. Depuis J65, une réponse honeypot
(`saved=false`), une erreur réseau/serveur ou le mode local non persisté ne produit
aucun de ces trois événements aval.

Le funnel interprétable est donc :

`diagnostic view → diagnostic_start → diagnostic_complete/result_view → diagnostic_email_request (saved) → email_optin (saved + consent)`.

## Events SEO sujets type bac J14-J15

Ces events sont pousses via `TrackedLink` et `trackEvent` dans
`window.dataLayer` quand le tracking client est actif. Ils sont exploitables en
GTM Preview quand `NEXT_PUBLIC_TRACKING_MODE=gtm-ready` et
`NEXT_PUBLIC_GTM_ID` sont renseignes.

| Event name | Page source | CTA | Params principaux |
| --- | --- | --- | --- |
| `click_subject_complete_typebac_start` | `/sujets-type-bac-maths-terminale` | Continuer avec les exercices type bac guides | `source_page`, `destination_page`, `intent`, `subject`, `cta_location` |
| `click_subject_complete_chapter_link` | `/sujets-type-bac-maths-terminale` | Liens d'entrainement par partie du sujet complet | `source_page`, `destination_page`, `intent`, `subject`, `part`, `link_type`, `cta_location` |
| `click_subject_complete_planning` | `/sujets-type-bac-maths-terminale` | Recevoir le planning Bac Maths 2027 | `source_page`, `destination_page`, `intent`, `subject`, `lead_magnet`, `cta_location` |
| `click_subject_complete_diagnostic` | `/sujets-type-bac-maths-terminale` | Faire le diagnostic gratuit | `source_page`, `destination_page`, `intent`, `subject`, `cta_location` |
| `click_subject_complete_offer` | `/sujets-type-bac-maths-terminale` | Voir le Pack Revision Express | `source_page`, `destination_page`, `intent`, `subject`, `offer`, `price`, `currency`, `cta_location` |
| `click_typebac_demo_start` | `/exercices-type-bac-maths-terminale` | Commencer la demo | `source_page`, `destination_page`, `intent`, `demo`, `cta_location` |
| `click_typebac_demo_subjects` | `/exercices-type-bac-maths-terminale` | Voir les sujets type bac guides | `source_page`, `destination_page`, `intent`, `demo`, `cta_location` |
| `click_typebac_demo_planning` | `/exercices-type-bac-maths-terminale` | Recevoir le planning Bac Maths 2027 | `source_page`, `destination_page`, `intent`, `demo`, `lead_magnet`, `cta_location` |
| `click_typebac_demo_diagnostic` | `/exercices-type-bac-maths-terminale` | Faire le diagnostic gratuit | `source_page`, `destination_page`, `intent`, `demo`, `cta_location` |
| `click_typebac_demo_offer` | `/exercices-type-bac-maths-terminale` | Voir le Pack Revision Express | `source_page`, `destination_page`, `intent`, `demo`, `offer`, `price`, `currency`, `cta_location` |

Les params `source_page`, `destination_page`, `intent`, `subject`, `part` et
`demo` sont declares dans `TrackingParams`, autorises dans la whitelist de
`sanitizeTrackingParams`, puis conserves apres sanitization.

Ces events ne doivent pas transporter de PII : pas d'email, pas de code d'acces
utilisateur, pas de score detaille et pas de reponse utilisateur.

## Protocole manuel GTM Preview

1. Configurer l'environnement local ou Preview avec
   `NEXT_PUBLIC_TRACKING_MODE=gtm-ready`.
2. Renseigner `NEXT_PUBLIC_GTM_ID` avec l'ID du conteneur GTM a verifier.
3. Demarrer l'app puis ouvrir GTM Preview / Tag Assistant sur l'URL testee.
4. Ouvrir `/sujets-type-bac-maths-terminale`.
5. Cliquer sur un CTA du sujet complet, par exemple
   "Continuer avec les exercices type bac guides".
6. Dans GTM Preview, verifier que l'event correspondant apparait dans
   `dataLayer` avec `source_page`, `destination_page`, `intent` et `subject`.
7. Cliquer un lien de partie du sujet complet et verifier
   `click_subject_complete_chapter_link` avec `part`.
8. Ouvrir `/exercices-type-bac-maths-terminale`.
9. Cliquer "Commencer la demo" dans la section demo type bac.
10. Verifier `click_typebac_demo_start` avec `demo`.
11. Cliquer les CTA de la demo vers sujets, planning, diagnostic et offre.
12. Verifier dans `dataLayer` les events
   `click_typebac_demo_subjects`, `click_typebac_demo_planning`,
   `click_typebac_demo_diagnostic` et `click_typebac_demo_offer`.
13. Controler qu'aucun payload ne contient email, code d'acces utilisateur,
   score detaille ou reponse utilisateur.
