

## Update Ceremony & Reception Times to 3:00 PM / 7:00 PM

### Changes

**1. `src/contexts/LanguageContext.tsx`**
- Line 66: `details.ceremony.time` — "2:00 PM" → "3:00 PM", "14h00" → "15h00"
- Line 70: `details.reception.time` — "6:00 PM" → "7:00 PM", "18h00" → "19h00"

**2. `src/pages/Index.tsx` (line 483)**
- Fallback date: `'2026-10-16T14:00:00'` → `'2026-10-16T15:00:00'`

**3. `src/components/dashboard/SettingsManager.tsx` (line 57)**
- Hint text: `"Format: 2026-10-16T14:00:00"` → `"Format: 2026-10-16T15:00:00"`

**4. `src/pages/RSVP.tsx` (line 366-369)**
- Fallback ceremony time: `'14:00'` → `'15:00'`
- Fallback reception time: `'18:00'` → `'19:00'`

**5. `src/pages/Venue.tsx` (line 32-35)**
- Same fallback time updates as RSVP

