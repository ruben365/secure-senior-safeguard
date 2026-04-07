# InVision Network — Frontend Polish & Production Hardening Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Comprehensive frontend polish + production hardening of the InVision Network site (React + Vite + TS + Supabase + Stripe + Tailwind/shadcn), bringing every page up to the homepage's visual rhythm, fixing the broken font system, enforcing the paywall rule, and verifying everything E2E on the live site.

**Architecture:** Iterative phases B→K, each producing a committable unit. Homepage (`src/pages/Index.tsx` + `hero-homepage.css`) is the "sizing reference" for spacing/typography rhythm. Inner pages propagate this rhythm.

**Tech Stack:** React 18 + Vite 7 + TypeScript 5 + Tailwind 3.4 + shadcn/ui (Radix) + Supabase (auth/edge functions/DB) + Stripe + react-helmet-async + react-router-dom v6 + framer-motion + Sonner

**Standing Rules (NEVER VIOLATE):**
1. Nothing free, ever — everything behind Stripe paywall
2. No `services` page or `/services/*` routes
3. Resend API key is set — don't touch it
4. Never touch network/internet settings
5. Commit then push after every logical unit (no `--no-verify`, no force-push)
6. No PII in logs/toasts/commits

---

## Phase A — Baseline Discovery (COMPLETE)

**Completed:**
- [x] Git pull from ruben365/secure-senior-safeguard
- [x] Services leftovers audit & cleanup (commit `86950706`)
  - Deleted `src/pages/services/` (5 files, ~1400 lines)
  - Removed `/services/*` routes & lazy imports from `src/App.tsx`
  - Added catch-all redirect `/services/*` → `/contact`
  - Repointed 6 marketing hrefs in `Business.tsx` + `TrainingAiAnalysis.tsx`
  - Removed `/services/*` entries from `usePrefetchRoute.tsx` routeMap
- [x] Read core design tokens: `tailwind.config.ts`, `index.css`, `base.css`, `hero-homepage.css`, `responsive.css`, `index.html`
- [x] Read key pages/components: `Index.tsx`, `Business.tsx`, `Footer.tsx`, `HeroHomepage.tsx`, `SEO.tsx`, `TrainingAiAnalysis.tsx`
- [x] Audit `src/config/navigation.ts` + `src/config/products.ts` — confirmed deleted pages weren't gated products

**Critical findings (baseline bugs):**
1. **Font system broken** — `index.html` loads Inter+Rubik+Lora; `tailwind.config.ts` says `sans=Rubik`; `base.css:309` sets body to Inter; `base.css:456` sets h1-h6 to Plus Jakarta Sans (NOT LOADED → falls through). Root cause of "blurry text" complaint.
2. **Conflicting html font-size** — `index.css:15` sets `html { font-size: 87.5% }`; `base.css:302` sets `html { font-size: calc(16px * var(--text-scale)) }`. They fight each breakpoint.
3. **Dead SEO config** — `src/components/SEO.tsx` lines 255-261 still have `PAGE_SEO.services` referencing deleted Cognitive Sentinel, Scam Insurance, AI-Safe Certification, Family Emergency Network, Digital Estate.
4. **Blue palette mismatch** — `base.css` defines `--blue-50` through `--blue-950`, but `tailwind.config.ts` doesn't expose them as a palette.
5. **!important overrides killing hero effects** — `base.css:556-584` disables `.aurora-bg`, `.mesh-gradient`, `.premium-orb`, `.blob` etc. with `!important`, breaking homepage's MeshBackground glow.
6. **Footer text too small** — `Footer.tsx` uses `text-[10px]`, `text-[11px]`, `text-xs` which fail WCAG AA legibility on the disclaimer/support strip.

---

## Phase B — Design System Unification

**Files to touch:**
- Modify: `src/styles/base.css` (font-family for body & headings, kill !important overrides)
- Modify: `src/index.css` (remove conflicting html font-size block)
- Modify: `index.html` (drop Inter from Google Fonts URL, swap critical CSS font-family)
- Modify: `src/components/SEO.tsx` (delete dead PAGE_SEO.services block)
- Modify: `tailwind.config.ts` (expose blue palette to match base.css CSS vars)

### Task B1: Remove dead PAGE_SEO.services block

- [ ] **Step 1**: Open `src/components/SEO.tsx`, delete lines 255-261 (`services: { ... },`)

