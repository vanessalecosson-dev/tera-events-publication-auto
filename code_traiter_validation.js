// "Traiter la Validation Hebdomadaire" — répartit les décisions du formulaire de validation
// (une ligne Valider/Modifier/Refuser + commentaire par créneau) vers les branches de routage.

const formData = $("Envoyer Pack de Validation").item.json.data;
const slots = $("Préparer Pack Hebdomadaire").item.json.slots;
const pilierConfig = $("Préparer les 3 publications").all().map(i => i.json);

const results = [];
slots.forEach(s => {
  const decision = formData[`${s.jour} — décision`];
  const commentaire = formData[`${s.jour} — Commentaire (si Modifier)`] || "";
  const config = pilierConfig.find(c => c.jour === s.jour) || {};
  results.push({
    json: {
      jour: s.jour,
      famille: s.famille,
      variante: s.variante,
      attempt: config.attempt || 1,
      target_due_at: config.target_due_at,
      decision,
      commentaire,
      renderItems: s.renderItems
    }
  });
});

return results;
