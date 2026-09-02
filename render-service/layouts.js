// Gabarits reconstruits depuis le fichier Figma "GABARIT TERA EVENTS" (vZn7iir8VGn5fh8M9tIfXZ),
// relus intégralement via get_design_context (pas d'approximation par famille) : chaque slide a
// été vérifiée individuellement — polices, tailles, couleurs, rotations, dégradés, composants
// (pastilles, badges, pilules, filets, barres d'accent) repris tels quels.

const LOGO_FILE = "logo-tera.png";

const DECLIC_EP = { bg: "declic-eventplanning-s", accent: "#c4956a", text: "#ffffff", textDim: "#e5e5e5" };
const DECLIC_TRAITEUR_C = { accent: "#f05a47", text: "#fffdf8", textDim: "#fff7e8" };
const SAVOIR = { bg: "#091b4d", accent: "#d59a99", accentLight: "#f1ceca", text: "#ffffff", textDim: "#fff8f2" };
const SAVOIR_TRAITEUR_C = { badge: "#700103", cta: "#6b1c09" };
const CHIFFRE_C = { accent: "#d59a99", accent2: "#65d7fa", cyan: "#bdefff", text: "#ffffff", textDim: "#dce7ff", bg: "#071a4f" };
const ANCRAGE_C = { accent: "#d49a8f", text: "#fff9f1" };

function t(opts) { return { type: "text", ...opts }; }
function grp(opts) { return { type: "group", ...opts }; }
function row(opts) { return { type: "row", ...opts }; }
function img(file, w, h) { return { type: "image", file, w, h }; }
function line(w, h, color, opacity) { return { type: "line", w, h, color, opacity }; }
function pill(opts) { return { type: "pill", ...opts }; }

const layouts = {};

// =========================================================================
// LE DÉCLIC — Event Planning (carrousel, 5 slides réelles). La numérotation des pastilles
// reprend exactement celle de Figma (la couverture n'affiche pas de pastilles).
// =========================================================================
const DECLIC_LINE = "#C4956A";

layouts["tera-declic-eventplanning-s1"] = {
  width: 1080, height: 1080,
  background: "declic-eventplanning-cover-source.png",
  photoGradient: { layers: [
    { direction: "90deg", stops: ["rgba(3,7,30,0.15) 0%", "rgba(3,7,30,0.15) 100%"] },
    { direction: "90deg", stops: ["rgba(11,24,84,0.4) 0%", "rgba(11,24,84,0.4) 100%"] }
  ] },
  root: grp({
    x: 0, y: 0, w: 1080, h: 1080, padding: "64px", direction: "column", justify: "between",
    children: [
      row({ w: 952, h: 148, justify: "between", align: "center", children: [
        { type: "image", file: "logo-tera-declic.png", w: 138, h: 148, fit: "cover" },
        t({ static: "LE DÉCLIC  ·  EVENT PLANNING", font: "Poppins", weight: 700, size: 22, color: "#ffffff", uppercase: true, nowrap: true })
      ]}),
      { type: "titleTwoTone", dataNormal: "titre_normal", dataAccent: "titre_accent", font: "Playfair Display", weight: 500, size: 90, color: DECLIC_EP.text, accentColor: DECLIC_EP.accent, lineHeight: 1.15 },
      row({ w: 938, h: 146, style: "position:relative;", children: [
        grp({ x: 738, y: 34, w: 200, direction: "column", align: "end", gap: 4, children: [
          t({ static: "SWIPE POUR DÉCOUVRIR", font: "League Spartan", weight: 400, size: 16, color: "#ffffff", uppercase: true, nowrap: true }),
          t({ static: "CE QUE PERSONNE", font: "League Spartan", weight: 400, size: 16, color: "#ffffff", uppercase: true, nowrap: true }),
          t({ static: "NE VOUS DIT", font: "Poppins", weight: 700, size: 16, color: "#b78d6a", uppercase: true, underline: true, nowrap: true })
        ]})
      ]})
    ]
  })
};

function declicEP(bg, gap, dots, children) {
  return {
    width: 1080, height: 1080,
    background: bg,
    photoGradient: { layers: [
      { direction: "180deg", stops: ["rgba(3,7,30,0.8) 0%", "rgba(11,24,84,0.95) 70%", "rgb(3,7,30) 100%"] },
      { direction: "90deg", stops: ["rgba(3,7,30,0.35) 0%", "rgba(3,7,30,0.35) 100%"] },
      { direction: "90deg", stops: ["rgba(11,24,84,0.45) 0%", "rgba(11,24,84,0.45) 100%"] }
    ] },
    root: grp({
      x: 0, y: 0, w: 1080, h: 1080, padding: "64px", direction: "column", justify: "between",
      children: [
        row({ justify: "between", align: "center", children: [
          { type: "image", file: "logo-tera-declic.png", w: 118, h: 126, fit: "cover" },
          t({ static: "LE DÉCLIC  ·  EVENT PLANNING", font: "Poppins", weight: 700, size: 18, color: "#ffffff", uppercase: true, nowrap: true })
        ]}),
        grp({ direction: "column", gap, children }),
        row({ justify: "between", align: "center", children: [
          { type: "dots", count: 5, active: dots, activeColor: DECLIC_EP.accent },
          t({ static: "www.tera.events", font: "Poppins", weight: 400, size: 14, color: "rgba(255,255,255,0.5)", uppercase: true, nowrap: true })
        ]})
      ]
    })
  };
}

