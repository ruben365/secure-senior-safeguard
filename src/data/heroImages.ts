import heroHomepage from "@/assets/hero-homepage-new.jpg";
import heroAbout from "@/assets/hero-about-updated.jpg";
import heroScamShield from "@/assets/hero-scamshield-new.jpg";
import heroBusiness from "@/assets/hero-business-updated.jpg";
import heroTraining from "@/assets/hero-training-updated.jpg";
import heroResources from "@/assets/hero-resources-updated.jpg";
import heroContact from "@/assets/hero-contact-new.jpg";
import heroTeam from "@/assets/hero-team-updated.jpg";
import heroCareers from "@/assets/hero-careers.jpg";
import heroBusiness1 from "@/assets/hero-homepage-new.jpg";
import heroBusiness2 from "@/assets/hero-business-updated.jpg";
import heroBusiness3 from "@/assets/hero-training-updated.jpg";
import heroBusiness4 from "@/assets/hero-resources-updated.jpg";
import heroBusiness5 from "@/assets/hero-about-updated.jpg";
import heroBusiness6 from "@/assets/hero-team-updated.jpg";
import heroBusiness7 from "@/assets/hero-business-updated.jpg";

// New enhanced business images
import heroBusinessAI1 from "@/assets/hero-business-ai-1.jpg";
import heroBusinessAI2 from "@/assets/hero-business-ai-2.jpg";
import heroBusinessAI3 from "@/assets/hero-business-ai-3.jpg";

// New training images
import heroTrainingClass1 from "@/assets/hero-training-class-1.jpg";
import heroTrainingClass2 from "@/assets/hero-training-class-2.jpg";
import heroTrainingClass3 from "@/assets/hero-training-class-3.jpg";

// New team images
import heroTeamProfessionals1 from "@/assets/hero-team-professionals-1.jpg";
import heroTeamProfessionals2 from "@/assets/hero-team-professionals-2.jpg";
import heroTeamProfessionals3 from "@/assets/hero-team-professionals-3.jpg";

// New resources images
import heroResourcesLibrary1 from "@/assets/hero-resources-library-1.jpg";
import heroResourcesLibrary2 from "@/assets/hero-resources-library-2.jpg";
import heroResourcesLibrary3 from "@/assets/hero-resources-library-3.jpg";

// New about images
import heroAboutCompany1 from "@/assets/hero-about-company-1.jpg";
import heroAboutCompany2 from "@/assets/hero-about-company-2.jpg";
import heroAboutCompany3 from "@/assets/hero-about-company-3.jpg";

export interface HeroImage {
  type: string;
  url: string;
  headline: string;
  subheadline: string;
}

