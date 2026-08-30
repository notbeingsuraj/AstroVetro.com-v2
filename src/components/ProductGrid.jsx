import ProductCard from "./ProductCard";
import { FadeIn } from "./Motion";
import products from "../data/products";
import intentions from "../data/intentions";

// Renders the filtered product collection. When an intention is selected it
// only shows products that truly belong to that intention (per data/intentions).
function ProductGrid({ activeIntentionId }) {
  const active = intentions.find((i) => i.id === activeIntentionId);
  const shown = active
    ? products.filter((p) => active.productIds.includes(p.id))
    : products;

  return (
    <section
      id="collection"
      className="relative border-t hairline bg-white py-24 lg:py-32"
      aria-label="Product collection"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="max-w-2xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
            The Collection
          </p>
          <h2 className="font-display text-balance text-5xl leading-tight tracking-tight text-ink sm:text-6xl">
            Objects with intention.
          </h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-ink-soft">
            Thoughtfully selected crystals and meaningful objects for the
            rituals, spaces and moments that matter to you.
            {active && (
              <span className="mt-2 block font-medium text-ink">
                Viewing: {active.title}
              </span>
            )}
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {shown.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.05}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-16 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-8 py-3.5 text-sm font-semibold text-ink transition-colors duration-300 hover:border-ink/40"
          >
            View all pieces
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

export default ProductGrid;
