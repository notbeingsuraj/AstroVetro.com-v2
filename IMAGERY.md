# AstroVetro — Imagery Specifications

This document is the single source of truth for generating the website's
photography. The site is **already wired** to consume these images — you only
need to generate and drop them in. **No component or data changes are
required.**

## Why this matters

A luxury ecommerce / spiritual brand cannot rely on flat placeholders. The UI
currently renders photographic-style SVG scenes as graceful fallbacks. The
moment the real photographs below are saved to `public/images/`, they are
served automatically (via `<picture>` with AVIF/WebP) and the SVG scenes are
no longer shown.

## Where files go

```
public/images/
├── products/{slug}.webp      # hero product photo (also .avif if generated)
├── products/{slug}.jpg       # JPEG fallback (required)
├── services/{slug}.webp
├── services/{slug}.jpg
└── hero/hero.webp            # homepage hero
```

Slugs are defined in `src/data/products.js` and `src/data/services.js`.

Product slugs: `amethyst`, `rose-quartz`, `black-tourmaline`, `citrine`,
`clear-quartz`, `labradorite`, `green-aventurine`, `selenite`,
`amethyst-bracelet`, `rose-quartz-necklace`.

Service slugs: `tarot-reading`, `personal-guidance`, `intuitive-reading`,
`relationship-reading`.

## Global photography direction (one brand)

- **Lighting:** soft, high-dynamic-range natural/studio light; bright, not
  dark. Warm highlights, gentle falloff.
- **Background:** ivory / cream / soft stone. Clean, minimal, uncluttered.
- **Style:** luxury editorial + modern wellness + art photography.
- **Texture:** realistic mineral texture, macro detail, no smoothing away the
  geology.
- **Soften:** subtle contact shadows under each piece.
- **Forbidden:** text/logos/watermarks embedded in image files; occult or
  "witchy" props; glowing zodiac overload; cheesy galaxy backgrounds;
  cartoon moons/stars; neon purple; AI-looking fantasy art.

## Hero image

**Field:** `hero/hero.webp`
**Ratio:** portrait/cinematic, ~4:5 or 3:4, high-resolution (≥ 2000×2500).
**Prompt direction:** "A large amethyst crystal cluster photographed on a
bright ivory studio surface, dramatic soft natural light raking across the
facets, subtle lavender and gold reflections, gentle contact shadow, clean
cream background with generous negative space for typography, luxury editorial
product photography, macro detail, premium commercial photography quality."

## Product images

For each product, generate **one hero photograph** (see trends below) and
optionally a secondary detail shot.

Shared prompt shell (add per-mineral variations):

> "A [MINERAL] crystal on a cream ivory surface, soft studio natural light,
> subtle mineral texture with macro detail, gentle contact shadow, luxury
> editorial product photography, clean warm background, premium commercial
> quality, high dynamic range."

| Product | Mineral focus | Variation hint |
|---------|---------------|----------------|
| Amethyst | deep violet cluster | tall cluster, raking top light |
| Rose Quartz | soft pink mass | low angle, warm side light |
| Black Tourmaline | verticle black columns | vertical composition, cool light |
| Citrine | golden crystal | bright warm sunlight |
| Clear Quartz | transparent point | backlit, visible internal facets |
| Labradorite | iridescent grey-blue | angle showing labradorescence |
| Green Aventurine | speckled green | soft daylight, macro sparkle |
| Selenite | white fibrous wand | clean bright light, fine striations |
| Amethyst Bracelet | beads worn together | arranged on ivory, subtle shadow |
| Rose Quartz Necklace | cabochon on chain | draped, elegant, negative space |

## Services / guidance images

Shared prompt shell:

> "An intimate, elegant reading scene in natural sunlight on a cream/ivory
> table, luxury editorial magazine aesthetic, modern wellness, subtle
> spirituality, premium composition."

| Service | Scene |
|---------|-------|
| Tarot Reading | elegant splayed tarot cards, soft light, a few crystals |
| Personal Guidance | open journal and pen, contemplative, warm light |
| Intuitive Reading | quiet hands resting near a single card, bright airy |
| Relationship Reading | two small crystals side by side, tender composition |

**Forbidden in all service imagery:** fortune-teller aesthetics, dark rooms,
excessive candles, skulls, mystical fog, neon purple, zodiac overload.

## Generate → go live

1. Generate each image following the direction above (WebP preferred,
   ≤ 400KB/product, ≤ 2:1 target compression; hero ≤ 600KB).
