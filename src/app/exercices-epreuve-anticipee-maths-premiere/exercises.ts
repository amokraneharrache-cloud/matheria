export type ExerciseDifficulty = "Accessible" | "Intermédiaire" | "Approfondi";

export type ExerciseReviewLink = {
  href: string;
  label: string;
};

export type PremiereExamExercise = {
  id: string;
  number: number;
  title: string;
  theme: string;
  skills: readonly string[];
  difficulty: ExerciseDifficulty;
  pedagogicalTime: string;
  context: string;
  code?: string;
  questions: readonly string[];
  hint: string;
  correction: {
    recognition: string;
    method: string;
    calculations: readonly string[];
    writing: string;
    conclusion: string;
  };
  commonErrors: readonly string[];
  reviewLinks: readonly ExerciseReviewLink[];
};

const formulasPath = "/formules-maths-premiere-specialite";

export const premiereExamExercises: PremiereExamExercise[] = [
  {
    id: "exercice-1-second-degre",
    number: 1,
    title: "Rentabilité d’une production",
    theme: "Second degré",
    skills: ["factoriser un trinôme", "étudier un signe", "utiliser la forme canonique", "interpréter un résultat"],
    difficulty: "Accessible",
    pedagogicalTime: "15 à 20 min",
    context:
      "Une entreprise produit x dizaines d’objets par jour, avec 0 ≤ x ≤ 12. Son bénéfice quotidien, en centaines d’euros, est B(x) = −2x² + 24x − 40.",
    questions: [
      "Vérifier que B(x) = −2(x − 2)(x − 10).",
      "Résoudre B(x) ≥ 0 sur [0 ; 12], puis interpréter le résultat.",
      "Écrire B sous forme canonique et déterminer le bénéfice maximal.",
      "Indiquer la production qui réalise ce maximum, en nombre d’objets.",
    ],
    hint:
      "Pour la factorisation, développe −2(x − 2)(x − 10). Pour le maximum, fais apparaître un carré dont le minimum est 0.",
    correction: {
      recognition:
        "Le bénéfice est un trinôme. La forme factorisée répond à la question de rentabilité ; la forme canonique répond à la question d’optimisation.",
      method:
        "On vérifie d’abord la factorisation, puis on utilise les racines 2 et 10 avec le signe du coefficient dominant. Enfin, on complète le carré.",
      calculations: [
        "−2(x − 2)(x − 10) = −2(x² − 12x + 20) = −2x² + 24x − 40.",
        "Le coefficient dominant est négatif : B est positive ou nulle entre les racines. Sur [0 ; 12], B(x) ≥ 0 pour x ∈ [2 ; 10].",
        "B(x) = −2(x² − 12x + 20) = −2[(x − 6)² − 16] = −2(x − 6)² + 32.",
        "Comme (x − 6)² ≥ 0, on a −2(x − 6)² ≤ 0, donc B(x) ≤ 32, avec égalité pour x = 6.",
      ],
      writing:
        "L’intervalle obtenu doit être traduit : x compte des dizaines d’objets et B(x) des centaines d’euros.",
      conclusion:
        "L’activité est rentable entre 20 et 100 objets inclus. Le bénéfice maximal est 3 200 € pour une production de 60 objets.",
    },
    commonErrors: [
      "Dire que le trinôme est positif à l’extérieur alors que son coefficient dominant est négatif.",
      "Oublier les unités : x est en dizaines et B(x) en centaines d’euros.",
    ],
    reviewLinks: [{ href: `${formulasPath}#second-degre`, label: "Revoir le second degré" }],
  },
  {
    id: "exercice-2-suites",
    number: 2,
    title: "Évolution d’une épargne mensuelle",
    theme: "Suites",
    skills: ["calculer par récurrence", "justifier une variation", "reconnaître une suite géométrique auxiliaire", "interpréter un seuil"],
    difficulty: "Approfondi",
    pedagogicalTime: "20 à 25 min",
    context:
      "On place 500 € sur un compte au rang 0. Chaque mois, le capital augmente de 2 %, puis on ajoute 50 €. On note uₙ le capital après n mois : u₀ = 500 et uₙ₊₁ = 1,02uₙ + 50.",
    questions: [
      "Calculer u₁ et u₂.",
      "Montrer que la suite (uₙ) est strictement croissante.",
      "On pose vₙ = uₙ + 2 500. Montrer que (vₙ) est géométrique et préciser son premier terme et sa raison.",
      "En déduire uₙ en fonction de n.",
      "Déterminer le premier mois où le capital dépasse 800 €.",
    ],
    hint:
      "Calcule vₙ₊₁ = uₙ₊₁ + 2 500, puis cherche à faire apparaître 1,02(uₙ + 2 500).",
    correction: {
      recognition:
        "La relation uₙ₊₁ = 1,02uₙ + 50 n’est ni arithmétique ni géométrique. L’énoncé fournit une transformation qui permet de revenir à une suite géométrique.",
      method:
        "On calcule les premiers termes, on étudie uₙ₊₁ − uₙ, puis on établit la récurrence vérifiée par vₙ avant de revenir à uₙ.",
      calculations: [
        "u₁ = 1,02 × 500 + 50 = 560 ; u₂ = 1,02 × 560 + 50 = 621,20.",
        "uₙ₊₁ − uₙ = 0,02uₙ + 50. Le capital reste positif, donc cette différence est strictement positive : (uₙ) est croissante.",
        "vₙ₊₁ = uₙ₊₁ + 2 500 = 1,02uₙ + 2 550 = 1,02(uₙ + 2 500) = 1,02vₙ.",
        "v₀ = 3 000 et la raison vaut 1,02. Donc vₙ = 3 000 × 1,02ⁿ, puis uₙ = 3 000 × 1,02ⁿ − 2 500.",
        "Par récurrence : u₃ = 683,624 ; u₄ = 747,29648 ; u₅ = 812,2424096. La croissance prouvée permet de conclure que le premier dépassement intervient à n = 5.",
      ],
      writing:
        "Pour un seuil, il faut encadrer : u₄ < 800 et u₅ > 800, puis utiliser la croissance pour justifier le caractère minimal du rang.",
      conclusion:
        "Le capital dépasse 800 € pour la première fois après cinq mois ; il vaut alors environ 812,24 €.",
    },
    commonErrors: [
      "Traiter u comme une suite géométrique de raison 1,02 malgré l’ajout mensuel de 50 €.",
      "Donner n = 5 sans vérifier que u₄ est encore inférieur à 800 €.",
    ],
    reviewLinks: [
      { href: `${formulasPath}#suites`, label: "Revoir les suites" },
      { href: `${formulasPath}#python`, label: "Revoir les algorithmes de seuil" },
    ],
  },
  {
    id: "exercice-3-derivation",
    number: 3,
    title: "Aire maximale d’un rectangle",
    theme: "Dérivation",
    skills: ["dériver un polynôme", "étudier le signe d’une dérivée", "dresser des variations", "résoudre une optimisation"],
    difficulty: "Accessible",
    pedagogicalTime: "15 à 20 min",
    context:
      "Un rectangle a un périmètre de 24 m. On note x la longueur d’un côté, avec 0 < x < 12. L’autre côté mesure 12 − x et l’aire vaut A(x) = x(12 − x).",
    questions: [
      "Développer A(x), puis calculer A′(x).",
      "Étudier le signe de A′ sur ]0 ; 12[.",
      "Dresser les variations de A et déterminer son maximum.",
      "Quelles dimensions donnent l’aire maximale ?",
    ],
    hint:
      "Après développement, la dérivée est une expression du premier degré. Cherche la valeur où elle s’annule.",
    correction: {
      recognition:
        "La grandeur à optimiser est déjà exprimée comme une fonction d’une seule variable sur un intervalle imposé.",
      method:
        "On développe pour dériver, puis on relie le signe de la dérivée aux variations de l’aire.",
      calculations: [
        "A(x) = 12x − x², donc A′(x) = 12 − 2x = 2(6 − x).",
        "A′(x) > 0 pour 0 < x < 6, A′(6) = 0 et A′(x) < 0 pour 6 < x < 12.",
        "A est croissante sur ]0 ; 6] puis décroissante sur [6 ; 12[. Son maximum est A(6) = 6(12 − 6) = 36.",
      ],
      writing:
        "La preuve du maximum repose sur le changement de signe de A′, pas seulement sur le calcul de A(6).",
      conclusion:
        "L’aire maximale est 36 m². Elle est obtenue pour x = 6 m : le rectangle optimal est un carré de côté 6 m.",
    },
    commonErrors: [
      "Conclure dès que A′(6)=0 sans étudier le signe de la dérivée de part et d’autre.",
      "Oublier que l’autre côté vaut 12 − x, et non 24 − x.",
    ],
    reviewLinks: [{ href: `${formulasPath}#derivation`, label: "Revoir dérivée et variations" }],
  },
  {
    id: "exercice-4-probabilites",
    number: 4,
    title: "Contrôle qualité de deux machines",
    theme: "Probabilités",
    skills: ["construire un arbre", "calculer une intersection", "appliquer les probabilités totales", "calculer une probabilité conditionnelle"],
    difficulty: "Intermédiaire",
    pedagogicalTime: "15 à 20 min",
    context:
      "Une usine utilise deux machines. La machine A fabrique 60 % des pièces et la machine B 40 %. Parmi les pièces de A, 2 % sont défectueuses ; parmi celles de B, 5 % le sont. On choisit une pièce au hasard et on note D l’évènement « la pièce est défectueuse ».",
    questions: [
      "Représenter la situation par un arbre pondéré.",
      "Calculer P(A ∩ D) et P(B ∩ D).",
      "En déduire P(D).",
      "Calculer P(B|D) et interpréter le résultat.",
    ],
    hint:
      "Une probabilité de chemin se calcule par multiplication. Pour P(D), additionne les deux chemins qui se terminent par D.",
    correction: {
      recognition:
        "A et B forment une partition de la production. L’évènement D peut se produire par deux chemins incompatibles : A puis D, ou B puis D.",
      method:
        "On place 0,60 et 0,40 au premier niveau, puis les probabilités conditionnelles 0,02 et 0,05. On multiplie sur chaque branche et on additionne pour D.",
      calculations: [
        "P(A∩D) = P(A)P(D|A) = 0,60 × 0,02 = 0,012.",
        "P(B∩D) = P(B)P(D|B) = 0,40 × 0,05 = 0,020.",
        "P(D) = 0,012 + 0,020 = 0,032, soit 3,2 %.",
        "P(B|D) = P(B∩D)/P(D) = 0,020/0,032 = 20/32 = 5/8 = 0,625.",
      ],
      writing:
        "La dernière probabilité est conditionnée par D : le nouvel univers de référence est l’ensemble des pièces défectueuses.",
      conclusion:
        "La probabilité qu’une pièce soit défectueuse est 3,2 %. Parmi les pièces défectueuses, 62,5 % proviennent de B.",
    },
    commonErrors: [
      "Additionner 2 % et 5 % sans tenir compte des parts de production.",
      "Confondre P(B|D) avec P(D|B)=0,05.",
    ],
    reviewLinks: [{ href: `${formulasPath}#probabilites`, label: "Revoir les probabilités conditionnelles" }],
  },
  {
    id: "exercice-5-geometrie",
    number: 5,
    title: "Triangle rectangle et cercle associé",
    theme: "Géométrie",
    skills: ["calculer des vecteurs", "utiliser un produit scalaire", "déterminer une équation de cercle", "justifier une appartenance"],
    difficulty: "Intermédiaire",
    pedagogicalTime: "20 min",
    context:
      "Dans un repère orthonormé, on considère A(1 ; 2), B(5 ; 4) et C(3 ; −2).",
    questions: [
      "Calculer les coordonnées de AB⃗ et AC⃗.",
      "Calculer AB⃗·AC⃗ et en déduire la nature du triangle ABC.",
      "Déterminer le centre et le rayon du cercle de diamètre [BC].",
      "Écrire une équation de ce cercle et vérifier que A lui appartient.",
    ],
    hint:
      "Le centre du cercle de diamètre [BC] est le milieu de B et C. Son rayon est la moitié de BC.",
    correction: {
      recognition:
        "Le produit scalaire permet de prouver l’angle droit en A. Le cercle de diamètre [BC] a un centre et un rayon accessibles directement avec les coordonnées.",
      method:
        "On forme deux vecteurs issus de A, puis on calcule leur produit scalaire. Pour le cercle, on détermine le milieu de B et C et la distance correspondante.",
      calculations: [
        "AB⃗ = (5−1 ; 4−2) = (4 ; 2) et AC⃗ = (3−1 ; −2−2) = (2 ; −4).",
        "AB⃗·AC⃗ = 4×2 + 2×(−4) = 8−8 = 0. Les vecteurs sont orthogonaux.",
        "Le milieu de B et C est Ω((5+3)/2 ; (4−2)/2) = Ω(4 ; 1).",
        "BC² = (3−5)² + (−2−4)² = 4+36 = 40. Le rayon vaut BC/2 = √40/2 = √10.",
        "Le cercle a pour équation (x−4)²+(y−1)²=10. Pour A : (1−4)²+(2−1)²=9+1=10.",
      ],
      writing:
        "Il faut préciser que le repère est orthonormé avant d’utiliser xx′+yy′ et la formule de distance.",
      conclusion:
        "Le triangle ABC est rectangle en A. Le point A appartient bien au cercle de diamètre [BC], de centre (4 ; 1) et de rayon √10.",
    },
    commonErrors: [
      "Soustraire les coordonnées dans des ordres différents au sein d’un même vecteur.",
      "Prendre BC comme rayon au lieu de BC/2.",
    ],
    reviewLinks: [{ href: `${formulasPath}#geometrie`, label: "Revoir produit scalaire et cercle" }],
  },
  {
    id: "exercice-6-trigonometrie",
    number: 6,
    title: "Repérage sur le cercle trigonométrique",
    theme: "Trigonométrie",
    skills: ["réduire un angle modulo 2π", "lire sinus et cosinus", "utiliser des valeurs remarquables", "résoudre par lecture du cercle"],
    difficulty: "Accessible",
    pedagogicalTime: "15 min",
    context:
      "Sur le cercle trigonométrique, un point mobile part de I(1 ; 0) et parcourt un angle de 17π/6 radians dans le sens direct.",
    questions: [
      "Ramener 17π/6 à un angle de [0 ; 2π[ ayant la même image.",
      "Donner les coordonnées exactes du point obtenu.",
      "Déterminer tous les réels x de [0 ; 2π[ tels que sin x = 1/2.",
      "Parmi eux, lequel a un cosinus négatif ?",
    ],
    hint:
      "Retranche 2π = 12π/6. L’angle obtenu est associé à l’angle remarquable π/6 dans le deuxième quadrant.",
    correction: {
      recognition:
        "Deux angles qui diffèrent d’un multiple de 2π ont la même image. Les coordonnées du point image sont (cos x ; sin x).",
      method:
        "On réduit l’angle, puis on lit le quadrant et les valeurs absolues fournies par π/6.",
      calculations: [
        "17π/6 − 12π/6 = 5π/6 : l’angle réduit est 5π/6.",
        "5π/6 = π − π/6. Donc cos(5π/6)=−√3/2 et sin(5π/6)=1/2.",
        "Sur [0 ; 2π[, l’ordonnée 1/2 est obtenue pour x=π/6 et x=5π/6.",
        "Dans le deuxième quadrant, le cosinus est négatif : la valeur demandée est 5π/6.",
      ],
      writing:
        "Le signe ne doit pas être appris séparément : il se justifie par l’abscisse ou l’ordonnée du quadrant concerné.",
      conclusion:
        "Le point final a pour coordonnées (−√3/2 ; 1/2). Parmi les deux angles de sinus 1/2, seul 5π/6 a un cosinus négatif.",
    },
    commonErrors: [
      "Retrancher π au lieu de 2π pour chercher la même image.",
      "Attribuer un cosinus positif à un point du deuxième quadrant.",
    ],
    reviewLinks: [{ href: `${formulasPath}#trigonometrie`, label: "Revoir le cercle trigonométrique" }],
  },
  {
    id: "exercice-7-exponentielle",
    number: 7,
    title: "Décroissance d’une concentration",
    theme: "Exponentielle",
    skills: ["calculer une valeur exponentielle", "dériver eᵃᵗ", "justifier une décroissance", "résoudre une comparaison sans logarithme"],
    difficulty: "Intermédiaire",
    pedagogicalTime: "15 à 20 min",
    context:
      "La concentration d’un produit dans une cuve est modélisée, pour t ≥ 0, par C(t) = 80e^(−0,25t), en mg/L, où t est exprimé en heures.",
    questions: [
      "Calculer C(0) et C(4), sous forme exacte.",
      "Calculer C′(t) et justifier le sens de variation de C.",
      "Résoudre C(t) ≤ 80e^(−2).",
      "Interpréter le résultat dans le contexte.",
    ],
    hint:
      "L’exponentielle est strictement positive et strictement croissante. Compare directement les exposants −0,25t et −2.",
    correction: {
      recognition:
        "Le coefficient de t dans l’exposant est négatif : le modèle décrit une décroissance continue. L’égalité proposée possède la même base exponentielle des deux côtés.",
      method:
        "On utilise e⁰=1, la dérivée de eᵃᵗ et la stricte croissance de l’exponentielle pour comparer les exposants.",
      calculations: [
        "C(0)=80e⁰=80 et C(4)=80e^(−1)=80/e.",
        "C′(t)=80×(−0,25)e^(−0,25t)=−20e^(−0,25t).",
        "Comme e^(−0,25t)>0, C′(t)<0 pour tout t≥0 : C est strictement décroissante.",
        "C(t)≤80e^(−2) ⇔ e^(−0,25t)≤e^(−2) ⇔ −0,25t≤−2 ⇔ t≥8.",
      ],
      writing:
        "La dernière division se fait par −0,25, nombre négatif : le sens de l’inégalité s’inverse.",
      conclusion:
        "À partir de huit heures, la concentration est inférieure ou égale à 80e^(−2) mg/L.",
    },
    commonErrors: [
      "Oublier le facteur −0,25 dans la dérivée.",
      "Ne pas inverser le sens de l’inégalité lors de la division par un nombre négatif.",
    ],
    reviewLinks: [{ href: `${formulasPath}#exponentielle`, label: "Revoir la fonction exponentielle" }],
  },
  {
    id: "exercice-8-algorithmique",
    number: 8,
    title: "Compléter un algorithme de seuil",
    theme: "Algorithmique et Python",
    skills: ["lire une boucle while", "compléter un programme", "suivre des variables", "interpréter un rang de seuil"],
    difficulty: "Accessible",
    pedagogicalTime: "15 min",
    context:
      "Une population initiale de 200 individus augmente de 10 % par période. On veut trouver le premier rang où elle atteint au moins 350 individus. Le programme contient les lignes « n = 0 », « u = 200 », puis répète tant que u < 350 deux mises à jour à compléter avant de renvoyer n et u.",
    code: "def seuil():\n    n = 0\n    u = 200\n    while u < 350:\n        u = ...\n        n = ...\n    return n, u",
    questions: [
      "Écrire les deux mises à jour à placer dans la boucle.",
      "Donner les valeurs de n et u après les deux premiers passages.",
      "Poursuivre le calcul jusqu’à l’arrêt du programme.",
      "Expliquer précisément ce que représentent les deux valeurs renvoyées.",
    ],
    hint:
      "Une hausse de 10 % correspond à une multiplication par 1,1. Le compteur doit augmenter une fois à chaque mise à jour de u.",
    correction: {
      recognition:
        "La population suit une suite géométrique de raison 1,1 et la condition while maintient la boucle tant que le seuil n’est pas atteint.",
      method:
        "Dans chaque tour, on remplace u par 1,1u puis on augmente n de 1. On trace les valeurs jusqu’à rendre la condition fausse.",
      calculations: [
        "Boucle : u = 1.1*u puis n = n + 1.",
        "Après un passage : n=1, u=220. Après deux passages : n=2, u=242.",
        "Puis u₃=266,2 ; u₄=292,82 ; u₅=322,102 ; u₆=354,3122.",
        "À n=6, la condition 354,3122 < 350 est fausse : le programme s’arrête.",
      ],
      writing:
        "Le mot « premier » est garanti parce que la boucle teste chaque rang successif et s’arrête dès le premier échec de la condition u<350.",
      conclusion:
        "Le programme renvoie n=6 et u≈354,31 : le seuil de 350 individus est atteint pour la première fois au rang 6.",
    },
    commonErrors: [
      "Écrire u = 0.1*u, ce qui conserve seulement 10 % au lieu d’augmenter de 10 %.",
      "Oublier d’incrémenter n exactement une fois à chaque mise à jour de u.",
    ],
    reviewLinks: [
      { href: `${formulasPath}#python`, label: "Revoir le mémo Python" },
      { href: `${formulasPath}#suites`, label: "Revoir les suites géométriques" },
    ],
  },
  {
    id: "exercice-9-transversal",
    number: 9,
    title: "Un point mobile entre géométrie et second degré",
    theme: "Géométrie et second degré",
    skills: ["calculer des distances", "développer une expression", "mettre sous forme canonique", "résoudre une optimisation géométrique"],
    difficulty: "Intermédiaire",
    pedagogicalTime: "20 min",
    context:
      "Dans un repère orthonormé, A(0 ; 3), B(6 ; 3) et M(x ; 0), avec x ∈ [0 ; 6]. On pose S(x) = MA² + MB².",
    questions: [
      "Exprimer MA² et MB² en fonction de x.",
      "Montrer que S(x) = 2x² − 12x + 54.",
      "Écrire S sous forme canonique.",
      "Déterminer la position de M qui minimise S, puis donner la valeur minimale.",
    ],
    hint:
      "Utilise la formule de distance au carré, puis complète le carré dans x² − 6x.",
    correction: {
      recognition:
        "Les distances au carré évitent les racines. Leur somme devient un trinôme dont la forme canonique fournit directement le minimum.",
      method:
        "On applique la formule de distance dans un repère orthonormé, on développe, puis on complète le carré.",
      calculations: [
        "MA²=(x−0)²+(0−3)²=x²+9.",
        "MB²=(x−6)²+(0−3)²=(x−6)²+9.",
        "S(x)=x²+9+(x−6)²+9=2x²−12x+54.",
        "S(x)=2(x²−6x)+54=2[(x−3)²−9]+54=2(x−3)²+36.",
        "Comme 2(x−3)²≥0, S(x)≥36, avec égalité pour x=3.",
      ],
      writing:
        "On vérifie que x=3 appartient bien au domaine [0 ; 6] avant de conclure au minimum géométrique.",
      conclusion:
        "La somme MA²+MB² est minimale lorsque M=(3 ; 0), à la verticale du milieu de [AB]. Sa valeur minimale est 36.",
    },
    commonErrors: [
      "Calculer MA+MB alors que l’énoncé demande la somme des carrés.",
      "Oublier le domaine de x lors de la conclusion sur le minimum.",
    ],
    reviewLinks: [
      { href: `${formulasPath}#geometrie`, label: "Revoir les distances" },
      { href: `${formulasPath}#second-degre`, label: "Revoir la forme canonique" },
    ],
  },
  {
    id: "exercice-10-mini-sujet",
    number: 10,
    title: "Mini-sujet : production, qualité et évolution",
    theme: "Mini-sujet transversal",
    skills: ["mobiliser le second degré", "optimiser par dérivation", "calculer des probabilités totales", "étudier une suite géométrique"],
    difficulty: "Approfondi",
    pedagogicalTime: "30 à 35 min",
    context:
      "Une entreprise étudie trois aspects indépendants de son activité. Partie A : pour x centaines d’unités produites, 0 ≤ x ≤ 12, le bénéfice en milliers d’euros est P(x)=−x²+12x−20. Partie B : 70 % des unités viennent de l’atelier A, qui a 2 % de défauts, et 30 % de l’atelier B, qui en a 5 %. Partie C : un budget initial de 80 milliers d’euros augmente de 5 % par an ; on note r₀=80 son montant initial.",
    questions: [
      "Partie A — Factoriser P, puis déterminer les productions pour lesquelles le bénéfice est positif ou nul.",
      "Partie A — Calculer P′, étudier les variations et déterminer le bénéfice maximal.",
      "Partie B — Calculer la probabilité qu’une unité choisie au hasard soit défectueuse.",
      "Partie B — Sachant qu’une unité est défectueuse, calculer la probabilité qu’elle provienne de B.",
      "Partie C — Justifier que (rₙ) est géométrique, donner rₙ en fonction de n et calculer r₃.",
      "Rédiger une synthèse distincte pour les trois parties, avec les unités utiles.",
    ],
    hint:
      "P(x)=−(x−2)(x−10). Pour la qualité, construis deux chemins vers l’évènement D. Pour le budget, une hausse de 5 % correspond au coefficient 1,05.",
    correction: {
      recognition:
        "Le mini-sujet juxtapose trois modèles : un trinôme pour rentabilité et optimisation, un arbre pour le contrôle qualité, puis une suite géométrique pour l’évolution annuelle.",
      method:
        "On traite chaque partie indépendamment et on conserve les unités. Dans A, factorisation et dérivation répondent à deux questions différentes ; dans B, on pondère chaque taux de défaut ; dans C, on traduit le taux par un coefficient multiplicateur.",
      calculations: [
        "P(x)=−(x²−12x+20)=−(x−2)(x−10). Le coefficient dominant est négatif, donc P(x)≥0 pour x∈[2;10].",
        "P′(x)=−2x+12. Elle est positive jusqu’à 6, nulle en 6, puis négative. P est maximale pour x=6 et P(6)=−36+72−20=16.",
        "Avec D « défectueuse » : P(D)=0,70×0,02+0,30×0,05=0,014+0,015=0,029.",
        "P(B|D)=P(B∩D)/P(D)=0,015/0,029=15/29≈0,517.",
        "rₙ₊₁=1,05rₙ : la suite est géométrique de raison 1,05. Ainsi rₙ=80×1,05ⁿ et r₃=80×1,05³=92,61.",
      ],
      writing:
        "Chaque conclusion doit reprendre son contexte : centaines d’unités pour x, milliers d’euros pour P et r, pourcentage pour les probabilités.",
      conclusion:
        "Le bénéfice est non négatif entre 200 et 1 000 unités et atteint 16 000 € pour 600 unités. Le taux global de défaut est 2,9 % et environ 51,7 % des unités défectueuses viennent de B. Après trois ans, le budget atteint 92,61 milliers d’euros.",
    },
    commonErrors: [
      "Mélanger les données de parties indépendantes au lieu de recommencer un raisonnement identifié.",
      "Oublier que x et les montants sont exprimés avec des unités multiples.",
      "Additionner 5 % chaque année au lieu de multiplier successivement par 1,05.",
    ],
    reviewLinks: [
      { href: `${formulasPath}#second-degre`, label: "Revoir second degré et dérivation" },
      { href: `${formulasPath}#probabilites`, label: "Revoir les probabilités" },
      { href: `${formulasPath}#suites`, label: "Revoir les suites" },
    ],
  },
];
