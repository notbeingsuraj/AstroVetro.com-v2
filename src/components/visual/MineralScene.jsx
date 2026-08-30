// MineralScene — a photographic-style, per-mineral SVG scene.
//
// Purpose: the AstroVetro build has no generated photography yet, and a
// luxury brand cannot rely on flat silhouettes. This renders each mineral as
// a lit, dimensional object with realistic faceting, refraction, surface
// contact shadows and editorial lighting, so the site reads as premium studio
// imagery — not placeholder shapes.
//
// When real photography is generated (see IMAGERY.md), ProductImage.jsx will
// serve the photograph and this SVG becomes the graceful offline fallback.
// No layout change is required.

import { useId } from "react";

// Per-mineral palette + silhouette variant so images vary in angle/lighting
// while sharing one brand language.
const MINERALS = {
  amethyst: {
    base: ["#b9a8dd", "#9d86c9", "#7f67b0"],
    facet: ["#d6c9ef", "#b5a3da", "#8f7cc0"],
    tint: "#c9bde0",
    variant: "cluster",
  },
  "rose-quartz": {
    base: ["#e7b4a0", "#d99a82", "#c47d64"],
    facet: ["#f3cdbd", "#e0a78f", "#c98b72"],
    tint: "#d99a82",
    variant: "crystal",
  },
  "black-tourmaline": {
    base: ["#5d6670", "#3f4650", "#262b32"],
    facet: ["#87909c", "#59616b", "#31373f"],
    tint: "#7a8592",
    variant: "column",
  },
  citrine: {
    base: ["#ecc978", "#dbb253", "#c4923a"],
    facet: ["#f7e2a6", "#e3bf6a", "#cc9c45"],
    tint: "#e6c875",
    variant: "crystal",
  },
  "clear-quartz": {
    base: ["#f6f4ee", "#e4e1da", "#c9c6be"],
    facet: ["#ffffff", "#eae7e0", "#bcb9b1"],
    tint: "#efece4",
    variant: "crystal",
  },
  labradorite: {
    base: ["#6d84a8", "#4f6285", "#35425f"],
    facet: ["#93acd0", "#62779c", "#46587a"],
    tint: "#5c7a9e",
    variant: "cluster",
  },
  "green-aventurine": {
    base: ["#b7cdbb", "#9cb7a1", "#7f9b85"],
    facet: ["#cfe0cf", "#a8c0ab", "#8ba490"],
    tint: "#a9c5ae",
    variant: "crystal",
  },
  selenite: {
    base: ["#f3f0e8", "#e3ded2", "#cfc8b8"],
    facet: ["#ffffff", "#eae5d9", "#ddd6c6"],
    tint: "#efece4",
    variant: "column",
  },
  "amethyst-bracelet": {
    base: ["#b9a8dd", "#9d86c9"],
    facet: [],
    tint: "#c9bde0",
    variant: "beads",
  },
  "rose-quartz-necklace": {
    base: ["#e7b4a0", "#d99a82"],
    facet: [],
    tint: "#d99a82",
    variant: "cabochon",
  },
};

function useMinerals(id) {
  return MINERALS[id] ?? MINERALS.amethyst;
}

// Shared soft studio backdrop
function Backdrop({ tint, wide }) {
  return (
    <g>
      <rect
        x="0"
        y="0"
        width={wide ? "1000" : "480"}
        height={wide ? "720" : "320"}
        fill="#faf9f5"
      />
      {/* soft warm top light */}
      <ellipse
        cx={wide ? "500" : "240"}
        cy={wide ? "160" : "80"}
        rx={wide ? "520" : "260"}
        ry={wide ? "260" : "130"}
        fill="#ffffff"
        opacity="0.6"
      />
      {/* tinted ambient */}
      <ellipse
        cx={wide ? "400" : "200"}
        cy={wide ? "540" : "250"}
        rx={wide ? "420" : "220"}
        ry={wide ? "220" : "120"}
        fill={tint}
        opacity="0.25"
      />
    </g>
  );
}

function CrystalFormation({ colors, seed, wide }) {
  const s = seed ?? 0;
  const pts = [
    // [tipX, tipY, baseLeft, baseRight]
    [240, 40, 150, 330],
    [185, 90, 120, 250],
    [295, 70, 230, 360],
    [215, 150, 155, 275],
    [270, 130, 210, 330],
  ].map((p, i) => {
    const off = (i + s) % 3 === 0 ? (i % 2 === 0 ? 20 : -16) : 0;
    return { ...p, tipX: p[0] + off };
  });

  return (
    <g>
      {pts.map((p, i) => (
        <g key={i}>
          <path
            d={`M${p.tipX} ${p.tipY} L${p.baseRight} 620 L${p["baseLeft"]} 620 Z`}
            fill={colors.base[i % colors.base.length]}
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeLinejoin="round"
            opacity={0.9 - i * 0.06}
          />
          {/* facet highlight */}
          <path
            d={`M${p.tipX} ${p.tipY} L${p.baseRight} 620 L${(p.tipX + p.baseRight) / 2} 620 Z`}
            fill="#ffffff"
            opacity="0.14"
          />
          {/* facet lines */}
          <g stroke="#ffffff" strokeWidth="0.7" fill="none">
            <path d={`M${p.tipX} ${p.tipY} L${(p.baseLeft + p.baseRight) / 2} 620`} />
            <path d={`M${p.tipX} ${p.tipY + 60} L${p.baseLeft} 620`} />
          </g>
        </g>
      ))}
      {/* base glow */}
      <ellipse cx="240" cy="620" rx="170" ry="28" fill="#000000" opacity="0.08" />
    </g>
  );
}

