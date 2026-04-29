# Matheria MVP - Sprint 0

Ce projet est la validation commerciale (Sprint 0) pour l'application de révision en mathématiques **Matheria**. Il s'agit d'une landing page "mobile-first" avec un entonnoir de diagnostic gratuit pour collecter des leads.

## Lancement rapide

Le projet a été initialisé avec Next.js 15, Tailwind CSS v4, et utilise `pnpm` (ou `npm`).

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

Ouvrez [http://localhost:3000](http://localhost:3000) pour voir la landing page.

## Connexion Supabase

Pour activer l'enregistrement en base de données, Matheria nécessite une connexion à un projet Supabase.

1. **Trouver vos identifiants Supabase :**
   - **Project URL** : Dans votre tableau de bord Supabase, allez dans `Project Settings` > `API` > `Project URL`.
   - **Publishable Key** : Toujours dans `Project Settings` > `API`, récupérez la clé `anon` / `public`.

2. **Créer le fichier d'environnement :**
   Créez un fichier `.env.local` à la racine (basé sur `.env.local.example`) :
   ```env
   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_anon_supabase
   ```
   *(Ce fichier est ignoré par Git).*

3. **Exécuter le schéma de base de données :**
   Allez dans le `SQL Editor` de Supabase et copiez/collez le contenu du fichier `supabase/schema.sql` pour créer la table `leads` et ses politiques de sécurité.

4. **Tester l'enregistrement d'un lead :**
   Lancez le projet avec `npm run dev`, remplissez le diagnostic et vérifiez dans le `Table Editor` de Supabase que le lead apparaît bien dans la table `leads`.

## Précommande Stripe Payment Link

Pour tester l'intention d'achat réelle sans développer une intégration de paiement complète (Checkout / Webhooks), Matheria utilise un simple Payment Link Stripe.

1. **Créer le produit Stripe :**
   Dans votre tableau de bord Stripe, créez un produit "Pack Révision Express" à 39 € en paiement unique et générez un Payment Link.

2. **Configuration :**
   Ajoutez le lien obtenu dans votre fichier `.env.local` :
   ```env
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/votre_lien_ici
   ```

3. **Comportement :**
   - **Lien présent** : Les boutons de réservation ouvrent le lien de paiement Stripe dans un nouvel onglet, avec une mention rassurante de paiement sécurisé.
   - **Lien absent** : L'application fonctionne normalement en redirigeant les boutons vers le tunnel de diagnostic, sans crash.

## Fonctionnalités du Sprint 0

- **Landing Page** (`/`) : Présentation du problème, de la solution et de l'offre.
- **Diagnostic Gratuit** (`/diagnostic`) : Formulaire en 4 étapes fluide.
- **Page Résultat** (`/diagnostic/resultat`) : Analyse dynamique en fonction des choix de l'utilisateur.

## MVP Produit post-paiement (Sprint 1)

Ce MVP permet aux utilisateurs ayant souscrit au Pack Révision Express d'accéder à un premier espace élève très pragmatique et utile, sans authentification complexe.

1. **Variables d'environnement nécessaires :**
   En plus des variables Supabase et Stripe de base, ajoutez celles-ci dans votre `.env.local` et sur Vercel :
   ```env
   SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_supabase
   MATHERIA_BETA_ACCESS_CODE=MATHERIA2026
   ```
   *Attention : La `SUPABASE_SERVICE_ROLE_KEY` est un secret absolu, ne la préfixez jamais par `NEXT_PUBLIC_`.*

2. **Exécuter le SQL :**
   Ajoutez les tables `beta_access` et `practice_sessions` via le fichier `supabase/schema.sql` dans le SQL Editor de Supabase. Les données seront insérées de manière sécurisée par le serveur.

## Bêta Complète Sans IA (Sprint 2)

Le Sprint 2 transforme le MVP en un produit d'apprentissage complet avec progression locale :

- **Niveau Terminale** : Ajout du niveau Terminale (Bêta) sur les chapitres prioritaires (limites, dérivées, exponentielle, ln, etc.).
- **Progression Locale** : L'historique des sessions (jusqu'à 20) est conservé de manière totalement anonyme dans le `localStorage` du navigateur. La page `/app/progression` l'analyse pour fournir des statistiques en temps réel.
- **Choix de chapitres** : Possibilité de cibler une session QCM sur un sujet précis via `/app/chapitres`.
- **Limites actuelles** :
  - **Pas d'IA (API)** : Les questions et corrections (120 incluses) sont statiques et rédigées à l'avance.
  - **Pas d'upload photo** : Le format reste textuel/QCM simple pour le mobile.
  - **Contenu bêta** : La couverture des programmes n'est pas exhaustive, c'est l'essence même de l'approche MVP/Bêta.

## Plan de révision (Sprint 3)

Le Sprint 3 ajoute un vrai plan de révision structuré pour augmenter la valeur perçue du produit :

- **Route `/app/plan`** : Affiche un plan de révision personnalisé jour par jour.
- **Plans disponibles** : 7 jours et 14 jours pour chaque objectif (Brevet, Bac Première, Terminale).
- **Personnalisation** : L'historique local (`matheria_session_history`) est analysé pour détecter les chapitres faibles (score < 60 %) et les chapitres maîtrisés (score > 80 %). Les priorités sont affichées en haut du plan.
- **CTA intégrés** : Le plan est accessible depuis le dashboard `/app`, la page `/app/progression` et la page de résultat `/app/session/result`.
- **Prochaine étape recommandée** : Le dashboard affiche une carte de recommandation basée sur l'historique.
- **Limites** :
  - Les recommandations sont **déterministes** (basées sur des seuils de score), pas d'IA API.
  - Les plans sont **statiques** (rédigés à l'avance), mais l'ordre des priorités est dynamique.
## Technologies

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Icônes)
- [Supabase](https://supabase.com/) (Database client)
