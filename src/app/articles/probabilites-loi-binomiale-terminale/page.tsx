import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Calculator, CheckCircle2 } from "lucide-react";
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

const pagePath = "/articles/probabilites-loi-binomiale-terminale";
const title = "Loi binomiale Terminale : méthode et exercices corrigés";
const description =
  "Reconnais une loi binomiale en Terminale, traduis exactement, au plus et au moins, puis calcule les probabilités avec cinq exercices corrigés.";

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
    type: "article",
    publishedTime: "2026-04-28",
    modifiedTime: "2026-08-07",
  },
  robots: { index: true, follow: true },
};

const exercises: CorrectedExercise[] = [
  {
    label: "Exercice 1 — reconnaître le modèle",
    title: "Contrôle de composants",
    statement:
      "On contrôle 12 composants produits dans les mêmes conditions. Chaque composant a une probabilité 0,02 d’être défectueux et les contrôles sont modélisés comme indépendants. On note X le nombre de composants défectueux.",
    trap: "Écrire une loi binomiale sans citer l’indépendance ni préciser ce que compte X.",
    method:
      "Le succès est « le composant est défectueux ». On a un nombre fixe n=12 d’épreuves à deux issues, indépendantes, avec la même probabilité p=0,02. X compte les succès.",
    calculations: ["n = 12", "p = 0,02", "X compte les composants défectueux", "X suit B(12 ; 0,02)"],
    answer: "La variable X suit la loi binomiale B(12 ; 0,02).",
    why: "Les quatre conditions du schéma de Bernoulli sont explicitement réunies avant toute formule.",
  },
  {
    label: "Exercice 2 — exactement k",
    title: "Calculer P(X=2)",
    statement: "X suit la loi binomiale B(5 ; 0,3). Calculer P(X=2).",
    trap: "Oublier C(5,2), qui compte les positions possibles des deux succès.",
    method:
      "Ici n=5, p=0,3 et X compte les succès. « Exactement 2 » se traduit par X=2.",
    calculations: [
      "P(X=2) = C(5,2) × 0,3² × 0,7³",
      "P(X=2) = 10 × 0,09 × 0,343",
      "P(X=2) = 0,3087",
    ],
    answer: "La probabilité d’obtenir exactement deux succès est 0,3087, soit 30,87 %.",
    why: "La formule associe le choix des deux positions de succès, leurs probabilités et celles des trois échecs.",
  },
  {
    label: "Exercice 3 — au moins",
    title: "Calculer P(X≥3)",
    statement: "X suit la loi binomiale B(4 ; 0,6). Calculer la probabilité d’obtenir au moins trois succès.",
    trap: "Lire « au moins 3 » comme X≤3 ou oublier le cas X=4.",
    method:
      "Ici n=4, p=0,6 et X compte les succès. « Au moins 3 » signifie X≥3, donc les cas 3 et 4.",
    calculations: [
      "P(X≥3) = P(X=3) + P(X=4)",
      "P(X≥3) = 4 × 0,6³ × 0,4 + 0,6⁴",
      "P(X≥3) = 0,3456 + 0,1296 = 0,4752",
    ],
    answer: "La probabilité d’obtenir au moins trois succès est 0,4752, soit 47,52 %.",
    why: "Les valeurs possibles supérieures ou égales à 3 sont seulement 3 et 4 puisque n=4.",
  },
  {
    label: "Exercice 4 — complément",
    title: "Obtenir au moins un succès",
    statement: "X suit la loi binomiale B(10 ; 0,1). Calculer P(X≥1).",
    trap: "Additionner dix probabilités alors que le complément ne demande qu’un seul calcul.",
    method:
      "Ici n=10, p=0,1 et X compte les succès. Le contraire de « au moins un succès » est « aucun succès ».",
    calculations: [
      "P(X≥1) = 1 − P(X=0)",
      "P(X≥1) = 1 − 0,9¹⁰",
      "P(X≥1) ≈ 0,6513",
    ],
    answer: "La probabilité d’obtenir au moins un succès est environ 0,6513, soit 65,13 %.",
    why: "Le complément remplace la somme P(X=1)+…+P(X=10) par le seul cas X=0.",
  },
  {
    label: "Exercice 5 — problème contextualisé",
    title: "Interpréter une probabilité cumulée",
    statement:
      "Pour chacun de 20 visiteurs, une entreprise modélise le fait d’effectuer ou non un achat, indépendamment, avec une probabilité 0,15. On note X le nombre de visiteurs qui effectuent un achat. Calculer la probabilité d’en compter au plus deux.",
    trap: "Donner un nombre décimal sans rappeler le modèle ni traduire « au plus ».",
    method:
      "Le nombre d’essais est n=20, la probabilité de succès est p=0,15 et X compte les visiteurs qui achètent. Ainsi X suit B(20 ; 0,15) et « au plus 2 » signifie X≤2.",
    calculations: [
      "P(X≤2) = P(X=0) + P(X=1) + P(X=2)",
      "P(X≤2) = 0,85²⁰ + 20×0,15×0,85¹⁹ + C(20,2)×0,15²×0,85¹⁸",
      "P(X≤2) ≈ 0,4049",
    ],
    answer:
      "Selon ce modèle, la probabilité qu’au plus deux des 20 visiteurs effectuent un achat est d’environ 40,49 %.",
    why: "La conclusion nomme l’événement, le groupe étudié et le caractère approché du calcul.",
  },
];

