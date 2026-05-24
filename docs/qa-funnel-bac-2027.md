# QA funnel Bac Maths 2027

Objectif : permettre a une personne de valider en 20 minutes le funnel SEO
Bac Maths 2027 sur Vercel Preview ou Production, sans confondre un succes local
avec un vrai succes Supabase, Resend, GTM ou Stripe.

Ce document ne doit contenir aucun secret. Ne jamais lancer un paiement reel en
Production sans decision explicite.

## Scope teste

- Page SEO : `/bac-maths-2027`
- Page lead magnet : `/planning-revision-bac-maths`
- API lead magnet : `/api/leads/planning`
- Page exercices : `/exercices-type-bac-maths-terminale`
- Diagnostic : `/diagnostic`
- Payment Link Stripe
- Webhook Stripe : `/api/stripe/webhook`
- Tracking GTM-ready via `window.dataLayer`

## Pre-requis Vercel

Verifier les variables dans Vercel Project Settings > Environment Variables
pour l'environnement teste. Pour Production, redeployer apres toute modification
de variable `NEXT_PUBLIC_*`.

| Variable | Attendu pour la QA | Secret ? | Notes |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domaine exact de l'environnement teste | Non | En Production : `https://www.sprintmaths.com`, sans slash final. |
| `NEXT_PUBLIC_SUPABASE_URL` | Configuree | Non | URL du projet Supabase de l'environnement teste. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Configuree | Non | Cle publique anon uniquement. |
| `SUPABASE_SERVICE_ROLE_KEY` | Configuree | Oui | Serveur uniquement, jamais `NEXT_PUBLIC_`. |
| `RESEND_API_KEY` | Configuree | Oui | Serveur uniquement. |
| `SPRINTMATHS_EMAIL_FROM` | Configuree | Non sensible | Domaine expediteur verifie dans Resend. |
| `SPRINTMATHS_EMAIL_REPLY_TO` | Configuree | Non sensible | Adresse de reponse visible. |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Configuree si test achat/clic Stripe | Non | Payment Link attendu pour le bon produit/prix. |
| `STRIPE_SECRET_KEY` | Configuree si webhook teste | Oui | Mode test pour une QA achat, sauf decision contraire. |
| `STRIPE_WEBHOOK_SECRET` | Configuree si webhook teste | Oui | Secret de signature de l'endpoint Stripe. |
| `NEXT_PUBLIC_TRACKING_MODE` | `gtm-ready` | Non | Sinon GTM ne sera pas charge. |
| `NEXT_PUBLIC_GTM_ID` | Configuree | Non | ID du conteneur GTM SprintMaths. |

Avant de commencer, noter :

| Champ | Valeur |
| --- | --- |
| Environnement | Preview / Production |
| URL de base testee | `<BASE_URL>` |
| Email QA controle | `<qa+bac2027-date@domaine-controle>` |
| Navigateur | `<Chrome/Safari/...>` |
| Testeur | `<nom>` |
| Date/heure | `<date heure>` |

## Regles de securite QA

- Ne pas inscrire de cle API, de service role key ou de webhook secret dans ce
  document, dans une capture ou dans un ticket.
- Utiliser un email QA controle, pas l'email d'un vrai parent ou eleve.
- Ne pas lancer un paiement Production reel sans validation explicite.
- Tester Stripe en mode test en premier si l'environnement le permet.
- Ne pas publier Ads tant que les criteres GO ne sont pas tous satisfaits.

## Chrono conseille 20 minutes

1. Minutes 0-4 : variables Vercel, `/robots.txt`, `/sitemap.xml`, canonicals.
2. Minutes 4-10 : parcours planning, Supabase, Resend, absence de PII tracking.
3. Minutes 10-14 : page exercices type bac et fallback Stripe.
4. Minutes 14-17 : GTM Preview/Tag Assistant et `window.dataLayer`.
5. Minutes 17-20 : Stripe mode test ou verification sans paiement, puis decision
   GO / NO GO.

## 1. Test SEO technique

URL de base : `<BASE_URL>`.

1. Ouvrir `<BASE_URL>/robots.txt`.
2. Verifier que le sitemap pointe vers le domaine attendu.
3. Verifier que les routes privees ne sont pas crawlables :
   - `Disallow: /app`
   - `Disallow: /app/*`
   - `Disallow: /admin`
   - `Disallow: /api`
4. Ouvrir `<BASE_URL>/sitemap.xml`.
5. Verifier que les URLs suivantes sont presentes avec le bon domaine :
   - `<BASE_URL>/bac-maths-2027`
   - `<BASE_URL>/planning-revision-bac-maths`
   - `<BASE_URL>/exercices-type-bac-maths-terminale`
