import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CircleAlert,
  MessageCircleQuestion,
  Sigma,
} from "lucide-react";
import { ChapterHero, ChapterInternalLinks } from "@/components/marketing/ChapterSeoPage";
import { GrandOralClusterLinks } from "@/components/marketing/GrandOralClusterLinks";
import {
  OfficialSources,
  PrintableChecklist,
  StaticFaq,
} from "@/components/marketing/J42SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const pagePath = "/grand-oral-maths-2027";
const title = "Grand Oral Maths 2027 : méthode, déroulement et conseils";
const description =
  "Prépare ton Grand Oral Maths 2027 : modalités officielles à jour, méthode d’exposé, exemple avec probabilités et conseils pour expliquer les maths au jury.";

const eduscolUrl = "https://eduscol.education.gouv.fr/5661/presentation-du-grand-oral";
const ministryUrl =
  "https://www.education.gouv.fr/reussir-au-lycee/baccalaureat-comment-se-passe-le-grand-oral-100028";
const legislationUrl = "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000037202834";
const bo2023Url = "https://www.education.gouv.fr/bo/2023/Hebdo36/MENE2323117N";

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
    question: "Combien de temps dure le Grand Oral 2027 ?",
    answer:
      "En voie générale, le candidat dispose d’abord de 20 minutes de préparation. L’épreuve orale dure ensuite 20 minutes : 10 minutes de présentation, puis 10 minutes d’échange avec le jury. Des aménagements peuvent être accordés aux candidats qui en bénéficient.",
  },
  {
    question: "Quel est le coefficient du Grand Oral au Bac 2027 ?",
    answer:
      "À compter de la session 2027, le Grand Oral a un coefficient 8 en voie générale. Les contenus indiquant encore un coefficient 10 décrivent les sessions allant jusqu’à 2026.",
  },
  {
    question: "Peut-on choisir un sujet uniquement en maths ?",
    answer:
      "Une des deux questions peut être adossée uniquement à la spécialité mathématiques. À l’échelle des deux questions remises au jury, les deux spécialités de Terminale doivent toutefois être mobilisées : une question par spécialité, une question de spécialité et une transversale, ou deux questions transversales.",
  },
  {
    question: "Doit-on faire des calculs pendant l’oral ?",
    answer:
      "Aucune règle n’impose un nombre de calculs. En maths, il faut surtout expliquer les objets, les étapes et l’interprétation du raisonnement utile à la question. Pendant l’échange, le jury ne peut pas imposer au candidat d’écrire pour résoudre un exercice.",
  },
  {
    question: "Peut-on apporter un support ?",
    answer:
      "Le candidat peut réaliser un support papier pendant les 20 minutes de préparation et l’utiliser pendant les deux temps. Il peut le montrer au jury, mais ce support n’est ni évalué ni conservé. Il ne peut pas s’agir d’un support numérique ou d’une réalisation préparée pendant l’année.",
  },
  {
    question: "Peut-on choisir un sujet hors programme ?",
    answer:
      "La question doit être adossée à tout ou partie du programme du cycle terminal de la spécialité concernée. Elle peut s’ouvrir sur un contexte extérieur, mais cet élargissement ne remplace pas l’ancrage explicite dans le programme.",
  },
  {
    question: "Le jury comprend-il forcément un professeur de maths ?",
    answer:
      "Pour une question retenue adossée aux mathématiques, la FAQ officielle précise que l’un des deux examinateurs enseigne la spécialité support de cette question. Le second membre enseigne une discipline différente : autre spécialité, enseignement commun, ou peut être professeur documentaliste.",
  },
];

const workingOutline = [
  ["1", "Accroche", "Une situation, un paradoxe ou un chiffre qui rend la question concrète."],
  ["2", "Problématique", "La question exacte à laquelle l’exposé va répondre."],
  ["3", "Mise en contexte", "Les données utiles et le périmètre retenu."],
  ["4", "Outil mathématique", "La notion choisie et la raison de ce choix."],
  ["5", "Raisonnement", "Les étapes du calcul, de la démonstration ou du modèle."],
  ["6", "Résultat", "Une valeur, une propriété ou une comparaison clairement formulée."],
  ["7", "Interprétation", "Ce que le résultat signifie dans la situation étudiée."],
  ["8", "Limites", "Les hypothèses et ce que le modèle ne permet pas d’affirmer."],
  ["9", "Conclusion", "Une réponse courte à la problématique et une ouverture maîtrisée."],
] as const;

