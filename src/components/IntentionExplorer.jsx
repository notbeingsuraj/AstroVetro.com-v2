import { useState, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import intentions from "../data/intentions";
import products from "../data/products";

function IntentionExplorer({ activeIntentionId, onSelect }) {
  const reduce = useReducedMotion();
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);

  const activeIntention = intentions.find((i) => i.id === (hoveredId || activeIntentionId));
  const matchingProducts = activeIntention
    ? activeIntention.productIds
        .map((id) => products.find((p) => p.id === id))
        .filter(Boolean)
    : [];

  return (
    <section
      id="intentions"
      className="relative overflow-hidden bg-solar py-32 lg:py-48"
      aria-label="Explore by intention"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-end pr-8 pt-8">
        <span className="text-section-num text-ink/[0.06]">03</span>
      </div>

      {/* Editorial grid lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, var(--color-ink) 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
        }} />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-20 lg:mb-32">
          <span className="text-micro text-ink/60 mb-6 block">03 — The Discovery</span>
          <h2 className="font-display text-display-lg text-ink">
            WHAT ARE YOU
            <br />
            <span className="italic">LOOKING FOR?</span>
          </h2>
        </div>

        {/* Interactive intention field */}
        <div ref={containerRef} className="relative">
          {/* Intentions as large interactive words */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-10">
            {intentions.map((intention, i) => {
              const isActive = activeIntentionId === intention.id;
              const isHovered = hoveredId === intention.id;

              return (
                <motion.button
                  key={intention.id}
                  type="button"
                  onClick={() => onSelect(intention.id)}
                  onMouseEnter={() => setHoveredId(intention.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={reduce ? {} : { opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduce ? {} : { scale: 1.02 }}
                  className="group relative text-left"
                  aria-pressed={isActive}
                >
                  {/* Color wash on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isActive || isHovered ? 0.3 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute -inset-4 rounded-lg"
                    style={{ backgroundColor: intention.color }}
                  />

                  <div className="relative">
                    {/* Intention number */}
                    <span className="text-micro text-ink/40 mb-3 block">
                      0{i + 1}
                    </span>

                    {/* Large intention word */}
                    <motion.span
                      animate={{
                        color: isActive ? intention.color : "var(--color-ink)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="block font-display text-5xl lg:text-7xl transition-all duration-300"
                    >
                      {intention.title.toUpperCase()}
                    </motion.span>

                    {/* Description — appears on hover/active */}
                    <AnimatePresence>
                      {(isActive || isHovered) && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 text-sm leading-relaxed text-ink/70 max-w-[200px]"
                        >
                          {intention.description}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Underline accent */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-4 h-1 origin-left"
                      style={{ backgroundColor: intention.color }}
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Matching products preview */}
          <AnimatePresence>
            {matchingProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-16 border-t border-ink/10 pt-12"
              >
                <p className="text-micro text-ink/50 mb-6">
                  {matchingProducts.length} {matchingProducts.length === 1 ? "piece" : "pieces"} for{" "}
                  {activeIntention?.title.toLowerCase()}
                </p>

                <div className="flex gap-6 overflow-x-auto pb-4">
                  {matchingProducts.map((product) => (
                    <motion.a
                      key={product.id}
                      href="#collection"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="group flex-shrink-0"
                    >
                      <div
                        className="relative h-48 w-48 overflow-hidden lg:h-64 lg:w-64"
                        style={{ backgroundColor: product.color + "40" }}
                      >
                        {/* Product image or gradient placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-display text-4xl text-ink/20">
                            {product.name.charAt(0)}
                          </span>
                        </div>
                        
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-ink/0 transition-colors duration-300 group-hover:bg-ink/10" />
                      </div>
                      <div className="mt-4">
                        <p className="font-display text-lg">{product.name}</p>
                        <p className="text-micro text-ink/50 mt-1">₹{product.price}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                <a
                  href="#collection"
                  className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-blue"
                >
                  View all pieces
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-ivory" />
    </section>
  );
}

export default IntentionExplorer;
