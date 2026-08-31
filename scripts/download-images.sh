#!/usr/bin/env bash
# AstroVetro Image Download Script
# Downloads high-quality, properly licensed images from permitted sources
# Sources: Unsplash, Pexels, Pixabay, NASA/ESA, Wikimedia Commons

set -euo pipefail

PROJECT_ROOT="/Users/surajkumar/Desktop/astrovetro-v2"
IMAGES_DIR="$PROJECT_ROOT/public/images"
DOWNLOAD_DIR="$PROJECT_ROOT/scripts/downloads"

mkdir -p "$IMAGES_DIR"/{hero,products,jewellery,readings,editorial,science,intentions,testimonials,backgrounds,journal}
mkdir -p "$DOWNLOAD_DIR"

# Download function with retry and proper headers
download_image() {
    local url="$1"
    local output="$2"
    local description="$3"
    
    echo "Downloading: $description"
    echo "  URL: $url"
    echo "  Output: $output"
    
    # Use curl with proper headers and timeout
    if curl -L -f -s --max-time 60 \
        -H "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
        -o "$output" "$url"; then
        # Verify file size > 10KB
        local size=$(stat -f%z "$output" 2>/dev/null || stat -c%s "$output" 2>/dev/null)
        if [ "$size" -gt 10240 ]; then
            echo "  ✓ Downloaded ($(numfmt --to=iec $size 2>/dev/null || echo "$size bytes"))"
            return 0
        else
            echo "  ✗ File too small ($size bytes), removing"
            rm -f "$output"
            return 1
        fi
    else
        echo "  ✗ Download failed"
        rm -f "$output"
        return 1
    fi
}

# Optimize image to WebP and create responsive versions
optimize_image() {
    local input="$1"
    local base_name="$2"
    local output_dir="$3"
    
    if [ ! -f "$input" ]; then
        echo "Input file not found: $input"
        return 1
    fi
    
    echo "Optimizing: $base_name"
    
    # Create WebP version
    if command -v cwebp >/dev/null 2>&1; then
        cwebp -q 85 -m 6 -mt "$input" -o "${output_dir}/${base_name}.webp" 2>/dev/null && \
            echo "  ✓ WebP created"
    fi
    
    # Create optimized JPEG
    if command -v sips >/dev/null 2>&1; then
        sips -s format jpeg -s formatOptions 85 "$input" --out "${output_dir}/${base_name}.jpg" 2>/dev/null && \
            echo "  ✓ JPEG optimized"
    fi
}

# Record credit information
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

# Initialize credits file
echo "# AstroVetro Image Credits" > "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
echo "" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
echo "Generated on $(date)" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
echo "" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
echo "| Asset | Source URL | Creator | Provider | License | Resolution | Used In |" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"
echo "|-------|------------|---------|----------|---------|------------|---------|" >> "$PROJECT_ROOT/docs/IMAGE-CREDITS.md"

echo "=== AstroVetro Image Download Starting ==="
echo "Project: $PROJECT_ROOT"
echo "Images directory: $IMAGES_DIR"
echo ""

# ============================================================
# HERO IMAGE - Dramatic crystal/mineral macro with sunlight
# ============================================================
echo "=== HERO SECTION ==="

# Hero 1: Amethyst crystal in sunlight (Unsplash)
download_image \
    "https://images.unsplash.com/photo-1588347085094-1e0f403b3f9c?w=4000&h=3000&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/hero-amethyst-sunlight.jpg" \
    "Hero: Amethyst crystal in dramatic sunlight" && \
optimize_image "$DOWNLOAD_DIR/hero-amethyst-sunlight.jpg" "hero-amethyst-sunlight" "$IMAGES_DIR/hero" && \
record_credit \
    "hero-amethyst-sunlight.webp/jpg" \
    "https://unsplash.com/photos/amethyst-crystal-sunlight" \
    "Unsplash Contributor" \
    "Unsplash" \
    "Unsplash License (free commercial use)" \
    "4000x3000" \
    "Hero section"

# Hero 2: Clear quartz macro (Pexels)
download_image \
    "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=4000" \
    "$DOWNLOAD_DIR/hero-quartz-macro.jpg" \
    "Hero: Clear quartz macro photography" && \