layouts["tera-declic-eventplanning-s2"] = declicEP("declic-eventplanning-s2-source.png", 32, 2, [
  grp({ direction: "column", gap: 8, children: [
    t({ data: "tag_formule", font: "Poppins", weight: 700, size: 20, color: DECLIC_EP.accent, uppercase: true, nowrap: true }),
    { type: "titleTwoTone", dataNormal: "titre_normal", dataAccent: "titre_accent", font: "Playfair Display", weight: 500, accentWeight: 400, size: 64, color: DECLIC_EP.text, accentColor: DECLIC_EP.accent, lineHeight: 1.15 }
  ]}),
  line(120, 3, DECLIC_LINE),
  t({ data: "texte", font: "Poppins", weight: 400, size: 24, color: DECLIC_EP.textDim, lineHeight: 1.6 })
]);
layouts["tera-declic-eventplanning-s3"] = declicEP("declic-eventplanning-s3-source.png", 32, 3, [
  grp({ direction: "column", gap: 8, children: [
    t({ data: "tag_formule", font: "Poppins", weight: 700, size: 20, color: DECLIC_EP.accent, uppercase: true, nowrap: true }),
    { type: "titleTwoTone", dataNormal: "titre_normal", dataAccent: "titre_accent", font: "Playfair Display", weight: 500, accentWeight: 400, size: 64, color: DECLIC_EP.text, accentColor: DECLIC_EP.accent, lineHeight: 1.15 }
  ]}),
  line(120, 3, DECLIC_LINE),
  t({ data: "texte", font: "Poppins", weight: 400, size: 24, color: DECLIC_EP.textDim, lineHeight: 1.6 })
]);
layouts["tera-declic-eventplanning-s4"] = declicEP("declic-eventplanning-s4-source.png", 32, 4, [
  grp({ direction: "column", gap: 8, children: [
    t({ data: "tag_formule", font: "Poppins", weight: 700, size: 20, color: DECLIC_EP.accent, uppercase: true, nowrap: true }),
    { type: "titleTwoTone", dataNormal: "titre_normal", dataAccent: "titre_accent", font: "Playfair Display", weight: 500, accentWeight: 400, size: 64, color: DECLIC_EP.text, accentColor: DECLIC_EP.accent, lineHeight: 1.15 }
  ]}),
  line(120, 3, DECLIC_LINE),
  t({ data: "texte", font: "Poppins", weight: 400, size: 24, color: DECLIC_EP.textDim, lineHeight: 1.6 })
]);
layouts["tera-declic-eventplanning-s5"] = declicEP("declic-eventplanning-s5-source.png", 32, 5, [
  grp({ direction: "column", gap: 8, children: [
    t({ data: "tag_formule", font: "Poppins", weight: 700, size: 20, color: DECLIC_EP.accent, uppercase: true, nowrap: true }),
    { type: "titleTwoTone", dataNormal: "titre_normal", dataAccent: "titre_accent", font: "Playfair Display", weight: 500, accentWeight: 400, size: 64, color: DECLIC_EP.text, accentColor: DECLIC_EP.accent, lineHeight: 1.15 }
  ]}),
  t({ data: "texte", font: "Poppins", weight: 400, size: 24, color: DECLIC_EP.textDim, lineHeight: 1.6 }),
  grp({ direction: "column", gap: 8, children: [
    t({ data: "cta_label", font: "Poppins", weight: 700, size: 22, color: DECLIC_EP.accent, uppercase: true }),
    t({ static: "+225 05 66 22 10 10\nReservations@tera.events", font: "Poppins", weight: 400, size: 18, color: "rgba(255,255,255,0.6)" })
  ]})
]);

// =========================================================================
// LE DÉCLIC — Traiteur (post unique, prix affiché directement sur la photo)
// =========================================================================
layouts["tera-declic-traiteur"] = {
  width: 1226, height: 1350,
  background: "declic-traiteur-source.png",
  photoGradient: { direction: "180deg", stops: ["rgba(7,19,31,0.95) 0%", "rgba(7,19,31,0.4) 48%", "rgba(7,19,31,0.67) 100%"] },
  root: grp({
    x: 0, y: 0, w: 1226, h: 1350, padding: "80px", direction: "column", justify: "between",
    children: [
      row({ justify: "between", align: "center", children: [
        { type: "image", file: "logo-tera-declic.png", w: 138, h: 148, fit: "cover" },
        t({ static: "LE DÉCLIC  ·  TRAITEUR", font: "Poppins", weight: 700, size: 22, color: "#ffffff", uppercase: true, nowrap: true })
      ]}),
      grp({ w: 683, direction: "column", gap: 24, children: [
        row({ justify: "center", w: 427, h: 85, children: [t({ data: "accroche", font: "Caveat", weight: 400, size: 50, color: DECLIC_TRAITEUR_C.accent, rotate: 3, nowrap: true })] }),
        t({ data: "titre", font: "Playfair Display", weight: 700, italic: true, size: 80, color: DECLIC_TRAITEUR_C.text, lineHeight: 0.98 }),
        t({ data: "texte", font: "Poppins", weight: 500, size: 35, color: DECLIC_TRAITEUR_C.textDim, lineHeight: 1.35 }),
        row({ gap: 16, align: "end", children: [
          t({ data: "prix", w: 514, font: "DM Serif Display", weight: 400, size: 178, color: "#ffffff", nowrap: true, lineHeight: 0.82, shadow: "0px 16px 20px rgba(0,0,0,0.32)" }),
          grp({ h: 162, direction: "column", gap: 4, style: "padding-bottom:14px;", children: [
            t({ static: "FCFA", font: "Poppins", weight: 800, size: 58, color: DECLIC_TRAITEUR_C.accent, nowrap: true }),
            t({ static: "PAR PERSONNE", font: "Poppins", weight: 700, size: 20, color: DECLIC_TRAITEUR_C.textDim, nowrap: true })
          ]})
        ]})
      ]}),
      row({ justify: "between", align: "center", children: [
        pill({ bg: DECLIC_TRAITEUR_C.accent, padding: "18px 30px", alignSelf: "auto", children: [
          row({ gap: 16, align: "center", children: [
            t({ static: "DEMANDER UN DEVIS", font: "Inter", weight: 800, size: 22, color: "#ffffff", uppercase: true, nowrap: true }),
            { type: "image", file: "arrow-right-declic-traiteur.svg", w: 24, h: 24 }
          ]})
        ] }),
        grp({ align: "end", direction: "column", gap: 6, children: [
          t({ static: "+225 05 66 22 10 10", font: "Poppins", weight: 800, size: 22, color: "#ffffff", nowrap: true }),
          t({ static: "Reservations@tera.events", font: "Inter", weight: 600, size: 18, color: DECLIC_TRAITEUR_C.textDim, nowrap: true })
        ]})
      ]})
    ]
  })
};

// =========================================================================
// SAVOIR-FAIRE MERCREDI — carrousel générique "Le conseil du mercredi" (4 slides), traverse
// Traiteur / Décoration / Event Planning.
// =========================================================================
function savoirRoot(bg, radial, decorations, headerRight, children, headerGap) {
  return {
    width: 1080, height: 1080,
    background: bg,
    bgColor: SAVOIR.bg,
    radialGradient: radial,
    photoGradient: bg ? { direction: "to bottom", stops: ["rgba(7,26,63,0.1) 0%", "rgba(7,26,63,0.2) 50%", "rgba(7,26,63,0.94) 100%"] } : undefined,
    decorations,
    root: grp({
      x: 0, y: 0, w: 1080, h: 1080, padding: "54px 72px 68px", direction: "column",
      justify: headerGap ? "start" : "between", gap: headerGap || 0,
      children: [
        row({ h: 148, justify: "between", align: "center", children: [
          img(LOGO_FILE, 138, 148),
          headerRight
        ]}),
        grp({ direction: "column", gap: 24, children })
      ]
    })
  };
}

