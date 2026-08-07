import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2, SquareFunction } from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import {
  ChecklistBlock,
  CorrectedExerciseList,
  FrequentMistakesBlock,
  ResourceTable,
  ResourceToc,
  type CorrectedExercise,
} from "@/components/marketing/J41SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/primitives-terminale-specialite-maths";
const title = "Primitives Terminale : méthodes, formules et exercices corrigés";
const description =
  "Apprends à reconnaître et calculer une primitive en Terminale spécialité maths avec formules, méthodes, exemples et exercices corrigés.";

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

const exercises: CorrectedExercise[] = [
  {
    label: "Exemple 1 — polynôme",
    title: "Primitiver 6x² − 4",
    statement: "Déterminer toutes les primitives de f(x) = 6x² − 4 sur ℝ.",
    trap: "Diviser 6 par 2 au lieu de diviser par le nouvel exposant 3.",
    method: "Primitiver séparément chaque terme grâce à la linéarité.",
    calculations: ["∫ 6x² dx = 6 × x³/3 = 2x³", "∫ (−4) dx = −4x"],
    answer: "Les primitives sont F(x) = 2x³ − 4x + C, avec C ∈ ℝ.",
    why: "La dérivée de 2x³ − 4x + C vaut bien 6x² − 4 sur ℝ.",
  },
  {
    label: "Exemple 2 — exponentielle",
    title: "Primitiver 3eˣ",
    statement: "Déterminer toutes les primitives de f(x) = 3eˣ sur ℝ.",
    trap: "Modifier l’exponentielle alors que la dérivée de eˣ est eˣ.",
    method: "Conserver eˣ et le facteur constant 3.",
    calculations: ["F(x) = 3eˣ + C", "F’(x) = 3eˣ"],
    answer: "Les primitives sont F(x) = 3eˣ + C, avec C ∈ ℝ.",
    why: "L’exponentielle est sa propre dérivée.",
  },
  {
    label: "Exemple 3 — somme simple",
    title: "Associer polynôme et cosinus",
    statement: "Déterminer les primitives de f(x) = 2x + cos(x) sur ℝ.",
    trap: "Écrire −sin(x) comme primitive de cos(x).",
    method: "Utiliser la linéarité et lire le tableau des dérivées à l’envers.",
    calculations: ["∫ 2x dx = x²", "∫ cos(x) dx = sin(x)"],
    answer: "F(x) = x² + sin(x) + C, avec C ∈ ℝ.",
    why: "La dérivée de sin(x) est cos(x), tandis que celle de −cos(x) est sin(x).",
  },
  {
    label: "Exemple 4 — forme composée",
    title: "Reconnaître u’eᵘ",
    statement: "Déterminer les primitives de f(x) = 2x e^(x²) sur ℝ.",
    trap: "Oublier de vérifier que le facteur 2x est exactement la dérivée de x².",
    method: "Poser u(x) = x² ; alors u’(x) = 2x et f = u’eᵘ.",
    calculations: ["F(x) = e^(x²) + C", "F’(x) = 2x e^(x²)"],
    answer: "Les primitives sont F(x) = e^(x²) + C, avec C ∈ ℝ.",
    why: "La composition eᵘ a pour dérivée u’eᵘ.",
  },
  {
    label: "Exemple 5 — condition initiale",
    title: "Déterminer la constante",
    statement: "Trouver la primitive F de f(x) = 3x² qui vérifie F(1) = 5.",
    trap: "S’arrêter à x³ + C sans utiliser la condition donnée.",
    method: "Écrire la famille des primitives, puis remplacer x par 1.",
    calculations: ["F(x) = x³ + C", "F(1) = 1 + C = 5", "C = 4"],
    answer: "L’unique primitive demandée est F(x) = x³ + 4.",
    why: "La condition F(1)=5 sélectionne une seule constante dans la famille F+C.",
  },
  {
    label: "Exemple 6 — vérification",
    title: "Vérifier une primitive proposée",
    statement:
      "Vérifier que F(x) = (2x+1)⁴/8 est une primitive de f(x) = (2x+1)³ sur ℝ.",
    trap: "Comparer seulement les expressions sans dériver F.",
    method: "Dériver la composée en faisant apparaître la dérivée de 2x+1.",
    calculations: ["F’(x) = (1/8) × 4(2x+1)³ × 2", "F’(x) = (2x+1)³ = f(x)"],
    answer: "F est bien une primitive de f sur ℝ.",
    why: "La définition exige l’égalité F’ = f pour tout x de l’intervalle.",
  },
];

