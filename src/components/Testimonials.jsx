import { FadeIn, SectionLabel } from "./Motion";
import testimonials from "../data/testimonials";

function Testimonials() {
  return (
    <section
      className="relative border-t border-ink/8 bg-ivory py-24 lg:py-32"
      aria-label="Testimonials"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <SectionLabel index={7}>Community</SectionLabel>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            Stories from the community.
          </h2>
          <p className="mt-4 text-sm text-ink-soft">
            Real experiences will appear here as reviews come in.
          </p>
        </FadeIn>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <FadeIn key={t.id} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-md border border-ink/8 bg-white p-7 shadow-soft">
                <div
                  className="mb-5 flex gap-1 text-solar"
                  aria-label="5 out of 5 stars"
                >
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} aria-hidden="true">
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
