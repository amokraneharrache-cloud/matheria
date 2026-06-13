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
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { PACK_REVISION_EXPRESS_PRICE } from "@/lib/offers";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd, type FaqItem } from "@/lib/seo";
import { GuidedExercisePreview } from "./GuidedExercisePreview";

const pagePath = "/exercices-type-bac-maths-terminale";
const subjectsSectionId = "sujets-type-bac-guides";
const subjectsCtaHref = "/sujets-type-bac-maths-terminale";

const title = "Exercices et sujets type Bac Maths Terminale corrigés";
const description =
  "Entraîne-toi avec des exercices et sujets type Bac Maths Terminale guidés étape par étape : corrigés, méthodes, chapitres clés et préparation Bac 2027.";

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
    answer:
      "SprintMaths propose des exercices et sujets type bac guidés. Ce ne sont pas des annales officielles revendiquées.",
  },
  {
    question: "Est-ce que les exercices sont corrigés ?",
    answer:
      "Oui. Les exercices sont accompagnés d'une correction guidée étape par étape pour comprendre le raisonnement, pas seulement lire la réponse finale.",
  },
  {
    question: "Est-ce adapté au Bac 2027 ?",
    answer:
      "Oui. Le contenu vise les élèves de Terminale spécialité maths qui préparent le Bac 2027, avec les chapitres importants du programme de Terminale.",
  },
  {
    question: "Est-ce que SprintMaths remplace un prof ?",
    answer:
      "Non. SprintMaths est un outil d'entraînement autonome : il aide à revoir les méthodes, pratiquer et suivre la progression, mais il ne remplace pas un professeur.",
  },
  {
    question: "Est-ce utilisable sur téléphone ?",
    answer:
      "Oui. SprintMaths est pensé mobile-first et s'utilise dans le navigateur du téléphone. Ce n'est pas une application native à installer.",
  },
  {
    question: "Comment accéder au pack après paiement ?",
    answer:
      "Après paiement, un code d'accès est envoyé automatiquement par email. Ce code permet d'ouvrir le Pack Révision Express et de retrouver l'accès ensuite.",
  },
  {
    question: "Est-ce qu'il y a une garantie ?",
    answer:
      "Oui. Une garantie 7 jours est prévue si l'accès ne correspond pas aux attentes. Elle ne constitue pas une garantie de note au bac.",
  },
];

const freeExercises = [
  {
    chapter: "Suites",
    title: "Étudier une suite et justifier son sens de variation",
    text: "Repérer la bonne méthode avant de se lancer dans les calculs.",
  },
  {
    chapter: "Dérivation / convexité",
    title: "Construire un tableau de variation",
    text: "Calculer la dérivée, étudier son signe et conclure clairement.",
  },
  {
    chapter: "Probabilités",
    title: "Utiliser un arbre pondéré et une probabilité conditionnelle",
    text: "Organiser les événements pour éviter de mélanger les branches.",
  },
];

const guidedSteps = [
  {
    icon: Target,
    title: "Reconnaître la méthode",
    text: "L'élève identifie le chapitre, la question type et le réflexe utile avant de calculer.",
  },
  {
    icon: PenTool,
    title: "Avancer par étapes",
    text: "Le raisonnement est découpé en actions courtes : poser les données, calculer, justifier.",
  },
  {
    icon: CheckCircle2,
    title: "Vérifier la conclusion",
    text: "La fin de l'exercice relie le résultat à la question posée, comme attendu dans un sujet type bac.",
  },
  {
    icon: LineChart,
    title: "Suivre la progression",
    text: "Le pack aide à voir les chapitres travaillés et les priorités de progression.",
  },
];

const chapters = [
  "Suites",
  "Limites",
  "Dérivation et convexité",
  "Logarithme",
  "Primitives et équations différentielles",
  "Intégrales",
  "Probabilités",
  "Loi binomiale",
  "Géométrie dans l'espace",
  "Dénombrement",
];

