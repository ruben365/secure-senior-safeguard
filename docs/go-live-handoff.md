# InVision Network — Go-Live Handoff Checklist

**Version:** 1.0 | **Date:** 2026-04-20 | **Contact:** hello@invisionnetwork.org | (937) 749-7579

---

## Pre-Launch: Complete Before DNS Cutover

### 1. All Pages Loading & Functional

- [ ] **Homepage** (`/`) — hero, sections, CTAs, phone bar visible and working
- [ ] **AI Services** (`/ai`) — all service cards, booking modal, phone links
- [ ] **Training** (`/training`) — workshop listings, booking, payment flow
- [ ] **About** (`/about`) — team, mission, story sections
- [ ] **Contact** (`/contact`) — contact form submits, confirmation email received
- [ ] **Pricing** (`/pricing`) — all plans visible, CTAs link correctly
- [ ] **Partners** (`/partners`) — logos and descriptions visible
- [ ] **Events** (`/events`) — event listings visible
- [ ] **Library** (`/library`) — book catalog visible
- [ ] **Resources** (`/resources`) — individual resource pages load
- [ ] **Articles** (`/articles`) — article list and individual articles
- [ ] **FAQ** (`/faq`) — accordion expands correctly
- [ ] **Security** (`/security`) — policies and certifications visible
- [ ] **Status** (`/status`) — real-time status board loads
- [ ] **404 Page** — custom 404 shows for `/nonexistent-page`

### 2. Forms & User Flows

- [ ] Contact form submits successfully → confirmation email arrives at test address
- [ ] Booking inquiry form works → admin notification email arrives at hello@invisionnetwork.org
- [ ] Newsletter signup works → confirmation email sent
- [ ] Workshop registration flow completes end-to-end
- [ ] Guest scanner (file upload) works without login
- [ ] Login/signup flow works (email + password)
- [ ] Password reset flow works end-to-end
- [ ] Mobile phone CTA bar opens dialer correctly

### 3. Payments (Stripe)

- [ ] Verify STRIPE_SECRET_KEY is set to **live** key (not test `sk_test_...`)
- [ ] Verify VITE_STRIPE_PUBLISHABLE_KEY is set to **live** key
- [ ] Run a $1.00 test payment with a real card — confirm charge appears in Stripe dashboard
- [ ] Confirm payment confirmation email is sent after successful payment (Resend)
- [ ] Test Stripe webhook delivery in Stripe dashboard > Developers > Webhooks
- [ ] Stripe webhook secret (STRIPE_WEBHOOK_SECRET) set in Supabase edge function secrets
- [ ] Refund a test payment to confirm refund flow works
- [ ] Verify Stripe Customer Portal works at `/customer-portal`

### 4. DNS & Domain

- [ ] Domain `invisionnetwork.org` points to Vercel deployment (A record or CNAME)
- [ ] `www.invisionnetwork.org` redirects → `https://www.invisionnetwork.org` (no trailing slash except `/`)
- [ ] `invisionnetwork.org` (apex) redirects → `https://www.invisionnetwork.org`
- [ ] Check DNS propagation: `nslookup invisionnetwork.org` shows Vercel IP
- [ ] Old/alternate domains redirect to canonical URL if applicable

### 5. SSL Certificate

- [ ] `https://www.invisionnetwork.org` shows valid SSL padlock
- [ ] SSL cert is issued for both `www` and apex domain
- [ ] SSL cert expiry > 60 days out (Vercel auto-renews, but verify)
- [ ] Mixed content warnings: none (all assets load over HTTPS)
- [ ] Test with: `curl -I https://www.invisionnetwork.org` — should return `200 OK`

### 6. Supabase Database Health

- [ ] Supabase project is on a paid plan (not paused after inactivity)
- [ ] Database connection string in Vercel environment variables is correct
- [ ] Run health check: visit `/status` — all services show green
- [ ] Supabase RLS (Row Level Security) enabled on all user-facing tables
- [ ] Supabase backups enabled (Project Settings > Database > Backups)
- [ ] Supabase service role key set in Vercel env vars (server-side only, not in VITE_ vars)
- [ ] Auth email templates customized in Supabase Auth > Email Templates
- [ ] Supabase auth redirect URLs include `https://www.invisionnetwork.org`

### 7. Resend Email Integration

