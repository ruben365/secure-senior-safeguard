import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const Story = () => {
  const { t } = useLanguage();

  const events = [
    { titleKey: 'story.event1.title', descKey: 'story.event1.description', dateKey: 'story.event1.date', icon: '💫' },
    { titleKey: 'story.event2.title', descKey: 'story.event2.description', dateKey: 'story.event2.date', icon: '🌹' },
    { titleKey: 'story.event3.title', descKey: 'story.event3.description', dateKey: 'story.event3.date', icon: '✈️' },
    { titleKey: 'story.event4.title', descKey: 'story.event4.description', dateKey: 'story.event4.date', icon: '🏡' },
    { titleKey: 'story.event5.title', descKey: 'story.event5.description', dateKey: 'story.event5.date', icon: '💍' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif-display text-4xl md:text-5xl text-foreground mb-4">{t('story.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground">{t('story.subtitle')}</p>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          {events.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex items-start mb-12 ${
                i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-2 z-10 ring-4 ring-background" />

              {/* Content */}
              <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
                  <span className="text-2xl mb-2 block">{event.icon}</span>
                  <span className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-primary">{t(event.dateKey)}</span>
                  <h3 className="font-serif-display text-xl text-foreground mt-2 mb-3">{t(event.titleKey)}</h3>
                  <p className="font-serif-body text-base text-muted-foreground leading-relaxed">{t(event.descKey)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Story;
