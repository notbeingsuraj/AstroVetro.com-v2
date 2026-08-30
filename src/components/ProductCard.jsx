import { useReducedMotion } from "framer-motion";

function ProductCard({ product }) {
  const reduce = useReducedMotion();
  return (
    <a
      href="#"
      className="group block"
      aria-label={`${product.name} — ${product.tagline} — ₹${product.price}`}
    >
      <div
        className="relative aspect-square overflow-hidden rounded-2xl border hairline bg-white transition-shadow duration-500 group-hover:shadow-lift"
        style={{
          background: `radial-gradient(120% 120% at 30% 20%, ${product.soft}55 0%, rgba(255,255,255,0) 60%)`,
        }}
      >
        {/* Mineral crystal silhouette */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <svg
            viewBox="0 0 200 240"
            className="h-full w-auto drop-shadow-soft transition-transform duration-700 group-hover:scale-105"
            role="img"
            aria-label={product.name}
          >
            <defs>
              <linearGradient id={`grad-${product.id}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={product.light} />
                <stop offset="55%" stopColor={product.color} />
                <stop offset="100%" stopColor={product.dark} />
              </linearGradient>
            </defs>
            <path
              d="M100 8 L145 210 L100 232 L55 210 Z"
              fill={`url(#grad-${product.id})`}
              stroke="#ffffff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
            <g stroke="#ffffff" strokeWidth="0.6" fill="none">
              <path d="M100 14 L145 210" />
              <path d="M100 50 L55 210" />
              <path d="M100 90 L145 150" />
            </g>
          </svg>
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between">
        <h3 className="font-display text-2xl text-ink">{product.name}</h3>
        <p className="text-sm font-medium text-ink-soft">₹{product.price}</p>
      </div>
      <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
    </a>
  );
}

export default ProductCard;
