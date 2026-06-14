import type { FaqItem } from "@/lib/seo";
import type { SprintMathsEventName, TrackingParams } from "@/lib/tracking";

export type ArticleCta = {
  label: string;
  href: string;
  event: SprintMathsEventName;
  location: string;
  eventParams?: TrackingParams;
  style?: "primary" | "secondary";
};

export type ArticleList = {
  variant: "checklist" | "bullets";
  title?: string;
  items: string[];
};

export type ArticlePlanDay = {
  label: string;
  focus: string;
};

export type ArticlePlan = {
  caption?: string;
  days: ArticlePlanDay[];
};

export type ArticleLink = {
  label: string;
  href: string;
  description: string;
  cluster?:
    | "suites"
    | "limites"
    | "derivation-convexite"
    | "logarithme"
    | "probabilites"
    | "geometrie-espace";
  level?: "terminale";
};

export type ArticleSection = {
  heading: string;
  body: string[];
  plan?: ArticlePlan;
  list?: ArticleList;
  internalLinks?: ArticleLink[];
  cta?: ArticleCta;
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: "terminale" | "premiere" | "brevet";
  keywords: string[];
  publishedAt: string;
  intro?: string[];
  introCta?: ArticleCta;
  content: ArticleSection[];
  faq?: FaqItem[];
  closingCta?: ArticleCta;
  relatedLinks?: ArticleLink[];
};

