#!/usr/bin/env bash
# build-images.sh
# Rasterizes the generated SVG scenes (scripts/render-scenes.mjs) into the
# image files the site serves from public/images/.
#
# Pipeline (macOS): qlmanage (SVG->PNG) -> sips (->JPEG) + cwebp (->WebP).
# Requires: qlmanage, sips (both macOS built-in), cwebp (brew install webp).
#
# Usage:  npm run images:build   (or: bash scripts/build-images.sh)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SCENES="/tmp/scenes"
OUT="$ROOT/public/images"

# Render size (max dimension). Slightly above display cap for quality.
PROD_SIZE=1600      # products + services (square source, UI crops via object-cover)
HERO_SIZE=2000      # hero (renders to a square thumbnail, then cropped to 4:5)
HERO_CROP="2000x1600"  # central portrait crop (HxW) to recover 4:5 ratio

raster() { # $1=svg  $2=outdir  $3=size  $4=crop "HxW" (optional, central crop)
  local svg="$1" outdir="$2" size="$3" crop="${4:-}"
  local base; base="$(basename "$svg" .svg)"
  rm -f "$svg.png"
  qlmanage -t -s "$size" -o /tmp/scenes "$svg" >/dev/null 2>&1
  local png="${svg}.png"   # qlmanage writes ${svg}.png
  if [ -n "$crop" ]; then
    # Crop centrally (sips renders a square thumbnail; crop recovers the ratio)
    sips -c "${crop%x*}" "${crop#*x}" "$png" >/dev/null 2>&1
  fi
  # JPEG
  sips -s format jpeg -s formatOptions 85 "$png" --out "$outdir/${base}.jpg" >/dev/null
  # WebP
  cwebp -quiet -q 82 "$png" -o "$outdir/${base}.webp"
  rm -f "$png"
  echo "  [ok] ${base} -> ${outdir}/${base}.jpg + .webp${crop:+ (crop ${crop})}"
}

echo "Building product images..."
mkdir -p "$OUT/products"
for f in "$SCENES"/{amethyst,rose-quartz,black-tourmaline,citrine,clear-quartz,labradorite,green-aventurine,selenite,amethyst-bracelet,rose-quartz-necklace}.svg; do
  [ -f "$f" ] && raster "$f" "$OUT/products" "$PROD_SIZE"
done

echo "Building service images..."
mkdir -p "$OUT/services"
for f in "$SCENES"/{tarot-reading,personal-guidance,intuitive-reading,relationship-reading}.svg; do
  [ -f "$f" ] && raster "$f" "$OUT/services" "$PROD_SIZE"
done

echo "Building hero image..."
mkdir -p "$OUT/hero"
raster "$SCENES/hero.svg" "$OUT/hero" "$HERO_SIZE" "$HERO_CROP"

echo "Done. Assets written under $OUT"
