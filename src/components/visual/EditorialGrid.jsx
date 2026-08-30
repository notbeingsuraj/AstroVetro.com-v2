// EditorialGrid — a sophisticated, near-invisible scientific/editorial grid.
// Not an engineering dashboard: this is an architectural-blueprint +
// astronomical-chart rhythm. Thin warm-grey lines, large spacing, tiny
// coordinate markers and section labels. It should almost disappear until the
// user notices it.

const SECTIONS = [
  ["01", "Collection"],
  ["02", "Intention"],
  ["03", "Science"],
  ["04", "Guidance"],
  ["05", "Journal"],
];

export default function EditorialGrid({ className = "", variant = "lines" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* vertical guides */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={`v${i}`}
          className="absolute top-0 h-full border-l hairline"
          style={{ left: `${(i * 100) / 4}%` }}
        />
      ))}

      {/* horizontal guides */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={`h${i}`}
          className="absolute left-0 w-full border-t hairline"
          style={{ top: `${(i * 100) / 3}%` }}
        />
      ))}

      {/* faint orbital arcs in upper area */}
      {(variant === "orbits" || variant === "lines") && (
        <svg
          className="absolute -right-10 -top-16 h-[70%] w-[45%] opacity-[0.05]"
          viewBox="0 0 400 400"
          fill="none"
        >
          <g stroke="#181817">
            <circle cx="300" cy="120" r="90" strokeWidth="0.5" />
            <circle cx="300" cy="120" r="160" strokeWidth="0.4" />
            <ellipse
              cx="300"
              cy="120"
              rx="250"
              ry="90"
              strokeWidth="0.4"
              transform="rotate(-20 300 120)"
            />
          </g>
        </svg>
      )}

      {/* tiny coordinate markers */}
      <div className="absolute left-6 top-6 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/25">
        {`/ ${variant}`}
      </div>
      <div className="absolute bottom-6 right-8 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.3em] text-ink/25">
        <span>lat 28.61°</span>
        <span className="inline-block h-px w-6 bg-ink/20" />
        <span>long 77.20°</span>
      </div>

      {/* tiny section header labels */}
      {SECTIONS.map(([n, label], i) => (
        <div
          key={n}
          className="absolute top-[18%] hidden font-mono text-[9px] uppercase tracking-[0.35em] text-ink/20 lg:block"
          style={{ left: `${(i * 100) / 4 + 1.2}%`, top: `${18 + i * 14}%` }}
        >
          <span className="mr-2 text-ink/15">{n}</span>
          {label}
        </div>
      ))}
    </div>
  );
}
