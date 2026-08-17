# J48 — Indexation et autorité

Date d'exécution : 16 août 2026  
Site : `https://www.sprintmaths.com`

## Résumé de décision

- Le sitemap de production contient **73 URL**. Les 73 répondent en HTTP 200,
  déclarent `index, follow`, ont une canonical auto-référente et un H1 présent
  dans le HTML initial.
- Le brief fournit **environ 7 pages indexées dans Search Console**, soit 66 non
  indexées par différence et un taux indicatif de 9,6 %. La session Search
  Console disponible pendant J48 n'était pas authentifiée : aucun export de
  statuts, aucune inspection live et aucune demande d'indexation n'ont donc été
  réalisés.
- Une requête Google publique `site:www.sprintmaths.com` a affiché 8 URL le 16
  août. Cette observation prouve que ces URL étaient servies dans les résultats
  à cet instant, mais le nombre d'une requête `site:` n'est ni exhaustif ni un
  substitut au rapport d'indexation GSC. L'écart 7/8 est conservé, pas corrigé
  arbitrairement.
- Trois nouvelles routes présentes localement ne sont pas encore déployées :
  `/annales-bac-maths-par-chapitre`, `/sujet-bac-maths-2024-corrige` et
  `/sujet-bac-maths-2025-corrige` renvoient encore 404 en production. Elles ne
  doivent pas être inspectées ni proposées en outreach avant déploiement.
- Trois liens internes légers ont été ajoutés. Aucun title, H1 ou contenu long
  n'a été réécrit.
- **30 prospects éditoriaux actifs** avec page précise et contact public ont été
  validés : 10 A, 14 B et 6 C. Aucun contact n'a été envoyé.

## A. Indexation

### A1. Méthode et limites

Ordre de preuve utilisé :

1. données GSC fournies dans le brief ;
2. présence effective dans une page de résultats Google publique ;
3. contrôle live HTTP, robots, canonical, H1 et contenu HTML ;
4. analyse du sitemap et du code local.

Les catégories GSC exactes (`Explorée, actuellement non indexée`, `Détectée,
actuellement non indexée`, etc.), les dates de crawl, les canonicals choisies par
Google et les pages référentes ne sont **pas disponibles** sans session GSC.
Aucun motif de non-indexation n'est donc inventé.

### A2. Chiffres de production

| Mesure | Valeur | Niveau de preuve |
| --- | ---: | --- |
| URL dans le sitemap live | 73 | Sitemap récupéré le 16 août 2026, HTTP 200 |
| URL réellement indexables dans ce sitemap | 73 | 73/73 HTTP 200, `index, follow`, canonical cohérente |
| URL indexées | Environ 7 | Donnée GSC fournie dans le brief, non réexportée en J48 |
| URL non indexées | Environ 66 | Soustraction 73 - 7, motifs exacts inconnus |
| URL visibles dans la requête Google publique `site:` | 8 | Observation ponctuelle, non exhaustive |
| URL `noindex` dans le sitemap | 0 | Audit live des 73 URL |
| URL du sitemap en erreur ou redirection | 0 | Audit live des 73 URL |

Répartition des motifs GSC : **non disponible**. La seule répartition honnête est
`66 environ — motif individuel non exporté`. Elle doit être remplacée par les
catégories réelles après connexion à GSC.

### A3. Exclusions volontaires hors dénominateur

| URL ou motif | HTTP | Robots live | Canonical | Décision |
| --- | ---: | --- | --- | --- |
| `/diagnostic` | 200 | `noindex, follow` | — | Tunnel interactif volontairement exclu |
| `/diagnostic/resultat` | 200 | `noindex, nofollow` | — | Résultat privé/personnalisé |
| `/app` et sous-routes `/app/*` | 200 selon route | `noindex, nofollow` | — | Espace applicatif privé |
| `/connexion` | 200 | `noindex, nofollow` | — | Tunnel de connexion |
| `/acces` | 200 | `noindex, nofollow` | — | Tunnel d'accès |
| `/merci` | 200 | `noindex, nofollow` | — | Page de confirmation |
| `/admin/*` | 200 selon route | `noindex, nofollow` + blocage robots | — | Administration |
| `/bac-maths-terminale-2026` | 200 | `noindex, follow` | Auto-référente | Archive commerciale volontaire |
| `/planning-bac-maths-2027.html` | 200 | `noindex, follow` | `/planning-revision-bac-maths` | Version imprimable volontairement exclue |
| `/api/*` | Selon endpoint | Bloqué par `robots.txt` | — | Endpoints, pas des pages SEO |

