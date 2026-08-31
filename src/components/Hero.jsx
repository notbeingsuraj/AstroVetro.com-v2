import { useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import HeroScene from "./visual/HeroScene";

function Hero() {
  const reduce = useReducedMotion();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroFailed, setHeroFailed] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax transforms
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Cursor-following glow (desktop only)
  useEffect(() => {
    if (reduce) return;
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [reduce]);

  // Animation sequence
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: reduce ? {} : { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scaleIn = {
    hidden: reduce ? {} : { opacity: 0, scale: 0.85 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const slideFromRight = {
    hidden: reduce ? {} : { opacity: 0, x: 100 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden bg-ivory"
      aria-label="AstroVetro introduction"
    >
      {/* Cursor-following glow */}
      {!reduce && (
        <div
          className="pointer-events-none absolute inset-0 opacity-30 transition-opacity duration-700"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(167,223,255,0.15), transparent 60%)`,
          }}
        />
      )}

      {/* Large color accent block — muted peacock glow */}
      <motion.div
        initial={reduce ? {} : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute -right-32 top-0 h-[60vh] w-[40vw] rounded-full bg-peacock/60 blur-[110px]"
      />

      {/* Turmeric-gold glow */}
      <motion.div
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute -left-20 top-1/3 h-80 w-80 rounded-full bg-sand/60 blur-[90px]"
      />

      {/* Grid lines — architectural drafting background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-ink) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-ink) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }} />
      </div>

      {/* Main content grid */}
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] items-center gap-12 px-6 pb-24 pt-32 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:pt-40">
        
        {/* LEFT: Typography + CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ y: textY, opacity }}
          className="relative z-10 lg:col-span-6"
        >
          {/* Micro label */}
          <motion.div variants={fadeUp} className="mb-8">
            <span className="text-micro text-text-muted">
              01 — The Arrival
            </span>
          </motion.div>

          {/* MASSIVE headline */}
          <motion.h1 variants={fadeUp} className="mb-8">
            <span className="block font-display text-display-xl text-ink">
              THE EARTH
            </span>
            <span className="block font-display text-display-xl text-ink">
              LEFT SOMETHING
            </span>
            <span className="block font-display text-display-xl italic text-kesari">
              FOR YOU.
            </span>
          </motion.h1>

          {/* Supporting copy — narrow editorial column */}
          <motion.p
            variants={fadeUp}
            className="mb-12 max-w-md text-lg leading-relaxed text-text-secondary"
          >
            Crystals, objects and readings — thoughtfully selected to
            connect you with nature's quiet intelligence.
          </motion.p>

          {/* Primary CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 sm:flex-row sm:gap-5"
          >
            <a
              href="#collection"
              className="group inline-flex items-center justify-center gap-3 bg-ink px-10 py-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-ink-deep hover:shadow-lift"
            >
              Explore the Collection
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-3 border-2 border-ink/15 px-10 py-5 text-sm font-semibold text-ink transition-all duration-300 hover:border-ink/40"
            >
              Explore Readings
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </motion.div>

          {/* Floating editorial label */}
          <motion.div
            variants={slideFromRight}
            className="absolute -right-8 top-0 hidden lg:block"
          >
            <span className="block font-display text-[120px] leading-none text-ink/[0.04]">
              01
            </span>
          </motion.div>
        </motion.div>

        {/* RIGHT: Hero Image Composition */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          style={{ y: imageY }}
          className="relative lg:col-span-6"
        >
          {/* Main image container */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] md:max-w-[500px] lg:ml-auto lg:max-w-[520px]">
            {/* Background color block */}
            <div className="absolute inset-4 bg-peacock/40" />
            
            {/* Image with clip-path reveal */}
            <motion.div
              initial={reduce ? {} : { clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full overflow-hidden"
            >
              {/* Hero crystal image (real photography w/ graceful SVG fallback) */}
              {!heroFailed ? (
                <picture className="absolute inset-0">
                  <source srcSet="/images/hero/hero.webp" type="image/webp" />
                  <source srcSet="/images/hero/hero.jpg" type="image/jpeg" />
                  <img
                    src="/images/hero/hero.jpg"
                    alt="A large amethyst crystal formation bathed in warm natural light"
                    fetchPriority="high"
                    decoding="sync"
                    width="1200"
                    height="1500"
                    onError={() => setHeroFailed(true)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </picture>
              ) : (
                <HeroScene className="absolute inset-0 h-full w-full" />
              )}
            </motion.div>

            {/* Floating editorial labels */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="absolute left-0 top-12 bg-ink px-4 py-2"
            >
              <span className="text-micro text-white">NATURAL · MINERAL</span>
            </motion.div>

            <motion.div
              initial={reduce ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="absolute right-0 bottom-24 bg-white px-4 py-2 shadow-soft"
            >
              <span className="text-micro text-ink">ETHICALLY SOURCED</span>
            </motion.div>

            {/* Orbital decorative element */}
            <motion.div
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full border border-ink/10"
            />
            <motion.div
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -left-4 bottom-8 h-20 w-20 rounded-full border border-mayura/25"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={reduce ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-micro text-text-muted">Scroll</span>
          <div className="h-12 w-px bg-ink/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
