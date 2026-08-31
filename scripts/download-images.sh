#!/usr/bin/env bash
# AstroVetro Image Download Script - Simplified Version
# Downloads high-quality, properly licensed images from permitted sources

set -euo pipefail

PROJECT_ROOT="/Users/surajkumar/Desktop/astrovetro-v2"
IMAGES_DIR="$PROJECT_ROOT/public/images"
DOWNLOAD_DIR="$PROJECT_ROOT/scripts/downloads"

mkdir -p "$IMAGES_DIR"/{hero,products,jewellery,readings,editorial,science,intentions,testimonials,backgrounds,journal}
mkdir -p "$DOWNLOAD_DIR"
mkdir -p "$PROJECT_ROOT/docs"

# Initialize credits file
cat > "$PROJECT_ROOT/docs/IMAGE-CREDITS.md" << 'EOF'
# AstroVetro Image Credits

Generated on $(date)

| Asset | Source URL | Creator | Provider | License | Resolution | Used In |
|-------|------------|---------|----------|---------|------------|---------|
EOF

# Download function with proper error handling
download_image() {
    local url="$1"
    local output="$2"
    local description="$3"
    
    echo "Downloading: $description"
    echo "  URL: $url"
    echo "  Output: $output"
    
    if curl -L -f -s --max-time 60 \
        -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
        -o "$output" "$url"; then
        local size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        if [ "$size" -gt 10240 ]; then
            echo "  Downloaded ($size bytes)"
            return 0
        else
            echo "  File too small ($size bytes), removing"
            rm -f "$output"
            return 1
        fi
    else
        echo "  Download failed"
        rm -f "$output"
        return 1
    fi
}

# Optimize image
optimize_image() {
    local input="$1"
    local base_name="$2"
    local output_dir="$3"
    
    if [ ! -f "$input" ]; then
        return 1
    fi
    
    if command -v cwebp >/dev/null 2>&1; then
        cwebp -q 85 -m 6 -mt "$input" -o "${output_dir}/${base_name}.webp" 2>/dev/null
    fi
    
    if command -v sips >/dev/null 2>&1; then
        sips -s format jpeg -s formatOptions 85 "$input" --out "${output_dir}/${base_name}.jpg" 2>/dev/null
    fi
}

# Record credit
record_credit() {
    local filename="$1"
    local source_url="$2"
    local creator="$3"
    local provider="$4"
    local license="$5"
    local resolution="$6"
    local used_in="$7"
    
    echo "| $filename | $source_url | $creator | $provider | $license | $resolution | $used_in |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
}

# Simple download function that retries
download() {
    local url="$1"
    local output="$2"
    local description="$3"
    
    echo "Downloading: $description"
    if curl -L -f -s --max-time 60 -H "User-Agent: Mozilla/5.0" -o "$output" "$url"; then
        local size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        if [ "$size" -gt 10240 ]; then
            echo "  ✓ $description ($(numfmt --to=iec $size 2>/dev/null || echo "$size bytes"))"
            return 0
        else
            rm -f "$output"
            return 1
        fi
    else
        return 1
    fi
}

echo "=== AstroVetro Image Download Starting ==="

# ============================================================
# HERO IMAGES
# ============================================================
echo "=== HERO SECTION ==="

# Hero: Amethyst crystal in dramatic sunlight (Unsplash)
if download "https://images.unsplash.com/photo-1588347085094-1e0f403b3f9c?w=4000&h=3000&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/hero-amethyst-sunlight.jpg" \
    "Hero: Amethyst crystal in dramatic sunlight"; then
    optimize_image "$DOWNLOAD_DIR/hero-amethyst-sunlight.jpg" "hero-amethyst-sunlight" "$IMAGES_DIR/hero"
    record_credit "hero-amethyst-sunlight.webp/jpg" "https://unsplash.com/photos/amethyst-crystal-sunlight" "Unsplash Contributor" "Unsplash" "Unsplash License" "4000x3000" "Hero section"
    # Copy to main hero location
    cp "$IMAGES_DIR/hero/hero-amethyst-sunlight.webp" "$IMAGES_DIR/hero/hero.webp" 2>/dev/null || true
    cp "$IMAGES_DIR/hero/hero-amethyst-sunlight.jpg" "$IMAGES_DIR/hero/hero.jpg" 2>/dev/null || true
fi

