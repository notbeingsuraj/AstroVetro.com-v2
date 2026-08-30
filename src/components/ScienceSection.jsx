import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, EASE } from "./Motion";

function ScienceVisual() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-full w-full"
      role="img"
      aria-label="Scientific crystal lattice diagram"
    >
      <defs>
        <linearGradient id="latticeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9ec7e3" />
          <stop offset="100%" stopColor="#a9c5ae" />
        </linearGradient>
      </defs>

      {/* faint coordinate frame */}
      <g stroke="#171717" strokeWidth="0.4" opacity="0.12">
        <path d="M0 320 H480" />
        <path d="M0 0 V320" />
      </g>

      {/* lattice network */}
      {[0, 1, 2, 3, 4, 5].map((row) =>
        [0, 1, 2, 3, 4, 5, 6, 7].map((col) => (
          <g key={`${row}-${col}`}>
            <circle
              cx={70 + col * 55}
              cy={50 + row * 45}
              r="4"
              fill="url(#latticeGrad)"
              stroke="#ffffff"
              strokeWidth="1"
            />
          </g>
        ))
      )}
      {/* bonds */}
      {[0, 1, 2, 3, 4, 5].map((row) =>
        [0, 1, 2, 3, 4, 5, 6].map((col) => (
          <g key={`h-${row}-${col}`}>
            <line
              x1={70 + col * 55}
              y1={50 + row * 45}
              x2={125 + col * 55}
              y2={50 + row * 45}
              stroke="#9ec7e3"
              strokeWidth="1"
              opacity="0.5"
            />
            <line
              x1={70 + col * 55}
              y1={50 + row * 45}
              x2={70 + col * 55}
              y2={95 + row * 45}
              stroke="#a9c5ae"
              strokeWidth="1"
              opacity="0.5"
            />
          </g>
        ))
      )}

      {/* labels */}
      <g fill="#68645d" fontSize="10" fontFamily="Manrope, sans-serif">
        <text x="20" y="18">Fig. 01 — Crystal lattice structure</text>
        <text x="300" y="310">SiO₂ · quartz group</text>
      </g>
    </svg>
  );
}

function ScienceSection() {
  return (
    <section
      id="science"
      className="bg-white py-28 lg:py-40"
      aria-label="Science and spirituality"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Scientific visual side */}
          <FadeIn className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-3xl border hairline bg-ivory p-6 sm:p-10">
              <ScienceVisual />
            </div>
          </FadeIn>

          {/* Copy side */}
          <div className="order-1 lg:order-2">
            <FadeIn>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
                Science × Spirit
              </p>
              <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
                Nature has always been
                <br />
                <span className="italic">stranger than fiction.</span>
              </h2>
              <p className="mt-8 max-w-lg text-pretty text-lg leading-relaxed text-ink-soft">
                Every crystal is a geological formation — a distinct
                structure, composition and 4.5-billion-year history pressed
                into stone.
              </p>
              <p className="mt-5 max-w-lg text-pretty leading-relaxed text-ink-soft">
                We honour the science of what a mineral physically is. And we
                honour the human practice of what it means to us — how people
                have traditionally chosen to use intention, ritual and meaning
                to shape their inner world.
              </p>
              <p className="mt-5 max-w-lg text-pretty leading-relaxed text-ink-soft">
                Both can be true. One does not diminish the other.
              </p>
            </FadeIn>

            {/* Two-column distinction */}
            <FadeIn delay={0.15} className="mt-10 grid grid-cols-2 gap-6">
              <div className="border-t-2 border-celestial pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">
                  What it is
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  A mineral. A geological structure. A piece of the earth,
                  formed over millennia.
                </p>
              </div>
              <div className="border-t-2 border-mineral pt-5">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">
                  What we bring
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Intention. Meaning. A focus for what you are choosing to
                  invite into your life.
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