const SAVOIR_ACTION = (label) => row({ gap: 8, align: "center", style: "width:auto;", children: [
  t({ static: label, font: "DM Sans", weight: 700, size: 20, color: "#ffffff", nowrap: true }),
  { type: "image", file: "arrow-right-savoir.svg", w: 24, h: 24 }
]});
const SAVOIR_FOOTER = row({ justify: "between", align: "center", children: [
  t({ static: "Traiteur · Décoration · Event Planning", font: "DM Sans", weight: 700, size: 20, color: SAVOIR.accentLight, uppercase: true, nowrap: true, w: 600 }),
  SAVOIR_ACTION("SUIVANT")
]});
const SAVOIR_FOOTER_LAST = row({ justify: "between", align: "center", children: [
  t({ static: "Traiteur · Décoration · Event Planning", font: "DM Sans", weight: 700, size: 20, color: SAVOIR.accentLight, uppercase: true, nowrap: true, w: 600 }),
  SAVOIR_ACTION("DERNIER CONSEIL")
]});
// Pied de slide spécifique à la série Traiteur (GAMME) : hauteur fixe 169px, texte centré
// verticalement dedans — valeur exacte du fichier Figma pour cette série uniquement.
const GAMME_ACTION = (label) => row({ gap: 8, align: "center", style: "width:auto;", children: [
  t({ static: label, font: "DM Sans", weight: 700, size: 20, color: "#ffffff", nowrap: true }),
  { type: "image", file: "arrow-right-savoir.svg", w: 24, h: 24 }
]});
const GAMME_FOOTER = row({ justify: "between", align: "center", h: 169, children: [
  t({ static: "Traiteur · Décoration · Event Planning", font: "DM Sans", weight: 700, size: 20, color: SAVOIR.accentLight, uppercase: true, nowrap: true, w: 600 }),
  GAMME_ACTION("SUIVANT")
]});
const GAMME_FOOTER_179 = row({ justify: "between", align: "center", h: 179, children: [
  t({ static: "Traiteur · Décoration · Event Planning", font: "DM Sans", weight: 700, size: 20, color: SAVOIR.accentLight, uppercase: true, nowrap: true, w: 600 }),
  GAMME_ACTION("SUIVANT")
]});
const GAMME_FOOTER_LAST = row({ justify: "between", align: "center", h: 169, children: [
  t({ static: "Traiteur · Décoration · Event Planning", font: "DM Sans", weight: 700, size: 20, color: SAVOIR.accentLight, uppercase: true, nowrap: true, w: 600 }),
  GAMME_ACTION("DERNIER CONSEIL")
]});

layouts["tera-savoirfairemercredi-s1"] = {
  width: 1080, height: 1080,
  background: "savoirfaire-mercredi-s1.png",
  bgColor: SAVOIR.bg,
  photoGradient: { direction: "to bottom", stops: ["rgba(7,26,63,0.1) 0%", "rgba(7,26,63,0.2) 50%", "rgba(7,26,63,0.94) 100%"] },
  root: grp({ children: [
    row({ x: 72, y: 54, w: 936, h: 148, justify: "between", align: "center", children: [
      { type: "image", file: LOGO_FILE, w: 138, h: 148, fit: "cover" },
      t({ static: "Le conseil du mercredi", font: "DM Sans", weight: 700, size: 20, color: "#ffffff", uppercase: true, nowrap: true })
    ]}),
    grp({ x: 72, y: 414, w: 936, direction: "column", gap: 24, children: [
      row({ gap: 16, align: "center", h: 68, children: [
        grp({ w: 121, h: 68, direction: "row", justify: "center", align: "center", children: [
          grp({ direction: "column", style: "width:auto; background:#d59a99; padding:8px 18px; transform:rotate(3deg); overflow:hidden;", children: [
            t({ static: "C’est", font: "DM Sans", weight: 700, size: 35, color: SAVOIR.bg, nowrap: true })
          ]})
        ]}),
        t({ static: "mercredi", font: "Playfair Display", weight: 400, italic: true, size: 35, color: "#ffffff", nowrap: true })
      ]}),
      grp({ h: 328, direction: "row", align: "center", children: [
        t({ data: "titre", font: "DM Sans", weight: 800, size: 112, color: SAVOIR.text, lineHeight: 0.88, rotate: -1.89, shadow: "0px 5px 18px rgba(0,0,0,0.4)", w: 936 })
      ]}),
      row({ gap: 24, align: "center", children: [
        { type: "line", w: 8, h: 88, color: SAVOIR.accent, opacity: 1, rounded: true },
        t({ data: "texte", font: "DM Sans", weight: 400, size: 26, color: SAVOIR.textDim, lineHeight: 1.35 })
      ]}),
      SAVOIR_FOOTER
    ]})
  ]})
};

layouts["tera-savoirfairemercredi-s2"] = savoirRoot("savoirfaire-mercredi-s2.png", null, [], row({ direction: "column", gap: 8, align: "end", children: [
  t({ static: "Le conseil du mercredi", font: "DM Sans", weight: 700, size: 20, color: "#ffffff", uppercase: true, nowrap: true }),
  t({ static: "02 / 4", font: "Playfair Display", weight: 400, italic: true, size: 20, color: SAVOIR.accentLight, nowrap: true })
]}), [
  t({ data: "repere", font: "Playfair Display", weight: 400, italic: true, size: 26, color: SAVOIR.accentLight, nowrap: true }),
  t({ data: "titre", font: "DM Sans", weight: 800, size: 74, color: SAVOIR.text, lineHeight: 0.95, shadow: "0px 5px 18px rgba(0,0,0,0.4)" }),
  row({ gap: 24, align: "center", children: [
    { type: "line", w: 8, h: 112, color: SAVOIR.accent, opacity: 1, rounded: true },
    t({ data: "texte", font: "DM Sans", weight: 400, size: 26, color: SAVOIR.textDim, lineHeight: 1.35 })
  ]}),
  SAVOIR_FOOTER
]);
layouts["tera-savoirfairemercredi-s2"].photoGradient = {
  direction: "to bottom",
  stops: ["rgba(7,26,63,0.2) 0%", "rgba(7,26,63,0.53) 46%", "rgba(6,20,52,0.98) 100%"]
};

