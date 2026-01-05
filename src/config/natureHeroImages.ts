// Centralized Nature Hero Images Configuration
// 40 stunning nature images for hero sections with "Organic Security" theme
// 5 images per page

// HOME - Protection/Shielded Landscape imagery
import homeOakShelter from "@/assets/nature/home-oak-shelter.jpg";
import homeMountainFortress from "@/assets/nature/home-mountain-fortress.jpg";
import homeForestCanopy from "@/assets/nature/home-forest-canopy.jpg";
import homeValleyProtected from "@/assets/nature/home-valley-protected.jpg";
import homeRedwoodSanctuary from "@/assets/nature/home-redwood-sanctuary.jpg";

// BUSINESS - Interconnected Nature/AI Networks imagery
import businessNeuralRoots from "@/assets/nature/business-neural-roots.jpg";
import businessWebNetwork from "@/assets/nature/business-web-network.jpg";
import businessConstellation from "@/assets/nature/business-constellation.jpg";
import businessMycelium from "@/assets/nature/business-mycelium.jpg";
import businessLeafVeins from "@/assets/nature/business-leaf-veins.jpg";

// TRAINING - Growth/Learning Journey imagery
import trainingSeedlings from "@/assets/nature/training-seedlings.jpg";
import trainingForestPath from "@/assets/nature/training-forest-path.jpg";
import trainingButterfly from "@/assets/nature/training-butterfly.jpg";
import trainingBambooGrowth from "@/assets/nature/training-bamboo-growth.jpg";
import trainingSummitPath from "@/assets/nature/training-summit-path.jpg";

// RESOURCES - Water/Source of Knowledge imagery
import resourcesMountainStream from "@/assets/nature/resources-mountain-stream.jpg";
import resourcesAlpineLake from "@/assets/nature/resources-alpine-lake.jpg";
import resourcesWaterfall from "@/assets/nature/resources-waterfall.jpg";
import resourcesSpring from "@/assets/nature/resources-spring.jpg";
import resourcesRiverDelta from "@/assets/nature/resources-river-delta.jpg";

// ABOUT - Stability/Foundation imagery
import aboutAncientSequoia from "@/assets/nature/about-ancient-sequoia.jpg";
import aboutBalancedRocks from "@/assets/nature/about-balanced-rocks.jpg";
import aboutCoastalCliff from "@/assets/nature/about-coastal-cliff.jpg";
import aboutGraniteMountain from "@/assets/nature/about-granite-mountain.jpg";
import aboutBristlecone from "@/assets/nature/about-bristlecone.jpg";

// CAREERS - Horizon/Opportunity imagery
import careersGoldenSunrise from "@/assets/nature/careers-golden-sunrise.jpg";
import careersOpenMeadow from "@/assets/nature/careers-open-meadow.jpg";
import careersSoaringEagle from "@/assets/nature/careers-soaring-eagle.jpg";
import careersAutumnRoad from "@/assets/nature/careers-autumn-road.jpg";
import careersSummitView from "@/assets/nature/careers-summit-view.jpg";

// FAQ - Calm/Clarity imagery
import faqZenGarden from "@/assets/nature/faq-zen-garden.jpg";
import faqStillLake from "@/assets/nature/faq-still-lake.jpg";
import faqClearSky from "@/assets/nature/faq-clear-sky.jpg";
import faqRiverStones from "@/assets/nature/faq-river-stones.jpg";
import faqLotus from "@/assets/nature/faq-lotus.jpg";

// CONTACT - Connection/Communication imagery
import contactBridgingTrees from "@/assets/nature/contact-bridging-trees.jpg";
import contactConfluence from "@/assets/nature/contact-confluence.jpg";
import contactForestWelcome from "@/assets/nature/contact-forest-welcome.jpg";
import contactPeacefulBay from "@/assets/nature/contact-peaceful-bay.jpg";
import contactRainbowValley from "@/assets/nature/contact-rainbow-valley.jpg";

export interface HeroImage {
  src: string;
  alt: string;
}

