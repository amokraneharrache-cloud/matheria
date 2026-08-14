import type { Metadata } from "next";
import { BookOpenCheck, ListChecks, TriangleAlert } from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import { ResourceToc } from "@/components/marketing/J41SeoBlocks";
import {
  OfficialSources,
  QuickAnswer,
  StaticFaq,
} from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { ExerciseTrainingClient } from "./ExerciseTrainingClient";

const pagePath = "/exercices-epreuve-anticipee-maths-premiere";
const title = "Exercices Épreuve Anticipée Maths Première : corrigés";
const description =
  "Entraîne-toi avec 10 exercices corrigés pour l’épreuve anticipée de maths en Première : second degré, suites, dérivation, probabilités, géométrie et Python.";
const examDefinitionUrl =
  "https://www.education.gouv.fr/bo/2025/Hebdo24/MENE2515469N";

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
    question: "Ces exercices sont-ils des sujets officiels ?",
    answer:
      "Non. Ce sont des exercices originaux SprintMaths inspirés du format et des compétences de la seconde partie de l’épreuve. Pour les documents officiels, il faut consulter les sujets zéro Éduscol.",
  },
  {
    question: "Combien d’exercices comporte la seconde partie de l’épreuve ?",
    answer:
      "La définition officielle actuelle prévoit deux ou trois exercices indépendants dans la seconde partie, notée sur 14 points. Elle ne fixe pas une durée par exercice.",
  },
  {
    question: "Les temps indiqués sont-ils à respecter le jour de l’épreuve ?",
    answer:
      "Non. Ce sont seulement des repères pédagogiques SprintMaths pour organiser une séance. Ils ne constituent aucune consigne officielle.",
  },
  {
    question: "Comment utiliser le mode épreuve ?",
    answer:
      "Choisis un tirage local de deux ou trois exercices, traite-les sur papier, marque ta progression puis révèle les corrections. Aucun résultat n’est enregistré.",
  },
];

export default function ExercicesEpreuveAnticipeeMathsPremierePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Épreuve anticipée de maths", path: "/epreuve-anticipee-maths-premiere" },
            { name: "Exercices corrigés", path: pagePath },
          ]),
          faqJsonLd(faqItems),
        ]}
      />

      <ChapterHero
        eyebrow="10 exercices originaux · corrections guidées · mode local"
        title="Exercices corrigés pour l’épreuve anticipée de Maths en Première"
        description="Travaille des problèmes en plusieurs questions sur le second degré, les suites, la dérivation, les probabilités, la géométrie, la trigonométrie, l’exponentielle et Python."
        secondaryDescription="Exercices originaux SprintMaths inspirés du format et des compétences de l’épreuve, et non sujets officiels. Les vrais sujets zéro restent accessibles sur la page dédiée."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire des exercices de l’épreuve anticipée"
        items={[
          { href: "#format", label: "Format officiel" },
          { href: "#mode-epreuve", label: "Mode épreuve" },
          { href: "#exercices", label: "10 exercices" },
          { href: "#strategie", label: "Stratégie 14 points" },
          { href: "#ressources", label: "Sujets zéro et ressources" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <section id="format" className="scroll-mt-24">
            <QuickAnswer title="La seconde partie vaut actuellement 14 points" tone="amber">
              <p>
                La définition officielle prévoit deux ou trois exercices indépendants
                dans cette seconde partie. La première partie est un QCM d’automatismes
                sur 6 points ; l’ensemble de l’épreuve dure deux heures et se déroule
                sans calculatrice.
              </p>
              <p className="text-base">
                Aucun barème par thème ni durée par exercice n’est annoncé ici. Les
                dix entraînements ci-dessous sont des créations SprintMaths, pas des
                exercices publiés ou validés par le ministère.
              </p>
            </QuickAnswer>
          </section>

          <section className="rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <BookOpenCheck className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Ce que les corrections entraînent
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Chaque exercice oblige à reconnaître un modèle, choisir une méthode,
              mener plusieurs calculs et rédiger une conclusion. Les corrections
              séparent volontairement ces étapes pour rendre la méthode réutilisable.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {["Reconnaître", "Choisir", "Calculer", "Rédiger", "Conclure"].map((item, index) => (
                <li key={item} className="rounded-xl bg-white p-4 text-center font-bold text-blue-950">
                  {index + 1}. {item}
                </li>
              ))}
            </ul>
          </section>

          <ExerciseTrainingClient />

          <section
            id="strategie"
            className="scroll-mt-24 rounded-3xl border-2 border-emerald-200 bg-emerald-50 p-6 sm:p-8"
          >
            <ListChecks className="h-7 w-7 text-emerald-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Comment aborder les 14 points ?
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Cette stratégie est un conseil de travail SprintMaths, pas une méthode
              prescrite officiellement. Adapte-la à ton fonctionnement et aux exercices proposés.
            </p>
            <ol className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Parcourir les deux ou trois exercices avant de commencer.",
                "Repérer les questions immédiatement accessibles.",
                "Commencer par ce que l’on sait faire avec certitude.",
                "Écrire les formules, les étapes et les unités, même si le calcul est court.",
                "Laisser une trace puis revenir aux questions bloquantes.",
                "Vérifier les signes, les valeurs interdites et la cohérence du résultat.",
              ].map((item, index) => (
                <li key={item} className="rounded-xl bg-white p-4 leading-7 text-slate-800">
                  <strong className="mr-2 text-emerald-800">{index + 1}.</strong>
                  {item}
                </li>
              ))}
            </ol>
          </section>

          <div id="ressources" className="scroll-mt-24">
            <ChapterInternalLinks
              title="Du cours aux vrais sujets zéro"
              variant="cards"
              links={[
                { href: "/sujets-zero-maths-premiere", label: "Travailler les sujets zéro officiels" },
                { href: "/formules-maths-premiere-specialite", label: "Retrouver une formule de Première" },
                { href: "/quiz-maths-premiere-specialite", label: "Faire le quiz de 30 questions" },
                { href: "/automatismes-maths-premiere", label: "Préparer la partie automatismes" },
                { href: "/epreuve-anticipee-maths-premiere", label: "Relire le format de l’épreuve" },
                { href: "/programme-maths-premiere", label: "Voir le programme Première" },
              ]}
            />
          </div>

          <StaticFaq items={faqItems} />

          <OfficialSources
            sources={[
              {
                href: examDefinitionUrl,
                label: "BO du 12 juin 2025 — définition de l’épreuve anticipée de mathématiques",
                description: "Source officielle du format actuel : deux heures, 6 points d’automatismes et 14 points pour deux ou trois exercices.",
              },
            ]}
          />

          <p className="flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            Les thèmes et difficultés des dix exercices organisent l’entraînement.
            Ils ne prédisent pas la composition ni la pondération d’un futur sujet.
          </p>
        </div>
      </section>
    </SeoPageLayout>
  );
}
