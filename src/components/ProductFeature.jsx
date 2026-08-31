import ProductImage from "./visual/ProductImage";
import { FadeIn, SectionLabel } from "./Motion";
import products from "../data/products";

function ProductFeature() {
  const featured = products.find((p) => p.id === "amethyst");

  return (
    <section
      className="relative border-t border-ink/8 bg-ivory py-24 lg:py-32"
      aria-label="Featured piece"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn>
          <SectionLabel index={2}>A piece to begin with</SectionLabel>
        </FadeIn>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Large product image (asymmetric feature column) */}
          <FadeIn className="lg:col-span-7">
            <div className="group overflow-hidden rounded-md border border-ink/8 bg-white shadow-soft">
              <ProductImage
                product={featured}
                ratio="aspect-[4/5]"
                eager={false}
                className="w-full"
              />
            </div>
          </FadeIn>

          {/* Copy */}
          <FadeIn delay={0.1} className="lg:col-span-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-lavender" />
              Featured
            </span>
            <h3 className="mt-7 font-display text-5xl tracking-tight text-ink sm:text-6xl">
              {featured.name}
            </h3>
            <p className="mt-4 text-lg text-ink-soft">{featured.tagline}</p>
            <p className="mt-5 max-w-md text-pretty leading-relaxed text-ink-soft">
              {featured.description}
            </p>

            <div className="mt-8 flex items-center gap-6">
              <p className="text-3xl font-medium text-ink">
                ₹{featured.price}
              </p>
              <a
                href="#"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-ink/85"
              >
                View Crystal
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

export default ProductFeature;
