

## Make All Frontend Content Admin-Controllable

### Current State
The dashboard already controls: RSVPs, gifts, announcements, quotes, enquiries, story events, site images, email blasts, subscribers, seating, and QR sharing. That's solid coverage.

### What's Missing

**1. Guestbook Moderation (no dashboard UI)**
Guestbook entries require `approved = true` to display, but there's no UI in the dashboard to approve/reject them. Guests submit and entries stay invisible.

**2. Gallery Photo Moderation (no dashboard UI)**  
Same issue -- uploaded photos need `approved = true` but no dashboard panel to approve/reject/delete them.

**3. FAQ Management (fully hardcoded)**
All 10 FAQ items are hardcoded in `FAQ.tsx` with multilingual text. Admin can't add, edit, or remove questions.

**4. Venue Details (fully hardcoded)**
Addresses, Google Maps URLs, schedule (8 events with times), hotels (4 entries), and transport directions are all hardcoded constants in `Venue.tsx`.

**5. Wedding Settings (hardcoded)**
Couple names ("Corine" / "Ruben"), wedding date (`2027-08-15T14:00:00`), and Bible verse are hardcoded in `Index.tsx`.

### Plan

#### Phase 1: Dashboard Moderation Panels (no DB changes needed)

**Add "Guestbook" tab to Dashboard** -- List all entries (approved + pending), toggle approval, delete. Uses existing `guestbook` table.

**Add "Photos" tab to Dashboard** -- Grid of uploaded photos with approve/reject/delete. Uses existing `photos` table.

#### Phase 2: FAQ Management (new table + dashboard tab + page update)

**Create `faqs` table** with columns: `id`, `question`, `question_fr`, `question_es`, `answer`, `answer_fr`, `answer_es`, `sort_order`, `created_at`. Public SELECT, authenticated INSERT/UPDATE/DELETE.

**Seed with existing 10 FAQ items** via insert.

**Add "FAQ" tab to Dashboard** -- CRUD form with multilingual fields, drag-to-reorder.

**Update `FAQ.tsx`** to fetch from `faqs` table instead of hardcoded array.

#### Phase 3: Venue Management (new table + dashboard tab + page update)

**Create `venue_settings` table** (key-value style) with: `id`, `key` (unique text), `value` (jsonb), `updated_at`. Keys like `ceremony_address`, `reception_address`, `ceremony_maps_url`, `reception_maps_url`, `ceremony_time`, `reception_time`.

**Create `venue_schedule` table**: `id`, `time`, `icon`, `label`, `label_fr`, `label_es`, `sort_order`.

**Create `venue_hotels` table**: `id`, `name`, `stars`, `distance`, `price`, `url`, `description`, `sort_order`.

**Create `venue_transport` table**: `id`, `type` (car/transit/parking), `description`, `description_fr`, `description_es`, `sort_order`.

**Add "Venue" tab to Dashboard** with sub-sections for each.

**Update `Venue.tsx`** to fetch all data from these tables.

#### Phase 4: Wedding Settings (new table + dashboard tab)

**Create `site_settings` table**: `id`, `key` (unique), `value` (text), `updated_at`. Keys: `couple_name_1`, `couple_name_2`, `wedding_date`, `bible_verse`, `bible_reference`.

**Add "Settings" tab to Dashboard** for editing couple names, date, verse.

**Update `Index.tsx`** to read from `site_settings`.

### Technical Details

- All new tables get RLS: public SELECT, authenticated INSERT/UPDATE/DELETE
- All new tables use `gen_random_uuid()` for IDs and `now()` for timestamps
- Dashboard tabs added to existing `TabsList` in `Dashboard.tsx`
- Frontend pages use `useEffect` + `supabase.from(...)` pattern consistent with existing hooks
- Seed migrations insert current hardcoded data so nothing is lost

### Files to Create/Edit
- **New migration**: Create `faqs`, `venue_settings`, `venue_schedule`, `venue_hotels`, `venue_transport`, `site_settings` tables with RLS + seed data
- **`src/pages/Dashboard.tsx`**: Add Guestbook, Photos, FAQ, Venue, Settings tabs
- **`src/pages/FAQ.tsx`**: Fetch from `faqs` table
- **`src/pages/Venue.tsx`**: Fetch from venue tables
- **`src/pages/Index.tsx`**: Fetch couple names/date from `site_settings`
- **`src/hooks/useSiteContent.ts`**: Add hooks for new tables

