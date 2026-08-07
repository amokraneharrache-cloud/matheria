import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Printer,
  TriangleAlert,
} from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { PrintButton } from "@/components/marketing/PrintButton";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import styles from "../seo-resource.module.css";

const pagePath = "/python-bac-maths-terminale";
const title = "Python au Bac Maths Terminale : algorithmes et exemples";
const description =
  "Découvre les programmes Python utiles en Terminale spécialité maths : suites, seuils, sommes, dichotomie, simulations et probabilités, avec exemples expliqués.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

type PythonExample = {
  id: string;
  section: string;
  objective: string;
  code: string;
  result: string;
  explanation: string[];
  mistake: string;
  exercise: string;
};

const pythonStructures = [
  ["Mémoriser ou mettre à jour une valeur", "variable et affectation"],
  ["Répéter un nombre connu de fois", "boucle for avec range"],
  ["Répéter jusqu’à atteindre un seuil", "boucle while"],
  ["Choisir entre plusieurs cas", "condition if / elif / else"],
  ["Réutiliser un calcul", "fonction définie avec def"],
  ["Accumuler des termes", "variable somme initialisée à 0"],
  ["Conserver plusieurs résultats", "liste, seulement si elle est utile"],
  ["Simuler un tirage", "fonction aléatoire adaptée à l’expérience"],
] as const;

