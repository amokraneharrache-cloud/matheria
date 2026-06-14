import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LineChart,
  ListChecks,
  PenTool,
  PlayCircle,
  ShieldCheck,
  Smartphone,
  Target,
} from "lucide-react";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { PACK_REVISION_EXPRESS_PRICE } from "@/lib/offers";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  productJsonLd,
  type FaqItem,
} from "@/lib/seo";

const pagePath = "/sujets-type-bac-maths-terminale";

const title = "Sujets type Bac Maths Terminale avec corrigé guidé";
const description =
  "Entraîne-toi avec des sujets type Bac Maths Terminale corrigés et guidés étape par étape : méthodes, chapitres clés, erreurs fréquentes et préparation Bac 2027.";
const officialContentDisclaimer =
  "SprintMaths propose des sujets et exercices type bac guidés pour s’entraîner. Ces contenus ne sont pas présentés comme des annales officielles ou des sujets officiels du ministère.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqItems: FaqItem[] = [
  {
    question: "Est-ce que ce sont des annales officielles ?",
    answer: `Non. ${officialContentDisclaimer}`,
  },
  {
    question: "À quoi sert un sujet type bac ?",
    answer:
      "Un sujet type bac sert à s'entraîner sur un format proche des attentes de Terminale : plusieurs questions, des chapitres liés, une méthode à choisir et une conclusion à rédiger clairement.",
  },
  {
    question: "Faut-il faire des sujets complets ou des exercices ciblés ?",
    answer:
      "Les deux sont utiles. Les exercices ciblés consolident une méthode précise, tandis que les sujets type bac aident à enchaîner plusieurs réflexes. SprintMaths met surtout l'accent sur l'entraînement guidé étape par étape.",
  },
  {
    question: "Les corrigés sont-ils détaillés ?",
    answer:
      "Les corrigés SprintMaths sont pensés comme des corrigés guidés : identifier le chapitre, choisir la méthode, poser les calculs puis conclure proprement. Les aperçus de cette page ne sont pas des corrigés exhaustifs de sujets de 2 h.",
  },
  {
    question: "Peut-on utiliser SprintMaths sur téléphone ?",
    answer:
      "Oui. SprintMaths est pensé pour un accès mobile dans le navigateur : exercices guidés, méthodes courtes, planning et progression restent utilisables sur téléphone.",
  },
  {
    question: "Comment accéder au Pack Révision Express ?",
    answer:
      `Le Pack Révision Express est présenté sur la page Bac Maths 2027. Il coûte ${PACK_REVISION_EXPRESS_PRICE} € en paiement unique lorsque l'offre est ouverte, avec un accès par code après paiement.`,
  },
];

const baseEventParams = {
  source_page: pagePath,
  level: "terminale",
  intent: "sujets_type_bac",
  exam_goal: "bac_2027",
};

const packEventParams = {
  ...baseEventParams,
  offer: "pack_revision_express_bac_2027",
  price: PACK_REVISION_EXPRESS_PRICE,
  currency: "EUR",
};

const sprintMathsContents = [
  {
    icon: Target,
    title: "Objectif clair",
    text: "Chaque aperçu indique ce que l'élève doit savoir faire avant de se lancer.",
  },
  {
    icon: BookOpenCheck,
    title: "Chapitres travaillés",
    text: "Les notions de Terminale sont nommées explicitement pour relier l'énoncé au programme.",
  },
  {
    icon: PenTool,
    title: "Méthode à appliquer",
    text: "Le corrigé guidé commence par le choix de méthode, avant les calculs.",
  },
  {
    icon: ShieldCheck,
    title: "Erreur fréquente",
    text: "Un point de vigilance aide à éviter les confusions classiques de copie.",
  },
];

const guidedCorrectionSteps = [
  "Étape 1 : identifier le chapitre.",
  "Étape 2 : choisir la méthode.",
  "Étape 3 : poser les calculs.",
  "Étape 4 : conclure proprement.",
];