layouts["tera-savoirfairemercredi-s3"] = savoirRoot(null, {
  cx: 810, cy: 194.4, rx: 270, ry: 475, stops: ["rgba(23,54,122,1) 0%", "rgba(15,37,87,1) 50%", "rgba(6,20,52,1) 100%"]
}, [{ type: "circle", x: 780, y: 230, w: 370, color: SAVOIR.accent, opacity: 0.1 }], row({ direction: "column", gap: 8, align: "end", children: [
  t({ static: "Le conseil du mercredi", font: "DM Sans", weight: 700, size: 20, color: "#ffffff", uppercase: true, nowrap: true }),
  t({ static: "03 / 4", font: "Playfair Display", weight: 400, italic: true, size: 20, color: SAVOIR.accentLight, nowrap: true })
]}), [
  grp({
    direction: "column", h: 648, justify: "between",
    children: [
      grp({
        direction: "column", gap: 40,
        children: [
          grp({ direction: "column", gap: 16, children: [
            t({ data: "repere", font: "Playfair Display", weight: 400, italic: true, size: 36, color: SAVOIR.accentLight, nowrap: true }),
            t({ data: "titre", font: "DM Sans", weight: 800, size: 74, color: SAVOIR.text, lineHeight: 0.95 })
          ]}),
          grp({
            direction: "column", gap: 16,
            children: [
              grp({ direction: "column", children: [
                line(936, 1, "rgba(213,154,153,0.5)"),
                row({ gap: 24, align: "center", padding: "18px 0", children: [
                  t({ data: "moment1_horaire", font: "Playfair Display", weight: 400, italic: true, size: 30, color: SAVOIR.accent, w: 120, nowrap: true }),
                  grp({ direction: "column", gap: 4, children: [
                    t({ data: "moment1_titre", font: "DM Sans", weight: 700, size: 28, color: "#ffffff", nowrap: true }),
                    t({ data: "moment1_texte", font: "DM Sans", weight: 400, size: 20, color: SAVOIR.accentLight })
                  ]})
                ]})
              ]}),
              grp({ direction: "column", children: [
                line(936, 1, "rgba(213,154,153,0.5)"),
                row({ gap: 24, align: "center", padding: "18px 0", children: [
                  t({ data: "moment2_horaire", font: "Playfair Display", weight: 400, italic: true, size: 30, color: SAVOIR.accent, w: 120, nowrap: true }),
                  grp({ direction: "column", gap: 4, children: [
                    t({ data: "moment2_titre", font: "DM Sans", weight: 700, size: 28, color: "#ffffff", nowrap: true }),
                    t({ data: "moment2_texte", font: "DM Sans", weight: 400, size: 20, color: SAVOIR.accentLight })
                  ]})
                ]})
              ]}),
              grp({ direction: "column", children: [
                line(936, 1, "rgba(213,154,153,0.5)"),
                row({ gap: 24, align: "center", padding: "18px 0", children: [
                  t({ data: "moment3_horaire", font: "Playfair Display", weight: 400, italic: true, size: 30, color: SAVOIR.accent, w: 120, nowrap: true }),
                  grp({ direction: "column", gap: 4, children: [
                    t({ data: "moment3_titre", font: "DM Sans", weight: 700, size: 28, color: "#ffffff", nowrap: true }),
                    t({ data: "moment3_texte", font: "DM Sans", weight: 400, size: 20, color: SAVOIR.accentLight })
                  ]})
                ]})
              ]})
            ]
          })
        ]
      }),
      SAVOIR_FOOTER_LAST
    ]
  })
], 162);

layouts["tera-savoirfairemercredi-s4"] = savoirRoot("savoirfaire-mercredi-s4.png", null, [], row({ direction: "column", gap: 8, align: "end", children: [
  t({ static: "Le conseil du mercredi", font: "DM Sans", weight: 700, size: 20, color: "#ffffff", uppercase: true, nowrap: true }),
  t({ static: "04 / 4", font: "Playfair Display", weight: 400, italic: true, size: 20, color: SAVOIR.accentLight, nowrap: true })
]}), [
  t({ data: "repere", font: "Playfair Display", weight: 400, italic: true, size: 26, color: SAVOIR.accentLight, nowrap: true }),
  t({ data: "titre", font: "DM Sans", weight: 800, size: 74, color: SAVOIR.text, lineHeight: 0.95, shadow: "0px 5px 18px rgba(0,0,0,0.4)" }),
  t({ data: "texte", font: "DM Sans", weight: 400, size: 26, color: SAVOIR.textDim, lineHeight: 1.38 }),
  pill({ bg: SAVOIR.accent, padding: "20px 30px", alignSelf: "stretch", children: [
    row({ justify: "between", align: "center", w: 936, children: [
      t({ data: "cta_question", font: "DM Sans", weight: 700, size: 20, color: SAVOIR.bg, nowrap: true }),
      t({ static: "ÉCRIVEZ-NOUS →", font: "DM Sans", weight: 800, size: 20, color: SAVOIR.bg, nowrap: true })
    ]})
  ]})
]);
layouts["tera-savoirfairemercredi-s4"].photoGradient = {
  direction: "to bottom",
  stops: ["rgba(7,26,63,0.33) 0%", "rgba(7,26,63,0.6) 42%", "rgba(6,20,52,0.99) 100%"]
};

// =========================================================================
// SAVOIR-FAIRE MERCREDI — Traiteur (carrousel "GAMME", 4 slides : découverte/prestige/gala +
// conclusion). Utilise les slides 2 à 5 de Figma (la slide 1 n'est pas encore dessinée),
// renumérotées 1 à 4 comme pour Le Déclic Event Planning.
// =========================================================================
function savoirTraiteur(bg, gap, indicator, children) {
  return {
    width: 1080, height: 1080,
    background: bg,
    photoGradient: { direction: "to bottom", stops: ["rgba(0,0,0,0.6) 0%", "rgba(0,0,0,0.3) 50%", "rgba(0,0,0,0.8) 100%"] },
    root: grp({
      children: [
        grp({ x: 72, y: 54, w: 936, direction: "row", justify: "between", align: "center", children: [
          img(LOGO_FILE, 138, 148),
          t({ static: `Le conseil du mercredi — ${indicator}`, font: "DM Sans", weight: 700, size: 20, color: "#ffffff", uppercase: true, nowrap: true })
        ]}),
        grp({ x: 90, y: 199, w: 900, direction: "column", align: "center", gap, children })
      ]
    })
  };
}

// Bloc titre + badge à hauteur fixe (400px, comme dans Figma) : le gap principal de la slide
// (120/114/120px selon la variante) s'applique UNE SEULE FOIS, entre ce bloc entier et la suite
// — pas entre chaque élément individuel comme dans la version précédente.
const GAMME_HEADER = (dataLine1, dataLine2, dataBadge) => grp({ direction: "column", align: "center", h: 400, children: [
  grp({ direction: "column", align: "center", gap: 4, h: 190, children: [
    t({ data: dataLine1, font: "Playfair Display", weight: 400, size: 80, color: "#ffffff", align: "center", lineHeight: 0.85, nowrap: true }),
    t({ data: dataLine2, font: "Playfair Display", weight: 700, italic: true, size: 96, color: "#ffffff", align: "center", lineHeight: 0.85, nowrap: true })
  ]}),
  row({ justify: "center", marginTop: -3, children: [
    pill({ bg: "#ffffff", rotate: -3, padding: "12px 36px", h: 66, shadow: "0px 8px 8px rgba(0,0,0,0.15)", children: [t({ data: dataBadge, font: "Poppins", weight: 700, size: 28, color: SAVOIR_TRAITEUR_C.badge, align: "center", nowrap: true })] })
  ]})
]});