6. Verifier que `/app/*` n'apparait pas dans le sitemap.
7. Ouvrir les 3 pages principales et verifier la canonical dans le HTML :
   - `<BASE_URL>/bac-maths-2027`
   - `<BASE_URL>/planning-revision-bac-maths`
   - `<BASE_URL>/exercices-type-bac-maths-terminale`
8. Ouvrir `<BASE_URL>/app` et verifier que la page privee n'est pas indexable
   selon la strategie SEO : meta robots `noindex,nofollow` ou equivalent.

Commandes utiles depuis un terminal, en remplacant `<BASE_URL>` :

```bash
curl -s <BASE_URL>/robots.txt
```

```bash
curl -s <BASE_URL>/sitemap.xml
```

```bash
curl -s <BASE_URL>/bac-maths-2027 | grep -i canonical
```

```bash
curl -s <BASE_URL>/app | grep -i robots
```

Resultat attendu :

- `/robots.txt` repond 200.
- `/sitemap.xml` repond 200.
- Les 3 URLs SEO sont dans le sitemap.
- Le domaine du sitemap et des canonicals est celui de l'environnement teste.
- `/app/*`, `/admin/*` et `/api/*` ne sont pas crawlables.
- `/app` expose un noindex/nofollow ou une protection equivalente.
- Les 3 pages principales ont une canonical absolue propre.

## 2. Test planning

Parcours humain :

1. Ouvrir `<BASE_URL>/bac-maths-2027`.
2. Cliquer sur le CTA "Recevoir le planning" ou "Recevoir le planning 30 jours".
3. Verifier l'arrivee sur `<BASE_URL>/planning-revision-bac-maths`.
4. Soumettre l'email QA controle.
5. Verifier le message de succes.
6. Ouvrir la version imprimable depuis le lien de succes :
   `<BASE_URL>/planning-bac-maths-2027.html`.
7. Cliquer sur le lien diagnostic depuis le message de succes.
8. Verifier l'arrivee sur `<BASE_URL>/diagnostic`.

Verification Supabase :

1. Ouvrir Supabase > Table Editor > `leads`.
2. Filtrer `parent_email` avec l'email QA controle.
3. Verifier la ligne la plus recente :
   - `exam_goal = bac_maths_2027`
   - `current_level = terminale`
   - `source` commence par `planning_bac_maths_2027:`
   - `wants_pack = false`
4. Capturer la preuve en masquant les secrets et en evitant de diffuser l'email
   QA si la capture sort du cercle projet.

Verification Resend :

1. Ouvrir Resend > Emails / Logs.
2. Chercher l'email QA controle.
3. Verifier un statut envoye ou delivre.
4. Verifier que le sujet correspond au planning Bac Maths 2027.
5. Verifier que l'email contient :
   - le lien vers `/planning-revision-bac-maths`
   - le lien vers `/planning-bac-maths-2027.html`
   - le lien vers `/diagnostic`

Verification tracking et PII :

1. Ouvrir la console navigateur.
2. Evaluer :

```js
window.dataLayer?.map((event) => event.event)
```

3. Verifier la presence des events :
   - `click_lead_magnet_planning`
   - `lead_magnet_request`
   - `email_optin`
4. Evaluer :

```js
JSON.stringify(window.dataLayer || []).includes("@")
```

5. Resultat attendu : `false`. Aucun email, code d'acces ou donnee personnelle
   ne doit apparaitre dans `dataLayer`.

## 3. Test page exercices type bac

Parcours :

1. Ouvrir `<BASE_URL>/exercices-type-bac-maths-terminale`.
2. Cliquer sur "Essayer un exercice guide gratuit" ou "Voir l'etape 1".
3. Cliquer successivement sur "Voir l'etape 2" puis "Voir l'etape 3" si les
   boutons sont disponibles.
4. Verifier que les etapes affichees restent lisibles sur desktop et mobile.
5. Cliquer sur un CTA diagnostic.
6. Verifier l'arrivee sur `<BASE_URL>/diagnostic`.
7. Revenir sur la page exercices.
8. Cliquer sur un CTA planning.
9. Verifier l'arrivee sur `<BASE_URL>/planning-revision-bac-maths`.
10. Revenir sur la page exercices.
11. Cliquer sur un CTA offre.
12. Verifier l'ancre ou la section offre.

Verification Stripe/fallback :

- Si `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` est configuree, le CTA achat doit ouvrir
  le Payment Link Stripe attendu dans un nouvel onglet.
- Si `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` est absente, le CTA achat ne doit pas
  pointer vers `undefined`, une 404 ou une URL cassee. Le fallback attendu est
  une navigation interne vers l'offre SprintMaths, par exemple
  `/bac-maths-2027#offre` ou la section offre de la page.

Events attendus pendant ce test :

