# TERA EVENTS — Pipeline de publication automatisée

Documentation du projet, en cours de construction. Projet indépendant de `la-lignee-publication-auto`, mais qui en réplique l'architecture éprouvée (n8n + render-service Node/Playwright, validation humaine avant publication).

## 1. Vue d'ensemble

TERA EVENTS publie 3 fois par semaine (lundi, mercredi, vendredi) sur Facebook, Instagram et LinkedIn, chaque créneau ayant un angle fixe. Le week-end reste au geste spontané de l'agence (réalisations, reels), hors de ce pipeline.

**Composants prévus :**
- **n8n** — même instance que La Lignée (`https://n8n-owcc.srv1896382.hstgr.cloud`), nouveau workflow indépendant, pas encore créé.
- **Claude (Anthropic API)** — rédaction du texte, aucune recherche web (le contenu porte sur les services propres de TERA, pas des statistiques externes).
- **`render-service`** — service Node.js/Playwright, code déjà écrit et testé localement (`render-service/`), pas encore déployé sur le VPS. Doit tourner dans son propre conteneur Docker (`tera-render`), séparé de `la-lignee-render`.
- **Buffer** — pas encore connecté pour TERA. L'étape de publication est prête côté code mais désactivée en attendant les identifiants de channel.

## 2. Les 3 créneaux et leurs familles de gabarits

| Jour | Famille | Rôle | Variantes disponibles |
|---|---|---|---|
| Lundi | Le Déclic | Lever une objection, répondre une question fréquente | `eventplanning` (carrousel 4 slides), `traiteur` (post unique, prix affiché) |
| Mercredi | Savoir-Faire | Un conseil ou un chiffre TERA, utile et concret | `generique` (carrousel 4 slides, conseil pratique), `chiffre` (carrousel 5 slides, "Le chiffre du mercredi") |
| Vendredi | L'Ancrage | Une accroche courte, ancrée dans la saison/le calendrier ivoirien | `a` (citation centrée), `b` (bloc + bouton CTA) |

Chaque créneau a un **angle fixe** (le jour détermine l'angle), mais la **variante** utilisée à l'intérieur de cet angle **tourne chaque semaine**, pour que le contenu varie selon le sujet (demande explicite du cabinet). La rotation est gérée par `code_prepare_pilliers.js` via les données statiques du workflow n8n (`$getWorkflowStaticData`), un index par famille qui avance d'un cran à chaque exécution hebdomadaire.

Les pools de variantes ne contiennent que ce qui est réellement dessiné dans Figma. À enrichir au fur et à mesure (Décoration, Salle, Savoir-Faire Traiteur sont prévus mais pas encore maquettés — voir §5).

## 3. Fichiers du dépôt

- `code_prepare_pilliers.js` — détermine jour/famille/variante + rotation hebdomadaire.
- `code_prompt_prep.js` — construit le prompt Claude : charte éditoriale + schéma JSON exact par famille/variante. Contient les deux règles absolues du cabinet (écriture indétectable comme IA, orthographe irréprochable) et les faits TERA vérifiés (seule source autorisée pour tout chiffre/prix cité).
- `code_parse_response.js` — parsing anti-crash de la réponse Claude (repris tel quel du pattern La Lignée).
- `code_prepare_visuals.js` — transforme le JSON de Claude en appels au render-service, un par slide, en injectant les éléments de marque fixes (tags, coordonnées, CTA statiques) que Claude ne génère jamais.
- `render-service/` — service de rendu, voir §4.

**Encore à écrire** (mécaniques, pas encore fait) :
- `code_prepare_pack.js` — regroupe les publications de la semaine en un seul e-mail de validation (aperçu + décision + commentaire par créneau), sur le modèle de `code_hebdo_prepare_pack.js` de La Lignée.
- `code_traiter_validation.js` — répartit les décisions du formulaire de validation.
- `code_prepare_buffer.js` — construit les mutations Buffer, écrit mais avec `CHANNELS` vide (à renseigner une fois Buffer connecté).
- `code_prepare_regeneration.js` — reboucle sur le prompt avec le commentaire du cabinet en cas de "Modifier".

## 4. render-service

`render-service/layouts.js` définit **16 gabarits**, reconstruits fidèlement depuis le fichier Figma `GABARIT-TERA-EVENTS` (`vZn7iir8VGn5fh8M9tIfXZ`) : positions, polices (Playfair Display, Poppins, Caveat, DM Serif Display, DM Sans, League Spartan, Geist), couleurs, dégradés, ombres portées et éléments décoratifs (lignes, halo, icône ondes sonores, flèche, pastilles de progression) repris exactement des frames Figma, pas approximés.

Contrairement à La Lignée, **aucune génération de photo par IA** : chaque gabarit a sa photo (ou son dégradé) intégrée directement dans `render-service/backgrounds/`, exportée depuis Figma. La variété vient du nombre de gabarits disponibles, pas d'une photo qui change à chaque publication.

`render-service/server.js` utilise un modèle de champs positionnés librement (pas un empilement de colonnes comme La Lignée) : chaque gabarit déclare un tableau `fields` avec position absolue, police, couleur, et soit `data: "nomDuChamp"` (rempli par Claude) soit `static: "..."` (élément de marque fixe). Testé et validé en local (`PORT=3100 node server.js`), pipeline complet vérifié de bout en bout avec un JSON simulé conforme au schéma.

**Connu et documenté comme limitation actuelle :**
- La slide de couverture du carrousel Déclic Event Planning (slide 1/5 dans Figma) n'existe pas encore : le carrousel publié n'a que 4 slides (les slides 2 à 5 de Figma, renumérotées 1 à 4).
- `tera-savoirfairemercredi-s1` et `-s3` réutilisent la même photo faute d'un asset dédié récupéré pour la slide 3 (Figma ne l'exposait pas comme fill direct).
- Aucun format Story (1080×1920) n'est encore dessiné dans Figma pour ces gabarits — à faire.
- Pas de variante Décoration ni Salle pour l'instant, ni pour Le Déclic ni pour Savoir-Faire.

## 5. Prochaines étapes

1. Écrire les fichiers n8n restants (pack de validation, traitement de la validation, régénération, préparation Buffer stubée).
2. Déployer `render-service` sur le VPS existant (nouveau conteneur Docker `tera-render`, nouvelle route Traefik).
3. Créer le workflow n8n (via l'API n8n, désactivé à la création pour revue avant activation).
4. Connecter Buffer pour TERA (comptes FB/IG/LinkedIn) et renseigner les identifiants de channel dans `code_prepare_buffer.js`.
5. Maquetter les gabarits manquants (couverture Déclic, Décoration, Salle, Savoir-Faire Traiteur, formats Story) au fur et à mesure des besoins.

## 6. Accès & identifiants

Mêmes accès que `la-lignee-publication-auto` (même VPS, même instance n8n) — voir le `.env` de ce dépôt (hors Git) et `~/.ssh/la_lignee_vps_ed25519`. Aucun identifiant Buffer TERA pour l'instant.