// Slide 1 : couverture "SAVOIR FAIRE" — pas de pied de carrousel, structure propre (En-tête
// absolu, contenu centré en 3 blocs avec un gap de 79px comme dans Figma).
layouts["tera-savoirfairetraiteur-s1"] = {
  width: 1080, height: 1080,
  background: "savoirfairetraiteur-cover.png",
  photoGradient: { direction: "to bottom", stops: ["rgba(0,0,0,0.6) 0%", "rgba(0,0,0,0.1) 50%", "rgba(0,0,0,0.7) 100%"] },
  root: grp({
    children: [
      grp({ x: 72, y: 54, w: 936, direction: "row", justify: "between", align: "center", children: [
        img(LOGO_FILE, 138, 148),
        t({ static: "Le conseil du mercredi", font: "DM Sans", weight: 700, size: 20, color: "#ffffff", uppercase: true, nowrap: true })
      ]}),
      grp({ x: 90, y: 199, w: 900, direction: "column", align: "center", gap: 79, children: [
        grp({ direction: "column", align: "center", h: 500, children: [
          grp({ direction: "column", align: "center", gap: 0, children: [
            t({ static: "SAVOIR", font: "Playfair Display", weight: 400, size: 100, color: "#ffffff", align: "center", lineHeight: 0.85, nowrap: true }),
            t({ static: "FAIRE", font: "Playfair Display", weight: 700, italic: true, size: 120, color: "#ffffff", align: "center", lineHeight: 0.85, nowrap: true, marginTop: -10 })
          ]}),
          row({ justify: "center", marginTop: 41, children: [
            pill({ bg: "#ffffff", rotate: -3, padding: "0 36px 16px", w: 703, h: 96, shadow: "0px 8px 8px rgba(0,0,0,0.15)", children: [t({ data: "badge1", font: "Poppins", weight: 700, size: 35, color: SAVOIR_TRAITEUR_C.badge, align: "center", nowrap: true })] })
          ]})
        ]}),
        grp({ direction: "column", align: "center", gap: 40, children: [
          pill({ bg: "#ffffff", padding: "22px 0", h: 104, shadow: "0px 12px 12px rgba(0,0,0,0.2)", alignSelf: "stretch", children: [row({ justify: "center", w: 900, children: [t({ data: "badge2", font: "Poppins", weight: 600, size: 40, color: SAVOIR_TRAITEUR_C.cta, align: "center", nowrap: true })] })] }),
          t({ data: "texte", font: "Poppins", weight: 500, size: 25, color: "#ffffff", align: "center", lineHeight: 1.5 })
        ]})
      ]})
    ]
  })
};

layouts["tera-savoirfairetraiteur-s2"] = savoirTraiteur("savoirfairetraiteur-s1.png", 120, "2/5", [
  GAMME_HEADER("gamme_ligne1", "gamme_ligne2", "badge"),
  t({ data: "texte", font: "Poppins", weight: 500, size: 24, color: "#ffffff", align: "center", lineHeight: 1.5 }),
  GAMME_FOOTER
]);
layouts["tera-savoirfairetraiteur-s3"] = savoirTraiteur("savoirfairetraiteur-s2.png", 114, "3/5", [
  GAMME_HEADER("gamme_ligne1", "gamme_ligne2", "badge"),
  t({ data: "texte", font: "Poppins", weight: 500, size: 24, color: "#ffffff", align: "center", lineHeight: 1.5 }),
  GAMME_FOOTER_179
]);
layouts["tera-savoirfairetraiteur-s4"] = savoirTraiteur("savoirfairetraiteur-s3.png", 120, "4/5", [
  GAMME_HEADER("gamme_ligne1", "gamme_ligne2", "badge"),
  t({ data: "texte", font: "Poppins", weight: 500, size: 24, color: "#ffffff", align: "center", lineHeight: 1.5 }),
  GAMME_FOOTER
]);
layouts["tera-savoirfairetraiteur-s5"] = savoirTraiteur("savoirfairetraiteur-s4.png", 79, "5/5", [
  GAMME_HEADER("gamme_ligne1", "gamme_ligne2", "badge"),
  grp({ direction: "column", align: "center", gap: 32, children: [
    pill({ bg: "#ffffff", padding: "22px 0", h: 98, shadow: "0px 12px 12px rgba(0,0,0,0.2)", alignSelf: "stretch", children: [t({ static: "DEMANDEZ VOTRE DEVIS", w: 900, font: "Poppins", weight: 700, size: 36, color: SAVOIR_TRAITEUR_C.cta, align: "center", nowrap: true })] }),
    t({ data: "texte", font: "Poppins", weight: 500, size: 24, color: "#ffffff", align: "center", lineHeight: 1.5 })
  ]})
]);

// =========================================================================
// LE CHIFFRE DU MERCREDI — carrousel fixe de 5 slides (accroche chiffrée -> révélation ->
// hiérarchie de 3 principes -> mise en pratique -> conclusion). Fond en dégradé radial only,
// aucune photo, reconstruit exactement (gradient, filets, halo, ombres) depuis chaque frame.
// =========================================================================
function chiffreRoot(radial, decorations, gap, children) {
  return {
    width: 1121, height: 1350,
    bgColor: CHIFFRE_C.bg,
    radialGradient: radial,
    decorations,
    root: grp({ x: 76, y: 56, w: 969, direction: "column", gap, children })
  };
}
const FILET = line(969, 2, "#65d7fa", 0.55);
const CHIFFRE_HEADER = grp({ direction: "column", align: "center", gap: 24, children: [
  img(LOGO_FILE, 138, 119),
  grp({ direction: "column", gap: 16, children: [
    FILET,
    t({ data: "edition_label", font: "Poppins", weight: 700, size: 24, color: CHIFFRE_C.accent, uppercase: true, align: "center", nowrap: true }),
    FILET
  ]})
]});
const CHIFFRE_FOOTER_S1 = row({ justify: "between", align: "center", w: 969, children: [
  pill({ border: CHIFFRE_C.textDim, type: "outlinePill", padding: "11px 24px", children: [t({ static: "www.tera.events", font: "Poppins", weight: 400, size: 25, color: "#ffffff", nowrap: true })] }),
  t({ static: "Glissez pour continuer →", font: "Poppins", weight: 400, size: 22, color: CHIFFRE_C.textDim, uppercase: true, nowrap: true })
]});
function chiffreFooter(indicator, lastLabel) {
  return row({ justify: "between", align: "center", w: 969, children: [
    { type: "outlinePill", border: CHIFFRE_C.textDim, padding: "11px 24px", children: [t({ static: "www.tera.events", font: "Poppins", weight: 400, size: 25, color: "#ffffff", nowrap: true })] },
    grp({ direction: "column", align: "end", gap: 4, children: [
      t({ static: lastLabel || "Glissez pour continuer", font: "Poppins", weight: 400, size: 22, color: CHIFFRE_C.textDim, uppercase: true, nowrap: true }),
      t({ static: indicator, font: "Playfair Display", weight: 400, italic: true, size: 22, color: CHIFFRE_C.cyan, nowrap: true })
    ]})
  ]});
}

