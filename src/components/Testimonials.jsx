import { motion, useReducedMotion } from "framer-motion";
import testimonials from "../data/testimonials";

function Testimonials() {
  const reduce = useReducedMotion();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-coral/20 py-32 lg:py-48"
      aria-label="Testimonials"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-start pl-8 pt-8">
        <span className="text-section-num text-ink/[0.03]">11</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-20">
          <span className="text-micro text-ink/50 mb-6 block">11 — The Human Experience</span>
          <h2 className="font-display text-display-md text-ink">
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
              <span className="pointer-events-none absolute -top-8 left-0 font-display text-7xl text-electric-lilac/20">
                “
              </span>

              <div className="relative border-l-2 pt-6 pl-8" style={{ borderColor: "rgba(23,19,29,0.1)" }}>
                <blockquote className="text-pretty text-xl leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-8 flex items-center justify-between border-t border-ink/10 pt-6">
                  <div>
                    <p className="font-semibold text-ink">{t.name}</p>
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