const examples: PythonExample[] = [
  {
    id: "bases",
    section: "1. Les bases Python à maîtriser",
    objective: "Comprendre une affectation et une condition simple.",
    code: `u = 2
# On remplace u par la valeur suivante
u = 3 * u - 1

# On choisit un message selon la valeur obtenue
if u > 4:
    message = "seuil dépassé"
else:
    message = "seuil non dépassé"

print(u, message)`,
    result: "Résultat attendu : 5 seuil dépassé",
    explanation: [
      "u reçoit d’abord la valeur 2.",
      "La deuxième affectation remplace u par 3 × 2 − 1, donc par 5.",
      "La condition u > 4 est vraie : Python exécute le premier bloc indenté.",
      "print affiche la valeur finale et le message choisi.",
    ],
    mistake:
      "Lire u = 3 * u - 1 comme une égalité mathématique. En Python, = affecte une nouvelle valeur à la variable.",
    exercise:
      "Remplace la valeur initiale par u = 1 et prévois l’affichage avant d’exécuter le programme.",
  },
  {
    id: "suite-recurrence",
    section: "2. Calculer les termes d’une suite définie par récurrence",
    objective: "Calculer u₅ pour u₀ = 2 et uₙ₊₁ = 0,8uₙ + 3.",
    code: `u = 2  # valeur de u_0

for n in range(5):
    # u reçoit le terme suivant
    u = 0.8 * u + 3

print(u)`,
    result: "Résultat attendu : 10.74016",
    explanation: [
      "Avant la boucle, u contient u₀.",
      "range(5) produit cinq passages, associés ici au calcul de u₁ à u₅.",
      "À chaque passage, l’ancienne valeur de u sert à calculer la suivante.",
      "Après cinq mises à jour, u contient u₅.",
    ],
    mistake:
      "Écrire range(6) en pensant qu’il faut inclure l’indice 5 : cela calculerait u₆, car u₀ est déjà connu avant la boucle.",
    exercise: "Modifie le programme pour afficher successivement u₁, u₂, …, u₅.",
  },
  {
    id: "seuil",
    section: "3. Rechercher le premier rang dépassant un seuil",
    objective: "Trouver le premier rang n pour lequel uₙ > 10.",
    code: `u = 2  # valeur de u_0
n = 0

# On continue tant que le seuil n'est pas dépassé
while u <= 10:
    u = 0.8 * u + 3
    n = n + 1

print(n, u)`,
    result: "Résultat attendu : 5 10.74016",
    explanation: [
      "u et n représentent au départ u₀ et son rang 0.",
      "La boucle continue tant que le seuil 10 n’est pas strictement dépassé.",
      "u et n sont mis à jour ensemble afin de conserver le bon indice.",
      "À la sortie, la condition est fausse : uₙ > 10 et n est le premier rang correspondant.",
    ],
    mistake:
      "Oublier n = n + 1 ou utiliser u < 10 lorsque l’énoncé demande un dépassement strict et qu’une égalité est possible.",
    exercise: "Recherche de la même manière le premier rang pour lequel uₙ > 12.",
  },
  {
    id: "somme",
    section: "4. Calculer une somme",
    objective: "Calculer la somme des dix premiers termes vₖ = k², de v₁ à v₁₀.",
    code: `somme = 0  # accumulateur

for k in range(1, 11):
    # On ajoute le carré courant
    somme = somme + k ** 2

print(somme)`,
    result: "Résultat attendu : 385",
    explanation: [
      "La variable somme est initialisée à 0, élément neutre de l’addition.",
      "range(1, 11) fournit les entiers de 1 à 10 : la borne 11 est exclue.",
      "k ** 2 calcule le carré de k.",
      "Chaque carré est ajouté au total déjà accumulé.",
    ],
    mistake: "Commencer à 1 sans initialiser somme, ou écrire range(1, 10) et oublier 10².",
    exercise: "Adapte le programme pour calculer 1³ + 2³ + … + 20³.",
  },
  {
    id: "dichotomie",
    section: "5. Approcher une solution par dichotomie",
    objective: "Approcher la solution positive de x² = 2 à 10⁻³ près.",
    code: `a = 1
b = 2

# On réduit l'encadrement [a, b]
while b - a > 0.0001:
    m = (a + b) / 2
    if m ** 2 < 2:
        a = m
    else:
        b = m

print(round((a + b) / 2, 3))`,
    result: "Résultat attendu : 1.414 (arrondi au millième).",
    explanation: [
      "La solution positive est encadrée au départ entre 1 et 2.",
      "m est le milieu de l’intervalle courant.",
      "Si m² < 2, la solution se trouve entre m et b ; sinon, elle se trouve entre a et m.",
      "La boucle s’arrête lorsque la largeur de l’encadrement ne dépasse plus 0,0001, ce qui suffit ici pour afficher un millième fiable.",
    ],
    mistake:
      "Mettre à jour la mauvaise borne. Il faut d’abord relier le test à la monotonie de la fonction étudiée sur l’intervalle.",
    exercise: "Adapte le test pour approcher la solution positive de x² = 5.",
  },
  {
    id: "simulation",
    section: "6. Simuler une expérience aléatoire",
    objective: "Simuler un lancer de dé équilibré et tester si le résultat vaut 6.",
    code: `from random import randint

# Un lancer de dé équilibré
resultat = randint(1, 6)
succes = resultat == 6

print(resultat, succes)`,
    result:
      "Le premier affichage est un entier de 1 à 6 ; le second vaut True uniquement si cet entier est 6.",
    explanation: [
      "randint(1, 6) choisit un entier parmi 1, 2, …, 6, bornes incluses.",
      "== compare deux valeurs, contrairement à = qui réalise une affectation.",
      "La variable succes contient un booléen : True ou False.",
      "Une simulation fournit une issue possible, pas la probabilité théorique à elle seule.",
    ],
    mistake: "Utiliser randint(1, 7), qui peut produire 7, ou confondre resultat = 6 et resultat == 6.",
    exercise: "Modifie le succès pour simuler l’événement « obtenir un nombre pair ».",
  },
  {
    id: "estimation-probabilite",
    section: "7. Estimer une probabilité par répétition",
    objective: "Estimer la probabilité d’obtenir 6 avec 10 000 lancers simulés.",
    code: `from random import randint, seed

# La graine rend l'exemple reproductible
seed(0)
nombre_succes = 0
N = 10_000

for _ in range(N):
    # On compte uniquement les 6
    if randint(1, 6) == 6:
        nombre_succes = nombre_succes + 1

frequence = nombre_succes / N
print(frequence)`,
    result:
      "Le programme affiche une fréquence proche de 1/6 ; dans l’environnement de vérification utilisé ici, elle vaut 0.1669.",
    explanation: [
      "seed(0) rend ici la suite de tirages reproductible pour vérifier l’exemple.",
      "Le compteur augmente seulement lorsque le lancer simulé vaut 6.",
      "La fréquence est le nombre de succès divisé par le nombre total d’essais.",
      "Elle est proche de 1/6, sans être obligatoirement égale à la probabilité théorique.",
    ],
    mistake: "Présenter la fréquence simulée comme une preuve que la probabilité vaut exactement 1/6.",
    exercise: "Estime la probabilité d’obtenir un nombre supérieur ou égal à 5.",
  },
  {
    id: "traduction",
    section: "8. Traduire un algorithme écrit en français en Python",
    objective: "Traduire : « calculer le carré d’un réel puis retrancher 2 ».",
    code: `def image(x):
    # Carré de x, puis retrait de 2
    resultat = x ** 2 - 2
    return resultat

print(image(3))`,
    result: "Résultat attendu : 7",
    explanation: [
      "def image(x) crée une fonction qui reçoit le nombre x.",
      "Le bloc indenté traduit les deux opérations dans l’ordre demandé.",
      "return renvoie le résultat au point d’appel.",
      "image(3) calcule 3² − 2.",
    ],
    mistake: "Utiliser print à la place de return dans la fonction : la valeur serait affichée mais difficile à réutiliser dans un calcul.",
    exercise: "Écris une fonction qui renvoie 2x³ + 1.",
  },
  {
    id: "programme-trous",
    section: "9. Compléter un programme à trous",
    objective:
      "Pour un entier naturel n, compléter une fonction qui calcule uₙ avec u₀ = 1 et uₖ₊₁ = 2uₖ + 1.",
    code: `def terme(n):
    u = 1
    # La relation est appliquée n fois
    for k in range(n):
        u = 2 * u + 1
    return u

print(terme(3))`,
    result: "Résultat attendu : 15",
    explanation: [
      "u = 1 correspond à la valeur initiale u₀.",
      "Pour n entier naturel, atteindre uₙ demande d’appliquer la relation de récurrence n fois.",
      "La variable k compte les passages mais n’intervient pas dans la formule.",
      "terme(3) calcule successivement 3, 7 puis 15.",
    ],
    mistake: "Placer return u dans la boucle : la fonction s’arrêterait dès le premier passage.",
    exercise: "Sans exécuter le programme, détermine terme(4), puis vérifie ta réponse.",
  },
  {
    id: "corriger-erreur",
    section: "10. Identifier et corriger une erreur dans un programme",
    objective: "Corriger le calcul de la somme des entiers de 1 à 5.",
    code: `# Version corrigée du programme
somme = 0  # correction : partir de 0

# 6 est exclu, donc la boucle va de 1 à 5
for k in range(1, 6):
    somme = somme + k

print(somme)`,
    result: "Programme corrigé — résultat attendu : 15",
    explanation: [
      "La version erronée initialisait somme à 1 et utilisait range(1, 5).",
      "Un accumulateur additif doit commencer à 0.",
      "La borne finale de range étant exclue, il faut écrire 6 pour inclure 5.",
      "Le résultat 15 peut être contrôlé mentalement avec 1 + 2 + 3 + 4 + 5.",
    ],
    mistake: "Corriger une seule des deux erreurs et s’arrêter parce que le programme s’exécute sans message d’erreur.",
    exercise: "Introduis volontairement une erreur de borne, puis explique précisément son effet sur le résultat.",
  },
];