- `click_typebac_free_exercise`
- `free_exercise_start`
- `free_exercise_step_reveal`
- `click_typebac_diagnostic`
- `click_typebac_planning`
- `click_typebac_offer` si fallback sans Payment Link
- `click_typebac_stripe` si Payment Link configure et clic achat effectue

## 4. Test tracking GTM

Pre-requis :

- `NEXT_PUBLIC_TRACKING_MODE=gtm-ready`
- `NEXT_PUBLIC_GTM_ID` configure
- GTM Preview / Tag Assistant actif sur le conteneur attendu

Parcours minimal :

1. Activer GTM Preview / Tag Assistant.
2. Ouvrir `<BASE_URL>/bac-maths-2027`.
3. Cliquer diagnostic.
4. Revenir puis cliquer planning.
5. Soumettre le formulaire planning avec l'email QA controle.
6. Ouvrir `<BASE_URL>/exercices-type-bac-maths-terminale`.
7. Cliquer l'exercice gratuit et reveler au moins une etape.
8. Cliquer le CTA achat si le Payment Link est configure.
9. Ouvrir la console navigateur.
10. Evaluer :

```js
window.dataLayer
```

```js
window.dataLayer?.map((event) => event.event)
```

Events a verifier :

- `click_bac2027_diagnostic`
- `click_lead_magnet_planning`
- `lead_magnet_request`
- `email_optin`
- `click_typebac_free_exercise`
- `free_exercise_start`
- `free_exercise_step_reveal`
- `click_typebac_stripe`

Notes :

- Si le Payment Link Stripe est absent, `click_typebac_stripe` ne peut pas etre
  produit. Noter le fallback `click_typebac_offer` et classer le test Stripe
  separement.
- GTM Preview doit voir les memes events que la console `window.dataLayer`.
- Aucun event ne doit contenir l'email QA, un code d'acces, un nom d'eleve ou
  une autre PII.

## 5. Test Stripe

Attention : ne pas lancer un vrai paiement Production sans decision explicite.
Tester d'abord en mode test si l'environnement le permet.

Verification sans paiement :

1. Dans Vercel, verifier que `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` pointe vers le
   Payment Link attendu pour le bon produit et le bon prix.
2. Dans Stripe, ouvrir le Payment Link et verifier :
   - nom du produit
   - prix
   - devise
   - mode test ou live
   - URL de succes attendue
3. Dans Stripe > Developers > Webhooks, verifier l'endpoint Production :
   `https://www.sprintmaths.com/api/stripe/webhook`.
4. Verifier que l'event `checkout.session.completed` est envoye a cet endpoint.
5. Pour une Preview, utiliser un endpoint dedie a l'URL Preview seulement si le
   test achat doit etre fait sur Preview.

Verification apres paiement test :

1. Effectuer un paiement test uniquement.
2. Dans Stripe, verifier que l'evenement `checkout.session.completed` a une
   reponse 2xx du webhook.
3. Dans Supabase > `access_codes`, verifier qu'un code est cree :
   - `source = stripe`
   - `stripe_session_id` renseigne
   - `status = unused`
   - `parent_email` correspond a l'email QA controle
4. Dans Resend, verifier l'email de code d'acces.
5. Verifier que l'acces est possible via `/merci` ou `/acces` selon le flow
   teste.
6. Verifier que le compte est cree.
7. Verifier que la premiere session eleve est accessible.

Si le webhook n'est pas teste :

- Le mini-test lead magnet peut quand meme etre GO si Supabase, Resend, sitemap
  et tracking lead sont OK.
- Le lancement Ads vers achat direct reste NO GO tant que le webhook paiement
  n'a pas ete valide en test.

## 6. Criteres GO / NO GO avant Ads

GO seulement si :

- Formulaire planning OK.
- Lead sauvegarde dans Supabase.
- Email planning recu ou log Resend envoye/delivre.
- `dataLayer` OK, sans PII.
- Sitemap OK.
- Canonicals OK.
- `/app/*` non indexable/crawlable selon la strategie.
- Clic Stripe tracke, ou fallback documente si l'achat n'est pas dans le test.
- Webhook paiement OK, ou explicitement non necessaire pour un mini-test lead.
- Aucune erreur console majeure sur les pages principales.

NO GO si :

- Le formulaire planning ne sauvegarde pas.
- Resend ne part pas.
- GTM est absent alors que `gtm-ready` est attendu.
- Le Stripe Payment Link est casse ou pointe vers le mauvais produit/prix.
- Le sitemap utilise le mauvais domaine.
- `/app/*` est indexable ou present dans le sitemap.
- Une page principale renvoie une 500.
- Le tracking expose un email, un code d'acces ou une autre PII.
- Le webhook Stripe echoue en test alors que le funnel achat doit etre lance.

## 7. Tableau de resultats a remplir

