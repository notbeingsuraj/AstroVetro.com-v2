# AstroVetro — Find what resonates.

A bright, modern, premium landing page for AstroVetro — a brand at the
intersection of crystals, spiritual practice, self-discovery, nature and the
cosmos.

Inspired by the visual confidence of Apple, **without copying it**: light,
airy, editorial, conversion-focused. The site feels like sunlight entering a
modern gallery — modern spirituality meeting the precision of astrophysics.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (design tokens in `src/index.css` via `@theme`)
- **Framer Motion** (restrained, scroll-triggered, reduced-motion-aware)

## Design System

All brand tokens are defined in `src/index.css` under `@theme`:

| Token | Value |
|-------|-------|
| `--color-ivory` | `#faf9f5` (primary background) |
| `--color-stone-soft` | `#f1eee7` |
| `--color-ink` | `#171717` (text) |
| `--color-ink-soft` | `#68645d` (secondary text) |
| `--color-celestial` | `#9ec7e3` |
| `--color-mineral` | `#a9c5ae` |
| `--color-solar` | `#e6c875` |
| `--color-lavender` | `#c9bde0` |
| `--color-coral` | `#d99a82` |
| `--color-champagne` | `#c6a96b` |

Typography: **Instrument Serif** (display) + **Manrope** (sans).

Palette ratio: ~80% whites/creams/neutrals, ~20% subtle celestial & mineral
accents.

## Components

`src/components/` — each section is a modular component, ready for API
integration:

- `Navbar` — sticky nav, transparent → frosted on scroll, mobile menu
- `Hero` — "Find what resonates." with abstract crystal + orbital diagram
- `Statement` — "Everything begins with an intention."
- `IntentionExplorer` — "What are you seeking?" 8 editorial intention cards
- `ProductFeature` — hero product storytelling (Amethyst)
- `ProductGrid` / `ProductCard` — additional pieces
- `CraftStory` — why AstroVetro pieces differ
- `ScienceSection` — science × spirituality (with lattice diagram)
- `GuidanceTransition` — "something to carry / something to understand"
- `GuidanceSection` — tarot / personal guidance booking
- `ExperienceSteps` — 3-step reading experience
- `TrustSection` — thoughtfully chosen, intentionally offered
- `Testimonials` — community stories
- `Journal` — "Look closer." editorial knowledge section
- `FinalCTA` — "Start with what resonates."
- `Footer`

## Conversion Paths

The page optimizes for **product purchase** and **reading booking**:

```
Hero → Explore the Collection   (→ #collection)
Hero → Explore Readings         (→ #services)
Intention → filter collection   (→ #collection)
Final CTA → Collection / Reading
```

**Products** (objects to carry) and **Services** (experiences to understand)
are clearly distinguishable — distinct sections, distinct photography and
layout — yet remain one unified AstroVetro brand.

## Data Layer

All content lives in `src/data/` so it can be swapped for real API responses:

- `products.js` — 10 products with clean INR pricing (see Pricing note below)
- `services.js` — 4 guidance services (Tarot, Personal, Intuitive, Relationship)
- `intentions.js` — 8 intentions, each mapped to real product ids
- `testimonials.js` — community stories
- `journal.js` — editorial articles

**Pricing note:** the repo contains no existing pricing data layer, so prices
use sensible INR values for a premium Indian crystal/spiritual brand (e.g.
Amethyst ₹888, Rose Quartz ₹799, Black Tourmaline ₹999). Replace these in the
data files with real database values when the API is connected. No claims
about rarity or sourcing are fabricated.

## Imagery System

Real photography is the single biggest lever for making the site feel premium.
It isn't committed here, but the site is **fully wired to consume it**:

- `src/components/visual/ProductImage.jsx` serves AVIF → WebP → JPEG via
  `<picture>`, lazy-loads below the fold, eagerly loads the hero (LCP), and
  sets explicit dimensions to prevent layout shift (CLS).
- `src/components/visual/MineralScene.jsx`, `HeroScene.jsx` and
  `ServiceVisual.jsx` render photographic-style SVG scenes as graceful
  fallbacks, so the layout never depends on missing assets.
- **Generate the real photos per `IMAGERY.md`** and drop them into
  `public/images/{products,services,hero}/`. No component or data changes are
  needed — they load automatically.

An editorial/scientific background grid (`src/components/visual/EditorialGrid.jsx`)
adds subtle architectural-rhythm linework, coordinate markers and orbital arcs
across sections.

## Getting Started

```bash
npm install
npm run dev        # start dev server
npm run build      # production build
npm run preview    # preview the build
```

## Responsive

Mobile-first and verified with no horizontal overflow at 375, 390, 430, 768,
1024, 1440 and 1920px. Layouts recompose for mobile rather than stacking
desktop verbatim.

## Motion

Slow, precise and expensive — smooth hero entrance, subtle image scaling,
scroll-triggered reveals, intention hover states, and a gentle crystal float.
Full `prefers-reduced-motion` support.

## Integration Ready

Components use mock data and are structured to connect to a MongoDB/API
backend. No checkout or authentication is included — this focuses entirely on
the landing page.
