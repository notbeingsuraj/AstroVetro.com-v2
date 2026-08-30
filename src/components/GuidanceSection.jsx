import { FadeIn } from "./Motion";

function TarotVisual() {
  return (
    <svg
      viewBox="0 0 480 320"
      className="h-full w-full"
      role="img"
      aria-label="A stack of tarot cards in warm natural light"
    >
      <defs>
        <linearGradient id="tableGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1eee7" />
          <stop offset="100%" stopColor="#e6c875" />
        </linearGradient>
      </defs>

      {/* table surface */}
      <rect x="0" y="0" width="480" height="320" rx="24" fill="#f6f3ec" />

      {/* soft warm light */}
      <ellipse
        cx="240"
        cy="150"
        rx="230"
        ry="160"
        fill="#e6c875"
        opacity="0.18"
      />

      {/* splayed cards */}
      {[
        { x: 150, y: 120, r: -14 },
        { x: 200, y: 108, r: -6 },
        { x: 250, y: 104, r: 0 },
        { x: 300, y: 110, r: 7 },
        { x: 350, y: 124, r: 15 },
      ].map((card, i) => (
        <g key={i} transform={`rotate(${card.r} ${card.x} ${card.y})`}>
          <rect
            x={card.x}
            y={card.y}
            width="64"
            height="100"
            rx="6"
            fill="#ffffff"
            stroke="#e8e2d4"
            strokeWidth="1"
            filter="drop-shadow(0 6px 10px rgba(23,23,23,0.08))"
          />
          <rect
            x={card.x + 10}
            y={card.y + 14}
            width="44"
            height="72"
            rx="3"
            fill={`${["#c9bde0", "#9ec7e3", "#a9c5ae", "#e6c875", "#d99a82"][i]}55`}
          />
        </g>
      ))}
    </svg>
  );
}

function GuidanceSection() {
  return (
    <section
      id="guidance"
      className="border-y hairline bg-stone-soft py-28 lg:py-40"
      aria-label="Personal guidance"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Visual */}
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border hairline bg-white p-4 shadow-soft">
              <TarotVisual />
            </div>
          </FadeIn>

          {/* Copy + booking */}
          <div>
            <FadeIn>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
                Personal guidance
              </p>
              <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
                Perspective changes
                <br />
                <span className="italic">everything.</span>
              </h2>
              <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
                Guidance for where you are now — centred around the questions,
                decisions and reflections occupying your mind.
              </p>
            </FadeIn>

            {/* Reading card */}
            <FadeIn delay={0.12} className="mt-10">
              <div className="rounded-2xl border hairline bg-white p-7 sm:p-9 shadow-soft">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl text-ink">
                    Monthly Tarot Reading
                  </h3>
                  <p className="text-xl font-semibold text-ink">₹555</p>
                </div>
                <dl className="mt-5 flex gap-8 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-ink-soft">
                      Duration
                    </dt>
                    <dd className="mt-1 font-medium text-ink">35 minutes</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-widest text-ink-soft">
                      Format
                    </dt>
                    <dd className="mt-1 font-medium text-ink">Online</dd>
                  </div>
                </dl>
                <a
                  href="#"
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black"
                >
                  Book a Reading
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GuidanceSection;
