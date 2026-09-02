// n8n node mode: runOnceForEachItem (this file must return a single {json:{...}} object, not an array)
// Reprend telle quelle la double sécurité anti-crash de La Lignée : le nœud ne doit jamais
// planter même si Claude répond avec du texte non conforme (préambule, balises markdown).
const contentBlocks = $json.content || [];
const textBlocks = contentBlocks.filter(b => b.type === "text");
const raw = textBlocks.length ? textBlocks.map(b => b.text).join("") : undefined;

function tryParse(text) {
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch (e) {
    return undefined;
  }
}

let parsed = tryParse(raw);
if (parsed === undefined) {
  const match = raw && raw.match(/\{[\s\S]*\}/);
  parsed = match ? tryParse(match[0]) : undefined;
}
if (parsed === undefined) {
  parsed = { error: "Parsing JSON échoué", raw: raw || JSON.stringify($json) };
}

// Garde-fou éditorial : aucun membre de l'équipe ne doit être nommé dans un contenu publié.
// Cette vérification complète la consigne donnée au modèle et bloque le flux si elle est violée.
const publicationText = JSON.stringify(parsed);
const forbiddenPeople = ["Vanessa", "Eric", "Éric"];
const detectedPerson = forbiddenPeople.find(name =>
  new RegExp(`\\b${name}\\b`, "iu").test(publicationText)
);
if (detectedPerson) {
  throw new Error("Le contenu généré cite un membre de l'équipe. Une nouvelle rédaction non nominative est requise.");
}

const source = $("Préparer le Prompt Claude").item.json;

return {
  json: {
    jour: source.jour,
    famille: source.famille,
    variante: source.variante,
    attempt: source.attempt || 1,
    target_due_at: source.target_due_at,
    ...parsed
  }
};
