---
phase: 1
slug: ui-revamp
wave: 1
depends_on: []
files_modified:
  - src/index.css
  - src/App.jsx
  - src/main.jsx
  - index.html
  - src/components/Navbar.jsx
  - src/components/Hero.jsx
  - src/components/BrandStatement.jsx
  - src/components/IntentionExplorer.jsx
  - src/components/ProductFeature.jsx
  - src/components/ProductCard.jsx
  - src/components/ProductGrid.jsx
  - src/components/ScienceSection.jsx
  - src/components/VisualInterlude.jsx
  - src/components/GuidanceTransition.jsx
  - src/components/ServicesSection.jsx
  - src/components/ExperienceSteps.jsx
  - src/components/TrustSection.jsx
  - src/components/Testimonials.jsx
  - src/components/Journal.jsx
  - src/components/FinalCTA.jsx
  - src/components/Footer.jsx
  - src/components/Motion.jsx
  - src/components/visual/ProductImage.jsx
  - src/components/visual/HeroScene.jsx
  - src/components/visual/MineralScene.jsx
  - src/components/visual/EditorialGrid.jsx
  - src/components/visual/ServiceVisual.jsx
autonomous: false
---

# Plan 1 — Foundation + Design Tokens + Typography System

## Objective
Replace the entire visual foundation: design tokens, typography, global styles, and the shared motion/animation utilities. This creates the base layer that all subsequent component rewrites consume.

## Must Haves

### must_haves.truths:
- "src/index.css contains @theme block with all 13 colour tokens from UI-SPEC (ivory #FFF9F1, ink #17131D, deep-plum #321B45, electric-lilac #B88CFF, butter-yellow #FFE66D, tangerine #FF8A4C, coral #FFB5A7, aqua #75E6DA, mint #B8F2D0, text-secondary #4A4058, text-muted #7A7088, text-on-dark #FFF9F1, destructive #E53E3E)"
- "src/index.css @theme block contains typography tokens: --font-display (Instrument Serif), --font-sans (Manrope)"
- "src/index.css @theme block contains spacing tokens: --space-xs (4px) through --space-section (120px)"
- "src/index.css @theme block contains radius tokens: --radius-none (0) through --radius-full (999px)"
- "src/index.css @theme block contains motion tokens: --ease-out-expo cubic-bezier(0.16, 1, 0.3, 1)"
- "src/index.css @theme block contains shadow tokens: --shadow-soft and --shadow-lift"
- "index.html loads Google Fonts for Instrument Serif and Manrope"
- "src/index.css body uses font-family: var(--font-sans), background: var(--color-ivory), color: var(--color-ink)"
- "src/index.css contains prefers-reduced-motion media query that disables animations"
- "src/components/Motion.jsx exports reusable animation components: ScrollReveal, TextSplit, Parallax, HoverScale, MagneticButton"
- "Every Motion component respects framer-motion useReducedMotion"
- "All old Vedic luxury colour tokens (dugdha, gauri, kesari, kumkum, etc.) are removed from index.css"
- "All old font references (Cormorant Garamond, DM Sans) are removed from index.css"

### must_haves.prohibitions:
- "Do NOT use colours outside the declared 13-token palette"
- "Do NOT add font weights beyond 400 and 500/600"
- "Do NOT use bounce easing or spring physics in motion tokens"
- "Do NOT remove the prefers-reduced-motion guard"

## Tasks

### Task 1: Replace Design Tokens in index.css

<read_first>
- src/index.css (current Vedic luxury tokens — must be fully replaced)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Design Tokens — the source of truth)
</read_first>

<action>
Delete the entire existing @theme block in src/index.css (lines containing --color-dugdha, --color-gauri, --color-kesari, --color-kumkum, --color-mayura, --color-haldi, --color-raktachandana, --color-neelotpala, --color-tamra, --color-chandana, --color-kamala, --color-neela, --color-bhasma, --color-text-primary, --color-text-secondary, --color-text-muted, --color-text-on-dark, --color-text-on-color, --color-destructive, --font-display, --font-sans, --font-devanagari, --radius-*, --shadow-*, --ease-*, --space-*). Replace with the complete new token set from UI-SPEC § Design Tokens. The new @theme block must contain:
- 13 colour tokens exactly as specified in the colour table
- 2 font families: --font-display: "Instrument Serif", serif; --font-sans: "Manrope", sans-serif
- Spacing scale: --space-xs (4px) through --space-section (120px)
- Border radius: --radius-none (0) through --radius-full (999px)
- Shadows: --shadow-soft and --shadow-lift with the exact rgba values from UI-SPEC
- Motion: --ease-out-expo cubic-bezier(0.16, 1, 0.3, 1)
- Also update body CSS rule: font-family to var(--font-sans), background to var(--color-ivory), color to var(--color-ink)
- Update ::selection background to var(--color-electric-lilac)
- Update scrollbar track background to var(--color-ivory)
- Remove the --font-devanagari declaration entirely
</action>

<acceptance_criteria>
- `grep -c "color-dugdha\|color-kesari\|color-kumkum\|color-mayura\|color-haldi\|Cormorant\|DM Sans" src/index.css` returns 0 (all old tokens removed)
- `grep "color-ivory.*FFF9F1" src/index.css` returns a match
- `grep "color-deep-plum.*321B45" src/index.css` returns a match
- `grep "color-electric-lilac.*B88CFF" src/index.css` returns a match
- `grep "font-display.*Instrument Serif" src/index.css` returns a match
- `grep "font-sans.*Manrope" src/index.css` returns a match
- `grep "ease-out-expo.*0.16.*1.*0.3.*1" src/index.css` returns a match
- `npm run build` exits 0
</acceptance_criteria>

### Task 2: Load Google Fonts in index.html

<read_first>
- index.html (current HTML head — check for existing font links)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Typography — font specification)
</read_first>

<action>
In index.html, add Google Fonts preconnect and stylesheet links for:
- Instrument Serif (weights: 400; italic 400)
- Manrope (weights: 400; 500; 600)
Use the Google Fonts API v2 URL format. Place preconnect links before stylesheet links. Remove any existing font links for Cormorant Garamond or DM Sans if present.
</action>

<acceptance_criteria>
- `grep "Instrument Serif" index.html` returns a match (font loaded)
- `grep "Manrope" index.html` returns a match (font loaded)
- `grep "Cormorant\|DM+Sans" index.html` returns no matches (old fonts removed)
- `npm run build` exits 0
</acceptance_criteria>

