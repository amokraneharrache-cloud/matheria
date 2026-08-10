import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Network, Route } from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import {
  OfficialSources,
  PrintableChecklist,
  QuickAnswer,
  StaticFaq,
} from "@/components/marketing/J42SeoBlocks";
import {
  ResourceTable,
  ResourceToc,
  type ResourceTableRow,
} from "@/components/marketing/J41SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/programme-maths-terminale";
const title = "Programme Maths Terminale 2026-2027 : chapitres de spécialité";
const description =
  "Consulte le programme de maths de Terminale spécialité applicable en 2026-2027, ses chapitres, ses prérequis et les ressources pour les travailler.";

const currentProgramUrl =
  "https://eduscol.education.gouv.fr/sites/default/files/document/spe246annexe1158907pdf-84159.pdf";
const programCalendarUrl =
  "https://eduscol.education.gouv.fr/5817/programmes-et-ressources-en-mathematiques-voie-gt";
const bacScopeUrl =
  "https://www.education.gouv.fr/bo/2023/Hebdo36/MENE2323020N";

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

const programRows: ResourceTableRow[] = [
  {
    key: "denombrement",
    cells: [
      "Algèbre et géométrie — combinatoire et dénombrement",
      "Principes additif et multiplicatif, parties d’un ensemble, permutations, combinaisons et relation de Pascal.",
      "Choisir une représentation adaptée et dénombrer sans double comptage.",
      <Link key="resource" href="/denombrement-terminale-specialite-maths" className="font-bold text-blue-900 underline">
        Méthode dénombrement
      </Link>,
    ],
  },
  {
    key: "geometrie",
    cells: [
      "Algèbre et géométrie — géométrie dans l’espace",
      "Vecteurs, droites, plans, bases, produit scalaire, orthogonalité, distances et équations.",
      "Étudier une configuration, déterminer une représentation paramétrique ou une équation de plan.",
      <Link key="resource" href="/programme-maths-terminale/geometrie-espace" className="font-bold text-blue-900 underline">
        Chapitre géométrie
      </Link>,
    ],
  },
  {
    key: "suites",
    cells: [
      "Analyse — suites et récurrence",
      "Raisonnement par récurrence, monotonie, bornes, convergence et limites de suites.",
      "Démontrer une propriété et étudier le comportement asymptotique d’une suite.",
      <Link key="resource" href="/programme-maths-terminale/suites" className="font-bold text-blue-900 underline">
        Chapitre suites
      </Link>,
    ],
  },
  {
    key: "limites",
    cells: [
      "Analyse — limites de fonctions",
      "Limites finies ou infinies, opérations, comparaison, composition et croissance comparée.",
      "Déterminer une limite et interpréter une asymptote ou un comportement à l’infini.",
      <Link key="resource" href="/programme-maths-terminale/limites" className="font-bold text-blue-900 underline">
        Chapitre limites
      </Link>,
    ],
  },
  {
    key: "derivation",
    cells: [
      "Analyse — dérivation, convexité et exponentielle",
      "Dérivée seconde, convexité, points d’inflexion et approfondissement de la fonction exponentielle.",
      "Étudier des variations, démontrer une inégalité et exploiter une courbe ou ses dérivées.",
      <span key="resource" className="space-y-2">
        <Link href="/programme-maths-terminale/derivation-convexite" className="block font-bold text-blue-900 underline">
          Dérivation et convexité
        </Link>
        <Link href="/articles/exponentielle-terminale-methodes" className="block font-bold text-blue-900 underline">
          Méthodes exponentielle
        </Link>
      </span>,
    ],
  },
  {
    key: "continuite",
    cells: [
      "Analyse — continuité",
      "Continuité sur un intervalle, image d’une suite et théorème des valeurs intermédiaires.",
      "Justifier existence et unicité d’une solution puis l’encadrer, notamment par dichotomie.",
      <Link key="resource" href="/methodes-maths-terminale/calculer-une-limite" className="font-bold text-blue-900 underline">
        Limites et continuité
      </Link>,
    ],
  },
  {
    key: "logarithme",
    cells: [
      "Analyse — logarithme népérien",
      "Fonction ln, propriétés algébriques, dérivée, variations, limites et croissance comparée.",
      "Transformer une expression et résoudre équations, inéquations ou problèmes de modélisation.",
      <Link key="resource" href="/programme-maths-terminale/fonction-logarithme" className="font-bold text-blue-900 underline">
        Chapitre logarithme
      </Link>,
    ],
  },
  {
    key: "trigonometrie",
    cells: [
      "Analyse — fonctions sinus et cosinus",
      "Dérivées, variations, courbes et équations ou inéquations trigonométriques simples.",
      "Étudier une fonction trigonométrique et résoudre un problème d’optimisation.",
      <Link key="resource" href="/formules-bac-maths-terminale" className="font-bold text-blue-900 underline">
        Formules par chapitre
      </Link>,
    ],
  },
  {
    key: "primitives",
    cells: [
      "Analyse — primitives et équations différentielles",
      "Primitives usuelles, formes composées, équations y’=ay+b et conditions initiales.",
      "Reconnaître une primitive, la vérifier et résoudre une équation différentielle simple.",
      <span key="resource" className="space-y-2">
        <Link href="/primitives-terminale-specialite-maths" className="block font-bold text-blue-900 underline">
          Méthode primitives
        </Link>
        <Link href="/equations-differentielles-terminale" className="block font-bold text-blue-900 underline">
          Équations différentielles
        </Link>
      </span>,
    ],
  },
  {
    key: "integrales",
    cells: [
      "Analyse — calcul intégral",
      "Intégrale, aire, primitives, valeur moyenne, relation de Chasles et intégration par parties.",
      "Calculer, encadrer et interpréter une intégrale dans un contexte.",
      <Link key="resource" href="/programme-maths-terminale/integrales" className="font-bold text-blue-900 underline">
        Chapitre intégrales
      </Link>,
    ],
  },
  {
    key: "binomiale",
    cells: [
      "Probabilités — indépendance et loi binomiale",
      "Épreuves indépendantes, schéma de Bernoulli, loi B(n,p), probabilités et espérance.",
      "Reconnaître le modèle, définir la variable et calculer un événement ponctuel ou cumulé.",
      <Link key="resource" href="/articles/probabilites-loi-binomiale-terminale" className="font-bold text-blue-900 underline">
        Méthode loi binomiale
      </Link>,
    ],
  },
  {
    key: "variables",
    cells: [
      "Probabilités — variables aléatoires et concentration",
      "Sommes de variables, espérance, variance, inégalités de concentration et loi des grands nombres.",
      "Calculer des indicateurs et quantifier un risque ou une taille d’échantillon.",
      <Link key="resource" href="/programme-maths-terminale/probabilites" className="font-bold text-blue-900 underline">
        Chapitre probabilités
      </Link>,
    ],
  },
  {
    key: "algorithmique",
    cells: [
      "Algorithmique, programmation et logique",
      "Variables, conditions, boucles, fonctions et listes, mobilisées dans toutes les parties du programme.",
      "Lire, compléter ou écrire un algorithme et expérimenter en Python.",
      <Link key="resource" href="/python-bac-maths-terminale" className="font-bold text-blue-900 underline">
        Python en Terminale
      </Link>,
    ],
  },
];

