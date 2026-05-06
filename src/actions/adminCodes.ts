"use server";

import { randomInt } from "crypto";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

type AccessCodeStatus = "unused" | "used" | "revoked";

export type AdminAccessCodeRow = {
  code: string;
  parentEmail: string | null;
  status: AccessCodeStatus;
  createdAt: string;
  usedAt: string | null;
};

function normalizeEmail(email?: string | null) {
  const trimmed = email?.trim().toLowerCase();
  return trimmed || null;
}

function normalizeCode(code: string) {
  return code.trim().toUpperCase();
}

function verifyAdminPassword(adminPassword: string) {
  const expectedPassword = process.env.MATHERIA_ADMIN_PASSWORD;

  if (!expectedPassword) {
    return {
      success: false as const,
      message: "Mot de passe admin non configuré côté serveur.",
    };
  }

  if (adminPassword !== expectedPassword) {
    return {
      success: false as const,
      message: "Mot de passe admin incorrect.",
    };
  }

  return { success: true as const };
}

const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function createShortCode() {
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += CODE_ALPHABET[randomInt(0, CODE_ALPHABET.length)];
  }
  return `MATH-${suffix}`;
}

export async function generateAccessCode(data: {
  adminPassword: string;
  parentEmail?: string;
}) {
  const passwordCheck = verifyAdminPassword(data.adminPassword);
  if (!passwordCheck.success) {
    return passwordCheck;
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return {
      success: false as const,
      message: "Supabase Service Role non configuré. Impossible de générer un code.",
    };
  }

  const parentEmail = normalizeEmail(data.parentEmail);

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = createShortCode();
    const { data: row, error } = await supabaseAdmin
      .from("access_codes")
      .insert({
        code,
        parent_email: parentEmail,
        status: "unused",
      })
      .select("code")
      .single();

    if (!error && row?.code) {
      return { success: true as const, code: row.code };
    }

    if (error?.code !== "23505") {
      return {
        success: false as const,
        message: "Impossible de générer le code. Veuillez réessayer.",
      };
    }
  }

  return {
    success: false as const,
    message: "Collision de code répétée. Relancez la génération.",
  };
}

export async function listAccessCodes(data: { adminPassword: string }) {
  const passwordCheck = verifyAdminPassword(data.adminPassword);
  if (!passwordCheck.success) {
    return passwordCheck;
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return {
      success: false as const,
      message: "Supabase Service Role non configuré. Impossible de lister les codes.",
    };
  }

  const { data: rows, error } = await supabaseAdmin
    .from("access_codes")
    .select("code, parent_email, status, created_at, used_at")
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    return {
      success: false as const,
      message: "Impossible de charger les codes.",
    };
  }

  return {
    success: true as const,
    codes: (rows || []).map((row) => ({
      code: row.code,
      parentEmail: row.parent_email,
      status: row.status as AccessCodeStatus,
      createdAt: row.created_at,
      usedAt: row.used_at,
    })) satisfies AdminAccessCodeRow[],
  };
}

export async function revokeAccessCode(data: {
  adminPassword: string;
  code: string;
}) {
  const passwordCheck = verifyAdminPassword(data.adminPassword);
  if (!passwordCheck.success) {
    return passwordCheck;
  }

  const supabaseAdmin = getSupabaseAdmin();
  if (!supabaseAdmin) {
    return {
      success: false as const,
      message: "Supabase Service Role non configuré. Impossible de révoquer le code.",
    };
  }

  const code = normalizeCode(data.code);
  if (!code) {
    return { success: false as const, message: "Code manquant." };
  }

  const { data: existing, error: lookupError } = await supabaseAdmin
    .from("access_codes")
    .select("status")
    .eq("code", code)
    .maybeSingle();

  if (lookupError) {
    return {
      success: false as const,
      message: "Impossible de vérifier ce code.",
    };
  }

  if (!existing) {
    return { success: false as const, message: "Code introuvable." };
  }

  if (existing.status === "used") {
    return { success: false as const, message: "Impossible de révoquer un code déjà utilisé." };
  }

  if (existing.status === "revoked") {
    return { success: true as const };
  }

  const { error } = await supabaseAdmin
    .from("access_codes")
    .update({ status: "revoked" })
    .eq("code", code)
    .eq("status", "unused");

  if (error) {
    return {
      success: false as const,
      message: "Impossible de révoquer le code.",
    };
  }

  return { success: true as const };
}

