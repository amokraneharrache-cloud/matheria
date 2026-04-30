export type ProgramGoal = "brevet" | "bac-premiere" | "terminale";

export type ProgramTopic = {
  id: string;
  label: string;
  description: string;
  priority: "high" | "medium" | "low";
};

export type Program = {
  goal: ProgramGoal;
  title: string;
  subtitle: string;
  topics: ProgramTopic[];
};

// ---------------------------------------------------------
// BREVET
// ---------------------------------------------------------

const brevetProgram: Program = {
  goal: "brevet",
  title: "Brevet des collèges",
  subtitle: "Les grands chapitres du programme de mathématiques de 3e sont couverts progressivement dans le Pack Révision Express.",
  topics: [
    {
      id: "nombres-et-calculs",
      label: "Nombres et calculs",
      description: "Opérations, priorités, calcul numérique.",
      priority: "high",
    },
    {
      id: "fractions",
      label: "Fractions",
      description: "Opérations sur les fractions, simplification, comparaison.",
      priority: "high",
    },
    {
      id: "puissances",
      label: "Puissances",
      description: "Règles de calcul avec les puissances, notation scientifique.",
      priority: "medium",
    },
    {
      id: "calcul-litteral",
      label: "Calcul littéral",
      description: "Développer, factoriser, identités remarquables.",
      priority: "high",
    },
    {
      id: "equations",
      label: "Équations",
      description: "Équations du premier degré, mise en équation de problèmes.",
      priority: "high",
    },
    {
      id: "fonctions",
      label: "Fonctions",
      description: "Images, antécédents, fonctions linéaires et affines.",
      priority: "high",
    },
    {
      id: "proportionnalite",
      label: "Proportionnalité",
      description: "Tableaux, pourcentages, vitesses, échelles.",
      priority: "medium",
    },
    {
      id: "geometrie-plane",
      label: "Géométrie plane",
      description: "Angles, triangles, quadrilatères, cercles, aires.",
      priority: "high",
    },
    {
      id: "pythagore",
      label: "Théorème de Pythagore",
      description: "Calcul de longueurs dans un triangle rectangle.",
      priority: "high",
    },
    {
      id: "thales",
      label: "Théorème de Thalès",
      description: "Proportionnalité dans les configurations de Thalès.",
      priority: "medium",
    },
    {
      id: "transformations",
      label: "Transformations",
      description: "Symétries, translations, rotations, homothéties.",
      priority: "medium",
    },
    {
      id: "probabilites-statistiques",
      label: "Probabilités et statistiques",
      description: "Moyenne, médiane, probabilités simples.",
      priority: "high",
    },
    {
      id: "algorithmique",
      label: "Algorithmique",
      description: "Scratch, boucles, variables, programmes simples.",
      priority: "low",
    },
  ],
};

// ---------------------------------------------------------
// BAC PREMIÈRE
// ---------------------------------------------------------

const bacPremiereProgram: Program = {
  goal: "bac-premiere",
  title: "Bac de maths Première",
  subtitle: "Les grands chapitres du programme de spécialité mathématiques de Première sont couverts progressivement dans le Pack Révision Express.",
  topics: [
    {
      id: "calcul-algebrique",
      label: "Calcul algébrique",
      description: "Manipulations algébriques, équations, inéquations.",
      priority: "high",
    },
    {
      id: "pourcentages-evolutions",
      label: "Pourcentages et évolutions",
      description: "Évolutions successives, taux global, coefficient multiplicateur.",
      priority: "medium",
    },
    {
      id: "fonctions",
      label: "Fonctions",
      description: "Sens de variation, ensemble de définition, courbes représentatives.",
      priority: "high",
    },
    {
      id: "second-degre",
      label: "Second degré",
      description: "Discriminant, racines, forme canonique, signe du trinôme.",
      priority: "high",
    },
    {
      id: "derivation",
      label: "Dérivation",
      description: "Dérivées usuelles, tangente, sens de variation.",
      priority: "high",
    },
    {
      id: "variations",
      label: "Variations et extremums",
      description: "Tableau de variations, extremums locaux et globaux.",
      priority: "medium",
    },
    {
      id: "suites",
      label: "Suites",
      description: "Suites arithmétiques, géométriques, formules explicites.",
      priority: "high",
    },
    {
      id: "probabilites",
      label: "Probabilités",
      description: "Événements, conditionnelles, indépendance, arbres.",
      priority: "high",
    },
    {
      id: "statistiques",
      label: "Statistiques",
      description: "Médiane, quartiles, écart-type, variance.",
      priority: "medium",
    },
    {
      id: "automatismes",
      label: "Automatismes",
      description: "Calcul mental, fractions, puissances, conversions.",
      priority: "medium",
    },
    {
      id: "geometrie-reperage",
      label: "Géométrie et repérage",
      description: "Vecteurs, coordonnées, équations de droites.",
      priority: "medium",
    },
  ],
};

