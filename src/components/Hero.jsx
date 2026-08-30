import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./constants";
import HeroScene from "./visual/HeroScene";
import EditorialGrid from "./visual/EditorialGrid";

function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
  };

  return (
    <section id="top" className="relative overflow-hidden bg-ivory">
      <EditorialGrid className="opacity-60" />
      {/* warm light wash */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 80% 0%, rgba(230,200,117,0.18) 0%, rgba(255,255,255,0) 55%), radial-gradient(80% 70% at 10% 20%, rgba(158,199,227,0.14) 0%, rgba(255,255,255,0) 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-24 pt-32 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-40">
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
            Premium crystals · Objects · Intuitive guidance
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
            AstroVetro is a modern exploration of self, nature, cosmos and
            intention. Thoughtfully selected crystals and meaningful objects —
            and guidance for the moments when you need a new perspective.
          </motion.p>

          {/* Two clear primary paths */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-4"
          >
            <a
              href="#collection"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black sm:px-8"
            >
              Explore the Collection
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-7 py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/40 sm:px-8"
            >
              Explore Readings
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-8 text-sm text-ink-soft"
          >
            <span className="mr-2 inline-block h-px w-8 translate-y-[-3px] bg-champagne" />
            Buy something to carry. Or book an experience to understand.
          </motion.p>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, ease: EASE, delay: 0.15 }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] ring-1 ring-ink/5 shadow-lift lg:max-w-none">
            <HeroScene className="h-full w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
