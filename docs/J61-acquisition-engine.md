# RAPPORT J61 — ACQUISITION ENGINE

**Date** : dimanche 30 août 2026, Europe/Paris  
**Release produit** : `e142210` — `J61: launch real maths diagnostic`  
**URL** : <https://www.sprintmaths.com/diagnostic>  
**Décision** : **GO**

## A — Diagnostic

### 1. Ancien flow

Quatre étapes déclaratives, email/parent obligatoire avant le bilan, résultat
conditionné à la saisie, animation d'attente sans calcul réel et prétention de
diagnostic plus précise que les données collectées.

### 2. Problèmes confirmés

Le flow ne testait aucune compétence mathématique, créait de la friction avant
la valeur, mélangeait email transactionnel et consentement, et n'offrait ni
correction ni sous-score calculé.

### 3–4. Banque auditée et volume réel

| Banque | Questions | Structure |
| --- | ---: | --- |
| Brevet | 104 | 13 thèmes × 8 |
| Première | 132 | 11 thèmes × 12 |
| Terminale | 176 | 16 thèmes × 11 |
| **Total** | **412** | — |

Les 16 thèmes Terminale ont chacun 11 questions et les trois difficultés :
suites, limites, continuité, dérivation, convexité, logarithme, exponentielle,
équations différentielles, intégrales, probabilités, loi binomiale, variables
aléatoires, géométrie dans l'espace, vecteurs/droites/plans, dénombrement et
algorithmique. Le diagnostic d'entrée en Terminale utilise toutefois des
prérequis de Première, ce qui correspond à sa promesse.

### 5–6. Dix questions retenues et domaines

| # | ID | Domaine | Difficulté | Compétence |
| ---: | --- | --- | --- | --- |
| 1 | `q-226` | Calcul algébrique | facile | Addition de fractions |
| 2 | `q-124` | Calcul algébrique | moyen | Simplification par factorisation |
| 3 | `q-170` | Fonctions/dérivation | moyen | Équation d'une tangente |
| 4 | `q-182` | Fonctions/dérivation | moyen | Signe d'une dérivée |
| 5 | `q-191` | Suites | facile | Terme d'une suite arithmétique |
| 6 | `q-197` | Suites | moyen | Terme d'une suite géométrique |
| 7 | `q-207` | Probabilités | moyen | Tirage sans remise |
| 8 | `q-210` | Probabilités | difficile | Formule des probabilités totales |
| 9 | `q-129` | Raisonnement/géométrie | difficile | Signe d'un trinôme |
| 10 | `q-244` | Raisonnement/géométrie | moyen | Produit scalaire |

Chaque domaine contient exactement deux items. L'ordre des réponses a été
remanié pour éliminer le biais historique « bonne réponse toujours en premier ».

### 7. Scoring

- 0 à 4 : `fragile` ; 5 à 7 : `intermediate` ; 8 à 10 : `solid`.
- Sous-score par domaine sur 2 : 0 priorité, 1 à consolider, 2 solide sur ce
  mini-test.
- Deux priorités maximum, triées par score croissant.
- Wording prudent : le résultat décrit ce mini-test, jamais un niveau scolaire
  officiel.

### 8–10. Résultat, corrections, ressources

Le résultat affiche score global, profil, cinq barres de domaine et deux
priorités. Les dix corrections sont disponibles en accordéons avec réponse
personnelle, réponse correcte et explication. Chaque priorité ouvre des
ressources SprintMaths ciblées dans un nouvel onglet.

### 11–12. Email et consentement

Le résultat est visible sans email. Après le résultat, l'utilisateur peut
demander le bilan par email. La case marketing est séparée, facultative, non
précochée et versionnée `2026-08-v1`. Une même adresse peut consentir ensuite
sans créer de doublon.

### 13–15. Frictions et promesses corrigées

Le faux spinner et l'email parent obligatoire sont supprimés. Les promesses de
la homepage, de la page Bac 2027, de la FAQ et des emails ont été ramenées à ce
que dix questions peuvent réellement montrer : des priorités indicatives.

### 16. Analytics

Événements conservés : `diagnostic_start`, `diagnostic_complete`. Ajouts :
`diagnostic_result_view`, `diagnostic_email_request`,
`diagnostic_resource_click`.

### 17. Tests

15 tests dédiés couvrent sélection, domaines, scoring, corrections, email
facultatif, consentement séparé, analytics, SEO et redirection de l'ancienne
route. Le runner email couvre aussi l'ancrage sur la date réelle de consentement.

## B — SEO

