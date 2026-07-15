import type { Metadata } from "next";
import { Archive, ArrowRight, CheckCircle2, History } from "lucide-react";
import { Bac2026ProductDemo } from "@/components/marketing/Bac2026ProductDemo";
import { InternalLinks } from "@/components/marketing/InternalLinks";
import { SeoPageLayout } from "@/components/marketing/SeoPageLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import {
  PACK_REVISION_EXPRESS_LABEL,
  PACK_REVISION_EXPRESS_OFFER_ID,
  PACK_REVISION_EXPRESS_PRICE,
} from "@/lib/offers";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

const pagePath = "/bac-maths-terminale-2026";

const description =
  "Archive de la page Bac Maths 2026 de SprintMaths. L’offre associée n’est plus active ; la préparation actuelle concerne le Bac Maths 2027.";

const archiveHighlights = [
  "Exercices de Terminale organisés par chapitre",
  "Exercices type bac guidés étape par étape",
  "Fiches méthodes et plan de révision",
  "Repères indicatifs de progression dans l’interface",
];

export const metadata: Metadata = {
  title: {
    absolute: "Archive Bac Maths 2026 | SprintMaths",
  },
  description,
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: "Archive Bac Maths 2026 | SprintMaths",
    description,
    url: absoluteUrl(pagePath),
    siteName: SITE_NAME,
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      noimageindex: true,
    },
  },
};

const currentOfferTrackingParams = {
  source_page: pagePath,
  destination_page: "/bac-maths-2027#offre",
  offer: PACK_REVISION_EXPRESS_OFFER_ID,
  price: PACK_REVISION_EXPRESS_PRICE,
  currency: "EUR",
};

export default function BacMathsTerminale2026ArchivePage() {
  return (
    <SeoPageLayout showUrgencyBanner={false} urgencySourcePage={pagePath}>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", path: "/" },
          { name: "Archive Bac Maths 2026", path: pagePath },
        ])}
      />

      <section className="border-b border-amber-200 bg-amber-50 px-4 py-14 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-3 py-1 text-sm font-bold text-amber-950">
            <Archive className="h-4 w-4" />
            Archive Bac 2026
          </p>
          <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            Archive Bac Maths 2026 — pour l&apos;offre actuelle, voir Bac Maths 2027
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
            Cette URL est conservée pour ne pas casser les anciens liens. L&apos;offre
            commerciale et le code associés à la session 2026 ne sont plus actifs.
            Aucun achat 2026 n&apos;est proposé sur cette page.
          </p>
          <TrackedLink
            href="/bac-maths-2027#offre"
            eventName="click_bac2027_offer"
            eventParams={{
              ...currentOfferTrackingParams,
              cta_location: "bac2026_archive_hero",
            }}
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
          >
            Voir le Pack Bac Maths 2027 à {PACK_REVISION_EXPRESS_PRICE} €
            <ArrowRight className="h-4 w-4" />
          </TrackedLink>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl space-y-14">
          <section className="grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-start">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
                <History className="h-4 w-4" />
                Contenu historique
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-950">
                Ce que présentait la page 2026
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                Les éléments ci-dessous sont conservés à titre d&apos;archive produit.
                Ils décrivent l&apos;interface présentée pour la session 2026 et ne
                constituent pas une offre commerciale active.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {archiveHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                  <span className="font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <Bac2026ProductDemo />

          <section className="rounded-2xl border border-blue-100 bg-blue-50 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-900">
              Offre actuelle
            </p>
            <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-950">
                  {PACK_REVISION_EXPRESS_LABEL}
                </h2>
                <p className="mt-3 leading-7 text-slate-700">
                  {PACK_REVISION_EXPRESS_PRICE} € en paiement unique, sans abonnement.
                  La page Bac Maths 2027 présente le contenu et les conditions de
                  l&apos;offre actuellement proposée.
                </p>
              </div>
              <TrackedLink
                href="/bac-maths-2027#offre"
                eventName="click_bac2027_offer"
                eventParams={{
                  ...currentOfferTrackingParams,
                  cta_location: "bac2026_archive_current_offer",
                }}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-blue-900 px-5 py-3 text-center font-bold text-white hover:bg-blue-800"
              >
                Voir Bac Maths 2027
                <ArrowRight className="h-4 w-4" />
              </TrackedLink>
            </div>
          </section>

          <InternalLinks
            currentPath={pagePath}
            title="Continuer vers les ressources actuelles"
          />
        </div>
      </section>
    </SeoPageLayout>
  );
}