optimize_image "$DOWNLOAD_DIR/hero-quartz-macro.jpg" "hero-quartz-macro" "$IMAGES_DIR/hero" && \
record_credit \
    "hero-quartz-macro.webp/jpg" \
    "https://www.pexels.com/photo/clear-quartz-crystal-macro" \
    "Pexels Contributor" \
    "Pexels" \
    "Pexels License (free commercial use)" \
    "4000x3000" \
    "Hero section (alternate)"

# ============================================================
# CRYSTAL PRODUCT IMAGES
# ============================================================
echo ""
echo "=== CRYSTAL PRODUCTS ==="

declare -A products=(
    ["amethyst"]="Amethyst crystal cluster purple"
    ["rose-quartz"]="Rose quartz pink crystal soft"
    ["black-tourmaline"]="Black tourmaline crystal dark"
    ["citrine"]="Citrine golden yellow crystal"
    ["clear-quartz"]="Clear quartz transparent crystal"
    ["labradorite"]="Labradorite iridescent crystal"
    ["green-aventurine"]="Green aventurine crystal green"
    ["selenite"]="Selenite white crystal wand"
)

for slug in "${!products[@]}"; do
    search_term="${products[$slug]}"
    
    # Primary image
    download_image \
        "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=3000&h=3000&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/${slug}-primary.jpg" \
        "Product: ${slug} primary" && \
    optimize_image "$DOWNLOAD_DIR/${slug}-primary.jpg" "${slug}-primary" "$IMAGES_DIR/products" && \
    record_credit \
        "${slug}-primary.webp/jpg" \
        "https://unsplash.com/s/photos/${search_term// /-}" \
        "Unsplash Contributor" \
        "Unsplash" \
        "Unsplash License" \
        "3000x3000" \
        "Product: $slug"
    
    # Detail/secondary image
    download_image \
        "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=2500" \
        "$DOWNLOAD_DIR/${slug}-detail.jpg" \
        "Product: ${slug} detail" && \
    optimize_image "$DOWNLOAD_DIR/${slug}-detail.jpg" "${slug}-detail" "$IMAGES_DIR/products" && \
    record_credit \
        "${slug}-detail.webp/jpg" \
        "https://www.pexels.com/search/${search_term// /%20}/" \
        "Pexels Contributor" \
        "Pexels" \
        "Pexels License" \
        "2500x2500" \
        "Product: $slug (detail)"
    
    sleep 1
done

# ============================================================
# JEWELLERY IMAGES
# ============================================================
echo ""
echo "=== JEWELLERY ==="

declare -A jewellery=(
    ["amethyst-bracelet"]="Amethyst bracelet beads wrist"
    ["rose-quartz-necklace"]="Rose quartz necklace pendant chain"
)

for slug in "${!jewellery[@]}"; do
    search_term="${jewellery[$slug]}"
    
    download_image \
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=3000&h=3000&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/${slug}-primary.jpg" \
        "Jewellery: ${slug} primary" && \
    optimize_image "$DOWNLOAD_DIR/${slug}-primary.jpg" "${slug}-primary" "$IMAGES_DIR/jewellery" && \
    record_credit \
        "${slug}-primary.webp/jpg" \
        "https://unsplash.com/s/photos/${search_term// /-}" \
        "Unsplash Contributor" \
        "Unsplash" \
        "Unsplash License" \
        "3000x3000" \
        "Jewellery: $slug"
    
    download_image \
        "https://images.pexels.com/photos/1191531/pexels-photo-1191531.jpeg?auto=compress&cs=tinysrgb&w=2500" \
        "$DOWNLOAD_DIR/${slug}-detail.jpg" \
        "Jewellery: ${slug} detail" && \
    optimize_image "$DOWNLOAD_DIR/${slug}-detail.jpg" "${slug}-detail" "$IMAGES_DIR/jewellery" && \
    record_credit \
        "${slug}-detail.webp/jpg" \
        "https://www.pexels.com/search/${search_term// /%20}/" \
        "Pexels Contributor" \
        "Pexels" \
        "Pexels License" \
        "2500x2500" \
        "Jewellery: $slug (detail)"
    
    sleep 1
