

## Plan: Event Visibility Toggle System with Court Wedding Details

### What You Need

1. **A toggle system in the dashboard** to control which event is currently visible on the landing page: either the upcoming **Court Wedding (March 16, 2026)** or the future **Church Wedding (October 16, 2026)**
2. **Court wedding details** displayed with the correct address and after-party info
3. **A "Big Church Wedding Coming Soon" teaser** shown when the court wedding is active

### How It Works

**Dashboard — SettingsManager** (`src/components/dashboard/SettingsManager.tsx`):
- Add a new section "Event Visibility" with a toggle switch: **Court Wedding** vs **Church Wedding**
- Saves a `site_settings` key called `active_event` with value `court` or `church`
- When `court` is active, show editable fields for:
  - Court wedding date/time (pre-filled: `2026-03-16T14:00:00`)
  - Court wedding venue: "301 Sycamore St, Brookville — Mayor Letner"
  - After-event venue: "10209 Gully Pass Dr, Dayton, OH 45458"
- These are stored as `court_wedding_date`, `court_wedding_venue`, `court_wedding_after_venue` in `site_settings`

**Landing Page** (`src/pages/Index.tsx`):
- Read `active_event` from settings
- When `active_event === 'court'`:
  - Hero date shows "March 16, 2026" instead of "October 16, 2026"
  - Countdown timer counts down to the court wedding date
  - Wedding Details section shows court wedding ceremony card (301 Sycamore St, 2:00 PM, Mayor Letner) and after-event snack card (10209 Gully Pass Dr, Dayton)
  - Hide ceremony/reception/accommodation/transport cards that reference the church wedding
  - Add a prominent "Coming Soon" teaser banner: "The Big Church Wedding & Celebration is Coming Soon — Stay Tuned!"
- When `active_event === 'church'` (or not set):
  - Everything displays as it does now (October 16, 2026 details)

**Language Context** (`src/contexts/LanguageContext.tsx`):
- Add translation keys for court wedding details and the "coming soon" teaser in EN/FR/ES

### Files to Edit
1. `src/components/dashboard/SettingsManager.tsx` — Add event toggle switch + court wedding fields
2. `src/pages/Index.tsx` — Conditionally show court vs church event, add "Coming Soon" teaser
3. `src/contexts/LanguageContext.tsx` — Add court wedding and "coming soon" translation keys

### No Database Changes Needed
All data uses the existing `site_settings` key-value table.

