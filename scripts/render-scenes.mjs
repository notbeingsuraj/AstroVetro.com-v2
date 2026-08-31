// render-scenes.mjs
// ---------------------------------------------------------------------------
// Generates standalone SVG scene files for every AstroVetro asset using the
// brand's bright editorial art direction (ivory surfaces, sunlight, mineral
// specimens, soft architectural grid, tonal accents). Outputs to /tmp/scenes/.
//
// These SVGs are rasterized to PNG via macOS `qlmanage`, then converted to
// JPEG + WebP (sips / cwebp) into the wired public/images/* paths, so the
// site serves real image files instead of runtime SVG fallbacks.
//
// Run:  node scripts/render-scenes.mjs
// ---------------------------------------------------------------------------

import { mkdirSync, writeFileSync } from "node:fs";

const OUT = "/tmp/scenes";
mkdirSync(OUT, { recursive: true });

// ---- Shared palette -------------------------------------------------------
const IVORY = "#fbfaf6";
const PEARL = "#f2efe7";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

// Per-mineral palettes (base, dark edge, sheen highlight, soft tint)
const MINERALS = {
  amethyst: { base: ["#d7cbf0", "#a58ecf", "#8a72be"], edge: "#6f5aa6", tint: "#cec3e7" },
  "rose-quartz": { base: ["#f6d3c4", "#e2a88f", "#cf8d73"], edge: "#b5735b", tint: "#f2b99e" },
  "black-tourmaline": { base: ["#7d8795", "#4c545f", "#2c323b"], edge: "#1e232b", tint: "#9bb0c4" },
  citrine: { base: ["#f9e3ad", "#eec56f", "#d9a94a"], edge: "#b9832f", tint: "#e7c875" },
  "clear-quartz": { base: ["#ffffff", "#e7e2d8", "#cfc9bc"], edge: "#a59d8e", tint: "#efece4" },
  labradorite: { base: ["#9fb2cd", "#6a7fa5", "#4c5f85"], edge: "#39486b", tint: "#a9d7f2" },
  "green-aventurine": { base: ["#cde0c9", "#a9c7a4", "#8cab86"], edge: "#6e8f68", tint: "#b8d2b6" },
  selenite: { base: ["#ffffff", "#e9e5da", "#d2ccbd"], edge: "#a89f8c", tint: "#ede7da" },
  "amethyst-bracelet": { base: ["#d7cbf0", "#a58ecf", "#8a72be"], edge: "#6f5aa6", tint: "#cec3e7" },
  "rose-quartz-necklace": { base: ["#f6d3c4", "#e2a88f", "#cf8d73"], edge: "#b5735b", tint: "#f2b99e" },
};

const SERVICE_SCENES = {
  "tarot-reading": { accent: ["#cec3e7", "#e7c875", "#a9d7f2", "#f2b99e", "#b8d2b6"], theme: "cards" },
  "personal-guidance": { accent: ["#ede7da", "#b8d2b6", "#e7c875"], theme: "journal" },
  "intuitive-reading": { accent: ["#a9d7f2", "#cec3e7", "#ffffff"], theme: "hands" },
  "relationship-reading": { accent: ["#f2b99e", "#cec3e7", "#e7c875"], theme: "pair" },
};

// ---- Helpers --------------------------------------------------------------
function grad(id, stops) {
  // stops: array of [offset, color]
  return `<linearGradient id="${id}" x1="0" y1="0" x2="0.2" y2="1">
    ${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}
  </linearGradient>`;
}

function facet(points, fill, opacity = 1) {
  return `<polygon points="${points}" fill="${fill}" fill-opacity="${opacity}" stroke="rgba(255,255,255,0.6)" stroke-width="1.2"/>`;
}

