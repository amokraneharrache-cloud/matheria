# Gabarit vidéo SprintMaths

`video.html` produit les quatre vidéos verticales de la semaine 1 à partir d'un
seul fichier. Aucune dépendance, aucun montage : on joue, on enregistre.

## Utiliser

Ouvrir `video.html` dans un navigateur.

| Touche | Effet |
| --- | --- |
| `1` à `4` | Charger V1, V2, V3 ou V4 |
| `espace` | Jouer ou rejouer la vidéo |
| `F` | Mode enregistrement (masque l'interface, fige l'échelle à 0,5) |
| `H` | Masquer le bandeau d'aide |

## Enregistrer en 1080×1920 sur un portable

Un écran de portable ne fait pas 1920 px de haut, donc la scène ne peut pas
s'afficher en 1:1. Le mode `F` contourne le problème : il fige la scène à
**540×960 à l'écran**. Sur un écran Retina, dont chaque pixel CSS vaut 2 pixels
physiques, la capture sort en **1080×1920 réels**.

1. Charger la vidéo voulue (`1` à `4`)
2. Passer en mode enregistrement (`F`)
3. Capture d'écran macOS (`⌘⇧5`) → *Enregistrer la portion sélectionnée*
4. Cadrer exactement sur le rectangle bleu
5. Lancer l'enregistrement, puis `espace`
6. Arrêter après la dernière image
7. Vérifier que le fichier fait bien 1080×1920

Sur un écran non-Retina, la capture sortira en 540×960 : recadrer sur un écran
Retina ou un moniteur externe plutôt que d'agrandir un fichier trop petit.

## Modifier un texte

Tout est dans la constante `SCENES` en bas du fichier. Un plan = un objet :

```js
{ t: 9.5, html: `<div class="calc">100 × 0,8 = 80</div>` }
```

`t` est la seconde d'apparition. Les plans ne se superposent jamais : la coupe
est franche, un fondu de texte sur texte étant illisible en vertical.

Classes disponibles : `h1` (accroche), `.q` (question), `.calc` (ligne de
calcul), `.calc.muted` (ligne précédente estompée), `.big` (chiffre plein
écran), `.kicker` (surtitre), `.count` (compte à rebours), `.rule` (filet
ambre). `<em>` passe le texte en ambre.

## Règles de composition

- **Zone sûre** : le cadre `.safe` tient les textes à l'écart des bords. Les
  interfaces TikTok, Reels et Shorts mangent le bas et la droite de l'image.
- **Aucune intro** : le premier plan est l'accroche, pas un logo. La signature
  `sprintmaths.com` n'apparaît qu'à la fin.
- **Une idée par plan.** Si un plan a besoin de trois lignes de texte, c'est
  qu'il en faut deux.

## Vérifier avant d'enregistrer

- [ ] Le calcul affiché est juste
- [ ] Le premier plan se comprend sans le son
- [ ] Aucun texte ne dépasse du cadre bleu
- [ ] La signature n'apparaît qu'à la fin
