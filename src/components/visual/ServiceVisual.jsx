// ServiceVisual — premium editorial photography-style scenes for the
// guidance/readings portion of the site. Elegant tarot arrangements, natural
// light, cream surfaces, subtle crystals. Deliberately NOT occult: no candles,
// fog, skulls or "witchy" imagery — a luxury editorial magazine aesthetic.
//
// Replaced 1:1 by real photography per IMAGERY.md (public/images/services/*).

export function TarotScene({ className }) {
  return (
    <svg
      viewBox="0 0 640 520"
      className={className}
      role="img"
      aria-label="Elegant tarot cards arranged on a cream surface in natural light"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="tbl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f6f2ea" />
          <stop offset="100%" stopColor="#efe9dc" />
        </linearGradient>
        <radialGradient id="sun" cx="0.5" cy="0.2" r="0.8">
          <stop offset="0%" stopColor="#fff8e6" />
          <stop offset="100%" stopColor="#fff8e6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* surface + sunlight */}
      <rect x="0" y="0" width="640" height="520" fill="url(#tbl)" />
      <ellipse cx="320" cy="120" rx="360" ry="220" fill="url(#sun)" />

      {/* linen texture lines (subtle) */}
      <g stroke="#d9d1c2" strokeWidth="0.4" opacity="0.4">
        {[80, 160, 240, 320, 400, 480].map((y) => (
          <line key={y} x1="0" y1={y} x2="640" y2={y} />
        ))}
      </g>

      {/* a few small crystals resting on the table */}
      <g>
        <path
          d="M120 300 L134 272 L148 300 L134 332 Z"
          fill="#c9bde0"
          stroke="#ffffff"
          strokeWidth="0.8"
        />
        <path
          d="M520 360 L531 338 L542 360 L531 382 Z"
          fill="#e6c875"
          stroke="#ffffff"
          strokeWidth="0.8"
        />
      </g>

      {/* splayed tarot cards */}
      {[
        { x: 210, y: 210, r: -16 },
        { x: 262, y: 196, r: -7 },
        { x: 318, y: 192, r: 0 },
        { x: 374, y: 198, r: 8 },
        { x: 428, y: 214, r: 17 },
      ].map((card, i) => (
        <g key={i} transform={`rotate(${card.r} ${card.x} ${card.y})`}>
          <rect
            x={card.x}
            y={card.y}
            width="86"
            height="136"
            rx="7"
            fill="#ffffff"
            stroke="#e8e0cf"
            strokeWidth="1"
            filter="drop-shadow(0 10px 16px rgba(24,24,23,0.12))"
          />
          <rect
            x={card.x + 11}
            y={card.y + 18}
            width="64"
            height="100"
            rx="4"
            fill={`${["#c9bde0", "#9ec7e3", "#d99a82", "#a9c5ae", "#e6c875"][i]}55`}
          />
          <circle
            cx={card.x + 43}
            cy={card.y + 68}
            r="13"
            fill="none"
            stroke="#b9aede"
            strokeWidth="1"
            opacity="0.7"
          />
        </g>
      ))}

      {/* hands entering from bottom right */}
      <g>
        {/* forearm + hand silhouette */}
        <path
          d="M500 520 L560 480 Q632 440 600 404 Q566 380 552 420 L480 500 Z"
          fill="#e6cfb8"
          stroke="#d9bb9e"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}

export function GuidanceScene({ className }) {
  // A writing/contemplation scene — notebook, pen, soft light
  return (
    <svg
      viewBox="0 0 640 520"
      className={className}
      role="img"
      aria-label="An open journal and pen on a warm table in soft light"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="gs-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#faf9f5" />
          <stop offset="100%" stopColor="#f1eee7" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="640" height="520" fill="url(#gs-bg)" />
      <ellipse cx="320" cy="120" rx="340" ry="200" fill="#ffffff" opacity="0.5" />
      <ellipse cx="280" cy="140" rx="80" ry="120" fill="#d99a82" opacity="0.12" />

      {/* open journal */}
      <g>
        <rect x="170" y="150" width="300" height="220" rx="6" fill="#fffdf7" stroke="#e7dfcf" strokeWidth="1" filter="drop-shadow(0 14px 24px rgba(24,24,23,0.12))" />
        {/* spine */}
        <line x1="320" y1="150" x2="320" y2="370" stroke="#e0d7c6" strokeWidth="1.5" />
        {/* lines on left page */}
        <g stroke="#e5ddcf" strokeWidth="0.6">
          {[185, 205, 225, 245, 265, 285, 305, 325, 345].map((y) => (
            <line key={y} x1="190" y1={y} x2="305" y2={y} />
          ))}
        </g>
        {/* handwriting on right */}
        <g stroke="#c9bde0" strokeWidth="1" fill="none">
          <path d="M338 190 q18 10 34 2" />
          <path d="M338 210 q18 10 34 2" />
          <path d="M338 230 q18 10 34 2" />
          <path d="M338 250 q18 10 34 2" />
        </g>
      </g>

      {/* pen */}
      <g transform="rotate(-28 500 320)">
        <rect x="470" y="312" width="150" height="9" rx="4.5" fill="#181817" />
        <rect x="600" y="312" width="26" height="9" rx="3" fill="#c6a96b" />
      </g>

      {/* small selenite wand */}
      <path
        d="M80 400 L100 430 L120 400 L100 470 Z"
        fill="#f1eee4"
        stroke="#e2dccb"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export default TarotScene;
