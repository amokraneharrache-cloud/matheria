# RAPPORT FINAL J36 — DIAGNOSTIC ACQUISITION SEO

Date d’analyse : 23 juillet 2026  
Site audité : `https://www.sprintmaths.com`

## Journal des corrections techniques

### J36-T01 — ressource imprimable du planning indexable en doublon

- URL : `/planning-bac-maths-2027.html`
- Constat avant correction : statut `200`, aucune directive `robots`, aucune
  canonical, title identique à `/planning-revision-bac-maths`, H1 quasi
  identique et 254 mots reprenant le planning.
- Risque : Google peut indexer la ressource post-formulaire comme une seconde
  page visant la même intention que la landing qui porte déjà le trafic.
- Correction autorisée : ajouter `noindex, follow` et une canonical vers
  `/planning-revision-bac-maths`. Le contenu visible, le title et le H1 ne sont
  pas modifiés.
- État : corrigé dans le dépôt, non encore déployé. Validation locale réussie
  (`lint`, `build`, tests et contrôle des balises).

## 1. Résumé exécutif

Le faible volume d’impressions ne vient pas d’un blocage généralisé de crawl.
Le crawl du 23 juillet a trouvé 81 URL publiques concrètes : 51 URL de sitemap,
53 URL indexables et 28 URL `noindex` légitimes. Toutes répondent `200`, les 51
URL du sitemap ont une canonical cohérente, aucune URL indexable n’est orpheline
dans le graphe audité et les contenus/liens SEO sont présents dans le HTML
initial.

Le diagnostic principal est éditorial et concurrentiel :

1. Le site est très jeune. La plupart des clusters ont été créés entre fin mai
   et fin juin 2026, et les dernières optimisations J29-J31 sont postérieures ou
   contemporaines à la fenêtre GSC du 14 au 20 juillet.
2. Une seule intention est déjà validée : le planning. Il fournit un outil
   immédiatement utilisable et représente 33 des 37 impressions globales de la
   semaine, avec 2 clics.
3. Les autres pages visent surtout des requêtes génériques très disputées
   (`exercices corrigés`, `programme`, `sujets corrigés`) face à des acteurs
   disposant de nombreuses annales, PDF et exercices.
4. Plusieurs pages d’un même cluster emploient des formulations très proches
   sans partage d’intention assez net : programme, méthode, exercice et article
   peuvent se concurrencer.
5. Les sept articles les plus récents/profonds ne reçoivent souvent qu’un ou
   deux liens entrants internes distincts et sont à une profondeur 3, alors que
   la page planning reçoit environ 46 liens entrants et se trouve à profondeur 1.
6. Il manque encore deux formats à forte utilité apparente dans les SERP :
   un formulaire des formules du bac et un guide de rédaction/justifications.

Le rythme d’impressions global passe de 2,86 à 5,29 par jour, soit environ
`+85 %`. Celui de la page planning passe de 2,18 à 4,71 par jour, soit environ
`+116 %`. Ce sont des signaux encourageants, pas une preuve statistique de
croissance. Le recul apparent du CTR et de la position moyenne n’est pas
interprétable sur 37 impressions et 2 clics.

Une seule correction technique a été effectuée : le fichier imprimable du
planning, jusque-là indexable en doublon, reçoit maintenant `noindex, follow` et
une canonical vers la landing planning.

## 2. Analyse comparative GSC

### 2.1 Périmètres comparés

- Ancien export : 28 jours, du 14 juin au 11 juillet 2026.
- Nouvel export : 7 jours, du 14 au 20 juillet 2026.
- Source : exports CSV `sprintmaths-3` et `sprintmaths-4` retrouvés dans le
  dossier Téléchargements.
- Type de recherche : Web.

Les tableaux par page ne s’additionnent pas nécessairement au total de
propriété : une même recherche peut exposer plusieurs URL du site, alors que le
graphe agrégé compte au niveau propriété. Les comparaisons de rythme restent
utiles, mais les parts doivent être lues avec prudence.

### 2.2 Indicateurs globaux

| Indicateur | 28 jours | 7 jours | Rythme 28 j | Rythme 7 j | Évolution du rythme |
| --- | ---: | ---: | ---: | ---: | ---: |
| Impressions | 80 | 37 | 2,86/j | 5,29/j | +85,0 % |
| Clics | 11 | 2 | 0,39/j | 0,29/j | -27,3 % |
| CTR | 13,75 % | 5,41 % | — | — | Non concluant |
| Position moyenne pondérée | 6,95 | 8,53 | — | — | Non concluant |

Le CTR passe de 13,75 % à 5,41 % et la position pondérée calculée depuis les
lignes quotidiennes de 6,95 à 8,53. Avec seulement 37 impressions, 2 clics, un
mix pays changeant et des déploiements récents, il serait prématuré de parler de
baisse réelle.

### 2.3 Page planning

| Indicateur planning | 28 jours | 7 jours | Rythme 28 j | Rythme 7 j | Évolution du rythme |
| --- | ---: | ---: | ---: | ---: | ---: |
| Impressions | 61 | 33 | 2,18/j | 4,71/j | +116,4 % |
| Clics | 10 | 2 | 0,36/j | 0,29/j | -20,0 % |
| CTR | 16,39 % | 6,06 % | — | — | Non concluant |
| Position moyenne | 5,74 | 6,61 | — | — | Non concluant |

La hausse du rythme d’impressions est le signal le plus important. La variation
de CTR représente huit clics sur des fenêtres de durée différente ; elle ne
justifie ni changement de title ni changement de H1.

### 2.4 Pages apparues et disparues

