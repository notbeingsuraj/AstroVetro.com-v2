import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import products from "../data/products";
import intentions from "../data/intentions";
import ProductCard from "./ProductCard";

const CATEGORIES = [
  { id: null, label: "All" },
  { id: "crystals", label: "Crystals" },
  { id: "jewellery", label: "Jewellery" },
  { id: "objects", label: "Objects" },
  { id: "gifts", label: "Gifts" },
];

// Asymmetric editorial gallery rhythm: spans define a varied, museum-style grid.
// Pattern: LARGE / SMALL / MEDIUM / LARGE / SMALL / MEDIUM...
const CARD_SPANS = [
  { span: "md:col-span-6", size: "lg" },
  { span: "md:col-span-3", size: "sm" },
  { span: "md:col-span-3", size: "md" },
  { span: "md:col-span-6", size: "lg" },
  { span: "md:col-span-3", size: "sm" },
  { span: "md:col-span-3", size: "md" },
];

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
      className="relative overflow-hidden bg-dugdha py-32 lg:py-48"
      aria-label="Product collection"
    >
      {/* Large background number */}
      <div className="pointer-events-none absolute inset-0 flex items-end justify-end pr-8 pb-8">
        <span className="text-section-num text-shyama/[0.03]">05</span>
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-16">
        {/* Header */}
        <div className="mb-16">
          <span className="text-micro text-shyama/50 mb-6 block">05 — The Objects</span>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-display-md text-shyama">
              OBJECTS WITH
              <br />
              <span className="italic text-mayura">ENERGY.</span>
            </h2>
            {active && (
              <p className="text-lg text-text-secondary">
                Viewing: <span className="font-semibold text-shyama">{active.title}</span>
              </p>
            )}
          </div>
        </div>

        {/* Category navigation — giant typography */}
        <div className="mb-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-shyama/8 pb-8">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat.label}
              type="button"
              onClick={() => setCategory(cat.id)}
              whileHover={reduce ? {} : { scale: 1.02 }}
              className="group relative pb-2"
            >
              <span
                className={`font-display text-2xl transition-colors duration-300 sm:text-3xl ${
                  category === cat.id
                    ? "text-mayura"
                    : "text-text-secondary group-hover:text-shyama"
                }`}
              >
                {cat.label}
              </span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: category === cat.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-[3px] origin-left bg-mayura"
              />
            </motion.button>
          ))}

          {active && (
            <button
              type="button"
              onClick={() => document.getElementById("intentions")?.scrollIntoView({ behavior: "smooth" })}
              className="ml-auto text-sm font-semibold text-text-secondary underline decoration-kesari decoration-2 underline-offset-4 transition-colors hover:text-shyama"
            >
              Show all pieces
            </button>
          )}
        </div>

        {/* Asymmetric collection grid — museum gallery rhythm */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-12 md:gap-x-8">
          {shown.map((product, i) => {
            const layout = CARD_SPANS[i % CARD_SPANS.length];
            return (
              <div key={product.id} className={`col-span-1 ${layout.span}`}>
                <ProductCard product={product} size={layout.size} index={i} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductGrid;
