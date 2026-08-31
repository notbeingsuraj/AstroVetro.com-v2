import { motion, useReducedMotion } from "framer-motion";
import journal from "../data/journal";
import MineralScene from "./visual/MineralScene";

const SCENE_ID = {
  "first-crystal": "clear-quartz",
  "understanding-amethyst": "amethyst",
  "caring-for-crystals": "selenite",
  "science-crystal-formations": "labradorite",
  "tarot-for-reflection": "rose-quartz",
};

function Journal() {
  const reduce = useReducedMotion();

  return (
    <section
      id="journal"
      className="relative overflow-hidden bg-dugdha py-32 lg:py-48"
      aria-label="Journal"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-start pl-8 pb-8">
        <span className="text-section-num text-shyama/[0.03]">11</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-16 flex flex-wrap items-end justify-between gap-8">
          <div>
            <span className="text-micro text-shyama/50 mb-6 block">11 — The Journal</span>
            <h2 className="font-display text-display-md text-shyama">
              LOOK <span className="italic text-mayura">CLOSER.</span>
            </h2>
          </div>
          <a
            href="#"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-shyama hover:text-mayura"
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
                {/* Article image — mineral scene */}
                <div className="relative aspect-[3/4] overflow-hidden sm:aspect-square">
                  <MineralScene
                    id={SCENE_ID[article.id] ?? "selenite"}
                    className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-shyama/0 transition-all duration-300 group-hover:bg-shyama/10" />
                </div>

                {/* Article text */}
                <div className="flex flex-col justify-center">
                  <p className="text-micro text-mayura mb-4">{article.tag}</p>
                  <h3 className="font-display text-3xl leading-tight text-shyama transition-colors duration-300 group-hover:text-mayura lg:text-4xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm text-text-secondary">{article.time}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-shyama group-hover:text-mayura">
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
