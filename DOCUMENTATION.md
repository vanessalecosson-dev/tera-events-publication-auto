# TERA EVENTS — Pipeline de publication automatisée

Documentation du projet, en cours de construction. Projet indépendant de `la-lignee-publication-auto`, mais qui en réplique l'architecture éprouvée (n8n + render-service Node/Playwright, validation humaine avant publication).

## 1. Vue d'ensemble

TERA EVENTS publie 3 fois par semaine (lundi, mercredi, vendredi) sur Facebook, Instagram et LinkedIn, chaque créneau ayant un angle fixe. Le week-end reste au geste spontané de l'agence (réalisations, reels), hors de ce pipeline.

**Composants prévus :**
- **n8n** — même instance que La Lignée, workflow indépendant `TERA EVENTS - Publication Hebdomadaire` (`wrq6FhVvULDUuUUp`), créé avec 25 nœuds et maintenu désactivé pendant la configuration.
- **Claude (Anthropic API)** — rédaction dynamique des textes selon le sujet, sans recherche web (le contenu porte sur les services propres de TERA, pas des statistiques externes).
- **Gemini Image** — génération des photos de fond contextuelles pour les gabarits photographiques. Aucun texte, logo ni élément de composition n'est généré dans l'image ; la charte reste appliquée par Figma et le render-service.
- **`render-service`** — service Node.js/Playwright déployé dans le conteneur Docker séparé `tera-render`. n8n le joint sur `http://tera-render:3000` et les images destinées aux réseaux sont servies par `https://tera-visuels.srv1896382.hstgr.cloud`.
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

L'export `workflow-tera-events.json` assemble l'appel Anthropic, la branche facultative de photo IA, le rendu, le formulaire de validation, les branches de décision, la boucle de régénération et l'appel Buffer. Il est généré par `build_n8n_workflow.js` et reste désactivé jusqu'à la configuration des credentials et aux essais de bout en bout.

## 4. render-service

`render-service/layouts.js` définit **22 gabarits**, reconstruits depuis le fichier Figma `GABARIT-TERA-EVENTS` (`vZn7iir8VGn5fh8M9tIfXZ`) : positions, polices, couleurs, dégradés, ombres et éléments décoratifs.

Chaque gabarit conserve une photo ou un dégradé Figma comme fond canonique. Le workflow peut toutefois fournir un champ `background_image` propre à la publication : l'image issue de la banque média TERA remplace alors automatiquement le fond canonique, tout en conservant la composition graphique du gabarit. `background_position` permet d'ajuster le cadrage si nécessaire.

`render-service/server.js` utilise des arbres de mise en page composés de groupes, rangées et éléments positionnés. Les propriétés `data` sont remplies par la rédaction automatique ; les propriétés `static` restent fixes. Les compositions, espacements et dimensions proviennent de chaque nœud Figma. Le contrôle `npm test` vérifie les 22 correspondances avec le manifeste Figma et la présence de toutes les ressources locales.

**Limitations actuelles :**
- Aucun format Story (1080×1920) n'est encore dessiné dans Figma pour ces gabarits — à faire.
- Pas de variante Décoration ni Salle pour l'instant.

## 5. Prochaines étapes

L'adresse de validation configurée est `cabinetlalignee@gmail.com`, avec le credential Gmail SMTP déjà opérationnel dans n8n.

1. Connecter les pages TERA au compte Buffer existant et renseigner les trois identifiants de canaux.
2. Tester le parcours génération → photo IA → rendu → validation → régénération éventuelle, sans valider la branche Buffer pendant le test.
3. Vérifier une programmation Buffer contrôlée, puis activer le déclencheur hebdomadaire.
4. Maquetter les formats Story complémentaires dans Figma.

## 6. Accès & identifiants

Les noms de variables attendues sont documentés dans `.env.example`. Le fichier `.env` local est ignoré par Git et ne doit jamais contenir de valeur destinée au dépôt. Aucun identifiant Buffer TERA n'est renseigné pour l'instant.
