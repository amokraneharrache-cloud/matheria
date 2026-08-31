import assert from "node:assert/strict";

const closeTo = (actual, expected, tolerance = 1e-9, label = "valeur") => {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${label}: ${actual} au lieu de ${expected}`);
};

const combination = (n, k) => {
  let value = 1;
  for (let i = 1; i <= k; i += 1) value = (value * (n - k + i)) / i;
  return value;
};

const binomial = (n, p, k) => combination(n, k) * p ** k * (1 - p) ** (n - k);
const cdf = (n, p, k) => Array.from({ length: k + 1 }, (_, index) => binomial(n, p, index)).reduce((sum, value) => sum + value, 0);
const bisect = (fn, left, right) => {
  let a = left;
  let b = right;
  for (let i = 0; i < 120; i += 1) {
    const middle = (a + b) / 2;
    if (fn(a) * fn(middle) <= 0) b = middle;
    else a = middle;
  }
  return (a + b) / 2;
};

// Antilles-Guyane J1
closeTo(12.5, 0 * 0.2 + 10 * 0.05 + 16 * 0.75, 1e-12, "AG J1 espérance");
closeTo(40.75, 197 - 12.5 ** 2, 1e-12, "AG J1 variance");
assert.ok(1 - 489 / 50 ** 2 > 0.8);
closeTo((10 / 3) * Math.log(7), 6.486367, 1e-5, "AG J1 seuil continu");
assert.equal(Math.floor(Math.log(1 / 15) / Math.log(0.7)) + 1, 8);
closeTo((15 / 8) * Math.log(3) - 1, 1.059897, 1e-5, "AG J1 aire");

// Antilles-Guyane J2
closeTo(0.96 * 0.94 + 0.04 * 0.35, 0.9164, 1e-12, "AG J2 relais");
closeTo(binomial(50, 0.04, 4), 0.09015931908313272, 1e-12, "AG J2 binomiale");
closeTo(1 - 0.96 ** 50, 0.8701142064779617, 1e-12, "AG J2 au moins un");
assert.ok(3 / Math.sqrt(34) > 0.5, "AG J2 angle strictement inférieur à 60°");
closeTo(35 / 41, 0.8536585365853658, 1e-12, "AG J2 limite affine");
closeTo(bisect((x) => -1 - Math.log(x) / x ** 2, 0.01, Math.sqrt(Math.E)), 0.6529186404192047, 1e-12, "AG J2 alpha");

// Amérique du Nord J1
closeTo(0.1125 + 0.18 + 0.12, 0.4125, 1e-12, "AN J1 probabilité totale");
assert.equal(Math.ceil(Math.log(0.001) / Math.log(0.5875)), 13);
const prices = [5, 7, 10, 12, 16, 18];
const priceProbabilities = [0.1375, 0.1125, 0.42, 0.18, 0.03, 0.12];
const priceMean = prices.reduce((sum, price, index) => sum + price * priceProbabilities[index], 0);
const priceVariance = prices.reduce((sum, price, index) => sum + price ** 2 * priceProbabilities[index], 0) - priceMean ** 2;
closeTo(priceMean, 10.475, 1e-12, "AN J1 prix moyen");
closeTo(priceVariance, 13.704375, 1e-12, "AN J1 variance prix");
let population = 4;
let populationRank = 0;
while (population >= 2.2) {
  population = 4 - 4 / population;
  populationRank += 1;
}
assert.equal(populationRank, 10);
closeTo(4 / 6, 2 / 3, 1e-12, "AN J1 cosinus pyramide");
closeTo(2 / Math.sqrt(5), (2 * Math.sqrt(5)) / 5, 1e-12, "AN J1 distance plan");

// Amérique du Nord J2
closeTo(binomial(15, 0.09, 2), 0.2495815158611966, 1e-12, "AN J2 exactement deux");
closeTo(cdf(15, 0.09, 2), 0.8530963254086826, 1e-12, "AN J2 au plus deux");
closeTo(Math.sqrt((1.5 * 4 ** 8) / (1 + 0.5 * 4 ** 8)), Math.sqrt(3), 1e-3, "AN J2 suite explicite");
closeTo((1 / 3) * 3 * 3, 3, 1e-12, "AN J2 volume tétraèdre");
closeTo(bisect((x) => x * Math.log(x) ** 2 - 2, 1, 5), 2.4625589472069658, 1e-12, "AN J2 alpha logarithmique");

// Centres étrangers groupe 1 J1
closeTo(0.6 * 0.9 + 0.12 * 0.95 + 0.28 * 0.85, 0.892, 1e-12, "G1 J1 conformité");
closeTo(binomial(75, 0.108, 6), 0.12014057795303844, 1e-12, "G1 J1 six défauts");
closeTo(1 - cdf(75, 0.108, 8), 0.42207878162427837, 1e-12, "G1 J1 plus de huit");
assert.equal(Math.ceil(1.8063 / 0.05), 37);
closeTo(Math.acos(4 / 5) * 180 / Math.PI, 36.86989764584401, 1e-10, "G1 J1 angle cube");
closeTo(2 / 1.5, 4 / 3, 1e-12, "G1 J1 distance cube");

// Centres étrangers groupe 1 J2
closeTo(9 / (3 * Math.sqrt(18)), 1 / Math.sqrt(2), 1e-12, "G1 J2 angle 45°");
closeTo(24.19 / 150, 0.16126666666666667, 1e-12, "G1 J2 variance moyenne");
assert.ok(1 - (24.19 / 150) / 16 > 0.98);
closeTo(bisect((x) => Math.log(3 * x ** 2 + 2 * x) - x, 2, 10), 4.047100312996516, 1e-12, "G1 J2 point fixe");
let lower = 2;
let upper = 10;
let iterations = 0;
while (upper - lower > 0.01) {
  lower = Math.log(3 * lower ** 2 + 2 * lower);
  upper = Math.log(3 * upper ** 2 + 2 * upper);
  iterations += 1;
}
assert.equal(iterations, 9);
closeTo(lower, 4.043583931991015, 1e-12, "G1 J2 borne basse");
const tangentPolynomial = (x) => x ** 3 - 4 * x ** 2 + 2 * x + 2;
const tangentRoots = [
  bisect(tangentPolynomial, -3, 0),
  bisect(tangentPolynomial, 0, 2),
  bisect(tangentPolynomial, 2, 5),
];
assert.equal(tangentRoots.length, 3);
closeTo(tangentRoots[1], 1.3111078174659818, 1e-12, "G1 J2 racine centrale");

// Asie J1
const asiaP = (n) => 5 / 8 - (1 / 8) * (7 / 15) ** (n - 1);
closeTo(asiaP(1), 1 / 2, 1e-12, "Asie J1 p1");
closeTo(asiaP(2), 17 / 30, 1e-12, "Asie J1 p2");
assert.ok(asiaP(3) < 0.6 && asiaP(4) >= 0.6);
closeTo((Math.E ** 4 - 1) / 4, Math.E ** 4 / 4 - 1 / 4, 1e-12, "Asie J1 intégrale exponentielle");
closeTo(bisect((x) => x * Math.cos(x) - Math.sin(x), Math.PI, 2 * Math.PI), 4.493409457909063, 1e-12, "Asie J1 alpha trigonométrique");

// Asie J2
const asiaU = (n) => (2 * n) / (2 * n + 1);
closeTo(asiaU(1), 2 / 3, 1e-12, "Asie J2 u1");
assert.ok(asiaU(4999) < 0.9999 && asiaU(5000) >= 0.9999);
closeTo(binomial(16, 0.492, 5), 0.07321650242457726, 1e-12, "Asie J2 cinq réussites");
closeTo(1 - cdf(16, 0.492, 5), 0.8827387303621685, 1e-12, "Asie J2 au moins six");
closeTo(bisect((x) => -2 * x ** 3 + 3 * x ** 2 - 0.9, 0, 1), 0.8041998943409083, 1e-12, "Asie J2 seuil p");
closeTo((1 / 3) * ((3 * Math.sqrt(2)) / 2) * 3 * Math.sqrt(2), 3, 1e-12, "Asie J2 volume");
assert.equal(combination(32, 5) - combination(28, 5), 103096);
closeTo((9 / 50) / (7 / 25), 9 / 14, 1e-12, "Asie J2 conditionnelle");

console.log("Annales math review: calculs numériques et identités clés validés pour les 32 nouveaux exercices.");
