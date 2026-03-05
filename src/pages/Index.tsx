import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { ChevronDown, Heart, MapPin, Calendar, Clock, Utensils, Camera, Gift } from 'lucide-react';
import heroImg from '@/assets/hero-wedding.jpg';
import flowersImg from '@/assets/flowers-lavender.jpg';
import ringsImg from '@/assets/rings.jpg';
import venueImg from '@/assets/venue.jpg';
import coupleImg from '@/assets/couple-lavender.jpg';
import cakeImg from '@/assets/cake.jpg';

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

  const highlights = [
    { icon: Calendar, titleKey: 'hero.tagline', descKey: 'hero.date', img: flowersImg },
    { icon: MapPin, titleKey: 'details.ceremony', descKey: 'details.ceremony.location', img: venueImg },
    { icon: Utensils, titleKey: 'details.reception', descKey: 'details.reception.location', img: cakeImg },
  ];

  const features = [
    { icon: Heart, label: t('nav.story'), desc: t('story.subtitle'), to: '/story' },
    { icon: Camera, label: t('nav.gallery'), desc: t('gallery.subtitle'), to: '/gallery' },
    { icon: Gift, label: t('nav.registry'), desc: t('registry.subtitle'), to: '/registry' },
    { icon: Clock, label: t('nav.rsvp'), desc: t('rsvp.subtitle'), to: '/rsvp' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* ===== HERO SECTION ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-4 overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/70 dark:bg-background/85" />
        </div>

        {/* Gradient blobs */}
        <div className="floating-blob w-[600px] h-[600px] bg-primary/20 top-[-200px] right-[-150px]" />
        <div className="floating-blob w-[500px] h-[500px] bg-accent/25 bottom-[-100px] left-[-120px]" />

        {/* Floating widget cards */}
        <motion.div
          animate={{ y: [-12, 12, -12] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-6 md:left-16 glass-card rounded-2xl p-3 hidden md:flex items-center gap-3 shadow-soft z-20"
        >
          <img src={flowersImg} alt="" className="w-12 h-12 rounded-xl object-cover" />
          <div>
            <p className="font-sans-elegant text-xs font-semibold text-foreground">15 Août 2027</p>
            <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('hero.tagline')}</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [10, -15, 10] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-44 right-6 md:right-16 glass-card rounded-2xl overflow-hidden hidden md:block shadow-soft z-20"
        >
          <img src={ringsImg} alt="" className="w-32 h-24 object-cover" />
          <div className="p-2 text-center">
            <p className="font-sans-elegant text-[10px] font-medium text-primary">💍 Forever</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [-8, 14, -8] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-44 left-10 md:left-32 glass-card rounded-2xl p-3 hidden lg:flex items-center gap-2 shadow-soft z-20"
        >
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="font-sans-elegant text-[10px] font-medium text-foreground">{t('details.ceremony.location')}</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [12, -10, 12] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-36 right-8 md:right-28 glass-card rounded-2xl overflow-hidden hidden lg:block shadow-soft z-20"
        >
          <img src={venueImg} alt="" className="w-28 h-20 object-cover" />
          <div className="p-2 text-center">
            <p className="font-sans-elegant text-[10px] text-muted-foreground">🥂 {t('nav.details')}</p>
          </div>
        </motion.div>

        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center relative z-10 max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block px-5 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 mb-8"
          >
            <p className="font-sans-elegant text-xs tracking-[0.3em] uppercase text-muted-foreground">
              {t('hero.tagline')}
            </p>
          </motion.div>

          <h1 className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-semibold tracking-wide text-foreground mb-2">
            Corine
          </h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="my-6"
          >
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary shadow-glow">
              <span className="text-primary-foreground text-3xl font-serif-display">&</span>
            </span>
          </motion.div>
          <h1 className="font-serif-display text-6xl md:text-8xl lg:text-9xl font-semibold tracking-wide text-foreground mb-10">
            Ruben
          </h1>

          <p className="font-serif-body text-xl md:text-2xl tracking-wider text-muted-foreground mb-14">
            {t('hero.date')}
          </p>

          {/* Countdown */}
          <div className="flex gap-3 md:gap-5 justify-center mb-14">
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
                className="glass-card rounded-2xl px-4 py-4 md:px-7 md:py-5 min-w-[68px] md:min-w-[90px] text-center"
              >
                <span className="font-serif-display text-2xl md:text-4xl text-foreground block font-bold">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="font-sans-elegant text-[9px] md:text-xs tracking-[0.15em] uppercase text-muted-foreground mt-1 block">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/rsvp"
              className="inline-flex items-center gap-2 px-9 py-4 gradient-primary text-primary-foreground font-sans-elegant text-sm font-medium tracking-[0.12em] uppercase rounded-full hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              {t('hero.cta')}
            </Link>
            <Link
              to="/story"
              className="inline-flex items-center gap-2 px-9 py-4 bg-card/80 backdrop-blur-sm border border-border/60 text-foreground font-sans-elegant text-sm font-medium tracking-[0.12em] uppercase rounded-full hover:border-primary/50 hover:shadow-soft transition-all duration-500"
            >
              {t('nav.story')}
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 flex flex-col items-center gap-2 z-10"
        >
          <span className="font-sans-elegant text-xs tracking-wider text-muted-foreground">{t('hero.scroll')}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground animate-scroll-indicator" />
        </motion.div>
      </section>

      {/* ===== ABOUT / INTRO SECTION ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="floating-blob w-[400px] h-[400px] bg-accent/15 top-0 right-[-100px]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img
                  src={coupleImg}
                  alt="Corine & Ruben"
                  className="rounded-3xl w-full object-cover aspect-[4/5] shadow-card-hover"
                />
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-sans-elegant text-sm font-bold text-foreground">4+ {t('countdown.years') || 'Years'}</p>
                      <p className="font-sans-elegant text-[10px] text-muted-foreground">{t('story.subtitle')}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 mb-5">
                <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground">{t('nav.story')}</p>
              </div>
              <h2 className="font-serif-display text-3xl md:text-5xl text-foreground mb-6 font-semibold leading-tight">
                {t('story.title')}
              </h2>
              <p className="font-serif-body text-lg text-muted-foreground leading-relaxed mb-4">
                {t('story.event1.description')}
              </p>
              <p className="font-serif-body text-lg text-muted-foreground leading-relaxed mb-8">
                {t('story.event5.description')}
              </p>
              <Link
                to="/story"
                className="inline-flex items-center gap-2 px-7 py-3 gradient-primary text-primary-foreground font-sans-elegant text-sm font-medium tracking-[0.1em] uppercase rounded-full hover:shadow-glow transition-all duration-500 hover:scale-105"
              >
                {t('nav.story')} →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== HIGHLIGHTS / FEATURES CARDS ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="floating-blob w-[500px] h-[500px] bg-primary/10 bottom-[-100px] left-[-150px]" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground">{t('nav.details')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">{t('details.title')}</h2>
            <p className="font-serif-body text-lg text-muted-foreground max-w-lg mx-auto">{t('details.subtitle')}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group"
              >
                <div className="glass-card rounded-3xl overflow-hidden hover:shadow-card-hover transition-all duration-500">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.img}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-primary-foreground" />
                        </div>
                        <p className="font-sans-elegant text-sm font-semibold text-foreground">{t(item.titleKey)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-serif-body text-base text-muted-foreground">{t(item.descKey)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS / COUNTER SECTION ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-soft" />
        <div className="floating-blob w-[400px] h-[400px] bg-primary/15 top-[-80px] right-[-80px]" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={flowersImg} alt="" className="w-20 h-20 rounded-full object-cover mx-auto mb-6 ring-4 ring-primary/20 shadow-glow" />
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-12">
              {t('hero.tagline')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: countdown.days, label: t('countdown.days'), icon: '📅' },
              { value: '150+', label: t('stats.guests') || 'Guests Invited', icon: '👥' },
              { value: '5', label: t('stats.courses') || 'Course Dinner', icon: '🍽️' },
              { value: '∞', label: t('stats.love') || 'Love', icon: '💜' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:shadow-card-hover transition-all duration-500"
              >
                <span className="text-3xl mb-3 block">{stat.icon}</span>
                <span className="font-serif-display text-3xl md:text-4xl font-bold gradient-text block mb-2">
                  {typeof stat.value === 'number' ? String(stat.value).padStart(2, '0') : stat.value}
                </span>
                <span className="font-sans-elegant text-xs tracking-[0.15em] uppercase text-muted-foreground">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== EXPLORE / QUICK NAV SECTION ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="floating-blob w-[400px] h-[400px] bg-accent/15 bottom-[-80px] right-[-100px]" />
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">
              {t('explore.title') || 'Explore Our Wedding'}
            </h2>
            <p className="font-serif-body text-lg text-muted-foreground max-w-md mx-auto">
              {t('explore.subtitle') || 'Everything you need to know'}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={feat.to}
                  className="glass-card rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-card-hover hover:border-primary/30 transition-all duration-500 group block h-full"
                >
                  <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mb-5 group-hover:shadow-glow group-hover:scale-110 transition-all duration-500">
                    <feat.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="font-sans-elegant text-sm font-semibold text-foreground mb-2 tracking-wide">{feat.label}</h3>
                  <p className="font-serif-body text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 gradient-soft" />
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-secondary/80 border border-border/50 mb-5">
              <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground">{t('nav.gallery')}</p>
            </div>
            <h2 className="font-serif-display text-3xl md:text-5xl text-foreground font-semibold mb-4">{t('gallery.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[heroImg, flowersImg, ringsImg, venueImg, coupleImg, cakeImg].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`overflow-hidden rounded-2xl ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover aspect-square hover:scale-110 transition-transform duration-700 cursor-pointer"
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-8 py-3.5 gradient-primary text-primary-foreground font-sans-elegant text-sm font-medium tracking-[0.1em] uppercase rounded-full hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              {t('nav.gallery')} →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA / RSVP SECTION ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="floating-blob w-[500px] h-[500px] bg-primary/20 top-[-100px] left-[-100px]" />
        <div className="floating-blob w-[400px] h-[400px] bg-accent/20 bottom-[-80px] right-[-80px]" />

        <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={ringsImg} alt="" className="w-24 h-24 rounded-full object-cover mx-auto mb-8 ring-4 ring-primary/20 shadow-glow" />
            <h2 className="font-serif-display text-4xl md:text-6xl text-foreground font-semibold mb-6">
              {t('rsvp.title')}
            </h2>
            <p className="font-serif-body text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg mx-auto">
              {t('rsvp.subtitle')}
            </p>
            <Link
              to="/rsvp"
              className="inline-flex items-center gap-2 px-10 py-4 gradient-primary text-primary-foreground font-sans-elegant text-sm font-semibold tracking-[0.15em] uppercase rounded-full hover:shadow-glow transition-all duration-500 hover:scale-105"
            >
              {t('hero.cta')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;