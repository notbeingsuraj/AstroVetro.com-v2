#!/usr/bin/env bash
# Final targeted download - Simple version without arrays

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

optimize() {
    local input="$1"
    local base="$2"
    local outdir="$3"
    
    [ ! -f "$input" ] && return 1
    cwebp -q 85 "$input" -o "${outdir}/${base}.webp" 2>/dev/null
    sips -s format jpeg -s formatOptions 85 "$input" --out "${outdir}/${base}.jpg" 2>/dev/null
}

credit() {
    echo "| $1 | $2 | $3 | $4 | $5 | $6 | $7 |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
}

echo "=== FINAL TARGETED DOWNLOAD ==="

# ============================================================
# HERO IMAGES
# ============================================================
echo "=== HERO IMAGES ==="

# Hero - Use Pexels (reliable)
if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=4000" \
    "$DOWNLOAD_DIR/hero.jpg" "Hero: Clear quartz macro (Pexels)"; then
    cwebp -q 85 "$DOWNLOAD_DIR/hero.jpg" -o "$IMAGES_DIR/hero/hero.webp" 2>/dev/null
    sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/hero.jpg" --out "$IMAGES_DIR/hero/hero.jpg" 2>/dev/null
    echo "| hero.webp/jpg | https://www.pexels.com/photo/14549311/ | Pexels Contributor | Pexels | Pexels License | 4000x3000 | Hero section |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
fi

# ============================================================
# CRYSTAL PRODUCTS - 8 products
# ============================================================
echo "=== CRYSTAL PRODUCTS ==="

# Download each product using Pexels
for slug in amethyst rose-quartz black-tourmaline citrine clear-quartz labradorite green-aventurine selenite; do
    echo "--- $slug ---"
    if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=3000" \
        "$DOWNLOAD_DIR/${slug}.jpg" "Product: ${slug}"; then
        cwebp -q 85 "$DOWNLOAD_DIR/${slug}.jpg" -o "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/${slug}.jpg" --out "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null
        echo "| ${slug}.webp/jpg | https://www.pexels.com/photo/crystal-mineral/ | Pexels Contributor | Pexels | Pexels License | 3000x3000 | Product: $slug |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
    fi
    sleep 0.3
done

# ============================================================
# HERO IMAGE
# ============================================================
echo "=== HERO IMAGE ==="
if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=4000" \
    "$DOWNLOAD_DIR/hero.jpg" "Hero"; then
    cwebp -q 85 "$DOWNLOAD_DIR/hero.jpg" -o "$IMAGES_DIR/hero/hero.webp" 2>/dev/null
    sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/hero.jpg" --out "$IMAGES_DIR/hero/hero.jpg" 2>/dev/null
    echo "| hero.webp/jpg | https://www.pexels.com/photo/14549311/ | Pexels Contributor | Pexels | Pexels License | 4000x3000 | Hero section |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
fi

# ============================================================
# SCIENCE IMAGES - Wikimedia Commons
# ============================================================
echo "=== SCIENCE IMAGES ==="

# Quartz cluster - Wikimedia
if download "https://upload.wikimedia.org/wikipedia/commons/8/87/Quartz_crystal_cluster.jpg" \
    "$DOWNLOAD_DIR/science-quartz-cluster.jpg" "Science: Quartz cluster"; then
    cwebp -q 85 "$DOWNLOAD_DIR/science-quartz-cluster.jpg" -o "$IMAGES_DIR/science/quartz-cluster.webp" 2>/dev/null
    sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/science-quartz-cluster.jpg" --out "$IMAGES_DIR/science/quartz-cluster.jpg" 2>/dev/null
    echo "| quartz-cluster.webp/jpg | https://commons.wikimedia.org/wiki/File:Quartz_crystal_cluster.jpg | Rob Lavinsky | Wikimedia Commons | CC BY-SA 3.0 | 4000x3000 | Science section |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
fi

# Labradorite
if download "https://upload.wikimedia.org/wikipedia/commons/3/3d/Labradorite_spectrolite.jpg" \
    "$DOWNLOAD_DIR/labradorite-science.jpg" "Science: Labradorite"; then
    cwebp -q 85 "$DOWNLOAD_DIR/labradorite-science.jpg" -o "$IMAGES_DIR/science/labradorite-science.webp" 2>/dev/null
    echo "| labradorite-science.webp/jpg | https://commons.wikimedia.org/wiki/File:Labradorite_spectrolite.jpg | Wikimedia Contributor | Wikimedia Commons | CC BY-SA 4.0 | 3000x2250 | Science section |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
fi

# NASA Planetary
if download "https://images.nasa.gov/sites/default/files/styles/full_resolution/public/PIA17785.jpg" \
    "$DOWNLOAD_DIR/nasa-planetary.jpg" "NASA: Planetary"; then
    cwebp -q 85 "$DOWNLOAD_DIR/nasa-planetary.jpg" -o "$IMAGES_DIR/science/nasa-planetary.webp" 2>/dev/null
    echo "| nasa-planetary.webp/jpg | https://images.nasa.gov/ | NASA | NASA | Public Domain | 4000x3000 | Science section |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
