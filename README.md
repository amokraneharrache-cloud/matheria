# SprintMaths

SprintMaths est une web app mobile-first de révision en mathématiques.

Positionnement : **Le programme de révision maths du Brevet au Bac**.

Promesse courte : des exercices guidés, un plan clair et une progression visible pour réviser efficacement.

Le projet a été rebrandé vers **SprintMaths** le 2026-05-08 pour s'aligner avec le nouveau domaine `https://sprintmaths.fr`.

## Lancement rapide

Le projet utilise Next.js 16, Tailwind CSS v4 et `npm`.

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) pour voir la landing page.

Avant déploiement, lancer :

```bash
npm run build
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine à partir de `.env.local.example`.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://sprintmaths.fr
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_SNAP_PIXEL_ID=
NEXT_PUBLIC_TRACKING_MODE=

SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
RESEND_API_KEY=re_xxx
SPRINTMATHS_EMAIL_FROM="SprintMaths <contact@sprintmaths.fr>"
SPRINTMATHS_EMAIL_REPLY_TO=contact@sprintmaths.fr
SPRINTMATHS_ADMIN_PASSWORD=
SPRINTMATHS_DEV_ACCESS_CODE=
SPRINTMATHS_TEST_CUSTOMER_EMAIL=
RESEND_ACCESS_CODE_ON_DUPLICATE=false

# Legacy fallbacks temporaires, supportés par le code pendant la migration.
# MATHERIA_ADMIN_PASSWORD=
# MATHERIA_BETA_ACCESS_CODE=
```

Les nouvelles variables `SPRINTMATHS_*` sont prioritaires. Les variables `MATHERIA_*` restent supportées comme fallback legacy pour éviter de casser un environnement Vercel déjà configuré.

`SUPABASE_SERVICE_ROLE_KEY` est un secret serveur absolu : ne jamais le préfixer par `NEXT_PUBLIC_`.

Secrets serveur à ne jamais préfixer par `NEXT_PUBLIC_` :

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

Variables à ajouter dans Vercel Production :

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `RESEND_API_KEY`
- `SPRINTMATHS_EMAIL_FROM`
- `SPRINTMATHS_EMAIL_REPLY_TO`
- `NEXT_PUBLIC_SITE_URL`

## Configuration centrale

La marque, le domaine, l'email de contact, le titre SEO par défaut et les routes sitemap/noindex sont centralisés dans `src/lib/site.ts`.

Valeurs principales :

- `SITE_NAME`: `SprintMaths`
- `NEXT_PUBLIC_SITE_URL`: `https://sprintmaths.fr`
- Email de contact public : `contact@sprintmaths.fr`

À faire côté registrar ou fournisseur mail : créer `contact@sprintmaths.fr`.

## Supabase

SprintMaths utilise Supabase pour les leads, les codes d'accès et les sessions.

Tables conservées :

- `leads`
- `beta_access`
- `access_codes`
- `practice_sessions`

Ne pas renommer ces tables pour le rebranding.

Installer le schéma depuis `supabase/schema.sql` dans le SQL Editor Supabase.

## Stripe Payment Link

Le tunnel Stripe reste volontairement simple : Payment Link Stripe, sans Checkout custom.
Le webhook `checkout.session.completed` automatise la génération du code d'accès
et l'envoi email.

Checklist Payment Link :

- Produit : `SprintMaths - Pack Révision Express`.
- Prix : `39 €` en paiement unique.
- Vérifier le Payment Link et renseigner `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`.
- Configurer la success URL : `https://sprintmaths.fr/merci`.
- Rendre l'email client obligatoire côté Stripe.
- Autoriser les codes promotionnels si `COUSIN10` est utilisé.

## Configuration Stripe webhook

1. Ouvrir le Stripe Dashboard.
2. Aller dans Developers.
3. Aller dans Webhooks.
4. Cliquer sur Add endpoint.
5. URL : `https://sprintmaths.fr/api/stripe/webhook`.
6. Events : `checkout.session.completed`.
7. Copier le Signing secret dans `STRIPE_WEBHOOK_SECRET`.
8. Ajouter `STRIPE_SECRET_KEY`.
9. Redéployer Vercel.