const subjectChapterLinks = [
  {
    label: "Suites",
    href: "/exercices-maths-terminale/suites",
    eventName: "click_internal_suites_cluster",
    cluster: "suites",
  },
  {
    label: "Limites",
    href: "/exercices-maths-terminale/limites",
    eventName: "click_internal_limites_cluster",
    cluster: "limites",
  },
  {
    label: "Dérivation",
    href: "/exercices-maths-terminale/derivation",
    eventName: "click_internal_derivation_cluster",
    cluster: "derivation-convexite",
  },
  {
    label: "Logarithme",
    href: "/exercices-maths-terminale/logarithme",
    eventName: "click_internal_logarithme_cluster",
    cluster: "logarithme",
  },
  {
    label: "Probabilités",
    href: "/exercices-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
] as const;

const chapterExerciseClusterLinks: Partial<
  Record<
    string,
    {
      href: string;
      eventName:
        | "click_internal_suites_cluster"
        | "click_internal_limites_cluster"
        | "click_internal_derivation_cluster"
        | "click_internal_logarithme_cluster"
        | "click_internal_probabilites_cluster";
      cluster:
        | "suites"
        | "limites"
        | "derivation-convexite"
        | "logarithme"
        | "probabilites";
    }
  >
> = {
  Suites: {
    href: "/exercices-maths-terminale/suites",
    eventName: "click_internal_suites_cluster",
    cluster: "suites",
  },
  Limites: {
    href: "/exercices-maths-terminale/limites",
    eventName: "click_internal_limites_cluster",
    cluster: "limites",
  },
  "Dérivation et convexité": {
    href: "/exercices-maths-terminale/derivation",
    eventName: "click_internal_derivation_cluster",
    cluster: "derivation-convexite",
  },
  Logarithme: {
    href: "/exercices-maths-terminale/logarithme",
    eventName: "click_internal_logarithme_cluster",
    cluster: "logarithme",
  },
  Probabilités: {
    href: "/exercices-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
};

const packItems = [
  "Exercices type bac guidés",
  "Méthodes courtes",
  "Progression",
  "Note indicative",
  "Accès mobile",
  "Code d'accès automatique après paiement",
];

const internalLinks = [
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths" },
  { href: "/sujets-type-bac-maths-terminale", label: "Sujets type bac guidés" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
  { href: "/programme-maths-terminale", label: "Programme Terminale" },
  { href: "/methodes-maths-terminale", label: "Méthodes Terminale" },
  { href: "/exercices-maths-terminale", label: "Exercices Terminale" },
];

export default function ExercicesTypeBacMathsTerminalePage() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  const stripeHref = stripePaymentLink ?? "/bac-maths-2027#offre";
  const stripeTarget = stripePaymentLink ? "_blank" : undefined;
  const stripeRel = stripePaymentLink ? "noopener noreferrer" : undefined;
  const stripeEventName = stripePaymentLink
    ? "click_typebac_stripe"
    : "click_typebac_offer";

  const baseEventParams = {
    source_page: pagePath,
    level: "terminale",
    exam_goal: "bac_2027",
    offer: "pack_revision_express_bac_2027",
    price: PACK_REVISION_EXPRESS_PRICE,
    currency: "EUR",
  };

  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          productJsonLd(pagePath, {
            price: String(PACK_REVISION_EXPRESS_PRICE),
          }),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Exercices type Bac Maths Terminale", path: pagePath },
          ]),
        ]}
      />

      <section className="relative overflow-hidden bg-slate-950 px-4 py-14 text-white sm:py-16">
        <Image
          src="/images/screenshots/sprintmaths-guided-exercise.png"
          alt="Capture mobile SprintMaths montrant un exercice guidé type bac étape par étape."
          width={390}
          height={844}
          loading="eager"
          className="absolute right-[max(1rem,calc((100vw-72rem)/2))] top-8 hidden w-[250px] rotate-2 rounded-[28px] border border-white/20 shadow-2xl md:block lg:w-[300px]"
        />
        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-950">
              Terminale spécialité maths — Bac 2027
            </p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
              Exercices type Bac Maths Terminale guidés étape par étape
            </h1>
            <p className="mt-4 text-2xl font-extrabold leading-tight text-blue-100 sm:text-3xl">
              Ne reste plus bloqué devant les exercices type bac
            </p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-200">
              SprintMaths t&apos;aide à comprendre comment démarrer, quelles étapes
              suivre et comment vérifier ton raisonnement, directement sur
              téléphone.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href={`${pagePath}#exercice-guide`}
                eventName="click_typebac_free_exercise"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "typebac_hero_primary",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white shadow-md hover:bg-emerald-400 sm:w-auto"
              >
                <PlayCircle className="h-5 w-5" />
                Essayer un exercice guidé gratuit
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_typebac_diagnostic"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "typebac_hero_secondary",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/50 px-5 py-3 text-center font-bold text-white hover:bg-white/10 sm:w-auto"
              >
                Faire le diagnostic gratuit
              </TrackedLink>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-300">
              Pas d’abonnement. Accès par code. Garantie 7 jours.
            </p>
            <TrackedLink
              href={`${pagePath}#offre`}
              eventName="click_typebac_offer"
              eventParams={{
                ...baseEventParams,
                cta_location: "typebac_hero_offer_link",
              }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-100 hover:text-white"
            >
              Voir le Pack Révision Express
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>

          <div className="mt-8 max-w-[260px] md:hidden">
            <Image
              src="/images/screenshots/sprintmaths-guided-exercise.png"
              alt="Aperçu mobile d'un exercice guidé SprintMaths."
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
            { value: "3", label: "exercices guidés gratuits pour commencer" },
            { value: "10", label: "chapitres de Terminale couverts" },
            { value: "39 €", label: "Pack Révision Express, paiement unique" },
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
                Blocage courant
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Pourquoi les exercices type bac sont difficiles
              </h2>
              <div className="mt-5 space-y-4 leading-7 text-slate-700">
                <p>
                  Beaucoup d&apos;élèves connaissent une partie du cours, mais ne
                  savent pas comment démarrer un exercice type bac maths Terminale.
                  Ils reconnaissent parfois les formules, sans voir quelle méthode
                  choisir au premier brouillon.
                </p>
                <p>
                  Les corrections classiques sautent souvent des étapes : elles
                  montrent le résultat, mais pas toujours le chemin pour y arriver.
                  Au bac, il faut reconnaître rapidement le chapitre, poser les
                  données utiles et justifier chaque conclusion.
                </p>
                <p>
                  L&apos;objectif de SprintMaths est donc de s&apos;entraîner à raisonner :
                  comprendre la méthode, avancer étape par étape, puis vérifier que
                  la réponse répond bien à la question.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Savoir comment commencer avant de calculer.",
                "Reconnaître la méthode attendue dans un sujet type bac maths Terminale.",
                "Éviter de lire une correction sans savoir la refaire.",
                "Transformer un chapitre fragile en réflexes utilisables.",
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

          <section
            id={subjectsSectionId}
            className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.95fr_1fr] lg:items-start"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Sujets guidés
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Sujets type bac maths Terminale avec corrigé guidé
              </h2>
              <div className="mt-5 space-y-4 leading-7 text-slate-700">
                <p>
                  SprintMaths propose des sujets type bac maths Terminale et des
                  exercices type bac guidés pour s&apos;entraîner sur les
                  raisonnements attendus en spécialité maths.
                </p>
                <p>
                  Ce ne sont pas des annales officielles revendiquées. Le but est
                  d&apos;apprendre à démarrer une question, suivre les étapes utiles
                  et corriger activement son raisonnement au lieu de lire
                  seulement le résultat.
                </p>
                <p>
                  Les sujets et exercices couvrent les chapitres clés : suites,
                  limites, dérivation, logarithme, probabilités et géométrie.
                </p>
              </div>
              <TrackedLink
                href={subjectsCtaHref}
                eventName="click_typebac_subjects_page"
                eventParams={{
                  ...baseEventParams,
                  destination_page: subjectsCtaHref,
                  intent: "sujets_type_bac",
                  cta_location: "typebac_subjects_section",
                }}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Voir les sujets type bac guidés
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="rounded-lg border border-blue-100 bg-blue-50 p-5 sm:p-6">
              <h3 className="text-xl font-bold text-slate-950">
                Travailler les chapitres qui tombent souvent en type bac
              </h3>
              <p className="mt-3 leading-7 text-slate-700">
                Chaque lien renvoie vers un cluster d&apos;exercices corrigés de
                Terminale pour consolider une méthode avant de revenir sur un
                sujet complet.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {subjectChapterLinks.map((chapter) => (
                  <TrackedLink
                    key={chapter.href}
                    href={chapter.href}
                    eventName={chapter.eventName}
                    eventParams={{
                      source_page: pagePath,
                      destination_page: chapter.href,
                      cluster: chapter.cluster,
                      level: "terminale",
                      cta_location: "typebac_subjects_chapter_link",
                    }}
                    className="rounded-lg border border-blue-100 bg-white p-4 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                  >
                    {chapter.label}
                  </TrackedLink>
                ))}
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Démo gratuite
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  3 exercices guidés gratuits pour commencer
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  Voici trois formats d&apos;exercices corrigés maths Terminale à
                  travailler en mode guidé. La démo ci-dessous montre l&apos;esprit
                  SprintMaths sans exposer les routes privées du produit.
                </p>
              </div>
              <TrackedLink
                href={`${pagePath}#exercice-guide`}
                eventName="click_typebac_free_exercise"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "typebac_free_section_top",
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
              >
                Lancer la démo
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {freeExercises.map((exercise, index) => (
                <article
                  key={exercise.chapter}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-800">
                    <ClipboardList className="h-4 w-4" />
                    {exercise.chapter}
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">
                    {exercise.title}
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">{exercise.text}</p>
                  <TrackedLink
                    href={`${pagePath}#exercice-guide`}
                    eventName="click_typebac_free_exercise"
                    eventParams={{
                      ...baseEventParams,
                      cta_location: `typebac_free_card_${index + 1}`,
                    }}
                    className="mt-5 inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                  >
                    Voir l&apos;aperçu guidé
                    <ArrowRight className="h-4 w-4" />
                  </TrackedLink>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <GuidedExercisePreview />
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Méthode SprintMaths
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Comment fonctionne un exercice guidé SprintMaths
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Un exercice guidé ne se limite pas à cocher une réponse. Il aide
                l&apos;élève à comprendre le chemin : identifier la méthode, poser les
                données, avancer dans les calculs puis conclure.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {guidedSteps.map((step) => (
                <article key={step.title} className="rounded-lg bg-slate-50 p-5">
                  <step.icon className="h-6 w-6 text-blue-800" />
                  <h3 className="mt-3 text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Programme
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Chapitres disponibles
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  Les exercices guidés maths Terminale couvrent les chapitres à
                  maîtriser pour progresser sur des sujets type bac.
                </p>
              </div>
              <Link
                href="/programme-maths-terminale"
                className="inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
              >
                Voir le programme Terminale
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {chapters.map((chapter) => {
                const clusterLink = chapterExerciseClusterLinks[chapter];

                return clusterLink ? (
                  <TrackedLink
                    key={chapter}
                    href={clusterLink.href}
                    eventName={clusterLink.eventName}
                    eventParams={{
                      source_page: pagePath,
                      destination_page: clusterLink.href,
                      cluster: clusterLink.cluster,
                      level: "terminale",
                    }}
                    className="rounded-lg border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                  >
                    {chapter}
                  </TrackedLink>
                ) : (
                  <Link
                    key={chapter}
                    href="/programme-maths-terminale"
                    className="rounded-lg border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                  >
                    {chapter}
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Correction
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Correction classique vs corrigé guidé SprintMaths
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Une correction classique peut être utile après l&apos;exercice. Mais
                quand l&apos;élève bloque, il a surtout besoin de savoir quelle étape
                faire maintenant. SprintMaths met l&apos;accent sur ce raisonnement :
                comprendre l&apos;étape, justifier le calcul et savoir refaire une
                démarche similaire.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <BookOpenCheck className="h-6 w-6 text-slate-700" />
                <h3 className="mt-3 text-xl font-bold text-slate-950">
                  Correction classique
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                  <li>Réponse souvent donnée d&apos;un bloc.</li>
                  <li>Étapes intermédiaires parfois rapides.</li>
                  <li>Utile pour vérifier, moins pour débloquer.</li>
                </ul>
              </article>
              <article className="rounded-lg border-2 border-emerald-500 bg-emerald-50 p-5">
                <ListChecks className="h-6 w-6 text-emerald-700" />
                <h3 className="mt-3 text-xl font-bold text-slate-950">
                  Correction guidée SprintMaths
                </h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-800">
                  <li>Chapitre et méthode identifiés dès le départ.</li>
                  <li>Raisonnement découpé en étapes courtes.</li>
                  <li>Conclusion reliée à la question posée.</li>
                </ul>
              </article>
            </div>
          </section>

          <section
            id="offre"
            className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Pack Révision Express
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Débloquer le Pack Révision Express
                </h2>
                <p className="mt-4 leading-7 text-slate-700">
                  Le pack rassemble les exercices type bac guidés, les méthodes
                  courtes, la progression, l&apos;accès mobile et
                  le code d&apos;accès automatique après paiement.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {packItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg bg-slate-50 p-4"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                      <span className="font-semibold text-slate-800">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <TrackedLink
                    href="/planning-revision-bac-maths"
                    eventName="click_typebac_planning"
                    eventParams={{
                      ...baseEventParams,
                      lead_magnet: "planning_bac_maths_2027",
                      cta_location: "typebac_offer_planning",
                    }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-blue-900 px-5 py-3 text-center font-bold text-blue-900 hover:bg-blue-50"
                  >
                    <CalendarDays className="h-4 w-4" />
                    Voir le planning gratuit
                  </TrackedLink>
                  <TrackedLink
                    href="/diagnostic"
                    eventName="click_typebac_diagnostic"
                    eventParams={{
                      ...baseEventParams,
                      cta_location: "typebac_offer_diagnostic",
                    }}
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-center font-bold text-slate-800 hover:bg-slate-50"
                  >
                    Faire le diagnostic
                  </TrackedLink>
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
                <p className="mt-3 text-sm font-semibold text-slate-700">
                  Offres ponctuelles possibles selon la période.
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-slate-700">
                  <li className="flex gap-2">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                    Garantie 7 jours.
                  </li>
                  <li className="flex gap-2">
                    <Smartphone className="h-5 w-5 shrink-0 text-blue-800" />
                    Accès sur téléphone, sans application native à installer.
                  </li>
                  <li className="flex gap-2">
                    <GraduationCap className="h-5 w-5 shrink-0 text-amber-700" />
                    Progression visible pour se situer, sans garantie de note.
                  </li>
                </ul>
                <TrackedLink
                  href={stripeHref}
                  target={stripeTarget}
                  rel={stripeRel}
                  eventName={stripeEventName}
                  eventParams={{
                    ...baseEventParams,
                    payment_provider: stripePaymentLink ? "stripe" : undefined,
                    cta_location: "typebac_offer_checkout",
                  }}
                  className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
                >
                  {stripePaymentLink
                    ? "Débloquer le Pack Révision Express"
                    : "Voir le Pack Révision Express"}
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <p className="mt-3 text-center text-xs font-medium text-slate-500">
                  Aucun abonnement. Paiement sécurisé par Stripe si l&apos;offre est
                  ouverte.
                </p>
              </div>
            </div>
          </section>

          <FaqAccordion items={faqItems} sourcePage={pagePath} />

          <section className="rounded-lg bg-slate-50 p-6">
            <p className="text-2xl font-bold text-slate-950">
              Continuer les révisions Bac Maths Terminale
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {internalLinks.map((link) =>
                link.href === subjectsCtaHref ? (
                  <TrackedLink
                    key={link.href}
                    href={link.href}
                    eventName="click_internal_subjects_typebac"
                    eventParams={{
                      source_page: pagePath,
                      destination_page: link.href,
                      level: "terminale",
                      intent: "sujets_type_bac",
                      cta_location: "typebac_internal_links_subjects",
                    }}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-900"
                  >
                    {link.label}
                  </TrackedLink>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:border-blue-200 hover:text-blue-900"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </section>
        </div>
      </section>
    </SeoPageLayout>
  );
}
