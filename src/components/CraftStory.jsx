import { FadeIn } from "./Motion";

const PILLARS = [
  {
    title: "Thoughtfully selected",
    text: "Each stone is chosen by hand for its clarity, character and presence — never mass-produced by the piece.",
  },
  {
    title: "Carefully sourced",
    text: "We work with trusted suppliers who honour the origin of every mineral, from the earth to you.",
  },
  {
    title: "Made for your ritual",
    text: "Designed to live beside you — on your desk, in your pocket, part of your everyday.",
  },
];

function CraftStory() {
  return (
    <section className="border-y hairline bg-stone-soft py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Editorial image */}
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-mineral/40 via-white to-celestial/40">
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "radial-gradient(70% 70% at 60% 30%, rgba(169,197,174,0.6) 0%, rgba(255,255,255,0) 60%), radial-gradient(50% 50% at 20% 85%, rgba(158,199,227,0.5) 0%, rgba(255,255,255,0) 60%)",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center p-10">
                <svg
                  viewBox="0 0 240 300"
                  className="h-full w-auto drop-shadow-lift"
                  role="img"
                  aria-label="Carefully selected crystal"
                >
                  <defs>
                    <linearGradient id="craftBody" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a9c5ae" />
                      <stop offset="60%" stopColor="#cfe0d1" />
                      <stop offset="100%" stopColor="#e6c875" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M120 8 L168 250 L120 292 L72 250 Z"
                    fill="url(#craftBody)"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <g stroke="#ffffff" strokeWidth="0.8" fill="none">
                    <path d="M120 16 L168 250" />
                    <path d="M120 60 L72 250" />
                  </g>
                </svg>
              </div>
            </div>
          </FadeIn>

          {/* Copy */}
          <div>
            <FadeIn>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
                The AstroVetro difference
              </p>
              <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
                Different by
                <br />
                <span className="italic">nature.</span>
              </h2>
            </FadeIn>

            <div className="mt-12 space-y-10">
              {PILLARS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.08}>
                  <div className="border-b hairline pb-8">
                    <h3 className="font-display text-2xl text-ink">
                      <span className="mr-3 text-champagne">
                        0{i + 1}
                      </span>
                      {p.title}
                    </h3>
                    <p className="mt-3 max-w-md text-pretty leading-relaxed text-ink-soft">
                      {p.text}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CraftStory;
