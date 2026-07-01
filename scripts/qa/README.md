# QA — Webhook achat SprintMaths (isolé, sans infra réelle)

Test e2e du webhook Stripe **sans paiement réel, sans secret, sans I/O externe**.

```bash
npm run test:webhook
```

## Ce qui est réellement exercé

- La **vraie** vérification de signature Stripe (`stripe.webhooks.constructEvent`).
- Le **vrai** code métier : `src/app/api/stripe/webhook/route.ts`,
  `src/lib/accessCodes.ts`, `src/lib/email/resend.ts`.

## Ce qui est simulé (aucune I/O)

- `@supabase/supabase-js` → `fake-supabase.mjs` (Postgres en mémoire).
- `resend` → `fake-resend.mjs` (capture l'email au lieu de l'envoyer).
- Les variables d'env sont des valeurs **factices** injectées par `register.mjs`
  (jamais de vraies clés ; rien n'est lu depuis `.env.local`).

## Cas couverts

1. Paiement payé → 200, code `MATH-XXXX` créé (`source=stripe`, `status=unused`), email contenant le code.
2. Rejeu de la même `checkout.session` → idempotent (pas de doublon de code ni d'email).
3. Signature falsifiée → 400 `Invalid Stripe signature`.
4. Signature absente → 400 `Missing Stripe signature`.
5. Session non payée → 200 ignoré, aucun code créé.

## Limite

Ce harness valide la **logique** du webhook, pas l'intégration réelle
(Stripe mode test + projet Supabase de test + Resend). Pour ce niveau, suivre la
section 5 de [`docs/qa-funnel-bac-2027.md`](../../docs/qa-funnel-bac-2027.md)
avec des clés **mode test** et un **projet Supabase de test confirmé**.