Le nouvel export ne contient aucune page absente de l’ancien export. La page
`/exercices-maths-terminale/derivation`, vue une fois sur 28 jours, disparaît du
tableau 7 jours. C’est un événement d’une impression, pas une désindexation.

| Page | Ancien imp./clics/position | Nouveau imp./clics/position | Lecture |
| --- | --- | --- | --- |
| `/planning-revision-bac-maths` | 61 / 10 / 5,74 | 33 / 2 / 6,61 | Rythme d’impressions en hausse |
| `/` | 10 / 1 / 5,60 | 2 / 0 / 1,50 | Échantillon trop faible |
| `/exercices-type-bac-maths-terminale` | 5 / 0 / 12,80 | 2 / 0 / 26,00 | Deux impressions seulement |
| `/programme-maths-terminale/probabilites` | 5 / 0 / 15,80 | 3 / 0 / 18,33 | Signal récurrent à exploiter |
| `/mentions-legales` | 1 / 0 / 2,00 | 1 / 0 / 2,00 | Bruit de marque/navigation |
| `/methodes-maths-terminale/probabilites-conditionnelles` | 1 / 0 / 10,00 | 1 / 0 / 5,00 | Signal récurrent, minuscule |
| `/exercices-maths-terminale/derivation` | 1 / 0 / 9,00 | 0 | Disparition non significative |

### 2.5 Pays

| Pays | 28 j imp. | Part 28 j | 7 j imp. | Part 7 j | Clics 28 j / 7 j |
| --- | ---: | ---: | ---: | ---: | ---: |
| France | 25 | 31,3 % | 4 | 10,8 % | 2 / 0 |
| Tunisie | 23 | 28,8 % | 5 | 13,5 % | 6 / 1 |
| Algérie | 6 | 7,5 % | 20 | 54,1 % | 1 / 0 |
| Maroc | 5 | 6,3 % | 1 | 2,7 % | 1 / 1 |
| États-Unis | 5 | 6,3 % | 2 | 5,4 % | 0 / 0 |
| Autres | 16 | 20,0 % | 5 | 13,5 % | 1 / 0 |

Le basculement vers l’Algérie explique une partie du changement de position et
de CTR. Il révèle surtout une audience francophone internationale. À ce volume,
il ne faut ni localiser les contenus par pays ni conclure à un recul français.

### 2.6 Appareils

| Appareil | 28 j imp. / part | 7 j imp. / part | Clics 28 j / 7 j |
| --- | ---: | ---: | ---: |
| Ordinateur | 42 / 52,5 % | 20 / 54,1 % | 7 / 1 |
| Mobile | 36 / 45,0 % | 15 / 40,5 % | 4 / 1 |
| Tablette | 2 / 2,5 % | 2 / 5,4 % | 0 / 0 |

La répartition reste proche. Aucun problème d’acquisition spécifique au mobile
ou au desktop n’est démontré.

## 3. Limites des données

- Les deux fenêtres n’ont pas la même durée et ne sont pas deux semaines
  comparables.
- Les requêtes sont presque entièrement anonymisées dans les exports : une seule
  requête apparaît dans l’ancien export et aucune dans le nouveau.
- Le rapport Performance ne donne pas le statut d’indexation. Une page sans
  impression n’est pas nécessairement non indexée.
- Les positions sont des moyennes d’impressions obtenues dans des pays,
  appareils et requêtes différents.
- Les changements J29-J31 ont été déployés après ou à la fin de la période.
- Le snapshot SERP est qualitatif, non personnalisé et ne remplace pas un outil
  de volume. Aucun volume de recherche n’est avancé.

## 4. Inventaire complet des pages

Méthode : crawl du HTML public le 23 juillet, sitemap live, routes Next.js et
paramètres statiques. Le build produit 76 pages statiques ; l’expansion des 12
URL dynamiques d’exercices de l’application et de la ressource HTML porte
l’inventaire concret à 81 URL publiques. Les « entrants » sont des sources
internes distinctes observées parmi ces 81 URL ; ils sont approximatifs. La
profondeur est calculée depuis `/`.

`*` indique l’état corrigé dans le dépôt mais pas encore déployé au moment du
crawl.

