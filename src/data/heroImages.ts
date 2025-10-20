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

export interface HeroImageConfig {
  type: string;
  images: string[];
  interval?: number;
}

export const heroImages: Record<string, HeroImageConfig> = {
  '/': {
    type: 'default',
    images: [
      heroBusiness1,
      heroBusiness2,
      heroBusiness3,
      heroBusiness4,
      heroBusiness5,
      heroBusiness6,
      heroBusiness7,
    ],
    interval: 5000,
  },
  '/about': {
    type: 'about',
    images: [heroAbout],
    interval: 5000,
  },
  '/scamshield': {
    type: 'scamshield',
    images: [heroScamShield],
    interval: 5000,
  },
  '/business': {
    type: 'business',
    images: [heroBusiness],
    interval: 5000,
  },
  '/training': {
    type: 'training',
    images: [heroTraining],
    interval: 5000,
  },
  '/resources': {
    type: 'resources',
    images: [heroResources],
    interval: 5000,
  },
  '/contact': {
    type: 'contact',
    images: [heroContact],
    interval: 5000,
  },
  '/team': {
    type: 'team',
    images: [heroTeam],
    interval: 5000,
  },
  '/careers': {
    type: 'careers',
    images: [heroCareers],
    interval: 5000,
  },
};

export const getHeroConfig = (pathname: string): HeroImageConfig => {
  return heroImages[pathname] || heroImages['/'];
};