### 18. GSC actuel

| Fenêtre | Clics | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| 7 j, 21–27 août | 10 | 230 | 4,3 % | 31 |
| 28 j, 31 juil.–27 août | 22 | 416 | 5,3 % | 28 |

Indexation : 38 URL indexées, 42 non indexées ; trois redirections, une
canonique correcte, 38 détectées non indexées, zéro explorée non indexée.

### 19–20. Recherche SERP et opportunité

La SERP montre une intention distincte autour de l'auto-évaluation : L'Étudiant
propose déjà un quiz de 20 questions en spécialité maths, tandis que les
ressources ministérielles décrivent des tests de positionnement avec restitution
par domaines. L'opportunité SprintMaths n'est donc pas « un quiz de plus », mais
un parcours court, sans gate email, suivi de corrections et de deux priorités.

### 21–24. Action choisie, URL, indexabilité, sitemap

Action SEO J61 unique : améliorer l'URL existante `/diagnostic`. Elle est
indexable **OUI**, avec contenu SSR utile avant interaction, title/meta,
canonical, FAQ et `index,follow`. L'URL est ajoutée aux routes SEO publiques et
au sitemap. Aucune deuxième page ni demande manuelle d'indexation.

## C — Social

### 25. Métriques J60

| Plateforme | Relevé J61 des contenus J60 |
| --- | --- |
| TikTok | `−3²` 284 vues/1 like ; `−20 %` 276/1 ; rentrée 269/2 ; 0 commentaire |
| Instagram | 31 vues sur 30 j, 26 comptes touchés, 0 interaction, 0 visite profil, 0 follower |
| YouTube | rentrée 250 vues, `−20 %` 201, `−3²` 133 ; +1 abonné ; 0 commentaire |

Aucun winner : les écarts restent trop faibles et les métriques ne sont pas
comparables plateforme par plateforme.

### 26–27. Nouveau contenu et script

Un master original de 27 secondes : trois automatismes de Première, temps de
pause, correction, score sur 3, puis invitation au diagnostic complet. Master
1080×1920, H.264 `yuv420p`, audio AAC, sans watermark. Script et légendes :
[`social/j61/content-pack.md`](social/j61/content-pack.md).

### 28–30. Publications

| Plateforme | URL |
| --- | --- |
| TikTok | <https://www.tiktok.com/@sprintmaths_fr/video/7679788380598717718> |
| Instagram | <https://www.instagram.com/sprintmaths_fr/reel/Dcqbi5UMvNy/> |
| YouTube | <https://youtube.com/shorts/oDaqhmcmwAk> |

### 31–34. Premiers signaux

Au contrôle immédiat : TikTok 0 vue/0 like/0 commentaire ; Instagram et
YouTube non consolidés. Aucun clic ni lead social attribuable n'est encore
disponible. Les UTM sont distinctes par plateforme sous
`diagnostic_social/d01-mini-diagnostic`.

## D — Distribution

### 35–36. Dix prospects et scores

| Prospect | Audience | Canal | Ressource | Pourquoi pertinent | Score |
| --- | --- | --- | --- | --- | ---: |
| Génération Zébrée | Lycéens/orientation | Email public | Diagnostic | Article plateformes Bac mis à jour en 2026, liens privés inclus | 10 |
| Bpi Autoformation | Lycéens/bibliothèques | Email service | Diagnostic | Sélection Bac 2026 gratuite et payante | 10 |
| Inès Maths | Parents/lycéens | Email public | Diagnostic | Page ressources BAC mise à jour mensuellement, liens externes | 9 |
| Portail-Education | Parents/soutien | Email public | Diagnostic | Audience maths mais offre de cours concurrente | 7 |
| Bibliothèques de Paris | Élèves abonnés | Portail | Diagnostic | Soutien scolaire réel, canal éditorial lourd | 7 |
| AuFutur | Lycéens | Réseaux/contact non confirmé | Diagnostic | Rubrique Révisions active en 2026 | 7 |
| Studyrama | Lycéens/étudiants | Contact groupe | Diagnostic | Audience forte, contact dédié peu précis | 7 |
| L'Étudiant | Lycéens | Contact rédaction non confirmé | Diagnostic | Intention exacte mais quiz propriétaire concurrent | 6 |
| CIDJ | Lycéens/orientation | Contact institutionnel | Diagnostic | Contenu maths récent, propension externe non prouvée | 7 |
| Superprof Blog | Élèves/parents | Aucun contact éditorial confirmé | Diagnostic | Article de ressources, mais concurrent et canal absent | 5 |

