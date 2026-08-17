import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  ListChecks,
  Mail,
  Target,
} from "lucide-react";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { PlanningLeadForm } from "@/components/marketing/PlanningLeadForm";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { PACK_REVISION_EXPRESS_PRICE } from "@/lib/offers";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/planning-revision-bac-maths";
const leadMagnet = "planning_bac_maths_2027";
const typeBacPracticePath = "/exercices-type-bac-maths-terminale";
const typeBacSubjectsPath = "/sujets-type-bac-maths-terminale";

const description =
  "Reçois un planning gratuit pour réviser le Bac Maths 2027 en 30 jours : spécialité maths Terminale, chapitres prioritaires, méthodes et sujets guidés.";

export const metadata: Metadata = {
  title: {
    absolute: "Planning Révision Bac Maths 2027 : programme 30 jours gratuit",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: "Planning Révision Bac Maths 2027 : programme 30 jours gratuit",
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
    question: "Quand commencer à réviser le Bac Maths 2027 ?",
    answer:
      "Le plus tôt possible, avec un rythme régulier adapté au niveau de départ. À 30 jours de l'épreuve, ce planning sert à organiser les priorités, mais il peut aussi être utilisé plus tôt en espaçant davantage les séances.",
  },
  {
    question: "Est-ce qu'un planning de 30 jours suffit ?",
    answer:
      "Trente jours peuvent suffire pour structurer une reprise ciblée, revoir des méthodes et s'entraîner. Le résultat dépend du niveau de départ, de la régularité et des difficultés rencontrées : ce planning ne garantit aucune note.",
  },
  {
    question: "Comment utiliser un planning de révision en maths ?",
    answer:
      "Commence par le diagnostic, choisis un objectif court par séance, alterne rappel de méthode et exercices, puis note les erreurs à reprendre. Le planning est un outil d'organisation à adapter aux consignes du professeur.",
  },
  {
    question: "Quels chapitres sont prioritaires ?",
    answer:
      "La priorité dépend du diagnostic. Suites, limites, dérivation et convexité, logarithme, intégrales, probabilités et géométrie dans l'espace forment une base utile à retravailler. Aucun chapitre n'est garanti au sujet.",
  },
  {
    question: "Peut-on réviser le Bac Maths en 15 jours ?",
    answer:
      "Oui, à condition de prioriser. Utilise le diagnostic, travaille les méthodes essentielles, alterne exercices ciblés et corrections, puis termine par des sujets type bac guidés. Il ne s'agit pas de tout revoir en quinze jours.",
  },
  {
    question: "Que faire à 7 jours de l'épreuve ?",
    answer:
      "Évite la panique et concentre-toi sur les méthodes déjà étudiées, les erreurs récurrentes et un ou deux sujets guidés. Si possible, ne découvre pas un chapitre entier à la dernière minute et garde un rythme soutenable.",
  },
  {
    question: "Le planning garantit-il une bonne note ?",
    answer:
      "Non. Le planning aide à organiser les révisions, sans garantir une note ni un résultat. La progression dépend notamment du niveau de départ, du travail réalisé et des conditions de l'épreuve.",
  },
  {
    question: "Le planning est-il adapté à la spécialité maths Terminale ?",
    answer:
      "Oui. Il est conçu pour organiser les révisions de spécialité maths en Terminale, avec des liens vers les chapitres, le diagnostic et des sujets guidés. Il ne s'agit pas d'annales officielles.",
  },
];

const contentItems = [
  "30 jours de révision structurés",
  "Chapitres prioritaires de Terminale spécialité maths",
  "Exercices type bac pour s'entraîner progressivement",
  "Rappels méthode",
  "Conseils pour éviter les erreurs classiques",
];

const audiences = [
  "Élèves de Terminale spécialité maths",
  "Élèves qui veulent reprendre une méthode claire",
  "Parents qui veulent aider leur enfant à s'organiser",
];

const usageSteps = [
  "Commencer par le diagnostic pour repérer les priorités",
  "Choisir un objectif précis pour chaque séance",
  "Alterner rappel de méthode, exercice et correction active",
  "Noter les erreurs et refaire les exercices où l'on bloque",
];

