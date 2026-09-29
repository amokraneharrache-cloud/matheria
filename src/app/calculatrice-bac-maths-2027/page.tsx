import type { Metadata } from "next";
import Link from "next/link";
import { BatteryCharging, Calculator, ShieldCheck } from "lucide-react";
import {
  ChapterHero,
  ChapterInternalLinks,
} from "@/components/marketing/ChapterSeoPage";
import {
  OfficialSources,
  PrintableChecklist,
  QuickAnswer,
  StaticFaq,
} from "@/components/marketing/J42SeoBlocks";
import { ResourceTable, ResourceToc } from "@/components/marketing/J41SeoBlocks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/calculatrice-bac-maths-2027";
const title = "Calculatrice autorisée au Bac Maths 2027 ? Les règles par épreuve";
const description =
  "Spécialité maths en Terminale : la page de garde du sujet dit si la calculatrice est autorisée. Épreuve anticipée de Première : interdite sur toute l’épreuve.";

const calculatorRuleUrl =
  "https://www.education.gouv.fr/bo/15/Hebdo42/MENS1523092C.htm";
const terminalExamsUrl =
  "https://eduscol.education.gouv.fr/5706/les-epreuves-terminales-du-baccalaureat-general";
const earlyMathUrl =
  "https://eduscol.education.gouv.fr/5688/epreuve-anticipee-de-mathematiques-aux-baccalaureats-general-et-technologique";
const specialtyExamNoteUrl =
  "https://www.education.gouv.fr/bo/2026/Hebdo4/MENE2622642N";
const earlyMathNoteUrl =
  "https://www.education.gouv.fr/bo/2026/Special4/MENE2622640N";
const examDates2027Url =
  "https://eduscol.education.gouv.fr/5697/dates-des-examens-2027";

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
    question: "Le mode examen est-il obligatoire ?",
    answer:
      "Si le sujet autorise la calculatrice et si ta machine possède une mémoire alphanumérique ou un écran graphique, elle doit disposer d’un mode examen conforme et celui-ci doit être activé sur instruction du surveillant. Une calculatrice non programmable sans mémoire alphanumérique n’a pas besoin de mode examen.",
  },
  {
    question: "Peut-on utiliser une calculatrice NumWorks au Bac ?",
    answer:
      "Une marque ne suffit pas à garantir l’autorisation. Il faut que le sujet autorise la calculatrice, que le modèle utilisé réponde aux caractéristiques officielles et, pour une calculatrice avec mémoire, que son mode examen conforme soit activé sur instruction du surveillant.",
  },
  {
    question: "Peut-on utiliser une calculatrice Casio au Bac ?",
    answer:
      "La règle dépend du sujet et des caractéristiques du modèle, pas du seul nom Casio. Vérifie que le modèle possède le mode examen requis s’il a une mémoire, apprends la procédure du fabricant et suis l’instruction du surveillant le jour de l’épreuve.",
  },
  {
    question: "Peut-on utiliser une calculatrice TI au Bac ?",
    answer:
      "La règle est la même que pour les autres marques : autorisation explicite sur le sujet, matériel conforme et mode examen activé sur instruction du surveillant pour une calculatrice avec mémoire.",
  },
  {
    question: "Peut-on utiliser son téléphone comme calculatrice ?",
    answer:
      "Non. La réglementation définit une calculatrice comme un appareil autonome dépourvu de communication sans fil et dont la fonction essentielle est le calcul. Un téléphone ou une montre connectée ne répond pas à cette définition et doit rester éteint et rangé selon les consignes d’examen.",
  },
  {
    question: "La calculatrice peut-elle être interdite sur un sujet de maths ?",
    answer:
      "Oui. Dans les disciplines où elle n’est pas interdite par principe, la calculatrice n’est autorisée que si le sujet le prévoit expressément. La page de garde doit indiquer si son usage est autorisé ou interdit.",
  },
  {
    question: "Que faire si la calculatrice tombe en panne ?",
    answer:
      "La circulaire permet de remplacer une machine défaillante par une autre, mais une seule calculatrice peut être posée sur la table et les échanges entre candidats sont interdits. Le matériel de remplacement doit lui aussi être conforme et respecter la consigne du sujet.",
  },
];

const checklist = [
  "Calculatrice conforme aux caractéristiques officielles",
  "Piles ou batterie chargées",
  "Fonctionnement vérifié avant l’épreuve",
  "Procédure du mode examen connue, sans l’activer avant l’instruction du surveillant",
  "Éventuelle machine de secours conforme, selon les consignes du centre",
  "Convocation relue",
  "Pièce d’identité préparée",
];

