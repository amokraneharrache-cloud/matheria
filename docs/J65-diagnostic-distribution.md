# RAPPORT J65 — DIAGNOSTIC DISTRIBUTION + TRUTHFUL MEASUREMENT

Relevé social et GSC commencé le **3 septembre 2026 à 12:29 CEST** ;
publication et clôture opérationnelle le **5 septembre 2026 vers 21:03 CEST**.
Timezone : **Europe/Paris, UTC+2**.

## A — Social

1. **Âge réel J64.** TikTok a été publié le 2 septembre à 08:09 CEST,
   Instagram à 08:13 CEST et YouTube à 08:14:58 CEST. Au relevé du 3 septembre
   à 12:29 CEST, les contenus avaient respectivement environ **28 h 20**,
   **28 h 16** et **28 h 14**. Le relevé dépasse donc 24 h ; il n'est pas
   présenté comme une mesure à heure strictement identique.

2. **Vues J64.** TikTok : **242** au relevé comparatif, puis 243 au contrôle
   J65 final ; Instagram : **163 vues / 154 comptes touchés** ; YouTube :
   **43 vues Studio** (42 sur la surface publique au même moment).

3. **Durée moyenne J64.** TikTok : **1,69 s** ; Instagram : donnée indisponible
   dans l'interface Web ; YouTube : **0:08**.

4. **Complétion J64.** TikTok : **0,8 %**. Instagram et YouTube ne donnaient pas
   un taux de complétion comparable. Pour YouTube, la durée moyenne représente
   environ **46,5 %** du master de 17,2 s ; cette valeur est calculée, pas un
   champ natif Studio.

5. **Vu / balayé J64.** YouTube : **13,6 % ont choisi de regarder / 86,4 % ont
   balayé**. TikTok attribue 100 % du trafic au fil « Pour toi », mais n'expose
   pas ici un KPI vu/balayé équivalent. Instagram ne l'expose pas sur Web.

6. **Première seconde.** La courbe TikTok indique que la majorité des départs
   se produit encore à **0:01**. La question visible dès T=0 n'a donc pas supprimé
   la chute de première seconde.

7. **Comparaison J63 / J64.** Le signal disponible est le suivant :

   | KPI | J63 | J64 |
   | --- | ---: | ---: |
   | TikTok — vues | 261 | 242 |
   | TikTok — durée moyenne | 2,46 s | 1,69 s |
   | TikTok — part de la durée | 9,76 % | 9,83 % |
   | TikTok — complétion | 0,3 % | 0,8 % |
   | TikTok — likes / commentaires / partages / sauvegardes | 2 / 0 / 0 / 0 | 2 / 0 / 0 / 1 |
   | YouTube — vues | 601 | 43 |
   | YouTube — vues engagées | 160 | 6 |
   | YouTube — choisi de regarder | 26,2 % | 13,6 % |
   | YouTube — durée moyenne | 0:33 | 0:08 |
   | YouTube — part de la durée, calculée | 131 % | 46,5 % |
   | Instagram — vues / reach | 28 / 27 | 163 / 154 |

   Les boucles expliquent qu'une durée moyenne YouTube puisse dépasser 100 %.
   Les contenus et fenêtres ne constituent pas un test A/B.

8. **Verdict hook.** **SIGNAL NÉGATIF**, pas verdict causal : la question dès
   T=0 n'a pas amélioré la durée moyenne TikTok ni le choix de regarder sur
   YouTube. Instagram a gagné en portée sans engagement. Il faut continuer à
   tester sans scaler sur ce seul échantillon.

9. **Contenu J65.** Un seul master commun, « Tu rentres en Terminale spé maths ?
   Fais ces 3 questions sans calculatrice », utilise les questions validées
   `q-124`, `q-197` et `q-244`, différentes de la sélection J61. Durée **18,6 s**,
   1080×1920, H.264/AAC, 30 i/s, voix SIWIS à T≈0, sous-titres, musique légère,
   SFX sobres et aucun watermark tiers. Le CTA dit que le diagnostic de dix
   questions est gratuit et que l'email n'est pas obligatoire.