layouts["tera-chiffremercredi-s1"] = {
  width: 1121, height: 1350,
  bgColor: "#10286f",
  radialGradient: { cx: 840.75, cy: 378, rx: 280.25, ry: 499.5, stops: ["rgba(26,59,139,1) 0%", "rgba(18,44,114,1) 50%", "rgba(9,28,88,1) 100%"] },
  root: grp({ x: 0, y: 0, w: 1121, h: 1350, children: [
    grp({ x: 76, y: 56, w: 969, h: 1240, direction: "column", gap: 16, children: [
      row({ h: 123, justify: "center", align: "center", children: [
        { type: "image", file: LOGO_FILE, w: 138, h: 119, fit: "cover" }
      ]}),
      row({ h: 29, gap: 16, justify: "center", align: "center", children: [
        { type: "image", file: "chiffre-rule.svg", w: 319, h: 2 },
        t({ data: "edition_label", font: "Inter", weight: 700, size: 24, color: "#65d7fa", uppercase: true, nowrap: true }),
        { type: "image", file: "chiffre-rule.svg", w: 319, h: 2 }
      ]}),
      grp({ h: 657, direction: "column", align: "center", justify: "center", children: [
        t({ data: "chiffre", font: "Poppins", weight: 800, size: 400, color: CHIFFRE_C.accent, align: "center", nowrap: true, lineHeight: 0.8, shadow: "0px 12px 30px rgba(0,0,0,0.16)" }),
        row({ w: 343, h: 113, justify: "center", align: "center", marginTop: -34, children: [
          pill({ bg: "#ffffff", rotate: 3, padding: "10px 34px", children: [
            t({ data: "unite", font: "Poppins", weight: 800, size: 50, color: "#10286f", uppercase: true, nowrap: true })
          ]})
        ]})
      ]}),
      grp({ direction: "column", align: "center", gap: 16, children: [
        t({ data: "headline", w: 780, font: "Poppins", weight: 700, size: 50, color: "#ffffff", align: "center", lineHeight: 1.08 }),
        t({ data: "insight", font: "Poppins", weight: 400, size: 25, color: CHIFFRE_C.textDim, align: "center", lineHeight: 1.45 })
      ]}),
      row({ h: 186, justify: "between", align: "end", children: [
        { type: "outlinePill", border: CHIFFRE_C.textDim, padding: "11px 24px", w: 266, alignSelf: "auto", children: [
          t({ static: "www.tera.events", w: 218, font: "Poppins", weight: 400, size: 25, color: "#ffffff", align: "center", nowrap: true })
        ]},
        { type: "image", file: "chiffre-arrow-right.svg", w: 42, h: 42 }
      ]})
    ]}),
    { type: "image", file: "chiffre-halftone.svg", x: -105, y: 1014, w: 280, h: 280 },
    { type: "image", file: "chiffre-audio-lines.svg", x: 870, y: 298, w: 157, h: 143 }
  ]})
};

layouts["tera-chiffremercredi-s2"] = {
  width: 1121, height: 1350,
  bgColor: CHIFFRE_C.bg,
  radialGradient: { cx: 874.38, cy: 337.5, rx: 247, ry: 567, stops: ["rgba(23,54,122,1) 0%", "rgba(14,36,89,1) 50%", "rgba(4,18,56,1) 100%"] },
  root: grp({ x: 0, y: 0, w: 1121, h: 1350, children: [
    { type: "image", file: "logo-tera-chiffre.png", x: 491.5, y: 56, w: 138, h: 119, fit: "cover" },
    t({ data: "edition_label", x: 76, y: 220, w: 969, font: "Poppins", weight: 700, size: 24, color: CHIFFRE_C.accent, uppercase: true, nowrap: true }),
    { type: "line", x: 76, y: 265, w: 969, h: 2, color: "#65d7fa", opacity: 0.85 },
    grp({ x: 76, y: 383, w: 969, align: "center", children: [
      t({ data: "surtitre", font: "Playfair Display", weight: 400, italic: true, size: 35, color: CHIFFRE_C.cyan, align: "center", nowrap: true })
    ]}),
    grp({ x: 76, y: 474, w: 969, align: "center", children: [
      t({ data: "statistique", font: "Poppins", weight: 800, size: 156, color: CHIFFRE_C.accent, align: "center", nowrap: true, lineHeight: 1.2, shadow: "0px 12px 30px rgba(0,0,0,0.16)" })
    ]}),
    row({ x: 329, y: 717, w: 463.197, h: 87.045, justify: "center", align: "center", children: [
      pill({ bg: "#ffffff", rotate: 2, w: 463.197, h: 87.045, padding: "10px 28px", children: [
        t({ data: "cartouche", font: "Poppins", weight: 800, size: 34, color: CHIFFRE_C.bg, uppercase: true, nowrap: true })
      ]})
    ]}),
    grp({ x: 150.5, y: 822, w: 820, align: "center", children: [
      t({ data: "titre", w: 820, font: "Poppins", weight: 700, size: 58, color: "#ffffff", align: "center", lineHeight: 1.08 })
    ]}),
    grp({ x: 135.5, y: 971, w: 850, align: "center", children: [
      t({ data: "texte", w: 850, font: "Poppins", weight: 400, size: 25, color: CHIFFRE_C.textDim, align: "center", lineHeight: 1.45 })
    ]}),
    { type: "image", file: "chiffre-halo.svg", x: -120, y: 1000, w: 320, h: 320 },
    { type: "outlinePill", x: 76, y: 1187, border: CHIFFRE_C.textDim, padding: "11px 24px", h: 52, children: [
      t({ static: "www.tera.events", font: "Poppins", weight: 400, size: 25, color: "#ffffff", nowrap: true })
    ]},
    grp({ x: 734, y: 1185, w: 311, direction: "column", align: "end", gap: 8, children: [
      t({ static: "Glissez pour continuer", font: "Poppins", weight: 400, size: 25, color: CHIFFRE_C.textDim, uppercase: true, nowrap: true }),
      t({ static: "02 / 05  →", font: "Playfair Display", weight: 400, italic: true, size: 25, color: CHIFFRE_C.cyan, nowrap: true })
    ]})
  ]})
};

