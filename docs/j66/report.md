# RAPPORT J66 — CONNECT THE FUNNEL

Date du relevé : 6 septembre 2026, Europe/Paris (CEST, UTC+2). Les données marquées « n.d. » sont indisponibles ou non fiables, jamais assimilées à zéro.

## A — Measurement

1. Propriété GA4 : le flux utilisé reste `G-761C7Z47JG`, dans le conteneur public `GTM-PD7DCMRG`. Le nom **SprintMaths** est documenté par J65; après rechargement, l’accès à la propriété 251275924 a redirigé vers une page Google CAPTCHA, donc le nom actuel n’a pas été revalidé dans l’interface.
2. QA historique : les anciennes sessions QA ne sont pas réécrites. Les valeurs historiques restent dans les rapports et sont séparées des fenêtres post-déploiement.
3. Stratégie QA future : `utm_source=qa` ou `utm_medium=qa` (égalité exacte, casse ignorée) ouvre une session QA de 30 minutes qui se propage aux pages internes.
4. Signal `traffic_type` : la session QA pose `traffic_type=internal` par commande gtag globale et sur les événements applicatifs; les achats test portent aussi ce signal.
5. Exclusion fail-closed : `ga-disable-G-761C7Z47JG=true` est posé avant le chargement GTM pour empêcher la QA de collecter vers la propriété.
6. Test QA : la page production avec UTM contrôlées s’est ouverte; le nouveau Tag Assistant n’a pas encore affiché de balise évaluée dans sa fenêtre de connexion. La file locale et les tests de tracking confirment l’ordre du signal.
7. Tag Assistant referral : aucune référence indésirable n’a été ajoutée. Une exclusion de referral ne supprime pas les événements QA et aucune attribution referral nouvelle n’a été démontrée.
8. Purchase avant : une vue de `/merci` n’était pas une preuve de paiement; le webhook créait un accès mais aucun événement GA4 purchase vérifié navigateur n’existait.
9. Purchase après : `/merci?session_id=...` appelle le serveur, qui récupère la session Stripe authentifiée avant toute émission.
10. Transaction ID : l’identifiant stable est `cs_live_...` ou `cs_test_...`; il n’utilise jamais l’email et permet la déduplication au refresh.
11. Value/currency : `amount_total` Stripe est converti en unité majeure (EUR /100, devises zéro-décimale traitées) et `currency` est normalisée en majuscules.
12. Test Stripe : 11 tests de contrat couvrent paiement complet, montant, devise, produit, mode live/test, erreurs, requêtes forgées et déduplication. Aucun vrai paiement de 39 € n’a été créé.
13. Réception GA4 / Key Event : non revalidée dans GA4 à cause du CAPTCHA et des erreurs d’interface; aucun doublon custom n’a été créé.

## B — Planning

14. Test sans consentement : production, URL UTM QA, adresse contrôlée `amokrane.harrache+sprintmaths-j66-no-20260906@gmail.com`.
15. Persistance : une ligne a été observée dans `leads` avec source `planning_bac_maths_2027:/planning-revision-bac-maths`.
16. Consentement : `marketing_consent=false`, `marketing_consent_at=null`; aucune donnée personnelle n’est incluse dans le tracking.
17. Email transactionnel : le planning a été reçu dans Gmail, sujet « Ton planning Bac Maths 2027 (+ la première chose à faire) ».
18. Email marketing : aucun envoi de séquence/nurture n’a été créé; aucun `email_optin` ne peut être attribué à ce test.
19. Verdict planning : formulaire, persistance, envoi transactionnel et séparation du consentement sont fonctionnels; la ligne QA a ensuite été supprimée exactement par adresse, source et `acquisition_source=qa`.

## C — Traffic routing

