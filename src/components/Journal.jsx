import { motion, useReducedMotion } from "framer-motion";
import journal from "../data/journal";

function Journal() {
  const reduce = useReducedMotion();

  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-ivory py-32 lg:py-48"
      aria-label="Journal"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-start pl-8 pb-8">
        <span className="text-section-num text-ink/[0.04]">11</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="text-micro text-ink/50 mb-6 block">11 — The Journal</span>
            <h2 className="font-display text-display-md text-ink">
              LOOK <span className="italic text-accent-blue">CLOSER.</span>
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent-blue"
          >
            All articles
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Editorial journal list */}
        <div className="grid gap-10 lg:grid-cols-2">
          {journal.map((article, i) => (
            <motion.a
              key={article.id}
              href="#"
              initial={reduce ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group block ${i === 0 ? "lg:col-span-2" : ""}`}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Article image */}
                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-square">
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ backgroundColor: `hsl(${200 + i * 40}, 60%, 88%)` }}
                  >
                    {/* Abstract scene placeholder */}
                    <svg viewBox="0 0 200 200" className="h-full w-full opacity-60">
                      <defs>
                        <linearGradient id={`jl-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor={`hsl(${200 + i * 40}, 60%, 80%)`} />
                          <stop offset="100%" stopColor={`hsl(${250 + i * 30}, 60%, 88%)`} />
                        </linearGradient>
                      </defs>
                      <circle cx="100" cy="100" r="60" fill={`url(#jl-${i})`} />
                      <circle cx="100" cy="100" r="40" fill="none" stroke="#FFFDF7" strokeWidth="2" opacity="0.5" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-ink/0 transition-all duration-300 group-hover:bg-ink/10" />
                </div>

                {/* Article text */}
                <div className="flex flex-col justify-center">
                  <p className="text-micro text-accent-blue mb-4">{article.tag}</p>
                  <h3 className="font-display text-3xl leading-tight text-ink transition-colors duration-300 group-hover:text-accent-blue lg:text-4xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary">{article.time}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-accent-blue">
                    Read article
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Journal;