2. Save to the paths above.
3. Hard refresh. The `<picture>` element negotiates AVIF → WebP → JPEG and
   lazy-loads below the fold. No code changes.

## Performance rules already enforced in code

- `loading="lazy"` on all below-the-fold images; `eager` + `fetchpriority=high`
  on the hero (LCP).
- Explicit `width`/`height`/aspect to prevent layout shift (CLS).
- Responsive `srcset` via `<picture>` for AVIF/WebP/JPEG.

## V1 revamp — complete per-asset prompt set

> Art direction for the AstroVetro V1 creative reset. This is a **new**
> collection — it must NOT resemble prior AstroVetro generations. Bright,
> optimistic, luxurious, contemporary: SUNLIGHT, MINERALS, GLASS,
> PEARLESCENCE, BOTANICALS, CELESTIAL OBSERVATION, LUXURY EDITORIAL,
> CONTEMPORARY WELLNESS, SCIENTIFIC BEAUTY.

**Global style (apply to every image):** soft high-dynamic-range natural/studio
light; ivory `#FBFAF6` / pearl / white architectural backgrounds; a few warm
accents (celestial sky, sage, gold, peach, lavender) used sparingly; realistic
mineral texture and macro detail; gentle contact shadows; clean, uncluttered
composition with generous negative space. **Forbidden:** text/logos/watermarks,
occult or "witchy" props, glowing zodiac overload, cartoon moons/stars, neon
purple, galaxy backgrounds, dark rooms, AI-looking fantasy art, and any reuse
of prior AstroVetro imagery.

### Hero (public/images/hero/hero)
Choose the strongest of these four concepts — all bright editorial:

1. A large translucent crystal lit by warm morning sunlight on a sculptural
   ivory stone surface, subtle celestial geometry reflected through glass,
   luxury editorial photography, 4K.
2. A collection of polished mineral specimens arranged like contemporary art
   objects in a bright architectural gallery, soft shadows, natural daylight,
   high-end editorial photography.
3. Extreme macro of a crystalline mineral structure with refracted sunlight
   producing subtle spectral colour, scientific beauty, premium commercial
   photography.
4. A luminous crystal composition with subtle botanical elements and
   transparent glass in a bright natural environment, luxury campaign
   photography.

### Products (public/images/products/{slug}) — one hero + optional detail shot
Shared shell — *"a [MINERAL] on a cream ivory surface, soft studio natural
light, realistic mineral texture with macro detail, gentle contact shadow,
luxury editorial product photography, clean warm background, premium
commercial quality, high dynamic range."*

| Slug | Mineral | Variation hint |
|------|---------|----------------|
| amethyst | deep violet cluster | tall cluster, raking top light |
| rose-quartz | soft pink mass | low angle, warm side light |
| black-tourmaline | vertical black columns | vertical composition, cool light |
| citrine | golden crystal | bright warm sunlight |
| clear-quartz | transparent point | backlit, visible internal facets |
| labradorite | iridescent grey-blue | angle showing labradorescence |
| green-aventurine | speckled green | soft daylight, macro sparkle |
| selenite | white fibrous wand | clean bright light, fine striations |
| amethyst-bracelet | beads worn together | arranged on ivory, subtle shadow |
| rose-quartz-necklace | cabochon on chain | draped, elegant, negative space |

### Services / readings (public/images/services/{slug})
Shared shell — *"an intimate, elegant reading scene in natural sunlight on a
cream/ivory table, luxury editorial magazine aesthetic, modern wellness,
subtle spirituality, premium composition."*

| Slug | Scene |
|------|-------|
| tarot-reading | elegant splayed tarot cards, soft light, a few crystals |
| personal-guidance | open journal and pen, contemplative, warm light |
| intuitive-reading | quiet hands resting near a single card, bright airy |
| relationship-reading | two small crystals side by side, tender composition |

### Science / cosmos supporting graphics
Subtle, scientific-observation-inspired (lattice, mineral structure, orbital
geometry, spectroscopy, geological layers). No fake scientific claims.

### Automated pipeline
- Place full-res sources in `public/images-src/` per that folder's README.
- Run `npm run images` → `scripts/generate-images.mjs` writes optimized
  AVIF/WebP/JPEG derivatives to `public/images/`, which the UI serves
  automatically. (Requires `sharp`: `npm install -D sharp`.)