const mistakes = [
  "Utiliser la loi binomiale alors que les répétitions ne sont pas indépendantes.",
  "Choisir p pour l’échec alors que X compte les succès, ou inversement.",
  "Oublier le coefficient binomial C(n,k) dans P(X=k).",
  "Confondre « au moins » avec ≤ et « au plus » avec ≥.",
  "Définir X de façon vague sans dire exactement ce qu’elle compte.",
  "Donner un résultat décimal sans phrase d’interprétation ni arrondi annoncé.",
];

const checklist = [
  "Le nombre n d’épreuves est fixé à l’avance.",
  "Chaque épreuve possède deux issues : succès ou échec.",
  "La probabilité p du succès reste la même à chaque épreuve.",
  "Les répétitions sont indépendantes dans le modèle.",
  "J’ai défini X comme le nombre de succès.",
  "J’ai traduit les mots de la question en événement mathématique.",
  "J’ai choisi entre formule, somme de valeurs et complément.",
  "J’ai annoncé l’arrondi et interprété le résultat dans le contexte.",
];

const faqItems: FaqItem[] = [
  {
    question: "Comment reconnaître une loi binomiale ?",
    answer:
      "On vérifie un nombre fixe n de répétitions indépendantes d’une même épreuve à deux issues, avec une probabilité de succès p constante. Si X compte le nombre de succès, alors X suit B(n ; p).",
  },
  {
    question: "Quelle formule utiliser pour P(X=k) ?",
    answer:
      "Si X suit B(n ; p), alors P(X=k)=C(n,k)p^k(1−p)^(n−k), pour un entier k compris entre 0 et n.",
  },
  {
    question: "Que signifie « au moins k » ?",
    answer:
      "« Au moins k » signifie X≥k : la valeur k est incluse. Selon les nombres, on additionne les probabilités de k à n ou on utilise le complément 1−P(X≤k−1).",
  },
  {
    question: "Quand utiliser le complément ?",
    answer:
      "Le complément est utile lorsqu’il remplace une longue somme par peu de valeurs. Par exemple, P(X≥1)=1−P(X=0). Il faut d’abord écrire clairement l’événement contraire.",
  },
  {
    question: "Comment interpréter E(X)=np ?",
    answer:
      "Sur un grand nombre de répétitions du schéma complet, le nombre moyen de succès par série est proche de np. Ce n’est pas une garantie sur une série particulière et np n’est pas nécessairement entier.",
  },
];

const internalLinks = [
  {
    href: "/denombrement-terminale-specialite-maths",
    label: "Comprendre C(n,k) avec le dénombrement",
  },
  {
    href: "/methodes-maths-terminale/probabilites-conditionnelles",
    label: "Revoir probabilités conditionnelles et indépendance",
  },
  {
    href: "/programme-maths-terminale/probabilites",
    label: "Consulter le programme probabilités",
  },
  {
    href: "/exercices-maths-terminale/probabilites",
    label: "Faire des exercices de probabilités",
  },
  {
    href: "/quiz-maths-terminale-specialite#probabilites",
    label: "Tester la loi binomiale dans le quiz",
  },
  {
    href: "/python-bac-maths-terminale",
    label: "Simuler une expérience avec Python",
  },
];

