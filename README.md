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

## SEO Foundation

Matheria dispose désormais d'une base SEO technique pour commencer à positionner des pages publiques indexables sur les requêtes liées au brevet, au bac de maths Première et au bac de maths Terminale.

### Stratégie SEO

- Des pages publiques par objectif : brevet, bac Première, bac Terminale.
- Des pages programme par niveau alimentées par `src/data/programs.ts`.
- Des pages Terminale dédiées aux méthodes et aux exercices guidés.
- Un maillage interne depuis la landing page et entre les pages SEO.
- Des données structurées JSON-LD sans témoignage inventé, sans note agrégée et sans promesse automatique.

### Pages publiques créées

- `/bac-terminale-maths`
- `/bac-premiere-maths`
- `/brevet-maths`
- `/programme-maths-terminale`
- `/programme-maths-premiere`
- `/programme-maths-brevet`
- `/methodes-maths-terminale`
- `/exercices-maths-terminale`

### Configuration technique

Ajoutez l'URL publique du site dans `.env.local` et sur Vercel :

```env
NEXT_PUBLIC_SITE_URL=https://matheria.fr
```

Cette variable sert à générer les URLs absolues des métadonnées, du sitemap, du robots.txt et des données structurées.

### Sitemap et robots

- `src/app/sitemap.ts` génère `/sitemap.xml` avec les pages publiques indexables.
- `src/app/robots.ts` génère `/robots.txt`, autorise les pages publiques et déclare le sitemap.
- Les chemins privés ou transactionnels sont désindexés : `/app/*`, `/merci`, `/connexion`, `/acces`, `/diagnostic/resultat`.
- `/diagnostic` reste accessible aux robots, car elle peut aider la conversion.

### Vérifications locales

Après `npm run dev`, vérifier :

- `http://localhost:3000/sitemap.xml`
- `http://localhost:3000/robots.txt`
- `http://localhost:3000/bac-terminale-maths`
- `http://localhost:3000/programme-maths-terminale`
- Le HTML de `/app`, `/merci`, `/connexion`, `/acces` et `/diagnostic/resultat` contient une balise robots `noindex`.

Avant déploiement, lancer obligatoirement :

```bash
npm run build
```

## MVP Produit post-paiement (Sprint 1)

Ce MVP permet aux utilisateurs ayant souscrit au Pack Révision Express d'accéder à un premier espace élève très pragmatique et utile, sans authentification complexe.

1. **Variables d'environnement nécessaires :**
   En plus des variables Supabase et Stripe de base, ajoutez celles-ci dans votre `.env.local` et sur Vercel :
   ```env
   SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key_supabase
   MATHERIA_ADMIN_PASSWORD=mot_de_passe_admin
   MATHERIA_BETA_ACCESS_CODE=MATHERIA2026
   ```
   *Attention : La `SUPABASE_SERVICE_ROLE_KEY` est un secret absolu, ne la préfixez jamais par `NEXT_PUBLIC_`.*
   `MATHERIA_BETA_ACCESS_CODE` reste uniquement un fallback de développement local si la service role Supabase n'est pas configurée. En production, les accès passent par des codes uniques.

2. **Exécuter le SQL :**
   Ajoutez les tables `beta_access`, `access_codes` et `practice_sessions` via le fichier `supabase/schema.sql` dans le SQL Editor de Supabase. Les données seront insérées de manière sécurisée par le serveur.

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
## Sprint 4 : Offre commerciale crédible

Ce sprint marque la transformation vers une offre mature (sans API IA).
- **Suppression du label Bêta** : L'interface est désormais propre et finalisée.
- **Nouvelle structure `programs.ts`** : Définition de 3 programmes complets (Brevet, Première, Terminale).
- **Banque d'exercices enrichie** : Plus de 380 questions intégrées localement.
- **Nouvelle page `/app/programme`** : Synthèse du programme et priorités.
- **Mise à jour des chapitres** : Ordonnancement logique par programme plutôt que par quantité d'exercices.

## Reconnexion élève (Sprint 7)

