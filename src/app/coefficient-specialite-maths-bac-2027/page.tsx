import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, Scale } from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import {
  OfficialSources,
  QuickAnswer,
  StaticFaq,
} from "@/components/marketing/J42SeoBlocks";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { CoefficientCalculator } from "./CoefficientCalculator";

const pagePath = "/coefficient-specialite-maths-bac-2027";
const title = "Coefficient spécialité Maths Bac 2027 : combien compte l’épreuve ?";
const description =
  "La spécialité maths conservée en Terminale a un coefficient 16 au Bac 2027. Calcule tes points et distingue épreuve terminale, Première et contrôle continu.";

const bacCoefficientsUrl =
  "https://eduscol.education.gouv.fr/5706/les-epreuves-terminales-du-baccalaureat-general";
const earlyMathUrl =
  "https://eduscol.education.gouv.fr/5688/epreuve-anticipee-de-mathematiques-aux-baccalaureats-general-et-technologique";
const calculationUrl =
  "https://www.education.gouv.fr/reussir-au-lycee/comment-calculer-votre-note-au-baccalaureat-325511";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: absoluteUrl(pagePath) },
  openGraph: {
    title,
    description,
    url: absoluteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  robots: { index: true, follow: true },
};

const faqItems: FaqItem[] = [
  {
    question: "Quel est le coefficient de la spécialité maths au Bac 2027 ?",
    answer:
      "Pour un candidat au baccalauréat général qui conserve la spécialité mathématiques en Terminale, l’épreuve terminale de spécialité a un coefficient 16.",
  },
  {
    question: "Combien vaut un point supplémentaire en spécialité maths ?",
    answer:
      "Un point supplémentaire sur la note de spécialité représente 16 points pondérés, car la note est multipliée par le coefficient 16. Pour un candidat sans option dont le total des coefficients est 100, cela correspond à 0,16 point sur la moyenne finale.",
  },
  {
    question: "La spécialité maths compte-t-elle dans le contrôle continu ?",
    answer:
      "Si elle est conservée en Terminale, la spécialité mathématiques est évaluée par l’épreuve terminale de coefficient 16 et sa moyenne annuelle n’est pas ajoutée séparément au contrôle continu du Bac. Les bulletins restent toutefois pris en compte dans le dossier Parcoursup.",
  },
  {
    question: "Que se passe-t-il si j’ai abandonné maths après la Première ?",
    answer:
      "Si la spécialité mathématiques a été suivie en Première mais n’est pas poursuivie en Terminale, sa moyenne annuelle de Première entre dans le contrôle continu avec un coefficient 8. L’épreuve anticipée de mathématiques de coefficient 2 reste distincte.",
  },
  {
    question: "Quelle différence avec l’épreuve de maths de Première ?",
    answer:
      "L’épreuve anticipée de mathématiques est passée en fin de Première par tous les candidats à compter de la session 2027. Elle dure deux heures et a un coefficient 2. Elle ne remplace pas l’épreuve de spécialité mathématiques de Terminale, qui a un coefficient 16 pour les élèves ayant conservé cette spécialité.",
  },
  {
    question: "Le coefficient de la spécialité maths change-t-il en 2027 ?",
    answer:
      "Non : le coefficient de l’épreuve terminale de spécialité mathématiques reste 16. La nouveauté de la session 2027 concernant les mathématiques est l’épreuve anticipée passée en fin de Première, de coefficient 2.",
  },
];

const scoreRows = [8, 10, 12, 14, 16, 18].map((note) => ({
  key: String(note),
  cells: [`${note}/20`, "16", String(note * 16)],
}));

