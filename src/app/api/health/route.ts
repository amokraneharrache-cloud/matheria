// Healthcheck opérationnel : répond "est-ce que Supabase / Resend / le déploiement
// sont encore fonctionnels ?" sans jamais exposer de donnée métier ni de secret.
//
// Sécurité :
//  - protégé par `Authorization: Bearer <HEALTHCHECK_TOKEN>` (variable serveur, jamais
//    préfixée NEXT_PUBLIC_ -> jamais livrée au navigateur) ;
//  - comparaison à temps constant sur des empreintes SHA-256 (longueurs toujours
//    égales : ni la valeur ni la longueur du token ne fuitent) ;
//  - sans token configuré côté serveur, l'endpoint reste verrouillé (401).
//
// `runtime = "nodejs"` : requis pour node:crypto et le client Supabase admin.
// Pas de `dynamic` : l'option a été retirée de la config de segment en v16 et les
// Route Handlers ne sont pas cachés par défaut ; la lecture des en-têtes rend de
// toute façon cette route dynamique. Le `Cache-Control: no-store` verrouille les
// intermédiaires (CDN, proxy).
import { createHash, timingSafeEqual } from "node:crypto";
import { isResendEmailConfigured } from "@/lib/email/resend";
import { logStep } from "@/lib/safeLog";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const SCOPE = "health";
const DEFAULT_DATABASE_TIMEOUT_MS = 4000;
const MIN_DATABASE_TIMEOUT_MS = 500;
const MAX_DATABASE_TIMEOUT_MS = 10000;

type DatabaseStatus = "ok" | "down";
type EmailStatus = "configured" | "missing";
type HealthStatus = "ok" | "degraded" | "down";

function noStoreJson(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate",
    },
  });
}

function sha256(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}

function isAuthorized(request: Request) {
  const expectedToken = process.env.HEALTHCHECK_TOKEN ?? "";

  // Pas de token configuré -> endpoint volontairement inutilisable (jamais ouvert).
  if (!expectedToken) {
    return false;
  }

  const authorization = request.headers.get("authorization") ?? "";
  const bearer = /^Bearer[ \t]+(.+)$/i.exec(authorization.trim());

  if (!bearer) {
    return false;
  }

  const providedToken = bearer[1].trim();
  if (!providedToken) {
    return false;
  }

  // Empreintes de taille fixe -> comparaison à temps constant sans fuite de longueur.
  return timingSafeEqual(sha256(providedToken), sha256(expectedToken));
}

function getDatabaseTimeoutMs() {
  const raw = Number(process.env.HEALTHCHECK_DB_TIMEOUT_MS);

  if (!Number.isFinite(raw) || raw <= 0) {
    return DEFAULT_DATABASE_TIMEOUT_MS;
  }

  return Math.min(Math.max(raw, MIN_DATABASE_TIMEOUT_MS), MAX_DATABASE_TIMEOUT_MS);
}

function withTimeout<T>(source: PromiseLike<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      const timeoutError = new Error("database check timed out");
      (timeoutError as { code?: string }).code = "ETIMEDOUT";
      reject(timeoutError);
    }, timeoutMs);

    Promise.resolve(source).then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

async function checkDatabase(): Promise<DatabaseStatus> {
  const supabaseAdmin = getSupabaseAdmin();

  if (!supabaseAdmin) {
    // Configuration critique absente (URL ou service role key) : on ne peut plus
    // enregistrer un lead -> traité comme une panne, pas comme une dégradation.
    logStep(SCOPE, "database_not_configured", new Error("supabase admin client unavailable"));
    return "down";
  }

  try {
    // Lecture minimale et non destructive : une seule colonne technique, 1 ligne max.
    // Le résultat est jeté immédiatement — seule l'absence d'erreur nous intéresse.
    const probe = supabaseAdmin.from("leads").select("id").limit(1);
    const { error } = await withTimeout(probe, getDatabaseTimeoutMs());

    if (error) {
      logStep(SCOPE, "database_check_failed", error);
      return "down";
    }

    return "ok";
  } catch (error) {
    logStep(SCOPE, "database_check_failed", error);
    return "down";
  }
}

function getDeployment() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA ?? "";

  return {
    environment: process.env.VERCEL_ENV || "unknown",
    // Commit court uniquement : suffisant pour dater la prod, sans exposer d'URL interne.
    commit: commitSha ? commitSha.slice(0, 7) : "unknown",
  };
}

// Resend absent = email dégradé, pas panne : le lead reste enregistré en base
// (la route planning renvoie 200 avec emailSent:false). Seul Supabase est critique.
function resolveStatus(database: DatabaseStatus, email: EmailStatus): HealthStatus {
  if (database === "down") {
    return "down";
  }

  return email === "missing" ? "degraded" : "ok";
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return noStoreJson({ status: "unauthorized" }, 401);
  }

  const database = await checkDatabase();
  const email: EmailStatus = isResendEmailConfigured() ? "configured" : "missing";
  const status = resolveStatus(database, email);

  return noStoreJson(
    {
      status,
      timestamp: new Date().toISOString(),
      checks: {
        app: "ok",
        database,
        email,
      },
      deployment: getDeployment(),
    },
    database === "down" ? 503 : 200,
  );
}
