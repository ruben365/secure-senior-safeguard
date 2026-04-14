# InVision Network — Comprehensive Backend & Dashboard Diagnostic Report

**Date:** April 14, 2026  
**Auditor:** Claude Code (claude-sonnet-4-6)  
**Branch:** claude/unruffled-payne  
**Scope:** Supabase database schema, edge functions, auth flow, admin dashboard, portal, payments, AI chat, state management, security posture

---

## SECTION 1 — DATABASE SCHEMA SUMMARY

### 1.1 Migration Coverage

89 migration files span Oct 2025 – Apr 2026. The last 3 files are targeted security-hardening runs from the same sprint as this audit.

### 1.2 All Tables (80 total)

| Table | RLS | created_at | updated_at | Notes |
|---|---|---|---|---|
| access_ids | YES | YES | NO | Book access tokens |
| admin_audit_logs | YES | YES | NO | — |
| admin_events | YES | YES | YES | — |
| admin_tasks | YES | YES | YES | — |
| analyst_profiles | YES | YES | YES | — |
| analytics_events | YES | YES | NO | — |
| announcements | YES | YES | NO | — |
| articles | YES | YES | YES | — |
| auth_audit_logs | YES | YES | NO | — |
| book_content | YES | YES | YES | — |
| book_purchases | YES | YES | NO | — |
| book_requests | YES | YES | YES | — |
| books | YES | YES | NO | — |
| booking_requests | YES | YES | NO | — |
| campaign_recipients | YES | YES | NO | — |
| caregiver_profiles | YES | YES | YES | — |
| client_messages | YES | YES | NO | — |
| client_notes | YES | YES | YES | — |
| conversion_events | YES | YES | NO | — |
| course_lessons | YES | YES | NO | RLS added Apr 2026 |
| course_modules | YES | YES | NO | RLS added Apr 2026 |
| courses | YES | YES | YES | RLS added Apr 2026 |
| dashboard_health | YES | YES | NO | — |
| developer_profiles | YES | YES | YES | — |
| email_campaigns | YES | YES | YES | — |
| email_delivery_logs | YES | YES | NO | — |
| email_templates | YES | YES | YES | — |
| enquiries | YES | YES | NO | RLS added Apr 2026 |
| enrollments | YES | YES | NO | — |
| faqs | YES | YES | NO | — |
| funnel_steps | YES | YES | NO | — |
| gifts | YES | YES | NO | — |
| graphic_design_categories | YES | YES | NO | — |
| graphic_design_project_tags | YES | NO | NO | — |
| graphic_design_projects | YES | YES | YES | — |
| graphic_design_tags | YES | YES | NO | — |
| guest_scans | YES | NO | NO | No created_at; payment + scan state |
| guestbook | YES | YES | NO | — |
| healthcare_professional_profiles | YES | YES | YES | — |
| knowledge_base_articles | YES | YES | YES | — |
| newsletter_subscribers | YES | YES | NO | — |
| page_views | YES | YES | NO | — |
| password_reset_tokens | YES | YES | NO | — |
| photos | YES | YES | NO | — |
| portfolio_case_study_sections | YES | YES | NO | — |
| portfolio_categories | YES | YES | NO | — |
| portfolio_gallery | YES | YES | NO | — |
| portfolio_project_tags | YES | NO | NO | — |
| portfolio_projects | YES | YES | YES | — |
| portfolio_style_dictionary | YES | YES | YES | — |
| portfolio_tags | YES | YES | NO | — |
| product_reviews | YES | YES | YES | — |
| profile_security_audit | YES | YES | NO | — |
| profiles | UNKNOWN* | YES | YES | **CRITICAL** — see note below |
| purchase_requests | YES | YES | YES | — |
| purchases | YES | YES | NO | — |
| quotes | YES | YES | NO | RLS added Apr 2026 |
| referral_codes | YES | YES | NO | RLS added Apr 2026 |
| referral_tracking | YES | YES | NO | RLS added Apr 2026 |
| rsvps | YES | YES | NO | — |
| scam_statistics | YES | YES | NO | — |
| scam_submissions | YES | YES | YES | — |
| scan_access_accounts | YES | YES | YES | — |
| scan_access_usage_events | YES | YES | NO | — |
| scheduled_emails | YES | YES | NO | — |
| senior_client_profiles | YES | YES | YES | — |
| site_images | YES | YES | NO | — |
| site_settings | YES | YES | NO | — |
| story_events | YES | YES | NO | — |
| support_tickets | YES | YES | YES | — |
| system_heartbeats | YES | YES | NO | — |
| tasks | YES | YES | YES | — |
| testimonial_media | YES | YES | NO | — |
| testimonials | YES | YES | YES | — |
| threat_events | YES | YES | NO | — |
| ticket_replies | YES | YES | NO | — |
| traffic_sources | YES | YES | NO | — |
| trainer_profiles | YES | YES | YES | — |
| update_logs | YES | YES | NO | — |
| user_2fa_settings | YES | YES | NO | — |
| user_alert_preferences | YES | YES | NO | — |
| user_devices | YES | YES | NO | — |
| user_roles | YES | YES | NO | — |
| user_sessions | YES | YES | NO | — |
| venue_hotels | YES | YES | NO | — |
| venue_schedule | YES | YES | NO | — |
| venue_transport | YES | YES | NO | — |
| verification_codes | YES | YES | NO | — |

