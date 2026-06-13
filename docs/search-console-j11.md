# Search Console J11 post-deploiement

Objectif : verifier dans Google Search Console que les pages SEO business
SprintMaths sont crawlables, indexables, bien reliees au sitemap et qu'elles
commencent a recevoir des impressions sur les requetes ciblees.

Ce document ne doit contenir aucun secret. Ne pas modifier les pages ou les
metadonnees pendant cette verification, sauf probleme technique bloquant
confirme.

## Pages a inspecter

Inspecter ces URLs apres deploiement Production :

- `https://www.sprintmaths.com/sujets-type-bac-maths-terminale`
- `https://www.sprintmaths.com/planning-revision-bac-maths`
- `https://www.sprintmaths.com/exercices-type-bac-maths-terminale`
- `https://www.sprintmaths.com/bac-maths-2027`
- `https://www.sprintmaths.com/sitemap.xml`

## Etapes Search Console

1. Ouvrir Google Search Console sur la propriete SprintMaths.
2. Aller dans Inspection d'URL.
3. Coller une URL de page, puis lancer l'inspection.
4. Cliquer sur "Tester l'URL en direct".
5. Verifier que Search Console indique "URL disponible pour Google".
6. Si la page est OK, demander l'indexation.
7. Refaire l'operation pour chaque page SEO listee ci-dessus.
8. Ouvrir la section Sitemaps.
9. Verifier que `https://www.sprintmaths.com/sitemap.xml` est soumis.
10. Verifier la derniere lecture du sitemap.
11. Ouvrir Indexation > Pages.
12. Verifier s'il existe des pages "Découverte actuellement non indexée" ou
    "Explorée actuellement non indexée" concernant les URLs business.

Pour le sitemap :

1. Inspecter `https://www.sprintmaths.com/sitemap.xml` dans le navigateur.
2. Verifier qu'il repond bien et contient les pages SEO business.
3. Dans Search Console > Sitemaps, verifier le statut et la date de derniere
   lecture.

## Verifications a noter

Pour chaque page inspectee, noter :

- Page indexable : oui / non.
- Canonical selectionnee par Google.
- Canonical declaree par l'utilisateur.
- Page presente dans le sitemap : oui / non.
- Derniere exploration indiquee par Search Console.
- Erreurs mobiles : oui / non, avec detail si visible.
- Enrichissements FAQ ou Breadcrumb : visibles / absents / non encore detectes.

Si une information n'est pas encore disponible, noter `Non disponible` plutot
que conclure trop vite.

## Tableau de suivi

| Page | Inspection URL OK | Test en direct OK | Indexation demandee | Canonical Google | Dans sitemap | Date demande indexation | Probleme eventuel | Action suivante |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/sujets-type-bac-maths-terminale` | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir |
| `/planning-revision-bac-maths` | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir |
| `/exercices-type-bac-maths-terminale` | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir |
| `/bac-maths-2027` | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir | A remplir |
| `/sitemap.xml` | A remplir | A remplir | Non applicable | Non applicable | Non applicable | Non applicable | A remplir | A remplir |

## Requetes a suivre dans GSC

Dans Performance > Resultats de recherche, suivre ces requetes :

- `sujet type bac maths terminale avec corrigé`
- `sujets type bac maths terminale`
- `exercice type bac`
- `exercices type bac maths terminale`
- `planning révision bac maths`
- `bac math 2027`
- `bac maths 2027`
- `réviser bac maths en 30 jours`

Pour chaque requete, regarder :

- impressions ;
- clics ;
- CTR ;
- position moyenne ;
- pages associees ;
- evolution sur 7 jours puis 14 jours.

## Regles d'interpretation

- Ne rien conclure avant 14 jours apres deploiement et demande d'indexation.
- Regarder les impressions avant les clics : une page peut etre detectee avant
  de generer du trafic.
- Interpreter le CTR seulement si le volume d'impressions est suffisant.
- Considerer la position moyenne comme instable au debut.
- Ne pas paniquer si Search Console affiche "Découverte actuellement non
  indexée" dans les premiers jours.
- Si une URL est disponible en test direct mais pas encore indexee, noter le
  statut et attendre avant de modifier la page.
- Si Google choisit une canonical differente, verifier d'abord les canonicals,
  le maillage interne et le sitemap avant de changer le contenu.

## Criteres de succes a 14 jours

La verification J+14 est consideree positive si :

- la nouvelle page `/sujets-type-bac-maths-terminale` apparait dans Search
  Console ;
- au moins 2 requetes ciblees generent des impressions ;
- `/planning-revision-bac-maths` est stable ou en hausse ;
- `/exercices-type-bac-maths-terminale` gagne des impressions ;
- aucun probleme d'indexation bloquant n'est detecte.

Un succes partiel reste acceptable si les pages sont indexables, presentes dans
le sitemap, sans erreur mobile bloquante, et que les impressions commencent a
apparaitre.

## Ne pas faire

- Ne pas soumettre les memes URLs 50 fois par jour.
- Ne pas changer les `title` ou `meta description` tous les 2 jours.
- Ne pas lancer Ads avant validation du tracking et du funnel.
- Ne pas creer de fausses annales officielles ou laisser penser que SprintMaths
  publie des sujets officiels si ce n'est pas le cas.
- Ne pas tirer de conclusion SEO definitive sur 24 ou 48 heures.

## Points de vigilance

- Search Console peut afficher des donnees avec plusieurs jours de retard.
- Les enrichissements FAQ ou Breadcrumb peuvent etre valides techniquement mais
  non affiches dans les resultats.
- Une page peut recevoir des impressions sur une requete proche, pas exactement
  sur la requete cible initiale.
- Les variations de position au lancement ne suffisent pas a justifier une
  reecriture immediate.
- Toute correction post-deploiement doit etre motivee par un probleme observe :
  canonical incoherente, page absente du sitemap, noindex involontaire, erreur
  mobile bloquante ou contenu manifestement ambigu.
