# SprintMaths — Email Growth

Fondation du **Lead-to-Revenue Engine** : visiteur → ressource gratuite →
consentement valide → emails réellement utiles → retour sur le site → confiance
→ éventuellement Pack Révision Express.

Construit le **26 août 2026** (sprint J58).

**Principe non négociable :** chaque email doit mériter sa place dans la boîte de
réception. Aucun email n'existe pour rappeler l'offre ; un email existe parce
qu'il apprend quelque chose.

---

## 1. Flow initial (état avant J58)

```
/planning-revision-bac-maths          /diagnostic (4 étapes)
        │                                     │
        ▼                                     ▼
  PlanningLeadForm                    saveLead (server action)
  (composant client)                          │
        │                                     │
        ▼                                     │
  POST /api/leads/planning ───────────────────┤
        │                                     │
        ▼                                     ▼
              table Supabase `leads`
                       │
                       ▼
        Resend → email de livraison → planning
```

Fichiers concernés :

| Rôle | Fichier |
| --- | --- |
| Page de capture n°1 | `src/app/planning-revision-bac-maths/page.tsx` |
| Formulaire | `src/components/marketing/PlanningLeadForm.tsx` |
| API | `src/app/api/leads/planning/route.ts` |
| Page de capture n°2 | `src/app/diagnostic/page.tsx` |
| Server action | `src/app/actions.ts` |
| Envoi | `src/lib/email/resend.ts` |
| Table | `leads` (`supabase/schema.sql`) |
| Ressource livrée | `public/planning-bac-maths-2027.html` |
| Analytics | `src/lib/tracking.ts` |

**Deux points de collecte, pas un.** Le lead magnet planning et le diagnostic
écrivent dans la même table `leads`, distingués par la colonne `source` :
`planning_bac_maths_2027:/planning-revision-bac-maths` et `diagnostic_funnel`.

**Ce qui était promis :** le planning de révision Bac Maths 2027 sur 30 jours,
en page web et en version imprimable. La ressource est un lien, jamais une pièce
jointe — c'est le bon choix et il est conservé.

**Ce qui était affiché avant la saisie :** « Email obligatoire, pas de compte à
créer. » puis, sous le bouton, « Email uniquement pour envoyer le planning.
Aucun spam. »

**Ce qui existait comme case à cocher :** rien. Aucune case, aucune mention de
newsletter, aucune case précochée, aucun lien de désinscription, aucune colonne
de consentement en base.

---

## 2. Consentement

### Diagnostic : **CAS B**, sans ambiguïté

Trois faits concordants, vérifiés dans le dépôt :

1. Le formulaire affichait **« Email uniquement pour envoyer le planning. Aucun
   spam. »** — une promesse explicite d'usage unique.
2. La table `leads` ne comportait **aucune colonne de consentement**.
3. La politique de confidentialité (`src/app/politique-confidentialite/page.tsx`,
   section « Finalités ») liste sept finalités, dont **aucune n'est la
   prospection ou la communication commerciale**.

Le diagnostic, lui, demandait l'email « pour afficher le bilan » — même logique.

**Conclusion : aucun consentement marketing n'existe pour les leads
historiques.** Ce n'est pas un cas ambigu à classer prudemment, c'est un cas où
le site a explicitement promis le contraire.

### Règle appliquée

> Aucun lead historique n'est inscrit à la séquence commerciale. Aucune valeur
> stockée n'est modifiée rétroactivement pour transformer un ancien lead en lead
> opt-in. Aucun contournement par un email « pas vraiment commercial ».

### Nouveau wording (à partir du 26/08/2026)

Source unique : `src/lib/email/consentText.ts`.

Case **facultative**, **jamais précochée** :

> ☐ Je souhaite recevoir par email les conseils de révision, exercices et offres
> SprintMaths. Je peux me désinscrire à tout moment.

Mention sous le bouton, sur le formulaire planning :