// ---------------------------------------------------------
// TERMINALE
// ---------------------------------------------------------

const terminaleProgram: Program = {
  goal: "terminale",
  title: "Bac Terminale",
  subtitle: "Les grands chapitres du programme de spécialité mathématiques de Terminale sont couverts progressivement dans le Pack Révision Express.",
  topics: [
    {
      id: "suites",
      label: "Suites",
      description: "Récurrence, convergence, suites majorées/minorées.",
      priority: "high",
    },
    {
      id: "limites",
      label: "Limites",
      description: "Limites de fonctions, formes indéterminées, asymptotes.",
      priority: "high",
    },
    {
      id: "continuite",
      label: "Continuité",
      description: "Théorème des valeurs intermédiaires, continuité sur un intervalle.",
      priority: "medium",
    },
    {
      id: "derivation",
      label: "Dérivation",
      description: "Dérivation avancée, composition, dérivées secondes.",
      priority: "high",
    },
    {
      id: "convexite",
      label: "Convexité",
      description: "Fonction convexe, concave, points d'inflexion.",
      priority: "medium",
    },
    {
      id: "logarithme",
      label: "Logarithme népérien",
      description: "Propriétés de ln, dérivée, limites, équations.",
      priority: "high",
    },
    {
      id: "exponentielle",
      label: "Fonction exponentielle",
      description: "Propriétés de exp, dérivée, croissances comparées.",
      priority: "high",
    },
    {
      id: "equations-differentielles",
      label: "Équations différentielles",
      description: "Équations y' = ay, y' = ay + b.",
      priority: "medium",
    },
    {
      id: "integrales",
      label: "Intégrales",
      description: "Primitives, calcul d'aires, propriétés de l'intégrale.",
      priority: "high",
    },
    {
      id: "probabilites",
      label: "Probabilités",
      description: "Lois continues, espérance, indépendance.",
      priority: "high",
    },
    {
      id: "loi-binomiale",
      label: "Loi binomiale",
      description: "Schéma de Bernoulli, coefficients binomiaux.",
      priority: "high",
    },
    {
      id: "variables-aleatoires",
      label: "Variables aléatoires",
      description: "Espérance, variance, écart-type.",
      priority: "medium",
    },
    {
      id: "geometrie-espace",
      label: "Géométrie dans l'espace",
      description: "Plans, droites, positions relatives.",
      priority: "medium",
    },
    {
      id: "vecteurs-droites-plans",
      label: "Vecteurs, droites et plans",
      description: "Représentations paramétriques, produit scalaire.",
      priority: "medium",
    },
    {
      id: "denombrement",
      label: "Dénombrement",
      description: "Combinaisons, arrangements, factorielles.",
      priority: "low",
    },
    {
      id: "algorithmique",
      label: "Algorithmique",
      description: "Python, boucles, fonctions, algorithmes classiques.",
      priority: "low",
    },
  ],
};

// ---------------------------------------------------------
// EXPORTS
// ---------------------------------------------------------

export const allPrograms: Program[] = [brevetProgram, bacPremiereProgram, terminaleProgram];

export function getProgram(goal: ProgramGoal): Program | undefined {
  return allPrograms.find((p) => p.goal === goal);
}

export function getProgramTopicIds(goal: ProgramGoal): string[] {
  const program = getProgram(goal);
  return program ? program.topics.map((t) => t.id) : [];
}
