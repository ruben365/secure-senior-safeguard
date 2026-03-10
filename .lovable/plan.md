

## Plan: Replace Stock Photos with Personal Couple Photos

### What Changes
Replace all stock images (flowers, rings, cake, couple-lavender) with the 9 uploaded personal photos across Index.tsx, Story.tsx, and Gallery.tsx. The hero background image stays unchanged.

### Photo Assignment (by context/mood)

| Location | Current Image | New Photo | Why |
|---|---|---|---|
| **Love Story main portrait** (Index, 4:5 aspect) | couple-lavender | `1704295321433_2_1.jpg` (dramatic formal, blue curtain) | Best portrait quality, dramatic |
| **Faith tall card** (Index, tall overlay) | flowers-lavender | `20250413_123402_1.jpg` (lavender formal, church) | Matches faith/church theme, lavender tones |
| **Music card #1** (Index, 48px thumb) | couple-lavender | `1705265295316_2.jpg` (gold formal) | Elegant close crop |
| **Music card #2** (Index, 48px thumb) | rings | `IMG_20230918_161437_530_1.jpg` (ballroom formal) | Elegant, works at small size |
| **Gallery strip slot 2** (Index) | cake | `IMG-20240120-WA0025_1_1.jpg` (seated, red tie) | Fun, different mood |
| **Gallery strip slot 3** (Index) | rings | `Screenshot_20251117_121837_Photos_1.jpg` (library) | Professional feel |
| **Gallery strip slot 4** (Index) | couple-lavender | `Screenshot_20251117_121650_Photos_1.jpg` (outdoor casual) | Casual contrast |
| **CTA circle** (Index, 112px) | rings | `IMG_20230523_095011_585_1.jpg` (close selfie with flowers) | Intimate, works circular |
| **Gallery page static** (4 photos) | couple/flowers/rings/cake | 4 different photos from set | Variety |
| **Story page static + timeline** | couple/flowers/rings/cake/venue | 5 different photos from set | Chronological feel |

### Technical Approach

1. **Copy all 9 uploaded images** to `src/assets/couple-1.jpg` through `couple-9.jpg`
2. **Update imports** in Index.tsx, Story.tsx, Gallery.tsx to use new photos
3. **Add `object-position: top`** on all `<img>` tags to ensure heads are never cropped
4. Keep all existing container sizes, borders, aspect ratios unchanged — only swap `src` and add positioning
5. The hero background (line 726, faded 10% opacity overlay) stays as-is

### Files Modified
- `src/assets/` — 9 new image files copied
- `src/pages/Index.tsx` — Update imports, swap image sources, add object-position
- `src/pages/Story.tsx` — Update imports, swap image sources, add object-position
- `src/pages/Gallery.tsx` — Update imports, swap image sources, add object-position

