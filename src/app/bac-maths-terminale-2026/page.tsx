import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpenCheck,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  LineChart,
  ShieldCheck,
  Smartphone,
  Target,
} from "lucide-react";
import { Bac2026ProductDemo } from "@/components/marketing/Bac2026ProductDemo";
import { FaqAccordion } from "@/components/marketing/FaqAccordion";
import { GuaranteeNote } from "@/components/marketing/GuaranteeNote";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { TestimonialsPlaceholder } from "@/components/marketing/TestimonialsPlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Button } from "@/components/ui/button";
import {
  BAC_2026_OFFER_PRICE,
  BAC_2026_PROMO_CODE,
  PACK_REVISION_EXPRESS_PRICE,
} from "@/lib/offers";
import { absoluteUrl, CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd, type FaqItem } from "@/lib/seo";

const pagePath = "/bac-maths-terminale-2026";

const description =
  "Prépare le bac de maths 2026 avec des exercices type bac guidés étape par étape, des fiches méthodes, un plan de révision et une note indicative /20. Offre Bac 2026 à 29 € avec le code BAC2026.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Révision Bac Maths 2026 — exercices guidés étape par étape | SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title:
      "Révision Bac Maths 2026 — exercices guidés étape par étape | SprintMaths",
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

const faqItems: FaqItem[] = [
  {
    question: "SprintMaths est-il adapté aux élèves moyens en maths ?",
    answer:
      "Oui. SprintMaths vise surtout les élèves qui veulent reprendre confiance et s’entraîner sur les méthodes essentielles. Les exercices guidés aident à avancer étape par étape, même quand on ne sait pas par où commencer.",
  },
  {
    question: "Est-ce que SprintMaths remplace un professeur particulier ?",
    answer:
      "Non. SprintMaths ne remplace pas un professeur. C’est un outil de révision autonome pour s’entraîner régulièrement, revoir les méthodes et travailler les exercices type bac à son rythme.",
  },
  {
    question: "Combien de temps faut-il travailler par jour ?",
    answer:
      "L’objectif est de favoriser des sessions courtes mais régulières. Même 10 à 20 minutes par jour peuvent aider à reprendre le rythme et à cibler les chapitres importants.",
  },
  {
    question: "La note /20 est-elle une vraie prédiction de ma note au bac ?",
    answer:
      "Non. La note virtuelle /20 est indicative. Elle sert à se situer dans SprintMaths et à suivre sa progression, mais elle ne garantit pas la note obtenue le jour de l’examen.",
  },
  {
    question: "Est-ce que ça fonctionne sur téléphone ?",
    answer:
      "Oui. SprintMaths est pensé mobile-first pour permettre à l’élève de réviser facilement sur téléphone, entre deux cours ou à la maison.",
  },
  {
    question: "Comment reçoit-on l’accès après paiement ?",
    answer:
      "Après le paiement, un code d’accès unique est envoyé automatiquement par email. Ce code permet de créer l’espace élève et de se reconnecter ensuite.",
  },
  {
    question: "Combien coûte SprintMaths ?",
    answer:
      "Le Pack Révision Express est à 39 €. Pour l’offre Bac 2026, le code BAC2026 permet de passer à 29 €.",
  },
  {
    question: "Y a-t-il un abonnement ?",
    answer:
      "Non. Le Pack Révision Express est un paiement unique, sans abonnement.",
  },
  {
    question: "Peut-on demander un remboursement ?",
    answer:
      `Oui. Vous pouvez contacter ${CONTACT_EMAIL} dans les 7 jours suivant l’achat si l’accès ne correspond pas à vos attentes.`,
  },
  {
    question: "Est-ce que SprintMaths garantit la réussite au bac ?",
    answer:
      "Non. Aucun outil ne peut garantir une réussite ou une note. SprintMaths aide à structurer les révisions et à s’entraîner, mais le résultat dépend du travail de l’élève et des conditions de l’examen.",
  },
];

const packItems = [
  "Exercices par chapitre",
  "Mode Bac Terminale",
  "Exercices guidés type bac",
  "Sujets type bac",
  "Note indicative /20",
  "Fiches méthodes",
  "Plan de révision",
  "Progression",
];

const audienceItems = [
  "Élève de Terminale qui révise la spécialité maths",
  "Élève qui ne sait pas par où commencer",
  "Parent qui veut donner un cadre de révision",
  "Élève qui veut faire des sessions courtes sur téléphone",
];