const shortPlanningOptions = [
  {
    title: "Planning Bac Maths sur 15 jours",
    intro:
      "Pour réviser le Bac Maths en 15 jours, concentre le travail sur les priorités révélées par le diagnostic. L'objectif n'est pas de tout revoir, mais de retrouver des automatismes utiles.",
    items: [
      "Jours 1 à 5 : chapitres à fort rendement personnel et méthodes essentielles",
      "Jours 6 à 10 : alternance d'exercices ciblés, de corrections et de rappels méthode",
      "Jours 11 à 13 : reprise des erreurs et des points encore fragiles",
      "Jours 14 et 15 : sujets type bac guidés et bilan final",
    ],
  },
  {
    title: "Planning Bac Maths sur 7 jours",
    intro:
      "À une semaine de l'épreuve, garde une urgence douce : un plan court, réaliste et sans panique. Appuie-toi d'abord sur ce que tu as déjà travaillé.",
    items: [
      "Revoir les méthodes essentielles et les erreurs fréquentes",
      "Faire des exercices courts sur les points faibles identifiés",
      "Travailler un ou deux sujets guidés, puis corriger activement",
      "Éviter si possible de découvrir un chapitre entier au dernier moment",
    ],
  },
];

const priorityChapters = [
  {
    title: "Suites et limites",
    text: "Reprendre les variations, la récurrence et les raisonnements de limite.",
    href: "/programme-maths-terminale/suites",
    eventName: "click_internal_suites_cluster" as const,
    chapter: "suites",
  },
  {
    title: "Limites de fonctions",
    text: "Consolider les calculs, les formes à reconnaître et les interprétations graphiques.",
    href: "/programme-maths-terminale/limites",
    eventName: "click_internal_limites_cluster" as const,
    chapter: "limites",
  },
  {
    title: "Dérivation et convexité",
    text: "Relier dérivée, variations, tangentes et convexité dans une étude de fonction.",
    href: "/programme-maths-terminale/derivation-convexite",
    eventName: "click_internal_derivation_cluster" as const,
    chapter: "derivation-convexite",
  },
  {
    title: "Fonction logarithme",
    text: "Revoir le domaine, les propriétés et les équations ou inéquations avec ln.",
    href: "/programme-maths-terminale/fonction-logarithme",
    eventName: "click_internal_logarithme_cluster" as const,
    chapter: "logarithme",
  },
  {
    title: "Intégrales",
    text: "Retravailler primitives, calculs et interprétation d'une aire.",
    href: "/programme-maths-terminale/integrales",
    eventName: "click_internal_integrales_cluster" as const,
    chapter: "integrales",
  },
  {
    title: "Probabilités",
    text: "Structurer les calculs conditionnels et l'utilisation de la loi binomiale.",
    href: "/programme-maths-terminale/probabilites",
    eventName: "click_internal_probabilites_cluster" as const,
    chapter: "probabilites",
  },
  {
    title: "Géométrie dans l'espace",
    text: "Revoir droites, plans, repérage et raisonnements d'orthogonalité.",
    href: "/programme-maths-terminale/geometrie-espace",
    eventName: "click_internal_geometrie_cluster" as const,
    chapter: "geometrie-espace",
  },
];

const revisionMistakes = [
  "Relire le cours sans vérifier que l'on sait refaire un exercice seul",
  "Changer de chapitre dès qu'une difficulté apparaît",
  "Accumuler les sujets sans analyser les erreurs de méthode ou de calcul",
  "Consacrer le même temps à tous les chapitres malgré le diagnostic",
  "Prévoir des séances trop longues, difficiles à tenir sur plusieurs jours",
];

const afterPlanning = [
  {
    title: "Faire le diagnostic gratuit",
    text: "Repérer les chapitres à revoir avant de choisir les sessions.",
    href: "/diagnostic",
    eventName: "click_planning_diagnostic" as const,
    ctaLocation: "planning_after_card_diagnostic",
    intent: "diagnostic",
  },
  {
    title: "Essayer un exercice type bac guidé",
    text: "S'entraîner sur un format proche bac avec une correction guidée.",
    href: typeBacPracticePath,
    eventName: "click_planning_typebac" as const,
    ctaLocation: "planning_after_card_typebac",
    intent: "typebac_practice",
  },
  {
    title: "Voir le Pack Révision Express",
    text: `Accéder au Pack Révision Express à ${PACK_REVISION_EXPRESS_PRICE} € si l'élève veut un cadre plus complet.`,
    href: "/bac-maths-2027#offre",
    eventName: "click_planning_offer" as const,
    ctaLocation: "planning_after_card_offer",
    intent: "offer",
  },
];