> Ton email sert à t'envoyer le planning, que tu coches ou non la case.
> [Politique de confidentialité]

Et sur le diagnostic :

> L'email sert à afficher et retrouver le bilan, que la case soit cochée ou non.
> [Politique de confidentialité]

**La ressource gratuite n'est jamais conditionnée à l'acceptation marketing.**
C'est vérifié par un test automatisé (`sans consentement : la ressource est
quand même délivrée`).

### Preuve de consentement

| Colonne | Contenu |
| --- | --- |
| `marketing_consent` | `boolean NOT NULL DEFAULT false` |
| `marketing_consent_at` | horodatage du recueil |
| `consent_version` | `2026-08-v1` — version du wording affiché |

Une contrainte SQL (`leads_marketing_consent_proof_check`) interdit
`marketing_consent = true` sans date : il est impossible d'avoir un consentement
sans preuve.

Le serveur **ne fait jamais confiance au client** pour la date ni pour la
version : il ne reçoit qu'une intention booléenne et construit la preuve
lui-même (`buildConsentFields` dans `src/lib/email/consent.ts`). Seul un `true`
strict vaut consentement — `"true"`, `"on"`, `1` et `null` valent refus, ce qui
est couvert par un test.

---

## 3. Leads historiques

Relevé du 26/08/2026 sur la table `leads`.

| Mesure | Valeur |
| --- | ---: |
| Lignes en base | 12 |
| Emails distincts | 11 |
| dont adresses de test (`example.test`, `example.com`) | 3 |
| dont adresse invalide (faute de frappe sur le domaine) | 1 |
| **Leads réels adressables** | **7** |
| **Consentement marketing prouvé** | **0** |
| Consentement absent ou non prouvé | 7 |

Répartition par source : 6 via le lead magnet planning, 6 via le diagnostic.
Période de collecte : **27 avril 2026 → 24 août 2026**.

> **7 leads historiques non activables commercialement sans consentement prouvé.**

**Action prise : aucune.** Ils ne reçoivent pas la séquence. Ils conservent leur
jeton de désinscription (généré pour tout le monde) au cas où ils consentiraient
plus tard, mais rien ne part.

Ce qui reste possible et légitime : leur envoyer une ressource qu'ils ont
explicitement demandée. Rien d'autre.

---

## 4. Email 0 — livraison

Envoyé immédiatement, à **tous** les leads, avec ou sans opt-in : c'est
l'exécution de ce qui a été promis.

**Objet :** `Ton planning Bac Maths 2027 (+ la première chose à faire)`

**Structure :**

1. Le planning, en bouton visible.
2. La version imprimable.
3. Une micro-action encadrée : *« Ouvre le planning et surligne les 3 chapitres
   sur lesquels tu es le moins à l'aise. Uniquement 3. C'est par eux que tu
   commences demain. »*
4. Le pourquoi de cette micro-action.
5. **Une seule** ressource complémentaire gratuite : le diagnostic.

**Ce qui a été retiré de la version précédente :** le lien vers le Pack Révision
Express à 39 €, et deux CTA secondaires. Un email transactionnel n'est pas un
support de prospection, et la personne n'a rien demandé de tel. Deux tests
automatisés vérifient l'absence de `39 €` et de `Pack Révision Express` dans
l'email 0.

Il n'y a pas d'en-tête `List-Unsubscribe` sur cet email : il n'y a rien à
désinscrire.

### VALUE SCORE de l'email précédent : **4/10**

| Critère | Constat |
| --- | ---: |
| Objet (`Ton planning Bac Maths 2027 — 30 jours`) | 6/10 — clair mais purement descriptif |
| Promesse tenue | 9/10 — le planning était bien livré |
| Valeur pédagogique ajoutée | **1/10** — aucune. Une liste de chapitres et 4 liens |
| Nombre de CTA | **2/10** — 4 liens + l'offre : aucune hiérarchie |
| Commercialisation | 3/10 — l'offre 39 € dans un email transactionnel non consenti |
| Lisibilité mobile | 7/10 — `max-width: 560px`, correct |
| Délivrabilité | 6/10 — texte + HTML, pas de pièce jointe ; aucun `List-Unsubscribe` |
| Lien ressource | 9/10 — lien, pas de pièce jointe |

**Pourquoi 4 et pas plus :** l'email fonctionnait techniquement mais n'apprenait
rien. Il disait à l'élève quels chapitres réviser — une information déjà présente
sur la page qu'il venait de quitter — puis lui proposait quatre directions et un
produit. Un email qui ne fait que reformuler la page d'où vient le lecteur ne
mérite pas sa place dans une boîte de réception, même s'il part sans erreur.

---

## 5. Séquence nurture

**Réservée aux leads `marketing_consent = true` et non désinscrits.** Définie
dans `src/lib/email/sequence.ts`.

| Étape | Délai | Objet | Promotionnel |
| --- | :---: | --- | :---: |
| `nurture_1` | J+2 | L'erreur de récurrence qui coûte le plus de points | non |
| `nurture_2` | J+4 | Pourquoi relire son cours ne marche pas | non |
| `nurture_3` | J+7 | Mini-défi : le test qui se trompe (réponse en bas) | non |
| `nurture_4` | J+10 | Ce qu'il y a dans le Pack Révision Express (39 €) | **oui** |
| `nurture_5` | J+14 | Trois questions qu'on me pose sur le pack | **oui** |

### J+2 — un piège concret

Le raisonnement circulaire dans l'hérédité d'une récurrence : partir de
`u(n+1) = 3^(n+1) + 1` (ce qu'il faut démontrer) pour retomber sur l'hypothèse.
L'email montre la version fausse, la version correcte sur le même exemple
(`u₀ = 2`, `u(n+1) = 3u(n) − 2`), et donne le réflexe : après « Supposons », la
première ligne est toujours la relation de récurrence, jamais le résultat visé.
Lien : `/methodes-maths-terminale/etudier-une-suite`. Aucune vente.

### J+4 — méthode

La méthode des 3 passages (lire 15 min / refaire sans modèle 30 min / tester en
conditions 20 min), avec la consigne opérationnelle : si tu ne peux en faire
qu'une, fais la 2. Lien : le diagnostic, pour l'ordre des chapitres. Aucune
vente.

### J+7 — mini-défi

Un exercice de probabilités conditionnelles à réponse contre-intuitive : test de
contrôle à 98 % de sensibilité, 1 % de faux positifs, 3 % de pièces
défectueuses. La réponse intuitive est 98 % ; la bonne est **≈ 75 %**. L'email
fait réfléchir avant de dérouler le calcul, puis en tire le réflexe : écrire
explicitement si l'on cherche `P(A|B)` ou `P(B|A)`.

### J+10 — passage au produit

Première présentation explicite. Répond aux quatre questions : pour qui, quel
problème, ce qu'il y a dedans (la liste réelle du `packItems` de la page offre),
et ce qui diffère du gratuit. Le paragraphe « ce qui est différent » dit
franchement que le contenu pédagogique est le même et que la différence est
l'organisation — et qu'un élève autonome n'a pas besoin du pack. Aucune urgence,
aucun compteur, aucune « dernière chance ».

### J+14 — objections, puis sortie

Trois objections traitées honnêtement, y compris quand la réponse est « non, ce
n'est pas pour toi » (bon niveau → faire des annales officielles gratuites).
L'email annonce explicitement qu'il est le dernier de la séquence commerciale.

**Fin de séquence = sortie.** Il n'existe aucune étape après J+14. Pas de
relance, pas de « dernière chance ».

---

## 6. Désinscription

| Élément | Implémentation |
| --- | --- |
| Jeton | `leads.unsubscribe_token`, 32 octets aléatoires (`randomBytes`), index unique |
| Route | `GET`/`POST /api/email/unsubscribe?t=<token>` |
| Page | `/desinscription` (noindex) |
| En-têtes | `List-Unsubscribe` + `List-Unsubscribe-Post` (RFC 8058) sur tous les emails nurture |

Comportement : clic → `marketing_consent = false`, `marketing_unsubscribed_at =
now()` → redirection 303 vers la page de confirmation. Aucune donnée métier n'est
supprimée : seule la permission marketing est révoquée.

Points de conception :

- **Le jeton n'est jamais dérivé de l'email.** L'URL publique ne révèle rien.
  Un test vérifie qu'aucune URL de désinscription ne contient de `@`.
- **Le format est validé avant de toucher la base** (`^[a-f0-9]{64}$`) : un
  jeton malformé n'atteint jamais Postgres.
- **`POST` répond 200 sans redirection** pour la désinscription « un clic » de
  Gmail et Outlook. Un 5xx ferait réessayer le client mail, donc on ne renvoie
  503 qu'en cas de panne réelle.
- **Aucune connexion n'est requise.**

Le runner refiltre `marketing_consent === true && !marketing_unsubscribed_at`
côté applicatif, en plus du filtre SQL : une désinscription ne peut pas passer
entre les mailles même si la requête évolue.

---

## 7. Automation

### Architecture retenue : **Vercel Cron → route handler protégée**

`vercel.json` :

```json
{ "crons": [{ "path": "/api/cron/email-sequence", "schedule": "0 8 * * *" }] }
```

Une passe par jour à 08:00 UTC (10:00 CEST).

**Pourquoi ce choix.** Trois options étaient possibles :

| Option | Verdict |
| --- | --- |
| Vercel Cron | **Retenue.** Le projet est déjà déployé sur Vercel, aucune dépendance nouvelle, aucun service à administrer, et l'authentification est fournie par la plateforme. |
| `pg_cron` côté Supabase | Écartée. Il faudrait activer une extension et appeler Resend depuis Postgres : la logique métier quitterait le dépôt et deviendrait invisible aux tests. |
| Audiences / Broadcasts Resend | Écartée. Resend diffuse très bien, mais ne gère pas nativement une séquence à délais relatifs par lead. Il faudrait piloter l'état depuis l'application de toute façon. |

Le pas quotidien suffit : les délais de la séquence sont de 2 à 14 jours.

**Authentification.** Vercel envoie `Authorization: Bearer $CRON_SECRET`. La
route compare en temps constant (`timingSafeEqual`) et **refuse tout si
`CRON_SECRET` n'est pas configuré** — mieux vaut une séquence qui ne part pas
qu'une route d'envoi d'emails ouverte sur Internet.

### Idempotence

C'est le point le plus important du système, et il repose sur la base, pas sur
le code applicatif.

```sql
CREATE UNIQUE INDEX email_sequence_sends_lead_step_key
  ON email_sequence_sends(lead_id, step);
