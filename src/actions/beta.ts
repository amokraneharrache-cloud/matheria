"use server";

import { getSupabaseAdmin, isLocalDevRuntime } from "@/lib/supabaseAdmin";
import { headers } from "next/headers";

const DEV_ACCESS_CODE =
  process.env.SPRINTMATHS_DEV_ACCESS_CODE ??
  process.env.MATHERIA_BETA_ACCESS_CODE ??
  "SPRINTMATHS2026";

const ACCESS_CODE_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const ACCESS_CODE_ATTEMPT_MAX_REQUESTS = 20;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const accessCodeAttemptStore = new Map<string, RateLimitEntry>();

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function normalizeCode(code: string) {
  return code.trim().toUpperCase();
}

async function getAccessClientKey() {
  try {
    const headerStore = await headers();
    const forwardedFor = headerStore.get("x-forwarded-for");
    const firstForwardedIp = forwardedFor?.split(",")[0]?.trim();

    return (
      firstForwardedIp ||
      headerStore.get("x-real-ip") ||
      headerStore.get("cf-connecting-ip") ||
      "unknown"
    );
  } catch {
    return "unknown";
  }
}

function isAccessAttemptRateLimited(clientKey: string) {
  const now = Date.now();

  if (accessCodeAttemptStore.size > 1000) {
    for (const [key, entry] of accessCodeAttemptStore) {
      if (entry.resetAt <= now) {
        accessCodeAttemptStore.delete(key);
      }
    }
  }

  const storeKey = `access-code:${clientKey}`;
  const current = accessCodeAttemptStore.get(storeKey);

  if (!current || current.resetAt <= now) {
    accessCodeAttemptStore.set(storeKey, {
      count: 1,
      resetAt: now + ACCESS_CODE_ATTEMPT_WINDOW_MS,
    });
    return false;
  }

  if (current.count >= ACCESS_CODE_ATTEMPT_MAX_REQUESTS) {
    return true;
  }

  current.count += 1;
  return false;
}

async function isAccessCodeAttemptBlocked() {
  const clientKey = await getAccessClientKey();
  return isAccessAttemptRateLimited(clientKey);
}

export async function activateBetaAccess(data: {
  parentEmail: string;
  studentPseudo: string;
  examGoal: string;
  currentLevel: string;
  accessCode: string;
}) {
  try {
    if (!data.parentEmail || !data.studentPseudo || !data.examGoal || !data.currentLevel) {
      return { success: false, message: "Veuillez remplir tous les champs." };
    }

    const parentEmail = normalizeEmail(data.parentEmail);
    const studentPseudo = data.studentPseudo.trim();
    const accessCode = normalizeCode(data.accessCode);

    if (!accessCode) {
      return { success: false, message: "Code d'accès invalide." };
    }

    if (await isAccessCodeAttemptBlocked()) {
      return {
        success: false,
        message: "Trop de tentatives. Réessayez dans quelques minutes.",
      };
    }

    const supabaseAdmin = getSupabaseAdmin();

    if (!supabaseAdmin) {
      if (isLocalDevRuntime() && accessCode === DEV_ACCESS_CODE) {
        console.warn(
          "Mode développement local : accès autorisé via SPRINTMATHS_DEV_ACCESS_CODE sans Service Role Supabase.",
        );
        return {
          success: true,
          betaAccessId: "dev-beta-id-" + Math.random().toString(36).slice(2, 9),
        };
      }

      return {
        success: false,
        message: "Configuration d'accès indisponible. Veuillez réessayer plus tard.",
      };
    }

    const { data: codeRow, error: codeError } = await supabaseAdmin
      .from("access_codes")
      .select("code, parent_email, status")
      .eq("code", accessCode)
      .maybeSingle();

    if (codeError) {
      console.error("activateBetaAccess — access_codes lookup error:", codeError.message);
      return { success: false, message: "Une erreur est survenue. Veuillez réessayer." };
    }

    if (!codeRow) {
      return { success: false, message: "Code d'accès invalide." };
    }

    if (codeRow.status === "used") {
      return {
        success: false,
        message: "Ce code a déjà été utilisé. Si vous avez déjà créé un espace, connectez-vous.",
      };
    }

    if (codeRow.status === "revoked") {
      return { success: false, message: "Ce code d'accès a été révoqué." };
    }

    if (codeRow.status !== "unused") {
      return { success: false, message: "Code d'accès invalide." };
    }

    if (codeRow.parent_email && normalizeEmail(codeRow.parent_email) !== parentEmail) {
      return {
        success: false,
        message: "Ce code est associé à un autre email parent.",
      };
    }

    const { data: insertData, error: insertError } = await supabaseAdmin
      .from("beta_access")
      .insert([
        {
          parent_email: parentEmail,
          student_pseudo: studentPseudo,
          exam_goal: data.examGoal,
          current_level: data.currentLevel,
          access_code: accessCode,
        },
      ])
      .select("id")
      .single();

    if (insertError || !insertData) {
      console.error("activateBetaAccess — beta_access insert error:", insertError?.message);
      return { success: false, message: "Impossible de créer l'espace élève. Veuillez réessayer." };
    }

    const { data: updatedCode, error: updateError } = await supabaseAdmin
      .from("access_codes")
      .update({
        parent_email: codeRow.parent_email || parentEmail,
        status: "used",
        used_at: new Date().toISOString(),
        beta_access_id: insertData.id,
      })
      .eq("code", accessCode)
      .eq("status", "unused")
      .select("id")
      .maybeSingle();

    if (updateError || !updatedCode) {
      console.error("activateBetaAccess — access_codes update error:", updateError?.message);
      await supabaseAdmin.from("beta_access").delete().eq("id", insertData.id);
      return {
        success: false,
        message: "Ce code a déjà été utilisé. Si vous avez déjà créé un espace, connectez-vous.",
      };
    }

    return {
      success: true,
      betaAccessId: insertData.id,
    };
  } catch (error) {
    console.error("activateBetaAccess error:", error);
    return { success: false, message: "Une erreur est survenue." };
  }
}

