import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./Motion";

function OrbitalDiagram() {
  return (
    <svg
      viewBox="0 0 600 600"
      className="absolute inset-0 h-full w-full opacity-[0.06]"
      aria-hidden="true"
    >
      <g fill="none" stroke="#171717">
        <circle cx="300" cy="300" r="120" strokeWidth="0.5" />
        <circle cx="300" cy="300" r="210" strokeWidth="0.25" />
        <ellipse cx="300" cy="300" rx="290" ry="120" strokeWidth="0.25" />
        <ellipse
          cx="300"
          cy="300"
          rx="120"
          ry="290"
          strokeWidth="0.25"
          transform="rotate(45 300 300)"
        />
        <circle cx="300" cy="180" r="3" fill="#171717" />
        <circle cx="490" cy="300" r="2" fill="#171717" />
      </g>
    </svg>
  );
}

function CrystalVisual() {
  return (
    <svg
      viewBox="0 0 480 560"
      className="h-full w-full"
      role="img"
      aria-label="Abstract crystalline mineral formation"
    >
      <defs>
        <linearGradient id="crystalBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e6c875" />
          <stop offset="45%" stopColor="#faf9f5" />
          <stop offset="100%" stopColor="#9ec7e3" />
        </linearGradient>
        <linearGradient id="crystalShade" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#c9bde0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#e6c875" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="softBlur">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* glow */}
      <circle cx="240" cy="250" r="200" fill="url(#glow)" filter="url(#softBlur)" />

      {/* central crystal cluster */}
      <g>
        {/* tall central point */}
        <path
          d="M240 40 L300 620 L180 620 Z"
          fill="url(#crystalBody)"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        <path
          d="M240 40 L300 620 L246 620 Z"
          fill="url(#crystalShade)"
        />
        {/* inner facet lines */}
        <g stroke="#ffffff" strokeWidth="0.8" fill="none">
          <path d="M240 120 L300 620" />
          <path d="M240 160 L180 620" />
          <path d="M240 200 L300 400" />
          <path d="M240 260 L180 460" />
        </g>

        {/* left point */}
        <path
          d="M180 60 L220 580 L120 540 Z"
          fill="url(#crystalBody)"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.92"
        />
        <path
          d="M180 60 L220 580 L176 570 Z"
          fill="url(#crystalShade)"
          opacity="0.6"
        />

        {/* right point */}
        <path
          d="M310 90 L340 600 L280 560 Z"
          fill="url(#crystalBody)"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.85"
        />
        <path
          d="M310 90 L340 600 L318 596 Z"
          fill="url(#crystalShade)"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: EASE },
    },
  };

  return (
    <section id="top" className="relative overflow-hidden bg-ivory">
      {/* soft top tint */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(230,200,117,0.12) 0%, rgba(158,199,227,0.06) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-36 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-44">
        {/* Copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-6"
        >
          <motion.p
            variants={item}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-ink-soft"
          >
            Crystals · Objects · Intuitive Guidance
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-balance text-6xl leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
          >
            Find what
            <br />
            <span className="italic text-ink-soft">resonates.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-md text-pretty text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            Explore crystals, meaningful objects and intuitive guidance
            inspired by the connection between what we carry, what we feel
            and the world around us.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-4 sm:gap-6"
          >
            <a
              href="#collection"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black"
            >
              Explore the Collection
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#intentions"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/40"
            >
              Find Your Crystal
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-6">
            <a
              href="#guidance"
              className="text-sm font-medium text-ink-soft underline decoration-champagne decoration-1 underline-offset-8 transition-colors hover:text-ink"
            >
              Book a Reading →
            </a>
          </motion.div>
        </motion.div>

        {/* Visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-md lg:max-w-none">
            <OrbitalDiagram />
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative h-full"
            >
              <CrystalVisual />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
