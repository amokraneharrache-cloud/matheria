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
const title = "Épreuve anticipée de Maths en Première : format 2027 et préparation";
const description =
  "Date (21 juin 2027), questions à réponses courtes, barème 6 + 14 dont 2 points de langue, calculatrice interdite et méthode de préparation.";

const officialExamUrl =
  "https://www.education.gouv.fr/bo/2026/Special4/MENE2622640N";
const languageGridUrl =
  "https://www.education.gouv.fr/sites/default/files/document/annexe-attendus-et-observables-redactionnels-520645.pdf";
const calendarUrl =
  "https://www.education.gouv.fr/bo/2026/Special2/MENE2622686N";
const previousExamUrl =
  "https://www.education.gouv.fr/bo/2025/Hebdo24/MENE2515469N";
const officialOverviewUrl =
  "https://www.education.gouv.fr/reussir-au-lycee/epreuve-anticipee-de-mathematiques-en-classe-de-premiere-450607";
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
    question: "Quand a lieu l’épreuve anticipée de maths en 2027 ?",
    answer:
      "Le lundi 21 juin 2027 au matin, de 8 h à 10 h (heure de Paris), selon le calendrier publié au Bulletin officiel spécial du 25 août 2026. Les épreuves de remplacement ont lieu le vendredi 10 septembre 2027.",
  },
  {
    question: "Qui passe l’épreuve anticipée de maths ?",
    answer:
      "Tous les candidats de Première générale et technologique sont concernés. Le sujet dépend du programme préparé : spécialité mathématiques, mathématiques spécifiques intégrées à l’enseignement scientifique ou mathématiques communes de la voie technologique.",
  },
  {
    question: "Le QCM existe-t-il encore ?",
    answer:
      "Non pour les élèves de Première en 2026-2027, qui passent l’épreuve au titre de la session 2028. La note de service du 11 septembre 2026 remplace le questionnaire à choix multiples par une liste de questions à réponses courtes. Le QCM était le format de la première édition, en juin 2026.",
  },
  {
    question: "Combien de temps dure l’épreuve anticipée de maths ?",
    answer:
      "L’épreuve écrite dure 2 heures. Cette durée couvre les questions à réponses courtes sur les automatismes et les deux ou trois exercices de la seconde partie.",
  },
  {
    question: "Comment l’épreuve est-elle notée ?",
    answer:
      "Sur 20 points : 6 points pour la première partie et 14 points pour la seconde. La maîtrise de la langue est prise en compte à hauteur de 2 points sur ces 20. Ils ne s’ajoutent pas, et le texte officiel ne précise pas leur répartition entre les deux parties.",
  },
  {
    question: "Quel est le coefficient de l’épreuve ?",
    answer:
      "L’épreuve anticipée de mathématiques a un coefficient 2 dans la note finale du baccalauréat général ou technologique.",
  },
  {
    question: "Peut-on utiliser une calculatrice ?",
    answer:
      "Non. La note de service du 11 septembre 2026 interdit la calculatrice pendant toute l’épreuve écrite, comme à l’oral de contrôle, sous réserve des aménagements individuels prévus pour certains candidats.",
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
      "Il faut travailler le programme de Première effectivement préparé, entretenir les automatismes qu’il liste, apprendre à trouver une réponse sans propositions, puis résoudre et rédiger des exercices sans calculatrice.",
  },
  {
    question: "Existe-t-il des sujets zéro ?",
    answer:
      "Oui. Éduscol publie sept sujets zéro, dont deux pour la voie générale avec spécialité mathématiques. Ils suivent le premier format : leur première partie est un QCM. Leur seconde partie correspond toujours à la définition officielle. Au 30 septembre 2026, aucun sujet zéro du nouveau format n’est publié.",
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
        eyebrow="Première générale et technologique · textes officiels vérifiés le 30 septembre 2026"
        title="Épreuve anticipée de Maths en Première : tout comprendre"
        description="Une épreuve écrite de 2 heures, notée sur 20 et coefficient 2, sans calculatrice : 6 points de questions à réponses courtes sur les automatismes, puis 14 points sur deux ou trois exercices. La maîtrise de la langue compte pour 2 de ces 20 points."
        secondaryDescription="En Première en 2026-2027, tu la passes le lundi 21 juin 2027, de 8 h à 10 h (heure de Paris), par anticipation au titre de la session 2028. La première édition, en juin 2026, relevait de la session 2027 et commençait par un QCM : la note de service du 11 septembre 2026 a changé ce format."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire de l’épreuve anticipée de mathématiques"
        items={[
          { href: "#reponse", label: "Réponse immédiate" },
          { href: "#nouveau-format", label: "Ce qui change en 2027" },
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
            <QuickAnswer title="21 juin 2027 · 2 h · coefficient 2 · sans calculatrice" tone="emerald">
              <p>
                <strong>Partie 1 :</strong> des questions à réponses courtes sur les automatismes, notées sur 6 points.
                <br />
                <strong>Partie 2 :</strong> deux ou trois exercices indépendants, notés sur 14 points.
              </p>
              <p className="text-base">
                La maîtrise de la langue compte pour 2 points sur 20 : ils font partie
                de la note, ils ne s’ajoutent pas. Tous les candidats de Première
                générale et technologique composent, chacun sur le sujet du programme
                qu’il a préparé. La note entre dans le baccalauréat et est intégrée au
                dossier Parcoursup.
              </p>
            </QuickAnswer>
          </div>

          <section id="nouveau-format" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">Ce qui change pour l’épreuve de juin 2027</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-700">
              La note de service du 11 septembre 2026 s’applique à partir de
              l’année 2026-2027, pour les épreuves passées au titre de la session
              2028. Elle abroge et remplace le texte de juin 2025, qui avait
              encadré la première édition.
            </p>
            <div className="mt-7">
              <ResourceTable
                caption="Première édition et épreuve de juin 2027 : les différences officielles"
                headers={["Point", "Juin 2026 · session 2027", "Juin 2027 · session 2028"]}
                rows={[
                  {
                    key: "texte",
                    cells: [
                      "Texte officiel",
                      "Note de service du 10 juin 2025",
                      "Note de service du 11 septembre 2026",
                    ],
                  },
                  {
                    key: "partie-1",
                    cells: [
                      "Partie 1 (6 points)",
                      "Questionnaire à choix multiples",
                      "Liste de questions à réponses courtes",
                    ],
                  },
                  {
                    key: "partie-2",
                    cells: [
                      "Partie 2 (14 points)",
                      "Deux ou trois exercices indépendants",
                      "Inchangée",
                    ],
                  },
                  {
                    key: "langue",
                    cells: [
                      "Maîtrise de la langue",
                      "Pas de mention dans le texte",
                      "2 points sur les 20",
                    ],
                  },
                  {
                    key: "cadre",
                    cells: [
                      "Durée, coefficient, calculatrice",
                      "2 h, coefficient 2, calculatrice interdite",
                      "Inchangés",
                    ],
                  },
                  {
                    key: "date",
                    cells: [
                      "Date de l’écrit",
                      "Juin 2026",
                      "Lundi 21 juin 2027, 8 h – 10 h",
                    ],
                  },
                ]}
              />
            </div>
            <p className="mt-5 max-w-4xl leading-7 text-slate-700">
              <strong>Conséquence pratique :</strong> sans propositions de réponses,
              tu ne peux plus procéder par élimination. Il faut trouver et écrire
              toi-même un résultat exact et simplifié. Les sujets zéro et le sujet de
              juin 2026 restent utiles : pour leur QCM, cache les propositions et
              réponds seul avant de vérifier.
            </p>
            <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-600">
              Tu passes l’épreuve en juin 2027 au titre de la session 2027 ? Le
              calendrier réunit les deux sessions le même jour, mais la note du 11
              septembre 2026 vise la session 2028 : fais confirmer ton format de
              sujet par ton établissement.
            </p>
          </section>

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
                caption="Structure officielle de l’épreuve écrite de juin 2027"
                headers={["Partie", "Contenu", "Points", "Type de questions", "Conseil de préparation"]}
                rows={[
                  {
                    key: "automatismes",
                    cells: [
                      "Partie 1",
                      "Automatismes mathématiques",
                      "6 points",
                      "Liste de questions à réponses courtes",
                      "Produire seul une réponse exacte et simplifiée, en séries courtes et chronométrées.",
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
            <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-slate-950">Les 2 points de maîtrise de la langue</h3>
              <p className="mt-4 leading-7 text-slate-700">
                Ils sont compris dans les 20 points. La note de service les consacre à
                l’orthographe et à la syntaxe, mais aussi à « la capacité à formuler un
                raisonnement et à utiliser un vocabulaire juste et adapté ». Sa grille
                annexe observe quatre critères, de « très insuffisant » à « très
                satisfaisant » :
              </p>
              <ul className="mt-4 grid gap-2 leading-7 text-slate-800 sm:grid-cols-2">
                <li className="rounded-xl bg-white p-4">Orthographe lexicale et grammaticale.</li>
                <li className="rounded-xl bg-white p-4">Syntaxe et construction des phrases.</li>
                <li className="rounded-xl bg-white p-4">Lexique, notamment celui des mathématiques.</li>
                <li className="rounded-xl bg-white p-4">Organisation du propos, avec un fil conducteur.</li>
              </ul>
              <p className="mt-4 leading-7 text-slate-700">
                Le texte ne précise pas leur répartition entre les deux parties. En
                pratique, rédige les justifications des exercices en phrases
                complètes, relie les étapes par « donc », « car » ou « d’après », et
                termine par une phrase qui répond à la question posée.
              </p>
            </div>
            <p className="mt-5 leading-7 text-slate-700">
              <strong>« Sans calculatrice »</strong> signifie que les calculs doivent
              être menés mentalement ou posés sur la copie. Les sujets peuvent
              fournir des aides numériques lorsqu’un calcul annexe ne constitue pas
              l’objectif évalué, comme le montrent les sujets zéro.
            </p>
          </section>

          <section id="programme" className="scroll-mt-24 rounded-2xl border border-blue-200 bg-blue-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-slate-950">Quel programme réviser ?</h2>
            <p className="mt-4 leading-7 text-slate-700">
              Éduscol le résume ainsi : l’épreuve porte sur le programme « en
              vigueur préparé par le candidat ». Pour l’année 2026-2027, de
              nouveaux programmes de Première entrent en application ; ils ont été
              publiés au Bulletin officiel du 2 avril 2026.
            </p>
            <ul className="mt-6 grid gap-3">
              <li className="rounded-xl bg-white p-4 leading-7 text-slate-800"><strong>Avec spécialité :</strong> programme 2026 de Première spécialité mathématiques. Sa partie « Automatismes » liste les capacités à entretenir toute l’année (évolutions et variations, calcul numérique et algébrique, fonctions et représentations, statistiques, probabilités), en plus de celles de Seconde.</li>
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
                Plus de propositions à choisir : chaque réponse doit être trouvée et
                écrite par toi, exacte et simplifiée. Travaille en séries courtes et
                chronométrées sur le calcul, les pourcentages et évolutions, les
                fonctions et leurs représentations, les statistiques et les
                probabilités selon ton programme. Vérifie les signes, les unités et
                l’ordre de grandeur avant de passer à la suite.
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
                <li>3. Rédiger chaque justification en phrases complètes, avec le vocabulaire exact.</li>
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
              L’interdiction vaut pour l’ensemble de l’épreuve écrite, comme pour
              l’oral de contrôle. En pratique, entraîne-toi à simplifier les
              fractions, manipuler puissances et expressions littérales, garder des
              valeurs exactes et contrôler les ordres de grandeur. Les aménagements
              individuels réglementaires restent possibles.
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
                ["Phase 1", "Automatismes", "Des séries courtes de questions à réponses courtes, sans calculatrice ni propositions."],
                ["Phase 2", "Chapitres", "Cours, méthodes puis exercices ciblés du programme."],
                ["Phase 3", "Sujets zéro", "Leur partie 2 telle quelle ; pour leur QCM, cache les propositions et réponds seul."],
                ["Phase 4", "Chronomètre", "Une épreuve complète de 2 heures en conditions réelles, rédaction comprise."],
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
              {
                href: "/sujet-epreuve-anticipee-maths-2026-corrige",
                label: "Premier sujet 2026 corrigé et analysé",
              },
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
                label: "BO spécial du 17 septembre 2026 — définition de l’épreuve (session 2028)",
                description: "Note de service du 11 septembre 2026 : questions à réponses courtes, barème 6/14, 2 points de maîtrise de la langue, calculatrice interdite.",
              },
              {
                href: languageGridUrl,
                label: "Annexe — attendus et observables rédactionnels",
                description: "La grille officielle de la maîtrise de la langue : orthographe, syntaxe, lexique et organisation du propos.",
              },
              {
                href: calendarUrl,
                label: "BO spécial du 25 août 2026 — calendrier des examens 2027",
                description: "Épreuve anticipée de mathématiques le lundi 21 juin 2027 au matin ; remplacement le vendredi 10 septembre 2027.",
              },
              {
                href: previousExamUrl,
                label: "BO du 12 juin 2025 — ancien texte (session 2027)",
                description: "Format de la première édition, en juin 2026 : QCM en première partie. Abrogé et remplacé par la note du 11 septembre 2026.",
              },
              {
                href: officialOverviewUrl,
                label: "Ministère — épreuve anticipée de mathématiques en Première",
                description: "Public concerné, résultats communiqués en juillet et prise en compte dans Parcoursup (page datée du 7 août 2026, antérieure au nouveau format).",
              },
              {
                href: eduscolExamUrl,
                label: "Éduscol — épreuve anticipée et sujets zéro",
                description: "Définition actualisée de l’épreuve et sept sujets zéro conçus pour le premier format.",
              },
              { href: specialtyProgramUrl, label: "BO 2026 — nouveau programme de Première spécialité mathématiques" },
              { href: specificProgramUrl, label: "BO 2026 — nouveau programme de mathématiques spécifiques" },
              { href: technologyProgramUrl, label: "BO 2026 — nouveau programme de Première technologique" },
            ]}
          />

          <p className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
            Textes officiels vérifiés le 30 septembre 2026 : note de service du 11
            septembre 2026, calendrier 2027 et page Éduscol de l’épreuve. À cette
            date, aucun sujet zéro du nouveau format n’est publié.
          </p>
        </div>
      </section>
    </SeoPageLayout>
  );
}
