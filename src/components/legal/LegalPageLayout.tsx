import Link from "next/link";
import { ReactNode } from "react";
import { LegalFooterLinks } from "@/components/legal/LegalFooterLinks";

type LegalPageLayoutProps = {
  title: string;
  description: string;
  updatedAt?: string;
  children: ReactNode;
};

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="border-t border-slate-200 py-8 first:border-t-0 first:pt-0">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-slate-700">
        {children}
      </div>
    </section>
  );
}

export function LegalPageLayout({
  title,
  description,
  updatedAt = "10 mai 2026",
  children,
}: LegalPageLayoutProps) {
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
            href="/diagnostic"
            className="rounded-full bg-blue-900 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800"
          >
            Diagnostic
          </Link>
        </div>
      </header>

      <main className="px-4 py-12 sm:py-16">
        <article className="mx-auto max-w-4xl">
          <div className="mb-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-900">
              Informations légales
            </p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700">
              {description}
            </p>
            <p className="mt-4 text-sm font-medium text-slate-500">
              Dernière mise à jour : {updatedAt}
            </p>
          </div>

          <div className="mb-10 rounded-lg border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
            Ces informations sont fournies à titre de transparence et peuvent
            être mises à jour pour rester alignées avec le service et le cadre
            applicable.
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            {children}
          </div>
        </article>
      </main>

      <footer className="border-t border-slate-200 bg-slate-950 px-4 py-10 text-center text-sm text-slate-400">
        <div className="mx-auto max-w-5xl">
          <Link href="/" className="inline-flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-700 text-xs font-bold text-white">
              S
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
