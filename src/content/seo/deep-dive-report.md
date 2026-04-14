# Deep-Dive Report — CSS Cleanup, Google Visibility, Content Optimization, Performance & Security

**Date:** 2026-04-14  
**Phases completed:** 4/4  
**Build result:** ✓ Zero errors, 4141 modules transformed

---

## PHASE 1: CSS Deep Review

### `src/styles/base.css`
- **Fixed:** Removed hardcoded `background-color: hsl(240 10% 98%)` from `body` rule — it conflicted with the `@apply bg-background` Tailwind token above it. Replaced with a comment explaining the intent.
- **Fixed:** Removed duplicate `--radius` token declaration. It was defined twice in `:root` — once as a standalone shorthand comment `--radius: 0.5rem` and then again inside the full Radius Scale block.
- **Fixed:** Removed duplicate `--shadow-xl: none` token at the bottom of `:root`. It was already covered by the `--shadow-xs/sm/md/lg` group above.
- **Fixed:** Removed duplicate `::selection` rule — it was also defined in `polish.css` with a slightly different opacity (0.22 vs 0.25). Kept the `polish.css` version as the authoritative refined pass.

### `src/styles/responsive.css`
- **Fixed:** Removed duplicate `[role="dialog"]` block (lines 161–175 original). Font-smoothing and `max-height: 90vh` on dialogs was redundant — a fuller version with more complete sizing rules appears 15 lines later in the same media query. The first occurrence was dead/superseded.

### `src/styles/hero-homepage.css`
- **Fixed:** Malformed CSS comment — `/* ── 3a. Kicker / Overline ──` and `/* ── 3c. H1 Headline ──` were concatenated on the same line, making the first comment tag unclosed. Split into a single valid comment for the headline block.

### `src/styles/premium-body.css`
- **Fixed:** Removed hardcoded `nav { z-index: 50 !important; }` and `[role="dialog"] { z-index: 60 !important; }` — these conflicted with the z-index token system (`--z-nav: 9999`, `--z-modal: 10000`) in `base.css` and the Tailwind `zIndex` config extension.
- **Fixed:** Removed duplicate dialog sizing rules (`@media (max-width: 640px) [role="dialog"]` block) — these same rules are handled more comprehensively in `responsive.css` and `polish.css`.
- **Fixed:** Removed blanket `[role="dialog"] input/textarea/select { color: white !important; }` overrides that were forcing white text in ALL dialogs including light-background ones, fighting with the `polish.css` foreground-color rules.

### `src/styles/components.css`, `src/styles/polish.css`, `tailwind.config.ts`
- No genuine bugs found. Files are well-structured.

---

## PHASE 2: Google Visibility

### `src/components/SEO.tsx` — PAGE_SEO titles & descriptions
Updated per spec:
- **home:** title updated to include "Training in Ohio"
- **training:** full title "AI Scam Prevention Workshops for Seniors & Families — Kettering & Dayton, Ohio" + new description
- **business:** title "AI Consulting & Business Automation — InVision Network Ohio" + new description
- **about:** title "About InVision Network — Veteran-Founded Cybersecurity Experts in Kettering, Ohio" + new description mentioning veteran-founded
- **contact:** title "Contact InVision Network — Cybersecurity Training in Kettering, Ohio" + new description with phone number
- **resources:** title "Cybersecurity Guides, E-Books & Digital Safety Tools — InVision Network" + new description
- **faq:** title "Frequently Asked Questions — AI Scam Protection | InVision Network" + new description
- **careers:** title "Join InVision Network — Cybersecurity Careers in Dayton, Ohio" + new description

### `src/components/SEO.tsx` — New structured data added
- **resources:** Added `ItemList` schema with 4 key resource items
- **articles:** Added `CollectionPage` schema with publisher Organization
- **careers:** Added `EmployerAggregateRating` schema
- **faq:** Added comprehensive `FAQPage` schema with 5 real Q&A pairs drawn from the FAQ page content

### `src/pages/Careers.tsx`
- Updated to import `PAGE_SEO` and pass `structuredData` from the careers config to `<SEO />`

