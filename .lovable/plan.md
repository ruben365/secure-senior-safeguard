

## Below-the-Fold Layout & Margin Refinement

Goal: tighten and re-balance the spacing, margins, and content disposition across every section that sits **below the hero and above the footer** sitewide. Pure layout/spacing/typography polish — no new features, no hero touches, no footer touches.

### Scope

**Touched**
- Section vertical rhythm (top/bottom padding) on all mid-page sections
- Container widths and inner gutters
- Grid column gaps and item spacing on cards, stats, pricing, FAQ, articles
- Heading-to-body spacing, eyebrow-to-headline rhythm
- Asymmetric/strategic disposition for visual interest (offset grids, staggered reveals)

**Untouched**
- All `hero-*` sections and `HeroHomepage`, `HeroBusiness`, `HeroWorkshops`
- `Footer.tsx` and footer styles
- Admin / Portal / Auth dashboards
- Logic, props, routes, data

### Strategy — a unified rhythm system

Introduce three CSS utility scales applied via class additions only. No tokens renamed, no breaking changes.

**1. Section vertical rhythm (`.sec-rhythm-*`)**
```text
.sec-rhythm-sm  → py-12  md:py-16  lg:py-20    (compact: FAQ, articles, partners)
.sec-rhythm-md  → py-16  md:py-24  lg:py-28    (default: most content sections)
.sec-rhythm-lg  → py-20  md:py-28  lg:py-36    (statement: pricing, story sections)
```

**2. Container disposition (`.sec-container-*`)**
```text
.sec-container-narrow  → max-w-3xl   mx-auto px-5 md:px-8    (text-heavy: FAQ, articles)
.sec-container-default → max-w-6xl   mx-auto px-5 md:px-8    (most grids)
.sec-container-wide    → max-w-7xl   mx-auto px-5 md:px-10   (pricing, full grids)
.sec-container-bleed   → max-w-[1400px] mx-auto px-5 md:px-12 (showcase rows)
```

**3. Heading rhythm (`.head-rhythm`)**
```text
.head-rhythm > .eyebrow + h2     → mt-3
.head-rhythm > h2                → mb-4 md:mb-5
.head-rhythm > h2 + p.lede       → mt-4 md:mt-5 max-w-2xl mx-auto
.head-rhythm                     → mb-12 md:mb-16
```

### Strategic disposition rules

- **Section breathing**: enforce a minimum 96px gap between consecutive content sections on desktop (currently inconsistent: 48–144px range).
- **Asymmetric grids**: on 3-column feature rows, offset the middle card by `lg:translate-y-3` for subtle staircase rhythm.
- **Edge gutters**: bump mobile side-padding from 16px → 20px (more breathing on phones), keep desktop at 32px.
- **Card grid gaps**: standardize `gap-6 md:gap-8` (was a mix of 4/6/8/10).
- **Eyebrow → headline → lede** stack: consistent `mt-3 / mb-5 / mt-5` triad everywhere.
- **CTA bands** (mid-page, not the final hero CTA): center with `max-w-2xl`, `py-16 md:py-20`.
- **First section after hero**: gains a `pt-20 md:pt-28` start so it does not crowd the hero's bottom edge.
- **Last section before footer**: gains a `pb-24 md:pb-32` to lift the footer cleanly.

### Files touched

```text
NEW   src/styles/layout-rhythm.css           (~120 lines of utility classes)
EDIT  src/index.css                          (one @import line, last)
EDIT  src/pages/Index.tsx                    (className additions on mid sections)
EDIT  src/pages/About.tsx
EDIT  src/pages/Business.tsx
EDIT  src/pages/Services.tsx
EDIT  src/pages/Training.tsx
EDIT  src/pages/Portfolio.tsx
EDIT  src/pages/Contact.tsx
EDIT  src/pages/Resources.tsx
EDIT  src/pages/Articles.tsx
EDIT  src/pages/Events.tsx
EDIT  src/pages/Partners.tsx
EDIT  src/pages/Careers.tsx
EDIT  src/pages/HelpCenter.tsx
EDIT  src/components/home/HomeStorySections.tsx
EDIT  src/components/home/FAQPreview.tsx
EDIT  src/components/home/LatestArticles.tsx
```

All page edits are pure className additions on existing `<section>` wrappers and inner containers. No JSX restructuring. No prop changes. No logic changes.

### Accessibility & responsiveness

- All spacing scales mobile-first; no fixed pixel values that break on narrow screens.
- Contrast and tap-target standards untouched (≥44px stays).
- No `transition: all`, no new animations.
- Respects existing `zoom: 0.75` root scaling — all values are relative.

### Out of scope

- Hero homepage, hero business, hero workshops — untouched
- Footer component and styles — untouched
- Auth, Admin, Portal — untouched
- Color tokens, typography tokens, button system — untouched
- Component internals (only outer wrappers get className additions)

### Estimated diff

~120 lines new CSS, ~150 lines of className additions across ~16 files.

