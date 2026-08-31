import { FadeIn, SectionLabel } from "./Motion";
import EditorialGrid from "./visual/EditorialGrid";

function Lattice() {
  return (
    <svg
      viewBox="0 0 480 300"
      className="h-full w-full"
      role="img"
      aria-label="Scientific crystal lattice diagram"
    >
      <defs>
        <linearGradient id="lat1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a9d7f2" />
          <stop offset="100%" stopColor="#b8d2b6" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="480" height="300" rx="8" fill="#fbfaf6" />

      {/* faint frame */}
      <g stroke="#181817" strokeWidth="0.4" opacity="0.12">
        <path d="M20 20 H460 M20 280 H460 M20 20 V280 M460 20 V280" />
      </g>

      {/* lattice bonds */}
      <g stroke="#181817" strokeWidth="0.5" opacity="0.18">
        {[0, 1, 2, 3, 4, 5, 6].map((col) => (
          <line
            key={`v${col}`}
            x1={70 + col * 50}
            y1={60}
            x2={70 + col * 50}
            y2={240}
          />
        ))}
        {[0, 1, 2, 3].map((row) => (
          <line
            key={`h${row}`}
            x1={50}
            y1={70 + row * 60}
            x2={430}
            y2={70 + row * 60}
          />
        ))}
      </g>

      {/* atoms */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((col) =>
        [0, 1, 2, 3].map((row) => (
          <circle
            key={`${col}-${row}`}
            cx={70 + col * 50 - (row % 2 === 0 ? 0 : 25)}
            cy={70 + row * 60}
            r={row % 2 === 0 ? 9 : 6}
            fill="url(#lat1)"
            stroke="#ffffff"
            strokeWidth="1"
          />
        ))
      )}

      <g fontFamily="Manrope, sans-serif" fill="#77736c" fontSize="10">
        <text x="22" y="18">Fig. 01 — Crystal lattice</text>
        <text x="330" y="286">SiO₂ · quartz group</text>
      </g>
    </svg>
  );
}

function ScienceSection() {
  return (
    <section
      id="science"
      className="relative border-t border-ink/8 bg-ivory py-24 lg:py-32"
      aria-label="Science and spirituality"
    >
      <EditorialGrid className="opacity-40" variant="orbits" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <FadeIn className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-md border border-ink/8 bg-white shadow-soft">
              <Lattice />
            </div>
          </FadeIn>

          <div className="order-1 lg:order-2">
            <FadeIn>
              <SectionLabel index={4}>Science × Spirit</SectionLabel>
              <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
                Nature has always been
                <br />
                <span className="italic">stranger than fiction.</span>
              </h2>
              <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
                Every crystal is a geological formation — a distinct structure,
                composition and deep history pressed into stone.
              </p>
              <p className="mt-4 max-w-lg text-pretty leading-relaxed text-ink-soft">
                We honour what a mineral physically is, and we honour the
                human practice of what it can mean — how people have
                traditionally used intention, ritual and meaning to shape
                their inner world. Both can be true.
              </p>
            </FadeIn>

            <FadeIn delay={0.12} className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-t-2 border-celestial pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">
                  What it is
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  A mineral. A geological structure. A piece of the earth.
                </p>
              </div>
              <div className="border-t-2 border-sage pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">
                  What we bring
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Intention. Meaning. A focus for what you invite in.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScienceSection;
