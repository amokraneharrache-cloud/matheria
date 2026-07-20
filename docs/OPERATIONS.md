# Supervision de la production SprintMaths

Objectif : savoir en moins d'une minute si Supabase, Resend ou le déploiement de
production ne fonctionnent plus.

Trois briques :

| Brique | Rôle |
| --- | --- |
| `GET /api/health` | Endpoint authentifié qui teste les dépendances critiques |
| `npm run qa:prod` | Smoke test lecture seule du site + du healthcheck |
| Workflow `Prod health` | Exécute le smoke test toutes les 6 h et à la demande |

---

## 1. Rôle de `/api/health`

L'endpoint effectue trois vérifications et **ne renvoie aucune donnée métier** :

- **app** : la route répond, donc l'application tourne.
- **database** : une lecture minimale et non destructive sur Supabase (une seule
  colonne technique, une ligne au maximum, résultat immédiatement jeté), via le
  client admin serveur, avec timeout court.
- **email** : présence de la configuration Resend. **Aucun email n'est envoyé** —
  l'endpoint ne prouve donc pas la délivrabilité, seulement la configuration.

Réponse :

```json
{
  "status": "ok",
  "timestamp": "2026-07-20T11:27:50.899Z",
  "checks": { "app": "ok", "database": "ok", "email": "configured" },
  "deployment": { "environment": "production", "commit": "abcdef1" }
}
```

La réponse ne contient jamais : email, pseudo, identifiant de lead, nom de table,
URL interne, message d'erreur brut, stack trace, nom ou valeur de variable
d'environnement.

### Codes HTTP

| Code | Signification |
| --- | --- |
| `200` | `status` vaut `ok` ou `degraded` — le tunnel d'inscription fonctionne |
| `503` | `status` vaut `down` — Supabase injoignable ou configuration critique absente |
| `401` | Token absent, invalide, ou non configuré côté serveur |

### Pourquoi Resend manquant = `degraded` et non `down`

Décision assumée : si Resend est absent ou en panne, la route `/api/leads/planning`
**enregistre quand même le lead** et renvoie `200` avec `emailSent: false`. Aucune
donnée n'est perdue, seul l'envoi immédiat du planning est dégradé. Déclencher une
alerte bloquante (`503`) dans ce cas produirait du bruit sans perte de données.

Supabase, à l'inverse, est critique : sans lui, un opt-in est définitivement perdu.
D'où `down` + `503`.

---

## 2. Variables requises

| Variable | Où | Obligatoire | Rôle |
| --- | --- | --- | --- |
| `HEALTHCHECK_TOKEN` | Vercel (Production) + GitHub Secrets | oui | Authentifie l'appel au healthcheck |
| `PROD_BASE_URL` | GitHub Variables | non | Cible du smoke test (défaut `https://www.sprintmaths.com`) |
| `HEALTHCHECK_DB_TIMEOUT_MS` | Vercel | non | Timeout de la sonde Supabase en ms (défaut `4000`, borné à 500–10000) |

`HEALTHCHECK_TOKEN` **ne doit jamais** être préfixé `NEXT_PUBLIC_` : il resterait
alors dans le bundle envoyé au navigateur.

---

## 3. Générer un token fort

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Copier la valeur directement dans le gestionnaire de secrets. Ne jamais la coller
dans un ticket, un commit, un message ou cette documentation.

---

## 4. Déclarer le token dans Vercel

1. Projet SprintMaths → **Settings** → **Environment Variables**.
2. Nom : `HEALTHCHECK_TOKEN`, valeur : le token généré.
3. Environnement : **Production** (cocher Preview seulement si le smoke test doit
   aussi viser les previews).
4. **Redéployer** : une variable ajoutée n'est prise en compte qu'au déploiement suivant.

---

## 5. Déclarer le token dans GitHub Actions

1. Dépôt → **Settings** → **Secrets and variables** → **Actions**.
2. Onglet **Secrets** → **New repository secret** → nom `HEALTHCHECK_TOKEN`,
   **exactement la même valeur** que dans Vercel.
3. Optionnel, onglet **Variables** → `PROD_BASE_URL` si la cible n'est pas le
   domaine par défaut.

Si les deux valeurs diffèrent, le healthcheck répondra `401` et le workflow échouera.

---

## 6. Lancer la supervision manuellement

En local :

```bash
HEALTHCHECK_TOKEN='<le token de production>' npm run qa:prod
```

Sur GitHub : onglet **Actions** → workflow **Prod health** → **Run workflow**.

Le script sort en code `0` si tout est bon, `1` si un check critique échoue. Les
avertissements (`⚠`, par exemple `email=missing`) sont affichés sans faire échouer
le run.

---

## 7. Interpréter le résultat

| `status` | Lecture | Action |
| --- | --- | --- |
| `ok` | Supabase et Resend opérationnels | Rien |
| `degraded` | Base OK, configuration email absente | Voir §9, sous 24 h |
| `down` | Supabase injoignable | Voir §8, immédiatement |

---

## 8. Procédure si `database=down`

Un opt-in est perdu à chaque visiteur tant que ce n'est pas réglé.

1. **Statut du projet Supabase** — cause historique la plus fréquente : le projet
   a été mis en pause pour inactivité. Le réactiver depuis le dashboard Supabase.
2. **Variables Vercel** — vérifier que `NEXT_PUBLIC_SUPABASE_URL` et
   `SUPABASE_SERVICE_ROLE_KEY` sont bien présentes en Production (vérifier leur
   présence, jamais afficher leur valeur).
3. **Logs Vercel** — filtrer sur `[health]`. Les entrées sont déjà redactées et
   contiennent le code d'erreur utile (`08006` = connexion impossible, projet en
   pause ; `ETIMEDOUT` = base trop lente ou injoignable).
4. **Redéployer uniquement si nécessaire** — un redéploiement ne répare pas une
   base en pause. Il n'est utile que si une variable d'environnement vient d'être
   ajoutée ou corrigée.
5. Relancer `npm run qa:prod` pour confirmer le retour à `ok`.

---

## 9. Procédure si `email=missing`

1. Vérifier la présence de `RESEND_API_KEY`, `SPRINTMATHS_EMAIL_FROM` et
   `SPRINTMATHS_EMAIL_REPLY_TO` dans Vercel Production.
2. Vérifier côté Resend que la clé n'a pas été révoquée et que le domaine
   d'expédition est toujours vérifié.
3. Redéployer si une variable a été ajoutée ou corrigée.
4. **Ne jamais envoyer d'email de test à un utilisateur réel.** Utiliser une
   adresse interne contrôlée, ou l'outil de test de Resend.

Rappel : pendant une panne Resend, les leads continuent d'être enregistrés. Il peut
être nécessaire de renvoyer manuellement le planning aux inscrits de la période.

---

## 10. Rotation du `HEALTHCHECK_TOKEN`

À faire en cas de suspicion de fuite, ou périodiquement.

1. Générer un nouveau token (§3).
2. Le mettre à jour dans **Vercel** (Production), puis **redéployer**.
3. Le mettre à jour dans **GitHub Secrets** avec la même valeur.
4. Relancer le workflow **Prod health** manuellement pour confirmer un `200`.

Ordre important : tant que la prod n'est pas redéployée avec la nouvelle valeur,
elle attend encore l'ancienne — mettre à jour GitHub en premier provoquerait des
`401` transitoires.

En cas de fuite avérée, l'impact reste limité : le token ne donne accès qu'à des
statuts (`ok`/`down`/`configured`), à aucune donnée utilisateur et à aucune écriture.
