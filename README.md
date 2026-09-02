# TERA EVENTS — Publication automatisée

Workflow de production de contenus pour TERA EVENTS : rédaction assistée, génération de visuels fidèles aux gabarits Figma, validation humaine puis programmation sur les réseaux sociaux.

## Cadence éditoriale

- Lundi : **Le Déclic**, pour lever une objection ou expliquer une prestation.
- Mercredi : **Savoir-Faire**, pour montrer l'expertise Event Planning, Traiteur, Décoration et Salle.
- Vendredi : **L'Ancrage**, pour relier TERA EVENTS au calendrier et aux usages ivoiriens.
- Réalisations, Reels et vidéos : publication spontanée, hors workflow automatisé.

## État actuel

- 22 gabarits Figma intégrés au render-service : formats 1080 × 1080, 1121 × 1350 et 1226 × 1350 selon le modèle source.
- Préparation des piliers, prompts, parsing, visuels et validation hebdomadaire disponible.
- Publication Buffer et régénération préparées sous forme de modules n8n.
- Workflow n8n créé et désactivé (`wrq6FhVvULDUuUUp`) ; moteur graphique déployé sur le VPS avec 22 gabarits ; e-mail de validation et canaux Buffer encore à renseigner.

## Démarrage local du render-service

1. Copier `.env.example` vers `.env` et renseigner les valeurs locales.
2. Installer les dépendances dans `render-service` avec `npm install`.
3. Installer Chromium avec `npx playwright install chromium` si nécessaire.
4. Lancer `npm start` depuis `render-service`.
5. Vérifier `http://localhost:3100/health`.
6. Exécuter `npm test` pour contrôler la présence des 22 gabarits, leurs dimensions Figma et leurs ressources graphiques.

Les fichiers `code_*.js` sont destinés aux nœuds Code du workflow n8n. Le détail de l'architecture et des prochaines étapes se trouve dans `DOCUMENTATION.md`.

`workflow-tera-events.json` est l'export importable. Il peut être régénéré avec `node build_n8n_workflow.js` après toute modification d'un module `code_*.js`.

## Sécurité

Le fichier `.env` est local et ignoré par Git. Seul `.env.example`, sans secret, doit être versionné.
