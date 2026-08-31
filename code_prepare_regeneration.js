// "Préparer Régénération" — renvoie les publications à modifier vers la préparation du prompt.
// Le commentaire humain est prioritaire ; en cas d'échec technique, une consigne neutre suffit.

const d = $json;
if (d.decision !== "Modifier") return [];

const attempt = Number(d.attempt || 1) + 1;
const maxAttempts = 3;
if (attempt > maxAttempts) {
  throw new Error(`Nombre maximal de régénérations atteint pour ${d.jour}. Une intervention humaine est nécessaire.`);
}

const feedback = String(d.commentaire || "").trim() ||
  "La proposition précédente n'était pas exploitable. Reprends entièrement le contenu en respectant le schéma JSON, la ligne éditoriale et les faits TERA.";

return [{
  json: {
    jour: d.jour,
    famille: d.famille,
    variante: d.variante,
    target_due_at: d.target_due_at,
    attempt,
    modification_feedback: feedback,
    previous_render_items: d.renderItems || []
  }
}];
