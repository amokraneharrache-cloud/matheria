const fs = require('fs');

const topics = [
  { id: "nombres-et-calculs", label: "Nombres et calculs" },
  { id: "fractions", label: "Fractions" },
  { id: "puissances", label: "Puissances" },
  { id: "calcul-litteral", label: "Calcul littéral" },
  { id: "equations", label: "Équations" },
  { id: "fonctions", label: "Fonctions" },
  { id: "proportionnalite", label: "Proportionnalité" },
  { id: "geometrie-plane", label: "Géométrie plane" },
  { id: "pythagore", label: "Théorème de Pythagore" },
  { id: "thales", label: "Théorème de Thalès" },
  { id: "transformations", label: "Transformations" },
  { id: "probabilites-statistiques", label: "Probabilités et statistiques" },
  { id: "algorithmique", label: "Algorithmique" }
];

// Base questions that I already wrote or will write
const questionsByTopic = {
  "nombres-et-calculs": [
    { q: "Calculer A = 15 - 3 × 4.", o: ["48", "3", "27", "12"], c: 1, e: "La multiplication est prioritaire : 3 × 4 = 12. Ensuite, 15 - 12 = 3.", d: "easy" },
    { q: "Quel est le plus grand diviseur commun (PGCD) de 24 et 36 ?", o: ["6", "12", "8", "4"], c: 1, e: "Les diviseurs de 24 sont 1,2,3,4,6,8,12,24. Ceux de 36 sont 1,2,3,4,6,9,12,18,36. Le plus grand commun est 12.", d: "medium" },
    { q: "Parmi ces nombres, lequel est un nombre premier ?", o: ["15", "21", "17", "9"], c: 2, e: "Un nombre premier n'est divisible que par 1 et lui-même. 17 est premier.", d: "easy" },
    { q: "Décomposer 60 en produit de facteurs premiers.", o: ["2 × 3 × 10", "4 × 15", "2² × 3 × 5", "6 × 10"], c: 2, e: "60 = 2² × 3 × 5.", d: "medium" },
    { q: "Calculer B = -5 + 2 × (-3) - (-8).", o: ["-3", "5", "-13", "-19"], c: 0, e: "Priorité à la multiplication : 2 × (-3) = -6. Puis on ajoute les termes : -5 - 6 + 8 = -3.", d: "hard" },
    { q: "Quel est le plus petit multiple commun (PPCM) de 6 et 8 ?", o: ["24", "48", "14", "12"], c: 0, e: "Les multiples de 6 sont 6,12,18,24... et de 8 sont 8,16,24... Le PPCM est 24.", d: "medium" },
    { q: "Calculer C = (7 - 2) × 3 + 4.", o: ["19", "25", "11", "23"], c: 0, e: "Priorité aux parenthèses : (7-2)=5. Puis multiplication : 5×3=15. Enfin addition : 15+4=19.", d: "easy" },
    { q: "Si on divise 45 par 7, quel est le reste de la division euclidienne ?", o: ["3", "5", "6", "2"], c: 0, e: "45 = 7 × 6 + 3. Le reste est 3.", d: "easy" }
  ],
  "fractions": [
    { q: "Calculer : 2/5 + 1/5.", o: ["3/10", "3/5", "2/25", "1/5"], c: 1, e: "Même dénominateur : (2+1)/5 = 3/5.", d: "easy" },
    { q: "Calculer et simplifier : 3/4 - 1/2.", o: ["2/2", "1/4", "1/2", "2/4"], c: 1, e: "Mise au même dénominateur : 1/2 = 2/4. Donc 3/4 - 2/4 = 1/4.", d: "medium" },
    { q: "Calculer : 2/3 × 4/5.", o: ["6/8", "8/15", "10/12", "6/15"], c: 1, e: "On multiplie les numérateurs et dénominateurs : (2×4)/(3×5) = 8/15.", d: "medium" },
    { q: "Calculer : (3/2) ÷ (5/4).", o: ["6/5", "15/8", "12/10", "5/6"], c: 0, e: "Multiplier par l'inverse : (3/2) × (4/5) = 12/10 = 6/5.", d: "hard" },
    { q: "Un gâteau est coupé en 8. Léa mange 1/4 et Tom 3/8. Reste-t-il ?", o: ["1/8", "1/2", "3/8", "5/8"], c: 2, e: "1/4 = 2/8. Total mangé : 5/8. Reste 3/8.", d: "hard" },
    { q: "Calculer : 5/6 + 2/3.", o: ["7/9", "9/6", "3/2", "7/6"], c: 2, e: "2/3 = 4/6. 5/6 + 4/6 = 9/6 = 3/2.", d: "medium" },
    { q: "Calculer 3/7 de 28.", o: ["12", "9", "21", "16"], c: 0, e: "(3/7) × 28 = 3 × (28/7) = 3 × 4 = 12.", d: "easy" },
    { q: "Quelle fraction est égale à 0,75 ?", o: ["1/4", "3/5", "3/4", "4/5"], c: 2, e: "0,75 = 75/100 = 3/4.", d: "easy" }
  ],
  "puissances": [
    { q: "Que vaut 10³ ?", o: ["30", "100", "1000", "300"], c: 2, e: "10³ correspond à 10×10×10 = 1000.", d: "easy" },
    { q: "Exprimer sous forme d'une puissance : 2³ × 2⁴.", o: ["2¹²", "4⁷", "2⁷", "4¹²"], c: 2, e: "On ajoute les exposants : 2³⁺⁴ = 2⁷.", d: "easy" },
    { q: "Écriture scientifique de 45 000 ?", o: ["45 × 10³", "4,5 × 10⁴", "4,5 × 10³", "0,45 × 10⁵"], c: 1, e: "Forme a × 10ⁿ : 4,5 × 10⁴.", d: "medium" },
    { q: "Exprimer (5²)³ sous forme d'une puissance.", o: ["5⁵", "5⁶", "25³", "10³"], c: 1, e: "On multiplie les exposants : 5²×³ = 5⁶.", d: "medium" },
    { q: "Calculer : (10⁵ × 10⁻²) / 10⁴.", o: ["10⁻¹", "10¹", "10⁷", "10⁻³"], c: 0, e: "10⁵ × 10⁻² = 10³. Puis 10³ / 10⁴ = 10³⁻⁴ = 10⁻¹.", d: "hard" },
    { q: "Que vaut 7⁰ ?", o: ["0", "7", "1", "10"], c: 2, e: "Tout nombre (non nul) élevé à la puissance 0 vaut 1.", d: "easy" },
    { q: "Écriture décimale de 10⁻³ ?", o: ["-30", "0,001", "-1000", "0,01"], c: 1, e: "10⁻³ = 1/1000 = 0,001.", d: "medium" },
    { q: "Simplifier : 3⁵ / 3².", o: ["3³", "1³", "3⁷", "9³"], c: 0, e: "On soustrait les exposants : 3⁵⁻² = 3³.", d: "medium" }
  ],
  "calcul-litteral": [
    { q: "Développer : 3(x + 4).", o: ["3x + 4", "3x + 12", "x + 12", "7x"], c: 1, e: "3×x + 3×4 = 3x + 12.", d: "easy" },
    { q: "Réduire l'expression : 5x + 3 - 2x + 7.", o: ["3x + 10", "7x + 10", "15x", "3x - 4"], c: 0, e: "(5x - 2x) + (3 + 7) = 3x + 10.", d: "medium" },
    { q: "Développer : (x + 5)².", o: ["x² + 25", "x² + 5x + 25", "x² + 10x + 25", "2x + 25"], c: 2, e: "(a+b)² = a² + 2ab + b².", d: "medium" },
    { q: "Factoriser l'expression : x² - 16.", o: ["(x - 16)²", "(x - 4)(x + 4)", "(x - 4)²", "x(x - 16)"], c: 1, e: "a² - b² = (a - b)(a + b).", d: "hard" },
    { q: "Développer et réduire : (2x + 1)(x - 3).", o: ["2x² - 5x - 3", "2x² - 6x - 3", "2x² - 3", "2x² + 5x + 3"], c: 0, e: "2x² - 6x + x - 3 = 2x² - 5x - 3.", d: "hard" },
    { q: "Développer : (x - 3)².", o: ["x² - 9", "x² - 6x + 9", "x² + 6x + 9", "x² - 3x + 9"], c: 1, e: "(a-b)² = a² - 2ab + b².", d: "medium" },
    { q: "Factoriser : 4x + 12.", o: ["4(x + 3)", "16x", "4x(1 + 3)", "x(4 + 12)"], c: 0, e: "Le facteur commun est 4. 4×x + 4×3 = 4(x + 3).", d: "easy" },
    { q: "Calculer la valeur de 2x - 5 pour x = 4.", o: ["3", "-3", "13", "8"], c: 0, e: "2×4 - 5 = 8 - 5 = 3.", d: "easy" }
  ],
  "equations": [
    { q: "Résoudre : x + 7 = 12.", o: ["x = 19", "x = 5", "x = -5", "x = 84"], c: 1, e: "x = 12 - 7 = 5.", d: "easy" },
    { q: "Résoudre : 3x = 15.", o: ["x = 12", "x = 18", "x = 5", "x = 45"], c: 2, e: "x = 15 / 3 = 5.", d: "medium" },
    { q: "Résoudre : 2x - 4 = 10.", o: ["x = 3", "x = 7", "x = 14", "x = 6"], c: 1, e: "2x = 14, donc x = 7.", d: "medium" },
    { q: "Résoudre : 5x + 2 = 3x + 10.", o: ["x = 4", "x = 6", "x = -4", "x = 8"], c: 0, e: "2x = 8, d'où x = 4.", d: "hard" },
    { q: "Résoudre l'équation produit nul : (x - 2)(x + 5) = 0.", o: ["x = 2", "x = -5", "x = 2 ou x = -5", "x = -2 ou x = 5"], c: 2, e: "x - 2 = 0 ou x + 5 = 0.", d: "hard" },
    { q: "Si le double d'un nombre augmenté de 3 vaut 15, quel est ce nombre ?", o: ["6", "9", "12", "7.5"], c: 0, e: "2x + 3 = 15 => 2x = 12 => x = 6.", d: "medium" },
    { q: "Résoudre : x/4 = 8.", o: ["x = 2", "x = 12", "x = 32", "x = 4"], c: 2, e: "On multiplie par 4 : x = 8 × 4 = 32.", d: "easy" },
    { q: "Une solution de x² = 25 est :", o: ["5", "12.5", "50", "625"], c: 0, e: "Les solutions sont 5 et -5.", d: "easy" }
  ],
  "fonctions": [
    { q: "Soit f(x) = 2x + 3. Calculer l'image de 4.", o: ["8", "11", "5", "9"], c: 1, e: "f(4) = 2×4 + 3 = 11.", d: "easy" },
    { q: "Soit g(x) = x² - 1. Calculer g(-3).", o: ["-10", "8", "-4", "5"], c: 1, e: "g(-3) = (-3)² - 1 = 9 - 1 = 8.", d: "medium" },
    { q: "Soit h(x) = 4x. Quel est l'antécédent de 20 ?", o: ["80", "24", "16", "5"], c: 3, e: "4x = 20, x = 5.", d: "medium" },
    { q: "Laquelle de ces fonctions est linéaire ?", o: ["f(x) = 3x + 2", "g(x) = 5x", "h(x) = x²", "k(x) = 2/x"], c: 1, e: "Forme f(x) = ax.", d: "hard" },
    { q: "Soit f(x) = -2x + 8. Quel est l'antécédent de 0 ?", o: ["4", "-4", "8", "0"], c: 0, e: "-2x + 8 = 0, x = 4.", d: "hard" },
    { q: "Une fonction affine a pour expression générique :", o: ["f(x) = ax", "f(x) = ax + b", "f(x) = ax²", "f(x) = a/x"], c: 1, e: "C'est la définition d'une fonction affine.", d: "easy" },
    { q: "Si f(x) = 3x - 5, alors f(0) vaut :", o: ["0", "3", "-5", "5"], c: 2, e: "f(0) = 3×0 - 5 = -5.", d: "easy" },
    { q: "Sur un graphique, une fonction linéaire est représentée par :", o: ["Une courbe", "Une droite ne passant pas par l'origine", "Une droite passant par l'origine", "Un cercle"], c: 2, e: "Une fonction linéaire traduit une situation de proportionnalité.", d: "medium" }
  ],
  "proportionnalite": [
    { q: "Si 3 kg de pommes coûtent 6 €, combien coûtent 5 kg ?", o: ["10 €", "12 €", "8 €", "15 €"], c: 0, e: "1 kg = 2 €. 5 kg = 10 €.", d: "easy" },
    { q: "Dans une classe de 25 élèves, 20 % portent des lunettes. Combien ?", o: ["10", "4", "5", "8"], c: 2, e: "25 × 0,2 = 5.", d: "easy" },
    { q: "Une voiture roule à 90 km/h. Quelle distance en 2h ?", o: ["180 km", "45 km", "120 km", "90 km"], c: 0, e: "d = v × t = 90 × 2 = 180.", d: "medium" },
    { q: "Sur une carte à l'échelle 1/100 000, 5 cm correspondent à ?", o: ["5 km", "50 km", "500 m", "500 km"], c: 0, e: "5 × 100 000 = 500 000 cm = 5 km.", d: "hard" },
    { q: "Un article à 40 € a une remise de 15 %. Nouveau prix ?", o: ["34 €", "25 €", "35 €", "46 €"], c: 0, e: "Remise : 40 × 0,15 = 6 €. Prix : 34 €.", d: "hard" },
    { q: "1 heure et 30 minutes équivalent à combien d'heures décimales ?", o: ["1,3 h", "1,5 h", "90 h", "1,30 h"], c: 1, e: "30 min = 0,5 heure. Donc 1,5 h.", d: "medium" },
    { q: "Un prix augmente de 10%, puis rebaisse de 10%. Le prix final est :", o: ["Le même", "Plus élevé", "Moins élevé", "On ne peut pas savoir"], c: 2, e: "1 × 1,1 × 0,9 = 0,99. Donc moins élevé.", d: "hard" },
    { q: "Convertir 3,5 h en minutes.", o: ["350 min", "210 min", "330 min", "180 min"], c: 1, e: "3,5 × 60 = 210 minutes.", d: "easy" }
  ],
  "geometrie-plane": [
    { q: "Dans un triangle ABC, A=50° et B=60°. Combien mesure C ?", o: ["70°", "80°", "90°", "60°"], c: 0, e: "Somme = 180°. 180 - 110 = 70°.", d: "easy" },
    { q: "Quel est le périmètre d'un cercle de rayon 5 cm ? (π ≈ 3,14)", o: ["15,7 cm", "31,4 cm", "78,5 cm", "10 cm"], c: 1, e: "2 × π × R = 10 × 3,14 = 31,4.", d: "easy" },
    { q: "Aire d'un triangle de base 6 cm et de hauteur 4 cm ?", o: ["24 cm²", "10 cm²", "12 cm²", "48 cm²"], c: 2, e: "(b×h)/2 = 24/2 = 12.", d: "medium" },
    { q: "Un losange a des diagonales de 8 cm et 6 cm. Aire ?", o: ["48 cm²", "14 cm²", "24 cm²", "28 cm²"], c: 2, e: "(D×d)/2 = 48/2 = 24.", d: "hard" },
    { q: "Point de concours des médianes d'un triangle ?", o: ["Le centre de gravité", "L'orthocentre", "Le centre du cercle circonscrit", "Le centre de symétrie"], c: 0, e: "Les médianes se croisent au centre de gravité.", d: "hard" },
    { q: "L'aire d'un rectangle de côtés 4 cm et 7 cm est :", o: ["22 cm²", "11 cm²", "28 cm²", "14 cm²"], c: 2, e: "Longueur × largeur = 4 × 7 = 28.", d: "easy" },
    { q: "La somme des angles d'un quadrilatère est de :", o: ["180°", "270°", "360°", "90°"], c: 2, e: "La somme des angles d'un quadrilatère vaut toujours 360°.", d: "medium" },
    { q: "Si deux droites sont perpendiculaires à une même troisième, alors elles sont :", o: ["Sécantes", "Confondues", "Perpendiculaires entre elles", "Parallèles entre elles"], c: 3, e: "C'est une propriété fondamentale de géométrie plane.", d: "medium" }
  ],
  "pythagore": [
    { q: "Triangle ABC rectangle en A, AB=3, AC=4. Mesure de BC ?", o: ["5", "7", "25", "1"], c: 0, e: "BC² = 3² + 4² = 25. BC = 5.", d: "easy" },
    { q: "Triangle DEF rectangle en D, EF=10, DE=8. Mesure de DF ?", o: ["6", "36", "18", "2"], c: 0, e: "10² = 8² + DF². DF² = 36 => DF = 6.", d: "medium" },
    { q: "Un triangle a pour côtés 5, 12 et 13 cm. Est-il rectangle ?", o: ["Oui", "Non", "On ne peut pas savoir", "Presque"], c: 0, e: "5²+12² = 25+144 = 169 = 13².", d: "medium" },
    { q: "Longueur de la diagonale d'un carré de côté 5 cm ?", o: ["5√2 cm", "10 cm", "25 cm", "7 cm"], c: 0, e: "d² = 5²+5² = 50 => d = √50 = 5√2.", d: "hard" },
    { q: "Échelle de 5m contre un mur, pied à 3m. Hauteur ?", o: ["4 m", "6 m", "2 m", "8 m"], c: 0, e: "5² = h² + 3² => 25 - 9 = 16 => h = 4.", d: "hard" },
    { q: "Le théorème de Pythagore ne s'applique que dans un triangle :", o: ["Isocèle", "Rectangle", "Équilatéral", "Quelconque"], c: 1, e: "Le triangle doit avoir un angle droit.", d: "easy" },
    { q: "Dans un triangle rectangle, le plus grand côté s'appelle :", o: ["La cathète", "L'adjacente", "L'hypoténuse", "La diagonale"], c: 2, e: "L'hypoténuse est le côté opposé à l'angle droit.", d: "easy" },
    { q: "Soit un triangle de côtés 6, 8, 10. Son aire vaut :", o: ["48", "24", "40", "30"], c: 1, e: "C'est un triangle rectangle (6²+8²=10²). Aire = (6×8)/2 = 24.", d: "medium" }
  ],
  "thales": [
    { q: "Si (MN)//(BC) dans le triangle ABC, quelle égalité est vraie ?", o: ["AM/AB = AN/AC = MN/BC", "AM/AC = AN/AB = MN/BC", "AB/AM = AC/AN = BC/MN", "AM/MB = AN/NC"], c: 0, e: "C'est le théorème de Thalès.", d: "easy" },
    { q: "Sur (MN)//(BC), AM=2, AB=6, AN=3. Combien vaut AC ?", o: ["9", "6", "1", "4"], c: 0, e: "2/6 = 3/AC => AC = 9.", d: "medium" },
    { q: "Rapport AM/AB = 1/3, et MN = 4. Combien vaut BC ?", o: ["12", "4/3", "7", "8"], c: 0, e: "4/BC = 1/3 => BC = 12.", d: "medium" },
    { q: "AM/AB = 4/5 et AN/AC = 4/5, même ordre. Que dire de (MN) et (BC) ?", o: ["Parallèles", "Perpendiculaires", "Sécantes", "Rien"], c: 0, e: "D'après la réciproque de Thalès, elles sont parallèles.", d: "hard" },
    { q: "Si on effectue une réduction de rapport k = 0,5, par combien est multipliée l'aire ?", o: ["0,25", "0,5", "1", "2"], c: 0, e: "Les aires sont multipliées par k² = 0,25.", d: "hard" },
    { q: "Si le rapport d'agrandissement est 3, le volume est multiplié par :", o: ["3", "6", "9", "27"], c: 3, e: "Les volumes sont multipliés par k³. 3³ = 27.", d: "medium" },
    { q: "Le théorème de Thalès sert principalement à :", o: ["Calculer des angles", "Prouver qu'un triangle est rectangle", "Calculer des longueurs de côtés", "Calculer des aires"], c: 2, e: "Il utilise la proportionnalité pour trouver des longueurs.", d: "easy" },
    { q: "Pour utiliser la réciproque de Thalès, il faut vérifier :", o: ["L'égalité de deux rapports", "La présence d'un angle droit", "Que les droites sont perpendiculaires", "La somme des angles"], c: 0, e: "On vérifie si AM/AB = AN/AC.", d: "easy" }
  ],
  "transformations": [
    { q: "Quelle transformation correspond à l'effet d'un miroir ?", o: ["Translation", "Symétrie axiale", "Rotation", "Homothétie"], c: 1, e: "La symétrie axiale crée une image inversée.", d: "easy" },
    { q: "Quelle transformation correspond à un demi-tour ?", o: ["Symétrie axiale", "Translation", "Symétrie centrale", "Homothétie"], c: 2, e: "La symétrie centrale équivaut à une rotation de 180°.", d: "easy" },
    { q: "Glissement sans tourner ni déformer ?", o: ["Rotation", "Symétrie centrale", "Translation", "Homothétie"], c: 2, e: "Une translation déplace selon une direction, un sens, une longueur.", d: "medium" },
    { q: "Homothétie de rapport 3, que devient un segment de 2 cm ?", o: ["2 cm", "5 cm", "6 cm", "9 cm"], c: 2, e: "Les longueurs sont multipliées par k. 2×3 = 6.", d: "hard" },
    { q: "Combien d'infos pour définir une rotation ?", o: ["Un axe", "Centre et rapport", "Centre, angle et sens", "Vecteur"], c: 2, e: "Centre, angle et sens de rotation.", d: "hard" },
    { q: "Une homothétie de rapport k = -1 correspond à :", o: ["Une symétrie axiale", "Une symétrie centrale", "Une translation", "Une réduction"], c: 1, e: "Multiplier par -1 équivaut à un demi-tour (symétrie centrale).", d: "medium" },
    { q: "Dans une translation, les segments image et objet sont :", o: ["Perpendiculaires", "Sécants", "Parallèles", "Plus petits"], c: 2, e: "La translation conserve la direction (parallélisme).", d: "medium" },
    { q: "Quelle transformation déforme la taille de la figure ?", o: ["La rotation", "L'homothétie", "La translation", "La symétrie"], c: 1, e: "L'homothétie est la seule qui agrandit ou réduit la figure.", d: "easy" }
  ],
  "probabilites-statistiques": [
    { q: "Lancé d'un dé équilibré à 6 faces. Probabilité d'un 5 ?", o: ["1/6", "1/5", "5/6", "1/2"], c: 0, e: "1 face sur 6.", d: "easy" },
    { q: "Urne: 3 boules rouges, 7 bleues. Probabilité d'une rouge ?", o: ["3/7", "3/10", "7/10", "1/3"], c: 1, e: "3 boules sur un total de 10.", d: "easy" },
    { q: "Moyenne des notes : 10, 12, 14, 16 ?", o: ["12", "13", "14", "52"], c: 1, e: "(10+12+14+16)/4 = 13.", d: "medium" },
    { q: "Médiane de la série triée : 2, 5, 8, 12, 15 ?", o: ["8", "5", "12", "8.4"], c: 0, e: "Valeur centrale = 8.", d: "medium" },
    { q: "Étendue de la série : 4, 9, 12, 3, 15 ?", o: ["11", "12", "15", "5"], c: 1, e: "Max - Min = 15 - 3 = 12.", d: "hard" },
    { q: "On tire une carte dans un jeu de 32. Probabilité d'un Roi ?", o: ["1/8", "1/32", "4/32", "Both A and C"], c: 3, e: "Il y a 4 rois sur 32, soit 4/32 = 1/8.", d: "medium" },
    { q: "Dans une classe de 20 filles et 10 garçons, proba de choisir une fille ?", o: ["1/3", "2/3", "1/2", "20/10"], c: 1, e: "20 / (20+10) = 20/30 = 2/3.", d: "easy" },
    { q: "La somme des probabilités de toutes les issues d'une expérience vaut :", o: ["0", "1", "100", "0,5"], c: 1, e: "C'est une règle de base, la somme vaut toujours 1 (ou 100%).", d: "easy" }
  ],
  "algorithmique": [
    { q: "Dans Scratch, à quoi sert 'Répéter 10 fois' ?", o: ["Avancer de 10 pas", "Créer une boucle", "Ajouter 10 au score", "Changer de costume"], c: 1, e: "Créer une boucle d'instructions.", d: "easy" },
    { q: "Dessin avec : Répéter 4 fois [ Avancer 50, Tourner de 90° ] ?", o: ["Cercle", "Triangle", "Carré", "Ligne"], c: 2, e: "4 côtés avec angle droit = Carré.", d: "medium" },
    { q: "Qu'est-ce qu'une 'variable' ?", o: ["Une erreur", "Une image", "Une boîte mémoire", "Un mouvement"], c: 2, e: "Stocke une donnée (ex: score).", d: "medium" },
    { q: "A=5, B=A+2, A=B*2. Que vaut A à la fin ?", o: ["10", "14", "7", "5"], c: 1, e: "B=7. A = 7*2 = 14.", d: "hard" },
    { q: "Le bloc 'Si ... Alors' représente :", o: ["Une boucle infinie", "Une instruction conditionnelle", "Une fonction", "Un capteur"], c: 1, e: "Exécute si la condition est vraie.", d: "hard" },
    { q: "Pour tracer un hexagone (6 côtés), de quel angle faut-il tourner à chaque pas ?", o: ["60°", "90°", "120°", "36°"], c: 0, e: "360° / 6 = 60°.", d: "hard" },
    { q: "Comment lancer le programme Scratch en général ?", o: ["En cliquant sur le chat", "En appuyant sur Espace", "En cliquant sur le drapeau vert", "En fermant la fenêtre"], c: 2, e: "Le drapeau vert est l'événement déclencheur par défaut.", d: "easy" },
    { q: "Dans une boucle 'Répéter jusqu'à ce que', on sort de la boucle quand :", o: ["On a fini les 10 fois", "La condition devient vraie", "Il y a une erreur", "Le lutin touche le bord"], c: 1, e: "La boucle s'arrête dès que la condition spécifiée est remplie.", d: "medium" }
  ]
};

let output = 'import { Question } from "./types";\n\nexport const brevetQuestions: Question[] = [\n';

let idCounter = 1;
topics.forEach(topic => {
  output += `  // ===================== ${topic.label.toUpperCase()} =====================\n`;
  const questions = questionsByTopic[topic.id];
  questions.forEach(q => {
    output += `  {
    id: "q-${idCounter++}",
    examGoal: "brevet",
    levelLabel: "Brevet",
    topic: "${topic.id}",
    topicLabel: "${topic.label}",
    difficulty: "${q.d}",
    question: ${JSON.stringify(q.q)},
    options: ${JSON.stringify(q.o)},
    correctOptionIndex: ${q.c},
    explanation: ${JSON.stringify(q.e)}
  },\n`;
  });
});

output = output.slice(0, -2) + '\n];\n';

fs.writeFileSync('src/data/questions/brevet.ts', output);
console.log("Brevet file generated with " + (idCounter - 1) + " questions.");
