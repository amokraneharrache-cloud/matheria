# SprintMaths — Acquisition Growth

## J66 — baseline des 5–6 septembre 2026

Début 5/09 à 22:29 CEST ; reprise le 6/09 matin, Europe/Paris (UTC+2). Données GSC actualisées, dernière journée disponible 3/09 :

| Période GSC | Clics | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| 28/08–03/09 (7 j) | 9 | 277 | 3,2 % | 20,5 |
| 07/08–03/09 (28 j) | 28 | 642 | 4,4 % | 25,9 |

Pages 7 j (clics/impressions) : programme 6/163, formules 1/22, calculatrice 1/14, dérivation 1/2, Grand Oral 0/24, planning 0/18. Pages 28 j : programme 7/310, planning 6/82, calculatrice 3/29, préparer rentrée 3/19, formules 2/32, dérivation 2/17, accueil 2/8, Grand Oral 1/70.

Requêtes 28 j : grand oral probabilité 0/33, programme spé maths terminale 2027 0/9, sujets sondage Grand Oral 0/9, planning revision bac s 0/8. Préparer ma rentrée Terminale spé maths 1/1 ; petits signaux formules/intégrales/probabilités. Les requêtes anonymisées empêchent de déduire les clics page de leur seule somme. Aperçu indexation : 43 indexées/37 non indexées ; causes non auditées, santé d'indexation non démontrée.

GA4 : un rapport déjà ouvert sur 29/08–04/09 affichait 73 sessions, 60 utilisateurs actifs, 59 nouveaux, 1:32 d'engagement/session, 7 événements clés et 0 revenu. Entrées : programme 12, automatismes 9, annales 8, Asie J1 7, diagnostic 7, planning 5, suites 4. L'actualisation a ensuite échoué (erreurs Google puis CAPTCHA). Il s'agit d'une relecture du rapport ouvert, pas d'une extraction fraîche.

La baseline communiquée 30 j (151 sessions, 124 utilisateurs, 48,34 %, 1:06, 748 événements ; période précédente 49 sessions), Bing 40/Google 24/YouTube 19/Instagram 7, l'unique vue d'offre et zéro clic Stripe ne sont **pas revalidés J66**. Pays, Qwant, TikTok, qualité et funnel actuel : n.d. Aucun filtre par pays ni conclusion « robots » sur la seule durée nulle. Autorité Google : hypothèse, non diagnostic établi.

Supabase avant QA J66 : 12 leads (6 diagnostic, 6 planning), 0 consentant, 0 nouveau depuis le 24/08, 0 acquisition_source, 0 désinscrit, 0 envoi de séquence. Les six accès incluent trois créations manuelles et trois historiques Stripe à 1 € de mai ; ils ne prouvent aucune vente réelle à 39 €.

Action SEO unique : enrichissement de `/formules-bac-maths-terminale` par six applications corrigées, conditions et erreurs fréquentes. Correction concomitante d'un encart obsolète sur les exclusions de l'écrit, avec le BO du 28/09/2023. Page déjà visible et cliquée (2/32 sur 28 j) ; pas de nouvelle URL ni changement de title/H1. Les CTA ne sont pas comptés comme action éditoriale.

Routing : cinq positions contextuelles vers le Diagnostic ; événement générique `diagnostic_cta_click`. North Star : nouveaux leads consentants/7 j ; mesure amont clics CTA/sessions d'entrée SEO, puis résultat → demande email → consentement. Contrats J65, Diagnostic et séquence inchangés.

Social : master audio 15 s prêt ; espacement J65 respecté. Distribution : trois nouveaux messages envoyés, voir [journal](j66/distribution.md). Aucune visite ou vente déduite d'un envoi.

Sept jours glissants post-J65 à partir du **10/09/2026 12:53:38,456 CEST** (déploiement code le 3/09). Sept journées civiles : 4–10/09, à consulter le 11/09 après actualisation.



Source de vérité transversale pour le moteur visiteur → diagnostic → lead
consenti → valeur email → achat. Les journaux SEO, Social et Email conservent
le détail de leur canal ; ce document rassemble les décisions et les KPI.

Dernière mise à jour : **5 septembre 2026 — J65**.

## J65 — vérité de mesure et distribution du diagnostic

- Le mismatch GA4/Supabase est expliqué : les demandes email partaient avant
  la réponse serveur et `email_optin` ne vérifiait pas le consentement. Le
  correctif minimal exige désormais `saved=true`, puis un consentement explicite
  pour l'opt-in. Les tests contrôlés A/B/C ont validé le contrat dans Tag
  Assistant et Supabase ; les deux lignes QA ont été supprimées.
