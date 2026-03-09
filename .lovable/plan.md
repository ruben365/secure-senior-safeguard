

## Plan: Full Event Toggle System — Court Wedding Mode Across All Pages

### Overview
Extend the existing `active_event` toggle (already in the dashboard Settings tab) so that **all pages** — not just the landing page — adapt to the current event mode. The RSVP page, Venue page, and dashboard overview will all reflect the court wedding details when in court mode. All data (RSVPs, gifts, subscribers) continues to be stored in the same tables regardless of mode.

### What Changes

**1. RSVP Page (`src/pages/RSVP.tsx`)**
- Read `active_event` from `useSiteSettings()`
- When `isCourtMode`:
  - Replace the venue section (ceremony/reception cards) with court wedding venue card (301 Sycamore St, 2:00 PM) and after-event snack card (10209 Gully Pass Dr, Dayton)
  - Hide the church-specific schedule, transport, hotels, and map sections
  - Skip the meal selection step and table selection step (these are church wedding features) — the RSVP flow goes: Info → Gift → Done (just name, email, attending, companions, gift)
  - Add a "Church Wedding Coming Soon" note at the bottom of the RSVP confirmation
- All RSVP data saves to the same `rsvps` table — no separate tables needed

**2. Venue Page (`src/pages/Venue.tsx`)**
- Read `active_event` from `useSiteSettings()`
- When `isCourtMode`:
  - Show court ceremony venue and after-event venue instead of ceremony/reception cards
  - Hide schedule, transport, hotels, and map embed (these are for the church wedding)
  - Add a "Big Church Wedding Coming Soon" teaser at the bottom

**3. Dashboard Overview (`src/pages/Dashboard.tsx`)**
- Add a visible event mode indicator at the top of the dashboard (e.g., a banner showing "Currently showing: Court Wedding — March 16, 2026" or "Church Wedding — October 16, 2026")
- This is just a visual indicator — the actual toggle remains in the Settings tab

**4. Translations (`src/contexts/LanguageContext.tsx`)**
- Add court-specific RSVP keys (e.g., `rsvp.court.venue.title`, `rsvp.court.after.title`)
- Add court venue page keys

### What Stays the Same
- Gift/Registry — unchanged, same flow for both events
- Guestbook, Gallery, FAQ, Story, Enquiries — unchanged
- All data stored in the same tables (RSVPs, gifts, subscribers, newsletter) regardless of event mode
- Email notifications continue to work the same way
- Dashboard data views (guests, gifts, tables, etc.) show all data from both events

### Files to Edit
1. `src/pages/RSVP.tsx` — Conditionally simplify flow for court mode, swap venue details
2. `src/pages/Venue.tsx` — Conditionally show court venue details
3. `src/pages/Dashboard.tsx` — Add event mode indicator banner
4. `src/contexts/LanguageContext.tsx` — Add court-specific translation keys

### No Database Changes Needed
All data uses existing tables. The `site_settings` key `active_event` already exists.