```

Séquence d'exécution pour chaque étape due :

1. **Réserver** — `INSERT` de la ligne `(lead_id, step, status='pending')`.
   Si l'index unique renvoie `23505`, l'étape est déjà prise : on n'envoie rien.
2. **Envoyer** — appel Resend, seulement après une réservation réussie.
3. **Finaliser** — `status='sent'` + `sent_at`, ou `status='failed'` + motif.

Deux exécutions simultanées du cron ne peuvent donc pas produire deux envois de
la même étape : la seconde échoue au moment de la réservation, avant tout appel
à Resend. Un envoi en échec reste réservé et ne repart pas en boucle — il est
visible en base avec `status='failed'` pour décision manuelle.

Garde-fou supplémentaire : `MAX_SENDS_PER_RUN = 40` borne la durée et le coût
d'une passe qui déraillerait.

### Achat = sortie de la séquence promotionnelle

Avant chaque étape marquée `promotional`, le runner cherche l'email du lead dans
`access_codes` (la table alimentée par le webhook Stripe
`checkout.session.completed`). Si une ligne existe, l'étape est marquée
`skipped` et n'est jamais envoyée.

En cas d'erreur de lecture, le lead est **considéré comme acheteur** : mieux vaut
un email promotionnel manquant qu'un « Achetez le Pack » envoyé à quelqu'un qui
vient de payer.

Les emails **transactionnels** liés à l'achat (code d'accès) passent par une voie
totalement distincte (`sendAccessCodeEmail`) et ne sont pas affectés.

---

## 8. Analytics

**Aucune PII dans GA4.** Jamais d'email, jamais de pseudo.

Événements déjà en place et conservés tels quels : `lead_magnet_request`,
`email_optin`, `click_bac2027_stripe`, `purchase`. Aucun événement n'a été
dupliqué.

Seul ajout : le paramètre **`marketing_consent`** (`"true"` / `"false"`) sur
`email_optin`, inscrit dans la liste blanche de `sanitizeTrackingParams`. C'est
un booléen non identifiant.

### UTM des liens email

Tous les liens sont construits par `trackedUrl()` :

```
utm_source=email&utm_medium=email&utm_campaign=lead_nurture&utm_content=<étape>
```

`utm_content` vaut `email_0`, `nurture_1` … `nurture_5`, ce qui permet
d'attribuer un retour sur le site à un email précis. Un test vérifie que les UTM
sont placés **avant** l'ancre (`/bac-maths-2027?utm…#offre`), sinon ils seraient
ignorés.

