# TERA EVENTS — Pipeline de publication automatisée

Documentation du projet, en cours de construction. Projet indépendant de `la-lignee-publication-auto`, mais qui en réplique l'architecture éprouvée (n8n + render-service Node/Playwright, validation humaine avant publication).

## 1. Vue d'ensemble

TERA EVENTS publie 3 fois par semaine (lundi, mercredi, vendredi) sur Facebook, Instagram et LinkedIn, chaque créneau ayant un angle fixe. Le week-end reste au geste spontané de l'agence (réalisations, reels), hors de ce pipeline.

**Composants prévus :**
- **n8n** — même instance que La Lignée, nouveau workflow indépendant, pas encore créé.
- **Claude (Anthropic API)** — rédaction du texte, aucune recherche web (le contenu porte sur les services propres de TERA, pas des statistiques externes).
- **`render-service`** — service Node.js/Playwright, code déjà écrit et testé localement (`render-service/`), pas encore déployé sur le VPS. Doit tourner dans son propre conteneur Docker (`tera-render`), séparé de `la-lignee-render`.
- **Buffer** — module de préparation présent, mais connexion et identifiants de canaux encore manquants.

## 2. Les 3 créneaux et leurs familles de gabarits

| Jour | Famille | Rôle | Variantes disponibles |
|---|---|---|---|
| Lundi | Le Déclic | Lever une objection, répondre une question fréquente | `eventplanning` (carrousel 4 slides), `traiteur` (post unique, prix affiché) |
| Mercredi | Savoir-Faire | Un conseil, un chiffre ou une prestation TERA | `generique` (4 slides), `chiffre` (5 slides), `traiteur` (5 slides) |
| Vendredi | L'Ancrage | Une accroche courte, ancrée dans la saison/le calendrier ivoirien | `a` (citation centrée), `b` (bloc + bouton CTA) |

Chaque créneau a un **angle fixe** (le jour détermine l'angle), mais la **variante** utilisée à l'intérieur de cet angle **tourne chaque semaine**, pour que le contenu varie selon le sujet (demande explicite du cabinet). La rotation est gérée par `code_prepare_pilliers.js` via les données statiques du workflow n8n (`$getWorkflowStaticData`), un index par famille qui avance d'un cran à chaque exécution hebdomadaire.

Les pools de variantes ne contiennent que ce qui est réellement dessiné dans Figma. À enrichir au fur et à mesure (Décoration, Salle, Savoir-Faire Traiteur sont prévus mais pas encore maquettés — voir §5).

## 3. Fichiers du dépôt

- `code_prepare_pilliers.js` — détermine jour/famille/variante + rotation hebdomadaire.
- `code_prompt_prep.js` — construit le prompt Claude : charte éditoriale + schéma JSON exact par famille/variante. Contient les deux règles absolues du cabinet (écriture indétectable comme IA, orthographe irréprochable) et les faits TERA vérifiés (seule source autorisée pour tout chiffre/prix cité).
- `code_parse_response.js` — parsing anti-crash de la réponse Claude (repris tel quel du pattern La Lignée).
- `code_prepare_visuals.js` — transforme le JSON de Claude en appels au render-service, un par slide, en injectant les éléments de marque fixes (tags, coordonnées, CTA statiques) que Claude ne génère jamais.
- `code_prepare_pack.js` — regroupe les trois publications dans un formulaire de validation hebdomadaire.
- `code_traiter_validation.js` — répartit les décisions Valider, Modifier et Refuser.
- `code_prepare_regeneration.js` — prépare une nouvelle tentative à partir du commentaire de validation, avec trois tentatives maximum.
- `code_prepare_buffer.js` — prépare une programmation pour Facebook, Instagram et LinkedIn à partir des canaux définis dans l'environnement n8n.
- `render-service/` — service de rendu, voir §4.

**Encore à intégrer dans n8n** : l'appel Anthropic, le rendu, le formulaire de validation, les branches de décision, la boucle de régénération et l'appel Buffer.

## 4. render-service

`render-service/layouts.js` définit **22 gabarits**, reconstruits depuis le fichier Figma `GABARIT-TERA-EVENTS` (`vZn7iir8VGn5fh8M9tIfXZ`) : positions, polices, couleurs, dégradés, ombres et éléments décoratifs.

Contrairement à La Lignée, **aucune génération de photo par IA** : chaque gabarit a sa photo (ou son dégradé) intégrée directement dans `render-service/backgrounds/`, exportée depuis Figma. La variété vient du nombre de gabarits disponibles, pas d'une photo qui change à chaque publication.

`render-service/server.js` utilise un modèle de champs positionnés librement (pas un empilement de colonnes comme La Lignée) : chaque gabarit déclare un tableau `fields` avec position absolue, police, couleur, et soit `data: "nomDuChamp"` (rempli par Claude) soit `static: "..."` (élément de marque fixe). Testé et validé en local (`PORT=3100 node server.js`), pipeline complet vérifié de bout en bout avec un JSON simulé conforme au schéma.

**Limitations actuelles :**
- Aucun format Story (1080×1920) n'est encore dessiné dans Figma pour ces gabarits — à faire.
- Pas de variante Décoration ni Salle pour l'instant.

## 5. Prochaines étapes

1. Déployer `render-service` sur le VPS existant dans un conteneur `tera-render` séparé.
2. Créer le workflow n8n, désactivé à la création pour revue.
3. Connecter Buffer pour TERA et renseigner les identifiants de canaux dans l'environnement n8n.
4. Tester le parcours génération → rendu → validation → régénération éventuelle → programmation.
5. Maquetter les variantes Décoration, Salle et les formats Story.

## 6. Accès & identifiants

Les noms de variables attendues sont documentés dans `.env.example`. Le fichier `.env` local est ignoré par Git et ne doit jamais contenir de valeur destinée au dépôt. Aucun identifiant Buffer TERA n'est renseigné pour l'instant.