### Task 3: Create Shared Motion Utilities

<read_first>
- src/components/Motion.jsx (current motion component — understand existing pattern)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Motion / Timing — animation spec)
</read_first>

<action>
Rewrite src/components/Motion.jsx to export the following reusable animation components, all built on framer-motion:
1. **ScrollReveal** — wraps children, uses useInView + animate from opacity:0/y:30 to opacity:1/y:0 with --ease-out-expo timing. Props: delay, className, direction (up/left/right).
2. **TextSplit** — takes a `text` string prop, splits into words/lines, animates each with stagger (0.08s). Uses useReducedMotion to skip animation.
3. **Parallax** — wraps children, applies subtle translateY based on scroll position. Speed prop (default 0.1). Capped at ±20% of scroll delta.
4. **HoverScale** — wraps children, applies scale(1.02) on hover with 0.3s ease transition.
5. **MagneticButton** — wraps a button/link, applies subtle translate on mouse move toward cursor. Returns to origin on mouse leave. Uses useReducedMotion.
6. **FadeIn** — simple opacity fade-in on mount or when inView. Props: delay, duration (default 0.9s).

All components must check useReducedMotion() from framer-motion and return static (no-animation) variants when true. Export all as named exports.
</action>

<acceptance_criteria>
- `grep "export.*ScrollReveal\|export.*TextSplit\|export.*Parallax\|export.*HoverScale\|export.*MagneticButton\|export.*FadeIn" src/components/Motion.jsx` returns matches for all 6
- `grep "useReducedMotion" src/components/Motion.jsx` returns a match
- `npm run build` exits 0
</acceptance_criteria>

### Task 4: Create ProductImage Component

<read_first>
- src/components/visual/ProductImage.jsx (if exists, current implementation)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Image Aspect Ratios, § Imagery Requirements)
</read_first>

<action>
Create or rewrite src/components/visual/ProductImage.jsx. This component renders a responsive `<picture>` element with:
- AVIF source (srcset from image prop, format avif)
- WebP source (srcset from image prop, format webp)
- JPEG fallback (img tag with poster prop or image prop)
- Explicit width and height props (required)
- loading="lazy" for below-fold images, loading="eager" for hero
- object-fit: cover with configurable aspect ratio via className
- Alt text from a required `alt` prop
- Graceful fallback: if no image prop, render an SVG placeholder scene (simple gradient + crystal shape)
Props: image, poster, alt, width, height, className, eager (boolean, default false), aspectRatio (string, default "4/5")
</action>

<acceptance_criteria>
- `test -f src/components/visual/ProductImage.jsx` exits 0 (file exists)
- `grep "picture" src/components/visual/ProductImage.jsx` returns a match
- `grep "loading=" src/components/visual/ProductImage.jsx` returns a match
- `grep "alt=" src/components/visual/ProductImage.jsx` returns a match
- `npm run build` exits 0
</acceptance_criteria>

---

# Plan 2 — Navigation + Hero + Brand Statement

## Objective
Rewrite the navigation (desktop + full-screen mobile menu), the hero section (art-directed overlapping composition), and the brand statement (oversized editorial serif).

## Must Haves

### must_haves.truths:
- "Navbar renders ASTROVETRO wordmark + SHOP/READINGS/DISCOVER/JOURNAL links + EXPLORE CTA"
- "Navbar mobile menu is full-screen overlay with huge serif typography and animated open/close"
- "Navbar changes background on scroll: transparent → ivory/70 + backdrop-blur + thin border"
- "Hero renders full-screen composition with overlapping crystal image + headline FIND/WHAT/FEELS/LIKE/YOU."
- "Hero includes editorial metadata: ASTROVETRO / 001 · MINERAL OBJECT · EARTH → COSMOS"
- "Hero has two CTAs: Explore the Collection (primary) + Discover Readings (secondary)"
- "Hero entrance animation: background fade → image clip reveal → headline line-by-line → metadata → CTA → orbital element"
- "BrandStatement renders WE ARE/MADE OF/THE SAME/MATTER/AS THE/STARS. in massive asymmetric serif on Deep Plum background"
- "BrandStatement uses Instrument Serif at display size (72-96px)"
- "Navigation colour-aware: adjusts text colour based on section background (dark on light, light on dark)"

### must_haves.prohibitions:
- "Do NOT reproduce the existing navbar design"
- "Do NOT make the navbar huge or SaaS-dashboard-like"
- "Do NOT use a standard hamburger icon for mobile — use full-screen editorial overlay"
- "Do NOT bounce or spin any hero elements"
- "Do NOT make the hero a centered rectangular photograph"

## Tasks

### Task 5: Rewrite Navbar

<read_first>
- src/components/Navbar.jsx (current implementation — understand data flow and state)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Navigation — exact spec)
- src/index.css (new tokens available)
</read_first>

<action>
Completely rewrite src/components/Navbar.jsx. New design:
- Desktop: Fixed top, transparent by default. On scroll (use IntersectionObserver or scroll listener): background becomes var(--color-ivory) at 70% opacity + backdrop-blur-md + thin 1px border-bottom at ink/8 opacity.
- Layout: max-w-7xl mx-auto, flex items-center justify-between. Left: "ASTROVETRO" in Instrument Serif, font-size ~18px, letter-spacing 0.05em. Center: links "SHOP · READINGS · DISCOVER · JOURNAL" in Manrope 14px weight 500, hover → color change. Right: "EXPLORE" button (primary style: bg-ink text-ivory rounded-full px-6 py-2).
- Mobile (below 768px): Show hamburger button (3 lines). On click: full-screen overlay with var(--color-ivory) background, links displayed as huge Instrument Serif text (40-56px), stacked vertically with generous spacing. Animated open/close with framer-motion (opacity + y translate). Include a close (X) button. The EXPLORE CTA appears at bottom of mobile menu.
- Colour-aware: accept an optional `variant` prop or detect section background. When over dark sections (Deep Plum), text switches to var(--color-text-on-dark).
- Remove any existing Search/Account/Cart icons/links — the brief specifies only the 4 links + CTA.
</action>

<acceptance_criteria>
- `grep "ASTROVETRO" src/components/Navbar.jsx` returns a match (wordmark)
- `grep "SHOP.*READINGS.*DISCOVER.*JOURNAL" src/components/Navbar.jsx` returns a match (links)
- `grep "EXPLORE" src/components/Navbar.jsx` returns a match (CTA)
- `grep "backdrop-blur" src/components/Navbar.jsx` returns a match (scroll effect)
- `grep "full.screen\|fullscreen\|FullScre\|isMenuOpen" src/components/Navbar.jsx` returns a match (mobile menu)
- `grep "Instrument Serif\|font-display" src/components/Navbar.jsx` returns a match (typography)
- `npm run build` exits 0
</acceptance_criteria>