**(\*) profiles — CRITICAL:** RLS policies exist (INSERT/SELECT/UPDATE per user, admin override) but no `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY` statement appears in any of the 89 migration files. In PostgreSQL, row security policies are dormant until RLS is enabled at the table level. If not enabled, any Supabase anon or authenticated client can read, write, or delete any user record. This table stores: name, email, phone, date of birth, full postal address, and veteran identification.

### 1.3 Tables Queried in Frontend But Not Confirmed in Migrations

`appointments`, `clients`, `contacts`, `digital-products`, `donations_summary`, `internal_messages`, `inventory_movements`, `invoices`, `notifications`, `order_items`, `partners`, `partner_commissions`, `partner_orders`, `products`, `service_inquiries`, `subscriptions`, `time_off_requests`, `zoom_classes`

### 1.4 app_role Enum Values

`admin`, `secretary`, `training_coordinator`, `business_consultant`, `support_specialist`, `staff`, `moderator`, `user`

### 1.5 Confirmed Performance Indexes

`testimonials(status)`, `booking_requests(status)`, `website_inquiries(status)`, `articles(status, created_at DESC)`, `analytics_events(created_at, event_name, session_id)`, `scan_access_accounts(user_id, access_status)`, `scan_access_usage_events(user_id, created_at)`, `guest_scans(user_id)`

---

## SECTION 2 — EDGE FUNCTION HEALTH

35 of 48 functions have `verify_jwt = false`. `get-stripe-key`, `prepare-authenticated-scan`, and `get-scan-access` are absent from config.toml and inherit the Supabase default `verify_jwt = true`.

| Function | Status | Notes |
|---|---|---|
| ai-chat | PASS | Rate limit 10/min per IP, message caps, role allow-list, API key from env |
| analyze-file | PASS | Auth via getAuthenticatedScanUser(), file type/size validated server-side |
| analyze-scam | WARN | verify_jwt=false, no rate limit confirmed |
| complete-payment | PASS | Rate limit 10/min, amount from Stripe not client, HTML-escaped emails |
| create-payment-intent | PASS | Rate limit 15/min, price.unit_amount from Stripe API (authoritative) |
| create-cart-checkout | WARN | verify_jwt=false — server-side amount validation unconfirmed |
| create-cart-payment-intent | WARN | verify_jwt=false — server-side amount validation unconfirmed |
| create-product-payment | WARN | verify_jwt=false |
| create-subscription-checkout | WARN | verify_jwt=false |
| create-training-payment | WARN | verify_jwt=false |
| customer-portal | PASS | verify_jwt=true |
| generate-book-access | WARN | verify_jwt=false — token generation without JWT |
| get-scan-access | PASS | Not in config.toml (inherits verify_jwt=true); auth enforced in code |
| get-stripe-key | WARN | No auth check, no rate limit; pk_ key is public by design |
| guest-scan-payment | PASS | Rate limit 10/10min, $1.00 hardcoded server-side, file type/size validated |
| heartbeat | WARN | verify_jwt=false |
| heartbeat-watchdog | WARN | verify_jwt=false |
| newsletter-signup | PASS | Rate limit 10/min, email validated, CORS on all responses |
| prepare-authenticated-scan | PASS | Not in config.toml (verify_jwt=true); auth + access gating confirmed |
| process-donation | PASS | Rate limit 10/min, amount server-capped $1–$10k, origin allow-list |
| process-email-webhooks | PASS | HMAC signature via Svix, fail-closed on missing secret |
| send-contact-email | PASS | Rate limit 10/min, HTML-escaped body, hardcoded sender address |
| track-analytics-event | PASS | Rate limit 500/hr, userId from JWT not client body, event name regex |
| validate-book-access | WARN | verify_jwt=false |

