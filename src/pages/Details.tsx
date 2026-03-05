import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Church, PartyPopper, Shirt, Hotel, Car } from 'lucide-react';

const Details = () => {
  const { t } = useLanguage();

  const sections = [
    {
      icon: Church,
      title: t('details.ceremony'),
      items: [
        { label: t('details.ceremony.time'), bold: true },
        { label: t('details.ceremony.location'), bold: true },
        { label: t('details.ceremony.address') },
      ],
    },
    {
      icon: PartyPopper,
      title: t('details.reception'),
      items: [
        { label: t('details.reception.time'), bold: true },
        { label: t('details.reception.location'), bold: true },
        { label: t('details.reception.address') },
      ],
    },
    {
      icon: Shirt,
      title: t('details.dresscode'),
      items: [{ label: t('details.dresscode.desc') }],
    },
    {
      icon: Hotel,
      title: t('details.accommodation'),
      items: [{ label: t('details.accommodation.desc') }],
    },
    {
      icon: Car,
      title: t('details.transport'),
      items: [{ label: t('details.transport.desc') }],
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif-display text-4xl md:text-5xl text-foreground mb-4">{t('details.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground">{t('details.subtitle')}</p>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`bg-card border border-border rounded-lg p-8 shadow-sm ${
                i === sections.length - 1 && sections.length % 2 !== 0 ? 'md:col-span-2 md:max-w-md md:mx-auto' : ''
              }`}
            >
              <section.icon className="w-8 h-8 text-primary mb-4" />
              <h2 className="font-serif-display text-2xl text-foreground mb-4">{section.title}</h2>
              <div className="space-y-1">
                {section.items.map((item, j) => (
                  <p
                    key={j}
                    className={`font-serif-body text-base ${
                      item.bold ? 'text-foreground font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
