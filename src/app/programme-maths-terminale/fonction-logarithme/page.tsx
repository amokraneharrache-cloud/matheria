import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  LineChart,
  ListChecks,
  PlayCircle,
  Sigma,
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

const pagePath = "/programme-maths-terminale/fonction-logarithme";

const title =
  "Fonction logarithme en Terminale : programme, méthodes et exercices";
const description =
  "Résumé du chapitre Fonction logarithme en Terminale spécialité maths : définition de ln, propriétés, dérivée, variations, équations, limites et exercices corrigés.";

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

const chapterEventParams = {
  chapter: "logarithme",
  level: "terminale",
  source_page: pagePath,
};

const notionChecklist = [
  "vérifier le domaine de définition",
  "utiliser les propriétés de ln",
  "résoudre ln(x) = a",
  "transformer une équation logarithmique",
  "dériver une expression contenant ln",
  "étudier une variation avec ln",
  "calculer une limite simple",
  "éviter les erreurs de domaine",
];

const equationSteps = [
  "Déterminer le domaine de définition : tout ce qui est dans un ln doit être strictement positif.",
  "Utiliser les propriétés de ln pour regrouper les logarithmes d'un seul côté.",
  "Se ramener à une forme du type ln(A) = ln(B) ou ln(A) = a.",
  "Résoudre en utilisant que ln est strictement croissante (donc ln(A) = ln(B) équivaut à A = B).",
  "Vérifier que les solutions trouvées appartiennent bien au domaine de départ.",
];

const revisionSteps = [
  "Revoir le domaine de définition avant tout calcul avec ln.",
  "Refaire quelques transformations avec les propriétés de ln pour sécuriser les automatismes.",
  "Travailler les équations ln(x) = a puis les inéquations en gardant l'œil sur le domaine.",
  "Dériver des expressions contenant ln, puis étudier le signe pour conclure sur les variations.",
  "Comparer la correction avec ton raisonnement, pas seulement avec le résultat final.",
];

const recommendedExercises = [
  {
    title: "Manipuler les propriétés de ln",
    text: "Un exercice court pour transformer des expressions avec ln(ab), ln(a/b) et ln(aⁿ) sans erreur de domaine.",
  },
  {
    title: "Résoudre une équation avec ln",
    text: "Un entraînement central pour se ramener à ln(A) = ln(B), résoudre, puis vérifier le domaine.",
  },
  {
    title: "Dériver et étudier une fonction avec ln",
    text: "Un format type bac pour dériver une expression contenant ln et conclure sur les variations.",
  },
];

const internalLinks = [
  { href: "/programme-maths-terminale", label: "Programme maths Terminale" },
  {
    href: "/exercices-maths-terminale/logarithme",
    label: "Exercices logarithme Terminale",
  },
  {
    href: "/methodes-maths-terminale/logarithme",
    label: "Méthode logarithme Terminale",
  },
  { href: "/programme-maths-terminale/limites", label: "Chapitre limites Terminale" },
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Chapitre dérivation et convexité",
  },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  { href: "/bac-maths-2027", label: "Offre Bac Maths 2027" },
  { href: "/planning-revision-bac-maths", label: "Planning Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Le logarithme tombe-t-il souvent au Bac ?",
    answer:
      "La fonction logarithme est un chapitre d'analyse important en Terminale, souvent relié aux limites, à la dérivation et aux études de variations. On ne peut toutefois jamais garantir qu'un chapitre précis tombera le jour du Bac.",
  },
  {
    question: "Quel est le domaine de définition de ln ?",
    answer:
      "La fonction ln est définie sur ]0 ; +∞[. Tout ce qui se trouve à l'intérieur d'un logarithme doit donc être strictement positif : c'est la première vérification à faire dans presque tous les exercices.",
  },
  {
    question: "Comment résoudre une équation avec ln ?",
    answer:
      "On commence par déterminer le domaine, puis on utilise les propriétés de ln pour se ramener à ln(A) = ln(B) ou ln(A) = a. Comme ln est strictement croissante, ln(A) = ln(B) équivaut à A = B. Il faut enfin vérifier que les solutions appartiennent au domaine.",
  },
  {
    question: "Quelle est la dérivée de ln ?",
    answer:
      "La dérivée de ln(x) est 1/x sur ]0 ; +∞[. Pour une expression composée ln(u), la dérivée est u'/u, ce qui est très utile dans les études de fonctions.",
  },
  {
    question: "Quelles limites connaître avec ln ?",
    answer:
      "Les limites classiques sont : ln(x) tend vers −∞ quand x tend vers 0 par valeurs positives, et ln(x) tend vers +∞ quand x tend vers +∞. On utilise aussi les croissances comparées, par exemple ln(x)/x qui tend vers 0 en +∞.",
  },
  {
    question: "Que faire si je bloque sur un exercice de logarithme ?",
    answer:
      "Il faut isoler l'étape qui bloque : domaine de définition, propriété de ln, équation, dérivée ou limite. Un diagnostic ou un exercice guidé permet de reprendre seulement la brique fragile au lieu de tout recommencer.",
  },
];

