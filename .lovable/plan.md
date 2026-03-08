

## Plan: Deep Cleanup — Fill Placeholders, Remove Dashes, Fix Warnings

### Issues Found

**1. 58 `___________` placeholders still in `LanguageContext.tsx`**
All ceremony details, reception program, accommodation, transport, and love story descriptions are still blank underscores. These display as literal `___________` on the homepage details section.

**2. Em dashes (`—`) in translation strings**
About 15 translation strings use `—` (em dash) which the user wants removed. These appear in drink notices, gift hints, subscribe descriptions, dashboard subtitle, QR hints, etc.

**3. Two React warnings: "Function components cannot be given refs"**
`PersonalCourtSection` and `AnnouncementsSection` are plain function components used inside `AnimatePresence`, which tries to pass refs. Need to wrap them with `forwardRef`.

**4. Gallery page file still exists**
`Gallery.tsx` is still in the codebase (no route points to it, but it's dead code). Can be left as-is or cleaned up.

### Plan

**File 1: `src/contexts/LanguageContext.tsx`**
- Replace all 58 `___________` values with proper placeholder text:
  - Ceremony: time "2:00 PM", location "Church of the Sacred Heart", address "123 Church Street"
  - Reception: time "6:00 PM", location "Grand Ballroom", address "456 Reception Avenue"
  - Accommodation: hotel name, description, address, rate info
  - Transport: shuttle, parking, schedule details
  - Ceremony program: welcome message, readings, vows, hymns, blessing descriptions
  - Reception program: cocktail hour, dinner, dance, cake descriptions
  - Love intro and love story descriptions
- Replace all `—` (em dashes) with commas or restructured sentences across ~15 strings
- All in three languages (FR/EN/ES)

**File 2: `src/pages/Index.tsx`**
- Wrap `PersonalCourtSection` and `AnnouncementsSection` with `forwardRef` to eliminate the React warnings about refs on function components

### Files to Edit
- `src/contexts/LanguageContext.tsx` — Fill all placeholders, remove em dashes
- `src/pages/Index.tsx` — Fix forwardRef warnings on 2 components

