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
  ShieldCheck,
  Smartphone,
  Target,
} from "lucide-react";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Button } from "@/components/ui/button";
import { PACK_REVISION_EXPRESS_PRICE } from "@/lib/offers";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/bac-maths-2027";
const subjectsTypeBacPath = "/sujets-type-bac-maths-terminale";

const description =
  "Prépare le Bac Maths 2027 avec SprintMaths : diagnostic gratuit, planning de révision, exercices type bac guidés étape par étape et progression sur téléphone.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Bac Maths 2027 : révisions Terminale, exercices guidés et planning",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title:
      "Bac Maths 2027 : révisions Terminale, exercices guidés et planning",
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
    question: "SprintMaths remplace-t-il un professeur ?",
    answer:
      "Non. SprintMaths est un outil de révision autonome : il aide à organiser le travail, revoir les méthodes et s'entraîner étape par étape. Il ne remplace pas l'accompagnement d'un professeur.",
  },
  {
    question: "Est-ce adapté à la Terminale spécialité maths ?",
    answer:
      "Oui. La page et le Pack Révision Express visent les élèves de Terminale spécialité maths qui préparent le Bac Maths 2027, avec des chapitres, méthodes et exercices adaptés au programme de Terminale.",
  },
  {
    question: "Est-ce que ce sont des annales officielles ?",
    answer:
      "Non. SprintMaths propose des exercices et sujets type bac guidés pour s'entraîner, sans prétendre remplacer les sujets officiels ni se présenter comme une banque d'annales officielles.",
  },
  {
    question: "Combien coûte l'accès ?",
    answer:
      `Le Pack Révision Express coûte ${PACK_REVISION_EXPRESS_PRICE} €. Des offres ponctuelles peuvent exister selon la période, par exemple une promo à 29 €, sans engagement d'abonnement.`,
  },
  {
    question: "Comment reçoit-on l'accès après paiement ?",
    answer:
      "Après paiement, un code d'accès est envoyé automatiquement par email. Ce code permet d'ouvrir l'espace élève et de retrouver l'accès ensuite.",
  },
  {
    question: "Peut-on utiliser SprintMaths sur téléphone ?",
    answer:
      "Oui. SprintMaths est pensé mobile-first pour réviser facilement sur téléphone, avec des exercices guidés, des méthodes courtes et un suivi de progression.",
  },
  {
    question: "Y a-t-il une garantie ?",
    answer:
      `Oui. Une garantie 7 jours est prévue : vous pouvez contacter ${CONTACT_EMAIL} si l'accès ne correspond pas à vos attentes. Cela ne constitue pas une garantie de note au bac.`,
  },
];

const methodSteps = [
  {
    icon: ClipboardList,
    title: "Diagnostic rapide",
    text: "Commencer par repérer les chapitres solides, les automatismes fragiles et les priorités de révision.",
  },
  {
    icon: Target,
    title: "Chapitres prioritaires",
    text: "Travailler d'abord les notions qui reviennent souvent dans les exercices type bac.",
  },
  {
    icon: BookOpenCheck,
    title: "Exercices guidés",
    text: "Découper le raisonnement en étapes pour savoir comment démarrer, calculer et conclure.",
  },
  {
    icon: CalendarDays,
    title: "Planning de révision",
    text: "Construire des sessions courtes et régulières au lieu d'attendre la dernière semaine.",
  },
  {
    icon: LineChart,
    title: "Progression",
    text: "Suivre les scores, les chapitres travaillés et une note indicative /20 pour se situer.",
  },
];

const chapters = [
  "Suites",
  "Limites",
  "Dérivation et convexité",
  "Fonction logarithme",
  "Primitives et équations différentielles",
  "Intégrales",
  "Probabilités",
  "Loi binomiale",
  "Géométrie dans l'espace",
  "Dénombrement",
];

