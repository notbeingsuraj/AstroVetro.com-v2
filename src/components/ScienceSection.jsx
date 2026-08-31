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
        <linearGradient id="sciBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A7DFFF" />
          <stop offset="100%" stopColor="#6C8CFF" />
        </linearGradient>
        <linearGradient id="sciYellow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFE66D" />
          <stop offset="100%" stopColor="#FFB800" />
        </linearGradient>
      </defs>

      {/* Central crystal */}
      <polygon points="300,80 360,220 300,280 240,220" fill="url(#sciBlue)" opacity="0.9" />
      <polygon points="240,220 300,280 260,380 210,340" fill="url(#sciBlue)" opacity="0.7" />
      <polygon points="360,220 300,280 340,380 390,340" fill="url(#sciBlue)" opacity="0.8" />

      {/* Orbital rings */}
      <circle cx="300" cy="280" r="100" fill="none" stroke="#FFE66D" strokeWidth="0.8" opacity="0.4" strokeDasharray="4 4" />
      <circle cx="300" cy="280" r="160" fill="none" stroke="#A7DFFF" strokeWidth="0.8" opacity="0.3" strokeDasharray="4 6" />
      <circle cx="300" cy="280" r="220" fill="none" stroke="#6C8CFF" strokeWidth="0.8" opacity="0.2" strokeDasharray="2 8" />

      {/* Orbiting particles */}
      <circle cx="400" cy="280" r="5" fill="#FFE66D" />
      <circle cx="140" cy="280" r="4" fill="#A7DFFF" />
      <circle cx="80" cy="280" r="3" fill="#6C8CFF" />

      {/* Labels */}
      <g fill="#FFFDF7" opacity="0.7" fontSize="11" fontFamily="Manrope, sans-serif">
        <text x="30" y="30">Fig. 01 — Crystal lattice</text>
        <text x="440" y="380">FORMATION · PRESSURE · TIME · MATTER</text>
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

  return (
    <section
      id="science"
      className="relative overflow-hidden bg-ink py-32 lg:py-48"
      aria-label="Science and spirituality"
    >
      {/* Deep ink background effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Subtle radial glow */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(80% 60% at 50% 50%, rgba(108,140,255,0.06) 0%, transparent 70%)",
        }} />
        {/* Fine grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `linear-gradient(to right, #FFFDF7 1px, transparent 1px), linear-gradient(to bottom, #FFFDF7 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-start pl-8 pt-8">
        <span className="text-section-num text-white/[0.05]">06</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative mx-auto max-w-[1600px] px-6 lg:px-16"
      >
        {/* Header */}
        <div className="mb-20">
          <motion.span variants={fadeUp} className="text-micro text-white/50 mb-6 block">
            06 — The Mineral Universe
          </motion.span>
          <motion.h2 variants={fadeUp} className="font-display text-display-lg text-white">
            NATURE HAS
            <br />
            <span className="italic text-sky">ALWAYS BEEN</span>
            <br />
            STRANGER THAN
            <br />
            <span className="italic text-solar">FICTION.</span>
          </motion.h2>
        </div>

        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Diagram */}
          <motion.div variants={fadeUp} className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden border border-white/10">
              <OrbitDiagram />
            </div>

            {/* Animated connecting lines */}
            <motion.div
              animate={reduce ? {} : { opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute right-0 top-12 h-[2px] w-24 bg-gradient-to-r from-transparent to-accent-blue"
            />
          </motion.div>

          {/* Copy */}
          <motion.div variants={fadeUp} className="order-1 lg:order-2">
            <p className="text-xl leading-relaxed text-white/80 mb-8">
              Every crystal is a geological formation — a distinct structure,
              composition and deep history pressed into stone over millions of
              years.
            </p>
            <p className="text-white/60 leading-relaxed mb-12">
              We honour what a mineral physically is — its chemistry, its
              formation — and we honour the human practice of what it can mean.
              Both can be true, and neither makes unsupported claims about the
              other.
            </p>

            {/* Scientific facts */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
              <div>
                <span className="font-display text-4xl text-sky block mb-2">102</span>
                <p className="text-sm text-white/50">Crystal structures known</p>
              </div>
              <div>
                <span className="font-display text-4xl text-solar block mb-2">~4.5</span>
                <p className="text-sm text-white/50">Billion years old — Earth</p>
              </div>
              <div>
                <span className="font-display text-4xl text-mint block mb-2">SiO₂</span>
                <p className="text-sm text-white/50">Quartz composition</p>
              </div>
              <div>
                <span className="font-display text-4xl text-coral block mb-2">200+</span>
                <p className="text-sm text-white/50">Crystal varieties</p>
              </div>
            </div>

            {/* Responsibility note */}
            <div className="mt-10 border-l-2 border-accent-blue pl-6">
              <p className="text-sm text-white/40">
                AstroVetro celebrates the natural world and its beauty. We do
                not claim that minerals can cure disease, change physical
                energy, or guarantee outcomes — only that they are remarkable
                pieces of the earth.
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
