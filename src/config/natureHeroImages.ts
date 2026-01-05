// Centralized Nature Hero Images Configuration
// 8 stunning nature images for hero sections with "Organic Security" theme

// Protection imagery
import natureShieldTree from "@/assets/nature-shield-tree.jpg";
import natureMountainStrength from "@/assets/nature-mountain-strength.jpg";

// AI & Tech imagery (interconnected nature)
import natureAiRoots from "@/assets/nature-ai-roots.jpg";

// Growth & Learning imagery
import natureGrowthPath from "@/assets/nature-growth-path.jpg";

// Resources & Knowledge imagery
import natureFlowingRiver from "@/assets/nature-flowing-river.jpg";

// Stability & About imagery
import natureAncientStability from "@/assets/nature-ancient-stability.jpg";

// Careers & Opportunity imagery
import natureHorizonSunrise from "@/assets/nature-horizon-sunrise.jpg";

// Calm & Contact imagery
import natureZenCalm from "@/assets/nature-zen-calm.jpg";

export interface HeroImage {
  src: string;
  alt: string;
}

// Page-specific nature images for "Organic Security" theme
export const PAGE_NATURE_IMAGES: Record<string, HeroImage[]> = {
  // Home: Shielded landscape - protection symbolism
  home: [
    { src: natureShieldTree, alt: "Majestic oak tree sheltering smaller plants in golden sunlight" },
    { src: natureMountainStrength, alt: "Mountain peak standing firm against dramatic clouds" },
  ],
  // Business: Interconnected nature - AI networks naturally
  business: [
    { src: natureAiRoots, alt: "Bioluminescent tree root system representing interconnected AI networks" },
    { src: natureShieldTree, alt: "Protective oak tree with golden sunlight rays" },
  ],
  // Training: Growth imagery - education and journey
  training: [
    { src: natureGrowthPath, alt: "Young seedlings along forest path with morning mist" },
    { src: natureAncientStability, alt: "Ancient redwood with stone formation" },
  ],
  // Resources: Water imagery - source of knowledge
  resources: [
    { src: natureFlowingRiver, alt: "Crystal clear mountain river flowing through wilderness" },
    { src: natureGrowthPath, alt: "Forest path with seedlings symbolizing growth" },
  ],
  // About: Stability imagery - solid foundation
  about: [
    { src: natureAncientStability, alt: "Ancient redwood trunk with deep textured bark beside stone" },
    { src: natureMountainStrength, alt: "Mountain standing firm against dramatic sky" },
  ],
  // Careers: Horizon imagery - opportunity and future
  careers: [
    { src: natureHorizonSunrise, alt: "Breathtaking sunrise over rolling hills and open meadow" },
    { src: natureGrowthPath, alt: "Path through forest symbolizing journey ahead" },
  ],
  // FAQ: Calm/Clarity imagery
  faq: [
    { src: natureZenCalm, alt: "Peaceful zen garden with smooth pebbles and clear sky reflection" },
    { src: natureFlowingRiver, alt: "Calm flowing river representing clarity" },
  ],
  // Contact: Calm/Clarity imagery
  contact: [
    { src: natureZenCalm, alt: "Tranquil zen garden with still water reflection" },
    { src: natureHorizonSunrise, alt: "Golden sunrise over peaceful landscape" },
  ],
};

// All nature images combined
export const ALL_NATURE_IMAGES: HeroImage[] = [
  { src: natureShieldTree, alt: "Majestic oak tree sheltering smaller plants" },
  { src: natureMountainStrength, alt: "Mountain peak standing firm" },
  { src: natureAiRoots, alt: "Bioluminescent tree root system" },
  { src: natureGrowthPath, alt: "Forest path with seedlings" },
  { src: natureFlowingRiver, alt: "Crystal clear mountain river" },
  { src: natureAncientStability, alt: "Ancient redwood with stone" },
  { src: natureHorizonSunrise, alt: "Sunrise over rolling hills" },
  { src: natureZenCalm, alt: "Peaceful zen garden" },
];

// Helper to get page images
export const getPageNatureImages = (page: keyof typeof PAGE_NATURE_IMAGES): HeroImage[] => {
  return PAGE_NATURE_IMAGES[page] || PAGE_NATURE_IMAGES.home;
};

// Export individual images for use in other components
export {
  natureShieldTree,
  natureMountainStrength,
  natureAiRoots,
  natureGrowthPath,
  natureFlowingRiver,
  natureAncientStability,
  natureHorizonSunrise,
  natureZenCalm,
};