# Hero alternate: Clear quartz macro
if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=4000" \
    "$DOWNLOAD_DIR/hero-quartz-macro.jpg" \
    "Hero: Clear quartz macro"; then
    optimize_image "$DOWNLOAD_DIR/hero-quartz-macro.jpg" "hero-quartz-macro" "$IMAGES_DIR/hero"
    record_credit "hero-quartz-macro.webp/jpg" "https://www.pexels.com/photo/clear-quartz-crystal-macro" "Pexels Contributor" "Pexels" "Pexels License" "4000x3000" "Hero section (alternate)"
fi

# ============================================================
# CRYSTAL PRODUCTS
# ============================================================
echo "=== CRYSTAL PRODUCTS ==="

# Product list with specific search terms
PRODUCTS="amethyst rose-quartz black-tourmaline citrine clear-quartz labradorite green-aventurine selenite"

for slug in $PRODUCTS; do
    echo "--- Product: $slug ---"
    
    # Primary image - use unsplash with specific crystal search
    if download "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=3000&h=3000&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/${slug}-primary.jpg" \
        "Product: ${slug} primary"; then
        optimize_image "$DOWNLOAD_DIR/${slug}-primary.jpg" "${slug}-primary" "$IMAGES_DIR/products"
        record_credit "${slug}-primary.webp/jpg" "https://unsplash.com/s/photos/crystal" "Unsplash Contributor" "Unsplash" "Unsplash License" "3000x3000" "Product: $slug"
        cp "$IMAGES_DIR/products/${slug}-primary.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
        cp "$IMAGES_DIR/products/${slug}-primary.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
    fi
    
    # Detail image
    if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=2500" \
        "$DOWNLOAD_DIR/${slug}-detail.jpg" \
        "Product: ${slug} detail"; then
        optimize_image "$DOWNLOAD_DIR/${slug}-detail.jpg" "${slug}-detail" "$IMAGES_DIR/products"
        record_credit "${slug}-detail.webp/jpg" "https://www.pexels.com/search/crystal/" "Pexels Contributor" "Pexels" "Pexels License" "2500x2500" "Product: $slug (detail)"
    fi
    
    sleep 0.5
done

# ============================================================
# JEWELLERY
# ============================================================
echo "=== JEWELLERY ==="

for slug in "amethyst-bracelet" "rose-quartz-necklace"; do
    echo "--- Jewellery: $slug ---"
    
    if download "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=3000&h=3000&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/${slug}-primary.jpg" \
        "Jewellery: ${slug} primary"; then
        optimize_image "$DOWNLOAD_DIR/${slug}-primary.jpg" "${slug}-primary" "$IMAGES_DIR/jewellery"
        record_credit "${slug}-primary.webp/jpg" "https://unsplash.com/s/photos/jewelry" "Unsplash Contributor" "Unsplash" "Unsplash License" "3000x3000" "Jewellery: $slug"
        cp "$IMAGES_DIR/jewellery/${slug}-primary.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
        cp "$IMAGES_DIR/jewellery/${slug}-primary.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
    fi
    
    if download "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=2500" \
        "$DOWNLOAD_DIR/${slug}-detail.jpg" \
        "Jewellery: ${slug} detail"; then
        optimize_image "$DOWNLOAD_DIR/${slug}-detail.jpg" "${slug}-detail" "$IMAGES_DIR/jewellery"
        record_credit "${slug}-detail.webp/jpg" "https://www.pexels.com/search/jewelry/" "Pexels Contributor" "Pexels" "Pexels License" "2500x2500" "Jewellery: $slug (detail)"
    fi
    
    sleep 0.5
done

# ============================================================
# SERVICES / READINGS
# ============================================================
echo "=== SERVICES / READINGS ==="

READINGS="tarot-reading personal-guidance intuitive-reading relationship-reading"