## Configuration Resend

1. Créer un compte Resend.
2. Ajouter le domaine `sprintmaths.fr`.
3. Ajouter les DNS SPF/DKIM fournis par Resend dans Vercel DNS.
4. Vérifier le domaine.
5. Créer une API key.
6. Ajouter `RESEND_API_KEY` dans Vercel.
7. Configurer `SPRINTMATHS_EMAIL_FROM="SprintMaths <contact@sprintmaths.fr>"`.
8. Configurer `SPRINTMATHS_EMAIL_REPLY_TO=contact@sprintmaths.fr`.

Ne pas utiliser l'email OVH SMTP pour l'envoi applicatif. OVH peut servir à
recevoir `contact@sprintmaths.fr` si configuré, mais les emails transactionnels
partent via Resend.

## Tunnel post-paiement

Flux automatique :

1. Le client paie via Stripe Payment Link.
2. Stripe appelle `/api/stripe/webhook`.
3. La signature du webhook est vérifiée avec `STRIPE_WEBHOOK_SECRET`.
4. SprintMaths récupère l'email client de la session Stripe.
5. Un code unique `MATH-XXXX` est créé dans `access_codes`.
6. `stripe_session_id` empêche une double génération lors des retries Stripe.
7. Resend envoie automatiquement le code au client.
8. Le client crée son espace sur `/merci`.
9. Le client peut revenir via `/connexion`.

Les codes `MATH-XXXX` sont conservés pour simplicité et cohérence maths.

`/admin/codes` reste disponible pour générer un code manuel, dépanner un client
ou vérifier les derniers codes créés.

## Email automatique après réservation

Objet : `Votre code d'accès SprintMaths`

Corps :

```txt
Bonjour,

Merci pour votre réservation du Pack Révision Express SprintMaths.

Voici votre code d'accès personnel :
[CODE_UNIQUE]

Pour créer l'espace élève :
https://sprintmaths.fr/merci

Si vous avez déjà créé l'espace :
https://sprintmaths.fr/connexion

Ce code est personnel et utilisable une seule fois pour créer l'espace élève.

À bientôt,
L'équipe SprintMaths
```

L'email ne contient aucune donnée élève et aucun pixel de tracking.

## Test local Stripe webhook

Installer Stripe CLI si besoin, puis lancer :

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Copier le webhook signing secret local dans `.env.local` :

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

Lancer l'application :

```bash
npm run dev
```

Déclencher un événement test :

```bash
stripe trigger checkout.session.completed
```

L'event généré par Stripe CLI peut ne pas contenir un email réaliste. En
développement uniquement, renseigner `SPRINTMATHS_TEST_CUSTOMER_EMAIL` pour
tester le flux complet d'insertion et d'envoi email.

## Pages publiques et SEO

Pages publiques indexables :

- `/`
- `/diagnostic`
- `/bac-terminale-maths`
- `/bac-premiere-maths`
- `/brevet-maths`
- `/programme-maths-terminale`
- `/programme-maths-premiere`
- `/programme-maths-brevet`
- `/methodes-maths-terminale`
- `/exercices-maths-terminale`
- `/articles`
- `/articles/[slug]`
- `/mentions-legales`
- `/cgv`
- `/politique-confidentialite`
- `/preferences-confidentialite`
- `/remboursement`

Le sitemap est généré par `src/app/sitemap.ts` et utilise `absoluteUrl()` depuis la config centrale.

`src/app/robots.ts` déclare `/sitemap.xml`, autorise les pages publiques et désautorise notamment `/app/*` et `/admin/*`.

Pages privées ou transactionnelles noindex :

- `/app/*`
- `/merci`
- `/connexion`
- `/acces`
- `/diagnostic/resultat`

Les JSON-LD principaux sont dans `src/lib/seo.ts` et utilisent `SprintMaths` pour `Organization`, `WebSite`, `Product`, FAQ et breadcrumbs.

## Tracking marketing préparé

Le tracking est désactivé par défaut si `NEXT_PUBLIC_TRACKING_MODE` n'est pas configuré.

Modes possibles :