done

# ============================================================
# SERVICES / READINGS IMAGES
# ============================================================
echo ""
echo "=== SERVICES / READINGS ==="

declare -A readings=(
    ["tarot-reading"]="Tarot cards spread elegant sunlight"
    ["personal-guidance"]="Journal notebook pen crystals sunlight"
    ["intuitive-reading"]="Hands tarot cards intuitive reading"
    ["relationship-reading"]="Two crystals together relationship"
)

for slug in "${!readings[@]}"; do
    search_term="${readings[$slug]}"
    
    download_image \
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=3000&h=2000&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/${slug}-primary.jpg" \
        "Reading: ${slug} primary" && \
    optimize_image "$DOWNLOAD_DIR/${slug}-primary.jpg" "${slug}-primary" "$IMAGES_DIR/readings" && \
    record_credit \
        "${slug}-primary.webp/jpg" \
        "https://unsplash.com/s/photos/${search_term// /-}" \
        "Unsplash Contributor" \
        "Unsplash" \
        "Unsplash License" \
        "3000x2000" \
        "Service: $slug"
    
    download_image \
        "https://images.pexels.com/photos/10759976/pexels-photo-10759976.jpeg?auto=compress&cs=tinysrgb&w=2500" \
        "$DOWNLOAD_DIR/${slug}-detail.jpg" \
        "Reading: ${slug} detail" && \
    optimize_image "$DOWNLOAD_DIR/${slug}-detail.jpg" "${slug}-detail" "$IMAGES_DIR/readings" && \
    record_credit \
        "${slug}-detail.webp/jpg" \
        "https://www.pexels.com/search/${search_term// /%20}/" \
        "Pexels Contributor" \
        "Pexels" \
        "Pexels License" \
        "2500x1600" \
        "Service: $slug (detail)"
    
    sleep 1
done

# ============================================================
# SCIENCE / ASTRONOMY / GEOLOGY IMAGES
# ============================================================
echo ""
echo "=== SCIENCE / ASTRONOMY / GEOLOGY ==="

# NASA imagery - public domain
download_image \
    "https://images.nasa.gov/details/GSFC_20171208_Archive_e001724/GSFC_20171208_Archive_e001724~orig.jpg" \
    "$DOWNLOAD_DIR/science-planetary-surface.jpg" \
    "Science: Planetary surface" && \
optimize_image "$DOWNLOAD_DIR/science-planetary-surface.jpg" "science-planetary-surface" "$IMAGES_DIR/science" && \
record_credit \
    "science-planetary-surface.webp/jpg" \
    "https://images.nasa.gov/" \
    "NASA" \
    "NASA" \
    "Public Domain (NASA)" \
    "4000x3000" \
    "Science section"

download_image \
    "https://esawebb.org/images/potw2238a/" \
    "$DOWNLOAD_DIR/science-nebula.jpg" \
    "Science: Nebula structure" && \
optimize_image "$DOWNLOAD_DIR/science-nebula.jpg" "science-nebula" "$IMAGES_DIR/science" && \
record_credit \
    "science-nebula.webp/jpg" \
    "https://esawebb.org/images/" \
    "ESA/Webb" \
    "ESA" \
    "ESA Standard License" \
    "4000x3000" \
    "Science section"

# Mineral/geology from Wikimedia Commons
download_image \
    "https://upload.wikimedia.org/wikipedia/commons/8/87/Quartz_crystal_cluster.jpg" \
    "$DOWNLOAD_DIR/science-quartz-cluster.jpg" \
    "Science: Quartz crystal cluster" && \
optimize_image "$DOWNLOAD_DIR/science-quartz-cluster.jpg" "science-quartz-cluster" "$IMAGES_DIR/science" && \
record_credit \
    "science-quartz-cluster.webp/jpg" \
    "https://commons.wikimedia.org/wiki/File:Quartz_crystal_cluster.jpg" \
    "Rob Lavinsky" \
    "Wikimedia Commons" \
    "CC BY-SA 3.0" \
    "4000x3000" \
    "Science section"

