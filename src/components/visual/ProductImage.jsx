// ProductImage — serves real product photography when generated, with a
// photographic SVG scene as the graceful fallback so the layout never depends
// on missing assets.
//
// - Uses <picture> with AVIF/WebP/JPEG sources for browser-native format
//   negotiation when the real photograph exists.
// - All <img> tags carry explicit width/height and aspect classes to prevent
//   layout shift; below-the-fold images load lazily.
// - If the photograph can't be loaded (not generated yet / on failure), it
//   swaps to MineralScene — no React tree changes required.
//
// To use real photography:
//   1. Generate images per IMAGERY.md.
//   2. Save as public/images/products/{slug}.webp (+ .jpg fallback).
//   3. No component or data changes needed — they load automatically.

import { useState } from "react";
import MineralScene from "./MineralScene";

export default function ProductImage({
  product,
  eager = false,
  className = "",
  ratio = "aspect-square",
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative w-full overflow-hidden ${ratio} ${className}`}>
      {!failed ? (
        <picture>
          <source srcSet={`${product.image?.replace(".webp", ".avif")}`} type="image/avif" />
          <source srcSet={product.image} type="image/webp" />
          <source srcSet={product.poster} type="image/jpeg" />
          <img
            src={product.poster || product.image}
            alt={`${product.name} — ${product.tagline}`}
            loading={eager ? "eager" : "lazy"}
            fetchpriority={eager ? "high" : "auto"}
            decoding={eager ? "sync" : "async"}
            width="800"
            height="800"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </picture>
      ) : (
        <MineralScene
          id={product.id}
          wide={false}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
      {/* subtle inner hairline to give imagery a refined edge */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
    </div>
  );
}