### Task 6: Rewrite Hero

<read_first>
- src/components/Hero.jsx (current implementation)
- src/components/visual/HeroScene.jsx (current SVG fallback)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Hero — complete rebuild spec)
- src/data/products.js (featured product data for hero image)
</read_first>

<action>
Completely rewrite src/components/Hero.jsx. New design:
- Full-viewport height (min-h-screen), background var(--color-ivory) with subtle grain texture (CSS pseudo-element, opacity ≤ 3%).
- Layout: Asymmetric composition, NOT centered. Left side (or overlapping center): Large crystal image (use HeroScene SVG as fallback, real image when available) at 4:5 aspect ratio, positioned with negative margins or absolute positioning to overlap with text.
- Headline: "FIND\nWHAT\nFEELS\nLIKE\nYOU." in Instrument Serif, 72-96px on desktop, 48-56px on mobile. Each word on its own line. Positioned to overlap with the image.
- Editorial metadata: Small text block positioned at top-right or bottom-left: "ASTROVETRO / 001" on one line, "MINERAL OBJECT" on next, "EARTH → COSMOS" on next. Manrope 10-11px, uppercase, letterspacing 0.18em, color var(--color-text-muted).
- CTAs: Two buttons below headline. Primary: "Explore the Collection" (bg-ink text-ivory pill). Secondary: "Discover Readings" (hairline border, text-ink). Both with arrow → hover animation.
- Orbital element: A subtle CSS circle/ring element (border: 1px solid electric-lilac at 20% opacity) that slowly rotates. Position it overlapping the image area.
- Entrance animation (sequential): (1) background fades in, (2) image reveals using clip-path polygon animation (framer-motion), (3) headline enters line-by-line with stagger 0.1s, (4) metadata fades in, (5) CTAs slide up, (6) orbital element begins rotation. Use ScrollReveal or custom variants from Motion.jsx.
- Mobile: Stack vertically, image above headline, smaller but still bold. Metadata becomes compact.
</action>

<acceptance_criteria>
- `grep "FIND" src/components/Hero.jsx` returns a match
- `grep "Explore the Collection" src/components/Hero.jsx` returns a match
- `grep "Discover Readings" src/components/Hero.jsx` returns a match
- `grep "ASTROVETRO.*001\|MINERAL OBJECT" src/components/Hero.jsx` returns a match
- `grep "clip-path\|clipPath" src/components/Hero.jsx` returns a match (image reveal animation)
- `grep "orbital\|Orbit" src/components/Hero.jsx` returns a match (orbital element)
- `grep "min-h-screen\|min-h-dvh" src/components/Hero.jsx` returns a match (full viewport)
- `npm run build` exits 0
</acceptance_criteria>

### Task 7: Rewrite BrandStatement

<read_first>
- src/components/BrandStatement.jsx (current implementation)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 02)
</read_first>

<action>
Completely rewrite src/components/BrandStatement.jsx. New design:
- Background: var(--color-deep-plum) (#321B45), full-width section.
- Headline: "WE ARE\nMADE OF\nTHE SAME\nMATTER\nAS THE\nSTARS." in Instrument Serif, 56-72px desktop / 36-48px mobile. Each line break is intentional and explicit (not flowing text). Color: var(--color-text-on-dark).
- Layout: Asymmetric — headline positioned left-of-center (max-w-3xl, ml-0, mr-auto on desktop). NOT centered.
- Subtle decorative element: thin horizontal line (1px, electric-lilac at 20% opacity) extending from the headline to the right edge.
- Minimal supporting copy below headline (optional, 1-2 sentences in Manrope 16px, color text-on-dark at 60% opacity): something like "Crystals formed over millions of years. Selected with intention. Meant for you."
- Section padding: var(--space-section) vertical.
- ScrollReveal animation on headline lines (stagger 0.1s).
</action>

<acceptance_criteria>
- `grep "WE ARE" src/components/BrandStatement.jsx` returns a match
- `grep "MADE OF" src/components/BrandStatement.jsx` returns a match
- `grep "STARS" src/components/BrandStatement.jsx` returns a match
- `grep "deep.plum\|deep-plum\|#321B45" src/components/BrandStatement.jsx` returns a match (background)
- `grep "font-display\|Instrument" src/components/BrandStatement.jsx` returns a match
- `npm run build` exits 0
</acceptance_criteria>

---

# Plan 3 — Intention Discovery + Product Showcase

## Objective
Rewrite the interactive intention explorer (8 large typographic interactive objects with hover effects) and the product presentation (featured product editorial showcase + asymmetric collection grid).

## Must Haves

### must_haves.truths:
- "IntentionExplorer renders 8 intention words as large typographic interactive objects, not cards"
- "IntentionExplorer hover effect: colour change + image change + subtle scale + related product preview + background shift"
- "IntentionExplorer headline: WHAT ARE YOU/LOOKING FOR?"
- "IntentionExplorer background: Butter Yellow (#FFE66D)"
- "ProductFeature renders alternating left/right layout with massive crystal image + product details"
- "ProductFeature uses real featured product (Amethyst, ₹888)"
- "ProductGrid uses asymmetric image sizing (BIG/SMALL/MEDIUM pattern), NOT uniform grid"
- "ProductCard shows name + tagline + price + Explore CTA"
- "ProductCard CTA links to product detail or highlights product"
- "ProductGrid has category navigation: CRYSTALS / JEWELLERY / GIFTS / OBJECTS"
- "Selecting an intention filters the ProductGrid to matching products"

### must_haves.prohibitions:
- "Do NOT put intentions inside eight boring cards"
- "Do NOT create a generic 4-column ecommerce grid"
- "Do NOT invent prices or products — use only data from src/data/products.js and src/data/intentions.js"

## Tasks

### Task 8: Rewrite IntentionExplorer

<read_first>
- src/components/IntentionExplorer.jsx (current implementation — understand intention filtering logic)
- src/data/intentions.js (8 intentions with ids, titles, descriptions, colours, productIds)
- src/data/products.js (product data for filtering)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 03)
</read_first>

