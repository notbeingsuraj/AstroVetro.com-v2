import { motion, useReducedMotion } from "framer-motion";

// VisualInterlude — a full-bleed positive breathing moment on mint green.
// Minimal copy, dramatic typography. Emotional transition.
function VisualInterlude({ copy = "Made by the earth. Chosen by you." }) {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden bg-peacock py-32 lg:py-48"
      aria-label="Visual interlude"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-section-num text-ink/[0.05]">07</span>
      </div>

      {/* Decorative circles */}
      <motion.div
        animate={reduce ? {} : { rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/10"
      />
      <motion.div
        animate={reduce ? {} : { rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/[0.06]"
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-micro text-ink/60 mb-10 block"
        >
          07 — The Interlude
        </motion.p>

        <motion.h2
          initial={reduce ? {} : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-display-md text-ink"
        >
          {copy}
        </motion.h2>

        <motion.p
          initial={reduce ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-8 max-w-md text-lg leading-relaxed text-ink/70"
        >
          The details are where the wonder is. The less we rush, the more
          a piece of the earth has to say.
        </motion.p>
      </div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-coral/30" />
    </section>
  );
}

export default VisualInterlude;
