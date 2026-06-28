import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  CalendarDays,
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

const pagePath = "/methodes-maths-terminale/integrales";

const title = "Méthode intégrales en Terminale";
const description =
  "Méthode simple pour réussir les intégrales en Terminale : reconnaître une primitive, calculer F(b)-F(a), interpréter une aire et éviter les erreurs classiques.";

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
  chapter: "integrales",
  level: "terminale",
  source_page: pagePath,
};

const fiveSteps = [
  "Identifier la fonction f et les bornes a et b.",
  "Trouver une primitive F de f.",
  "Calculer F(b)-F(a).",
  "Interpréter le résultat selon le contexte.",
  "Vérifier signe, cohérence et conclusion.",
];

const frequentMistakes = [
  "Oublier les bornes.",
  "Inverser F(a) et F(b).",
  "Confondre dérivée et primitive.",
  "Oublier que la constante est inutile dans le calcul défini.",
  "Interpréter une aire alors que la fonction n'est pas positive.",
];

const primitiveChecks = [
  {
    title: "Polynôme",
    text: "On augmente l'exposant de 1 et on divise par le nouvel exposant : une primitive de x² est x³/3.",
  },
  {
    title: "Exponentielle",
    text: "La fonction eˣ est sa propre primitive. Pour eᵘ, on vérifie si un facteur u′ apparaît.",
  },
  {
    title: "Vérification",
    text: "Après avoir choisi F, on dérive F mentalement : si F′ = f, la primitive est cohérente.",
  },
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/integrales",
    label: "Programme Intégrales Terminale",
  },
  {
    href: "/exercices-maths-terminale/integrales",
    label: "Exercices Intégrales Terminale",
  },
  {
    href: "/methodes-maths-terminale",
    label: "Toutes les méthodes Terminale",
  },
  {
    href: "/programme-maths-terminale/derivation-convexite",
    label: "Programme Dérivation et convexité",
  },
  {
    href: "/programme-maths-terminale/fonction-logarithme",
    label: "Programme Fonction logarithme",
  },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac maths Terminale",
  },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
];

const faqItems: FaqItem[] = [
  {
    question: "Comment commencer un exercice d’intégrale ?",
    answer:
      "Commence par identifier la fonction f, les bornes a et b, puis la question posée : calcul exact, aire, moyenne ou interprétation dans un contexte. Cette lecture évite de chercher une primitive avant de savoir ce que l'intégrale représente.",
  },
  {
    question: "Comment trouver une primitive ?",
    answer:
      "On reconnaît la forme de f à partir des primitives usuelles, puis on ajuste les coefficients. Le meilleur contrôle est de dériver la fonction proposée : si F′(x) = f(x), alors F est bien une primitive de f.",
  },
  {
    question: "Pourquoi calcule-t-on F(b)-F(a) ?",
    answer:
      "Si F est une primitive de f sur l'intervalle étudié, le théorème fondamental donne ∫ de a à b f(x) dx = F(b)-F(a). On évalue donc la primitive à la borne du haut, puis on retire la valeur à la borne du bas.",
  },
  {
    question: "Quelle différence entre aire et intégrale ?",
    answer:
      "Une intégrale est un calcul algébrique qui peut être positif, nul ou négatif. Elle représente directement une aire seulement lorsque la fonction est positive sur l'intervalle. Sinon, il faut raisonner avec des aires signées ou découper l'intervalle.",
  },
  {
    question: "Que faire si la fonction change de signe ?",
    answer:
      "Il faut repérer les points où f s'annule, découper l'intervalle, puis traiter séparément les zones positives et négatives. Pour une aire géométrique, on additionne les valeurs absolues des intégrales sur chaque morceau.",
  },
  {
    question: "Comment éviter les erreurs avec les bornes ?",
    answer:
      "Écris systématiquement [F(x)] de a à b, puis F(b)-F(a) sur la ligne suivante. Garde les parenthèses autour de F(a), surtout quand cette valeur est négative ou contient plusieurs termes.",
  },
];

