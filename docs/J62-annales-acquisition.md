# RAPPORT J62 — ANNALES 100 % + ACQUISITION

Date réelle : **31 août 2026**. Audit initial : **09:07:14 CEST**.
Clôture documentaire : **17:47:36 CEST**. Timezone : **Europe/Paris
(UTC+02:00)**.

## A — Annales

1. **Nombre de sujets affichés avant** — 10 sujets officiels 2026.
2. **Nombre de corrigés détaillés avant** — 2 sujets, les deux journées Métropole–La Réunion–Mayotte.
3. **Coverage avant** — 2/10, soit **20 %**.
4. **Liste complète des sujets** — Métropole J1 et J2, Antilles-Guyane J1 et J2, Amérique du Nord J1 et J2, Centres étrangers groupe 1 J1 et J2, Asie J1 et J2. Les codes et PDF exacts figurent dans [`seo/annales-coverage.md`](seo/annales-coverage.md).
5. **Corrigés créés** — huit : Antilles-Guyane J1/J2, Amérique du Nord J1/J2, Centres étrangers groupe 1 J1/J2 et Asie J1/J2.
6. **Nombre d'exercices corrigés** — 32 nouveaux exercices ; **40/40** exercices couverts dans le catalogue final.
7. **Routes créées** — huit routes sous `/annales/bac-maths-2026/[slug]`.
8. **Architecture** — les deux journées Métropole conservent la page historique ; les huit autres couples centre/jour utilisent une route SSG distincte, générée depuis une source de données commune. Chaque carte du hub possède son lien direct.
9. **Math review 1** — relecture contre chaque PDF officiel et recalcul des probabilités, suites, dérivées, intégrales, coordonnées, volumes, équations différentielles, combinatoire et résultats Python.
10. **Math review 2** — seconde passe ciblée sur signes, domaines, hypothèses, arrondis, conditionnelles, primitives, valeurs initiales, notations et conclusions.
11. **Corrections après review** — rédaction renforcée sur les intersections/conditionnelles, sens des inégalités, seuils entiers, domaines, signes et hypothèses de projection ; aucun résultat final incohérent n'a subsisté.
12. **Coverage final** — **10/10 sujets, 40/40 exercices, 100 %**.
13. **Link check** — 12/12 routes critiques répondent en HTTP 200 ; aucun bouton vide, `href="#"`, 404 ou faux statut disponible.
14. **Mobile** — hub et corrections vérifiés en viewport mobile ; formules, tableaux et accordéons restent lisibles, sans overflow horizontal.
15. **Production N/N** — le hub public affiche 10 sujets et 10 boutons « Corrigé détaillé » fonctionnels.

## B — SEO

16. **Recherche SERP** — les formulations observées privilégient « annales », « sujets corrigés », « Bac 2026 », le centre/jour et « corrigé détaillé ». Le chantier reste limité à la famille annales.
17. **Titles/routes** — huit titles, H1, descriptions et canonicals distincts ; toutes les pages sont `index, follow`.
18. **Maillage** — hub → correction, correction → hub/chapitres, et liens vers les notions principales ; aucun bloc artificiel de 40 liens.
19. **Annales par chapitre** — les 24 cartes Métropole existantes restent intactes ; huit accès supplémentaires mènent vers les corrections complètes des autres centres.
20. **Sitemap** — les huit nouvelles URL sont présentes dans le sitemap public, qui répond en HTTP 200 ; aucune demande manuelle massive d'indexation.
21. **GSC 7 jours** — 7 clics, 216 impressions, CTR 3,2 %, position moyenne 31.
22. **GSC 28 jours** — 22 clics, 423 impressions, CTR 5,2 %, position moyenne 28,9.
23. **Nouvelles impressions éventuelles** — aucun recul post-déploiement possible le jour même. Avant J62, le hub totalisait 1 impression sur 7 jours et 3 sur 28 jours, sans clic.

## C — Social

24. **Métriques précédentes** — TikTok : 261 à 292 vues par vidéo J60/J61, 1 follower, 8 likes de profil, rétention moyenne autour de 1,8 s ; Instagram : 50 vues sur J61 et 186 vues cumulées sur les trois Reels J60, 0 follower ; YouTube : 547 vues sur 28 jours, 2 abonnés, J61 à 41 vues et 44,1 % de visionnage moyen. Les commentaires et partages observés sont à zéro ; les sauvegardes/partages non exposés restent `n.d.`.
25. **Nouvelle idée Bac** — exercice réel reformulé du Bac Maths 2026 Asie Jour 2 : seuil de réussite à au moins deux lancers-francs sur trois.
26. **Script** — `P(Y≥2)=C(3,2)p²(1−p)+p³=3p²−2p³`, puis résolution de `3p²−2p³≥0,90` : `p≈0,8042`; 80 % ne suffit pas, 81 % suffit. CTA vers la correction complète gratuite.
27. **TikTok** — master et texte UTM prêts ; publication non effectuée, car Chrome refuse l'accès au fichier local avant upload.
28. **Instagram** — légende et UTM prêts ; publication non effectuée pour le même blocage d'upload.
29. **YouTube** — titre, description et UTM prêts ; publication non effectuée pour le même blocage d'upload.
30. **Premières métriques** — non disponibles : aucun post J62 n'est encore public, donc aucune valeur n'est assimilée à zéro.

