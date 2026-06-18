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
  "Télécharge un planning gratuit pour réviser le Bac Maths 2027 en 30 jours : chapitres prioritaires, exercices type bac, méthodes et organisation semaine par semaine.";

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
    question: "Combien de temps faut-il pour réviser le Bac Maths ?",
    answer:
      "Cela dépend du niveau de départ et du temps disponible. Le planning SprintMaths propose une base sur 30 jours pour travailler régulièrement les chapitres prioritaires et garder du temps pour les exercices type bac.",
  },
  {
    question: "Peut-on réviser le Bac Maths en 30 jours ?",
    answer:
      "Oui, on peut organiser une vraie reprise en 30 jours si l'on reste réaliste : revoir les méthodes clés, faire des exercices guidés, puis s'entraîner sur des sujets type bac. Le planning n'est pas une garantie de note.",
  },
  {
    question: "Quels chapitres prioriser ?",
    answer:
      "Les priorités fréquentes en Terminale spécialité maths sont les suites, limites, dérivation, logarithme, intégrales, équations différentielles, probabilités, loi binomiale et géométrie dans l'espace. Aucun chapitre n'est garanti au sujet.",
  },
  {
    question: "Faut-il faire des sujets type bac ?",
    answer:
      "Oui, surtout en fin de planning. Les sujets type bac aident à travailler la rédaction, le choix de méthode, les erreurs fréquentes et la gestion du temps, sans prétendre remplacer les consignes officielles.",
  },
  {
    question: "Le planning est-il gratuit ?",
    answer:
      "Oui. Le planning de révision Bac Maths 2027 est gratuit et accessible par email. SprintMaths propose aussi des exercices guidés et un Pack Révision Express payant pour les élèves qui veulent un cadre plus complet.",
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
  "Travailler 20 à 30 minutes par jour",
  "Alterner méthode et exercices",
  "Noter les chapitres faibles",
  "Refaire les exercices où l'on bloque",
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
    focus: "Diagnostic, suites, limites, dérivation",
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
      {
        href: "/programme-maths-terminale/derivation-convexite",
        label: "Revoir le chapitre Dérivation et convexité",
        eventName: "click_internal_derivation_cluster" as const,
        cluster: "derivation-convexite" as const,
      },
    ],
    days: [
      "Jour 1 : diagnostic de départ + suites",
      "Jour 2 : suites, récurrence et variations",
      "Jour 3 : limites de suites et limites de fonctions",
      "Jour 4 : dérivation et tangentes",
      "Jour 5 : tableau de variation",
      "Jour 6 : convexité et lectures graphiques",
      "Jour 7 : exercice type bac court",
    ],
  },
  {
    title: "Semaine 2",
    focus: "Logarithme, intégrales, équations différentielles",
    links: [
      {
        href: "/programme-maths-terminale/fonction-logarithme",
        label: "Revoir le chapitre Fonction logarithme",
        eventName: "click_internal_logarithme_cluster" as const,
        cluster: "logarithme" as const,
      },
    ],
    days: [
      "Logarithme : domaine, équations, inéquations",
      "Études de fonctions avec ln",
      "Primitives et calculs d'intégrales",
      "Interprétation graphique des intégrales",
      "Équations différentielles",
      "Exercices mixtes type bac",
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
      "Probabilités conditionnelles",
      "Loi binomiale : paramètres, calculs, interprétation",
      "Variables aléatoires si le chapitre est au programme travaillé",
      "Géométrie dans l'espace : droites, plans, repérage",
      "Produit scalaire et orthogonalité si pertinent",
      "Exercice guidé avec rédaction",
      "Sujet type bac ciblé",
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
      "Reprise des chapitres faibles",
      "Sujets type bac",
      "Erreurs fréquentes",
      "Gestion du temps",
      "Entraînement final chronométré",
      "Correction active sans promesse de note",
      "Plan des 7 derniers jours",
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
              type bac avec une correction guidée.
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
              <PlanningLeadForm sourcePage={pagePath} />
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Contenu du planning
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Ce que contient le planning
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Le but est simple : savoir quoi travailler chaque jour, sans
                s&apos;éparpiller entre cours, vidéos, corrections et exercices
                isolés.
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
                  Planning Bac Maths 2027
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Planning Bac Maths 2027 : semaine par semaine
                </h2>
                <p className="mt-4 max-w-3xl leading-7 text-slate-700">
                  Une base de travail pour réviser le Bac Maths en 30 jours :
                  diagnostic, chapitres prioritaires, exercices type bac et
                  entraînement final. À adapter selon ton niveau et les consignes
                  données en classe.
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
                            source_page: pagePath,
                            destination_page: link.href,
                            cluster: link.cluster,
                            level: "terminale",
                            cta_location:
                              link.href === typeBacSubjectsPath
                                ? "planning_week4_subjects"
                                : "planning_week_cluster",
                            ...(link.href === typeBacSubjectsPath
                              ? { intent: "sujets_type_bac" }
                              : {}),
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
                Comment l&apos;utiliser
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

          <section className="rounded-2xl bg-blue-950 p-8 text-center text-white">
            <Target className="mx-auto h-8 w-8 text-blue-200" />
            <h2 className="mt-4 text-3xl font-bold">
              Reçois le planning 30 jours et commence proprement
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Une adresse email suffit. Le planning est aussi visible sur cette
              page pour commencer tout de suite.
            </p>
            <TrackedLink
              href="#planning-email"
              eventName="click_lead_magnet_planning"
              eventParams={{
                ...leadEventParams,
                cta_location: "planning_final_anchor",
              }}
              className="mx-auto mt-6 inline-flex min-h-14 w-full items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-center text-lg font-semibold leading-6 text-white shadow-md transition-colors hover:bg-emerald-600 sm:w-auto"
            >
              Recevoir le planning gratuit
            </TrackedLink>
          </section>

          <InternalLinks currentPath={pagePath} title="Autres ressources SprintMaths" />
        </div>
      </section>
    </SeoPageLayout>
  );
}
