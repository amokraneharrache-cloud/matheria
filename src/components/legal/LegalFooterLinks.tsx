import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";
import { cn } from "@/lib/utils";

type LegalFooterLinksProps = {
  className?: string;
  linkClassName?: string;
};

const footerLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgv", label: "CGV" },
  { href: "/politique-confidentialite", label: "Confidentialité" },
  { href: "/preferences-confidentialite", label: "Préférences confidentialité" },
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
      <a href={`mailto:${CONTACT_EMAIL}`} className={linkClassName}>
        Contact
      </a>
    </nav>
  );
}
