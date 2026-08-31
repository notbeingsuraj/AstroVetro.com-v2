import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

function BrandStatement() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: reduce ? {} : { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="brand"
      className="relative overflow-hidden bg-sky py-32 lg:py-48"
      aria-label="Brand statement"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="text-section-num text-ink/[0.04]">02</span>
      </div>

      {/* Editorial grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: '120px 120px',
        }} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        style={{ scale }}
        className="relative mx-auto max-w-6xl px-6 text-center lg:px-16"
      >
        {/* Section label */}
        <motion.div variants={fadeUp} className="mb-12">
          <span className="text-micro text-ink/60">02 — The Manifesto</span>
        </motion.div>

        {/* MASSIVE editorial statement */}
        <motion.h2 variants={fadeUp} className="mb-16">
          <span className="block font-display text-display-xl text-ink">
            WE ARE
          </span>
          <span className="block font-display text-display-xl text-ink">
            MADE OF
          </span>
          <span className="block font-display text-display-xl text-ink">
            THE SAME
          </span>
          <span className="block font-display text-display-xl text-ink">
            MATTER AS
          </span>
          <span className="block font-display text-display-xl italic text-accent-blue">
            THE STARS.
          </span>
        </motion.h2>

        {/* Supporting copy — narrow editorial column */}
        <motion.div variants={fadeUp} className="mx-auto max-w-lg">
          <p className="text-lg leading-relaxed text-ink/70">
            Every crystal began as silence and pressure. Every reading begins as
            a question. AstroVetro exists at the meeting point — where earth
            meets intention.
          </p>
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, rotate: -12 }}
          whileInView={{ opacity: 1, rotate: -12 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute -left-8 top-1/4 hidden lg:block"
        >
          <div className="h-32 w-px bg-ink/20" />
          <span className="mt-4 block text-micro text-ink/40">EST. 2024</span>
        </motion.div>

        <motion.div
          initial={reduce ? {} : { opacity: 0, rotate: 12 }}
          whileInView={{ opacity: 1, rotate: 12 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute -right-8 bottom-1/4 hidden lg:block"
        >
          <div className="h-32 w-px bg-ink/20" />
          <span className="mt-4 block text-micro text-ink/40">CRYSTALS · READINGS</span>
        </motion.div>
      </motion.div>

      {/* Bottom transition gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-ivory" />
    </section>
  );
}

export default BrandStatement;
