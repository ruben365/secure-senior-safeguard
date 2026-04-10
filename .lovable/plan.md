

## Neo-Tactile Design Overhaul — Approved Implementation Plan

### Summary
Apply the Neo-Tactile UI kit aesthetic site-wide, fix the persistent "Need Help" popup, redesign auth page, unify hero buttons/sizes, and switch toasts to white theme.

### Changes

**1. Global CSS Tokens** (`src/styles/base.css`)
- Update shadow system to warm plum-tinted Neo-Tactile elevations (Lv1–Lv8)
- Refine `.glass-card`, `.btn-primary` utilities to match kit
- Verify `#root { zoom: 0.75 }` is applied

**2. Button System** (`src/components/ui/button.tsx`)
- Refine `heroPrimary` and `heroOutline` variants to match kit's pill controls
- Ensure consistent radius, weight, and pressed states across all variants

**3. Propagate Hero CTAs to All Pages**
- Files: Hero sections in About, FAQ, Contact, Careers, Resources, Training, AI pages
- Add "Get Protected" (heroPrimary) + "See Our Work" (heroOutline) style buttons to every page hero
- Use page-appropriate labels (e.g., "Start Learning" / "View Plans" for Workshops)

**4. Unify Hero Heights** (`src/components/Hero.tsx`)
- Change from `min-h-[115dvh]` to `min-height: 100dvh` to match homepage

**5. Fix "Need Help" Popup** (`src/contexts/CartFeedbackContext.tsx` + `src/components/CartFeedbackNotifications.tsx`)
- Add `dismissed` flag persisted to `sessionStorage`
- Block `triggerEmptyCartHelp` when dismissed
- "I'm Just Browsing" and X button set dismissed = true

**6. White Toast Notifications** (`src/components/ui/sonner.tsx`)
- Background: white, text: dark slate, border: warm subtle
- Keep colored status icons

**7. Auth Page Redesign** (`src/pages/Auth.tsx`)
- Light warm cream background, white card with plum-tinted shadow
- Warm off-white inputs with copper/orange focus rings
- Clean segmented tabs, SSO buttons with outline style
- Professional, light theme matching Neo-Tactile kit

**8. Audit all pages** for background consistency and visual coherence

### Technical Notes
- ~15 files modified, no database changes
- Existing layout structures preserved
- All pages will share unified button patterns and hero sizing

