

## Sitewide Text Alignment & Disposition Pass

Goal: enforce consistent text alignment, line-length, and heading-to-body rhythm across **every section between the hero and the footer**, sitewide. Pure CSS + className additions — no logic, no hero changes, no footer changes.

### Problem observed

Across pages (Resources, About, Services, Articles, Portfolio, Events, Partners, Careers, Contact, Business, Training, HelpCenter), text alignment is inconsistent:
- Some sections use `text-center`, others `text-left` for similar content roles
- Lede paragraphs stretch beyond comfortable reading width (some 100% wide, some `max-w-2xl`, some `max-w-3xl`, some `max-w-4xl`)
- Eyebrow → headline → lede spacing varies (mb-3 / mb-4 / mb-6 / mb-8 mix)
- Section-internal blocks (cards, stats, CTA bands) inherit inconsistent alignment from their parents
- Body copy inside cards mixes `text-left` and `text-center` arbitrarily

### Strategy — extend the rhythm system with alignment utilities

Add a small, additive layer to `src/styles/layout-rhythm.css` (no new file). All Tailwind-compatible, all opt-in.

**1. Text alignment role classes**
```text
.text-section        → text-left on mobile, text-center on md+ (used for section headers above grids)
.text-section-left   → always text-left (used for editorial/long-form blocks)
.text-section-center → always text-center (used for CTA bands, statement blocks)
.text-card           → text-left inside cards (locked, never inherits center)
```

**2. Reading-width caps (line-length for legibility)**
```text
.lede           → max-w-prose (≈65ch) mx-auto, line-height 1.6, text-balance
.body-rhythm    → max-w-[68ch] mx-auto, leading-7, paragraph-spacing 1em
.headline-tight → text-balance, leading-[1.1], tracking-tight
```

**3. Heading-stack normalization** (extends existing `.head-rhythm`)
```text
.head-rhythm                  → text-center on md+ by default
.head-rhythm.is-left          → forces text-left across breakpoints
.head-rhythm > .eyebrow       → mb-3 (was inconsistent)
.head-rhythm > h1,h2,h3       → text-balance, mb-4 md:mb-5
.head-rhythm > .lede          → mt-4 md:mt-5, max-w-2xl mx-auto
```

**4. Card content alignment lock**
```text
.card-content-stack > *       → text-left
.card-content-stack > h3      → mb-2
.card-content-stack > p       → leading-6 text-[0.95rem]
```

### Strategic disposition rules (applied per page)

| Section role | Alignment rule | Width cap |
|---|---|---|
| Page intro / section header above a grid | center on md+ | `max-w-2xl` lede |
| Editorial / story block | left-aligned | `max-w-prose` body |
| CTA band | always center | `max-w-xl` |
| Card content (feature, pricing, article preview) | always left | full card width |
| Stat/metric block | always center | item-level |
| FAQ question/answer | always left | `max-w-3xl` container |
| Legal / policy body | left, prose-styled | `max-w-prose` |

### Files touched

```text
EDIT  src/styles/layout-rhythm.css   (~80 lines added — alignment utilities)
EDIT  src/pages/About.tsx            (className swaps on section headers + cards)
EDIT  src/pages/Business.tsx
EDIT  src/pages/Services.tsx         (if exists; otherwise skip)
EDIT  src/pages/Training.tsx
EDIT  src/pages/Resources.tsx
EDIT  src/pages/Portfolio.tsx
EDIT  src/pages/Articles.tsx
EDIT  src/pages/Events.tsx
EDIT  src/pages/Partners.tsx
EDIT  src/pages/Careers.tsx
EDIT  src/pages/Contact.tsx
EDIT  src/pages/HelpCenter.tsx
EDIT  src/pages/Sitemap.tsx
EDIT  src/pages/Status.tsx
EDIT  src/pages/PrivacyPolicy.tsx
EDIT  src/pages/TermsOfService.tsx
EDIT  src/pages/RefundPolicy.tsx
EDIT  src/pages/CookiePolicy.tsx
EDIT  src/pages/AcceptableUse.tsx
EDIT  src/pages/Disclaimer.tsx
EDIT  src/components/home/HomeStorySections.tsx
EDIT  src/components/home/FAQPreview.tsx
EDIT  src/components/home/LatestArticles.tsx
```

All edits are className-level only. No JSX restructuring, no prop changes, no logic changes.

### Untouched (per user instruction)

- `HeroHomepage`, `HeroBusiness`, `HeroWorkshops`, all `hero-*` styles and components
- `Footer.tsx` and footer styles
- Auth, Admin, Portal pages (internal screens, separate design system)
- Color tokens, typography tokens, button system
- All routes, data flows, hooks, edge functions

### Accessibility & responsiveness

- All alignment rules mobile-first; left-align on small screens by default to avoid awkward centered ragged lines on phones
- Line-length capped at 65–68ch for body copy (WCAG comfortable reading)
- `text-balance` on headlines for cleaner line wrapping
- Tap-target standards untouched (≥44px stays)
- Honors existing `zoom: 0.75` root scaling (all values relative)
- No new animations, no `transition: all`

### Out of scope

- Pre-existing TypeScript build errors (Speech API, BookingRequestsTable, useStripeKey, email Record types, SEO breadcrumb readonly types) — unrelated to text alignment, predate this work
- Hero pages and footer
- Internal dashboards (Admin, Portal, Auth)
- Component logic and data fetching

### Estimated diff

~80 lines new CSS in `layout-rhythm.css`, ~250 lines of className adjustments across ~22 files. Zero deletions of working content.

