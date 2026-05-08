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
SPRINTMATHS_ADMIN_PASSWORD=
SPRINTMATHS_DEV_ACCESS_CODE=

# Legacy fallbacks temporaires, supportés par le code pendant la migration.
# MATHERIA_ADMIN_PASSWORD=
# MATHERIA_BETA_ACCESS_CODE=
```

Les nouvelles variables `SPRINTMATHS_*` sont prioritaires. Les variables `MATHERIA_*` restent supportées comme fallback legacy pour éviter de casser un environnement Vercel déjà configuré.

`SUPABASE_SERVICE_ROLE_KEY` est un secret serveur absolu : ne jamais le préfixer par `NEXT_PUBLIC_`.

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

Le tunnel Stripe reste volontairement simple : pas de webhook, pas de Checkout custom.

Checklist Stripe manuelle :

- Renommer le produit Stripe en `SprintMaths - Pack Révision Express`.
- Vérifier que le prix reste `39 €` en paiement unique.
- Vérifier le Payment Link et renseigner `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`.
- Configurer la success URL : `https://sprintmaths.fr/merci`.
- Si un code promo cousin est utilisé, conserver `COUSIN10`.
- Si Stripe le permet sur le lien choisi, tester `prefilled_promo_code`.

## Tunnel post-paiement

Flux manuel actuel :

1. Le client paie via Stripe Payment Link.
2. Le fondateur ouvre `/admin/codes`.
3. Il saisit `SPRINTMATHS_ADMIN_PASSWORD`.
4. Il génère un code personnel `MATH-XXXX`.
5. Il envoie le code au client avec le modèle d'email ci-dessous.
6. Le client crée son espace sur `/merci`.
7. Le client peut revenir via `/connexion`.

Les codes `MATH-XXXX` sont conservés pour simplicité et cohérence maths.

## Email manuel après réservation

Objet : `Votre accès SprintMaths - Pack Révision Express`

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

À bientôt,
L'équipe SprintMaths
```

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

Aucun event `sprintmaths_purchase` n'est déclenché tant qu'il n'y a pas de preuve serveur fiable du paiement Stripe.

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
- Pas de webhook Stripe pour l'instant.
- Pas d'authentification serveur complète.

## Vercel et domaine

Checklist Vercel :

- Ajouter `sprintmaths.fr` au projet Vercel.
- Configurer les DNS chez le registrar selon les valeurs Vercel.
- Définir `NEXT_PUBLIC_SITE_URL=https://sprintmaths.fr`.
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
