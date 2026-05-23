# SprintMaths

SprintMaths est une web app mobile-first de révision en mathématiques.

Positionnement : **Le programme de révision maths du Brevet au Bac**.

Promesse courte : des exercices guidés, un plan clair et une progression visible pour réviser efficacement.

Le projet a été rebrandé vers **SprintMaths** le 2026-05-08 pour s'aligner avec le nouveau domaine `https://www.sprintmaths.com`.

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
Voir aussi la checklist Vercel complète dans `docs/deployment.md`.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=https://www.sprintmaths.com
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_GA4_ID=
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_ID=
NEXT_PUBLIC_SNAP_PIXEL_ID=
NEXT_PUBLIC_TRACKING_MODE=

SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
SPRINTMATHS_EMAIL_FROM="SprintMaths <contact@sprintmaths.com>"
SPRINTMATHS_EMAIL_REPLY_TO=contact@sprintmaths.com
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
- `NEXT_PUBLIC_TRACKING_MODE=gtm-ready` si le tracking marketing doit être actif
- `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX` avec l'ID du conteneur GTM SprintMaths

## Configuration centrale

La marque, le domaine, l'email de contact, le titre SEO par défaut et les routes sitemap/noindex sont centralisés dans `src/lib/site.ts`.

Valeurs principales :

- `SITE_NAME`: `SprintMaths`
- `NEXT_PUBLIC_SITE_URL`: `https://www.sprintmaths.com`
- Email de contact public : `contact@sprintmaths.com`

À faire côté registrar ou fournisseur mail : créer `contact@sprintmaths.com`.

## Supabase

SprintMaths utilise Supabase pour les leads, les codes d'accès et les sessions.

Tables conservées :

- `leads`
- `beta_access`
- `access_codes`
- `practice_sessions`

Ne pas renommer ces tables pour le rebranding.

Installer le schéma depuis `supabase/schema.sql` dans le SQL Editor Supabase.

## Test du funnel planning

Tunnel à vérifier avant publicité :

1. `/bac-maths-2027` : cliquer sur un CTA planning et vérifier l'event
   `click_lead_magnet_planning`.
2. `/planning-revision-bac-maths` : soumettre le formulaire.
3. `/api/leads/planning` : vérifier la réponse JSON, la sauvegarde Supabase
   et le statut `emailSent`.
4. `/planning-bac-maths-2027.html` : vérifier que la version imprimable s'ouvre.
5. Après succès formulaire : vérifier les liens vers `/diagnostic`,
   `/planning-bac-maths-2027.html` et `/bac-maths-2027`.

Variables utiles en local :

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_TRACKING_MODE=internal

# Pour persister les leads dans Supabase :
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Pour envoyer réellement l'email. Si absent, l'API doit rester en succès
# avec emailSent=false et emailSkippedReason=resend_not_configured.
RESEND_API_KEY=
SPRINTMATHS_EMAIL_FROM="SprintMaths <contact@sprintmaths.com>"
SPRINTMATHS_EMAIL_REPLY_TO=contact@sprintmaths.com
```

Commandes curl locales, avec une adresse de test non personnelle :

```bash
curl -i http://localhost:3000/api/leads/planning \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email","sourcePage":"/planning-revision-bac-maths"}'

curl -i http://localhost:3000/api/leads/planning \
  -H "Content-Type: application/json" \
  -d '{"email":"qa-planning@example.test","sourcePage":"/planning-revision-bac-maths","website":"bot"}'

curl -i http://localhost:3000/api/leads/planning \
  -H "Content-Type: application/json" \
  -d '{"email":"qa-planning@example.test","sourcePage":"/planning-revision-bac-maths"}'
```

Résultats attendus :

- email invalide : HTTP 400, message `Entre une adresse email valide.`
- honeypot rempli : HTTP 200, `success=true`, `saved=false`,
  `emailSent=false`.
- email valide : HTTP 200, `success=true`; `saved=true` si Supabase est
  configuré, sinon fallback local `mocked=true` en développement.
- Resend absent : pas de crash, `emailSent=false`,
  `emailSkippedReason=resend_not_configured`.
- Rate limit : 5 demandes par heure et par IP. Les tests normaux ci-dessus ne
  doivent pas le déclencher ; redémarrer `npm run dev` réinitialise le store
  mémoire en local.

Debug tracking local :

```js
localStorage.setItem("sprintmaths_tracking_debug", "[]")
window.dataLayer = []
```

Avec `NEXT_PUBLIC_TRACKING_MODE=internal`, cliquer sur les CTA et soumettre le
formulaire, puis vérifier :

```js
window.dataLayer.map((event) => event.event)
JSON.parse(localStorage.getItem("sprintmaths_tracking_debug") || "[]")
window.dataLayer.some((event) => JSON.stringify(event).includes("@"))
```

La dernière expression doit retourner `false` : aucun email ne doit partir dans
`dataLayer` ou l'historique debug.

Procédure Vercel Preview :

1. Définir les variables Preview nécessaires dans Vercel, sans préfixer les
   secrets serveur avec `NEXT_PUBLIC_`.
2. Déployer la preview, puis ouvrir `/bac-maths-2027`,
   `/planning-revision-bac-maths` et `/planning-bac-maths-2027.html`.
3. Rejouer les trois curl ci-dessus en remplaçant `http://localhost:3000` par
   l'URL Preview.
