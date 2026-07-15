import type { Metadata } from "next";
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

const pagePath = "/methodes-maths-terminale/logarithme";

const title = "Méthode logarithme en Terminale";
const description =
  "Méthode simple pour travailler le logarithme en Terminale : domaine de définition, propriétés de ln, équations, dérivée, variations et limites.";

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
  chapter: "logarithme",
  level: "terminale",
  source_page: pagePath,
};

const fiveSteps = [
  "Vérifier que l'expression placée dans le ln est strictement positive.",
  "Identifier les propriétés utiles : produit, quotient, puissance.",
  "Pour résoudre ln(x) = a, passer à x = eᵃ.",
  "Pour dériver, utiliser (ln u)′ = u′/u quand c'est applicable.",
  "Relier dérivée, variations et limites pour conclure.",
];

const lnProperties = [
  {
    title: "Produit",
    text: "ln(ab) = ln(a) + ln(b), pour a > 0 et b > 0.",
  },
  {
    title: "Quotient",
    text: "ln(a/b) = ln(a) − ln(b), pour a > 0 et b > 0.",
  },
  {
    title: "Puissance",
    text: "ln(aⁿ) = n × ln(a), pour a > 0 et n entier.",
  },
];

const frequentMistakes = [
  "Oublier le domaine : l'expression dans le ln doit être strictement positive.",
  "Écrire ln(a + b) = ln(a) + ln(b), ce qui est faux : seul le produit se sépare.",
  "Oublier que ln(x) = a équivaut à x = eᵃ.",
  "Dériver ln(u) comme ln(x) au lieu d'utiliser u′/u.",
  "Ignorer les limites en 0⁺, alors que ln(x) tend vers −∞.",
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/fonction-logarithme",
    label: "Programme Fonction logarithme",
  },
  {
    href: "/exercices-maths-terminale/logarithme",
    label: "Exercices logarithme Terminale",
  },
  { href: "/exercices-type-bac-maths-terminale", label: "Exercices type bac Terminale" },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac corrigés Terminale",
  },
  { href: "/methodes-maths-terminale", label: "Toutes les méthodes Terminale" },
  { href: "/programme-maths-terminale/limites", label: "Chapitre limites Terminale" },
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Chapitre dérivation et convexité",
  },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Pourquoi le domaine de définition est-il important avec ln ?",
    answer:
      "La fonction ln n'est définie que sur ]0 ; +∞[ : tout ce qui est placé dans un logarithme doit être strictement positif. Vérifier le domaine en premier évite de garder des solutions impossibles et oriente toute la résolution.",
  },
  {
    question: "Quelle est la formule de dérivée de ln(u) ?",
    answer:
      "Pour une expression composée, (ln u)′ = u′/u, valable lorsque u est strictement positive et dérivable. Pour la fonction de base, (ln x)′ = 1/x sur ]0 ; +∞[. On ne dérive donc jamais ln(u) comme si c'était ln(x).",
  },
  {
    question: "Comment résoudre ln(x) = a ?",
    answer:
      "On utilise que ln et l'exponentielle sont réciproques : ln(x) = a équivaut à x = eᵃ, avec x > 0. Quand l'équation est du type ln(A) = ln(B), elle équivaut à A = B car ln est strictement croissante, après vérification du domaine.",
  },
  {
    question: "Quelle propriété de ln ne faut-il surtout pas utiliser ?",
    answer:
      "Il ne faut jamais écrire ln(a + b) = ln(a) + ln(b) : c'est faux. Seul le produit se sépare en somme, avec ln(ab) = ln(a) + ln(b). La somme à l'intérieur d'un ln ne se simplifie pas ainsi.",
  },
  {
    question: "Comment gérer une limite avec logarithme ?",
    answer:
      "On retient deux comportements de référence : ln(x) tend vers −∞ quand x tend vers 0 par valeurs positives, et vers +∞ quand x tend vers +∞. Pour lever une forme indéterminée, on pense aux croissances comparées, comme ln(x)/x qui tend vers 0 en +∞.",
  },
  {
    question: "Que faire si je bloque sur un exercice de ln ?",
    answer:
      "Il faut isoler l'étape qui coince : domaine, propriété de ln, équation, dérivée ou limite. Un exercice guidé ou le diagnostic permet de retravailler seulement la brique fragile au lieu de tout reprendre.",
  },
];

