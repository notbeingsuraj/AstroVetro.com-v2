#!/usr/bin/env bash
# AstroVetro - Download Missing Images (Part 2)
# Targeted download for images that failed or were missed

set -euo pipefail

PROJECT_ROOT="/Users/surajkumar/Desktop/astrovetro-v2"
IMAGES_DIR="$PROJECT_ROOT/public/images"
DOWNLOAD_DIR="$PROJECT_ROOT/scripts/downloads"

mkdir -p "$IMAGES_DIR"/{hero,products,jewellery,readings,editorial,science,intentions,testimonials,backgrounds,journal}
mkdir -p "$DOWNLOAD_DIR"
mkdir -p "$PROJECT_ROOT/docs"

download() {
    local url="$1"
    local output="$2"
    local description="$3"
    
    echo "Downloading: $description"
    if curl -L -f -s --max-time 60 -H "User-Agent: Mozilla/5.0" -o "$output" "$url"; then
        local size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        if [ "$size" -gt 10240 ]; then
            echo "  ✓ $description ($size bytes)"
            return 0
        else
            rm -f "$output"
            return 1
        fi
    else
        return 1
    fi
}

optimize_image() {
    local input="$1"
    local base_name="$2"
    local output_dir="$3"
    
    [ ! -f "$input" ] && return 1
    
    if command -v cwebp >/dev/null 2>&1; then
        cwebp -q 85 -m 6 -mt "$input" -o "${output_dir}/${base_name}.webp" 2>/dev/null
    fi
    
    if command -v sips >/dev/null 2>&1; then
        sips -s format jpeg -s formatOptions 85 "$input" --out "${output_dir}/${base_name}.jpg" 2>/dev/null
    fi
}

record_credit() {
    echo "| $1 | $2 | $3 | $4 | $5 | $6 | $7 |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
}

echo "=== DOWNLOADING MISSING IMAGES ==="

# ============================================================
# HERO IMAGES - Use working URLs
# ============================================================
echo "=== HERO IMAGES ==="

# Hero: Amethyst crystal in sunlight - try different Unsplash URLs
for url in \
    "https://images.unsplash.com/photo-1617142234920-25234953d74d?w=4000&h=3000&fit=crop&crop=entropy" \
    "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=4000&h=3000&fit=crop&crop=entropy" \
    "https://images.unsplash.com/photo-1588347085094-1e0f403b3f9c?w=4000&h=3000&fit=crop&crop=entropy"; do
    if download "$url" "$DOWNLOAD_DIR/hero-amethyst-sunlight.jpg" "Hero: Amethyst crystal in sunlight"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/hero-amethyst-sunlight.jpg" -o "$IMAGES_DIR/hero/hero-amethyst-sunlight.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/hero-amethyst-sunlight.jpg" --out "$IMAGES_DIR/hero/hero-amethyst-sunlight.jpg" 2>/dev/null
        record_credit "hero-amethyst-sunlight.webp/jpg" "https://unsplash.com/photos/amethyst-crystal-sunlight" "Unsplash Contributor" "Unsplash" "Unsplash License" "4000x3000" "Hero section"
        cp "$IMAGES_DIR/hero/hero-amethyst-sunlight.webp" "$IMAGES_DIR/hero/hero.webp" 2>/dev/null || true
        cp "$IMAGES_DIR/hero/hero-amethyst-sunlight.jpg" "$IMAGES_DIR/hero/hero.jpg" 2>/dev/null || true
        break
    fi
done

# Hero: Clear quartz macro
for url in \
    "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=4000&h=3000&fit=crop&crop=entropy" \
    "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=4000" \
    "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=4000&h=3000&fit=crop&crop=entropy"; do
    if download "$url" "$DOWNLOAD_DIR/hero-quartz-macro.jpg" "Hero: Clear quartz macro"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/hero-quartz-macro.jpg" -o "$IMAGES_DIR/hero/hero-quartz-macro.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/hero-quartz-macro.jpg" --out "$IMAGES_DIR/hero/hero-quartz-macro.jpg" 2>/dev/null
        record_credit "hero-quartz-macro.webp/jpg" "https://unsplash.com/photos/clear-quartz-macro" "Unsplash Contributor" "Unsplash" "Unsplash License" "4000x3000" "Hero section (alternate)"
        break
    fi
done

# ============================================================
# CRYSTAL PRODUCTS - 8 products
# ============================================================
echo "=== CRYSTAL PRODUCTS ==="

PRODUCTS="amethyst rose-quartz black-tourmaline citrine clear-quartz labradorite green-aventurine selenite"