const memoItems = [
  "Je repère les données initiales avant la boucle.",
  "Je choisis for si le nombre de répétitions est connu, while si l’arrêt dépend d’une condition.",
  "Je vérifie si la borne finale de range doit être incluse ou exclue.",
  "J’aligne l’indice de la suite avec le nombre de passages dans la boucle.",
  "J’utilise == pour comparer et = pour affecter.",
  "J’initialise un compteur ou une somme avant de l’actualiser.",
  "Je contrôle l’indentation de chaque bloc.",
  "Je teste le résultat sur un cas calculable à la main.",
];

const globalPythonMistakes = [
  "Confondre l’affectation = avec la comparaison ==.",
  "Oublier que la borne finale de range est exclue.",
  "Décaler le rang d’une suite d’un passage de boucle.",
  "Utiliser while sans mettre à jour la variable de sa condition.",
  "Placer return trop tôt dans une fonction ou une boucle.",
  "Interpréter une fréquence simulée comme une probabilité exacte.",
];

const faqItems: FaqItem[] = [
  {
    question: "Faut-il apprendre une liste d’algorithmes Python par cœur pour le Bac ?",
    answer:
      "Non. Cette page ne présente pas une liste officielle fermée. Le plus utile est de savoir lire, compléter et adapter des structures courantes à un problème mathématique.",
  },
  {
    question: "Quelle différence entre une boucle for et une boucle while ?",
    answer:
      "On utilise généralement for lorsque le nombre de répétitions est connu, et while lorsque la répétition continue tant qu’une condition reste vraie, par exemple avant le dépassement d’un seuil.",
  },
  {
    question: "Pourquoi range(1, 6) s’arrête-t-il à 5 ?",
    answer:
      "Dans range(debut, fin), la valeur fin est exclue. range(1, 6) produit donc 1, 2, 3, 4 et 5.",
  },
  {
    question: "Une simulation donne-t-elle la probabilité exacte ?",
    answer:
      "Non. Elle produit une fréquence expérimentale. Quand le nombre d’essais augmente, cette fréquence peut se rapprocher de la probabilité théorique, mais elle reste issue d’une expérience aléatoire.",
  },
];

