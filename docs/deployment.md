# Deploiement Vercel SprintMaths

Cette page sert de checklist pratique pour configurer SprintMaths sur Vercel
en Preview et en Production. Elle ne doit contenir aucune vraie cle secrete.

## Fichiers verifies

- `.env.example` : absent.
- `.env.local.example` : present et suivi par git, a garder en placeholders.
- `README.md` : contient deja une section variables d'environnement.
- `docs/deployment.md` : documentation Vercel dediee.

## Regles de securite

- Renseigner les vraies valeurs dans Vercel Project Settings > Environment
  Variables, ou en local dans `.env.local`.
- Ne jamais commiter `.env.local`, `.env`, une cle Supabase service role, une
  cle Stripe, un secret webhook Stripe ou une cle Resend.
- Ne jamais prefixer une variable secrete avec `NEXT_PUBLIC_`. Ces variables
  sont exposees au navigateur et figees dans le bundle au moment du build.
- Redepployer Vercel apres tout changement de variable `NEXT_PUBLIC_*`.
- Separer les valeurs Preview et Production, surtout pour Supabase et Stripe.

## Variables documentees

| Variable | Cote | Obligatoire pour | Exemple de placeholder | Notes |
| --- | --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Client et serveur | Build Production, SEO, emails, Stripe webhook | `https://www.sprintmaths.com` | En Production, verifier exactement `https://www.sprintmaths.com`, sans slash final. |
| `NEXT_PUBLIC_SUPABASE_URL` | Client et serveur | Supabase, lead magnet planning, codes d'acces | `<supabase-project-url>` | Utilisee avec la cle anon cote client et la service role cote serveur. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Supabase client, fallback lead magnet | `<supabase-anon-key>` | Publique, mais a limiter au role anon Supabase. |
| `SUPABASE_SERVICE_ROLE_KEY` | Serveur uniquement | Lead magnet planning, creation code acces, admin | `<supabase-service-role-key>` | Secret critique. Ne jamais exposer cote client. |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Client | Paiement, CTA achat | `<stripe-payment-link>` | Payment Link Stripe publie par Stripe. |
| `STRIPE_SECRET_KEY` | Serveur uniquement | Webhook Stripe | `<stripe-secret-key>` | Necessaire pour verifier/traiter les sessions via le SDK Stripe. |
| `STRIPE_WEBHOOK_SECRET` | Serveur uniquement | Webhook Stripe | `<stripe-webhook-signing-secret>` | Secret de signature de l'endpoint Stripe. |
| `RESEND_API_KEY` | Serveur uniquement | Email planning, email code acces | `<resend-api-key>` | Necessite un domaine expediteur verifie dans Resend. |
| `SPRINTMATHS_EMAIL_FROM` | Serveur uniquement | Email planning, email code acces | `SprintMaths <contact@sprintmaths.com>` | L'adresse doit appartenir au domaine verifie. |
| `SPRINTMATHS_EMAIL_REPLY_TO` | Serveur uniquement | Email planning, email code acces | `contact@sprintmaths.com` | Adresse de reponse visible par le client. |
| `RESEND_ACCESS_CODE_ON_DUPLICATE` | Serveur uniquement | Webhook Stripe idempotent | `false` | Mettre `true` seulement pour renvoyer un email lors d'un replay webhook. |
| `NEXT_PUBLIC_TRACKING_MODE` | Client | Tracking | `gtm-ready` | Valeurs utiles : `off`, `internal`, `gtm-ready`, `ads-ready`. |
| `NEXT_PUBLIC_GTM_ID` | Client | Tracking GTM | `GTM-XXXXXXX` | Requis pour charger Google Tag Manager en mode `gtm-ready`. |
| `NEXT_PUBLIC_GA4_ID` | Client | Reserve tracking | `<ga4-measurement-id>` | Present dans l'exemple, pas lu directement par le code actuel. |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Client | Reserve pixels directs | `<google-ads-id>` | Reserve au mode `ads-ready`. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Client | Reserve pixels directs | `<meta-pixel-id>` | Reserve au mode `ads-ready`. |
| `NEXT_PUBLIC_TIKTOK_PIXEL_ID` | Client | Reserve pixels directs | `<tiktok-pixel-id>` | Reserve au mode `ads-ready`. |
| `NEXT_PUBLIC_SNAP_PIXEL_ID` | Client | Reserve pixels directs | `<snap-pixel-id>` | Reserve au mode `ads-ready`. |
| `SPRINTMATHS_ADMIN_PASSWORD` | Serveur uniquement | Admin codes | `<admin-password>` | Secret optionnel selon besoin admin. |
| `SPRINTMATHS_DEV_ACCESS_CODE` | Serveur uniquement | Dev local | `<dev-access-code>` | A eviter en Production sauf besoin temporaire explicite. |
| `SPRINTMATHS_TEST_CUSTOMER_EMAIL` | Serveur uniquement | Test webhook local | `qa@example.test` | Dev uniquement, utile avec Stripe CLI. |
| `MATHERIA_ADMIN_PASSWORD` | Serveur uniquement | Fallback legacy | `<legacy-admin-password>` | A conserver seulement pendant migration si l'environnement l'utilise deja. |
| `MATHERIA_BETA_ACCESS_CODE` | Serveur uniquement | Fallback legacy | `<legacy-beta-access-code>` | A conserver seulement pendant migration si l'environnement l'utilise deja. |

## Obligatoires par usage

### Build Vercel

Obligatoires pour un build Production propre :