| Test | URL | Resultat attendu | Resultat obtenu | OK/KO | Capture/preuve | TODO |
| --- | --- | --- | --- | --- | --- | --- |
| Variables Vercel | Vercel Project Settings | Variables obligatoires configurees, sans secrets exposes cote client |  |  |  |  |
| Robots | `<BASE_URL>/robots.txt` | 200, sitemap correct, `/app`, `/admin`, `/api` disallow |  |  |  |  |
| Sitemap | `<BASE_URL>/sitemap.xml` | 3 pages SEO presentes, bon domaine, pas de `/app/*` |  |  |  |  |
| Noindex app | `<BASE_URL>/app` | Page privee non indexable, noindex/nofollow ou protection equivalente |  |  |  |  |
| Canonical Bac 2027 | `<BASE_URL>/bac-maths-2027` | Canonical absolue vers la meme URL |  |  |  |  |
| Canonical planning | `<BASE_URL>/planning-revision-bac-maths` | Canonical absolue vers la meme URL |  |  |  |  |
| Canonical exercices | `<BASE_URL>/exercices-type-bac-maths-terminale` | Canonical absolue vers la meme URL |  |  |  |  |
| Page Bac 2027 | `<BASE_URL>/bac-maths-2027` | Page 200, pas d'erreur console majeure |  |  |  |  |
| CTA planning | `<BASE_URL>/bac-maths-2027` | Clic vers `/planning-revision-bac-maths` |  |  |  |  |
| Formulaire planning | `<BASE_URL>/planning-revision-bac-maths` | Succes apres email QA controle |  |  |  |  |
| Supabase lead | Supabase `leads` | Ligne creee avec `exam_goal=bac_maths_2027` |  |  |  |  |
| Resend planning | Resend logs | Email planning envoye/delivre |  |  |  |  |
| Version imprimable | `<BASE_URL>/planning-bac-maths-2027.html` | Page imprimable 200 et lisible |  |  |  |  |
| Diagnostic depuis planning | `<BASE_URL>/diagnostic` | Navigation OK |  |  |  |  |
| Page exercices | `<BASE_URL>/exercices-type-bac-maths-terminale` | Page 200, pas d'erreur console majeure |  |  |  |  |
| Exercice gratuit | `#exercice-guide` | Etapes 1, 2, 3 revelables |  |  |  |  |
| CTA diagnostic exercices | `<BASE_URL>/diagnostic` | Navigation OK |  |  |  |  |
| CTA planning exercices | `<BASE_URL>/planning-revision-bac-maths` | Navigation OK |  |  |  |  |
| CTA offre exercices | Section offre / Stripe | Ancre offre ou Payment Link attendu |  |  |  |  |
| Fallback Stripe | Page exercices | Sans env, pas de lien casse; avec env, Payment Link correct |  |  |  |  |
| GTM Preview | Tag Assistant | Session connectee au bon conteneur |  |  |  |  |
| `click_bac2027_diagnostic` | `window.dataLayer` | Event present |  |  |  |  |
| `click_lead_magnet_planning` | `window.dataLayer` | Event present |  |  |  |  |
| `lead_magnet_request` | `window.dataLayer` | Event present |  |  |  |  |
| `email_optin` | `window.dataLayer` | Event present apres succes formulaire |  |  |  |  |
| `click_typebac_free_exercise` | `window.dataLayer` | Event present |  |  |  |  |
| `free_exercise_start` | `window.dataLayer` | Event present au premier reveal |  |  |  |  |
| `free_exercise_step_reveal` | `window.dataLayer` | Event present a chaque reveal |  |  |  |  |
| `click_typebac_stripe` | `window.dataLayer` | Event present si Payment Link configure |  |  |  |  |
| Absence PII tracking | Console navigateur | `JSON.stringify(window.dataLayer || []).includes("@") === false` |  |  |  |  |
| Payment Link Stripe | Stripe Dashboard | Bon produit, bon prix, bon mode |  |  |  |  |
| Webhook Stripe | Stripe Dashboard | Endpoint Production correct et event `checkout.session.completed` |  |  |  |  |
| Paiement test | Stripe test mode | Webhook reponse 2xx |  |  |  |  |
| Code acces | Supabase `access_codes` | Code cree avec `source=stripe`, `status=unused` |  |  |  |  |
| Email code acces | Resend logs | Email code envoye/delivre |  |  |  |  |
| Creation compte | `/merci` ou `/acces` | Compte cree avec le code test |  |  |  |  |
| Premiere session | Espace eleve | Session accessible |  |  |  |  |
| Decision finale | Synthese QA | GO ou NO GO argumente |  |  |  |  |

## 8. Synthese a completer

Decision : `GO` / `NO GO`

Raisons principales :

- 
- 
- 

Risques acceptes explicitement :

- 

Actions avant Ads :

- 
- 
- 
