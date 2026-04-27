# CHANGELOG MATHERIA

## 2026-04-27 — Sprint 0 initialisé

### Objectif du sprint
Créer une première version de validation commerciale pour Matheria avant de développer l’application complète.

### Décisions business validées
- Nom du projet : Matheria
- Cible acheteuse : parents d’élèves de 3e et de Première
- Utilisateur final : élève sur mobile
- Positionnement : préparation brevet et bac de maths avec un coach IA personnalisé
- Offre de lancement : Pack Révision Express à 39 €
- Budget initial : maximum 300 €
- Objectif : valider l’intérêt marché avant de développer le produit complet

### Périmètre Sprint 0
Inclus :
- landing page marketing
- diagnostic gratuit en 4 étapes
- page résultat diagnostic
- collecte de leads via Supabase ou fallback console
- CTA vers précommande du Pack Révision Express

Exclus :
- authentification
- paiement Stripe complet
- IA
- espace élève
- dashboard parent
- upload photo
- application mobile native

### Stack utilisée
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase client
- Vercel prévu pour le déploiement

### Modifications principales générées
- création du projet Next.js
- installation des dépendances
- création des composants UI
- création de la landing page
- création du tunnel diagnostic
- création de la page résultat
- création de la couche Supabase avec fallback développement

### Points à corriger après review
- corriger la mention 2024 en 2026
- renforcer l’urgence liée aux examens
- afficher le prix 39 € dans le bouton de réservation
- vérifier les formulations marketing pour éviter les promesses excessives

### Prochaines étapes
1. connecter Supabase réellement
2. tester la collecte des leads
3. préparer Stripe Payment Link ou Stripe Checkout
4. déployer sur Vercel
5. brancher le nom de domaine
6. lancer un test d’acquisition limité

## 2026-04-27 — Corrections copywriting landing page

### Modifications
- Remplacement de “Diagnostic précis” par “Diagnostic rapide”
- Harmonisation des sessions à 10 minutes
- Remplacement de “Diagnostic complet de niveau” par “Bilan de départ personnalisé”
- Remplacement de “LE PLUS POPULAIRE” par “OFFRE DE LANCEMENT”
- Remplacement du CTA final pour éviter une promesse de réussite trop forte

### Objectif
Rendre la page plus honnête, plus crédible et plus conforme au vrai périmètre du Sprint 0.

## 2026-04-27 — Audit tunnel diagnostic

### Modifications
- Remplacement de la formulation “analyse” par “bilan de départ” dans l’étape finale du diagnostic.

### Vérifications
- CTA landing page vers diagnostic
- Enchaînement des 4 étapes
- Champs obligatoires
- Conservation des choix utilisateur
- Sauvegarde lead via Supabase ou fallback console
- Redirection vers page résultat
- Affichage dynamique du résultat
- Absence de secret hardcodé

## 2026-04-27 — Connexion Supabase validée

### Modifications
- Configuration réelle de Supabase via `.env.local`
- Création de la table `leads`
- Ajout du schéma SQL dans `supabase/schema.sql`
- Documentation de la connexion Supabase dans le README
- Test réel confirmé : un diagnostic est bien stocké dans Supabase

### Objectif
Permettre à Matheria de collecter des leads réels depuis le tunnel diagnostic.

## 2026-04-27 — Précommande Stripe Payment Link

### Modifications
- Ajout de la variable `NEXT_PUBLIC_STRIPE_PAYMENT_LINK`
- Branchement des CTA de réservation vers Stripe Payment Link si configuré
- Fallback vers le diagnostic si le lien Stripe n’est pas encore configuré
- Documentation de la précommande Stripe dans le README

### Objectif
Permettre de tester la vraie intention d’achat du Pack Révision Express à 39 € sans développer une intégration Stripe complète.

## 2026-04-27 — Audit final Sprint 0 avant déploiement

### Vérifications
- Routes principales
- CTA
- Diagnostic
- Supabase
- Stripe Payment Link
- Copywriting
- Sécurité des variables d’environnement
- Build de production

### Résultat
Audit passé avec succès. Aucun bug bloquant détecté.
- Les routes (`/`, `/diagnostic`, `/diagnostic/resultat`) sont opérationnelles.
- Le copywriting a été révisé pour rester honnête et sans promesse exagérée.
- Les fallbacks (Stripe, Supabase) fonctionnent parfaitement.
- `.env.local` est bien ignoré par Git.
- Le build de production s'est terminé sans erreur.
L'application est prête pour le déploiement.