const subjectPreviews = [
  {
    number: 1,
    heading: "Sujet type bac 1 : analyse et suites",
    slug: "analyse-suites",
    objective:
      "Savoir étudier une suite, justifier une variation, trouver une limite simple puis interpréter le résultat dans le contexte de l'énoncé.",
    chapters: ["Suites", "Variations", "Limites simples", "Interprétation"],
    tasks: [
      "Étude d'une suite définie par récurrence ou par formule explicite.",
      "Recherche du sens de variation avec u_(n+1) - u_n ou une fonction associée.",
      "Limite simple lorsque n tend vers +∞.",
      "Phrase d'interprétation finale liée à la situation.",
    ],
    method:
      "Commencer par reconnaître la forme de la suite, choisir l'outil de variation, puis séparer le calcul de limite et l'interprétation.",
    pitfall:
      "Conclure sur la limite sans vérifier ce qu'elle signifie dans le contexte : au bac, une valeur limite doit souvent être interprétée.",
    clusterHref: "/exercices-maths-terminale/suites",
    cluster: "suites",
  },
  {
    number: 2,
    heading: "Sujet type bac 2 : dérivation, logarithme et limites",
    slug: "derivation-logarithme-limites",
    objective:
      "Enchaîner une étude de fonction : domaine de définition, dérivée, tableau de variation, équation avec ln et limite simple.",
    chapters: ["Dérivation", "Fonction logarithme", "Limites", "Tableau de variation"],
    tasks: [
      "Déterminer le domaine de définition avant tout calcul.",
      "Calculer la dérivée et étudier son signe.",
      "Construire un tableau de variation exploitable.",
      "Résoudre une équation avec ln en vérifiant les conditions.",
      "Calculer une limite simple à une borne de l'intervalle.",
    ],
    method:
      "Poser d'abord l'intervalle d'étude, dériver proprement, transformer le signe de f'(x) en variations, puis revenir aux contraintes du logarithme.",
    pitfall:
      "Résoudre une équation avec ln sans vérifier que les expressions à l'intérieur du logarithme restent strictement positives.",
    clusterHref: "/exercices-maths-terminale/derivation",
    cluster: "derivation",
  },
  {
    number: 3,
    heading: "Sujet type bac 3 : probabilités",
    slug: "probabilites",
    objective:
      "Organiser les données avec un arbre pondéré, calculer une probabilité conditionnelle, utiliser une loi binomiale puis interpréter le résultat.",
    chapters: ["Arbre pondéré", "Probabilité conditionnelle", "Loi binomiale", "Interprétation"],
    tasks: [
      "Compléter ou exploiter un arbre pondéré.",
      "Calculer une probabilité conditionnelle.",
      "Reconnaître une situation modélisée par une loi binomiale.",
      "Interpréter une probabilité dans une phrase claire.",
    ],
    method:
      "Nommer les événements, placer les probabilités sur l'arbre, choisir la formule conditionnelle utile, puis vérifier les paramètres de la loi binomiale.",
    pitfall:
      "Confondre P(A ∩ B), P_A(B) et P(B) : l'arbre sert justement à garder le sens de chaque probabilité.",
    clusterHref: "/exercices-maths-terminale/probabilites",
    cluster: "probabilites",
  },
  {
    number: 4,
    heading: "Sujet type bac 4 : géométrie dans l'espace",
    slug: "geometrie-espace",
    objective:
      "Savoir manipuler des vecteurs de l'espace, représenter une droite, étudier une position relative et justifier une intersection ou une orthogonalité.",
    chapters: ["Vecteurs de l'espace", "Droites et plans", "Repérage", "Orthogonalité"],
    tasks: [
      "Lire ou construire une représentation paramétrique de droite.",
      "Utiliser les coordonnées de points et de vecteurs dans un repère.",
      "Tester un alignement, une appartenance ou une intersection.",
      "Rédiger clairement la conclusion géométrique attendue.",
    ],
    method:
      "Commencer par nommer les points et les vecteurs utiles, poser les coordonnées, puis traduire la question géométrique en équations simples.",
    pitfall:
      "Confondre une droite et un plan ou conclure trop vite sur une intersection sans vérifier les paramètres obtenus.",
    clusterHref: "/exercices-maths-terminale/geometrie-espace",
    cluster: "geometrie-espace",
  },
] as const;

const clusterLinks = [
  {
    href: "/exercices-maths-terminale/suites",
    label: "Suites",
    cluster: "suites",
  },
  {
    href: "/exercices-maths-terminale/derivation",
    label: "Dérivation",
    cluster: "derivation",
  },
  {
    href: "/exercices-maths-terminale/logarithme",
    label: "Logarithme",
    cluster: "logarithme",
  },
  {
    href: "/exercices-maths-terminale/probabilites",
    label: "Probabilités",
    cluster: "probabilites",
  },
  {
    href: "/exercices-maths-terminale/geometrie-espace",
    label: "Géométrie dans l'espace",
    cluster: "geometrie-espace",
  },
];

