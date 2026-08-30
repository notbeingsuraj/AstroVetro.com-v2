// HeroScene — the flagship hero visual: a large amethyst crystal formation
// rendered with cinematic editorial lighting, on an ivory studio backdrop with
// subtle scientific orbital linework. Bright, not dark; generous negative
// space for typography. Replaced 1:1 by real hero photography per IMAGERY.md.

export default function HeroScene({ className }) {
  return (
    <svg
      viewBox="0 0 640 720"
      className={className}
      role="img"
      aria-label="A large amethyst crystal formation in dramatic natural light"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="hs-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdfcf9" />
          <stop offset="100%" stopColor="#f1eee7" />
        </linearGradient>
        <linearGradient id="hs-amethyst" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d9cdf1" />
          <stop offset="45%" stopColor="#b8a6de" />
          <stop offset="100%" stopColor="#8a72bd" />
        </linearGradient>
        <radialGradient id="hs-glow" cx="0.5" cy="0.2" r="0.7">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#fffdf7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#fffdf7" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hs-orb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9ec7e3" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9ec7e3" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* backdrop */}
      <rect x="0" y="0" width="640" height="720" fill="url(#hs-bg)" />
      <ellipse cx="320" cy="140" rx="420" ry="280" fill="url(#hs-glow)" />

      {/* faint orbital arcs */}
      <g fill="none" stroke="#181817" opacity="0.06">
        <circle cx="320" cy="350" r="210" strokeWidth="0.5" />
        <circle cx="320" cy="350" r="300" strokeWidth="0.4" />
        <ellipse
          cx="320"
          cy="350"
          rx="340"
          ry="150"
          strokeWidth="0.4"
          transform="rotate(24 320 350)"
        />
      </g>

      {/* soft reflected light on surface */}
      <ellipse cx="320" cy="672" rx="230" ry="46" fill="#000000" opacity="0.05" />

      {/* main amethyst cluster */}
      <g>
        {/* tallest point */}
        <path
          d="M300 90 L352 620 L300 670 L248 620 Z"
          fill="url(#hs-amethyst)"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M300 90 L352 620 L300 620 Z"
          fill="#ffffff"
          opacity="0.22"
        />
        <path
          d="M300 90 L248 620 L300 620 Z"
          fill="#171717"
          opacity="0.08"
        />
        <g stroke="#ffffff" strokeWidth="0.9" fill="none">
          <path d="M300 120 L352 620" />
          <path d="M300 180 L248 620" />
          <path d="M300 260 L352 500" />
          <path d="M300 340 L248 520" />
        </g>

        {/* left lower crystal */}
        <path
          d="M210 200 L248 590 L196 620 L150 580 Z"
          fill="url(#hs-amethyst)"
          stroke="#ffffff"
          strokeWidth="1.3"
          strokeLinejoin="round"
          opacity="0.92"
        />
        <path
          d="M210 200 L248 590 L210 590 Z"
          fill="#ffffff"
          opacity="0.2"
        />

        {/* right crystal */}
        <path
          d="M412 150 L440 604 L392 632 L348 590 Z"
          fill="url(#hs-amethyst)"
          stroke="#ffffff"
          strokeWidth="1.3"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <path
          d="M412 150 L440 604 L406 604 Z"
          fill="#ffffff"
          opacity="0.18"
        />
      </g>

      {/* tiny fallen crystal near base */}
      <g transform="translate(180 600) rotate(-18)">
        <path
          d="M0 0 L34 26 L0 40 Z"
          fill="#b8a6de"
          stroke="#ffffff"
          strokeWidth="0.8"
        />
      </g>

      {/* label annotation */}
      <g fontFamily="Manrope, sans-serif" fill="#77736c">
        <text x="46" y="60" fontSize="11" letterSpacing="2">
          AMETHYST · SiO₂
        </text>
        <line
          x1="300"
          y1="90"
          x2="300"
          y2="40"
          stroke="#c6a96b"
          strokeWidth="0.7"
        />
        <text x="312" y="40" fontSize="9" fill="#c6a96b">
          apex
        </text>
      </g>
    </svg>
  );
}
