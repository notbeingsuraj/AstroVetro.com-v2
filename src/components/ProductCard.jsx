import { motion, useReducedMotion } from "framer-motion";

const SIZE_STYLES = {
  lg: {
    width: "lg:w-[420px]",
    imageHeight: "aspect-[4/5]",
    titleSize: "text-4xl",
    priceSize: "text-2xl",
  },
  md: {
    width: "lg:w-[340px]",
    imageHeight: "aspect-square",
    titleSize: "text-3xl",
    priceSize: "text-xl",
  },
  sm: {
    width: "lg:w-[280px]",
    imageHeight: "aspect-[4/3]",
    titleSize: "text-2xl",
    priceSize: "text-lg",
  },
};

function ProductCard({ product, size = "md", index = 0 }) {
  const reduce = useReducedMotion();
  const styles = SIZE_STYLES[size] || SIZE_STYLES.md;

  return (
    <motion.a
      href="#"
      initial={reduce ? {} : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: (index % 3) * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative block w-full ${styles.width} flex-shrink-0`}
      aria-label={`${product.name} — ${product.tagline} — ₹${product.price}`}
    >
      {/* Image container */}
      <div className={`relative w-full overflow-hidden ${styles.imageHeight}`}>
        {/* Bespoke color-tinted image surface */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: product.color + "30" }}
        >
          {/* SVG crystal placeholder */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <svg viewBox="0 0 200 200" className="h-full w-full max-h-40 opacity-70">
              <defs>
                <linearGradient id={`grad-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={product.color} />
                  <stop offset="100%" stopColor="#FFFDF7" />
                </linearGradient>
              </defs>
              <polygon points="100,10 130,90 100,110 70,90" fill={`url(#grad-${product.id})`} />
              <polygon points="70,90 100,110 85,180 55,150" fill={`url(#grad-${product.id})`} opacity="0.8" />
              <polygon points="130,90 100,110 115,180 145,150" fill={`url(#grad-${product.id})`} opacity="0.9" />
            </svg>
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/10 group-hover:opacity-100">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft transition-transform duration-300 group-hover:scale-110">
            →
          </span>
        </div>
      </div>

      {/* Product metadata — editorial */}
      <div className="mt-5 flex items-start justify-between border-b border-ink/10 pb-4">
        <div>
          <h3 className={`font-display ${styles.titleSize} leading-tight text-ink`}>
            {product.name.toUpperCase()}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{product.tagline}</p>
        </div>
        <p className={`${styles.priceSize} font-medium text-ink`}>₹{product.price}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-micro text-ink/50 capitalize">{product.category}</span>
        <span className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent-blue">
          Explore
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </motion.a>
  );
}

export default ProductCard;
