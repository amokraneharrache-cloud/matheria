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
import { Button } from "@/components/ui/button";
import { PACK_REVISION_EXPRESS_PRICE } from "@/lib/offers";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/planning-revision-bac-maths";
const leadMagnet = "planning_bac_maths_2027";

const description =
  "Télécharge gratuitement un planning de révision Bac Maths 2027 sur 30 jours : chapitres prioritaires, exercices type bac et méthode de travail.";

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
    question: "Le planning garantit-il une bonne note au Bac Maths ?",
    answer:
      "Non. Le planning donne une organisation de travail et des priorités de révision, mais il ne garantit pas une note. La progression dépend du niveau de départ, de la régularité et de l'entraînement réel.",
  },
  {
    question: "Est-ce adapté à la Terminale spécialité maths ?",
    answer:
      "Oui. Le planning cible les élèves de Terminale spécialité maths qui préparent le Bac Maths 2027, avec des chapitres prioritaires comme les suites, les fonctions, les intégrales, les probabilités et la géométrie dans l'espace.",
  },
  {
    question: "Est-ce un PDF officiel de l'Éducation nationale ?",
    answer:
      "Non. C'est un support SprintMaths gratuit pour aider à s'organiser. Une version imprimable HTML est fournie, en plus du contenu visible sur la page.",
  },
  {
    question: "Que faire après avoir reçu le planning ?",
    answer:
      "Le plus simple est de faire le diagnostic gratuit, puis de travailler les chapitres faibles avec les exercices guidés SprintMaths. Le Pack Révision Express peut ensuite aider si l'élève veut un cadre plus complet.",
  },
];

const contentItems = [
  "30 jours de révision structurés",
  "Chapitres prioritaires",
  "Exercices type bac",
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
  },
  {
    title: "Essayer les exercices guidés",
    text: "S'entraîner sur des exercices type bac avec des étapes.",
    href: "/exercices-type-bac-maths-terminale",
  },
  {
    title: "Débloquer le Pack si besoin",
    text: `Accéder au Pack Révision Express à ${PACK_REVISION_EXPRESS_PRICE} € si l'élève veut un cadre plus complet.`,
    href: "/bac-maths-2027",
  },
];

const planningWeeks = [
  {
    title: "Semaine 1",
    days: [
      "Jour 1 : diagnostic + suites",
      "Jour 2 : suites, récurrence, variations",
      "Jour 3 : limites de suites",
      "Jour 4 : dérivation",
      "Jour 5 : tableau de variation",
      "Jour 6 : convexité",
      "Jour 7 : mini sujet type bac",
    ],
  },
  {
    title: "Semaine 2",
    days: [
      "Logarithme",
      "Équations avec ln",
      "Primitives",
      "Intégrales",
      "Équations différentielles",
      "Exercices mixtes",
    ],
  },
  {
    title: "Semaine 3",
    days: [
      "Probabilités conditionnelles",
      "Loi binomiale",
      "Variables aléatoires si pertinent",
      "Géométrie dans l'espace",
      "Droites et plans",
      "Produit scalaire si pertinent",
      "Sujet type bac",
    ],
  },
  {
    title: "Semaine 4",
    days: [
      "Reprise des chapitres faibles",
      "Sujets type bac",
      "Erreurs fréquentes",
      "Gestion du temps",
      "Entraînement final",
      "Simulation de note indicative",
      "Plan des 7 derniers jours",
    ],
  },
];

const internalLinks = [
  { href: "/bac-maths-2027", label: "Pack Révision Express Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac guidés",
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
              Un planning clair pour réviser le Bac Maths 2027 sans partir dans tous
              les sens.
            </p>
            <p className="mt-4 max-w-3xl leading-7 text-slate-700">
              Reçois un programme de 30 jours pour savoir quels chapitres
              travailler, dans quel ordre, et comment t&apos;entraîner sur des
              exercices type bac.
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
                s&apos;éparpiller entre cours, annales, vidéos et corrections.
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
                  Version condensée
                </p>
                <h2 className="mt-3 text-3xl font-bold text-slate-950">
                  Le programme sur 4 semaines
                </h2>
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
                  <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    {week.days.map((day) => (
                      <li key={day} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-900" />
                        <span>{day}</span>
                      </li>
                    ))}
                  </ul>
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
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-200 hover:bg-blue-50"
                >
                  <BookOpenCheck className="h-6 w-6 text-blue-800" />
                  <h3 className="mt-3 text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
                </Link>
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
                eventName="click_diagnostic"
                eventParams={{
                  ...leadEventParams,
                  cta_location: "planning_after_diagnostic",
                }}
                className="w-full"
              >
                <Button size="lg" className="w-full">
                  Faire le diagnostic gratuit
                </Button>
              </TrackedLink>
              <TrackedLink
                href="/bac-maths-2027"
                eventName="click_offer"
                eventParams={{
                  ...leadEventParams,
                  offer: "pack_revision_express_bac_2027",
                  price: PACK_REVISION_EXPRESS_PRICE,
                  currency: "EUR",
                  cta_location: "planning_after_offer",
                }}
                className="w-full"
              >
                <Button variant="outline" size="lg" className="w-full">
                  Voir le Pack Révision Express
                </Button>
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
              className="mt-6 inline-flex w-full sm:w-auto"
            >
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                Recevoir le planning gratuit
              </Button>
            </TrackedLink>
          </section>

          <InternalLinks currentPath={pagePath} title="Autres ressources SprintMaths" />
        </div>
      </section>
    </SeoPageLayout>
  );
}
