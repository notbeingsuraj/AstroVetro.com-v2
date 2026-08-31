# AstroVetro — Find what feels like you.

A bright, optimistic, luxurious, contemporary landing page for AstroVetro — a
brand at the intersection of luxury, cosmos, science, nature, spirituality and
self-discovery.

The site feels like sunlight entering a modern gallery: bright, editorial,
conversion-focused. Modern spirituality meeting the precision of science.

## Tech Stack

- **React 19** + **Vite 8**
- **Tailwind CSS v4** (design tokens in `src/index.css` via `@theme`)
- **Framer Motion** (restrained, scroll-triggered, reduced-motion-aware)

## Design System

All brand tokens are defined in `src/index.css` under `@theme`:

| Token | Value |
|-------|-------|
| `--color-ivory` | `#fbfaf6` (dominant background) |
| `--color-pearl` | `#f7f5ef` (secondary surface) |
| `--color-white` | `#ffffff` (cards, frames) |
| `--color-sand` | `#ede7da` (divider tints) |
| `--color-ink` | `#181817` (text primary) |
| `--color-ink-soft` | `#6d6a63` (text secondary) |
| `--color-celestial` | `#a9d7f2` (accent) |
| `--color-aqua` | `#a9ddd2` (accent) |
| `--color-sage` | `#b8d2b6` (accent) |
| `--color-solar` | `#e7c875` (accent) |
| `--color-peach` | `#f2b99e` (accent) |
| `--color-coral` | `#e99d8c` (accent) |
| `--color-lavender` | `#cec3e7` (accent) |
| `--color-destructive` | `#c4553f` (destructive only) |

Typography: **Instrument Serif** (display) + **Manrope** (sans). Exactly two
weights max (400 regular, 600 semibold).

Palette ratio: **60/30/10** — mostly ivory/white/charcoal, with the seven
tonal accents reserved for targeted "moments of emotion" (intention discovery,
fine rules, image grading, hover washes) rather than covering every surface.

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