const explanationExamples = [
  {
    notion: "Probabilités",
    before: "X suit une loi binomiale B(n, p).",
    after:
      "Je répète n fois la même expérience indépendante, avec une probabilité p de succès à chaque essai. Le nombre de succès peut donc être modélisé par une loi binomiale.",
  },
  {
    notion: "Dérivée",
    before: "f′(x) est positive, donc f est croissante.",
    after:
      "Sur cet intervalle, la dérivée est positive : quand x augmente légèrement, la valeur de f tend à augmenter. La fonction y est donc croissante.",
  },
  {
    notion: "Limite",
    before: "La limite de uₙ vaut L quand n tend vers +∞.",
    after:
      "Quand le nombre d’étapes devient très grand, les valeurs de la suite se rapprochent autant que l’on veut de L. Dans mon modèle, L représente la valeur de stabilisation.",
  },
  {
    notion: "Intégrale",
    before: "On calcule l’intégrale de a à b de f(x).",
    after:
      "Je découpe l’intervalle en très petites largeurs et j’additionne les contributions correspondantes. L’intégrale représente ici la quantité totale accumulée entre a et b.",
  },
  {
    notion: "Exponentielle",
    before: "La solution est y = Ceᵏᵗ.",
    after:
      "La vitesse d’évolution est proportionnelle à la quantité déjà présente. Ce mécanisme conduit à une fonction exponentielle, dont le paramètre k règle la rapidité de croissance ou de décroissance.",
  },
  {
    notion: "Suites",
    before: "uₙ₊₁ = 1,03uₙ + 50.",
    after:
      "D’un mois au suivant, le capital précédent augmente de 3 %, puis on ajoute 50 euros. La relation de récurrence traduit exactement ces deux opérations.",
  },
] as const;

const probabilityAngles = [
  {
    notion: "Loi binomiale",
    question: "Peut-on « avoir la moyenne » à un QCM en répondant au hasard ?",
    tool: "Répétition d’épreuves identiques et indépendantes, loi binomiale B(n, p) et espérance E(X) = n × p.",
    result:
      "Sur n questions à 4 réponses possibles, l’espérance du nombre de bonnes réponses est n × 1/4, soit un quart du total : le hasard place nettement en dessous de la moyenne.",
    limit:
      "Le modèle suppose des questions indépendantes et de même difficulté ; une question éliminatoire ou un indice le change.",
  },
  {
    notion: "Probabilités conditionnelles",
    question: "Un test de dépistage positif signifie-t-il qu’on est vraiment concerné ?",
    tool: "Arbre pondéré, probabilité conditionnelle P_A(B) et formule des probabilités totales.",
    result:
      "Avec une situation touchant 1 % de la population et un test correct 99 fois sur 100, sur 10 000 personnes on obtient environ 99 vrais positifs et 99 faux positifs : un test positif ne donne alors qu’une chance sur deux d’être réellement concerné.",
    limit:
      "Les taux de réussite du test sont supposés connus et constants ; en pratique ils dépendent de la population testée.",
  },
  {
    notion: "Événement contraire",
    question: "Pourquoi deux élèves d’une classe ont-ils si souvent la même date d’anniversaire ?",
    tool: "Probabilité de l’événement contraire et produit de probabilités d’événements indépendants.",
    result:
      "On calcule d’abord la probabilité que toutes les dates soient différentes, puis on prend le complément : la probabilité d’au moins une coïncidence dépasse 1/2 dès 23 personnes.",
    limit:
      "On suppose les 365 dates équiprobables et indépendantes, ce qui n’est qu’approché dans la réalité.",
  },
] as const;

const preparationChecklist = [
  "Je peux expliquer pourquoi j’ai choisi la question.",
  "Je comprends tous les calculs que je présente.",
  "Je peux définir chaque terme mathématique important.",
  "Je sais refaire les calculs sans lire un texte rédigé.",
  "Je peux répondre à plusieurs « pourquoi ? » successifs.",
  "Je peux donner un exemple simple ou un ordre de grandeur.",
  "Je connais les hypothèses et les limites de mon modèle.",
  "Je peux expliquer l’idée à quelqu’un qui ne suit pas la spécialité maths.",
];

