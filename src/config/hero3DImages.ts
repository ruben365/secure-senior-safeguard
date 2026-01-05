/**
 * 3D Object-Based Hero Images Configuration
 * 
 * These images feature clean, modern 3D illustrations and photorealistic objects.
 * No photos of people - focused on cybersecurity-themed visual elements.
 */

// Import 3D object images
import shieldHero from "@/assets/3d-shield-hero.jpg";
import aiNodes from "@/assets/3d-ai-nodes.jpg";
import learningObjects from "@/assets/3d-learning-objects.jpg";
import resourcesArchive from "@/assets/3d-resources-archive.jpg";
import aboutIdentity from "@/assets/3d-about-identity.jpg";
import careersGrowth from "@/assets/3d-careers-growth.jpg";
import faqQuestions from "@/assets/3d-faq-questions.jpg";
import contactCommunication from "@/assets/3d-contact-communication.jpg";

// Page-specific 3D imagery configurations
export const PAGE_3D_IMAGES = {
  // Homepage: Digital shield, padlock, fortress wall
  home: [
    { src: shieldHero, alt: "3D digital shield with holographic patterns" },
  ],
  
  // AI & Business: Interconnected nodes, glowing microchips, gears
  business: [
    { src: aiNodes, alt: "3D interconnected nodes and gears representing AI automation" },
  ],
  
  // Learn & Train: Floating books, lightbulb, puzzle pieces
  training: [
    { src: learningObjects, alt: "3D floating books and lightbulb representing learning" },
  ],
  
  // Resources: Library archive, toolbox, telescope
  resources: [
    { src: resourcesArchive, alt: "3D stylized library archive with holographic files" },
  ],
  
  // About: Fingerprint, chess piece, foundation pillar
  about: [
    { src: aboutIdentity, alt: "3D fingerprint with chess piece representing identity and strategy" },
  ],
  
  // Careers: Ladder, open door, desk setup (no people)
  careers: [
    { src: careersGrowth, alt: "3D ladder leading to open door representing career growth" },
  ],
  
  // FAQ: 3D question marks, magnifying glass
  faq: [
    { src: faqQuestions, alt: "3D question marks and magnifying glass" },
  ],
  
  // Contact: Floating envelope, phone, satellite dish
  contact: [
    { src: contactCommunication, alt: "3D holographic envelope and communication icons" },
  ],
};

// Direct exports for individual use
export {
  shieldHero,
  aiNodes,
  learningObjects,
  resourcesArchive,
  aboutIdentity,
  careersGrowth,
  faqQuestions,
  contactCommunication,
};