- Funnel exploitable : vue → `diagnostic_start` →
  `diagnostic_complete`/`diagnostic_result_view` → demande email persistée →
  consentement marketing réel. La propriété GA4 existante a été renommée
  **SprintMaths** sans changer la propriété, le flux ni le Measurement ID.
- Base après nettoyage : 12 leads réels, dont 6 diagnostic et 6 planning ; 0
  nouveau lead depuis J64, 0 consentement, 0 éligible nurture, 0 envoi, 0 vente
  à 39 € et North Star à 0 sur 7 jours.
- Distribution : mini-test envoyé à deux nouveaux relais notés au moins 8/10,
  Lucas Petit et Geek Junior, sans doublon, Pack ni demande de backlink ; 0
  réponse au relevé initial. Une communauté a été écartée faute de règle
  d'autopromotion assez explicite.
- Social : un master audio unique de 18,6 s, trois questions validées et CTA
  diagnostic a été publié sur TikTok, Instagram et YouTube. Les métriques J64
  montrent un signal hook négatif mais non causal ; aucun scale n'est décidé.
- SEO : GSC frais atteint 6 clics / 227 impressions sur 7 jours et 21 / 523 sur
  28 jours. L'action unique améliore la page intégrales existante, qui avait
  déjà 7 impressions, plutôt que de créer une URL concurrente.

Décision : **GO J65**. Le prochain goulot à traiter est le trafic qualifié vers
le diagnostic ; huit vues ne justifient ni conclusion de conversion ni redesign.
Rapport complet : [`J65-diagnostic-distribution.md`](J65-diagnostic-distribution.md).

## J64 — mesure, hook direct et Programme Terminale 2027

### Mesure du funnel

- GA4, fenêtre complète du 25 au 31 août : 48 sessions, 37 utilisateurs actifs,
  39 utilisateurs totaux et 95 pages vues.
- Acquisition sociale : YouTube `social` 8 sessions, 2 engagées, 25 %
  d’engagement et 47 s d’engagement moyen ; Instagram `social` 2 sessions, 0
  engagée ; TikTok `social` absent du tableau, soit 0 session enregistrée.
- `/diagnostic` : 8 vues, 4 `diagnostic_start`, 2
  `diagnostic_result_view` et 2 `diagnostic_email_request`. Taux calculés après
  les volumes bruts : 50 % vue → start, 50 % start → résultat, 100 % résultat
  → demande email.
- Prudence : quatre sessions `direct / qa` sont présentes et GA4 compte 4
  événements `email_optin`, alors que Supabase ne contient aucun consentement.
  Les événements ne prouvent donc ni un lead persisté ni une acquisition réelle.

### Base, email et revenu

| KPI | Valeur J64 |
| --- | ---: |
| Leads cumulés | 12 |
| Nouveaux leads depuis J63 | 0 |
| Consentements marketing | 0 |
| Désinscriptions | 0 |
| Leads éligibles à la séquence | 0 |
| `email_sequence_sends` | 0 sent / 0 failed / 0 skipped |
| Nouveaux achats attribuables | 0 |
| Revenu attribuable J64 | 0 € |

Trois lignes historiques `source=stripe` totalisent 3,00 € dans
`access_codes`, mais aucune n’est nouvelle depuis J63 et leur contexte n’établit
pas une vente J64. Les six codes existants restent exclus du comptage de ventes
sans preuve transactionnelle complémentaire.

### SEO, Social et distribution

- GSC : 6 clics / 196 impressions sur 7 jours et 20 / 477 sur 28 jours. La
  requête « programme spé maths terminale 2027 » atteint 6 impressions, 0 clic
  et une position moyenne de 10,2 sur l’URL existante.
- Action SEO unique : clarification Bac 2027 contre rentrée 2027-2028 sur
  `/programme-maths-terminale`, avec comparaison, source officielle et maillage
  rentrée. Aucune nouvelle page.
- J63 audio est trop récent pour être comparé aux vidéos silencieuses. Son
  signal YouTube le plus utile est 68,5 % de balayage ; l’audit local montre que
  la question mathématique attendait environ 2 s malgré une voix à T=0.
- J64 corrige ce défaut avec un master 17,2 s où l’intégrale est visible dès la
  première image. Le même master, les légendes et les trois UTMs sont prêts.
