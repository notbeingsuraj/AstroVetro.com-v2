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
// Supports two call conventions:
//   1. `<ProductImage product={product} ratio="..." />`  (object — legacy)
//   2. `<ProductImage image={src} poster={src} alt="..." width={w} height={h} />`
//
// To use real photography:
//   1. Generate images per IMAGERY.md.
//   2. Save as public/images/products/{slug}.webp (+ .jpg fallback).
//   3. No component or data changes needed — they load automatically.

const RATIO_CLASS = {
  square: "aspect-square",
  "4:5": "aspect-[4/5]",
  "3:4": "aspect-[3/4]",
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
};

export default function ProductImage({
  product,
  eager = false,
  className = "",
  ratio = "square",
  // Flexible props (new API)
  image,
  poster,
  alt,
  width,
  height,
  aspectRatio,
}) {
  const [failed, setFailed] = useState(false);

  // Resolve props from either the product object or the direct props API.
  const srcImage = image ?? product?.image;
  const srcPoster = poster ?? product?.poster;
  const altText = alt ?? (product ? `${product.name} — ${product.tagline}` : "Imagery");
  const ratioClass =
    RATIO_CLASS[aspectRatio ?? ratio] ?? RATIO_CLASS.square;

  return (
    <div className={`relative w-full overflow-hidden ${ratioClass} ${className}`}>
      {!failed && srcImage ? (
        <picture>
          <source srcSet={`${srcImage.replace(".webp", ".avif")}`} type="image/avif" />
          <source srcSet={srcImage} type="image/webp" />
          {srcPoster && <source srcSet={srcPoster} type="image/jpeg" />}
          <img
            src={srcPoster || srcImage}
            alt={altText}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            decoding={eager ? "sync" : "async"}
            width={width ?? "800"}
            height={height ?? "800"}
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </picture>
      ) : (
        <MineralScene
          id={product?.id}
          wide={false}
          className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      )}
      {/* subtle inner hairline to give imagery a refined edge */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-ink/5" />
    </div>
  );
}