20. Pages ciblées : Programme Terminale, Automatismes Première, hub Annales, template des corrections 2026 et Exercices Suites.
21. CTA exact : « Teste tes bases en 10 questions ».
22. Sous-promesse exacte : « Résultat et corrections immédiats. Aucun email obligatoire. »
23. Action exacte : « Faire le test gratuit » vers `/diagnostic`.
24. Programme : CTA après la réponse utile sur le programme applicable.
25. Automatismes : CTA après l’entraîneur, avec l’angle « Avant la Terminale, vérifie tes bases ».
26. Annales : CTA après la liste des sujets pour préserver l’intention principale.
27. Corrections : CTA dans le template partagé après la correction; un seul ajout couvre les pages concernées.
28. Suites : CTA après le premier exercice complet, jamais avant la première question.
29. Mobile : contrôle à 390×844; le CTA est lisible, accessible et sans popup/sticky agressif.
30. Production : les cinq routes renvoient chacune un heading CTA et un bouton, exactement une occurrence par page.

## D — Analytics

31. Sessions 30 jours : baseline communiquée J65 151, non revalidée dans l’interface GA4 J66.
32. Sessions 7 jours : le rapport déjà ouvert affichait 73 sessions pour 29/08–04/09; relecture non actualisée.
33. Google : la répartition historique 30 jours affichait 24 sessions `google / organic`; valeur non fraîche J66.
34. Bing : 40 sessions dans le relevé historique; cela signale une avance historique, pas une causalité d’autorité.
35. YouTube : 19 sessions historiques `youtube / social`; métrique J66 fraîche n.d.
36. Instagram : 7 sessions historiques, environ 2 secondes d’engagement; le profil public montre aujourd’hui huit publications et une bio orientée planning.
37. TikTok : métrique J66 n.d.; aucun chiffre non observé n’est inventé.
38. France : segmentation pays non revalidée; aucun verdict de solvabilité hors France.
39. Autres marchés : n.d.; le Bac français hors France reste un segment à mesurer.
40. Trafic faible qualité : les durées nulles sont décrites comme trafic faible qualité ou potentiellement automatisé, jamais automatiquement comme robots.
41. Landing pages : rapport ouvert 7 jours : programme 12, automatismes 9, annales 8, correction Asie J1 7, diagnostic 7, planning 5, suites 4.
42. Offer views : environ une seule vue d’offre dans l’ancien relevé; non actualisé.
43. Stripe clicks : zéro clic dans l’ancien relevé; non actualisé.
44. Funnel : instrument cible `SEO → diagnostic_cta_click → diagnostic_start → result → diagnostic_email_request → email_optin`; les compteurs J66 post-routage restent à observer.

## E — SEO

45. GSC 7 jours : 9 clics, 277 impressions, CTR 3,2 %, position moyenne 20,5 (28/08–03/09).
46. GSC 28 jours : 28 clics, 642 impressions, CTR 4,4 %, position moyenne 25,9 (07/08–03/09).
47. Candidats : formules, probabilités, dérivation, calculatrice et programme; les petits signaux GSC ont favorisé l’amélioration d’une page existante.
48. Action SEO : une action éditoriale substantielle, six applications corrigées avec conditions, étapes, pièges et liens de chapitre.
49. URL : `/formules-bac-maths-terminale`; title et H1 conservés.
50. Justification : page déjà visible et cliquée (2 clics/32 impressions sur 28 jours), avec intention formules et application non couverte assez concrètement.
51. Exactitude : l’encart obsolète sur des exclusions de l’écrit a été corrigé vers le Bulletin officiel 2023, applicable depuis la session 2024.
52. Tests/deploy SEO : rendu local et production contrôlés; le build J66 inclut cette amélioration.

## F — Social

53. Métriques J65 : Instagram relevé à 11 h : 6 vues, 5 spectateurs, 100 % non-followers, 0 interaction, 0 activité de profil.
54. Première seconde : l’inspection du Reel J65 montre une image de réponse déjà avancée (`16 × 0,5^4 = 1`) ; la prochaine vidéo commence donc directement par sa question.
55. Nouveau contenu : question banque `q-130`, « 80 € augmentés de 10 % : 88 € ou 90 € ? ».
56. Durée : master 15 secondes, voix dès T=0, réponse à 4,2 s, calcul à 6,2 s, CTA final.
57. TikTok : master et UTM dédiés préparés; non publié au relevé.
58. Instagram : profil vérifié; bio visible « Planning gratuit : sprintmaths.com », donc le pack utilise l’URL publique du diagnostic et ne dit pas « lien en bio ».
59. YouTube : master et description UTM préparés; non publié au relevé.
60. Premiers résultats : J66 n’est pas publié; aucune vue, rétention, clic ou conversion ne peut être affirmée.

