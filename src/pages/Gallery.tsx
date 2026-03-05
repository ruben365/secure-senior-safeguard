import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const placeholderImages = [
  { id: 1, aspect: 'aspect-square' },
  { id: 2, aspect: 'aspect-[3/4]' },
  { id: 3, aspect: 'aspect-square' },
  { id: 4, aspect: 'aspect-[4/3]' },
  { id: 5, aspect: 'aspect-[3/4]' },
  { id: 6, aspect: 'aspect-square' },
  { id: 7, aspect: 'aspect-[4/3]' },
  { id: 8, aspect: 'aspect-square' },
  { id: 9, aspect: 'aspect-[3/4]' },
];

const Gallery = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif-display text-4xl md:text-5xl text-foreground mb-4">{t('gallery.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground">{t('gallery.subtitle')}</p>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {placeholderImages.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="break-inside-avoid"
            >
              <div className={`${img.aspect} rounded-lg bg-muted border border-border overflow-hidden flex items-center justify-center`}>
                <span className="font-serif-display text-4xl text-muted-foreground/30">
                  {i + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
