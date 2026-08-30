import ProductCard from "./ProductCard";
import { FadeIn } from "./Motion";

const PRODUCTS = [
  {
    id: "tourmaline",
    name: "Black Tourmaline",
    tagline: "Grounding and a sense of protection.",
    price: "720",
    color: "#7a8592",
    light: "#a9b3bd",
    dark: "#4c545e",
    soft: "#9ec7e3",
  },
  {
    id: "rose",
    name: "Rose Quartz",
    tagline: "Softness, love and gentle reassurance.",
    price: "640",
    color: "#d99a82",
    light: "#eda98e",
    dark: "#bf7a61",
    soft: "#d99a82",
  },
  {
    id: "labradorite",
    name: "Labradorite",
    tagline: "Protection and quiet inner transformation.",
    price: "960",
    color: "#5c7a9e",
    light: "#8aa8c9",
    dark: "#3d5672",
    soft: "#a9c5ae",
  },
  {
    id: "citrine",
    name: "Citrine",
    tagline: "Warmth, optimism and renewed energy.",
    price: "700",
    color: "#c6a96b",
    light: "#e6c875",
    dark: "#a8874c",
    soft: "#e6c875",
  },
];

function ProductGrid() {
  return (
    <section className="bg-ivory pb-28 lg:pb-40" aria-label="Collection">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mt-20 grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4 lg:gap-x-8">
          {PRODUCTS.map((product, i) => (
            <FadeIn key={product.id} delay={i * 0.06}>
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
