// Professional Hero Images Configuration
// Clean, modern professional images for each page - InVision Network branded

import heroProBusiness from "@/assets/hero-pro-business.jpg";
import heroProTraining from "@/assets/hero-pro-training.jpg";
import heroProResources from "@/assets/hero-pro-resources.jpg";
import heroProAbout from "@/assets/hero-pro-about.jpg";
import heroProCareers from "@/assets/hero-pro-careers.jpg";
import heroProFaq from "@/assets/hero-pro-faq.jpg";
import heroProContact from "@/assets/hero-pro-contact.jpg";

export interface HeroImage {
  src: string;
  alt: string;
}

// Professional hero images for each page - InVision Network branded
export const PROFESSIONAL_HERO_IMAGES: Record<string, HeroImage[]> = {
  business: [
    { src: heroProBusiness, alt: "InVision Network professional business team collaborating on AI automation solutions" },
  ],
  training: [
    { src: heroProTraining, alt: "InVision Network cybersecurity training workshop with diverse professionals learning digital protection" },
  ],
  resources: [
    { src: heroProResources, alt: "InVision Network digital library with security resources and learning materials" },
  ],
  about: [
    { src: heroProAbout, alt: "InVision Network diverse team dedicated to protecting Ohio families and businesses" },
  ],
  careers: [
    { src: heroProCareers, alt: "InVision Network creative workspace where mission-driven professionals make a difference" },
  ],
  faq: [
    { src: heroProFaq, alt: "InVision Network friendly customer support team ready to answer your questions" },
  ],
  contact: [
    { src: heroProContact, alt: "InVision Network welcoming Ohio-based team ready to help protect your family" },
  ],
};

// Export individual images for use elsewhere
export {
  heroProBusiness,
  heroProTraining,
  heroProResources,
  heroProAbout,
  heroProCareers,
  heroProFaq,
  heroProContact,
};