export const articles: Article[] = [
  {
    slug: "comment-reviser-bac-maths-30-jours",
    title: "Comment réviser le Bac Maths en 30 jours ?",
    description:
      "Un plan concret pour réviser le Bac Maths en 30 jours : chapitres prioritaires, exercices type bac, méthode de travail et planning semaine par semaine.",
    category: "terminale",
    keywords: [
      "comment réviser le bac de maths en 30 jours",
      "réviser bac maths 30 jours",
      "planning révision bac maths",
      "réviser bac maths terminale",
      "révision bac maths terminale",
    ],
    publishedAt: "2026-05-24",
    intro: [
      "À un mois de l'épreuve, le programme de Terminale spécialité maths paraît immense : suites, dérivation, exponentielle, logarithme, intégrales, probabilités, loi binomiale, géométrie dans l'espace. Quand il reste peu de temps, beaucoup d'élèves font l'erreur de vouloir tout revoir, paniquent, et finissent par ne rien réviser à fond.",
      "Soyons clairs : en 30 jours, l'objectif n'est pas de tout revoir parfaitement. C'est impossible et inutile. L'objectif réaliste est de gagner des points en travaillant les chapitres et les méthodes les plus rentables, ceux qui reviennent dans presque tous les sujets. Réviser bac maths terminale en 30 jours, c'est d'abord structurer son travail, reprendre les méthodes clés et s'entraîner sur des exercices type bac plutôt que relire le cours sans fin.",
      "Cet article te donne un planning révision bac maths concret, jour par jour, sur quatre semaines, avec la méthode de travail à appliquer chaque jour. C'est exactement la logique de SprintMaths : de la méthode et des exercices guidés sur ton téléphone, pas un simple QCM.",
    ],
    introCta: {
      label: "Recevoir le planning Bac Maths 2027 — 30 jours",
      href: "/planning-revision-bac-maths",
      event: "click_article_planning_cta",
      location: "article_intro_planning",
      style: "primary",
    },
    content: [
      {
        heading: "Avant de commencer : ne révise pas au hasard",
        body: [
          "La pire stratégie sur 30 jours, c'est d'ouvrir le premier chapitre venu et de relire le cours en espérant que ça rentre. Tu vas passer trois jours sur un chapitre que tu maîtrises déjà, par confort, et ignorer celui qui te coûte vraiment des points. Pour réviser bac maths 30 jours efficacement, il faut d'abord savoir où tu en es.",
          "Commence par un diagnostic rapide : un test court par grand chapitre pour repérer ce qui bloque. Ensuite, classe les notions en trois catégories : à consolider, à revoir en priorité, à entretenir. Les chapitres à fort rendement au bac — suites, dérivation et variations, exponentielle, logarithme, intégrales, probabilités et loi binomiale — passent en priorité. Un planning de révision n'a de valeur que s'il part de tes vrais points faibles, pas d'une liste générique.",
        ],
      },
      {
        heading: "Semaine 1 : diagnostic, suites, dérivation et variations",
        body: [
          "La première semaine sert à reposer les bases du calcul et de l'analyse, les outils que tu vas réutiliser dans presque tous les sujets. On commence par un diagnostic, puis on enchaîne suites, limites, dérivation, tableaux de variation et convexité, avec un mini sujet type bac le septième jour pour mesurer les progrès.",
        ],
        plan: {
          caption: "Semaine 1 — bases de l'analyse",
          days: [
            { label: "Jour 1", focus: "Diagnostic rapide : repérer les chapitres faibles et fixer les priorités." },
            { label: "Jour 2", focus: "Suites : sens de variation et récurrence simple (initialisation, hérédité, conclusion)." },
            { label: "Jour 3", focus: "Limites de suites : limites de référence, suites géométriques, convergence." },
            { label: "Jour 4", focus: "Dérivation : produit, quotient, composée, dérivée de e^x et de ln." },
            { label: "Jour 5", focus: "Tableau de variation : signe de la dérivée, factorisation, lecture des extremums." },
            { label: "Jour 6", focus: "Convexité : dérivée seconde, points d'inflexion, lecture graphique." },
            { label: "Jour 7", focus: "Mini sujet type bac sur l'analyse pour faire le point sur la semaine." },
          ],
        },
        internalLinks: [
          {
            label: "Revoir le chapitre Suites en Terminale",
            href: "/programme-maths-terminale/suites",
            description: "Programme, méthodes et exercices liés au chapitre suites.",
            cluster: "suites",
            level: "terminale",
          },
          {
            label: "Revoir le chapitre Limites en Terminale",
            href: "/programme-maths-terminale/limites",
            description:
              "Méthodes de calcul, formes indéterminées et exercices liés aux limites.",
            cluster: "limites",
            level: "terminale",
          },
          {
            label: "Revoir le chapitre Dérivation et convexité en Terminale",
            href: "/programme-maths-terminale/derivation-convexite",
            description:
              "Tableaux de variation, dérivée seconde, convexité et exercices liés au chapitre.",
            cluster: "derivation-convexite",
            level: "terminale",
          },
        ],
        cta: {
          label: "Faire le diagnostic gratuit",
          href: "/diagnostic",
          event: "click_article_diagnostic_cta",
          location: "article_week1_diagnostic",
          style: "secondary",
        },
      },
      {
        heading: "Semaine 2 : logarithme, intégrales et exercices mixtes",
        body: [
          "La deuxième semaine attaque les fonctions de référence de Terminale et le calcul intégral. Le logarithme et les intégrales reviennent très souvent au bac, et ils se travaillent bien ensemble avec l'exponentielle vue en semaine 1. La fin de semaine est consacrée à des exercices mixtes et à de la correction active, c'est-à-dire refaire seul les questions ratées sans regarder le corrigé.",
        ],
        plan: {
          caption: "Semaine 2 — fonctions et calcul intégral",
          days: [
            { label: "Jour 8", focus: "Logarithme népérien : domaine, propriétés, dérivée de ln(u)." },
            { label: "Jour 9", focus: "Équations et inéquations avec ln : domaine d'abord, puis vérification des solutions." },
            { label: "Jour 10", focus: "Primitives : reconnaître les formes usuelles et vérifier en dérivant." },
            { label: "Jour 11", focus: "Intégrales : calcul avec une primitive, aire sous la courbe, ordre des bornes." },
            { label: "Jour 12", focus: "Équations différentielles : solutions du type y' = ay + b." },
            { label: "Jour 13", focus: "Exercices mixtes : fonctions, ln et intégrales dans un même énoncé." },
            { label: "Jour 14", focus: "Correction active : refaire seul les questions ratées de la semaine." },
          ],
        },
        internalLinks: [
          {
            label: "Revoir le chapitre Fonction logarithme en Terminale",
            href: "/programme-maths-terminale/fonction-logarithme",
            description:
              "Domaine, propriétés de ln, dérivée, équations et exercices liés au chapitre logarithme.",
            cluster: "logarithme",
            level: "terminale",
          },
        ],
      },
      {
        heading: "Semaine 3 : probabilités, loi binomiale et géométrie dans l'espace",
        body: [
          "La troisième semaine couvre les deux gros blocs qui restent : probabilités et géométrie dans l'espace. Ce sont des chapitres où la méthode rapporte beaucoup, parce que les questions se ressemblent d'un sujet à l'autre. Un arbre pondéré bien construit ou une justification propre de loi binomiale te font gagner des points sûrs.",
        ],
        plan: {
          caption: "Semaine 3 — probabilités et géométrie",
          days: [
            { label: "Jour 15", focus: "Probabilités conditionnelles : bien distinguer P(A∩B) et la probabilité conditionnelle." },
            { label: "Jour 16", focus: "Arbres pondérés et formule des probabilités totales." },
            { label: "Jour 17", focus: "Loi binomiale : reconnaître le schéma, calculer P(X=k), P(X≤k), l'espérance np." },
            { label: "Jour 18", focus: "Géométrie dans l'espace : vecteurs, repère, coordonnées." },
            { label: "Jour 19", focus: "Droites et plans : représentations paramétriques, équations, intersections." },
            { label: "Jour 20", focus: "Dénombrement : combinaisons et situations de comptage." },
            { label: "Jour 21", focus: "Sujet type bac mêlant probabilités et géométrie." },
          ],
        },
        internalLinks: [
          {
            label: "Revoir le chapitre Probabilités en Terminale",
            href: "/programme-maths-terminale/probabilites",
            description:
              "Probabilités conditionnelles, arbres pondérés, loi binomiale et variables aléatoires.",
            cluster: "probabilites",
            level: "terminale",
          },
          {
            label: "Revoir le chapitre Géométrie dans l'espace en Terminale",
            href: "/programme-maths-terminale/geometrie-espace",
            description:
              "Vecteurs, repérage, droites, plans et raisonnements dans l'espace.",
            cluster: "geometrie-espace",
            level: "terminale",
          },
        ],
      },
      {
        heading: "Semaine 4 : sujets type bac, erreurs fréquentes et gestion du temps",
        body: [
          "La dernière semaine ne sert pas à découvrir de nouveaux chapitres. Elle sert à stabiliser ce que tu sais déjà, refaire les exercices ratés et t'entraîner en conditions proches de l'épreuve. C'est aussi le moment de travailler la gestion du temps et la lecture des consignes, deux choses qui font perdre des points même quand le cours est su.",
        ],
        plan: {
          caption: "Semaine 4 — entraînement type bac",
          days: [
            { label: "Jour 22", focus: "Reprendre les chapitres faibles repérés au diagnostic du jour 1." },
            { label: "Jour 23", focus: "Refaire les exercices ratés des semaines 1 à 3, sans le corrigé." },
            { label: "Jour 24", focus: "Sujet type bac complet, chronométré." },
            { label: "Jour 25", focus: "Gestion du temps : répartition par exercice, questions faciles d'abord." },
            { label: "Jour 26", focus: "Erreurs fréquentes : signes, domaines, conclusions oubliées." },
            { label: "Jour 27", focus: "Sujet type bac avec corrigé guidé pour situer ses priorités de révision." },
            { label: "Jours 28 à 30", focus: "Plan léger : relire le carnet d'erreurs et les fiches méthodes, dormir." },
          ],
        },
        cta: {
          label: "Passer aux sujets type bac corrigés",
          href: "/sujets-type-bac-maths-terminale",
          event: "click_internal_subjects_typebac",
          location: "article_week4_subjects_typebac",
          eventParams: {
            intent: "sujets_type_bac",
          },
          style: "secondary",
        },
      },
      {
        heading: "La méthode quotidienne en 30 minutes",
        body: [
          "Un planning ne sert à rien sans une routine quotidienne simple à tenir. L'idée n'est pas de travailler trois heures d'affilée, mais de faire une séance courte et efficace chaque jour. Trente minutes bien utilisées, tous les jours, valent mieux qu'une journée marathon une fois par semaine.",
        ],
        list: {
          variant: "checklist",
          title: "Ta séance type de 30 minutes",
          items: [
            "5 min : relire la fiche méthode du chapitre du jour.",
            "20 min : faire un exercice type bac guidé, étape par étape.",
            "5 min : correction active — refaire la question bloquante sans le corrigé.",
            "Noter dans un carnet ce qui a bloqué, pour y revenir en semaine 4.",
          ],
        },
      },
      {
        heading: "Les erreurs à éviter pendant les 30 derniers jours",
        body: [
          "Sur la dernière ligne droite, certaines habitudes donnent l'impression de réviser sans faire vraiment progresser. Les repérer t'évite de perdre des journées entières pour rien.",
        ],
        list: {
          variant: "bullets",
          title: "À éviter absolument",
          items: [
            "Relire le cours pendant deux heures sans faire un seul exercice.",
            "Lire une correction passivement, sans la refaire soi-même.",
            "Changer de chapitre dès que ça devient un peu difficile.",
            "Ignorer les erreurs qui reviennent à chaque exercice.",
            "Ne réviser que les chapitres qu'on aime déjà.",
            "Tout repousser à la dernière semaine.",
          ],
        },
      },
      {
        heading: "Que faire si tu bloques devant les exercices ?",
        body: [
          "C'est le vrai point de blocage de la plupart des élèves : tu connais le cours, mais devant l'exercice type bac, tu ne sais pas par où commencer. Relire le cours une fois de plus n'y change rien, parce que le problème n'est pas la connaissance, c'est la méthode de résolution.",
          "La solution, c'est de t'entraîner sur des exercices guidés qui te montrent l'enchaînement attendu : identifier la forme, choisir la méthode, calculer, conclure. À force de voir le raisonnement décomposé étape par étape, tu finis par le reproduire seul. C'est précisément ce que propose SprintMaths : des exercices type bac guidés sur ton téléphone, avec la méthode, pas un simple QCM.",
        ],
        cta: {
          label: "Essayer un exercice type bac guidé",
          href: "/exercices-type-bac-maths-terminale",
          event: "click_article_typebac_cta",
          location: "article_blocage_typebac",
          style: "primary",
        },
      },
      {
        heading: "Planning gratuit Bac Maths 2027",
        body: [
          "Pour suivre ce plan sans avoir à le réorganiser toi-même, récupère le planning révision bac maths gratuit. Il reprend les 30 jours, chapitre par chapitre, avec la séance quotidienne à appliquer. Tu n'as plus qu'à le suivre et à cocher au fur et à mesure.",
        ],
        cta: {
          label: "Recevoir le planning Bac Maths 2027 — 30 jours",
          href: "/planning-revision-bac-maths",
          event: "click_article_planning_cta",
          location: "article_planning_section",
          style: "primary",
        },
      },
    ],
    faq: [
      {
        question: "Peut-on vraiment réviser le bac de maths en 30 jours ?",
        answer:
          "Oui, à condition de viser juste. En 30 jours, on ne revoit pas tout le programme parfaitement, mais on peut structurer son travail, reprendre les méthodes clés et s'entraîner sur des exercices type bac. C'est largement suffisant pour gagner des points, surtout sur les chapitres qui reviennent souvent.",
      },
      {
        question: "Quels chapitres prioriser ?",
        answer:
          "Les chapitres à fort rendement : suites et récurrence, dérivation et variations, exponentielle, logarithme, intégrales, probabilités et loi binomiale, géométrie dans l'espace. Le diagnostic du jour 1 sert justement à ajuster ces priorités à ton niveau réel.",
      },
      {
        question: "Combien de temps travailler par jour ?",
        answer:
          "Une séance courte et régulière vaut mieux qu'une journée marathon isolée. Trente à quarante-cinq minutes par jour, avec un exercice et une correction active, suffisent si tu sais exactement quoi travailler. La régularité compte plus que la durée.",
      },
      {
        question: "Faut-il faire des annales ?",
        answer:
          "Travailler des sujets type bac est indispensable à partir de la troisième semaine, pour apprendre à enchaîner les exercices et gérer le temps. L'important n'est pas la quantité, mais de corriger chaque erreur et de refaire ce qui a bloqué.",
      },
      {
        question: "Que faire si je bloque devant les exercices ?",
        answer:
          "Le blocage vient presque toujours de la méthode de résolution, pas du cours. Entraîne-toi sur des exercices guidés qui décomposent l'enchaînement attendu, étape par étape. À force de voir le raisonnement, tu finis par le reproduire seul.",
      },
      {
        question: "SprintMaths remplace-t-il un professeur ?",
        answer:
          "Non. SprintMaths est un outil de méthode et d'entraînement : planning, diagnostic et exercices type bac guidés sur téléphone. Il aide à structurer les révisions et à installer de bons réflexes, mais ne remplace ni un professeur ni une correction personnalisée.",
      },
    ],
    closingCta: {
      label: "Voir le Pack Révision Express",
      href: "/bac-maths-2027#offre",
      event: "click_article_offer_cta",
      location: "article_closing_offer",
      style: "primary",
    },
    relatedLinks: [
      {
        label: "Bac Maths 2027 : le Pack Révision Express",
        href: "/bac-maths-2027",
        description: "Méthode, exercices guidés et plan de révision pour préparer l'épreuve.",
      },
      {
        label: "Programme de maths Terminale",
        href: "/programme-maths-terminale",
        description: "Tous les chapitres de la spécialité, pour situer chaque notion.",
      },
      {
        label: "Méthodes de maths Terminale",
        href: "/methodes-maths-terminale",
        description: "Les fiches méthode chapitre par chapitre.",
      },
      {
        label: "Exercices de maths Terminale",
        href: "/exercices-maths-terminale",
        description: "S'entraîner avec des exercices ciblés et corrigés.",
      },
    ],
  },
  {
    slug: "reviser-bac-maths-terminale-30-jours",
    title: "Réviser le bac de maths Terminale en 30 jours",
    description:
      "Un plan réaliste pour organiser 30 jours de révision en maths Terminale, travailler les chapitres prioritaires et éviter les révisions dispersées.",
    category: "terminale",
    keywords: ["bac maths Terminale", "révisions 30 jours", "planning bac", "méthodes Terminale"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Commencer par un bilan honnête",
        body: [
          "Réviser le bac de maths Terminale en 30 jours ne veut pas dire reprendre tout le programme à la même intensité. La première étape consiste à identifier les chapitres qui rapportent régulièrement des points et ceux qui bloquent vraiment : suites, dérivation, limites, exponentielle, logarithme, probabilités, intégrales ou géométrie dans l'espace. Un élève gagne souvent du temps quand il arrête de réviser au hasard et qu'il accepte de regarder précisément ce qui lui coûte des points.",
          "Le bilan doit rester simple. Il suffit de faire une session courte par chapitre, de noter les erreurs et de classer les notions en trois catégories : à consolider, à revoir en priorité, à entretenir. Cette méthode évite l'effet tunnel où l'on passe deux semaines sur un chapitre rassurant sans toucher les points faibles. Sur SprintMaths, le diagnostic et la progression par session servent justement à transformer ce bilan en plan de travail concret.",
        ],
      },
      {
        heading: "Construire une routine sur quatre semaines",
        body: [
          "La première semaine peut être consacrée aux automatismes : calculs de dérivées, lecture de signes, limites de référence, propriétés de l'exponentielle et du logarithme. L'objectif n'est pas de faire des exercices très longs, mais de retrouver de la fluidité. Un créneau de 25 à 35 minutes par jour suffit si l'élève sait exactement quoi travailler et corrige ses erreurs tout de suite.",
          "La deuxième semaine doit introduire davantage de raisonnement. On alterne une fiche méthode, un exercice guidé et une courte session de questions ciblées. Par exemple, une journée peut porter sur les variations d'une fonction, la suivante sur une suite récurrente, puis une autre sur une loi binomiale. Cette alternance rend les révisions moins lourdes et évite de confondre compréhension du cours et capacité à résoudre un exercice complet.",
        ],
      },
      {
        heading: "Passer progressivement aux sujets type bac",
        body: [
          "À partir de la troisième semaine, il devient utile de travailler des entraînements type bac guidés. Le but n'est pas de chercher une copie parfaite, mais d'apprendre à enchaîner plusieurs exercices, à gérer son attention et à repérer les chapitres qui reviennent dans des contextes différents. Une note indicative sur 20 peut aider, à condition de l'utiliser comme un repère de progression et non comme une prédiction.",
          "Un bon entraînement type bac doit couvrir plusieurs familles de questions : suites ou probabilités, fonctions et dérivation, limites ou logarithme, puis intégrales, géométrie ou loi binomiale. Après chaque sujet, l'élève devrait écrire deux choses : ce qui a bien fonctionné et ce qu'il faut retravailler avant le prochain essai. Cette trace courte transforme la correction en vraie stratégie de révision.",
        ],
      },
      {
        heading: "Garder une dernière semaine utile",
        body: [
          "La dernière semaine ne sert pas à tout découvrir. Elle sert à stabiliser les méthodes, refaire les erreurs fréquentes et consolider les chapitres qui reviennent souvent. Il vaut mieux refaire trois exercices mal maîtrisés que lire dix pages de cours sans entraînement. Les fiches méthodes sont particulièrement utiles à ce moment-là, parce qu'elles rappellent les étapes de résolution sans noyer l'élève dans les détails.",
          "Il faut aussi prévoir des révisions plus légères la veille d'un contrôle ou d'une épreuve. Relire les erreurs, refaire un tableau de signes, revoir les propriétés de ln ou de e^x, puis s'arrêter avant saturation. Un planning de 30 jours réussi est un planning qui laisse de la place au sommeil, aux autres matières et aux imprévus. La régularité compte plus qu'une journée marathon isolée.",
        ],
      },
    ],
  },
  {
    slug: "methode-derivee-terminale",
    title: "Méthode dérivée en Terminale",
    description:
      "Comprendre comment calculer une dérivée en Terminale, choisir la bonne formule et utiliser le résultat dans une étude de fonction.",
    category: "terminale",
    keywords: ["dérivée Terminale", "méthode dérivation", "étude de fonction", "bac maths"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Identifier la forme de la fonction",
        body: [
          "Avant de calculer une dérivée en Terminale, il faut reconnaître la structure de la fonction. Est-ce une somme, un produit, un quotient, une composée simple, une exponentielle multipliée par un polynôme ? Cette étape paraît évidente, mais beaucoup d'erreurs viennent d'une formule appliquée trop vite. Un produit comme (2x + 1)e^x ne se dérive pas en dérivant seulement le premier facteur.",
          "La bonne habitude consiste à nommer les morceaux. On pose par exemple u(x) = 2x + 1 et v(x) = e^x, puis on écrit la formule avant de remplacer. Ce petit détour rend le calcul plus lisible et limite les oublis. Dans une copie, cela montre aussi le raisonnement : l'élève ne sort pas une expression de nulle part, il applique une méthode identifiable.",
        ],
      },
      {
        heading: "Appliquer la formule sans perdre le signe",
        body: [
          "Les formules les plus fréquentes sont celles de la somme, du produit et du quotient. Pour un produit, (uv)' = u'v + uv'. Pour un quotient, il faut garder l'ordre u'v - uv' au numérateur. Les erreurs de signe sont fréquentes, surtout lorsque le dénominateur ou le facteur contient déjà un moins. Une ligne de calcul propre vaut souvent plus qu'un résultat mental approximatif.",
          "Après application de la formule, il faut simplifier intelligemment. Avec l'exponentielle, on factorise souvent par e^x, car e^x est strictement positif. Avec un polynôme, on cherche parfois à factoriser pour étudier le signe. La dérivée n'est donc pas seulement un calcul : elle prépare l'étape suivante, qui est généralement le tableau de variations ou l'étude d'un extremum.",
        ],
      },
      {
        heading: "Relier la dérivée aux variations",
        body: [
          "En Terminale, calculer f'(x) ne suffit presque jamais. Le résultat sert à déterminer où la fonction est croissante ou décroissante. Pour cela, on étudie le signe de f'(x) sur l'ensemble de définition. Si f'(x) est positive sur un intervalle, f est croissante sur cet intervalle ; si elle est négative, f est décroissante. Cette traduction doit devenir un réflexe.",
          "Le tableau de variations doit rester cohérent avec les limites et les valeurs particulières. Par exemple, si la dérivée change de signe en x = 1, il faut calculer f(1) pour placer l'extremum. Si l'exercice demande une équation ou une inéquation ensuite, le tableau de variations devient un outil pour justifier le nombre de solutions ou comparer des valeurs.",
        ],
      },
      {
        heading: "S'entraîner avec des exercices courts",
        body: [
          "La dérivation se travaille très bien par répétition ciblée. Il vaut mieux faire cinq calculs variés et corrigés qu'un seul exercice trop long sans retour précis. On peut alterner polynômes, produits avec e^x, quotients rationnels et fonctions utilisant ln. À chaque fois, l'élève doit se demander quelle formule il choisit et pourquoi.",
          "Une fois les calculs plus sûrs, les exercices guidés type bac permettent de replacer la dérivée dans un raisonnement complet. L'objectif est de passer du geste technique à la méthode : dériver, factoriser, étudier un signe, dresser un tableau et conclure. C'est cette chaîne complète qui rend la dérivée vraiment utile pour le bac de maths Terminale.",
        ],
      },
    ],
  },
  {
    slug: "etudier-variations-fonction-terminale",
    title: "Étudier les variations d’une fonction en Terminale",
    description:
      "Une méthode claire pour étudier les variations d'une fonction en Terminale : domaine, dérivée, signe, tableau et conclusion.",
    category: "terminale",
    keywords: ["variations fonction Terminale", "tableau de variations", "dérivée", "méthode bac maths"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Ne pas sauter le domaine de définition",
        body: [
          "L'étude des variations commence toujours par l'ensemble de définition. Cette étape est indispensable avec les quotients, les logarithmes, les racines ou certaines expressions composées. Si une valeur est interdite, elle doit apparaître dans le raisonnement et dans le tableau. Oublier le domaine peut conduire à annoncer une variation sur un intervalle où la fonction n'existe pas.",
          "Même lorsque le domaine semble évident, l'écrire clarifie le reste. Pour une fonction définie sur R, la suite sera plus directe. Pour une fonction avec ln(x - 2), on travaillera sur ]2 ; +∞[. Pour un quotient, on exclut les zéros du dénominateur. Cette rigueur évite des erreurs de signe et rend la conclusion plus solide.",
        ],
      },
      {
        heading: "Calculer puis factoriser la dérivée",
        body: [
          "La dérivée donne l'information principale sur les variations. Après le calcul, il faut chercher une forme qui permet d'étudier son signe. Une dérivée développée n'est pas toujours la plus utile. Factoriser par e^x, mettre un dénominateur au carré en évidence ou isoler un facteur affine peut rendre le tableau de signes beaucoup plus simple.",
          "Un bon réflexe consiste à entourer les facteurs dont le signe est connu. Par exemple, e^x est toujours positif, un carré est positif ou nul, et un dénominateur au carré ne change pas le signe sauf aux valeurs interdites. L'étude se concentre alors sur les facteurs restants. Cette façon de lire la dérivée fait gagner du temps et réduit les erreurs.",
        ],
      },
      {
        heading: "Construire un tableau lisible",
        body: [
          "Le tableau de variations doit montrer les intervalles, le signe de la dérivée et le sens de variation de la fonction. Il ne sert pas seulement à décorer la copie. Il organise les informations et permet de répondre aux questions suivantes : existence d'un minimum, nombre de solutions, comparaison de valeurs, comportement aux bornes.",
          "Pour qu'il soit utile, le tableau doit inclure les valeurs critiques dans le bon ordre. Si la dérivée s'annule en -1 et 3, ces deux nombres doivent apparaître sur la ligne des x. Si une valeur est interdite, on la marque clairement. Ensuite, on place les flèches de croissance ou de décroissance en cohérence avec le signe de f'.",
        ],
      },
      {
        heading: "Conclure avec des phrases mathématiques",
        body: [
          "Une étude de variations ne se termine pas par un tableau abandonné. Il faut écrire la conclusion : la fonction est croissante sur tel intervalle, décroissante sur tel autre, elle admet éventuellement un minimum ou un maximum en une valeur précise. Cette phrase montre que l'élève a compris ce que le tableau raconte.",
          "Dans un entraînement type bac, la conclusion sert souvent à préparer la question suivante. Si le tableau montre qu'une fonction est strictement croissante et change de signe, on peut justifier l'existence et l'unicité d'une solution. L'enjeu n'est donc pas seulement de remplir une méthode, mais d'utiliser les variations pour raisonner.",
        ],
      },
    ],
  },
  {
    slug: "exponentielle-terminale-methodes",
    title: "Exponentielle en Terminale : méthodes et erreurs fréquentes",
    description:
      "Les réflexes essentiels sur l'exponentielle en Terminale : dérivation, signe, limites, équations et erreurs à éviter.",
    category: "terminale",
    keywords: ["exponentielle Terminale", "e^x", "méthode exponentielle", "bac maths Terminale"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Connaître les propriétés vraiment utiles",
        body: [
          "L'exponentielle est un chapitre central en Terminale parce qu'elle intervient dans les études de fonctions, les équations, les limites et parfois les modèles d'évolution. La propriété la plus importante à garder en tête est e^x > 0 pour tout réel x. Cette simple information simplifie de nombreux tableaux de signes : le signe d'un produit avec e^x dépend souvent de l'autre facteur.",
          "Il faut aussi maîtriser la dérivée de e^x, qui est encore e^x, et les règles de calcul comme e^{a+b} = e^a e^b. Ces propriétés ne doivent pas être récitées seules : elles servent à transformer les expressions. Par exemple, factoriser e^x dans une dérivée permet de rendre le signe beaucoup plus lisible.",
        ],
      },
      {
        heading: "Faire attention aux limites",
        body: [
          "Les limites avec l'exponentielle demandent un peu de méthode. En +∞, e^x croît très vite, ce qui conduit souvent à une limite infinie lorsqu'elle est multipliée par un facteur polynomial positif. En -∞, e^x tend vers 0, et les produits comme x e^x peuvent aussi tendre vers 0 par croissance comparée.",
          "Une erreur fréquente consiste à remplacer mentalement e^x par un nombre positif sans regarder la borne. Or le comportement en +∞ et en -∞ n'a rien à voir. Il faut écrire les limites des facteurs, repérer les formes indéterminées et utiliser les résultats de cours quand ils sont nécessaires. Cette rigueur rend les conclusions plus fiables.",
        ],
      },
      {
        heading: "Résoudre les équations avec ordre",
        body: [
          "Pour résoudre une équation avec l'exponentielle, l'objectif est souvent de revenir à une égalité d'exposants ou d'utiliser le logarithme lorsque le nombre est positif. Par exemple, e^{2x} = 5 conduit à 2x = ln(5). En revanche, une équation comme e^x = -3 n'a pas de solution réelle, car e^x est toujours strictement positif.",
          "Dans les inéquations, il faut se souvenir que l'exponentielle est strictement croissante. Cela permet de conserver le sens de l'inégalité quand on compare les exposants. Le piège n'est donc pas seulement technique : il faut vérifier que les transformations respectent le domaine et les propriétés de la fonction.",
        ],
      },
      {
        heading: "Relier exponentielle et étude de fonction",
        body: [
          "Au bac de maths Terminale, l'exponentielle apparaît souvent dans une fonction à étudier. On calcule la dérivée, on factorise, on étudie un signe, puis on dresse le tableau de variations. Une fonction comme (x - 2)e^x devient plus accessible quand on sait que le signe de la dérivée dépend d'un facteur simple après factorisation.",
          "Pour progresser, l'élève doit donc s'entraîner sur des exercices complets et pas seulement sur des calculs isolés. Les exercices guidés sont utiles pour apprendre à choisir le bon outil au bon moment : dériver, utiliser e^x > 0, traiter une limite, puis conclure. C'est cette succession de décisions qui rend le chapitre plus solide.",
        ],
      },
    ],
  },
  {
    slug: "logarithme-terminale-methodes",
    title: "Logarithme en Terminale : méthodes et exercices",
    description:
      "Méthode pour travailler le logarithme népérien en Terminale : domaine, propriétés, équations, dérivation et erreurs fréquentes.",
    category: "terminale",
    keywords: ["logarithme Terminale", "ln Terminale", "équation logarithme", "méthode bac maths"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Commencer par le domaine",
        body: [
          "Avec le logarithme népérien, la première règle est simple : l'intérieur du ln doit être strictement positif. Pourtant, c'est l'une des erreurs les plus fréquentes en Terminale. Avant de résoudre ln(x - 1) + ln(x + 2) = ln(4), il faut écrire x - 1 > 0 et x + 2 > 0, puis garder l'intersection des conditions.",
          "Cette étape évite d'accepter des solutions impossibles à la fin. Elle aide aussi à comprendre sur quel intervalle on étudie une fonction contenant un logarithme. Un tableau de variations sur un mauvais domaine peut rendre toute la suite fausse. Le domaine n'est donc pas une formalité : c'est la fondation du raisonnement.",
        ],
      },
      {
        heading: "Utiliser les propriétés sans les déformer",
        body: [
          "Les propriétés ln(a) + ln(b) = ln(ab) et ln(a) - ln(b) = ln(a/b) sont très utiles, mais seulement lorsque a et b sont strictement positifs. Une erreur classique consiste à écrire ln(a) + ln(b) = ln(a + b), ce qui est faux. Pour progresser, il faut s'habituer à justifier chaque transformation.",
          "Dans une équation, regrouper les logarithmes peut permettre d'obtenir ln(A) = ln(B), puis A = B. Mais cette étape doit rester liée au domaine établi au départ. Après résolution de l'équation obtenue, on vérifie les solutions. Cette vérification n'est pas optionnelle, car certaines racines algébriques peuvent sortir du domaine.",
        ],
      },
      {
        heading: "Dériver les fonctions avec ln",
        body: [
          "La dérivée de ln(x) est 1/x sur ]0 ; +∞[. Pour une expression composée comme ln(u(x)), la dérivée est u'(x)/u(x), lorsque u(x) est strictement positif. Cette formule revient souvent dans les études de fonctions. Là encore, nommer u et calculer u' séparément aide à éviter les erreurs.",
          "Une fois la dérivée obtenue, on cherche une forme exploitable pour le signe. Le dénominateur peut être positif grâce au domaine, ce qui réduit l'étude au numérateur. Cette lecture est très importante dans les exercices type bac : elle permet de passer du calcul à une conclusion sur les variations.",
        ],
      },
      {
        heading: "S'entraîner sur des cas variés",
        body: [
          "Le logarithme ne se maîtrise pas en lisant seulement le cours. Il faut résoudre des équations, déterminer des domaines, dériver des expressions et traiter des limites simples. Chaque type d'exercice révèle un piège différent. Les erreurs doivent être notées clairement : domaine oublié, propriété mal appliquée, solution non vérifiée.",
          "Dans un plan de révision Terminale, le logarithme gagne à être travaillé avec l'exponentielle, car les deux fonctions se répondent. Les entraînements guidés permettent de revoir cette relation progressivement. L'élève apprend à choisir entre transformer avec ln, utiliser l'exponentielle ou revenir au domaine avant de calculer.",
        ],
      },
    ],
  },
  {
    slug: "probabilites-loi-binomiale-terminale",
    title: "Probabilités et loi binomiale en Terminale",
    description:
      "Comprendre les probabilités conditionnelles, les arbres pondérés et la loi binomiale pour les exercices de maths Terminale.",
    category: "terminale",
    keywords: ["probabilités Terminale", "loi binomiale", "arbre pondéré", "bac maths"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Traduire l'énoncé en événements",
        body: [
          "En probabilités, la difficulté vient souvent de la traduction de l'énoncé. Il faut nommer les événements, repérer les pourcentages et distinguer une probabilité simple d'une probabilité conditionnelle. Dire que 5 % des pièces venant de la machine A sont défectueuses ne signifie pas P(D) = 0,05, mais P_A(D) = 0,05.",
          "Un arbre pondéré aide à rendre cette traduction visible. Le premier niveau représente souvent un choix ou une origine, le second niveau un résultat. Les probabilités le long d'un chemin se multiplient, puis les chemins menant au même événement s'additionnent. Cette méthode donne une structure claire aux calculs.",
        ],
      },
      {
        heading: "Utiliser les probabilités totales",
        body: [
          "La formule des probabilités totales intervient quand un événement peut se produire par plusieurs chemins. Si D peut arriver depuis A ou depuis B, on calcule P(A ∩ D) et P(B ∩ D), puis on additionne. Cette logique est plus facile à comprendre avec l'arbre qu'avec une formule isolée.",
          "Les erreurs fréquentes consistent à additionner trop tôt ou à confondre intersection et conditionnement. P(A ∩ D) se calcule avec P(A) × P_A(D), pas avec P(A) + P_A(D). Prendre le temps d'écrire le chemin complet évite beaucoup de confusions et rend la correction plus lisible.",
        ],
      },
      {
        heading: "Reconnaître une loi binomiale",
        body: [
          "La loi binomiale apparaît lorsqu'on répète une même épreuve de Bernoulli de manière identique et indépendante. Il faut définir le succès, sa probabilité p, le nombre de répétitions n, puis la variable X qui compte le nombre de succès. Écrire X suit la loi binomiale de paramètres n et p fait partie de la justification.",
          "Une fois la loi reconnue, on peut calculer P(X = k), P(X ≤ k) ou P(X ≥ k) avec la calculatrice ou avec la formule. L'espérance E(X) = np donne une interprétation moyenne. Le point important est de ne pas appliquer la loi binomiale si les répétitions ne sont pas indépendantes ou si la probabilité change à chaque essai.",
        ],
      },
      {
        heading: "Relier calcul et interprétation",
        body: [
          "Un exercice de probabilités ne s'arrête pas au résultat numérique. Il faut parfois interpréter une probabilité, comparer deux situations ou expliquer pourquoi un événement est rare ou fréquent dans le modèle. Une valeur comme 0,026 doit pouvoir être lue comme 2,6 %, avec prudence et dans le contexte de l'énoncé.",
          "Pour réviser efficacement, l'élève peut alterner arbres pondérés, probabilités conditionnelles et loi binomiale. Les sujets type bac guidés sont utiles parce qu'ils obligent à choisir la bonne représentation. On apprend à ne pas lancer une formule au hasard, mais à construire le calcul depuis l'énoncé.",
        ],
      },
    ],
  },
  {
    slug: "integrales-terminale-methode",
    title: "Intégrales en Terminale : méthode simple",
    description:
      "Une méthode progressive pour calculer une intégrale en Terminale, trouver une primitive et interpréter une aire.",
    category: "terminale",
    keywords: ["intégrales Terminale", "primitive", "aire sous la courbe", "méthode bac maths"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Comprendre ce que l'on calcule",
        body: [
          "En Terminale, une intégrale peut représenter une aire algébrique, une accumulation ou simplement un calcul demandé par l'exercice. Avant de chercher une primitive, il faut lire les bornes et la fonction. Une intégrale de 0 à 1 de 3x² - 4x + 2 n'a pas le même rôle qu'une intégrale utilisée pour comparer deux courbes.",
          "Cette compréhension évite de réduire le chapitre à une recette. Le calcul reste important, mais l'interprétation l'est aussi. Lorsqu'une fonction est positive sur un intervalle, l'intégrale correspond à une aire. Si la fonction change de signe, le résultat est algébrique et demande plus de prudence dans l'interprétation.",
        ],
      },
      {
        heading: "Trouver une primitive",
        body: [
          "La méthode de base consiste à trouver une primitive F de la fonction f, puis à calculer F(b) - F(a). Pour un polynôme, on utilise les règles usuelles : une primitive de x^n est x^{n+1}/(n+1), pour n différent de -1. Il faut aussi penser à la constante, même si elle disparaît dans le calcul d'une intégrale définie.",
          "Une erreur fréquente consiste à dériver au lieu de primitiver. Pour vérifier, l'élève peut toujours dériver sa primitive : si F'(x) redonne f(x), le calcul est cohérent. Cette vérification rapide aide à repérer les coefficients oubliés, notamment quand la fonction contient un facteur devant x ou une exponentielle.",
        ],
      },
      {
        heading: "Évaluer les bornes dans le bon ordre",
        body: [
          "Une fois la primitive trouvée, on évalue d'abord la borne supérieure, puis la borne inférieure. L'ordre F(b) - F(a) doit devenir automatique. Beaucoup d'erreurs viennent d'un signe oublié lorsque F(a) contient plusieurs termes. Mettre des parenthèses au moment de soustraire est une habitude simple et efficace.",
          "Dans les exercices plus longs, le résultat d'une intégrale peut être utilisé pour calculer une aire entre deux courbes ou une valeur moyenne. Il faut alors relire la question avant de conclure. Le nombre obtenu peut être exact, décimal ou accompagné d'une unité d'aire selon le contexte.",
        ],
      },
      {
        heading: "S'entraîner avec des exercices progressifs",
        body: [
          "Pour maîtriser les intégrales, il faut commencer par des fonctions simples, puis introduire des expressions liées à l'exponentielle, au logarithme ou à des comparaisons de courbes. L'élève doit savoir reconnaître les primitives usuelles et expliquer les étapes du calcul. Un résultat juste sans méthode reste fragile.",
          "Les exercices guidés permettent de découper la démarche : identifier la fonction, choisir une primitive, appliquer les bornes, simplifier et interpréter. Dans un sujet type bac, les intégrales apparaissent souvent après une étude de fonction. Les travailler avec les variations renforce donc la cohérence des révisions.",
        ],
      },
    ],
  },
  {
    slug: "suites-recurrence-terminale",
    title: "Suites et récurrence en Terminale",
    description:
      "Méthode pour travailler les suites en Terminale : récurrence, suite auxiliaire, sens de variation et raisonnement étape par étape.",
    category: "terminale",
    keywords: ["suites Terminale", "récurrence", "suite géométrique", "bac maths"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Lire précisément la définition",
        body: [
          "Une suite peut être définie explicitement ou par récurrence. Dans le second cas, le terme u_{n+1} dépend souvent de u_n, ce qui demande une lecture attentive. Avant de calculer, il faut identifier le premier terme, la relation de récurrence et ce que la question demande : calculer des termes, montrer une propriété, étudier une limite ou transformer la suite.",
          "Les erreurs viennent souvent d'une confusion entre n et n+1. Écrire séparément u_n, u_{n+1}, puis éventuellement une suite auxiliaire v_n aide à garder les indices propres. Cette rigueur est indispensable dans les exercices où l'on doit montrer qu'une suite transformée est arithmétique ou géométrique.",
        ],
      },
      {
        heading: "Utiliser une suite auxiliaire",
        body: [
          "Dans de nombreux exercices, on pose v_n = u_n - l ou v_n = u_n - a pour faire apparaître une relation plus simple. L'objectif est souvent d'obtenir v_{n+1} = qv_n, ce qui prouve que v est géométrique. Pour y arriver, on exprime v_{n+1}, on remplace u_{n+1} par sa définition, puis on factorise.",
          "Cette méthode demande de ne pas sauter les lignes. Si v_n = u_n - 6, alors v_{n+1} = u_{n+1} - 6. Ensuite seulement, on remplace u_{n+1}. Une fois la nature de v trouvée, on peut écrire v_n explicitement, puis revenir à u_n. Le raisonnement est mécanique, mais il doit être présenté proprement.",
        ],
      },
      {
        heading: "Faire une récurrence claire",
        body: [
          "La récurrence sert à démontrer qu'une propriété est vraie pour tout entier naturel n. Elle comporte trois moments : initialisation, hérédité et conclusion. L'initialisation vérifie le premier rang. L'hérédité suppose la propriété vraie à un rang n et montre qu'elle est vraie au rang n+1. La conclusion rappelle que la propriété est donc vraie pour tous les rangs concernés.",
          "Le piège le plus courant est d'utiliser ce que l'on veut démontrer sans le dire. L'hypothèse de récurrence doit être formulée clairement. Ensuite, il faut transformer l'expression au rang n+1 en utilisant la relation de la suite et l'hypothèse. Une récurrence réussie est souvent plus une question de rédaction que de calcul compliqué.",
        ],
      },
      {
        heading: "Relier suites, limites et variations",
        body: [
          "Les suites ne sont pas isolées du reste du programme. On peut étudier leur sens de variation, leur majoration, leur convergence ou leur limite. Une suite géométrique explicite permet souvent de conclure rapidement si la raison est comprise entre -1 et 1. Pour une suite définie par récurrence, on peut avoir besoin de montrer qu'elle est monotone et bornée.",
          "Pour réviser, il est utile d'alterner calculs de termes, démonstrations par récurrence et exercices avec suite auxiliaire. Les sujets type bac guidés permettent de revoir ces enchaînements sans rester bloqué à la première étape. L'élève apprend surtout à reconnaître la stratégie attendue dans l'énoncé.",
        ],
      },
    ],
  },
  {
    slug: "limites-formes-indeterminees-terminale",
    title: "Limites et formes indéterminées en Terminale",
    description:
      "Méthode pour traiter les limites en Terminale, reconnaître les formes indéterminées et choisir la bonne transformation.",
    category: "terminale",
    keywords: ["limites Terminale", "formes indéterminées", "croissances comparées", "bac maths"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Identifier la forme de la limite",
        body: [
          "Face à une limite, la première étape consiste à remplacer mentalement la variable par la borne visée pour identifier le type de situation. Certaines limites se concluent directement par opérations. D'autres donnent une forme indéterminée comme ∞/∞, 0/0 ou ∞ - ∞. Reconnaître cette forme évite de conclure trop vite.",
          "Dire qu'une forme est indéterminée ne signifie pas que la limite n'existe pas. Cela signifie qu'il faut transformer l'expression. Pour une fraction rationnelle en l'infini, on factorise par le terme de plus haut degré. Pour une différence avec racines, on peut utiliser une expression conjuguée. Pour l'exponentielle, les croissances comparées peuvent intervenir.",
        ],
      },
      {
        heading: "Factoriser les fractions rationnelles",
        body: [
          "Dans une limite de quotient de polynômes en +∞ ou -∞, la méthode classique consiste à factoriser numérateur et dénominateur par la plus grande puissance de x. On simplifie ensuite, puis les termes comme 1/x ou 1/x² tendent vers 0. Cette démarche justifie le résultat au lieu de donner seulement une intuition.",
          "Par exemple, pour (2x² - 3x + 1)/(x² + 5), on factorise par x² en haut et en bas. Après simplification, il reste une expression qui tend vers 2/1. Cette méthode est plus robuste que de regarder seulement les coefficients dominants, car elle montre pourquoi les autres termes disparaissent.",
        ],
      },
      {
        heading: "Gérer exponentielle et logarithme",
        body: [
          "Les limites avec exponentielle et logarithme demandent de connaître quelques comportements de référence. En +∞, e^x domine les puissances de x. En +∞, ln(x) croît lentement mais tend vers +∞. En 0+, ln(x) tend vers -∞. Ces résultats doivent être utilisés dans un cadre précis, pas cités au hasard.",
          "Lorsqu'une expression mélange plusieurs fonctions, il faut chercher la transformation la plus simple : factorisation, changement d'écriture, mise en évidence d'un terme dominant. Les exercices guidés peuvent aider à apprendre ce choix. La bonne méthode n'est pas toujours la plus longue, mais elle doit être justifiée.",
        ],
      },
      {
        heading: "Conclure proprement",
        body: [
          "Une limite se conclut avec la borne, le résultat et parfois l'interprétation graphique. Si f(x) tend vers +∞, la courbe monte sans borne dans le contexte étudié. Si f(x) tend vers un réel lorsque x tend vers +∞, cela peut indiquer une asymptote horizontale. Les conclusions graphiques doivent rester cohérentes avec l'énoncé.",
          "Pour progresser, l'élève doit refaire les formes indéterminées qui lui posent problème. Il peut classer ses erreurs : factorisation oubliée, terme dominant mal identifié, confusion entre +∞ et -∞, mauvais usage d'une croissance comparée. Cette classification rend les révisions beaucoup plus efficaces qu'une simple relecture du cours.",
        ],
      },
    ],
  },
  {
    slug: "erreurs-frequentes-bac-maths-terminale",
    title: "Erreurs fréquentes au bac de maths Terminale",
    description:
      "Les erreurs fréquentes en maths Terminale et les réflexes à installer pour mieux préparer les exercices type bac.",
    category: "terminale",
    keywords: ["erreurs bac maths", "Terminale", "méthode révision", "exercices type bac"],
    publishedAt: "2026-04-28",
    content: [
      {
        heading: "Répondre trop vite à la première étape",
        body: [
          "Une erreur fréquente en Terminale consiste à chercher immédiatement le résultat final. Beaucoup d'exercices sont pourtant construits en étapes : identifier une forme, choisir une méthode, calculer, puis conclure. Sauter la première étape peut faire perdre le fil, même lorsque l'élève connaît le cours. Lire la question deux fois est parfois le meilleur gain de temps.",
          "Dans les exercices guidés, cette logique devient visible. Chaque question demande une décision : quelle formule utiliser, quel domaine vérifier, quel facteur étudier. S'entraîner de cette manière aide l'élève à ralentir au bon moment. Le but n'est pas de travailler lentement, mais de ne pas confondre vitesse et précipitation.",
        ],
      },
      {
        heading: "Oublier les conditions",
        body: [
          "Les conditions sont partout : domaine du logarithme, dénominateur non nul, positivité d'une quantité, indépendance pour une loi binomiale, continuité pour une intégrale dans certains contextes. Les oublier peut rendre un raisonnement faux même si le calcul est correct. En Terminale, la méthode compte autant que le résultat.",
          "Un bon réflexe consiste à écrire les conditions dès qu'elles apparaissent. Pour ln(x - 1), on note x > 1. Pour un quotient, on exclut les zéros du dénominateur. Pour une loi binomiale, on justifie le schéma. Ces lignes ne sont pas du remplissage : elles protègent le raisonnement.",
        ],
      },
      {
        heading: "Mal exploiter une dérivée",
        body: [
          "Calculer une dérivée juste puis ne pas savoir quoi en faire est une difficulté très courante. La dérivée doit conduire à une étude de signe, puis aux variations. Si l'élève ne factorise pas, il peut se retrouver avec une expression inutilisable. Si le tableau de signes est incomplet, la conclusion devient fragile.",
          "Pour éviter cela, il faut associer automatiquement dérivée, signe et variations. Après chaque calcul de f'(x), l'élève devrait se demander quels facteurs ont un signe connu et quelles valeurs annulent la dérivée. Cette question transforme un calcul isolé en outil de résolution.",
        ],
      },
      {
        heading: "Ne pas corriger ses erreurs avec méthode",
        body: [
          "Relire une correction ne suffit pas toujours. Il faut comprendre à quel moment l'erreur est apparue : mauvaise formule, mauvais domaine, signe perdu, conclusion absente, calcul non simplifié. Un carnet d'erreurs très court peut suffire : chapitre, type d'erreur, réflexe à installer. C'est souvent plus utile qu'une longue fiche recopiée.",
          "Les notes indicatives /20 sur des sujets type bac peuvent servir à repérer les chapitres à retravailler, à condition de rester lucide : ce sont des repères internes à SprintMaths, pas une correction de professeur ni une prédiction. Leur intérêt est de donner une direction. Ensuite, les fiches méthodes et les exercices ciblés permettent de corriger précisément ce qui bloque.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export const terminaleArticles = articles.filter(
  (article) => article.category === "terminale"
);