const heroImages: HeroImage[] = [
  {
    type: 'default',
    url: heroBusiness1,
    headline: "Protect Your Family from AI-Powered Scams",
    subheadline: "Simple, respectful training for adults 40+ and families. Learn to spot deepfakes, phishing, and AI fraud—no tech degree required.",
  },
  {
    type: 'default',
    url: heroBusiness2,
    headline: "Live Training That Actually Empowers You",
    subheadline: "Interactive Zoom sessions with real-world practice. Master deepfake detection, voice clone recognition, and emergency protocols with expert instructors.",
  },
  {
    type: 'default',
    url: heroBusiness3,
    headline: "AI That Works for Your Business, Not Against It",
    subheadline: "Custom AI receptionists, smart automation, and secure systems designed for small businesses. Professional implementation starting at $5,000.",
  },
  {
    type: 'default',
    url: heroBusiness4,
    headline: "Monthly Protection with Scam Shield",
    subheadline: "Forward suspicious emails, texts, and calls to our experts. Get professional analysis within 24 hours. Your personal fraud prevention team.",
  },
  {
    type: 'default',
    url: heroBusiness5,
    headline: "Expert Resources at Your Fingertips",
    subheadline: "Free downloadable guides, security checklists, and step-by-step tutorials. Everything you need to stay safe in the digital age.",
  },
  {
    type: 'default',
    url: heroBusiness6,
    headline: "Talk to a Real Human Who Cares",
    subheadline: "No sales pressure, no jargon. Just honest answers about protecting your family from digital fraud. Schedule a free 15-minute consultation.",
  },
  {
    type: 'default',
    url: heroBusiness7,
    headline: "Trusted by 500+ Families Across Ohio",
    subheadline: "Join our community of empowered families who stopped scams before losing a dollar. Real training, real results, real peace of mind.",
  },
  {
    type: 'about',
    url: heroAbout,
    headline: "About InVision Network",
    subheadline: "Your trusted partner in digital safety and AI empowerment",
  },
  {
    type: 'about',
    url: heroAboutCompany1,
    headline: "Our Mission & Values",
    subheadline: "Building a safer digital future for families and businesses",
  },
  {
    type: 'about',
    url: heroAboutCompany2,
    headline: "Community-Focused Protection",
    subheadline: "Empowering families with knowledge and support",
  },
  {
    type: 'about',
    url: heroAboutCompany3,
    headline: "Professional Excellence",
    subheadline: "Dedicated to your digital safety and peace of mind",
  },
  {
    type: 'scamshield',
    url: heroScamShield,
    headline: "Scam Shield Protection",
    subheadline: "Monthly protection with expert analysis of suspicious communications",
  },
  {
    type: 'business',
    url: heroBusiness,
    headline: "AI Solutions for Business",
    subheadline: "Transform your business with custom AI implementation",
  },
  {
    type: 'business',
    url: heroBusinessAI1,
    headline: "Smart AI for Modern Business",
    subheadline: "Collaborative AI solutions that enhance your team's productivity",
  },
  {
    type: 'business',
    url: heroBusinessAI2,
    headline: "24/7 AI Customer Support",
    subheadline: "Never miss a customer inquiry with intelligent automation",
  },
  {
    type: 'business',
    url: heroBusinessAI3,
    headline: "Business AI Integration",
    subheadline: "Seamless AI implementation for growing companies",
  },
  {
    type: 'training',
    url: heroTraining,
    headline: "Professional Training Programs",
    subheadline: "Live, interactive sessions to protect yourself from digital threats",
  },
  {
    type: 'training',
    url: heroTrainingClass1,
    headline: "Engaging Cybersecurity Training",
    subheadline: "Learn from expert instructors in welcoming classroom environments",
  },
  {
    type: 'training',
    url: heroTrainingClass2,
    headline: "Technology Training for All Ages",
    subheadline: "Comfortable learning environments designed for seniors and families",
  },
  {
    type: 'training',
    url: heroTrainingClass3,
    headline: "Interactive Online Sessions",
    subheadline: "Join our virtual training from the comfort of your home",
  },
  {
    type: 'resources',
    url: heroResources,
    headline: "Expert Resources",
    subheadline: "Free guides and tools to enhance your digital safety",
  },
  {
    type: 'resources',
    url: heroResourcesLibrary1,
    headline: "Digital Security Library",
    subheadline: "Comprehensive guides and resources at your fingertips",
  },
  {
    type: 'resources',
    url: heroResourcesLibrary2,
    headline: "Professional Resources",
    subheadline: "Organized materials and documentation for your security needs",
  },
  {
    type: 'resources',
    url: heroResourcesLibrary3,
    headline: "Modern Information Center",
    subheadline: "Access cutting-edge security information and tips",
  },
  {
    type: 'contact',
    url: heroContact,
    headline: "Get in Touch",
    subheadline: "Talk to a real human who cares about your safety",
  },
  {
    type: 'team',
    url: heroTeam,
    headline: "Meet Our Team",
    subheadline: "Dedicated professionals committed to your digital safety",
  },
  {
    type: 'team',
    url: heroTeamProfessionals1,
    headline: "Expert Security Professionals",
    subheadline: "Collaborative team dedicated to protecting families",
  },
  {
    type: 'team',
    url: heroTeamProfessionals2,
    headline: "Passionate About Your Safety",
    subheadline: "Friendly experts working together for your peace of mind",
  },
  {
    type: 'team',
    url: heroTeamProfessionals3,
    headline: "Join Our Growing Team",
    subheadline: "Building careers in digital safety and protection",
  },
  {
    type: 'careers',
    url: heroCareers,
    headline: "Join Our Team",
    subheadline: "Help us make a difference in digital safety education",
  },
];

export const getHeroImages = (pathname: string): HeroImage[] => {
  const typeMap: Record<string, string> = {
    '/': 'default',
    '/about': 'about',
    '/scamshield': 'scamshield',
    '/business': 'business',
    '/training': 'training',
    '/resources': 'resources',
    '/contact': 'contact',
    '/team': 'team',
    '/careers': 'careers',
  };
  
  const type = typeMap[pathname] || 'default';
  return heroImages.filter(img => img.type === type);
};

export default heroImages;