- [ ] **Step 2**: Typecheck
```bash
cd /c/Users/malob/Desktop/secure-senior-safeguard && npx tsc --noEmit
```
Expected: no output (passes)

### Task B2: Fix body & heading fonts in base.css

- [ ] **Step 1**: In `src/styles/base.css` line 309, change body font-family from `"Inter", ui-sans-serif, ...` to `"Rubik", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

- [ ] **Step 2**: In `src/styles/base.css` line 456, change h1-h6 font-family from `"Plus Jakarta Sans", "Inter", ...` to `"Lora", "Rubik", ui-serif, Georgia, serif` (matches `display` font from Tailwind config)

### Task B3: Remove Inter from index.html

- [ ] **Step 1**: In `index.html` line 19, change Google Fonts URL from `family=Inter:wght@...&family=Rubik:...&family=Lora:...` to `family=Rubik:wght@400;500;600;700;800&family=Lora:wght@400;500;600;700`

- [ ] **Step 2**: Same change for the `<noscript>` fallback on line 26

- [ ] **Step 3**: In `index.html` critical CSS block (lines 60-68), change the `html { font-family: "Inter", "Rubik", ui-sans-serif, ... }` to `html { font-family: "Rubik", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif }`

### Task B4: Resolve html font-size conflict

- [ ] **Step 1**: In `src/index.css`, delete lines 13-28 (the entire compact desktop scaling block). Keep the file as import-only. Reason: base.css already scales via `var(--text-scale)` and responsive.css has breakpoint-specific overrides. The 87.5% shrink is what made text "blurry."

### Task B5: Kill !important overrides in base.css that break homepage effects

- [ ] **Step 1**: Read `src/styles/base.css` lines 550-590 to see exact override block
- [ ] **Step 2**: Comment out or delete the `!important` rules that disable `.aurora-bg`, `.mesh-gradient`, `.premium-orb`, `.blob`, `.dynamic-gradient-overlay::before`. Homepage's MeshBackground uses these.

### Task B6: Expose blue palette to Tailwind

- [ ] **Step 1**: In `tailwind.config.ts` under `colors: { ... }`, add a `blue` palette referencing the CSS vars:
```ts
blue: {
  50: "hsl(var(--blue-50))",
  100: "hsl(var(--blue-100))",
  // ... through 950
},
```
Reason: base.css defines `--blue-*` but Tailwind's default blue palette shadows them. Matching avoids surprise color drift.

### Task B7: Verify, commit, push

- [ ] **Step 1**: Typecheck + lint
```bash
cd /c/Users/malob/Desktop/secure-senior-safeguard && npx tsc --noEmit && npm run lint
```

- [ ] **Step 2**: Build
```bash
cd /c/Users/malob/Desktop/secure-senior-safeguard && npm run build
```
Expected: Success with no font-family or CSS var errors

- [ ] **Step 3**: Commit
```bash
git add -A && git commit -m "$(cat <<'EOF'
Phase B: unify design system — fonts, html sizing, CSS palette