**Critical gap:** No Stripe webhook handler exists. Payment fulfillment is client-triggered only via the post-redirect callback.

---

## SECTION 3 — AUTHENTICATION FLOW

**Provider:** Supabase Auth with managed sessions

**MFA:** Supabase TOTP checked on SIGNED_IN. If current=aal1 and next=aal2, TwoFactorVerify is shown before post-login redirect.

**Password policy:** min 8 chars, uppercase, lowercase, digit, special character (Zod schema)

**OAuth redirect:** Hard-pinned to canonical production URL; localhost only for dev

**Phase 13 hardening:**
- Expired JWT guard on every auth state change
- Inactivity timeout: 30 min in AuthContext, 15 min in AdminShell (independent timers)
- Redirect param validated: must begin with `/` and not `//`

**Gaps:**
- `ProtectedRoute` checks `user !== null` only — role is not checked
- `AdminShell` checks `!roleConfig` — any role row passes, not just admin-eligible roles
- Cart NOT cleared on sign-out

---

## SECTION 4 — ADMIN DASHBOARD

AdminShell wraps all `/admin` routes. Unauthenticated → `/auth`. No role row → Access Denied card.

**Page patterns (representative):** Loading states, error toasts, empty state messaging are consistent. Delete confirmation is inconsistent — some pages use AlertDialog, others delete immediately. No per-page secondary role validation.

**Role escalation risk:** `/admin/team` allows assigning any role with no confirmation dialog or rate limit.

---

## SECTION 5 — CLIENT PORTAL

- Entry calls `supabase.auth.getUser()` — unauthenticated redirected to `/auth`
- All reviewed queries include `.eq("user_id", user.id)` plus RLS enforcement (double protection)
- Confirmed double protection on: client_messages, client_notes, senior_client_profiles, enrollments, user_devices, user_alert_preferences, scan_access_accounts, support_tickets

---

## SECTION 6 — PAYMENT SYSTEM

**Key management:**
- Publishable key: from `VITE_STRIPE_PUBLISHABLE_KEY` env var or `get-stripe-key` function. Public by design.
- Secret key: `Deno.env` only. Never in client code. No hardcoded keys found anywhere.

**Amount validation — PASS:** `create-payment-intent` retrieves `price.unit_amount` from Stripe (authoritative). Client cannot manipulate charge amount. `complete-payment` uses Stripe PI metadata from creation time.

**Critical gap — No Stripe Webhook:**
1. Silent fulfillment failure if user closes browser before redirect
2. No dispute/failure event processing
3. No subscription lifecycle handling

**Guest scan:** $1.00 hardcoded server-side. Rate limited 10 per 10 minutes per IP.

---

## SECTION 7 — LAURA AI CHAT

- Gateway: `https://ai.gateway.lovable.dev/v1/chat/completions`
- Model: `google/gemini-2.5-flash`
- `LOVABLE_API_KEY`: Deno env only — never in client code
- Public endpoint (no auth required for chat widget)
- Scan access gating: authenticated scans require active subscription or account balance; guest scans require $1 payment
- Rate limiting: 10 req/min per IP (in-memory); 30 msg max, 4000 chars/msg, 30k chars total
- Limitation: in-memory rate limit is per-Deno-isolate — multiplies under load

---

## SECTION 8 — STATE MANAGEMENT

| Context | Purpose | Notes |
|---|---|---|
| AuthContext | Session, role, inactivity | Phase 13 hardening; cart not cleared on logout |
| CartContext | Shopping cart | localStorage-backed; NOT cleared on sign-out |
| CartFeedbackContext | Toast feedback | Minimal |
| CheckoutContext | Checkout modal | useState |
| SubscriptionContext | Subscription status | Supabase query on mount |
| AIChatContext | Chat widget state | useState |
| ThemeContext | Dark/light theme | localStorage |
| PrerenderContext | Prerender.io detection | UA sniff |

**Cart privacy gap:** Cart only cleared after successful payment, never on sign-out. On shared devices, the next user sees the prior user's cart.

**Race conditions:** None found. `fetchUserRole` deferred via `setTimeout`. `initialized` flag prevents premature rendering.

