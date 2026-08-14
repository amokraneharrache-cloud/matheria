import type { Metadata } from "next";
import { BrainCircuit, CheckCircle2, ListChecks } from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import { ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { QuizPremiereClient } from "./QuizPremiereClient";
import { quizChapterLabels, quizChapterOrder } from "./questions";

const pagePath = "/quiz-maths-premiere-specialite";
const title = "Quiz Maths Première spécialité : 30 questions corrigées";
const description =
  "Teste le programme de Première spécialité maths avec 30 questions corrigées : second degré, suites, dérivation, exponentielle, géométrie, probabilités et Python.";

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
    question: "Quelle est la différence avec les automatismes de Première ?",
    answer:
      "La page Automatismes privilégie les calculs courts et les réflexes sans calculatrice. Ce quiz vérifie plus largement le cours, le choix d’une méthode et le raisonnement dans tous les grands domaines du programme.",
  },
  {
    question: "Les réponses du quiz sont-elles enregistrées ?",
    answer:
      "Non. Le score, la progression et les réponses restent uniquement dans la page ouverte. Aucun compte, email, stockage serveur ou suivi supplémentaire n’est utilisé.",
  },
  {
    question: "Un score élevé signifie-t-il que je suis prêt pour l’épreuve ?",
    answer:
      "Non. Le score décrit seulement les 30 questions proposées. Il faut aussi réussir des exercices plus longs, rédiger les étapes et travailler les sujets zéro.",
  },
  {
    question: "Le quiz correspond-il au programme 2026-2027 ?",
    answer:
      "Oui. Sa répartition suit les domaines du programme de Première spécialité mathématiques applicable à la rentrée 2026-2027.",
  },
];

export default function QuizMathsPremiereSpecialitePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Première", path: "/programme-maths-premiere" },
            { name: "Quiz Première spécialité", path: pagePath },
          ]),
          faqJsonLd(faqItems),
        ]}
      />

      <ChapterHero
        eyebrow="30 questions · 9 thèmes · correction détaillée"
        title="Quiz de Maths Première spécialité : teste tes connaissances"
        description="Second degré, suites, dérivation, exponentielle, trigonométrie, géométrie, probabilités, variables aléatoires et Python : vérifie ce que tu sais reconnaître et utiliser."
        secondaryDescription="Ce quiz couvre la compréhension globale du programme. Pour les calculs très courts et les réflexes de la première partie de l’épreuve, utilise la page dédiée aux automatismes."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire du quiz de Première spécialité"
        items={[
          { href: "#themes", label: "Thèmes couverts" },
          { href: "#fonctionnement", label: "Fonctionnement" },
          { href: "#quiz", label: "30 questions" },
          { href: "#ressources", label: "Ressources" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <section id="themes" className="scroll-mt-24">
            <BrainCircuit className="h-8 w-8 text-violet-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Tout le programme, pas seulement du calcul rapide
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Les 30 questions sont réparties selon les notions réellement présentes
              dans le programme officiel 2026-2027. La géométrie réunit produit
              scalaire et géométrie repérée ; les probabilités distinguent évènements
              et variables aléatoires.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {quizChapterOrder.map((chapter) => (
                <li
                  key={chapter}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 font-semibold text-slate-800 shadow-sm"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  {quizChapterLabels[chapter]}
                </li>
              ))}
            </ul>
          </section>

          <section
            id="fonctionnement"
            className="scroll-mt-24 rounded-3xl border border-blue-200 bg-blue-50 p-6 sm:p-8"
          >
            <ListChecks className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Comment utiliser le quiz
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Réponds sans consulter la fiche si tu veux mesurer ton rappel réel.",
                "Vérifie chaque réponse immédiatement, ou conserve tout pour la correction finale.",
                "Lis l’explication et le piège, y compris après une bonne réponse obtenue par hésitation.",
                "À la fin, reprends les chapitres signalés puis passe aux exercices rédigés.",
              ].map((item, index) => (
                <li key={item} className="rounded-xl bg-white p-4 leading-7 text-slate-800">
                  <strong className="mr-2 text-blue-900">{index + 1}.</strong>
                  {item}
                </li>
              ))}
            </ol>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              Tout fonctionne localement dans le navigateur : aucune réponse n’est
              envoyée, enregistrée ou associée à un compte.
            </p>
          </section>

          <QuizPremiereClient />

          <div id="ressources" className="scroll-mt-24">
            <ChapterInternalLinks
              title="Poursuivre après le quiz"
              variant="cards"
              links={[
                { href: "/formules-maths-premiere-specialite", label: "Revoir la fiche de formules" },
                { href: "/exercices-epreuve-anticipee-maths-premiere", label: "Passer aux exercices rédigés" },
                { href: "/automatismes-maths-premiere", label: "Travailler les automatismes" },
                { href: "/sujets-zero-maths-premiere", label: "Étudier les sujets zéro" },
                { href: "/programme-maths-premiere", label: "Relire le programme Première" },
                { href: "/epreuve-anticipee-maths-premiere", label: "Comprendre le format de l’épreuve" },
              ]}
            />
          </div>

          <StaticFaq items={faqItems} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
