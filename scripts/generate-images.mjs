// generate-images.mjs
// ---------------------------------------------------------------------------
// AstroVetro image pipeline — converts high-resolution SOURCE photography into
// the exact AVIF/WebP/JPEG derivatives the components serve, and drops them at
// the paths wired in the UI (see IMAGERY.md).
//
// HOW TO USE
// ----------
// 1. Generate real photography at a high resolution (4K+ source preferred)
//    using the prompts in IMAGERY.md, and save the full-res files here:
//
//      public/images-src/hero/hero.jpg
//      public/images-src/products/{slug}.jpg
//      public/images-src/services/{slug}.jpg
//
//    (optionally .png). Slugs match src/data/products.js and services.js.
//
// 2. Run:  npm run images
//          # or: node scripts/generate-images.mjs
//
// 3. It writes optimized derivatives to:
//      public/images/hero/hero.webp|.avif|.jpg
//      public/images/products/{slug}.webp|.avif|.jpg
//      public/images/services/{slug}.webp|.avif|.jpg
//
//    The <picture> tags in the components pick up AVIF → WebP → JPG
//    automatically. No component changes required.
//
// REQUIREMENTS
// ------------
// Uses the `sharp` library for high-quality AVIF/WebP output. Install once:
//
//      npm install -D sharp
//
// If sharp is unavailable the script skips conversion and prints clear
// manual steps (so nobody ships unoptimized 4K files to every visitor).
// ---------------------------------------------------------------------------

import { readdirSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "public", "images-src");
const OUT = join(root, "public", "images");

// Output config: width caps for responsive + performance.
const PRODUCT_WIDTHS = [640, 1024, 1440];
const SERVICE_WIDTHS = [640, 1024];
const HERO_WIDTHS = [1024, 1600, 2400];

function ensure(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function collect(srcDir) {
  if (!existsSync(srcDir)) return [];
  return readdirSync(srcDir, { withFileTypes: true })
    .filter((e) => e.isFile())
    .map((e) => join(srcDir, e.name));
}

async function main() {
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    sharp = null;
  }

  const srcdirs = [
    { dir: "hero", widths: HERO_WIDTHS },
    { dir: "products", widths: PRODUCT_WIDTHS },
    { dir: "services", widths: SERVICE_WIDTHS },
  ];

  let converted = 0;

  for (const { dir, widths } of srcdirs) {
    const srcDir = join(SRC, dir);
    const files = collect(srcDir);
    if (!files.length) {
      console.log(`[skip] no sources in public/images-src/${dir}/`);
      continue;
    }
    ensure(join(OUT, dir));
    for (const file of files) {
      const name = basename(file, extname(file));
      if (name.startsWith(".")) continue;

      if (!sharp) {
        console.log(
          `[warn] sharp not installed — cannot convert ${dir}/${name}. ` +
            `Run \`npm install -D sharp\` and re-run.`
        );
        continue;
      }

      const img = sharp(file).rotate();
      const raw = img.metadata(); // trigger validation

      // WebP + AVIF (best quality) at each responsive width; JPEG fallback at max.
      await img
        .clone()
        .resize({ width: Math.max(...widths), withoutEnlargement: true })
        .jpeg({ quality: 84, mozjpeg: true })
        .toFile(join(OUT, dir, `${name}.jpg`));

      for (const w of widths) {
        await img
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .webp({ quality: 82, effort: 6 })
          .toFile(join(OUT, dir, `${name}-${w}.webp`));
        await img
          .clone()
          .resize({ width: w, withoutEnlargement: true })
          .avif({ quality: 64, effort: 6 })
          .toFile(join(OUT, dir, `${name}-${w}.avif`));
      }
      converted++;
      console.log(`[ok] ${dir}/${name} → webp/avif/jpg @ ${widths.join(",")}`);
    }
  }

  console.log(
    converted
      ? `\nDone. Generated ${converted} asset set(s) in public/images/`
      : "\nNo assets generated. See IMAGERY.md for generation prompts + this script."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
