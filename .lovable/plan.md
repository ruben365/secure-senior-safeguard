

## Plan: Mobile UX/UI Enhancement — Full Site Polish

### Problems Identified

From the mobile screenshots and code review:

1. **Navigation mobile menu** — Opens as a transparent overlay that bleeds into page content behind it (no solid background, no z-index isolation). Links overlap with the page content.
2. **Hero section** — Names "Corine" and "Ruben" at `text-5xl` (3rem) are oversized on small screens. The heart icon container (w-16 h-16) and floating cards (w-52) take too much space on 390px screens.
3. **Floating cards in hero** — The 3-column grid stacks vertically on mobile but the cards are still large (w-52, p-5/p-6) creating excessive scrolling.
4. **Section headings** — Many headings use `text-3xl`/`text-4xl` on mobile (no responsive step-down), making them feel oversized.
5. **Form inputs** — RSVP forms, Guestbook forms, and Enquiry forms have large padding and tall inputs (h-14) that feel bulky on mobile.
6. **Detail cards** — The wedding detail cards and venue cards use generous padding (p-7) on mobile, making everything feel "blown up."
7. **Footer** — Large text and spacing on mobile.
8. **Countdown card** — Takes significant vertical space on mobile with large numbers.

### Changes

**1. Navigation (`src/components/Navigation.tsx`)**
- Give the mobile menu dropdown a solid opaque background with proper backdrop-blur and higher z-index
- Reduce mobile link padding from `py-3 px-4` to `py-2.5 px-3`
- Use smaller text for mobile links (`text-sm` to `text-[13px]`)

**2. Homepage (`src/pages/Index.tsx`)**
- Scale down hero names from `text-5xl` to `text-4xl` on mobile
- Reduce heart icon from `w-16 h-16` to `w-12 h-12` on mobile
- Shrink floating cards: reduce width from `w-52` to `w-44`, reduce padding
- Reduce countdown card padding and number size on mobile
- Scale section headings: use `text-2xl` base instead of `text-3xl`/`text-4xl` on mobile
- Tighten section vertical padding from `py-8` to `py-6` on mobile
- Make detail cards padding `p-4` on mobile instead of `p-6`/`p-7`
- Reduce icon circle sizes from `w-16 h-16` to `w-12 h-12` on mobile
- Compact the CTA section for mobile

**3. RSVP Page (`src/pages/RSVP.tsx`)**
- Reduce title from `text-4xl` to `text-3xl` on mobile
- Shrink form input heights from `h-14` to `h-11` on mobile
- Tighten card padding from `p-7` to `p-5` on mobile
- Scale down icon containers
- Reduce ring images size on mobile

**4. Guestbook (`src/pages/Guestbook.tsx`)**
- Tighten form spacing and card padding for mobile

**5. Enquiries (`src/pages/Enquiries.tsx`)**
- Reduce title and form spacing for mobile

**6. Global Styles (`src/index.css`)**
- Add mobile-specific overrides for `.btn-primary`, `.btn-outline` (slightly smaller padding/font on small screens)
- Reduce `.glass-card-strong` padding defaults on mobile via media query

**7. Footer (`src/components/Footer.tsx`)**
- Tighten mobile spacing

### Files to Edit
1. `src/components/Navigation.tsx` — Fix mobile menu background, reduce link sizes
2. `src/pages/Index.tsx` — Scale down hero, cards, headings, sections for mobile
3. `src/pages/RSVP.tsx` — Compact forms and cards for mobile
4. `src/pages/Guestbook.tsx` — Tighten mobile form spacing
5. `src/pages/Enquiries.tsx` — Tighten mobile layout
6. `src/index.css` — Mobile button and card size overrides
7. `src/components/Footer.tsx` — Mobile spacing reduction