<action>
Completely rewrite src/components/IntentionExplorer.jsx. New design:
- Background: var(--color-butter-yellow) (#FFE66D), full-width section.
- Headline: "WHAT ARE YOU\nLOOKING FOR?" in Instrument Serif, 48-64px, positioned top-left of section.
- Layout: The 8 intention words (CALM, LOVE, FOCUS, PROTECTION, CONFIDENCE, ABUNDANCE, GROWTH, CLARITY) displayed as large typographic interactive objects arranged in a scattered/asymmetric layout (NOT a grid of cards). Each word is 32-48px Instrument Serif.
- Interaction on hover/intent:
  - Word scales up slightly (scale 1.05)
  - Background colour washes to the intention's `color` value (from data)
  - A related product image fades in nearby (use ProductImage component with the first product from intention.productIds)
  - The entire section background subtly shifts tint
- On click: sets activeIntentionId (via the existing onSelectIntention callback prop) and scrolls to collection
- Active state: the selected intention stays highlighted with its colour, others dim to 40% opacity
- Mobile: Stack intentions in a 2-column loose grid, still large text, tap to select
- Use framer-motion for hover animations and transitions
</action>

<acceptance_criteria>
- `grep "WHAT ARE YOU" src/components/IntentionExplorer.jsx` returns a match
- `grep "CALM\|LOVE\|FOCUS\|PROTECTION\|CONFIDENCE\|ABUNDANCE\|GROWTH\|CLARITY" src/components/IntentionExplorer.jsx` returns matches for all 8
- `grep "butter.yellow\|butter-yellow\|#FFE66D" src/components/IntentionExplorer.jsx` returns a match (background)
- `grep "onSelectIntention\|activeIntentionId" src/components/IntentionExplorer.jsx` returns a match (filtering integration)
- `grep "whileHover\|onHover" src/components/IntentionExplorer.jsx` returns a match (hover interaction)
- `npm run build` exits 0
</acceptance_criteria>

### Task 9: Rewrite ProductFeature

<read_first>
- src/components/ProductFeature.jsx (current implementation)
- src/data/products.js (featured product: Amethyst, id, name, tagline, price, description, image)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 04)
</read_first>

<action>
Completely rewrite src/components/ProductFeature.jsx. New design:
- Background: var(--color-ivory). Full-width section.
- Layout: Split-screen editorial. Desktop: 50/50 or 60/40 split. One side: massive product image (use ProductImage with aspect-ratio 3/4, object-fit cover). Other side: product details.
- Product details: Name in Instrument Serif 40-56px (e.g. "AMETHYST"). Tagline in Manrope 16px italic. Description in Manrope 18px. Price formatted as "₹888" in Manrope 20px weight 500. CTA: "EXPLORE →" in Manrope 14px uppercase with arrow hover animation.
- Alternating: Accept an `index` prop. Even index = image left, text right. Odd index = text left, image right. Use negative margins or overlap for editorial feel.
- Source the featured product from products.js where `featured: true` (Amethyst).
- ScrollReveal animation: image slides in from one side, text from the other.
- Mobile: Stack vertically, image on top (aspect-ratio 4/5), text below.
</action>

<acceptance_criteria>
- `grep "AMETHYST\|amethyst" src/components/ProductFeature.jsx` returns a match (featured product)
- `grep "₹\|price" src/components/ProductFeature.jsx` returns a match (price display)
- `grep "EXPLORE" src/components/ProductFeature.jsx` returns a match (CTA)
- `grep "aspect-ratio\|aspectRatio\|aspect_ratio" src/components/ProductFeature.jsx` returns a match (image sizing)
- `grep "flex\|grid" src/components/ProductFeature.jsx` returns a match (split layout)
- `npm run build` exits 0
</acceptance_criteria>

### Task 10: Rewrite ProductCard

<read_first>
- src/components/ProductCard.jsx (current implementation)
- src/data/products.js (product data structure)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Component Inventory row 6)
</read_first>

<action>
Rewrite src/components/ProductCard.jsx. New editorial design:
- Props: product object (id, name, tagline, price, image, poster, color, category, intention), onClick.
- Layout: Vertical card. Top: ProductImage with aspect-ratio 1/1 (square) for crystals, 4/5 for jewellery. Below: Product name in Instrument Serif 20-24px. Tagline in Manrope 14px, color text-secondary. Price "₹{price}" in Manrope 16px weight 500. CTA: "Explore →" in Manrope 12px uppercase with arrow animation on hover.
- Hover effect: Image scales 1.03 (HoverScale), subtle shadow lift (shadow-lift token), CTA arrow slides right.
- Border: thin 1px border at ink/5 opacity, radius --radius-md (8px).
- No badges, no loud labels. Category is communicated through photography + layout, not tags.
- Use the product's `color` prop for a subtle tinted background accent on hover (very low opacity, ~8%).
</action>

<acceptance_criteria>
- `grep "name" src/components/ProductCard.jsx` returns a match (product name display)
- `grep "price\|₹" src/components/ProductCard.jsx` returns a match (price display)
- `grep "Explore" src/components/ProductCard.jsx` returns a match (CTA)
- `grep "HoverScale\|whileHover\|scale" src/components/ProductCard.jsx` returns a match (hover effect)
- `grep "ProductImage" src/components/ProductCard.jsx` returns a match (image component)
- `npm run build` exits 0
</acceptance_criteria>

### Task 11: Rewrite ProductGrid

<read_first>
- src/components/ProductGrid.jsx (current implementation — understand collection/filtering logic)
- src/data/products.js (all 10 products with categories)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 05)
</read_first>

<action>
Rewrite src/components/ProductGrid.jsx. New design:
- Background: var(--color-ivory). Section header: "COLLECTION" in Manrope 12px uppercase micro-metadata style.
- Category navigation: Horizontal row of category buttons: CRYSTALS, JEWELLERY, GIFTS, OBJECTS. Active category highlighted with underline accent. Clicking filters products by category. "All" option to show everything.
- Grid layout: CSS Grid with asymmetric column spans. NOT a uniform 4-column grid. Pattern: some items span 2 columns (BIG), some span 1 (SMALL). Use CSS grid-template-rows with auto to create variable heights. Desktop: 3-column base with select items spanning 2. Tablet: 2-column. Mobile: 1-column with varying heights.
- Each grid item renders a ProductCard.
- Integration with IntentionExplorer: accept `activeIntentionId` prop. When set, filter products to only those whose `intention` array includes the active intention. Show a "Show all" button to clear filter.
- Empty state: When filter yields no products, show "Nothing here yet" heading + "No products match this intention. Choose another to explore." body + "Show all" button.
- ScrollReveal on grid items with stagger.
</action>