- Distribution : quatre prospects examinés, Portail‑Éducation et mathete.net
  qualifiés à 9/10, sans doublon Gmail. Deux messages et une réponse ParcMaths
  envoyés le 02/09 après confirmation ; 0 réponse au contrôle.

Verdict provisoire : **GO SEO et créatif ; audio indécidable ; conversion nulle**.
Le goulot démontré reste le passage reach → visite qualifiée, suivi du passage
diagnostic → lead consenti. Aucun motif ne justifie une refonte du diagnostic ou
de la séquence email.

## J62 — annales 100 % corrigées

### Acquisition

- Actif SEO principal : le hub `/annales-bac-maths-terminale` passe de
  **2 corrigés détaillés sur 10 sujets (20 %)** à **10 sur 10 (100 %)**.
  Huit routes centre/jour ont été ajoutées ; les 40 exercices officiels sont
  couverts, avec accès au PDF ministériel et correction SprintMaths originale.
- GSC au relevé J62 : **7 clics, 216 impressions, CTR 3,2 %, position 31** sur
  7 jours ; **22 clics, 423 impressions, CTR 5,2 %, position 28,9** sur
  28 jours. Le hub annales n'a encore que 1 impression sur 7 jours et 3 sur
  28 jours, sans clic : il n'existe donc pas encore de signal post-déploiement.
- Social amont : TikTok J60/J61 se situe entre 261 et 292 vues par vidéo avec
  une rétention courte ; Instagram atteint 50 vues sur J61 et 186 vues cumulées
  sur les trois Reels J60 ; YouTube affiche 547 vues sur 28 jours et le Short
  J61 atteint 41 vues avec 44,1 % de visionnage moyen.
- Le master J62, un vrai exercice Bac Maths 2026 Asie Jour 2, est prêt en
  1080 × 1920 avec campagne `annales_social`. Sa publication reste bloquée
  avant upload par l'autorisation Chrome d'accès aux fichiers locaux ; aucune
  métrique J62 n'est donc inventée.
- La télémétrie persistée ne permet pas de compter de façon fiable les visites,
  starts, complétions et vues de résultat du diagnostic : ces valeurs restent
  `n.d.`.

### Leads

| KPI | Relevé J62 |
| --- | ---: |
| Lignes `leads` | 12 |
| Nouveaux leads depuis J61 | 0 |
| Consentements marketing totaux | 0 |
| Nouveaux opt-ins depuis J61 | 0 |
| Désinscriptions | 0 |
| Sources historiques | 6 diagnostic / 6 planning |
| `acquisition_source` renseignée | 0 |
| Envois `email_sequence_sends` | 0 sent / 0 failed / 0 skipped |
| Achats attribuables J62 | 0 |
| Revenu attribuable J62 | 0 € |

Zéro envoi de séquence est le comportement attendu tant qu'aucun consentement
marketing n'est prouvé. Le diagnostic n'a pas été modifié pendant J62.

### Distribution

Cinq relais nouveaux maximum ont été qualifiés, sans doublon Gmail ni relance
des trois contacts J61 :

| Prospect | Audience | Page précise | Accepte des ressources externes ? | Contact | Score | État |
| --- | --- | --- | --- | --- | ---: | --- |
| APMEP — responsable des annales | Professeurs de mathématiques et élèves | Ressources / annales Bac et formulaire du responsable | Oui, canal dédié aux annales | Formulaire APMEP | 10/10 | Message prérempli, confirmation d'envoi requise |
| Mathoutils — Jason Lapeyronnie | Élèves et professeurs de lycée | Annales de Bac 2026 et page Contact | Oui, la page accepte explicitement les suggestions | Formulaire Mathoutils | 9/10 | Message prérempli, confirmation d'envoi requise |
| Onisep — ressources éducatives | Lycéens, familles et équipes éducatives | Ressources éducatives pour l'orientation | Oui, remarques et suggestions acceptées | `ressources@onisep.fr` | 8/10 | Envoyé le 31/08/2026 |
| Pierre Carrée | Professeurs et élèves de Terminale | Annales 2026, 12 sujets corrigés | Partiel : formulaire ouvert, politique externe non explicite | Formulaire public | 7/10 | Non contacté |
| AlloAnnales | Élèves, parents et professeurs | Annales Bac 2026 et réseau éducatif | Non démontré ; service directement concurrent | `contact@digika.fr` | 7/10 | Non contacté |

