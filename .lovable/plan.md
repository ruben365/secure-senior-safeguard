

## Interactive Element Polish — "Editorial Plume v2"

Goal: graphically enhance the six interactive surface families — **maps, floating buttons, galleries, social feeds, popups/dialogs, accordions, content carousels** — with a unified editorial styling pass. Pure CSS additions to the existing `gx-*` system. Heroes, footer, Auth, Admin, Portal untouched.

### What gets added

**One stylesheet, seven new primitives** — appended to `src/styles/graphic-enhancement.css`:

| Class | Target | Visual signature |
|-------|--------|------------------|
| `.gx-map` | Iframe map wrapper (`OhioServiceMap`) | 4px cream frame, copper inner ring, layered plum shadow, copper compass corner-mark |
| `.gx-fab` | Floating buttons (`MobileCallButton`, `BackToTop`, `MagnificentDonateButton`) | Soft copper halo ring (idle), gentle pulse glow, 1.5px cream border, lift on hover |
| `.gx-gallery` | Image grid wrappers (`Resources`, `Portfolio`, team grids) | Auto-applies `.gx-figure` frame to children, staggered hover lift, copper hairline divider above |
| `.gx-feed` | Social/content feed cards (`LatestArticles`, testimonials grid) | Vertical copper rail (2px) on the left of each item, plum date stamp, consistent 14px gap rhythm |
| `.gx-dialog` | Popups (`Dialog`, `AlertDialog` content) | Cream frame with copper top accent bar (3px), softened layered shadow, copper diamond glyph in header |
| `.gx-accordion` | `AccordionItem` wrappers | Copper left rail on `data-state=open`, plum heading weight increase, soft cream open-state background, smooth height + opacity reveal |
| `.gx-carousel` | `Carousel`/`HeroCarousel` content area | Copper progress dot indicators, cream-frame slides, gradient fade on left/right edges |

### Where each class is applied

| File | Class added |
|------|-------------|
| `src/components/OhioServiceMap.tsx` | `.gx-map` on the iframe wrapper |
| `src/components/MobileCallButton.tsx` | `.gx-fab` |
| `src/components/BackToTop.tsx` | `.gx-fab` |
| `src/components/MagnificentDonateButton.tsx` | `.gx-fab` (when rendered) |
| `src/components/home/LatestArticles.tsx` | `.gx-feed` on the grid container |
| `src/components/ui/dialog.tsx` | `.gx-dialog` baked into `DialogContent` className |
| `src/components/ui/alert-dialog.tsx` | `.gx-dialog` baked into `AlertDialogContent` className |
| `src/components/ui/accordion.tsx` | `.gx-accordion` baked into `AccordionItem` and `AccordionTrigger` |
| `src/components/HeroCarousel.tsx` (body slides only, not hero overlay) | `.gx-carousel` on the dot indicator container |
| `src/pages/Resources.tsx`, `Portfolio.tsx` | `.gx-gallery` on image grid wrappers |

### Visual specifics

- **Map**: cream 4px frame, `box-shadow: 0 8px 28px -10px rgba(90,42,90,0.22)`, inner copper ring at 0.18 opacity, top-right corner L-bracket
- **FAB halo**: `box-shadow: 0 0 0 4px rgba(217,108,74,0.10), 0 8px 22px -8px rgba(217,108,74,0.35)`, hover scale 1.04, soft 2.4s pulse using existing keyframes
- **Dialog**: 3px copper bar pinned to top, 16px corner radius, layered shadow `0 24px 48px -16px rgba(26,19,32,0.18)`, cream background reinforced
- **Accordion open state**: 3px copper left rail slides in (200ms), background tints to `rgba(217,108,74,0.04)`, heading color shifts plum
- **Carousel dots**: copper filled active, plum/30 idle, 8px size with 200ms morph
- **Gallery**: every direct child `<img>` or `<a>` gets the `.gx-figure` styling via descendant selector

### Constraints respected

- No JSX restructuring beyond className additions on three `ui/*` primitives (dialog, alert-dialog, accordion)
- No new components, no logic, no props, no dependencies
- No color token changes — uses existing copper `#d96c4a`, plum `#5a2a5a`, cream
- No `transition: all`, no framer-motion, no `backdrop-filter`
- Honors `prefers-reduced-motion` (pulse + lift disabled)
- Honors `zoom: 0.75`, mobile touch targets ≥44px preserved
- Heroes (`Hero*.tsx`, `hero-*.css`), Footer, Auth, Admin, Portal — untouched
- Existing `.stroke-glass`, `.pay-card`, `.hss-card`, `.gx-card-elevated`, `.ambient-vibrance-bg` systems untouched

### Files touched

```text
EDIT  src/styles/graphic-enhancement.css     (~190 lines appended)
EDIT  src/components/OhioServiceMap.tsx      (1 className)
EDIT  src/components/MobileCallButton.tsx    (1 className)
EDIT  src/components/BackToTop.tsx           (1 className)
EDIT  src/components/ui/dialog.tsx           (1 className addition to DialogContent)
EDIT  src/components/ui/alert-dialog.tsx     (1 className addition to AlertDialogContent)
EDIT  src/components/ui/accordion.tsx        (2 className additions)
EDIT  src/components/HeroCarousel.tsx        (dot container only, hero visuals untouched)
EDIT  src/components/home/LatestArticles.tsx (1 className on grid)
EDIT  src/pages/Resources.tsx                (1 className on gallery wrapper)
EDIT  src/pages/Portfolio.tsx                (1 className on gallery wrapper)
```

### Out of scope

- Hero components and hero CSS (only the carousel dot indicator container, which is non-hero chrome, is touched on `HeroCarousel`)
- Footer, Auth, Admin, Portal pages
- Color palette, typography tokens, Tailwind config
- New components, new logic, new dependencies
- Database, edge functions, routes
- Pre-existing TypeScript build errors

### Estimated diff

~190 lines new CSS + ~12 className additions across ~10 files. Zero deletions.

