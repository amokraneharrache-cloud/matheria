import Link from "next/link";
import { cn } from "@/lib/utils";

type LegalFooterLinksProps = {
  className?: string;
  linkClassName?: string;
};

const footerLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/politique-confidentialite", label: "Confidentialité" },
  { href: "/remboursement", label: "Remboursement" },
];

export function LegalFooterLinks({
  className,
  linkClassName,
}: LegalFooterLinksProps) {
  return (
    <nav
      aria-label="Liens légaux"
      className={cn("flex flex-wrap items-center justify-center gap-4 text-sm", className)}
    >
      {footerLinks.map((link) => (
        <Link key={link.href} href={link.href} className={linkClassName}>
          {link.label}
        </Link>
      ))}
      <a href="mailto:contact@matheria.fr" className={linkClassName}>
        Contact
      </a>
    </nav>
  );
}