4. Vérifier dans Supabase que le lead de test apparaît dans `leads` avec une
   source `planning_bac_maths_2027:/planning-revision-bac-maths`.
5. Si GTM est activé, vérifier dans GTM Preview/Tag Assistant les events
   `click_lead_magnet_planning`, `lead_magnet_request` et `email_optin`.

## Stripe Payment Link

Le tunnel Stripe reste volontairement simple : Payment Link Stripe, sans Checkout custom.
Le webhook `checkout.session.completed` automatise la génération du code d'accès
et l'envoi email.

Checklist Payment Link :

- Produit : `SprintMaths - Pack Révision Express`.
- Prix : `39 €` en paiement unique.
- Offre Bac 2026 : `29 €` avec le code public `BAC2026`.
- Vérifier le Payment Link et renseigner `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`.
- Configurer la success URL : `https://www.sprintmaths.com/merci`.
- Rendre l'email client obligatoire côté Stripe.
- Autoriser les codes promotionnels pour `BAC2026` et les codes partenaires.

## Configuration Stripe webhook

1. Ouvrir le Stripe Dashboard.
2. Aller dans Developers.
3. Aller dans Webhooks.
4. Cliquer sur Add endpoint.
5. URL : `https://www.sprintmaths.com/api/stripe/webhook`.
6. Events : `checkout.session.completed`.
7. Copier le Signing secret dans `STRIPE_WEBHOOK_SECRET`.
8. Ajouter `STRIPE_SECRET_KEY`.
9. Redéployer Vercel.

## Configuration Resend

1. Créer un compte Resend.
2. Ajouter le domaine `sprintmaths.com`.
3. Ajouter les DNS SPF/DKIM fournis par Resend dans Vercel DNS.
4. Vérifier le domaine.
5. Créer une API key.
6. Ajouter `RESEND_API_KEY` dans Vercel.
7. Configurer `SPRINTMATHS_EMAIL_FROM="SprintMaths <contact@sprintmaths.com>"`.
8. Configurer `SPRINTMATHS_EMAIL_REPLY_TO=contact@sprintmaths.com`.

Ne pas utiliser l'email OVH SMTP pour l'envoi applicatif. OVH peut servir à
recevoir `contact@sprintmaths.com` si configuré, mais les emails transactionnels
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
https://www.sprintmaths.com/merci

Si vous avez déjà créé l'espace :
https://www.sprintmaths.com/connexion

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

`src/app/robots.ts` déclare `/sitemap.xml`, autorise les pages publiques et désautorise notamment `/app/*`, `/admin/*` et `/api/*`.

Pages privées ou transactionnelles noindex :

- `/app/*`
- `/admin/*`
- `/merci`
- `/connexion`
- `/acces`
- `/diagnostic/resultat`

Les JSON-LD principaux sont dans `src/lib/seo.ts` et utilisent `SprintMaths` pour `Organization`, `WebSite`, `Product`, FAQ et breadcrumbs.

## Tracking / Analytics

Le tracking est désactivé par défaut. Si `NEXT_PUBLIC_TRACKING_MODE` est absent,
vide ou différent des valeurs autorisées, `src/lib/tracking.ts` retourne `off` :
aucun event n'est poussé dans `window.dataLayer` et aucun historique debug local
n'est écrit.

Variables d'environnement :

- `NEXT_PUBLIC_TRACKING_MODE`: mode global du helper tracking.
- `NEXT_PUBLIC_GTM_ID`: conteneur Google Tag Manager chargé en mode `gtm-ready`
  ou `ads-ready`.
- `NEXT_PUBLIC_GA4_ID`: présent dans les exemples d'environnement, mais non lu
  par le code aujourd'hui.
- `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_META_PIXEL_ID`,
  `NEXT_PUBLIC_TIKTOK_PIXEL_ID`, `NEXT_PUBLIC_SNAP_PIXEL_ID`: réservés aux
  pixels directs en mode `ads-ready`; les scripts fournisseurs ne sont pas
  chargés par le code actuel.

Exemple local ou Vercel Production pour activer le tracking GTM :

```env
NEXT_PUBLIC_TRACKING_MODE=gtm-ready
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Valeurs possibles de `NEXT_PUBLIC_TRACKING_MODE` :

- `off`: no-op complet.
- `internal`: events poussés dans `window.dataLayer` et debug local seulement ;
  aucun provider externe n'est chargé.
- `gtm-ready`: events `dataLayer` plus chargement de GTM si `NEXT_PUBLIC_GTM_ID`
  est défini.
- `ads-ready`: base `gtm-ready` plus helpers pixels directs disponibles, mais
  seulement si les scripts pixels sont chargés ailleurs.

Providers actuellement branchés :

- GA4 : non branché directement ; pas de script `gtag.js` initialisé par
  `NEXT_PUBLIC_GA4_ID`.
- Vercel Analytics : non installé.
- Plausible : non installé.
- PostHog : non installé.
- Console/dev only : les events serveur Stripe sont des `console.info`.
- No-op : oui, comportement par défaut si le mode est absent ou invalide.
- GTM : branché via `src/components/tracking/GoogleTagManager.tsx` avec
  `NEXT_PUBLIC_TRACKING_MODE=gtm-ready` et `NEXT_PUBLIC_GTM_ID`.

À mettre dans Vercel avant publicité :

```env
NEXT_PUBLIC_TRACKING_MODE=gtm-ready
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