const internalLinks = [
  { href: "/bac-maths-2027", label: "Préparation Bac Maths 2027" },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac guidés",
  },
  { href: "/planning-revision-bac-maths", label: "Planning révision Bac Maths" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  { href: "/exercices-maths-terminale", label: "Exercices maths Terminale" },
  { href: "/methodes-maths-terminale", label: "Méthodes maths Terminale" },
];

function SubjectPreviewCard({
  subject,
}: {
  subject: (typeof subjectPreviews)[number];
}) {
  return (
    <section id={subject.slug} className="scroll-mt-24">
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1fr] lg:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
            Aperçu structuré
          </p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">
            {subject.heading}
          </h2>
          <p className="mt-4 leading-7 text-slate-700">
            <span className="font-bold text-slate-950">Objectif : </span>
            {subject.objective}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {subject.chapters.map((chapter) => (
              <span
                key={chapter}
                className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-900"
              >
                {chapter}
              </span>
            ))}
          </div>
          <TrackedLink
            href="/exercices-type-bac-maths-terminale"
            eventName="click_subjects_typebac_start"
            eventParams={{
              ...baseEventParams,
              cta_location: `subject_${subject.number}_primary`,
              destination_page: "/exercices-type-bac-maths-terminale",
            }}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
          >
            S&apos;entraîner sur ce type de sujet
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>

        <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="flex items-center gap-2 text-xl font-bold text-slate-950">
            <ClipboardList className="h-5 w-5 text-blue-800" />
            Questions possibles
          </h3>
          <ul className="mt-4 space-y-3 text-slate-700">
            {subject.tasks.map((task) => (
              <li key={task} className="flex gap-2 leading-7">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{task}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="font-bold text-slate-950">Méthode à appliquer</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {subject.method}
              </p>
            </div>
            <div className="rounded-lg bg-amber-50 p-4">
              <h3 className="font-bold text-slate-950">Erreur fréquente</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                {subject.pitfall}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <h3 className="font-bold text-blue-950">Corrigé guidé aperçu</h3>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-blue-950">
              {guidedCorrectionSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="mt-3 text-sm leading-6 text-blue-900">
              Cet aperçu montre le raisonnement attendu, sans présenter un faux
              corrigé exhaustif de sujet complet.
            </p>
          </div>

          <TrackedLink
            href={subject.clusterHref}
            eventName={
              subject.cluster === "geometrie-espace"
                ? "click_internal_geometrie_cluster"
                : "click_subjects_cluster_exercise"
            }
            eventParams={{
              ...baseEventParams,
              cluster: subject.cluster,
              destination_page: subject.clusterHref,
              cta_location: `subject_${subject.number}_cluster`,
            }}
            className="mt-5 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
          >
            Revoir les exercices du chapitre
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </article>
      </div>
    </section>
  );
}

export default function SujetsTypeBacMathsTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          productJsonLd("/bac-maths-2027#offre", {
            price: String(PACK_REVISION_EXPRESS_PRICE),
          }),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Sujets type Bac Maths Terminale", path: pagePath },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:py-16">
        <Image
          src="/images/screenshots/sprintmaths-guided-exercise.png"
          alt="Aperçu mobile SprintMaths avec un exercice type bac guidé étape par étape."
          width={390}
          height={844}
          loading="eager"
          className="absolute right-[max(1rem,calc((100vw-72rem)/2))] top-8 hidden w-[245px] rotate-2 rounded-[28px] border border-white/20 shadow-2xl md:block lg:w-[295px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-950">
              Terminale spécialité maths - Bac 2027
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Sujets type Bac Maths Terminale avec corrigé guidé
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              Travaille des sujets type bac maths Terminale avec une correction
              guidée : chapitre à reconnaître, méthode à choisir, calculs à poser
              et conclusion à rédiger proprement.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_subjects_typebac_start"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "subjects_hero_primary",
                  destination_page: "/exercices-type-bac-maths-terminale",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white shadow-md hover:bg-emerald-400 sm:w-auto"
              >
                <PlayCircle className="h-5 w-5" />
                Essayer un sujet type bac guidé
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_subjects_typebac_planning"
                eventParams={{
                  ...baseEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "subjects_hero_planning",
                  destination_page: "/planning-revision-bac-maths",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-center font-bold text-white hover:bg-white/10 sm:w-auto"
              >
                <CalendarDays className="h-5 w-5" />
                Recevoir le planning gratuit
              </TrackedLink>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-300">
              Aperçus d&apos;entraînement, méthodes guidées, accès mobile et Pack
              Révision Express à {PACK_REVISION_EXPRESS_PRICE} €.
            </p>
          </div>

          <div className="mt-8 max-w-[260px] md:hidden">
            <Image
              src="/images/screenshots/sprintmaths-guided-exercise.png"
              alt="Capture mobile SprintMaths d'un exercice guidé type bac."
              width={390}
              height={844}
              loading="eager"
              className="aspect-[390/844] w-full rounded-[28px] border border-white/20 object-cover object-top shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-5">
        <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-3">
          {[
            { value: "3", label: "aperçus de sujets type bac" },
            { value: "4", label: "étapes de corrigé guidé" },
            { value: "39 €", label: "Pack Révision Express" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg bg-slate-50 p-4 text-center">
              <p className="text-3xl font-black text-blue-950">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Entraînement Bac
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Pourquoi travailler des sujets type bac en maths ?
              </h2>
              <div className="mt-5 space-y-4 leading-7 text-slate-700">
                <p>
                  Un sujet type bac maths Terminale oblige à relier plusieurs
                  réflexes : reconnaître le chapitre, choisir une méthode, mener
                  les calculs et rédiger une conclusion. C&apos;est souvent là que
                  l&apos;élève voit la différence entre connaître le cours et savoir
                  l&apos;utiliser.
                </p>
                <p>
                  Travailler des sujets type bac avec corrigé guidé permet de
                  comprendre le chemin avant de mémoriser une réponse. L&apos;objectif
                  n&apos;est pas de deviner un sujet officiel, mais de progresser sur
                  les formats d&apos;exercices qui reviennent en Terminale.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Savoir quoi faire au premier brouillon.",
                "Passer d'une correction lue à une méthode réutilisable.",
                "Repérer les erreurs qui coûtent vite des points.",
                "Travailler les chapitres clés sans réviser au hasard.",
              ].map((item) => (
                <article
                  key={item}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="mt-3 font-semibold leading-6 text-slate-800">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Format SprintMaths
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Ce que contient un sujet type bac SprintMaths
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Les aperçus ci-dessous ne remplacent pas un sujet complet de 2 h.
                Ils montrent comment SprintMaths structure l&apos;entraînement :
                objectif, chapitres, méthode, erreur fréquente et correction
                guidée aperçu.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {sprintMathsContents.map((item) => (
                <article key={item.title} className="rounded-lg bg-slate-50 p-5">
                  <item.icon className="h-6 w-6 text-blue-800" />
                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          {subjectPreviews.map((subject) => (
            <SubjectPreviewCard key={subject.slug} subject={subject} />
          ))}

          <section className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Correction guidée
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Comment utiliser un corrigé guidé
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Lire une correction en entier peut donner l&apos;impression de
                comprendre. Un corrigé guidé sert plutôt à reconstruire le
                raisonnement : on avance étape par étape, puis on vérifie que la
                conclusion répond vraiment à la question.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {guidedCorrectionSteps.map((step, index) => (
                <article
                  key={step}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-sm font-black text-white">
                    {index + 1}
                  </p>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">
                    {step.replace(/^Étape \d : /, "")}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {index === 0 &&
                      "Repérer si la question relève des suites, de l'analyse, des probabilités ou d'un autre chapitre."}
                    {index === 1 &&
                      "Choisir l'outil utile avant de calculer : dérivée, arbre pondéré, tableau de variation, formule de suite."}
                    {index === 2 &&
                      "Écrire les calculs dans l'ordre, avec les conditions nécessaires lorsque l'énoncé en impose."}
                    {index === 3 &&
                      "Transformer le résultat en phrase mathématique claire, liée à la question."}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 rounded-lg border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Transparence
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Sujets type bac vs annales officielles
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                {officialContentDisclaimer}
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Le but est de travailler les méthodes, les chapitres clés et la
                rédaction attendue dans des formats proches de l&apos;entraînement au
                bac maths Terminale.
              </p>
            </div>
            <div className="rounded-lg bg-white p-5 shadow-sm">
              <GraduationCap className="h-7 w-7 text-blue-800" />
              <h3 className="mt-4 text-2xl font-bold text-slate-950">
                Une page pour s&apos;entraîner, pas pour annoncer le sujet du bac
              </h3>
              <p className="mt-3 leading-7 text-slate-700">
                Les sujets type bac SprintMaths servent à répéter les bons
                gestes : identifier, calculer, justifier, conclure. Ils complètent
                les révisions sans promettre une note ni reproduire un sujet
                officiel.
              </p>
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Chapitres clés
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Continuer avec les exercices guidés
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  Après un sujet type bac, renforce le chapitre exact qui a posé
                  problème. Les exercices guidés aident à isoler la méthode avant
                  de revenir à un format plus long.
                </p>
              </div>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_subjects_typebac_start"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "subjects_continue_top",
                  destination_page: "/exercices-type-bac-maths-terminale",
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
              >
                Essayer un sujet type bac guidé
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {clusterLinks.map((link) => (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  eventName={
                    link.cluster === "geometrie-espace"
                      ? "click_internal_geometrie_cluster"
                      : "click_subjects_cluster_exercise"
                  }
                  eventParams={{
                    ...baseEventParams,
                    cluster: link.cluster,
                    destination_page: link.href,
                    cta_location: "subjects_cluster_grid",
                  }}
                  className="rounded-lg border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                >
                  {link.label}
                </TrackedLink>
              ))}
            </div>

            <div className="mt-8 grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-950">
                  Pack Révision Express
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Le pack rassemble des exercices type bac guidés, des méthodes,
                  une progression, un accès mobile et un parcours de révision
                  pour préparer le Bac Maths 2027.
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Exercices type bac guidés",
                    "Méthodes courtes",
                    "Progression visible",
                    "Accès mobile",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-lg bg-slate-50 p-4">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="font-semibold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border-2 border-blue-900 bg-blue-50 p-6">
                <p className="text-sm font-bold uppercase text-blue-900">
                  Paiement unique
                </p>
                <div className="mt-4 flex items-end gap-2">
                  <span className="text-5xl font-black text-slate-950">
                    {PACK_REVISION_EXPRESS_PRICE} €
                  </span>
                  <span className="pb-2 text-sm font-semibold text-slate-600">
                    Pack Révision Express
                  </span>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                  <li className="flex gap-2">
                    <Smartphone className="h-5 w-5 shrink-0 text-blue-800" />
                    Utilisable sur téléphone, sans application native à installer.
                  </li>
                  <li className="flex gap-2">
                    <LineChart className="h-5 w-5 shrink-0 text-amber-700" />
                    Progression visible, sans garantie de note.
                  </li>
                  <li className="flex gap-2">
                    <ListChecks className="h-5 w-5 shrink-0 text-emerald-600" />
                    Planning et diagnostic gratuits pour commencer.
                  </li>
                </ul>
                <div className="mt-6 grid gap-3">
                  <TrackedLink
                    href="/bac-maths-2027#offre"
                    eventName="click_subjects_typebac_offer"
                    eventParams={{
                      ...packEventParams,
                      cta_location: "subjects_offer_card",
                      destination_page: "/bac-maths-2027#offre",
                    }}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
                  >
                    Voir le Pack Révision Express
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                  <TrackedLink
                    href="/diagnostic"
                    eventName="click_subjects_typebac_diagnostic"
                    eventParams={{
                      ...baseEventParams,
                      cta_location: "subjects_offer_diagnostic",
                      destination_page: "/diagnostic",
                    }}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-blue-900 px-5 py-3 text-center font-bold text-blue-900 hover:bg-white"
                  >
                    Faire le diagnostic gratuit
                  </TrackedLink>
                  <TrackedLink
                    href="/planning-revision-bac-maths"
                    eventName="click_subjects_typebac_planning"
                    eventParams={{
                      ...baseEventParams,
                      lead_magnet: "planning_bac_maths_2027",
                      cta_location: "subjects_offer_planning",
                      destination_page: "/planning-revision-bac-maths",
                    }}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-center font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Voir le planning gratuit
                  </TrackedLink>
                </div>
              </div>
            </div>
          </section>

          <FaqAccordion items={faqItems} sourcePage={pagePath} />

          <section className="rounded-lg bg-slate-50 p-6">
            <p className="text-2xl font-bold text-slate-950">
              Continuer les révisions Bac Maths Terminale
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-900"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </section>
    </SeoPageLayout>
  );
}
