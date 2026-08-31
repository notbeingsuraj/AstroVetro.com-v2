import { motion, useReducedMotion } from "framer-motion";
import { FadeIn, SectionLabel } from "./Motion";
import { EASE } from "./constants";
import intentions from "../data/intentions";
import products from "../data/products";

function IntentionExplorer({ activeIntentionId, onSelect }) {
  const reduce = useReducedMotion();

  return (
    <section
      id="intentions"
      className="relative border-t border-ink/8 bg-white py-24 lg:py-32"
      aria-label="Explore by intention"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <SectionLabel index={1}>By intention</SectionLabel>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            What are you
            <br className="sm:hidden" /> looking for?
          </h2>
          <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-soft">
            Choose what's on your mind and we'll point you to the pieces — from
            our actual collection — that fit.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {intentions.map((intention, i) => {
            const matches = intention.productIds
              .map((id) => products.find((p) => p.id === id))
              .filter(Boolean);
            const isActive = activeIntentionId === intention.id;

            return (
              <FadeIn key={intention.id} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => onSelect(intention.id)}
                  aria-pressed={isActive}
                  className={`group relative block h-full w-full overflow-hidden rounded-md border p-6 text-left transition-all duration-500 sm:p-7 ${
                    isActive
                      ? "border-ink bg-ink text-white shadow-lift"
                      : "border-ink/10 bg-pearl hover:border-ink/25 hover:shadow-lift"
                  }`}
                >
                  {/* subtle colour wash - a "moment of emotion" */}
                  <motion.span
                    initial={false}
                    animate={{ opacity: isActive ? 0.16 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full blur-2xl"
                    style={{ backgroundColor: intention.soft }}
                  />

                  <div className="relative">
                    <span
                      className="mb-10 block h-1 w-12 rounded-full transition-transform duration-500 group-hover:scale-x-110"
                      style={{ backgroundColor: intention.color }}
                    />

                    <h3 className="font-display text-3xl">{intention.title}</h3>
                    <p
                      className={`mt-2 text-sm leading-relaxed ${
                        isActive ? "text-white/70" : "text-ink-soft"
                      }`}
                    >
                      {intention.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {matches.map((p) => (
                        <span
                          key={p.id}
                          className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                            isActive
                              ? "bg-white/15 text-white/90"
                              : "bg-white/70 text-ink/70"
                          }`}
                        >
                          {p.name.split(" ")[0]}
                        </span>
                      ))}
                    </div>

                    <span
                      className={`mt-7 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${
                        isActive ? "text-solar" : "text-ink/60"
                      } transition-colors group-hover:text-ink`}
                    >
                      {isActive ? "Showing" : "Explore"}
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </button>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IntentionExplorer;
