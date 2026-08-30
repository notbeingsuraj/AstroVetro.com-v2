import ProductImage from "./visual/ProductImage";
import { FadeIn } from "./Motion";
import products from "../data/products";

function ProductFeature() {
  const featured = products.find((p) => p.id === "amethyst");

  return (
    <section
      className="relative bg-ivory py-24 lg:py-32"
      aria-label="Featured piece"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <FadeIn className="mb-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-champagne">
            A piece to begin with
          </p>
        </FadeIn>

        <FadeIn className="mt-10 grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          {/* Large product image */}
          <div className="group">
            <ProductImage
              product={featured}
              ratio="aspect-square"
              eager={false}
              className="rounded-3xl border hairline bg-white shadow-soft"
            />
          </div>

          {/* Copy */}
          <div>
            <span className="inline-block rounded-full border hairline px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-ink/70">
              Featured
            </span>
            <h3 className="mt-6 font-display text-5xl tracking-tight text-ink sm:text-6xl lg:text-7xl">
              {featured.name}
            </h3>
            <p className="mt-4 text-lg text-ink-soft">{featured.tagline}</p>
            <p className="mt-4 max-w-md text-pretty leading-relaxed text-ink-soft">
              {featured.description}
            </p>
            <p className="mt-8 text-3xl font-medium text-ink">
              ₹{featured.price}
            </p>
            <a
              href="#"
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-black"
            >
              View Crystal
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default ProductFeature;
