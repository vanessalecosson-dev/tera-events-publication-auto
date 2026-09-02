// n8n node mode: runOnceForEachItem
// Buffer peut renvoyer une erreur métier dans une réponse HTTP 200. Sans ce contrôle, n8n
// considère à tort la programmation comme réussie.
const response = $json;
const result = response?.data?.createPost;

if (!result) {
  throw new Error("Buffer n'a renvoyé aucun résultat createPost.");
}

if (result.message) {
  throw new Error(`Buffer a refusé la programmation : ${result.message}`);
}

if (!result.post?.id) {
  throw new Error("Buffer n'a créé aucune publication et n'a fourni aucun identifiant.");
}

return {
  json: {
    buffer_post_id: result.post.id,
    due_at: result.post.dueAt,
    status: "scheduled"
  }
};