### Priorité de lecture

Le **taux d'ouverture n'est pas une vérité** : il dépend du pré-chargement des
images et de la protection de la confidentialité Apple Mail. Par ordre
d'importance décroissante :

1. clics depuis l'email ;
2. retour sur le site ;
3. consommation réelle des ressources ;
4. clics vers l'offre ;
5. achat.

À l'échelle actuelle (7 leads réels, 0 consentant), **aucun taux n'est
interprétable**. Voir la section « Pas d'A/B test ».

---

## 9. Source d'acquisition

Nouvelle colonne `leads.acquisition_source`, normalisée côté serveur par
`normalizeAcquisitionSource()` vers un vocabulaire fermé :

`organic_google` · `instagram` · `tiktok` · `youtube` · `email` · `direct` ·
`autre`

La source vient de l'`utm_source` déjà capturé par `src/lib/utm.ts` (premier et
dernier touch en `localStorage`), ou à défaut du `Referer`. Le client n'envoie
que `utm_source` — jamais de PII.

**Boucle sociale.** Le chantier Social Growth pourra promouvoir la ressource
gratuite ; il suffit que les liens portent
`?utm_source=tiktok&utm_medium=social&utm_campaign=organic_social` pour que les
leads issus des réseaux soient distinguables sans aucun travail supplémentaire.

