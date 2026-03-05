import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const WEDDING_DATE = new Date('2027-08-15T14:00:00');

const Index = () => {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const diff = WEDDING_DATE.getTime() - now.getTime();
      if (diff <= 0) return;
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center relative z-10"
        >
          <p className="font-sans-elegant text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6">
            {t('hero.tagline')}
          </p>
          <h1 className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-light tracking-wide text-foreground mb-2">
            Corine
          </h1>
          <p className="font-serif-display text-3xl md:text-4xl italic text-primary my-4">&</p>
          <h1 className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-light tracking-wide text-foreground mb-8">
            Ruben
          </h1>

          <div className="w-24 h-px bg-primary mx-auto mb-8" />

          <p className="font-serif-body text-xl md:text-2xl tracking-wider text-muted-foreground mb-12">
            {t('hero.date')}
          </p>

          {/* Countdown */}
          <div className="flex gap-6 md:gap-10 justify-center mb-12">
            {[
              { value: countdown.days, label: t('countdown.days') },
              { value: countdown.hours, label: t('countdown.hours') },
              { value: countdown.minutes, label: t('countdown.minutes') },
              { value: countdown.seconds, label: t('countdown.seconds') },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="text-center"
              >
                <span className="font-serif-display text-3xl md:text-5xl text-foreground block">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2 block">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link
              to="/rsvp"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground font-sans-elegant text-sm tracking-[0.15em] uppercase rounded hover:bg-primary/90 transition-colors"
            >
              {t('hero.cta')}
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="font-sans-elegant text-xs tracking-wider text-muted-foreground">
            {t('hero.scroll')}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator" />
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