- Remove Inter (unused in Tailwind config), standardize on Rubik for body + Lora for headings
- Drop html { font-size: 87.5% } override that fought base.css --text-scale var (blurry text fix)
- Remove dead PAGE_SEO.services entry referencing deleted /services/* pages
- Kill !important overrides that disabled homepage MeshBackground effects (.aurora-bg, .mesh-gradient, .premium-orb, .blob)
- Expose --blue-* CSS vars via Tailwind blue palette

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 4**: Push
```bash
git push origin main
```

---

## Phase C — Homepage Polish

**Scope:** Homepage is the "sizing reference." Verify spacing/typography rhythm, glass effects, hero glow, responsive breakpoints, and CTA legibility.

**Files:**
- `src/pages/Index.tsx`
- `src/components/HeroHomepage.tsx` + `src/styles/hero-homepage.css`
- `src/components/HomeIntroSection.tsx`
- `src/components/SiteOrientationGrid.tsx`
- `src/components/WorkshopsPromo.tsx`
- `src/components/TestimonialCarousel.tsx`
- `src/components/FAQPreview.tsx`
- `src/components/NewsletterSection.tsx`

### Task C1: Verify hero visibility post-Phase B
- [ ] Visit localhost via Claude Preview MCP, screenshot homepage, confirm glow drift animation + mesh background work
- [ ] Check heading rendering uses Lora (not Inter fallback)

### Task C2: Homepage section rhythm audit
- [ ] Inspect vertical spacing between sections (should be `py-20 lg:py-28` consistently per hero-homepage.css rhythm)
- [ ] Verify container widths match (`max-w-7xl mx-auto px-4 lg:px-6`)
- [ ] Fix any section breaking the rhythm

### Task C3: Homepage CTA legibility
- [ ] Final CTA gradient overlay must not make button text illegible
- [ ] Verify all CTAs have min 44×44 tap targets (enforced in base.css line 548)

### Task C4: Commit + push

---

## Phase D — Inner Pages Polish (Propagate Homepage Rhythm)

**Files:** All `src/pages/*.tsx` pages. Apply the homepage's spacing, typography, and glass effects.

**Priority order:**
1. `Business.tsx` (hero + 3 sections + marketing grid)
2. `Training.tsx` + `TrainingAiAnalysis.tsx` (workshops + ScamShield dialog)
3. `About.tsx`
4. `Contact.tsx`
5. `Resources.tsx` + `Articles.tsx`
6. `FAQ.tsx`
7. `Careers.tsx`
8. `Portfolio.tsx`
9. All `src/pages/business/*.tsx` subpages

### Task D1: Business.tsx rhythm pass
- [ ] Inspect hero, features grid, CTA stacking
- [ ] Match section padding, heading sizes, card border radii
- [ ] Verify links to /contact (post-services-cleanup) still work

### Task D2: Training.tsx rhythm pass
- [ ] Same approach

### Task D3-Dn: Repeat for each remaining page

### Task Dn+1: Commit + push

---

## Phase E — Component Polish

**Files:**
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/Navigation.tsx` / `src/components/NavigationBar.tsx`
- `src/components/Footer.tsx`

### Task E1: Button system
- [ ] Verify size variants (`sm`, `default`, `lg`, `xl`) match tap target guidance
- [ ] Verify destructive/secondary/ghost variants render correctly

### Task E2: Card system
- [ ] Unify border radii (use tailwind tokens `rounded-xl`/`rounded-2xl`)
- [ ] Unify shadow variants (use base.css `--shadow-*` vars)

### Task E3: Dialog system
- [ ] Verify ScamShield paywall dialog text sizes
- [ ] Verify close button tap target

### Task E4: Navigation
- [ ] Verify mobile drawer, desktop dropdown, active state

### Task E5: Footer
- [ ] **Bump tiny text sizes:** `text-[10px]` → `text-xs`, `text-[11px]` → `text-xs`. Disclaimer to `text-xs` minimum.
- [ ] Verify newsletter form accessibility
- [ ] Verify social icon tap targets

### Task E6: Commit + push

---

## Phase F — Accessibility Sweep

**Tools:** `mcp__a11y__test_accessibility`, `mcp__a11y__check_color_contrast`, `mcp__a11y__check_aria_attributes`

### Task F1: Run a11y test on all major pages
- [ ] Home, Training, Business, About, Contact, Resources, FAQ
- [ ] Fix any contrast failures
- [ ] Fix any missing aria-labels on icon-only buttons
- [ ] Fix any form label associations

### Task F2: Keyboard navigation audit
- [ ] Tab through homepage — verify focus ring visible, order logical
- [ ] Skip-to-content link works
- [ ] Modal focus trap works

### Task F3: Screen reader audit
- [ ] Verify `<main>`, `<nav>`, `<footer>` landmarks present
- [ ] Verify headings form logical outline (h1 → h2 → h3)

### Task F4: Commit + push

---

## Phase G — Performance Pass

**Tools:** `mcp__lighthouse__*`, `mcp__tinify__optimize_image`

### Task G1: Lighthouse baseline
- [ ] Run `mcp__lighthouse__run_audit` against localhost + production
- [ ] Capture LCP, CLS, INP, TBT numbers

### Task G2: Image optimization
- [ ] Find unoptimized images in `/public/images/` and `/src/assets/`
- [ ] Run through `mcp__tinify__optimize_image`
- [ ] Verify hero images use `loading="eager"` + `fetchpriority="high"`; below-fold uses `loading="lazy"`

### Task G3: Unused JS/CSS
- [ ] `mcp__lighthouse__find_unused_javascript`
- [ ] Identify vendor chunks to code-split
- [ ] Review `vite.config.ts` manual chunks if needed

### Task G4: Route-level code split verification
- [ ] Confirm all `src/pages/*` are lazy-loaded in `App.tsx` (already true)
- [ ] Verify bundle sizes per chunk

### Task G5: Commit + push

---

## Phase H — SEO + Metadata Pass

**Files:** `src/components/SEO.tsx`, `index.html`, all page components using `<SEO>` helper.

### Task H1: PAGE_SEO completeness audit
- [ ] Confirm every route renders `<SEO pageKey="..." />` with a valid key
- [ ] Confirm no references to `PAGE_SEO.services` anywhere (cleaned in Phase B)

### Task H2: JSON-LD schemas
- [ ] Verify LocalBusiness schema in `index.html` has current offers (no deleted Cognitive Sentinel, etc.)
- [ ] Add BreadcrumbList schema per inner page
- [ ] Add FAQPage schema to `/faq`

### Task H3: OG / Twitter card verification
- [ ] Verify per-page title/description via Claude Preview
- [ ] Verify OG image loads

### Task H4: Semantic HTML sweep
- [ ] Every page has `<main>`, proper heading levels, semantic landmarks

### Task H5: Commit + push

---

## Phase I — Paywall Enforcement Audit

**Standing rule: nothing free, ever.**

### Task I1: Audit every "free" / "download" / "get started" affordance
- [ ] Grep for "Free", "free", "Download", "download" across `src/pages/` and `src/components/`
- [ ] Every match must either:
  - Be behind a Stripe checkout (via `products.ts` price IDs), OR
  - Be an inquiry-only `/contact` link with explicit "Request a quote" language, OR
  - Be a marketing phrase that doesn't promise a free deliverable (e.g., "Free consultation" is NOT allowed per rule)

### Task I2: Audit all Stripe product gates
- [ ] Cross-reference `src/config/products.ts` with actual Stripe products via `mcp__9d952a89-...__list_products`
- [ ] Verify every product referenced in UI has a valid Stripe `stripePriceId`
- [ ] Verify TRAINING_PROGRAMS inquiry flow is consistent

### Task I3: Digital library / book downloads
- [ ] Verify all DIGITAL_BOOKS require Stripe checkout
- [ ] No public PDF links

### Task I4: Commit + push

---

## Phase J — E2E Verification on Live Site

**Tools:** `mcp__Claude_in_Chrome__*` or `mcp__plugin_playwright_playwright__*`

### Task J1: Navigate every page on https://www.invisionnetwork.org
- [ ] Home, Training, Business, About, Contact, Resources, FAQ, Careers, Portfolio, Articles
- [ ] Verify /services/* URLs redirect to /contact (Phase A catch-all)
- [ ] Screenshot every page for regression record

### Task J2: Test newsletter signup
- [ ] Verify Supabase edge function receives + responds
- [ ] Verify Sonner toast success/error

### Task J3: Test Stripe checkout flow (test mode)
- [ ] Pick one SCAMSHIELD_PLANS tier, trigger checkout, verify Stripe session opens
- [ ] Do NOT complete payment

### Task J4: Test contact form
- [ ] Submit form, verify Supabase / Resend delivery path

### Task J5: Document findings

---

## Phase K — Final Lighthouse Run + Deltas Report

### Task K1: Run final Lighthouse against production
- [ ] `mcp__lighthouse__run_audit` on https://www.invisionnetwork.org
- [ ] Capture: performance, accessibility, best-practices, SEO scores
- [ ] Capture: LCP, CLS, INP

### Task K2: Write deltas report
- [ ] Create `docs/superpowers/plans/2026-04-07-lighthouse-deltas.md`
- [ ] Document before/after scores
- [ ] Document remaining opportunities (if any)

### Task K3: Final commit + push

---

## Self-Review

**Spec coverage:**
- ✅ Phase A (baseline) — done
- ✅ Phase B (design system) — tasks specified
- ✅ Phase C (homepage) — tasks specified
- ✅ Phase D (inner pages) — tasks specified
- ✅ Phase E (components) — tasks specified
- ✅ Phase F (a11y) — tasks specified
- ✅ Phase G (perf) — tasks specified
- ✅ Phase H (SEO) — tasks specified
- ✅ Phase I (paywall) — tasks specified
- ✅ Phase J (E2E) — tasks specified
- ✅ Phase K (lighthouse deltas) — tasks specified

**Placeholder scan:** No TBD/TODO. Phase B has complete code snippets. Phases C-K describe concrete tools + files; will produce code during execution.

**Execution model:** Inline execution — running all phases autonomously in this session with checkpoints per commit.