// Crystal point (base tip up). cx = center x, baseY, tipY, halfW.
function crystalPoint({ cx, tipY, baseY, halfW, pal, id }) {
  const g = `g${id}`;
  // central faces
  const mid = cx;
  const l = cx - halfW;
  const r = cx + halfW;
  return `
    <g>
      ${facet(`${l},${baseY} ${mid},${tipY} ${mid + halfW * 0.35},${baseY}`, `url(#${g})`)}
      ${facet(`${mid},${tipY} ${r},${baseY} ${mid + halfW * 0.35},${baseY}`, `url(#${g})`)}
      <polygon points="${mid},${tipY} ${mid - halfW * 0.35},${baseY} ${mid + halfW * 0.35},${baseY}" fill="${pal.edge}" fill-opacity="0.18"/>
      <polygon points="${l},${baseY} ${mid},${tipY} ${mid - halfW * 0.35},${baseY}" fill="#ffffff" fill-opacity="0.35"/>
    </g>`;
}

// Faceted cluster (three crystals of varied heights).
function crystalCluster({ cx, baseY, pal, id }) {
  const g = `g${id}`;
  const parts = [
    // tall center
    facet(`${cx - 120},${baseY} ${cx},${baseY - 420} ${cx + 130},${baseY}`, `url(#${g})`),
    facet(`${cx + 30},${baseY} ${cx},${baseY - 420} ${cx + 130},${baseY}`, pal.edge === "none" ? pal.base[2] : pal.edge, 0.15),
    // left short
    facet(`${cx - 250},${baseY} ${cx - 120},${baseY - 260} ${cx - 55},${baseY}`, `url(#${g})`),
    facet(`${cx - 160},${baseY} ${cx - 120},${baseY - 260} ${cx - 55},${baseY}`, "#ffffff", 0.3),
    // right short
    facet(`${cx + 70},${baseY} ${cx + 170},${baseY - 300} ${cx + 255},${baseY}`, `url(#${g})`),
  ];
  return `<g>${parts.join("")}</g>`;
}

// Rounded cabochon / bead (for jewellery).
function cabochon({ cx, cy, r, pal, id }) {
  const g = `g${id}`;
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${g})"/>
    <path d="M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}" fill="#ffffff" fill-opacity="0.35"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${pal.edge}" stroke-opacity="0.4"/>
  `;
}

// Splayed card (tarot/service).
function card({ x, y, w, h, rot, fill, accent }) {
  return `
    <g transform="rotate(${rot} ${x} ${y})">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${fill}" stroke="rgba(24,24,23,0.08)" stroke-width="1.5" filter="drop-shadow(0 12px 16px rgba(24,24,23,0.10))"/>
      <rect x="${x + 16}" y="${y + 18}" width="${w - 32}" height="${h - 36}" rx="8" fill="none" stroke="${accent}" stroke-opacity="0.5" stroke-width="1.2"/>
      <circle cx="${x + w / 2}" cy="${y + h / 2}" r="24" fill="${accent}" fill-opacity="0.25"/>
    </g>`;
}

function baseScene(id, { w = 1200, h = 1200 } = {}) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    ${grad(`bg${id}`, [[0, IVORY], [1, PEARL]])}
    ${grad(`g${id}`, [[0, "#ffffff"], [0.5, "#e9e4d8"], [1, "#cfc8b8"]])}
    <radialGradient id="sun${id}" cx="0.75" cy="0.18" r="0.7">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="#fffdf4" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#fffdf4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg${id})"/>
  <rect width="${w}" height="${h}" fill="url(#sun${id})"/>
`;
}

function gridLines(id, w = 1200, h = 1200) {
  let s = `<g stroke="rgba(24,24,23,0.05)" stroke-width="1" fill="none">`;
  for (let x = 0; x <= 4; x++) s += `<line x1="${(w / 4) * x}" y1="0" x2="${(w / 4) * x}" y2="${h}"/>`;
  for (let y = 0; y <= 3; y++) s += `<line x1="0" y1="${(h / 3) * y}" x2="${w}" y2="${(h / 3) * y}"/>`;
  s += `</g>`;
  return s;
}

function groundShadow(cx, baseY, rx, pal) {
  return `<ellipse cx="${cx}" cy="${baseY + 8}" rx="${rx}" ry="26" fill="${pal.edge}" fill-opacity="0.10"/>`;
}

