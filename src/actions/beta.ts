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
