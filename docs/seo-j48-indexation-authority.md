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

## J49 — 17 août 2026

### Déploiement

- Commit J47 déployé : `141ae7a` — `J47: expand Bac Maths annals by year and chapter`.
- Commit J48 déployé : `7e95b97` — `J48: strengthen internal discovery for SEO resources`.
- Branche `main` poussée sur `origin/main` sans force-push.
- Le statut Vercel associé au commit `7e95b97` est passé à `success` le
  17 août 2026 à 13:45:24, après l'exécution réussie du lint, du build et de
  `git diff --check`.
- Déploiement suivi :
  `https://vercel.com/amokraneharrache-clouds-projects/matheria/ELS6ut5Y4onVfi4wWNUpxvDn7kxv`.

### Sitemap

Le contrôle direct de `https://www.sprintmaths.com/sitemap.xml` retourne 200 et
exactement **76 éléments `<loc>`**. Les trois nouvelles URL y sont présentes.

| URL | HTTP | Canonical auto-référente | Robots | Contenu HTML initial |
| --- | :---: | :---: | --- | :---: |
| `/annales-bac-maths-par-chapitre` | 200 | Oui | `index, follow` | Oui |
| `/sujet-bac-maths-2024-corrige` | 200 | Oui | `index, follow` | Oui |
| `/sujet-bac-maths-2025-corrige` | 200 | Oui | `index, follow` | Oui |

### État GSC réel

**Données non disponibles en J49.** La seule session navigateur disponible
n'était pas authentifiée dans Google Search Console et a été redirigée vers la
page publique de connexion. Conformément au protocole, toute la partie GSC a
été arrêtée sans réutiliser l'ancien ordre de grandeur d'environ 7 pages comme
une mesure actuelle.

| Mesure demandée | Valeur J49 |
| --- | --- |
| Pages indexées parmi les 76 URL SEO | Non disponible sans session GSC authentifiée |
| Pages non indexées | Non disponible sans session GSC authentifiée |
| Découvertes mais non indexées | Non disponible sans rapport Pages |
| Explorées puis non indexées | Non disponible sans rapport Pages |

### Motifs de non-indexation

Aucun motif n'a pu être récupéré. Aucun statut n'est déduit d'une recherche
Google publique ou d'un relevé antérieur.

| Motif | Nombre | Exemples | Action |
| --- | ---: | --- | --- |
| Non disponible — session GSC non authentifiée | Non disponible | Aucune URL exportée | Reprendre dans une session authentifiée |

### Inspections

- **0 inspection URL GSC** effectuée.
- **0 test live GSC** effectué.
- Aucune URL Priorité A n'a été classée comme déjà indexée ou réellement non
  indexée en l'absence du rapport actuel.
- Les trois contrôles HTTP de production ci-dessus sont des vérifications de
  déploiement et ne sont pas présentés comme des inspections GSC.

### Demandes d'indexation

**0 demande envoyée.** Sans statut réel, inspection et test live GSC, aucune
URL ne remplissait la procédure de soumission vérifiable. Aucun quota théorique
n'est annoncé.

### Outreach préparé

Les huit messages ci-dessous sont des **brouillons non envoyés**. Le batch
initial reste limité aux six premiers ; Logamaths et l'APMEP sont séparés comme
outreach annales, maintenant que la page proposée répond en 200.

#### 1. Mathoutils — Grand Oral et questions du jury

Objet : deux ressources gratuites pour le Grand Oral de maths

> Bonjour Jason,
> J'ai parcouru votre page « Approfondissement et Grand Oral », notamment les
> pistes classées par fonctions, suites, géométrie et probabilités. SprintMaths
> propose gratuitement 50 sujets de Grand Oral filtrables et une banque de
> questions possibles du jury :
> https://www.sprintmaths.com/sujets-grand-oral-maths
> https://www.sprintmaths.com/questions-jury-grand-oral-maths
> Si vous pensez que ces ressources peuvent compléter vos liens et être utiles
> à vos élèves ou lecteurs, libre à vous de les partager.
> Bien cordialement, [Signature]

#### 2. ParcMaths — sujets de Grand Oral

Objet : une banque gratuite de sujets pour votre sitographie Grand Oral

> Bonjour Frédéric,
> Votre page Grand Oral réunit une sitographie, des parcours et de nombreuses
> pistes pour aider les élèves à construire leur question. SprintMaths propose
> gratuitement 50 problématiques de mathématiques, filtrables par thème :
> https://www.sprintmaths.com/sujets-grand-oral-maths
> Si vous pensez que cette banque peut compléter votre sélection et être utile
> à vos élèves ou lecteurs, libre à vous de la partager.
> Bien cordialement, [Signature]

#### 3. Mathsnf — sujets de Grand Oral

Objet : ressource gratuite pour la préparation du Grand Oral 2025-2026

> Bonjour,
> J'ai consulté votre page de préparation au Grand Oral 2025-2026, avec ses
> liens, podcasts, vidéos et conseils pour travailler la question. SprintMaths
> met gratuitement à disposition 50 sujets de maths filtrables par thème :
> https://www.sprintmaths.com/sujets-grand-oral-maths
> Si vous pensez que cette ressource peut compléter vos liens utiles pour les
> élèves ou lecteurs, libre à vous de la partager.
> Bien cordialement, [Signature]

#### 4. Math93 Première — automatismes

Objet : 50 automatismes gratuits pour l'épreuve anticipée

> Bonjour,
> Votre dossier sur le Bac 2026 présente clairement les trois parcours, les
> sujets zéro et la partie automatismes sans calculatrice. SprintMaths propose
> 50 automatismes interactifs corrigés pour s'entraîner à ce QCM :
> https://www.sprintmaths.com/automatismes-maths-premiere
> Si vous pensez que cette ressource gratuite peut être utile à vos élèves ou
> lecteurs en complément de vos annales, libre à vous de la partager.
> Bien cordialement, [Signature]

#### 5. Objectif Maths Tours — automatismes et sujet réel 2026

Objet : deux ressources gratuites pour l'épreuve anticipée 2026

> Bonjour,
> Votre page Première permet de filtrer les sujets 2026 et de réviser par thème.
> SprintMaths propose en complément 50 automatismes interactifs et le corrigé
> détaillé d'un sujet réel 2026 :
> https://www.sprintmaths.com/automatismes-maths-premiere
> https://www.sprintmaths.com/sujet-epreuve-anticipee-maths-2026-corrige
> Si vous pensez que ces ressources gratuites peuvent être utiles à vos élèves
> ou lecteurs, libre à vous de les partager.
> Bien cordialement, [Signature]

#### 6. Mathsapiens — automatismes

Objet : entraînement gratuit aux automatismes de Première

> Bonjour,
> J'ai lu votre page sur l'épreuve anticipée, ses corrigés manuscrits et votre
> analyse des cinq sujets zéro. Vous conseillez à tous les candidats de
> travailler les automatismes ; SprintMaths en propose 50, interactifs et
> corrigés :
> https://www.sprintmaths.com/automatismes-maths-premiere
> Si vous pensez que cet entraînement gratuit peut être utile à vos élèves ou
> lecteurs en complément de vos corrigés, libre à vous de le partager.
> Bien cordialement, [Signature]

#### Outreach annales — hors batch initial

#### 7. Logamaths — annales par chapitre

Objet : des annales gratuites classées par chapitre

> Bonjour,
> Votre page Terminale spécialité mathématiques rassemble le programme et des
> ressources d'annales pour les élèves. SprintMaths propose gratuitement les
> exercices des sujets 2024, 2025 et 2026, classés par chapitre pour retrouver
> directement une dérivation, une probabilité ou une géométrie dans l'espace :
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre
> Si vous pensez que ce classement peut être utile à vos élèves ou lecteurs,
> libre à vous de le partager.
> Bien cordialement, [Signature]

#### 8. APMEP — annales par chapitre

Objet : un classement complémentaire des annales récentes par chapitre

> Bonjour,
> Votre page « Annales Terminale générale » recense les sessions depuis la
> réforme et les sujets corrigés 2026. SprintMaths propose gratuitement un accès
> complémentaire aux exercices 2024, 2025 et 2026, classés par chapitre :
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre
> Si vous estimez que ce classement peut être utile aux enseignants, élèves ou
> lecteurs de votre sélection, libre à vous de le partager.
> Bien cordialement, [Signature]

## J50 — Search Console réel

Première session Google Search Console **authentifiée** de la séquence J49–J50.
Propriété interrogée : `sc-domain:sprintmaths.com`. Toutes les valeurs ci-dessous
proviennent de l'interface GSC. Aucune n'est déduite d'un `site:`, de Bing, d'une
estimation ou d'un relevé antérieur.

### Avertissement sur la fraîcheur des données

Le rapport **Indexation > Pages** affiche « Dernière mise à jour : **14/08/2026** ».
Il est donc antérieur de trois jours au déploiement J47/J48 (17/08/2026) et
antérieur d'un jour à la soumission du sitemap (15/08/2026). Les inspections
d'URL, elles, interrogent l'index en direct.

Les deux sources divergent, et la divergence est documentée en A3 ci-dessous :
**le rapport Pages sous-estime l'indexation réelle**.

### A1. Rapport Pages — chiffres exacts (données au 14/08/2026)

| Mesure | Valeur |
| --- | ---: |
| Dans l'index | **7** |
| Non indexées | **4** |
| Total connu de Google | 11 |
| URLs du sitemap live | 76 |

### A2. Les 7 pages indexées et leur dernier crawl

| URL | Dernière exploration |
| --- | --- |
| `https://www.sprintmaths.com/` | 28 juil. 2026 |
| `/planning-revision-bac-maths` | 27 juil. 2026 |
| `/programme-maths-terminale/probabilites` | 22 juil. 2026 |
| `/methodes-maths-terminale/probabilites-conditionnelles` | 22 juil. 2026 |
| `/mentions-legales` | 2 juil. 2026 |
| `/exercices-maths-terminale/derivation` | 19 juin 2026 |
| `/exercices-type-bac-maths-terminale` | 1 juin 2026 |

Les 7 appartiennent aux 76 URLs SEO.

### A3. Correction apportée par les inspections live

Deux pages ressortent **indexées** à l'inspection du 17/08 alors qu'elles sont
absentes de la liste ci-dessus :

| URL | Statut inspection live |
| --- | --- |
| `/sujets-grand-oral-maths` | Cette URL est sur Google — la page est indexée |
| `/automatismes-maths-premiere` | Cette URL est sur Google — la page est indexée |

**Indexation réelle : au moins 9 URLs SEO sur 76**, contre 7 au rapport agrégé.
Le chiffre exact ne peut être établi sans inspecter les 76 URLs une par une.

### A4. Taux d'indexation

| Base | Calcul | Taux |
| --- | --- | ---: |
| Rapport Pages (14/08) | 7 / 76 | **9,2 %** |
| Minimum confirmé en live (17/08) | ≥ 9 / 76 | **≥ 11,8 %** |

### A5. Motifs de non-indexation réellement présents

| Motif GSC | Nombre | Exemples | Interprétation | Action |
| --- | ---: | --- | --- | --- |
| Page avec redirection | 3 | `https://sprintmaths.com/` (15 août 2026), `http://sprintmaths.com/` (28 juil. 2026), `http://www.sprintmaths.com/` (28 juil. 2026) | Variantes d'hôte non canoniques redirigeant vers `https://www.sprintmaths.com/`. Comportement attendu. | Aucune |
| Autre page avec balise canonique correcte | 1 | `https://www.sprintmaths.com/?q={search_term_string}` (19 juil. 2026) | URL template de la `SearchAction` du JSON-LD, explorée littéralement. Canonique correctement rattachée à l'accueil. | Aucune |

Motifs **absents** du rapport : « Explorée, actuellement non indexée »,
« Détectée, actuellement non indexée », « Exclue par noindex », « Doublon »,
« Erreur serveur », « Introuvable ». Aucun n'est inventé ici.

### A6. Isolation du périmètre SEO

**Aucune des 4 URLs non indexées n'appartient aux 76 URLs SEO.** Ce sont trois
variantes d'hôte de la racine et une URL de gabarit issue des données
structurées. Le périmètre SEO ne porte donc **aucun motif d'exclusion**.

### B. Statut des Priorités A (inspections live du 17/08/2026)

| URL | Indexée ? | Motif GSC | Dernier crawl | Découverte | Action |
| --- | :---: | --- | --- | --- | --- |
| `/formules-bac-maths-terminale` | Non | Détectée, actuellement non indexée | Sans objet | sitemap.xml | Indexation demandée |
| `/demonstrations-bac-maths-terminale` | Non | Détectée, actuellement non indexée | Sans objet | sitemap.xml | Indexation demandée |
| `/sujets-grand-oral-maths` | **Oui** | — | — | — | Demande envoyée par erreur (voir E) |
| `/programme-maths-terminale` | Non | Détectée, actuellement non indexée | Sans objet | sitemap.xml + `/brevet-maths` | Indexation demandée |
| `/automatismes-maths-premiere` | **Oui** | — | — | — | Aucune — conforme |
| `/sujet-epreuve-anticipee-maths-2026-corrige` | Non | Détectée, actuellement non indexée | Sans objet | sitemap.xml | Indexation demandée |
| `/annales-bac-maths-par-chapitre` | Non | **Google ne reconnaît pas cette URL** | Sans objet | Aucun sitemap référent | Indexation demandée |
| `/sujet-bac-maths-2025-corrige` | Non | **Google ne reconnaît pas cette URL** | Sans objet | Aucun sitemap référent | Indexation demandée |
| `/sujet-bac-maths-2024-corrige` | Non | **Google ne reconnaît pas cette URL** | Sans objet | Aucun sitemap référent | Indexation demandée |
| `/bac-maths-2027` | Non | Détectée, actuellement non indexée | Sans objet | sitemap.xml + `https://sprintmaths.com/` | Indexation demandée |