- `off`: aucun event `dataLayer`, aucun historique debug local.
- `internal`: events first-party dans `window.dataLayer` et debug local.
- `gtm-ready`: events `dataLayer` et chargement optionnel GTM si `NEXT_PUBLIC_GTM_ID` est défini.
- `ads-ready`: base GTM plus helpers pixels directs disponibles.

Events internes :

- `sprintmaths_page_view`
- `sprintmaths_diagnostic_started`
- `sprintmaths_diagnostic_completed`
- `sprintmaths_lead`
- `sprintmaths_view_offer`
- `sprintmaths_initiate_checkout`
- `sprintmaths_complete_registration`

Aucun event `sprintmaths_purchase` n'est déclenché depuis `/merci`. Toute mesure
d'achat doit rester liée à une preuve serveur fiable du paiement Stripe.

Les événements n'envoient pas l'email, le pseudo, les scores détaillés, les notes virtuelles, les chapitres faibles, l'historique pédagogique ou les réponses aux exercices.

## Stockage local

Les clés `localStorage` ont été migrées vers le préfixe `sprintmaths_*`.

Clés principales :

- `sprintmaths_student_profile`
- `sprintmaths_session_history`
- `sprintmaths_guided_exercise_history`
- `sprintmaths_bac_mock_exam_history`
- `sprintmaths_utm_context`
- `sprintmaths_tracking_debug`
- `sprintmaths_tracking_preference`
- `sprintmaths_cookie_consent`

Le helper `src/lib/storageKeys.ts` lit encore les anciennes clés legacy si une nouvelle clé n'existe pas, puis réécrit la valeur sous la clé SprintMaths.

Tests utiles dans la console navigateur :

```js
localStorage.getItem("sprintmaths_utm_context")
localStorage.getItem("sprintmaths_tracking_debug")
localStorage.getItem("sprintmaths_student_profile")
```

## Produit

Fonctionnalités principales :

- Landing page mobile-first.
- Diagnostic gratuit.
- Résultat diagnostic.
- Stripe Payment Link.
- Codes d'accès uniques.
- `/merci`, `/connexion`, `/acces`.
- Espace élève `/app`.
- Programme, chapitres, plan, progression.
- Sessions QCM.
- Mode Bac Terminale.
- Sujets type bac guidés.
- Note virtuelle indicative `/20`.
- Fiches méthodes.
- Articles SEO.
- Pages légales.
- Sitemap et robots.

Limites assumées :

- Pas de promesse de réussite garantie.
- Pas d'annales officielles.
- Pas de surpromesse IA.
- Pas d'authentification serveur complète.

## Vercel et domaine

Checklist Vercel :

- Ajouter `sprintmaths.fr` au projet Vercel.
- Configurer les DNS chez le registrar selon les valeurs Vercel.
- Définir `NEXT_PUBLIC_SITE_URL=https://sprintmaths.fr`.
- Définir `STRIPE_SECRET_KEY`.
- Définir `STRIPE_WEBHOOK_SECRET`.
- Définir `RESEND_API_KEY`.
- Définir `SPRINTMATHS_EMAIL_FROM="SprintMaths <contact@sprintmaths.fr>"`.
- Définir `SPRINTMATHS_EMAIL_REPLY_TO=contact@sprintmaths.fr`.
- Définir `SPRINTMATHS_ADMIN_PASSWORD`.
- Définir `SPRINTMATHS_DEV_ACCESS_CODE` seulement pour le développement si nécessaire.
- Conserver temporairement les fallbacks legacy `MATHERIA_*` si l'environnement les utilise déjà.
- Redéployer après toute modification des variables `NEXT_PUBLIC_*`.
- Vérifier `/sitemap.xml` et `/robots.txt` après déploiement.

## Pages légales

Les pages légales sont des modèles de travail à compléter avant toute vente réelle :

- identité de l'éditeur
- forme juridique
- adresse
- directeur de publication
- bases légales RGPD
- durées de conservation
- délai de remboursement
- clauses liées au droit de rétractation

Elles ne remplacent pas une validation juridique, comptable ou conformité adaptée à la situation exacte de l'entreprise.
