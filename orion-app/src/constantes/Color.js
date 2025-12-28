// --- BLEU ---
const paletteBleu = [
  { id: 1, nom: "bleu-claire", valeur: "#ebf7ff" },
  { id: 2, nom: "bleu-electrique", valeur: "#1150d1" },
  { id: 3, nom: "bleu-royal", valeur: "#050adb" },
  { id: 4, nom: "bleu-lavande", valeur: "#5d58e6" },
  { id: 5, nom: "bleu-acier", valeur: "#4255a5" },
  { id: 6, nom: "bleu-petrole", valeur: "#2d5a86" },
  { id: 7, nom: "bleu-cobalt", valeur: "#1a299c" },
  { id: 8, nom: "bleu-gris", valeur: "#4a646d" },
  { id: 9, nom: "bleu-sarcelle", valeur: "#36626a" },
  { id: 10, nom: "bleu-ciel", valeur: "#3095e0" },
  { id: 11, nom: "bleu-saphir", valeur: "#2b8fee" },
  { id: 12, nom: "bleu-lagon", valeur: "#60d7e7" },
  { id: 13, nom: "bleu-gris-clair", valeur: "#809bb0" },
  { id: 14, nom: "bleu-lilas", valeur: "#8381fd" },
  { id: 15, nom: "bleu-nuit", valeur: "#5326d2" },
  { id: 16, nom: "bleu-turquoise", valeur: "#3e99e9" },
  { id: 17, nom: "bleu-cyan", valeur: "#3ec3de" },
  { id: 18, nom: "bleu-royal-clair", valeur: "#4279f9" },
  { id: 19, nom: "bleu-acier-fonce", valeur: "#20607b" },
  { id: 20, nom: "bleu-marine-fonce", valeur: "#0f2e51" },
  { id: 21, nom: "bleu-canard", valeur: "#1f8696" },
  { id: 22, nom: "bleu-azur", valeur: "#1556f9" },
  { id: 23, nom: "bleu-glacial", valeur: "#d7f9f6" },
];

// --- GRIS ---
const paletteGris = [
  { id: 1, nom: "gris-claire", valeur: "#f8f9fa" },
  { id: 2, nom: "gris-claire-100", valeur: "#333" },
  { id: 3, nom: "gris-ardoise-fonce", valeur: "#2a2f34" },
  { id: 4, nom: "gris-perle", valeur: "#91a6b1" },
  { id: 5, nom: "gris-argent", valeur: "#a6b8b4" },
];

// --- VERT ---
const paletteVert = [
  { id: 1, nom: "vert-claire", valeur: "#4ffa6b80" },
  { id: 2, nom: "vert-sauge", valeur: "#729780" },
  { id: 3, nom: "vert-menthe", valeur: "#98db83" },
  { id: 4, nom: "vert-vif", valeur: "#4eaf30" },
  { id: 5, nom: "vert-citron", valeur: "#4ed414" },
  { id: 6, nom: "vert-pistache", valeur: "#c1f061" },
  { id: 7, nom: "vert-jade", valeur: "#65dd90" },
  { id: 8, nom: "vert-herbe", valeur: "#69c518" },
  { id: 9, nom: "vert-emeraude", valeur: "#058606" },
  { id: 10, nom: "vert-pomme", valeur: "#2aba10" },
  { id: 11, nom: "vert-pomme-clair", valeur: "#7ec952" },
  { id: 12, nom: "vert-lime", valeur: "#8ce732" },
  { id: 13, nom: "vert-chartreuse", valeur: "#9dd54c" },
  { id: 14, nom: "vert-mousse", valeur: "#313f05" },
  { id: 15, nom: "vert-kaki", valeur: "#759d39" },
  { id: 16, nom: "vert-neon", valeur: "#08fea2" },
  { id: 17, nom: "vert-lichen", valeur: "#8eb540" },
  { id: 18, nom: "vert-sapin", valeur: "#168b5d" },
  { id: 19, nom: "vert-olive", valeur: "#7b932b" },
  { id: 20, nom: "vert-olive-clair", valeur: "#9da383" },
  { id: 21, nom: "vert-fluo", valeur: "#5ce347" },
  { id: 22, nom: "vert-pin", valeur: "#3fa35a" },
  { id: 23, nom: "vert-menthe-pastel", valeur: "#9ce59b" },
  { id: 24, nom: "vert-olive-pale", valeur: "#aaa96a" },
  { id: 25, nom: "vert-foret", valeur: "#3d6a3f" },
  { id: 26, nom: "vert-foret-fonce", valeur: "#193d0c" },
  { id: 27, nom: "vert-jade-fonce", valeur: "#08b053" },
];

