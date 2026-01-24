

# Hero Image Branding Update Plan

## Overview
Update 4 hero images across the website to include professional InVision Network branding and improve their visual quality.

## Pages Requiring Hero Image Updates

| Page | Current Image | Requested Change |
|------|---------------|------------------|
| **Contact** | Woman with curly hair, "Network" text visible on wall | Keep same person, add clear "InVision Network" branding on the wall |
| **Careers** | Team meeting scene | Generate new professional branded image |
| **Resources** | Library/study setting | Generate new professional branded image |
| **Business** | Nature sunrise scene | Generate new professional AI/business themed image |

## Implementation Approach

### Phase 1: Create Image Generation Edge Function
Create a new edge function `generate-hero-image` that uses Lovable AI's image generation capability to create branded hero images.

**Files to create:**
- `supabase/functions/generate-hero-image/index.ts`

**Image generation specs for each page:**

1. **Contact Page** - Edit existing image to add wall branding:
   - Prompt: "Add subtle 'InVision Network' logo/text on the glass wall in the background of this professional office photo. Keep the woman as the main subject. Make branding look natural and architectural."

2. **Careers Page** - Generate new image:
   - Prompt: "Photorealistic diverse professional team collaborating in a modern bright office, standing around a whiteboard with visible 'InVision Network' branding on the wall, warm natural lighting, candid genuine smiles, DSLR quality"

3. **Resources Page** - Generate new image:
   - Prompt: "Modern digital knowledge center with security books and learning materials, professional study environment, warm lighting, subtle 'InVision Network' branded signage visible, photorealistic, high resolution"

4. **Business Page** - Generate new image:
   - Prompt: "Diverse business professionals reviewing AI analytics on screens in modern office, technology-forward environment, visible 'InVision Network' branding on glass wall, golden hour lighting through windows, photorealistic DSLR quality"

### Phase 2: Admin Interface for Image Generation
Add an admin-only page or component to trigger image generation and preview results before saving.

**Files to create:**
- `src/pages/admin/HeroImageGenerator.tsx` - Admin UI to generate and preview images

### Phase 3: Update Image Assets
Once images are generated and approved:
1. Save generated images to Supabase storage
2. Update `src/config/professionalHeroImages.ts` to reference new images
3. Update alt text descriptions for SEO

## Technical Details

### Edge Function Structure
```typescript
// supabase/functions/generate-hero-image/index.ts
// Uses Lovable AI (google/gemini-2.5-flash-image-preview) for image generation
// Accepts page name and returns base64 image
// Uploads to Supabase storage bucket
```

### Storage Bucket
Create `hero-images` storage bucket for generated images with public read access.

### Image Specifications
- **Format:** JPEG (high quality)
- **Dimensions:** 1920x1080 (16:9 hero format)
- **Style:** Photorealistic, DSLR quality, natural lighting
- **Branding:** "InVision Network" subtly integrated into environment (walls, signage, screens)

## File Changes Summary

| File | Action |
|------|--------|
| `supabase/functions/generate-hero-image/index.ts` | Create |
| `src/pages/admin/HeroImageGenerator.tsx` | Create |
| `src/config/professionalHeroImages.ts` | Update (after images generated) |
| `src/App.tsx` | Add route for admin image generator |
| Storage bucket `hero-images` | Create |

## Workflow

1. Create the edge function for AI image generation
2. Create admin page to generate and preview images
3. Generate images one at a time, review quality
4. If satisfied, save to storage and update config
5. Images automatically used by Hero components on each page

## Estimated Changes
- 2 new files (edge function + admin page)
- 2 modified files (professionalHeroImages.ts + App.tsx routes)
- 1 storage bucket creation