export default function FonctionLogarithmeTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Terminale", path: "/programme-maths-terminale" },
            { name: "Fonction logarithme en Terminale", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Programme logarithme Terminale — fonction ln Terminale"
        title="Fonction logarithme en Terminale : ce qu'il faut savoir pour le Bac"
        description={
          <>
            Ce guide résume le chapitre fonction logarithme Terminale : définition
            et domaine de ln, propriétés de calcul, dérivée, variations, équations
            et limites avec logarithme.
          </>
        }
        secondaryDescription={
          <>
            L&apos;objectif n&apos;est pas de refaire un cours interminable. Il
            s&apos;agit de comprendre les méthodes qui reviennent avec ln et de
            savoir quoi travailler en exercices guidés.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/logarithme",
            label: "Faire des exercices sur le logarithme",
            eventName: "click_chapter_exercise_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_primary",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/methodes-maths-terminale/logarithme",
            label: "Voir la méthode logarithme",
            eventName: "click_chapter_method_cta",
            eventParams: {
              ...chapterEventParams,
              cta_location: "chapter_hero_secondary",
            },
            icon: <BookOpenCheck className="h-5 w-5" />,
            variant: "secondary",
          },
        ]}
        media={
          <div className="mx-auto w-full max-w-[260px] lg:max-w-[300px]">
            <Image
              src="/images/screenshots/sprintmaths-guided-exercise.png"
              alt="Aperçu SprintMaths d'un exercice guidé étape par étape."
              width={390}
              height={844}
              priority
              className="aspect-[390/844] w-full rounded-[28px] border border-slate-200 object-cover object-top shadow-xl"
            />
          </div>
        }
      />

      <section className="border-y border-slate-200 bg-slate-950 px-4 py-5 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm font-semibold sm:flex-row sm:items-center sm:justify-between">
          <span>Besoin d&apos;un plan avant les exercices ?</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <TrackedLink
              href="/planning-revision-bac-maths"
              eventName="click_chapter_planning_cta"
              eventParams={{
                ...chapterEventParams,
                lead_magnet: "planning_bac_maths_2027",
                cta_location: "chapter_top_band_planning",
              }}
              className="inline-flex items-center gap-2 text-blue-100 hover:text-white"
            >
              Recevoir le planning Bac Maths 2027
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
            <TrackedLink
              href="/diagnostic"
              eventName="click_chapter_diagnostic_cta"
              eventParams={{
                ...chapterEventParams,
                cta_location: "chapter_top_band_diagnostic",
              }}
              className="inline-flex items-center gap-2 text-emerald-200 hover:text-white"
            >
              Faire le diagnostic gratuit
              <ArrowRight className="h-4 w-4" />
            </TrackedLink>
          </div>
        </div>
      </section>

      <div className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Pourquoi le logarithme est important au Bac
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La fonction logarithme Terminale spécialité maths revient
                régulièrement dans les exercices d&apos;analyse : elle est reliée aux
                limites, à la dérivation et aux études de variations. Beaucoup de
                sujets combinent ln avec une étude de fonction ou un calcul de
                limite.
              </p>
              <p>
                Cela ne veut pas dire qu&apos;on peut prédire le sujet. Aucun
                chapitre ne peut être garanti au Bac. En revanche, maîtriser le
                programme logarithme Terminale donne une base solide pour aborder de
                nombreux exercices d&apos;analyse.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Les notions à maîtriser
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Cette checklist permet de réviser ln terminale sans se disperser
                avant de passer aux exercices corrigés.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {notionChecklist.map((item) => (
                <div
                  key={item}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="leading-7 text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Définition et domaine de ln
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La fonction logarithme népérien, notée ln, est définie sur
                l&apos;intervalle ]0 ; +∞[. Autrement dit, on ne peut calculer ln(x)
                que pour x strictement positif : c&apos;est la première chose à
                vérifier dans un exercice.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-xl bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">
                    Deux valeurs à connaître
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    ln(1) = 0 et ln(e) = 1. Ces deux repères servent très souvent
                    dans les équations et les calculs de limites.
                  </p>
                </article>
                <article className="rounded-xl bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">
                    Attention au domaine
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Tout ce qui se trouve à l&apos;intérieur d&apos;un ln doit être
                    strictement positif. La plupart des erreurs de l&apos;élève
                    viennent d&apos;un domaine oublié.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Propriétés de calcul du logarithme
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Ces propriétés sont valables pour des nombres strictement positifs.
                Elles permettent de transformer une expression avant de résoudre ou
                de dériver.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">Produit</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  ln(ab) = ln(a) + ln(b), pour a &gt; 0 et b &gt; 0.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">Quotient</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  ln(a/b) = ln(a) − ln(b), pour a &gt; 0 et b &gt; 0.
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-bold text-slate-950">Puissance</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  ln(aⁿ) = n × ln(a), pour a &gt; 0 et n entier.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Dérivée et variations de ln
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La dérivée ln terminale est un grand classique : la dérivée de ln(x)
                est 1/x sur ]0 ; +∞[. Pour une expression composée ln(u), la dérivée
                est u&apos;/u, ce qui revient souvent dans les études de fonctions.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">
                    Une fonction croissante
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Comme 1/x est strictement positive sur ]0 ; +∞[, la fonction ln
                    est strictement croissante sur cet intervalle.
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">
                    Utiliser la croissance
                  </h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    La stricte croissance de ln sert à comparer deux logarithmes et à
                    résoudre les équations et inéquations sans changer le sens.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ListChecks className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Équations et inéquations avec ln
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Résoudre une équation logarithme terminale suit presque toujours le
                même enchaînement d&apos;étapes.
              </p>
            </div>
            <ol className="space-y-3">
              {equationSteps.map((step, index) => (
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
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Limites avec logarithme
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Les limites logarithme terminale à connaître concernent surtout les
                bords du domaine. On retient deux comportements de référence.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-xl bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">En 0⁺</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Quand x tend vers 0 par valeurs positives, ln(x) tend vers −∞. La
                    courbe descend très bas près de 0.
                  </p>
                </article>
                <article className="rounded-xl bg-slate-50 p-5">
                  <h3 className="text-xl font-bold text-slate-950">En +∞</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Quand x tend vers +∞, ln(x) tend vers +∞, mais lentement. Les
                    croissances comparées (comme ln(x)/x qui tend vers 0) servent à
                    lever certaines formes indéterminées.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Comment réviser la fonction logarithme
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Le plus efficace est d&apos;alterner méthode, exercices courts et
                correction active.
              </p>
            </div>
            <ol className="space-y-3">
              {revisionSteps.map((step, index) => (
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

          <section>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-bold text-slate-950">
                  Exercices recommandés
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  Commence par les propriétés de ln, puis passe aux équations et à la
                  dérivation. Le but est d&apos;apprendre à enchaîner les étapes en
                  gardant l&apos;œil sur le domaine.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/logarithme"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_exercises_section",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices sur le logarithme
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {recommendedExercises.map((exercise) => (
                <article
                  key={exercise.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-950">{exercise.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {exercise.text}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-blue-950 p-6 text-white sm:p-8">
            <h3 className="text-3xl font-bold">Passer du chapitre au plan Bac 2027</h3>
            <p className="mt-4 max-w-3xl leading-7 text-blue-100">
              Si la fonction logarithme bloque, commence par un exercice guidé, puis
              utilise la méthode logarithme. Le diagnostic et le planning aident à
              transformer le blocage en plan de travail.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <TrackedLink
                href="/methodes-maths-terminale/logarithme"
                eventName="click_chapter_method_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_method",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Voir la méthode logarithme
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                eventName="click_chapter_planning_cta"
                eventParams={{
                  ...chapterEventParams,
                  lead_magnet: "planning_bac_maths_2027",
                  cta_location: "chapter_final_planning",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Recevoir le planning Bac Maths 2027
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_chapter_diagnostic_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_diagnostic",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Faire le diagnostic gratuit
              </TrackedLink>
              <TrackedLink
                href="/exercices-type-bac-maths-terminale"
                eventName="click_chapter_exercise_cta"
                eventParams={{
                  ...chapterEventParams,
                  cta_location: "chapter_final_typebac",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-blue-200 px-5 py-3 text-center font-bold text-white hover:bg-blue-900 sm:w-auto"
              >
                Essayer un exercice type bac
              </TrackedLink>
              <Link
                href="/bac-maths-2027#offre"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-center font-bold text-white hover:bg-emerald-400 sm:w-auto"
              >
                Voir l&apos;offre Bac 2027
              </Link>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster fonction logarithme"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