Les messages qualifiés font 50 à 100 mots, sont personnalisés, proposent la
banque 10/10 comme ressource gratuite et ne demandent aucun backlink. Onisep
constitue l'opportunité non-SEO J62 : diffusion utile d'une ressource, sans
objectif principal de lien.

### Résultats

- Couverture éditoriale : **10/10 sujets, 40/40 exercices, 100 %**.
- Release : commit `1ede0a6`, push `main`, déploiement Vercel production
  `READY`, 12/12 routes critiques en HTTP 200 et huit nouvelles URL présentes
  dans le sitemap.
- Distribution : 1 message envoyé, 2 prêts sous confirmation, 0 réponse et
  0 mention/lien observés au relevé initial.
- Social J62 : 0 publication et donc 0 première métrique tant que l'upload
  Chrome reste bloqué.
- Conversion J62 : 0 nouveau lead, 0 opt-in, 0 envoi nurture, 0 achat, 0 €.

## North Star

**Nouveaux leads avec consentement marketing prouvé par semaine.**

Un email transactionnel demandé n'est pas un opt-in. Un lead ne compte dans la
North Star que si `marketing_consent = true`, avec
`marketing_consent_at` et `consent_version` renseignés.

Baseline J61 : **0 nouveau lead consenti sur 7 jours**.

## Diagnostic

- `/diagnostic` est désormais un vrai test de 10 questions, indexable, avec
  résultat immédiat et sans email obligatoire.
- Cinq domaines ont chacun deux questions : calcul, fonctions/dérivation,
  suites, probabilités, raisonnement/géométrie.
- Le résultat reste prudent : score global, cinq sous-scores, deux priorités au
  maximum, corrections et ressources ciblées.
- L'envoi du bilan est facultatif. La case marketing est distincte, non
  précochée et sans effet sur la délivrance transactionnelle.
- Événements : `diagnostic_start`, `diagnostic_complete`,
  `diagnostic_result_view`, `diagnostic_email_request` et
  `diagnostic_resource_click`.

## SEO

- GSC 7 jours au 27/08 : **10 clics, 230 impressions, CTR 4,3 %, position 31**.
- GSC 28 jours : **22 clics, 416 impressions, CTR 5,3 %, position 28**.
- Indexation : **38 URL indexées / 42 non indexées** ; aucune URL « explorée,
  actuellement non indexée ».
- Action SEO unique J61 : transformation de `/diagnostic` en page utile,
  rendue indexable avec canonical et ajoutée au sitemap.
- Aucune seconde page créée et aucune demande manuelle d'indexation : la mise à
  jour du sitemap suffit à ce stade.

Journal détaillé : [`seo-j48-indexation-authority.md`](seo-j48-indexation-authority.md).

## Social

- J60 a produit trois idées originales sur TikTok, Instagram et YouTube, plus
  un carrousel Instagram.
- Relevé J61 : TikTok J60 totalise 269 à 284 vues par vidéo ; Instagram affiche
  31 vues sur 30 jours et 0 interaction ; les trois Shorts J60 totalisent 584
  vues sur les dernières 48 h affichées.
- J61 publie un nouveau master de 27 s, « mini-diagnostic Terminale », sur les
  trois plateformes avec campagne `diagnostic_social`.
- Les profils TikTok et Instagram ne permettent toujours pas de poser le lien
  cliquable depuis le Web ; le domaine reste visible en bio. YouTube conserve
  un lien cliquable.

Journal détaillé : [`social-growth.md`](social-growth.md).

## Direct Distribution

Recherche J61 : 10 prospects adultes/intermédiaires évalués, sans sollicitation
de mineurs. Trois dépassent le seuil avec une page active, des ressources
externes déjà référencées et un canal public :

| Prospect | Score | Canal | État |
| --- | ---: | --- | --- |
| Génération Zébrée | 10/10 | `team@generationzebree.fr` | Envoyé le 30/08 |
| Bpi — Autoformation | 10/10 | `valorisations.autoformation@bpi.fr` | Envoyé le 30/08 |
| Inès Maths | 9/10 | `revision@inesmaths.fr` | Envoyé le 30/08 |

Les messages font 50 à 100 mots, sont personnalisés et proposent le diagnostic
comme ressource utile, sans demander de backlink. Aucun doublon Gmail n'existait
avant envoi et aucun bounce n'est observé au relevé initial. Aucune communauté
n'a été utilisée faute de règle d'autopromotion explicitement compatible
vérifiée.

