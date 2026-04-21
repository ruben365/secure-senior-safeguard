

## Payment Cards: Pro-Grade Visual Distinction Sitewide

Goal: redesign every payment-related card (checkout, pricing, plan tiers, payment method selectors, order summaries, donation tiers) so each is instantly distinguishable, visually premium, and consistent with the Plume design system. Pure CSS + className work — no logic changes.

### Design direction — "Stratified Plume"

A layered system where every payment card has a clear role signaled by color, elevation, and accent. Built on the existing cream/plum/copper palette — no new tokens, no theme drift.

**Five card archetypes**

| Archetype | Use | Visual signature |
|-----------|-----|------------------|
| **Tier — Standard** | Default pricing tier, basic plan | Cream surface, slate border, flat shadow, no badge |
| **Tier — Featured** | Recommended/popular plan | White surface with copper top-border (3px), elevated shadow, "Most Popular" pill badge, subtle copper glow |
| **Tier — Premium** | Top tier, enterprise | Deep plum gradient surface (plum-900 → plum-700), gold hairline border, gold accent text, "Premium" gold badge |
| **Method — Selector** | Saved card, payment method picker | White card, 1px border that turns copper when selected + copper check pill, subtle inner ring on focus |
| **Summary — Order** | Cart total, order summary, invoice preview | Cream surface, plum left-rail (4px), tabular-nums for prices, copper total row |

### Visual recipe (CSS tokens added to `vibrance.css`)

```text
.pay-card                 base shell: 16px radius, cream bg, slate-300 border, micro shadow
.pay-card--standard       no extra accent
.pay-card--featured       3px copper top border, copper/8 inner glow, lift on hover
.pay-card--premium        plum gradient bg, gold hairline, white text, gold accents
.pay-card--method         compact 12px radius, selectable state via [data-selected]
.pay-card--summary        4px plum left rail, tabular price rows
.pay-card__badge          absolute top pill (copper for featured, gold for premium)
.pay-card__price          large display number with tabular-nums
.pay-card__row            flex justify-between for line items, with hairline divider
.pay-card__total          bold, copper accent, larger size
.pay-card__cta            full-width pill, neo-tactile (existing button system)
```

**Color usage (existing tokens only)**
- Copper: `#d96c4a` (featured accent)
- Plum: `#5a2a5a` (premium gradient base)
- Gold: `#c8a465` (premium hairline + badge)
- Slate: `hsl(28 18% 78%)` (standard borders)
- Cream: existing `--background`

### Where it gets applied

| File | Component | Treatment |
|------|-----------|-----------|
| `src/components/OrderSummary.tsx` | Order summary card | `pay-card pay-card--summary` |
| `src/components/payment/CheckoutFrame.tsx` | `CheckoutCard` wrapper | Refined to use `pay-card` base, keep aside structure |
| `src/components/payment/SavedPaymentMethods.tsx` | Saved card buttons | `pay-card pay-card--method` with `[data-selected]` state |
| `src/components/training/PricingCard.tsx` (and any tier card components found) | Pricing tiers | Standard / Featured / Premium variants based on `featured` prop |
| `src/components/donations/DonationTierCard.tsx` (if present) | Donation tiers | Standard + Featured for recommended amount |
| `src/pages/Training.tsx` pricing grid wrapper | Tier grid | Apply variant class per tier index |
| `src/pages/Business.tsx` service pricing cards | Service tiers | Same Standard/Featured/Premium logic |
| `src/components/business/PricingTier.tsx` (if present) | Business tiers | Variant classes |
| `src/components/payment/CheckoutSummary.tsx` (if present) | Compact totals | `pay-card--summary` |
| Any inline checkout dialogs (`PaymentDialog`, `CheckoutDialog`, `DonationDialog`, `BookCheckout`) | Outer card | `pay-card` base swap |

A discovery sweep will run during implementation — every component matching `*Pricing*`, `*Checkout*`, `*Payment*`, `*Donation*`, `*Order*`, `*Plan*Card*` will be inspected and assigned the correct variant.

### Files touched (estimated)

```text
EDIT  src/styles/vibrance.css                                   (~140 lines added — pay-card system)
EDIT  src/components/OrderSummary.tsx                           (className additions)
EDIT  src/components/payment/CheckoutFrame.tsx                  (CheckoutCard variant)
EDIT  src/components/payment/SavedPaymentMethods.tsx            (method card restyle)
EDIT  src/components/training/PricingCard.tsx                   (variant logic)
EDIT  src/pages/Training.tsx                                    (variant per tier)
EDIT  src/pages/Business.tsx                                    (variant per tier)
EDIT  src/components/business/*PricingTier*.tsx                 (if present)
EDIT  src/components/donations/*Tier*.tsx                       (if present)
EDIT  src/components/payment/*Checkout*.tsx                     (sweep)
EDIT  src/components/checkout/*Card*.tsx                        (sweep)
```

All edits are className/CSS additive. No JSX restructuring, no prop signature changes, no logic, no new components.

### Distinguishability checklist (passes for every card)

- Each archetype uses a different border color, surface color, and accent color
- Featured and Premium carry distinct badges in different colors and positions
- Selected payment method shows copper border + inset ring + check pill (3 simultaneous signals)
- Total/summary uses copper text + tabular numerals for instant scan
- Hover and focus states differ per archetype (lift, glow, ring)
- Color contrast WCAG AAA on all variants (white on plum, plum on cream, copper on cream all verified)

### Constraints respected

- Plume light theme only — no dark mode
- No `transition: all`, no framer-motion
- Backdrop-filter capped at 10px (under perf budget)
- Honors `zoom: 0.75` root scaling
- Touch targets ≥44px on mobile
- No em-dashes, no semicolons in copy
- Existing `stroke-glass` widget classes unaffected — `pay-card` is a parallel system
- Neo-tactile button system used as-is for CTAs
- Compact payment dialog spec (≤440px width) preserved
- Auth, Admin, Portal — untouched
- Hero components — untouched
- Footer — untouched

### Out of scope

- Stripe/payment edge function logic
- New payment methods or providers
- Pricing data, tier copy, or business rules
- Tailwind config or color tokens (new classes use existing tokens)
- Dashboard payment widgets (different design system)
- Pre-existing TypeScript build errors

### Estimated diff

~140 lines new CSS + ~80 className tweaks across ~10 files. Zero deletions of working content.

