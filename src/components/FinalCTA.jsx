import { motion, useReducedMotion } from "framer-motion";

function FinalCTA() {
  const reduce = useReducedMotion();

  return (
    <section
      id="final"
      className="relative overflow-hidden bg-ink py-32 lg:py-48"
      aria-label="Final call to action"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-section-num text-white/[0.04]">12</span>
      </div>

      {/* Accent glows */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-accent-blue/[0.08] blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-solar/[0.08] blur-[100px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <span className="text-micro text-white/50 mb-8 block">12 — The Invitation</span>

        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-lg text-white"
        >
          START WITH WHAT
          <br />
          <span className="italic text-solar">FEELS LIKE YOU.</span>
        </motion.h2>

        <motion.p
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-white/70"
        >
          Carry something meaningful. Or make space for a new perspective.
          Either way, begin.
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
            className="group inline-flex w-full items-center justify-center gap-3 bg-solar px-10 py-5 text-sm font-semibold text-ink transition-all duration-300 hover:shadow-glow-solar sm:w-auto"
          >
            Explore the Collection
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#services"
            className="group inline-flex w-full items-center justify-center gap-3 border-2 border-white/20 px-10 py-5 text-sm font-semibold text-white transition-colors duration-300 hover:border-solar sm:w-auto"
          >
            Book a Reading
          </a>
        </motion.div>
      </div>

      {/* Bottom transition to footer */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#D9C2FF]" />
    </section>
  );
}

export default FinalCTA;