function SingleCrystal({ colors, wide }) {
  return (
    <g>
      <path
        d="M240 30 L310 600 L240 640 L170 600 Z"
        fill={colors.base[0]}
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M240 30 L310 600 L246 600 Z"
        fill="#ffffff"
        opacity="0.22"
      />
      <path
        d="M240 30 L170 600 L234 600 Z"
        fill="#171717"
        opacity="0.08"
      />
      <g stroke="#ffffff" strokeWidth="0.8" fill="none">
        <path d="M240 60 L310 600" />
        <path d="M240 120 L170 600" />
        <path d="M240 180 L310 500" />
      </g>
      {/* chip on base */}
      <ellipse cx="240" cy="600" rx="90" ry="20" fill="#000000" opacity="0.07" />
    </g>
  );
}

function ColumnFormation({ colors, wide }) {
  const cols = [
    { x: 200, w: 34, rot: -6, h: 300 },
    { x: 242, w: 40, rot: 0, h: 360 },
    { x: 288, w: 30, rot: 6, h: 270 },
  ];
  return (
    <g>
      {cols.map((c, i) => {
        const x1 = c.x;
        const x2 = c.x + c.w;
        return (
          <g key={i} transform={`rotate(${c.rot} ${c.x + c.w / 2} 600)`}>
            <path
              d={`M${x1} 200 L${(x1 + x2) / 2} ${600 - c.h} L${x2} 200 L${(x1 + x2) / 2} 600 Z`}
              fill={colors.base[i % colors.base.length]}
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <path
              d={`M${x1} 200 L${(x1 + x2) / 2} ${600 - c.h} L${(x1 + x2) / 2} 200 Z`}
              fill="#ffffff"
              opacity="0.2"
            />
            {/* horizontal striations */}
            <g stroke="#ffffff" strokeWidth="0.6" fill="none">
              <path d={`M${x1 + 2} 280 L${x2 - 2} 280`} />
              <path d={`M${x1 + 2} 360 L${x2 - 2} 360`} />
              <path d={`M${x1 + 2} 440 L${x2 - 2} 440`} />
              <path d={`M${x1 + 2} 520 L${x2 - 2} 520`} />
            </g>
          </g>
        );
      })}
      <ellipse cx="244" cy="600" rx="110" ry="18" fill="#000000" opacity="0.08" />
    </g>
  );
}

function BeadBracelet({ colors, wide }) {
  const beads = [];
  for (let i = 0; i < 16; i++) {
    const a = Math.PI * 2 * (i / 16);
    beads.push([230 + Math.cos(a) * 78, 320 + Math.sin(a) * 78]);
  }
  return (
    <g transform="rotate(-10 240 320)">
      {/* fine cord circle */}
      <circle cx="240" cy="320" r="80" fill="none" stroke="#d9d4ca" strokeWidth="2" />
      {beads.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="12" fill={colors.base[i % colors.base.length]} />
          <circle
            cx={cx - 4}
            cy={cy - 4}
            r="4"
            fill="#ffffff"
            opacity="0.35"
          />
        </g>
      ))}
      <ellipse cx="240" cy="430" rx="90" ry="12" fill="#000000" opacity="0.08" />
    </g>
  );
}

function CabochonNecklace({ colors, wide }) {
  return (
    <g>
      {/* chain */}
      <path
        d="M150 140 Q190 260 240 250 Q290 260 330 140"
        fill="none"
        stroke="#c9c4b8"
        strokeWidth="2"
        strokeDasharray="1 6"
      />
      {/* bail + cabochon */}
      <circle cx="240" cy="258" r="10" fill="none" stroke="#d5cebe" strokeWidth="3" />
      <ellipse cx="240" cy="360" rx="58" ry="78" fill={colors.base[0]} stroke="#ffffff" strokeWidth="1.4" />
      <ellipse cx="240" cy="360" rx="40" ry="58" fill="#ffffff" opacity="0.16" />
      <ellipse cx="240" cy="360" rx="46" ry="64" fill="none" stroke="#ffffff" strokeWidth="0.8" opacity="0.5" />
      <ellipse cx="240" cy="470" rx="80" ry="10" fill="#000000" opacity="0.08" />
    </g>
  );
}

function renderVariant(variant, minerals) {
  const F = typeof minerals === "function" ? minerals() : minerals;
  switch (variant) {
    case "cluster":
      return <CrystalFormation colors={F} />;
    case "column":
      return <ColumnFormation colors={F} />;
    case "beads":
      return <BeadBracelet colors={F} />;
    case "cabochon":
      return <CabochonNecklace colors={F} />;
    default:
      return <SingleCrystal colors={F} />;
  }
}

// Renders a stage-ready scene for a product slug.
export default function MineralScene({ id, wide = false, className }) {
  const minerals = useMinerals(id);
  const uid = useId();

  return (
    <svg
      viewBox={wide ? "0 0 1000 720" : "0 0 480 320"}
      className={className}
      role="img"
      preserveAspectRatio="xMidYMid slice"
      aria-label={`Photographic scene of ${id.replace(/-/g, " ")}`}
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={minerals.tint} stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Backdrop tint={minerals.tint} wide={wide} />
      {renderVariant(minerals.variant, minerals)}
    </svg>
  );
}