export default function CalculatriceBacMaths2027Page() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Bac Maths 2027", path: "/bac-maths-2027" },
            { name: "Calculatrice Bac Maths 2027", path: pagePath },
          ]),
        ]}
      />

      <ChapterHero
        eyebrow="Réglementation des examens — épreuves de juin 2027"
        title="Calculatrice autorisée au Bac Maths 2027 ? Les règles par épreuve"
        description="Deux épreuves de maths ont lieu en juin 2027 et leurs règles diffèrent : en spécialité maths de Terminale, la page de garde du sujet indique si la calculatrice est autorisée ; à l’épreuve anticipée de Première, elle est interdite sur toute l’épreuve."
        secondaryDescription="Quand le sujet de spécialité l’autorise, une calculatrice avec mémoire doit disposer d’un mode examen conforme ; une calculatrice non programmable sans mémoire alphanumérique peut aussi être admise."
        ctas={[]}
      />

      <ResourceToc
        label="Sommaire calculatrice Bac Maths 2027"
        items={[
          { href: "#autorisation", label: "Règle par épreuve" },
          { href: "#verification", label: "Où vérifier" },
          { href: "#mode-examen", label: "Mode examen" },
          { href: "#types", label: "Types de calculatrices" },
          { href: "#marques", label: "NumWorks, Casio, TI" },
          { href: "#veille", label: "Checklist de la veille" },
        ]}
      />

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl space-y-14">
          <div id="autorisation" className="scroll-mt-24 space-y-6">
            <QuickAnswer title="Calculatrice autorisée ? Tout dépend de l’épreuve" tone="amber">
              <p>
                <strong>Spécialité maths, en Terminale</strong> : autorisée seulement
                si la page de garde du sujet le prévoit. Cette autorisation ne peut
                donc pas être garantie avant la publication du sujet.
              </p>
              <p>
                <strong>Épreuve anticipée de maths, en Première</strong> : interdite
                sur toute l’épreuve, oral de contrôle compris.
              </p>
              <p className="text-base">
                En cursus normal, les élèves de Terminale 2026-2027 ont déjà passé
                l&apos;épreuve anticipée en fin de Première : en juin 2027, seule la
                règle de la spécialité les concerne s&apos;ils l&apos;ont gardée.
              </p>
            </QuickAnswer>

            <ResourceTable
              prominent
              caption="Calculatrice : la règle de chaque épreuve de maths de juin 2027"
              headers={["Épreuve", "Calculatrice", "Où vérifier", "Mode examen"]}
              rows={[
                {
                  key: "specialite",
                  cells: [
                    "Spécialité mathématiques (Terminale générale) : écrit de 4 h, pendant les écrits de spécialité des 16, 17 et 18 juin 2027",
                    "Autorisée seulement si le sujet le prévoit. À l’oral de contrôle, elle est autorisée dans les conditions des textes en vigueur.",
                    "La page de garde du sujet, qui doit indiquer si l’usage de la calculatrice est autorisé ou interdit.",
                    "Si le sujet l’autorise : une machine avec mémoire alphanumérique ou écran graphique doit avoir un mode examen conforme, activé seulement sur instruction du surveillant.",
                  ],
                },
                {
                  key: "anticipee",
                  cells: [
                    "Épreuve anticipée de mathématiques (Première générale ou technologique) : écrit de 2 h, lundi 21 juin 2027 au matin, au titre de la session 2028 en cursus normal",
                    "Interdite sur l’ensemble de l’épreuve, automatismes comme exercices, et à l’oral de contrôle.",
                    "La définition officielle de l’épreuve : la règle est la même dans les textes des sessions 2027 et 2028.",
                    "Sans objet : même en mode examen, la calculatrice n’est pas autorisée.",
                  ],
                },
              ]}
            />

            <p className="text-sm leading-6 text-slate-600">
              Règles vérifiées le 29 septembre 2026 dans les notes de service du
              11 septembre 2026 (BO spécial n° 4 du 17 septembre 2026), la circulaire
              n° 2015-178 et le calendrier 2027 publié sur Éduscol : voir les{" "}
              <a href="#sources" className="font-semibold text-blue-900 underline">
                sources officielles
              </a>
              .
            </p>
          </div>

          <section id="verification" className="scroll-mt-24 grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <ShieldCheck className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Où vérifier le jour du Bac ?
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                En spécialité maths, la mention décisive figure sur la{" "}
                <strong>page de garde du sujet</strong>. Elle indique explicitement si
                l&apos;usage de la calculatrice est autorisé ou interdit.
              </p>
              <p>
                Relis aussi ta convocation et les consignes de ton centre pour les
                aspects pratiques, puis suis les instructions du surveillant. Ces
                documents ne remplacent pas la mention portée sur le sujet.
              </p>
            </div>
          </section>

          <section id="mode-examen" className="scroll-mt-24 rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
            <h2 className="text-3xl font-bold">Qu’est-ce que le mode examen ?</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Objectif", "Neutraliser l’accès aux données enregistrées et bloquer les communications à distance pendant l’épreuve."],
                ["Effet visible", "Un signal lumineux clignotant sur la tranche haute atteste l’activation du mode conforme."],
                ["Moment d’activation", "Uniquement sur instruction du surveillant lorsque le sujet autorise la calculatrice."],
                ["Durée", "Le mode ne doit pas pouvoir être désactivé par le candidat pendant l’épreuve."],
              ].map(([heading, text]) => (
                <article key={heading} className="rounded-xl bg-white/10 p-5">
                  <h3 className="text-xl font-bold">{heading}</h3>
                  <p className="mt-2 leading-7 text-slate-200">{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="types" className="scroll-mt-24">
            <Calculator className="h-7 w-7 text-blue-800" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-bold text-slate-950">
              Quels types de calculatrices peuvent être utilisés ?
            </h2>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-700">
              Le tableau décrit la règle générale. Dans tous les cas, le sujet doit
              d&apos;abord autoriser l&apos;usage d&apos;une calculatrice.
            </p>
            <div className="mt-7">
              <ResourceTable
                prominent
                caption="Type de matériel → autorisation → condition"
                headers={["Type", "Autorisé ?", "Condition"]}
                rows={[
                  {
                    key: "simple",
                    cells: [
                      "Calculatrice non programmable sans mémoire alphanumérique",
                      "Oui, si le sujet autorise les calculatrices",
                      "Aucun mode examen n’est requis pour ce type de machine.",
                    ],
                  },
                  {
                    key: "memory",
                    cells: [
                      "Calculatrice avec mémoire alphanumérique et/ou écran graphique",
                      "Oui, sous conditions",
                      "Elle doit disposer d’un mode examen conforme, activé sur instruction du surveillant.",
                    ],
                  },
                  {
                    key: "memory-no-mode",
                    cells: [
                      "Calculatrice avec mémoire sans mode examen conforme",
                      "Non",
                      "Elle ne fait pas partie des matériels autorisés par la circulaire.",
                    ],
                  },
                  {
                    key: "communication",
                    cells: [
                      "Téléphone, tablette, montre connectée ou appareil communicant",
                      "Non",
                      "Ce ne sont pas des calculatrices conformes au sens du texte officiel.",
                    ],
                  },
                ]}
              />
            </div>
          </section>

          <section id="marques" className="scroll-mt-24">
            <h2 className="text-3xl font-bold text-slate-950">
              NumWorks, Casio ou TI : comment activer le mode examen ?
            </h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-700">
              La conformité ne se déduit jamais de la marque seule. Vérifie ton modèle
              exact et apprends sa procédure sur la documentation du fabricant, sans
              activer le mode avant l&apos;instruction du surveillant.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                ["NumWorks", "https://www.numworks.com/fr/assistance/graphique/mode-examen/"],
                ["Casio", "https://www.casio-education.fr/questions/"],
                ["Texas Instruments", "https://education.ti.com/fr/customer-support/foire-aux-questions/mode-examen/86027"],
              ].map(([brand, href]) => (
                <a
                  key={brand}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300 hover:bg-blue-50"
                >
                  <h3 className="text-xl font-bold text-blue-950">Documentation {brand}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Consulter la procédure officielle du fabricant pour le modèle utilisé.
                  </p>
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
            <h2 className="text-3xl font-bold text-red-950">Ce qui est interdit</h2>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                "Utiliser une machine non conforme aux caractéristiques officielles.",
                "Échanger une calculatrice avec un autre candidat.",
                "Consulter une notice de fabricant pendant l’épreuve.",
                "Utiliser les fonctions de transmission ou un appareil communicant.",
                "Brancher un câble, un module ou une extension pendant l’épreuve.",
                "Garder plusieurs machines sur la table : une seule est permise à la fois.",
              ].map((item) => (
                <li key={item} className="rounded-xl bg-white/80 p-4 leading-7 text-red-950">
                  • {item}
                </li>
              ))}
            </ul>
          </section>

          <div id="veille" className="scroll-mt-24">
            <PrintableChecklist
              heading="Que préparer la veille ?"
              intro="Cette liste mélange le matériel utile et les vérifications pratiques ; elle ne transforme pas chaque élément en obligation réglementaire."
              items={checklist}
              printLabel="Imprimer la checklist calculatrice"
            />
          </div>

          <section className="grid gap-8 lg:grid-cols-[0.72fr_1fr]">
            <div>
              <BatteryCharging className="h-7 w-7 text-blue-800" aria-hidden="true" />
              <h2 className="mt-4 text-3xl font-bold text-slate-950">
                Faut-il savoir travailler sans calculatrice ?
              </h2>
            </div>
            <div className="space-y-4 text-lg leading-8 text-slate-700">
              <p>
                Oui. Même quand elle est autorisée, la calculatrice ne remplace ni le
                raisonnement, ni la justification, ni les calculs exacts demandés. Un
                sujet peut aussi limiter ou interdire son usage.
              </p>
              <p>
                Entraîne-toi à reconnaître les formules, expliquer une démarche et
                vérifier la cohérence d&apos;un résultat avant toute saisie numérique.
              </p>
            </div>
          </section>

          <ChapterInternalLinks
            title="S’entraîner avant le Bac"
            variant="cards"
            links={[
              { href: "/formules-bac-maths-terminale", label: "Formules à connaître" },
              { href: "/python-bac-maths-terminale", label: "Python en Terminale" },
              { href: "/quiz-maths-terminale-specialite", label: "Quiz sans calculatrice" },
              { href: "/exercices-type-bac-maths-terminale", label: "Exercices type Bac" },
              { href: "/coefficient-specialite-maths-bac-2027", label: "Coefficient de la spécialité maths" },
              { href: "/bac-maths-2027", label: "Ressources Bac Maths 2027" },
            ]}
          />

          <StaticFaq items={faqItems} />

          <div id="sources" className="scroll-mt-24">
            <OfficialSources
              sources={[
                {
                  href: specialtyExamNoteUrl,
                  label: "Note de service du 11 septembre 2026 : épreuve de spécialité mathématiques",
                  description: "Le sujet précise si l’usage de la calculatrice est autorisé ; à l’oral de contrôle, la calculatrice est autorisée dans les conditions des textes en vigueur.",
                },
                {
                  href: earlyMathNoteUrl,
                  label: "Note de service du 11 septembre 2026 : épreuve anticipée de mathématiques",
                  description: "Texte de la session 2028 : calculatrice non autorisée sur l’ensemble de l’épreuve écrite et à l’oral de contrôle, comme dans le texte de la session 2027.",
                },
                {
                  href: calculatorRuleUrl,
                  label: "Circulaire n° 2015-178 relative aux calculatrices aux examens",
                  description: "Autorisation par le sujet, matériels conformes, mode examen et déroulement de l’épreuve.",
                },
                {
                  href: examDates2027Url,
                  label: "Dates des examens 2027",
                  description: "Écrits de spécialité les 16, 17 et 18 juin 2027 ; épreuve anticipée de mathématiques le lundi 21 juin 2027 au matin.",
                },
                {
                  href: terminalExamsUrl,
                  label: "Épreuves terminales du baccalauréat général",
                  description: "Page Éduscol regroupant les caractéristiques des épreuves et le texte relatif aux calculatrices.",
                },
                {
                  href: earlyMathUrl,
                  label: "Présentation de l’épreuve anticipée de mathématiques",
                  description: "Éduscol précise l’interdiction de la calculatrice sur l’ensemble de cette épreuve de Première.",
                },
              ]}
            />
          </div>

          <p className="text-sm leading-6 text-slate-600">
            Textes officiels vérifiés le 29 septembre 2026. Le jour de l&apos;épreuve,
            la mention du sujet et les instructions du surveillant restent
            déterminantes.
          </p>

          <Link href="/programme-maths-terminale" className="inline-flex font-bold text-blue-900 underline">
            Revenir au programme de Terminale 2026-2027
          </Link>
        </div>
      </section>
    </SeoPageLayout>
  );
}