Le conteneur GTM doit ensuite publier les tags GA4/Ads et les triggers basés sur
les events `dataLayer`. Sans conteneur GTM publié, les events client existent
localement mais ne sont pas envoyés à un outil analytics externe.

Vérifier en local :

1. Ajouter les deux variables ci-dessus dans `.env.local`.
2. Redémarrer `npm run dev`, car les variables `NEXT_PUBLIC_*` sont injectées au
   build/dev server.
3. Ouvrir une page publique, cliquer sur un CTA tracké, puis vérifier dans la
   console navigateur :

```js
window.dataLayer
localStorage.getItem("sprintmaths_tracking_debug")
```

4. Si un vrai `NEXT_PUBLIC_GTM_ID` est configuré, vérifier aussi dans le preview
   Google Tag Manager que les events arrivent.

Vérifier en production :

1. Dans Vercel Production, définir `NEXT_PUBLIC_TRACKING_MODE=gtm-ready` et
   `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`.
2. Redéployer : les variables `NEXT_PUBLIC_*` sont figées dans le bundle client
   au moment du build.
3. Ouvrir `https://www.sprintmaths.com`, vérifier que `window.dataLayer`
   contient `gtm.js` puis les events SprintMaths après interaction.
4. Vérifier dans GTM Preview/Tag Assistant, puis dans le provider final configuré
   depuis GTM, par exemple GA4 DebugView si GA4 est branché dans le conteneur.

Events réellement émis côté client aujourd'hui :

- `page_view`
- `click_diagnostic`
- `click_exercises`
- `click_offer`
- `stripe_click`
- `diagnostic_start`
- `diagnostic_complete`
- `click_lead_magnet_planning`
- `lead_magnet_request`
- `email_optin`
- `account_created`
- `sprintmaths_view_offer`
- `urgency_banner_click`
- `click_bac2027_diagnostic`
- `click_bac2027_exercises`
- `click_bac2027_offer`
- `click_bac2027_stripe`
- `click_typebac_offer`
- `guarantee_view`
- `faq_expand`

Events disponibles dans le type mais non émis côté client aujourd'hui :

- `lead_magnet_download`
- `free_exercise_start`
- `free_exercise_complete`
- `purchase`
- `access_code_created`
- `first_session_start`
- `session_complete`
- `refund_request`
- `sprintmaths_page_view`
- `sprintmaths_diagnostic_started`
- `sprintmaths_diagnostic_completed`
- `sprintmaths_lead`
- `sprintmaths_initiate_checkout`
- `sprintmaths_complete_registration`
- `bac2026_primary_cta_click`
- `bac2026_secondary_cta_click`
- `pricing_cta_click`

Logs serveur non sensibles :

- `purchase`: loggé dans `/api/stripe/webhook` après `checkout.session.completed`
  payé.
- `access_code_created`: loggé quand un nouveau code est créé.
- `access_code_email_sent`: loggé quand Resend confirme l'envoi.

Ne jamais envoyer dans analytics : email, code d'accès, pseudo, réponses aux
exercices, scores détaillés, notes indicatives `/20`, chapitres faibles,
historique pédagogique ou toute autre donnée personnelle. Les events client
actuels passent par `sanitizeTrackingParams()` et ne doivent rester composés que
de paramètres marketing non sensibles.

Toute mesure d'achat doit rester liée à une preuve serveur fiable du paiement
Stripe. Le client ne déclenche pas d'event `purchase`.

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
- Note indicative `/20`.
- Fiches méthodes.
- Articles SEO.
- Pages légales.
- Sitemap et robots.

Limites assumées :

- Pas de promesse de réussite garantie.
- Pas d'annales officielles.
- Pas de surpromesse technologique.
- Pas d'authentification serveur complète.

## Vercel et domaine

La procédure détaillée de configuration Preview/Production est documentée dans
`docs/deployment.md`.

Checklist Vercel :

- Ajouter `www.sprintmaths.com` au projet Vercel.
- Configurer les DNS chez le registrar selon les valeurs Vercel.
- Définir `NEXT_PUBLIC_SITE_URL=https://www.sprintmaths.com`.
- Définir `STRIPE_SECRET_KEY`.
- Définir `STRIPE_WEBHOOK_SECRET`.
- Définir `RESEND_API_KEY`.
- Définir `SPRINTMATHS_EMAIL_FROM="SprintMaths <contact@sprintmaths.com>"`.
- Définir `SPRINTMATHS_EMAIL_REPLY_TO=contact@sprintmaths.com`.
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
