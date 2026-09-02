# Stratégie audio sociale SprintMaths

## Voice

La voix porte toute l’explication. Le texte commence par le résultat surprenant dès la première seconde, alterne phrases courtes et écriture mathématique orale, puis termine par un seul appel à l’action. Le master public utilise `fr_FR-siwis-medium` avec Piper. Les voix macOS servent uniquement aux comparaisons internes.

## Music

Le fond musical est une nappe harmonique originale générée localement. Son niveau initial est placé environ 18 dB sous la voix et un sidechain le réduit encore pendant la parole. Il ne doit jamais masquer une consonne, un nombre ou un symbole.

## SFX

Trois familles d’effets originaux et sobres au maximum : un accent montant dans les 200 premières millisecondes, un compte à rebours bref si le format le justifie, puis un son de révélation. Aucun bruitage continu, aucun sample tiers et aucune imitation de notification de plateforme.

## Mixing

Le pipeline applique filtre passe-haut, compression légère de la voix, ducking de la musique, mixage, normalisation à -16 LUFS et limiteur à -1,2 dBTP. L’export attendu est H.264/AAC, 1080 × 1920, 30 i/s, 48 kHz stéréo, avec audio et vidéo de même durée. Le smoke test refuse le silence, un pic supérieur à -0,8 dBFS, un codec ou une dimension inattendus et toute erreur de décodage.

## Licensing

Chaque asset public doit être original, sous licence explicite compatible ou accompagné de l’attribution requise. La voix SIWIS est utilisée sous CC BY 4.0 et créditée dans chaque légende. Le registre `audio-assets.md` contient source, auteurs, licence, date de vérification et usage. Une incertitude de licence exclut immédiatement l’asset du master public.

## Master workflow

1. Écrire et relire le script, y compris tous les nombres.
2. Générer la voix avec `scripts/social/generate-piper-voice.mjs`.
3. Générer ou sélectionner uniquement des assets inscrits au registre.
4. Mélanger avec `scripts/social/mix-social-audio.mjs` et incruster le SRT.
5. Exécuter `scripts/social/smoke-social-media.mjs`.
6. Écouter au casque puis sur haut-parleur de téléphone avant publication.
7. Conserver le master commun sans watermark ; adapter seulement légende et métadonnées.

Commande J63 :

```bash
node docs/social/j63/generate-media.mjs
```

Commande J64 :

```bash
node docs/social/j64/generate-media.mjs
```

## Platform-specific audio

- TikTok : hook sonore immédiat, voix intelligible sans dépendre d’un son tendance, sous-titres incrustés.
- Instagram Reels : même master, niveau de voix stable et zone basse laissée lisible malgré l’interface.
- YouTube Shorts : même master, titre descriptif, SRT conservé en sidecar et attribution détaillée dans la description.

## Learnings

Les quatre publications J60/J61 auditées étaient muettes et perdaient l’essentiel de leur audience dans les premières secondes. Le master J62 contient déjà une voix, mais son pic atteint presque 0 dBFS. J63 établit donc une première baseline audio contrôlée ; toute comparaison avec les posts silencieux restera observationnelle jusqu’à disposer de plusieurs contenus parlés comparables.

Le relevé J64 ne permet toujours pas de conclure sur l’effet de l’audio : J63 n’avait qu’environ une heure au moment de la mesure. Le premier signal exploitable vient de YouTube (`68,5 %` de balayage), tandis que la rétention détaillée reste en traitement. L’audit image par image montre surtout un problème de hook : la voix démarre vers `0,055 s`, mais la question mathématique n’apparaît qu’autour de `2,0 s`. J64 place donc la formule complète dès la première image et ramène le master à `17,2 s`.
