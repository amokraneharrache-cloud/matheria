# J74 — Reprise de l'envoi du code d'accès après un échec

Branche `codex/j74-reprise-email-code`. **Correctif vérifié en local sur branche.
La production n'est pas corrigée par ce lot.**

## Le défaut

Reproduit en local le 18/09/2026 (`ops/J73/B-offre.md`) : paiement payé → code
d'accès créé → envoi Resend en échec → réponse HTTP 200 avec `emailSent:false`.
Le rejeu du même événement Stripe repartait en « duplicate » et **ne retentait
jamais l'email**. L'acheteur gardait un code créé et aucun moyen de le recevoir.

Le seul rattrapage existant, `RESEND_ACCESS_CODE_ON_DUPLICATE=true`, est un
interrupteur global : il aurait aussi réexpédié les emails déjà livrés, à chaque
rejeu. Il n'est plus lu (voir « Retour arrière »).

Aucun client réel affecté n'a été démontré : le diagnostic et cette correction
sont locaux.

## Le mécanisme

Une ligne d'état par (code d'accès, canal) dans `access_code_deliveries`.

| Statut    | Signification                                                       | Reprise |
|-----------|---------------------------------------------------------------------|---------|
| `pending` | Réservation prise, tentative en cours                                | Après expiration de la réservation (10 min), et seulement dans la fenêtre d'idempotence |
| `sent`    | Requête **acceptée par l'API Resend**. Pas une preuve de réception   | Jamais |
| `failed`  | Non-acceptation certaine (erreur API de refus, sans identifiant)     | Oui, série de clé neuve |
| `unknown` | Résultat **ambigu** : 5xx, coupure réseau, état non écrit après envoi | Seulement dans la fenêtre d'idempotence, avec la même clé |

Règles tenues :

1. **Aucun envoi sans état écrit d'abord.** Si l'état ne peut pas être
   enregistré, le webhook répond 503 et n'appelle pas le fournisseur — Stripe
   rejouera.
2. **Réservation atomique** par `UNIQUE(access_code_id, channel)` à l'insertion,
   et par `UPDATE ... WHERE id = ? AND status = ?` (et `claimed_at` pour une
   reprise de `pending`) ensuite. C'est la base qui arbitre, pas le processus.
3. **Réservation abandonnée** (worker tué) : reprise après 10 minutes, mais
   uniquement protégée par la clé d'idempotence — un worker mort a pu envoyer.
4. **Clé d'idempotence** stable, liée à la session Stripe, payload stable.
   Resend conserve une clé **24 h**
   (<https://resend.com/docs/dashboard/emails/idempotency-keys>, consulté le
   19/09/2026) ; au-delà elle ne dédoublonne plus, donc l'état reste `unknown`
   et attend un **rapprochement manuel**. Une même clé avec un payload différent
   est refusée en 409 par le fournisseur : le payload ne doit pas varier.
5. **Codes legacy** (`delivery_tracking_started_at` NULL, aucune ligne de
   livraison) : état d'envoi inconnu, **jamais** de renvoi automatique.

Ce qui n'est **pas** garanti, et ne doit pas être promis : « exactement un
envoi » dans tous les cas distribués, et « reçu en boîte » — `sent` signifie
seulement que le fournisseur a accepté la requête.

## Ordre exact de mise en production (non effectué par ce lot)

1. **Migration d'abord**, code ensuite. `supabase/migrations/2026-09-19-access-code-delivery-state.sql`
   sur la base cible. Elle est additive et idempotente : aucune ligne existante
   n'est réécrite, aucune ligne de livraison n'est créée.
   *Si le code partait avant la migration, l'insertion d'un nouveau code
   échouerait sur la colonne absente (42703) et le webhook répondrait 500 —
   Stripe rejouerait, mais aucun code ne serait créé entre-temps.*
2. Déployer la branche (après revue et fusion, qui ne font pas partie de ce lot).
3. Vérifier sur le premier achat réel : une ligne `access_code_deliveries` en
   `sent` avec un `provider_message_id`.
4. Surveiller `SELECT status, count(*) FROM access_code_deliveries GROUP BY 1` :
   toute ligne `unknown` ou `failed` est un rapprochement manuel à faire.
5. **Ne pas** backfiller l'historique, ni en `failed`, ni en `sent`.

### Retour arrière

- Revenir au code précédent est sans perte : l'ancienne version ignore la
  colonne et la table ajoutées, et retrouve son comportement d'avant (y compris
  le défaut). Les lignes d'état déjà écrites restent et resserviront au
  redéploiement.
- `RESEND_ACCESS_CODE_ON_DUPLICATE` **n'est plus lu**. Ne pas le réintroduire :
  l'activer renverrait les emails déjà livrés. S'il est encore défini dans
  l'environnement, il est sans effet — le retirer est préférable.
- Annuler la migration n'est pas nécessaire ; si elle devait l'être,
  `DROP TABLE access_code_deliveries` et
  `ALTER TABLE access_codes DROP COLUMN delivery_tracking_started_at`
  ne touchent aucune donnée d'achat.

## Ce que les tests prouvent — et ce qu'ils ne prouvent pas

`npm run test:webhook` (17 tests) exerce le vrai handler et la vraie
vérification de signature Stripe, contre des fakes Supabase/Resend **en
mémoire** : première panne puis succès au rejeu, pannes multiples, rejeux après
succès, concurrence sur la même session, échec d'écriture d'état avant envoi,
acceptation suivie d'un échec d'enregistrement, coupure réseau, dépassement de
la fenêtre d'idempotence, code legacy, refus certain, signature invalide et
session impayée.

**Non vérifié :** les garanties SQL réelles. Les fakes reproduisent les
*conditions* attendues (violation 23505, UPDATE filtré ne touchant que les
lignes encore dans l'état lu) dans un process mono-thread ; ils ne prouvent ni
l'index UNIQUE, ni l'atomicité de l'UPDATE sous concurrence réelle, ni le
comportement réel de l'idempotence Resend. Aucun environnement Postgres isolé
n'était disponible dans ce lot. À valider avant mise en production, par exemple
en appliquant la migration sur une base locale puis en lançant deux `UPDATE`
concurrents sur la même ligne `pending`.
