import ProductImage from "./visual/ProductImage";

// ProductCard — editorial collection card. Shows name, short tagline,
// real price and an Explore CTA. Uses real photography (or SVG fallback).
export function ProductCardCompact({ product }) {
  return (
    <a
      href="#"
      className="group block focus:outline-none"
      aria-label={`${product.name} — ${product.tagline} — ₹${product.price}`}
    >
      <div className="overflow-hidden rounded-md border border-ink/8 bg-white">
        <ProductImage
          product={product}
          ratio="aspect-square"
          className="w-full"
        />
      </div>
      <div className="mt-5">
        <h3 className="font-display text-2xl leading-none text-ink">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm text-ink-soft">{product.tagline}</p>
        <div className="mt-4 flex items-baseline justify-between border-t border-ink/8 pt-4">
          <p className="font-medium text-ink">₹{product.price}</p>
          <span className="text-xs font-semibold uppercase tracking-widest text-ink/60 transition-colors group-hover:text-ink">
            Explore <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default ProductCardCompact;