const chapterProgramClusterLinks: Partial<
  Record<
    string,
    {
      href: string;
      eventName:
        | "click_internal_suites_cluster"
        | "click_internal_limites_cluster"
        | "click_internal_derivation_cluster"
        | "click_internal_logarithme_cluster"
        | "click_internal_probabilites_cluster"
        | "click_internal_geometrie_cluster";
      cluster:
        | "suites"
        | "limites"
        | "derivation-convexite"
        | "logarithme"
        | "probabilites"
        | "geometrie-espace";
    }
  >
> = {
  Suites: {
    href: "/programme-maths-terminale/suites",
    eventName: "click_internal_suites_cluster",
    cluster: "suites",
  },
  Limites: {
    href: "/programme-maths-terminale/limites",
    eventName: "click_internal_limites_cluster",
    cluster: "limites",
  },
  "Dérivation et convexité": {
    href: "/programme-maths-terminale/derivation-convexite",
    eventName: "click_internal_derivation_cluster",
    cluster: "derivation-convexite",
  },
  "Fonction logarithme": {
    href: "/programme-maths-terminale/fonction-logarithme",
    eventName: "click_internal_logarithme_cluster",
    cluster: "logarithme",
  },
  Probabilités: {
    href: "/programme-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster",
    cluster: "probabilites",
  },
  "Géométrie dans l'espace": {
    href: "/programme-maths-terminale/geometrie-espace",
    eventName: "click_internal_geometrie_cluster",
    cluster: "geometrie-espace",
  },
};

const packItems = [
  "Exercices type bac guidés",
  "Fiches méthodes courtes",
  "Programme de révision",
  "Suivi de progression",
  "Accès mobile",
  "Code d'accès automatique après paiement",
];

const screenshots = [
  {
    src: "/images/screenshots/sprintmaths-dashboard.png",
    title: "Tableau de bord",
    alt: "Capture mobile SprintMaths pour préparer le Bac Maths 2027 avec progression et Mode Bac Terminale.",
  },
  {
    src: "/images/screenshots/sprintmaths-guided-exercise.png",
    title: "Exercice guidé",
    alt: "Capture mobile SprintMaths d'un exercice type bac guidé étape par étape pour le Bac Maths 2027.",
  },
  {
    src: "/images/screenshots/sprintmaths-score.png",
    title: "Note indicative",
    alt: "Capture mobile SprintMaths montrant une note indicative sur 20 pour suivre la préparation Bac Maths 2027.",
  },
  {
    src: "/images/screenshots/sprintmaths-methods.png",
    title: "Méthodes",
    alt: "Capture mobile SprintMaths d'une fiche méthode de Terminale pour réviser le Bac Maths 2027.",
  },
];