- `/merci` : sert à créer l'espace élève après le premier paiement.
- `/connexion` : sert à retrouver un espace déjà créé (email parent + code d'accès). Aucune auth Supabase.
- `/acces` : page d'aide proposant les deux parcours (se connecter ou créer un espace).

La reconnexion fonctionne ainsi :
1. L'utilisateur saisit son email parent et son code d'accès personnel.
2. La Server Action `restoreBetaAccess` (dans `src/actions/beta.ts`) vérifie que le code est `used` dans `access_codes`, puis retrouve le `beta_access` associé via la service role key côté serveur.
3. Si trouvée, le profil est restauré dans `localStorage` sous `matheria_student_profile` (même format que lors de la création initiale).
4. L'utilisateur est redirigé vers `/app`.

Limites actuelles :
- Ce n'est pas une authentification complète (pas de session serveur, pas de token).
- La protection repose sur la connaissance du code d'accès personnel + email exact.
- En développement sans `SUPABASE_SERVICE_ROLE_KEY`, la restauration renvoie une erreur propre sans faux positif.

## Codes d'accès uniques (Sprint 9)

Le code partagé historique est remplacé par des codes personnels à usage unique.

- Table `access_codes` : stocke les codes `MATH-XXXX`, leur statut (`unused`, `used`, `revoked`), l'email client optionnel et le lien vers `beta_access` après activation.
- `/admin/codes` : page admin noindex permettant au fondateur de générer, lister et révoquer les codes.
- Chaque code est utilisable une seule fois sur `/merci`.
- Après activation, le code passe en `used` et ne peut pas créer un second espace.
- `/connexion` continue de fonctionner avec email parent + code personnel déjà activé.

Flux manuel actuel après paiement :
1. Le client paie via Stripe Payment Link.
2. Le fondateur ouvre `/admin/codes`.
3. Il saisit `MATHERIA_ADMIN_PASSWORD`, ajoute éventuellement l'email client, puis génère un code.
4. Il envoie le code au client avec le modèle d'email ci-dessous.
5. Le client crée son espace sur `/merci`, puis peut revenir via `/connexion`.

## Sprint 6 : Mode Bac Terminale

Le Sprint 6 apporte une vraie profondeur pédagogique pour les élèves de Terminale préparant le baccalauréat, sans utiliser d'API IA.

- **Exercices guidés pas-à-pas** : 12 entraînements type bac avec une approche guidée et correction immédiate.
- **Fiches Méthodes** : 12 fiches détaillées reprenant les étapes, les erreurs fréquentes et des mini-exemples.
- **Intégration Dashboard & Plan** : Des CTAs dédiés pour encourager les élèves de Terminale à travailler en "Mode Bac".
- **Technologie** : Pas d'API IA. L'historique d'exercices guidés est sauvegardé localement (`localStorage`).

## Technologies

- [Next.js](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/) (Icônes)
- [Supabase](https://supabase.com/) (Database client)

## Configuration Stripe après paiement

Dans Stripe Payment Link, il est indispensable de configurer l’URL de confirmation pour rediriger les clients vers la page de création d'accès.

1. **URL de confirmation :** Configurez l'URL vers `https://votre-domaine/merci` (ou `http://localhost:3000/merci` en local).
2. **Code d'accès :** Générez un code unique depuis `/admin/codes` après chaque paiement.
3. **Cas de perte :** En cas de paiement sans création d’accès dans la foulée (abandon sur la page `/merci`), il faut retrouver le client dans Stripe et lui renvoyer le lien vers la page `/acces`.

## Email manuel après réservation

En attendant l'automatisation par Webhook, voici le modèle d'email à envoyer manuellement aux nouveaux clients :

**Objet :** Votre accès Matheria — Pack Révision Express

**Corps :**
Bonjour,

Merci pour votre réservation du Pack Révision Express Matheria.

Voici votre code d’accès personnel :
[CODE_UNIQUE]

Pour créer l’espace élève :
[LIEN /merci]

Si vous avez déjà créé l’espace :
[LIEN /connexion]

À bientôt,
L’équipe Matheria