const prerequisiteRows: ResourceTableRow[] = [
  { key: "suites", cells: ["Suites, récurrence et limites", "Suites arithmétiques et géométriques, sens de variation, notation uₙ."] },
  { key: "functions", cells: ["Limites, continuité et convexité", "Dérivation, tableaux de variations, second degré et lecture graphique."] },
  { key: "exp-log", cells: ["Exponentielle, logarithme et équations différentielles", "Fonction exponentielle, règles de calcul et résolution d’équations."] },
  { key: "probability", cells: ["Loi binomiale et variables aléatoires", "Probabilités conditionnelles, arbres, indépendance, espérance et variance."] },
  { key: "geometry", cells: ["Géométrie dans l’espace", "Vecteurs du plan, produit scalaire, coordonnées et équations de droites."] },
  { key: "code", cells: ["Algorithmique et Python", "Variables, conditions, boucles, fonctions et listes simples."] },
];

const checklist = [
  "Combinatoire et dénombrement",
  "Géométrie dans l’espace",
  "Suites et raisonnement par récurrence",
  "Limites de suites et de fonctions",
  "Dérivation, convexité et exponentielle",
  "Continuité et théorème des valeurs intermédiaires",
  "Logarithme népérien",
  "Fonctions sinus et cosinus",
  "Primitives et équations différentielles",
  "Calcul intégral",
  "Probabilités et loi binomiale",
  "Variables aléatoires, concentration et loi des grands nombres",
  "Algorithmique, Python et logique",
];