| URL | Type | Title | H1 | Canonical | Index | Sitemap | Entrants approx. | Prof. | Création | GSC 28 j imp./clics | GSC 7 j imp./clics | Classe |
| --- | --- | --- | --- | --- | --- | --- | ---: | ---: | --- | ---: | ---: | :---: |
| `/` | Accueil | SprintMaths \| Réviser le brevet et le bac de maths | Prépare ta Terminale spécialité maths avant la rentrée | / | index | oui | 52 | 0 | 2026-04-27 | 10 / 1 | 2 / 0 | A |
| `/planning-revision-bac-maths` | Planning | Planning Révision Bac Maths 2027 : programme 30 jours gratuit | Planning de révision Bac Maths 2027 — 30 jours | /planning-revision-bac-maths | index | oui | 46 | 1 | 2026-05-22 | 61 / 10 | 33 / 2 | A |
| `/bac-maths-2027` | Landing examen | Bac Maths 2027 : révisions Terminale, exercices guidés et planning | Prépare ta Terminale spécialité maths avant la rentrée | /bac-maths-2027 | index | oui | 46 | 1 | 2026-05-21 | — | — | C |
| `/sujets-type-bac-maths-terminale` | Landing sujets | Sujets type Bac Maths Terminale avec corrigé guidé | Sujets type Bac Maths Terminale avec corrigé guidé | /sujets-type-bac-maths-terminale | index | oui | 30 | 1 | 2026-06-12 | — | — | C |
| `/exercices-type-bac-maths-terminale` | Landing exercices | Exercices et sujets type Bac Maths Terminale corrigés | Exercices type Bac Maths Terminale guidés étape par étape | /exercices-type-bac-maths-terminale | index | oui | 46 | 1 | 2026-05-23 | 5 / 0 | 2 / 0 | B |
| `/bac-terminale-maths` | Landing examen | Réviser le bac de maths Terminale \| Exercices guidés & méthodes — SprintMaths | Réviser le bac de maths sans s'éparpiller | /bac-terminale-maths | index | oui | 46 | 1 | 2026-05-05 | — | — | C |
| `/bac-premiere-maths` | Landing examen | Réviser le bac de maths Première \| Exercices & plan de révision — SprintMaths | Réviser le bac de maths Première sans s'éparpiller | /bac-premiere-maths | index | oui | 46 | 1 | 2026-05-05 | — | — | C |
| `/brevet-maths` | Landing examen | Réviser le brevet de maths \| Exercices, programme & progression — SprintMaths | Réviser le brevet de maths avec des chapitres clairs | /brevet-maths | index | oui | 46 | 1 | 2026-05-05 | — | — | C |
| `/programme-maths-terminale` | Programme | Programme maths Terminale \| Chapitres & priorités — SprintMaths | Programme de maths Terminale : chapitres et priorités de révision | /programme-maths-terminale | index | oui | 25 | 2 | 2026-05-05 | — | — | C |
| `/programme-maths-terminale/suites` | Programme | Suites en Terminale : programme, méthodes et exercices | Suites en Terminale : ce qu'il faut savoir pour le Bac | /programme-maths-terminale/suites | index | oui | 8 | 2 | 2026-05-27 | — | — | C |
| `/programme-maths-terminale/limites` | Programme | Limites en Terminale : programme, méthodes et exercices | Limites en Terminale : ce qu'il faut savoir pour le Bac | /programme-maths-terminale/limites | index | oui | 12 | 2 | 2026-05-27 | — | — | C |
| `/programme-maths-terminale/derivation-convexite` | Programme | Dérivation et convexité en Terminale : programme et méthodes | Dérivation et convexité en Terminale : ce qu'il faut savoir pour le Bac | /programme-maths-terminale/derivation-convexite | index | oui | 14 | 2 | 2026-05-27 | — | — | C |
| `/programme-maths-terminale/fonction-logarithme` | Programme | Fonction logarithme en Terminale : programme, méthodes et exercices | Fonction logarithme en Terminale : ce qu'il faut savoir pour le Bac | /programme-maths-terminale/fonction-logarithme | index | oui | 11 | 2 | 2026-05-27 | — | — | C |
| `/programme-maths-terminale/integrales` | Programme | Intégrales en Terminale : programme, méthodes et exercices | Intégrales en Terminale : ce qu’il faut savoir pour le Bac | /programme-maths-terminale/integrales | index | oui | 6 | 2 | 2026-05-27 | — | — | C |
| `/programme-maths-terminale/probabilites` | Programme | Probabilités en Terminale : programme, méthodes et exercices | Probabilités en Terminale : ce qu'il faut savoir pour le Bac | /programme-maths-terminale/probabilites | index | oui | 6 | 2 | 2026-05-27 | 5 / 0 | 3 / 0 | B |
| `/programme-maths-terminale/geometrie-espace` | Programme | Géométrie dans l’espace en Terminale : programme et méthodes | Géométrie dans l’espace en Terminale : ce qu’il faut savoir pour le Bac | /programme-maths-terminale/geometrie-espace | index | oui | 6 | 2 | 2026-05-27 | — | — | C |
| `/programme-maths-premiere` | Programme | Programme maths Première \| Chapitres & révision — SprintMaths | Programme de maths Première : chapitres à travailler | /programme-maths-premiere | index | oui | 10 | 2 | 2026-05-05 | — | — | C |
| `/programme-maths-brevet` | Programme | Programme maths Brevet \| Chapitres & priorités — SprintMaths | Programme de maths du brevet : chapitres et priorités | /programme-maths-brevet | index | oui | 10 | 2 | 2026-05-05 | — | — | C |
| `/methodes-maths-terminale` | Méthode | Méthodes maths Terminale \| Étapes & erreurs fréquentes — SprintMaths | Méthodes de maths Terminale pour structurer les exercices | /methodes-maths-terminale | index | oui | 21 | 2 | 2026-05-05 | — | — | C |
| `/methodes-maths-terminale/etudier-une-suite` | Méthode | Méthode pour étudier une suite en Terminale | Méthode : comment étudier une suite en Terminale | /methodes-maths-terminale/etudier-une-suite | index | oui | 4 | 2 | 2026-05-27 | — | — | C |
| `/methodes-maths-terminale/calculer-une-limite` | Méthode | Méthode pour calculer une limite en Terminale | Méthode : comment calculer une limite en Terminale | /methodes-maths-terminale/calculer-une-limite | index | oui | 4 | 2 | 2026-05-27 | — | — | C |
| `/methodes-maths-terminale/tableau-variation` | Méthode | Méthode tableau de variation en Terminale | Méthode : comment faire un tableau de variation en Terminale | /methodes-maths-terminale/tableau-variation | index | oui | 4 | 2 | 2026-05-27 | — | — | C |
| `/methodes-maths-terminale/logarithme` | Méthode | Méthode logarithme en Terminale | Méthode : comment travailler le logarithme en Terminale | /methodes-maths-terminale/logarithme | index | oui | 4 | 2 | 2026-06-11 | — | — | C |
| `/methodes-maths-terminale/probabilites-conditionnelles` | Méthode | Méthode probabilités conditionnelles en Terminale | Méthode : probabilités conditionnelles en Terminale | /methodes-maths-terminale/probabilites-conditionnelles | index | oui | 4 | 2 | 2026-06-11 | 1 / 0 | 1 / 0 | B |
| `/methodes-maths-terminale/integrales` | Méthode | Méthode intégrales en Terminale | Méthode : intégrales en Terminale | /methodes-maths-terminale/integrales | index | oui | 4 | 2 | 2026-06-11 | — | — | C |
| `/methodes-maths-terminale/geometrie-espace` | Méthode | Méthode géométrie dans l’espace en Terminale | Méthode : géométrie dans l’espace en Terminale | /methodes-maths-terminale/geometrie-espace | index | oui | 4 | 2 | 2026-06-14 | — | — | C |
| `/exercices-maths-terminale` | Exercice chapitre | Exercices maths Terminale \| Guidés type bac & chapitres — SprintMaths | Exercices de maths Terminale avec guidage et progression | /exercices-maths-terminale | index | oui | 15 | 2 | 2026-05-05 | — | — | C |
| `/exercices-maths-terminale/suites` | Exercice chapitre | Exercices Suites Terminale corrigés et guidés | Exercices sur les suites en Terminale | /exercices-maths-terminale/suites | index | oui | 5 | 2 | 2026-05-27 | — | — | C |
| `/exercices-maths-terminale/limites` | Exercice chapitre | Exercices Limites Terminale corrigés et guidés | Exercices sur les limites en Terminale | /exercices-maths-terminale/limites | index | oui | 5 | 2 | 2026-05-27 | — | — | C |
| `/exercices-maths-terminale/derivation` | Exercice chapitre | Exercices Dérivation Terminale corrigés et guidés | Exercices sur la dérivation en Terminale | /exercices-maths-terminale/derivation | index | oui | 5 | 2 | 2026-05-27 | 1 / 0 | — | B |
| `/exercices-maths-terminale/logarithme` | Exercice chapitre | Exercices Logarithme Terminale corrigés et guidés | Exercices sur le logarithme en Terminale | /exercices-maths-terminale/logarithme | index | oui | 6 | 2 | 2026-05-27 | — | — | C |
| `/exercices-maths-terminale/integrales` | Exercice chapitre | Exercices Intégrales Terminale corrigés et guidés | Exercices sur les intégrales en Terminale | /exercices-maths-terminale/integrales | index | oui | 5 | 2 | 2026-05-27 | — | — | C |
| `/exercices-maths-terminale/probabilites` | Exercice chapitre | Exercices Probabilités Terminale corrigés et guidés | Exercices sur les probabilités en Terminale | /exercices-maths-terminale/probabilites | index | oui | 5 | 2 | 2026-05-27 | — | — | C |
| `/exercices-maths-terminale/geometrie-espace` | Exercice chapitre | Exercices Géométrie dans l’espace Terminale corrigés | Exercices de géométrie dans l’espace en Terminale | /exercices-maths-terminale/geometrie-espace | index | oui | 5 | 2 | 2026-05-27 | — | — | C |
| `/articles` | Hub articles | Articles maths Terminale \| SprintMaths | Méthodes et révisions pour le bac de maths Terminale | /articles | index | oui | 45 | 2 | 2026-05-06 | — | — | C |
| `/mentions-legales` | Légal | Mentions légales \| SprintMaths | Mentions légales | /mentions-legales | index | oui | 51 | 1 | 2026-05-07 | 1 / 0 | 1 / 0 | B |
| `/cgv` | Légal | Conditions générales de vente \| SprintMaths | Conditions générales de vente | /cgv | index | oui | 51 | 1 | 2026-05-07 | — | — | C |
| `/politique-confidentialite` | Légal | Politique de confidentialité \| SprintMaths | Politique de confidentialité | /politique-confidentialite | index | oui | 51 | 1 | 2026-05-07 | — | — | C |
| `/preferences-confidentialite` | Légal | Préférences confidentialité \| SprintMaths | Préférences confidentialité | /preferences-confidentialite | index | oui | 51 | 1 | 2026-05-08 | — | — | C |
| `/remboursement` | Légal | Politique de remboursement \| SprintMaths | Politique de remboursement | /remboursement | index | oui | 51 | 1 | 2026-05-07 | — | — | C |
| `/articles/comment-reviser-bac-maths-30-jours` | Article | Comment réviser le Bac Maths en 30 jours ? \| SprintMaths | Comment réviser le Bac Maths en 30 jours ? | /articles/comment-reviser-bac-maths-30-jours | index | oui | 11 | 3 | 2026-05-24 | — | — | C |
| `/articles/reviser-bac-maths-terminale-30-jours` | Article | Réviser le bac de maths Terminale en 30 jours \| SprintMaths | Réviser le bac de maths Terminale en 30 jours | /articles/reviser-bac-maths-terminale-30-jours | index | oui | 11 | 3 | 2026-04-28 | — | — | C |
| `/articles/methode-derivee-terminale` | Article | Méthode dérivée en Terminale \| SprintMaths | Méthode dérivée en Terminale | /articles/methode-derivee-terminale | index | oui | 11 | 3 | 2026-04-28 | — | — | C |
| `/articles/etudier-variations-fonction-terminale` | Article | Étudier les variations d’une fonction en Terminale \| SprintMaths | Étudier les variations d’une fonction en Terminale | /articles/etudier-variations-fonction-terminale | index | oui | 4 | 3 | 2026-04-28 | — | — | C |
| `/articles/exponentielle-terminale-methodes` | Article | Exponentielle en Terminale : méthodes et erreurs fréquentes \| SprintMaths | Exponentielle en Terminale : méthodes et erreurs fréquentes | /articles/exponentielle-terminale-methodes | index | oui | 1 | 3 | 2026-04-28 | — | — | C |
| `/articles/logarithme-terminale-methodes` | Article | Logarithme en Terminale : méthodes et exercices \| SprintMaths | Logarithme en Terminale : méthodes et exercices | /articles/logarithme-terminale-methodes | index | oui | 1 | 3 | 2026-04-28 | — | — | C |
| `/articles/probabilites-loi-binomiale-terminale` | Article | Probabilités et loi binomiale en Terminale \| SprintMaths | Probabilités et loi binomiale en Terminale | /articles/probabilites-loi-binomiale-terminale | index | oui | 1 | 3 | 2026-04-28 | — | — | C |
| `/articles/integrales-terminale-methode` | Article | Intégrales en Terminale : méthode simple \| SprintMaths | Intégrales en Terminale : méthode simple | /articles/integrales-terminale-methode | index | oui | 2 | 3 | 2026-04-28 | — | — | C |
| `/articles/suites-recurrence-terminale` | Article | Suites et récurrence en Terminale \| SprintMaths | Suites et récurrence en Terminale | /articles/suites-recurrence-terminale | index | oui | 1 | 3 | 2026-04-28 | — | — | C |
| `/articles/limites-formes-indeterminees-terminale` | Article | Limites et formes indéterminées en Terminale \| SprintMaths | Limites et formes indéterminées en Terminale | /articles/limites-formes-indeterminees-terminale | index | oui | 1 | 3 | 2026-04-28 | — | — | C |
| `/articles/erreurs-frequentes-bac-maths-terminale` | Article | Erreurs fréquentes au bac de maths Terminale \| SprintMaths | Erreurs fréquentes au bac de maths Terminale | /articles/erreurs-frequentes-bac-maths-terminale | index | oui | 1 | 3 | 2026-04-28 | — | — | C |
| `/acces` | Tunnel | Accès SprintMaths \| SprintMaths | Accéder à SprintMaths | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/admin/codes` | Administration | Admin codes d'accès \| SprintMaths | Codes d'accès uniques | — | noindex | non | 0 | — | 2026-05-06 | — | — | E |
| `/app/bac/term-suites-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-limites-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-derivation-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-convexite-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-logarithme-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-exponentielle-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-integrales-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-probabilites-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-loi-binomiale-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-variables-aleatoires-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-geometrie-espace-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/term-equations-differentielles-1` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app/bac/sujet` | Application | Sujet type bac — note indicative | — | — | noindex | non | 0 | — | 2026-05-06 | — | — | E |
| `/app/chapitres` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-04-29 | — | — | E |
| `/app/methodes` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-05-02 | — | — | E |
| `/app` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-04-28 | — | — | E |
| `/app/plan` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-04-29 | — | — | E |
| `/app/programme` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-04-30 | — | — | E |
| `/app/progression` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-04-29 | — | — | E |
| `/app/session` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-04-28 | — | — | E |
| `/app/session/result` | Application | Espace élève \| SprintMaths | — | — | noindex | non | 0 | — | 2026-04-28 | — | — | E |
| `/bac-maths-terminale-2026` | Landing examen | Archive Bac Maths 2026 \| SprintMaths | Archive Bac Maths 2026 — pour l'offre actuelle, voir Bac Maths 2027 | /bac-maths-terminale-2026 | noindex | non | 0 | — | 2026-05-10 | — | — | E |
| `/connexion` | Tunnel | Connexion espace élève \| SprintMaths | Connexion à l'espace élève | — | noindex | non | 3 | 1 | 2026-05-02 | — | — | E |
| `/diagnostic` | Tunnel | SprintMaths \| Réviser le brevet et le bac de maths | Votre enfant prépare quel examen ? | — | index | non | 51 | 1 | 2026-04-27 | — | — | F |
| `/diagnostic/resultat` | Tunnel | Résultat du diagnostic \| SprintMaths | — | — | noindex | non | 0 | — | 2026-04-27 | — | — | E |
| `/merci` | Tunnel | Créer son accès \| SprintMaths | Votre accès SprintMaths est prêt | — | noindex | non | 2 | 2 | 2026-04-28 | — | — | E |
| `/planning-bac-maths-2027.html` | Ressource statique | Planning Révision Bac Maths 2027 : programme 30 jours gratuit | Planning de révision Bac Maths 2027 - 30 jours | /planning-revision-bac-maths* | noindex* | non | 1 | 2 | 2026-05-22 | — | — | F |

