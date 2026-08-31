import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import products from "../data/products";
import intentions from "../data/intentions";

const CATEGORIES = [
  { id: null, label: "All" },
  { id: "crystals", label: "Crystals" },
  { id: "jewellery", label: "Jewellery" },
  { id: "objects", label: "Objects" },
  { id: "gifts", label: "Gifts" },
];

// Visually rich, asymmetric catalogue layout
// Pattern: BIG - SMALL - MEDIUM - BIG - SMALL - MEDIUM...
const CARD_SIZES = ["lg", "sm", "md", "lg", "sm", "md"];

function ProductGrid({ activeIntentionId }) {
  const reduce = useReducedMotion();
  const active = intentions.find((i) => i.id === activeIntentionId);
  const [category, setCategory] = useState(null);
  const shown = active
    ? products.filter((p) => active.productIds.includes(p.id))
    : category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <section
      id="collection"
      className="relative overflow-hidden bg-ivory py-32 lg:py-48"
      aria-label="Product collection"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end pr-8 pb-8">
        <span className="text-section-num text-ink/[0.04]">05</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <span className="text-micro text-ink/50 mb-6 block">05 — The Objects</span>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <h2 className="font-display text-display-md text-ink">
              OBJECTS WITH
              <br />
              <span className="italic text-accent-blue">ENERGY.</span>
            </h2>
            {active && (
              <p className="text-lg text-text-secondary">
                Viewing: <span className="font-semibold text-ink">{active.title}</span>
              </p>
            )}
          </div>
        </div>

        {/* Category navigation — giant typography */}
        <div className="mb-16 flex flex-wrap gap-8 border-b border-ink/10 pb-8">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.label}
              type="button"
              onClick={() => setCategory(cat.id)}
              whileHover={reduce ? {} : { scale: 1.02 }}
              className="group relative"
            >
              <span
                className={`font-display text-3xl transition-colors duration-300 ${
                  category === cat.id
                    ? "text-accent-blue"
                    : "text-ink/50 group-hover:text-ink"
                }`}
              >
                {cat.label}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: category === cat.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-8 left-0 right-0 h-[3px] origin-left bg-accent-blue"
              />
            </motion.button>
          ))}

          {active && (
            <button
              type="button"
              onClick={() => document.getElementById("intentions")?.scrollIntoView({ behavior: "smooth" })}
              className="ml-auto text-sm font-semibold text-ink/60 underline decoration-accent-blue decoration-2 underline-offset-4 transition-colors hover:text-ink"
            >
              Show all pieces
            </button>
          )}
        </div>

        {/* Asymmetric collection grid */}
        <div className="flex flex-wrap gap-6 lg:gap-8">
          {shown.map((product, i) => {
            const size = CARD_SIZES[i % CARD_SIZES.length];
            return (
              <ProductCard key={product.id} product={product} size={size} index={i} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