---

## SECTION 9 — SECURITY FINDINGS SUMMARY

| # | Finding | Severity |
|---|---|---|
| S-1 | profiles table RLS enablement not confirmed in migrations | CRITICAL |
| S-2 | user_roles INSERT policy permits self-escalation to any role | HIGH |
| S-3 | No Stripe webhook — fulfillment client-triggered only | HIGH |
| S-4 | Analytics tables lack INSERT-blocking RLS for anon/authenticated | HIGH |
| S-5 | In-memory rate limits not persistent across Deno isolates | MEDIUM |
| S-6 | Cart not cleared on logout — shared-device privacy risk | MEDIUM |
| S-7 | ProtectedRoute does not enforce role | MEDIUM |
| S-8 | DOMPurify href missing explicit URI scheme allow-list | MEDIUM |
| S-9 | generate-book-access and validate-book-access lack JWT enforcement | LOW |
| S-10 | AdminShell role check too permissive — any role passes | LOW |
| S-11 | get-stripe-key has no rate limit | LOW |
| S-12 | No hardcoded live API keys found — CLEAN | N/A |
| S-13 | No dynamic code execution in any src file — CLEAN | N/A |
| S-14 | Console.log in production: 1 placeholder string only — CLEAN | N/A |

HTML rendered with `React.createElement` using the inner-HTML prop (BookReader, BookDetail, ArticlePreview, HelpCenter) is wrapped in `DOMPurify.sanitize()` — XSS mitigated. The chart component uses it for static CSS theme data only.

DOMPurify allows the `href` attribute without an explicit URI scheme restriction. The `javascript:` scheme is stripped by default but an explicit `ALLOWED_URI_REGEXP` provides defense-in-depth.

---

## SECTION 10 — TOP 10 BACKEND ISSUES BY SEVERITY

### Issue 1 — profiles Table May Lack RLS Enforcement (CRITICAL)

**Severity:** CRITICAL  
**Description:** No `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY` appears in any of the 89 migration files. In PostgreSQL, row-level security policies are dormant until the table-level flag is enabled. If it is off, all policies on profiles are no-ops and any Supabase client can read, write, or delete every user record — including name, email, phone, DOB, full postal address, and veteran ID.  
**Fix:** Add migration: `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;` and verify in the Supabase dashboard that the profiles table shows RLS as enabled.

---

### Issue 2 — user_roles INSERT Policy Permits Admin Self-Assignment (HIGH)

**Severity:** HIGH  
**Description:** The "Users can insert own role once" policy does not restrict which role value is inserted. A direct Supabase JS client call submitting `{user_id: uuid, role: 'admin'}` on a fresh account (no existing role row) grants full admin access.  
**Fix:** Add to the WITH CHECK clause: `AND role = 'user'`. Alternatively, remove the self-insert policy entirely and assign roles via a service-role edge function called during signup.

---

### Issue 3 — No Stripe Webhook Handler (HIGH)

**Severity:** HIGH  
**Description:** No `stripe-webhook` edge function exists. Payment fulfillment is triggered by `complete-payment` called client-side after the Stripe redirect. If the user closes their browser, payment succeeds in Stripe but access is never granted. Subscription lifecycle events (cancellations, failures, disputes) are never processed.  
**Fix:** Build a `stripe-webhook` edge function with HMAC signature verification via `stripe.webhooks.constructEvent`. Handle: `payment_intent.succeeded`, `checkout.session.completed`, `customer.subscription.deleted`, `invoice.payment_failed`, `charge.dispute.created`.

---

### Issue 4 — Analytics Tables Allow Direct INSERT Bypass (HIGH)

**Severity:** HIGH  
**Description:** Six analytics tables (`analytics_events`, `page_views`, `user_sessions`, `conversion_events`, `traffic_sources`, `funnel_steps`) have RLS enabled but only SELECT-blocking policies for non-staff. No INSERT-blocking policy exists for `anon` or `authenticated` roles. The public anon key is embedded in the frontend bundle. Any caller can insert arbitrary rows, poisoning dashboards and bypassing the edge function's rate limits and validation.  
**Fix:** Add RESTRICTIVE INSERT policies: `CREATE POLICY "block_direct_insert" ON analytics_events AS RESTRICTIVE FOR INSERT TO anon, authenticated USING (false);` — repeat for all six tables.

---