## 5. Répartition A/B/C/D/E/F

| Classe | Définition | Nombre | Pages principales |
| --- | --- | ---: | --- |
| A | Déjà porteuse de trafic | 2 | Planning et accueil |
| B | Impressions connues, aucun clic | 5 | Exercices type bac, programme probabilités, méthode probabilités conditionnelles, exercice dérivation, mentions légales |
| C | Indexable, aucune impression connue | 44 | Autres hubs, clusters, articles et pages légales |
| D | Potentiellement orpheline | 0 | Aucune URL indexable sans lien entrant observé |
| E | Archive/noindex légitime | 28 | Application, tunnel privé, admin, archive 2026 |
| F | Possible problème technique | 2 | Diagnostic et ressource HTML du planning |

## 6. Problèmes techniques éventuels

### Bloquant ou évident

Le seul défaut corrigé est le doublon indexable du planning imprimable
`/planning-bac-maths-2027.html`. Le fichier reste accessible après le formulaire,
mais il ne doit pas être une deuxième landing Google.

### À décider, sans modification J36

- `/diagnostic` est indexable, absent du sitemap, sans canonical, avec le title
  par défaut de la homepage et seulement 14 mots utiles dans le HTML initial. Ce
  n’est pas un blocage des autres pages, mais il faut décider explicitement en
  J37 s’il s’agit d’une page SEO autonome. En l’état, elle ressemble davantage à
  un tunnel interactif.
