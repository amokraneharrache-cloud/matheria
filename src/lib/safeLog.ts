// Logging serveur "safe" partagé (API routes + Server Actions).
// Objectif : rendre les erreurs exploitables SANS jamais fuiter de PII
// (email, pseudo, payload complet) ni de secret dans les logs.

const SENSITIVE_ENV_KEYS = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "RESEND_API_KEY",
  "HEALTHCHECK_TOKEN",
] as const;

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function redactPii(value: string) {
  // Remplace tout token ressemblant à un email par [email].
  return value.replace(/[^\s@]+@[^\s@]+/g, "[email]");
}

export function redactSecrets(value: string) {
  let redacted = value;

  for (const envKey of SENSITIVE_ENV_KEYS) {
    const secret = process.env[envKey];
    if (secret && secret.length >= 8) {
      redacted = redacted.replace(new RegExp(escapeRegExp(secret), "g"), "[secret]");
    }
  }

  return redacted.replace(
    /\beyJ[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\.[A-Za-z0-9_-]{20,}\b/g,
    "[secret]",
  );
}

function redactSensitive(value: string) {
  return redactSecrets(redactPii(value));
}

export function getErrorLogDetails(error: unknown) {
  const record =
    error && typeof error === "object" ? (error as Record<string, unknown>) : {};
  const rawMessage =
    typeof record.message === "string" ? record.message : "Unknown error";

  return {
    errorName: typeof record.name === "string" ? record.name : "Error",
    code: typeof record.code === "string" ? record.code : undefined,
    status:
      typeof record.status === "number"
        ? record.status
        : typeof record.statusCode === "number"
          ? record.statusCode
          : undefined,
    // Message court, tronqué et débarrassé de tout email/secret.
    message: redactSensitive(rawMessage).slice(0, 200),
  };
}

// Ex: logStep("diagnostic/saveLead", "save_failed", error)
//  -> [diagnostic/saveLead] save_failed { errorName, code, status, message }
export function logStep(scope: string, step: string, error: unknown) {
  console.error(`[${scope}] ${step}`, getErrorLogDetails(error));
}
