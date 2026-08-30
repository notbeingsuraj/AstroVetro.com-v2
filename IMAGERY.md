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
