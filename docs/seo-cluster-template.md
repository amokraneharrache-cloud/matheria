# Modele cluster SEO chapitre

Objectif : creer un cluster chapitre manuel en moins de 30 minutes, sans CMS ni refonte globale. Le contenu reste dans les pages `page.tsx`; seuls les blocs stables sont factorises.

## Structure URL

Pour un chapitre `limites`, creer le triptyque :

- `/programme-maths-terminale/limites`
- `/exercices-maths-terminale/limites`
- `/methodes-maths-terminale/[methode-principale]`

Important : le slug n'est pas forcement identique sur les 3 pages. Le slug programme suit le nom du chapitre, mais les slugs exercices et methode peuvent differer (ex. cluster derivation : programme `derivation-convexite`, exercices `derivation`, methode `tableau-variation`). Figer les 3 slugs exacts AVANT de creer les routes, puis les reutiliser tels quels dans `site.ts`, le maillage et le tracking. Ne jamais deviner un slug depuis le nom du chapitre.

Ajouter ensuite les routes publiques dans `src/lib/site.ts` si elles doivent apparaitre dans le sitemap.

## Metadata a remplir

Chaque page doit definir :

- `pagePath`
- `title`
- `description`
- `metadata.alternates.canonical` avec `absoluteUrl(pagePath)`
- `metadata.openGraph` avec `title`, `description`, `url`, `siteName`, `locale: "fr_FR"`, `type: "website"`
- `metadata.robots` avec `index: true`, `follow: true`

Garder un titre unique par intention :

- programme : chapitre, notions, Bac
- exercices : exercices corriges/guides
- methode : action principale a apprendre

## Sections obligatoires

Programme chapitre :

- `ChapterHero`
- JSON-LD FAQ + breadcrumb
- importance du chapitre pour le Bac
- bloc notions ou checklist
- 2 a 4 sections de notions clés
- bloc "comment reviser"
- exercices recommandes
- CTA final diagnostic/planning/offre
- `ChapterInternalLinks`
- `FaqAccordion`

Exercices chapitre :

- `ChapterHero`
- JSON-LD FAQ + breadcrumb
- introduction des exercices guides
- 3 exercices visibles minimum
- 1 a 2 apercus verrouilles si pertinent
- bloc correction/methode
- CTA final vers type bac, methode, planning, diagnostic, offre
- `ChapterInternalLinks` en variante `cards`
- `FaqAccordion`

Methode chapitre :

- `ChapterHero`
- JSON-LD FAQ + breadcrumb
- methode en 4 a 6 etapes
- sections detaillees par etape
- exemple guide court
- bloc entrainement
- CTA offre si utile
- `ChapterInternalLinks`
- `FaqAccordion`

## CTA obligatoires

Inclure au minimum :

- hero primaire vers l'action la plus proche : exercices, type bac ou diagnostic
- hero secondaire vers une page soeur du cluster
- bande ou bloc intermediaire vers diagnostic et/ou planning
- CTA visible vers `/exercices-type-bac-maths-terminale`
- CTA ou lien visible vers `/sujets-type-bac-maths-terminale` lorsque le chapitre se prete a un sujet type bac ou a un entrainement transversal
- CTA final vers diagnostic, planning et offre Bac 2027
- maillage vers les deux autres pages du cluster

## Tracking

Toujours passer :

- `chapter`
- `level: "terminale"`
- `source_page: pagePath`
- `cta_location` explicite et stable

Reutiliser les familles existantes :

- programme : `click_chapter_exercise_cta`, `click_chapter_method_cta`, `click_chapter_planning_cta`, `click_chapter_diagnostic_cta`
- methode : `click_method_chapter_exercises`, `click_method_chapter_program`, `click_method_chapter_typebac`, `click_method_chapter_planning`, `click_method_chapter_diagnostic`
- exercices : `click_exercise_chapter_typebac`, `click_exercise_chapter_method`, `click_exercise_chapter_planning`, `click_exercise_chapter_diagnostic`, `click_exercise_chapter_offer`