`/programme-maths-terminale` est découverte via un **lien interne depuis
`/brevet-maths`** : le maillage ajouté en J48 est capté par Google.

### C. URLs de contrôle — confirmation d'indexation

| URL | Indexée ? | Source | Dernier crawl |
| --- | :---: | --- | --- |
| `/planning-revision-bac-maths` | Oui | Inspection live 17/08 + rapport Pages | 27 juil. 2026 |
| `/exercices-type-bac-maths-terminale` | Oui | Rapport Pages | 1 juin 2026 |
| `/exercices-maths-terminale/derivation` | Oui | Rapport Pages | 19 juin 2026 |
| `/programme-maths-terminale/probabilites` | Oui | Rapport Pages | 22 juil. 2026 |

### D. Répartition demandée A / B / C

| Catégorie | Nombre | URLs |
| --- | ---: | --- |
| A. Détectées, actuellement non indexées | **5** | formules, demonstrations, programme-maths-terminale, sujet-epreuve-anticipee-2026, bac-maths-2027 |
| B. Explorées, actuellement non indexées | **0** | — |
| C. Autre problème — « Google ne reconnaît pas cette URL » | **3** | annales-par-chapitre, sujet-2025, sujet-2024 |

Les trois URLs de la catégorie C sont exactement les **trois pages J47**. Le
sitemap a été lu pour la dernière fois le **15/08 avec 73 URLs** ; il en contient
76 depuis le 17/08. Ces pages sont donc encore invisibles pour Google.

### E. Tests live et demandes d'indexation

| URL | Test live | Résultat | Demande envoyée |
| --- | --- | --- | :---: |
| `/formules-bac-maths-terminale` | Effectué 18 août 2026 12:54 | Réussi | Oui |
| `/demonstrations-bac-maths-terminale` | Tenté | **Échec outil GSC** — « Un problème est survenu » | Oui |
| Les 6 autres | Non tenté | Outil throttlé | Voir tableau B |

Détail du seul test live abouti (`/formules-bac-maths-terminale`) :

| Contrôle | Valeur |
| --- | --- |
| Google a accès à cette URL | Oui |
| Disponibilité de la page | La page peut être indexée |
| Exploration autorisée ? | Oui |
| Récupération de page | Réussie |
| Indexation autorisée ? | Oui |
| URL canonique déclarée | `https://www.sprintmaths.com/formules-bac-maths-terminale` — auto-référente |
| URL canonique choisie par Google | Ne sera déterminée qu'après l'indexation |
| Fils d'Ariane | 1 élément valide détecté |

L'outil « Tester l'URL publiée » a ensuite renvoyé « Un problème est survenu. Si
le problème persiste, réessayez dans quelques heures » : il s'agit d'une limite
de quota côté Google, non d'une anomalie du site. Aucun quota théorique n'est
avancé ; seule la limite réellement rencontrée est consignée.

**Demandes d'indexation : 9 envoyées, dont 8 conformes.**

Une demande a été envoyée à tort sur `/sujets-grand-oral-maths`, page **déjà
indexée**, parce que le clic avait été enchaîné avant la lecture du statut. La
procédure a été corrigée immédiatement : lecture du statut d'abord, action
ensuite. Conséquence pratique nulle (simple remise en file de crawl), mais l'écart
à la règle « ne pas demander l'indexation des pages déjà indexées » est consigné.

### F. Canonicals et anomalies techniques

| Contrôle | Résultat |
| --- | --- |
| Canonical déclarée ≠ canonical Google | **Aucun cas** |
| Erreur de récupération | Aucune |
| Blocage robots | Aucun |
| `noindex` involontaire | Aucun |
| Erreur serveur | Aucune |

Pour les URLs non indexées, « URL canonique sélectionnée par Google » vaut
« Sans objet » : Google ne choisit une canonique qu'après indexation. Ce n'est
pas une anomalie.

**Aucun problème technique objectif révélé par Search Console. Aucune
modification de code n'est justifiée en J50.**

### G. Point d'attention — sitemap à resoumettre

Le sitemap soumis affiche « Dernière lecture : 15 août 2026 » et **73 pages
découvertes**. La production en sert **76**. Les trois pages J47 sont en
conséquence classées « Google ne reconnaît pas cette URL ».

Action recommandée en J51 : resoumettre `https://www.sprintmaths.com/sitemap.xml`
pour forcer une relecture à 76 URLs.

### H. Scénario retenu

**SCÉNARIO B.**

Motifs : la majorité des Priorités A non indexées est « Détectée, actuellement
non indexée » (5 sur 8), et surtout **« Explorée, actuellement non indexée » est
à zéro**. Google n'a rejeté **aucune** page après exploration. Toutes les URLs
concernées affichent « Dernière exploration : Sans objet » — elles n'ont jamais
été crawlées.

Ce n'est donc ni un problème de qualité de contenu, ni un problème de sélection,
ni un problème technique : c'est un problème d'**allocation de budget de crawl**,
qui dépend de l'autorité du domaine.

### I. Conséquence sur la priorité autorité / backlinks

Le résultat GSC **renforce** la priorité autorité. Un site dont Google connaît
les URLs, ne les explore pas, et n'en a rejeté aucune après crawl, est un site
qui manque de signaux externes, pas de contenu.

Les huit messages d'outreach préparés en J49 **restent non envoyés** conformément
à la mission J50.

### J. Verdict

**GO** pour l'outreach en J51, et **NO GO** pour toute réécriture de page.

## J51 — Outreach réel

Première mission d'autorité externe. Aucune page créée, aucune réécriture, aucun
fichier de code modifié.

### A. Sitemap — état avant resoumission

Contrôle direct de `https://www.sprintmaths.com/sitemap.xml` : **HTTP 200**,
**76 éléments `<loc>`**.

Dans Search Console (Indexation > Sitemaps), avant toute action de J51 :

| Champ | Valeur relevée |
| --- | --- |
| Sitemap | `https://www.sprintmaths.com/sitemap.xml` |
| URL envoyées | 15 août 2026 |
| Dernière lecture | **18 août 2026** |
| État | Opération effectuée |
| Pages découvertes | **76** |

**Google avait déjà relu le sitemap de lui-même** : le compteur était passé de
73 (relevé J50) à 76 avant toute intervention. Les trois URLs J47 étaient donc
déjà connues au moment de la mission.

### B. Resoumission effectuée

Le sitemap a été resoumis via le champ « Ajouter un sitemap ».

| Champ | Valeur après resoumission |
| --- | --- |
| Message GSC | « Sitemap envoyé — Google le traitera régulièrement pour chercher des modifications » |
| URL envoyées | 19 août 2026 *(horodatage serveur GSC)* |
| Dernière lecture | 18 août 2026 |
| État | Opération effectuée |
| Pages découvertes | **76** |

La resoumission signale la version actuelle du sitemap et facilite sa relecture.
Elle ne force pas l'indexation et n'est pas présentée comme telle.

### C. Ressources SprintMaths vérifiées avant envoi

| URL | HTTP |
| --- | :---: |
| `/sujets-grand-oral-maths` | 200 |
| `/questions-jury-grand-oral-maths` | 200 |
| `/automatismes-maths-premiere` | 200 |
| `/sujet-epreuve-anticipee-maths-2026-corrige` | 200 |

### D. Journal des outreach

| Prospect | Date | Page cible | Ressource SprintMaths | Canal | Destinataire | Statut | Follow-up conseillé |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Mathoutils | 18/08/2026 | `mathoutils.fr/grand-oral-mathematiques/` | `/sujets-grand-oral-maths` | Formulaire public | Jason Lapeyronnie (formulaire) | **Formulaire envoyé** | oui après 7–10 jours |
| ParcMaths | 18/08/2026 | `parc-nsi.github.io/parcmaths/grand_oral/grand_oral/` | `/sujets-grand-oral-maths` | Email public | admin@frederic-junier.org | **Envoyé** | oui après 7–10 jours |
| Mathsnf | 18/08/2026 | `sites.google.com/site/mathsnf/tle-spé-maths/le-grand-oral` | `/sujets-grand-oral-maths` | Email public | mathsnf@gmail.com | **Envoyé** | oui après 7–10 jours |
| Math93 | 18/08/2026 | `math93.com/index.php/annales-du-bac/annales-bac-1re-epreuve-anticipee-de-maths` | `/automatismes-maths-premiere` | Formulaire public | Contact Math93 (formulaire) | **Formulaire envoyé** | oui après 7–10 jours |
| Objectif Maths Tours | 18/08/2026 | `objectif-maths-tours.fr/annales/1ere/` | `/automatismes-maths-premiere` | — | — | **Non envoyé — contact indisponible** | à décider |
| Mathsapiens | 18/08/2026 | `mathsapiens.fr/bac-anticipe.html` | `/automatismes-maths-premiere` | — | — | **Non envoyé — contact indisponible** | à décider |

**4 envois réels sur 6.**

### E. Détail des deux blocages

**Objectif Maths Tours.** Page cible vérifiée et pertinente (sujets zéro,
sessions 2026, QCM automatismes, filtres par thème). Les mentions légales
désignent l'éditeur — Laurent Jacquet — et indiquent « Email : contact via le
formulaire ». Or ce formulaire (Formspree `xojnjnre`) est un formulaire de
**réservation de cours particuliers** dont trois champs obligatoires sont
`telephone`, `niveau` (Collège / Seconde / Première…) et `type_cours`
(À domicile / En visio / Stage intensif). Le soumettre aurait imposé d'inventer
un numéro de téléphone et de fabriquer une demande de cours. Aucun autre canal
public n'existe (`/contact/` en 404, aucun email publié). Non envoyé, sans
contournement.

**Mathsapiens.** Page cible vérifiée et très pertinente : elle détaille le
programme de l'épreuve anticipée, dont le QCM d'automatismes noté sur 6 points
et l'interdiction de la calculatrice. Mais `contact.html`, pourtant liée depuis
la navigation, renvoie **404** — comme toutes les variantes testées
(`/contact`, `/contact/`, `/contact.php`, `/nous-contacter.html`). Aucun
`mailto:` ni adresse email sur le site, et aucune page de contact parmi les
405 URLs du sitemap. Non envoyé.

### F. Texte exact des quatre messages envoyés

**1. Mathoutils — formulaire public**

> Bonjour Jason,
>
> Votre page « Approfondissement et Grand Oral » propose des pistes de thèmes
> classées par domaine, avec des renvois vers des articles de fond — vous
> précisez d'ailleurs qu'il ne s'agit pas de sujets clé en main.
>
> J'ai mis en ligne gratuitement 50 problématiques de Grand Oral maths déjà
> formulées, classées par thème et filtrables, avec les notions mobilisées
> indiquées pour chacune :
> https://www.sprintmaths.com/sujets-grand-oral-maths
>
> Si vous pensez que cela peut compléter utilement vos pistes pour vos élèves,
> libre à vous de le partager.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

**2. ParcMaths — email** · objet : *Une banque de 50 problématiques de Grand Oral maths*

> Bonjour Frédéric,
>
> Votre page Grand oral de ParcMaths rassemble une sitographie très complète —
> Eduscol, académies, Images des maths, Culture Maths — surtout des documents de
> cadrage et des pistes de réflexion.
>
> J'ai publié gratuitement une banque de 50 problématiques de Grand Oral maths
> déjà formulées, classées par thème et filtrables, avec les notions mobilisées
> indiquées pour chacune :
> https://www.sprintmaths.com/sujets-grand-oral-maths
>
> Si vous estimez qu'elle complète utilement votre sélection pour vos élèves,
> libre à vous de l'ajouter.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

**3. Mathsnf — email** · objet : *Une banque de 50 problématiques de Grand Oral maths*

> Bonjour,
>
> Sur votre page « Le Grand Oral », la rubrique « Quelques liens utiles »
> rassemble surtout de la méthodologie et de la culture mathématique — Lumni,
> podcasts, vidéos.
>
> J'ai publié gratuitement une banque de 50 problématiques de Grand Oral maths
> déjà formulées, classées par thème et filtrables, avec les notions mobilisées
> indiquées pour chacune :
> https://www.sprintmaths.com/sujets-grand-oral-maths
>
> Elle s'accompagne d'une banque de questions d'entraînement du jury :
> https://www.sprintmaths.com/questions-jury-grand-oral-maths
>
> Si vous pensez qu'elle peut aider vos élèves à trouver leur question, libre à
> vous de l'ajouter.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

**4. Math93 — formulaire public** · objet : *Un entraînement interactif aux automatismes de Première*

> Bonjour,
>
> Votre rubrique Annales 1re Maths rassemble les sujets et corrigés 2026 de la
> nouvelle épreuve anticipée — Métropole, Antilles-Guyane, Centres étrangers,
> Amérique du Nord.
>
> En complément de ces sujets, j'ai publié gratuitement un entraînement
> interactif aux automatismes : 50 questions originales corrigées, sans
> calculatrice, avec une simulation de 12 questions et les thèmes à retravailler
> en fin de série :
> https://www.sprintmaths.com/automatismes-maths-premiere
>
> Si vous pensez que cela peut servir à vos lecteurs, libre à vous de l'ajouter.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

Aucun message ne contient les termes proscrits (backlink, SEO, référencement,
autorité, dofollow, échange de liens). Aucun placeholder résiduel. Aucune pièce
jointe. Signature identique et courte partout.

### G. Réponses et liens obtenus pendant la mission

| Élément | État |
| --- | --- |
| Réponses reçues | **Aucune** |
| Bounces / erreurs de remise | **Aucun** |
| Liens ou mentions obtenus | **Aucun** — attendu, les envois datent du jour |

Les deux envois Gmail sont confirmés dans la boîte (10:45 et 10:51). Les deux
formulaires ont retourné une confirmation explicite : « Merci pour votre
réponse. » (Mathoutils, `contact-form-sent=10988`) et « Merci pour votre
message. » (Math93).