<acceptance_criteria>
- `grep "CRYSTALS\|JEWELLERY\|GIFTS\|OBJECTS" src/components/ProductGrid.jsx` returns matches (category nav)
- `grep "activeIntentionId\|filter" src/components/ProductGrid.jsx` returns a match (intention filtering)
- `grep "Nothing here yet\|No products match" src/components/ProductGrid.jsx` returns a match (empty state)
- `grep "grid" src/components/ProductGrid.jsx` returns a match (CSS grid layout)
- `grep "ProductCard" src/components/ProductGrid.jsx` returns a match (uses card component)
- `npm run build` exits 0
</acceptance_criteria>

---

# Plan 4 — Science + Visual Interlude + Guidance Transition

## Objective
Rewrite the science/cosmos section (dark dramatic), the visual interlude (breathing moment), and the guidance transition (marquee bridge from shop to readings).

## Must Haves

### must_haves.truths:
- "ScienceSection has Deep Plum (#321B45) background"
- "ScienceSection headline: MATTER./TIME./PRESSURE./FORMATION. in large serif"
- "ScienceSection shows MINERAL → EARTH → TIME → COSMOS progression"
- "ScienceSection does NOT make pseudoscientific claims"
- "ScienceSection includes subtle animated scientific lines/diagrams"
- "VisualInterlude has Mint (#B8F2D0) background"
- "VisualInterlude copy: Made by the earth. Chosen by you."
- "VisualInterlude is a full-bleed breathing moment with minimal copy"
- "GuidanceTransition uses animated marquee typography"
- "GuidanceTransition bridges from SHOP to READINGS with to carry / to understand messaging"

### must_haves.prohibitions:
- "Do NOT make pseudoscientific claims in ScienceSection"
- "Do NOT use fake scientific diagrams"
- "Do NOT overuse the VisualInterlude — it is a single breathing moment"

## Tasks

### Task 12: Rewrite ScienceSection

<read_first>
- src/components/ScienceSection.jsx (current implementation)
- src/components/visual/MineralScene.jsx (current SVG fallback)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 06)
</read_first>

<action>
Completely rewrite src/components/ScienceSection.jsx. New design:
- Background: var(--color-deep-plum) (#321B45). Full-width dark section.
- Headline: "MATTER.\nTIME.\nPRESSURE.\nFORMATION." in Instrument Serif, 48-64px, color var(--color-text-on-dark). Positioned asymmetrically (left-aligned, max-w-2xl).
- Content progression: MINERAL → EARTH → TIME → COSMOS. Each stage is a short text block (2-3 sentences in Manrope 16px, text-on-dark at 70% opacity) with a thin decorative line (1px, electric-lilac at 20%) connecting them vertically or horizontally.
- Visual elements: Use MineralScene SVG as background/overlay. Add subtle animated scientific lines — thin 1px lines in electric-lilac or aqua at low opacity that trace paths (like orbital diagrams or crystal lattice lines). Animate with framer-motion (draw-on effect using pathLength).
- Supporting imagery: If real mineral/scientific images are available, show them in small rounded frames. Otherwise, rely on the SVG scene and animated lines.
- NO pseudoscientific claims. Text should describe real geological processes (time, pressure, mineral formation) without attributing spiritual properties. Keep spiritual interpretation separate.
- ScrollReveal on headline and content blocks.
- Mobile: Stack vertically, headline on top, content blocks below.
</action>

<acceptance_criteria>
- `grep "MATTER" src/components/ScienceSection.jsx` returns a match
- `grep "FORMATION" src/components/ScienceSection.jsx` returns a match
- `grep "deep.plum\|deep-plum\|#321B45" src/components/ScienceSection.jsx` returns a match (background)
- `grep "MINERAL\|EARTH\|TIME\|COSMOS" src/components/ScienceSection.jsx` returns matches for progression
- `grep "pathLength\|pathLengths\|animated.*line\|scientific.*line" src/components/ScienceSection.jsx` returns a match (animated lines)
- `grep "MineralScene" src/components/ScienceSection.jsx` returns a match (SVG scene)
- `npm run build` exits 0
</acceptance_criteria>

### Task 13: Rewrite VisualInterlude

<read_first>
- src/components/VisualInterlude.jsx (current implementation)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 07)
</read_first>

<action>
Rewrite src/components/VisualInterlude.jsx. New design:
- Background: var(--color-mint) (#B8F2D0). Full-width, full-bleed section.
- Copy: "Made by the earth.\nChosen by you." in Instrument Serif, 36-48px, centered. Color: var(--color-ink).
- Layout: Centered text over a subtle background texture or gradient (very low opacity). The section should feel like a pause — a breathing moment between the dense science section and the guidance pivot.
- Height: 60-80vh (not full screen, but significant).
- Optional: subtle parallax on a background image (if available) or a gentle gradient shift.
- Animation: Text fades in with ScrollReveal, slow (1.4s).
- Mobile: Same design, slightly smaller text (28-36px).
</action>

<acceptance_criteria>
- `grep "Made by the earth" src/components/VisualInterlude.jsx` returns a match
- `grep "Chosen by you" src/components/VisualInterlude.jsx` returns a match
- `grep "mint\|#B8F2D0" src/components/VisualInterlude.jsx` returns a match (background)
- `grep "font-display\|Instrument" src/components/VisualInterlude.jsx` returns a match (serif font)
- `npm run build` exits 0
</acceptance_criteria>

### Task 14: Rewrite GuidanceTransition

<read_first>
- src/components/GuidanceTransition.jsx (current implementation)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 08)
</read_first>

<action>
Rewrite src/components/GuidanceTransition.jsx. New design:
- Background: var(--color-ivory). Full-width section.
- Core element: Animated marquee typography. A horizontal strip of repeating text that scrolls continuously left-to-right (or right-to-left). Text content: "TO CARRY · TO UNDERSTAND · TO DISCOVER · TO WEAR · TO CONNECT · " repeated. Instrument Serif, 24-32px, color ink at 10-15% opacity (very subtle watermark effect).
- Below the marquee: A centered text block: "Some things are meant to be carried.\nOthers are meant to be understood." in Instrument Serif 28-36px.
- Purpose: Bridge from the product/shop sections to the readings/services sections.
- Animation: Marquee uses CSS animation (translateX loop, 20-30s linear infinite). Respect prefers-reduced-motion (pause animation).
- Mobile: Marquee text smaller (20px), same continuous scroll.
</action>

