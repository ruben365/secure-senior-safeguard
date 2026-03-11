import { useState, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import { Input } from '@/components/ui/input';

const EmbeddedPaymentForm = lazy(() => import('@/components/EmbeddedPaymentForm'));
const LazyDialog = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.Dialog })));
const LazyDialogContent = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.DialogContent })));
const LazyDialogHeader = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.DialogHeader })));
const LazyDialogTitle = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.DialogTitle })));
const LazyDialogDescription = lazy(() => import('@/components/ui/dialog').then(m => ({ default: m.DialogDescription })));
const LazyDrawer = lazy(() => import('@/components/ui/drawer').then(m => ({ default: m.Drawer })));
const LazyDrawerContent = lazy(() => import('@/components/ui/drawer').then(m => ({ default: m.DrawerContent })));
const LazyDrawerHeader = lazy(() => import('@/components/ui/drawer').then(m => ({ default: m.DrawerHeader })));
const LazyDrawerTitle = lazy(() => import('@/components/ui/drawer').then(m => ({ default: m.DrawerTitle })));
const LazyDrawerDescription = lazy(() => import('@/components/ui/drawer').then(m => ({ default: m.DrawerDescription })));

const giftTiers = [
  { amount: 60, emoji: '💐', labelKey: 'registry.tier.bouquet' },
  { amount: 100, emoji: '🥂', labelKey: 'registry.tier.toast' },
  { amount: 200, emoji: '✨', labelKey: 'registry.tier.sparkle' },
  { amount: 500, emoji: '💎', labelKey: 'registry.tier.diamond' },
];