### 37–38. Contacts et messages réellement envoyés

Trois emails, tous contrôlés dans Gmail avant envoi, 50 à 100 mots :

1. Génération Zébrée — angle article « Réviser le bac », diagnostic immédiat,
   UTM `generation_zebree`.
2. Bpi — angle sélection 2026 autoformation, absence de compte/email requis,
   UTM `bpi`.
3. Inès Maths — angle page Ressources BAC et complément par sous-domaines,
   UTM `ines_maths`.

Aucun message ne demande de backlink, dofollow ou échange commercial.

### 39–40. Communauté et réponses

Aucune publication communautaire : aucune règle d'autopromotion explicitement
compatible n'a été validée. Réponses au moment du relevé : 0. Aucun follow-up
immédiat et aucun bounce observé après les trois envois.

## E — Leads

### 41–44. Avant, après, opt-ins, sources

12 leads avant / 12 après, 0 nouvel opt-in et 0 nouveau lead réel. Répartition
historique : 6 diagnostic, 6 planning. `acquisition_source` reste vide sur les
12 lignes. Les lignes de test J61 ont été supprimées après validation.

### 45–47. Cron, sends, achats

Cron `0 8 * * *`. `email_sequence_sends` : 0 ligne, 0 sent, 0 failed, résultat
attendu avec 0 consentant. Deux emails transactionnels de QA ont validé Resend,
sans laisser de lead. Achats attribuables J61 : 0 ; revenu : 0 €.

## F — Release

### 48. Fichiers

23 fichiers dans le commit produit : diagnostic client/serveur, API lead,
email, scoring, SEO, analytics, tests et master social J61. Les journaux sont
livrés dans un commit documentaire séparé.

### 49–51. Tests, lint, build

- `npm test` : **64 tests réussis** (5 webhook, 9 planning, 15 diagnostic,
  11 health, 24 email).
- `npm run lint` : réussi.
- `npm run build` : réussi, Next.js 16.2.4, 105 pages statiques.

### 52–54. Commit, push, Vercel

Commit produit `e142210`, poussé sur `main`. Le statut GitHub/Vercel associé
est `success` et le déploiement de production est servi.

### 55. Smoke production

Page publique 200, metadata/canonical/robots corrects, sitemap correct. Parcours
réel desktop/mobile et soumissions avec/sans consentement validés. Le smoke
public passe ; le seul 401 concerne `/health` avec le jeton local disponible,
donc le health authentifié n'est pas déclaré validé.

### 56. Git status

Les changements SprintMaths J61 sont commités. L'entrée étrangère
`.claude/worktrees/suspicious-euclid-bee4f2` est volontairement laissée hors
stage et hors commit.

## G — Acquisition

### 57–60. Visiteurs, leads, opt-ins, revenus

Sessions/visiteurs J61 : `n.d.`. Nouveaux leads : 0. Nouveaux opt-ins : 0.
Revenu attribuable : 0 €. Les compteurs sociaux ne sont pas assimilés à des
visites du site.

### 61. Bottleneck actuel

Le produit de conversion existe désormais ; le bottleneck est le volume de
visites qualifiées puis la mesure `start → result → email request → consent`,
pas une nouvelle refonte.

## H — Décision

### 62. Meilleure action J61

La suppression du gate email avant le résultat. Elle aligne valeur utilisateur,
confiance, conformité du consentement et distribution du diagnostic.

### 63. Ce qu'il ne faut plus toucher

Scoring, wording des profils, séquence email et structure du funnel jusqu'à ce
qu'un volume réel montre un problème. Ne pas créer une deuxième page SEO et ne
pas envoyer une nouvelle vague backlink en parallèle.

### 64. Plan 30 jours

Mesure hebdomadaire, 3–4 contenus sociaux originaux/semaine, deux variantes du
mini-test, une relance unique des trois prospects à J+7, suivi GSC à J+7/J+28,
surveillance cron/délivrabilité et aucune optimisation sans seuil de données.

### 65. Scénario J62

- Reach/clics sociaux : **J62-A Social scale**, répéter le mécanisme gagnant.
- Clics mais peu de complétions : **J62-B Diagnostic UX**, analyser les
  abandons sans changer le scoring.
- Complétions mais peu d'emails/opt-ins : **J62-C Value follow-up**, tester le
  wording post-résultat.
- Aucun signal : **J62-D Distribution**, élargir prudemment les relais adultes.

### 66. GO / NO GO

**GO pour distribuer et mesurer. NO GO pour reconstruire.**