export default function LoiBinomialeTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Articles", path: "/articles" },
            { name: "Loi binomiale Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Probabilités Terminale — méthode et exercices"
        title="Loi binomiale Terminale : méthode et exercices corrigés"
        description={
          <>
            Avant toute formule, vérifie le modèle : un nombre fixe d&apos;épreuves,
            deux issues, une même probabilité de succès et des répétitions
            indépendantes.
          </>
        }
        secondaryDescription="La page te guide ensuite pour définir X, traduire exactement / au plus / au moins et choisir le calcul le plus court."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire loi binomiale Terminale"
        items={[
          { href: "#reconnaitre", label: "Reconnaître le modèle" },
          { href: "#formule", label: "Calculer P(X=k)" },
          { href: "#traduction", label: "Exactement / au plus / au moins" },
          { href: "#complement", label: "Complément" },
          { href: "#esperance", label: "Espérance" },
          { href: "#calculatrice", label: "Calculatrice" },
          { href: "#exercices", label: "5 exercices corrigés" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <aside className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 leading-7 text-emerald-950">
            <h2 className="text-xl font-bold">Périmètre officiel vérifié pour le Bac 2027</h2>
            <p className="mt-3">
              Le programme en vigueur comprend le schéma de Bernoulli, la loi
              binomiale B(n,p), sa formule, les probabilités associées et son
              espérance E(X)=np. Depuis la session 2024, l&apos;épreuve de spécialité
              porte sur l&apos;ensemble du programme de Terminale en vigueur : ces
              notions sont donc évaluables au Bac 2027, sans qu&apos;un sujet précis
              puisse être garanti.
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

          <section id="reconnaitre" className="scroll-mt-24">
            <BookOpenCheck className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Reconnaître une situation binomiale avant de calculer
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Une épreuve de Bernoulli possède deux issues : succès et échec. Un
              schéma de Bernoulli répète cette même épreuve n fois de façon
              indépendante. La loi binomiale décrit alors le nombre de succès.
            </p>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                ["1. Nombre fixé", "Le nombre n d’épreuves est connu avant l’expérience."],
                ["2. Deux issues", "Chaque épreuve est classée en succès ou échec."],
                ["3. Même probabilité", "La probabilité p du succès reste constante."],
                ["4. Indépendance", "Le résultat d’une épreuve ne modifie pas les autres dans le modèle."],
              ].map(([heading, text]) => (
                <article key={heading} className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <h3 className="text-lg font-bold text-blue-950">{heading}</h3>
                  <p className="mt-2 leading-7 text-blue-950">{text}</p>
                </article>
              ))}
            </div>
            <div className="mt-7 rounded-2xl bg-slate-950 p-6 text-white">
              <h3 className="text-xl font-bold">Définir X sans ambiguïté</h3>
              <p className="mt-3 leading-7 text-slate-200">
                Écris par exemple : « X compte le nombre de pièces défectueuses parmi
                les 20 contrôlées. » Si les quatre conditions sont vérifiées et si la
                probabilité d&apos;une pièce défectueuse vaut p, alors
                <strong className="text-white"> X suit B(20 ; p)</strong>.
              </p>
            </div>
          </section>

          <section id="formule" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Calculer P(X=k)</h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p className="overflow-x-auto rounded-xl bg-blue-950 p-5 text-center font-mono font-bold text-white">
                P(X=k) = C(n,k) pᵏ (1−p)ⁿ⁻ᵏ
              </p>
              <p>
                Cette formule s&apos;emploie pour n∈ℕ, p∈[0 ; 1] et
                k∈{`{0, …, n}`}.
              </p>
              <ul className="space-y-3">
                <li><strong>C(n,k)</strong> compte les choix des k positions de succès.</li>
                <li><strong>pᵏ</strong> est la probabilité portée par les k succès.</li>
                <li><strong>(1−p)ⁿ⁻ᵏ</strong> correspond aux n−k échecs.</li>
              </ul>
              <p>
                Le coefficient binomial vient du dénombrement : plusieurs listes de
                succès et d&apos;échecs conduisent à la même valeur X=k.
              </p>
            </div>
          </section>

          <section id="traduction" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">
              « Exactement », « au plus », « au moins »
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Traduis la phrase avant de toucher à la calculatrice. L&apos;égalité ou
              l&apos;inégalité détermine les valeurs à additionner.
            </p>
            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Expression française → événement mathématique"
                headers={["Expression", "Événement", "Valeurs incluses"]}
                rows={[
                  { key: "exact", cells: ["Exactement k", "X = k", "La seule valeur k"] },
                  { key: "at-most", cells: ["Au plus k", "X ≤ k", "0, 1, …, k"] },
                  { key: "at-least", cells: ["Au moins k", "X ≥ k", "k, k+1, …, n"] },
                  { key: "more", cells: ["Strictement plus de k", "X > k", "k+1, …, n"] },
                  { key: "between", cells: ["Entre a et b, bornes comprises", "a ≤ X ≤ b", "a, a+1, …, b, avec a et b entiers et 0≤a≤b≤n"] },
                ]}
              />
            </div>
          </section>

          <section id="complement" className="scroll-mt-24 rounded-2xl border-2 border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-slate-950">Le complément pour raccourcir le calcul</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              L&apos;événement contraire de « au moins un succès » est « aucun
              succès ». Ainsi <strong>P(X≥1)=1−P(X=0)</strong>. Le complément est
              intéressant quand il remplace une longue somme par un ou deux termes ;
              il faut toujours écrire l&apos;événement contraire avant la formule.
            </p>
          </section>

          <section id="esperance" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">Espérance d’une loi binomiale</h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Si X suit B(n ; p), alors <strong>E(X)=np</strong>. Cette valeur
                représente le nombre moyen de succès par série lorsqu&apos;on répète un
                grand nombre de fois le schéma complet.
              </p>
              <p>
                Avec n=20 et p=0,15, E(X)=3. Cela ne signifie pas que chaque série
                produit exactement trois succès ; c&apos;est une moyenne théorique sur
                de nombreuses séries.
              </p>
            </div>
          </section>

          <section id="calculatrice" className="scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <Calculator className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Calculatrice : raisonner avant de saisir</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Définir le succès et la variable X.",
                "Justifier le modèle et identifier n puis p.",
                "Traduire la phrase en X=k, X≤k, X≥k ou intervalle.",
                "Choisir une probabilité ponctuelle, cumulée ou un complément.",
                "Saisir n, p et les bornes dans la fonction binomiale de la calculatrice.",
                "Annoncer l’arrondi et rédiger une conclusion en français.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3 rounded-xl bg-slate-50 p-4 leading-7 text-slate-700">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 font-bold text-white">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Les menus changent selon les modèles : cherche une fonction de
              probabilité binomiale pour X=k et une fonction cumulée pour X≤k. Le
              raisonnement écrit reste indépendant de la marque.
            </p>
          </section>

          <CorrectedExerciseList
            heading="Cinq exercices corrigés de loi binomiale"
            exercises={exercises}
          />

          <FrequentMistakesBlock items={mistakes} />

          <ChecklistBlock
            heading="Checklist loi binomiale"
            items={checklist}
            printLabel="Imprimer la checklist loi binomiale"
          />

          <ChapterInternalLinks
            title="Continuer les probabilités"
            links={internalLinks}
            variant="cards"
          />

          <section className="rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <CheckCircle2 className="h-7 w-7 text-emerald-300" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold">Le bon ordre sur une copie</h2>
            <p className="mt-3 max-w-3xl leading-7 text-slate-200">
              Justifier le modèle, définir X, écrire X~B(n ; p), traduire
              l&apos;événement, calculer, puis conclure. La calculatrice intervient
              seulement à l&apos;avant-dernière étape.
            </p>
            <Link
              href="/exercices-maths-terminale/probabilites"
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-blue-950 hover:bg-blue-50"
            >
              Faire d’autres exercices de probabilités
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
