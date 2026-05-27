import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  LineChart,
  ListChecks,
  PenTool,
  PlayCircle,
  Target,
} from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/methodes-maths-terminale/etudier-une-suite";

const title = "Méthode pour étudier une suite en Terminale";
const description =
  "Méthode simple pour étudier une suite en Terminale : reconnaître le type de suite, calculer les termes, démontrer par récurrence, étudier les variations et la limite.";

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

const methodEventParams = {
  chapter: "suites",
  level: "terminale",
  source_page: pagePath,
};

const fiveSteps = [
  "Regarder si la suite est donnée par formule explicite ou par récurrence.",
  "Calculer u0, u1 et u2 pour repérer le comportement.",
  "Chercher si la suite est arithmétique ou géométrique.",
  "Étudier u(n+1) - u(n), ou le quotient si les termes sont positifs.",
  "Chercher une limite avec les résultats du cours et une intuition encadrée.",
];

const faqItems: FaqItem[] = [
  {
    question: "Comment savoir si une suite est arithmétique ?",
    answer:
      "On calcule u(n+1) - u(n). Si cette différence est constante, la suite est arithmétique et cette constante est sa raison.",
  },
  {
    question: "Comment savoir si une suite est géométrique ?",
    answer:
      "On regarde si chaque terme s'obtient en multipliant le précédent par le même nombre. Quand les termes ne sont pas nuls, on peut étudier le quotient u(n+1) / u(n).",
  },
  {
    question: "Quelle méthode pour une récurrence ?",
    answer:
      "La rédaction suit trois moments : initialisation, hérédité, conclusion. Beaucoup d'élèves font les calculs mais oublient de conclure que la propriété est vraie pour tous les rangs concernés.",
  },
  {
    question: "Comment étudier les variations d’une suite ?",
    answer:
      "Le réflexe le plus fréquent est d'étudier le signe de u(n+1) - u(n). Si ce signe est positif, la suite est croissante ; s'il est négatif, elle est décroissante.",
  },
  {
    question: "Comment trouver la limite d’une suite ?",
    answer:
      "On identifie d'abord la forme de la suite : arithmétique, géométrique, quotient, somme ou expression avec n. Ensuite, on applique les limites de référence du cours et on rédige la conclusion.",
  },
  {
    question: "Que faire si je ne sais pas démarrer ?",
    answer:
      "Commence par calculer les premiers termes et par réécrire la définition avec n puis n+1. Si le blocage reste flou, fais un exercice guidé ou un diagnostic pour savoir quelle étape retravailler.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale/suites", label: "Programme du chapitre Suites" },
  { href: "/exercices-maths-terminale/suites", label: "Exercices suites Terminale" },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/methodes-maths-terminale", label: "Toutes les méthodes Terminale" },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

export default function MethodeEtudierUneSuitePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Étudier une suite", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Méthode suites Terminale"
        title="Méthode : comment étudier une suite en Terminale"
        description={
          <>
            Devant une suite, le but n&apos;est pas de deviner la réponse. Il faut
            suivre une routine courte : lire la définition, calculer quelques termes,
            reconnaître le type de suite, justifier les variations, puis chercher la
            limite.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/suites",
            label: "Faire des exercices sur les suites",
            eventName: "click_method_chapter_exercises",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_exercises",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/programme-maths-terminale/suites",
            label: "Voir le programme du chapitre Suites",
            eventName: "click_method_chapter_program",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_program",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin d&apos;un repère avant de t&apos;entraîner ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/diagnostic"
              eventName="click_method_chapter_diagnostic"
              eventParams={{
                ...methodEventParams,
                cta_location: "method_top_band_diagnostic",
              }}
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white"
            >
              Faire le diagnostic gratuit
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_method_chapter_planning"
              eventParams={{
                ...methodEventParams,
                lead_magnet: "planning_bac_maths_2027",
                cta_location: "method_top_band_planning",
              }}
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Recevoir le planning Bac Maths 2027
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                La méthode en 5 étapes
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Garde cette suite d&apos;actions en tête. Elle ne remplace pas le cours,
                mais elle évite de partir dans tous les sens dès la première ligne.
              </p>
            </div>
            <ol className="space-y-3">
              {fiveSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="pt-1 leading-7 text-slate-700">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 1 : identifier comment la suite est définie
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Une suite peut être donnée par une formule explicite, par exemple{" "}
                <span className="font-mono text-slate-950">u(n) = 2n + 1</span>,
                ou par une relation de récurrence, par exemple{" "}
                <span className="font-mono text-slate-950">u(n+1) = u(n) + 3</span>.
              </p>
              <p>
                Si la formule donne directement <span className="font-mono">u(n)</span>,
                tu peux calculer un terme en remplaçant n. Si elle donne{" "}
                <span className="font-mono">u(n+1)</span>, tu dois partir du terme
                initial et avancer rang par rang.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 2 : calculer les premiers termes
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Calcule <span className="font-mono">u0</span>,{" "}
                <span className="font-mono">u1</span> et{" "}
                <span className="font-mono">u2</span>. Ces trois termes ne prouvent pas
                tout, mais ils donnent une intuition : la suite monte, descend, se
                rapproche d&apos;un nombre ou grandit vite.
              </p>
              <p>
                Attention : une intuition n&apos;est pas une démonstration. Elle sert à
                choisir la bonne méthode, puis il faut justifier avec un calcul ou une
                récurrence.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 3 : reconnaître une suite arithmétique ou géométrique
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-slate-950">
                  Suite arithmétique
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  On ajoute toujours le même nombre. Le test utile est{" "}
                  <span className="font-mono text-slate-950">u(n+1) - u(n)</span>.
                  Si la différence est constante, c&apos;est la raison.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-xl font-bold text-slate-950">
                  Suite géométrique
                </h3>
                <p className="mt-3 leading-7 text-slate-700">
                  On multiplie toujours par le même nombre. Si les termes sont non
                  nuls, le quotient{" "}
                  <span className="font-mono text-slate-950">u(n+1) / u(n)</span>
                  permet de repérer la raison.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 4 : étudier le sens de variation
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Le réflexe principal est de calculer{" "}
                <span className="font-mono text-slate-950">u(n+1) - u(n)</span>.
                Si cette différence est positive pour tout n, la suite est croissante.
                Si elle est négative pour tout n, la suite est décroissante.
              </p>
              <p>
                Quand tous les termes sont strictement positifs, un quotient peut être
                plus rapide : comparer{" "}
                <span className="font-mono text-slate-950">u(n+1) / u(n)</span> à 1
                revient à comparer deux termes consécutifs.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <CheckCircle2 className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 5 : chercher une limite
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Une limite se cherche rarement au hasard. Demande-toi d&apos;abord si
                tu as une suite arithmétique, une suite géométrique, une expression
                avec une puissance, un quotient ou une forme du type{" "}
                <span className="font-mono text-slate-950">a + b/n</span>.
              </p>
              <p>
                Puis utilise les résultats du cours. Une intuition peut aider, mais la
                copie doit finir par une phrase claire : “donc la suite converge vers
                ...” ou “donc la suite diverge vers +∞”.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <PenTool className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Cas fréquent : démontrer une propriété par récurrence
              </h2>
            </div>
            <div className="space-y-5 leading-7 text-slate-700">
              <p className="text-lg leading-8">
                La récurrence sert à prouver qu&apos;une propriété est vraie pour tous
                les entiers naturels à partir d&apos;un rang donné. La structure est
                toujours la même.
              </p>
              <ol className="grid gap-3 md:grid-cols-3">
                {[
                  {
                    title: "Initialisation",
                    text: "On vérifie la propriété au premier rang demandé.",
                  },
                  {
                    title: "Hérédité",
                    text: "On suppose la propriété vraie au rang n, puis on montre le rang n+1.",
                  },
                  {
                    title: "Conclusion",
                    text: "On écrit que la propriété est vraie pour tous les rangs concernés.",
                  },
                ].map((step, index) => (
                  <li
                    key={step.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-900 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-2">{step.text}</p>
                  </li>
                ))}
              </ol>
              <p className="rounded-xl bg-red-50 p-4 font-semibold text-red-950">
                Point de vigilance : beaucoup d&apos;élèves font l&apos;initialisation et
                l&apos;hérédité, puis oublient la conclusion. Sans conclusion, la
                récurrence n&apos;est pas terminée.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Exemple guidé
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                On choisit un exemple simple pour avoir une preuve courte et juste.
              </p>
            </div>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-bold text-slate-950">
                On considère la suite définie par{" "}
                <span className="font-mono">u0 = 1</span> et{" "}
                <span className="font-mono">u(n+1) = u(n) + 3</span>.
              </p>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <h3 className="font-bold text-slate-950">Premiers termes</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    <span className="font-mono">u1 = 1 + 3 = 4</span>, puis{" "}
                    <span className="font-mono">u2 = 4 + 3 = 7</span>. La suite
                    semble croissante.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Nature de la suite</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    À chaque rang, on ajoute 3. La suite est donc arithmétique de
                    raison 3.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Formule explicite</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    Comme elle commence à <span className="font-mono">u0 = 1</span>,
                    on obtient{" "}
                    <span className="font-mono text-slate-950">u(n) = 1 + 3n</span>.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-950">Variation et limite</h3>
                  <p className="mt-2 leading-7 text-slate-700">
                    <span className="font-mono">u(n+1) - u(n) = 3</span>, donc la
                    suite est strictement croissante. Comme{" "}
                    <span className="font-mono">1 + 3n</span> tend vers +∞, la suite
                    diverge vers +∞.
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-xl bg-emerald-50 p-5">
                <h3 className="font-bold text-emerald-950">
                  Comment utiliser une récurrence ici ?
                </h3>
                <p className="mt-2 leading-7 text-emerald-950">
                  Pour démontrer la formule <span className="font-mono">u(n) = 1 + 3n</span>,
                  on vérifie d&apos;abord le rang 0. Puis on suppose{" "}
                  <span className="font-mono">u(n) = 1 + 3n</span> et on calcule{" "}
                  <span className="font-mono">u(n+1) = u(n) + 3 = 1 + 3n + 3</span>,
                  donc <span className="font-mono">u(n+1) = 1 + 3(n+1)</span>. On
                  conclut alors que la formule est vraie pour tout entier naturel n.
                </p>
              </div>
            </article>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CalendarDays className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-3xl font-bold text-slate-950">
                  S’entraîner sur les suites
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  La méthode devient utile quand tu l&apos;appliques sur plusieurs
                  énoncés : un exercice court, puis un format type bac, puis un plan
                  de révision si le chapitre reste fragile.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/suites"
                eventName="click_method_chapter_exercises"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_primary",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices sur les suites
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <TrackedLink
                href="/programme-maths-terminale/suites"
                eventName="click_method_chapter_program"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_program",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Voir le programme du chapitre Suites
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_method_chapter_typebac"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_typebac",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Essayer un exercice type bac guidé
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_method_chapter_planning"
                eventParams={{
                  ...methodEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "method_training_planning",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Recevoir le planning Bac Maths 2027
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_method_chapter_diagnostic"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_diagnostic",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Faire le diagnostic gratuit
              </TrackedLink>
            </div>

            <div className="mt-6 rounded-xl bg-blue-950 p-6 text-white sm:p-8">
              <h3 className="text-2xl font-bold">
                Aller plus loin avec SprintMaths
              </h3>
              <p className="mt-3 max-w-3xl leading-7 text-blue-100">
                Si tu veux travailler les suites dans un parcours plus cadré, le Pack
                Bac Maths 2027 relie exercices guidés, planning et progression.
              </p>
              <TrackedLink
                href="/bac-maths-2027#offre"
                eventName="click_offer"
                eventParams={{
                  ...methodEventParams,
                  offer: "pack_revision_express_bac_2027",
                  cta_location: "method_offer_block",
                }}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir l&apos;offre Bac Maths 2027
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster suites"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