// Page-specific nature images for "Organic Security" theme - 5 per page
export const PAGE_NATURE_IMAGES: Record<string, HeroImage[]> = {
  // Home: Shielded landscape - protection symbolism
  home: [
    { src: homeOakShelter, alt: "Majestic oak tree with golden sunlight sheltering plants below" },
    { src: homeMountainFortress, alt: "Dramatic mountain peak fortress against stormy clouds" },
    { src: homeForestCanopy, alt: "Dense protective forest canopy from below" },
    { src: homeValleyProtected, alt: "Misty valley protected by surrounding mountains" },
    { src: homeRedwoodSanctuary, alt: "Ancient redwood forest sanctuary with morning fog" },
  ],
  // Business: Interconnected nature - AI networks naturally
  business: [
    { src: businessNeuralRoots, alt: "Bioluminescent tree root system representing neural networks" },
    { src: businessWebNetwork, alt: "Spider web with dew drops at golden sunrise" },
    { src: businessConstellation, alt: "Milky Way with connected constellation patterns" },
    { src: businessMycelium, alt: "Glowing mycelium fungal network connecting trees" },
    { src: businessLeafVeins, alt: "Intricate leaf vein patterns showing natural networks" },
  ],
  // Training: Growth imagery - education and journey
  training: [
    { src: trainingSeedlings, alt: "Young seedlings emerging from rich soil with morning dew" },
    { src: trainingForestPath, alt: "Winding autumn forest path with golden leaves" },
    { src: trainingButterfly, alt: "Butterfly emerging from chrysalis symbolizing transformation" },
    { src: trainingBambooGrowth, alt: "Tall bamboo grove reaching skyward" },
    { src: trainingSummitPath, alt: "Mountain hiking trail switchbacks to summit" },
  ],
  // Resources: Water imagery - source of knowledge
  resources: [
    { src: resourcesMountainStream, alt: "Crystal clear mountain stream flowing over rocks" },
    { src: resourcesAlpineLake, alt: "Pristine alpine lake reflecting snow-capped mountains" },
    { src: resourcesWaterfall, alt: "Powerful waterfall cascading with rainbow mist" },
    { src: resourcesSpring, alt: "Underground spring emerging from cave" },
    { src: resourcesRiverDelta, alt: "Aerial view of branching river delta" },
  ],
  // About: Stability imagery - solid foundation
  about: [
    { src: aboutAncientSequoia, alt: "Ancient giant sequoia trunk with deep textured bark" },
    { src: aboutBalancedRocks, alt: "Dramatic balanced rock formation at sunset" },
    { src: aboutCoastalCliff, alt: "Coastal cliff standing strong against ocean waves" },
    { src: aboutGraniteMountain, alt: "Massive granite mountain face in dramatic light" },
    { src: aboutBristlecone, alt: "Ancient bristlecone pine twisted by time still standing" },
  ],
  // Careers: Horizon imagery - opportunity and future
  careers: [
    { src: careersGoldenSunrise, alt: "Breathtaking golden sunrise over rolling green hills" },
    { src: careersOpenMeadow, alt: "Vast open meadow with wildflowers leading to mountains" },
    { src: careersSoaringEagle, alt: "Eagle soaring above mountain peaks at dawn" },
    { src: careersAutumnRoad, alt: "Winding road through beautiful autumn forest" },
    { src: careersSummitView, alt: "Mountain summit view at sunrise above clouds" },
  ],
  // FAQ: Calm/Clarity imagery
  faq: [
    { src: faqZenGarden, alt: "Japanese zen garden with raked sand and smooth pebbles" },
    { src: faqStillLake, alt: "Perfectly still lake at dawn reflecting sky" },
    { src: faqClearSky, alt: "Clear blue sky with single peaceful white cloud" },
    { src: faqRiverStones, alt: "Smooth river stones in crystal clear shallow water" },
    { src: faqLotus, alt: "Lotus flower floating on peaceful pond" },
  ],
  // Contact: Connection/Communication imagery
  contact: [
    { src: contactBridgingTrees, alt: "Two trees with intertwined branches forming natural bridge" },
    { src: contactConfluence, alt: "Stream meeting calm lake in peaceful nature scene" },
    { src: contactForestWelcome, alt: "Warm sunrise through forest clearing welcoming light" },
    { src: contactPeacefulBay, alt: "Peaceful bay with gentle waves reaching sandy shore" },
    { src: contactRainbowValley, alt: "Rainbow after storm over green valley" },
  ],
};

// All nature images combined
export const ALL_NATURE_IMAGES: HeroImage[] = [
  ...PAGE_NATURE_IMAGES.home,
  ...PAGE_NATURE_IMAGES.business,
  ...PAGE_NATURE_IMAGES.training,
  ...PAGE_NATURE_IMAGES.resources,
  ...PAGE_NATURE_IMAGES.about,
  ...PAGE_NATURE_IMAGES.careers,
  ...PAGE_NATURE_IMAGES.faq,
  ...PAGE_NATURE_IMAGES.contact,
];

// Helper to get page images
export const getPageNatureImages = (page: keyof typeof PAGE_NATURE_IMAGES): HeroImage[] => {
  return PAGE_NATURE_IMAGES[page] || PAGE_NATURE_IMAGES.home;
};

// Export individual images for use in other components
export {
  // Home
  homeOakShelter,
  homeMountainFortress,
  homeForestCanopy,
  homeValleyProtected,
  homeRedwoodSanctuary,
  // Business
  businessNeuralRoots,
  businessWebNetwork,
  businessConstellation,
  businessMycelium,
  businessLeafVeins,
  // Training
  trainingSeedlings,
  trainingForestPath,
  trainingButterfly,
  trainingBambooGrowth,
  trainingSummitPath,
  // Resources
  resourcesMountainStream,
  resourcesAlpineLake,
  resourcesWaterfall,
  resourcesSpring,
  resourcesRiverDelta,
  // About
  aboutAncientSequoia,
  aboutBalancedRocks,
  aboutCoastalCliff,
  aboutGraniteMountain,
  aboutBristlecone,
  // Careers
  careersGoldenSunrise,
  careersOpenMeadow,
  careersSoaringEagle,
  careersAutumnRoad,
  careersSummitView,
  // FAQ
  faqZenGarden,
  faqStillLake,
  faqClearSky,
  faqRiverStones,
  faqLotus,
  // Contact
  contactBridgingTrees,
  contactConfluence,
  contactForestWelcome,
  contactPeacefulBay,
  contactRainbowValley,
};