export default function CoefficientSpecialiteMathsBac2027Page() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Coefficient spécialité maths", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Baccalauréat général — session 2027"
        title="Quel est le coefficient de la spécialité Maths au Bac 2027 ?"
        description="Pour un candidat qui conserve la spécialité mathématiques en Terminale, l’épreuve terminale a un coefficient 16."
        secondaryDescription="Ce coefficient ne doit pas être confondu avec l’épreuve anticipée de mathématiques passée en Première ni avec une spécialité abandonnée après la Première."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire coefficient spécialité maths Bac 2027"
        items={[
          { href: "#reponse", label: "Réponse immédiate" },
          { href: "#situations", label: "Les différents cas" },
          { href: "#calculateur", label: "Calculateur de points" },
          { href: "#impact", label: "Impact sur la moyenne" },
          { href: "#faq", label: "Questions fréquentes" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <div id="reponse" className="scroll-mt-24">
            <QuickAnswer title="Coefficient 16 pour la spécialité conservée" tone="emerald">
              <p>
                Ta note sur 20 est multipliée par <strong>16</strong>. Par exemple,
                12/20 apporte <strong>192 points pondérés</strong> au calcul du Bac.
              </p>
              <p className="text-base">
                La spécialité est une épreuve terminale de quatre heures. Elle est
                distincte de l&apos;épreuve anticipée de mathématiques, coefficient 2,
                passée en fin de Première à compter de la session 2027.
              </p>
            </QuickAnswer>
          </div>

          <section id="situations" className="scroll-mt-24">
            <Scale className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Ne pas confondre les différentes évaluations de mathématiques
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Le poids des mathématiques dépend du parcours suivi en Première et en
              Terminale. Les lignes ci-dessous correspondent au baccalauréat général,
              session 2027.
            </p>
            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Mathématiques au Bac général 2027"
                headers={["Élément", "Coefficient", "Année", "Type d’évaluation", "Impact dans le Bac"]}
                rows={[
                  {
                    key: "speciality-kept",
                    cells: [
                      "Spécialité mathématiques conservée",
                      "16",
                      "Terminale",
                      "Épreuve terminale écrite de 4 h",
                      "La note sur 20 est multipliée par 16.",
                    ],
                  },
                  {
                    key: "early",
                    cells: [
                      "Épreuve anticipée de mathématiques",
                      "2",
                      "Première",
                      "Épreuve terminale anticipée écrite de 2 h",
                      "Elle concerne tous les candidats à compter de la session 2027 et reste distincte de la spécialité de Terminale.",
                    ],
                  },
                  {
                    key: "dropped",
                    cells: [
                      "Spécialité mathématiques non poursuivie",
                      "8",
                      "Première",
                      "Contrôle continu : moyenne annuelle",
                      "Ce coefficient s’applique uniquement à la spécialité suivie en Première puis abandonnée.",
                    ],
                  },
                  {
                    key: "no-speciality",
                    cells: [
                      "Mathématiques spécifiques intégrées à l’enseignement scientifique",
                      "40 % du coefficient 3 de l’enseignement scientifique",
                      "Première",
                      "Contrôle continu",
                      "Ce cas concerne les élèves qui n’ont pas choisi la spécialité mathématiques.",
                    ],
                  },
                ]}
              />
            </div>
          </section>

          <div id="calculateur" className="scroll-mt-24">
            <CoefficientCalculator />
          </div>

          <section>
            <Calculator className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Tableau de points pour le coefficient 16
            </h2>
            <div className="mt-7 max-w-3xl">
              <ResourceTable
                caption="Note × coefficient = points pondérés"
                headers={["Note", "Coefficient", "Points pondérés"]}
                rows={scoreRows}
              />
            </div>
          </section>

          <section id="impact" className="scroll-mt-24 grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">
                Combien vaut un point de note supplémentaire ?
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Passer de 12 à 13 ajoute <strong>16 points pondérés</strong>. Pour un
                candidat sans option, dont la somme des coefficients est 100, cela
                augmente la moyenne finale de <strong>0,16 point</strong>.
              </p>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Avec des options, le total des coefficients augmente : l&apos;effet exact
                sur la moyenne finale dépend alors de ce nouveau total.
              </p>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-950">
                De 12/20 à 15/20 : quel écart ?
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                L&apos;écart est de 3 points de note. Avec le coefficient 16, cela
                représente <strong>3 × 16 = 48 points pondérés</strong>, soit 0,48
                point de moyenne finale pour un candidat sans option.
              </p>
            </article>
          </section>

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-amber-950">
              Bulletins, Bac et Parcoursup : trois usages différents
            </h2>
            <p className="mt-4 leading-7 text-amber-950">
              La spécialité conservée est évaluée au Bac par l&apos;épreuve terminale de
              coefficient 16. Ses notes de bulletin ne sont pas ajoutées une seconde
              fois au contrôle continu du diplôme, mais elles restent visibles et
              étudiées dans le dossier Parcoursup.
            </p>
          </section>

          <ChapterInternalLinks
            title="Préparer la spécialité maths"
            variant="cards"
            links={[
              { href: "/programme-maths-terminale", label: "Programme Terminale 2026-2027" },
              { href: "/calculatrice-bac-maths-2027", label: "Calculatrice au Bac Maths 2027" },
              { href: "/planning-revision-bac-maths", label: "Planning de révision" },
              { href: "/quiz-maths-terminale-specialite", label: "Quiz de Terminale" },
              { href: "/preparer-entree-terminale-specialite-maths", label: "Préparer l’entrée en Terminale" },
              { href: "/bac-maths-2027", label: "Toutes les ressources Bac Maths 2027" },
            ]}
          />

          <div id="faq" className="scroll-mt-24">
            <StaticFaq items={faqItems} />
          </div>

          <OfficialSources
            sources={[
              {
                href: bacCoefficientsUrl,
                label: "Coefficients et durée des épreuves terminales du baccalauréat général",
                description: "Éduscol : spécialités de Terminale coefficient 16 et épreuve anticipée de mathématiques coefficient 2.",
              },
              {
                href: earlyMathUrl,
                label: "Épreuve anticipée de mathématiques à compter de la session 2027",
                description: "Programme, durée, coefficient et prise en compte selon le parcours de l’élève.",
              },
              {
                href: calculationUrl,
                label: "Calcul de la note du baccalauréat à compter de la session 2027",
                description: "Répartition officielle entre contrôle continu et épreuves terminales.",
              },
            ]}
          />

          <p className="text-sm leading-6 text-slate-600">
            Besoin de revoir les chapitres avant de calculer un objectif de note ?{" "}
            <Link href="/programme-maths-terminale" className="font-bold text-blue-900 underline">
              Consulte le programme complet
            </Link>{" "}
            puis passe aux exercices, sans confondre coefficient et niveau de difficulté.
          </p>
        </div>
      </section>
    </SeoPageLayout>
  );
}
