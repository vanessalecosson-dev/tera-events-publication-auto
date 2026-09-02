const fs = require("fs");
const path = require("path");
const { layouts } = require("./layouts");

const manifestPath = path.join(__dirname, "generated", "figma-source", "manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const declared = new Set(Object.keys(layouts));
const referenced = new Set(manifest.templates.map(item => item.template));
const errors = [];

if (declared.size !== 22) errors.push(`Le moteur déclare ${declared.size} gabarits au lieu de 22.`);
if (referenced.size !== 22) errors.push(`Le manifeste référence ${referenced.size} gabarits au lieu de 22.`);

for (const item of manifest.templates) {
  const layout = layouts[item.template];
  if (!layout) {
    errors.push(`Gabarit absent du moteur : ${item.template}`);
    continue;
  }
  if (layout.width !== item.width || layout.height !== item.height) {
    errors.push(`${item.template} : ${layout.width}x${layout.height} dans le moteur, ${item.width}x${item.height} dans Figma.`);
  }
  const reference = path.join(__dirname, "generated", "figma-source", item.file);
  if (!fs.existsSync(reference)) errors.push(`Export Figma absent : ${item.file}`);
}

for (const template of declared) {
  if (!referenced.has(template)) errors.push(`Gabarit non référencé dans le manifeste : ${template}`);
}

function walk(node, callback) {
  if (!node) return;
  callback(node);
  for (const child of node.children || []) walk(child, callback);
}

for (const [name, layout] of Object.entries(layouts)) {
  const files = [];
  if (layout.background) files.push(layout.background);
  if (layout.logoImage?.file) files.push(layout.logoImage.file);
  walk(layout.root, node => {
    if (node.type === "image" && node.file) files.push(node.file);
  });
  for (const file of files) {
    if (!fs.existsSync(path.join(__dirname, "backgrounds", file))) {
      errors.push(`${name} : ressource graphique absente (${file}).`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("22/22 gabarits présents, dimensions conformes au manifeste Figma et ressources disponibles.");
