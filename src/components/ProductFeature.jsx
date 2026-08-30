import { FadeIn } from "./Motion";

function ProductFeature() {
  return (
    <section
      id="collection"
      className="bg-ivory py-28 lg:py-40"
      aria-label="Featured product"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="mb-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
            Objects with intention
          </p>
        </FadeIn>

        {/* Hero product */}
        <FadeIn className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Large product image — abstract amethyst */}
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/40 via-white to-celestial/40">
            <div
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(80% 80% at 30% 25%, rgba(201,189,224,0.7) 0%, rgba(255,255,255,0) 55%), radial-gradient(60% 60% at 75% 80%, rgba(158,199,227,0.5) 0%, rgba(255,255,255,0) 60%)",
              }}
            />
            {/* crystal silhouette */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                viewBox="0 0 300 380"
                className="h-[78%] w-auto drop-shadow-lift"
                role="img"
                aria-label="Amethyst crystal"
              >
                <defs>
                  <linearGradient id="amethystBody" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d8cdf0" />
                    <stop offset="50%" stopColor="#c9bde0" />
                    <stop offset="100%" stopColor="#a78fc9" />
                  </linearGradient>
                </defs>
                <path
                  d="M150 10 L205 340 L150 370 L95 340 Z"
                  fill="url(#amethystBody)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <g stroke="#ffffff" strokeWidth="0.8" fill="none">
                  <path d="M150 20 L205 340" />
                  <path d="M150 60 L95 340" />
                  <path d="M150 120 L205 240" />
                </g>
              </svg>
            </div>
          </div>

          {/* Copy */}
          <div>
            <span className="inline-block rounded-full border hairline px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/70">
              Featured
            </span>
            <h3 className="mt-6 font-display text-5xl tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Amethyst
            </h3>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
              Calm, clarity and a little space to breathe.
            </p>
            <p className="mt-8 text-2xl font-medium text-ink">₹888</p>
            <a
              href="#"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-champagne"
            >
              View the piece
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default ProductFeature;
