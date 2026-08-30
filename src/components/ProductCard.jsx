import ProductImage from "./visual/ProductImage";

// Compact template — used in the collection grid (2/4 columns).
export function ProductCardCompact({ product }) {
  return (
    <a
      href="#"
      className="group block focus:outline-none"
      aria-label={`${product.name} — ${product.tagline} — ₹${product.price}`}
    >
      <ProductImage
        product={product}
        ratio="aspect-square"
        className="rounded-2xl border hairline bg-white"
      />
      <div className="mt-4">
        <h3 className="font-display text-2xl leading-none text-ink">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-ink-soft">{product.tagline}</p>
        <div className="mt-3 flex items-center justify-between">
          <p className="font-medium text-ink">₹{product.price}</p>
          <span className="text-sm font-semibold text-ink transition-colors group-hover:text-champagne">
            View Crystal <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </a>
  );
}

export default ProductCardCompact;