- Le `lastModified` des routes statiques du sitemap est figé au 14 juin 2026,
  alors que plusieurs pages ont été ajoutées ou modifiées ensuite. Ce signal doit
  devenir réel et maintenable, sans utiliser systématiquement la date du build.
- Le JSON-LD `WebSite` déclare une `SearchAction` vers `/?q=...`, mais le site ne
  propose pas de moteur de recherche correspondant. Il vaut mieux retirer cette
  action ou implémenter une vraie recherche, mais ce point n’empêche pas
  l’indexation.
- Le schéma `Product` est injecté sur plusieurs pages informationnelles. Il est
  valide syntaxiquement mais dilue la fonction éditoriale de ces pages ; à
  réexaminer lors d’un audit de données structurées, pas dans J36.

### Vérifications réussies

- `robots.txt` : `200`, sitemap déclaré, aucun blocage des routes SEO.
- `sitemap.xml` : `200`, XML valide, 51 URL.
- 51/51 URL du sitemap : `200`, indexables, canonical cohérente.
- 0 URL `noindex` dans le sitemap.
- 0 URL indexable sans lien entrant.
- 0 redirection sur les 81 URL canoniques auditées.
- Slash final normalisé par `308`.
- Domaine racine `https://sprintmaths.com` redirigé vers `www`.
- Liens SEO et contenus présents dans le HTML ; aucune dépendance JavaScript
  bloquante pour les pages éditoriales.