export default function GrandOralMaths2027Page() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Grand Oral Maths 2027", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Grand Oral — voie générale — session 2027"
        title="Grand Oral Maths 2027 : comment bien le préparer ?"
        description="Comprends d’abord le cadre officiel, puis construis un raisonnement que tu peux expliquer, justifier et nuancer. Cette page est le point de départ du cluster Grand Oral Maths."
        secondaryDescription="Les modalités ci-dessous ont été vérifiées sur les sources officielles disponibles le 13 août 2026. Le coefficient 2027 n’est pas celui des sessions précédentes."
        ctas={[]}
      />

      <section className="px-4 pb-14">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="rounded-2xl border-2 border-blue-300 bg-blue-50 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
              Réponse rapide
            </p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950">
              Grand Oral 2027 — voie générale
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Préparation", "20 minutes"],
                ["Épreuve", "20 minutes"],
                ["Coefficient 2027", "8"],
                ["Déroulement", "10 min + 10 min"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-xl bg-white p-5 shadow-sm">
                  <p className="text-sm font-bold text-slate-600">{label}</p>
                  <p className="mt-1 text-2xl font-extrabold text-blue-950">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3 text-lg leading-8 text-slate-800">
              <p>
                Le jury choisit une des deux questions préparées. Après 20 minutes de
                préparation, tu présentes ta réponse pendant <strong>10 minutes</strong>, puis
                tu échanges avec le jury pendant <strong>10 minutes</strong>.
              </p>
              <p>
                À l’échelle des deux questions, les deux spécialités suivies en Terminale doivent
                être mobilisées. Une question peut être uniquement mathématique si l’autre fait
                aussi intervenir la seconde spécialité selon l’une des configurations officielles.
              </p>
            </div>
            <a
              href={eduscolUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-900 px-5 py-2 font-bold text-white hover:bg-blue-800"
            >
              Vérifier sur Eduscol
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <p className="mt-4 text-sm leading-6 text-blue-950">
              Attention : certains documents encore accessibles indiquent le coefficient 10,
              exact jusqu’à la session 2026. À compter de 2027, le coefficient officiel en voie
              générale est 8.
            </p>
          </section>

          <section>
            <BookOpenCheck className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Comment se déroule l’épreuve ?
            </h2>
            <div className="mt-7 grid gap-4 lg:grid-cols-3">
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
                  Pendant l’année
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">Préparer deux questions</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Les questions sont problématisées, adossées à tout ou partie des programmes du
                  cycle terminal et préparées avec les professeurs de spécialité. Le jour de
                  l’épreuve, elles figurent sur une feuille signée ; le jury en choisit une.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
                  Avant de parler — 20 min
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">Organiser la réponse</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Tu mets tes idées en ordre et peux créer un support papier : plan, mots-clés,
                  schéma, courbe, tableau ou formule. Il est facultatif, non numérique, non évalué
                  et ne peut pas avoir été préparé pendant l’année.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
                  Pendant l’oral — 20 min
                </p>
                <h3 className="mt-2 text-xl font-bold text-slate-950">Présenter puis échanger</h3>
                <p className="mt-3 leading-7 text-slate-700">
                  Tu présentes debout pendant 10 minutes, sauf aménagement. Pendant les 10 minutes
                  suivantes, le jury te demande de préciser et d’approfondir ta pensée. Tu peux
                  alors rester debout ou t’asseoir.
                </p>
              </article>
            </div>
            <p className="mt-5 rounded-xl bg-slate-100 p-5 leading-7 text-slate-700">
              Le support peut être utilisé et montré pendant les deux temps, mais le jury ne le
              conserve pas. Le tableau peut être utilisé à ton initiative pendant l’échange ; le
              jury ne peut pas t’imposer un exercice écrit. La calculatrice n’est pas autorisée.
            </p>
          </section>

          <section className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <MessageCircleQuestion className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Qu’est-ce qu’un bon sujet de Grand Oral Maths ?
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-8 text-slate-700">
              <p>
                Un bon sujet part d’une <strong>vraie question</strong>. Il te permet de conduire un
                raisonnement avec des mathématiques que tu comprends, puis de rendre ce
                raisonnement accessible à une personne non spécialiste. Un exemple concret est
                utile lorsqu’il éclaire les maths, pas lorsqu’il les remplace.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-rose-900">Trop large</p>
                  <p className="mt-2 font-bold text-rose-950">« Les probabilités »</p>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-emerald-900">
                    Problématisé
                  </p>
                  <p className="mt-2 font-bold text-emerald-950">
                    « Pourquoi les anniversaires identiques sont-ils beaucoup plus fréquents qu’on
                    ne l’imagine ? »
                  </p>
                </div>
              </div>
              <Link
                href="/sujets-grand-oral-maths"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue-900 px-5 py-2 font-bold text-white hover:bg-blue-800"
              >
                Explorer 50 problématiques
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">Une structure de travail possible</h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Ce plan n’est pas une règle officielle et ne doit pas transformer l’exposé en neuf
              parties artificielles. Utilise-le pour vérifier que ta réponse progresse et conduit à
              une conclusion.
            </p>
            <ol className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {workingOutline.map(([number, heading, text]) => (
                <li key={number} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 font-bold text-white">
                    {number}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-slate-950">{heading}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-3xl bg-slate-950 p-6 text-white sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-200">
              Exemple complet — support de travail, pas texte à réciter
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Pourquoi un jeu de hasard peut-il sembler avantageux alors qu’il ne l’est pas ?
            </h2>
            <div className="mt-8 grid gap-5 lg:grid-cols-2">
              <article className="rounded-2xl bg-white/10 p-5">
                <h3 className="text-xl font-bold">Problématique et modèle</h3>
                <p className="mt-3 leading-7 text-slate-200">
                  Une partie coûte 4 €. On lance un dé équilibré : le jeu verse 15 € si le résultat
                  est 6, 6 € si le résultat est 5 et 0 € sinon. Le gros gain et les victoires visibles
                  peuvent attirer l’attention. La question mathématique est : quel est le gain net
                  moyen théorique d’une partie ?
                </p>
              </article>
              <article className="rounded-2xl bg-white/10 p-5">
                <h3 className="text-xl font-bold">Plan possible</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 leading-7 text-slate-200">
                  <li>Distinguer somme reçue et gain net.</li>
                  <li>Construire la variable aléatoire du gain.</li>
                  <li>Calculer son espérance.</li>
                  <li>Interpréter sans confondre moyenne et résultat certain.</li>
                  <li>Présenter les limites du modèle.</li>
                </ol>
              </article>
            </div>

            <div className="mt-5 rounded-2xl bg-white p-5 text-slate-950 sm:p-7">
              <Sigma className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h3 className="mt-3 text-2xl font-bold">Le calcul mathématique</h3>
              <div className="mt-4 overflow-x-auto rounded-xl bg-blue-50 p-5 font-mono text-base font-bold text-blue-950 sm:text-lg">
                E(X) = 11 × 1/6 + 2 × 1/6 − 4 × 4/6 = −0,50 €
              </div>
              <p className="mt-4 leading-7 text-slate-700">
                Le gain net vaut 11 € si le jeu verse 15 €, 2 € s’il verse 6 €, et −4 € dans les
                quatre autres cas. Une autre manière de vulgariser consiste à imaginer six parties
                contenant une fois chaque face : 24 € sont dépensés et 21 € sont reversés, soit une
                perte totale de 3 € pour six parties, donc 0,50 € par partie en moyenne.
              </p>
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <article className="rounded-2xl bg-white/10 p-5">
                <h3 className="text-xl font-bold">Conclusion possible</h3>
                <p className="mt-3 leading-7 text-slate-200">
                  Le jeu peut donner des gains ponctuels, mais son espérance nette est négative dans
                  ce modèle. Sur un grand nombre de parties, la perte moyenne théorique est de 0,50 €
                  par partie. Cela ne prédit pas le résultat d’une partie ni même d’une courte série.
                </p>
              </article>
              <article className="rounded-2xl bg-white/10 p-5">
                <h3 className="text-xl font-bold">Limites à signaler</h3>
                <p className="mt-3 leading-7 text-slate-200">
                  Le dé est supposé équilibré, les parties indépendantes et les règles constantes.
                  L’espérance ne décrit ni le risque de ruine, ni les émotions du joueur, ni le temps
                  nécessaire pour observer une moyenne proche de la valeur théorique.
                </p>
              </article>
            </div>

            <article className="mt-5 rounded-2xl border border-blue-300 bg-blue-950 p-5">
              <h3 className="text-xl font-bold">5 questions d’entraînement sur cet exemple</h3>
              <ul className="mt-4 grid gap-2 leading-7 text-blue-50 sm:grid-cols-2">
                {[
                  "Pourquoi les gains utilisés dans le calcul sont-ils 11 €, 2 € et −4 € ?",
                  "Une espérance de −0,50 € signifie-t-elle que l’on perd à chaque partie ?",
                  "Que devient l’espérance si le gros lot passe de 15 € à 18 € ?",
                  "Comment pourriez-vous vérifier le résultat avec une simulation ?",
                  "Quelles hypothèses rendent les six faces équiprobables ?",
                ].map((question) => (
                  <li key={question} className="rounded-xl bg-white/10 p-3">
                    {question}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section>
            <Sigma className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              D’autres angles probabilistes pour une question de Grand Oral
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              L’exemple ci-dessus s’appuie sur l’espérance. D’autres notions de
              probabilités vues en spécialité conduisent aussi à une question
              défendable : voici trois pistes avec l’outil mobilisé, le résultat
              à présenter et la limite à reconnaître.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {probabilityAngles.map((angle) => (
                <article
                  key={angle.notion}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
                    {angle.notion}
                  </p>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">
                    {angle.question}
                  </h3>
                  <dl className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                    <div>
                      <dt className="font-bold text-slate-950">Outil mathématique</dt>
                      <dd className="mt-1">{angle.tool}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-slate-950">Résultat à présenter</dt>
                      <dd className="mt-1">{angle.result}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-slate-950">Limite à signaler</dt>
                      <dd className="mt-1">{angle.limit}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-slate-950">
              Comment expliquer des maths à un non-spécialiste ?
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-slate-700">
              Une bonne reformulation ne supprime pas la précision : elle explicite les symboles,
              le mécanisme et le sens du résultat avant de revenir au vocabulaire mathématique.
            </p>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
              {explanationExamples.map((example) => (
                <article key={example.notion} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="text-xl font-bold text-slate-950">{example.notion}</h3>
                  <div className="mt-4 rounded-xl bg-rose-50 p-4 text-rose-950">
                    <p className="text-xs font-bold uppercase tracking-wide">Trop condensé</p>
                    <p className="mt-2 leading-7">« {example.before} »</p>
                  </div>
                  <div className="mt-3 rounded-xl bg-emerald-50 p-4 text-emerald-950">
                    <p className="text-xs font-bold uppercase tracking-wide">Plus clair à l’oral</p>
                    <p className="mt-2 leading-7">« {example.after} »</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <PrintableChecklist
            heading="Checklist de préparation"
            intro="Coche chaque point en essayant de l’expliquer à voix haute, sans apprendre un texte mot pour mot."
            items={preparationChecklist}
            printLabel="Imprimer la checklist Grand Oral"
          />

          <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6 sm:p-8">
            <CircleAlert className="h-7 w-7 text-amber-800" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-bold text-amber-950">
              Les questions du jury testent surtout la solidité du raisonnement
            </h2>
            <p className="mt-3 max-w-4xl leading-7 text-amber-950">
              Il n’existe pas de liste de questions garanties. En revanche, t’entraîner à définir,
              justifier une hypothèse, interpréter un résultat et reconnaître une limite permet de
              vérifier que tu maîtrises réellement ton sujet.
            </p>
            <Link
              href="/questions-jury-grand-oral-maths"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-900 px-5 py-2 font-bold text-white hover:bg-amber-800"
            >
              S’entraîner aux questions
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>

          <StaticFaq items={faqItems} />

          <OfficialSources
            title="Sources officielles — modalités vérifiées le 13 août 2026"
            sources={[
              {
                href: eduscolUrl,
                label: "Eduscol — Présentation du Grand Oral",
                description:
                  "Durée, préparation, coefficient 8 à compter de 2027, support et ressources officielles.",
              },
              {
                href: ministryUrl,
                label: "Ministère de l’Éducation nationale — Comment se passe le Grand Oral ?",
                description:
                  "Deux questions, déroulement 10 + 10 minutes, échange, support et composition du jury.",
              },
              {
                href: legislationUrl,
                label: "Légifrance — arrêté du 16 juillet 2018 consolidé",
                description:
                  "Coefficient 8 de l’épreuve orale terminale applicable à compter de la session 2027.",
              },
              {
                href: bo2023Url,
                label: "Bulletin officiel — note modificative du 26 septembre 2023",
                description: "Définition actuelle des deux temps de 10 minutes de l’épreuve.",
              },
            ]}
          />

          <GrandOralClusterLinks currentPath={pagePath} />

          <ChapterInternalLinks
            title="Renforcer les bases utiles à l’oral"
            variant="cards"
            links={[
              { href: "/programme-maths-terminale", label: "Programme de Terminale" },
              { href: "/redaction-bac-maths-terminale", label: "Rédiger et justifier un raisonnement" },
              { href: "/demonstrations-bac-maths-terminale", label: "Comprendre les démonstrations" },
              {
                href: "/articles/probabilites-loi-binomiale-terminale",
                label: "Probabilités et loi binomiale",
              },
              { href: "/python-bac-maths-terminale", label: "Python en Terminale" },
              { href: "/bac-maths-2027", label: "Ressources Bac Maths 2027" },
            ]}
          />
        </div>
      </section>
    </SeoPageLayout>
  );
}
