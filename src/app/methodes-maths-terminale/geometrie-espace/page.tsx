import type { Metadata } from "next";
import {
  ArrowRight,
  Axis3d,
  BookOpenCheck,
  CheckCircle2,
  ClipboardList,
  Compass,
  ListChecks,
  PlayCircle,
  Ruler,
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

const pagePath = "/methodes-maths-terminale/geometrie-espace";

const title = "Méthode géométrie dans l’espace en Terminale";
const description =
  "Méthode simple pour réussir la géométrie dans l’espace en Terminale : coordonnées, vecteurs, droites, plans, représentations paramétriques, vecteur normal et produit scalaire.";

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
  chapter: "geometrie-espace",
  level: "terminale",
  source_page: pagePath,
};

const fiveSteps = [
  "Identifier si l’exercice parle de points, vecteurs, droites, plans, orthogonalité ou intersection.",
  "Traduire les données en coordonnées.",
  "Choisir l’outil : vecteur directeur, vecteur normal, représentation paramétrique, équation de plan, produit scalaire.",
  "Poser les calculs sans sauter d’étape.",
  "Interpréter le résultat : appartenance, parallélisme, intersection, orthogonalité.",
];

const objectsToIdentify = [
  {
    title: "Points et coordonnées",
    text: "Un point se vérifie par remplacement ou sert à construire un vecteur.",
  },
  {
    title: "Vecteurs",
    text: "Un vecteur donne une direction, un déplacement ou une orthogonalité à tester.",
  },
  {
    title: "Droites",
    text: "Une droite se décrit souvent avec un point et un vecteur directeur.",
  },
  {
    title: "Plans",
    text: "Un plan se lit souvent avec une équation cartésienne et un vecteur normal.",
  },
];

const tools = [
  {
    title: "Vecteur directeur",
    text: "Pour décrire une droite ou tester un parallélisme.",
  },
  {
    title: "Vecteur normal",
    text: "Pour lire une équation cartésienne de plan ou prouver une orthogonalité.",
  },
  {
    title: "Représentation paramétrique",
    text: "Pour écrire tous les points d’une droite avec un même paramètre.",
  },
  {
    title: "Équation de plan",
    text: "Pour tester une appartenance ou exploiter les coefficients x, y, z.",
  },
  {
    title: "Produit scalaire",
    text: "Pour montrer que deux vecteurs sont orthogonaux quand le résultat vaut 0.",
  },
];

const commonMistakes = [
  "Confondre vecteur directeur et vecteur normal.",
  "Oublier le paramètre dans une représentation paramétrique.",
  "Ne pas vérifier toutes les coordonnées.",
  "Conclure “appartient” sans remplacer dans l’équation.",
  "Mélanger droite et plan.",
];

const internalLinks = [
  {
    href: "/programme-maths-terminale/geometrie-espace",
    label: "Programme Géométrie dans l’espace",
  },
  {
    href: "/exercices-maths-terminale/geometrie-espace",
    label: "Exercices Géométrie dans l’espace",
  },
  {
    href: "/exercices-type-bac-maths-terminale",
    label: "Exercices type bac Terminale",
  },
  {
    href: "/sujets-type-bac-maths-terminale",
    label: "Sujets type bac guidés",
  },
  {
    href: "/methodes-maths-terminale",
    label: "Toutes les méthodes Terminale",
  },
  {
    href: "/programme-maths-terminale",
    label: "Programme maths Terminale",
  },
  {
    href: "/planning-revision-bac-maths",
    label: "Planning Bac Maths 2027",
  },
  { href: "/bac-maths-2027", label: "Bac Maths 2027" },
  { href: "/diagnostic", label: "Diagnostic gratuit" },
];

