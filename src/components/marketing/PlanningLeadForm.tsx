"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MARKETING_CONSENT_LABEL } from "@/lib/email/consentText";
import { trackEvent, type TrackingParams } from "@/lib/tracking";
import { getStoredUtmEventParams } from "@/lib/utm";
import {
  PLANNING_LEAD_MAGNET,
  PLANNING_SUCCESS_CTA_LOCATION,
  PLANNING_SUCCESS_INTENT,
  PLANNING_SUCCESS_LINKS,
  PLANNING_SUCCESS_OFFER_LINK,
} from "@/components/marketing/planningSuccessLinks";

const LEAD_MAGNET = PLANNING_LEAD_MAGNET;

const SUCCESS_CTA_BASE_CLASS =
  "inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition";
const SUCCESS_CTA_CLASS = {
  primary: `${SUCCESS_CTA_BASE_CLASS} bg-[#1e3a8a] text-white shadow-md hover:bg-[#1e3a8a]/90`,
  secondary: `${SUCCESS_CTA_BASE_CLASS} border-2 border-[#1e3a8a] bg-white text-[#1e3a8a] hover:bg-slate-50`,
} as const;

type PlanningLeadFormProps = {
  idPrefix?: string;
  sourcePage: string;
};

type ApiResponse = {
  success: boolean;
  message?: string;
  emailSent?: boolean;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function PlanningLeadForm({
  idPrefix = "planning",
  sourcePage,
}: PlanningLeadFormProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const isSubmittingRef = useRef(false);

  const trackingParams = {
    source_page: sourcePage,
    lead_magnet: LEAD_MAGNET,
    level: "terminale",
  };
  const emailInputId = `${idPrefix}-email`;
  const websiteInputId = `${idPrefix}-website`;
  const consentInputId = `${idPrefix}-marketing-consent`;

  function successEventParams(destinationPage: string): TrackingParams {
    return {
      ...trackingParams,
      destination_page: destinationPage,
      cta_location: PLANNING_SUCCESS_CTA_LOCATION,
      intent: PLANNING_SUCCESS_INTENT,
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    if (!isValidEmail(normalizedEmail)) {
      setStatus("error");
      setMessage("Entre une adresse email valide.");
      return;
    }

    if (isSubmittingRef.current) {
      return;
    }

    isSubmittingRef.current = true;
    setStatus("loading");
    setMessage("");
    setEmailSent(false);
    trackEvent("lead_magnet_request", trackingParams);

    try {
      const response = await fetch("/api/leads/planning", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          sourcePage,
          website,
          marketingConsent,
          // Source d'acquisition uniquement (jamais d'email) : le serveur la
          // normalise avant stockage.
          utmSource: getStoredUtmEventParams().utm_source,
        }),
      });
      const result = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Impossible d'envoyer la demande.");
      }

      trackEvent("email_optin", {
        ...trackingParams,
        marketing_consent: marketingConsent ? "true" : "false",
      });
      setEmailSent(Boolean(result.emailSent));
      setStatus("success");
      setMessage("");
      setEmail("");
      setWebsite("");
      setMarketingConsent(false);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Impossible d'envoyer la demande pour le moment.",
      );
    } finally {
      isSubmittingRef.current = false;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor={emailInputId} className="sr-only">
          Email
        </label>
        <input
          id={emailInputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="ton.email@exemple.fr"
          className="h-14 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-slate-950 outline-none transition focus:border-blue-900 focus:ring-4 focus:ring-blue-100"
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor={websiteInputId}>Site web</label>
        <input
          id={websiteInputId}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
      </div>

      {/*
        Case FACULTATIVE et jamais précochée. Le planning est envoyé dans tous
        les cas : la ressource gratuite n'est pas conditionnée à l'acceptation
        marketing.
      */}
      <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3">
        <input
          id={consentInputId}
          name="marketingConsent"
          type="checkbox"
          checked={marketingConsent}
          onChange={(event) => setMarketingConsent(event.target.checked)}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded border-slate-400 text-blue-900 focus:ring-2 focus:ring-blue-100"
        />
        <label htmlFor={consentInputId} className="cursor-pointer text-sm leading-6 text-slate-700">
          {MARKETING_CONSENT_LABEL}
        </label>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full px-4 text-base sm:text-lg"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Envoi en cours..." : "Recevoir le planning gratuit"}
      </Button>

      <p className="text-sm leading-6 text-slate-600">
        Ton email sert à t&apos;envoyer le planning, que tu coches ou non la case.{" "}
        <Link
          href="/politique-confidentialite"
          className="font-semibold text-blue-900 underline underline-offset-2"
        >
          Politique de confidentialité
        </Link>
        .
      </p>

      {status === "error" && message && (
        <div
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-900"
          role="alert"
        >
          <p>{message}</p>
        </div>
      )}

      {status === "success" && (
        <div
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-950 sm:p-6"
          role="status"
        >
          <h3 className="text-lg font-bold leading-7">
            {emailSent ? "Ton planning est envoyé" : "Ta demande est enregistrée"}
          </h3>
          <p className="mt-2 text-sm leading-6">
            {emailSent
              ? "Vérifie ta boîte mail dans quelques instants (pense aux spams)."
              : "L'email n'a pas pu partir immédiatement : la version imprimable du planning reste disponible juste en dessous."}{" "}
            Prochaine étape : identifie tes chapitres prioritaires, puis commence à
            t&apos;entraîner sur des exercices guidés.
          </p>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            {PLANNING_SUCCESS_LINKS.map((link) => (
              <a
                key={link.eventName}
                href={link.href}
                onClick={() => trackEvent(link.eventName, successEventParams(link.href))}
                className={SUCCESS_CTA_CLASS[link.kind]}
              >
                {link.label}
              </a>
            ))}
          </div>

          {!emailSent && (
            <p className="mt-3 text-sm leading-6">
              <a
                href="/planning-bac-maths-2027.html"
                onClick={() =>
                  trackEvent("lead_magnet_download", {
                    ...successEventParams("/planning-bac-maths-2027.html"),
                    intent: undefined,
                  })
                }
                className="font-semibold text-emerald-900 underline"
              >
                Ouvrir la version imprimable du planning
              </a>
            </p>
          )}

          <p className="mt-3 text-sm leading-6 text-emerald-900/80">
            <a
              href={PLANNING_SUCCESS_OFFER_LINK.href}
              onClick={() =>
                trackEvent(PLANNING_SUCCESS_OFFER_LINK.eventName, {
                  ...successEventParams(PLANNING_SUCCESS_OFFER_LINK.href),
                  offer: PLANNING_SUCCESS_OFFER_LINK.offer,
                })
              }
              className="underline"
            >
              {PLANNING_SUCCESS_OFFER_LINK.label}
            </a>
          </p>
        </div>
      )}
    </form>
  );
}
