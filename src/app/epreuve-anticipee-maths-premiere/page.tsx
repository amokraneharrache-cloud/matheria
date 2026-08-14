import type { Metadata } from "next";
import Link from "next/link";
import { Ban, CalendarClock, CheckCircle2, GraduationCap } from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { OfficialSources, QuickAnswer, StaticFaq } from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const pagePath = "/epreuve-anticipee-maths-premiere";
const title = "Épreuve anticipée de Maths en Première : format et préparation";
const description =
  "Élèves concernés, durée, coefficient, QCM d’automatismes, exercices, calculatrice, Parcoursup et méthode pour préparer l’épreuve anticipée de maths en Première.";

const officialExamUrl =
  "https://www.education.gouv.fr/bo/2025/Hebdo24/MENE2515469N";
const officialOverviewUrl =
  "https://www.education.gouv.fr/reussir-au-lycee/epreuve-anticipee-de-mathematiques-en-classe-de-1re-pour-l-annee-scolaire-2025-2026-450607";
const eduscolExamUrl =
  "https://eduscol.education.gouv.fr/5688/epreuve-anticipee-de-mathematiques-aux-baccalaureats-general-et-technologique";
const specialtyProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602917A";
const specificProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602916A";
const technologyProgramUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo14/MENE2602918A";

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
    question: "Qui passe l’épreuve anticipée de maths ?",
    answer:
      "Tous les candidats de Première générale et technologique sont concernés. Le sujet dépend du programme préparé : spécialité mathématiques, mathématiques spécifiques intégrées à l’enseignement scientifique ou mathématiques communes de la voie technologique.",
  },
  {
    question: "Combien de temps dure l’épreuve anticipée de maths ?",
    answer:
      "L’épreuve écrite dure 2 heures. Cette durée couvre le QCM d’automatismes et les deux ou trois exercices de la seconde partie.",
  },
  {
    question: "Quel est le coefficient de l’épreuve ?",
    answer:
      "L’épreuve anticipée de mathématiques a un coefficient 2 dans la note finale du baccalauréat général ou technologique.",
  },
  {
    question: "Peut-on utiliser une calculatrice ?",
    answer:
      "Non. La note de service officielle interdit l’usage de la calculatrice pendant toute l’épreuve, sous réserve des aménagements individuels prévus pour certains candidats.",
  },
  {
    question: "L’épreuve est-elle la même pour tous ?",
    answer:
      "Non. Trois sujets correspondent aux trois programmes préparés : voie générale avec spécialité mathématiques, voie générale sans cette spécialité et voie technologique.",
  },
  {
    question: "La note compte-t-elle dans Parcoursup ?",
    answer:
      "Oui. Le ministère indique que les résultats, communiqués en juillet comme ceux des épreuves anticipées de français, sont intégrés au dossier Parcoursup.",
  },
  {
    question: "Que faut-il réviser ?",
    answer:
      "Il faut travailler le programme de Première effectivement préparé, consolider les automatismes du programme applicable, puis apprendre à résoudre et rédiger des exercices sans calculatrice.",
  },
  {
    question: "Existe-t-il des sujets zéro ?",
    answer:
      "Oui. Éduscol publie sept sujets zéro au total, dont deux pour la voie générale avec spécialité mathématiques. Ils sont accessibles gratuitement depuis la page SprintMaths consacrée aux sujets zéro.",
  },
];

export default function EpreuveAnticipeeMathsPremierePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Programme maths Première", path: "/programme-maths-premiere" },
            { name: "Épreuve anticipée de maths", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Première générale et technologique · informations vérifiées le 13 août 2026"
        title="Épreuve anticipée de Maths en Première : tout comprendre"
        description="Une épreuve écrite de 2 heures, notée sur 20 et coefficient 2 : 6 points d’automatismes en QCM, puis 14 points sur deux ou trois exercices, sans calculatrice."
        secondaryDescription="La première édition a eu lieu en juin 2026 pour la session finale 2027. Dans le cursus normal, les élèves entrant en Première en septembre 2026 passeront leur épreuve en 2027, par anticipation au titre de la session finale 2028 ; la date nationale précise n’est pas encore publiée au 13 août 2026."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire de l’épreuve anticipée de mathématiques"
        items={[
          { href: "#reponse", label: "Réponse immédiate" },
          { href: "#candidats", label: "Qui la passe ?" },
          { href: "#format", label: "Format" },
          { href: "#programme", label: "Programme" },
          { href: "#preparation", label: "Préparation" },
          { href: "#calculatrice", label: "Calculatrice" },
          { href: "#coefficient", label: "Coefficient et Parcoursup" },
          { href: "#faq", label: "FAQ" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <div id="reponse" className="scroll-mt-24">
            <QuickAnswer title="2 h · coefficient 2 · 20 points · sans calculatrice" tone="emerald">
              <p>
                <strong>Partie 1 :</strong> un QCM d&apos;automatismes sur 6 points.
                <br />
                <strong>Partie 2 :</strong> deux ou trois exercices indépendants sur 14 points.
              </p>
              <p className="text-base">
                Tous les candidats de Première générale et technologique composent,
                mais sur le sujet correspondant au programme qu&apos;ils ont préparé.
                La note entre dans le baccalauréat et est intégrée au dossier Parcoursup.
              </p>
            </QuickAnswer>
          </div>

          <section id="candidats" className="scroll-mt-24">
            <GraduationCap className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Qui passe l’épreuve ?</h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              L&apos;épreuve concerne tous les élèves de Première, mais elle n&apos;évalue
              pas artificiellement le même contenu pour des parcours différents.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "Première générale avec spécialité maths",
                  text: "Le candidat compose sur le programme de Première de l’enseignement de spécialité mathématiques en vigueur pendant son année de passation.",
                },
                {
                  title: "Première générale sans spécialité maths",
                  text: "Le candidat compose sur le programme de mathématiques spécifiques intégré à l’enseignement scientifique. Ce n’est pas le sujet de spécialité.",
                },
                {
                  title: "Première technologique",
                  text: "Le candidat compose sur les domaines communs du programme de mathématiques de Première technologique, quel que soit son parcours de série.",
                },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{item.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="format" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Format de l’épreuve</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-700">
              Les deux parties sont réunies dans une même épreuve de 2 heures. Le
              texte officiel fixe leur nature et leur poids, sans imposer sur cette
              page un découpage de temps entre elles.
            </p>
            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Structure officielle de l’épreuve écrite"
                headers={["Partie", "Contenu", "Points", "Type de questions", "Conseil de préparation"]}
                rows={[
                  {
                    key: "automatismes",
                    cells: [
                      "Partie 1",
                      "Automatismes mathématiques",
                      "6 points",
                      "Questionnaire à choix multiple",
                      "Répéter des calculs courts, exacts et variés jusqu’à gagner en rapidité.",
                    ],
                  },
                  {
                    key: "exercises",
                    cells: [
                      "Partie 2",
                      "Connaissances et compétences du programme préparé",
                      "14 points",
                      "Deux ou trois exercices indépendants",
                      "Reconnaître le chapitre, justifier les étapes et contrôler la cohérence du résultat.",
                    ],
                  },
                ]}
              />
            </div>
            <p className="mt-5 leading-7 text-slate-700">
              <strong>« Sans calculatrice »</strong> signifie que les calculs doivent
              être menés mentalement ou posés sur la copie. Les sujets peuvent
              fournir des aides numériques lorsqu&apos;un calcul annexe ne constitue pas
              l&apos;objectif évalué, comme le montrent les sujets zéro.
            </p>
          </section>

          <section id="programme" className="scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-slate-950">Quel programme réviser ?</h2>
            <p className="mt-4 leading-7 text-slate-700">
              Le texte officiel est clair : le candidat compose sur le programme en
              vigueur qu&apos;il a préparé pendant l&apos;année scolaire de passation. Pour la
              rentrée 2026-2027, de nouveaux programmes de Première entrent en application.
            </p>
            <ul className="mt-6 grid gap-3">
              <li className="rounded-xl bg-white p-4 leading-7 text-slate-800"><strong>Avec spécialité :</strong> programme 2026 de Première spécialité mathématiques.</li>
              <li className="rounded-xl bg-white p-4 leading-7 text-slate-800"><strong>Sans spécialité :</strong> programme 2026 de mathématiques intégré à l&apos;enseignement scientifique.</li>
              <li className="rounded-xl bg-white p-4 leading-7 text-slate-800"><strong>Voie technologique :</strong> programme 2026 de mathématiques de Première technologique.</li>
            </ul>
            <p className="mt-5 text-sm leading-6 text-slate-600">
              SprintMaths concentre ses entraînements détaillés sur la voie générale
              avec spécialité mathématiques. Les contenus des trois voies ne sont pas mélangés.
            </p>
          </section>

          <section id="preparation" className="scroll-mt-24 grid gap-8 lg:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">Préparer les 6 points d’automatismes</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Cherche la rapidité sans sacrifier la précision : calcul exact,
                algèbre, évolutions, fonctions et représentations, statistiques et
                probabilités selon le programme applicable. Vérifie les signes et
                l&apos;ordre de grandeur avant de valider.
              </p>
              <Link href="/automatismes-maths-premiere" className="mt-5 inline-flex font-bold text-blue-900 underline underline-offset-4">
                Faire les 50 automatismes corrigés
              </Link>
            </article>
            <article className="rounded-2xl border border-slate-200 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-slate-950">Préparer les 14 points d’exercices</h2>
              <ol className="mt-4 space-y-2 leading-7 text-slate-700">
                <li>1. Maîtriser le cours et les méthodes du chapitre.</li>
                <li>2. Reconnaître les notions mobilisées par l&apos;énoncé.</li>
                <li>3. Rédiger chaque justification utile.</li>
                <li>4. S&apos;entraîner sur des exercices indépendants.</li>
                <li>5. Faire les sujets zéro puis analyser ses erreurs.</li>
              </ol>
              <Link href="/sujets-zero-maths-premiere" className="mt-5 inline-flex font-bold text-blue-900 underline underline-offset-4">
                Travailler les deux sujets zéro de spécialité
              </Link>
            </article>
          </section>

          <section id="calculatrice" className="scroll-mt-24 rounded-3xl border-4 border-red-500 bg-red-50 p-6 sm:p-10">
            <Ban className="h-10 w-10 text-red-700" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-red-800">Règle officielle actuelle</p>
            <h2 className="mt-2 text-4xl font-black text-red-950">Calculatrice interdite</h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-red-950">
              L&apos;interdiction vaut pour l&apos;ensemble de l&apos;épreuve. En pratique,
              entraîne-toi à simplifier les fractions, manipuler puissances et
              expressions littérales, garder des valeurs exactes et contrôler les
              ordres de grandeur. Les aménagements individuels réglementaires restent possibles.
            </p>
          </section>

          <section id="coefficient" className="scroll-mt-24 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-emerald-950">Coefficient 2 au baccalauréat</h2>
              <p className="mt-4 leading-7 text-emerald-950">
                C&apos;est une épreuve terminale anticipée, distincte du contrôle
                continu et, pour les élèves qui poursuivent la spécialité, distincte
                de l&apos;épreuve de spécialité de Terminale.
              </p>
            </article>
            <article className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-amber-950">Résultat dans Parcoursup</h2>
              <p className="mt-4 leading-7 text-amber-950">
                Le ministère confirme l&apos;intégration du résultat au dossier
                Parcoursup. Cela ne permet pas de promettre un classement ou une admission : chaque formation publie ses critères.
              </p>
            </article>
          </section>

          <section>
            <CalendarClock className="h-8 w-8 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">Un plan de préparation en 4 phases</h2>
            <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ["Phase 1", "Automatismes", "Des séries courtes et régulières sans calculatrice."],
                ["Phase 2", "Chapitres", "Cours, méthodes puis exercices ciblés du programme."],
                ["Phase 3", "Sujets zéro", "Un premier essai accompagné, puis une analyse des erreurs."],
                ["Phase 4", "Chronomètre", "Une épreuve complète de 2 heures en conditions réelles."],
              ].map(([phase, heading, text]) => (
                <article key={phase} className="rounded-2xl border border-slate-200 p-5">
                  <p className="text-sm font-bold text-blue-800">{phase}</p>
                  <h3 className="mt-2 text-xl font-bold text-slate-950">{heading}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <ChapterInternalLinks
            title="Continuer dans le cluster Première"
            variant="cards"
            links={[
              { href: "/sujets-zero-maths-premiere", label: "Sujets zéro officiels analysés" },
              { href: "/automatismes-maths-premiere", label: "50 automatismes corrigés" },
              { href: "/programme-maths-premiere", label: "Programme de maths Première" },
              { href: "/bac-premiere-maths", label: "Ressources de révision Première" },
            ]}
          />

          <div id="faq" className="scroll-mt-24">
            <StaticFaq items={faqItems} />
          </div>

          <OfficialSources
            sources={[
              {
                href: officialExamUrl,
                label: "BO du 12 juin 2025 — définition de l’épreuve",
                description: "Durée, coefficient, trois programmes, structure 6/14 et interdiction de la calculatrice.",
              },
              {
                href: officialOverviewUrl,
                label: "Ministère — épreuve anticipée de mathématiques en Première",
                description: "Public concerné, calendrier, résultats et prise en compte dans Parcoursup.",
              },
              {
                href: eduscolExamUrl,
                label: "Éduscol — épreuve anticipée et sujets zéro",
                description: "Définition synthétique, sujets officiels et place de l’épreuve dans les parcours.",
              },
              { href: specialtyProgramUrl, label: "BO 2026 — nouveau programme de Première spécialité mathématiques" },
              { href: specificProgramUrl, label: "BO 2026 — nouveau programme de mathématiques spécifiques" },
              { href: technologyProgramUrl, label: "BO 2026 — nouveau programme de Première technologique" },
            ]}
          />

          <p className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
            Informations réglementaires vérifiées le 13 août 2026. La page sera à
            actualiser lorsque le calendrier national 2027 sera publié.
          </p>
        </div>
      </section>
    </SeoPageLayout>
  );
}