```
TikTok / Reel / Short → ressource gratuite → opt-in → nurture → retour site → offre
```

Aucune stratégie sociale n'a été modifiée en J58 ; seule la traçabilité est
prête.

---

## 10. Segmentation

**Volontairement non implémentée.** Avec 7 leads réels, une segmentation serait
une usine à gaz sans données.

Ce qui est déjà disponible sans effort supplémentaire, le jour où le volume le
justifiera :

- `source` distingue déjà le lead magnet planning (Terminale) du diagnostic ;
- `exam_goal` et `current_level` sont collectés par le diagnostic ;
- `acquisition_source` distingue les canaux.

Piste future, sans jamais demander l'âge : deux liens dans un email
(« Tu es en Première ? » / « Tu es en Terminale ? ») et le clic segmente.
À construire quand il y aura des leads à segmenter, pas avant.

---

## 11. Newsletter future — Le Sprint Maths de la semaine

**Non implémentée, non planifiée, non envoyée en J58.** Seule la fondation
existe : les colonnes de consentement, le jeton de désinscription et
l'infrastructure d'envoi resserviront telles quelles.

Concept, quand la séquence aura tourné :

- **1 email par semaine maximum** au départ ;
- structure : 1 exercice + 1 piège + 1 méthode + 1 lien utile ;
- lecture en 2 à 4 minutes ;
- **utile même sans clic** — l'exercice et le piège se lisent dans l'email ;
- très large majorité de valeur, minorité d'offres.

