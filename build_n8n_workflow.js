const fs = require("fs");
const path = require("path");

const root = __dirname;
const code = file => fs.readFileSync(path.join(root, file), "utf8");
const nodes = [];
const connections = {};

function add(name, type, position, parameters, typeVersion = 2, nodeOptions = {}) {
  nodes.push({ name, type, typeVersion, position, parameters, ...nodeOptions });
}
function connect(from, to, output = 0) {
  if (!connections[from]) connections[from] = { main: [] };
  while (connections[from].main.length <= output) connections[from].main.push([]);
  connections[from].main[output].push({ node: to, type: "main", index: 0 });
}
function codeNode(name, position, file, mode) {
  add(name, "n8n-nodes-base.code", position, { jsCode: code(file), ...(mode ? { mode } : {}) });
}
function decisionNode(name, position, value) {
  add(name, "n8n-nodes-base.if", position, { conditions: { options: { caseSensitive: true, typeValidation: "strict" }, conditions: [{ id: name.toLowerCase().replace(/\W+/g, "-"), leftValue: "={{ $json.decision }}", rightValue: value, operator: { type: "string", operation: "equals" } }], combinator: "and" }, options: {} }, 2.2);
}

add("Déclencheur Hebdomadaire (Dimanche)", "n8n-nodes-base.scheduleTrigger", [0, -160], { rule: { interval: [{ field: "weeks", triggerAtDay: [0], triggerAtHour: 7 }] } }, 1.3);
add("Déclenchement Manuel", "n8n-nodes-base.manualTrigger", [0, 0], {}, 1);
codeNode("Préparer les 3 publications", [240, 0], "code_prepare_pilliers.js");
codeNode("Préparer le Prompt Claude", [480, 0], "code_prompt_prep.js", "runOnceForEachItem");
add("Générer le contenu (Claude)", "n8n-nodes-base.httpRequest", [720, 0], { method: "POST", url: "https://api.anthropic.com/v1/messages", authentication: "predefinedCredentialType", nodeCredentialType: "anthropicApi", sendHeaders: true, headerParameters: { parameters: [{ name: "anthropic-version", value: "2023-06-01" }] }, sendBody: true, specifyBody: "json", jsonBody: "={{ JSON.stringify($json.anthropic_request) }}", options: { timeout: 600000 } }, 4.2);
codeNode("Parser Réponse Claude", [960, 0], "code_parse_response.js", "runOnceForEachItem");
add("Fond IA requis ?", "n8n-nodes-base.if", [1200, 0], { conditions: { options: { caseSensitive: true, typeValidation: "strict" }, conditions: [{ id: "fond-ia", leftValue: "={{ !($json.famille === 'savoirfaire' && $json.variante === 'chiffre') }}", rightValue: true, operator: { type: "boolean", operation: "true", singleValue: true } }], combinator: "and" }, options: {} }, 2.2);
codeNode("Préparer Photo de Fond IA", [1440, -160], "code_prepare_image_generation.js", "runOnceForEachItem");
add("Générer Photo de Fond", "n8n-nodes-base.httpRequest", [1680, -160], { method: "POST", url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image:generateContent", authentication: "genericCredentialType", genericAuthType: "httpHeaderAuth", sendBody: true, specifyBody: "json", jsonBody: "={{ JSON.stringify($json.gemini_request) }}", options: { timeout: 600000 } }, 4.2, { retryOnFail: true, maxTries: 5, waitBetweenTries: 15000 });
codeNode("Associer Photo Générée", [1920, -160], "code_attach_generated_background.js", "runOnceForEachItem");
add("Fusionner Contenus", "n8n-nodes-base.merge", [2160, 0], { mode: "append", numberInputs: 2 }, 3.2);
codeNode("Préparer Requêtes Visuel", [2400, 0], "code_prepare_visuals.js");
add("Générer les Visuels", "n8n-nodes-base.httpRequest", [2640, 0], { method: "POST", url: "={{ ($env.TERA_RENDER_BASE_URL || 'https://tera-visuels.srv1896382.hstgr.cloud') + '/render/' + $json.template }}", authentication: "genericCredentialType", genericAuthType: "httpHeaderAuth", sendBody: true, specifyBody: "json", jsonBody: "={{ JSON.stringify($json.render_body) }}", options: { timeout: 120000 } }, 4.2, { retryOnFail: true, maxTries: 3, waitBetweenTries: 5000 });
add("Associer les Visuels", "n8n-nodes-base.code", [2880, 0], { mode: "runOnceForEachItem", jsCode: "const source = $('Préparer Requêtes Visuel').item.json;\nreturn { json: { ...source, ...$json } };" });
codeNode("Préparer Pack Hebdomadaire", [3120, 0], "code_prepare_pack.js");
add("Envoyer Pack de Validation", "n8n-nodes-base.emailSend", [3360, 0], { operation: "sendAndWait", fromEmail: "cabinetlalignee@gmail.com", toEmail: "cabinetlalignee@gmail.com", subject: "TERA EVENTS - Validation hebdomadaire", message: "Voici les trois publications proposées. Validez, modifiez ou refusez chaque contenu.", responseType: "customForm", defineForm: "json", jsonOutput: "={{ $json.formFieldsJson }}", options: {} }, 2.1);
codeNode("Traiter la Validation Hebdomadaire", [3600, 0], "code_traiter_validation.js");
decisionNode("Est Valider ?", [3840, 0], "Valider");
codeNode("Préparer Publication Buffer", [4080, -160], "code_prepare_buffer.js");
add("Programmer sur Buffer", "n8n-nodes-base.httpRequest", [4320, -160], { method: "POST", url: "https://api.buffer.com/", authentication: "genericCredentialType", genericAuthType: "httpHeaderAuth", sendBody: true, specifyBody: "json", jsonBody: "={{ JSON.stringify($json.graphql_body) }}", options: {} }, 4.2);
decisionNode("Est Modifier ?", [4080, 80], "Modifier");
add("Sous Limite Tentatives ?", "n8n-nodes-base.if", [4320, 40], { conditions: { options: { caseSensitive: true, typeValidation: "strict" }, conditions: [{ id: "limite", leftValue: "={{ ($json.attempt || 1) < 3 }}", rightValue: true, operator: { type: "boolean", operation: "true", singleValue: true } }], combinator: "and" }, options: {} }, 2.2);
codeNode("Préparer Régénération", [4560, -20], "code_prepare_regeneration.js");
add("Refusé", "n8n-nodes-base.noOp", [4320, 200], {}, 1);
add("Abandon après 3 tentatives", "n8n-nodes-base.noOp", [4560, 140], {}, 1);

connect("Déclencheur Hebdomadaire (Dimanche)", "Préparer les 3 publications");
connect("Déclenchement Manuel", "Préparer les 3 publications");
connect("Préparer les 3 publications", "Préparer le Prompt Claude");
connect("Préparer le Prompt Claude", "Générer le contenu (Claude)");
connect("Générer le contenu (Claude)", "Parser Réponse Claude");
connect("Parser Réponse Claude", "Fond IA requis ?");
connect("Fond IA requis ?", "Préparer Photo de Fond IA", 0);
connect("Fond IA requis ?", "Fusionner Contenus", 1);
connect("Préparer Photo de Fond IA", "Générer Photo de Fond");
connect("Générer Photo de Fond", "Associer Photo Générée");
connect("Associer Photo Générée", "Fusionner Contenus", 0);
connect("Fusionner Contenus", "Préparer Requêtes Visuel");
connect("Préparer Requêtes Visuel", "Générer les Visuels");
connect("Générer les Visuels", "Associer les Visuels");
connect("Associer les Visuels", "Préparer Pack Hebdomadaire");
connect("Préparer Pack Hebdomadaire", "Envoyer Pack de Validation");
connect("Envoyer Pack de Validation", "Traiter la Validation Hebdomadaire");
connect("Traiter la Validation Hebdomadaire", "Est Valider ?");
connect("Est Valider ?", "Préparer Publication Buffer", 0);
connect("Est Valider ?", "Est Modifier ?", 1);
connect("Préparer Publication Buffer", "Programmer sur Buffer");
connect("Est Modifier ?", "Sous Limite Tentatives ?", 0);
connect("Est Modifier ?", "Refusé", 1);
connect("Sous Limite Tentatives ?", "Préparer Régénération", 0);
connect("Sous Limite Tentatives ?", "Abandon après 3 tentatives", 1);
connect("Préparer Régénération", "Préparer le Prompt Claude");

const workflow = { name: "TERA EVENTS - Publication Hebdomadaire", active: false, nodes, connections, settings: { executionOrder: "v1", timezone: "Africa/Abidjan" } };
fs.writeFileSync(path.join(root, "workflow-tera-events.json"), JSON.stringify(workflow, null, 2) + "\n");
console.log(`Workflow généré : ${nodes.length} nœuds, ${Object.keys(connections).length} connexions.`);
