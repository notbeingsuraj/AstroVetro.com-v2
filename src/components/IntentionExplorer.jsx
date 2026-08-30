import { FadeIn } from "./Motion";
import intentions from "../data/intentions";
import products from "../data/products";

function IntentionExplorer({ activeIntentionId, onSelect }) {
  return (
    <section
      id="intentions"
      className="relative bg-ivory py-24 lg:py-32"
      aria-label="Explore by intention"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
            By intention
          </p>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            What are you seeking?
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            Choose what you're looking for and we'll point you to the pieces —
            from our actual collection — that fit.
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                  className={`group block h-full w-full rounded-2xl border p-6 text-left transition-all duration-400 ${
                    isActive
                      ? "border-ink bg-ink text-white shadow-lift"
                      : "border-ink/10 bg-stone-soft hover:border-ink/25 hover:shadow-lift"
                  }`}
                >
                  <span
                    className="mb-8 block h-3 w-14 rounded-full transition-transform duration-500 group-hover:scale-x-110"
                    style={{ backgroundColor: intention.color }}
                  />
                  <h3 className="font-display text-2xl">{intention.title}</h3>
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
                    className={`mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest ${
                      isActive ? "text-champagne" : "text-ink/60"
                    } transition-colors group-hover:text-ink`}
                  >
                    {isActive ? "Showing" : "Explore"}
                    <span aria-hidden="true">→</span>
                  </span>
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
