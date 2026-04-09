// Professional Hero Images Configuration
// Unified cinematic style — warm amber bokeh, premium office environments

import heroBrandedBusiness from "@/assets/hero-ai-business-unified.jpg";
import heroBrandedTraining from "@/assets/hero-training-unified.jpg";
import heroBrandedResources from "@/assets/hero-resources-unified.jpg";
import heroBrandedAbout from "@/assets/hero-about-unified.jpg";
import heroBrandedCareers from "@/assets/hero-careers-unified.jpg";
import heroBrandedFaq from "@/assets/hero-faq-unified.jpg";
import heroBrandedContact from "@/assets/hero-contact-unified.jpg";

export interface HeroImage {
  src: string;
  alt: string;
}

// Professional branded hero images for each page — unified cinematic style
export const PROFESSIONAL_HERO_IMAGES: Record<string, HeroImage[]> = {
  business: [
    {
      src: heroBrandedBusiness,
      alt: "Diverse professionals collaborating around AI data screens in modern office with warm amber lighting",
    },
  ],
  training: [
    {
      src: heroBrandedTraining,
      alt: "Professional workshop training session with engaged learners in modern conference room",
    },
  ],
  resources: [
    {
      src: heroBrandedResources,
      alt: "Professional browsing knowledge resources in elegant modern library with warm lighting",
    },
  ],
  about: [
    {
      src: heroBrandedAbout,
      alt: "InVision Network diverse professional team in modern office lobby",
    },
  ],
  careers: [
    {
      src: heroBrandedCareers,
      alt: "Confident professional walking through modern glass office hallway",
    },
  ],
  faq: [
    {
      src: heroBrandedFaq,
      alt: "Friendly professional at modern help desk ready to assist",
    },
  ],
  contact: [
    {
      src: heroBrandedContact,
      alt: "Welcoming premium office reception area with warm ambient lighting",
    },
  ],
};

// Export individual images for use elsewhere
export {
  heroBrandedBusiness,
  heroBrandedTraining,
  heroBrandedResources,
  heroBrandedAbout,
  heroBrandedCareers,
  heroBrandedFaq,
  heroBrandedContact,
};