Condition d'ouverture : au moins quelques dizaines de leads consentants et une
séquence dont on sait qu'elle ne casse pas.

---

## 12. Score de chaleur

**Conçu, pas implémenté.** L'implémenter aujourd'hui ajouterait du stockage et
de la complexité pour zéro information exploitable.

Barème envisagé, volontairement trivial (pas d'IA, pas de ML) :

| Signal | Points |
| --- | ---: |
| Clic sur une ressource depuis un email | +1 |
| Visites répétées sur le site | +2 |
| Clic vers l'offre | +3 |

Objectif : repérer les leads qui montrent une intention, pour leur écrire
personnellement — pas pour les cibler automatiquement. **Aucun profilage
sensible.** À reconsidérer au-delà d'une cinquantaine de leads consentants.

---

## 13. Micro-monétisation

La question n'est pas « comment vendre le pack dans chaque email ». Sur cinq
emails, deux mentionnent l'offre, et le premier des deux arrive à J+10.

La monétisation peut venir d'ailleurs : rétention, retours répétés sur le site,
confiance, consommation régulière, conversion plus tard. Un élève qui revient
chaque semaine pendant six mois vaut plus qu'un email de vente envoyé au
troisième jour.

Le produit à 39 € doit apparaître **quand il correspond au besoin**, ce qui
suppose d'abord d'avoir montré qu'on comprend le besoin.

---

## 14. Délivrabilité

Audit DNS du 26/08/2026.

| Élément | État | Détail |
| --- | :---: | --- |
| Domaine d'envoi | ✅ | `send.sprintmaths.com` (sous-domaine Resend/SES) |
| SPF | ✅ | `v=spf1 include:amazonses.com ~all` sur `send.sprintmaths.com` |
| DKIM | ✅ | `resend._domainkey.sprintmaths.com` présent |
| MX de retour (bounces) | ✅ | `feedback-smtp.eu-west-1.amazonses.com` |
| **DMARC** | ❌ | **`_dmarc.sprintmaths.com` absent** |
| **MX sur `sprintmaths.com`** | ❌ | **absent — voir ci-dessous** |
| From | ✅ | `SprintMaths <contact@sprintmaths.com>` |
| Reply-To | ⚠️ | `contact@sprintmaths.com` — voir ci-dessous |
| Version texte | ✅ | tous les emails sont envoyés en `text` + `html` |
| Pièces jointes | ✅ | aucune — la ressource est un lien |
| `List-Unsubscribe` | ✅ | ajouté sur tous les emails nurture |

**Aucune modification DNS n'a été effectuée.** Les deux problèmes ci-dessous sont
documentés pour décision.

### Problème 1 — DMARC absent

`_dmarc.sprintmaths.com` ne renvoie rien. Ce n'est pas bloquant aujourd'hui :
les exigences Gmail/Yahoo de février 2024 visent les expéditeurs de masse
(5 000 messages/jour), très au-dessus du volume actuel. Mais DMARC est ce qui
rend l'alignement SPF/DKIM vérifiable par le destinataire, et son absence est un
handicap léger et permanent.

Correctif à faible risque, à appliquer chez le registrar :

```
_dmarc.sprintmaths.com.  TXT  "v=DMARC1; p=none; rua=mailto:contact@sprintmaths.com"
```

`p=none` n'impose aucune politique de rejet : il ne peut rien casser, il ne fait
qu'activer le reporting. Passer à `p=quarantine` plus tard, une fois les
rapports lus.

### Problème 2 — `contact@sprintmaths.com` ne peut pas recevoir de réponse

Le domaine `sprintmaths.com` **n'a aucun enregistrement MX**. Sans MX, un serveur
expéditeur se rabat sur l'enregistrement A, qui pointe vers Vercel — lequel ne
fait pas de SMTP.

Conséquence concrète : chaque email écrit *« Réponds directement à cet email ou
écris à contact@sprintmaths.com »*, et **ces réponses n'arrivent nulle part**.

C'est plus grave pour une séquence nurture que pour du transactionnel : la
réponse d'un élève est exactement ce qu'on cherche à provoquer, et c'est aussi
un signal positif de délivrabilité. À corriger en priorité, par exemple en
routant `contact@sprintmaths.com` vers une boîte existante.

Tant que ce n'est pas corrigé, le `Reply-To` devrait pointer vers une adresse
qui reçoit réellement.

---

## 15. Tests

`npm run test:email` — 23 tests, tous verts. Aucun email réel, aucune donnée
réelle : Supabase et Resend sont remplacés par les fakes en mémoire du harness.

| Domaine | Ce qui est vérifié |
| --- | --- |
| Formulaire sans consentement | lead enregistré, `marketing_consent` faux, pas de date, jeton présent |
| Ressource non conditionnée | l'email de livraison part même sans opt-in |
| Formulaire avec consentement | preuve complète : date + `2026-08-v1` + source d'acquisition |
| Valeurs ambiguës | `"true"`, `"on"`, `1`, `null`, `undefined`, `{}` valent tous refus |
| Validation email | 400, aucun lead, aucun email |
| Email 0 | micro-action présente, **aucune** mention de 39 € ni du Pack |
| UTM | présents, corrects, placés avant l'ancre |
| Calendrier | 5 étapes aux délais annoncés ; seules les 2 dernières sont promotionnelles |
| Lien de désinscription | présent dans les 5 emails nurture, en texte et en HTML |
| `dueSteps` | ne renvoie que les étapes échues |
| Sans consentement | aucune étape envoyée, jamais |
| Désinscrit | aucune étape envoyée, même si `marketing_consent` vaut true |
| **Double envoi** | 3 exécutions successives → 5 emails au total, pas 15 |
| Échec d'envoi | marqué `failed`, non recompté, ne repart pas en boucle |
| **Acheteur** | `nurture_4` et `nurture_5` sautés ; les 3 pédagogiques partent |
| Désinscription GET | lead marqué, redirection 303 vers `/desinscription?etat=done` |
| Désinscription POST | 200 (RFC 8058), lead marqué |
| Jeton invalide | absent, vide, trop court, non-hex → aucune modification |
| Fuite d'email | aucune URL de désinscription ne contient de `@` |

Suite complète du projet : **55 tests, 5 suites, 0 échec.**

Le test 8 de `planning-lead.test.mjs` a été réécrit : il vérifiait l'ancien
contenu de l'email 0. Il vérifie désormais le contrat plus strict (micro-action
présente, offre commerciale absente).