export default function MethodeIntegralesTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Méthode intégrales", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Méthode intégrales Terminale — primitive et aire sous la courbe"
        title="Méthode : intégrales en Terminale"
        description={
          <>
            Pour réussir les intégrales au bac, l&apos;objectif est de suivre une
            routine stable : lire les bornes, reconnaître une primitive, calculer
            F(b)-F(a), puis interpréter le résultat sans confondre intégrale et aire.
          </>
        }
        secondaryDescription={
          <>
            Cette fiche explique comment calculer une intégrale en Terminale, quand
            parler d&apos;aire sous la courbe, et quels pièges surveiller dans la
            rédaction.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/integrales",
            label: "Faire des exercices sur les intégrales",
            eventName: "click_method_chapter_exercises",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_exercises",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/programme-maths-terminale/integrales",
            label: "Voir le programme Intégrales",
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
                Cette méthode intégrales Terminale sert à garder le même ordre de
                travail dans un calcul pur, une question d&apos;aire ou un exercice
                contextualisé.
              </p>
            </div>
            <div className="space-y-5">
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

              <aside className="rounded-xl bg-red-50 p-5">
                <h3 className="flex items-center gap-2 font-bold text-red-950">
                  <AlertTriangle className="h-5 w-5" />
                  Pièges fréquents
                </h3>
                <ul className="mt-3 grid gap-2 text-red-950 sm:grid-cols-2">
                  {frequentMistakes.map((mistake) => (
                    <li key={mistake} className="flex gap-2">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 1 : identifier la fonction et les bornes
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Dans une intégrale de la forme{" "}
                <span className="font-mono text-slate-950">∫_a^b f(x) dx</span>,
                commence par entourer la fonction f, la borne de départ a et la
                borne d&apos;arrivée b. Les bornes indiquent l&apos;intervalle sur lequel
                le calcul se fait.
              </p>
              <p>
                Si l&apos;énoncé demande une aire sous la courbe, vérifie aussi le
                signe de f sur cet intervalle. Si l&apos;énoncé demande une
                interprétation concrète, note l&apos;unité de f avant de calculer.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 2 : trouver une primitive
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Primitive et intégrale méthode : le réflexe est de chercher F telle
                que F′ = f, puis de vérifier rapidement en dérivant.
              </p>
            </div>
            <div>
              <div className="grid gap-4 md:grid-cols-3">
                {primitiveChecks.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <h3 className="text-lg font-bold text-slate-950">
                      {item.title}
                    </h3>
                    <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
                  </article>
                ))}
              </div>
              <p className="mt-5 text-lg leading-8 text-slate-700">
                Pour une intégrale définie, la constante d&apos;intégration n&apos;est
                pas utile : si on remplace F par F + C, le C disparaît dans
                F(b)-F(a).
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 3 : calculer F(b)-F(a)
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p>
                Une fois la primitive F trouvée, écris la ligne de calcul dans cet
                ordre :{" "}
                <span className="font-mono text-slate-950">
                  ∫_a^b f(x) dx = F(b)-F(a)
                </span>
                . La borne du haut vient toujours en premier.
              </p>
              <div className="rounded-xl bg-blue-50 p-5">
                <p className="font-bold text-blue-950">Réflexe anti-erreur</p>
                <p className="mt-2 leading-7 text-blue-950">
                  Quand F(a) contient plusieurs termes, garde les parenthèses :
                  F(b) - (F(a)). C&apos;est souvent là que le signe se perd.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <LineChart className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 4 : interpréter le résultat
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Un résultat d&apos;intégrale peut être une aire, une quantité cumulée,
                une distance, une variation ou une valeur sans unité selon le
                contexte. La conclusion doit donc reprendre les mots de l&apos;énoncé.
              </p>
              <p>
                Pour réussir les intégrales au bac, ne t&apos;arrête pas au nombre :
                précise ce qu&apos;il signifie, surtout dans les exercices avec
                vitesse, densité, coût ou aire.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <CheckCircle2 className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 5 : vérifier le signe et les unités
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">Signe</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Si f est positive sur [a ; b], l&apos;intégrale doit être positive.
                  Si tu obtiens un signe surprenant, vérifie l&apos;ordre des bornes et
                  le calcul de F(a).
                </p>
              </article>
              <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-xl font-bold text-slate-950">Unités</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  L&apos;unité d&apos;une intégrale combine souvent celle de f avec celle
                  de x. Par exemple, intégrer une vitesse en km/h sur une durée en h
                  donne une distance en km.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Cas fréquent : aire sous la courbe
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Aire sous la courbe intégrale méthode : l&apos;interprétation dépend
                du signe de la fonction.
              </p>
            </div>
            <div className="space-y-4">
              <article className="rounded-xl bg-emerald-50 p-5">
                <h3 className="text-xl font-bold text-emerald-950">
                  Si f est positive
                </h3>
                <p className="mt-3 leading-7 text-emerald-950">
                  L&apos;intégrale ∫_a^b f(x) dx représente l&apos;aire comprise entre la
                  courbe, l&apos;axe des abscisses et les droites x = a et x = b.
                </p>
              </article>
              <article className="rounded-xl border border-red-100 bg-red-50/70 p-5">
                <h3 className="text-xl font-bold text-red-950">
                  Si f est négative ou change de signe
                </h3>
                <p className="mt-3 leading-7 text-red-950">
                  L&apos;intégrale donne une aire signée. Pour une aire géométrique,
                  il faut découper aux changements de signe et additionner les
                  surfaces positives.
                </p>
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
                On applique la méthode sur un calcul court avec primitive directe.
              </p>
            </div>
            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-lg font-bold leading-8 text-slate-950">
                Calculer{" "}
                <span className="font-mono">∫_1^3 (2x+1) dx</span>.
              </p>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-5">
                  <h3 className="font-bold text-slate-950">Méthode</h3>
                  <div className="mt-3 space-y-2 leading-7 text-slate-700">
                    <p>La fonction est f(x) = 2x + 1.</p>
                    <p>Les bornes sont a = 1 et b = 3.</p>
                    <p>Une primitive de f est F(x) = x² + x.</p>
                  </div>
                </div>
                <div className="rounded-xl bg-emerald-50 p-5">
                  <h3 className="font-bold text-emerald-950">Calcul</h3>
                  <div className="mt-3 space-y-2 leading-7 text-emerald-950">
                    <p>F(3) = 3² + 3 = 12.</p>
                    <p>F(1) = 1² + 1 = 2.</p>
                    <p className="font-bold">F(3)-F(1)=12-2=10.</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 leading-7 text-slate-700">
                La valeur de l&apos;intégrale est donc 10. Comme 2x + 1 est positive
                sur [1 ; 3], ce nombre correspond aussi à l&apos;aire sous la courbe
                sur cet intervalle.
              </p>
            </article>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <CalendarDays className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-3xl font-bold text-slate-950">
                  S’entraîner sur les intégrales
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  La méthode devient automatique en alternant calculs directs,
                  questions d&apos;aire et sujets type bac.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/integrales"
                eventName="click_method_chapter_exercises"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_primary",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices sur les intégrales
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <TrackedLink
                href="/programme-maths-terminale/integrales"
                eventName="click_method_chapter_program"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_program",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Voir le programme Intégrales
              </TrackedLink>
              <TrackedLink
                href="/sujets-type-bac-maths-terminale"
                eventName="click_method_chapter_subjects"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_subjects",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Voir les sujets type bac
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
                Essayer un exercice type bac
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
                Recevoir le planning Bac Maths
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
              <TrackedLink
                href="/bac-maths-2027#offre"
                eventName="click_offer"
                eventParams={{
                  ...methodEventParams,
                  offer: "bac_maths_2027",
                  cta_location: "method_training_offer",
                }}
                className="rounded-xl border border-blue-900 bg-blue-950 p-5 font-semibold text-white shadow-sm hover:bg-blue-900"
              >
                Voir l&apos;offre Bac Maths 2027
              </TrackedLink>
            </div>

            <div className="mt-6 rounded-xl bg-blue-950 p-6 text-white sm:p-8">
              <h3 className="text-2xl font-bold">
                Reprendre les intégrales dans un vrai parcours
              </h3>
              <p className="mt-3 max-w-3xl leading-7 text-blue-100">
                Commence par des primitives simples, puis passe aux aires sous la
                courbe et aux exercices type bac avec interprétation.
              </p>
              <TrackedLink
                href="/exercices-maths-terminale/integrales"
                eventName="click_method_chapter_exercises"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_final_exercises",
                }}
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-center font-bold text-blue-950 hover:bg-blue-50 sm:w-auto"
              >
                Faire des exercices sur les intégrales
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer autour des intégrales"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