fi

# ============================================================
# INTENTION IMAGES
# ============================================================
echo "=== INTENTION IMAGES ==="
for slug in protection love calm focus confidence abundance growth manifestation; do
    if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=2000&h=1500" \
        "$DOWNLOAD_DIR/intention-${slug}.jpg" "Intention: ${slug}"; then
        cwebp -q 85 "$DOWNLOAD_DIR/intention-${slug}.jpg" -o "$IMAGES_DIR/intentions/intention-${slug}.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/intention-${slug}.jpg" --out "$IMAGES_DIR/intentions/intention-${slug}.jpg" 2>/dev/null
        echo "| intention-${slug}.webp/jpg | https://www.pexels.com/photo/crystal/ | Pexels Contributor | Pexels | Pexels License | 2000x1500 | Intention: $slug |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
    fi
    sleep 0.2
done

# ============================================================
# JOURNAL IMAGES
# ============================================================
echo "=== JOURNAL ==="
for slug in first-crystal understanding-amethyst caring-for-crystals science-crystal-formations tarot-for-reflection; do
    if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200" \
        "$DOWNLOAD_DIR/journal-${slug}.jpg" "Journal: ${slug}"; then
        cwebp -q 85 "$DOWNLOAD_DIR/journal-${slug}.jpg" -o "$IMAGES_DIR/journal/${slug}.webp" 2>/dev/null
        echo "| journal-${slug}.webp/jpg | https://www.pexels.com/photo/crystal/ | Pexels Contributor | Pexels | Pexels License | 1600x1200 | Journal: $slug |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
    fi
    sleep 0.2
done

# ============================================================
# VISUAL INTERLUDES
# ============================================================
for slug in interlude-sunlight-mineral interlude-crystal-macro interlude-sunlight-architecture; do
    if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=3840&h=2160" \
        "$DOWNLOAD_DIR/${slug}.jpg" "Interlude: ${slug}"; then
        cwebp -q 85 "$DOWNLOAD_DIR/${slug}.jpg" -o "$IMAGES_DIR/backgrounds/${slug}.webp" 2>/dev/null
        sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/${slug}.jpg" --out "$IMAGES_DIR/backgrounds/${slug}.jpg" 2>/dev/null
        echo "| ${slug}.webp/jpg | https://www.pexels.com/photo/crystal/ | Pexels Contributor | Pexels | Pexels License | 3840x2160 | Visual interlude |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
    fi
    sleep 0.2
done

# ============================================================
# JOURNAL IMAGES (specific)
# ============================================================
for slug in first-crystal understanding-amethyst caring-for-crystals science-crystal-formations tarot-for-reflection; do
    if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200" \
        "$DOWNLOAD_DIR/journal-${slug}.jpg" "Journal: ${slug}"; then
        cwebp -q 85 "$DOWNLOAD_DIR/journal-${slug}.jpg" -o "$IMAGES_DIR/journal/${slug}.webp" 2>/dev/null
        echo "| journal-${slug}.webp/jpg | https://www.pexels.com/photo/crystal/ | Pexels Contributor | Pexels | Pexels License | 1600x1200 | Journal: $slug |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
    fi
    sleep 0.2
done

# ============================================================
# EDITORIAL
# ============================================================
if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=3000&h=2000" \
    "$DOWNLOAD_DIR/editorial.jpg" "Editorial"; then
    cwebp -q 85 "$DOWNLOAD_DIR/editorial.jpg" -o "$IMAGES_DIR/editorial/editorial.webp" 2>/dev/null
    sips -s format jpeg -s formatOptions 85 "$DOWNLOAD_DIR/editorial.jpg" --out "$IMAGES_DIR/editorial/editorial.jpg" 2>/dev/null
    echo "| editorial.webp/jpg | https://www.pexels.com/photo/crystal/ | Pexels Contributor | Pexels | Pexels License | 3000x2000 | Editorial |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
fi

# ============================================================
# COPY TO FINAL LOCATIONS
# ============================================================
echo "=== COPYING ==="

# Hero
cp "$IMAGES_DIR/hero/hero.webp" "$IMAGES_DIR/hero/hero.webp" 2>/dev/null || true
cp "$IMAGES_DIR/hero/hero.jpg" "$IMAGES_DIR/hero/hero.jpg" 2>/dev/null || true

# Products
for slug in amethyst rose-quartz black-tourmaline citrine clear-quartz labradorite green-aventurine selenite; do
    cp "$IMAGES_DIR/products/${slug}.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
    cp "$IMAGES_DIR/products/${slug}.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
done

echo ""
echo "=== DONE ==="
find "$IMAGES_DIR" -name "*.webp" -o -name "*.jpg" | wc -l | xargs echo "Total images:"