const planningWeeks = [
  {
    title: "Semaine 1",
    focus: "Diagnostic, suites, limites et bases de calcul",
    links: [
      {
        href: "/programme-maths-terminale/suites",
        label: "Revoir le chapitre Suites",
        eventName: "click_internal_suites_cluster" as const,
        cluster: "suites" as const,
      },
      {
        href: "/programme-maths-terminale/limites",
        label: "Revoir le chapitre Limites",
        eventName: "click_internal_limites_cluster" as const,
        cluster: "limites" as const,
      },
    ],
    days: [
      "Jour 1 : diagnostic de départ et choix des priorités",
      "Jour 2 : suites, récurrence et variations",
      "Jour 3 : limites de suites et limites de fonctions",
      "Jour 4 : calcul algébrique et transformations d'expressions",
      "Jour 5 : équations, inéquations et lectures graphiques",
      "Jour 6 : exercice mixte suites et limites",
      "Jour 7 : correction active et reprise des erreurs",
    ],
  },
  {
    title: "Semaine 2",
    focus: "Dérivation, logarithme et intégrales",
    links: [
      {
        href: "/programme-maths-terminale/derivation-convexite",
        label: "Revoir le chapitre Dérivation et convexité",
        eventName: "click_internal_derivation_cluster" as const,
        cluster: "derivation-convexite" as const,
      },
      {
        href: "/programme-maths-terminale/fonction-logarithme",
        label: "Revoir le chapitre Fonction logarithme",
        eventName: "click_internal_logarithme_cluster" as const,
        cluster: "logarithme" as const,
      },
      {
        href: "/programme-maths-terminale/integrales",
        label: "Revoir le chapitre Intégrales",
        eventName: "click_internal_integrales_cluster" as const,
        cluster: "integrales" as const,
      },
    ],
    days: [
      "Jour 8 : dérivation, tangentes et variations",
      "Jour 9 : convexité et lectures graphiques",
      "Jour 10 : logarithme, domaine et propriétés",
      "Jour 11 : équations, inéquations et études de fonctions avec ln",
      "Jour 12 : primitives et calculs d'intégrales",
      "Jour 13 : interprétation graphique des intégrales",
      "Jour 14 : exercice mixte et correction",
    ],
  },
  {
    title: "Semaine 3",
    focus: "Probabilités, loi binomiale, géométrie dans l'espace",
    links: [
      {
        href: "/programme-maths-terminale/probabilites",
        label: "Revoir le chapitre Probabilités",
        eventName: "click_internal_probabilites_cluster" as const,
        cluster: "probabilites" as const,
      },
      {
        href: "/programme-maths-terminale/geometrie-espace",
        label: "Revoir le chapitre Géométrie dans l'espace",
        eventName: "click_internal_geometrie_cluster" as const,
        cluster: "geometrie-espace" as const,
      },
    ],
    days: [
      "Jour 15 : probabilités conditionnelles",
      "Jour 16 : loi binomiale, paramètres et interprétation",
      "Jour 17 : exercice guidé de probabilités",
      "Jour 18 : géométrie dans l'espace, droites et plans",
      "Jour 19 : repérage, produit scalaire et orthogonalité",
      "Jour 20 : exercice guidé avec rédaction",
      "Jour 21 : sujet type bac ciblé et correction",
    ],
  },
  {
    title: "Semaine 4",
    focus: "Sujets type bac, erreurs fréquentes, gestion du temps",
    links: [
      {
        href: typeBacSubjectsPath,
        label: "sujets type bac maths Terminale avec corrigé guidé",
        eventName: "click_planning_subjects" as const,
        cluster: "type-bac" as const,
      },
    ],
    days: [
      "Jours 22 et 23 : reprise des chapitres faibles",
      "Jours 24 et 25 : sujets type bac guidés",
      "Jour 26 : erreurs fréquentes et méthodes à consolider",
      "Jour 27 : travail de la rédaction et de la gestion du temps",
      "Jour 28 : entraînement chronométré",
      "Jour 29 : correction active sans promesse de note",
      "Jour 30 : bilan et fiche des derniers points à revoir",
    ],
  },
];