export default function BacMathsTerminale2026Page() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  const primaryCtaHref = stripePaymentLink ?? "#prix";
  const checkoutCtaHref = stripePaymentLink ?? "/diagnostic";
  const checkoutTarget = stripePaymentLink ? "_blank" : undefined;
  const checkoutRel = stripePaymentLink ? "noopener noreferrer" : undefined;
  const primaryCtaEventName = stripePaymentLink ? "stripe_click" : "click_offer";
  const checkoutCtaEventName = stripePaymentLink ? "stripe_click" : "click_diagnostic";
  const primaryCtaParams = {
    source_page: pagePath,
    offer: "bac2026",
    price: BAC_2026_OFFER_PRICE,
    currency: "EUR",
    coupon_code: BAC_2026_PROMO_CODE,
    payment_provider: stripePaymentLink ? "stripe" : undefined,
    cta_location: "bac2026_hero",
  };
  const pricingCtaParams = {
    ...primaryCtaParams,
    cta_location: "bac2026_pricing",
  };

  return (
    <SeoPageLayout urgencySourcePage={pagePath}>
      <JsonLd
        data={[
          productJsonLd(pagePath, { price: String(BAC_2026_OFFER_PRICE) }),
          faqJsonLd(faqItems),
          breadcrumbJsonLd([
            { name: "Accueil", path: "/" },
            { name: "Révision Bac Maths 2026", path: pagePath },
          ]),
        ]}
      />

      <section className="bg-gradient-to-b from-amber-50 via-white to-white px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-900">
              Terminale • Bac de maths 2026 • Mobile-first
            </p>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Révision Bac Maths 2026 : avance étape par étape sur les exercices type bac
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              Tu bloques devant les exercices type bac ? SprintMaths te guide
              étape par étape sur téléphone, avec méthodes, progression et note
              indicative /20.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-slate-800">
              <span className="rounded-full bg-emerald-50 px-3 py-2 text-emerald-800">
                {BAC_2026_OFFER_PRICE} € avec {BAC_2026_PROMO_CODE}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-2">
                Paiement unique
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-2">
                Garantie 7 jours
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={primaryCtaHref}
                target={checkoutTarget}
                rel={checkoutRel}
                eventName={primaryCtaEventName}
                eventParams={primaryCtaParams}
                className="w-full sm:w-auto"
              >
                <Button size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  Commencer ma révision Bac 2026
                </Button>
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_diagnostic"
                eventParams={{
                  source_page: pagePath,
                  cta_location: "bac2026_hero_secondary",
                }}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  Faire le diagnostic gratuit
                </Button>
              </TrackedLink>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-900">
                <CalendarDays className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase text-slate-500">
                  Offre Bac 2026
                </p>
                <p className="text-2xl font-black text-slate-950">
                  {BAC_2026_OFFER_PRICE} € avec {BAC_2026_PROMO_CODE}
                </p>
              </div>
            </div>
            <p className="mt-4 text-slate-700">
              Prix public : {PACK_REVISION_EXPRESS_PRICE} €. Le code public Bac
              2026 permet de profiter de l’offre à {BAC_2026_OFFER_PRICE} €.
            </p>
            <GuaranteeNote
              className="mt-5"
              sourcePage={pagePath}
              variant="compact"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-amber-200 bg-amber-50 px-4 py-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-lg font-bold text-amber-950">
            Offre Bac 2026 : {BAC_2026_OFFER_PRICE} € avec le code{" "}
            {BAC_2026_PROMO_CODE} au lieu de {PACK_REVISION_EXPRESS_PRICE} €.
          </p>
          <Link
            href="#prix"
            className="inline-flex items-center justify-center rounded-full bg-amber-900 px-5 py-3 text-sm font-bold text-white hover:bg-amber-800"
          >
            Voir le prix
          </Link>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-16">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Pour qui ?
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Un cadre de révision pour la dernière ligne droite
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                SprintMaths est pensé pour aider l&apos;élève à transformer ses
                révisions en sessions courtes, concrètes et régulières.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {audienceItems.map((item) => (
                <article key={item} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <Target className="h-5 w-5 text-blue-800" />
                  <p className="mt-3 font-semibold leading-6 text-slate-800">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Contenu du pack
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Ce que contient le Pack Révision Express
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Les élèves peuvent alterner exercices courts, méthodes et sujets
                type bac guidés pour travailler le raisonnement sans se limiter à
                une banque de QCM.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {packItems.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl bg-slate-50 p-4">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                    <span className="font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-blue-950 p-6 text-white">
              <GraduationCap className="h-7 w-7 text-blue-200" />
              <h3 className="mt-4 text-2xl font-bold">
                Pourquoi ce n&apos;est pas juste une banque de QCM
              </h3>
              <p className="mt-4 leading-7 text-blue-100">
                SprintMaths est conçu pour guider l’élève dans le raisonnement :
                chaque exercice guidé décompose les étapes pour aider à
                comprendre la méthode.
              </p>
            </div>
          </section>

          <Bac2026ProductDemo />

          <section
            id="prix"
            className="grid gap-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-[0.9fr_1fr] lg:items-center"
          >
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                Prix
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Un paiement unique, pas d&apos;abonnement
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Accès immédiat après paiement via code envoyé automatiquement
                par email. Le code {BAC_2026_PROMO_CODE} permet de passer de{" "}
                {PACK_REVISION_EXPRESS_PRICE} € à {BAC_2026_OFFER_PRICE} €.
              </p>
            </div>
            <div className="rounded-2xl border-2 border-blue-900 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold uppercase text-blue-900">
                Pack Révision Express
              </p>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-black text-slate-950">
                  {BAC_2026_OFFER_PRICE} €
                </span>
                <span className="pb-2 text-lg font-bold text-slate-400 line-through">
                  {PACK_REVISION_EXPRESS_PRICE} €
                </span>
              </div>
              <p className="mt-3 font-semibold text-slate-700">
                Code {BAC_2026_PROMO_CODE} : {BAC_2026_OFFER_PRICE} € au lieu
                de {PACK_REVISION_EXPRESS_PRICE} €.
              </p>
              <ul className="mt-5 space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                  Garantie 7 jours.
                </li>
                <li className="flex gap-2">
                  <Smartphone className="h-5 w-5 shrink-0 text-blue-800" />
                  Pensé pour réviser sur téléphone.
                </li>
                <li className="flex gap-2">
                  <LineChart className="h-5 w-5 shrink-0 text-amber-700" />
                  Note /20 indicative pour suivre ta progression.
                </li>
              </ul>
              <TrackedLink
                href={checkoutCtaHref}
                target={checkoutTarget}
                rel={checkoutRel}
                eventName={checkoutCtaEventName}
                eventParams={pricingCtaParams}
                className="mt-6 block w-full"
              >
                <Button size="lg" className="w-full">
                  Profiter de l&apos;offre à {BAC_2026_OFFER_PRICE} €
                </Button>
              </TrackedLink>
              <p className="mt-3 text-center text-xs font-medium text-slate-500">
                Paiement sécurisé par Stripe. Paiement unique, sans abonnement.
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: ClipboardList,
                title: "Plan de révision",
                text: "Un cadre pour organiser les sessions et cibler les chapitres importants.",
              },
              {
                icon: BookOpenCheck,
                title: "Méthodes",
                text: "Des fiches courtes pour revoir les étapes avant de s'entraîner.",
              },
              {
                icon: LineChart,
                title: "Repères de progression",
                text: "Des scores et une note indicative /20 pour suivre le travail dans SprintMaths.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-xl bg-slate-50 p-5">
                <item.icon className="h-6 w-6 text-blue-800" />
                <h3 className="mt-3 text-lg font-bold text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.text}</p>
              </article>
            ))}
          </section>

          <TestimonialsPlaceholder />
          <FaqAccordion items={faqItems} sourcePage={pagePath} />

          <section className="rounded-2xl bg-blue-950 p-8 text-center text-white">
            <h2 className="text-3xl font-bold">
              Commencer les révisions Bac 2026 maintenant
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-blue-100">
              Tu bloques devant les exercices type bac ? SprintMaths te guide
              étape par étape sur téléphone.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <TrackedLink
                href={checkoutCtaHref}
                target={checkoutTarget}
                rel={checkoutRel}
                eventName={checkoutCtaEventName}
                eventParams={{
                  ...primaryCtaParams,
                  cta_location: "bac2026_final",
                }}
                className="w-full sm:w-auto"
              >
                <Button variant="secondary" size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  Commencer ma révision Bac 2026
                </Button>
              </TrackedLink>
              <TrackedLink
                href="/diagnostic"
                eventName="click_diagnostic"
                eventParams={{
                  source_page: pagePath,
                  cta_location: "bac2026_final_secondary",
                }}
                className="w-full sm:w-auto"
              >
                <Button variant="outline" size="lg" className="w-full px-4 text-base sm:w-auto sm:px-8 sm:text-lg">
                  Faire le diagnostic gratuit
                </Button>
              </TrackedLink>
            </div>
          </section>

          <InternalLinks currentPath={pagePath} />
        </div>
      </section>
    </SeoPageLayout>
  );
}
