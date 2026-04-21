

## Auth Login Page — Beautiful Redesign

Refresh the visual layer of `/auth` with a richer, more luminous aesthetic that aligns with the recently introduced **Vibrance + Glassmorphism v2** system. Pure CSS / className changes — no logic, no form fields, no flow changes.

### Goals
- More vibrant, depth-rich background (aurora-style gradient mesh, animated drifting orbs)
- Premium glass auth card with iridescent border, layered shimmer, and crisper elevation
- More elegant SSO buttons, divider, tabs, inputs, and primary CTA
- Same upgrade applied to the three sibling screens: signup success, MFA verify, password reset
- Fully respects `prefers-reduced-motion` and existing accessibility

### Files touched

```text
EDIT  src/pages/Auth.tsx              (className-only edits to all 4 screens)
EDIT  src/styles/vibrance.css         (add ~5 auth-specific helper classes)
```

No new files. No prop signature changes. No logic changes.

### Visual changes

**1. Background (all 4 screens — login, signup-success, MFA, password-reset)**
- Replace the dark navy gradient with a deeper **midnight-aurora mesh**: ink blue → plum → indigo, with three drifting blurred orbs (coral, lavender, amber) using the existing `vibe-orb-drift` keyframe
- Add a faint top-to-bottom violet glow column behind the card
- Keep the fine dot grid (texture) and brand hairline strip
- Add a soft `vibe-grain` noise overlay at 4% opacity for analog warmth
- Vignette tightened around the card center for stronger focus

**2. Left brand pane (desktop only)**
- Logo tile gains a conic-gradient iridescent border (coral → amber → lavender)
- Headline gradient sweep slowed and widened (orange → amber → coral → orange)
- Trust-point check tiles: switch from flat orange to a `glass-vibe` mini-tile with halo glow
- Add a thin animated `vibe-divider` hairline above the "Trusted by 500+ families" footer

**3. Auth card (the centerpiece)**
- Apply new `.auth-card-vibe` wrapper: white surface with **iridescent gradient border** via masked conic-gradient
- Replace the warm glow ring with a dual-layer aurora glow (coral upper-left + lavender lower-right + amber bottom)
- Top rim hairline becomes an animated shimmer (subtle 6s sweep)
- Shadow stack refined: tighter contact shadow + softer ambient far shadow for a true "floating glass" feel
- Inner subtle linear sheen from top-left to mid

**4. SSO buttons (Google / Microsoft)**
- New `.btn-sso-vibe` style: white glass surface, soft inner highlight, hover lifts 1px and reveals a faint gradient border ring
- Icon size unchanged; label weight kept at 600

**5. Divider ("or continue with email")**
- Hairline becomes a 3-stop gradient (slate → coral 5% → slate)
- Center pill gets a translucent gradient backdrop and `vibe-pill-badge` styling

**6. Tabs (Sign In / Sign Up)**
- Active tab gets a soft warm-cream → white gradient with a 1px coral underline accent
- Inactive tab text-slate-500 with smoother transition

**7. Inputs**
- New `.input-vibe` style: warm off-white fill, inner top highlight, copper focus ring (matches Neo-Tactile spec), icon color shifts to warm amber on focus
- Eye toggle button gets a subtle hover background

**8. Primary "Sign In" button**
- Keep dark plum-ink base but add: subtle inner top highlight, soft amber glow on hover, arrow icon translates 2px right on hover
- Loading spinner color unchanged

**9. "Forgot password?" link**
- Gradient text on hover (orange → coral)

**10. Security footer**
- Shield icon in a tiny gradient circle; thin animated `vibe-divider` hairline above

**11. Sibling screens (signup-success, MFA, password-reset)**
- Same background system
- Same `.auth-card-vibe` wrapper with screen-specific accent hue (emerald for success, amber for MFA, emerald for reset)
- Icon bubbles upgraded with halo glow + iridescent ring

### New CSS helpers added to `src/styles/vibrance.css`

```text
.auth-bg-aurora        — full-bleed aurora background (used on all 4 screens)
.auth-card-vibe        — white card with iridescent conic border + 5-layer shadow
.auth-glow-ring        — dual-aurora glow positioned behind the card
.btn-sso-vibe          — premium SSO button styling
.input-vibe            — warm off-white input with copper focus ring
```

All classes are additive utilities — they do not override existing tokens or break any other page.

### Accessibility & performance
- All decorative elements keep `aria-hidden="true"` and `pointer-events: none`
- Orb drift, shimmer, and pulse disabled under `prefers-reduced-motion: reduce`
- Backdrop blur capped at 20px
- Mobile (<640px): inner glow rings simplified, orb count reduced to 2
- No layout shift, no z-index conflicts, no changes to focus order or tab order

### Out of scope
- Form logic, validation, MFA flow, OAuth handlers — untouched
- Routing, redirects, profile/account-status checks — untouched
- `ForgotPasswordModal`, `TwoFactorVerify`, `PasswordResetForm` internals — only their wrapper styling changes
- All other pages — untouched