<acceptance_criteria>
- `grep "TO CARRY\|TO UNDERSTAND\|TO DISCOVER" src/components/GuidanceTransition.jsx` returns a match (marquee text)
- `grep "marquee\|scroll.*left\|translateX\|animation.*linear" src/components/GuidanceTransition.jsx` returns a match (marquee animation)
- `grep "Some things" src/components/GuidanceTransition.jsx` returns a match (supporting copy)
- `grep "reduced-motion\|prefers-reduced" src/components/GuidanceTransition.jsx` returns a match (accessibility)
- `npm run build` exits 0
</acceptance_criteria>

---

# Plan 5 — Services + Experience + Trust + Testimonials

## Objective
Rewrite the services/reading section (one dominant + three supporting), the experience steps (giant numbered editorial), trust section, and testimonials (editorial quotes).

## Must Haves

### must_haves.truths:
- "ServicesSection headline: ASK/A BETTER/QUESTION."
- "ServicesSection background: Coral (#FFB5A7)"
- "ServicesSection renders one visually dominant service (tarot-reading, featured: true) + three supporting services"
- "ServicesSection shows real duration, price, and Book a Reading CTA from src/data/services.js"
- "ServicesSection does NOT render four identical cards"
- "ExperienceSteps renders 3 steps with giant numbered editorial (01, 02, 03)"
- "TrustSection shows only supported claims — no invented certifications"
- "Testimonials renders real quotes from src/data/testimonials.js only"
- "Testimonials does NOT fabricate reviews or credentials"

### must_haves.prohibitions:
- "Do NOT invent service details — use only data from src/data/services.js"
- "Do NOT create four identical service cards"
- "Do NOT fabricate testimonials or customer reviews"
- "Do NOT invent certifications, sourcing claims, or customer counts in TrustSection"

## Tasks

### Task 15: Rewrite ServicesSection

<read_first>
- src/components/ServicesSection.jsx (current implementation)
- src/data/services.js (4 services with id, name, duration, format, price, description, image, featured)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 09)
</read_first>

<action>
Completely rewrite src/components/ServicesSection.jsx. New design:
- Background: var(--color-coral) (#FFB5A7). Full-width section.
- Headline: "ASK\nA BETTER\nQUESTION." in Instrument Serif, 48-64px, color var(--color-ink). Positioned asymmetrically (left side).
- Layout: The featured service (tarot-reading, featured: true) gets a large, visually dominant treatment — full-width or 60% width card with large image, name, description, duration, price (₹555), and "Book a Reading" CTA. The three supporting services are smaller, arranged in a row or loose grid below/beside the featured service. Each shows: name, duration, price, "Book a Reading" CTA.
- Service card styling: NOT identical rectangles. The featured card has a different layout (image left, details right). Supporting cards are more compact (text-focused, small image thumbnail).
- Real data only: Pull from src/data/services.js. Do not invent any service details.
- Use ProductImage for service images.
- ScrollReveal on cards with stagger.
- Mobile: Featured service on top (full-width), supporting services stacked below.
</action>

<acceptance_criteria>
- `grep "ASK" src/components/ServicesSection.jsx` returns a match
- `grep "A BETTER" src/components/ServicesSection.jsx` returns a match
- `grep "coral\|#FFB5A7" src/components/ServicesSection.jsx` returns a match (background)
- `grep "tarot.reading\|Tarot Reading" src/components/ServicesSection.jsx` returns a match (featured service)
- `grep "Book a Reading" src/components/ServicesSection.jsx` returns a match (CTA)
- `grep "featured" src/components/ServicesSection.jsx` returns a match (featured logic)
- `grep "duration\|minutes" src/components/ServicesSection.jsx` returns a match (duration display)
- `npm run build` exits 0
</acceptance_criteria>

### Task 16: Rewrite ExperienceSteps

<read_first>
- src/components/ExperienceSteps.jsx (current implementation)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 10)
</read_first>

<action>
Rewrite src/components/ExperienceSteps.jsx. New design:
- Background: var(--color-ivory). Full-width section.
- Section header: "HOW IT WORKS" in Manrope 12px uppercase micro-metadata.
- Layout: 3 steps displayed as giant numbered editorial blocks. Each step has:
  - Large number: "01", "02", "03" in Instrument Serif 72-96px, color electric-lilac at 20% opacity (decorative watermark behind the content).
  - Step title: Instrument Serif 28-32px (e.g. "Choose your intention", "Explore the collection", "Carry it with you").
  - Step description: Manrope 16px, text-secondary colour, max-w-md.
- Layout: Steps arranged horizontally on desktop (3 columns), stacked on mobile. Each step offset vertically for asymmetric feel (step 2 slightly lower, step 3 slightly higher).
- Thin decorative line (1px, ink/10) connecting the steps horizontally.
- ScrollReveal on each step with stagger.
</action>

<acceptance_criteria>
- `grep "01\|02\|03" src/components/ExperienceSteps.jsx` returns matches (step numbers)
- `grep "HOW IT WORKS" src/components/ExperienceSteps.jsx` returns a match
- `grep "font-display\|Instrument" src/components/ExperienceSteps.jsx` returns a match (serif numbers)
- `grep "flex\|grid" src/components/ExperienceSteps.jsx` returns a match (layout)
- `npm run build` exits 0
</acceptance_criteria>

### Task 17: Rewrite TrustSection

<read_first>
- src/components/TrustSection.jsx (current implementation)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 11, § Conversion Strategy)
</read_first>

<action>
Rewrite src/components/TrustSection.jsx. New design:
- Background: var(--color-ivory). Full-width section.
- Content: Only supported, defensible claims. Example trust points:
  - "Thoughtfully selected" — each piece chosen with care
  - "Carefully packaged" — designed unboxing experience
  - "Secure checkout" — encrypted payment processing
  - "Transparent information" — honest product descriptions
- Layout: 4 trust points in a horizontal row (desktop) or 2x2 grid (mobile). Each point: a short title in Manrope 14px weight 600 + 1-2 sentence description in Manrope 14px text-secondary. Thin 1px top border in ink/10 for each point.
- Do NOT include: customer counts, guarantee claims, certification badges, invented endorsements, or sourcing claims.
- Use subtle electric-lilac accent for the thin decorative line or border highlights.
</action>

