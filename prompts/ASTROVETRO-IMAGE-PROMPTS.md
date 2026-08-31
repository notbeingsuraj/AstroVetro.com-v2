# AstroVetro V1 — Image Generation Prompts (Copy-Paste Ready)
<!-- Generated for the AstroVetro bright editorial revamp. Each block lists the
     aspect ratio + a ready-to-paste positive prompt (+ a shared negative block).
     Generate at 4K+ and drop sources into public/images-src/ then run
     `npm run images`. See IMAGERY.md for the full direction. -->

---

## GLOBAL STYLE BLOCK (append to the END of every prompt unless stated otherwise)

````
, soft high-dynamic-range natural studio light, bright and airy, warm highlights and gentle falloff, ivory and cream architectural background, clean minimal composition with generous negative space, realistic mineral texture with macro detail, gentle contact shadow, luxury editorial photography, modern wellness aesthetic, premium commercial quality, 4k, high detail
````

## NEGATIVE PROMPT (use this as the negative block in every generation)

````
text, logo, watermark, signature, words, captions, low resolution, blurry, oversaturated, neon, glow, dark or black background, galaxy background, fake stars, cartoon moon, zodiac overload, occult symbols, witchy props, candles, fog, skulls, purple smoke, fantasy AI art, 3d render looking fake, glossy plastic, warped, distorted anatomy, extra limbs, busy cluttered composition, harsh shadows
````

---

# 1. HERO — `public/images-src/hero/hero.jpg` (choose ONE of the 4 concepts)
Ratio: **portrait 4:5** (e.g. 2400 × 3000) — matches the hero frame.

### Concept A — Translucent crystal, morning sun
````
A large translucent amethyst crystal cluster lit by warm morning sunlight, standing on a sculptural ivory stone pedestal, subtle faint celestial geometry softly reflected through clear glass, generous negative space, luxury editorial product photography, premium commercial quality
````
GLOBAL STYLE BLOCK

### Concept B — Mineral specimens in a bright gallery
````
A curated collection of polished mineral specimens arranged like contemporary art objects on a wide ivory shelf inside a bright white architectural gallery, soft natural shadows, airy sunlight, high-end editorial interior photography, premium commercial quality
````
GLOBAL STYLE BLOCK

### Concept C — Extreme macro, refracted sunlight
````
Extreme macro photograph of a crystalline quartz structure with refracted sunlight producing subtle spectral colour flashes through the internal facets, scientific beauty, extremely detailed, premium commercial science photography, bright luminous background
````
GLOBAL STYLE BLOCK

### Concept D — Luminous crystal with botanicals
````
A luminous clear crystal composition surrounded by subtle sage botanicals and transparent glass vessels, bright natural environment, warm ambient light, sophisticated luxury campaign photography, serene and optimistic mood
````
GLOBAL STYLE BLOCK

---

# 2. PRODUCTS — `public/images-src/products/{slug}.jpg`
Ratio: **square 1:1** (e.g. 2400 × 2400) crystals; **portrait 4:5** (e.g. 2000 × 2500) for the two jewellery pieces.
Generate **one hero shot** plus optionally one close detail shot per product.

### amethyst
````
A tall deep-violet amethyst crystal cluster standing upright on a cream ivory surface, raking soft natural top light across the facets, realistic mineral texture with macro detail, gentle contact shadow
````
GLOBAL STYLE BLOCK

### rose-quartz
````
A soft pink rose quartz mass on a cream ivory surface, low camera angle, warm soft side light, smooth polished texture with fine natural detail, gentle contact shadow
````
GLOBAL STYLE BLOCK

### black-tourmaline
````
Vertical black tourmaline columns bound together on a cream ivory surface, vertical composition, cool soft daylight, striated mineral texture with macro detail, gentle contact shadow
````
GLOBAL STYLE BLOCK

### citrine
````
A golden citrine crystal on a cream ivory surface, bright warm sunlight raking across the facets, glowing warm amber tones, realistic mineral texture, gentle contact shadow
````
GLOBAL STYLE BLOCK