10. **TikTok J65.** [Vidéo publiée](https://www.tiktok.com/@sprintmaths_fr/video/7682127172651207958)
    le 5 septembre à **20:56 CEST** ; contrôle final : visibilité **Tout le
    monde**. Le compte n'offre toujours pas de champ de site cliquable : la
    légende utilise `sprintmaths.com/diagnostic` et ne promet pas un lien en bio.

11. **Instagram J65.** [Reel publié](https://www.instagram.com/sprintmaths_fr/reel/Dc6ppJEsyXG/)
    le 5 septembre vers **20:56 CEST**. Le lien profil n'est toujours pas
    configurable sur Web : Instagram renvoie vers l'application mobile. La
    publication n'a pas été bloquée et la légende affiche le domaine.

12. **YouTube J65.** [Short publié](https://youtube.com/shorts/RMq72FjMiMY)
    le 5 septembre à **20:56:41 CEST**, public, sans problème de droits détecté.
    La description contient l'URL complète `utm_source=youtube`,
    `utm_medium=social`, `utm_campaign=diagnostic_social` et
    `utm_content=j65_terminal_test`. Le lien de profil reste fonctionnel.

13. **Métriques initiales J65.** Au relevé quelques minutes après publication :
    TikTok **1 vue, 0 like, 0 commentaire** ; Instagram **0 interaction visible,
    0 commentaire**, vues non encore consolidées ; YouTube **0 vue RSS, 0 like,
    0 commentaire**. Ces compteurs immédiats ne sont pas interprétés.

## B — Analytics

14. **Contrat événementiel avant J65.** `diagnostic_email_request` et
    `lead_magnet_request` partaient avant la réponse serveur. `email_optin`
    partait après toute réponse `success`, même lorsque la case marketing était
    fausse. Une interaction pouvait donc être comptée sans persistance ni
    consentement.

15. **`diagnostic_start`.** Il est déclenché par le clic qui fait passer
    l'introduction à la première question. Aucun succès serveur n'est requis ;
    il signifie seulement que le questionnaire a commencé.

16. **`diagnostic_result_view`.** Il est déclenché après validation de la
    dixième réponse, au même passage que `diagnostic_complete`, juste avant
    l'état résultat. Il signifie que le résultat calculé côté client a été
    atteint ; les deux volumes doivent aujourd'hui coïncider.

17. **`diagnostic_email_request`.** Après correctif, il part uniquement lorsque
    `/api/leads/diagnostic` répond avec `success` et `saved=true`. Il signifie
    qu'une demande transactionnelle de bilan a réellement été persistée, avec
    ou sans consentement marketing.

18. **`email_optin`.** Après correctif, il part seulement après `saved=true` et
    lorsque le consentement marketing soumis vaut explicitement `true`. Il ne
    signifie ni affichage du formulaire ni simple demande de bilan.

19. **Cause de l'écart GA4 / Supabase.** Le déclenchement précoce de la demande
    email et le contrat trop large de `email_optin` expliquent techniquement
    comment GA4 a pu dépasser Supabase. Un honeypot, une erreur réseau ou une
    réponse non persistée pouvaient produire un événement amont ; une réponse
    réussie sans consentement pouvait produire un faux opt-in.

20. **QA identifiée ?** Quatre sessions historiques `direct / qa` sont visibles
    dans GA4 et rendent une origine QA **probable** pour une partie des événements
    J64. Les dimensions disponibles ne permettent pas d'attribuer chaque
    événement à un test ou à une visite réelle ; aucune tentative d'identification
    personnelle n'a été faite.

21. **Tests contrôlés A/B/C.** Tag Assistant sur la production et Supabase ont
    confirmé : A, résultat sans email → `start`, `complete`, `result_view`, sans
    demande ni opt-in ; B, email de test sans consentement → ligne persistée et
    `diagnostic_email_request`, sans `email_optin` ; C, email de test avec case
    cochée → ligne `marketing_consent=true`, preuve datée et `email_optin`. Les
    deux lignes synthétiques ont ensuite été supprimées ; contrôle final : **0
    ligne QA restante**.

    Limite de preuve : GA4 Realtime/DebugView est resté à zéro ou a retourné
    des erreurs d'interface. Les événements et le déclenchement des balises
    sont prouvés dans Tag Assistant, ainsi que la persistance dans Supabase ;
    leur réception dans les rapports GA4 n'est pas confirmée.

22. **Bug trouvé.** Oui : deux demandes étaient mesurées avant la vérité serveur
    et un opt-in marketing ne vérifiait pas la valeur de consentement. Le bug
    affectait le diagnostic et le formulaire planning.

23. **Fix minimal.** Les déclenchements ont été déplacés après `saved=true` dans
    `DiagnosticClient.tsx` et `PlanningLeadForm.tsx`, avec garde explicite sur le
    consentement pour `email_optin`. Deux tests de régression ont été ajoutés.
    Ni les questions, ni le scoring, ni le résultat, ni le CTA global, ni le
    moteur email n'ont été reconstruits.

24. **Propriété GA4.** La propriété existante **a été renommée `SprintMaths`**
    depuis « Playstation company ». Aucun nouvel actif n'a été créé ; la
    propriété `251275924`, le flux SprintMaths et le Measurement ID
    `G-761C7Z47JG` sont inchangés. Le secteur a été réglé sur « Emploi et
    enseignement », timezone France et euro conservés.

25. **Funnel réel final.** `diagnostic view → diagnostic_start →
    diagnostic_complete/result_view → diagnostic_email_request (saved=true) →
    email_optin (saved=true + consentement explicite)`. La demande
    transactionnelle et le consentement marketing sont désormais deux étapes
    distinctes et interprétables. GTM `GTM-PD7DCMRG` route bien ces événements
    vers `G-761C7Z47JG` ; aucun payload observé ne contenait de PII.

## C — Distribution

26. **Réponses Gmail.** Recherche fraîche sur ParcMaths, Portail‑Éducation,
    mathete.net, Génération Zébrée, BPI, Inès Maths, Onisep, anciens J52 et
    Nicolas Fabres : **aucune nouvelle réponse appelant une action**. Aucune
    relance automatique.

27. **Prospects analysés.** Huit relais maximum ont été examinés, sur des
    audiences orientation, ressources Bac, lycéens, familles et professeurs
    indépendants. L'historique Gmail et les journaux J51–J64 ont été contrôlés
    avant contact.

28. **Scores.** Seuls les scores ≥8 étaient contactables :

    | Prospect | Audience / adéquation | Canal | Score | Décision |
    | --- | --- | --- | ---: | --- |
    | Lucas Petit | Lycéens, ressources Bac 2026 récentes | Email public | 9 | Envoyé |
    | Geek Junior | Adolescents, sélection de ressources externes | Email rédaction | 8 | Envoyé |
    | AuFutur | Orientation lycée, bon fit mais canal éditorial faible | Contact | 8 | Non envoyé |
    | Mathrix | Audience maths forte, acteur directement concurrent | Contact | 8 | Non envoyé |
    | Sacha Dhénin | Orientation/lycée, restrictions de contact | Contact | 7 | Non envoyé |
    | Monsieur Hattab | Maths lycée | Contact | 7 | Non envoyé |
    | L'Étudiant | Lycéens, canal presse seulement | Presse | 7 | Non envoyé |
    | CIDJ | Orientation, activité pertinente moins récente | Contact | 6 | Non envoyé |

29. **Contacts envoyés.** Deux nouveaux emails, sans doublon, ont été envoyés :
    `contact@petitlucas.com` et `redaction@geekjunior.fr`. Deux excellents
    prospects suffisaient ; le plafond de quatre n'était pas un quota.

30. **Messages.** Le premier, **71 mots**, relie le mini-test aux ressources Bac
    2026 de Lucas Petit ; le second, **69 mots**, le relie à la curation de
    ressources externes de Geek Junior. Tous deux présentent dix questions,
    résultat et corrections immédiats, priorités, sans compte ni email requis.
    Aucun Pack, aucune demande de backlink ; chaque lien porte une UTM directe
    propre (`petit_lucas` ou `geek_junior`, campagne `diagnostic_direct`).

31. **Communauté.** `r/enseignants` a été examiné comme communauté pertinente.
    Les règles visibles ne rendaient pas l'autopromotion externe assez claire :
    **aucune publication** n'a été faite.

32. **Réponses.** **0 réponse** reçue au contrôle initial sur les deux nouveaux
    envois J65. Rien n'est relancé à chaud.

33. **Mentions / liens.** **0 mention et 0 lien acquis** au relevé de clôture.
    Les envois sont des demandes d'évaluation d'une ressource, pas une campagne
    de liens.

## D — SEO

34. **GSC 7 jours.** Données du 25 au 31 août, mises à jour environ trois heures
    avant lecture : **6 clics, 227 impressions, CTR 2,6 %, position 30,2**.

35. **GSC 28 jours.** Du 4 au 31 août : **21 clics, 523 impressions, CTR 4,0 %,
    position 28,8**.

36. **Pages / requêtes.** Sur 7 jours, `/programme-maths-terminale` obtient
    2 clics / 110 impressions ; la calculatrice 1/16, la préparation de rentrée
    1/9, l'exercice de dérivation 1/5 et la géométrie 1/3. Le Grand Oral fait
    0/34, les formules 0/15 et le planning 0/15. Côté requêtes, « grand oral
    probabilité » atteint 17 impressions, « programme spé maths terminale 2027 »
    6 et « planning » 4. Sur 28 jours, le planning mène avec 6 clics / 84
    impressions, devant le programme 3/219 et la préparation 3/15.

37. **Candidats.** Les thèmes réels observés sont intégrales/primitives,
    formules, probabilités, programme, planning, calculatrice et dérivation. Six
    formulations distinctes autour des intégrales apparaissent chacune au moins
    une fois ; elles alimentent aussi le backlog Social, sans création
    automatique de page.

38. **Action SEO.** Une amélioration substantielle unique de la page intégrales :
    titre et description recentrés sur l'intention Terminale, nouvelle section
    `#formules-integrales` et quatre cartes de formules/relation
    primitive‑intégrale avec liens internes. Aucun second chantier SEO.

39. **URL.** Page existante améliorée :
    [méthodes — intégrales](https://www.sprintmaths.com/methodes-maths-terminale/integrales).
    Aucune nouvelle URL n'a été ajoutée.

40. **Raisons.** La page existante avait **7 impressions, position moyenne
    48,1**, auxquelles s'ajoutaient 3 impressions sur l'exercice intégrales. Les
    requêtes « intégrale maths terminale », « intégrales maths », « formules
    intégrales », « cours intégrale terminale », « integral terminal » et
    « integrale » répètent l'intention. Améliorer l'actif existant respecte le
    gate et évite la cannibalisation.

41. **Checkpoint annales J62.** Le hub obtient **1 impression sur 7 jours et 4
    sur 28 jours** ; aucune des huit nouvelles pages enfant n'apparaît encore
    dans le tableau GSC. Il n'existe donc pas encore de signal d'impressions
    démontré pour les enfants et aucune correction n'a été réécrite.

42. **Tests / déploiement SEO.** La route intégrales, `/diagnostic` et
    `/sitemap.xml` répondent **HTTP 200** en production. La build a généré 113
    pages et le déploiement de code J65 est `READY`.

## E — Leads

43. **Total réel.** Après suppression contrôlée des deux lignes QA : **12 leads
    réels cumulés**. Aucun email ni autre PII n'est inclus dans ce rapport.

44. **Nouveaux.** **0 nouveau lead réel** depuis la clôture J64.

45. **Diagnostic.** **6 leads** historiques portent la source
    `diagnostic_funnel`.

46. **Planning.** **6 leads** historiques portent la source
    `planning_bac_maths_2027:/planning-revision-bac-maths`.

47. **Opt-ins.** **0 `marketing_consent=true`**, 0 désinscription et **0 nouveau
    lead marketing-consentant sur 7 jours**, qui reste la North Star.

48. **Sources.** `acquisition_source` est renseignée sur **0/12** lignes
    historiques. Les tests QA avaient correctement reçu `qa`, mais leurs lignes
    ont été supprimées. Aucune attribution réelle n'est inventée.

49. **Nurture.** **0 lead éligible**, `email_sequence_sends` : 0 pending, 0 sent,
    0 failed et 0 skipped. Aucun premier J+2 réel n'existe à contrôler ; le cron
    n'a pas été accéléré.

50. **Achats.** **0 nouvelle vente réelle, 0 vente à 39 €, 0 €**. Les six codes
    historiques restent 3 manuels et 3 Stripe ; les trois Stripe correspondent
    à des tests de 1 € et ne sont pas comptés comme achats produit.

## F — Release

51. **Fichiers.** Correctif dans `DiagnosticClient.tsx` et
    `PlanningLeadForm.tsx`, deux tests de régression, contrat dans
    `docs/tracking.md`, amélioration de la page intégrales, pack et master Social
    J65, puis mise à jour des journaux Acquisition/Social et du présent rapport.

52. **Tests.** `npm test` : **66 tests JavaScript** verts, couverture annales
    **10/10 sujets et 40/40 exercices**, plus revue mathématique des **32 nouveaux
    exercices**. Media smoke : master lisible, 1080×1920, H.264/AAC, audio
    présent et durée 18,6 s.

53. **Lint.** `npm run lint` : **PASS**.

54. **Build.** `npm run build` : **PASS**, build de production Next.js et 113
    pages générées.

55. **Commit.** Commit de code J65 clair : `cb80c62` — `J65: fix funnel
    measurement and prepare diagnostic distribution`.

56. **Push.** Branche `main` poussée sur `origin/main`. Le commit documentaire
    de clôture est également poussé après vérification finale.

57. **Vercel.** Déploiement de code `dpl_9GCueke8jTrpdbNMuiVCic3ckFbi` :
    **READY**. Les erreurs runtime production sur une heure sont nulles au
    contrôle et les trois routes smoke répondent 200.

    Clôture documentaire `4094c6d`, poussée sur `main` : déploiement
    `dpl_6vid74gk1XQPqFz6dv1EinZcDznK` également **READY**. Au contrôle final
    du 5 septembre à 22:18 CEST, les six pages publiques du script `qa:prod`
    passent et la section intégrales est présente. Le septième contrôle,
    `/api/health`, répond **401** avec le jeton local : le smoke global fait
    donc **6/7** et la santé authentifiée n'est pas confirmée. Aucune erreur
    runtime n'est remontée sur la dernière heure. Aucun secret n'a été modifié.

58. **Git status.** Arbre J65 propre après commit ; seule demeure l'entrée
    préexistante `.claude/worktrees/suspicious-euclid-bee4f2`, volontairement
    exclue de tout stage et de tout commit.

## G — Décision

59. **Bottleneck réel.** Le goulot démontré est le **volume de visites qualifiées
    vers le diagnostic**, pas un taux de conversion calculé sur huit vues. Le
    second goulot observable reste reach social → visite.

60. **Meilleure source d'acquisition.** YouTube est le meilleur signal social
    observé avec **8 sessions `youtube / social`** sur la fenêtre J64, contre 2
    Instagram et 0 TikTok. Aucune source n'a encore produit de lead réellement
    attribué : ce classement concerne le trafic, pas la conversion.

61. **Le diagnostic reçoit-il assez de trafic ?** **Non.** Huit vues sur la
    fenêtre GA4 J64 sont beaucoup trop peu pour conclure que le diagnostic ne
    convertit pas ou pour justifier une refonte.

62. **Social mérite-t-il un scale ?** **Non, pas encore.** J64 n'améliore pas la
    rétention et J65 vient seulement d'être publié. Maintenir une cadence de test
    disciplinée, puis mesurer à J+24 h et J+7, sans multiplier les variantes.

63. **Prochain sujet SEO.** Continuer à observer le cluster
    **intégrales / primitives / formules d'intégrales** après l'amélioration,
    puis utiliser « probabilités » ou « formules » comme prochains candidats si
    GSC confirme une demande répétée. Programme, Grand Oral, annales et diagnostic
    restent au repos.

64. **J66.** Scénario principal : **J66‑B — DIAGNOSTIC TRAFFIC SCALE**, avec
    observation des deux contacts directs et du contenu J65. Basculer vers
    J66‑E si un relais répond ou partage ; ne tester le CTA qu'après un volume
    suffisant de résultats.

65. **GO / NO GO.** **GO J65.** L'écart GA4/Supabase est expliqué, le contrat est
    corrigé et prouvé par A/B/C, la propriété GA4 est propre, une vidéo audio est
    publique sur les trois plateformes, deux contacts qualifiés ont reçu le
    diagnostic, une seule action SEO substantielle est en production, la QA est
    nettoyée et l'email engine reste stable. La décision suivante est d'amener
    plus de monde et de mesurer juste, pas de redessiner le funnel.