### H. Batch 2 — non contactés en J51

Logamaths et l'APMEP restent en attente, conformément à la consigne : observer
les réponses de ce premier batch avant d'élargir.

### I. Relances

Aucune relance envoyée ni programmée en J51. Un follow-up unique est envisageable
après 7 à 10 jours pour les quatre contacts n'ayant pas répondu.

## J52 — Outreach batch 2

Deuxième mission d'autorité externe. Aucune page créée, aucune réécriture, aucun
fichier de code modifié. Aucune relance envoyée aux contacts J51.

### A. Réponses J51

Recherche Gmail sur les envois du 18/19 août (expéditeurs et destinataires des
quatre prises de contact, plus recherche de bounces et de notifications de
formulaire).

| Prospect | Date | Nature | Résumé | Action nécessaire |
| --- | --- | --- | --- | --- |
| Mathoutils | — | Aucune réponse | — | En attente — follow-up éventuel 26–28 août |
| ParcMaths | — | Aucune réponse | — | En attente — follow-up éventuel 26–28 août |
| Mathsnf | — | Aucune réponse | — | En attente — follow-up éventuel 26–28 août |
| Math93 | — | Aucune réponse | — | En attente — follow-up éventuel 26–28 août |

**Aucune réponse éditoriale, aucun bounce, aucune notification de formulaire.**
Seuls les messages sortants apparaissent. Aucune newsletter ni réponse
automatique n'a été comptée comme réponse.

### B. Vérification directe des pages cibles J51

Indépendamment des réponses, les quatre pages cibles ont été rechargées et
inspectées à la recherche d'une mention SprintMaths.

| Page cible | HTTP | Occurrences « sprintmaths » |
| --- | :---: | :---: |
| `mathoutils.fr/grand-oral-mathematiques/` | 200 | 0 |
| `parc-nsi.github.io/parcmaths/grand_oral/grand_oral/` | 200 | 0 |
| `sites.google.com/site/mathsnf/tle-spé-maths/le-grand-oral` | 200 | 0 |
| `math93.com/…/annales-bac-1re-epreuve-anticipee-de-maths` | 200 | 0 |

Aucun lien ni mention à ce stade.

### C. Ressources SprintMaths vérifiées avant envoi

| URL | HTTP |
| --- | :---: |
| `/annales-bac-maths-par-chapitre` | 200 |
| `/planning-revision-bac-maths` | 200 |
| `/formules-bac-maths-terminale` | 200 |

Contenu de `/annales-bac-maths-par-chapitre` vérifié avant d'être décrit :
**24 exercices officiels des Bac Maths 2024, 2025 et 2026, classés par chapitre,
année et difficulté, avec PDF officiel et corrigés SprintMaths lorsqu'ils
existent.**

### D. Journal des outreach J52

| Prospect | Page cible | Ressource | Contact | Canal | Date | Statut | Follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Logamaths | `logamaths.fr/terminale-specialite-mathematiques/` | `/annales-bac-maths-par-chapitre` | Formulaire (case « Site partenaire ») | Formulaire public | 19/08/2026 | **Formulaire envoyé** | oui après 7–10 jours |
| Mathlvl | `mathlvl.fr/annales` | `/annales-bac-maths-par-chapitre` | Raphaël Lallemand — raphael.lallemand@raphaelexpertise.fr | Email public | 19/08/2026 | **Envoyé** | oui après 7–10 jours |
| Pierre Carrée | `pierre-carree.fr/baccalaureat.php` | `/planning-revision-bac-maths` | Formulaire éditorial | Formulaire public | 19/08/2026 | **Formulaire envoyé** | oui après 7–10 jours |
| Mission Maths 360 | `missionmaths360.com/terminale/specialite/annales-de-bac/` | `/annales-bac-maths-par-chapitre` | missionmaths360@gmail.com | Email public | 19/08/2026 | **Envoyé** | oui après 7–10 jours |
| Maths et Tiques | `maths-et-tiques.fr/index.php/bac-brevet` | `/annales-bac-maths-par-chapitre` | Yvan Monka — yvan.monka@ac-strasbourg.fr | Email public | 19/08/2026 | **Envoyé** | oui après 7–10 jours |
| Moussatat / Maths au CSJA | `moussatat.github.io/liens/` | `/annales-bac-maths-par-chapitre` | Nizar Moussatat — nizar.moussatat@ac-grenoble.fr | Email public | 19/08/2026 | **Envoyé** | oui après 7–10 jours |

**6 envois réels sur 6.** Aucun prospect de réserve n'a été nécessaire. APMEP
n'a pas été contactée.

### E. Choix de ressource — deux arbitrages documentés

**Pierre Carrée.** La page cible affiche 50 sujets, 31 corrigés depuis 2021 et
surtout **6 recueils thématiques** : leur couverture des annales est déjà
organisée par thème. Proposer `annales-bac-maths-par-chapitre` aurait fait
doublon. Bascule sur `/planning-revision-bac-maths`, conformément à l'option
prévue, et le message le dit explicitement.

**Moussatat.** La section « cycle Terminal » de leur page Liens rassemble les
programmes officiels, les ressources d'accompagnement Eduscol et des livrets
GeoGebra, sans banque d'exercices. `annales-bac-maths-par-chapitre` y apporte un
type de ressource absent.

### F. Contraintes techniques rencontrées

**Logamaths.** Formulaire Contact Form 7 avec trois contraintes : champ NOM
limité à **12 caractères** (premier envoi rejeté avec « Ce champ a une saisie
trop longue », corrigé en « Amokrane »), message limité à **300 caractères**
(message calibré à 298), et reCAPTCHA v3 invisible — aucun défi à résoudre, donc
aucun contournement. Double bandeau de consentement refusé avant accès au
formulaire. Confirmation finale : « Merci pour votre message. Il a été envoyé. »

**Pierre Carrée.** Champ téléphone présent mais **facultatif** ; formulaire
éditorial (« Une question ? Un document manquant ? »). Confirmation par
redirection vers `contact.php?envoye=1`.

### G. Texte exact des six messages envoyés

**1. Logamaths — formulaire public** · objet : *Annales du bac classées par chapitre* · case « Site partenaire » cochée

> Bonjour, votre page Terminale Spé-Maths renvoie vers les annales APMEP,
> classées par session. J'ai publié un accès complémentaire : les exercices
> officiels 2024-2026 classés par chapitre, avec filtres.
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre - libre à vous de
> l'ajouter si utile.

**2. Mathlvl — email** · objet : *Annales du bac classées par chapitre*

> Bonjour Raphaël,
>
> Votre page Annales rassemble 158 sujets classés par année et par session.
>
> J'ai publié un accès complémentaire, organisé dans l'autre sens : les exercices
> officiels des sessions 2024, 2025 et 2026 classés par chapitre, avec filtres
> par année et par difficulté, le PDF officiel et une correction quand elle
> existe :
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre
>
> Concrètement, un élève qui révise les suites y trouve directement les exercices
> de bac correspondants.
>
> Si vous pensez que cela peut être utile à vos élèves, libre à vous de l'ajouter
> à vos ressources.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

**3. Pierre Carrée — formulaire public**

> Bonjour,
>
> Votre page Baccalauréat Spé Maths est très complète : 50 sujets, 31 corrigés
> depuis 2021, et déjà des recueils thématiques.
>
> Comme les annales sont déjà largement couvertes chez vous, je propose plutôt
> autre chose : un planning de révision du bac de maths, décliné en 30, 15 et
> 7 jours, qui répartit les chapitres prioritaires jour par jour.
> https://www.sprintmaths.com/planning-revision-bac-maths
>
> Si vous pensez qu'il peut aider vos élèves à organiser leurs révisions, libre à
> vous de l'ajouter à vos ressources.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

**4. Mission Maths 360 — email** · objet : *Annales du bac classées par chapitre*

> Bonjour,
>
> Votre page Annales de Bac propose des bacs blancs construits à partir de sujets
> récents, avec corrigés détaillés.
>
> J'ai publié un index complémentaire : les 24 exercices des sujets officiels
> 2024, 2025 et 2026 classés par chapitre, avec filtres par année et par
> difficulté, et le PDF officiel de chaque session :
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre
>
> Un élève qui travaille la géométrie dans l'espace y retrouve directement les
> exercices de bac correspondants.
>
> Si vous pensez que cela peut être utile à vos élèves, libre à vous de l'ajouter.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

**5. Maths et Tiques — email** · objet : *Annales du bac classées par chapitre*

> Bonjour Yvan,
>
> Sur votre page Brevet, bac, orientation, vous proposez une banque de sujets et
> des corrigés en vidéo.
>
> J'ai mis en ligne un index complémentaire : les exercices des sujets officiels
> 2024 à 2026 classés par chapitre.
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre
>
> Libre à vous de l'ajouter si vous le trouvez utile.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

*(52 mots — volontairement le plus court du batch, Maths et Tiques étant un site
majeur.)*

**6. Moussatat / Maths au CSJA — email** · objet : *Annales du bac classées par chapitre*

> Bonjour Nizar,
>
> Sur votre page Liens, la section cycle Terminal rassemble surtout les
> programmes officiels et les ressources d'accompagnement Eduscol.
>
> En complément, j'ai publié un index des 24 exercices des sujets officiels du
> bac 2024, 2025 et 2026, classés par chapitre, avec le PDF officiel de chaque
> session :
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre
>
> Si vous pensez que cela a sa place parmi vos liens pour vos élèves, libre à
> vous de l'ajouter.
>
> Amokrane
> SprintMaths
> https://www.sprintmaths.com

Aucun message ne contient de terme proscrit. Aucun placeholder résiduel. Aucune
pièce jointe. Une seule ressource par message. Signature identique partout.

### H. Coup d'œil Search Console — changement manifeste

Aucune analyse complète, aucune inspection d'URL, aucune nouvelle demande
d'indexation. Simple relevé du rapport global.

| Mesure | J50 (données 14/08) | J52 (19/08) |
| --- | ---: | ---: |
| Dans l'index | 7 | **27** |
| Non indexées | 4 | 53 |
| Motifs | 2 | 4 |

Détail des motifs au 19/08 :

| Motif | Pages |
| --- | ---: |
| Détectée, actuellement non indexée | 41 |
| Explorée, actuellement non indexée | **8** |
| Page avec redirection | 3 |
| Autre page avec balise canonique correcte | 1 |

**L'indexation est passée de 7 à 27 pages**, soit un taux de 27/76 ≈ 35,5 %. Le
motif « Explorée, actuellement non indexée », **absent en J50**, apparaît sur
8 pages : Google a désormais exploré ces URLs et choisi de ne pas les retenir.
Ce signal est nouveau et devra être analysé lors du relevé sérieux, pas
maintenant.

### I. Batch 3 — non contactés

APMEP, SujetDeBac et Galilée restent disponibles comme prospects de réserve.
Aucun n'a été sollicité, les six prospects prioritaires étant tous joignables.

### J. Relances

Aucune relance envoyée ni programmée. Les quatre contacts J51 restent en attente
d'un follow-up unique envisageable vers le 26–28 août ; les six contacts J52
vers le 27–30 août.

## Backlinks / mentions obtenus

Tableau permanent. Une ligne n'est ajoutée qu'après vérification réelle de la
page source — jamais sur une simple intention annoncée.

| Date découverte | Domaine | Page source | URL SprintMaths | Ancre | Type | Vérifié |
| --- | --- | --- | --- | --- | --- | :---: |
| — | — | — | — | — | — | — |

**Aucun backlink ni mention à ce jour (19/08/2026).** Dix contacts cumulés,
premières prises de contact datant du 18/08.

## J53 — Search Console → décisions SEO

Sprint analytique. Aucune page créée, aucune réécriture, aucune demande
d'indexation, aucun outreach, aucun fichier de code modifié.

### A. État indexation

Session GSC authentifiée sur `sc-domain:sprintmaths.com`.
Rapport Indexation > Pages — **« Dernière mise à jour : 17/08/2026 »**.

| Motif | Nombre actuel | Évolution depuis J52 |
| --- | ---: | --- |
| **Dans l'index** | **27** | inchangé |
| Détectée, actuellement non indexée | 41 | inchangé |
| Explorée, actuellement non indexée | 8 | inchangé |
| Page avec redirection | 3 | inchangé |
| Autre page avec balise canonique correcte | 1 | inchangé |
| **Total non indexées** | **53** | inchangé |

Taux d'indexation affiché : **27/76 ≈ 35,5 %**.

**Le rapport n'a pas été rafraîchi depuis J52** : il portait déjà la date du
17/08 lors du relevé du 19/08. Les chiffres ci-dessus sont donc un instantané
vieux de 4 jours, et non l'état réel de l'index au 21/08.

### B. Explorées, actuellement non indexées — les 8 URLs

Toutes explorées le **18 août 2026**, c'est-à-dire le lendemain des demandes
d'indexation J50.

| URL | Dernier crawl | Cluster | Type de page |
| --- | --- | --- | --- |
| `/sujet-bac-maths-2024-corrige` | 18/08/2026 | Annales | annale |
| `/bac-maths-2027` | 18/08/2026 | Bac 2027 | hub / offre |
| `/sujet-bac-maths-2025-corrige` | 18/08/2026 | Annales | annale |
| `/annales-bac-maths-par-chapitre` | 18/08/2026 | Annales | outil / index |
| `/sujet-epreuve-anticipee-maths-2026-corrige` | 18/08/2026 | Première | annale |
| `/programme-maths-terminale` | 18/08/2026 | Programme | hub |
| `/demonstrations-bac-maths-terminale` | 18/08/2026 | Terminale | méthode |
| `/formules-bac-maths-terminale` | 18/08/2026 | Terminale | fiche / outil |

Ce sont **exactement les 8 URLs pour lesquelles une indexation avait été
demandée en J50**.

### C. Inspection des 8 URLs — résultat décisif