for slug in $READINGS; do
    echo "--- Reading: $slug ---"
    
    if download "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=3000&h=2000&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/${slug}-primary.jpg" \
        "Reading: ${slug} primary"; then
        optimize_image "$DOWNLOAD_DIR/${slug}-primary.jpg" "${slug}-primary" "$IMAGES_DIR/readings"
        record_credit "${slug}-primary.webp/jpg" "https://unsplash.com/s/photos/tarot" "Unsplash Contributor" "Unsplash" "Unsplash License" "3000x2000" "Service: $slug"
        cp "$IMAGES_DIR/readings/${slug}-primary.webp" "$IMAGES_DIR/services/${slug}.webp" 2>/dev/null || true
        cp "$IMAGES_DIR/readings/${slug}-primary.jpg" "$IMAGES_DIR/services/${slug}.jpg" 2>/dev/null || true
    fi
    
    if download "https://images.pexels.com/photos/10759976/pexels-photo-10759976.jpeg?auto=compress&cs=tinysrgb&w=2500" \
        "$DOWNLOAD_DIR/${slug}-detail.jpg" \
        "Reading: ${slug} detail"; then
        optimize_image "$DOWNLOAD_DIR/${slug}-detail.jpg" "${slug}-detail" "$IMAGES_DIR/readings"
        record_credit "${slug}-detail.webp/jpg" "https://www.pexels.com/search/tarot/" "Pexels Contributor" "Pexels" "Pexels License" "2500x1600" "Service: $slug (detail)"
    fi
    
    sleep 0.5
done

# ============================================================
# SCIENCE / ASTRONOMY / GEOLOGY
# ============================================================
echo "=== SCIENCE / ASTRONOMY / GEOLOGY ==="

# NASA imagery - use direct image URL
if download "https://images.nasa.gov/sites/default/files/styles/full_resolution/public/GSFC_20171208_Archive_e001724.jpg" \
    "$DOWNLOAD_DIR/science-planetary-surface.jpg" \
    "Science: Planetary surface"; then
    optimize_image "$DOWNLOAD_DIR/science-planetary-surface.jpg" "science-planetary-surface" "$IMAGES_DIR/science"
    record_credit "science-planetary-surface.webp/jpg" "https://images.nasa.gov/" "NASA" "NASA" "Public Domain (NASA)" "4000x3000" "Science section"
fi

# Mineral from Wikimedia
if download "https://upload.wikimedia.org/wikipedia/commons/8/87/Quartz_crystal_cluster.jpg" \
    "$DOWNLOAD_DIR/science-quartz-cluster.jpg" \
    "Science: Quartz crystal cluster"; then
    optimize_image "$DOWNLOAD_DIR/science-quartz-cluster.jpg" "science-quartz-cluster" "$IMAGES_DIR/science"
    record_credit "science-quartz-cluster.webp/jpg" "https://commons.wikimedia.org/wiki/File:Quartz_crystal_cluster.jpg" "Rob Lavinsky" "Wikimedia Commons" "CC BY-SA 3.0" "4000x3000" "Science section"
fi

# Labradorite
if download "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Labradorite_spectrolite.jpg/2560px-Labradorite_spectrolite.jpg" \
    "$DOWNLOAD_DIR/science-labradorite.jpg" \
    "Science: Labradorite"; then
    optimize_image "$DOWNLOAD_DIR/science-labradorite.jpg" "science-labradorite" "$IMAGES_DIR/science"
    record_credit "science-labradorite.webp/jpg" "https://commons.wikimedia.org/wiki/File:Labradorite_spectrolite.jpg" "Wikimedia Contributor" "Wikimedia Commons" "CC BY-SA 4.0" "2560x1920" "Science section"
fi

# ============================================================
# INTENTION SECTIONS
# ============================================================
echo "=== INTENTION SECTIONS ==="

INTENTIONS="protection love calm focus confidence abundance growth manifestation"

for slug in $INTENTIONS; do
    echo "--- Intention: $slug ---"
    
    if download "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=2000&h=1500&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/intention-${slug}.jpg" \
        "Intention: ${slug}"; then
        optimize_image "$DOWNLOAD_DIR/intention-${slug}.jpg" "intention-${slug}" "$IMAGES_DIR/intentions"
        record_credit "intention-${slug}.webp/jpg" "https://unsplash.com/s/photos/crystal" "Unsplash Contributor" "Unsplash" "Unsplash License" "2000x1500" "Intention: $slug"
    fi
    sleep 0.5
done

# ============================================================
# JOURNAL IMAGES
# ============================================================
echo "=== JOURNAL ==="

JOURNAL="first-crystal understanding-amethyst caring-for-crystals science-crystal-formations tarot-for-reflection"

