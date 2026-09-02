// Réassocie la réponse image au contenu éditorial avant le rendu Figma.
const source = $("Parser Réponse Claude").item.json;

// Le Chiffre du mercredi est un carrousel 100 % graphique. Même si une réponse image existe en
// amont, elle ne doit jamais être transmise aux cinq gabarits de cette série.
if (source.famille === "savoirfaire" && source.variante === "chiffre") {
  const { background_image, background_images, ...withoutBackground } = source;
  return { json: withoutBackground };
}

const parts = $json.candidates?.[0]?.content?.parts || [];
const imagePart = parts.find(part => part.inlineData?.data || part.inline_data?.data);
const inline = imagePart?.inlineData || imagePart?.inline_data;

if (!inline?.data) {
  throw new Error("La génération de la photo de fond n'a retourné aucune image exploitable.");
}

return {
  json: {
    ...source,
    background_image: `data:${inline.mimeType || inline.mime_type || "image/png"};base64,${inline.data}`
  }
};