// ---- Product scene --------------------------------------------------------
function productScene(slug, pal, variant) {
  const id = uid();
  const cx = 600;
  const baseY = 860;
  let mineral = "";
  let shadow = groundShadow(cx, baseY, 230, pal);
  const g = `g${id}`;

  if (variant === "cluster") {
    mineral = crystalCluster({ cx, baseY, pal, id });
  } else if (variant === "column") {
    mineral = `
      ${facet("520,860 545,300 620,300 645,860", `url(#${g})`)}
      ${facet("620,300 645,860 700,860 675,300", pal.edge, 0.22)}
      ${facet("560,250 585,200 640,200 610,250", `url(#${g})`)}
    `;
  } else if (variant === "wand") {
    mineral = `
      <g transform="rotate(-18 600 520)">
        ${facet("590,160 610,880 555,880 575,160", `url(#${g})`)}
        <line x1="575" y1="200" x2="610" y2="200" stroke="#ffffff" stroke-width="2" opacity="0.7"/>
        <line x1="570" y1="320" x2="615" y2="320" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
      </g>
    `;
    shadow = groundShadow(600, 860, 200, pal);
  } else if (variant === "cabochon") {
    mineral = cabochon({ cx: 600, cy: 480, r: 220, pal, id });
  } else if (variant === "bracelet") {
    let beads = "";
    const xs = [360, 460, 560, 660, 760, 860];
    xs.forEach((bx, i) => {
      beads += cabochon({ cx: bx, cy: 600, r: 52 + (i % 3) * 8, pal, id });
    });
    mineral = `<g>${beads}</g>`;
    shadow = groundShadow(600, 692, 300, pal);
  } else if (variant === "necklace") {
    mineral = `
      <g transform="rotate(-14 600 540)">
        <path d="M 380,700 C 520,420 680,420 820,700" fill="none" stroke="#b39c5f" stroke-width="10" stroke-linecap="round"/>
        ${cabochon({ cx: 600, cy: 700, r: 130, pal, id })}
      </g>`;
    shadow = groundShadow(600, 760, 260, pal);
  } else {
    // default crystal point
    mineral = crystalPoint({ cx, tipY: 320, baseY, halfW: 150, pal, id });
  }

  return (
    baseScene(id) +
    gridLines(id) +
    `<g>${mineral}${shadow}</g>` +
    `<g font-family="Manrope, sans-serif" fill="rgba(24,24,23,0.35)" font-size="24" letter-spacing="4">
       <text x="60" y="90">ASTROVETRO / OBJECT</text>
     </g>` +
    `</svg>`
  );
}

// ---- Service scene --------------------------------------------------------
function serviceScene(slug, conf) {
  const id = uid();
  let inner = "";
  const cx = 600;
  if (conf.theme === "cards") {
    const fills = ["#ffffff", "#fbfaf6", "#ffffff", "#fbfaf6", "#ffffff"];
    conf.accent.forEach((a, i) => {
      inner += card({ x: 260 + i * 118, y: 330, w: 170, h: 260, rot: -24 + i * 12, fill: fills[i], accent: a });
    });
    inner += groundShadow(cx, 640, 400, { edge: "#181817" });
  } else if (conf.theme === "journal") {
    inner += `<rect x="330" y="360" width="540" height="360" rx="10" fill="#ffffff" stroke="rgba(24,24,23,0.08)" stroke-width="1.5" filter="drop-shadow(0 14px 20px rgba(24,24,23,0.10))"/>`;
    for (let i = 0; i < 6; i++) {
      inner += `<line x1="380" y1="${440 + i * 42}" x2="${700 + (i % 2) * 40}" y2="${440 + i * 42}" stroke="rgba(24,24,23,0.18)" stroke-width="5" stroke-linecap="round"/>`;
    }
    inner += `<g transform="rotate(-20 820 300)">${facet("820,300 860,530 760,530 800,300", "url(#g" + id + ")")}</g>`;
    inner += groundShadow(820, 540, 120, { edge: "#181817" });
  } else if (conf.theme === "hands") {
    inner += `<rect x="360" y="400" width="200" height="320" rx="24" fill="#f6d3c4" stroke="rgba(24,24,23,0.06)" stroke-width="2"/>`;
    inner += `<ellipse cx="300" cy="560" rx="150" ry="70" fill="#f6d3c4" opacity="0.9"/>`;
    inner += `<ellipse cx="880" cy="540" rx="130" ry="62" fill="#f6d3c4" opacity="0.85"/>`;
    inner += card({ x: 470, y: 460, w: 170, h: 250, rot: 0, fill: "#ffffff", accent: conf.accent[1] });
  } else if (conf.theme === "pair") {
    inner += cabochon({ cx: 440, cy: 520, r: 150, pal: MINERALS["rose-quartz"], id });
    inner += crystalPoint({ cx: 760, tipY: 360, baseY: 660, halfW: 110, pal: MINERALS.amethyst, id });
    inner += groundShadow(600, 680, 360, { edge: "#181817" });
  }
  return (
    baseScene(id) +
    gridLines(id) +
    `<g>${inner}</g>` +
    `<g font-family="Manrope, sans-serif" fill="rgba(24,24,23,0.35)" font-size="24" letter-spacing="4">
       <text x="60" y="90">ASTROVETRO / READING</text>
     </g>` +
    `</svg>`
  );
}

// ---- Hero scene (large, portrait) ----------------------------------------
function heroScene() {
  const id = uid();
  const pal = MINERALS.amethyst;
  const cx = 700;
  const baseY = 1500;
  const cluster = crystalCluster({ cx, baseY, pal, id }).replace(
    `${cx - 120},${baseY} ${cx},${baseY - 420}`,
    `${cx - 160},${baseY} ${cx},${baseY - 560}`
  );
  const g = `g${id}`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1400" height="1750" viewBox="0 0 1400 1750">
  <defs>
    ${grad(`bg${id}`, [[0, IVORY], [1, PEARL]])}
    ${grad(`g${id}`, [[0, "#dcd0f0"], [0.5, "#b7a5dd"], [1, "#8f78bd"]])}
    <radialGradient id="sun${id}" cx="0.7" cy="0.12" r="0.8">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="55%" stop-color="#fffdf4" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#fffdf4" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1400" height="1750" fill="url(#bg${id})"/>
  <rect width="1400" height="1750" fill="url(#sun${id})"/>
  <g stroke="rgba(24,24,23,0.05)" stroke-width="1" fill="none">
    <line x1="0" y1="0" x2="0" y2="1750"/><line x1="467" y1="0" x2="467" y2="1750"/>
    <line x1="934" y1="0" x2="934" y2="1750"/><line x1="1400" y1="0" x2="1400" y2="1750"/>
  </g>
  <ellipse cx="700" cy="${baseY + 10}" rx="360" ry="40" fill="${pal.edge}" fill-opacity="0.10"/>
  <g>${cluster}</g>
  <g font-family="Manrope, sans-serif" fill="rgba(24,24,23,0.35)" font-size="26" letter-spacing="5">
    <text x="70" y="110">ASTROVETRO</text>
  </g>
</svg>`;
}

// ---- Emit ----------------------------------------------------------------
const files = [];
for (const [slug, pal] of Object.entries(MINERALS)) {
  const variant = ["amethyst", "labradorite"].includes(slug)
    ? "cluster"
    : slug === "black-tourmaline"
    ? "column"
    : slug === "selenite"
    ? "wand"
    : slug === "amethyst-bracelet"
    ? "bracelet"
    : slug === "rose-quartz-necklace"
    ? "necklace"
    : "point";
  const svg = productScene(slug, pal, variant);
  const p = `${OUT}/${slug}.svg`;
  writeFileSync(p, svg);
  files.push(`${slug}.svg`);
}
for (const [slug, conf] of Object.entries(SERVICE_SCENES)) {
  const p = `${OUT}/${slug}.svg`;
  writeFileSync(p, serviceScene(slug, conf));
  files.push(`${slug}.svg`);
}
const heroPath = `${OUT}/hero.svg`;
writeFileSync(heroPath, heroScene());
files.push("hero.svg");

console.log(`Generated ${files.length} SVG scenes in ${OUT}:`);
console.log(files.map((f) => "  " + f).join("\n"));