- [ ] RESEND_API_KEY set in Supabase Edge Function secrets
- [ ] Sending domain `invisionnetwork.org` verified in Resend dashboard (DNS records added)
- [ ] SPF record set: `v=spf1 include:amazonses.com ~all` (or Resend's SPF)
- [ ] DKIM record set for `invisionnetwork.org` in DNS
- [ ] DMARC record set: `v=DMARC1; p=none; rua=mailto:hello@invisionnetwork.org`
- [ ] Test: send a contact form → email arrives in inbox (not spam)
- [ ] Test: book inquiry → confirmation email arrives in inbox
- [ ] Test: newsletter signup → welcome email arrives in inbox
- [ ] Unsubscribe link in marketing emails points to a working `/unsubscribe` page

### 8. Google Search Console

- [ ] Go to: https://search.google.com/search-console
- [ ] Add property: `https://www.invisionnetwork.org`
- [ ] Verify ownership via HTML file (already at `public/google7d90b5b18423192a.html`)
- [ ] Submit sitemap: https://www.invisionnetwork.org/sitemap.xml
- [ ] Confirm sitemap status shows "Success" (may take 24–48h)
- [ ] Check "URL Inspection" for homepage — request indexing
- [ ] Check "Coverage" report after 3–5 days for errors

### 9. Google Business Profile

- [ ] Go to: https://business.google.com
- [ ] Search for "InVision Network Kettering Ohio"
- [ ] Claim or create profile if not exists
- [ ] Business name: **InVision Network**
- [ ] Category: Cybersecurity Service, Computer Security Service
- [ ] Address: Kettering, OH 45429
- [ ] Phone: (937) 749-7579
- [ ] Website: https://www.invisionnetwork.org
- [ ] Hours: Mon–Fri 9am–6pm, Sat 10am–3pm
- [ ] Description: "Veteran-founded AI scam protection and cybersecurity training for families, seniors, and businesses in the Dayton, Ohio area."
- [ ] Upload logo and cover photo (InVision brand colors)
- [ ] Add services: Cybersecurity Training, AI Scam Protection, AI Receptionist, Business Automation
- [ ] Request Google verification (postcard or phone)

### 10. Social Media Profiles

- [ ] **Facebook**: @invisionnetwork — link to website, fill bio, profile + cover photo
- [ ] **LinkedIn**: linkedin.com/company/invisionnetwork — company page, about, services
- [ ] **Twitter/X**: @invisionnetwork — bio, pinned tweet with launch announcement
- [ ] **YouTube**: @invisionnetwork — channel art, about section, first video (workshop recording or intro)
- [ ] **Instagram**: @invisionnetwork — bio with link-in-bio to invisionnetwork.org
- [ ] **Nextdoor**: Claim business presence for Kettering/Dayton area
- [ ] **Yelp**: Create/claim business profile for local search
- [ ] **BBB (Better Business Bureau)**: Register at bbb.org for trust signal

### 11. Analytics (PostHog)

- [ ] PostHog is capturing events on production domain
- [ ] Verify: visit the site in incognito → session appears in PostHog dashboard
- [ ] Key events firing: `page_view`, `cta_click`, `form_submit`, `booking_started`
- [ ] Funnel set up: Landing → Contact → Booking → Payment
- [ ] Dashboards configured for: daily active users, top pages, conversion rate

### 12. Core Web Vitals Targets

| Metric | Target | Check with |
|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | PageSpeed Insights |
| FID / INP (Interaction to Next Paint) | < 200ms | PageSpeed Insights |
| CLS (Cumulative Layout Shift) | < 0.1 | PageSpeed Insights |
| Mobile Performance Score | > 80 | PageSpeed Insights |
| Desktop Performance Score | > 90 | PageSpeed Insights |

- [ ] Run: https://pagespeed.web.dev/analysis?url=https://www.invisionnetwork.org
- [ ] Run: https://pagespeed.web.dev/analysis?url=https://www.invisionnetwork.org/training

### 13. Security Final Pass

- [ ] No `.env` files committed to git (`git log --all -- .env` should return nothing)
- [ ] No API keys hardcoded in source (`grep -r "sk_live\|re_" src/` returns nothing)
- [ ] CORS headers set correctly in Supabase edge functions (`Access-Control-Allow-Origin: https://www.invisionnetwork.org` for sensitive functions)
- [ ] Admin routes (`/admin/*`) require authentication (test by visiting without login)
- [ ] Rate limiting active on all public edge functions
- [ ] Supabase RLS blocks unauthenticated access to sensitive tables
- [ ] `Content-Security-Policy` header set in `vercel.json`
- [ ] `X-Frame-Options: DENY` set in `vercel.json`
- [ ] Stripe webhook signature verification enabled in payment edge functions

### 14. Mobile Testing

- [ ] Test on iPhone Safari (iOS 16+)
- [ ] Test on Android Chrome
- [ ] Mobile CTA bar shows and links to dialer
- [ ] Contact form works on mobile
- [ ] Payment form works on mobile
- [ ] Text is readable without zooming
- [ ] No horizontal scroll on any page

---

## Go-Live Sequence (Day of Launch)

1. **T-2h**: Final staging review — all forms, all pages, all payments
2. **T-1h**: Notify team on Slack/email — "going live at [time]"
3. **T-0**: Update DNS to point to production Vercel
4. **T+15m**: Verify HTTPS resolves correctly for both www and apex
5. **T+30m**: Submit sitemap to Google Search Console
6. **T+1h**: Post launch announcement on all social channels
7. **T+2h**: Send launch email to existing contacts list
8. **T+24h**: Check Search Console for crawl errors
9. **T+48h**: Check Stripe dashboard for any payment issues

---

## Emergency Contacts

| Role | Name | Contact |
|---|---|---|
| InVision Network | Team | hello@invisionnetwork.org |
| Phone/Emergency | Team | (937) 749-7579 |
| Security Incident | Security Team | security@invisionnetwork.org |
| Supabase Support | — | support@supabase.io |
| Vercel Support | — | vercel.com/help |
| Stripe Support | — | support.stripe.com |
| Resend Support | — | resend.com/support |

---

## Rollback Procedure

If a critical bug is discovered post-launch:

1. **Vercel Rollback** (< 2 minutes): In Vercel dashboard → Deployments → select last good deployment → "Redeploy"
2. **Database Rollback**: If schema changes broke things, restore from Supabase backup
3. **DNS Rollback**: If DNS cutover caused issues, revert DNS to old hosting temporarily
4. **Communicate**: Post to status page (`/status`) and notify users via email
5. **Debug**: Use Vercel function logs + Supabase logs + PostHog error tracking to identify root cause
6. **Fix-Forward**: Commit fix to feature branch → test → merge → auto-deploy

---

*This checklist is maintained by InVision Network. Last updated: 2026-04-20.*