## D — Distribution

31. **Prospects trouvés** — APMEP, Mathoutils, Onisep Ressources éducatives, Pierre Carrée et AlloAnnales ; aucun contact J61 n'a été relancé.
32. **Scores** — APMEP 10/10 ; Mathoutils 9/10 ; Onisep 8/10 ; Pierre Carrée 7/10 ; AlloAnnales 7/10.
33. **Messages envoyés** — 1 : Onisep, le 31/08/2026. Les messages APMEP et Mathoutils sont préremplis et attendent la confirmation au clic final ; les deux scores inférieurs à 8 ne sont pas contactés.
34. **Réponses** — 0 au relevé initial ; aucune réponse nouvelle des trois contacts J61.
35. **Mentions/liens éventuels** — 0 observé au relevé initial.

## E — Funnel

36. **Diagnostic visits** — `n.d.` : aucune source analytique persistée fiable n'est accessible pour ce compteur.
37. **Starts** — `n.d.`.
38. **Completions** — `n.d.`.
39. **Result views** — `n.d.`.
40. **Email requests** — événement `diagnostic_email_request` non disponible ; 0 nouveau lead diagnostic persisté depuis J61.
41. **Nouveaux leads** — 0 ; total agrégé : 12.
42. **Nouveaux opt-ins** — 0 ; total `marketing_consent=true` : 0.
43. **Source acquisition** — historique : 6 diagnostic et 6 planning ; aucune nouvelle source et `acquisition_source` non renseignée sur les 12 lignes.
44. **Sends email** — `email_sequence_sends` : 0 sent, 0 failed, 0 skipped ; 0 désinscription.
45. **Achats** — 0 achat J62 et 0 € de revenu attribuable.

## F — Release

46. **Tests** — `npm test` réussi, y compris le garde-fou 10/10 sujets, 40/40 exercices et la revue numérique indépendante des 32 nouveaux exercices.
47. **Lint** — `npm run lint` réussi.
48. **Build** — `npm run build` réussi avec Next.js 16.2.4, 113 pages générées et les huit nouveaux chemins SSG.
49. **Diff check** — `git diff --check` réussi avant commit.
50. **Commit** — `1ede0a6` : `J62: complete detailed Bac maths corrections`.
51. **Push** — `main` poussé sur `origin` avec succès.
52. **Vercel** — déploiement production `dpl_2W5sRpAfrBDenhRem7QedSLfmbL2` en état `READY` pour `1ede0a6`.
53. **Smoke prod** — 12/12 routes en HTTP 200 ; sitemap avec huit nouvelles corrections ; revue live 2024, 2025, Métropole 2026, Antilles J2 et Asie J2 conforme aux résultats attendus.
54. **Git status** — après documentation, seul le pointeur préexistant `.claude/worktrees/suspicious-euclid-bee4f2` reste modifié et non stagé ; il n'a jamais été touché ni inclus.

## G — Décision

55. **Meilleur actif d'acquisition actuel** — la banque de 10 sujets officiels 2026 dont chacun possède un corrigé détaillé des quatre exercices.
56. **Bottleneck** — distribution et mesure : le volume de leads reste nul et l'upload social est bloqué par l'autorisation Chrome, pas par le contenu.
57. **Ce qu'il ne faut plus toucher** — Diagnostic 2.0, consentement, séquence email et pages hors annales sans donnée démontrant un problème.
58. **Prochaine action SEO** — laisser le sitemap et le maillage agir, puis mesurer les huit routes à J+7/J+28 avant toute nouvelle famille de pages.
59. **Prochaine action Social** — publier le master J62 identique sur TikTok, Instagram Reels et YouTube Shorts dès que Chrome peut lire le fichier, puis relever rétention, interactions, abonnés et clics UTM.
60. **Scénario J63** — finir les trois distributions sociales et les deux formulaires confirmés, traiter les réponses éventuelles, puis mesurer sans refondre le funnel ni relancer J61 avant J+7.
61. **GO / NO GO** — **GO annales, SEO et release** : la gate 100 % est franchie. **NO GO clôture globale J62** tant que les trois posts sociaux et les deux formulaires préremplis ne sont pas effectivement publiés/envoyés.