const internalLinks = [
  { href: "/methodes-maths-terminale/etudier-une-suite", label: "Étudier une suite" },
  { href: "/methodes-maths-terminale/probabilites-conditionnelles", label: "Probabilités conditionnelles" },
  { href: "/methodes-maths-terminale/calculer-une-limite", label: "Calculer une limite" },
  { href: "/programme-maths-terminale", label: "Programme de Terminale" },
  { href: "/exercices-maths-terminale/suites", label: "Exercices sur les suites" },
  { href: "/exercices-maths-terminale/probabilites", label: "Exercices de probabilités" },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac guidés" },
  { href: "/quiz-maths-terminale-specialite#algorithmique-python", label: "Questions de quiz sur Python" },
];

export default function PythonBacMathsTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Python en Terminale", path: pagePath },
          ]),
        ]}
      />

      <div className={styles.printPage}>
        <ChapterHero
          eyebrow="Algorithmique et programmation — Terminale"
          title="Python en Terminale spécialité maths : les algorithmes utiles"
          description={
            <>
              Apprends à traduire un problème mathématique en instructions Python :
              calculer une suite, rechercher un seuil, approcher une solution ou
              simuler une expérience aléatoire.
            </>
          }
          secondaryDescription={
            <>
              Il ne s’agit pas d’une liste officielle fermée à réciter. Les exemples
              présentent des structures courantes à comprendre, expliquer et adapter
              aux données de l’exercice.
            </>
          }
          ctas={[]}
        />

        <section className="border-y border-blue-100 bg-blue-50 px-4 py-8 print:hidden">
          <nav aria-label="Sommaire Python" className="mx-auto max-w-6xl">
            <p className="font-bold text-blue-950">Aller directement à un exemple</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <a
                  key={example.id}
                  href={`#${example.id}`}
                  className="rounded-full border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-900 hover:border-blue-400"
                >
                  {example.section.replace(/^\d+\. /, "")}
                </a>
              ))}
            </div>
          </nav>
        </section>

        <section className="px-4 py-14">
          <div className="mx-auto max-w-6xl space-y-14">
            <section>
              <Code2 className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Tableau problème → structure Python
              </h2>
              <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
                <table className="min-w-[680px] w-full border-collapse text-left">
                  <thead className="bg-slate-950 text-white">
                    <tr>
                      <th className="px-4 py-3">Problème mathématique</th>
                      <th className="px-4 py-3">Structure Python à envisager</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pythonStructures.map(([problem, structure]) => (
                      <tr key={problem} className="border-t border-slate-200 odd:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">{problem}</td>
                        <td className="px-4 py-3 font-mono text-blue-950">{structure}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section aria-labelledby="bases-python">
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["Variables", "Un nom mémorise une valeur qui peut ensuite être remplacée."],
                  ["Boucles et conditions", "for, while et if organisent les répétitions et les choix."],
                  ["Fonctions et listes", "def rend un calcul réutilisable ; une liste conserve plusieurs valeurs si nécessaire."],
                ].map(([heading, text]) => (
                  <article key={heading} className="rounded-xl border border-slate-200 bg-slate-50 p-5">
                    <h2 id={heading === "Variables" ? "bases-python" : undefined} className="text-xl font-bold text-slate-950">
                      {heading}
                    </h2>
                    <p className="mt-2 leading-7 text-slate-700">{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section aria-label="Exemples Python corrigés" className="space-y-10">
              {examples.map((example) => (
                <article
                  key={example.id}
                  id={example.id}
                  className={`${styles.exampleCard} scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7`}
                >
                  <p className="text-sm font-bold uppercase tracking-[0.14em] text-blue-800">
                    {example.section}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold text-slate-950">
                    {example.objective}
                  </h2>
                  <div className="mt-5 min-w-0 overflow-hidden rounded-xl bg-slate-950">
                    <pre className="overflow-x-auto p-5 text-sm leading-7 text-blue-50" tabIndex={0}>
                      <code>{example.code}</code>
                    </pre>
                  </div>
                  <p className="mt-4 rounded-lg bg-emerald-50 p-4 font-semibold text-emerald-950">
                    {example.result}
                  </p>
                  <div className="mt-6 grid gap-5 lg:grid-cols-2">
                    <div>
                      <h3 className="font-bold text-slate-950">Explication ligne par ligne</h3>
                      <ol className="mt-3 space-y-2 leading-7 text-slate-700">
                        {example.explanation.map((line, index) => (
                          <li key={line} className="flex gap-3">
                            <span className="font-bold text-blue-800">{index + 1}.</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="space-y-4">
                      <div className="rounded-xl bg-red-50 p-4 text-red-950">
                        <h3 className="flex items-center gap-2 font-bold">
                          <TriangleAlert className="h-5 w-5" aria-hidden="true" />
                          Erreur fréquente
                        </h3>
                        <p className="mt-2 leading-7">{example.mistake}</p>
                      </div>
                      <div className="rounded-xl bg-blue-50 p-4 text-blue-950">
                        <h3 className="font-bold">Exercice rapide</h3>
                        <p className="mt-2 leading-7">{example.exercise}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
              <TriangleAlert className="h-7 w-7 text-red-700" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-red-950">
                Erreurs fréquentes dans un programme Python
              </h2>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {globalPythonMistakes.map((mistake) => (
                  <li key={mistake} className="rounded-xl bg-white p-4 leading-7 text-red-950">
                    {mistake}
                  </li>
                ))}
              </ul>
            </section>

            <section className={`${styles.checklistCard} rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8`}>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <Printer className="h-7 w-7 text-blue-800" aria-hidden="true" />
                  <h2 className="mt-4 text-3xl font-bold text-slate-950">Mémo Python imprimable</h2>
                  <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                    Huit vérifications avant de valider un programme dans un exercice.
                  </p>
                </div>
                <PrintButton label="Imprimer le mémo" />
              </div>
              <ul className="mt-6 grid gap-3 md:grid-cols-2">
                {memoItems.map((item) => (
                  <li key={item} className="flex gap-3 rounded-xl bg-white p-4 leading-7 text-slate-700">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <ChapterInternalLinks
              title="Continuer avec les chapitres associés"
              links={internalLinks}
              variant="cards"
            />

            <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8 print:hidden">
              <h2 className="text-2xl font-bold">Teste maintenant tes réflexes Python</h2>
              <p className="mt-3 max-w-3xl leading-7 text-slate-300">
                Le quiz Terminale contient deux questions d’algorithmique parmi les vingt questions corrigées.
              </p>
              <Link
                href="/quiz-maths-terminale-specialite#algorithmique-python"
                className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-blue-950"
              >
                Ouvrir le quiz
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <FaqAccordion items={faqItems} sourcePage={pagePath} />
          </div>
        </section>
      </div>
    </SeoPageLayout>
  );
}
