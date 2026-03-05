import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Heart, Instagram, Mail, MapPin } from 'lucide-react';
import flowersImg from '@/assets/flowers-lavender.jpg';

const Footer = () => {
  const { t } = useLanguage();

  const quickLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.story'), to: '/story' },
    { label: t('nav.details'), to: '/details' },
  ];

  const moreLinks = [
    { label: t('nav.rsvp'), to: '/rsvp' },
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.registry'), to: '/registry' },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-border/30">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-soft" />
      <div className="floating-blob w-[400px] h-[400px] bg-primary/10 -bottom-48 left-1/3" />

      <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src={flowersImg} alt="" className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20" />
              <span className="font-serif-display text-2xl gradient-text font-semibold">C & R</span>
            </div>
            <p className="font-serif-body text-sm text-muted-foreground leading-relaxed mb-5">
              {t('hero.tagline')}. {t('hero.date')}.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center hover:shadow-glow transition-all duration-300 hover:scale-110">
                <Instagram className="w-4 h-4 text-primary-foreground" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center hover:shadow-glow transition-all duration-300 hover:scale-110">
                <Mail className="w-4 h-4 text-primary-foreground" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center hover:shadow-glow transition-all duration-300 hover:scale-110">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-sans-elegant text-sm font-semibold tracking-[0.15em] uppercase text-foreground mb-5">
              {t('footer.quicklinks') || 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-serif-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More links */}
          <div>
            <h4 className="font-sans-elegant text-sm font-semibold tracking-[0.15em] uppercase text-foreground mb-5">
              {t('footer.more') || 'More'}
            </h4>
            <ul className="space-y-3">
              {moreLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="font-serif-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Venue info */}
          <div>
            <h4 className="font-sans-elegant text-sm font-semibold tracking-[0.15em] uppercase text-foreground mb-5">
              {t('footer.venue') || 'Venue'}
            </h4>
            <p className="font-serif-body text-sm text-muted-foreground leading-relaxed mb-2">
              {t('details.ceremony.location')}
            </p>
            <p className="font-serif-body text-sm text-muted-foreground leading-relaxed mb-4">
              {t('details.ceremony.address')}
            </p>
            <p className="font-sans-elegant text-xs text-primary font-medium">15 Août 2027 • 14:00</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground flex items-center gap-1.5 font-sans-elegant">
            {t('footer.made')} <Heart className="w-3 h-3 text-accent fill-accent" /> {t('footer.copyright')}
          </p>
          <p className="font-serif-display text-lg gradient-text font-semibold">Corine & Ruben</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;