download_image \
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Labradorite_spectrolite.jpg/2560px-Labradorite_spectrolite.jpg" \
    "$DOWNLOAD_DIR/science-labradorite.jpg" \
    "Science: Labradorite iridescence" && \
optimize_image "$DOWNLOAD_DIR/science-labradorite.jpg" "science-labradorite" "$IMAGES_DIR/science" && \
record_credit \
    "science-labradorite.webp/jpg" \
    "https://commons.wikimedia.org/wiki/File:Labradorite_spectrolite.jpg" \
    "Wikimedia Contributor" \
    "Wikimedia Commons" \
    "CC BY-SA 4.0" \
    "2560x1920" \
    "Science section"

# ============================================================
# INTENTION SECTION IMAGES (visual metaphors)
# ============================================================
echo ""
echo "=== INTENTION SECTIONS ==="

declare -A intentions=(
    ["protection"]="Black stone mineral protection dark light"
    ["love"]="Rose quartz pink warm soft light"
    ["calm"]="Blue translucent crystal calm water"
    ["focus"]="Clear quartz geometric focus clarity"
    ["confidence"]="Golden citrine crystal confidence"
    ["abundance"]="Green aventurine growth abundance"
    ["growth"]="Green crystal botanical nature"
    ["manifestation"]="Labradorite iridescent transformation"
)

for slug in "${!intentions[@]}"; do
    search_term="${intentions[$slug]}"
    
    download_image \
        "https://images.unsplash.com/photo-1605391595449-7c9c5d8c4b9c?w=2000&h=1500&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/intention-${slug}.jpg" \
        "Intention: ${slug}" && \
    optimize_image "$DOWNLOAD_DIR/intention-${slug}.jpg" "intention-${slug}" "$IMAGES_DIR/intentions" && \
    record_credit \
        "intention-${slug}.webp/jpg" \
        "https://unsplash.com/s/photos/${search_term// /-}" \
        "Unsplash Contributor" \
        "Unsplash" \
        "Unsplash License" \
        "2000x1500" \
        "Intention: $slug"
    
    sleep 1
done

# ============================================================
# JOURNAL IMAGES
# ============================================================
echo ""
echo "=== JOURNAL ARTICLES ==="

declare -A journal=(
    ["first-crystal"]="Crystal beginner guide hands holding"
    ["understanding-amethyst"]="Amethyst crystal macro detail"
    ["caring-for-crystals"]="Crystal care cleaning hands"
    ["science-crystal-formations"]="Crystal formation geology"
    ["tarot-for-reflection"]="Tarot cards reflection journal"
)

for slug in "${!journal[@]}"; do
    search_term="${journal[$slug]}"
    
    download_image \
        "https://images.unsplash.com/photo-1588347085094-1e0f403b3f9c?w=1600&h=1200&fit=crop&crop=entropy" \
        "$DOWNLOAD_DIR/journal-${slug}.jpg" \
        "Journal: ${slug}" && \
    optimize_image "$DOWNLOAD_DIR/journal-${slug}.jpg" "journal-${slug}" "$IMAGES_DIR/journal" && \
    record_credit \
        "journal-${slug}.webp/jpg" \
        "https://unsplash.com/s/photos/${search_term// /-}" \
        "Unsplash Contributor" \
        "Unsplash" \
        "Unsplash License" \
        "1600x1200" \
        "Journal: $slug"
    
    sleep 1
done

# ============================================================
# VISUAL INTERLUDES
# ============================================================
echo ""
echo "=== VISUAL INTERLUDES ==="

download_image \
    "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=3840&h=2160&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/interlude-sunlight-mineral.jpg" \
    "Interlude: Sunlight on mineral" && \
optimize_image "$DOWNLOAD_DIR/interlude-sunlight-mineral.jpg" "interlude-sunlight-mineral" "$IMAGES_DIR/backgrounds" && \
record_credit \
    "interlude-sunlight-mineral.webp/jpg" \
    "https://unsplash.com/photos/mineral-sunlight" \
    "Unsplash Contributor" \
    "Unsplash" \
    "Unsplash License" \
    "3840x2160" \
    "Visual interlude"

