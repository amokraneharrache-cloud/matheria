import type { Metadata } from "next";
import Link from "next/link";
import { GuaranteeNote } from "@/components/marketing/GuaranteeNote";
import { UrgencyBanner } from "@/components/marketing/UrgencyBanner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LegalFooterLinks } from "@/components/legal/LegalFooterLinks";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { CheckCircle2, BrainCircuit, Target, TrendingUp, GraduationCap, BookOpen, School, CalendarCheck, ClipboardList } from "lucide-react";
import {
  PACK_REVISION_EXPRESS_LABEL,
  PACK_REVISION_EXPRESS_OFFER_ID,
  PACK_REVISION_EXPRESS_PRICE,
} from "@/lib/offers";
import { absoluteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "SprintMaths | Réviser le brevet et le bac de maths",
  },
  description:
    "SprintMaths aide les élèves à réviser les maths avec des exercices ciblés, un programme par chapitre, un plan de révision et un suivi de progression.",
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    title: "SprintMaths | Réviser le brevet et le bac de maths",
    description:
      "Exercices ciblés, plan de révision, programme par chapitre et progression pour préparer le brevet, le bac de Première et le bac Terminale.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
};

export default function Home() {
  const stripePaymentLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  const diagnosticClickParams = { source_page: "/" };
  const planningClickParams = {
    source_page: "/",
    lead_magnet: "planning_bac_maths_2027",
    level: "terminale",
  };
  const checkoutParams = {
    source_page: "/",
    offer: PACK_REVISION_EXPRESS_OFFER_ID,
    price: PACK_REVISION_EXPRESS_PRICE,
    currency: "EUR",
    payment_provider: "stripe",
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="font-bold text-xl text-blue-900">SprintMaths</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/connexion" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Se connecter
            </Link>
            <TrackedLink
              href="/diagnostic"
              eventName="click_diagnostic"
              eventParams={{
                ...diagnosticClickParams,
                cta_location: "home_header",
              }}
            >
              <Button size="sm" className="hidden sm:flex">
                Faire le diagnostic gratuit
              </Button>
            </TrackedLink>
          </div>
        </div>
      </header>
      <UrgencyBanner sourcePage="/" />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="px-4 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto max-w-4xl">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-100 text-blue-900 mb-6">
              {SITE_TAGLINE}
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
              Réviser les maths du Brevet au Bac avec un <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-violet-600">parcours structuré</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
              Plan de révision, exercices ciblés et progression par chapitre. À quelques semaines de l&apos;examen, SprintMaths aide votre enfant à savoir quoi réviser, à s&apos;entraîner en sessions courtes et à progresser sans conflit à la maison. <span className="block mt-2 text-blue-800 font-medium">Pour Terminale : exercices guidés type bac, méthodes et progression par chapitre.</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <TrackedLink
                href="/diagnostic"
                className="w-full sm:w-auto"
                eventName="click_diagnostic"
                eventParams={{
                  ...diagnosticClickParams,
                  cta_location: "home_hero_primary",
                }}
              >
                <Button size="lg" className="w-full sm:w-auto">
                  Faire le diagnostic gratuit
                </Button>
              </TrackedLink>
              <TrackedLink
                href="/planning-revision-bac-maths"
                className="w-full sm:w-auto"
                eventName="click_lead_magnet_planning"
                eventParams={{
                  ...planningClickParams,
                  cta_location: "home_hero_planning",
                }}
              >
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Recevoir le planning Bac Maths 2027
                </Button>
              </TrackedLink>
            </div>
            <Link href="/connexion" className="text-sm font-medium text-slate-500 hover:text-slate-800 underline underline-offset-4 block mt-4">
              J&apos;ai déjà un espace élève — Se connecter
            </Link>
          </div>
        </section>

        {/* SEO Internal Links Section */}
        <section className="px-4 py-16 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900">Révisions par objectif</h2>
              <p className="mt-3 text-slate-600 text-lg">
                Choisissez le parcours adapté à l&apos;examen préparé par votre enfant.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  href: "/bac-maths-2027",
                  icon: GraduationCap,
                  title: "Bac Maths 2027",
                  text: "Diagnostic, planning, exercices type bac guidés et Pack Révision Express pour la Terminale.",
                },
                {
                  href: "/planning-revision-bac-maths",
                  icon: CalendarCheck,
                  title: "Planning gratuit",
                  text: "Un planning Bac Maths 2027 sur 30 jours pour organiser les chapitres et les entraînements.",
                },
                {
                  href: "/exercices-type-bac-maths-terminale",
                  icon: Target,
                  title: "Exercices type bac",
                  text: "Des exercices guidés étape par étape pour apprendre à démarrer et conclure un raisonnement.",
                },
                {
                  href: "/sujets-type-bac-maths-terminale",
                  icon: ClipboardList,
                  title: "Sujets type bac",
                  text: "Des sujets type Bac Maths Terminale avec corrigé guidé pour s'entraîner sans les confondre avec des annales officielles.",
                },
                {
                  href: "/bac-terminale-maths",
                  icon: GraduationCap,
                  title: "Bac Terminale",
                  text: "Exercices guidés type bac, méthodes Terminale, programme par chapitre et plan de révision.",
                },
                {
                  href: "/bac-premiere-maths",
                  icon: BookOpen,
                  title: "Bac Première",
                  text: "Automatismes, fonctions, second degré, dérivation, probabilités et sessions ciblées.",
                },
                {
                  href: "/brevet-maths",
                  icon: School,
                  title: "Brevet",
                  text: "Fractions, équations, fonctions, géométrie, Pythagore, Thalès et progression par chapitre.",
                },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="group block">
                  <Card className="h-full border-slate-200 transition-colors group-hover:border-blue-200 group-hover:bg-blue-50/40">
                    <CardContent className="p-6">
                      <item.icon className="h-7 w-7 text-blue-800" />
                      <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-2 text-slate-600">{item.text}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="px-4 py-20 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi les maths bloquent votre enfant ?</h2>
              <p className="text-slate-600 text-lg">Les méthodes classiques ne sont pas toujours adaptées à leur rythme.</p>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              <Card className="bg-slate-50 border-none shadow-none">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Lacunes invisibles</h3>
                  <p className="text-slate-600">Difficile de savoir exactement ce qui bloque sans une analyse précise des erreurs passées.</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-none">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Manque de méthode</h3>
                  <p className="text-slate-600">Comprendre le cours c&apos;est bien, savoir l&apos;appliquer face à un exercice d&apos;examen c&apos;est mieux.</p>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-none shadow-none">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">Perte de motivation</h3>
                  <p className="text-slate-600">Des révisions trop longues et non ciblées finissent par décourager l&apos;élève.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="px-4 py-20 bg-blue-900 text-white rounded-3xl mx-2 sm:mx-8 my-8">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-12">La méthode SprintMaths en 3 étapes</h2>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4">1</div>
                <h3 className="text-xl font-bold mb-2">Diagnostic rapide</h3>
                <p className="text-blue-200">L’élève indique son objectif, son niveau ressenti et ses principales difficultés pour démarrer sur les bonnes priorités.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4">2</div>
                <h3 className="text-xl font-bold mb-2">Sessions courtes</h3>
                <p className="text-blue-200">Des sessions courtes de 10 minutes pour garder le rythme sans décourager l’élève.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-2xl font-bold mb-4">3</div>
                <h3 className="text-xl font-bold mb-2">Progression visible</h3>
                <p className="text-blue-200">L&apos;élève voit son niveau monter jusqu&apos;au jour de l&apos;examen.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="px-4 py-20 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Conçu pour l&apos;attention des élèves</h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-lg">Format mobile-first adapté à leurs usages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-lg">Corrections expliquées pas-à-pas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                    <span className="text-slate-700 text-lg">Zéro distraction, focus total sur les révisions</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full max-w-xs mx-auto">
                <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
                  <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                  <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                  <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                  <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white flex flex-col pt-8 px-4">
                    <div className="w-full bg-blue-50 rounded-xl p-4 mb-4">
                      <div className="font-bold text-blue-900 mb-1">Session du jour</div>
                      <div className="text-sm text-blue-700">Fractions & Équations</div>
                    </div>
                    <div className="space-y-3">
                      <div className="w-full h-24 bg-slate-100 rounded-xl flex items-center justify-center">
                        <span className="text-slate-400 font-medium">Question 1/5</span>
                      </div>
                      <div className="w-full h-12 bg-slate-100 rounded-xl"></div>
                      <div className="w-full h-12 bg-slate-100 rounded-xl"></div>
                      <div className="w-full h-12 bg-blue-600 rounded-xl mt-4 flex items-center justify-center">
                        <span className="text-white font-bold">Valider</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="px-4 py-20 bg-slate-50">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pack Bac Maths 2027, clair et sans abonnement</h2>
            <p className="text-lg text-slate-600 mb-12">
              Le Pack Révision Express Bac Maths 2027 coûte {PACK_REVISION_EXPRESS_PRICE} € en paiement unique, sans abonnement.
            </p>
            
            <Card className="max-w-md mx-auto border-2 border-blue-900 shadow-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-900 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                BAC MATHS 2027
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{PACK_REVISION_EXPRESS_LABEL}</h3>
                <div className="flex items-end justify-center mb-3">
                  <span className="text-5xl font-extrabold text-slate-900">{PACK_REVISION_EXPRESS_PRICE} €</span>
                </div>
                <p className="text-slate-600 mb-6 font-medium">
                  Paiement unique. Accès au parcours Bac Maths 2027. Pas d’abonnement.
                </p>
                <ul className="space-y-4 mb-8 text-left">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Bilan de départ personnalisé</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Sessions de révision incluses jusqu&apos;à l&apos;examen</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Corrections détaillées et expliquées</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <span>Accessible sur téléphone, tablette et PC</span>
                  </li>
                </ul>
                <GuaranteeNote
                  className="mb-6"
                  sourcePage="/"
                  variant="compact"
                />
                {stripePaymentLink ? (
                  <div className="space-y-2 w-full">
                    <TrackedLink
                      href={stripePaymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                      eventName="stripe_click"
                      eventParams={{ ...checkoutParams, cta_location: "home_pricing" }}
                    >
                      <Button size="lg" className="w-full text-lg h-14">
                        Accéder au pack à {PACK_REVISION_EXPRESS_PRICE} €
                      </Button>
                    </TrackedLink>
                    <p className="text-xs text-center text-slate-500 font-medium">
                      Paiement sécurisé par Stripe. Paiement unique, sans abonnement.
                    </p>
                  </div>
                ) : (
                  <TrackedLink
                    href="/diagnostic"
                    className="w-full block"
                    eventName="click_diagnostic"
                    eventParams={{
                      ...diagnosticClickParams,
                      cta_location: "home_pricing_fallback",
                    }}
                  >
                    <Button size="lg" className="w-full text-lg h-14">
                      Faire le diagnostic gratuit
                    </Button>
                  </TrackedLink>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-4 py-20 bg-white">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Questions fréquentes</h2>
            <div className="space-y-6">
              {[
                { q: "Mon enfant est très en difficulté, est-ce adapté ?", a: "Oui, notre diagnostic initial permet de repérer précisément les bases manquantes pour proposer des exercices adaptés, sans le décourager." },
                { q: "Dois-je payer un abonnement tous les mois ?", a: `Non. Le Pack Révision Express Bac Maths 2027 coûte ${PACK_REVISION_EXPRESS_PRICE} € en paiement unique, sans abonnement.` },
                { q: "Sur quels supports ça fonctionne ?", a: "SprintMaths est une application web accessible directement depuis le navigateur de n'importe quel smartphone, tablette ou ordinateur." }
              ].map((faq) => (
                <Card key={faq.q} className="border border-slate-200">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 flex justify-between items-center">
                      {faq.q}
                    </h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20 bg-blue-900 text-white text-center">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Prêt à aider votre enfant à progresser avant l’examen ?</h2>
            <p className="text-xl text-blue-200 mb-10">Commencez dès aujourd&apos;hui par une évaluation gratuite de son niveau.</p>
            <TrackedLink
              href="/diagnostic"
              eventName="click_diagnostic"
              eventParams={{
                ...diagnosticClickParams,
                cta_location: "home_final_cta",
              }}
            >
              <Button size="lg" variant="secondary" className="text-lg px-10 h-14">
                Faire le diagnostic gratuit
              </Button>
            </TrackedLink>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 px-4 text-center">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 bg-slate-700 rounded text-xs flex items-center justify-center text-white font-bold">S</div>
            <span className="font-bold text-white">SprintMaths</span>
          </div>
          <p className="mb-4">© {new Date().getFullYear()} SprintMaths. Tous droits réservés.</p>
          <LegalFooterLinks
            className="gap-4 sm:gap-6"
            linkClassName="hover:text-white transition-colors"
          />
        </div>
      </footer>
    </div>
  );
}