const mistakes = [
  "Oublier +C lorsqu’on demande toutes les primitives.",
  "Ajouter +C au résultat final d’une intégrale définie F(b)−F(a).",
  "Confondre le sens dérivée → fonction avec le sens fonction → primitive.",
  "Ne pas dériver la primitive proposée pour la vérifier.",
  "Utiliser ln|u| alors que u s’annule sur l’intervalle étudié.",
  "Oublier le facteur créé ou exigé par la dérivation d’une composée.",
];

const checklist = [
  "J’ai précisé l’intervalle sur lequel je cherche la primitive.",
  "J’ai identifié une fonction de référence ou une forme composée.",
  "J’ai conservé les facteurs constants utiles.",
  "J’ai contrôlé les conditions de domaine, notamment pour 1/x et u’/u.",
  "J’ai ajouté +C si toutes les primitives sont demandées.",
  "J’ai utilisé la condition F(x₀)=y₀ pour déterminer C si nécessaire.",
  "J’ai dérivé mon résultat et retrouvé exactement f.",
  "Je n’ai pas ajouté de constante au résultat d’une intégrale définie.",
];

const faqItems: FaqItem[] = [
  {
    question: "Qu’est-ce qu’une primitive d’une fonction ?",
    answer:
      "Une fonction F est une primitive de f sur un intervalle I lorsque F est dérivable sur I et que F’(x)=f(x) pour tout x de I.",
  },
  {
    question: "Pourquoi ajoute-t-on une constante C ?",
    answer:
      "La dérivée d’une constante est nulle. Si F est une primitive de f, alors F+C l’est aussi. Réciproquement, deux primitives d’une même fonction continue sur un intervalle diffèrent d’une constante.",
  },
  {
    question: "Comment vérifier une primitive ?",
    answer:
      "On dérive l’expression proposée sur l’intervalle indiqué. Si la dérivée obtenue est exactement la fonction de départ sur tout cet intervalle, la primitive est correcte.",
  },
  {
    question: "Quelle est la différence entre primitive et intégrale ?",
    answer:
      "Une primitive est une fonction F telle que F’=f. Si f est continue sur un intervalle contenant a et b et si F y est une primitive de f, alors l’intégrale définie entre a et b est le nombre F(b)−F(a).",
  },
  {
    question: "Les primitives sont-elles évaluables à l’écrit du Bac 2027 ?",
    answer:
      "Oui. Depuis la session 2024, l’épreuve porte sur l’ensemble du programme de Terminale en vigueur, qui comprend les primitives. Cela ne garantit pas qu’un sujet précis comportera une question sur ce chapitre.",
  },
];

const internalLinks = [
  {
    href: "/methodes-maths-terminale/integrales",
    label: "Calculer et interpréter une intégrale",
  },
  {
    href: "/equations-differentielles-terminale",
    label: "Résoudre une équation différentielle",
  },
  {
    href: "/articles/exponentielle-terminale-methodes",
    label: "Revoir la fonction exponentielle",
  },
  {
    href: "/formules-bac-maths-terminale",
    label: "Retrouver les formules de Terminale",
  },
  {
    href: "/demonstrations-bac-maths-terminale",
    label: "Travailler les démonstrations du programme",
  },
  {
    href: "/programme-maths-terminale/integrales",
    label: "Consulter le chapitre intégrales",
  },
];

