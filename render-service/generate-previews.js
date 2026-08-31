const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const { layouts } = require("./layouts");

const port = Number(process.env.PORT || 3100);
const baseUrl = `http://127.0.0.1:${port}`;
const outputDir = path.join(__dirname, "generated", "22-gabarits");

const sample = {
  tag: "LE DÉCLIC · TERA EVENTS",
  devise: "FCFA",
  titre: "Votre événement mérite une organisation sans improvisation",
  titre_normal: "Votre événement,",
  titre_accent: "notre savoir-faire",
  texte: "Chaque détail est pensé pour créer une expérience fluide, chaleureuse et fidèle à votre vision.",
  accroche: "Ce que cela comprend vraiment",
  prix: "19 000",
  tag_formule: "FORMULE TERA",
  repere: "01 — LE BON CHOIX",
  conclusion: "Vous profitez pleinement de votre événement, notre équipe veille au reste.",
  cta_label: "DEMANDEZ VOTRE DEVIS",
  cta_question: "On prépare votre événement ?",
  cta_action: "ÉCRIVEZ-NOUS",
  edition_label: "Le chiffre du mercredi",
  chiffre: "48",
  unite: "heures",
  headline: "Le délai pour recevoir votre première proposition",
  insight: "Un délai clair permet d’avancer sereinement, sans laisser les décisions importantes s’accumuler.",
  surtitre: "LE CHIFFRE DU MERCREDI",
  statistique: "48 HEURES",
  cartouche: "NOTRE ENGAGEMENT",
  conseil1: "Définir le format et le nombre d’invités avant de choisir les prestations.",
  conseil2: "Prévoir une marge pour les ajustements de dernière minute.",
  conseil3: "Confier la coordination à une équipe qui connaît chaque prestataire.",
  detail1: "Un interlocuteur unique pour suivre toutes les étapes.",
  detail2: "Un déroulé précis partagé avant le jour de l’événement.",
  detail3: "Une équipe présente pour gérer les imprévus sur place.",
  badge: "CONSEIL TERA",
  badge1: "LE SAVOIR-FAIRE",
  badge2: "TRAITEUR",
  gamme_ligne1: "GAMME",
  gamme_ligne2: "DÉCOUVERTE",
  citation: "Les plus beaux événements sont ceux où les invités se sentent attendus dès leur arrivée.",
  body: "Découvrez ce que comprend notre accompagnement et choisissez la formule adaptée à votre réception."
};

const overrides = {
  "tera-savoirfairetraiteur-s1": { badge1: "SAVOIR-FAIRE", badge2: "TRAITEUR", texte: "Trois gammes pensées pour s’adapter au style, au rythme et au budget de votre réception." },
  "tera-savoirfairetraiteur-s2": { gamme_ligne2: "DÉCOUVERTE", badge: "SIMPLE ET GÉNÉREUSE" },
  "tera-savoirfairetraiteur-s3": { gamme_ligne2: "PRESTIGE", badge: "ÉLÉGANTE ET RAFFINÉE" },
  "tera-savoirfairetraiteur-s4": { gamme_ligne2: "GALA", badge: "UNE EXPÉRIENCE SIGNATURE" },
  "tera-savoirfairetraiteur-s5": { gamme_ligne1: "COMMENT", gamme_ligne2: "CHOISIR ?", badge: "PARLONS DE VOTRE PROJET" },
  "tera-ancragevendredi-a": { citation: "Un événement réussi commence bien avant l’arrivée du premier invité." },
  "tera-ancragevendredi-b": { headline: "Ce qui est inclus dans la location de notre salle avec logistique, et ce qui ne l’est pas.", body: "Découvrez en détail tout ce que comprend notre offre de location de salle événementielle avec logistique intégrée." }
};

function waitForHealth(retries = 40) {
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const response = await fetch(`${baseUrl}/health`);
        if (response.ok) return resolve();
      } catch (_) {}
      if (retries-- <= 0) return reject(new Error("Le render-service ne répond pas."));
      setTimeout(poll, 500);
    };
    poll();
  });
}

async function main() {
  fs.mkdirSync(outputDir, { recursive: true });
  let child = null;
  try {
    await fetch(`${baseUrl}/health`);
  } catch (_) {
    child = spawn(process.execPath, [path.join(__dirname, "server.js")], {
      cwd: __dirname,
      env: { ...process.env, PORT: String(port), PUBLIC_BASE_URL: baseUrl },
      stdio: "inherit"
    });
  }

  await waitForHealth();
  const names = Object.keys(layouts);
  for (const [index, template] of names.entries()) {
    const response = await fetch(`${baseUrl}/render/${template}?format=png`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...sample, ...(overrides[template] || {}) })
    });
    if (!response.ok) throw new Error(`${template}: ${await response.text()}`);
    const target = path.join(outputDir, `${String(index + 1).padStart(2, "0")}-${template}.png`);
    fs.writeFileSync(target, Buffer.from(await response.arrayBuffer()));
    process.stdout.write(`Généré ${index + 1}/22 : ${path.basename(target)}\n`);
  }

  if (child) child.kill();
  process.stdout.write(`Terminé : ${names.length} gabarits dans ${outputDir}\n`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
