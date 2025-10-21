import heroHomepage from "@/assets/hero-homepage.jpg";
import heroAbout from "@/assets/hero-about-company.jpg";
import heroScamShield from "@/assets/hero-scamshield-new.jpg";
import heroBusiness from "@/assets/hero-business-ai.jpg";
import heroTraining from "@/assets/hero-training.jpg";
import heroResources from "@/assets/hero-resources-new.jpg";
import heroContact from "@/assets/hero-contact-new.jpg";
import heroTeam from "@/assets/hero-team.jpg";
import heroCareers from "@/assets/hero-careers.jpg";
import heroBusiness1 from "@/assets/hero-business-1.jpg";
import heroBusiness2 from "@/assets/hero-business-2.jpg";
import heroBusiness3 from "@/assets/hero-business-3.jpg";
import heroBusiness4 from "@/assets/hero-business-4.jpg";
import heroBusiness5 from "@/assets/hero-business-5.jpg";
import heroBusiness6 from "@/assets/hero-business-6.jpg";
import heroBusiness7 from "@/assets/hero-business-7.jpg";

export interface HeroSlide {
  image: string;
  headline: string;
  subheadline: string;
  type: string;
}

export interface HeroImageConfig {
  type: string;
  slides: HeroSlide[];
  interval?: number;
}

export const heroImages: Record<string, HeroImageConfig> = {
  '/': {
    type: 'default',
    slides: [
      {
        image: heroBusiness1,
        headline: "Protect Your Family from AI-Powered Scams",
        subheadline: "Simple, respectful training for adults 40+ and families. Learn to spot deepfakes, phishing, and AI fraud—no tech degree required.",
        type: "default"
      },
      {
        image: heroBusiness2,
        headline: "Live Training That Actually Empowers You",
        subheadline: "Interactive Zoom sessions with real-world practice. Master deepfake detection, voice clone recognition, and emergency protocols with expert instructors.",
        type: "default"
      },
      {
        image: heroBusiness3,
        headline: "AI That Works for Your Business, Not Against It",
        subheadline: "Custom AI receptionists, smart automation, and secure systems designed for small businesses. Professional implementation starting at $5,000.",
        type: "default"
      },
      {
        image: heroBusiness4,
        headline: "Monthly Protection with Scam Shield",
        subheadline: "Forward suspicious emails, texts, and calls to our experts. Get professional analysis within 24 hours. Your personal fraud prevention team.",
        type: "default"
      },
      {
        image: heroBusiness5,
        headline: "Expert Resources at Your Fingertips",
        subheadline: "Free downloadable guides, security checklists, and step-by-step tutorials. Everything you need to stay safe in the digital age.",
        type: "default"
      },
      {
        image: heroBusiness6,
        headline: "Talk to a Real Human Who Cares",
        subheadline: "No sales pressure, no jargon. Just honest answers about protecting your family from digital fraud. Schedule a free 15-minute consultation.",
        type: "default"
      },
      {
        image: heroBusiness7,
        headline: "Trusted by 500+ Families Across Ohio",
        subheadline: "Join our community of empowered families who stopped scams before losing a dollar. Real training, real results, real peace of mind.",
        type: "default"
      }
    ],
    interval: 5000,
  },
  '/about': {
    type: 'about',
    slides: [{
      image: heroAbout,
      headline: "About InVision Network",
      subheadline: "Your trusted partner in digital safety and AI empowerment",
      type: "about"
    }],
    interval: 5000,
  },
  '/scamshield': {
    type: 'scamshield',
    slides: [{
      image: heroScamShield,
      headline: "Scam Shield Protection",
      subheadline: "Monthly protection with expert analysis of suspicious communications",
      type: "scamshield"
    }],
    interval: 5000,
  },
  '/business': {
    type: 'business',
    slides: [{
      image: heroBusiness,
      headline: "AI Solutions for Business",
      subheadline: "Transform your business with custom AI implementation",
      type: "business"
    }],
    interval: 5000,
  },
  '/training': {
    type: 'training',
    slides: [{
      image: heroTraining,
      headline: "Professional Training Programs",
      subheadline: "Live, interactive sessions to protect yourself from digital threats",
      type: "training"
    }],
    interval: 5000,
  },
  '/resources': {
    type: 'resources',
    slides: [{
      image: heroResources,
      headline: "Expert Resources",
      subheadline: "Free guides and tools to enhance your digital safety",
      type: "resources"
    }],
    interval: 5000,
  },
  '/contact': {
    type: 'contact',
    slides: [{
      image: heroContact,
      headline: "Get in Touch",
      subheadline: "Talk to a real human who cares about your safety",
      type: "contact"
    }],
    interval: 5000,
  },
  '/team': {
    type: 'team',
    slides: [{
      image: heroTeam,
      headline: "Meet Our Team",
      subheadline: "Dedicated professionals committed to your digital safety",
      type: "team"
    }],
    interval: 5000,
  },
  '/careers': {
    type: 'careers',
    slides: [{
      image: heroCareers,
      headline: "Join Our Team",
      subheadline: "Help us make a difference in digital safety education",
      type: "careers"
    }],
    interval: 5000,
  },
};

export const getHeroConfig = (pathname: string): HeroImageConfig => {
  return heroImages[pathname] || heroImages['/'];
};