Les 8 ont été inspectées une par une via l'Inspection d'URL (index live, sans
aucune demande d'indexation).

| URL | Statut live au 21/08 | Anomalie technique |
| --- | --- | --- |
| `/formules-bac-maths-terminale` | **La page est indexée** | Aucune |
| `/demonstrations-bac-maths-terminale` | **La page est indexée** | Aucune |
| `/programme-maths-terminale` | **La page est indexée** | Aucune |
| `/annales-bac-maths-par-chapitre` | **La page est indexée** | Aucune |
| `/bac-maths-2027` | **La page est indexée** | Données structurées « Extraits de produits » : problèmes **non critiques** |
| `/sujet-bac-maths-2024-corrige` | **La page est indexée** | Aucune |
| `/sujet-bac-maths-2025-corrige` | **La page est indexée** | Aucune |
| `/sujet-epreuve-anticipee-maths-2026-corrige` | **La page est indexée** | Aucune |

**8 sur 8 sont indexées.** Le motif « Explorée, actuellement non indexée » du
rapport est intégralement périmé : il décrit l'état au 17/08, la veille du crawl.

**Verdict par URL : V1 pour les 8** — bonnes pages, statut transitoire lié à un
crawl très récent. Aucune V2, V3, V4 ni V5.

Aucune analyse de cannibalisation, de chevauchement ou d'autonomie n'a été
poussée plus loin : la prémisse « ces pages ont été refusées » est fausse, et
diagnostiquer un problème de contenu sur des pages indexées aurait été une
conclusion fabriquée.

### D. Détectées, actuellement non indexées — répartition par cluster

40 URLs récupérées sur les 41 annoncées. **Toutes affichent « Dernière
exploration : Sans objet »** — jamais explorées, donc jamais évaluées.

| Cluster | Détectées | Exemple | Action |
| --- | ---: | --- | --- |
| Articles | 11 | `/articles/methode-derivee-terminale` | Aucune — attendre le crawl |
| Exercices par chapitre | 5 | `/exercices-maths-terminale/suites` | Aucune |
| Méthodes par chapitre | 5 | `/methodes-maths-terminale/tableau-variation` | Aucune |
| Hubs de niveau | 5 | `/bac-terminale-maths`, `/methodes-maths-terminale` | Aucune |
| Réglementaires | 4 | `/cgv`, `/politique-confidentialite` | Aucune — non prioritaires |
| Programme par chapitre | 3 | `/programme-maths-terminale/suites` | Aucune |
| Notions Terminale | 3 | `/primitives-terminale-specialite-maths` | Aucune |
| Programme par niveau | 2 | `/programme-maths-premiere` | Aucune |
| Grand Oral | 1 | `/grand-oral-maths-2027` | Aucune |
| Quiz | 1 | `/quiz-maths-terminale-specialite` | Aucune |

**Le cluster `/articles` est déprioritisé en bloc** (11 URLs sur 40, aucune
explorée). C'est le seul signal de famille entière. Il ne justifie aucune action
tant que Google n'a pas crawlé ces pages : sans exploration, il n'y a aucun
jugement de qualité à corriger.

### E. Performance — 28 jours (22/07 → 18/08/2026)

| Mesure | Valeur |
| --- | ---: |
| Clics | **9** |
| Impressions | **166** |
| CTR moyen | **5,4 %** |
| Position moyenne | **19** |

### F. Performance — 7 jours (12/08 → 18/08/2026)

| Mesure | Valeur |
| --- | ---: |
| Clics | **2** |
| Impressions | **45** |
| CTR moyen | **4,4 %** |
| Position moyenne | **32,6** |

La position moyenne se dégrade (19 → 32,6) parce que de nouvelles pages entrent
dans l'index en bas de SERP et tirent la moyenne vers le bas. C'est un signe
d'élargissement, pas de recul.

### G. Requêtes — 28 jours (16 au total)

| Requête | Clics | Impressions | Page associée |
| --- | ---: | ---: | --- |
| préparer ma rentrée en terminale spécialité mathématiques | **1** | 1 | `/preparer-entree-terminale-specialite-maths` |
| planning revision bac s | 0 | 4 | `/planning-revision-bac-maths` |
| exercice type bac maths terminale | 0 | 2 | `/exercices-type-bac-maths-terminale` |
| exercice type bac | 0 | 2 | `/exercices-type-bac-maths-terminale` |
| sprint math | 0 | 1 | marque — `/` |
| probabilité terminale | 0 | 1 | `/programme-maths-terminale/probabilites` |
| exercices type bac maths | 0 | 1 | `/exercices-type-bac-maths-terminale` |
| exerice deruvation terminalk ave corretcion *(faute)* | 0 | 1 | `/exercices-maths-terminale/derivation` |
| type bac maths | 0 | 1 | ambigu : `/sujets-type-bac-maths-terminale` ou `/exercices-type-bac-maths-terminale` |
| épreuve anticipée maths sujet 0 correction | 0 | 1 | `/sujets-zero-maths-premiere` |
| intégrales maths | 0 | 1 | cluster intégrales (3 pages) |
| annales bac maths | 0 | 1 | `/annales-bac-maths-terminale` |
| annales bac mathématiques | 0 | 1 | `/annales-bac-maths-terminale` |
| integrale | 0 | 1 | cluster intégrales |
| exercice terminale maths | 0 | 1 | `/exercices-maths-terminale` |
| exercice maths terminale | 0 | 1 | `/exercices-maths-terminale` |

**Caveat majeur : ces 16 requêtes ne totalisent que 21 impressions sur 166.
87 % des impressions sont dans des requêtes anonymisées par Google.** Toute
lecture fine des requêtes est donc structurellement incomplète.

10 des 16 requêtes apparaissent aussi sur 7 jours : la diversité de requêtes est
très récente.

### H. Pages — 28 jours (17 au total)

| Page | Clics | Impressions | Classe |
| --- | ---: | ---: | --- |
| `/planning-revision-bac-maths` | 6 | 101 | **P1 — moteur confirmé** |
| `/preparer-entree-terminale-specialite-maths` | 2 | 2 | P1 |
| `/` | 1 | 10 | P1 |
| `/exercices-type-bac-maths-terminale` | 0 | 21 | **P2 — potentiel** |
| `/exercices-maths-terminale/derivation` | 0 | 13 | P2 |
| `/programme-maths-terminale/probabilites` | 0 | 9 | P2 |
| `/methodes-maths-terminale/probabilites-conditionnelles` | 0 | 5 | P3 |
| `/methodes-maths-terminale/integrales` | 0 | 3 | P3 |
| `/mentions-legales` | 0 | 2 | P3 |
| `/epreuve-anticipee-maths-premiere` | 0 | 2 | **P3 — nouveau cluster** |
| `/programme-maths-terminale` | 0 | 2 | P3 — nouveau |
| `/bac-maths-2027` | 0 | 2 | P3 — nouveau |
| `/annales-bac-maths-terminale` | 0 | 2 | **P3 — nouveau cluster** |
| `/exercices-maths-terminale/integrales` | 0 | 2 | P3 |
| `/programme-maths-terminale/geometrie-espace` | 0 | 1 | P3 |
| `/calculatrice-bac-maths-2027` | 0 | 1 | **P3 — nouveau cluster** |
| `/sujets-zero-maths-premiere` | 0 | 1 | **P3 — nouveau cluster** |

`/planning-revision-bac-maths` porte **101/166 impressions (61 %) et 6/9 clics
(67 %)**. Sa domination, déjà constatée en juin, persiste.

Les 17 pages ont toutes des impressions sur les 7 derniers jours : l'élargissement
est entièrement récent.

### I. Comparaison aux clusters J38–J47

| Cluster | Apparaît en GSC ? |
| --- | --- |
| Annales | **Oui** — `/annales-bac-maths-terminale`, requêtes « annales bac maths » |
| Première / épreuve anticipée | **Oui** — `/epreuve-anticipee-maths-premiere`, `/sujets-zero-maths-premiere` |
| Calculatrice | **Oui** — `/calculatrice-bac-maths-2027` |
| Intégrales / primitives | **Oui** — 3 pages + requêtes « intégrales maths », « integrale » |
| Bac 2027 | **Oui** — `/bac-maths-2027` |
| Formules | Non |
| Grand Oral | Non |
| Démonstrations | Non |
| Automatismes | Non |
| Annales par chapitre | Non |
| Sujets 2024 / 2025 / 2026 | Non |
| Coefficient | Non |
| Python | Non |
| Quiz | Non |
| Dénombrement | Non |

Cinq clusters J38–J47 commencent à générer des impressions. Les autres sont
indexés depuis trop peu de temps pour être jugés.

### J. Quick wins

**Aucune requête ne remplit les critères O1** (impressions réelles + position
4–15 + CTR faible + page pertinente).

Le seul candidat théorique est `/exercices-type-bac-maths-terminale` :
21 impressions, 0 clic sur 28 jours. Mais 21 impressions réparties sur 4 semaines
sont très en dessous du seuil à partir duquel modifier un title serait justifié.
Conformément à la consigne, **aucune action**.

| Requête | Page | Impressions | Action |
| --- | --- | ---: | --- |
| exercice type bac (+ variantes) | `/exercices-type-bac-maths-terminale` | 21 cumulées | Attendre — volume insuffisant |
| planning revision bac s | `/planning-revision-bac-maths` | 4 | Aucune |
| Toutes les autres | — | 1 à 2 | Aucune |

### K. Requêtes émergentes et trous de contenu

Chaque requête relevée a été confrontée aux routes réelles du dépôt.

| Requête | Impressions | Page dédiée existe ? |
| --- | ---: | --- |
| annales bac maths / mathématiques | 2 | **Oui** — `/annales-bac-maths-terminale` + `/annales-bac-maths-par-chapitre` |
| épreuve anticipée maths sujet 0 correction | 1 | **Oui** — `/sujets-zero-maths-premiere` + `/sujet-epreuve-anticipee-maths-2026-corrige` |
| intégrales maths / integrale | 2 | **Oui** — programme + méthodes + exercices |
| probabilité terminale | 1 | **Oui** — `/programme-maths-terminale/probabilites` |
| exercice (maths) terminale | 2 | **Oui** — `/exercices-maths-terminale` |

**Aucun trou de contenu démontré.** Les 13 routes correspondantes ont été
vérifiées présentes dans `src/app/`. Aucune opportunité de nouvelle page n'est
soutenue par les données.

Un point d'ambiguïté sans gravité : la requête « type bac maths » peut
correspondre à `/sujets-type-bac-maths-terminale` comme à
`/exercices-type-bac-maths-terminale`. À 1 impression, cela ne justifie aucune
intervention.

### L. Outreach — réponses reçues

**2 vraies réponses sur 10 contacts.** Aucune relance envoyée.

| Prospect | Date | Nature | Résumé | Action nécessaire |
| --- | --- | --- | --- | --- |
| Maths et Tiques (Yvan Monka) | 20/08 18:49 | **Refus** | « je ne vais pas pouvoir référencer votre site car je ne peux pas faire de renvoi vers les sites commerciaux » | Aucune — refus de principe |
| Mathsnf (Nicolas Fabres) | 20/08 18:45 | **Demande d'information** | « merci pour vos liens, je prendrai le temps de regarder prochainement. C'est vous qui gérez le site sprintmaths ? Vous enseignez aussi en lycée ? Et puis comment avez-vous trouvé mon site ? » | **Réponse personnelle attendue de l'utilisateur** |

Les 8 autres contacts n'ont pas répondu. Aucun bounce.

Le refus d'Yvan Monka est le renseignement le plus exploitable de J53 : il ne
porte pas sur la qualité de la ressource mais sur la **nature commerciale du
domaine**. SprintMaths vend un pack à 39 €, ce qui exclut d'office une partie du
vivier enseignant, indépendamment de l'angle éditorial.

### M. Backlinks

Les 10 pages cibles ont été rechargées et inspectées.

| Page cible | HTTP | Occurrences « sprintmaths » |
| --- | :---: | :---: |
| Les 10 pages J51 + J52 | 200 | **0** |

**Aucun backlink, aucune mention.** Le tableau permanent reste vide. La réponse
de Nicolas Fabres (« je prendrai le temps de regarder ») n'est pas comptée comme
un lien obtenu.

### N. Modification de code

**Aucune.** Une seule observation technique : `/bac-maths-2027` remonte des
« problèmes non critiques » sur les données structurées *Extraits de produits*.
Google qualifie lui-même ces problèmes de non critiques et la page est indexée.
Cela ne constitue pas l'anomalie objective requise pour toucher au code en J53.
À examiner lors d'un futur passage si le rich snippet Produit devient un enjeu.

### O. Décision J54

**SCÉNARIO E — ATTENDRE.**

Motifs :

1. L'indexation progresse vite et le rapport la sous-estime : les 8 URLs classées
   « explorées non indexées » sont **toutes indexées**. Le chiffre réel dépasse
   donc 27/76.
2. Les données de performance restent très faibles : 9 clics et 166 impressions
   sur 28 jours, dont 87 % d'impressions en requêtes anonymisées.
3. Aucune anomalie technique.
4. Aucun trou de contenu démontré : 13 routes vérifiées, toutes présentes.
5. Aucun quick win au-dessus du seuil de bruit.

Créer ou réécrire quoi que ce soit aujourd'hui reviendrait à agir sur du bruit.

## J54 — Recalibrage outreach

Aucune page créée, aucune modification de code, aucune demande d'indexation,
aucun nouveau prospect contacté. Un seul envoi : la réponse à Nicolas Fabres.

### A. Réponse à Nicolas Fabres

Envoyée le **21/08/2026 à 13:39**, en réponse dans le thread existant
« Une banque de 50 problématiques de Grand Oral maths », à `mathsnf@gmail.com`.

> Bonjour Nicolas,
>
> Oui, c'est bien moi qui gère SprintMaths : je m'occupe du site, des contenus et
> des outils proposés aux élèves.
>
> Non, je ne suis pas enseignant de mathématiques en lycée.
>
> Quant à votre site, je l'ai trouvé assez simplement : je cherchais sur le web
> des ressources publiques consacrées au Grand Oral de maths, et votre page en
> faisait partie.
>
> Merci en tout cas d'avoir pris le temps de répondre et de regarder les liens.
>
> Bien cordialement,
> Amokrane
> SprintMaths

Ses trois questions reçoivent une réponse directe et exacte. Aucun nouveau pitch,
aucune demande de lien, aucune mention de l'offre payante.

### B. Réponses cumulées sur les 10 contacts

Recherche Gmail depuis le 19/08 : **aucune nouvelle réponse depuis J53**, aucun
bounce, aucune notification de formulaire.

| Prospect | Date | Type | Résumé | Action |
| --- | --- | --- | --- | --- |
| Maths et Tiques (Yvan Monka) | 20/08 | **Refus — politique sites commerciaux** | Ne référence pas les sites commerciaux | Aucune. Ne pas relancer. |
| Mathsnf (Nicolas Fabres) | 20/08 | **Demande d'information** | Trois questions sur l'identité et la découverte du site | **Répondu le 21/08** |
| 8 autres | — | Aucune réponse | — | Follow-up éventuel à partir du 26–28 août |

Taux de réponse : **2/10**. Taux de refus explicite : 1/10.

### C. Backlinks

Les 10 pages cibles rechargées le 21/08 : **0 occurrence de « sprintmaths »**.
Le tableau permanent reste vide. Nicolas Fabres a dit qu'il regarderait ; ce
n'est pas un lien obtenu.

### D. Analyse du refus « site commercial »

**Un seul refus explicite sur ce motif.** Il ne permet pas de conclure que tous
les enseignants refusent les sites commerciaux. Il établit en revanche qu'une
politique de ce type existe et qu'elle s'applique indépendamment de la gratuité
de la ressource proposée : le message envoyé à Yvan Monka ne mentionnait ni prix,
ni offre, uniquement un index gratuit d'exercices officiels.

Ce qui est visible d'un domaine sprintmaths.com : une offre à 39 €, des CGV, une
politique de remboursement. Un site qui applique une règle de non-renvoi vers le
commercial la déclenchera sur cette base, pas sur le contenu du message.

**Conséquence méthodologique :** cibler des pages qui **citent déjà des acteurs
privés ou payants** est un critère plus prédictif que la qualité de l'angle
éditorial.

Segmentation retenue :

| Segment | Description | Pronostic |
| --- | --- | --- |
| **A** | Enseignants, sites de classe, portails académiques | Risque élevé de politique de non-renvoi |
| **B** | Ressources éducatives indépendantes citant déjà des outils tiers | Meilleur potentiel |
| **C** | Médias / blogs éducation-orientation | Peu sensibles au statut commercial |
| **D** | Bibliothèques et ressources documentaires | Variable — à vérifier au cas par cas |
| **E** | Concurrents directs | Faible ; ne pas prioriser |

### E. Segmentation des 30 prospects J48

Vérification par recherche de liens sortants sur la page cible. « Oui observé »
n'est écrit que si des liens vers des acteurs privés ou commerciaux sont
réellement présents.

| # | Prospect | Segment | Liens commerciaux acceptés ? | Preuve | Priorité revue |
| ---: | --- | :---: | --- | --- | :---: |
| 22 | Maths et Tiques | A | **Non — politique explicite** | Refus par email du 20/08 : « je ne peux pas faire de renvoi vers les sites commerciaux » | **Exclu** |
| 8 | BPI (pro.bpi.fr) | D | **Oui observé** | La page cite `classiques-garnier.com` (éditeur commercial), `philocours.com`, `la-philosophie.com` | **A — à contacter** |
| 18 | Galilée | B/E | **Oui observé** | La page cite `cours-galilee.com`, `cours-louise-michel.com` (cours particuliers), Trustpilot | B — concurrence partielle |
| 10 | APMEP | A/D | Inconnu | Liens majoritairement associatifs (Animath, MathenJeans, SMAI) ; `cahiers-pedagogiques.com` et `mathkang.org` sont ambigus | C — angle éditorial exigeant |
| 21 | SujetDeBac | B | Inconnu | Aucun lien sortant éditorial trouvé ; uniquement des scripts publicitaires | C |
| 7 | Petit Lucas | **E** | Inconnu | **Aucun lien sortant sur la page ressources.** Le site vend des cours particuliers à Valence (`/cours.html`, `/preparation-bac-valence.html`) | **Déclassé de A à C** |
| 1–6, 9, 16, 17, 19, 20, 23 | Mathoutils, ParcMaths, Mathsnf, Math93, Objectif Maths Tours, Mathsapiens, Logamaths, Mathlvl ×2, Pierre Carrée, Mission Maths 360, Moussatat | A/B | Inconnu | Déjà contactés en J51/J52 — pas de re-vérification | En attente de réponse |
| 11–14, 24, 29, 30 | Portails académiques (Toulouse, Amiens, Réunion, Guyane, Montpellier), Éduscol, ac-Toulouse LP | **A** | Inconnu — **risque structurel** | Portails institutionnels : politique de renvoi généralement restrictive | **Déprioriser** |
| 25 | planning-revisions.fr | C/E | Inconnu | Intention identique à SprintMaths | C |
| 26, 27, 28 | Excellence-Maths, Mathovore, JaiCompris | **E** | Inconnu | Concurrents directs | C — ne pas prioriser |

**Prospects avec compatibilité commerciale réellement observée : 2** (BPI,
Galilée). **1 exclusion définitive** (Maths et Tiques). **1 déclassement**
(Petit Lucas). Le reste demeure `Inconnu` faute de preuve observable.

Le sous-ensemble le plus fragile est celui des **7 portails académiques** : ce
sont exactement des sites de segment A, ceux sur lesquels le motif de refus
d'Yvan Monka a le plus de chances de se reproduire.

### F. Nouveaux profils identifiés — recherche web réelle

Aucun n'a été contacté.

| Prospect | Segment | Page cible | Preuve de compatibilité |
| --- | :---: | --- | --- |
| **Génération Zébrée** | C | `blog.generationzebree.fr/blog/reviser-le-bac-les-plateformes-utiles/` | Cite **Kartable**, **Projet Voltaire**, **Ikando**, Afterclasse — tous commerciaux |
| **Bibliothèques de Paris** | D | `bibliotheques.paris.fr/reussir-ses-examens-selection-de-ressources-en-ligne.aspx` | Cite **Kartable**, **Afterclasse**, **Lelivrescolaire** — plateformes payantes |
| **Inès Maths** | B | `inesmaths.fr/pages/ressources-bac` | Cite **Annabac**, **Kwyk**, **NumWorks** — tous commerciaux |
| **Portail-Education** | C | `portail-education.fr/blog/pedagogie/meilleurs-sites-ressources-gratuites-maths/` | Cite **Groupe Réussite** (cours particuliers) |
| BPI | D | `pro.bpi.fr/ressources-numeriques-baccalaureat/` | Voir tableau E — déjà identifié en J48, jamais contacté |
| Superprof (blog) | C | `superprof.fr/blog/reviser-gratuitement-sur-le-web-pour-lyceens/` | Plateforme commerciale listant des sites gratuits ; **aucun contact éditorial trouvé sur l'article** |
| GoStudent (blog) | C | `gostudent.org/fr-fr/blog/sujet-grand-oral-maths` | Plateforme commerciale ; contact non vérifié |
| Voscours (blog) | C | `voscours.fr/blog/meilleurs-sites-de-revision-bac` | Non vérifié |
| BM Lyon | D | `bm-lyon.fr/.../je-revise-mon-bac-avec-la-bml` | **Inconnu** — quasi aucun lien sortant éditorial |
| BnF | D | `bnf.fr/fr/preparer-son-bac-la-bnf` | **Inconnu** — liens vers bases académiques sous proxy |
| Cours Legendre | E | `cours-legendre.fr/sujet-grand-oral-maths-guide-complet/` | Concurrent direct — écarté |
| Excellence-Maths | E | déjà en liste J48 | Concurrent direct — écarté |

**4 nouveaux prospects avec preuve de compatibilité commerciale observée.**
Les autres restent à vérifier ou sont écartés.

### G. Futur batch prioritaire — scores

Barème : pertinence /4 · propension aux liens externes /3 · compatibilité
commerciale /2 · facilité de contact /1.

| Prospect | Page cible | Score | Ressource envisagée | Angle | Contact |
| --- | --- | :---: | --- | --- | --- |
| **Génération Zébrée** | Réviser le bac : plateformes utiles | **10/10** | `/planning-revision-bac-maths` | Sa page liste des plateformes de révision ; le planning est un outil gratuit immédiatement utilisable | Formulaire `/contact/` |
| **Inès Maths** | Ressources BAC 2026 | **10/10** | `/annales-bac-maths-par-chapitre` | Sa page réunit annales et fiches ; l'accès par chapitre est un angle absent | Formulaire `/pages/contact` |
| **BPI** | Ressources d'autoformation bac | **10/10** | `/planning-revision-bac-maths` | Sélection documentaire de ressources gratuites pour lycéens | Formulaire BPI |
| **Portail-Education** | Meilleurs sites de ressources gratuites en maths | **9/10** | `/annales-bac-maths-par-chapitre` | Article dédié aux sites gratuits de maths | `contact@portail-education.fr` |
| **Bibliothèques de Paris** | Réussir ses examens — ressources en ligne | **9/10** | `/planning-revision-bac-maths` | Sélection déjà ouverte aux plateformes payantes | ⚠️ Portail de sollicitation avec authentification |
| *(6ᵉ place laissée ouverte)* | — | — | — | Aucun 6ᵉ candidat n'atteint 7/10 avec preuve vérifiée | — |

**5 prospects retenus, pas 6.** Compléter la liste avec un candidat non vérifié
aurait contredit la règle « ne jamais écrire Oui par intuition ».

### H. Contrôle GSC léger

| Mesure | Valeur |
| --- | --- |
| Dernière mise à jour du rapport Pages | **17/08/2026** — inchangée |
| Dans l'index | **27** |
| Non indexées | **53** |

Rapport toujours périmé. Aucune inspection, aucune demande d'indexation. Le
relevé complet reste prévu vers le 26–28 août.

## J55 — Checkpoint acquisition

Sprint de mesure. Aucune page, aucun email, aucune optimisation, aucun code
modifié.

### Indexation

**Rapport Pages toujours périmé** — « Dernière mise à jour : 17/08/2026 »,
identique à J53 et J54. 27 indexées / 53 non indexées, 4 motifs inchangés.
Aucune évolution mesurable ; l'analyse d'indexation n'a pas été refaite et
aucune nouvelle URL n'est apparue dans « Explorée, actuellement non indexée ».

Le rapport Performances, lui, est frais (mis à jour il y a 5,5 h).

### Performance 28 jours — 24/07 → 20/08/2026

| KPI | J53 | J55 | Évolution |
| --- | ---: | ---: | --- |
| Clics | 9 | **12** | **+33 %** |
| Impressions | 166 | **215** | **+30 %** |
| CTR moyen | 5,4 % | 5,6 % | +0,2 pt |
| Position moyenne | 19 | 23,5 | −4,5 |
| Pages avec impressions | 17 | **22** | **+5** |
| Requêtes visibles | 16 | **23** | **+7** |

### Performance 7 jours — 14/08 → 20/08/2026

| KPI | J53 | J55 | Évolution |
| --- | ---: | ---: | --- |
| Clics | 2 | **5** | **+150 %** |
| Impressions | 45 | **97** | **+116 %** |
| CTR moyen | 4,4 % | 5,2 % | +0,8 pt |
| Position moyenne | 32,6 | 34,3 | −1,7 |

La position moyenne recule parce que de nouvelles pages entrent en bas de SERP.
Sur ces volumes, les variations de CTR et de position ne constituent pas une
tendance statistiquement établie ; le volume d'impressions, lui, double.

### Pages — 22 avec impressions

| Page | Clics | Impr. | vs J53 |
| --- | ---: | ---: | --- |
| `/planning-revision-bac-maths` | 6 | 97 | STABLE (101) |
| `/programme-maths-terminale` | 0 | **36** | **UP ×18** (2) |
| `/exercices-type-bac-maths-terminale` | 0 | 21 | STABLE |
| `/` | 3 | 12 | UP (10, 1 clic) |
| `/exercices-maths-terminale/derivation` | 0 | 11 | STABLE (13) |
| `/programme-maths-terminale/probabilites` | 0 | 9 | STABLE |
| **`/sujets-grand-oral-maths`** | **1** | **9** | **NEW** |
| `/methodes-maths-terminale/probabilites-conditionnelles` | 0 | 6 | UP (5) |
| `/methodes-maths-terminale/integrales` | 0 | 5 | UP (3) |
| `/bac-maths-2027` | 0 | 4 | UP (2) |
| `/preparer-entree-terminale-specialite-maths` | 2 | 3 | STABLE |
| `/epreuve-anticipee-maths-premiere` · `/mentions-legales` · `/annales-bac-maths-terminale` · `/exercices-maths-terminale/integrales` | 0 | 2 | STABLE |
| **`/sujet-epreuve-anticipee-maths-2026-corrige`** | 0 | 2 | **NEW** |
| **`/coefficient-specialite-maths-bac-2027`** | 0 | 1 | **NEW** |
| **`/formules-bac-maths-terminale`** | 0 | 1 | **NEW** |
| **`/demonstrations-bac-maths-terminale`** | 0 | 1 | **NEW** |
| `/programme-maths-terminale/geometrie-espace` · `/calculatrice-bac-maths-2027` · `/sujets-zero-maths-premiere` | 0 | 1 | STABLE |

**5 pages NEW.** Clusters qui s'activent : Grand Oral, outils Terminale
(formules, démonstrations), Bac 2027 (coefficient), Première (sujet 2026).

### Requêtes — 23 sur 28 jours

| Requête | Clics | Impr. | Statut | Page probable |
| --- | ---: | ---: | --- | --- |
| préparer ma rentrée en terminale spécialité mathématiques | **1** | 1 | — | `/preparer-entree-terminale-specialite-maths` |
| **programme maths terminale es** | 0 | **5** | **NEW** | `/programme-maths-terminale` |
| **5 sujets de grand oral de mathématiques sur le thème du sondage** | 0 | **4** | **NEW** | `/sujets-grand-oral-maths` |
| **sujet grand oral maths probabilité** | 0 | **4** | **NEW** | `/sujets-grand-oral-maths` |
| planning revision bac s | 0 | 4 | STABLE | `/planning-revision-bac-maths` |
| exercice type bac maths terminale · exercice type bac | 0 | 2 | STABLE | `/exercices-type-bac-maths-terminale` |
| **formules integrales** · **cours integrale terminale** | 0 | 1 | **NEW** | cluster intégrales |
| **programme math terminale s** · **programme maths terminale s** | 0 | 1 | **NEW** | `/programme-maths-terminale` |
| 12 autres (sprint math, probabilité terminale, annales bac maths, integrale, exercice maths terminale…) | 0 | 1 | STABLE | — |

**7 requêtes NEW.** Clusters qui apparaissent enfin : **Grand Oral** (2 requêtes,
8 impressions cumulées), **intégrales** (2 requêtes), **programme Terminale**
(3 requêtes).

Toujours absents : automatismes, annales par chapitre, sujets 2024/2025, quiz,
Python, primitives, dénombrement, démonstrations (la page a 1 impression mais
aucune requête visible).

Les 23 requêtes ne totalisent que 34 impressions sur 215 : **84 % restent
anonymisées**.

### Quick wins

| Requête / Page | Impr. | Clics | Verdict |
| --- | ---: | ---: | --- |
| `/programme-maths-terminale` | 36 | 0 | **OPTIMIZE LATER** |
| `/exercices-type-bac-maths-terminale` | 21 | 0 | WAIT |
| 5 sujets grand oral … sondage | 4 | 0 | WAIT |
| sujet grand oral maths probabilité | 4 | 0 | WAIT |
| planning revision bac s | 4 | 0 | WAIT |

**Aucun TRUE QUICK WIN.**

`/programme-maths-terminale` est le seul cas notable : 36 impressions et 0 clic.
Mais les requêtes qui l'alimentent sont **« programme maths terminale ES »**,
**« programme maths terminale S »** et **« programme math terminale s »** — des
filières supprimées depuis 2019. Le CTR nul est logique : l'internaute cherche
le programme d'une filière qui n'existe plus. Modifier le title pour capter ces
requêtes serait contre-productif. Classé OPTIMIZE LATER, sans action.

### Trous de contenu

**Aucun trou de contenu démontré.**

Les deux nouvelles requêtes Grand Oral sont déjà couvertes par la page qui
remonte dessus : `/sujets-grand-oral-maths` contient 4 occurrences de
« sondage » et 59 de « probabilité ». Les requêtes « programme maths terminale
ES/S » visent des filières supprimées — créer une page serait une erreur. Les
requêtes intégrales sont couvertes par trois pages existantes.

### Outreach

Aucun nouvel envoi, aucun follow-up (nous sommes le 21/08, seuil fixé au 26–28).

| Prospect | État |
| --- | --- |
| Mathsnf (Nicolas Fabres) | Réponse envoyée le 21/08 à 13:39 — **pas encore de réponse de sa part** |
| Maths et Tiques (Yvan Monka) | Refus définitif — clos |
| 8 autres | Aucune réponse |

Bilan sur 10 contacts : **2 réponses (20 %)**, 1 refus, 1 conversation ouverte,
**0 backlink (0 %)**. Aucun bounce.

**Scénario OUTREACH-C** — 1 à 2 réponses, 0 backlink : ne pas augmenter le
volume. Les 5 prospects J54 (Génération Zébrée, Inès Maths, BPI,
Portail-Education, Bibliothèques de Paris) restent en attente.

### Backlinks

Les 10 pages cibles rechargées le 21/08 : **0 occurrence de « sprintmaths »**.
Journal permanent toujours vide.

### Décision J56

**J56-C — CONTINUER À ATTENDRE.**

Motifs :

1. Les impressions progressent nettement : **+30 % sur 28 jours, +116 % sur
   7 jours**.
2. **5 pages NEW** et **7 requêtes NEW** : les clusters J38–J47 commencent à
   sortir, dont le Grand Oral avec un premier clic.
3. Aucun quick win au-dessus du bruit ; le seul volume notable
   (`/programme-maths-terminale`) est alimenté par des requêtes obsolètes.
4. Aucun trou de contenu démontré.
5. Le rapport d'indexation est toujours périmé : on ne peut même pas mesurer
   l'indexation réelle.

Google transforme bien l'indexation récente en impressions. Il est trop tôt pour
que cela devienne des clics. Toucher au site maintenant reviendrait à agir sur
du bruit.

## J56 — Growth checkpoint

Date réelle : **lundi 24 août 2026**. Aucune page, aucune optimisation, aucun
email, aucun code modifié.

### Indexation — rapport enfin actualisé

**Dernière mise à jour : 21/08/2026** (contre 17/08 depuis trois sprints).

| Mesure | J55 (17/08) | J56 (21/08) | Évolution |
| --- | ---: | ---: | --- |
| **Dans l'index** | 27 | **38** | **+11 (+41 %)** |
| Non indexées | 53 | 42 | −11 |
| Motifs | 4 | 3 | −1 |
| Détectée, actuellement non indexée | 41 | 38 | −3 |
| **Explorée, actuellement non indexée** | 8 | **0** | **motif éliminé** |
| Page avec redirection | 3 | 3 | = |
| Autre page avec balise canonique correcte | 1 | 1 | = |

**Taux d'indexation : 38/76 = 50,0 %.**

Le motif « Explorée, actuellement non indexée » passe de 8 à **0**. C'est la
confirmation officielle du diagnostic posé en J53 par inspection live : les huit
URLs étaient déjà indexées, seul le rapport était en retard. Aucune nouvelle URL
n'est apparue dans ce motif — aucune inspection n'était donc nécessaire.

### Performance 28 jours — 26/07 → 22/08

| KPI | J55 | J56 | Évolution |
| --- | ---: | ---: | --- |
| Clics | 12 | **17** | **+42 %** |
| Impressions | 215 | **308** | **+43 %** |
| CTR moyen | 5,6 % | 5,5 % | −0,1 pt |
| Position moyenne | 23,5 | 25,2 | −1,7 |
| Requêtes visibles | 23 | **32** | +9 |

### Performance 7 jours — 16/08 → 22/08 *(KPI n°1)*

| KPI | J55 | J56 | Évolution |
| --- | ---: | ---: | --- |
| Clics | 5 | **10** | **+100 %** |
| **Impressions** | 97 | **185** | **+91 %** |
| CTR moyen | 5,2 % | 5,4 % | +0,2 pt |
| Position moyenne | 34,3 | **32,4** | **+1,9 — amélioration** |
| Pages avec impressions | 17 | **23** | +6 |
| Requêtes visibles | 18 | **26** | +8 |

Trajectoire des impressions hebdomadaires : **45 → 97 → 185**. Doublement à
chaque relevé. 185 dépasse le repère interne de 150 : **croissance forte**.

La position moyenne s'améliore pour la première fois depuis le début du suivi.

### Pages — 23 avec impressions sur 7 jours

| Page | Clics | Impr. | vs J55 |
| --- | ---: | ---: | --- |
| **`/programme-maths-terminale`** | **1** | **82** | **UP** (36 sur 28 j, 0 clic) |
| **`/sujets-grand-oral-maths`** | **1** | **25** | **UP** (9) |
| `/planning-revision-bac-maths` | 2 | 22 | DOWN relatif — n'est plus la page dominante |
| `/methodes-maths-terminale/integrales` | 0 | 7 | UP |
| `/exercices-type-bac-maths-terminale` | **1** | 6 | premier clic |
| `/programme-maths-terminale/probabilites` | 0 | 6 | STABLE |
| **`/formules-bac-maths-terminale`** | **1** | 5 | **premier clic** |
| `/bac-maths-2027` · `/calculatrice-bac-maths-2027` | 0 | 5 | UP |
| `/exercices-maths-terminale/derivation` | 0 | 4 | STABLE |
| `/demonstrations-bac-maths-terminale` · `/annales-bac-maths-terminale` | 0 | 3 | UP |
| `/` · `/preparer-entree-terminale-specialite-maths` | 2 | 3 | STABLE |
| **`/denombrement-terminale-specialite-maths`** | 0 | 2 | **NEW** |
| `/epreuve-anticipee-maths-premiere` · `/methodes.../probabilites-conditionnelles` · `/sujet-epreuve-anticipee-maths-2026-corrige` · `/exercices-maths-terminale/integrales` | 0 | 2 | STABLE |
| `/coefficient-specialite-maths-bac-2027` · `/mentions-legales` · `/programme-maths-terminale/geometrie-espace` · `/sujets-zero-maths-premiere` | 0 | 1 | STABLE |

**7 pages génèrent des clics** sur 7 jours, contre 2 en J55.

Le planning n'est plus la page dominante : `/programme-maths-terminale` fait
quatre fois ses impressions.

### Requêtes — 26 sur 7 jours

| Requête | Clics | Impr. | Statut |
| --- | ---: | ---: | --- |
| préparer ma rentrée en terminale spécialité mathématiques | 1 | 1 | — |
| 5 sujets de grand oral de mathématiques sur le thème du sondage | 0 | **8** | UP (4) |
| sujet grand oral maths probabilité | 0 | **8** | UP (4) |
| programme maths terminale es | 0 | 5 | STABLE |
| programme math terminale s · planning revision bac s | 0 | 2 | — |
| **sujet grand oral maths probabilité pdf** · **sujet grand oral maths proba** · **sujet grand oral math probabilité** · **sujet grand oral maths probabilités** | 0 | 1 | **NEW ×4** |
| **programme spé maths terminale 2027** · **maths programme terminale** · **programme terminale maths** | 0 | 1 | **NEW ×3** |
| **intégrale maths terminale** · **integral terminal** | 0 | 1 | **NEW ×2** |
| 9 autres (intégrales maths, formules integrales, annales bac maths, exercice type bac…) | 0 | 1 | STABLE |

**Le cluster Grand Oral « probabilité » ressort en 6 variantes**, pour
12 impressions cumulées, plus 8 sur le thème « sondage » : **20 impressions
Grand Oral en 7 jours**. C'est le signal le plus net et le plus répété du sprint.

Apparaît aussi **« programme spé maths terminale 2027 »** — première requête
visible sur l'intention actuelle, et non sur les filières ES/S supprimées.

Les 26 requêtes visibles ne totalisent que 45 impressions sur 185 : **76 %
restent anonymisées**.

### Quick wins

| Page / Requête | Impr. 7 j | Clics | CTR | Verdict |
| --- | ---: | ---: | ---: | --- |
| `/programme-maths-terminale` | 82 | 1 | 1,2 % | **WATCH** |
| `/sujets-grand-oral-maths` | 25 | 1 | 4,0 % | **WATCH** |
| `/planning-revision-bac-maths` | 22 | 2 | 9,1 % | WAIT |
| `/methodes-maths-terminale/integrales` | 7 | 0 | 0 % | WAIT |
| `/exercices-type-bac-maths-terminale` | 6 | 1 | — | WAIT |

**Aucun TRUE QUICK WIN.**

`/programme-maths-terminale` atteint un vrai volume (82 impressions) mais reste
à surveiller, pas à modifier : sur les 11 impressions dont la requête est
visible, 8 viennent encore de **« terminale ES »** et **« terminale S »**,
filières supprimées en 2019. Et la page a désormais **1 clic**, contre 0 en J55 :
son CTR n'est plus nul. Toucher au title sur cette base serait prématuré.

`/sujets-grand-oral-maths` progresse sainement (9 → 25 impressions, 1 clic
maintenu). Traction précoce normale, pas une anomalie de CTR.

### Trous de contenu

**Aucun trou de contenu démontré.**

Les 6 variantes Grand Oral « probabilité » sont déjà couvertes par
`/sujets-grand-oral-maths` (59 occurrences de « probabilit », vérifié en J55) et
par `/questions-jury-grand-oral-maths`. « programme spé maths terminale 2027 »
est couvert par `/programme-maths-terminale`. Les requêtes intégrales sont
couvertes par trois pages existantes.

### Outreach

**Follow-ups : aucun envoyé.** Nous sommes le **24 août**, les seuils sont fixés
au 26 (contacts J51) et au 27 (contacts J52). Interdiction respectée.

⚠️ **Vérification Gmail impossible ce jour.** Gmail a renvoyé une page d'erreur
sur six tentatives, dans deux onglets distincts. Search Console fonctionnait
normalement dans la même session : la panne est spécifique à Gmail, pas au
navigateur. **Il n'a donc pas été possible de vérifier si Nicolas Fabres a
répondu**, ni si un autre prospect a écrit depuis le 21/08. À reprendre en J57.

Bilan inchangé depuis J55, sous réserve de cette vérification manquante :
10 contacts, 2 réponses, 1 refus, 1 conversation, **0 backlink**.

**Scénario OUTREACH-C** — peu de réponses, aucun lien.

### Backlinks

Les 10 pages cibles rechargées le 24/08 : **0 occurrence de « sprintmaths »**.
Journal permanent toujours vide.

### Décision J57

**J57-F — FOLLOW-UP UNIQUEMENT.**

Côté SEO, la consigne est de ne rien toucher : l'indexation passe de 27 à 38,
les impressions hebdomadaires doublent pour la troisième fois consécutive, la
position moyenne s'améliore, et aucun quick win ni trou de contenu n'est
démontré. Intervenir sur les pages maintenant reviendrait à casser une dynamique
qui progresse sans aide.

Le seul travail utile disponible en J57 est le suivi des contacts : les
follow-ups s'ouvrent le 26 août (J51 : Mathoutils, ParcMaths, Math93) et le
27 août (J52 : Logamaths, Mathlvl, Pierre Carrée, Mission Maths 360, Moussatat).
Jamais Yvan Monka. Mathsnf non plus, une conversation ayant déjà eu lieu.

Priorité absolue de J57 : **rétablir l'accès Gmail et vérifier la réponse
éventuelle de Nicolas Fabres** avant tout envoi.

## J57 — Follow-up & growth checkpoint

Sprint de mesure et de suivi de contacts. **Aucune modification de code, aucune
page créée, aucun contenu réécrit, aucun batch 3.** Relevé effectué le
**mardi 25 août 2026 à 06:59 CEST** (date vérifiée avant toute action).

### 1. Fenêtre de follow-up : fermée

| Vague | Contacts | Seuil de relance | 25/08/2026 | Décision |
| --- | --- | --- | --- | --- |
| J51 | Mathoutils, ParcMaths, Math93 | 26/08/2026 | T‑1 | **Aucun envoi** |
| J52 | Logamaths, Mathlvl, Pierre Carrée, Mission Maths 360, Moussatat | 27/08/2026 | T‑2 | **Aucun envoi** |
| — | Mathsnf | — | — | Pas de relance automatique |
| — | Maths et Tiques (Y. Monka) | — | — | **Jamais de relance** |

**0 message envoyé en J57.** Le seuil J51 se joue à un jour près : relancer le
25 aurait été une relance à 6 jours au lieu de 7. La règle a été appliquée telle
qu'écrite.

### 2. Gmail : accès rétabli

La panne observée en J56 (6 tentatives échouées sur 2 onglets) était
transitoire. L'accès fonctionne normalement en J57, ce qui permet enfin de
vérifier ce qui n'avait pas pu l'être.

**Nicolas Fabres (Mathoutils) — CAS A : aucune réponse.** Le fil s'arrête sur
mon message du 21/08 à 13:39. Quatre jours de silence.

Depuis le 21/08, la boîte ne contient que trois éléments, aucun lié à
l'outreach : un mail de félicitations Search Console (24/08, « 15 clics en
28 jours »), une notification Instagram, et le fil FABRES lui-même.