Ces URL ne figurent pas dans le sitemap et ne réduisent pas le taux
d'indexation des 73 pages indexables.

### A4. URL publiées : statut, sitemap, canonical et priorité

Légende :

- **SERP visible** : URL observée dans la requête Google publique `site:` ; le
  statut GSC reste à exporter.
- **GSC non vérifié** : aucune conclusion sur le motif ou la dernière exploration.
- **Auto** : canonical auto-référente vérifiée dans le HTML live.

| URL | Statut Google | Dernier crawl | Sitemap | Canonical | Priorité | Action |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | SERP visible ; statut GSC non vérifié | Non disponible | Oui | Auto | C | Page de lancement publique ; ne pas redemander sans GSC |
| `/planning-revision-bac-maths` | SERP visible ; statut GSC non vérifié | Non disponible | Oui | Auto | A | Ne pas redemander sans raison ; liens J48 ajoutés |
| `/formules-bac-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | A | Inspecter après connexion GSC |
| `/redaction-bac-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/preparer-entree-terminale-specialite-maths` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/demonstrations-bac-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | A | Inspecter après connexion GSC |
| `/python-bac-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/equations-differentielles-terminale` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/quiz-maths-terminale-specialite` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/denombrement-terminale-specialite-maths` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/primitives-terminale-specialite-maths` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/bac-maths-2027` | GSC non vérifié | Non disponible | Oui | Auto | A | Inspecter après connexion GSC |
| `/coefficient-specialite-maths-bac-2027` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/calculatrice-bac-maths-2027` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/grand-oral-maths-2027` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/sujets-grand-oral-maths` | GSC non vérifié | Non disponible | Oui | Auto | A | Inspecter ; maillage live plus faible |
| `/questions-jury-grand-oral-maths` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/sujets-type-bac-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-type-bac-maths-terminale` | SERP visible ; statut GSC non vérifié | Non disponible | Oui | Auto | A | Ne pas redemander sans confirmation GSC |
| `/annales-bac-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/sujet-bac-maths-2026-corrige` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/bac-terminale-maths` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/bac-premiere-maths` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/epreuve-anticipee-maths-premiere` | GSC non vérifié | Non disponible | Oui | Auto | B | Hub de lancement du sujet 2026 |
| `/sujets-zero-maths-premiere` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/automatismes-maths-premiere` | GSC non vérifié | Non disponible | Oui | Auto | A | Inspecter après connexion GSC |
| `/formules-maths-premiere-specialite` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/quiz-maths-premiere-specialite` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-epreuve-anticipee-maths-premiere` | GSC non vérifié | Non disponible | Oui | Auto | B | Inspecter après A |
| `/sujet-epreuve-anticipee-maths-2026-corrige` | GSC non vérifié | Non disponible | Oui | Auto | A | Inspecter après déploiement du lien entrant J48 |
| `/brevet-maths` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/programme-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | A | Inspecter après connexion GSC |
| `/programme-maths-terminale/suites` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/programme-maths-terminale/limites` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/programme-maths-terminale/derivation-convexite` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/programme-maths-terminale/fonction-logarithme` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/programme-maths-terminale/integrales` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/programme-maths-terminale/probabilites` | SERP visible ; statut GSC non vérifié | Non disponible | Oui | Auto | A | Ne pas redemander sans confirmation GSC |
| `/programme-maths-terminale/geometrie-espace` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/programme-maths-premiere` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/programme-maths-brevet` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/methodes-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/methodes-maths-terminale/etudier-une-suite` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/methodes-maths-terminale/calculer-une-limite` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/methodes-maths-terminale/tableau-variation` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/methodes-maths-terminale/logarithme` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/methodes-maths-terminale/probabilites-conditionnelles` | SERP visible ; statut GSC non vérifié | Non disponible | Oui | Auto | C | Page de lancement publique ; ne pas redemander sans GSC |
| `/methodes-maths-terminale/integrales` | SERP visible ; statut GSC non vérifié | Non disponible | Oui | Auto | C | Page de lancement publique ; ne pas redemander sans GSC |
| `/methodes-maths-terminale/geometrie-espace` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-maths-terminale/suites` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-maths-terminale/limites` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-maths-terminale/derivation` | SERP visible ; statut GSC non vérifié | Non disponible | Oui | Auto | A | Ne pas redemander sans confirmation GSC |
| `/exercices-maths-terminale/logarithme` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-maths-terminale/integrales` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-maths-terminale/probabilites` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/exercices-maths-terminale/geometrie-espace` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/mentions-legales` | SERP visible ; statut GSC non vérifié | Non disponible | Oui | Auto | C | Aucune action SEO prioritaire |
| `/cgv` | GSC non vérifié | Non disponible | Oui | Auto | C | Aucune action SEO prioritaire |
| `/politique-confidentialite` | GSC non vérifié | Non disponible | Oui | Auto | C | Aucune action SEO prioritaire |
| `/preferences-confidentialite` | GSC non vérifié | Non disponible | Oui | Auto | C | Aucune action SEO prioritaire |
| `/remboursement` | GSC non vérifié | Non disponible | Oui | Auto | C | Aucune action SEO prioritaire |
| `/articles/comment-reviser-bac-maths-30-jours` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/methode-derivee-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/etudier-variations-fonction-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/exponentielle-terminale-methodes` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/logarithme-terminale-methodes` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/probabilites-loi-binomiale-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/integrales-terminale-methode` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/suites-recurrence-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/limites-formes-indeterminees-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |
| `/articles/erreurs-frequentes-bac-maths-terminale` | GSC non vérifié | Non disponible | Oui | Auto | C | Traiter après A/B |

### A5. Routes locales en attente de déploiement

| URL | Production au 16 août | Sitemap live | Sitemap local | Priorité | Action |
| --- | --- | --- | --- | --- | --- |
| `/annales-bac-maths-par-chapitre` | 404 | Non | Oui | A | Déployer, vérifier HTTP/canonical, puis inspecter dans GSC |
| `/sujet-bac-maths-2024-corrige` | 404 | Non | Oui | B | Déployer avant toute demande ou outreach |
| `/sujet-bac-maths-2025-corrige` | 404 | Non | Oui | B | Déployer avant toute demande ou outreach |

Le sitemap local passerait de 73 à 76 URL après déploiement de ces changements
déjà présents dans le worktree.

### A6. Verdict ciblé des priorités A

Les volumes de mots et sources entrantes ci-dessous proviennent du HTML live
avant déploiement J48. La profondeur est calculée depuis la homepage avec les
liens crawlables du site.

| URL | Mots utiles approx. | Sources internes uniques | Profondeur live | Verdict |
| --- | ---: | ---: | ---: | --- |
| `/planning-revision-bac-maths` | 1 775 | 47 | 1 | Suffisamment forte ; aucune réécriture |
| `/bac-maths-2027` | 1 503 | 68 | 1 | Suffisamment forte ; aucune réécriture |
| `/exercices-type-bac-maths-terminale` | 1 398 | 47 | 1 | Suffisamment forte ; visible publiquement dans Google |
| `/exercices-maths-terminale/derivation` | 1 153 | 6 | 2 | Suffisamment autonome ; visible publiquement dans Google |
| `/programme-maths-terminale/probabilites` | 1 159 | 8 | 2 | Suffisamment autonome ; visible publiquement dans Google |
| `/sujets-grand-oral-maths` | 4 494 | 3 | 3 | Contenu très fort ; maillage plus faible mais cohérent avec son hub |
| `/demonstrations-bac-maths-terminale` | 2 300 | 14 | 2 | Suffisamment forte ; lien depuis le planning ajouté |
| `/formules-bac-maths-terminale` | 4 043 | 14 | 3 | Suffisamment forte ; lien depuis le planning ajouté |
| `/programme-maths-terminale` | 1 447 | 33 | 2 | Hub suffisamment fort |
| `/automatismes-maths-premiere` | 2 184 | 8 | 2 | Outil autonome et différenciant |
| `/annales-bac-maths-par-chapitre` | — | — | — | 404 en production : NO GO indexation avant déploiement |
| `/sujet-epreuve-anticipee-maths-2026-corrige` | 2 309 | 0 | Inaccessible par crawl interne | Maillage trop faible ; lien depuis le hub Première ajouté |

Aucun chevauchement nécessitant une canonical différente n'a été constaté. Les
clusters programme/méthode/exercices répondent à des intentions distinctes. Le
problème avéré le plus net était l'absence de lien entrant live vers le premier
sujet 2026 de Première, pas son contenu.

## B. Demandes d'indexation

Une demande GSC est une action externe et doit seulement être faite après une
inspection authentifiée et un test live satisfaisant. Aucune demande n'a été
envoyée en J48.

| URL | Date | Statut avant | Test live GSC | Demande effectuée |
| --- | --- | --- | --- | --- |
| `/planning-revision-bac-maths` | 2026-08-16 | Visible dans Google public ; GSC non vérifié | Non effectué | Non |
| `/bac-maths-2027` | 2026-08-16 | GSC non vérifié | Non effectué | Non |
| `/exercices-type-bac-maths-terminale` | 2026-08-16 | Visible dans Google public ; GSC non vérifié | Non effectué | Non |
| `/exercices-maths-terminale/derivation` | 2026-08-16 | Visible dans Google public ; GSC non vérifié | Non effectué | Non |
| `/programme-maths-terminale/probabilites` | 2026-08-16 | Visible dans Google public ; GSC non vérifié | Non effectué | Non |
| `/sujets-grand-oral-maths` | 2026-08-16 | GSC non vérifié | Non effectué | Non |
| `/demonstrations-bac-maths-terminale` | 2026-08-16 | GSC non vérifié | Non effectué | Non |
| `/formules-bac-maths-terminale` | 2026-08-16 | GSC non vérifié | Non effectué | Non |
| `/programme-maths-terminale` | 2026-08-16 | GSC non vérifié | Non effectué | Non |
| `/automatismes-maths-premiere` | 2026-08-16 | GSC non vérifié | Non effectué | Non |
| `/annales-bac-maths-par-chapitre` | 2026-08-16 | 404 en production | Non applicable | Non |
| `/sujet-epreuve-anticipee-maths-2026-corrige` | 2026-08-16 | GSC non vérifié | Non effectué | Non |

Ordre recommandé après authentification : exporter d'abord le rapport Pages,
retirer de la file toute URL déjà indexée, tester les autres A une seule fois,
puis demander uniquement les URL 200 dont la canonical déclarée et choisie sont
cohérentes. Ne jamais demander les trois routes 404 avant déploiement.

## C. Maillage interne ajouté

| Page source | Page cible | Ancre | Justification |
| --- | --- | --- | --- |
| `/planning-revision-bac-maths` | `/formules-bac-maths-terminale` | `fiche complète des formules du Bac Maths` | Le planning est visible dans Google et une fiche de formules est directement utile pendant les révisions transversales |
| `/planning-revision-bac-maths` | `/demonstrations-bac-maths-terminale` | `démonstrations à connaître en Terminale` | Même contexte de préparation ; lien placé après le planning 30 jours, sans bloc artificiel |
| `/epreuve-anticipee-maths-premiere` | `/sujet-epreuve-anticipee-maths-2026-corrige` | `Premier sujet 2026 corrigé et analysé` | Corrige l'absence de tout lien entrant live vers la ressource depuis son hub naturel |

Une source reçoit au maximum deux liens J48. Aucun footer, title, H1 ou bloc de
30 liens n'a été ajouté.

## D. Prospects de backlinks

Critères appliqués : page active le 16 août 2026, proximité éditoriale réelle,
contact public visible, aucune page de vente de lien, aucun annuaire et aucune
soumission automatique. Pour les ressources d'annales, contacter seulement
après mise en production de `/annales-bac-maths-par-chapitre`.

| # | Domaine | Page précise | Type de site | Pourquoi pertinent | Ressource SprintMaths à proposer | Contact public | Priorité |
| ---: | --- | --- | --- | --- | --- | --- | :---: |
| 1 | mathoutils.fr | [Approfondissement et Grand Oral](https://www.mathoutils.fr/grand-oral-mathematiques/) | Blog de professeur | Page composée de pistes et de liens Grand Oral | `/sujets-grand-oral-maths` + `/questions-jury-grand-oral-maths` | [Formulaire](https://www.mathoutils.fr/contact/) | A |
| 2 | parc-nsi.github.io | [Grand oral — ParcMaths](https://parc-nsi.github.io/parcmaths/grand_oral/grand_oral/) | Site enseignant | Page active qui agrège des ressources méthodologiques et disciplinaires | `/sujets-grand-oral-maths` | `admin@frederic-junier.org` | A |
| 3 | sites.google.com/site/mathsnf | [Le Grand Oral](https://sites.google.com/site/mathsnf/tle-sp%C3%A9-maths/le-grand-oral) | Site de professeur | Rubrique « quelques liens utiles » explicitement ouverte aux ressources | `/sujets-grand-oral-maths` + banque jury | `mathsnf@gmail.com` | A |
| 4 | math93.com | [Épreuve anticipée 2026 : sujets et corrigés](https://www.math93.com/index.php?Itemid=1608&catid=164%3Aannales-du-bac-premiere-maths-epreuve-anticipee-de-mathematiquesde-premiere&id=1192%3Abac-2026-epreuve-anticipee-de-mathematiques-en-premiere-sujets-et-corriges-math93&option=com_content&view=article) | Site enseignant d'annales | Même épreuve, avec un angle complémentaire interactif | `/automatismes-maths-premiere` | [Contact](https://www.math93.com/index.php/component/contact/contact/202?catid=109) | A |
| 5 | objectif-maths-tours.fr | [Annales épreuve anticipée Première](https://objectif-maths-tours.fr/annales/1ere/) | Site de professeur | Page centrée sur les sujets zéro et l'épreuve 2026 | `/automatismes-maths-premiere` + sujet 2026 corrigé | [Contact](https://objectif-maths-tours.fr/#contact) | A |
| 6 | mathsapiens.fr | [Première — épreuve anticipée](https://mathsapiens.fr/bac-anticipe.html) | Site enseignant | Analyse et annales de la nouvelle épreuve | `/automatismes-maths-premiere` | [Contact](https://mathsapiens.fr/contact.html) | A |
| 7 | petitlucas.com | [Ressources gratuites pour le bac](https://petitlucas.com/ressources/) | Site personnel éducatif | Liste éditoriale de ressources gratuites Bac, maths et Python | `/planning-revision-bac-maths` ou `/python-bac-maths-terminale` | [Contact](https://petitlucas.com/contact.html) | A |
| 8 | pro.bpi.fr | [Ressources d'autoformation gratuites pour le bac](https://pro.bpi.fr/ressources-numeriques-baccalaureat/) | Bibliothèque publique | Page de sélection éditoriale de ressources gratuites pour lycéens | `/planning-revision-bac-maths` | [Contact BPI](https://www.bpi.fr/contactez-nous/) | A |
| 9 | logamaths.fr | [Terminale spécialité mathématiques](https://www.logamaths.fr/terminale-specialite-mathematiques/) | Site de professeur | Hub Terminale qui cite déjà des ressources d'annales externes | `/annales-bac-maths-par-chapitre` après déploiement | [Formulaire](https://www.logamaths.fr/contact/) | A |
| 10 | apmep.fr | [Annales Terminale générale](https://www.apmep.fr/Annales-Terminale-Generale) | Association d'enseignants | Correspondance maximale avec l'usage « trouver un exercice par notion » | `/annales-bac-maths-par-chapitre` après déploiement | [Nous contacter](https://www.apmep.fr/Nous-contacter) | A |
| 11 | pedagogie.ac-toulouse.fr | [Grand Oral — Mathématiques](https://pedagogie.ac-toulouse.fr/mathematiques/grand-oral) | Portail académique | Page active de ressources Grand Oral pour enseignants | Banque de sujets + questions jury | [Contacts maths](https://pedagogie.ac-toulouse.fr/mathematiques/plan-mathematiques/contacts) | B |
| 12 | maths.ac-amiens.fr | [Grand Oral](https://maths.ac-amiens.fr/144-grand-oral.html) | Portail académique | Rubrique « ressources pour travailler l'oral en mathématiques » | Banque de sujets + questions jury | [Contact](https://maths.ac-amiens.fr/016-contact.html) | B |
| 13 | pedagogie.ac-reunion.fr | [Lycée — ressources Grand Oral](https://pedagogie.ac-reunion.fr/portail-mathematique/plan-mathematiques/formations/lycee.html) | Portail académique | Agrège des ressources nationales et académiques pour le lycée | `/sujets-grand-oral-maths` | `Patrick.Courtin@ac-reunion.fr` | B |
| 14 | maths.dis.ac-guyane.fr | [Grand Oral Bac](https://maths.dis.ac-guyane.fr/Grand-Oral-Bac-2021.html) | Portail académique | Dossier de liens pour la préparation du Grand Oral maths | Banque de sujets + questions jury | [Contact](https://maths.dis.ac-guyane.fr/spip.php?page=contact) | B |
| 15 | math93.com | [Annales du Bac Maths](https://www.math93.com/index.php/annales-du-bac) | Site enseignant d'annales | Hub actif d'annales, classement par chapitre complémentaire | `/annales-bac-maths-par-chapitre` après déploiement | [Contact](https://www.math93.com/index.php/component/contact/contact/202?catid=109) | B |
| 16 | mathlvl.fr | [Annales Bac spécialité maths](https://mathlvl.fr/annales/bac-spe-maths) | Site de ressources | Annales par année ; SprintMaths apporte un accès par notion | `/annales-bac-maths-par-chapitre` après déploiement | [Contact](https://mathlvl.fr/contact) | B |
| 17 | mathlvl.fr | [Maths Première générale](https://mathlvl.fr/premiere-generale) | Site de ressources | Hub Première avec section automatismes | `/automatismes-maths-premiere` | [Contact](https://mathlvl.fr/contact) | B |
| 18 | galilee.ac | [Annales Bac Terminale — mathématiques](https://galilee.ac/annales-bac-terminale/mathematiques) | Plateforme éducative | Page d'annales corrigées gratuites | Annales par chapitre après déploiement | [Support public](https://galilee.ac/user/contactsitesupport.php) | B |
| 19 | pierre-carree.fr | [Ressources maths du collège à la Terminale](https://www.pierre-carree.fr/) | Site de professeur | Ressources et annales par niveau ; audience exactement lycéenne | `/planning-revision-bac-maths` | [Contact](https://www.pierre-carree.fr/contact.php) | B |
| 20 | missionmaths360.com | [Ressources lycée](https://missionmaths360.com/) | Site d'un professeur agrégé | Cours, exercices et annales gratuits Première/Terminale | `/planning-revision-bac-maths` ou annales par chapitre | `missionmaths360@gmail.com` | B |
| 21 | sujetdebac.fr | [Annales spécialité mathématiques](https://www.sujetdebac.fr/annales/specialites/spe-mathematiques/) | Site d'annales | Page active de plus de 100 sujets ; classement notionnel complémentaire | Annales par chapitre après déploiement | [Contact](https://www.sujetdebac.fr/contact) | B |
| 22 | maths-et-tiques.fr | [Cours et exercices Terminale](https://www.maths-et-tiques.fr/index.php/cours-maths/niveau-terminale) | Site de professeur | Hub très actif avec formulaire, démonstrations et banque de sujets | `/annales-bac-maths-par-chapitre` après déploiement | `yvan.monka@ac-strasbourg.fr` | B |
| 23 | moussatat.github.io | [Maths au CSJA](https://moussatat.github.io/) | Site d'équipe/enseignant | Ressources élèves et rubrique « liens utiles » actualisée en août 2026 | `/planning-revision-bac-maths` | `nizar.moussatat@ac-grenoble.fr` | B |
| 24 | pedagogie.ac-montpellier.fr | [Mathématiques au lycée](https://pedagogie.ac-montpellier.fr/mathematiques-au-lycee) | Portail académique | Page de liens et ressources pour le cycle terminal | Ressource Grand Oral ou automatismes Première | [Contacts](https://pedagogie.ac-montpellier.fr/contacts) | B |
| 25 | planning-revisions.fr | [Planning de révision maths Bac](https://planning-revisions.fr/planning-revision-maths-bac/) | Blog spécialisé | Intention identique, mais intérêt éditorial externe moins évident | Fiche de formules imprimable | [Contact](https://planning-revisions.fr/contact/) | C |
| 26 | excellence-maths.fr | [Sujets et annales Bac Maths Terminale](https://www.excellence-maths.fr/ressource/sujets-corriges-bac-maths-terminale/) | Soutien scolaire commercial | Thème pertinent mais concurrence directe et probabilité de citation faible | Annales par chapitre après déploiement | [Contact](https://www.excellence-maths.fr/contact/) | C |
| 27 | mathovore.fr | [Corrigés des sujets du bac](https://mathovore.fr/corriges-des-sujets-du-baccalaureat-de-maths-s-et-es) | Site de ressources | Page d'annales active, mais offre très proche | Annales par chapitre après déploiement | [Contact](https://mathovore.fr/contact) | C |
| 28 | jaicompris.com | [Révision Bac — géométrie dans l'espace](https://jaicompris.com/lycee/math/espace/revision-bac-espace.php) | Site/chaîne éducative | Exercices par notion, mais citation d'un concurrent peu probable | Annales par chapitre, filtre géométrie | `jaicompris.com@gmail.com` | C |
| 29 | edubase.eduscol.education.fr | [Automatismes DNB et épreuve anticipée](https://edubase.eduscol.education.fr/fiche/24254) | Base institutionnelle | Correspondance forte, mais dépôt institutionnel non ouvert à un outreach commercial ordinaire | `/automatismes-maths-premiere` uniquement si procédure éditoriale adaptée | [Contact Éduscol](https://eduscol.education.fr/contactez-nous) | C |
| 30 | pedagogie.ac-toulouse.fr | [Automatismes — maths physique-chimie](https://pedagogie.ac-toulouse.fr/mathematiques-physique-chimie/enseigner/mathematiques/automatismes) | Portail académique LP | Page active de ressources, mais audience surtout voie professionnelle | `/automatismes-maths-premiere` si l'équipe juge le niveau pertinent | [Web-auteurs](https://pedagogie.ac-toulouse.fr/mathematiques-physique-chimie/web-auteurs) | C |

Pages écartées : l'ancienne URL Maths&clic et la page académique de Nantes
renvoyaient 404 ; Mathlaf, Fiches-Maths et Bacomathiques n'affichaient pas de
contact public vérifiable au moment de l'audit.

## E. Outreach

### E1. Dix contacts à traiter en premier

| Ordre | Prospect | Ressource proposée | Condition |
| ---: | --- | --- | --- |
| 1 | Mathoutils | 50 sujets Grand Oral + questions du jury | Ressource live |
| 2 | ParcMaths | 50 sujets Grand Oral filtrables | Ressource live |
| 3 | Mathsnf | 50 sujets Grand Oral + questions du jury | Ressource live |
| 4 | Math93 — Première | 50 automatismes interactifs | Ressource live |
| 5 | Objectif Maths Tours | Automatismes + analyse du sujet 2026 | Ressources live |
| 6 | Mathsapiens | 50 automatismes interactifs | Ressource live |
| 7 | Lucas Petit | Planning 30 jours ou Python pour le Bac | Ressources live |
| 8 | BPI | Planning de révision gratuit | Ressource live, angle non commercial |
| 9 | Logamaths | Annales par chapitre | Attendre le déploiement de l'URL |
| 10 | APMEP | Annales par chapitre | Attendre le déploiement ; validation éditoriale exigeante |

### E2. Modèle 1 — nouvelle épreuve anticipée

Objet : ressource gratuite pour l'épreuve anticipée de maths

> Bonjour [Prénom], j'ai vu votre page [titre précis] consacrée à la nouvelle
> épreuve de Première. SprintMaths propose gratuitement 50 automatismes corrigés,
> une simulation sans calculatrice et une analyse des sujets officiels. Si vous
> pensez que l'outil peut être utile à vos élèves ou lecteurs, voici la ressource :
> [URL]. Sinon, aucun souci. Bien cordialement, [Signature]

### E3. Modèle 2 — annales par chapitre

Objet : des exercices de vrais sujets classés par notion

> Bonjour [Prénom], votre page [titre précis] rassemble des annales de Terminale.
> Nous avons classé les exercices des sujets 2024, 2025 et 2026 par chapitre pour
> trouver directement une dérivation, une probabilité ou une géométrie dans
> l'espace. Si ce classement complète utilement votre sélection, il est ici :
> [URL]. Bien cordialement, [Signature]

Ne pas envoyer ce modèle avant que l'URL des annales par chapitre réponde en 200.

### E4. Modèle 3 — Grand Oral

Objet : banque de problématiques de maths pour le Grand Oral

> Bonjour [Prénom], j'ai consulté votre page [titre précis] sur le Grand Oral.
> SprintMaths met à disposition 50 problématiques de maths filtrables, ainsi
> qu'une banque de questions possibles du jury. Si vous les jugez utiles à vos
> élèves, les deux ressources sont ici : [URL]. Bien cordialement, [Signature]

### E5. Mentions sans outreach

- **Wikipédia : aucune action.** Les outils SprintMaths sont pédagogiques, pas
  des sources encyclopédiques secondaires ; ajouter un lien serait injustifié.
- **Communautés d'enseignants :** répondre seulement à une demande réelle et en
  apportant une explication complète. Ne jamais ouvrir un fil uniquement pour
  déposer le lien.
- **Listes collaboratives :** préférer les formulaires ou contacts éditoriaux
  identifiés ci-dessus. Ne pas contourner une procédure institutionnelle.
- **Forums/Reddit :** aucun dépôt J48. Une citation future doit répondre à une
  question précise, déclarer clairement le lien avec SprintMaths et rester
  secondaire par rapport à la réponse utile.

## F. Validation et décision

### F1. Fichiers J48

- `src/app/planning-revision-bac-maths/page.tsx`
- `src/app/epreuve-anticipee-maths-premiere/page.tsx`
- `docs/seo-j48-indexation-authority.md`

Les autres fichiers déjà modifiés ou non suivis dans le worktree appartenaient
à des travaux antérieurs et n'ont pas été réécrits par J48.

### F2. GO / NO GO

- **GO** pour déployer les trois liens J48 après réussite du lint et du build.
- **GO conditionnel** pour déployer les trois nouvelles routes d'annales déjà
  présentes localement, après validation du build global.
- **NO GO** pour demander l'indexation tant que la session GSC n'est pas
  authentifiée et que les statuts réels ne sont pas exportés.
- **NO GO** pour l'outreach « annales par chapitre » tant que l'URL renvoie 404.
- **GO** pour préparer, personnaliser puis envoyer manuellement les approches
  Première et Grand Oral vers les prospects A ; aucun envoi n'est inclus dans J48.

### F3. Recommandation J49

1. Déployer le worktree validé et confirmer que le sitemap live contient 76 URL.
2. Vérifier en production que les trois nouvelles routes passent de 404 à 200,
   avec canonical auto-référente et liens entrants visibles dans le HTML.
3. Ouvrir une session GSC authentifiée, exporter le rapport Pages complet et
   remplacer tous les champs `GSC non vérifié` par les statuts exacts.
4. Inspecter uniquement les priorités A non indexées, lancer un test live, puis
   demander l'indexation seulement si le test est satisfaisant.
5. Envoyer les 8 premiers messages d'outreach sur des actifs déjà live ; attendre
   le déploiement avant les deux propositions d'annales par chapitre.

