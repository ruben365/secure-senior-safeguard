// Warm, Trustworthy, Human-Centric Hero Images Configuration
// Professional images with natural lighting, soft blues and whites, approachable subjects

// Page-specific warm images
import teamTabletCollaboration from "@/assets/team-tablet-collaboration.jpg";
import aiHelpingPeople from "@/assets/ai-helping-people.jpg";
import workshopLearningEnvironment from "@/assets/workshop-learning-environment.jpg";
import teamCultureLifestyle from "@/assets/team-culture-lifestyle.jpg";
import friendlySupportAgent from "@/assets/friendly-support-agent.jpg";

export interface WarmHeroImage {
  src: string;
  alt: string;
}

// Warm, human-centric images for each page
export const PAGE_WARM_IMAGES: Record<string, WarmHeroImage[]> = {
  homepage: [
    { src: teamTabletCollaboration, alt: "Diverse team collaborating around tablet in bright modern office" },
  ],
  business: [
    { src: aiHelpingPeople, alt: "AI technology helping people with warm geometric shapes and tablet interaction" },
    { src: teamTabletCollaboration, alt: "Professional team using technology in modern workspace" },
  ],
  training: [
    { src: workshopLearningEnvironment, alt: "Diverse group learning together in bright workshop environment" },
    { src: teamTabletCollaboration, alt: "Professional team collaborating with technology" },
  ],
  careers: [
    { src: teamCultureLifestyle, alt: "Diverse creative team laughing together in modern office with coffee" },
    { src: workshopLearningEnvironment, alt: "Collaborative learning environment with professionals" },
  ],
  faq: [
    { src: friendlySupportAgent, alt: "Friendly support agent with headset ready to help" },
  ],
  contact: [
    { src: friendlySupportAgent, alt: "Professional support representative with warm smile" },
    { src: teamTabletCollaboration, alt: "Team ready to assist with technology solutions" },
  ],
};

// Export individual images for direct use
export {
  teamTabletCollaboration,
  aiHelpingPeople,
  workshopLearningEnvironment,
  teamCultureLifestyle,
  friendlySupportAgent,
};
