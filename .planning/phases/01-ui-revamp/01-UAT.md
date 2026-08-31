---
status: testing
phase: 01-ui-revamp
source: [01-PLAN.md]
started: 2026-08-31T22:00:00Z
updated: 2026-08-31T22:00:00Z
---

## Current Test

number: 1
name: Homepage Loads - Hero Section
expected: |
  Homepage loads with the new Hero section: full-screen art-directed composition.
  - "FIND / WHAT / FEELS / LIKE / YOU." headline in large Instrument Serif
  - Editorial metadata: "ASTROVETRO / 001 — MINERAL OBJECT — EARTH → COSMOS"
  - Two CTAs: "Explore the Collection" (primary, pill, dark bg) + "Discover Readings" (secondary, hairline border)
  - Large crystal image overlapping with headline, clip-path reveal animation on load
  - Subtle orbital element rotating in background
  - Off-white background (#FFF9F1) with electric lilac glow
awaiting: user response

## Tests

### 1. Homepage Loads - Hero Section
expected: |
  Homepage loads with the new Hero section: full-screen art-directed composition.
  - "FIND / WHAT / FEELS / LIKE / YOU." headline in large Instrument Serif
  - Editorial metadata: "ASTROVETRO / 001 — MINERAL OBJECT — EARTH → COSMOS"
  - Two CTAs: "Explore the Collection" (primary, pill, dark bg) + "Discover Readings" (secondary, hairline border)
  - Large crystal image overlapping with headline, clip-path reveal animation on load
  - Subtle orbital element rotating in background
  - Off-white background (#FFF9F1) with electric lilac glow
result: pending

### 2. Navigation - Desktop
expected: |
  Top navbar is lightweight and editorial:
  - "ASTROVETRO" wordmark left (Instrument Serif)
  - Links: "SHOP · READINGS · DISCOVER · JOURNAL" center
  - "EXPLORE" CTA right (pill button)
  - On scroll: background becomes ivory/70 + backdrop-blur + thin bottom border
  - Nav subtly changes text colour based on section (dark on light, light on dark)
result: pending

### 3. Navigation - Mobile
expected: |
  On mobile (< 768px):
  - Hamburger button opens full-screen overlay
  - Links in huge Instrument Serif (40-56px), stacked vertically
  - Animated open/close transition
  - EXPLORE CTA at bottom of mobile menu
  - Body scroll locked when menu open
result: pending

### 4. Brand Statement Section
expected: |
  Deep Plum (#321B45) background section:
  - "WE ARE / MADE OF / THE SAME / MATTER / AS THE / STARS." in massive asymmetric Instrument Serif
  - Left-aligned, max-w-3xl, not centered
  - Thin electric-lilac horizontal line extending from headline
  - Minimal supporting copy in light text
  - ScrollReveal animation on headline lines
result: pending

### 5. Intention Discovery Section
expected: |
  Butter Yellow (#FFE66D) background section:
  - Headline: "WHAT ARE YOU / LOOKING FOR?" in Instrument Serif
  - 8 large interactive intention words: CALM, LOVE, FOCUS, PROTECTION, CONFIDENCE, ABUNDANCE, GROWTH, CLARITY
  - On hover: word scales 1.05x, background colour washes to intention's colour, matching product preview appears, section background shifts
  - Clicking intention sets active filter and scrolls to collection
  - Active intention stays highlighted, others dim to 40% opacity
result: pending

### 6. Featured Product Section
expected: |
  Off-white + Deep Plum section:
  - Alternating layout (image left/text right for first)
  - Massive crystal image (3:4 aspect), editorial product story on other side
  - Product name "AMETHYST" in Instrument Serif, tagline, ₹888 price
  - CTA "EXPLORE →" with arrow animation
  - Real featured product data from src/data/products.js
result: pending

### 7. Product Collection Grid
expected: |
  Off-white + Aqua section:
  - Category nav: CRYSTALS / JEWELLERY / GIFTS / OBJECTS (horizontal buttons, aqua underline on active)
  - Asymmetric CSS grid layout (not uniform 4-col): BIG/SMALL/MEDIUM pattern
  - Product cards: name (Instrument Serif), tagline, price, "Explore →" CTA
  - Hover: image scales 1.03x, shadow lift, CTA arrow slides
  - Intention filtering works: selecting intention in Discovery filters grid
  - Empty state shows "Nothing here yet" + "Show all" when filter yields no results
result: pending

### 8. Science / Cosmos Section
expected: |
  Deep Plum (#321B45) background:
  - Headline: "MATTER. / TIME. / PRESSURE. / FORMATION." in large Instrument Serif
  - MINERAL → EARTH → TIME → COSMOS progression with connecting lines
  - Subtle animated scientific lines (electric-lilac/aqua, pathLength animation)
  - MineralScene SVG diagram with updated palette
  - Responsibility disclaimer: no pseudoscientific claims
result: pending

### 9. Visual Interlude
expected: |
  Mint (#B8F2D0) background:
  - "Made by the earth. / Chosen by you." centered in Instrument Serif
  - 60-80vh height, breathing moment
  - Subtle parallax or gradient shift
  - ScrollReveal animation
result: pending

### 10. Guidance Transition
expected: |
  Off-white background:
  - Animated marquee: "TO CARRY · TO UNDERSTAND · TO DISCOVER · TO WEAR · TO CONNECT" repeating
  - CSS translateX loop animation (30s linear, paused on prefers-reduced-motion)
  - Centered copy: "Some things are meant to be carried. Others are meant to be understood."
  - Bridge from SHOP to READINGS sections
result: pending

### 11. Services / Readings Section
expected: |
  Coral (#FFB5A7) background with tangerine/butter accent washes:
  - Headline: "ASK / A BETTER / QUESTION." in Instrument Serif
  - Featured service (Tarot Reading) large: image + name + description + duration + ₹555 + "Book a Reading"
  - Three supporting services smaller, compact cards
  - All data from src/data/services.js (no invented details)
  - "Book a Reading" CTA on each
result: pending

### 12. Experience Steps
expected: |
  Off-white background:
  - Section header "HOW IT WORKS" (micro-metadata)
  - 3 steps with giant numbers "01" "02" "03" (Instrument Serif, electric-lilac at 20% opacity watermark)
  - Step titles: "Choose your intention.", "Explore the collection.", "Carry it with you."
  - Thin electric-lilac connecting line between steps
  - Asymmetric vertical offsets (step 2 lower, step 3 higher)
result: pending

### 13. Trust Section
expected: |
  Off-white background:
  - 4 trust points in horizontal row (desktop) / 2x2 grid (mobile)
  - Titles: "Thoughtfully selected", "Carefully packaged", "Secure checkout", "Transparent information"
  - Only supported claims — NO invented certifications, guarantees, customer counts
  - Thin ink/10 top borders, electric-lilac accent highlights
result: pending

### 14. Testimonials
expected: |
  Coral tint (15% over ivory) background:
  - ONLY real quotes from src/data/testimonials.js (Ananya, Rohan, Meera, Dev)
  - Large featured quote first (Instrument Serif 24-28px italic) with decorative electric-lilac quote mark
  - Attribution: "— {name}" + detail (product/service)
  - NOT a carousel — static editorial layout
result: pending

### 15. Journal / Editorial
expected: |
  Mint/30% background:
  - "THE SCIENCE / OF CRYSTALS" featured headline
  - Magazine layout: one large featured article (col-span-2, row-span-2) + 4 smaller articles
  - Data from src/data/journal.js (5 articles)
  - Category tags, read times, "READ ARTICLE →" CTAs
  - Featured article full-width on mobile
result: pending

### 16. Final CTA
expected: |
  Butter Yellow (#FFE66D) background with Deep Plum accent shapes:
  - Headline: "KEEP / LOOKING / CLOSER." in massive Instrument Serif
  - Two CTAs: "SHOP ASTROVETRO" (primary, pill) + "DISCOVER READINGS" (secondary, hairline)
  - Supporting copy: "Every piece has a story. Find yours."
  - ScrollReveal animation
result: pending

### 17. Footer
expected: |
  Deep Plum (#321B45) background:
  - Oversized "ASTROVETRO" wordmark (Instrument Serif, 48-64px)
  - Sign-off: "KEEP LOOKING."
  - Navigation links: SHOP, READINGS, DISCOVER, JOURNAL
  - Newsletter signup with electric-lilac button
  - © 2026 AstroVetro copyright
  - Thin electric-lilac top border
result: pending

### 18. Responsive Design
expected: |
  Test at 375px, 768px, 1024px, 1440px:
  - No horizontal overflow at any breakpoint
  - Mobile: intentionally composed (not stacked desktop)
  - Hero: image above headline, smaller but bold
  - Navigation: full-screen mobile menu works
  - IntentionExplorer: 2-column loose grid on mobile
  - ProductGrid: 1-col with varying heights on mobile
  - Services: featured full-width, supporting stacked
  - Journal: featured full-width top, remaining stacked
result: pending

### 19. Accessibility
expected: |
  - Semantic HTML throughout
  - Keyboard navigation works (Tab through all interactive elements)
  - Visible focus states on all buttons/links
  - Colour contrast: ink on ivory AA-safe; text-on-dark on plum AA-safe
  - prefers-reduced-motion respected (animations disabled)
  - Meaningful alt text on all images
  - IntentionExplorer keyboard accessible
result: pending

### 20. Performance / Implementation
expected: |
  - src/index.css has new 13-colour palette (no old Vedic tokens)
  - Fonts: Instrument Serif + Manrope loaded in index.html (no Cormorant/DM Sans)
  - Motion.jsx exports: ScrollReveal, TextSplit, Parallax, HoverScale, MagneticButton, FadeIn
  - ProductImage uses <picture> with AVIF/WebP/JPEG, lazy loading, explicit width/height
  - prefers-reduced-motion media query in CSS
  - No console errors
result: pending

## Summary

total: 20
passed: 0
issues: 0
pending: 20
skipped: 0
blocked: 0

## Gaps

[]