layouts["tera-chiffremercredi-s3"] = {
  width: 1121, height: 1350,
  bgColor: CHIFFRE_C.bg,
  radialGradient: { cx: 874.38, cy: 337.5, rx: 247, ry: 567, stops: ["rgba(23,54,122,1) 0%", "rgba(14,36,89,1) 50%", "rgba(4,18,56,1) 100%"] },
  root: grp({ x: 0, y: 0, w: 1121, h: 1350, children: [
    { type: "image", file: "logo-tera-chiffre.png", x: 491.5, y: 56, w: 138, h: 119, fit: "cover" },
    t({ data: "edition_label", x: 76, y: 220, w: 969, font: "Poppins", weight: 700, size: 24, color: CHIFFRE_C.accent, uppercase: true, nowrap: true }),
    { type: "line", x: 76, y: 265, w: 969, h: 2, color: "#65d7fa", opacity: 0.85 },
    grp({ x: 76, y: 394, w: 969, direction: "column", gap: 40, children: [
      t({ data: "surtitre", font: "Playfair Display", weight: 400, italic: true, size: 35, color: CHIFFRE_C.cyan, nowrap: true }),
      t({ data: "titre", w: 969, font: "Poppins", weight: 800, size: 58, color: "#ffffff", lineHeight: 1.02, nowrap: true }),
      grp({ direction: "column", gap: 32, children: [
        row({ h: 150, gap: 16, align: "center", children: [
          { type: "circleBadge", size: 58, bg: CHIFFRE_C.accent, static: "1", font: "Poppins", weight: 800, textSize: 24, textColor: CHIFFRE_C.bg },
          grp({ w: 928, h: 150, direction: "column", justify: "center", gap: 15, children: [
            t({ data: "conseil1_titre", w: 928, font: "Poppins", weight: 700, size: 35, color: "#ffffff", nowrap: true }),
            t({ data: "conseil1_texte", w: 928, font: "Poppins", weight: 400, size: 25, color: CHIFFRE_C.textDim, lineHeight: 1.4, nowrap: true })
          ]})
        ]}),
        row({ h: 150, gap: 16, align: "center", children: [
          { type: "circleBadge", size: 58, bg: CHIFFRE_C.accent, static: "2", font: "Poppins", weight: 800, textSize: 24, textColor: CHIFFRE_C.bg },
          grp({ w: 928, h: 150, direction: "column", justify: "center", gap: 15, children: [
            t({ data: "conseil2_titre", w: 928, font: "Poppins", weight: 700, size: 35, color: "#ffffff", nowrap: true }),
            t({ data: "conseil2_texte", w: 928, font: "Poppins", weight: 400, size: 25, color: CHIFFRE_C.textDim, lineHeight: 1.4, nowrap: true })
          ]})
        ]}),
        row({ h: 150, gap: 16, align: "center", children: [
          { type: "circleBadge", size: 58, bg: CHIFFRE_C.accent, static: "3", font: "Poppins", weight: 800, textSize: 24, textColor: CHIFFRE_C.bg },
          grp({ w: 928, h: 150, direction: "column", justify: "center", gap: 15, children: [
            t({ data: "conseil3_titre", w: 928, font: "Poppins", weight: 700, size: 35, color: "#ffffff", nowrap: true }),
            t({ data: "conseil3_texte", w: 928, font: "Poppins", weight: 400, size: 25, color: CHIFFRE_C.textDim, lineHeight: 1.4, nowrap: true })
          ]})
        ]})
      ]})
    ]}),
    { type: "image", file: "chiffre-halo.svg", x: -120, y: 1000, w: 320, h: 320 },
    { type: "outlinePill", x: 76, y: 1215, border: CHIFFRE_C.textDim, padding: "11px 24px", children: [
      t({ static: "www.tera.events", font: "Poppins", weight: 400, size: 25, color: "#ffffff", nowrap: true })
    ]},
    grp({ x: 694, y: 1215, w: 310, direction: "column", align: "end", gap: 8, children: [
      t({ static: "Glissez pour continuer", w: 311, font: "Poppins", weight: 400, size: 25, color: CHIFFRE_C.textDim, uppercase: true }),
      t({ static: "03 / 05  →", w: 140, font: "Playfair Display", weight: 400, italic: true, size: 25, color: CHIFFRE_C.cyan, align: "right", nowrap: true })
    ]})
  ]})
};

layouts["tera-chiffremercredi-s4"] = chiffreRoot(
  { cx: 874.38, cy: 337.5, rx: 247, ry: 567, stops: ["rgba(23,54,122,1) 0%", "rgba(14,36,89,1) 50%", "rgba(4,18,56,1) 100%"] },
  [{ type: "circle", x: -120, y: 1000, w: 320, color: CHIFFRE_C.accent, opacity: 0.1 }],
  60, [
    CHIFFRE_HEADER,
    grp({ direction: "column", gap: 40, children: [
      t({ data: "surtitre", font: "Playfair Display", weight: 400, italic: true, size: 35, color: CHIFFRE_C.cyan, nowrap: true }),
      t({ data: "titre", font: "Poppins", weight: 800, size: 58, color: "#ffffff", lineHeight: 1.04 }),
      grp({ direction: "column", gap: 16, children: [
        row({ gap: 16, align: "center", style: "background:rgba(255,255,255,0.05); border:1px solid rgba(101,215,250,0.33); border-radius:28px; padding:22px 26px;", children: [
          { type: "circleBadge", size: 42, bg: CHIFFRE_C.accent, static: "✓", font: "Inter", weight: 800, textSize: 22, textColor: CHIFFRE_C.bg },
          t({ data: "detail1", font: "Poppins", weight: 600, size: 30, color: "#ffffff" })
        ]}),
        row({ gap: 16, align: "center", style: "background:rgba(255,255,255,0.05); border:1px solid rgba(101,215,250,0.33); border-radius:28px; padding:22px 26px;", children: [
          { type: "circleBadge", size: 42, bg: CHIFFRE_C.accent, static: "✓", font: "Inter", weight: 800, textSize: 22, textColor: CHIFFRE_C.bg },
          t({ data: "detail2", font: "Poppins", weight: 600, size: 30, color: "#ffffff" })
        ]}),
        row({ gap: 16, align: "center", style: "background:rgba(255,255,255,0.05); border:1px solid rgba(101,215,250,0.33); border-radius:28px; padding:22px 26px;", children: [
          { type: "circleBadge", size: 42, bg: CHIFFRE_C.accent, static: "✓", font: "Inter", weight: 800, textSize: 22, textColor: CHIFFRE_C.bg },
          t({ data: "detail3", font: "Poppins", weight: 600, size: 30, color: "#ffffff" })
        ]})
      ]}),
      t({ data: "conclusion", font: "Playfair Display", weight: 400, italic: true, size: 30, color: CHIFFRE_C.cyan, align: "center" })
    ]}),
    chiffreFooter("04 / 05 →")
  ]
);