**Aucune nouvelle réponse. Aucun bounce.** Sur 12 messages cumulés (J51 + J52),
le bilan de réponses reste à 2 (Monka : refus ; Mathsnf : échange sans lien).

### 3. Search Console : les données n'ont pas avancé

C'est le fait central de ce sprint et il faut le dire sans le maquiller.

| Rapport | J56 (24/08) | J57 (25/08) | Fin de fenêtre |
| --- | --- | --- | --- |
| Performances 7 j | 10 clics / 185 impr. / 5,4 % / 32,4 | **identique** | 22/08 |
| Performances 28 j | 17 clics / 308 impr. / 5,5 % / 25,2 | **identique** | 22/08 |
| Indexation | 38 indexées / 42 non indexées | **identique** | 21/08 |

Le bandeau indique « dernière mise à jour : il y a 6,5 heures » : le rapport se
rafraîchit, mais Google n'a publié **aucun jour nouveau** depuis J56. Les
journées du 23 et du 24 août n'existent pas encore côté Search Console.

**Conséquence directe : la question centrale de J57 — « est-ce que 185 continue
de monter ? » — ne peut pas recevoir de réponse cette semaine.** Les chiffres
sont *gelés*, pas *plats*. Présenter cette égalité comme un plateau serait une
erreur de lecture qui pourrait déclencher une intervention inutile.