<acceptance_criteria>
- `grep "Thoughtfully\|Carefully\|Secure\|Transparent" src/components/TrustSection.jsx` returns matches
- `grep "certification\|guarantee\|customers\|reviews" src/components/TrustSection.jsx` returns NO matches (no invented claims)
- `grep "flex\|grid" src/components/TrustSection.jsx` returns a match (layout)
- `npm run build` exits 0
</acceptance_criteria>

### Task 18: Rewrite Testimonials

<read_first>
- src/components/Testimonials.jsx (current implementation)
- src/data/testimonials.js (4 real testimonials with quote, name, detail)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 12)
</read_first>

<action>
Rewrite src/components/Testimonials.jsx. New design:
- Background: Subtle coral tint (var(--color-coral) at 15% opacity over ivory) or light peach.
- Content: ONLY real quotes from src/data/testimonials.js. Do not add, modify, or fabricate any testimonials.
- Layout: Editorial quote presentation. Desktop: Large featured quote (Instrument Serif 24-28px italic) with attribution below (Manrope 14px: name + detail). Show 2-3 testimonials at a time, with the first one visually larger. NOT a carousel — static editorial layout.
- Quote styling: Large opening quotation mark (electric-lilac, 48px, decorative) before the quote text.
- Attribution: "— {name}" in Manrope 14px weight 500. "{detail}" (product/service name) in Manrope 12px text-muted.
- ScrollReveal on each quote.
- Mobile: Stack quotes vertically, single column.
</action>

<acceptance_criteria>
- `grep "Ananya\|Rohan\|Meera\|Dev" src/components/Testimonials.jsx` returns matches (real names from data)
- `grep "rose quartz\|tarot\|amethyst\|clear quartz" src/components/Testimonials.jsx` returns matches (real details)
- `grep "import.*testimonials\|from.*testimonials" src/components/Testimonials.jsx` returns a match (imports data)
- `grep "testimonial" src/components/Testimonials.jsx` returns matches (renders data, not hardcoded)
- `npm run build` exits 0
</acceptance_criteria>

---

# Plan 6 — Journal + Final CTA + Footer + App Assembly

## Objective
Rewrite the journal (magazine layout), final CTA (strong closing), footer (oversized wordmark), and ensure App.jsx renders all sections in the correct order with proper props.

## Must Haves

### must_haves.truths:
- "Journal renders magazine-style layout with one large featured story + smaller surrounding stories"
- "Journal data comes from src/data/journal.js"
- "Journal headline: THE SCIENCE/OF CRYSTALS (or similar editorial headline)"
- "FinalCTA headline: KEEP/LOOKING/CLOSER."
- "FinalCTA background: Butter Yellow (#FFE66D) + Deep Plum elements"
- "FinalCTA has two CTAs: SHOP ASTROVETRO + DISCOVER READINGS"
- "Footer has Deep Plum (#321B45) background"
- "Footer features oversized ASTROVETRO wordmark"
- "Footer sign-off: KEEP LOOKING."
- "App.jsx renders all 15 sections in correct order: Hero → BrandStatement → IntentionExplorer → ProductFeature → ProductGrid → ScienceSection → VisualInterlude → GuidanceTransition → ServicesSection → ExperienceSteps → TrustSection → Testimonials → Journal → FinalCTA → Footer"
- "App.jsx passes activeIntentionId and handleSelectIntention to IntentionExplorer and ProductGrid"

### must_haves.prohibitions:
- "Do NOT use standard blog card layout in Journal"
- "Do NOT invent journal articles — use only data from src/data/journal.js"
- "Do NOT sacrifice conversion for aesthetics in FinalCTA"

## Tasks

### Task 19: Rewrite Journal

<read_first>
- src/components/Journal.jsx (current implementation)
- src/data/journal.js (5 articles with id, title, tag, time, color)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 13)
</read_first>

<action>
Rewrite src/components/Journal.jsx. New design:
- Background: var(--color-mint) (#B8F2D0) at 30% opacity over ivory, or var(--color-ivory) with mint accents.
- Section header: "JOURNAL" in Manrope 12px uppercase micro-metadata.
- Layout: Magazine editorial. Desktop: One large featured article (the first or a指定 article) takes 60% width with large image placeholder (aspect-ratio 3/4) + title in Instrument Serif 28-32px + tag + read time + "READ ARTICLE →" CTA. The remaining 4 articles are smaller, arranged in a 2x2 or loose grid beside/below the featured article. Each small article: title in Instrument Serif 18-20px + tag + read time.
- Data: Import from src/data/journal.js. Render all 5 articles.
- Category labels: Each article's `tag` shown as a small pill/badge (Manrope 10px uppercase, color from article data or electric-lilac).
- Read time: Manrope 12px text-muted.
- CTA: "READ ARTICLE →" with arrow animation on hover.
- Mobile: Featured article full-width on top, remaining articles stacked below in single column.
</action>

<acceptance_criteria>
- `grep "JOURNAL" src/components/Journal.jsx` returns a match (section header)
- `grep "import.*journal\|from.*journal" src/components/Journal.jsx` returns a match (imports data)
- `grep "READ ARTICLE" src/components/Journal.jsx` returns a match (CTA)
- `grep "first-crystal\|understanding-amethyst\|caring-for-crystals" src/components/Journal.jsx` returns matches (real article ids)
- `grep "featured\|large" src/components/Journal.jsx` returns a match (featured article layout)
- `npm run build` exits 0
</acceptance_criteria>

### Task 20: Rewrite FinalCTA

<read_first>
- src/components/FinalCTA.jsx (current implementation)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 14)
</read_first>

<action>
Rewrite src/components/FinalCTA.jsx. New design:
- Background: var(--color-butter-yellow) (#FFE66D). Full-width section. With a Deep Plum (#321B45) decorative element (large circle or abstract shape) overlapping from one corner.
- Headline: "KEEP\nLOOKING\nCLOSER." in Instrument Serif, 56-72px desktop / 40-48px mobile. Color: var(--color-ink). Positioned asymmetrically (left side).
- CTAs: Two buttons stacked or side-by-side:
  - "SHOP ASTROVETRO" — primary (bg-ink text-ivory pill)
  - "DISCOVER READINGS" — secondary (hairline border pill)
- Supporting copy (optional): One short sentence in Manrope 16px: "Every piece has a story. Find yours."
- Animation: Headline and CTAs enter with ScrollReveal.
- Mobile: Same layout, smaller text, CTAs stacked vertically.
</action>

<acceptance_criteria>
- `grep "KEEP" src/components/FinalCTA.jsx` returns a match
- `grep "LOOKING" src/components/FinalCTA.jsx` returns a match
- `grep "CLOSER" src/components/FinalCTA.jsx` returns a match
- `grep "SHOP ASTROVETRO" src/components/FinalCTA.jsx` returns a match (primary CTA)
- `grep "DISCOVER READINGS" src/components/FinalCTA.jsx` returns a match (secondary CTA)
- `grep "butter.yellow\|butter-yellow\|#FFE66D" src/components/FinalCTA.jsx` returns a match (background)
- `npm run build` exits 0
</acceptance_criteria>

### Task 21: Rewrite Footer

<read_first>
- src/components/Footer.jsx (current implementation)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure row 15)
</read_first>

