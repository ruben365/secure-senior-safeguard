

## Plan: Update Domain & Meta Information Across the Website

### What Needs to Change

The custom domain `corineruben.com` (and `www.corineruben.com`) is now live. Several files still reference the old Lovable staging URL or have outdated date/description metadata that needs correcting.

### Changes

**1. Edge Function — Gift Payment (`supabase/functions/create-gift-payment/index.ts`)**
- Replace `https://smart-union-hub.lovable.app` fallback origin with `https://corineruben.com`

**2. HTML Meta & SEO (`index.html`)**
- Update all `meta description`, `og:description`, and `twitter:description` from "August 15, 2027" to "March 16, 2026" (the court wedding date — current active event)
- Update JSON-LD structured data: `startDate` → `2026-03-16T14:00:00`, `endDate` → `2026-03-16T22:00:00`
- Update description text to reflect the court wedding event
- Canonical and og:url already point to `corineruben.com` — no change needed there

**3. Sitemap (`public/sitemap.xml`)**
- Add missing pages: `/gallery`, `/guestbook`, `/venue`, `/faq`, `/enquiries` (currently only has `/`, `/story`, `/rsvp`, `/registry`)

**4. Robots.txt (`public/robots.txt`)**
- Already correct — no changes needed

### Files to Edit
1. `supabase/functions/create-gift-payment/index.ts` — Fix origin URL
2. `index.html` — Update meta descriptions and JSON-LD dates
3. `public/sitemap.xml` — Add missing page URLs

