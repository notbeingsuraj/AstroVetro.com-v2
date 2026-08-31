import { motion, useReducedMotion } from "framer-motion";

const MARQUEE_ITEMS = ["ASTROVETRO", "CRYSTALS", "READINGS", "DISCOVERY", "JEWELLERY"];

function GuidanceTransition() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-ivory py-32 lg:py-48">
      {/* Marquee — horizontal moving type */}
      <div className="relative overflow-hidden border-y border-ink/10 py-10 mb-20">
        <motion.div
          animate={reduce ? {} : { x: [0, -1000] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-8 font-display text-7xl text-ink/20 lg:text-8xl"
            >
              {item}
              <span className="mx-8 text-ink/10">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <span className="text-micro text-ink/50 mb-8 block">08 — The Pivot</span>

        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-lg text-ink"
        >
          SOMETIMES YOU NEED
          <br />
          SOMETHING <span className="italic text-kumkum">TO CARRY.</span>
        </motion.h2>

        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 font-display text-display-lg text-ink"
        >
          SOMETIMES YOU NEED
          <br />
          SOMETHING <span className="italic text-mayura">TO UNDERSTAND.</span>
        </motion.h2>

        <motion.p
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-12 max-w-md text-lg leading-relaxed text-text-secondary"
        >
          Both are a kind of guidance. Both are part of the same journey.
          <a
            href="#services"
            className="mt-4 block font-semibold text-ink underline decoration-haldi decoration-2 underline-offset-8 transition-colors hover:text-mayura"
          >
            Explore our readings ↓
          </a>
        </motion.p>
      </div>
    </section>
  );
}

export default GuidanceTransition;
