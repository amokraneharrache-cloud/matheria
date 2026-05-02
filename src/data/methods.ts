export type MethodCard = {
  id: string;
  examGoal: "terminale" | "bac-premiere" | "brevet";
  title: string;
  topic: string;
  steps: string[];
  commonMistake: string;
  miniExample: string;
  linkedTopic?: string;
};

export const methods: MethodCard[] = [
  {
    id: "meth-variations",
    examGoal: "terminale",
    title: "Étudier les variations d'une fonction",
    topic: "Fonctions",
    steps: [
      "1. Calculer la dérivée f'(x) en utilisant les formules (uv', u/v, etc.).",
      "2. Factoriser f'(x) au maximum pour faciliter l'étude de son signe.",
      "3. Étudier le signe de chaque facteur de f'(x).",
      "4. Construire le tableau de signe de f'(x) et en déduire les variations de f.",
      "5. Calculer les limites aux bornes et les valeurs des extremums locaux."
    ],
    commonMistake: "Oublier de vérifier l'ensemble de définition ou faire une erreur de signe en factorisant la dérivée.",
    miniExample: "Si f(x) = x * e^x, alors f'(x) = 1*e^x + x*e^x = e^x(1 + x). Comme e^x > 0, le signe ne dépend que de (1 + x).",
    linkedTopic: "derivation"
  },
  {
    id: "meth-convexite",
    examGoal: "terminale",
    title: "Étudier la convexité et point d'inflexion",
    topic: "Convexité",
    steps: [
      "1. Calculer la dérivée première f'(x).",
      "2. Dériver une seconde fois pour obtenir f''(x).",
      "3. Étudier le signe de la dérivée seconde f''(x).",
      "4. Conclure : f''(x) > 0 => Convexe ; f''(x) < 0 => Concave.",
      "5. Le point où f''(x) s'annule EN CHANGEANT DE SIGNE est l'abscisse du point d'inflexion."
    ],
    commonMistake: "Dire qu'il y a un point d'inflexion juste parce que f''(x) = 0. Il faut impérativement que f''(x) change de signe !",
    miniExample: "f(x) = x³. f'(x) = 3x², f''(x) = 6x. f''(0) = 0 et change de signe en 0. Le point (0,0) est un point d'inflexion.",
    linkedTopic: "convexite"
  },
  {
    id: "meth-logarithme",
    examGoal: "terminale",
    title: "Résoudre une équation avec ln",
    topic: "Logarithme",
    steps: [
      "1. DÉTERMINER LE DOMAINE D'ÉTUDE : l'intérieur d'un ln doit toujours être strictement positif (> 0).",
      "2. Utiliser les propriétés algébriques pour regrouper les ln : ln(a) + ln(b) = ln(ab), a ln(b) = ln(b^a).",
      "3. Obtenir une forme ln(A) = ln(B) ou ln(A) = c.",
      "4. En déduire A = B ou A = e^c en utilisant l'exponentielle.",
      "5. Résoudre la nouvelle équation et VÉRIFIER que la/les solutions sont dans le domaine d'étude."
    ],
    commonMistake: "Oublier de déterminer l'ensemble de définition au début, ce qui conduit à accepter des solutions impossibles (comme ln(-2)).",
    miniExample: "ln(x) + ln(x-1) = ln(6). Domaine : x > 1. On regroupe : ln(x(x-1)) = ln(6) => x² - x - 6 = 0. Solutions -2 et 3. On ne garde que 3.",
    linkedTopic: "logarithme"
  },
  {
    id: "meth-exponentielle",
    examGoal: "terminale",
    title: "Résoudre avec l'exponentielle",
    topic: "Exponentielle",
    steps: [
      "1. Mettre l'équation ou inéquation sous la forme e^A = e^B ou e^A < e^B.",
      "2. Si on a un nombre réel k > 0, l'écrire sous forme exponentielle : k = e^(ln k).",
      "3. Utiliser la stricte croissance de l'exponentielle pour 'faire tomber le e' : A = B ou A < B.",
      "4. Résoudre l'équation ou l'inéquation obtenue avec les règles classiques.",
      "5. Conclure."
    ],
    commonMistake: "Appliquer le logarithme sur un nombre négatif (ex: e^x = -5 n'a pas de solution, ne pas écrire x = ln(-5) !).",
    miniExample: "e^(2x) > 3 <=> 2x > ln(3) <=> x > ln(3)/2.",
    linkedTopic: "exponentielle"
  },
  {
    id: "meth-suites-recurrence",
    examGoal: "terminale",
    title: "Étudier une suite définie par récurrence",
    topic: "Suites",
    steps: [
      "1. Pour une suite v_n définie en fonction de u_n, exprimer v_{n+1} en fonction de u_{n+1}.",
      "2. Remplacer u_{n+1} par sa définition dans l'énoncé.",
      "3. Simplifier et essayer de factoriser pour retrouver l'expression de v_n.",
      "4. Obtenir v_{n+1} = q * v_n pour prouver qu'elle est géométrique (ou v_{n+1} = v_n + r pour arithmétique).",
      "5. En déduire la forme explicite de v_n, puis remonter à u_n."
    ],
    commonMistake: "S'emmêler les pinceaux entre l'indice n et n+1. Ne pas vérifier que sa factorisation est correcte en la redéveloppant.",
    miniExample: "Si v_n = u_n - 3 et u_{n+1} = 2u_n - 3. Alors v_{n+1} = u_{n+1} - 3 = 2u_n - 6 = 2(u_n - 3) = 2v_n.",
    linkedTopic: "suites"
  },
  {
    id: "meth-limites",
    examGoal: "terminale",
    title: "Lever une forme indéterminée en l'infini",
    topic: "Limites",
    steps: [
      "1. Remplacer x par l'infini pour identifier si c'est une Forme Indéterminée (FI) du type ∞/∞ ou ∞-∞.",
      "2. Si c'est un polynôme ou une fraction rationnelle, factoriser par le terme de plus haut degré en haut et en bas.",
      "3. Simplifier la fraction en barrant les termes mis en facteur.",
      "4. Utiliser les limites de référence : 1/x, 1/x² tendent vers 0 quand x tend vers l'infini.",
      "5. Conclure avec les règles d'opérations sur les limites."
    ],
    commonMistake: "Faire le rapport des termes de plus haut degré sans justifier par une factorisation complète. Oublier de simplifier.",
    miniExample: "(3x² - 1) / (x² + 2) => On factorise x²(3 - 1/x²) / x²(1 + 2/x²) => Les x² s'annulent. Il reste (3-0)/(1+0) = 3.",
    linkedTopic: "limites"
  },
  {
    id: "meth-loi-binomiale",
    examGoal: "terminale",
    title: "Utiliser la loi binomiale",
    topic: "Loi binomiale",
    steps: [
      "1. Justifier le schéma de Bernoulli : 'On répète n fois de manière identique et indépendante une épreuve à deux issues...'",
      "2. Définir le succès et sa probabilité p. Définir l'échec et sa probabilité 1-p.",
      "3. Déclarer la variable X qui compte le nombre de succès. Dire 'X suit la loi binomiale de paramètres n et p'.",
      "4. Utiliser la calculatrice (BinomialPD/CD) ou la formule P(X=k) pour calculer la probabilité demandée.",
      "5. Savoir traduire : 'au moins un' => P(X >= 1) = 1 - P(X = 0)."
    ],
    commonMistake: "Oublier le coefficient binomial (k parmi n) dans le calcul manuel de P(X=k).",
    miniExample: "On lance 10 dés. Probabilité d'avoir exactement 2 fois un '6' (p=1/6) : P(X=2) = (2 parmi 10) * (1/6)^2 * (5/6)^8.",
    linkedTopic: "loi-binomiale"
  },
  {
    id: "meth-esperance",
    examGoal: "terminale",
    title: "Calculer et interpréter une espérance",
    topic: "Variables aléatoires",
    steps: [
      "1. Établir la loi de probabilité de X sous forme de tableau (Valeurs x_i possibles et Probabilités p_i associées).",
      "2. Vérifier IMPÉRATIVEMENT que la somme des probabilités p_i est égale à 1.",
      "3. Appliquer la formule : E(X) = Somme des (x_i * p_i).",
      "4. Pour une loi binomiale, utiliser directement la formule rapide E(X) = n * p.",
      "5. Interpréter E(X) : 'Sur un très grand nombre de répétitions, la moyenne de X sera proche de E(X)'."
    ],
    commonMistake: "Additionner uniquement les probabilités, ou oublier de multiplier par la valeur du gain x_i. Attention aux valeurs négatives (pertes).",
    miniExample: "Loi : X=10 avec p=0.2, X=-2 avec p=0.8. E(X) = 10*0.2 + (-2)*0.8 = 2 - 1.6 = 0.4. Gain moyen de 0,40€.",
    linkedTopic: "variables-aleatoires"
  },
  {
    id: "meth-primitive-integrale",
    examGoal: "terminale",
    title: "Calculer une intégrale",
    topic: "Intégrales",
    steps: [
      "1. S'assurer que la fonction f est continue sur l'intervalle [a, b].",
      "2. Déterminer une primitive F(x) de la fonction f(x) en s'aidant du tableau des primitives usuelles.",
      "3. Noter l'intégrale entre crochets : [F(x)] de a à b.",
      "4. Calculer la différence F(b) - F(a). Toujours faire la borne du haut moins la borne du bas.",
      "5. Simplifier l'expression numérique pour obtenir la valeur exacte de l'intégrale."
    ],
    commonMistake: "Se tromper de signe en évaluant la borne inférieure : F(b) - F(a). Oublier la parenthèse pour - (F(a)) !",
    miniExample: "Intégrale de 2x de 1 à 3. Primitive de 2x est x². On calcule 3² - 1² = 9 - 1 = 8.",
    linkedTopic: "integrales"
  },
  {
    id: "meth-equa-diff",
    examGoal: "terminale",
    title: "Résoudre une équation différentielle y' = ay + b",
    topic: "Équations différentielles",
    steps: [
      "1. Mettre l'équation sous la forme standard y' = a*y + b. Bien identifier les réels a et b.",
      "2. Citer le cours : 'Les solutions sont les fonctions de la forme f(x) = C*e^(ax) - b/a'.",
      "3. Calculer la valeur constante particulière -b/a.",
      "4. Écrire la forme générale complète avec la constante réelle C.",
      "5. Si une condition initiale y(x_0) = y_0 est donnée, remplacer x par x_0, égaler à y_0, et résoudre l'équation pour trouver la constante C."
    ],
    commonMistake: "Se tromper dans le signe de la constante -b/a. Ex: si y' = 2y - 4, a=2, b=-4, -b/a = -(-4)/2 = 2.",
    miniExample: "y' = -y + 3. a=-1, b=3. Solutions : C*e^(-x) - 3/(-1) = C*e^(-x) + 3.",
    linkedTopic: "equations-differentielles"
  },
  {
    id: "meth-geometrie-espace",
    examGoal: "terminale",
    title: "Équation cartésienne d'un plan",
    topic: "Géométrie dans l'espace",
    steps: [
      "1. Trouver un vecteur normal n(a,b,c) au plan (soit donné dans l'énoncé, soit par produit scalaire ou produit vectoriel).",
      "2. Écrire la forme générale du plan : ax + by + cz + d = 0 avec les coordonnées de n.",
      "3. Choisir un point A(x_A, y_A, z_A) qui appartient au plan.",
      "4. Substituer les coordonnées de A dans l'équation : a(x_A) + b(y_A) + c(z_A) + d = 0.",
      "5. Isoler d et écrire l'équation complète du plan."
    ],
    commonMistake: "Confondre vecteur directeur et vecteur normal. Oublier de calculer le 'd'.",
    miniExample: "n(1, -2, 3) est normal. Plan : x - 2y + 3z + d = 0. Passe par A(0, 1, -1). 0 - 2(1) + 3(-1) + d = 0 => d = 5. Plan : x - 2y + 3z + 5 = 0.",
    linkedTopic: "geometrie-espace"
  },
  {
    id: "meth-tableau-signes",
    examGoal: "terminale",
    title: "Faire un tableau de signes parfait",
    topic: "Général",
    steps: [
      "1. Résoudre chaque facteur égal à 0 (ex: 2x-4=0 => x=2) et identifier les valeurs interdites (ex: dénominateur = 0).",
      "2. Tracer un grand tableau. Sur la 1ère ligne (x), placer le domaine de définition et y insérer, en ordre croissant, toutes les valeurs trouvées à l'étape 1.",
      "3. Tracer une ligne par facteur. Mettre un '0' sous la valeur où le facteur s'annule.",
      "4. Remplir avec la règle du signe de 'ax+b' (signe de -a puis signe de a) ou utiliser e^x > 0 toujours.",
      "5. Sur la dernière ligne, faire le bilan des signes par colonnes (+ par - donne -, etc.). Mettre des doubles barres || pour les valeurs interdites."
    ],
    commonMistake: "Ne pas classer les valeurs de x dans l'ordre croissant sur la première ligne, ce qui fausse totalement le tableau final.",
    miniExample: "Pour (x-2)(x+3) / x. Valeurs : 2, -3, 0(interdite). Ordre ligne 1 : -∞, -3, 0, 2, +∞.",
    linkedTopic: undefined
  }
];