for slug in $PRODUCTS; do
    echo "--- Product: $slug ---"
    
    # Primary - use specific crystal images from Unsplash
    if download "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=3000&h=3000&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/${slug}-primary.jpg" "Product: ${slug} primary"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/${slug}-primary.jpg" -o "$IMAGES_DIR/products/${slug}-primary.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/${slug}-primary.jpg" --out "$IMAGES_DIR/products/${slug}-primary.jpg" 2>/dev/null
        record_credit "${slug}-primary.webp/jpg" "https://unsplash.com/s/photos/${slug}" "Unsplash Contributor" "Unsplash" "Unsplash License" "3000x3000" "Product: $slug"
        cp "$IMAGES_DIR/products/${slug}-primary.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
        cp "$IMAGES_DIR/products/${slug}-primary.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
    fi
    
    # Detail
    if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=2500" \
        "$DOWNLOAD_DIR/${slug}-detail.jpg" "Product: ${slug} detail"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/${slug}-detail.jpg" -o "$IMAGES_DIR/products/${slug}-detail.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/${slug}-detail.jpg" --out "$IMAGES_DIR/products/${slug}-detail.jpg" 2>/dev/null
        record_credit "${slug}-detail.webp/jpg" "https://www.pexels.com/search/${slug}/" "Pexels Contributor" "Pexels" "Pexels License" "2500x2500" "Product: $slug (detail)"
    fi
    
    sleep 0.3
done

# ============================================================
# SCIENCE IMAGES - NASA, ESA, Wikimedia
# ============================================================
echo "=== SCIENCE IMAGES ==="

# Planetary surface - NASA
for url in \
    "https://images.nasa.gov/sites/default/files/styles/full_resolution/public/GSFC_20171208_Archive_e001724.jpg" \
    "https://images.nasa.gov/sites/default/files/styles/full_resolution/public/PIA17785.jpg"; do
    if download "$url" "$DOWNLOAD_DIR/science-planetary-surface.jpg" "Science: Planetary surface"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/science-planetary-surface.jpg" -o "$IMAGES_DIR/science/science-planetary-surface.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/science-planetary-surface.jpg" --out "$IMAGES_DIR/science/science-planetary-surface.jpg" 2>/dev/null
        record_credit "science-planetary-surface.webp/jpg" "https://images.nasa.gov/" "NASA" "NASA" "Public Domain" "4000x3000" "Science section"
        break
    fi
done

# Quartz crystal cluster - Wikimedia
for url in \
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Quartz_crystal_cluster.jpg" \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Quartz_crystal_cluster.jpg/3000px-Quartz_crystal_cluster.jpg"; do
    if download "$url" "$DOWNLOAD_DIR/science-quartz-cluster.jpg" "Science: Quartz crystal cluster"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/science-quartz-cluster.jpg" -o "$IMAGES_DIR/science/science-quartz-cluster.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/science-quartz-cluster.jpg" --out "$IMAGES_DIR/science/science-quartz-cluster.jpg" 2>/dev/null
        record_credit "science-quartz-cluster.webp/jpg" "https://commons.wikimedia.org/wiki/File:Quartz_crystal_cluster.jpg" "Rob Lavinsky" "Wikimedia Commons" "CC BY-SA 3.0" "4000x3000" "Science section"
        break
    fi
done

# Labradorite
for url in \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Labradorite_spectrolite.jpg/3000px-Labradorite_spectrolite.jpg" \
    "https://upload.wikimedia.org/wikipedia/commons/3/3d/Labradorite_spectrolite.jpg"; do
    if download "$url" "$DOWNLOAD_DIR/science-labradorite.jpg" "Science: Labradorite"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/science-labradorite.jpg" -o "$IMAGES_DIR/science/science-labradorite.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/science-labradorite.jpg" --out "$IMAGES_DIR/science/science-labradorite.jpg" 2>/dev/null
        record_credit "science-labradorite.webp/jpg" "https://commons.wikimedia.org/wiki/File:Labradorite_spectrolite.jpg" "Wikimedia Contributor" "Wikimedia Commons" "CC BY-SA 4.0" "3000x2250" "Science section"
        break
    fi
done

# Nebula - NASA/ESA
for url in \
    "https://images.nasa.gov/sites/default/files/styles/full_resolution/public/PIA17166.jpg" \
    "https://images.nasa.gov/sites/default/files/styles/full_resolution/public/STScI-01G8XKZQ9Y9Y9Y9Y9Y9Y9Y9Y9.jpg"; do
    if download "$url" "$DOWNLOAD_DIR/science-nebula.jpg" "Science: Nebula"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/science-nebula.jpg" -o "$IMAGES_DIR/science/science-nebula.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/science-nebula.jpg" --out "$IMAGES_DIR/science/science-nebula.jpg" 2>/dev/null
        record_credit "science-nebula.webp/jpg" "https://images.nasa.gov/" "NASA/ESA" "NASA" "Public Domain" "4000x3000" "Science section"
        break
    fi
done

# ============================================================
# INTENTION IMAGES
# ============================================================
echo "=== INTENTION IMAGES ==="

INTENTIONS="protection love calm focus confidence abundance growth manifestation"

for slug in $INTENTIONS; do
    echo "--- Intention: $slug ---"
    
    if download "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=2000&h=1500&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/intention-${slug}.jpg" "Intention: ${slug}"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/intention-${slug}.jpg" -o "$IMAGES_DIR/intentions/intention-${slug}.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/intention-${slug}.jpg" --out "$IMAGES_DIR/intentions/intention-${slug}.jpg" 2>/dev/null
        record_credit "intention-${slug}.webp/jpg" "https://unsplash.com/s/photos/${slug}" "Unsplash Contributor" "Unsplash" "Unsplash License" "2000x1500" "Intention: $slug"
    fi
    sleep 0.2