const internalLinks = [
  { href: "/bac-maths-2027#offre", label: "Pack Révision Express Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
  {
    href: typeBacSubjectsPath,
    label: "sujets type bac maths Terminale avec corrigé guidé",
  },
  { href: "/exercices-maths-terminale", label: "Exercices maths Terminale" },
  { href: "/methodes-maths-terminale", label: "Méthodes maths Terminale" },
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
];

export default function PlanningRevisionBacMathsPage() {
  const leadEventParams = {
    source_page: pagePath,
    lead_magnet: leadMagnet,
    level: "terminale",
  };

  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Planning révision Bac Maths", path: pagePath },
          ]),
        ]}
      />

      <section className="bg-gradient-to-b from-blue-50 via-white to-white px-4 py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
              Gratuit — Terminale spécialité maths
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Planning de révision Bac Maths 2027 — 30 jours
            </h1>
            <p className="mt-5 max-w-3xl text-2xl font-bold leading-9 text-slate-950">
              Un programme de révision Bac Maths en 30 jours pour la Terminale
              spécialité maths, sans partir dans tous les sens.
            </p>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              Reçois un planning gratuit pour prioriser les chapitres clés,
              alterner méthode et entraînement, puis travailler des exercices
              type bac avec une correction guidée. C&apos;est un outil
              d&apos;organisation : il ne garantit aucune note.
            </p>
            <div className="mt-8 hidden gap-3 sm:grid sm:grid-cols-3">
              {[
                { value: "30", label: "jours structurés" },
                { value: "20-30", label: "minutes par jour" },
                { value: "0 €", label: "sans compte" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl bg-white p-4 shadow-sm">
                  <p className="text-3xl font-black text-blue-950">{stat.value}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-900">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-950">
                  Recevoir le planning gratuit
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Email obligatoire, pas de compte à créer.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <PlanningLeadForm idPrefix="planning-hero" sourcePage={pagePath} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Révisions de spécialité maths Terminale
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Planning de révision Bac Maths 2027
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Le but est de savoir quoi travailler chaque jour, chapitre par
                chapitre, sans s&apos;éparpiller entre cours, corrections et
                exercices isolés. Si tu recherches un planning de révision maths
                Terminale PDF, la ressource envoyée ici est une page web
                imprimable, et non un PDF.
              </p>
              <p className="mt-4 leading-7 text-slate-700">
                Pour choisir tes priorités et exploiter les corrections avant
                de remplir le calendrier, consulte le{" "}
                <Link
                  href="/articles/comment-reviser-bac-maths-30-jours"
                  className="font-bold text-blue-900 hover:underline"
                >
                  guide pour organiser 30 jours de révision du Bac Maths
                </Link>
                .
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {contentItems.map((item) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <p className="mt-3 font-semibold leading-6 text-slate-800">{item}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                  Réviser le Bac Maths en 30 jours
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Planning Bac Maths sur 30 jours
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  Ce planning Bac Maths 2027 propose une base semaine par
                  semaine : diagnostic, chapitres prioritaires, sujets guidés et
                  reprise des points faibles. Adapte le rythme à ton niveau et
                  aux consignes données en classe.
                </p>
              </div>
              <a
                href="/planning-bac-maths-2027.html"
                className="inline-flex items-center gap-2 font-bold text-blue-900 hover:underline"
              >
                Ouvrir la version imprimable
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-6 grid gap-4 lg:grid-cols-4">
              {planningWeeks.map((week) => (
                <article key={week.title} className="rounded-2xl bg-slate-50 p-5">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-5 w-5 text-blue-800" />
                    <h3 className="text-xl font-bold text-slate-950">{week.title}</h3>
                  </div>
                  <p className="mt-3 text-sm font-bold leading-6 text-slate-950">
                    {week.focus}
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {week.days.map((day) => (
                      <li key={day} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-900" />
                        <span>{day}</span>
                      </li>
                    ))}
                  </ul>
                  {week.links && week.links.length > 0 ? (
                    <div className="mt-4 flex flex-col gap-2">
                      {week.links.map((link) => (
                        <TrackedLink
                          key={link.href}
                          href={link.href}
                          eventName={link.eventName}
                          eventParams={{
                            ...leadEventParams,
                            destination_page: link.href,
                            cluster: link.cluster,
                            cta_location:
                              link.href === typeBacSubjectsPath
                                ? "planning_week4_subjects"
                                : "planning_week_cluster",
                            ...(link.href === typeBacSubjectsPath
                              ? { intent: "sujets_type_bac" }
                              : { chapter: link.cluster }),
                          }}
                          className="inline-flex items-start gap-2 text-sm font-bold text-blue-900 hover:underline"
                        >
                          <span className="min-w-0">{link.label}</span>
                          <ArrowRight className="mt-1 h-4 w-4 shrink-0" />
                        </TrackedLink>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
            <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-700">
              Pour les révisions transversales, garde aussi sous la main la{" "}
              <Link
                href="/formules-bac-maths-terminale"
                className="font-bold text-blue-900 hover:underline"
              >
                fiche complète des formules du Bac Maths
              </Link>{" "}
              et vérifie que tu sais reconstruire les{" "}
              <Link
                href="/demonstrations-bac-maths-terminale"
                className="font-bold text-blue-900 hover:underline"
              >
                démonstrations à connaître en Terminale
              </Link>
              .
            </p>
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            {shortPlanningOptions.map((option) => (
              <article
                key={option.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <CalendarDays className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-3xl font-bold text-slate-950">
                  {option.title}
                </h2>
                <p className="mt-4 leading-7 text-slate-700">{option.intro}</p>
                <ul className="mt-5 space-y-3 text-slate-700">
                  {option.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </section>

          <section className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-blue-950 p-6 text-white">
              <GraduationCap className="h-7 w-7 text-blue-200" />
              <h2 className="mt-4 text-3xl font-bold">Pour qui ?</h2>
              <ul className="mt-5 space-y-3 text-blue-100">
                {audiences.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment utiliser ce planning de révision
              </h2>
              <ul className="mt-5 space-y-3 text-slate-700">
                {usageSteps.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-2xl bg-slate-50 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
              Prioriser sans deviner le sujet
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Quels chapitres réviser en priorité
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              Il n&apos;existe pas de classement universel : aucun chapitre
              n&apos;est garanti au sujet. Commence par les notions signalées par
              le diagnostic, puis consolide les chapitres où une méthode mieux
              maîtrisée peut débloquer plusieurs exercices.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "1. Les blocages de base",
                  text: "Calcul, lecture graphique et rédaction avant les exercices plus longs.",
                },
                {
                  title: "2. Les chapitres fragiles",
                  text: "Ceux où le diagnostic ou les devoirs révèlent des erreurs répétées.",
                },
                {
                  title: "3. L'entraînement transversal",
                  text: "Des sujets guidés pour apprendre à choisir une méthode et enchaîner les étapes.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
                  <h3 className="font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Maillage spécialité maths
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Planning par chapitre de Terminale
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Utilise ces pages de programme comme points d&apos;entrée pour
                préparer chaque séance du planning de révision maths Terminale.
              </p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {priorityChapters.map((chapter) => (
                <TrackedLink
                  key={chapter.href}
                  href={chapter.href}
                  eventName={chapter.eventName}
                  eventParams={{
                    ...leadEventParams,
                    destination_page: chapter.href,
                    chapter: chapter.chapter,
                    cluster: chapter.chapter,
                    cta_location: "planning_chapter_grid",
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50"
                >
                  <h3 className="text-lg font-bold text-slate-950">{chapter.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{chapter.text}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-900">
                    Ouvrir le chapitre
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </TrackedLink>
              ))}
            </div>
          </section>

          <section className="grid gap-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-900">
                Garder un rythme utile
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Erreurs fréquentes dans les révisions
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Un planning fonctionne surtout si chaque correction sert à
                décider de la séance suivante.
              </p>
            </div>
            <ul className="space-y-3 text-slate-800">
              {revisionMistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl bg-white p-4 shadow-sm">
                  <span className="font-black text-amber-800">×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="max-w-3xl">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Suite logique
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Après le planning
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Le planning donne l&apos;ordre de travail. SprintMaths peut ensuite
                aider à passer à l&apos;action avec un diagnostic et des exercices
                guidés.
              </p>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {afterPlanning.map((item) => (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  eventName={item.eventName}
                  eventParams={{
                    ...leadEventParams,
                    destination_page: item.href,
                    cta_location: item.ctaLocation,
                    intent: item.intent,
                    ...(item.href === "/bac-maths-2027#offre"
                      ? {
                          offer: "pack_revision_express_bac_2027",
                          price: PACK_REVISION_EXPRESS_PRICE,
                          currency: "EUR",
                        }
                      : {}),
                  }}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50"
                >
                  <BookOpenCheck className="h-6 w-6 text-blue-800" />
                  <h3 className="mt-3 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                </TrackedLink>
              ))}
            </div>
          </section>

          <section className="grid gap-8 rounded-2xl bg-slate-50 p-6 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Organiser puis s&apos;entraîner
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Le planning aide à démarrer, le diagnostic aide à prioriser
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Si tu ne sais pas par quel chapitre commencer, fais le diagnostic
                gratuit. Il sert de point de départ avant les sessions de révision.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <TrackedLink
                href="/diagnostic"
                eventName="click_planning_diagnostic"
                eventParams={{
                  ...leadEventParams,
                  destination_page: "/diagnostic",
                  cta_location: "planning_after_diagnostic",
                  intent: "diagnostic",
                }}
                className="inline-flex min-h-14 w-full items-center justify-center rounded-full bg-blue-900 px-6 py-3 text-center text-lg font-semibold leading-6 text-white shadow-md transition-colors hover:bg-blue-800"
              >
                Faire le diagnostic gratuit
              </TrackedLink>
              <TrackedLink
                href={typeBacPracticePath}
                eventName="click_planning_typebac"
                eventParams={{
                  ...leadEventParams,
                  destination_page: typeBacPracticePath,
                  cta_location: "planning_after_typebac",
                  intent: "typebac_practice",
                }}
                className="inline-flex min-h-14 w-full items-center justify-center rounded-full border-2 border-blue-900 bg-white px-6 py-3 text-center text-lg font-semibold leading-6 text-blue-900 transition-colors hover:bg-slate-50"
              >
                Essayer un exercice type bac guidé
              </TrackedLink>
              <TrackedLink
                href="/bac-maths-2027#offre"
                eventName="click_planning_offer"
                eventParams={{
                  ...leadEventParams,
                  destination_page: "/bac-maths-2027#offre",
                  offer: "pack_revision_express_bac_2027",
                  price: PACK_REVISION_EXPRESS_PRICE,
                  currency: "EUR",
                  cta_location: "planning_after_offer",
                  intent: "offer",
                }}
                className="inline-flex min-h-14 w-full items-center justify-center rounded-full border-2 border-blue-900 bg-white px-6 py-3 text-center text-lg font-semibold leading-6 text-blue-900 transition-colors hover:bg-slate-50"
              >
                Voir le Pack Révision Express
              </TrackedLink>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="text-2xl font-bold text-slate-950">
                Continuer avec les pages utiles
              </h2>
            </div>
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

          <FaqAccordion items={faqItems} sourcePage={pagePath} />

          <section className="grid gap-8 rounded-2xl bg-blue-950 p-6 text-white sm:p-8 lg:grid-cols-[1fr_420px] lg:items-center">
            <div>
              <Target className="h-8 w-8 text-blue-200" />
              <h2 className="mt-4 text-3xl font-bold">
                Recevoir le planning gratuit
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-blue-100">
                Reçois le planning Bac Maths 2027 sur 30 jours et sa version web
                imprimable. Le contenu sert à organiser les révisions de
                spécialité maths Terminale, sans promesse de note.
              </p>
              <p className="mt-3 text-sm font-semibold text-blue-100">
                Email uniquement pour envoyer le planning. Aucun spam.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5 text-slate-950 shadow-sm sm:p-6">
              <PlanningLeadForm idPrefix="planning-final" sourcePage={pagePath} />
            </div>
          </section>

          <InternalLinks currentPath={pagePath} title="Autres ressources SprintMaths" />
        </div>
      </section>
    </SeoPageLayout>
  );
}
