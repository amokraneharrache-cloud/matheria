# Tracking

## J66 — QA future, purchase et routage SEO

### QA future

Les navigations lancées avec `utm_source=qa` OU `utm_medium=qa` (valeur entière, casse ignorée) initialisent une session QA dans `sessionStorage` pour 30 minutes d'activité. Le signal survit aux liens internes sans UTM. `GoogleTagManager` l'initialise avant de charger son script ; `trackEvent` le réapplique avant chaque événement.

Le signal est `traffic_type=internal`, placé via la commande globale `gtag('set', ...)` et sur les événements applicatifs. La configuration exacte du filtre GA4 distant n'a pas pu être revalidée en J66 (erreurs Google puis CAPTCHA). Pour garantir que les QA futures ne gonflent pas cette propriété, `ga-disable-G-761C7Z47JG=true` coupe aussi la collecte vers ce flux avant son chargement. Un achat Stripe de test active également cette protection, même sans UTM. Les événements restent inspectables dans la file locale/Tag Assistant ; l'absence volontaire de collecte QA n'est pas une preuve de réception GA4.

Le blocage reste actif dans le document chargé. Pour une session ordinaire, utiliser un nouvel onglet sans UTM QA, après expiration de la session QA si l'onglet est réutilisé. Aucun filtre par pays, IP seule ou `source=qa` inventé. Les données historiques restent inchangées. La date effective sera l'heure READY du déploiement J66, consignée dans le rapport.

Tag Assistant referral : aucune modification des références indésirables sans preuve d'une attribution réelle ; exclure une référence ne supprime pas des événements QA.

### Purchase

Avant J66 : le webhook Stripe créait un accès après paiement, mais aucun événement `purchase` vérifié n'était connecté au navigateur. Une vue de `/merci` ne prouve rien.

Après J66 : `/merci?session_id={CHECKOUT_SESSION_ID}` appelle `POST /api/stripe/purchase`. Le serveur récupère la session via la clé secrète Stripe avec expansion `payment_link`, exige `mode=payment`, `status=complete`, `payment_status=paid`, le lien de paiement configuré et, en production, `livemode=true`. Il ne renvoie que les trois paramètres de mesure. Une erreur, un identifiant absent/falsifié, un autre produit ou une session impayée ne produit aucun événement.

- `transaction_id` = identifiant stable de session Stripe, jamais un email.
- `value` = montant Stripe effectif en unité majeure (diviseur 100 pour EUR, devises zéro décimale prises en compte).
- `currency` = devise Stripe en majuscules.
- Déduplication navigateur par identifiant en mémoire et stockage local (50 derniers) ; GA4 peut également dédupliquer `transaction_id`.
- Émission navigateur après vérification serveur, pour conserver l'attribution existante ; aucun nouvel accès créé par cet endpoint.
- Clé secrète Stripe absente : HTTP 503 et aucun achat déclaré.
- Le webhook refuse désormais aussi l'absence de `payment_status=paid`.

**Dépendance externe restante** : vérifier/configurer sur le Payment Link Stripe existant `after_completion.redirect.url=https://www.sprintmaths.com/merci?session_id={CHECKOUT_SESSION_ID}`. L'authentification Stripe demande la clé d'accès du titulaire ; cette configuration n'est pas encore confirmée. Aucun paiement réel de QA ni fausse vente production. La réception GA4 et le statut Key Event doivent encore être vérifiés dans l'interface accessible ; aucun événement custom doublon créé.

### Diagnostic CTA

Un seul événement `diagnostic_cta_click`, avec `source_page` et `placement`, accompagne le composant `DiagnosticCta` :

| Route | Placement |
| --- | --- |
| Programme Terminale | `after_intro`, après la réponse utile sur le programme applicable |
| Automatismes Première | `after_exercise`, après l'entraîneur |
| Hub annales | `annales_contextual`, après la liste des sujets |
| Template huit corrections 2026 | `after_correction`, après la correction complète |
| Exercices suites | `after_exercise`, après le premier exercice |

Promesse : « Teste tes bases en 10 questions ». Sous-promesse : « Résultat et corrections immédiats. Aucun email obligatoire. » Bouton : « Faire le test gratuit ».

Le conteneur public GTM-PD7DCMRG charge déjà le Google tag G-761C7Z47JG. Ses événements GA existants utilisent une whitelist sans `transaction_id`, `value` ni `placement`. Les deux nouveaux contrats passent donc par la file gtag native (`Arguments`, commande `event`, `send_to` explicite), sans deuxième custom event susceptible de déclencher en double le regex GTM `diagnostic_.*`. Les événements J65 gardent leur transport et leurs conditions serveur.

Mesure J67 : `diagnostic_cta_click / sessions d'entrée SEO ciblées`, puis `diagnostic_start → result_view → diagnostic_email_request → email_optin`. Le ratio clics/sessions peut dépasser 100 % si une session clique plusieurs fois ; pour un taux de conversion, utiliser des sessions distinctes ayant cliqué.

### Fenêtre post-J65

Le commit fonctionnel J65 `cb80c62703b2313932beff30256e3225bd9cbaae` était READY le **3 septembre 2026 à 12:53:38,456 CEST** (Vercel `dpl_9GCueke8jTrpdbNMuiVCic3ckFbi`). Sept jours glissants entièrement post-correctif seront disponibles à partir du **10 septembre 2026 à 12:53:38,456 CEST**. Sept journées civiles complètes : **4–10 septembre**, à consulter le 11 septembre après actualisation. Les commits de documentation du 5 septembre ne déplacent pas la mise en production du code.

Sources : [Google : trafic interne](https://support.google.com/analytics/answer/10104470), [Google tag API et portée des paramètres](https://developers.google.com/tag-platform/gtagjs/reference), [Stripe : après paiement d'un Payment Link](https://docs.stripe.com/payment-links/post-payment).


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

### Validation contrôlée J65

La production charge le conteneur GTM `GTM-PD7DCMRG`, relié au flux GA4
SprintMaths `G-761C7Z47JG`. Tag Assistant et une lecture agrégée Supabase ont
validé trois parcours avec la campagne `j65_controlled`, sans PII dans les
événements :

| Test | Action | Événements aval attendus et observés | Vérité Supabase |
| --- | --- | --- | --- |
| A | Résultat, sans email | Aucun `diagnostic_email_request`, aucun `email_optin` | Aucune ligne |
| B | Email de test, case marketing vide | `diagnostic_email_request`, aucun `email_optin` | Ligne persistée, consentement faux |
| C | Email de test, case marketing cochée | `diagnostic_email_request` et `email_optin` | Ligne persistée, consentement vrai et daté |

Le nettoyage a supprimé exactement les deux lignes B/C après contrôle du
compte ; le relevé final confirme zéro ligne QA restante. La propriété GA4
existante porte désormais le nom **SprintMaths** ; son identifiant, son flux et
son historique n'ont pas été remplacés.

Limite de validation : GA4 Realtime/DebugView n'a pas permis de confirmer la
réception dans les rapports (zéro ou erreurs d'interface). Les preuves A/B/C
portent sur les événements et balises dans Tag Assistant et sur la persistance
Supabase ; elles ne constituent pas un relevé de comptages GA4.

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
