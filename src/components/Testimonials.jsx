import { FadeIn } from "./Motion";

// NOTE: Replace these with real customer reviews before launch.
const TESTIMONIALS = [
  {
    quote:
      "My rose quartz sits on my desk, and every time I notice it, it feels like a small invitation to slow down. I didn't expect an object to do that.",
    name: "Ananya",
    detail: "Rose Quartz",
  },
  {
    quote:
      "The reading felt less like prediction and more like a mirror. I left with more clarity about a decision I'd been avoiding.",
    name: "Rohan",
    detail: "Monthly Tarot Reading",
  },
  {
    quote:
      "Everything arrived beautifully wrapped, and the piece itself is more stunning than the photos. It feels precious, not just pretty.",
    name: "Meera",
    detail: "Amethyst",
  },
  {
    quote:
      "I asked for a stone for focus and was guided to black tourmaline. The care in how it was chosen — and explained — made all the difference.",
    name: "Dev",
    detail: "Black Tourmaline",
  },
];

function Testimonials() {
  return (
    <section className="bg-ivory py-28 lg:py-40" aria-label="Testimonials">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
            Community
          </p>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            Stories from the community.
          </h2>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-2xl border hairline bg-white p-7 shadow-soft">
                <div className="mb-5 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="text-champagne">
                      ★
                    </span>
                  ))}
                </div>
                <blockquote className="flex-1 text-pretty text-sm leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-semibold text-ink">{t.name}</p>
                  <p className="text-xs text-ink-soft">{t.detail}</p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
