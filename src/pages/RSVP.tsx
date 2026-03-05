import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Info } from 'lucide-react';

const RSVP = () => {
  const { t } = useLanguage();
  const [attending, setAttending] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-serif-display text-4xl md:text-5xl text-foreground mb-4">{t('rsvp.title')}</h1>
          <p className="font-serif-body text-lg text-muted-foreground">{t('rsvp.subtitle')}</p>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        {/* Info banner - database not connected */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="mb-8 border-primary/30 bg-primary/5">
            <CardContent className="p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="font-sans-elegant text-sm text-muted-foreground">{t('rsvp.notready')}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
          onSubmit={e => e.preventDefault()}
        >
          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2">{t('rsvp.code')}</label>
            <Input placeholder={t('rsvp.code.placeholder')} className="font-sans-elegant" />
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-2">{t('rsvp.name')}</label>
            <Input className="font-sans-elegant" />
          </div>

          <div>
            <label className="font-sans-elegant text-sm text-foreground block mb-3">{t('rsvp.attending')}</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setAttending(true)}
                className={`flex-1 py-3 rounded border text-sm font-sans-elegant transition-colors ${
                  attending === true
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                {t('rsvp.yes')}
              </button>
              <button
                type="button"
                onClick={() => setAttending(false)}
                className={`flex-1 py-3 rounded border text-sm font-sans-elegant transition-colors ${
                  attending === false
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border hover:bg-muted'
                }`}
              >
                {t('rsvp.no')}
              </button>
            </div>
          </div>

          {attending && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-6"
            >
              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2">{t('rsvp.meal')}</label>
                <div className="flex gap-2">
                  {['rsvp.meal.meat', 'rsvp.meal.fish', 'rsvp.meal.veg'].map(key => (
                    <button
                      key={key}
                      type="button"
                      className="flex-1 py-2 rounded border border-border text-sm font-sans-elegant hover:bg-muted transition-colors focus:bg-primary focus:text-primary-foreground focus:border-primary"
                    >
                      {t(key)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2">{t('rsvp.dietary')}</label>
                <Textarea placeholder={t('rsvp.dietary.placeholder')} className="font-sans-elegant" />
              </div>

              <div>
                <label className="font-sans-elegant text-sm text-foreground block mb-2">{t('rsvp.plusone')}</label>
                <Input placeholder={t('rsvp.plusone.name')} className="font-sans-elegant" />
              </div>
            </motion.div>
          )}

          <Button type="submit" className="w-full font-sans-elegant tracking-[0.15em] uppercase" disabled>
            {t('rsvp.submit')}
          </Button>
        </motion.form>
      </div>
    </div>
  );
};

export default RSVP;
