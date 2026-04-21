

## Add Unified Hero Sections to Header-Less Pages

Several public pages outside the main header navigation lack a proper hero section, making them feel inconsistent with the rest of the site (FAQ, Careers, About all use the unified `Hero` component with branded imagery). This plan adds a polished, on-brand hero to each of those pages.

### Pages targeted (9 total — all NOT in main header)

```text
✗ MISSING HERO              →  WILL GAIN ONE
─────────────────────────────────────────────
src/pages/Sitemap.tsx          (Site Directory)
src/pages/Status.tsx           (System Status)
src/pages/HelpCenter.tsx       (Help & Support)
src/pages/PrivacyPolicy.tsx
src/pages/TermsOfService.tsx
src/pages/RefundPolicy.tsx
src/pages/CookiePolicy.tsx
src/pages/AcceptableUse.tsx
src/pages/Disclaimer.tsx
```

### Pages explicitly NOT touched (per user request)

```text
✓ Header-nav pages — UNTOUCHED
─────────────────────────────
Index (Home)         - has hero
AI / Business        - has hero
Workshops/Training   - has hero
Library              - has hero
About                - has hero
Careers              - has hero
FAQ                  - has hero
Contact              - has hero
```

Also untouched: Footer, hero on existing pages, all logic, all routes, all data flows.

### Design approach

Two hero patterns matched to page personality:

**Pattern A — Branded photo hero (Sitemap, Status, HelpCenter)**
Same `<Hero>` component the rest of the site uses, with branded imagery from `PROFESSIONAL_HERO_IMAGES`. Compact variant: `min-h-[55dvh]` instead of `100dvh` (these are utility pages, not landing pages).

**Pattern B — Compact gradient hero (6 legal pages)**
Lightweight, professional gradient-only hero (no image) — fits the formal nature of legal copy. Uses the existing `auth-bg-aurora` ambience tokens at low intensity, with eyebrow + headline + lede stack.

### Per-page details

| Page | Pattern | Eyebrow | Headline | Lede |
|------|---------|---------|----------|------|
| Sitemap | A — `resources` image | Site Directory | Find every page in one place | Browse the complete map of InVision Network. |
| Status | A — `business` image | System Health | Live platform status & uptime | Real-time monitoring of every service we operate. |
| HelpCenter | A — `faq` image | Support | How can we help you today? | Search our knowledge base or browse by topic. |
| PrivacyPolicy | B | Legal | Privacy Policy | How we collect, use, and protect your information. |
| TermsOfService | B | Legal | Terms of Service | The agreement between you and InVision Network. |
| RefundPolicy | B | Legal | Refund Policy | Our commitment to fair refunds and digital fulfillment. |
| CookiePolicy | B | Legal | Cookie Policy | How we use cookies and your choices. |
| AcceptableUse | B | Legal | Acceptable Use Policy | The rules for using our platform responsibly. |
| Disclaimer | B | Legal | Disclaimer | Important notices about our content and services. |

### New shared component

```text
NEW   src/components/shared/CompactLegalHero.tsx   (~50 lines)
        Props: eyebrow, title, lede, accentColor?
        Uses: gradient bg + soft aurora orbs + dot grid
        Height: min-h-[40dvh] sm:min-h-[45dvh]
        Respects reduced motion, no animations on critical path
```

### Files touched

```text
NEW   src/components/shared/CompactLegalHero.tsx
EDIT  src/pages/Sitemap.tsx           (replace bare h1 with <Hero>)
EDIT  src/pages/Status.tsx            (replace py-12 hero with <Hero>)
EDIT  src/pages/HelpCenter.tsx        (replace bg-primary/5 block with <Hero>)
EDIT  src/pages/PrivacyPolicy.tsx     (add <CompactLegalHero> above body)
EDIT  src/pages/TermsOfService.tsx    (add <CompactLegalHero>)
EDIT  src/pages/RefundPolicy.tsx      (add <CompactLegalHero>)
EDIT  src/pages/CookiePolicy.tsx      (add <CompactLegalHero>)
EDIT  src/pages/AcceptableUse.tsx     (add <CompactLegalHero>)
EDIT  src/pages/Disclaimer.tsx        (add <CompactLegalHero>)
```

No DB, no edge function, no dependency, no route changes.

### Constraints respected

- No edits to header navigation, header pages, or Footer
- All headlines remain copy-rule compliant: no em-dashes, no semicolons, no banned words
- Veteran/AI naming standards untouched
- Mobile-first sizing with explicit `min-h-[Xdvh]`
- All decorative orbs `aria-hidden` and `pointer-events: none`
- `prefers-reduced-motion` respected (no orb drift)
- The pre-existing TypeScript errors in `BookingRequestsTable`, `LauraAIAssistant`, `useStripeKey`, etc. are out of scope — they predate this plan and concern unrelated database/types issues.

### Estimated diff

~50 lines new component + ~150 lines of hero JSX additions across 9 pages. Zero deletions of working content.