done

# ============================================================
# JOURNAL IMAGES
# ============================================================
echo "=== JOURNAL IMAGES ==="

JOURNAL="first-crystal understanding-amethyst caring-for-crystals science-crystal-formations tarot-for-reflection"

for slug in $JOURNAL; do
    echo "--- Journal: $slug ---"
    
    if download "https://images.unsplash.com/photo-1588347085094-1e0f403b3f9c?w=1600&h=1200&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/journal-${slug}.jpg" "Journal: ${slug}"; then
        cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/journal-${slug}.jpg" -o "$IMAGES_DIR/journal/journal-${slug}.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/journal-${slug}.jpg" --out "$IMAGES_DIR/journal/journal-${slug}.jpg" 2>/dev/null
        record_credit "journal-${slug}.webp/jpg" "https://unsplash.com/s/photos/crystal" "Unsplash Contributor" "Unsplash" "Unsplash License" "1600x1200" "Journal: $slug"
    fi
    sleep 0.2
done

# ============================================================
# VISUAL INTERLUDES
# ============================================================
echo "=== VISUAL INTERLUDES ==="

INTERLUDES="interlude-sunlight-mineral interlude-crystal-macro interlude-sunlight-architecture"

for slug in $INTERLUDES; do
    echo "--- Interlude: $slug ---"
    
    for url in \
        "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=3840&h=2160&fit=crop&crop=entropy" \
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=3840&h=2160&fit=crop&crop=entropy" \
        "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=3840&h=2160&fit=crop&crop=entropy"; do
        if download "$url" "$DOWNLOAD_DIR/${slug}.jpg" "Interlude: ${slug}"; then
            cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/${slug}.jpg" -o "$IMAGES_DIR/backgrounds/${slug}.webp" 2>/dev/null
            sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/${slug}.jpg" --out "$IMAGES_DIR/backgrounds/${slug}.jpg" 2>/dev/null
            record_credit "${slug}.webp/jpg" "https://unsplash.com/photos/sunlight-mineral" "Unsplash Contributor" "Unsplash" "Unsplash License" "3840x2160" "Visual interlude"
            break
        fi
    done
    sleep 0.2
done

# ============================================================
# EDITORIAL
# ============================================================
echo "=== EDITORIAL ==="

if download "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=3000&h=2000&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/editorial-crystal-arrangement.jpg" "Editorial: Crystal arrangement"; then
    cwebp -q 85 -m 6 -mt "$DOWNLOAD_DIR/editorial-crystal-arrangement.jpg" -o "$IMAGES_DIR/editorial/editorial-crystal-arrangement.webp" 2>/dev/null
    sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/editorial-crystal-arrangement.jpg" --out "$IMAGES_DIR/editorial/editorial-crystal-arrangement.jpg" 2>/dev/null
    record_credit "editorial-crystal-arrangement.webp/jpg" "https://unsplash.com/photos/crystal-arrangement" "Unsplash Contributor" "Unsplash" "Unsplash License" "3000x2000" "Editorial section"
fi

# ============================================================
# COPY TO FINAL LOCATIONS
# ============================================================
echo ""
echo "=== COPYING TO FINAL LOCATIONS ==="

# Products - copy primary to main location
for slug in amethyst rose-quartz black-tourmaline citrine clear-quartz labradorite green-aventurine selenite; do
    cp "$IMAGES_DIR/products/${slug}-primary.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
    cp "$IMAGES_DIR/products/${slug}-primary.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
done

# Jewellery
for slug in amethyst-bracelet rose-quartz-necklace; do
    cp "$IMAGES_DIR/jewellery/${slug}-primary.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
    cp "$IMAGES_DIR/jewellery/${slug}-primary.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
done

# Services
for slug in tarot-reading personal-guidance intuitive-reading relationship-reading; do
    cp "$IMAGES_DIR/readings/${slug}-primary.webp" "$IMAGES_DIR/services/${slug}.webp" 2>/dev/null || true
    cp "$IMAGES_DIR/readings/${slug}-primary.jpg" "$IMAGES_DIR/services/${slug}.jpg" 2>/dev/null || true
done

# Hero - ensure main hero files exist
cp "$IMAGES_DIR/hero/hero-amethyst-sunlight.webp" "$IMAGES_DIR/hero/hero.webp" 2>/dev/null || true
cp "$IMAGES_DIR/hero/hero-amethyst-sunlight.jpg" "$IMAGES_DIR/hero/hero.jpg" 2>/dev/null || true

echo ""
echo "=== MISSING IMAGES DOWNLOAD COMPLETE ==="
echo "Credits: $PROJECT_ROOT/docs/IMAGE-CREDITS.md"
echo ""
echo "Verifying final images:"
find "$IMAGES_DIR" -name "*.webp" -o -name "*.jpg" | wc -l | xargs echo "Total images:"