- JSON-LD Breadcrumb/FAQ présent sur les pages prévues.

## 7. Problèmes de découverte et d’indexation

La découverte technique est bonne, mais la distribution d’importance interne
est très inégale :

- planning : environ 46 sources internes, profondeur 1 ;
- hubs programme/méthodes/exercices : 15 à 25 sources, profondeur 2 ;
- pages programme par chapitre : 6 à 14 sources, profondeur 2 ;
- pages méthode : 4 sources, profondeur 2 ;
- pages exercice : 5 à 6 sources, profondeur 2 ;
- sept articles récents : souvent 1 à 2 sources, profondeur 3.

Les articles ne sont pas orphelins, mais Google reçoit un signal d’importance
beaucoup plus faible. Le hub `/articles` les liste tous ; il manque surtout des
liens contextuels depuis les pages de programme, méthode et exercice
correspondantes.

Le faible trafic est donc cohérent avec un site récent et sans autorité forte :
51 URL de sitemap ne créent pas automatiquement 51 intentions distinctes ni des
positions. Les pages doivent gagner une utilité propre, des liens internes
contextuels et du temps d’observation.

## 8. Qualité, duplication et cannibalisation

| Groupe | Pages | Risque | Diagnostic / action future |
| --- | --- | --- | --- |
| Révision 30 jours | Planning + deux articles « 30 jours » | Élevé | Trois URL répondent à presque la même question. Garder le planning pour l’outil, une seule ressource éditoriale pour la méthode, fusionner/repositionner l’autre. |
| Sujet vs exercice type bac | `/sujets-type-...` et `/exercices-type-...` | Élevé | Le title de la page exercices contient aussi « sujets ». Réserver « sujets guidés complets » à la première et « exercices par compétence » à la seconde. Ne pas modifier leurs title/H1 en J36. |
| Probabilités | Programme, méthode conditionnelle, exercices, article loi binomiale | Moyen à élevé | Deux pages ont déjà des impressions. Mapper : vue d’ensemble / procédure / entraînement / approfondissement loi binomiale. |
| Logarithme | Programme, méthode, exercices, article | Moyen à élevé | Titles proches ; l’article « méthodes et exercices » empiète sur deux pages. Repositionner l’article sur erreurs/équations avec `ln`. |
| Intégrales | Programme, méthode, exercices, article | Moyen | Même architecture, intentions encore peu différenciées. |
| Dérivation/variations | Programme, exercice, méthode tableau, deux articles | Élevé | Cinq URL peuvent viser « dérivée Terminale » ou « variations ». Il faut un rôle explicite par URL. |
| Accueil vs Bac 2027 | H1 identique | Moyen | Deux pages stratégiques ont le même H1 saisonnier. À revoir après la période de rentrée, hors J36 et sans toucher aux pages de vente maintenant. |
| Diagnostic vs accueil | Title identique | Technique/qualité | Le diagnostic hérite du title générique et n’a pas de canonical. Décider index/noindex avant d’optimiser. |

Les pages ne sont pas toutes « trop courtes », mais plusieurs hubs sont faibles
face à leur requête : programme Terminale (383 mots), programme Première
(330 mots), programme Brevet (352 mots). À l’inverse, la page sujets dépasse
4 000 mots et a été créée le 12 juin : son absence d’impressions ne justifie pas
encore une réécriture.

## 9. Pourquoi la page planning fonctionne

1. **Intention précise** : l’utilisateur cherche un ordre de travail, pas un
   énième cours général.
2. **Utilité immédiate** : planning 30 jours, variantes 15 et 7 jours,
   organisation par semaines et chapitres.