const GiftFAB = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [giftOpen, setGiftOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);

  const handleSelectTier = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setGiftOpen(false);
    setPaymentFormOpen(true);
  };

  const handleCustomGift = () => {
    const val = parseInt(customAmount);
    if (val && val > 0) {
      setSelectedAmount(val);
      setGiftOpen(false);
      setPaymentFormOpen(true);
    }
  };

  return (
    <>
      {/* Floating Gift Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 15px rgba(201,169,182,0.3)',
            '0 0 30px rgba(201,169,182,0.6)',
            '0 0 15px rgba(201,169,182,0.3)',
          ],
        }}
        transition={{
          delay: 2,
          type: 'spring',
          scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
          boxShadow: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
        }}
        onClick={() => setGiftOpen(true)}
        className={`fixed z-40 rounded-full gradient-primary shadow-glow flex items-center justify-center hover:scale-110 transition-transform duration-300 group ${
          isMobile ? 'bottom-20 right-4 w-12 h-12' : 'bottom-8 right-8 w-14 h-14'
        }`}
        aria-label="Gift"
      >
        <motion.div
          animate={{ rotate: [0, -15, 15, -10, 10, 0], y: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut', repeatDelay: 1 }}
        >
          <Gift className="w-6 h-6 text-primary-foreground" />
        </motion.div>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 animate-pulse" />
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-gold"
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              x: [0, (i - 1) * 20],
              y: [0, -15 - i * 8],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              delay: i * 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.button>

      {/* Gift Picker Dialog/Drawer */}
      <Suspense fallback={null}>
        {isMobile ? (
          <LazyDrawer open={giftOpen} onOpenChange={setGiftOpen}>
            <LazyDrawerContent className="px-4 pb-8 max-h-[85vh]">
              <LazyDrawerHeader className="text-center">
                <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-2 shadow-glow">
                  <Gift className="w-6 h-6 text-primary-foreground" />
                </div>
                <LazyDrawerTitle className="font-serif-display text-xl">{t('registry.title')}</LazyDrawerTitle>
                <LazyDrawerDescription className="font-sans-elegant text-muted-foreground text-sm">
                  {t('registry.message')}
                </LazyDrawerDescription>
              </LazyDrawerHeader>
              <div className="grid grid-cols-2 gap-3 pt-2 px-1">
                {giftTiers.map((tier, i) => (
                  <motion.button
                    key={tier.amount}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSelectTier(tier.amount)}
                    className="glass-card rounded-2xl p-4 text-center active:bg-primary/10 transition-colors min-h-[88px] flex flex-col items-center justify-center"
                  >
                    <div className="text-2xl mb-1.5">{tier.emoji}</div>
                    <div className="font-serif-display text-lg text-foreground font-bold">${tier.amount}</div>
                    <div className="font-sans-elegant text-[10px] text-muted-foreground font-medium mt-0.5">{t(tier.labelKey)}</div>
                  </motion.button>
                ))}
              </div>
              <div className="pt-4 px-1">
                <div className="glass-card-strong rounded-2xl p-4">
                  <p className="font-sans-elegant text-xs font-bold text-foreground mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    {t('gift.customAmount')}
                  </p>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground font-serif-display text-lg font-bold">$</span>
                      <Input
                        type="number"
                        min="1"
                        inputMode="numeric"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder=""
                        className="font-serif-display text-lg font-bold rounded-full h-14 pl-9 border-primary/30 bg-primary/5 focus:ring-primary/30"
                      />
                    </div>
                    <button onClick={handleCustomGift} className="btn-primary px-5 rounded-full text-sm whitespace-nowrap h-14">
                      <Gift className="w-4 h-4" />
                      {t('registry.give')}
                    </button>
                  </div>
                </div>
              </div>
            </LazyDrawerContent>
          </LazyDrawer>
        ) : (
          <LazyDialog open={giftOpen} onOpenChange={setGiftOpen}>
            <LazyDialogContent className="max-w-md">
              <LazyDialogHeader>
                <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-3 shadow-glow">
                  <Gift className="w-7 h-7 text-primary-foreground" />
                </div>
                <LazyDialogTitle className="font-serif-display text-2xl text-center">{t('registry.title')}</LazyDialogTitle>
                <LazyDialogDescription className="font-sans-elegant text-center text-muted-foreground">
                  {t('registry.message')}
                </LazyDialogDescription>
              </LazyDialogHeader>
              <div className="grid grid-cols-2 gap-3 pt-2">
                {giftTiers.map((tier, i) => (
                  <motion.button
                    key={tier.amount}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleSelectTier(tier.amount)}
                    className="glass-card rounded-2xl p-5 text-center card-hover group"
                  >
                    <div className="text-2xl mb-2">{tier.emoji}</div>
                    <div className="font-serif-display text-xl text-foreground font-bold">${tier.amount}</div>
                    <div className="font-sans-elegant text-[10px] text-muted-foreground font-medium mt-1">{t(tier.labelKey)}</div>
                  </motion.button>
                ))}
              </div>
              <div className="pt-3">
                <div className="glass-card-strong rounded-2xl p-4">
                  <p className="font-sans-elegant text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    {t('gift.customAmount')}
                  </p>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground font-serif-display text-lg font-bold">$</span>
                      <Input
                        type="number"
                        min="1"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        placeholder=""
                        className="font-serif-display text-lg font-bold rounded-full h-12 pl-9 border-primary/30 bg-primary/5 focus:ring-primary/30"
                      />
                    </div>
                    <button onClick={handleCustomGift} className="btn-primary px-6 rounded-full text-sm whitespace-nowrap">
                      <Gift className="w-4 h-4" />
                      {t('registry.give')}
                    </button>
                  </div>
                </div>
              </div>
            </LazyDialogContent>
          </LazyDialog>
        )}
      </Suspense>

      {/* Embedded Payment Form */}
      {paymentFormOpen && (
        <Suspense fallback={null}>
          <EmbeddedPaymentForm
            open={paymentFormOpen}
            onOpenChange={setPaymentFormOpen}
            selectedAmount={selectedAmount}
          />
        </Suspense>
      )}
    </>
  );
};

export default GiftFAB;