export default function MethodeLogarithmeTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Méthode logarithme", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Méthode logarithme Terminale — méthode ln Terminale"
        title="Méthode : comment travailler le logarithme en Terminale"
        description={
          <>
            Devant un exercice avec ln, le but est de suivre une routine fiable :
            vérifier le domaine, utiliser les propriétés, résoudre, dériver, puis
            relier variations et limites. Cette méthode logarithme Terminale te
            donne les bons réflexes étape par étape.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/logarithme",
            label: "Faire des exercices sur le logarithme",
            eventName: "click_method_chapter_exercises",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_exercises",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/programme-maths-terminale/fonction-logarithme",
            label: "Voir le programme Fonction logarithme",
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
                Cette routine évite de se lancer dans les calculs avant d&apos;avoir
                sécurisé le domaine et choisi le bon outil.
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
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 1 : vérifier le domaine de définition
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La fonction ln n&apos;est définie que sur ]0 ; +∞[. Avant tout calcul,
                on écrit la condition d&apos;existence : l&apos;expression placée dans
                le logarithme doit être strictement positive.
              </p>
              <p>
                C&apos;est cette condition qui donne le domaine de définition
                logarithme terminale et qui élimine d&apos;avance certaines valeurs.
                Beaucoup d&apos;erreurs viennent simplement d&apos;un domaine oublié.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 2 : utiliser les propriétés de ln
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Ces propriétés ne valent que pour des nombres strictement positifs.
                Elles servent à transformer une expression avant de résoudre ou de
                dériver.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {lnProperties.map((item) => (
                <article
                  key={item.title}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 3 : résoudre une équation avec ln
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl bg-slate-50 p-5">
                <h3 className="text-xl font-bold text-slate-950">ln(x) = a</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  On passe à l&apos;exponentielle : ln(x) = a équivaut à x = eᵃ, avec
                  x &gt; 0. C&apos;est la traduction directe pour comment résoudre une
                  équation avec ln.
                </p>
              </article>
              <article className="rounded-xl bg-slate-50 p-5">
                <h3 className="text-xl font-bold text-slate-950">ln(A) = ln(B)</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Comme ln est strictement croissante, l&apos;équation équivaut à
                  A = B, avec A &gt; 0 et B &gt; 0. On résout, puis on vérifie que les
                  solutions appartiennent au domaine.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 4 : dériver une expression avec ln
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                La dérivée logarithme terminale de référence est (ln x)′ = 1/x sur
                ]0 ; +∞[. Pour une expression composée ln(u), on utilise
                (ln u)′ = u′/u, valable quand u est strictement positive et dérivable.
              </p>
              <p>
                Le réflexe à garder : on ne dérive jamais ln(u) comme si c&apos;était
                ln(x). Il faut d&apos;abord repérer u, puis appliquer u′/u.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 5 : interpréter limites et variations
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Le signe de la dérivée donne les variations. Comme 1/x est strictement
                positive sur ]0 ; +∞[, la fonction ln est strictement croissante.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">En 0⁺</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Quand x tend vers 0 par valeurs positives, ln(x) tend vers −∞. Une
                    limites logarithme méthode classique à ne pas ignorer.
                  </p>
                </article>
                <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">En +∞</h3>
                  <p className="mt-3 leading-7 text-slate-700">
                    Quand x tend vers +∞, ln(x) tend vers +∞, mais lentement. On
                    utilise les croissances comparées, comme ln(x)/x qui tend vers 0.
                  </p>
                </article>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Cas fréquent : ln d&apos;une expression
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Dès qu&apos;un ln contient autre chose que x, on travaille avec ln(u).
                Le réflexe est toujours le même.
              </p>
            </div>
            <div className="space-y-4">
              <article className="rounded-xl bg-slate-50 p-5 leading-7 text-slate-700">
                <p>
                  On identifie d&apos;abord u, on vérifie que u &gt; 0 pour fixer le
                  domaine, puis on applique les bons outils : propriétés de ln pour
                  transformer, et (ln u)′ = u′/u pour dériver.
                </p>
              </article>
              <article className="rounded-xl border border-red-100 bg-red-50/60 p-5">
                <h3 className="text-lg font-bold text-slate-950">
                  Pièges fréquents à éviter
                </h3>
                <ul className="mt-4 space-y-3">
                  {frequentMistakes.map((mistake) => (
                    <li key={mistake} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-red-600" />
                      <span className="leading-7 text-slate-700">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Exemple guidé
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                La rédaction doit montrer chaque étape : domaine, dérivée, puis
                résolution.
              </p>
            </div>
            <article className="rounded-xl bg-slate-50 p-5">
              <p className="font-bold text-slate-950">
                On considère f(x) = ln(x − 1). Déterminer le domaine, calculer f′(x),
                puis résoudre f(x) = 0.
              </p>
              <div className="mt-4 space-y-3 leading-7 text-slate-700">
                <p>
                  <span className="font-semibold text-slate-950">Domaine :</span> il
                  faut x − 1 &gt; 0, donc x &gt; 1. Le domaine est ]1 ; +∞[.
                </p>
                <p>
                  <span className="font-semibold text-slate-950">Dérivée :</span> avec
                  u = x − 1 et u′ = 1, on a f′(x) = u′/u = 1/(x − 1).
                </p>
                <p>
                  <span className="font-semibold text-slate-950">Équation :</span>{" "}
                  f(x) = 0 donne ln(x − 1) = 0, donc x − 1 = 1, c&apos;est-à-dire
                  x = 2. Cette valeur est bien dans le domaine.
                </p>
              </div>
            </article>
          </section>

          <section>
            <div className="rounded-xl bg-blue-950 p-6 text-white sm:p-8">
              <h2 className="text-3xl font-bold">S&apos;entraîner sur le logarithme</h2>
              <p className="mt-3 max-w-3xl leading-7 text-blue-100">
                Le logarithme se maîtrise en alternant méthode courte et exercices
                corrigés. Commence par des cas simples, puis passe aux exercices type
                bac guidés.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <TrackedLink
                  href="/exercices-maths-terminale/logarithme"
                  eventName="click_method_chapter_exercises"
                  eventParams={{
                    ...methodEventParams,
                    cta_location: "method_training_exercises",
                  }}
                  className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                >
                  Faire des exercices sur le logarithme
                </TrackedLink>
                <TrackedLink
                  href="/exercices-type-bac-maths-terminale"
                  eventName="click_method_chapter_typebac"
                  eventParams={{
                    ...methodEventParams,
                    cta_location: "method_training_typebac",
                  }}
                  className="rounded-xl border border-blue-200 bg-blue-900 p-5 font-semibold text-white shadow-sm hover:bg-blue-800"
                >
                  Essayer un exercice type bac guidé
                </TrackedLink>
                <TrackedLink
                  href="/sujets-type-bac-maths-terminale#sujet-guide-complet"
                  eventName="click_method_chapter_subjects"
                  eventParams={{
                    ...methodEventParams,
                    intent: "sujet_type_bac_corrige",
                    destination_page:
                      "/sujets-type-bac-maths-terminale#sujet-guide-complet",
                    cta_location: "method_training_subject_corrige",
                  }}
                  className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
                >
                  S&apos;entraîner avec un sujet type bac corrigé
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