export default function PrimitivesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Primitives", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Terminale spécialité — primitives"
        title="Calculer une primitive en Terminale : méthode complète"
        description={
          <>
            Reconnais la forme, propose une primitive, puis dérive-la. Cette
            vérification transforme un tableau de formules en méthode fiable.
          </>
        }
        secondaryDescription="Cette page répond à « comment trouver une primitive ? ». La page intégrales traite séparément le calcul entre deux bornes et l’interprétation d’une aire."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire primitives Terminale"
        items={[
          { href: "#definition", label: "Définition" },
          { href: "#tableau", label: "Primitives usuelles" },
          { href: "#reconnaitre", label: "Reconnaître la forme" },
          { href: "#methode", label: "Méthode en 4 étapes" },
          { href: "#liens", label: "Primitive ou intégrale" },
          { href: "#exercices", label: "6 exemples corrigés" },
          { href: "#mini-exercices", label: "4 mini-exercices" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 leading-7 text-emerald-950">
            <h2 className="text-xl font-bold">Périmètre officiel vérifié pour le Bac 2027</h2>
            <p className="mt-3">
              Le programme en vigueur définit les primitives sur un intervalle,
              liste les fonctions de référence et demande de reconnaître les formes
              (v’∘u)×u’. Depuis la session 2024, l&apos;épreuve de spécialité porte sur
              l&apos;ensemble du programme de Terminale en vigueur : les primitives sont
              donc évaluables au Bac 2027. Cette page garde une intention distincte du
              calcul intégral : trouver une primitive, puis la vérifier.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm font-bold">
              <a
                href="https://www.education.gouv.fr/sites/default/files/document/Programme%20de%20sp%C3%A9cialit%C3%A9%20de%20math%C3%A9matiques%20de%20terminale%20g%C3%A9n%C3%A9rale-250863.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-blue-900 underline"
              >
                Programme officiel de Terminale
              </a>
              <a
                href="https://www.education.gouv.fr/bo/2023/Hebdo36/MENE2323020N"
                target="_blank"
                rel="noreferrer"
                className="text-blue-900 underline"
              >
                Programme de l’épreuve
              </a>
            </div>
          </aside>

          <section id="definition" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <SquareFunction className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Qu’est-ce qu’une primitive ?
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                <strong>F est une primitive de f sur un intervalle I si F est
                dérivable sur I et si F’(x)=f(x) pour tout x de I.</strong> La
                mention de I est indispensable : une formule peut être valable sur
                un intervalle qui n&apos;inclut pas une valeur interdite.
              </p>
              <p>
                Une primitive n&apos;est pas unique. Si F convient, alors F+C convient
                pour toute constante réelle C. Par exemple, les primitives de 2x sur
                ℝ sont x²+C, car la dérivée de chaque constante est nulle.
              </p>
            </div>
          </section>

          <section id="tableau" className="scroll-mt-24">
            <BookOpen className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Tableau des primitives usuelles
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Le tableau se lit à l&apos;envers du tableau des dérivées. La constante
              +C est sous-entendue dans chaque ligne lorsque l&apos;on cherche toutes
              les primitives.
            </p>
            <div className="mt-7">
              <ResourceTable
                caption="Fonction → une primitive → domaine et vérification"
                headers={["f(x)", "Une primitive F(x)", "Condition / vérification"]}
                rows={[
                  {
                    key: "constante",
                    cells: ["a", "ax", "Sur ℝ ; (ax)’ = a."],
                  },
                  {
                    key: "puissance",
                    cells: [
                      "xⁿ, n entier et n ≠ −1",
                      "xⁿ⁺¹/(n+1)",
                      "Sur ℝ si n ≥ 0 ; sur un intervalle ne contenant pas 0 si n < 0.",
                    ],
                  },
                  {
                    key: "racine",
                    cells: ["1/√x", "2√x", "Sur ]0 ; +∞[ ; (2√x)’ = 1/√x."],
                  },
                  {
                    key: "inverse",
                    cells: ["1/x", "ln|x|", "Sur tout intervalle inclus dans ℝ* ; (ln|x|)’ = 1/x."],
                  },
                  {
                    key: "exponentielle",
                    cells: ["eˣ", "eˣ", "Sur ℝ ; (eˣ)’ = eˣ."],
                  },
                  {
                    key: "cosinus",
                    cells: ["cos(x)", "sin(x)", "Sur ℝ ; (sin x)’ = cos x."],
                  },
                  {
                    key: "sinus",
                    cells: ["sin(x)", "−cos(x)", "Sur ℝ ; (−cos x)’ = sin x."],
                  },
                ]}
              />
            </div>
          </section>

          <section id="reconnaitre" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">
              Comment reconnaître la bonne forme ?
            </h2>
            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Expression observée → forme → primitive possible"
                headers={["Expression observée", "Forme à reconnaître", "Primitive possible"]}
                rows={[
                  {
                    key: "power",
                    cells: [
                      "u’(x)u(x)ᵐ, m∈ℤ\\{−1}",
                      "Dérivée d’une puissance composée",
                      "u(x)ᵐ⁺¹/(m+1), sur un intervalle de définition où u ne s’annule pas si m<0",
                    ],
                  },
                  {
                    key: "log",
                    cells: ["u’(x)/u(x)", "Dérivée de ln|u|", "ln|u(x)| sur un intervalle où u ne s’annule pas"],
                  },
                  {
                    key: "exp",
                    cells: ["u’(x)eᵘ⁽ˣ⁾", "Dérivée d’une exponentielle composée", "eᵘ⁽ˣ⁾"],
                  },
                  {
                    key: "cos",
                    cells: ["u’(x)cos(u(x))", "Dérivée d’un sinus composé", "sin(u(x))"],
                  },
                  {
                    key: "sin",
                    cells: ["u’(x)sin(u(x))", "Opposé de la dérivée d’un cosinus composé", "−cos(u(x))"],
                  },
                ]}
              />
            </div>
          </section>

          <section id="methode" className="scroll-mt-24 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-slate-950">La méthode en 4 étapes</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Reconnaître", "Repère une fonction de référence ou une composée et précise l’intervalle."],
                ["Proposer", "Écris une primitive candidate, avec le bon facteur multiplicatif."],
                ["Dériver", "Calcule la dérivée de cette candidate sans sauter la chaîne de dérivation."],
                ["Vérifier", "Compare avec f sur tout l’intervalle, puis ajoute +C ou utilise la condition donnée."],
              ].map(([heading, text], index) => (
                <li key={heading} className="flex gap-4 rounded-xl bg-white p-5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-900 font-bold text-white">
                    {index + 1}
                  </span>
                  <span>
                    <strong className="block text-slate-950">{heading}</strong>
                    <span className="mt-1 block leading-7 text-slate-700">{text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Primitive avec condition</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Pour f(x)=2x, les primitives sont F(x)=x²+C. Si F(3)=11,
                alors 9+C=11, donc C=2. L&apos;unique primitive demandée est
                F(x)=x²+2.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">Pont vers les équations différentielles</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Résoudre y’=f revient à chercher toutes les primitives de f. Une
                condition initiale y(x₀)=y₀ fixe ensuite la constante. Les équations
                y’=ay ou y’=ay+b utilisent d&apos;autres familles de solutions,
                détaillées sur la page dédiée.
              </p>
            </article>
          </section>

          <section id="liens" className="scroll-mt-24 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-3xl font-bold">Primitive ou intégrale : que demande l’exercice ?</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="text-xl font-bold">« Déterminer une primitive »</h3>
                <p className="mt-3 leading-7 text-slate-200">
                  La réponse est une fonction F, ou la famille F+C. On vérifie en
                  dérivant.
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-5">
                <h3 className="text-xl font-bold">« Calculer ∫ₐᵇ f(x) dx »</h3>
                <p className="mt-3 leading-7 text-slate-200">
                  Si f est continue sur un intervalle contenant a et b et si F y est
                  une primitive de f, la réponse est le nombre F(b)−F(a). La constante
                  disparaît et on n&apos;écrit pas +C dans le résultat final.
                </p>
              </div>
            </div>
            <Link
              href="/methodes-maths-terminale/integrales"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-blue-950 hover:bg-blue-50"
            >
              Voir la méthode intégrales
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <CorrectedExerciseList
            heading="Six exemples corrigés pas à pas"
            exercises={exercises}
          />

          <section id="mini-exercices" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Quatre mini-exercices</h2>
            <p className="mt-3 text-slate-700">Cherche une réponse, puis ouvre la correction détaillée.</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  question: "1. Déterminer les primitives de 5x⁴ sur ℝ.",
                  answer: "Une primitive est x⁵, car (x⁵)’=5x⁴. Toutes les primitives sont x⁵+C, avec C réel.",
                },
                {
                  question: "2. Déterminer les primitives de 3/(3x−1).",
                  answer: "Sur tout intervalle ne contenant pas 1/3, on reconnaît u’/u avec u=3x−1 et u’=3. Les primitives sont ln|3x−1|+C.",
                },
                {
                  question: "3. Déterminer les primitives de −sin(x)+2eˣ sur ℝ.",
                  answer: "Une primitive de −sin(x) est cos(x), et une primitive de 2eˣ est 2eˣ. On obtient cos(x)+2eˣ+C.",
                },
                {
                  question: "4. Trouver F si F’(x)=4x et F(2)=1.",
                  answer: "F(x)=2x²+C. La condition donne 8+C=1, donc C=−7. Ainsi F(x)=2x²−7.",
                },
              ].map((exercise) => (
                <details key={exercise.question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <summary className="cursor-pointer list-none font-bold text-slate-950 marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {exercise.question}
                      <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-transform group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="mt-4 border-t border-slate-100 pt-4 leading-7 text-slate-700">
                    {exercise.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <FrequentMistakesBlock items={mistakes} />

          <ChecklistBlock
            heading="Mémo : trouver et vérifier une primitive"
            items={checklist}
            printLabel="Imprimer le mémo primitives"
          />

          <ChapterInternalLinks
            title="Ressources liées sans confondre les intentions"
            links={internalLinks}
            variant="cards"
          />

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
            <CheckCircle2 className="h-7 w-7 text-emerald-700" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-emerald-950">Le contrôle le plus rentable</h2>
            <p className="mt-3 max-w-3xl leading-7 text-emerald-950">
              Dérive toujours ton résultat. Une mauvaise constante multiplicative,
              un signe oublié ou un domaine impossible apparaît immédiatement.
            </p>
          </section>

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
