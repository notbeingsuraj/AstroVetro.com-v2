import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "./constants";
import products from "../data/products";

function ProductFeature() {
  const reduce = useReducedMotion();
  const featured = products.find((p) => p.featured);

  if (!featured) return null;

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: reduce ? {} : { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scaleIn = {
    hidden: reduce ? {} : { opacity: 0, scale: 0.9 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-ivory py-32 lg:py-48"
      aria-label="Featured crystal"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-start pl-8">
        <span className="text-section-num text-ink/[0.04]">04</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20"
        >
          {/* LEFT: Product Image */}
          <motion.div variants={scaleIn} className="relative order-2 lg:order-1">
            {/* Color block behind image */}
            <div 
              className="absolute inset-8"
              style={{ backgroundColor: featured.color + "30" }}
            />
            
            {/* Main image */}
            <div className="relative aspect-[4/5] w-full max-w-[500px] mx-auto overflow-hidden">
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{ backgroundColor: featured.color + "20" }}
              >
                {/* SVG Crystal */}
                <svg viewBox="0 0 300 400" className="h-3/4 w-3/4 opacity-80">
                  <defs>
                    <linearGradient id="amethystGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={featured.color} />
                      <stop offset="100%" stopColor="#D9C2FF" />
                    </linearGradient>
                  </defs>
                  <polygon points="150,20 200,150 150,180 100,150" fill="url(#amethystGrad)" opacity="0.9" />
                  <polygon points="100,150 150,180 130,300 80,260" fill="url(#amethystGrad)" opacity="0.7" />
                  <polygon points="200,150 150,180 170,300 220,260" fill="url(#amethystGrad)" opacity="0.8" />
                  <polygon points="130,300 170,300 150,380" fill="url(#amethystGrad)" opacity="0.6" />
                </svg>
              </div>
            </div>

            {/* Floating label */}
            <motion.div
              initial={reduce ? {} : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -left-4 top-12 bg-ink px-4 py-2"
            >
              <span className="text-micro text-white">FEATURED</span>
            </motion.div>
          </motion.div>

          {/* RIGHT: Product Story */}
          <motion.div variants={fadeUp} className="order-1 lg:order-2">
            <span className="text-micro text-ink/50 mb-6 block">04 — The Object</span>
            
            <h2 className="font-display text-display-lg text-ink mb-4">
              {featured.name.toUpperCase()}
            </h2>
            
            <p className="font-display text-display-sm italic text-accent-blue mb-8">
              {featured.tagline}
            </p>

            <p className="max-w-md text-lg leading-relaxed text-text-secondary mb-12">
              {featured.description}
            </p>

            <div className="mb-8">
              <span className="font-display text-4xl text-ink">₹{featured.price}</span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#collection"
                className="group inline-flex items-center justify-center gap-3 bg-ink px-10 py-5 text-sm font-semibold text-white transition-all duration-300 hover:bg-ink-deep hover:shadow-lift"
              >
                View Crystal
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
              <a
                href="#collection"
                className="group inline-flex items-center justify-center gap-3 border-2 border-ink/15 px-10 py-5 text-sm font-semibold text-ink transition-all duration-300 hover:border-ink/40"
              >
                Shop Now
              </a>
            </div>

            {/* Product details */}
            <div className="mt-12 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8">
              <div>
                <span className="text-micro text-ink/50 block mb-2">INTENTION</span>
                <p className="text-sm text-ink">{featured.intention.join(" · ")}</p>
              </div>
              <div>
                <span className="text-micro text-ink/50 block mb-2">CATEGORY</span>
                <p className="text-sm text-ink capitalize">{featured.category}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default ProductFeature;
