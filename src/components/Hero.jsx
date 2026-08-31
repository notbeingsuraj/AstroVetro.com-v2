import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./constants";
import HeroScene from "./visual/HeroScene";

function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
  };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
  };

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-ivory"
      aria-label="AstroVetro introduction"
    >
      {/* warm light wash — sunlight entering a gallery */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 0%, rgba(231,200,117,0.16) 0%, rgba(255,255,255,0) 55%), radial-gradient(70% 60% at 8% 15%, rgba(169,215,242,0.12) 0%, rgba(255,255,255,0) 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-28 lg:pt-44">
        {/* Copy */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.p
            variants={item}
            className="mb-7 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-soft"
          >
            <span className="inline-block h-px w-10 bg-solar" />
            Crystals · Objects · Readings
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display text-balance text-[15vw] leading-[0.95] tracking-tight text-ink sm:text-7xl md:text-8xl lg:text-[7.5rem]"
          >
            Find what
            <br />
            <span className="italic text-ink-soft">feels like you.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-9 max-w-md text-pretty text-lg leading-relaxed text-ink-soft"
          >
            AstroVetro is a bright exploration of self, nature and intention.
            Carry something meaningful — or book an experience to understand
            where you are.
          </motion.p>

          {/* Two clear primary paths */}
          <motion.div
            variants={item}
            className="mt-11 flex flex-col gap-4 sm:flex-row sm:gap-4"
          >
            <a
              href="#collection"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-ink/85 sm:px-9"
            >
              Explore the Collection
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-8 py-4 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/40 sm:px-9"
            >
              Explore Readings
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          <motion.p variants={item} className="mt-9 text-sm text-ink-soft">
            Buy something to carry. Or book an experience to understand.
          </motion.p>
        </motion.div>

        {/* Hero visual */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.1 }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-[1.25rem] ring-1 ring-ink/5 shadow-lift lg:max-w-none">
            {/* real hero photography when present, else scene fallback */}
            <picture>
              <source srcSet="/images/hero/hero.webp" type="image/webp" />
              <source srcSet="/images/hero/hero.jpg" type="image/jpeg" />
              <img
                src="/images/hero/hero.jpg"
                alt="A large crystal composition bathed in warm morning light on an ivory surface"
                fetchPriority="high"
                decoding="sync"
                width="1200"
                height="1500"
                className="absolute inset-0 h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </picture>
            <HeroScene className="absolute inset-0 h-full w-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