export async function restoreBetaAccess(data: {
  parentEmail: string;
  accessCode: string;
}) {
  try {
    if (!data.parentEmail || !data.accessCode) {
      return { success: false as const, message: "Veuillez remplir tous les champs." };
    }

    const parentEmail = normalizeEmail(data.parentEmail);
    const accessCode = normalizeCode(data.accessCode);

    if (await isAccessCodeAttemptBlocked()) {
      return {
        success: false as const,
        message: "Trop de tentatives. Réessayez dans quelques minutes.",
      };
    }

    const supabaseAdmin = getSupabaseAdmin();

    if (!supabaseAdmin) {
      console.warn("Supabase Service Role non configuré. Impossible de restaurer l'accès en mode développement sans base de données.");
      return {
        success: false as const,
        message: "Aucun espace élève trouvé avec cet email. Vérifiez l'email utilisé lors de la réservation ou créez l'espace élève.",
      };
    }

    const { data: codeRow, error: codeError } = await supabaseAdmin
      .from("access_codes")
      .select("code, status, beta_access_id")
      .eq("code", accessCode)
      .maybeSingle();

    if (codeError) {
      console.error("restoreBetaAccess — access_codes lookup error:", codeError.message);
      return { success: false as const, message: "Une erreur est survenue. Veuillez réessayer." };
    }

    if (!codeRow) {
      return {
        success: false as const,
        message: "Code d'accès introuvable. Vérifiez le code reçu après réservation.",
      };
    }

    if (codeRow.status === "unused") {
      return {
        success: false as const,
        message: "Ce code n'a pas encore été activé. Créez d'abord l'espace élève.",
      };
    }

    if (codeRow.status === "revoked") {
      return {
        success: false as const,
        message: "Ce code d'accès a été révoqué. Contactez le support SprintMaths.",
      };
    }

    if (codeRow.status !== "used" || !codeRow.beta_access_id) {
      return {
        success: false as const,
        message: "Aucun espace élève n'est associé à ce code.",
      };
    }

    const { data: row, error } = await supabaseAdmin
      .from("beta_access")
      .select("id, parent_email, student_pseudo, exam_goal, current_level")
      .eq("id", codeRow.beta_access_id)
      .maybeSingle();

    if (error) {
      console.error("restoreBetaAccess — beta_access lookup error:", error.message);
      return { success: false as const, message: "Une erreur est survenue. Veuillez réessayer." };
    }

    if (!row) {
      return {
        success: false as const,
        message: "Aucun espace élève n'est associé à ce code.",
      };
    }

    if (normalizeEmail(row.parent_email) !== parentEmail) {
      return {
        success: false as const,
        message: "L'email parent ne correspond pas à l'espace associé à ce code.",
      };
    }

    return {
      success: true as const,
      profile: {
        betaAccessId: row.id,
        parentEmail: row.parent_email,
        studentPseudo: row.student_pseudo,
        examGoal: row.exam_goal,
        currentLevel: row.current_level,
      },
    };
  } catch (error) {
    console.error("restoreBetaAccess error:", error);
    return { success: false as const, message: "Une erreur est survenue." };
  }
}

export async function savePracticeSession(data: {
  betaAccessId: string;
  parentEmail: string;
  studentPseudo: string;
  examGoal: string;
  score: number;
  totalQuestions: number;
  topics: string[];
}) {
  try {
    const supabaseAdmin = getSupabaseAdmin();

    if (!supabaseAdmin) {
      console.warn("Supabase Service Role non configuré. Mode développement actif (fausse sauvegarde session).");
      console.log("Session sauvegardée virtuellement:", data);
      return { success: true };
    }

    const { error } = await supabaseAdmin
      .from("practice_sessions")
      .insert([
        {
          beta_access_id: data.betaAccessId.startsWith("dev-") ? null : data.betaAccessId,
          parent_email: normalizeEmail(data.parentEmail),
          student_pseudo: data.studentPseudo,
          exam_goal: data.examGoal,
          score: data.score,
          total_questions: data.totalQuestions,
          topics: data.topics,
        },
      ]);

    if (error) {
      console.error("Error inserting practice_session:", error);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("savePracticeSession error:", error);
    return { success: false };
  }
}
