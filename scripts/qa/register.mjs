// Bootstrap chargé via `node --import ./scripts/qa/register.mjs ...`
// 1) Injecte un env FACTICE (aucun secret réel) pour isoler le test.
// 2) Enregistre les hooks de résolution (alias + fakes).
import { register } from "node:module";

Object.assign(process.env, {
  STRIPE_SECRET_KEY: "sk_test_dummy",
  STRIPE_WEBHOOK_SECRET: "whsec_qa_dummy_secret",
  NEXT_PUBLIC_SUPABASE_URL: "http://fake.local",
  SUPABASE_SERVICE_ROLE_KEY: "fake-service-role-key",
  RESEND_API_KEY: "re_fake_key",
  SPRINTMATHS_EMAIL_FROM: "qa@sprintmaths.test",
  SPRINTMATHS_EMAIL_REPLY_TO: "qa-reply@sprintmaths.test",
  NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
});

register("./hooks.mjs", import.meta.url);
