"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/tracking";

const LEAD_MAGNET = "planning_bac_maths_2027";

type PlanningLeadFormProps = {
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

export function PlanningLeadForm({ sourcePage }: PlanningLeadFormProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const isSubmittingRef = useRef(false);

  const trackingParams = {
    source_page: sourcePage,
    lead_magnet: LEAD_MAGNET,
    level: "terminale",
  };

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
        }),
      });
      const result = (await response.json().catch(() => null)) as ApiResponse | null;

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || "Impossible d'envoyer la demande.");
      }

      trackEvent("email_optin", trackingParams);
      setStatus("success");
      setMessage(
        result.emailSent
          ? "C'est envoyé. Vérifie ta boîte mail dans quelques instants."
          : "Demande enregistrée. La version imprimable est disponible juste ici.",
      );
      setEmail("");
      setWebsite("");
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
        <label htmlFor="planning-email" className="sr-only">
          Email
        </label>
        <input
          id="planning-email"
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
        <label htmlFor="planning-website">Site web</label>
        <input
          id="planning-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
        />
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
        Pas de spam. Tu recevras aussi quelques conseils de révision utiles avant le bac.
      </p>

      {message && (
        <div
          className={
            status === "success"
              ? "rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-900"
              : "rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-900"
          }
          role={status === "error" ? "alert" : "status"}
        >
          <p>{message}</p>
          {status === "success" && (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <a
                href="/diagnostic"
                onClick={() =>
                  trackEvent("click_planning_diagnostic", {
                    ...trackingParams,
                    destination_page: "/diagnostic",
                    cta_location: "planning_form_success",
                    intent: "diagnostic",
                  })
                }
                className="inline-flex text-blue-900 underline"
              >
                Faire le diagnostic gratuit
              </a>
              <a
                href="/exercices-type-bac-maths-terminale"
                onClick={() =>
                  trackEvent("click_planning_typebac", {
                    ...trackingParams,
                    destination_page: "/exercices-type-bac-maths-terminale",
                    cta_location: "planning_form_success",
                    intent: "typebac_practice",
                  })
                }
                className="inline-flex text-blue-900 underline"
              >
                Essayer un exercice type bac guidé
              </a>
              <a
                href="/planning-bac-maths-2027.html"
                onClick={() =>
                  trackEvent("lead_magnet_download", {
                    ...trackingParams,
                    destination_page: "/planning-bac-maths-2027.html",
                    cta_location: "planning_form_success",
                  })
                }
                className="inline-flex text-blue-900 underline"
              >
                Ouvrir la version imprimable
              </a>
              <a
                href="/bac-maths-2027#offre"
                onClick={() =>
                  trackEvent("click_planning_offer", {
                    ...trackingParams,
                    destination_page: "/bac-maths-2027#offre",
                    offer: "pack_revision_express_bac_2027",
                    cta_location: "planning_form_success",
                    intent: "offer",
                  })
                }
                className="inline-flex text-blue-900 underline"
              >
                Voir le Pack Révision Express
              </a>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