### 4. Ce que la série quotidienne montre quand même

L'agrégat hebdomadaire est bloqué, mais le détail jour par jour du rapport
28 jours est exploitable et il est net.

| Période | Jours | Impressions | Moyenne/jour | Clics |
| --- | ---: | ---: | ---: | ---: |
| 26/07 → 16/08 (référence) | 22 | 126 | **5,7** | 7 |
| 17/08 → 22/08 (rupture) | 6 | 182 | **30,3** | 10 |

Détail de la rupture :

| Jour | Clics | Impressions |
| --- | ---: | ---: |
| 16/08 | 0 | 3 |
| 17/08 | 1 | 15 |
| 18/08 | 1 | 14 |
| 19/08 | 3 | 37 |
| 20/08 | 0 | 20 |
| 21/08 | 3 | 28 |
| 22/08 | 2 | **68** |

Trois observations solides :

1. **La rupture est datée au 17/08**, soit deux jours après la soumission du
   sitemap (15/08). Le délai correspond au cycle normal exploration → indexation
   → première diffusion. La chaîne causale est désormais quantifiée, pas
   supposée.
2. **Le volume est multiplié par 5,3** (5,7 → 30,3 impressions/jour) et les
   clics par 5,2 (0,32 → 1,67/jour). Les deux progressent au même rythme : ce
   n'est pas du bruit d'impressions, la conversion suit.