layouts["tera-chiffremercredi-s5"] = chiffreRoot(
  { cx: 874.38, cy: 337.5, rx: 247, ry: 567, stops: ["rgba(23,54,122,1) 0%", "rgba(14,36,89,1) 50%", "rgba(4,18,56,1) 100%"] },
  [{ type: "circle", x: -120, y: 1000, w: 320, color: CHIFFRE_C.accent, opacity: 0.1 }],
  40, [
    CHIFFRE_HEADER,
    grp({ direction: "column", align: "center", gap: 40, children: [
      pill({ bg: CHIFFRE_C.accent, padding: "9px 22px", children: [t({ data: "badge", font: "Poppins", weight: 800, size: 30, color: CHIFFRE_C.bg, uppercase: true, nowrap: true })] }),
      t({ data: "titre", font: "Poppins", weight: 800, size: 68, color: "#ffffff", align: "center", lineHeight: 1.02 }),
      line(110, 7, CHIFFRE_C.accent, 1),
      t({ data: "texte", font: "Poppins", weight: 400, size: 25, color: CHIFFRE_C.textDim, align: "center", lineHeight: 1.5 }),
      pill({ bg: "#ffffff", padding: "22px 30px", alignSelf: "stretch", children: [
        row({ justify: "between", align: "center", w: 900, children: [
          t({ data: "cta_question", font: "Poppins", weight: 700, size: 25, color: CHIFFRE_C.bg, nowrap: true }),
          t({ static: "ÉCRIVEZ-NOUS →", font: "Poppins", weight: 800, size: 25, color: CHIFFRE_C.bg, nowrap: true })
        ]})
      ]})
    ]}),
    chiffreFooter("05 / 05 →", "Enregistrez ce post")
  ]
);

// =========================================================================
// L'ANCRAGE DU VENDREDI — pool de 2 gabarits
// =========================================================================
layouts["tera-ancragevendredi-a"] = {
  width: 1080, height: 1080,
  background: "ancrage-vendredi-a-source.png",
  photoGradient: { layers: [
    { direction: "180deg", stops: ["rgba(7,19,51,0.4) 0%", "rgba(11,32,90,0.8) 45%", "rgba(8,26,74,0.961) 80%", "rgb(8,26,74) 100%"] },
    { direction: "90deg", stops: ["rgba(8,26,74,0.25) 0%", "rgba(8,26,74,0.25) 100%"] }
  ] },
  root: grp({
    x: 0, y: 0, w: 1080, h: 1080, style: "position:absolute;", children: [
      row({ x: 96, y: 99, w: 888, h: 26, gap: 24, align: "center", children: [
        line(58, 2, ANCRAGE_C.accent),
        t({ static: "L’ANCRAGE DU VENDREDI", font: "Geist", weight: 600, size: 20, color: ANCRAGE_C.text, uppercase: true, nowrap: true })
      ]}),
      grp({ x: 96, y: 352, w: 888, h: 342, style: "position:absolute;", children: [
        { type: "quoteTwoTone", dataAccent: "citation_accent", dataMain: "citation_main", font: "Playfair Display", size: 65, lineHeight: 1.2, w: 888, color: ANCRAGE_C.text, accentColor: ANCRAGE_C.accent },
        row({ x: 384, y: 340, w: 120, h: 2, children: [line(120, 2, ANCRAGE_C.accent)] })
      ]}),
      row({ x: 475, y: 874, w: 130, h: 143, children: [{ type: "image", file: "logo-tera-ancrage.png", w: 130, h: 143, fit: "cover" }] })
    ]
  })
};
layouts["tera-ancragevendredi-b"] = {
  width: 1080, height: 1080,
  background: "ancrage-vendredi-b-source.png",
  photoGradient: { layers: [
    { direction: "180deg", stops: ["rgba(8,26,74,0.965) 0%", "rgba(8,26,74,0.851) 45%", "rgba(8,26,74,0.4) 80%", "rgba(8,26,74,0.8) 100%"] },
    { direction: "90deg", stops: ["rgba(8,26,74,0.35) 0%", "rgba(8,26,74,0.35) 100%"] }
  ] },
  root: grp({
    x: 0, y: 45, w: 1080, h: 1030, style: "position:absolute;", children: [
      row({ x: 80, y: 72, w: 920, h: 26, gap: 24, align: "center", children: [
        line(58, 2, ANCRAGE_C.accent),
        t({ static: "L’ANCRAGE DU VENDREDI", font: "Geist", weight: 600, size: 20, color: ANCRAGE_C.text, uppercase: true, nowrap: true })
      ]}),
      grp({ x: 80, y: 279.5, w: 920, h: 356, style: "position:absolute;", children: [
        grp({ x: 0, y: 0, w: 920, h: 195, direction: "column", gap: 24, align: "center", style: "position:absolute; flex-shrink:0;", children: [
          t({ data: "headline", font: "Playfair Display", weight: 700, size: 50, color: ANCRAGE_C.text, align: "center", lineHeight: 1.15 }),
          line(80, 2, ANCRAGE_C.accent)
        ]}),
        grp({ x: 0, y: 231, w: 920, h: 80, style: "position:absolute;", children: [
          t({ data: "body", w: 920, font: "Poppins", weight: 400, size: 25, color: "#e2e8f0", align: "center", lineHeight: 1.6 })
        ]}),
        grp({ x: 281, y: 347, w: 358, h: 70, direction: "row", align: "center", justify: "center", style: "position:absolute; background:#d49a8f; border-radius:100px; box-shadow:0 4px 8px rgba(0,0,0,0.25); flex-shrink:0;", children: [
          t({ static: "WWW.TERA.EVENTS", font: "Poppins", weight: 700, size: 25, color: ANCRAGE_C.text, nowrap: true })
        ]})
      ]}),
      row({ x: 451, y: 796, w: 150, h: 190, children: [img("logo-tera-ancrage.png", 150, 190)] })
    ]
  })
};

module.exports = { layouts, LOGO_FILE };