### `index.html` — noscript block
- Fixed `/business` link → `/ai` (canonical URL)
- Added `/resources` and `/faq` links for better noscript coverage
- Fixed email from `info@` → `hello@invisionnetwork.org` (matches SITE config)
- Updated copyright year from 2024 → 2026
- Added phone and email to noscript footer

### `public/sitemap.xml`
- Already correct: all `lastmod` dates set to 2026-04-14, `/ai` present, all App.tsx routes covered. No changes needed.

### `public/robots.txt`
- Already correct: allows all crawlers, references sitemap, blocks /admin /portal /auth /api. No changes needed.

---

## PHASE 3: Content and Conversion

### CTA audit
- **`src/pages/Contact.tsx`:** Fixed `tel:9373018749` (missing `+1`) → `SITE.phone.tel` (`tel:+19373018749`)
- **`src/components/Footer.tsx`:** Email address `hello@invisionnetwork.org` was displayed as plain text — converted to `<a href="mailto:...">` link

### Internal links — `/business` → `/ai` fixes
These pages had stale `/business` links that would cause a redirect:
- **`src/pages/Index.tsx`:** "Business Solutions" CTA → `/ai` ("Business AI Solutions")
- **`src/pages/About.tsx`:** "AI business solutions" link → `/ai`
- **`src/pages/NotFound.tsx`:** Popular pages list "AI" → `/ai`

### Trust signals
- Existing pages (Homepage, About, Training, Business) have trust stats via `TrustBar`, `HeroFloatingStats`, and `AchievementsShowcase` components. No layout-breaking additions needed.

### 404 page
- Already has: Navigation, Footer, "Back to Home" button, list of main pages, phone number via `SITE.phone.tel`. Fixed stale `/business` link.

---

## PHASE 4: Performance and Security

### Build
- `npm run build`: ✓ Zero errors, ✓ Zero TypeScript errors, 4141 modules transformed in 16.74s
- All page routes already use `React.lazy()` — no changes needed
- Largest chunks: `editor-vendor` 420kB, `charts-vendor` 397kB, `bookCatalog` 392kB — all lazy-loaded as separate chunks, acceptable

### External links — `rel="noopener noreferrer"`
- **`src/components/payment/PaymentElementPanel.tsx`:** Had `rel="noreferrer"` missing `noopener` — fixed to `rel="noopener noreferrer"`
- All other public-facing `target="_blank"` links already had correct `rel` attribute
- Admin-only files (AddTeamMemberModal, ClientOverviewTab, JobApplicationsTable, GraphicDesignAdmin) — already have `rel="noopener noreferrer"` ✓

### Security headers in `vercel.json`
- Already contains all required headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()`, `X-XSS-Protection: 1; mode=block`. No changes needed.

### `console.log` audit
- Only one hit: `src/components/admin/ArticlePublishingSidebar.tsx:1150` — it's in a `placeholder` string attribute, not actual logging code. Not removed.

---

## Files Changed

| File | Changes |
|------|---------|
| `src/styles/base.css` | Remove duplicate --radius token, duplicate --shadow-xl token, duplicate ::selection rule, stale background-color override |
| `src/styles/responsive.css` | Remove duplicate [role="dialog"] block |
| `src/styles/hero-homepage.css` | Fix malformed CSS comment |
| `src/styles/premium-body.css` | Remove conflicting z-index overrides, duplicate dialog sizing, blanket white-text dialog overrides |
| `src/components/SEO.tsx` | Update 8 page titles/descriptions; add structured data for resources, articles, faq, careers |
| `src/pages/Careers.tsx` | Import PAGE_SEO, pass structuredData to SEO component |
| `src/pages/Index.tsx` | Fix /business → /ai link |
| `src/pages/About.tsx` | Fix /business → /ai link |
| `src/pages/NotFound.tsx` | Fix /business → /ai link |
| `src/pages/Contact.tsx` | Fix tel: href to use SITE.phone.tel constant |
| `src/components/Footer.tsx` | Convert email text to mailto: link |
| `src/components/payment/PaymentElementPanel.tsx` | Add noopener to rel attribute |
| `index.html` | Fix noscript: update /business→/ai link, add resources/faq links, fix email, update copyright year |