// --- ROUGE ---
const paletteRouge = [
  { id: 1, nom: "rouge-vif", valeur: "#d0181b" },
  { id: 2, nom: "rouge-rouille", valeur: "#d25e47" },
  { id: 3, nom: "rouge-bordeaux", valeur: "#923a43" },
  { id: 4, nom: "rouge-tomate", valeur: "#f0280f" },
  { id: 5, nom: "rouge-cerise", valeur: "#ff3b5d" },
];

// --- VIOLET ---
const paletteViolet = [
  { id: 1, nom: "violet-sombre", valeur: "#442051" },
  { id: 2, nom: "violet-electrique", valeur: "#971ed1" },
  { id: 3, nom: "violet-ardoise", valeur: "#57486b" },
  { id: 4, nom: "violet-intense", valeur: "#7102fa" },
  { id: 5, nom: "violet-magenta-lumineux", valeur: "#cc31e4" },
  { id: 6, nom: "violet-prune", valeur: "#911594" },
  { id: 7, nom: "violet-aubergine", valeur: "#422674" },
  { id: 8, nom: "violet-fonce", valeur: "#581abe" },
  { id: 9, nom: "violet-pastel", valeur: "#794fcb" },
  { id: 10, nom: "violet-olive-fonce", valeur: "#2d2d1c" },
  { id: 11, nom: "violet-lilas", valeur: "#a17ec3" },
  { id: 12, nom: "violet-intense-2", valeur: "#3a0293" },
  { id: 13, nom: "violet-lavande-clair", valeur: "#c557ff" },
  { id: 14, nom: "violet-prune-clair", valeur: "#745774" },
  { id: 15, nom: "violet-cassis", valeur: "#490e49" },
];

// --- ROSE ---
const paletteRose = [
  { id: 1, nom: "rose", valeur: "#ffe1ee" },
  { id: 2, nom: "rose-framboise", valeur: "#ce3a7b" },
  { id: 3, nom: "rose-fuchsia", valeur: "#de3278" },
  { id: 4, nom: "rose-bonbon", valeur: "#d98cc5" },
  { id: 5, nom: "rose-antique", valeur: "#da668f" },
  { id: 6, nom: "rose-pale", valeur: "#edbacc" },
  { id: 7, nom: "rose-saumon", valeur: "#ff809d" },
  { id: 8, nom: "rose-magenta", valeur: "#bd3b7d" },
  { id: 9, nom: "rose-fuchsia-fonce", valeur: "#c23290" },
  { id: 10, nom: "rose-orchidee", valeur: "#b75d9d" },
  { id: 11, nom: "rose-pastel", valeur: "#f6bae3" },
  { id: 12, nom: "rose-barbe-a-papa", valeur: "#f195e7" },
  { id: 13, nom: "rose-framboise-fonce", valeur: "#ce1655" },
];

// --- ORANGE & JAUNE ---
const paletteOrangeJaune = [
  { id: 1, nom: "orange-safran", valeur: "#e4a842" },
  { id: 2, nom: "orange-corail", valeur: "#ec8d53" },
  { id: 3, nom: "orange-vif", valeur: "#e8870b" },
  { id: 4, nom: "jaune-citron", valeur: "#d6f010" },
  { id: 5, nom: "jaune-canari", valeur: "#edec17" },
  { id: 6, nom: "jaune-olive", valeur: "#b0c50a" },
];

// --- AUTRES (marron, beige, noir, blanc) ---
const paletteAutres = [
  { id: 1, nom: "marron-terre", valeur: "#6a5224" },
  { id: 2, nom: "beige-sable", valeur: "#a58a6f" },
  { id: 3, nom: "brun-sable", valeur: "#746126" },
  { id: 4, nom: "beige-dore", valeur: "#dab765" },
  { id: 5, nom: "noir-charbon", valeur: "#201b1d" },
  { id: 6, nom: "blanc-menthe", valeur: "#dffdf0" },
];

// ✅ Export
export {
  paletteBleu, //
  paletteGris,//
  paletteVert,//
  paletteRouge,//
  paletteViolet,
  paletteRose,
  paletteOrangeJaune,
  paletteAutres,
};
