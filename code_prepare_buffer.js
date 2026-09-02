// "Préparer Buffer" — transforme une publication validée en requête de programmation.
// Les identifiants de canaux sont lus depuis l'environnement n8n, jamais écrits dans le code.

const CHANNELS = {
  facebook: $env.BUFFER_CHANNEL_FACEBOOK,
  instagram: $env.BUFFER_CHANNEL_INSTAGRAM,
  linkedin: $env.BUFFER_CHANNEL_LINKEDIN
};

const missing = Object.entries(CHANNELS)
  .filter(([, value]) => !value)
  .map(([name]) => name);

if (missing.length) {
  throw new Error(`Canaux Buffer manquants : ${missing.join(", ")}. Renseigne les variables BUFFER_CHANNEL_* dans l'environnement n8n.`);
}

const mutation = `mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    ... on PostActionSuccess { post { id text dueAt } }
    ... on MutationError { message }
  }
}`;

function buildBufferRequests(d) {
  if (d.decision !== "Valider") return [];

  const renderItems = Array.isArray(d.renderItems) ? d.renderItems : [];
  const media = [...renderItems]
    .sort((a, b) => (a.slide_index || 1) - (b.slide_index || 1))
    .map(item => item.url)
    .filter(Boolean);

  if (!media.length) throw new Error(`Aucun visuel rendu pour la publication du ${d.jour}.`);

  const caption = renderItems[0]?.caption || d.caption || "";
  if (!caption) throw new Error(`Aucune légende disponible pour la publication du ${d.jour}.`);

  return Object.entries(CHANNELS).map(([network, channelId]) => ({
    json: {
      post_id: renderItems[0]?.post_id,
      jour: d.jour,
      network,
      channel_id: channelId,
      due_at: d.target_due_at,
      text: caption,
      media,
      status: "pending_buffer",
      graphql_body: {
        query: mutation,
        variables: {
          input: {
            text: caption,
            channelId,
            assets: media.map(url => ({ image: { url } })),
            schedulingType: "automatic",
            mode: "customScheduled",
            dueAt: d.target_due_at,
            ...(network === "facebook" ? { metadata: { facebook: { type: "post" } } } : {}),
            ...(network === "instagram" ? { metadata: { instagram: { type: "post", shouldShareToFeed: true } } } : {})
          }
        }
      }
    }
  }));
}

return $input.all().flatMap(item => buildBufferRequests(item.json));