const faqItems: FaqItem[] = [
  {
    question: "Quel est le programme de maths en Terminale spécialité ?",
    answer:
      "Le programme applicable en 2026-2027 s’organise en quatre grandes parties officielles : algèbre et géométrie, analyse, probabilités, algorithmique et programmation. Il comprend notamment dénombrement, géométrie dans l’espace, suites, limites, convexité, continuité, logarithme, primitives, intégrales, équations différentielles et loi binomiale.",
  },
  {
    question: "Le programme change-t-il en 2026-2027 ?",
    answer:
      "Non pour les élèves de Terminale. Le nouveau programme publié en 2026 entre en vigueur en Terminale à la rentrée 2027-2028. Pendant l’année scolaire 2026-2027, le programme de spécialité publié au BO spécial du 25 juillet 2019 reste applicable.",
  },
  {
    question: "Tous les chapitres peuvent-ils être évalués au Bac 2027 ?",
    answer:
      "Depuis la session 2024, l’épreuve terminale de spécialité porte sur le programme de Terminale en vigueur. Toutes ses parties peuvent donc être mobilisées, sans qu’il soit possible de garantir la présence d’un chapitre précis dans un sujet.",
  },
  {
    question: "Quels chapitres faut-il maîtriser avant la Terminale ?",
    answer:
      "Les bases les plus structurantes sont la dérivation et les variations, les suites usuelles, la fonction exponentielle, les probabilités conditionnelles, le produit scalaire et les automatismes de calcul algébrique.",
  },
  {
    question: "Python fait-il partie de l’enseignement ?",
    answer:
      "Oui. L’algorithmique et la programmation constituent une partie officielle du programme. Les algorithmes peuvent être écrits en langage naturel ou en Python et sont mobilisés dans les différents chapitres.",
  },
];

