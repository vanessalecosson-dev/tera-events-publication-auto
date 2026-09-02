// Prépare une photo de fond contextuelle. L'IA ne produit aucun texte ni élément graphique :
// ceux-ci restent exclusivement gérés par les gabarits Figma du render-service.
const d = $json;
const content = JSON.stringify(d.slides || []).slice(0, 5000);
const prompt = `Luxury event editorial photography in Abidjan, Côte d'Ivoire, created as a background for a TERA EVENTS social-media design. Subject and intent: ${content}. Show a credible high-end event scene related to event planning, catering, decoration or an event venue. If people appear, every person must be Black African, with natural Ivorian or West African appearance. Refined navy blue, warm blush and neutral tones, cinematic lighting, realistic professional photography, premium but welcoming atmosphere. Leave calm visual space for overlaid typography. Absolutely no readable text, letters, numbers, logos, watermarks, signage or invented branding. Square composition with safe central crop.`;

return {
  json: {
    gemini_request: {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ["IMAGE"] }
    }
  }
};