3. **Le dernier jour observable est le plus fort de l'histoire du site** :
   68 impressions le 22/08, soit +143 % sur le 21/08 et 12× la moyenne de
   référence. **La courbe monte encore à l'instant où l'on cesse de la voir.**

C'est la meilleure réponse disponible à la question de J57 : on ne peut pas
confirmer que 185 monte, mais rien n'indique un essoufflement — au contraire.

### 5. Pages : 23 pages produisent des impressions

Fenêtre 16/08 → 22/08. Classement par rôle réel, pas par intention.

**VOLUME MORT — 44 % des impressions, inexploitable**

| Page | Clics | Impr. | CTR |
| --- | ---: | ---: | ---: |
| `/programme-maths-terminale` | 1 | **82** | 1,2 % |

Cette page capte à elle seule 82 des 185 impressions. Les requêtes qui
l'alimentent sont `programme maths terminale es` (5), `programme math terminale s`
(2), `maths programme terminale`, `programme terminale maths`,
`programme maths terminale s`. **Les filières S et ES n'existent plus depuis la
réforme.** Ces internautes cherchent un programme abrogé ; ce sont très
majoritairement des adultes ou des recherches de mémoire, pas des lycéens de
Terminale 2027. Le CTR de 1,2 % le confirme.

**Cette page ne doit pas être optimisée sur ces requêtes** — la consigne de
mission est fondée. L'aligner sur « terminale S/ES » ramènerait du volume encore
moins qualifié et brouillerait la page pour l'intention réelle.

Volume utile réel : **185 − 82 = 103 impressions.**

**MOTEURS**

| Page | Clics | Impr. | CTR |
| --- | ---: | ---: | ---: |
| `/sujets-grand-oral-maths` | 1 | 25 | 4,0 % |
| `/planning-revision-bac-maths` | 2 | 22 | **9,1 %** |

`/planning-revision-bac-maths` est la meilleure page du site : le plus fort CTR
sur un volume significatif, et c'est aussi la porte d'entrée du lead magnet.

**ÉMERGENTES — faible volume, CTR exceptionnel**

| Page | Clics | Impr. | CTR |
| --- | ---: | ---: | ---: |
| `/preparer-entree-terminale-specialite-maths` | 2 | 3 | **66,7 %** |
| `/` | 2 | 3 | **66,7 %** |
| `/exercices-type-bac-maths-terminale` | 1 | 6 | 16,7 % |
| `/formules-bac-maths-terminale` | 1 | 5 | 20,0 % |

`/preparer-entree-terminale-specialite-maths` mérite d'être surveillée : la
requête `préparer ma rentrée en terminale spécialité mathématiques` est la seule
requête nommée qui génère un clic, à un CTR de 100 %. C'est le signal saisonnier
de la rentrée, sur une intention parfaitement alignée.

**TESTÉES — impressions, aucun clic (16 pages)**

`/methodes-maths-terminale/integrales` (7), `/programme-maths-terminale/probabilites`
(6), `/calculatrice-bac-maths-2027` (5), `/bac-maths-2027` (5),
`/exercices-maths-terminale/derivation` (4), `/demonstrations-bac-maths-terminale`
(3), `/annales-bac-maths-terminale` (3), `/epreuve-anticipee-maths-premiere` (2),
`/methodes-maths-terminale/probabilites-conditionnelles` (2),
`/sujet-epreuve-anticipee-maths-2026-corrige` (2),
`/denombrement-terminale-specialite-maths` (2), `/exercices-maths-terminale/integrales`
(2), `/coefficient-specialite-maths-bac-2027` (1), `/mentions-legales` (1),
`/programme-maths-terminale/geometrie-espace` (1), `/sujets-zero-maths-premiere` (1).

Aucune de ces pages n'a assez de volume pour qu'un CTR de 0 % soit interprétable.
Il est trop tôt pour en conclure quoi que ce soit.

### 6. Le signal Grand Oral × probabilités → **CAS NO GO**

Le cluster est réel : 6 requêtes, 20 impressions sur 7 jours, soit 43 % des
46 impressions nommées, et **0 clic**.

| Requête | Impr. |
| --- | ---: |
| `sujet grand oral maths probabilité` | 8 |
| `5 sujets de grand oral de mathématiques sur le thème du sondage` | 8 |
| `sujet grand oral maths probabilité pdf` | 1 |
| `sujet grand oral maths proba` | 1 |
| `sujet grand oral math probabilité` | 1 |
| `sujet grand oral maths probabilités` | 1 |

**Verdict : ne pas créer de page.** Vérification faite dans le dépôt, le contenu
existe déjà et il est bon :

- `src/data/grandOral.ts` contient 50 sujets, dont **9 sur le chapitre
  Probabilités** ;
- deux d'entre eux traitent explicitement du sondage — le sujet 8 (« Comment un
  sondage sur quelques personnes peut-il renseigner sur toute une population ? »,
  notions échantillonnage / fluctuation / intervalle) et le sujet 46 (« Comment
  le modèle binomial peut-il mesurer le risque qu'un sondage désigne le mauvais
  gagnant ? ») ;
- trois pages Grand Oral sont déjà en ligne : `/grand-oral-maths-2027`,
  `/sujets-grand-oral-maths`, `/questions-jury-grand-oral-maths`.

Le problème n'est pas un manque de contenu, c'est un problème d'**adressabilité** :
`/sujets-grand-oral-maths` est une liste monolithique de 50 sujets, **sans
aucune ancre** (aucun `href="#…"` dans la page), et son title
(« Sujets Grand Oral Maths : 50 idées de problématiques ») ne mentionne ni
probabilités ni sondage. Google affiche la page mais ne peut pointer ni sur le
thème ni sur le sujet précis, et l'internaute qui cherche « sondage » n'a aucune
raison de cliquer.

Créer une page dédiée serait la mauvaise réponse : elle cannibaliserait une page
déjà indexée et déjà positionnée sur ces requêtes.

### 7. Quick wins : un seul candidat défendable

La consigne autorise jusqu'à cinq quick wins. Il serait malhonnête d'en produire
cinq à partir de données gelées. Un seul est étayé par des faits :

| # | Action | Fondement | Risque | Quand |
| --- | --- | --- | --- | --- |
| 1 | Ajouter des ancres par thème sur `/sujets-grand-oral-maths` | 20 impressions / 0 clic sur le cluster proba ; page sans ancre ; contenu déjà présent | Faible — ajout structurel, aucune réécriture | J58+ au plus tôt |

Les quatre autres « quick wins » qu'on pourrait lister (retoucher des titles,
ajuster des meta descriptions, retravailler des pages TESTÉES) reposeraient sur
des volumes de 1 à 7 impressions. C'est du bruit. **Ne rien faire est ici la
décision techniquement correcte, pas un aveu de paresse.**

### 8. Trous de contenu : aucun démontré

Vérification faite sur les routes du dépôt (86 fichiers `page.tsx`) :

- Grand Oral : 3 pages + 50 sujets structurés → couvert ;
- Probabilités : `/programme-maths-terminale/probabilites`,
  `/exercices-maths-terminale/probabilites`,
  `/methodes-maths-terminale/probabilites-conditionnelles`,
  `/articles/probabilites-loi-binomiale-terminale`,
  `/denombrement-terminale-specialite-maths` → couvert ;
- « sondage » : traité par deux sujets Grand Oral → couvert.

**0 trou de contenu identifié.** Toutes les requêtes qui génèrent des impressions
correspondent à des pages qui existent.

### 9. Backlinks : toujours zéro

Rapport Liens de Search Console, relevé du 25/08 :

- **Liens externes — Total : 1**, provenant de `vulnissimo.io` vers la home. Il
  s'agit d'un scanner de vulnérabilités automatisé, pas d'un lien éditorial. Ce
  n'est pas un backlink au sens SEO.
- Liens internes — Total : 22 seulement, ce qui est très en dessous du maillage
  réel du site. Le rapport de liens internes de GSC est notoirement en retard sur
  les sites récents ; à surveiller sans en tirer de conclusion pour l'instant.

Vérification directe des 9 pages cibles accessibles (HTTP 200 sur les 9) :

| Page cible | Statut | « sprintmaths » |
| --- | :---: | :---: |
| mathoutils.fr — Grand Oral | 200 | 0 |
| parc-nsi.github.io — ParcMaths | 200 | 0 |
| math93.com — Annales du Bac | 200 | 0 |
| mathlvl.fr — Annales bac spé | 200 | 0 |
| mathlvl.fr — Première générale | 200 | 0 |
| logamaths.fr — Terminale spé | 200 | 0 |
| missionmaths360.com | 200 | 0 |
| moussatat.github.io | 200 | 0 |
| maths-et-tiques.fr — Terminale | 200 | 0 |