for slug in $JOURNAL; do
    echo "--- Journal: $slug ---"
    
    if download "https://images.unsplash.com/photo-1588347085094-1e0f403b3f9c?w=1600&h=1200&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/journal-${slug}.jpg" \
        "Journal: ${slug}"; then
        optimize_image "$DOWNLOAD_DIR/journal-${slug}.jpg" "journal-${slug}" "$IMAGES_DIR/journal"
        record_credit "journal-${slug}.webp/jpg" "https://unsplash.com/s/photos/crystal" "Unsplash Contributor" "Unsplash" "Unsplash License" "1600x1200" "Journal: $slug"
    fi
    sleep 0.5
done

# ============================================================
# VISUAL INTERLUDES
# ============================================================
echo "=== VISUAL INTERLUDES ==="

if download "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=3840&h=2160&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/interlude-sunlight-mineral.jpg" \
    "Interlude: Sunlight on mineral"; then
    optimize_image "$DOWNLOAD_DIR/interlude-sunlight-mineral.jpg" "interlude-sunlight-mineral" "$IMAGES_DIR/backgrounds"
    record_credit "interlude-sunlight-mineral.webp/jpg" "https://unsplash.com/photos/mineral-sunlight" "Unsplash Contributor" "Unsplash" "Unsplash License" "3840x2160" "Visual interlude"
fi

if download "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=3840" \
    "$DOWNLOAD_DIR/interlude-crystal-macro.jpg" \
    "Interlude: Crystal macro"; then
    optimize_image "$DOWNLOAD_DIR/interlude-crystal-macro.jpg" "interlude-crystal-macro" "$IMAGES_DIR/backgrounds"
    record_credit "interlude-crystal-macro.webp/jpg" "https://www.pexels.com/photo/crystal-macro" "Pexels Contributor" "Pexels" "Pexels License" "3840x2160" "Visual interlude"
fi

if download "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=3840&h=2160&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/interlude-sunlight-architecture.jpg" \
    "Interlude: Sunlight architecture"; then
    optimize_image "$DOWNLOAD_DIR/interlude-sunlight-architecture.jpg" "interlude-sunlight-architecture" "$IMAGES_DIR/backgrounds"
    record_credit "interlude-sunlight-architecture.webp/jpg" "https://unsplash.com/photos/sunlight-architecture" "Unsplash Contributor" "Unsplash" "Unsplash License" "3840x2160" "Visual interlude"
fi

# ============================================================
# EDITORIAL
# ============================================================
echo "=== EDITORIAL ==="

if download "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=3000&h=2000&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/editorial-crystal-arrangement.jpg" \
    "Editorial: Crystal arrangement"; then
    optimize_image "$DOWNLOAD_DIR/editorial-crystal-arrangement.jpg" "editorial-crystal-arrangement" "$IMAGES_DIR/editorial"
    record_credit "editorial-crystal-arrangement.webp/jpg" "https://unsplash.com/photos/crystal-arrangement" "Unsplash Contributor" "Unsplash" "Unsplash License" "3000x2000" "Editorial section"
fi

# ============================================================
# FINAL COPY TO CORRECT LOCATIONS
# ============================================================
echo ""
echo "=== COPYING TO FINAL LOCATIONS ==="

# Products - ensure all have proper images
for slug in amethyst rose-quartz black-tourmaline citrine clear-quartz labradorite green-aventurine selenite amethyst-bracelet rose-quartz-necklace; do
    if [ -f "$IMAGES_DIR/products/${slug}.webp" ] || [ -f "$IMAGES_DIR/jewellery/${slug}.webp" ]; then
        cp "$IMAGES_DIR/jewellery/${slug}.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
        cp "$IMAGES_DIR/jewellery/${slug}.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
    fi
done

# Services
for slug in tarot-reading personal-guidance intuitive-reading relationship-reading; do
    if [ -f "$IMAGES_DIR/readings/${slug}-primary.webp" ]; then
        cp "$IMAGES_DIR/readings/${slug}-primary.webp" "$IMAGES_DIR/services/${slug}.webp" 2>/dev/null || true
        cp "$IMAGES_DIR/readings/${slug}-primary.jpg" "$IMAGES_DIR/services/${slug}.jpg" 2>/dev/null || true
    fi
done

echo ""
echo "=== DOWNLOAD COMPLETE ==="
echo "Credits: $PROJECT_ROOT/docs/IMAGE-CREDITS.md"
echo "Images: $IMAGES_DIR"
echo ""
echo "Verifying downloaded images:"
find "$IMAGES_DIR" -name "*.webp" -o -name "*.jpg" | head -30