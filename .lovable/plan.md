

## Replace "Our Story" section image on homepage

The homepage "Our Story" section (line 956 in `Index.tsx`) currently shows `couple5` which imports `couple-5-small.webp` — the "looking at the watch" photo.

### Plan

1. **Copy the uploaded image** (`IMG-20240120-WA0025_1_1-3.jpg`) to `src/assets/couple-5-small.webp` (overwriting the current file)
2. **Adjust the image framing** — The new photo is a portrait with both subjects' faces in the upper third. The current `object-[center_20%]` may crop too high. Update to `object-[center_30%]` to better center both faces in the 4:5 aspect ratio container.

No other files need changes since the import path stays the same.