<action>
Rewrite src/components/Footer.jsx. New design:
- Background: var(--color-deep-plum) (#321B45). Full-width section.
- Wordmark: "ASTROVETRO" in Instrument Serif, 48-64px desktop / 32px mobile, letter-spacing 0.1em. Color: var(--color-text-on-dark). Positioned prominently (not tiny in a corner).
- Sign-off: "KEEP LOOKING." in Manrope 14px, text-on-dark at 60% opacity, below the wordmark.
- Navigation links: SHOP, READINGS, DISCOVER, JOURNAL in Manrope 14px, text-on-dark, arranged horizontally (desktop) or vertically (mobile). Links should use anchor tags to scroll to respective sections.
- Bottom bar: Copyright text "© 2026 AstroVetro" in Manrope 12px, text-on-dark at 40% opacity. Social links if applicable (use simple text links, not icon libraries).
- Layout: Wordmark top-left or centered. Navigation below or to the right. Sign-off and copyright at bottom. Generous padding.
- Thin top border: 1px solid electric-lilac at 15% opacity.
</action>

<acceptance_criteria>
- `grep "ASTROVETRO" src/components/Footer.jsx` returns a match (wordmark)
- `grep "KEEP LOOKING" src/components/Footer.jsx` returns a match (sign-off)
- `grep "SHOP\|READINGS\|DISCOVER\|JOURNAL" src/components/Footer.jsx` returns matches (nav links)
- `grep "deep.plum\|deep-plum\|#321B45" src/components/Footer.jsx` returns a match (background)
- `grep "font-display\|Instrument" src/components/Footer.jsx` returns a match (serif wordmark)
- `npm run build` exits 0
</acceptance_criteria>

### Task 22: Update App.jsx Section Order and Props

<read_first>
- src/App.jsx (current implementation — understand section order and prop passing)
- .planning/phases/01-ui-revamp/01-UI-SPEC.md (§ Homepage Structure — section ordering table)
</read_first>

<action>
Update src/App.jsx to ensure the section rendering order matches the UI-SPEC exactly:
1. Navbar (fixed, overlays hero)
2. Hero
3. BrandStatement
4. IntentionExplorer (receives activeIntentionId, onSelectIntention props)
5. ProductFeature (receives ref for scroll-to)
6. ProductGrid (receives activeIntentionId, ref={collectionRef})
7. ScienceSection
8. VisualInterlude
9. GuidanceTransition
10. ServicesSection
11. ExperienceSteps
12. TrustSection
13. Testimonials
14. Journal
15. FinalCTA
16. Footer

Ensure App.jsx passes the correct props:
- IntentionExplorer gets activeIntentionId and handleSelectIntention
- ProductGrid gets activeIntentionId and collectionRef
- ProductFeature gets a forwarded ref for scroll-to from intention selection

Remove any sections that don't exist in the new spec. Add any missing imports.
</action>

<acceptance_criteria>
- `grep "Hero\|BrandStatement\|IntentionExplorer\|ProductFeature\|ProductGrid\|ScienceSection\|VisualInterlude\|GuidanceTransition\|ServicesSection\|ExperienceSteps\|TrustSection\|Testimonials\|Journal\|FinalCTA\|Footer" src/App.jsx` returns matches for all 15 sections
- `grep "collectionRef" src/App.jsx` returns a match (ref passing)
- `grep "activeIntentionId" src/App.jsx` returns a match (state management)
- `npm run build` exits 0
</acceptance_criteria>

---

## Artifacts This Phase Produces

### New/Rewritten Files:
- `src/index.css` — Complete design token replacement (13 colours, 2 fonts, spacing, radius, shadows, motion)
- `index.html` — Google Fonts loading (Instrument Serif + Manrope)
- `src/components/Motion.jsx` — Shared animation utilities (ScrollReveal, TextSplit, Parallax, HoverScale, MagneticButton, FadeIn)
- `src/components/visual/ProductImage.jsx` — Responsive image component with AVIF/WebP/JPEG + SVG fallback
- `src/components/Navbar.jsx` — Editorial nav with full-screen mobile menu
- `src/components/Hero.jsx` — Art-directed overlapping composition with entrance animation
- `src/components/BrandStatement.jsx` — Massive asymmetric serif on plum
- `src/components/IntentionExplorer.jsx` — 8 typographic interactive objects with hover reveals
- `src/components/ProductFeature.jsx` — Editorial product showcase with alternating layout
- `src/components/ProductCard.jsx` — Editorial product card with hover effects
- `src/components/ProductGrid.jsx` — Asymmetric collection grid with category nav + intention filtering
- `src/components/ScienceSection.jsx` — Dark dramatic science section with animated lines
- `src/components/VisualInterlude.jsx` — Mint breathing moment
- `src/components/GuidanceTransition.jsx` — Marquee typography bridge
- `src/components/ServicesSection.jsx` — One dominant + three supporting services
- `src/components/ExperienceSteps.jsx` — Giant numbered editorial steps
- `src/components/TrustSection.jsx` — Supported claims only
- `src/components/Testimonials.jsx` — Real editorial quotes
- `src/components/Journal.jsx` — Magazine editorial layout
- `src/components/FinalCTA.jsx` — Strong closing with butter yellow
- `src/components/Footer.jsx` — Deep plum with oversized wordmark

### Symbols Created:
- `ScrollReveal`, `TextSplit`, `Parallax`, `HoverScale`, `MagneticButton`, `FadeIn` (from Motion.jsx)
- `ProductImage` component (from visual/ProductImage.jsx)

### Existing Files Modified:
- `src/App.jsx` — Section order + prop wiring
- `src/index.css` — Complete token replacement
- `index.html` — Font loading
