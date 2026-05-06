import Link from "next/link";
import { ReactNode } from "react";

type SeoPageLayoutProps = {
  children: ReactNode;
};

const navLinks = [
  { href: "/bac-terminale-maths", label: "Bac Terminale" },
  { href: "/bac-premiere-maths", label: "Bac Première" },
  { href: "/brevet-maths", label: "Brevet" },
  { href: "/articles", label: "Articles" },
  { href: "/diagnostic", label: "Diagnostic" },
];

export function SeoPageLayout({ children }: SeoPageLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-900">
              <span className="text-xl font-bold text-white">M</span>
            </div>
            <span className="text-xl font-bold text-blue-900">Matheria</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-600 md:flex">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-blue-900">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/diagnostic"
            className="rounded-full bg-blue-900 px-4 py-2 text-sm font-bold text-white hover:bg-blue-800"
          >
            Diagnostic
          </Link>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-slate-200 bg-slate-950 px-4 py-10 text-center text-sm text-slate-400">
        <div className="mx-auto max-w-6xl">
          <Link href="/" className="inline-flex items-center justify-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-700 text-xs font-bold text-white">
              M
            </div>
            <span className="font-bold text-white">Matheria</span>
          </Link>
          <p className="mt-4">
            Révisions de maths pour le brevet, le bac de Première et le bac Terminale.
          </p>
        </div>
      </footer>
    </div>
  );
}