### clear-quartz
````
A transparent clear quartz point on a cream ivory surface, softly backlit to reveal internal facets and refraction, bright luminous clarity, realistic mineral texture, gentle contact shadow
````
GLOBAL STYLE BLOCK

### labradorite
````
A labradorite crystal on a cream ivory surface, angle chosen to show subtle blue-grey iridescent labradorescence, soft natural daylight, realistic mineral texture with fine detail, gentle contact shadow
````
GLOBAL STYLE BLOCK

### green-aventurine
````
A speckled green aventurine crystal on a cream ivory surface, soft daylight with gentle macro sparkle in the metallic flecks, realistic mineral texture, gentle contact shadow
````
GLOBAL STYLE BLOCK

### selenite
````
A clean white fibrous selenite wand on a cream ivory surface, bright even light, fine parallel striations visible, luminous serene presence, gentle contact shadow
````
GLOBAL STYLE BLOCK

### amethyst-bracelet  (portrait 4:5)
````
An amethyst bead bracelet elegantly arranged in a soft spiral on an ivory surface, subtle shadows, calm and refined, realistic polished bead texture, gentle contact shadow
````
GLOBAL STYLE BLOCK

### rose-quartz-necklace  (portrait 4:5)
````
A delicate rose quartz cabochon necklace draped gracefully over an ivory stone with generous negative space, elegant and minimal, soft warm light, gentle contact shadow
````
GLOBAL STYLE BLOCK

---

# 3. SERVICES / READINGS — `public/images-src/services/{slug}.jpg`
Ratio: **4:3** (e.g. 2000 × 1500). Luxury editorial portraiture + wellness studio, bright and intimate — never occult.

### tarot-reading
````
An elegant splayed fan of tarot cards on a cream ivory table in soft natural sunlight, a few small crystals resting nearby, warm minimal wellness-studio aesthetic, luxury editorial magazine composition
````
GLOBAL STYLE BLOCK

### personal-guidance
````
An open journal and a pen beside a small crystal on a cream ivory table, contemplative and calm, warm soft light, thoughtful editorial composition, modern wellness aesthetic
````
GLOBAL STYLE BLOCK

### intuitive-reading
````
A woman's quiet hands resting gently near a single upright tarot card on a bright airy ivory table, soft natural light, serene intimate wellness editorial portrait, modern and calm
````
GLOBAL STYLE BLOCK

### relationship-reading
````
Two small crystals (soft pink and deep violet) placed tenderly side by side on a cream ivory surface, gentle warm light, intimate, calm and optimistic editorial composition
````
GLOBAL STYLE BLOCK

---

# 4. SCIENCE / COSMOS — supporting graphics (optional, subtle)
Ratio: **square 1:1** or **4:3**. Scientific-observation inspired; NO fake claims — purely aesthetic/educational texture.

### crystal-lattice
````
An elegant minimal scientific diagram of a crystal lattice with warm ivory background, thin neutral lines and soft lavender and sage nodes, modern scientific illustration, clean and precise, lots of negative space
````
GLOBAL STYLE BLOCK

### mineral-strata
````
A clean minimal cross-section illustration of geological mineral strata in warm neutral tones with a subtle gold and aqua accent layer, modern scientific editorial illustration, precise and calm
````
GLOBAL STYLE BLOCK

### orbital-chart
````
A delicate minimal astronomical orbital chart with thin neutral lines and a soft peach and pale blue accent, ivory background, precise scientific editorial illustration, generous negative space
````
GLOBAL STYLE BLOCK

---

## HOW TO USE
1. Copy the chosen **positive prompt**, then paste the **GLOBAL STYLE BLOCK** on the end.
2. Paste the **NEGATIVE PROMPT** into the negative-prompt field.
3. Generate at the stated **ratio at 4K+**.
4. Save source JPGs to `public/images-src/{hero,products,services}/` using the exact filename slugs above.
5. `npm install -D sharp` then `npm run images` → optimized AVIF/WebP/JPEG derivatives are auto-served by the site.
