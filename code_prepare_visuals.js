// "Préparer Requêtes Visuel" — transforme le JSON rédigé par Claude (slides + caption +
// hashtags) en une liste d'appels au render-service, un par slide/gabarit. Injecte ici les
// éléments de marque fixes (tags de catégorie, coordonnées, CTA visuel statique) que Claude ne
// génère jamais, pour ne courir aucun risque d'erreur sur une donnée de marque.
//
// IMPORTANT : les noms de champs ci-dessous doivent correspondre exactement à ceux attendus par
// render-service/layouts.js. Toute évolution d'un gabarit doit être répercutée aux deux endroits.

const d = $json;

const TEMPLATE_MAP = {
  "declic:traiteur": ["tera-declic-traiteur"],
  "declic:eventplanning": [
    "tera-declic-eventplanning-s1",
    "tera-declic-eventplanning-s2",
    "tera-declic-eventplanning-s3",
    "tera-declic-eventplanning-s4"
  ],
  "savoirfaire:generique": [
    "tera-savoirfairemercredi-s1",
    "tera-savoirfairemercredi-s2",
    "tera-savoirfairemercredi-s3",
    "tera-savoirfairemercredi-s4"
  ],
  "savoirfaire:chiffre": [
    "tera-chiffremercredi-s1",
    "tera-chiffremercredi-s2",
    "tera-chiffremercredi-s3",
    "tera-chiffremercredi-s4",
    "tera-chiffremercredi-s5"
  ],
  "ancrage:a": ["tera-ancragevendredi-a"],
  "ancrage:b": ["tera-ancragevendredi-b"]
};

// Champs de marque fixes, injectés à chaque appel de la famille/variante correspondante — jamais
// laissés à la charge de Claude.
const STATIC_FIELDS = {
  "declic:traiteur": { tag: "LE DÉCLIC · TRAITEUR", devise: "FCFA" },
  "declic:eventplanning": { tag: "LE DÉCLIC · EVENT PLANNING" },
  "savoirfaire:generique": {},
  "savoirfaire:chiffre": { edition_label: "Le chiffre du mercredi" },
  "ancrage:a": { tag: "L'ANCRAGE DU VENDREDI" },
  "ancrage:b": { tag: "L'ANCRAGE DU VENDREDI", cta_label: "Demander un devis →" }
};

const key = `${d.famille}:${d.variante}`;
const templates = TEMPLATE_MAP[key];
if (!templates) {
  throw new Error(`Aucun gabarit défini pour famille="${d.famille}" variante="${d.variante}".`);
}

const slides = Array.isArray(d.slides) ? d.slides : [];
const hashtagsText = Array.isArray(d.hashtags) ? d.hashtags.join(" ") : (d.hashtags || "");
const caption = [d.caption, hashtagsText].filter(Boolean).join("\n\n");
const postId = $execution.id + "-" + d.jour;

const results = templates.map((template, idx) => {
  const slideFields = slides[idx] || {};
  return {
    json: {
      post_id: postId,
      jour: d.jour,
      famille: d.famille,
      variante: d.variante,
      template,
      slide_index: idx + 1,
      slide_count: templates.length,
      target_due_at: d.target_due_at,
      render_body: { ...STATIC_FIELDS[key], ...slideFields },
      caption
    }
  };
});

return results;
