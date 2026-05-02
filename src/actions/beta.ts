"use server";

import { createClient } from "@supabase/supabase-js";

// Constants
const BETA_ACCESS_CODE = process.env.MATHERIA_BETA_ACCESS_CODE || "MATHERIA2026";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// We create a custom supabase client using the service role key to bypass RLS
// because users are not authenticated via Supabase Auth in this MVP.
const supabaseAdmin = 
  SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    : null;

export async function activateBetaAccess(data: {
  parentEmail: string;
  studentPseudo: string;
  examGoal: string;
  currentLevel: string;
  accessCode: string;
}) {
  try {
    // 1. Verify access code
    if (data.accessCode !== BETA_ACCESS_CODE) {
      return { success: false, message: "Code d'accès invalide." };
    }

    // 2. Validate fields
    if (!data.parentEmail || !data.studentPseudo || !data.examGoal || !data.currentLevel) {
      return { success: false, message: "Veuillez remplir tous les champs." };
    }

    // 3. Insert into Supabase if configured
    let betaAccessId = "dev-beta-id-" + Math.random().toString(36).slice(2, 9);

    if (supabaseAdmin) {
      const { data: insertData, error } = await supabaseAdmin
        .from("beta_access")
        .insert([
          {
            parent_email: data.parentEmail,
            student_pseudo: data.studentPseudo,
            exam_goal: data.examGoal,
            current_level: data.currentLevel,
            access_code: data.accessCode,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error inserting beta_access:", error);
        // We still allow them in if supabase fails in this MVP to not block them
        // but normally we would return an error. Here we fallback.
      } else if (insertData) {
        betaAccessId = insertData.id;
      }
    } else {
      console.warn("Supabase Service Role non configuré. Mode développement actif (fausse insertion beta).");
    }

    return { 
      success: true, 
      betaAccessId 
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
    // 1. Validate fields
    if (!data.parentEmail || !data.accessCode) {
      return { success: false as const, message: "Veuillez remplir tous les champs." };
    }

    // 2. Verify access code
    if (data.accessCode !== BETA_ACCESS_CODE) {
      return { success: false as const, message: "Code d'accès invalide. Vérifiez le code indiqué dans votre email de confirmation." };
    }

    // 3. Lookup in Supabase
    if (!supabaseAdmin) {
      console.warn("Supabase Service Role non configuré. Impossible de restaurer l'accès en mode développement sans base de données.");
      return {
        success: false as const,
        message: "Aucun espace élève trouvé avec cet email. Vérifiez l'email utilisé lors de la réservation ou créez l'espace élève.",
      };
    }

    const { data: rows, error } = await supabaseAdmin
      .from("beta_access")
      .select("id, parent_email, student_pseudo, exam_goal, current_level")
      .eq("parent_email", data.parentEmail)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("restoreBetaAccess — Supabase error:", error.message);
      return { success: false as const, message: "Une erreur est survenue. Veuillez réessayer." };
    }

    if (!rows || rows.length === 0) {
      return {
        success: false as const,
        message: "Aucun espace élève trouvé avec cet email. Vérifiez l'email utilisé lors de la réservation ou créez l'espace élève.",
      };
    }

    const row = rows[0];
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
    if (!supabaseAdmin) {
      console.warn("Supabase Service Role non configuré. Mode développement actif (fausse sauvegarde session).");
      console.log("Session sauvegardée virtuellement:", data);
      return { success: true };
    }

    const { error } = await supabaseAdmin
      .from("practice_sessions")
      .insert([
        {
          beta_access_id: data.betaAccessId.startsWith("dev-") ? null : data.betaAccessId, // null if it was a dev fake ID
          parent_email: data.parentEmail,
          student_pseudo: data.studentPseudo,
          exam_goal: data.examGoal,
          score: data.score,
          total_questions: data.totalQuestions,
          topics: data.topics,
        },
      ]);

    if (error) {
      console.error("Error inserting practice_session:", error);
      // We do not throw or block, just log.
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.error("savePracticeSession error:", error);
    return { success: false };
  }
}
