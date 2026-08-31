import { motion, useReducedMotion } from "framer-motion";

function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="final"
      className="relative overflow-hidden bg-butter-yellow py-32 lg:py-48"
      aria-label="Final call to action"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-section-num text-ink/[0.04]">14</span>
      </div>

      {/* Deep plum accent block */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-[60%] w-[50%] rounded-full bg-deep-plum/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-1/2 h-[50%] w-[40%] rounded-full bg-deep-plum/15 blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <span className="text-micro text-ink/50 mb-8 block">14 — The Invitation</span>

        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-lg text-ink"
        >
          <span className="block">KEEP</span>
          <span className="block">LOOKING</span>
          <span className="block italic text-electric-lilac">CLOSER.</span>
        </motion.h2>

        <motion.p
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-text-secondary"
        >
          Every piece has a story. Find yours.
        </motion.p>

        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
        >
          <a
            href="#collection"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-10 py-5 text-sm font-semibold text-ivory transition-all duration-300 hover:bg-deep-plum hover:shadow-lift sm:w-auto"
          >
            SHOP ASTROVETRO
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#services"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full border-2 border-ink/15 px-10 py-5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/40 sm:w-auto"
          >
            DISCOVER READINGS
          </a>
        </motion.div>
      </div>

      {/* Bottom transition to footer */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-deep-plum/30" />
    </section>
  );
}

export default FinalCTA;