## Leads

Relevé production après suppression des lignes de QA :

| KPI | Avant J61 | Après J61 |
| --- | ---: | ---: |
| Lignes `leads` | 12 | 12 |
| Consentements marketing | 0 | 0 |
| Désinscriptions | 0 | 0 |
| Sources historiques | 6 diagnostic / 6 planning | inchangé |
| `acquisition_source` renseignée | 0 | 0 |

Les deux soumissions réelles de validation sur la même adresse de test ont
confirmé l'upsert sans doublon puis ont été supprimées intégralement.

## Email

- Le planning et le diagnostic ont chacun un email transactionnel dédié.
- Le diagnostic envoie un bilan seulement sur demande, même sans consentement
  marketing, et ne contient pas de vente du Pack.
- La séquence nurture est réservée aux opt-ins et son ancre J+2/J+4/... est
  désormais `marketing_consent_at`, jamais la date historique de création.
- Cron configuré : `0 8 * * *` sur `/api/cron/email-sequence`.
- État production : **0 consentant, 0 envoi de séquence, 0 échec enregistré**.
- Une délivrance Resend réelle sur `delivered@resend.dev` a validé le chemin
  transactionnel. Le smoke public passe 6 routes sur 6 ; le contrôle `/health`
  reste non concluant avec le jeton local disponible (401), sans le confondre
  avec une panne du produit public.

Journal détaillé : [`email-growth.md`](email-growth.md).

## Revenue

- Achat J61 attribuable : **0**.
- Revenu J61 attribuable : **0 €**.
- Les six `access_codes` existants ne sont pas interprétés comme six achats :
  aucune preuve transactionnelle ne permet cette attribution.

## Daily scorecard

`n.d.` signifie que la donnée n'est pas disponible de façon fiable, et non
qu'elle vaut zéro.

| Date | Source | Sessions | Leads | Opt-ins | Offer clicks | Purchases |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 30/08/2026 | Google | n.d. | 0 | 0 | n.d. | 0 |
| 30/08/2026 | TikTok | n.d. | 0 | 0 | n.d. | 0 |
| 30/08/2026 | Instagram | n.d. | 0 | 0 | n.d. | 0 |
| 30/08/2026 | YouTube | n.d. | 0 | 0 | n.d. | 0 |
| 30/08/2026 | Direct outreach | n.d. | 0 | 0 | n.d. | 0 |
| 30/08/2026 | Direct | n.d. | 0 | 0 | n.d. | 0 |
| 30/08/2026 | Email | n.d. | 0 | 0 | n.d. | 0 |
| 30/08/2026 | Autre | n.d. | 0 | 0 | n.d. | 0 |

## Experiments

| Expérience | Hypothèse | Mesure | Statut |
| --- | --- | --- | --- |
| Diagnostic sans gate | Montrer le résultat avant l'email augmente la confiance et les complétions | Starts → results → email requests | Lancée |
| Mini-diagnostic social | Un aperçu interactif crée plus d'intention qu'un conseil générique | Vues, rétention, clics, leads | Lancée |
| Distribution éditoriale | Des intermédiaires qualifiés peuvent produire des visites plus intentionnelles | Clics UTM, leads, réponses | 3 envois |
| Email facultatif | Une proposition après valeur produit des opt-ins plus sains | Requests, opt-ins, désinscriptions | Lancée |

## Plan 30 jours

1. Relever chaque semaine starts, complétions, demandes d'email, opt-ins et
   clics ressources ; ne pas réécrire le funnel avant volume exploitable.
2. Publier 3 à 4 vidéos originales par semaine, avec au moins deux variantes du
   mécanisme mini-test avant toute conclusion de format.
3. Répondre aux trois prospects J61 ; une seule relance sobre à J+7 si aucun
   retour, puis clôture.
4. Mesurer les UTM `diagnostic_social` et `diagnostic_direct` dans les leads,
   sans attribuer les visites non instrumentées.
5. Refaire le point GSC à J+7 et J+28 ; observer `/diagnostic`, sans créer une
   nouvelle page pour remplir un quota.
6. Maintenir le cron et la séquence ; corriger seulement un bug démontré.
7. Décider J62 selon le premier signal : portée sociale, clics de distribution
   ou complétions sans opt-in.

## Décision

**GO acquisition, NO GO nouvelle refonte.** Le bottleneck est maintenant la
distribution qualifiée et la mesure, plus la construction du diagnostic.
