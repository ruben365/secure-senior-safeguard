import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Gift, Heart, ExternalLink } from 'lucide-react';

const registries = [
  { name: 'Amazon', url: '#', icon: '🎁' },
  { name: 'Crate & Barrel', url: '#', icon: '🏠' },
  { name: 'Honeymoon Fund', url: '#', icon: '✈️' },
];

const Registry = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif-display text-4xl md:text-5xl text-foreground mb-4">{t('registry.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground">{t('registry.subtitle')}</p>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-8 text-center mb-10"
        >
          <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
          <p className="font-serif-body text-base text-muted-foreground leading-relaxed">{t('registry.message')}</p>
        </motion.div>

        <div className="space-y-4">
          {registries.map((reg, i) => (
            <motion.a
              key={reg.name}
              href={reg.url}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl">{reg.icon}</span>
                <span className="font-sans-elegant text-foreground font-medium">{reg.name}</span>
              </div>
              <div className="flex items-center gap-2 text-primary">
                <span className="font-sans-elegant text-sm">{t('registry.link')}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Registry;
