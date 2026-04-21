

## Graphic Layout Enhancement — Sitewide Body Polish

Goal: add a refined "Editorial Graphic" pass to every page's body content (between hero and footer). Pure CSS layer — no logic, no JSX restructuring, no content edits. Heroes and footer untouched.

### Design direction — "Editorial Plume"

A magazine-grade graphic system that adds depth, hierarchy, and motion accents to body sections without altering existing colors or copy. Built on the existing cream/plum/copper palette.

**Six new graphic primitives** (parallel to existing `.stroke-glass`, `.pay-card`, `.hss-card`)

| Class | Role | Visual signature |
|-------|------|------------------|
| `.gx-section` | Wraps any body `<section>` | Soft top hairline gradient, subtle bottom fade, optional grain |
| `.gx-eyebrow` | Section eyebrow label | Copper text, 0.18em letter-spacing, 11px, with a 12px copper rule on the left |
| `.gx-heading` | Section H2 | Larger leading, plum color, optional copper underline accent (28px wide, 3px tall, rounded) |
| `.gx-divider` | Between sections | 1px gradient line — transparent → copper/30 → transparent, with a centered tiny diamond glyph |
| `.gx-figure` | Image wrapper | Soft cream frame (4px), copper-tinted shadow, rounded corners, subtle inner ring |
| `.gx-quote` | Pull-quote block | Plum vertical rail (3px), serif italic 1.25em, copper opening glyph |

**Two card upgrades** (additive — opt-in via class, not forced)

| Class | Role |
|-------|------|
| `.gx-card-elevated` | Adds layered shadow stack (3 stops) + 1px copper-on-hover ring + 4px hover lift |
| `.gx-card-tile` | Adds top-left corner copper accent (8x8px L-shape) for editorial feel |

**Background graphic accents** (decorative, `pointer-events: none`, behind content)

| Class | Role |
|-------|------|
| `.gx-bg-noise` | 2% SVG grain overlay — magazine paper texture |
| `.gx-bg-rule` | Faint horizontal hairlines at 8px intervals (0.03 opacity) for editorial grid |
| `.gx-bg-corner-mark` | Tiny copper L-bracket in top-right of section (decorative) |

### Where it's applied

A targeted className sweep across body sections only. Heroes, footer, dashboards, auth, and admin are excluded.

| File | Treatment |
|------|-----------|
| `src/components/home/HomeStorySections.tsx` | Add `gx-eyebrow` + `gx-heading` to story headings, `gx-figure` to images |
| `src/components/home/FAQPreview.tsx` | Wrap in `gx-section`, add `gx-divider` above |
| `src/components/home/LatestArticles.tsx` | `gx-card-elevated` on article tiles, `gx-figure` on covers |
| `src/components/AnswerSummary.tsx` | `gx-quote` styling |
| `src/pages/About.tsx` | `gx-eyebrow` + `gx-heading` on each section, `gx-figure` on team imagery, `gx-divider` between sections |
| `src/pages/Training.tsx` | `gx-eyebrow` on section labels, `gx-card-elevated` on instructor cards |
| `src/pages/Business.tsx` | `gx-eyebrow` + `gx-heading`, `gx-card-tile` on service tiles |
| `src/pages/Resources.tsx` | `gx-figure` on book covers, `gx-divider` between shelves |
| `src/pages/Articles.tsx` + `ArticleDetail.tsx` | `gx-quote` for pull-quotes, `gx-figure` for hero images of articles |
| `src/pages/FAQ.tsx`, `Contact.tsx`, `Careers.tsx`, `Partners.tsx`, `Portfolio.tsx`, `Events.tsx` | `gx-section` + `gx-eyebrow` + `gx-heading` pass |
| `src/components/ExpandableServiceCard.tsx` | `gx-card-elevated` |
| `src/components/TestimonialCard.tsx` | `gx-quote` styling for body |
| `src/components/TrustedTechLogos.tsx` | `gx-bg-rule` background |

### CSS file plan

```text
NEW   src/styles/graphic-enhancement.css      (~220 lines — all gx-* primitives)
EDIT  src/index.css                           (1 line — import new file after polish.css)
EDIT  ~14 component/page files                (className additions only — no JSX changes)
```

### Distinguishability checklist

- Section headings now read with copper eyebrow + plum H2 + copper underline accent (3-tier hierarchy)
- Cards opt into elevated or tile variants — not forced, no regressions
- Images get a unified editorial frame across the site
- Section transitions use the `gx-divider` glyph for premium pacing
- Pull-quotes get serif italic treatment for editorial weight
- All decorative accents are behind content, `pointer-events: none`

### Constraints respected

- Heroes — untouched (no edits to `Hero*.tsx` or `hero-*.css`)
- Footer — untouched
- Auth, Admin, Portal — untouched
- No color token changes — uses existing copper `#d96c4a`, plum `#5a2a5a`, cream `--background`
- No `transition: all`, no framer-motion
- No `backdrop-filter` (none of the new utilities use it)
- Honors `zoom: 0.75` root scaling
- No em-dashes, no semicolons in copy
- Existing `.stroke-glass`, `.pay-card`, `.hss-card`, `.ambient-vibrance-bg` systems untouched
- Touch targets ≥44px on mobile preserved
- No JSX restructuring, no prop changes, no logic, no new components
- Honors `prefers-reduced-motion` (lift/glow disabled)

### Out of scope

- Hero components and hero CSS
- Footer
- Auth, Admin, Portal pages
- Color palette, fonts, typography tokens
- Tailwind config
- New components, new logic, new dependencies
- Database, edge functions, routes

### Estimated diff

~220 lines new CSS + ~80 className tweaks across ~14 files. Zero deletions of working content.

