import type { Metadata } from "next";
import Link from "next/link";
import { LegalFooterLinks } from "@/components/legal/LegalFooterLinks";
import { TrackingPreferenceControls } from "@/components/tracking/TrackingPreferenceControls";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

const pagePath = "/preferences-confidentialite";

export const metadata: Metadata = {
  title: "Préférences confidentialité",
  description:
    "Gérer la préférence locale de mesure d’audience SprintMaths sur cet appareil.",
  alternates: {
    canonical: absoluteUrl(pagePath),
  },
  openGraph: {
    title: `Préférences confidentialité | ${SITE_NAME}`,
    description:
      "Informations et préférence locale pour la mesure d’audience SprintMaths.",
    url: absoluteUrl(pagePath),
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PreferencesConfidentialitePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-blue-900">SprintMaths</span>
          </Link>
          <Link
            href="/politique-confidentialite"
            className="text-sm font-semibold text-slate-600 hover:text-slate-950"
          >
            Politique de confidentialité
          </Link>
        </div>
      </header>

      <main className="px-4 py-12 sm:py-16">
        <article className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-900">
            Confidentialité
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
            Préférences confidentialité
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            SprintMaths peut mesurer les grandes étapes du parcours public afin de
            comprendre quelles campagnes et quelles pages aident les parents à
            découvrir le service.
          </p>

          <section className="mt-10 space-y-5 text-base leading-7 text-slate-700">
            <h2 className="text-2xl font-bold text-slate-950">
              Mesure d’audience
            </h2>
            <p>
              La mesure d’audience porte sur des événements simples du tunnel :
              arrivée sur la landing page, démarrage du diagnostic, diagnostic
              terminé, affichage de l’offre, clic vers le paiement Stripe et
              création réussie de l’espace élève.
            </p>
            <p>
              Les paramètres UTM de campagne peuvent être conservés localement
              sur l’appareil pour relier ces étapes à une source marketing,
              lorsque l’adresse d’arrivée en contient.
            </p>
          </section>

          <section className="mt-10 space-y-5 text-base leading-7 text-slate-700">
            <h2 className="text-2xl font-bold text-slate-950">
              Campagnes publicitaires futures
            </h2>
            <p>
              SprintMaths prépare une compatibilité avec Google, Meta, TikTok et
              Snapchat pour mesurer de futures campagnes publicitaires. Les
              données pédagogiques de l’élève ne sont pas envoyées volontairement
              à ces régies.
            </p>
            <p>
              Sont exclus des événements publicitaires : pseudo ou prénom de
              l’élève, email, scores détaillés, notes indicatives /20, chapitres
              faibles et historique pédagogique.
            </p>
          </section>

          <section className="mt-10 space-y-5">
            <h2 className="text-2xl font-bold text-slate-950">
              Préférence locale
            </h2>
            <p className="text-base leading-7 text-slate-700">
              Cette préférence s’applique uniquement à ce navigateur et à cet
              appareil.
            </p>
            <TrackingPreferenceControls />
          </section>
        </article>
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 px-4 py-10 text-center text-sm text-slate-400">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="inline-flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-700 text-xs font-bold text-white">
              M
            </div>
            <span className="font-bold text-white">SprintMaths</span>
          </Link>
          <p className="mt-4">© {new Date().getFullYear()} SprintMaths. Tous droits réservés.</p>
          <LegalFooterLinks
            className="mt-5 gap-4 sm:gap-6"
            linkClassName="hover:text-white transition-colors"
          />
        </div>
      </footer>
    </div>
  );
}
