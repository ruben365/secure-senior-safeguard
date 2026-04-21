

## Add Subtle Stroke Glass Widgets Sitewide

Goal: introduce a refined "Subtle Stroke" glass widget treatment to content sections sitewide (between hero and footer). Pure CSS + className additions — no new logic, no hero changes, no footer changes.

### Design — "Subtle Stroke" glass widget

A whisper-thin, premium glass surface that sits gently on the cream background. Built to layer over any section without overpowering it.

**Visual recipe**
- Surface: white at 65% opacity over warm cream
- Border: 1px hairline in warm slate at 40% opacity
- Inner stroke: 1px inset highlight at top (white at 60%) — gives the "etched glass" feel
- Outer ambient: soft warm shadow `0 1px 2px rgba(80,40,80,0.04), 0 12px 32px -16px rgba(80,40,80,0.08)`
- Backdrop blur: 10px (under the 12px perf cap)
- Radius: 16px (tight) / 20px (standard) / 24px (large)
- Corner accent: optional 1px copper hairline on top-left corner (8px L-shape) for the "subtle stroke" signature

**Variants**
```text
.stroke-glass            → standard 20px radius, full treatment
.stroke-glass--tight     → 16px radius, lighter shadow (for inline cards)
.stroke-glass--large     → 24px radius, deeper ambient (for feature blocks)
.stroke-glass--accent    → adds copper L-corner stroke (signature variant)
.stroke-glass--quiet     → no shadow, only border + blur (for already-busy sections)
```

### Where it gets applied

Strategic placement only — not blanket-wrapped. Targets containers that currently feel flat or unmoored on the cream background.

| Page | Sections receiving widget | Variant |
|------|---------------------------|---------|
| About | Mission card, values grid items, story timeline | `.stroke-glass--accent` on mission, `.stroke-glass--tight` on values |
| Business | Stat band, service cards, CTA band | `.stroke-glass--large` on stats, standard on services |
| Training | Pricing tier cards (outer wrapper only), instructor cards | `.stroke-glass--accent` on top tier, standard on rest |
| Resources | Featured shelf wrapper, category filter bar | `.stroke-glass--quiet` on filter bar |
| Articles | Article preview cards, featured article block | `.stroke-glass--tight` on previews |
| Portfolio | Project cards, filter bar | `.stroke-glass--tight` on cards |
| Events | Event cards, upcoming/past tabs container | standard on cards |
| Partners | Partner logos grid wrapper, testimonials | `.stroke-glass--quiet` on grid |
| Careers | Job position cards, benefits grid | standard on positions, `.stroke-glass--tight` on benefits |
| Contact | Contact info card, form wrapper, map block | `.stroke-glass--accent` on form |
| FAQ (preview) | Question accordion items | `.stroke-glass--tight` |
| HelpCenter | Topic category cards, search wrapper | `.stroke-glass--quiet` on search |
| Sitemap | Section column wrappers | `.stroke-glass--tight` |
| Status | Service status rows, uptime block | `.stroke-glass--quiet` |
| Legal pages (6) | Body prose wrapper | standard, single application |
| Home (below hero) | HomeStorySections cards, FAQPreview, LatestArticles | mixed: `--tight` on previews, `--accent` on featured |

### Files touched

```text
EDIT  src/styles/vibrance.css                          (~90 lines added — stroke-glass utilities)
EDIT  src/pages/About.tsx                              (className additions on section wrappers)
EDIT  src/pages/Business.tsx
EDIT  src/pages/Training.tsx
EDIT  src/pages/Resources.tsx
EDIT  src/pages/Articles.tsx
EDIT  src/pages/Portfolio.tsx
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

All edits are className-additive. No JSX restructuring, no prop changes, no logic, no new components.

### Untouched (per user instruction)

- All hero components (`HeroHomepage`, `HeroBusiness`, `HeroWorkshops`, etc.) and `hero-*` styles
- `Footer.tsx` and footer styles
- Auth, Admin, Portal pages (separate design systems)
- Color tokens, typography tokens, button system
- All routes, data flows, hooks, edge functions

### Constraints respected

- `backdrop-filter: blur(10px)` — under the 12px perf cap
- No `transition: all`
- No animation on mount (widget is static; only existing scroll-reveal observers run)
- Decorative inner stroke is `pointer-events: none`
- Honors `prefers-reduced-transparency: reduce` — falls back to solid white at 96%
- WCAG AA contrast preserved (text colors unchanged)
- Mobile-first; blur stays at 10px (mobile-safe)
- Honors existing `zoom: 0.75` root scaling

### Out of scope

- Hero pages and footer
- Pre-existing build error in `HeroHomepage.tsx` line 77 (`fetchpriority` → `fetchPriority` casing) — that is a separate one-line fix, not part of this design pass
- Internal dashboards
- Component logic, data, hooks
- Tailwind config (all utilities live in `vibrance.css`)

### Estimated diff

~90 lines new CSS + ~80 lines of className additions across ~23 files. Zero deletions of working content.