3. **Correspondance requête-réponse** : « planning », « révision », « bac
   maths », « 2027 » et « 30 jours » sont alignés dans le title, le H1 et le
   contenu.
4. **Profondeur utile** : environ 1 659 mots, mais surtout un format actionnable.
5. **Maillage fort** : profondeur 1 et environ 46 sources internes distinctes.
6. **Longue traîne intégrée** : 30 jours, 15 jours, 7 jours, par chapitre,
   erreurs fréquentes, gestion du temps.
7. **Concurrence apparente plus étroite** : la recherche exacte fait surtout
   ressortir SprintMaths et [NovelClass](https://novelclass.com/blog/reussite-brevet-bac/planning-revision-bac-maths-30-jours-pour-reussir),
   contrairement aux annales et exercices où de nombreux domaines établis
   dominent.

Principes à réutiliser : viser une tâche précise, livrer un outil ou une
checklist, couvrir des variantes dans une URL unique, rester au plus près de la
question, puis donner des liens vers programme/méthode/exercice. Il ne faut pas
dupliquer un second planning.

## 10. Opportunités de mots-clés

La concurrence est évaluée qualitativement d’après les SERP du 23 juillet.
Exemples observés : [Lumaths sur les formules](https://lumaths.com/formulaire-bac-maths),
[Ayoub et les maths sur les exercices](https://www.ayoub-et-les-maths.com/terminale/),
[Math93 sur les annales 2026](https://www.math93.com/index.php/annales-du-bac/annales-spe-maths/bac-2026),
[Bachelier sur le programme](https://bachelier.app/guides/programme-maths-terminale)
et [Éduscol sur les épreuves](https://eduscol.education.gouv.fr/5706/les-epreuves-terminales-du-baccalaureat-general).
Le nouveau programme de Terminale publié en avril 2026 n’entre en application
qu’à la rentrée 2027-2028, selon le
[Bulletin officiel](https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602919A) :
le contenu Bac 2027 doit éviter toute confusion de calendrier.

| Requête principale | Variantes | Intention | Cible | Concurrence | Utilité | Cannibalisation | Potentiel de clics | Priorité |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| planning révision bac maths | planning 30/15/7 jours, planning par chapitre | Organiser | Planning existant | Faible à moyenne | Très forte | Faible si une seule URL | Fort qualitativement | P1 |
| réviser bac maths en 30 jours | comment réviser, programme 1 mois | Méthode + organisation | Deux articles existants à consolider | Moyenne | Forte | Très élevé aujourd’hui | Fort si consolidation | P1 |
| probabilités conditionnelles Terminale exercice corrigé | arbre pondéré, loi binomiale, probabilité totale | Résoudre/s’entraîner | Cluster existant | Moyenne à forte | Forte | Moyen à élevé | Bon, signal GSC déjà présent | P1 |
| programme maths Terminale 2026-2027 | chapitres spé maths, programme Bac 2027 | S’informer/planifier | Hub programme existant | Forte | Forte | Faible | Bon | P2 |
| formules bac maths Terminale | formulaire, fiche formules, dérivées/primitives/probabilités | Mémoriser/vérifier | Nouvelle page nécessaire | Moyenne à forte | Très forte | Faible | Fort qualitativement | P2 |
| erreurs fréquentes bac maths | pièges, erreurs de calcul/rédaction | Éviter des pertes de points | Article existant | Moyenne | Très forte | Moyen | Bon | P2 |
| comment rédiger au bac maths | justifications, rédaction rigoureuse, phrases à écrire | Réussir une méthode transversale | Nouvelle page nécessaire | Moyenne | Très forte | Faible | Bon | P2 |
| fiches méthodes maths Terminale | fiches révision, méthodes par chapitre | Réviser | Hub méthodes existant | Forte | Forte | Élevé avec les articles | Moyen | P3 |
| exercices corrigés maths Terminale par chapitre | suites, limites, dérivation, probabilités | S’entraîner | Hub + pages exercices existants | Très forte | Très forte | Moyen | Moyen avant autorité | P3 |
| sujet type bac maths Terminale corrigé | annales, sujet complet, corrigé détaillé | Se tester | Page sujets existante | Très forte | Très forte | Élevé avec page exercices | Moyen, différenciation « guidé » obligatoire | P3 |

## 11. Roadmap SEO priorisée

### Priorité 1 — trois actions susceptibles de produire des impressions plus vite

| Action | Objectif | URL cible | Requête | Intervention | Effort | Résultat qualitatif attendu | Indicateur GSC |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Consolider le cluster « 30 jours » | Une URL outil + une URL conseil, sans troisième réponse concurrente | Planning + deux articles 30 jours | planning/réviser bac maths 30 jours | Repositionnement, fusion ou redirection d’un article, maillage vers le planning ; aucun changement title/H1 du planning | M | Relevance plus nette et signaux regroupés | Impressions/clics des 3 URL, requêtes par page |
| Clarifier le cluster probabilités | Transformer les premières impressions hors planning en visibilité durable | Programme, méthode conditionnelle, exercices et article binomial | probabilités conditionnelles Terminale | Carte d’intention, liens contextuels, ancres distinctes, ajustements ciblés | M | Davantage de requêtes et pages visibles | Impressions par URL, nombre de requêtes, première position < 10 |
| Renforcer les articles faibles | Faire remonter les pages à 1-2 liens entrants | 7 articles de chapitre | requêtes longues par chapitre | Liens depuis programme/méthode/exercice correspondants et depuis le hub | S à M | Découverte et importance interne accrues | Pages avec impressions, profondeur, impressions non-planning |

### Priorité 2 — contenus structurants des prochains mois

| Action | Objectif | URL cible | Requête | Intervention | Effort | Résultat qualitatif attendu | Indicateur GSC |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Renforcer le hub programme | Répondre clairement à « quels chapitres ? » et au calendrier Bac 2027 | `/programme-maths-terminale` | programme maths Terminale 2026-2027 | Enrichissement ciblé, tableau des chapitres, liens officiels, priorités | M | Plus d’impressions sur programme/chapitres | Impressions, requêtes « programme », CTR après volume |
| Créer un formulaire utile | Offrir un actif autonome absent du site | Nouvelle URL à définir en J38 | formules bac maths Terminale | Nouvelle page unique, imprimable, par thème | L | Entrée organique utilitaire et liens vers méthodes | Impressions/clics, requêtes « formule/formulaire » |
| Créer le guide de rédaction | Répondre à une douleur transversale peu couverte | Nouvelle URL à définir | comment rédiger au bac maths | Guide avec formulations, justifications et exemples | M | Longue traîne à concurrence plus accessible | Impressions, pages cliquées, requêtes « rédiger/justifier » |
| Approfondir les erreurs fréquentes | Donner une checklist actionnable par chapitre | Article erreurs existant | erreurs fréquentes bac maths | Enrichissement ciblé + liens vers méthodes | M | Meilleure autonomie de l’article | Impressions/clics de l’article, requêtes associées |

### Priorité 3 — différer

| Action | Objectif | URL cible | Requête | Intervention | Effort | Pourquoi différer | Indicateur futur |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Concurrencer les annales officielles | Couvrir des sujets réels et corrigés | Page sujets | annales bac maths corrigées | Corpus éditorial lourd et vérification des droits | XL | SERP dominée par Math93, L’Étudiant, Sujetdebac, APMEP | Autorité et impressions du cluster sujets |
| Étendre Première/Brevet | Couvrir deux autres niveaux | Hubs existants | exercices/révisions Première ou Brevet | Nouveaux clusters | XL | Diluerait l’effort Terminale avant validation | 3 pages Terminale avec clics |
| Produire en masse des pages chapitre | Augmenter le nombre d’URL | À éviter pour l’instant | variantes génériques | Création en série | XL | Le site a déjà 44 pages indexables sans impression connue | 10 pages avec impressions, Palier 1 atteint |

## 12. Trois premières actions recommandées

1. En J37, établir une carte d’intention des trois URL « 30 jours » et supprimer
   le recouvrement éditorial, sans toucher au title/H1 du planning.
2. Différencier les quatre pages probabilités et ajouter des liens contextuels
   précis, car deux URL de ce cluster ont déjà des impressions.
3. Ajouter des liens contextuels depuis les hubs/chapitres vers les sept articles
   qui n’ont aujourd’hui qu’un ou deux liens entrants.

## 13. Objectifs GSC

Ces seuils sont des objectifs de pilotage, pas des promesses.

### Palier 1

- 100 impressions par semaine ;
- 5 clics par semaine ;
- 10 pages différentes avec impressions.

### Palier 2

- 500 impressions sur 28 jours ;
- 25 clics sur 28 jours ;
- au moins 3 pages générant des clics.

### Tableau de bord minimal

À chaque relevé, conserver :

- total impressions/clics sur 7 jours et 28 jours ;
- impressions par jour ;
- nombre de pages avec impressions et avec clics ;
- part de la page planning et part des autres pages ;
- pages/requêtes nouvellement apparues ou disparues ;
- pays et appareils, sans décision sur moins de 100 impressions ;
- date de déploiement de chaque changement.

Attendre au moins 14 jours après J37 pour un premier signal et 28 jours pour une
lecture plus sérieuse. Ne pas modifier un title/H1 tous les quelques jours.

## 14. Fichiers modifiés

- `public/planning-bac-maths-2027.html` : ajout de `noindex, follow` et de la
  canonical vers la landing planning.
- `docs/seo-j36-diagnostic.md` : présent rapport.

Aucune page de vente, intégration Stripe, mesure commerciale ou prospection n’a
été modifiée. Aucun commit ni staging n’a été effectué.

## 15. Tests, lint et build

- `npm run lint` : réussi.
- `npm run build` : réussi avec Next.js 16.2.4 ; 76 pages statiques générées.
- `npm test` : réussi, 32 tests sur 32.
- Contrôle des balises du fichier imprimable : `noindex, follow` et canonical
  présentes.
- `git diff --check` : à exécuter dans la validation finale.

Les avertissements `MODULE_TYPELESS_PACKAGE_JSON` observés pendant les tests
préexistaient et ne sont pas liés à la correction SEO.

## 16. Verdict : prêt pour J37 ?

**Oui**, après déploiement de la correction technique et en gardant une mission
strictement éditoriale/maillage. Il n’y a pas de blocage technique généralisé à
résoudre avant de travailler les intentions déjà validées.

## 17. Mission recommandée pour J37

**J37 — consolidation des intentions et du maillage Terminale**

1. cartographier précisément l’intention de chaque page des clusters 30 jours,
   probabilités, dérivation et logarithme ;
2. choisir une page principale par intention et repositionner/fusionner les
   doublons éditoriaux les plus nets ;
3. ajouter des liens contextuels depuis les hubs et pages chapitre vers les
   articles à profondeur 3 ;
4. ne créer aucune nouvelle page tant que ces ajustements ne sont pas déployés ;
5. conserver les titles/H1 des pages planning et sujets conformément aux
   contraintes ;
6. relever GSC à J+14 et J+28 avec les seuils ci-dessus.

La page « formulaire des formules » devient la première création recommandée
une fois cette consolidation terminée.