export default function ProgrammeMathsTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Programme maths Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Terminale spécialité — année scolaire 2026-2027"
        title="Programme Maths Terminale spécialité 2026-2027"
        description="Les chapitres à connaître en Terminale, les notions essentielles et les ressources pour les travailler."
        secondaryDescription="Ce hub distingue le programme étudié pendant l’année, le périmètre de l’épreuve terminale et le futur programme qui entrera en vigueur l’année suivante."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire du programme de maths Terminale"
        items={[
          { href: "#programme-applicable", label: "Programme applicable" },
          { href: "#chapitres", label: "Tous les chapitres" },
          { href: "#nouveautes", label: "Nouveautés de Terminale" },
          { href: "#prerequis", label: "Prérequis de Première" },
          { href: "#liens", label: "Liens entre chapitres" },
          { href: "#ordre", label: "Ordre de travail" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <div id="programme-applicable" className="scroll-mt-24">
            <QuickAnswer title="Quel programme s’applique en 2026-2027 ?" tone="emerald">
              <p>
                En Terminale spécialité mathématiques, le programme applicable pendant
                l&apos;année scolaire 2026-2027 reste celui publié au BO spécial du
                25 juillet 2019.
              </p>
              <p>
                Un nouveau programme a bien été publié en 2026, mais son entrée en
                vigueur en Terminale est fixée à la rentrée 2027-2028. Il ne faut donc
                pas l&apos;utiliser pour décrire l&apos;année 2026-2027.
              </p>
              <p className="text-base">
                Le programme annuel décrit ce qui est enseigné. Le texte de l&apos;épreuve
                précise ce qui peut être évalué au Bac : depuis la session 2024,
                l&apos;épreuve porte sur le programme de Terminale en vigueur.
              </p>
            </QuickAnswer>
          </div>

          <section id="chapitres" className="scroll-mt-24">
            <BookOpenCheck className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Tous les chapitres du programme de Terminale spécialité maths
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Le programme officiel est organisé en quatre grandes parties. Ce tableau
              les traduit en chapitres de travail sans transformer la page en cours
              complet.
            </p>
            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Programme officiel → capacités → meilleure ressource"
                headers={["Chapitre", "Ce qu’il faut savoir", "Ce qu’on apprend à faire", "Ressource SprintMaths"]}
                rows={programRows}
              />
            </div>
          </section>

          <PrintableChecklist
            heading="Programme Terminale maths : où j’en suis"
            intro="Coche une notion seulement lorsque tu peux expliquer l’idée principale et résoudre au moins un exercice sans correction."
            items={checklist}
            printLabel="Imprimer la checklist du programme"
          />

          <section id="nouveautes" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <h2 className="text-3xl font-bold text-slate-950">
                Quels chapitres sont nouveaux en Terminale ?
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La Terminale approfondit les suites avec la convergence, enrichit
                l&apos;étude des fonctions avec les limites, la convexité, la continuité
                et le logarithme, puis introduit primitives, équations différentielles
                et calcul intégral.
              </p>
              <p>
                En algèbre et géométrie apparaissent le dénombrement et une géométrie
                de l&apos;espace plus calculatoire. En probabilités, le schéma de Bernoulli,
                les sommes de variables et les inégalités de concentration prolongent
                directement le travail de Première.
              </p>
              <Link
                href="/preparer-entree-terminale-specialite-maths"
                className="inline-flex items-center gap-2 font-bold text-blue-900 underline underline-offset-4"
              >
                Revoir précisément les acquis de Première
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section id="prerequis" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">
              Quels chapitres reposent fortement sur la Première ?
            </h2>
            <div className="mt-7">
              <ResourceTable
                caption="Notion de Terminale → prérequis de Première"
                headers={["Notion de Terminale", "Prérequis à réactiver"]}
                rows={prerequisiteRows}
              />
            </div>
          </section>

          <section id="liens" className="scroll-mt-24">
            <Network className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Quels chapitres sont liés entre eux ?
            </h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {[
                ["Dérivation → variations → convexité", "Les signes de f’ et f’’ décrivent le comportement et la forme de la courbe."],
                ["Exponentielle → équations différentielles", "La fonction exponentielle fournit les solutions de référence des modèles y’=ay."],
                ["Dénombrement → loi binomiale", "Les coefficients binomiaux comptent les positions possibles des succès."],
                ["Primitives → intégrales", "Une primitive permet de calculer une intégrale définie par F(b)−F(a)."],
                ["Suites → probabilités", "De nombreux modèles probabilistes conduisent à étudier une suite dépendant de la taille n."],
                ["Python → tous les chapitres", "Simulation, dichotomie, sommes et suites permettent d’expérimenter avant de démontrer."],
              ].map(([heading, text]) => (
                <article key={heading} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">{heading}</h3>
                  <p className="mt-2 leading-7 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-amber-950">
              Programme annuel et épreuve du Bac : deux textes différents
            </h2>
            <p className="mt-4 max-w-4xl leading-7 text-amber-950">
              Être « au programme » signifie qu&apos;une notion doit être enseignée.
              Depuis la session 2024, l&apos;épreuve de spécialité peut mobiliser
              l&apos;ensemble du programme de Terminale en vigueur. Cela ne signifie ni
              que chaque chapitre apparaît dans chaque sujet, ni qu&apos;ils occupent tous
              la même place.
            </p>
          </section>

          <section id="ordre" className="scroll-mt-24 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <Route className="h-7 w-7 text-blue-200" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold">Dans quel ordre travailler ?</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["1. Prérequis", "Réactive les automatismes de Première nécessaires au chapitre."],
                ["2. Méthodes", "Apprends à reconnaître la situation et à démarrer une solution."],
                ["3. Exercices", "Passe d’une application directe à un exercice rédigé plus long."],
              ].map(([heading, text]) => (
                <li key={heading} className="rounded-xl bg-white/10 p-5">
                  <h3 className="text-xl font-bold">{heading}</h3>
                  <p className="mt-2 leading-7 text-slate-200">{text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 leading-7 text-slate-200">
              Cette progression est logique, pas calendaire. Pour répartir les séances
              dans le temps, utilise le planning existant.
            </p>
            <Link
              href="/planning-revision-bac-maths"
              className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-blue-950"
            >
              Voir le planning de révision
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <ChapterInternalLinks
            title="Comprendre le Bac Maths 2027"
            variant="cards"
            links={[
              { href: "/coefficient-specialite-maths-bac-2027", label: "Coefficient de la spécialité maths" },
              { href: "/calculatrice-bac-maths-2027", label: "Calculatrice et mode examen" },
              { href: "/methodes-maths-terminale", label: "Méthodes par chapitre" },
              { href: "/exercices-maths-terminale", label: "Exercices par chapitre" },
              { href: "/quiz-maths-terminale-specialite", label: "Quiz Terminale" },
              { href: "/formules-bac-maths-terminale", label: "Formules du Bac" },
            ]}
          />

          <StaticFaq items={faqItems} />

          <OfficialSources
            sources={[
              {
                href: currentProgramUrl,
                label: "Programme de spécialité de mathématiques de Terminale actuellement en vigueur",
                description: "BO spécial n° 8 du 25 juillet 2019, document officiel du ministère.",
              },
              {
                href: programCalendarUrl,
                label: "Calendrier d’entrée en vigueur des programmes publiés en 2026",
                description: "Éduscol précise une application en Terminale à la rentrée 2027-2028.",
              },
              {
                href: bacScopeUrl,
                label: "Programme de l’épreuve terminale de spécialité",
                description: "Note de service applicable depuis la session 2024.",
              },
            ]}
          />
        </div>
      </section>
    </SeoPageLayout>
  );
}
