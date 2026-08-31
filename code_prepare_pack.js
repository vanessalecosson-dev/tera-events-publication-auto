// "Préparer Pack Hebdomadaire" — regroupe les publications des 3 créneaux de la semaine (lundi,
// mercredi, vendredi) et construit le formulaire de validation groupé, sur le modèle éprouvé de
// La Lignée (code_hebdo_prepare_pack.js) : un seul geste de validation le dimanche plutôt que 3
// validations séparées dans la semaine.

function escapeHtml(str) {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\n/g, "<br>");
}

// Les gabarits TERA n'ont pas de champ "titre" unique et commun (titre/headline/citation/chiffre
// selon la famille) — on prend le premier qui existe pour l'aperçu du pack.
function titleFor(renderBody) {
  return renderBody.titre || renderBody.headline || renderBody.citation || renderBody.chiffre || "";
}

const items = $input.all();
const byJour = {};
items.forEach(it => {
  const j = it.json.jour;
  if (!byJour[j]) byJour[j] = [];
  byJour[j].push(it.json);
});

const jourOrder = ["Lundi", "Mercredi", "Vendredi"];

const slots = jourOrder
  .filter(j => byJour[j])
  .map(jour => {
    const group = byJour[jour].sort((a, b) => (a.slide_index || 1) - (b.slide_index || 1));
    const hero = group.find(g => g.slide_index === 1) || group[0];
    const caption = group[0].caption;
    const rawTitle = titleFor(hero.render_body || {});
    // Une génération dont la réponse Claude n'a pas pu être parsée dégrade gracieusement en amont
    // plutôt que de planter, mais laisse ce créneau sans titre ni légende — à signaler clairement
    // ici plutôt que d'afficher un aperçu vide sans explication.
    const looksFailed = !caption && !rawTitle;
    const titleText = rawTitle || `${jour} — ${group[0].famille}/${group[0].variante}`;
    return {
      jour,
      famille: group[0].famille,
      variante: group[0].variante,
      heroImageUrl: hero.url,
      titleText,
      caption,
      looksFailed,
      renderItems: group
    };
  });

const fields = [];
slots.forEach(s => {
  const warningBanner = s.looksFailed
    ? `<p style="color:#b00; font-weight:bold;">⚠️ La génération a échoué pour cette publication (réponse non exploitable). Choisissez "Modifier" pour la régénérer automatiquement, un commentaire n'est pas nécessaire.</p>`
    : "";
  fields.push({
    fieldLabel: " ",
    fieldType: "html",
    html: `<h3>${escapeHtml(s.jour)} — ${escapeHtml(s.famille)} / ${escapeHtml(s.variante)}</h3>${warningBanner}<img src="${s.heroImageUrl}" style="max-width:320px;border-radius:8px" /><p><b>${escapeHtml(s.titleText)}</b></p><p>${escapeHtml(s.caption)}</p>`
  });
  fields.push({
    fieldLabel: `${s.jour} — décision`,
    fieldType: "dropdown",
    fieldOptions: { values: [{ option: "Valider" }, { option: "Modifier" }, { option: "Refuser" }] },
    requiredField: true
  });
  fields.push({
    fieldLabel: `${s.jour} — Commentaire (si Modifier)`,
    fieldType: "textarea",
    requiredField: false
  });
});

return [{
  json: {
    slots,
    formFieldsJson: JSON.stringify(fields, null, 2)
  }
}];
