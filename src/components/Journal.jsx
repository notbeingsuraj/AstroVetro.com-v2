import { motion, useReducedMotion } from "framer-motion";
import journal from "../data/journal";
import MineralScene from "./visual/MineralScene";

function Journal() {
  const reduce = useReducedMotion();

  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-mint/30 py-32 lg:py-48"
      aria-label="Journal"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-start pl-8 pb-8">
        <span className="text-section-num text-ink/[0.03]">13</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="text-micro text-ink/50 mb-6 block">13 — Journal</span>
            <h2 className="font-display text-display-md text-ink">
              THE SCIENCE
              <br />
              <span className="italic text-electric-lilac">OF CRYSTALS</span>
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-electric-lilac"
          >
            All articles
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>

        {/* Magazine-style editorial layout */}
        <div className="grid gap-10 lg:grid-cols-3">
          {journal.map((article, i) => (
            <motion.a
              key={article.id}
              href="#"
              initial={reduce ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`group block ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
            >
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Article image — mineral scene */}
                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-square">
                  <MineralScene
                    id={article.id}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-all duration-300 group-hover:bg-ink/10" />
                </div>

                {/* Article text */}
                <div className="flex flex-col justify-center">
                  <p className="text-micro text-electric-lilac mb-4">{article.tag}</p>
                  <h3 className="font-display text-3xl leading-tight text-ink transition-colors duration-300 group-hover:text-electric-lilac lg:text-4xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary">{article.time}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink group-hover:text-electric-lilac">
                    READ ARTICLE
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
