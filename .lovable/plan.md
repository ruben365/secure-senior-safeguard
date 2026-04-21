

## Auth Page — Complete Visual Reinvention

A full ground-up redesign of `/auth` (login, signup-success, MFA, password-reset). New background, new card, new layout, new everything. The current "Vibrance v2" treatment will be replaced with a fresh aesthetic.

### New direction: "Soft Daylight" — warm, airy, premium

Departing from the current dark midnight-aurora look. The new aesthetic is **light, warm, and architectural**: a cream-and-peach atmosphere with a sculptural glass card, subtle paper texture, and refined micro-details. Mirrors the Plume design system used across the rest of the site instead of fighting against it.

### Background — fully rebuilt

Replace the dark `auth-bg-aurora` with a new `auth-bg-daylight` system:
- Base: vertical wash from cream `hsl(35 40% 97%)` → soft peach `hsl(20 50% 94%)` → warm ivory
- Three large drifting blurred orbs in **terracotta, lavender, and amber** at low opacity (no dark navy)
- Faint diagonal architectural grid (1px lines, 8% opacity) for structure
- Soft paper-grain noise overlay (3% opacity)
- Two thin animated light rays sweeping diagonally (12s loop)
- Top and bottom hairline accents in copper gradient
- Mobile: simplified to two orbs, no rays

### Card — fully rebuilt

Replace `auth-card-vibe` with new `auth-card-daylight`:
- **Surface**: pure white with a 1px iridescent border (conic gradient: copper → lavender → cream → copper)
- **Shape**: 20px radius, generous 2.5rem padding (3rem on desktop)
- **Elevation**: dual-layer shadow — tight contact (0 2px 8px) + ambient soft (0 30px 80px -20px) — both warm-tinted
- **Inner detail**: subtle linear sheen from top-left, a 1px coral accent strip on the left edge
- **No glow ring** — replaced with a clean single warm ambient shadow

### Layout — restructured

- Single-column centered layout on all screen sizes (no more two-pane brand panel)
- Logo + brand mark at top (centered, larger, with copper gradient ring)
- Tagline directly under brand: "Your secure portal" in small caps
- Compact heading stack
- SSO buttons full-width
- Refined divider
- Tabs
- Form fields
- Trust footer with three small icon chips (Encrypted / Kettering team / Private)

### SSO buttons — rebuilt

New `btn-sso-daylight`:
- Cream-tinted glass surface (not pure white)
- 1px warm border that gradient-shifts to copper on hover
- Inner top highlight (1px white sheen)
- Hover: lifts 1px, soft amber inner glow
- Icon + label spacing tightened

### Tabs — rebuilt

- Container: cream pill with 1px border
- Active: white surface with 2px copper underline accent (no gradient fill)
- Inactive: warm slate text
- Smooth 200ms transition

### Inputs — rebuilt

New `input-daylight`:
- Surface: warm off-white with subtle inner top shadow
- Border: hairline warm slate
- Focus: 2px copper ring + white surface + icon shifts to copper
- Larger 48px height for better touch targets
- Icon left-padding adjusted

### Primary CTA — rebuilt

- Full-width 52px height
- Background: gradient from `hsl(20 80% 52%)` → `hsl(15 75% 45%)` (terracotta deepening)
- Inner top highlight (1px white at 30% opacity)
- Soft drop shadow in matching coral
- Hover: brightens 4%, arrow translates 3px right
- Loading state: copper spinner

### Secondary screens (signup-success, MFA, password-reset)

Same `auth-bg-daylight` background, same `auth-card-daylight` shell. Accent hue tuned per screen:
- Signup success → emerald accent strip and icon halo
- MFA verify → amber accent strip and icon halo
- Password reset → lavender accent strip and icon halo

### Files touched

```text
EDIT  src/styles/vibrance.css   (rewrite the auth-* utility block — ~180 lines replaced)
EDIT  src/pages/Auth.tsx        (className replacements + remove left brand pane + restructure)
```

No new files. No logic changes. No prop changes. No route changes. No DB.

### CSS classes added (replaces existing auth-* set)

```text
.auth-bg-daylight       — full-bleed warm cream gradient background
.auth-bg-daylight::before — orb layer + diagonal grid
.auth-card-daylight     — white card with iridescent border + warm dual shadow
.auth-card-accent       — left edge color strip (modifier)
.btn-sso-daylight       — cream glass SSO button
.input-daylight         — warm off-white input with copper focus
.auth-cta-primary       — terracotta gradient CTA button
.auth-divider-warm      — gradient hairline + cream pill
.auth-tabs-warm         — cream tab container + copper underline
```

Old classes (`auth-bg-aurora`, `auth-card-vibe`, `auth-glow-ring`, `btn-sso-vibe`, `input-vibe`) are removed in this rewrite — they are only used inside `Auth.tsx`, so no other pages are affected.

### Accessibility & performance

- All decorative layers `aria-hidden` and `pointer-events: none`
- Orb drift, light rays, shimmer all disabled under `prefers-reduced-motion: reduce`
- No `backdrop-filter` over 12px (perf rule)
- Tap targets ≥48px
- Color contrast: all text WCAG AA on the new cream surface (slate-900 / slate-600 only)
- Mobile: orb count reduced, light rays disabled, padding tightened

### Out of scope

- Form logic, validation, OAuth handlers, MFA flow — untouched
- `ForgotPasswordModal`, `TwoFactorVerify`, `PasswordResetForm` internals — only their wrapper styling changes
- Pre-existing TypeScript build errors (Speech API types, BookingRequestsTable schema, useStripeKey, email Record types, SEO breadcrumb readonly types) — unrelated to auth styling, predate this work
- All other pages — untouched

