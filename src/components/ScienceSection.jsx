import { motion, useReducedMotion } from "framer-motion";

function OrbitDiagram() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="h-full w-full"
      role="img"
      aria-label="Crystal formation scientific diagram"
    >
      <defs>
        <linearGradient id="sciPlum" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B88CFF" />
          <stop offset="100%" stopColor="#321B45" />
        </linearGradient>
        <linearGradient id="sciAqua" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#75E6DA" />
          <stop offset="100%" stopColor="#B88CFF" />
        </linearGradient>
      </defs>

      {/* Central crystal */}
      <polygon points="300,80 360,220 300,280 240,220" fill="url(#sciPlum)" opacity="0.9" />
      <polygon points="240,220 300,280 260,380 210,340" fill="url(#sciPlum)" opacity="0.7" />
      <polygon points="360,220 300,280 340,380 390,340" fill="url(#sciPlum)" opacity="0.8" />

      {/* Orbital rings */}
      <circle cx="300" cy="280" r="100" fill="none" stroke="#75E6DA" strokeWidth="0.8" opacity="0.4" strokeDasharray="4 4" />
      <circle cx="300" cy="280" r="160" fill="none" stroke="#B88CFF" strokeWidth="0.8" opacity="0.3" strokeDasharray="4 6" />
      <circle cx="300" cy="280" r="220" fill="none" stroke="#75E6DA" strokeWidth="0.8" opacity="0.2" strokeDasharray="2 8" />

      {/* Orbiting particles */}
      <circle cx="400" cy="280" r="5" fill="#B88CFF" />
      <circle cx="140" cy="280" r="4" fill="#75E6DA" />
      <circle cx="80" cy="280" r="3" fill="#B88CFF" />

      {/* Labels */}
      <g fill="#FFF9F1" opacity="0.7" fontSize="11" fontFamily="Manrope, sans-serif">
        <text x="30" y="30">Fig. 01 — Crystal lattice</text>
        <text x="420" y="380">FORMATION · PRESSURE · TIME · MATTER</text>
      </g>
    </svg>
  );
}

function ScienceSection() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
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

  const progression = [
    { label: "MINERAL", desc: "A distinct lattice — atoms arranged with precise order." },
    { label: "EARTH", desc: "Formed deep in the crust under stable conditions." },
    { label: "TIME", desc: "Grows over millions of years, one layer at a time." },
    { label: "COSMOS", desc: "The same elements forged in stars across the universe." },
  ];

  return (
    <section
      id="science"
      className="relative overflow-hidden bg-deep-plum py-32 lg:py-48"
      aria-label="Science and spirituality"
    >
      {/* Deep plum background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle radial glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(80% 60% at 50% 50%, rgba(184,140,255,0.06) 0%, transparent 70%)",
        }} />
        {/* Fine grid lines */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(to right, #FFF9F1 1px, transparent 1px), linear-gradient(to bottom, #FFF9F1 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-start pl-8 pt-8">
        <span className="text-section-num text-ivory/[0.03]">06</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto max-w-[1600px] px-6 lg:px-16"
      >
        {/* Header — MATTER / TIME / PRESSURE / FORMATION */}
        <div className="mb-20">
          <motion.span variants={fadeUp} className="text-micro text-ivory/50 mb-6 block">
            06 — The Mineral Universe
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-display-lg text-ivory">
            <span className="block">MATTER.</span>
            <span className="block">TIME.</span>
            <span className="block">PRESSURE.</span>
            <span className="block italic text-electric-lilac">FORMATION.</span>
          </motion.h2>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Diagram */}
          <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden border border-ivory/10">
              <OrbitDiagram />
            </div>

            {/* Animated connecting lines */}
            <motion.div
              animate={reduce ? {} : { opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute right-0 top-12 h-[2px] w-24 bg-gradient-to-r from-transparent to-aqua"
            />
          </motion.div>

          {/* Copy */}
          <motion.div variants={fadeUp} className="order-1 lg:order-2">
            <p className="text-xl leading-relaxed text-ivory/80 mb-8">
              Every crystal is a geological formation — a distinct structure,
              composition and deep history pressed into stone over millions of
              years.
            </p>

            {/* MINERAL → EARTH → TIME → COSMOS progression */}
            <div className="mb-12 space-y-6">
              {progression.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={reduce ? {} : { opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-5 border-l-2 border-electric-lilac/25 pl-6"
                >
                  <span className="shrink-0 font-display text-2xl text-aqua">{item.label}</span>
                  <p className="text-sm leading-relaxed text-ivory/60">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Responsibility note */}
            <div className="mt-10 border-l-2 border-electric-lilac/30 pl-6">
              <p className="text-sm text-ivory/40">
                We honour what a mineral physically is — its chemistry, its
                formation — and we honour the human practice of what it can mean.
                Both can be true, and neither makes unsupported claims about the
                other. AstroVetro does not claim crystals cure disease or
                guarantee outcomes.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-ivory" />
    </section>
  );
}

export default ScienceSection;
