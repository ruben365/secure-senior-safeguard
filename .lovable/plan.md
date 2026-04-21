

## Tighten Vertical Rhythm + Add Photography Across Body Sections

Goal: reduce excessive vertical whitespace between stacked content blocks site-wide and introduce more photography to break up text-heavy areas. Heroes and footer untouched.

### Problem

Two separate issues showing on the live preview:

1. **Vertical air is too generous.** The current `layout-rhythm.css` uses `7rem`–`9rem` section padding on desktop and `4rem` heading-cluster bottom margin. After the floating-cards layer added its own `2rem` radius and shadows, sections feel disconnected — too much empty space between widgets and headings.
2. **Body sections are text-heavy.** Several mid-page sections (services, training intros, business pages, about-style blocks) read as dense paragraphs with no visual break. They need supporting photography.

### Approach — two surgical layers

```text
NEW   src/styles/rhythm-tighten.css        (~120 lines, pure CSS)
NEW   src/components/layout/SectionImage.tsx (~60 lines, opt-in component)
EDIT  src/styles/layout-rhythm.css          (tighten existing values)
EDIT  src/index.css                          (+1 @import)
EDIT  3-5 body pages (insert SectionImage where natural)
```

Zero hero edits. Zero footer edits. Zero token changes. Zero JSX logic changes.

---

### Layer 1 — Tighten existing rhythm (`layout-rhythm.css` edit)

Reduce the spacing scale by ~30% across the board. New values:

| Class | Current desktop | New desktop |
|-------|----------------|-------------|
| `.sec-rhythm-sm` | 5rem | **3.5rem** |
| `.sec-rhythm-md` | 7rem | **5rem** |
| `.sec-rhythm-lg` | 9rem | **6.5rem** |
| `.sec-after-hero` | 7rem top | **5rem** |
| `.sec-before-footer` | 8rem bottom | **5.5rem** |
| `.head-rhythm` (mobile) | 3rem | **2rem** |
| `.head-rhythm` (md+) | 4rem | **2.5rem** |
| `.grid-rhythm` (md+) | 2rem | **1.5rem** |
| `.cta-band` (md+) | 5rem | **3rem** |

Hero and footer selectors are NOT in this file — they have their own padding tokens, so this edit is safe.

---

### Layer 2 — `rhythm-tighten.css` (catches Tailwind vertical utilities)

Most pages don't use `.sec-rhythm-*` — they use Tailwind `py-20`, `py-24`, `space-y-12`, etc. This file dampens those globally on body sections (excludes hero + footer):

```css
/* Reduce common Tailwind section padding outside hero/footer */
section[class*="py-24"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *),
section[class*="py-20"]:not(.hero-home *):not(.hero-business *):not(.hero-workshops *):not(footer *) {
  padding-top: clamp(2.5rem, 5vw, 4rem) !important;
  padding-bottom: clamp(2.5rem, 5vw, 4rem) !important;
}

section[class*="py-16"]:not(.hero-home *):not(footer *) {
  padding-top: clamp(2rem, 4vw, 3rem) !important;
  padding-bottom: clamp(2rem, 4vw, 3rem) !important;
}

/* Tighten vertical stacks */
.space-y-16:not(.hero-home *):not(footer *) > * + * {
  margin-top: 2.5rem !important;
}
.space-y-12:not(.hero-home *):not(footer *) > * + * {
  margin-top: 2rem !important;
}
.space-y-10:not(.hero-home *):not(footer *) > * + * {
  margin-top: 1.75rem !important;
}

/* Heading-to-content gap inside cards */
.card h2 + p, .card h3 + p { margin-top: 0.5rem; }
```

Imported last so its `!important` declarations win.

---

### Layer 3 — `SectionImage` component (lightweight, opt-in)

New reusable component for inserting photography between text blocks:

```tsx
// src/components/layout/SectionImage.tsx
type Variant = "wide" | "split-left" | "split-right" | "compact-trio";
interface Props {
  src: string;
  alt: string;
  caption?: string;
  variant?: Variant;
  width?: number;
  height?: number;
}
```

Variants:
- **`wide`** — full-width 16:9 image with rounded `2rem` corners + soft elevation (matches floating-card aesthetic), optional caption underneath
- **`split-left` / `split-right`** — image on one side, optional caption block on the other (60/40 split, stacks on mobile)
- **`compact-trio`** — three small images in a row (for testimonials/team/locations contexts)

All images:
- Explicit `width` + `height` (per project standard — prevents CLS)
- `loading="lazy"` + `decoding="async"`
- Alt text required (TS-enforced)
- `object-fit: cover` with explicit aspect-ratio
- Inherit floating-cards radius + soft shadow for visual consistency

---

### Layer 4 — Insert photography on 4 body pages

Add `SectionImage` blocks at natural break points. **All photos sourced from existing `/src/assets/` images** (no new asset uploads needed — codebase already has 40+ photographic assets like instructor portraits, team shots, training environments, business contexts).

Targets:

| Page | Insertion | Variant | Source asset |
|------|-----------|---------|--------------|
| `src/pages/Training.tsx` | Between intro copy and pricing grid | `wide` | Existing training environment photo |
| `src/pages/Business.tsx` | Between services list and trust block | `split-right` | Existing business meeting photo |
| `src/pages/About.tsx` (or equivalent) | Mid-page after mission statement | `wide` | Existing team photo |
| `src/pages/Resources.tsx` | After category headers, before book grid | `compact-trio` | 3 existing book/library photos |

Each insertion is ~4 lines of JSX — zero logic changes, zero state, zero data wiring.

---

### Constraints respected

- **Hero pages fully excluded** via `.hero-home`, `.hero-business`, `.hero-workshops` `:not()` guards on every selector
- **Footer fully excluded** via `footer` and `.site-footer` `:not()` guards
- **Plume tokens, palette, typography** — untouched
- **`zoom: 0.75`, `prefers-reduced-motion`, mobile breakpoints** — honored
- **CLS-safe** — all new images carry explicit dimensions
- **No new dependencies, no token changes, no route changes**
- Image realism standard preserved — only existing photographic assets used

### Out of scope

- Hero pages (heroes own their own spacing)
- Footer (excluded everywhere)
- New asset uploads — uses existing `/src/assets/` only
- Tailwind config changes
- Plume tokens
- Pre-existing TypeScript errors

### Files touched

```text
NEW   src/styles/rhythm-tighten.css                (~120 lines)
NEW   src/components/layout/SectionImage.tsx       (~60 lines)
EDIT  src/styles/layout-rhythm.css                  (value updates only)
EDIT  src/index.css                                  (+1 @import)
EDIT  src/pages/Training.tsx                        (+4 lines JSX)
EDIT  src/pages/Business.tsx                        (+4 lines JSX)
EDIT  src/pages/About.tsx                           (+4 lines JSX)
EDIT  src/pages/Resources.tsx                       (+4 lines JSX)
```

### Estimated diff

~180 lines new code + ~20 lines of value edits + ~16 lines of JSX inserts. Zero deletions of meaningful content.

