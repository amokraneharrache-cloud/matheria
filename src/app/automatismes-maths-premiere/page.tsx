import type { Metadata } from "next";
import { Calculator, CheckCircle2, Printer, TriangleAlert } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { FrequentMistakesBlock, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer } from "@/components/marketing/J42SeoBlocks";
import { PrintButton } from "@/components/marketing/PrintButton";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { AutomatismesTrainer } from "./AutomatismesTrainer";
import styles from "./automatismes.module.css";

const pagePath = "/automatismes-maths-premiere";
const title = "Automatismes Maths Première : exercices et QCM corrigés";
const description =
  "50 automatismes de maths Première corrigés, filtres par thème et simulation locale sur 6 points pour s’entraîner sans calculatrice à l’épreuve anticipée.";

const specialtyProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602917A";
const secondProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602914A";
const oldAutomationsUrl =
  "https://www.education.gouv.fr/bo/2025/Hebdo24/MENE2516240N";
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

const memoItems = [
  "Appliquer un taux d’évolution et retrouver une valeur initiale.",
  "Combiner des évolutions successives avec leurs coefficients multiplicateurs.",
  "Calculer avec fractions, puissances, racines et écritures scientifiques.",
  "Développer, réduire et factoriser une expression simple.",
  "Résoudre une équation produit nul et étudier le signe d’une expression factorisée.",
  "Lire ou déterminer une droite, un signe, une variation ou une image.",
  "Calculer et interpréter moyenne, médiane, étendue et fréquence.",
  "Utiliser un arbre ou un tableau pour une probabilité conditionnelle.",
  "Contrôler le signe, l’unité et l’ordre de grandeur du résultat.",
];

export default function AutomatismesMathsPremierePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Épreuve anticipée de maths", path: "/epreuve-anticipee-maths-premiere" },
          { name: "Automatismes maths Première", path: pagePath },
        ])}
      />

      <div className={styles.screenContent}>
        <ChapterHero
          eyebrow="50 questions originales · spécialité mathématiques · rentrée 2026-2027"
          title="Automatismes de Maths en Première : entraîne-toi sans calculatrice"
          description="Calcul numérique, évolutions, algèbre, fonctions, suites, statistiques et probabilités : réponds, vérifie la méthode, puis lance une simulation locale sur 6 points."
          secondaryDescription="La page travaille les automatismes du nouveau programme officiel de Première spécialité applicable à la rentrée 2026-2027, les acquis de Seconde qu’il demande d’entretenir et quelques questions flash complémentaires sur les nouvelles notions de Première."
          ctas={[]}
        />

        <ResourceToc
          label="Sommaire des automatismes de Première"
          items={[
            { href: "#statut", label: "Référentiel actuel" },
            { href: "#simulation", label: "Simulation 6 points" },
            { href: "#entrainement", label: "50 questions" },
            { href: "#techniques", label: "Techniques" },
            { href: "#erreurs", label: "Erreurs fréquentes" },
            { href: "#memo", label: "Mémo imprimable" },
          ]}
        />
      </div>

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <div id="statut" className={`${styles.screenContent} scroll-mt-24`}>
            <QuickAnswer title="Le référentiel 2026-2027 est dans les nouveaux programmes" tone="amber">
              <p>
                Les programmes officiels publiés au BO du 2 avril 2026 entrent en
                vigueur à la rentrée 2026-2027. Ils comportent désormais une rubrique
                « Automatismes » et demandent aussi d&apos;entretenir ceux de Seconde.
              </p>
              <p className="text-base">
                La note du 10 juin 2025 ne vaut que pour l&apos;année scolaire
                2025-2026 et dit expressément qu&apos;elle ne s&apos;applique pas aux
                candidats passant l&apos;épreuve en 2026-2027. Elle n&apos;est donc pas
                présentée ici comme le référentiel actuel.
              </p>
            </QuickAnswer>
            <p className="mt-5 max-w-4xl text-sm leading-6 text-slate-600">
              Il n&apos;existe pas, au 13 août 2026, de nouvelle note autonome intitulée
              « liste 2026-2027 ». Le cadre réglementaire actuel est constitué des
              automatismes intégrés aux nouveaux programmes. Cette page vise en
              priorité la voie générale avec spécialité mathématiques. Les questions
              sur les suites, la dérivation ou l&apos;exponentielle sont des questions
              flash complémentaires du programme, pas des items ajoutés à la liste
              réglementaire d&apos;automatismes.
            </p>
          </div>

          <div className={styles.screenContent}>
            <AutomatismesTrainer />
          </div>

          <section id="techniques" className={`${styles.screenContent} scroll-mt-24`}>
            <Calculator className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Techniques fiables sans calculatrice</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                ["Simplifier avant de calculer", "Réduis une fraction ou un produit avant de multiplier de grands nombres."],
                ["Passer au coefficient", "Une hausse de t % se traduit par 1 + t/100 ; une baisse par 1 − t/100."],
                ["Factoriser", "Repère facteur commun, produit nul ou identité remarquable avant de développer."],
                ["Garder les fractions", "Une valeur exacte est souvent plus courte et plus sûre qu’une division décimale."],
                ["Vérifier le signe", "Anticipe le signe attendu, puis contrôle chaque parenthèse et chaque division."],
                ["Estimer l’ordre de grandeur", "Arrondis mentalement pour repérer une virgule mal placée ou une unité incohérente."],
              ].map(([heading, text]) => (
                <article key={heading} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-950">{heading}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <div id="erreurs" className={`${styles.screenContent} scroll-mt-24`}>
            <FrequentMistakesBlock
              title="Erreurs fréquentes dans les automatismes"
              items={[
                "Aller trop vite sans relire le signe demandé.",
                "Oublier qu’un signe moins devant une parenthèse change tous ses termes.",
                "Confondre pourcentage d’évolution et points de pourcentage.",
                "Transformer trop tôt une fraction exacte en nombre décimal.",
                "Additionner des taux successifs au lieu de multiplier les coefficients.",
                "Choisir une réponse sans vérifier sa cohérence ou son ordre de grandeur.",
              ]}
            />
          </div>

          <section id="memo" className={`${styles.printMemo} scroll-mt-24 rounded-3xl border-2 border-blue-300 bg-blue-50 p-6 shadow-sm sm:p-9`}>
            <div className="flex items-start gap-4">
              <Printer className="mt-1 h-8 w-8 shrink-0 text-blue-800 print:hidden" aria-hidden="true" />
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-800">Fiche de travail SprintMaths</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950">Automatismes à maîtriser</h2>
                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  Mémo fondé sur les compétences travaillées dans cette page et sur
                  le nouveau programme 2026 de Première spécialité mathématiques.
                </p>
              </div>
            </div>
            <ul className="mt-7 grid gap-3 md:grid-cols-2">
              {memoItems.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-blue-100 bg-white p-4 leading-7 text-slate-800">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 border-t border-blue-200 pt-6 print:hidden">
              <PrintButton label="Imprimer le mémo" />
            </div>
            <p className="mt-5 text-xs leading-5 text-slate-600">
              Références vérifiées le 13 août 2026 : BO n° 14 du 2 avril 2026,
              programmes applicables à la rentrée 2026-2027.
            </p>
          </section>

          <div className={styles.screenContent}>
            <ChapterInternalLinks
              title="Relier automatismes, format et sujets"
              variant="cards"
              links={[
                { href: "/epreuve-anticipee-maths-premiere", label: "Comprendre le format de l’épreuve" },
                { href: "/sujets-zero-maths-premiere", label: "Travailler les sujets zéro" },
                { href: "/programme-maths-premiere", label: "Voir le programme Première" },
                { href: "/bac-premiere-maths", label: "Continuer les exercices de Première" },
              ]}
            />
          </div>

          <div className={styles.screenContent}>
            <OfficialSources
              sources={[
                {
                  href: specialtyProgramUrl,
                  label: "BO du 2 avril 2026 — programme de Première spécialité mathématiques",
                  description: "Programme applicable en 2026-2027, dont la rubrique officielle Automatismes.",
                },
                {
                  href: secondProgramUrl,
                  label: "BO du 2 avril 2026 — programme de mathématiques de Seconde",
                  description: "Automatismes de Seconde que le programme de Première demande d’entretenir.",
                },
                {
                  href: examDefinitionUrl,
                  label: "BO du 12 juin 2025 — définition de l’épreuve anticipée",
                  description: "QCM sur 6 points, exercices sur 14 points et calculatrice interdite.",
                },
                {
                  href: oldAutomationsUrl,
                  label: "BO du 12 juin 2025 — liste limitée à 2025-2026",
                  description: "Source de la non-reconduction : la note exclut explicitement l’année scolaire 2026-2027.",
                },
              ]}
            />
          </div>

          <p className={`${styles.screenContent} flex items-start gap-3 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-950`}>
            <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            Ces questions sont des exercices originaux SprintMaths, pas des questions
            officielles ni une prédiction de la distribution d&apos;un prochain sujet.
          </p>
        </div>
      </section>
    </SeoPageLayout>
  );
}