Ajouter `lead_magnet: "planning_bac_maths_2027"` pour les CTA planning et `offer: "pack_revision_express_bac_2027"` pour les CTA offre.

## Maillage interne

Chaque page doit lier :

- page programme du chapitre
- page exercices du chapitre
- page methode du chapitre
- `/programme-maths-terminale`
- `/exercices-type-bac-maths-terminale`
- `/sujets-type-bac-maths-terminale` si pertinent pour le chapitre
- `/methodes-maths-terminale`
- `/bac-maths-2027`
- `/planning-revision-bac-maths`
- `/diagnostic`

Eviter les ancres orphelines : chaque nouvelle page doit recevoir au moins un lien depuis une page parent ou une page de hub.

## Checklist coherence cluster

Avant livraison d'un nouveau triptyque :

- verifier que les 3 pages du cluster pointent bien vers les 2 autres pages du meme cluster
- verifier que les blocs `ChapterInternalLinks` ne gardent pas un lien du cluster precedent sous un titre "Continuer dans le cluster ..."
- rechercher les mots du cluster precedent dans les nouvelles pages et ne conserver que les occurrences pedagogiquement justifiees
- verifier que chaque page expose les CTA planning, diagnostic et exercices type bac
- verifier que les clusters pertinents recoivent un lien ou une carte depuis `/sujets-type-bac-maths-terminale`
- verifier que les FAQ visibles et le JSON-LD FAQ utilisent la meme liste `faqItems`
- verifier que le breadcrumb JSON-LD correspond a la route et a son hub parent
- verifier au moins 3 exercices visibles sur les pages exercices
- relire les corrections mathematiques avec le chapitre cible en tete
- verifier l'unicite du H1 (un seul `ChapterHero` par page) et qu'il reste distinct du `title` meta
- verifier la coherence des valeurs numeriques d'un meme exemple repris sur plusieurs pages du cluster (ex. derivation : `f(x)=x²-4x+1` doit donner `f'=2x-4`, minimum en `x=2`, `f(2)=-3` partout ou l'exemple apparait ; `f(x)=x³-3x` doit donner `f'=3x²-3=3(x-1)(x+1)`, `f(-1)=2`, `f(1)=-2` ; logarithme : `f(x)=ln(x-2)` domaine `]2;+∞[` et `f(3)=0`, `ln(x)=2` donne `x=e²`, `g(x)=x ln x` donne `g'=ln x+1`, `f(x)=ln(x-1)` domaine `]1;+∞[`, `f'=1/(x-1)`, `f(x)=0` en `x=2`)
- pour la geometrie dans l'espace, verifier la coherence des exemples repris sur les 3 pages : pour A(1,2,3) et B(4,0,5), `AB = (3,-2,2)` ; une droite passant par A et de vecteur directeur u(2,-1,4) peut s'ecrire `x=1+2t`, `y=2-t`, `z=3+4t` ; le plan `2x-y+z-5=0` a pour vecteur normal `n=(2,-1,1)` ; A(1,2,3) ne verifie pas ce plan car `2-2+3-5=-2`
- pour toute fonction avec ln, verifier que le domaine de definition est rappele AVANT tout calcul ou substitution (interieur du ln strictement positif) : c'est le piege n°1 et il doit etre coherent entre programme, exercices et methode
- apres QA validee, mettre a jour `Clusters livres` et remplacer la recommandation suivante pour eviter de relancer un cluster deja livre

Points de vigilance specifiques aux probabilites :

- distinguer clairement `P(A∩B)`, `P(A∪B)` et la probabilite conditionnelle `P_B(A) = P(A∩B)/P(B)` avec `P(B) > 0`
- formule des probabilites totales et arbre pondere : la somme des branches issues d'un meme noeud vaut 1
- independance : `A` et `B` independants equivaut a `P(A∩B) = P(A)×P(B)` (ne pas confondre avec incompatibilite `P(A∩B)=0`)
- loi binomiale `B(n,p)` : `P(X=k) = C(n,k) p^k (1-p)^(n-k)`, esperance `np` (souvent reliee au cluster `loi-binomiale`)
- verifier la coherence numerique d'un meme arbre/tableau repris sur les 3 pages du cluster (probabilites comprises entre 0 et 1, sommes egales a 1)
- pour le cluster J9 livre, conserver la coherence des exemples suivants : `P(M)=0,6`, `P_M(P)=0,4`, `P(M∩P)=0,24`, urne avec remise `P(RR)=9/25`, `P(RB)=6/25`, loi binomiale `B(10 ; 0,3)`

## Clusters livres

- J5/J6 — Suites : `/programme-maths-terminale/suites`, `/exercices-maths-terminale/suites`, `/methodes-maths-terminale/etudier-une-suite`
- J5/J6 — Limites : `/programme-maths-terminale/limites`, `/exercices-maths-terminale/limites`, `/methodes-maths-terminale/calculer-une-limite`
- J7 — Derivation / Convexite : `/programme-maths-terminale/derivation-convexite`, `/exercices-maths-terminale/derivation`, `/methodes-maths-terminale/tableau-variation` (QA validee : structure SEO, math, maillage, lint, build OK)
- J8 — Fonction logarithme : `/programme-maths-terminale/fonction-logarithme`, `/exercices-maths-terminale/logarithme`, `/methodes-maths-terminale/logarithme` (QA validee : structure SEO, math `ln(x-2)`/`ln(x)=2`/`x ln x`/`ln(x-1)`, maillage cluster + piliers, sitemap, lint, build OK)
- J9 — Probabilites : `/programme-maths-terminale/probabilites`, `/exercices-maths-terminale/probabilites`, `/methodes-maths-terminale/probabilites-conditionnelles` (QA validee : structure SEO, math `P(M)=0,6`, `P_M(P)=0,4`, `P(M∩P)=0,24`, urne avec remise `RR=9/25`, `RB=6/25`, loi binomiale `B(10 ; 0,3)`, maillage cluster + piliers, sitemap OK)
- J10 — Geometrie dans l'espace : `/programme-maths-terminale/geometrie-espace`, `/exercices-maths-terminale/geometrie-espace`, `/methodes-maths-terminale/geometrie-espace` (QA validee : structure SEO, math `AB=(3,-2,2)`, droite `x=1+2t`, `y=2-t`, `z=3+4t`, plan `2x-y+z-5=0`, `A` non dans le plan, `n=(2,-1,1)`, maillage cluster + piliers + sujets type bac, sitemap OK)

## Recommandation J13

Prochaine action recommandee : enrichir `/sujets-type-bac-maths-terminale` avec une table de sujets par chapitre, maintenant que 6 clusters existent.

Objectif J13 :

- afficher une table scannable par chapitre : suites, limites, derivation/convexite, logarithme, probabilites, geometrie dans l'espace
- relier chaque ligne aux pages exercices, methode et programme du cluster correspondant
- indiquer le type de competence travaillee : calcul, methode, redaction, piege frequent, transversal
- garder le disclaimer explicite : sujets d'entrainement SprintMaths, pas annales officielles

## Checklist build/lint

Avant livraison :

- verifier que les contenus mathematiques n'ont pas ete modifies par inadvertance
- verifier `JsonLd` avec `faqJsonLd(faqItems)` et `breadcrumbJsonLd(...)`
- verifier les routes dans `src/lib/site.ts`
- lancer le lint cible :
  - `npx eslint src/components/marketing/ChapterSeoPage.tsx src/app/programme-maths-terminale/limites/page.tsx src/app/exercices-maths-terminale/limites/page.tsx src/app/methodes-maths-terminale/calculer-une-limite/page.tsx`
- lancer le lint complet :
  - `npm run lint`
- lancer le build :
  - `npm run build`