## G — Distribution

61. Réponses : aucune réponse reçue au moment du relevé; recherche Gmail après envoi sans nouveau message.
62. Prospects : cinq étudiés au maximum : Caroline Jambon, Café pédagogique, VousNousIls, AuFutur et Thotis.
63. Scores : 9/10, 10/10, 9/10, 7/10 et 6/10 respectivement; seuls les trois premiers dépassent le seuil.
64. Contacts envoyés : trois messages, aux trois adresses publiques, le 6 septembre : Caroline Jambon, redaction@cafepedagogique.net, redaction@vousnousils.fr.
65. Réponses/visites : aucune réponse, visite ou mention attribuée; les UTM isolent les plateformes si un clic survient.
66. Anti-doublon : recherches Gmail et `docs` effectuées; pas de troisième message, pas de nouveau message à Mathoutils ou Monka, pas de relance du retour Frédéric Junier du 27 août.
67. Actif : diagnostic pour Caroline et VousNousIls; annales 2026 entièrement corrigées pour Café pédagogique.
68. Preuves de fit : activité maths récente de Café, ressources lycée de VousNousIls et articles/prérequis maths de Caroline; sources listées dans [distribution.md](distribution.md).

## H — Leads

69. Total avant QA : 12 lignes `leads`, six diagnostic et six planning.
70. Nouveaux : aucun lead réel récent avant le test; le lead QA a été supprimé après preuve.
71. Opt-ins : zéro consentement marketing dans le relevé Supabase avant et après nettoyage.
72. Acquisition source : historique non renseigné; le test QA a correctement porté `qa`, puis a été supprimé.
73. Nurture : zéro envoi de séquence, zéro échec et aucun changement de contrat.
74. Achats réels : aucune preuve d’achat 39 €; les six `access_codes` historiques ne sont pas six ventes.
75. North Star J67 : nouveaux leads consentants sur 7 jours, complétés par clics Diagnostic/session SEO et résultat → demande → consentement.

## I — Release

76. Fichiers : CTA partagé, tracking QA, endpoint purchase, tracker `/merci`, test webhook, amélioration Formules, rapport, distribution et master social.
77. Tests : `npm test` vert; 11 tests tracking purchase et test webhook du statut absent inclus.
78. Lint : `npm run lint` vert.
79. Build : `npm run build` vert sous Next 16.2.4.
80. Diff : `git diff --check` vert.
81. Commit : `976dc93` — « J66: connect SEO traffic to diagnostic and verify purchase tracking ».
82. Push : `origin/main` poussé vers `github.com/amokraneharrache-cloud/matheria`.
83. Vercel : déploiement code `dpl_GCCE7DikSY5pYiF21RRKLgMA4eD7` READY sur `976dc93`, puis déploiement final `dpl_G5HDjuG8jHwkEYxabcSRvvy1ai9y` READY sur `d41a4cf`; les alias sprintmaths.com/www.sprintmaths.com sont actifs.
84. Git status : seule modification étrangère restante est `.claude/worktrees/suspicious-euclid-bee4f2`, jamais stagée ni commitée.
85. Limites release : redirect Stripe Payment Link et réception GA4 purchase restent à confirmer avec l’accès Stripe/Google; les routes et tests négatifs production sont vérifiés.

## J — Décision

86. GO contrôlé pour J66 : le trafic SEO propose maintenant le Diagnostic, les CTA sont mesurés, le planning est testé en production, la QA future est fail-closed, le purchase a un contrat serveur fiable, l’action SEO est publiée, le contenu social et la distribution sont prêts. Le prochain goulot est la mesure post-routage et la publication sociale à maturité; revue des sept jours post-correctif à partir du 10 septembre 12:53:38 CEST.
