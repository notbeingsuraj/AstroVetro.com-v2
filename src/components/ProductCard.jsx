import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import MineralScene from "./visual/MineralScene";

const SIZE_STYLES = {
  lg: {
    titleSize: "text-3xl lg:text-4xl",
    priceSize: "text-xl lg:text-2xl",
  },
  md: {
    titleSize: "text-2xl lg:text-3xl",
    priceSize: "text-lg lg:text-xl",
  },
  sm: {
    titleSize: "text-xl lg:text-2xl",
    priceSize: "text-lg",
  },
};

function ProductCard({ product, size = "md", index = 0 }) {
  const reduce = useReducedMotion();
  const styles = SIZE_STYLES[size] || SIZE_STYLES.md;
  const [failed, setFailed] = useState(false);

  return (
    <motion.a
      href="#"
      initial={reduce ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block h-full w-full"
      aria-label={`${product.name} — ${product.tagline} — ₹${product.price}`}
    >
      {/* Image container — loads real photography, falls back to mineral scene */}
      <div className={`relative w-full overflow-hidden ${size === "sm" ? "aspect-[3/4]" : "aspect-[4/5]"} bg-gauri`}>
        {!failed ? (
          <picture className="absolute inset-0 h-full w-full">
            <source srcSet={product.image} type="image/webp" />
            <source srcSet={product.poster} type="image/jpeg" />
            <img
              src={product.poster || product.image}
              alt={`${product.name} — ${product.tagline}`}
              loading="lazy"
              decoding="async"
              width="800"
              height="900"
              onError={() => setFailed(true)}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          </picture>
        ) : (
          <MineralScene
            id={product.id}
            className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        )}

        {/* Hover reveal */}
        <div className="pointer-events-none absolute inset-0 flex items-end justify-end bg-gradient-to-t from-shyama/0 to-shyama/0 p-4 opacity-0 transition-all duration-300 group-hover:from-shyama/20 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gauri/95 text-shyama shadow-soft transition-transform duration-300 group-hover:scale-110">
            →
          </span>
        </div>
      </div>

      {/* Product metadata — aligned editorial */}
      <div className="mt-5 flex items-start justify-between gap-4 border-b border-shyama/8 pb-4">
        <div className="min-w-0">
          <h3 className={`font-display ${styles.titleSize} leading-tight text-shyama`}>
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{product.tagline}</p>
        </div>
        <p className={`${styles.priceSize} shrink-0 font-medium text-shyama`}>
          ₹{product.price}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-micro text-text-muted capitalize">{product.category}</span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-shyama transition-colors group-hover:text-mayura">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.a>
  );
}

export default ProductCard;
