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
Hero → Find Your Crystal        (→ #intentions)
Hero → Book a Reading           (→ #guidance)
Guidance → Book a Reading       (→ #guidance)
Final CTA → Collection / Reading
```

Two paths, one brand: **objects to carry** and **perspectives to discover** —
never framed as a Products/Services split.

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