### Pas d'A/B test

Avec 7 leads réels et 0 consentant, **aucune conclusion du type « l'objet A
convertit 18 % mieux » n'est recevable**. Un écart d'un clic sur sept ferait
bouger n'importe quel taux de plus de 14 points. On construit d'abord, on mesure
quand l'échantillon le permet.

---

## 16. Page après inscription

**Inchangée — après vérification, elle était déjà correcte.**

Le bloc de succès affiche :

1. « Ton planning est envoyé — Vérifie ta boîte mail dans quelques instants » ;
2. une prochaine étape **principale unique** : *Faire le diagnostic gratuit* ;
3. deux liens secondaires ;
4. un lien discret vers l'offre, jamais en CTA principal.

C'est exactement la structure recherchée (« vérifie ta boîte mail » + une action
utile pendant ce temps, une seule action principale). La modifier aurait été du
changement gratuit.

---

## 17. Questions / objections récurrentes

Section vivante, à alimenter par les réponses d'élèves, les commentaires
sociaux et les recherches Search Console. Elle nourrit à la fois le SEO, le
Social Growth, les emails et le produit.

```
question reçue par email → idée de contenu social → page gratuite
        → nouveaux leads → nouvelles questions
```

**Amorçage au 26/08/2026** — issu des requêtes Search Console réelles, pas de
suppositions :