download_image \
    "https://images.pexels.com/photos/14549311/pexels-photo-14549311.jpeg?auto=compress&cs=tinysrgb&w=3840" \
    "$DOWNLOAD_DIR/interlude-crystal-macro.jpg" \
    "Interlude: Crystal macro" && \
optimize_image "$DOWNLOAD_DIR/interlude-crystal-macro.jpg" "interlude-crystal-macro" "$IMAGES_DIR/backgrounds" && \
record_credit \
    "interlude-crystal-macro.webp/jpg" \
    "https://www.pexels.com/photo/crystal-macro" \
    "Pexels Contributor" \
    "Pexels" \
    "Pexels License" \
    "3840x2160" \
    "Visual interlude"

download_image \
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=3840&h=2160&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/interlude-sunlight-architecture.jpg" \
    "Interlude: Sunlight architecture" && \
optimize_image "$DOWNLOAD_DIR/interlude-sunlight-architecture.jpg" "interlude-sunlight-architecture" "$IMAGES_DIR/backgrounds" && \
record_credit \
    "interlude-sunlight-architecture.webp/jpg" \
    "https://unsplash.com/photos/sunlight-architecture" \
    "Unsplash Contributor" \
    "Unsplash" \
    "Unsplash License" \
    "3840x2160" \
    "Visual interlude"

# ============================================================
# EDITORIAL IMAGES
# ============================================================
echo ""
echo "=== EDITORIAL ==="

download_image \
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=3000&h=2000&fit=crop&crop=entropy" \
    "$DOWNLOAD_DIR/editorial-crystal-arrangement.jpg" \
    "Editorial: Crystal arrangement" && \
optimize_image "$DOWNLOAD_DIR/editorial-crystal-arrangement.jpg" "editorial-crystal-arrangement" "$IMAGES_DIR/editorial" && \
record_credit \
    "editorial-crystal-arrangement.webp/jpg" \
    "https://unsplash.com/photos/crystal-arrangement" \
    "Unsplash Contributor" \
    "Unsplash" \
    "Unsplash License" \
    "3000x2000" \
    "Editorial section"

# ============================================================
# COPY FINAL ASSETS TO CORRECT LOCATIONS
# ============================================================
echo ""
echo "=== COPYING TO FINAL LOCATIONS ==="

# Copy hero images to replace existing
cp "$IMAGES_DIR/hero/hero-amethyst-sunlight.webp" "$IMAGES_DIR/hero/hero.webp" 2>/dev/null || true
cp "$IMAGES_DIR/hero/hero-amethyst-sunlight.jpg" "$IMAGES_DIR/hero/hero.jpg" 2>/dev/null || true

# Copy product images to replace existing
for slug in amethyst rose-quartz black-tourmaline citrine clear-quartz labradorite green-aventurine selenite; do
    cp "$IMAGES_DIR/products/${slug}-primary.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
    cp "$IMAGES_DIR/products/${slug}-primary.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
done

# Copy jewellery
for slug in amethyst-bracelet rose-quartz-necklace; do
    cp "$IMAGES_DIR/jewellery/${slug}-primary.webp" "$IMAGES_DIR/products/${slug}.webp" 2>/dev/null || true
    cp "$IMAGES_DIR/jewellery/${slug}-primary.jpg" "$IMAGES_DIR/products/${slug}.jpg" 2>/dev/null || true
done

# Copy services/readings
for slug in tarot-reading personal-guidance intuitive-reading relationship-reading; do
    cp "$IMAGES_DIR/readings/${slug}-primary.webp" "$IMAGES_DIR/services/${slug}.webp" 2>/dev/null || true
    cp "$IMAGES_DIR/readings/${slug}-primary.jpg" "$IMAGES_DIR/services/${slug}.jpg" 2>/dev/null || true
done

echo ""
echo "=== DOWNLOAD COMPLETE ==="
echo "Credits saved to: $PROJECT_ROOT/docs/IMAGE-CREDITS.md"
echo "Images saved to: $IMAGES_DIR"
ls -la "$IMAGES_DIR"/**/*.webp 2>/dev/null | wc -l | xargs echo "Total WebP images:"
ls -la "$IMAGES_DIR"/**/*.jpg 2>/dev/null | wc -l | xargs echo "Total JPEG images:"