### Issue 5 — In-Memory Rate Limits Not Persistent Across Instances (MEDIUM)

**Severity:** MEDIUM  
**Description:** All 35+ rate limit implementations use per-isolate in-memory Maps. Supabase runs multiple Deno isolates concurrently under load. Effective rate = N_instances × configured_limit. Affects payment, contact email, newsletter, analytics, and AI chat endpoints.  
**Fix:** Replace with Upstash Redis (natively supported by Supabase Edge Functions) or a PostgreSQL atomic counter table.

---

### Issue 6 — Cart Not Cleared on Logout (MEDIUM)

**Severity:** MEDIUM  
**Description:** Cart items persist in localStorage after `signOut()`. On a shared or kiosk device, the next user sees the prior user's cart including product names and prices. This is a meaningful privacy risk for the senior demographic who often use shared computers.  
**Fix:** In `AuthContext.signOut()`, add `localStorage.removeItem('cart')` before returning.

---

### Issue 7 — ProtectedRoute Does Not Check Role (MEDIUM)

**Severity:** MEDIUM  
**Description:** `ProtectedRoute` checks `user !== null` only. Any authenticated account regardless of role passes. If any portal sub-route is accidentally wrapped in ProtectedRoute without going through AdminShell, role enforcement is absent.  
**Fix:** Add an optional `requiredRole` prop. Document clearly that ProtectedRoute is auth-only and all role checks must live in AdminShell or individual page guards.

---

### Issue 8 — DOMPurify href Without URI Scheme Restriction (MEDIUM)

**Severity:** MEDIUM  
**Description:** The `sanitizeHtml` utility (`src/utils/sanitize.ts`) allows the `href` attribute without an explicit `ALLOWED_URI_REGEXP`. Default DOMPurify behavior strips unsafe URI schemes but an explicit allow-list provides defense-in-depth against future library bypasses in the book reader and article preview pages.  
**Fix:** Add to DOMPurify options: `ALLOWED_URI_REGEXP: /^(?:https?|mailto|tel|callto):/i`

---

### Issue 9 — generate-book-access and validate-book-access Lack JWT (LOW)

**Severity:** LOW  
**Description:** Both functions have `verify_jwt = false`. Book access token generation is not JWT-gated at the gateway level. Internal validation logic may compensate but has not been confirmed in this audit.  
**Fix:** Audit both functions for payment-event binding. If confirmed safe, document the decision. Otherwise add `verify_jwt = true`.

---

### Issue 10 — AdminShell Role Check Too Permissive (LOW)

**Severity:** LOW  
**Description:** AdminShell gate is `if (!roleConfig)` — any role row passes. Destructive admin operations (role management, bulk communications, user deletion) are accessible to any role holder who navigates to the correct URL.  
**Fix:** Define `ADMIN_SHELL_ROLES` explicitly and check `ADMIN_SHELL_ROLES.includes(roleConfig.role)`. Add per-operation guards for destructive actions.

---

## SECTION 11 — OVERALL HEALTH SCORE

| Domain | Score | Notes |
|---|---|---|
| Database Schema | 7/10 | Strong RLS post-hardening; profiles table RLS unknown |
| Edge Functions | 7/10 | Good validation; no Stripe webhook; rate limits non-persistent |
| Auth Flow | 8/10 | Phase 13 hardening solid; self-escalation gap in user_roles |
| Admin Dashboard | 7/10 | Gating works; role escalation unguarded; delete confirm inconsistent |
| Client Portal | 8/10 | Double protection on all reviewed tables |
| Payment System | 6/10 | Amount validation correct server-side; no webhook is a reliability gap |
| AI Chat | 8/10 | Rate limiting, input validation, key management appropriate |
| State Management | 7/10 | Solid; cart-on-logout privacy gap |
| Security | 6/10 | No hardcoded keys; HTML injection mitigated; analytics bypass and profiles RLS gap |

**Overall Backend Health Score: 7.1 / 10**

The codebase reflects deliberate, phased security hardening across multiple sprints. The most impactful improvements are: (1) confirming and enabling RLS on the profiles table, (2) restricting the user_roles self-insert policy to role='user', (3) building a Stripe webhook handler, (4) adding INSERT-blocking policies on the six analytics tables. Addressing these four issues would raise the score to approximately 8.5/10.

---

*Report generated April 14, 2026 by Claude Code (claude-sonnet-4-6)*  
*Source branch: claude/unruffled-payne*