| Question / intention observée | Source | Déjà couvert ? |
| --- | --- | :---: |
| « sujet grand oral maths probabilité » (10 impressions/7 j) | GSC | Oui — 9 sujets Probabilités dans `grandOral.ts`, mais difficiles à atteindre |
| « 5 sujets de grand oral sur le thème du sondage » (9) | GSC | Oui — sujets 8 et 46 |
| « préparer ma rentrée en terminale spécialité mathématiques » | GSC — **seule requête nommée qui génère un clic** | Oui — `/preparer-entree-terminale-specialite-maths` |
| « planning revision bac s » | GSC | Partiellement |
| « Quelle différence avec les ressources gratuites ? » | objection anticipée, traitée en `nurture_5` | Oui |
| « Est-ce pour moi si j'ai déjà un bon niveau ? » | objection anticipée, traitée en `nurture_5` | Oui |
| « Et si je suis en retard ? » | objection anticipée, traitée en `nurture_5` | Oui |

À enrichir à chaque réponse reçue — **une fois que `contact@sprintmaths.com`
pourra recevoir des réponses** (voir Délivrabilité, problème 2).

---

## 18. Métriques à suivre

Dans l'ordre, et sans chercher à en tirer des conclusions trop tôt :

| Métrique | Où | Seuil d'interprétabilité |
| --- | --- | --- |
| Leads créés | table `leads` | dès maintenant |
| Taux d'opt-in marketing | `marketing_consent` / total | ~30 leads |
| Emails envoyés par étape | `email_sequence_sends` | dès maintenant |
| Échecs d'envoi | `status='failed'` | dès maintenant — à surveiller |
| Clics email → site | GA4, `utm_content` | ~50 clics |
| Clics vers l'offre | `click_bac2027_stripe` | ~20 clics |
| Achats | `purchase` / `access_codes` | dès le premier |
| Désinscriptions | `marketing_unsubscribed_at` | dès maintenant — signal d'alerte |

**Le taux de désinscription est la métrique de qualité la plus honnête.** S'il
monte, c'est que les emails ne méritent pas leur place. C'est un signal à
prendre au sérieux avant n'importe quel taux de conversion.

---

## 19. Ce qui reste à faire pour activer le système

Le code est complet et testé, mais **rien n'est actif en production**.

| # | Action | Où |
| --- | --- | --- |
| 1 | Appliquer la migration SQL | Supabase → `supabase/migrations/2026-08-26-email-consent-and-sequence.sql` |
| 2 | Définir `CRON_SECRET` | variables d'environnement Vercel |
| 3 | Vérifier `RESEND_API_KEY`, `SPRINTMATHS_EMAIL_FROM`, `SPRINTMATHS_EMAIL_REPLY_TO` | variables d'environnement Vercel |
| 4 | Déployer (le cron est déclaré dans `vercel.json`) | Vercel |
| 5 | Ajouter l'enregistrement DMARC | registrar DNS |
| 6 | Faire en sorte que `contact@sprintmaths.com` reçoive | registrar DNS + boîte mail |

**Tant que l'étape 1 n'est pas faite, les nouveaux leads échoueront à
l'insertion** (colonnes inconnues). L'ordre 1 → 4 doit être respecté : migration
d'abord, déploiement ensuite.

Vérification après déploiement : appeler la route cron à la main avec le secret
doit renvoyer un résumé agrégé, et `eligibleLeads` doit valoir **0** tant
qu'aucun nouveau lead n'a coché la case.