export default function BacMaths2027Page() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  const stripeHref = stripePaymentLink ?? "#offre";
  const stripeTarget = stripePaymentLink ? "_blank" : undefined;
  const stripeRel = stripePaymentLink ? "noopener noreferrer" : undefined;
  const offerEventName = stripePaymentLink
    ? "click_bac2027_stripe"
    : "click_bac2027_offer";

  const baseEventParams = {
    source_page: pagePath,
    offer: "pack_revision_express_bac_2027",
    price: PACK_REVISION_EXPRESS_PRICE,
    currency: "EUR",
  };
  const planningEventParams = {
    ...baseEventParams,
    lead_magnet: "planning_bac_maths_2027",
    level: "terminale",
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
            { name: "Bac Maths 2027", path: pagePath },
          ]),
        ]}
      />

      <section className="bg-gradient-to-b from-blue-50 via-white to-white px-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-center">
          <div className="min-w-0">
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
              Objectif Bac Maths 2027 — Terminale spécialité maths
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Bac Maths 2027 : révise la spécialité maths avec des exercices guidés
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Révise les exercices type bac sans rester bloqué. SprintMaths aide
              les élèves de Terminale à s&apos;entraîner sur téléphone avec des
              exercices guidés étape par étape, des méthodes claires, une
              progression et une note indicative.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/diagnostic"
                eventName="click_bac2027_diagnostic"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "bac2027_hero_primary",
                }}
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  Faire le diagnostic gratuit
                </Button>
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_exercises"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "bac2027_hero_secondary",
                }}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  Essayer un exercice type bac guidé
                </Button>
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_lead_magnet_planning"
                eventParams={{
                  ...planningEventParams,
                  cta_location: "bac2027_hero_planning",
                }}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  <CalendarDays className="h-4 w-4" />
                  Recevoir le planning 30 jours
                </Button>
              </TrackedLink>
            </div>
            <p className="mt-4 text-sm font-semibold text-slate-600">
              Pas d&apos;abonnement. Accès simple par code. Garantie 7 jours.
            </p>
            <TrackedLink
              href="#offre"
              eventName="click_bac2027_offer"
              eventParams={{
                ...baseEventParams,
                cta_location: "bac2027_hero_offer_link",
              }}
              className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-blue-900 hover:underline"
            >
              Voir le Pack Révision Express
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              {screenshots.slice(0, 2).map((screenshot) => (
                <div key={screenshot.src} className="rounded-xl bg-slate-950 p-2">
                  <div className="overflow-hidden rounded-lg bg-white">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={390}
                      height={844}
                      className="aspect-[390/844] w-full object-cover object-top"
                      priority={screenshot.title === "Tableau de bord"}
                    />
                  </div>
                  <p className="mt-2 px-1 text-xs font-bold text-white">
                    {screenshot.title}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl bg-blue-50 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-blue-950">
                <Smartphone className="h-4 w-4" />
                Entraînement pensé pour téléphone
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Des sessions courtes pour reprendre une méthode, avancer dans un
                exercice type bac et suivre la progression.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-6">
        <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-3">
          {[
            { value: "39 €", label: "paiement unique" },
            { value: "7 jours", label: "garantie d'essai" },
            { value: "/20", label: "note indicative" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-slate-50 p-4 text-center">
              <p className="text-3xl font-black text-blue-950">{stat.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Révisions 2027
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Préparer le Bac Maths 2027 sans réviser au hasard
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Le risque en Terminale, ce n&apos;est pas seulement de manquer de
                cours. C&apos;est surtout de passer d&apos;un chapitre à l&apos;autre sans
                savoir quoi travailler en priorité, ni comment transformer une
                correction lue trop vite en méthode utilisable.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Identifier les chapitres prioritaires avant de foncer.",
                "Construire un planning de révision bac maths réaliste.",
                "S'entraîner sur des exercices type bac en plusieurs étapes.",
                "Suivre la progression pour savoir quoi renforcer ensuite.",
              ].map((item) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="mt-3 font-semibold leading-6 text-slate-800">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Blocage courant
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Pourquoi beaucoup d&apos;élèves bloquent devant les exercices type bac
              </h2>
              <div className="mt-4 space-y-4 leading-7 text-slate-700">
                <p>
                  Beaucoup d&apos;élèves connaissent une partie du cours, mais perdent
                  des points parce qu&apos;ils ne savent pas comment démarrer un
                  exercice. Lire une correction ne suffit pas : il faut apprendre
                  les étapes.
                </p>
                <p>
                  En spécialité maths, une question peut demander plusieurs
                  réflexes à la fois : reconnaître la méthode, poser les calculs,
                  justifier proprement et conclure. SprintMaths aide à isoler ces
                  étapes pour rendre l&apos;entraînement plus concret.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-blue-950 p-6 text-white">
              <GraduationCap className="h-7 w-7 text-blue-200" />
              <h3 className="mt-4 text-2xl font-bold">
                L&apos;objectif : savoir quoi faire au premier brouillon
              </h3>
              <p className="mt-4 leading-7 text-blue-100">
                Avant de chercher la bonne réponse, l&apos;élève apprend à repérer le
                chapitre, choisir l&apos;outil mathématique et avancer sans attendre
                une correction complète.
              </p>
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Méthode
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                La méthode SprintMaths : être guidé étape par étape
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                SprintMaths organise la préparation autour d&apos;un diagnostic, de
                chapitres prioritaires, d&apos;exercices guidés, de méthodes courtes,
                d&apos;une progression visible et d&apos;une note indicative /20.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {methodSteps.map((step) => (
                <article key={step.title} className="rounded-xl bg-slate-50 p-5">
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Programme Terminale
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Les chapitres à maîtriser en Terminale
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  Les révisions Bac Maths 2027 doivent couvrir les notions
                  importantes de spécialité maths, sans oublier les chapitres qui
                  mélangent raisonnement, calcul et rédaction.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/programme-maths-terminale"
                  className="inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                >
                  Voir le programme Terminale
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <TrackedLink
                  href={subjectsTypeBacPath}
                  eventName="click_internal_subjects_typebac"
                  eventParams={{
                    source_page: pagePath,
                    destination_page: subjectsTypeBacPath,
                    level: "terminale",
                    intent: "sujets_type_bac",
                    cta_location: "bac2027_chapters_subjects",
                  }}
                  className="inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
                >
                  Voir les sujets type bac corrigés
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
                <TrackedLink
                  href="/planning-revision-bac-maths"
                  eventName="click_lead_magnet_planning"
                  eventParams={{
                    ...planningEventParams,
                    cta_location: "bac2027_chapters_planning",
                  }}
                  className="inline-flex items-center gap-2 font-bold text-emerald-700 hover:underline"
                >
                  Recevoir le planning 30 jours
                  <ArrowRight className="h-4 w-4" />
                </TrackedLink>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {chapters.map((chapter) => {
                const clusterLink = chapterProgramClusterLinks[chapter];

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
                    className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                  >
                    {chapter}
                  </TrackedLink>
                ) : (
                  <Link
                    key={chapter}
                    href="/programme-maths-terminale"
                    className="rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                  >
                    {chapter}
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="grid grid-cols-1 gap-8 rounded-2xl bg-slate-50 p-6 sm:p-8 lg:grid-cols-[0.9fr_1fr] lg:items-center">
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Diagnostic
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Commence gratuitement avec un diagnostic
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Le diagnostic gratuit aide à savoir par où commencer : chapitres
                à revoir, niveau de confiance et premières priorités pour
                réviser sans se disperser.
              </p>
            </div>
            <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h3 className="mt-4 text-2xl font-bold text-slate-950">
                Une première étape sans paiement
              </h3>
              <p className="mt-3 leading-7 text-slate-700">
                Utile pour l&apos;élève qui ne sait pas quoi travailler, et pour le
                parent qui veut comprendre où concentrer l&apos;effort.
              </p>
              <TrackedLink
                href="/diagnostic"
                eventName="click_bac2027_diagnostic"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "bac2027_diagnostic_section",
                }}
                className="mt-5 block w-full"
              >
                <Button size="lg" className="w-full px-4 text-base sm:px-8 sm:text-lg">
                  Faire le diagnostic gratuit
                </Button>
              </TrackedLink>
            </div>
          </section>

          <section
            id="offre"
            className="grid grid-cols-1 gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center"
          >
            <div className="min-w-0">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Pack Révision Express
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Ce que contient le Pack Révision Express
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Le pack rassemble l&apos;essentiel pour préparer le Bac Maths 2027 :
                exercices type bac guidés, fiches méthodes, programme de
                révision, progression, accès mobile et code d&apos;accès automatique
                après paiement.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {packItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border-2 border-blue-900 bg-blue-50 p-6">
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
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                  Garantie 7 jours.
                </li>
                <li className="flex gap-2">
                  <Smartphone className="h-5 w-5 shrink-0 text-blue-800" />
                  Accès simple par code, utilisable sur téléphone.
                </li>
                <li className="flex gap-2">
                  <LineChart className="h-5 w-5 shrink-0 text-amber-700" />
                  Note indicative /20 pour se situer, sans garantie de résultat.
                </li>
              </ul>
              <TrackedLink
                href={stripeHref}
                target={stripeTarget}
                rel={stripeRel}
                eventName={offerEventName}
                eventParams={{
                  ...baseEventParams,
                  payment_provider: stripePaymentLink ? "stripe" : undefined,
                  cta_location: "bac2027_offer_card",
                }}
                className="mt-6 block w-full"
              >
                <Button size="lg" className="w-full whitespace-normal px-4 text-base sm:px-8 sm:text-lg">
                  {stripePaymentLink
                    ? "Accéder au Pack Révision Express"
                    : "Voir le Pack Révision Express"}
                </Button>
              </TrackedLink>
              <p className="mt-3 text-center text-xs font-medium text-slate-500">
                Paiement sécurisé par Stripe si l&apos;offre est ouverte. Aucun abonnement.
              </p>
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Interface
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Réviser sur téléphone, sans perdre le fil
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Les captures ci-dessous montrent l&apos;esprit de l&apos;expérience :
                progression, exercices guidés, note indicative et méthodes
                courtes. Les intitulés visibles de la page restent centrés sur le
                Bac Maths 2027.
              </p>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {screenshots.map((screenshot) => (
                <article key={screenshot.src} className="rounded-2xl bg-slate-950 p-3 shadow-xl">
                  <div className="overflow-hidden rounded-xl bg-white">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={390}
                      height={844}
                      className="aspect-[390/844] w-full object-cover object-top"
                    />
                  </div>
                  <p className="mt-3 flex items-center gap-2 px-1 text-sm font-bold text-white">
                    <Smartphone className="h-4 w-4 text-blue-200" />
                    {screenshot.title}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div className="rounded-2xl bg-blue-950 p-6 text-white">
              <Target className="h-7 w-7 text-blue-200" />
              <h2 className="mt-4 text-3xl font-bold">
                Pour les parents : aider sans refaire le cours à sa place
              </h2>
              <p className="mt-4 leading-7 text-blue-100">
                Votre enfant bloque en maths ? Le problème n&apos;est pas toujours le
                travail. SprintMaths aide à structurer les révisions : quoi
                travailler, dans quel ordre, et comment résoudre les exercices
                étape par étape.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Un cadre clair pour éviter les révisions dispersées.",
                "Des chapitres visibles pour suivre l'effort sans refaire le cours.",
                "Un accès par code après paiement, simple à transmettre.",
                "Une garantie 7 jours si l'accès ne correspond pas aux attentes.",
              ].map((item) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="mt-3 font-semibold leading-6 text-slate-800">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <FaqAccordion items={faqItems} sourcePage={pagePath} />

          <section className="rounded-2xl bg-blue-950 p-8 text-center text-white">
            <h2 className="text-3xl font-bold">
              Bac Maths 2027 : commence par savoir quoi travailler
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Le diagnostic gratuit est le point de départ le plus simple pour
              organiser les révisions et repérer les exercices type bac à
              travailler en priorité.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <TrackedLink
                href="/diagnostic"
                eventName="click_bac2027_diagnostic"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "bac2027_final_primary",
                }}
                className="w-full sm:w-auto"
              >
                <Button variant="secondary" size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  Faire le diagnostic gratuit
                </Button>
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_exercises"
                eventParams={{
                  ...baseEventParams,
                  cta_location: "bac2027_final_secondary",
                }}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  Essayer un exercice type bac guidé
                </Button>
              </TrackedLink>
            </div>
          </section>

          <section className="rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-slate-950">
              Planning 30 jours gratuit par email
            </h2>
            <p className="mt-3 leading-7 text-slate-700">
              Reçois un planning de révision Bac Maths 2027 sur 30 jours :
              chapitres prioritaires, exercices type bac et méthode de travail
              sans créer de compte.
            </p>
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_lead_magnet_planning"
              eventParams={{
                ...planningEventParams,
                cta_location: "bac2027_final_planning",
              }}
              className="mt-5 inline-flex"
            >
              <Button>
                Recevoir le planning 30 jours
              </Button>
            </TrackedLink>
          </section>

          <InternalLinks
            currentPath={pagePath}
            excludeHrefs={["/bac-maths-terminale-2026"]}
            title="Continuer les révisions Bac Maths"
          />
        </div>
      </section>
    </SeoPageLayout>
  );
}