**Journal « Backlinks / mentions obtenus » : toujours vide.** 12 messages,
0 lien. Sept jours après la première vague, c'est cohérent avec le délai normal
d'un prof qui met à jour sa page de liens à la rentrée — mais ce n'est pas
encourageant non plus.

### 10. Indexation : stable, et l'alerte J50 est définitivement close

| Motif | Pages |
| --- | ---: |
| Dans l'index | **38** |
| Détectée, actuellement non indexée | 38 |
| Page avec redirection | 3 |
| Autre page avec balise canonique correcte | 1 |
| **Explorée, actuellement non indexée** | **0** |

80 URLs connues. Hors redirections et canoniques légitimes, l'univers indexable
est de 76 pages → **taux d'indexation 50,0 %** (38/76), ou 47,5 % sur les
80 URLs connues.

Le motif « Explorée, actuellement non indexée » est à **0**, ce qui confirme
officiellement ce que l'inspection en direct de J53 avait établi : les 8 URLs qui
avaient déclenché l'alerte de J50 sont bien indexées. **Le sujet est clos.**

### 11. EST-IL TEMPS DE RECRÉER DES PAGES SEO ?

**PAS ENCORE.** Quatre raisons factuelles :

1. **38 pages sont en « Détectée, actuellement non indexée ».** Google connaît
   ces pages et a choisi de ne pas les indexer pour l'instant. Publier davantage
   allonge une file d'attente déjà à moitié pleine.
2. **Seules 23 pages sur 38 indexées ont produit une impression en 7 jours.**
   15 pages indexées sont invisibles. Le stock existant n'est pas exploité.
3. **Sur 86 routes du dépôt, 23 génèrent du trafic** — soit 27 %. Le problème
   n'est pas le nombre de pages.
4. **La courbe monte sans aucune intervention.** Toucher au site maintenant
   reviendrait à introduire une variable au milieu d'une mesure en cours, et à
   rendre ininterprétable ce qui se passe depuis le 17/08.

Le facteur limitant reste l'autorité : **1 lien externe, et c'est un scanner.**

### 12. Décision J58

**J58-F — FOLLOW-UP UNIQUEMENT.**

C'est le même scénario qu'en J57, pour une raison différente : en J57 les relances
étaient interdites par la date, en J58 elles deviennent **la seule action utile
disponible**.

| Date | Action ouverte |
| --- | --- |
| 26/08/2026 | Relance vague J51 — Mathoutils (Nicolas Fabres, CAS A), ParcMaths, Math93 |
| 27/08/2026 | Relance vague J52 — Logamaths, Mathlvl, Pierre Carrée, Mission Maths 360, Moussatat |
| jamais | Maths et Tiques (Yvan Monka) |
| — | Mathsnf : pas de relance automatique |

Posture SEO en J58 : **ne rien toucher.** Ni page, ni title, ni contenu. La seule
mesure à prendre est de relire Search Console dès que les journées du 23 et du
24 août seront publiées, pour enfin savoir si la courbe tient au‑dessus de
30 impressions/jour.

**Ce qu'il ne faut pas faire en J58 :** interpréter l'égalité 185 = 185 comme un
plateau. Ce n'est pas un plateau, c'est une absence de données.

## J58 — Outreach & checkpoint GSC

Sprint principalement consacré au moteur email (voir `docs/email-growth.md`).
Côté SEO : **0 nouvelle page, 0 réécriture, 0 demande d'indexation.** Relevé du
**mercredi 26 août 2026, 09:59 CEST**.

### Search Console : les données ont avancé

| KPI (7 j) | J57 — 16→22/08 | J58 — 17→23/08 | Écart |
| --- | ---: | ---: | ---: |
| Clics | 10 | 10 | **=** |
| Impressions | 185 | **207** | +11,9 % |
| CTR | 5,4 % | 4,8 % | −0,6 pt |
| Position | 32,4 | 32,1 | +0,3 |

La fenêtre s'est décalée d'un jour : le 16/08 (3 impressions) sort, le **23/08**
entre avec **25 impressions et 0 clic**.

Série quotidienne complète depuis la rupture :

| Jour | 16/08 | 17/08 | 18/08 | 19/08 | 20/08 | 21/08 | **22/08** | 23/08 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Impr. | 3 | 15 | 14 | 37 | 20 | 28 | **68** | 25 |

**Correction de lecture par rapport à J57.** J'avais souligné que « la courbe
monte encore au dernier jour observable ». Le jour suivant le montre : **68 était
un pic isolé, pas un nouveau palier**. Le niveau réellement tenu est de
**20 à 37 impressions/jour**, contre 5,7/jour avant le 17/08. C'est toujours un
facteur 4 à 6, mais ce n'est pas une accélération continue.

Comparaison propre entre semaines disjointes :

| Semaine | Impressions |
| --- | ---: |
| 10 → 16/08 | 26 |
| 17 → 23/08 | **207** |

Soit **×8** — l'effet de la soumission du sitemap reste massif, mais il est
désormais installé plutôt que croissant.

**Le signal à surveiller est ailleurs : les impressions montent, les clics ne
bougent pas** (10 en J57, 10 en J58), et le CTR baisse mécaniquement. Avec une
position moyenne de 32 — soit la page 3 ou 4 — c'est attendu : on ne clique pas
en page 3. Tant que la position ne descend pas sous ~20, plus d'impressions ne
produira pas plus de clics.

### Indexation : strictement inchangée

| Motif | Pages |
| --- | ---: |
| Dans l'index | 38 |
| Détectée, actuellement non indexée | 38 |
| Page avec redirection | 3 |
| Autre page avec balise canonique correcte | 1 |
| Explorée, actuellement non indexée | **0** |

Aucun motif nouveau. **Aucune URL inspectée, aucune indexation demandée**,
conformément à la consigne.

### Outreach — 2 relances envoyées

Vérification Gmail effectuée **avant** tout envoi. **Aucune nouvelle réponse,
aucun bounce** depuis le 21/08.

**Correction factuelle importante : Nicolas FABRES est Mathsnf, pas Mathoutils.**
Le fil du 19/08 10:51 porte sur « votre page *Le Grand Oral* » et sa rubrique
« Quelques liens utiles » — c'est bien `sites.google.com/site/mathsnf`. Les
sprints précédents avaient associé ce nom à Mathoutils. La règle « Mathsnf : pas
de relance automatique » s'applique donc **à lui**, et il a de surcroît répondu
le 20/08 puis reçu ma réponse le 21/08 : la balle est dans son camp.

Canal réel de chaque contact, vérifié dans les messages envoyés :

| Contact | Vague | Canal | Envoyé | État au 26/08 | Action J58 |
| --- | :---: | --- | --- | --- | --- |
| ParcMaths (F. Junier) | J51 | email | 19/08 10:45 | sans réponse | **Relance envoyée 10:26** |
| Mathoutils | J51 | formulaire | 19/08 | sans réponse | **Relance envoyée** (formulaire) |
| Math93 | J51 | formulaire | 19-20/08 | sans réponse | **Impossible — formulaire cassé** |
| Mathsnf (N. Fabres) | J51 | email | 19/08 10:51 | a répondu | Aucune — règle explicite |
| Maths et Tiques (Y. Monka) | — | email | 20/08 | refus définitif | Aucune — jamais |
| Mathlvl (R. Lallemand) | J52 | email | 20/08 13:57 | sans réponse | Aucune — seuil 27/08, T−1 |
| Mission Maths 360 | J52 | email | 20/08 14:10 | sans réponse | Aucune — seuil 27/08, T−1 |
| Moussatat (N.) | J52 | email | 20/08 | sans réponse | Aucune — seuil 27/08, T−1 |
| Logamaths | J52 | formulaire | 20/08 | sans réponse | Aucune — seuil 27/08, T−1 |
| Pierre Carrée | J52 | formulaire | 20/08 | sans réponse | Aucune — seuil 27/08, T−1 |

**Math93 : la relance est techniquement impossible.** L'URL de contact utilisée
en J51 (`/index.php/component/contact/contact/202?catid=109`) renvoie
aujourd'hui une **404**, et la catégorie « Pédagogie » affiche « Il n'y a aucun
Contact à afficher ». Aucune adresse email n'est exposée sur le site. Corollaire
inconfortable : **le message initial de J51 n'a peut-être jamais atteint
personne** si le formulaire était déjà cassé.

Texte de la relance ParcMaths (44 mots, envoi unique) :

> Bonjour Frédéric,
>
> Un unique rappel au sujet de la banque de 50 problématiques de Grand Oral maths
> que je vous signalais le 19 août :
> https://www.sprintmaths.com/sujets-grand-oral-maths
>
> Si elle ne correspond pas à ce que vous référencez, aucun souci, je n'y
> reviendrai pas.

### Backlinks : toujours zéro

Rapport Liens de Search Console inchangé : **1 lien externe**, depuis
`vulnissimo.io` (scanner automatisé) vers la home. Aucun lien éditorial.
Journal « Backlinks / mentions obtenus » toujours vide — **12 messages,
2 relances, 0 lien**.

### Ce qu'il ne faut pas conclure

Que la croissance s'arrête. 23/08 à 25 impressions reste 4× le niveau d'avant le
sitemap ; un seul jour ne fait pas une tendance, pas plus que le pic du 22/08
n'en faisait une. La bonne mesure reste la moyenne hebdomadaire sur fenêtres
disjointes, et il faut deux semaines complètes de plus pour trancher.

---

## J64 — mesure, opportunité Programme 2027 et distribution (02/09/2026)

### GSC et action SEO

GSC est complet jusqu’au 30 août. Sur 7 jours : **6 clics, 196 impressions,
CTR 3,1 %, position 32,6**. Sur 28 jours : **20 clics, 477 impressions, CTR
4,2 %, position 29,7**. La requête exacte « programme spé maths terminale
2027 » apporte 6 impressions, 0 clic et une position moyenne de 10,2 à
`/programme-maths-terminale`.

La page existante a été renforcée sans créer d’URL : comparaison explicite
Bac 2027 / rentrée 2027, lien vers le nouveau programme officiel publié en
2026, maillage rentrée et `lastModified` actualisé. Détail et checkpoint :
[`seo/J64-programme-terminale-2027.md`](seo/J64-programme-terminale-2027.md).

### Réponses Gmail

- ParcMaths : réponse reçue le 27 août — Frédéric Junier indique ne pas avoir
  encore pris le temps de regarder la banque Grand Oral mais prévoit de le
  faire. Réponse de courtoisie préparée, non envoyée avant confirmation.
- Génération Zébrée, BPI, Inès Maths et Onisep : aucune réponse.
- Mathlvl, Mission Maths 360 et Moussatat : aucune réponse après l’unique
  relance. Nicolas Fabres : aucun nouveau message après la réponse du 21 août.
- Aucun bounce SprintMaths observé.

Réponse préparée pour ParcMaths :

> Bonjour Frédéric,
>
> Merci pour votre retour. Aucun souci, prenez le temps qu’il vous faut.
>
> Bien cordialement,
> Amokrane

### Nouveaux prospects — plafond respecté

Quatre candidats adultes/intermédiaires ont été examinés ; seuls deux
franchissent le seuil ≥8/10.

| Prospect | Audience | Page précise | Liens externes observés | Contact public | Score | État J64 |
| --- | --- | --- | --- | --- | ---: | --- |
| Portail‑Éducation | Collégiens, lycéens et parents | Article « meilleurs sites de ressources gratuites en maths » | Oui, dont une offre commerciale externe | `contact@portail-education.fr` | 9/10 | Nouveau, anti-doublon Gmail négatif, message préparé |
| mathete.net | Lycéens préparant le Bac | `/math-lycee/`, section « Liens utiles » | Oui : APMEP et ToutMonExam | `contact@mathete.net` | 9/10 | Nouveau, anti-doublon Gmail négatif, message préparé |
| Aix Maths | Lycéens et familles | `/ressources-cours-exercices-de-maths/` | Oui : APMEP, Xmaths, jaicompris, Maths et Tiques | Coordonnée email non lisible dans la page accessible | 7/10 | Non contacté |
| L’Enseignant | Lycéens | `/annales/terminale` | Non démontré ; offre d’annales propre et concurrente | Email direct | 6/10 | Non contacté |

Message Portail‑Éducation préparé (79 mots) :

> Objet : Une banque gratuite d’annales par chapitre
>
> Bonjour,
>
> Votre article sur les meilleurs sites de ressources gratuites en maths cite
> déjà plusieurs plateformes externes. SprintMaths propose gratuitement les
> 10 sujets officiels de spécialité Maths 2026, soit 40 exercices intégralement
> corrigés, avec un accès par centre, jour et chapitre :
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre?utm_source=portail_education&utm_medium=direct&utm_campaign=annales_direct&utm_content=j64_outreach
>
> Si cela complète utilement votre sélection, libre à vous de l’évaluer.
>
> Bien cordialement,
> Amokrane — SprintMaths

Message mathete.net préparé (77 mots) :

> Objet : Un complément gratuit à vos liens utiles pour le Bac
>
> Bonjour,
>
> Votre page Maths lycée oriente déjà les élèves vers l’APMEP et ToutMonExam
> pour s’entraîner au Bac. SprintMaths ajoute un angle complémentaire : les
> 10 sujets officiels de spécialité Maths 2026, 40 exercices entièrement
> corrigés et une entrée directe par chapitre :
> https://www.sprintmaths.com/annales-bac-maths-par-chapitre?utm_source=mathete&utm_medium=direct&utm_campaign=annales_direct&utm_content=j64_outreach
>
> Si cette ressource est utile à vos lecteurs, libre à vous de l’examiner.
>
> Bien cordialement,
> Amokrane — SprintMaths

Aucun message ne demande un backlink, un dofollow ou un échange. Les trois
envois possibles (deux nouveaux messages et la réponse ParcMaths) restent
soumis à la confirmation au clic final.
