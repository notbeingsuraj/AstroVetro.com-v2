import { motion, useReducedMotion } from "framer-motion";
import testimonials from "../data/testimonials";

function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-bhasma py-32 lg:py-48"
      aria-label="Testimonials"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-start pl-8 pt-8">
        <span className="text-section-num text-shyama/[0.03]">10</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-20">
          <span className="text-micro text-shyama/50 mb-6 block">10 — The Human Experience</span>
          <h2 className="font-display text-display-md text-shyama">
            STORIES.
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-text-secondary">
            Real experiences from people who've worn the pieces, asked the
            questions, and paused long enough to notice.
          </p>
        </div>

        {/* Editorial testimonial layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.id}
              initial={reduce ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative"
            >
              {/* Large decorative quote mark */}
              <span className="pointer-events-none absolute -top-10 left-0 font-display text-8xl text-shyama/[0.03]">
                “
              </span>

              <div className="relative border-l-2 pt-6 pl-8" style={{ borderColor: `hsl(${220 + i * 45}, 60%, 70%)` }}>
                <div className="mb-6 flex gap-1 text-haldi" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} aria-hidden="true">★</span>
                  ))}
                </div>

                <blockquote className="text-pretty text-xl leading-relaxed text-shyama">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-8 flex items-center justify-between border-t border-shyama/8 pt-6">
                  <div>
                    <p className="font-semibold text-shyama">{t.name}</p>
                    <p className="text-sm text-text-muted">{t.detail}</p>
                  </div>
                  <span className="text-micro text-text-muted">
                    {String(i + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                  </span>
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
