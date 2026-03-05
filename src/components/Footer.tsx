import { useLanguage } from '@/contexts/LanguageContext';
import { Heart } from 'lucide-react';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-8 bg-card">
      <div className="container mx-auto px-4 text-center">
        <p className="font-serif-display text-2xl text-primary mb-2">C & R</p>
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
          {t('footer.made')} <Heart className="w-3 h-3 text-primary fill-primary" /> {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