- `NEXT_PUBLIC_SITE_URL=https://www.sprintmaths.com`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Obligatoires au moment du build si les fonctionnalites sont actives :

- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` pour afficher les CTA achat avec le bon lien.
- `NEXT_PUBLIC_TRACKING_MODE=gtm-ready` et `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
  pour activer GTM.

Le build technique peut ne pas echouer si certaines variables serveur manquent,
mais les routes concernees echoueront a l'execution. Les secrets serveur doivent
donc aussi etre presents dans Vercel avant un vrai test Production.

### Paiement

- `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Pour que l'achat envoie automatiquement le code :

- `RESEND_API_KEY`
- `SPRINTMATHS_EMAIL_FROM`
- `SPRINTMATHS_EMAIL_REPLY_TO`
- `RESEND_ACCESS_CODE_ON_DUPLICATE=false` par defaut

### Email code acces

- `RESEND_API_KEY`
- `SPRINTMATHS_EMAIL_FROM`
- `SPRINTMATHS_EMAIL_REPLY_TO`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Le code est cree dans Supabase via la service role, puis envoye via Resend.

### Lead magnet planning

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `SPRINTMATHS_EMAIL_FROM`
- `SPRINTMATHS_EMAIL_REPLY_TO`

En local, le code peut simuler certains cas si Supabase ou Resend sont absents.
En Production, les variables ci-dessus doivent etre configurees pour persister le
lead et envoyer l'email.

### Tracking

- `NEXT_PUBLIC_TRACKING_MODE=gtm-ready`
- `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`

Les autres IDs (`NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`,
`NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TIKTOK_PIXEL_ID`,
`NEXT_PUBLIC_SNAP_PIXEL_ID`) sont reserves ou optionnels selon les tags publies
dans GTM et les pixels directs.

## Checklist Vercel Preview

- Creer les variables dans l'environnement Preview sans vraies cles Production,
  sauf decision explicite.
- Verifier que les secrets serveur ne sont pas prefixes par `NEXT_PUBLIC_`.
- Verifier que `SUPABASE_SERVICE_ROLE_KEY` reste disponible uniquement cote
  serveur.
- Utiliser un Payment Link Stripe de test si la preview sert aux tests achat.
- Configurer un endpoint webhook Stripe dedie a la preview si le flux paiement
  doit etre teste sur une URL Preview.
- Redepployer apres toute modification de variable `NEXT_PUBLIC_*`.
- Tester `/planning-revision-bac-maths`, `/sitemap.xml` et `/robots.txt`.
- Verifier `window.dataLayer` si `NEXT_PUBLIC_TRACKING_MODE=gtm-ready`.

## Checklist Vercel Production

- Verifier le domaine `www.sprintmaths.com` dans Vercel.
- Verifier `NEXT_PUBLIC_SITE_URL=https://www.sprintmaths.com` en Production.
- Verifier l'URL webhook Stripe :
  `https://www.sprintmaths.com/api/stripe/webhook`.
- Verifier que l'event Stripe ecoute est `checkout.session.completed`.
- Verifier le Payment Link Stripe et sa success URL.
- Verifier que le domaine expediteur Resend est valide pour
  `contact@sprintmaths.com`.
- Verifier que `SUPABASE_SERVICE_ROLE_KEY` est configuree cote serveur et jamais
  exposee au client.
- Verifier `NEXT_PUBLIC_TRACKING_MODE=gtm-ready`.
- Verifier `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` avec l'ID reel du conteneur.
- Redepployer apres tout changement de variable `NEXT_PUBLIC_*`.
- Tester `/sitemap.xml`.
- Tester `/robots.txt`.
- Tester `/planning-revision-bac-maths`.
- Tester un achat Stripe seulement si l'environnement reel est volontairement
  utilise.

## Tests apres deploiement

1. Formulaire planning : ouvrir `/planning-revision-bac-maths`, soumettre un
   email de test, verifier une reponse de succes.
2. Email planning recu : verifier dans la boite de test que le message Resend
   contient les liens vers le planning, la version imprimable et le diagnostic.
3. Diagnostic : ouvrir `/diagnostic`, completer le parcours et verifier la page
   resultat.
4. Click Stripe : cliquer sur un CTA achat et verifier la redirection vers le
   Payment Link attendu.
5. `dataLayer` : en console navigateur, verifier que `window.dataLayer` existe
   et recoit les events attendus, sans email ni donnee personnelle.
6. Webhook Stripe : apres paiement test/reel, verifier dans Stripe que l'endpoint
   retourne un succes 2xx.
7. Code cree : verifier dans Supabase qu'une ligne est creee dans
   `access_codes` avec la session Stripe associee.
8. Email code recu : verifier que l'email "Votre code d'acces SprintMaths" est
   recu et contient un code `MATH-XXXX`.

## Commandes utiles

```bash
npm run build
```

```bash
vercel env pull .env.local --yes
```

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

```bash
stripe trigger checkout.session.completed
```

## Points de vigilance

- Les variables `NEXT_PUBLIC_*` sont publiques et figees au build.
- Les secrets Supabase service role, Stripe et Resend doivent rester serveur.
- Les variables Preview et Production doivent etre separees pour eviter un test
  qui touche les donnees ou paiements reels.
- `RESEND_ACCESS_CODE_ON_DUPLICATE=true` peut renvoyer un email lors d'un replay
  Stripe ; garder `false` par defaut.
- Le tracking ne doit jamais recevoir d'email, de code d'acces, de score detaille
  ou de donnee pedagogique personnelle.