const faqItems: FaqItem[] = [
  {
    question: "Comment commencer un exercice de géométrie dans l’espace ?",
    answer:
      "Commence par identifier les objets de l’énoncé : points, vecteurs, droite, plan, orthogonalité ou intersection. Ensuite, traduis les données en coordonnées avant de choisir l’outil de calcul.",
  },
  {
    question: "Quelle différence entre vecteur directeur et vecteur normal ?",
    answer:
      "Un vecteur directeur donne la direction d’une droite. Un vecteur normal est orthogonal à un plan et donne les coefficients d’une équation cartésienne de plan.",
  },
  {
    question: "Comment savoir si un point appartient à un plan ?",
    answer:
      "On remplace x, y et z par les coordonnées du point dans l’équation cartésienne du plan. Si le résultat vérifie l’équation, le point appartient au plan. Sinon, il n’appartient pas au plan.",
  },
  {
    question: "Comment utiliser une représentation paramétrique ?",
    answer:
      "Une représentation paramétrique décrit les coordonnées d’un point de la droite en fonction d’un paramètre. Pour tester une appartenance, il faut trouver une même valeur du paramètre qui vérifie les trois coordonnées.",
  },
  {
    question: "Quand utiliser le produit scalaire ?",
    answer:
      "On utilise le produit scalaire pour tester une orthogonalité : deux vecteurs sont orthogonaux si leur produit scalaire est nul. Dans l’espace, il aide aussi à montrer qu’un vecteur est normal à un plan.",
  },
  {
    question: "Que faire si je ne vois pas la figure ?",
    answer:
      "Reviens aux coordonnées. Écris les points, calcule les vecteurs utiles, puis choisis entre représentation paramétrique, équation de plan ou produit scalaire. Le calcul coordonné remplace souvent une figure difficile à visualiser.",
  },
];

export default function MethodeGeometrieEspaceTerminalePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Méthodes maths Terminale", path: "/methodes-maths-terminale" },
            { name: "Géométrie dans l’espace", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Méthode géométrie dans l’espace Terminale"
        title="Méthode : géométrie dans l’espace en Terminale"
        description={
          <>
            Pour réussir la géométrie dans l’espace en Terminale, il faut suivre un
            ordre stable : identifier les objets, traduire en coordonnées, choisir
            le bon outil, calculer proprement puis conclure avec le vocabulaire
            géométrique attendu.
          </>
        }
        secondaryDescription={
          <>
            Cette fiche méthode couvre les droites, plans, représentations
            paramétriques, vecteurs normaux et produits scalaires, avec un exemple
            guidé sur une équation cartésienne de plan.
          </>
        }
        ctas={[
          {
            href: "/exercices-maths-terminale/geometrie-espace",
            label: "Faire des exercices de géométrie dans l’espace",
            eventName: "click_method_chapter_exercises",
            eventParams: {
              ...methodEventParams,
              cta_location: "method_hero_exercises",
            },
            icon: <PlayCircle className="h-5 w-5" />,
          },
          {
            href: "/programme-maths-terminale/geometrie-espace",
            label: "Voir le programme Géométrie dans l’espace",
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
          <span>Besoin d’un repère avant de t’entraîner ?</span>
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
                Cette routine t’aide à savoir comment réussir la géométrie espace
                Terminale, même quand la figure est absente ou peu lisible.
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
                <h3 className="font-bold text-red-950">Pièges fréquents</h3>
                <ul className="mt-3 grid gap-2 text-red-950 sm:grid-cols-2">
                  {commonMistakes.map((mistake) => (
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
              <Compass className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 1 : identifier les objets de l’énoncé
              </h2>
            </div>
            <div>
              <p className="text-lg leading-8 text-slate-700">
                Avant de calculer, repère la nature de ce qu’on te donne : point,
                vecteur, droite, plan, orthogonalité, parallélisme ou intersection.
                C’est cette lecture qui détermine l’outil à utiliser.
              </p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {objectsToIdentify.map((item) => (
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
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Axis3d className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 2 : traduire en coordonnées et vecteurs
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Dans l’espace, on sécurise le raisonnement en coordonnées. Avec deux
                points A(xA ; yA ; zA) et B(xB ; yB ; zB), le vecteur AB se calcule
                coordonnée par coordonnée.
              </p>
              <p className="rounded-xl bg-slate-50 p-5 font-mono text-base leading-7 text-slate-950">
                AB = (xB - xA ; yB - yA ; zB - zA)
              </p>
              <p>
                Ce passage en coordonnées évite de deviner sur la figure : on peut
                tester une appartenance, une colinéarité, une orthogonalité ou une
                intersection.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Target className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 3 : choisir l’outil adapté
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Le bon outil dépend de la question : droite, plan, appartenance,
                parallélisme ou orthogonalité.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {tools.map((item) => (
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
              <Sigma className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 4 : faire les calculs proprement
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                En géométrie dans l’espace, une seule coordonnée oubliée peut
                invalider la conclusion. Écris les trois lignes utiles et garde les
                mêmes notations jusqu’à la fin.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  "Pour une appartenance à un plan, remplacer x, y et z.",
                  "Pour une droite paramétrique, vérifier la même valeur du paramètre.",
                  "Pour une orthogonalité, calculer le produit scalaire jusqu’au bout.",
                ].map((rule) => (
                  <article key={rule} className="rounded-xl bg-slate-50 p-5">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <p className="mt-3 text-base leading-7 text-slate-700">{rule}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <ClipboardList className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Étape 5 : conclure géométriquement
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Un calcul n’est pas encore une réponse. Si le remplacement dans
                l’équation d’un plan donne 0, le point appartient au plan. Si le
                produit scalaire vaut 0, les vecteurs sont orthogonaux.
              </p>
              <p>
                Termine par une phrase utilisant le vocabulaire demandé :
                appartenance, parallélisme, intersection ou orthogonalité.
              </p>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <Ruler className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Cas fréquent : droite, plan et vecteur normal
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                Ce cas concentre la représentation paramétrique droite méthode,
                l’équation cartésienne plan méthode, le vecteur normal plan Terminale
                et le produit scalaire espace méthode.
              </p>
            </div>
            <div className="space-y-5">
              <article className="rounded-xl bg-blue-50 p-5">
                <h3 className="text-xl font-bold text-blue-950">
                  Lire un plan
                </h3>
                <p className="mt-3 leading-7 text-blue-950">
                  Si un plan a pour équation ax + by + cz + d = 0, alors un vecteur
                  normal au plan est n(a ; b ; c). Les coefficients de x, y et z
                  donnent directement la direction normale.
                </p>
              </article>
              <article className="rounded-xl bg-emerald-50 p-5">
                <h3 className="text-xl font-bold text-emerald-950">
                  Décrire une droite
                </h3>
                <p className="mt-3 leading-7 text-emerald-950">
                  Pour une droite, on utilise plutôt un point et un vecteur
                  directeur. La représentation paramétrique doit faire apparaître un
                  paramètre, souvent noté t, dans les trois coordonnées.
                </p>
              </article>
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <BookOpenCheck className="h-7 w-7 text-blue-800" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Exemple guidé
              </h2>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                On applique la méthode sur un test d’appartenance à un plan et la
                lecture d’un vecteur normal.
              </p>
            </div>
            <div className="space-y-5">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-lg font-bold leading-8 text-slate-950">
                  Plan P : 2x - y + z - 5 = 0. Point A(1 ; 2 ; 3).
                </p>
                <ul className="mt-4 space-y-2 leading-7 text-slate-700">
                  <li>A appartient-il au plan ?</li>
                  <li>Donner un vecteur normal au plan.</li>
                </ul>
              </div>
              <div className="rounded-xl bg-emerald-50 p-6">
                <h3 className="text-xl font-bold text-emerald-950">Correction</h3>
                <div className="mt-3 space-y-3 leading-7 text-emerald-950">
                  <p>
                    On remplace x, y et z par les coordonnées de A dans l’équation
                    du plan : 2×1 - 2 + 3 - 5 = -2.
                  </p>
                  <p>
                    Le résultat n’est pas égal à 0, donc A n’appartient pas au plan
                    P.
                  </p>
                  <p>
                    Les coefficients de x, y et z donnent un vecteur normal :
                    n(2 ; -1 ; 1).
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <PlayCircle className="h-7 w-7 text-blue-800" />
                <h2 className="mt-4 text-3xl font-bold text-slate-950">
                  S’entraîner sur la géométrie dans l’espace
                </h2>
                <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
                  La méthode devient naturelle quand tu alternes questions courtes,
                  programme du chapitre, exercices type bac guidés et sujets
                  corrigés.
                </p>
              </div>
              <TrackedLink
                href="/exercices-maths-terminale/geometrie-espace"
                eventName="click_method_chapter_exercises"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_primary",
                }}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800 sm:w-auto"
              >
                Faire des exercices de géométrie dans l’espace
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <TrackedLink
                href="/programme-maths-terminale/geometrie-espace"
                eventName="click_method_chapter_program"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_program",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Voir le programme Géométrie dans l’espace
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
                Voir les sujets type bac guidés
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
              <TrackedLink
                href="/bac-maths-2027"
                eventName="click_method_chapter_planning"
                eventParams={{
                  ...methodEventParams,
                  cta_location: "method_training_bac2027",
                }}
                className="rounded-xl border border-slate-200 bg-white p-5 font-semibold text-slate-800 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-blue-950"
              >
                Voir le parcours Bac Maths 2027
              </TrackedLink>
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster géométrie dans l’espace"
            links={internalLinks}
          />

          <FaqAccordion items={faqItems} sourcePage={pagePath} />
        </div>
      </div>
    </SeoPageLayout>
  );
}
