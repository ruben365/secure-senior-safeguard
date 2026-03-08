import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { MapPin, Clock, Car, Train, ParkingCircle, Hotel, ExternalLink, Church, PartyPopper, Camera, Music, Cake, Sparkles, Waves } from 'lucide-react';

const CEREMONY_ADDRESS = '123 Rue des Roses, Brussels, Belgium';
const CEREMONY_MAPS_URL = 'https://maps.google.com/?q=Brussels+Belgium';
const RECEPTION_ADDRESS = '45 Avenue de la Fête, Brussels, Belgium';
const RECEPTION_MAPS_URL = 'https://maps.google.com/?q=Brussels+Belgium';

const SCHEDULE = [
  { time: '13:30', icon: Sparkles, key: 'schedule.guestArrival', color: 'text-dusty-rose' },
  { time: '14:00', icon: Church, key: 'schedule.ceremony', color: 'text-primary' },
  { time: '15:30', icon: Camera, key: 'schedule.cocktail', color: 'text-amber-400' },
  { time: '18:00', icon: PartyPopper, key: 'schedule.dinner', color: 'text-emerald-400' },
  { time: '20:00', icon: Waves, key: 'schedule.firstDance', color: 'text-primary' },
  { time: '20:30', icon: Cake, key: 'schedule.cake', color: 'text-dusty-rose' },
  { time: '21:00', icon: Music, key: 'schedule.dancing', color: 'text-violet-400' },
  { time: '00:00', icon: Sparkles, key: 'schedule.sendoff', color: 'text-amber-400' },
];

const HOTELS = [
  { name: 'Hotel Amigo', stars: 5, distance: '0.8 km', price: '€€€', url: '#', desc: 'Luxurious 5-star in the heart of Brussels' },
  { name: 'Marriott Grand Place', stars: 4, distance: '1.2 km', price: '€€€', url: '#', desc: 'Elegant hotel steps from the Grand Place' },
  { name: 'NH Brussels Centre', stars: 4, distance: '1.5 km', price: '€€', url: '#', desc: 'Modern comfort, excellent value' },
  { name: 'Ibis Brussels Centre', stars: 3, distance: '2.0 km', price: '€', url: '#', desc: 'Budget-friendly with great transport links' },
];

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const Venue = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl relative z-10">

        {/* Header */}
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="text-center mb-14">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('venue.badge')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('venue.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground max-w-md mx-auto" style={{ lineHeight: 1.6 }}>
            {t('venue.subtitle')}
          </p>
        </motion.div>

        {/* Ceremony & Reception cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {[
            { icon: Church, label: t('venue.ceremony'), address: CEREMONY_ADDRESS, url: CEREMONY_MAPS_URL, time: '14:00', emoji: '⛪' },
            { icon: PartyPopper, label: t('venue.reception'), address: RECEPTION_ADDRESS, url: RECEPTION_MAPS_URL, time: '18:00', emoji: '🎉' },
          ].map(({ label, address, url, time, emoji }, i) => (
            <motion.div
              key={label}
              initial="hidden" animate="show" variants={fadeUp}
              transition={{ delay: i * 0.1 }}
              className="glass-card-strong rounded-3xl p-7"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl glass-card flex items-center justify-center text-2xl flex-shrink-0">
                  {emoji}
                </div>
                <div>
                  <p className="font-sans-elegant text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">{label}</p>
                  <p className="font-serif-display text-xl font-semibold text-foreground">{time}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 mb-4">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="font-sans-elegant text-sm text-muted-foreground">{address}</p>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-primary text-xs font-semibold"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {t('venue.getDirections')}
              </a>
            </motion.div>
          ))}
        </div>

        {/* Map embed */}
        <motion.div
          initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }}
          className="glass-card-strong rounded-3xl overflow-hidden mb-10"
        >
          <iframe
            title="Venue location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d80677.50867478485!2d4.302697!3d50.846557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3a4ed73c76867%3A0xb1e9dcd85ebb9c86!2sBrussels%2C%20Belgium!5e0!3m2!1sen!2sbe!4v1710000000000"
            width="100%"
            height="280"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Day Schedule */}
        <motion.div
          initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.25 }}
          className="glass-card-strong rounded-3xl p-8 mb-10"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-serif-display text-2xl font-semibold text-foreground">{t('venue.schedule')}</h2>
          </div>

          <div className="space-y-0">
            {SCHEDULE.map(({ time, icon: Icon, key, color }, i) => (
              <div key={key} className="flex gap-4 group">
                {/* Timeline */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full glass-card border border-border/50 flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {i < SCHEDULE.length - 1 && (
                    <div className="w-px flex-1 bg-border/40 my-1" style={{ minHeight: '28px' }} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-5 pt-0.5">
                  <span className="font-sans-elegant text-xs font-bold text-primary tracking-wide">{time}</span>
                  <p className="font-sans-elegant text-sm text-foreground font-medium mt-0.5">{t(key)}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Getting There */}
        <motion.div
          initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.3 }}
          className="glass-card-strong rounded-3xl p-8 mb-10"
        >
          <h2 className="font-serif-display text-2xl font-semibold text-foreground mb-6">{t('venue.gettingThere')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: Car,
                label: t('venue.byCar'),
                desc: 'Take the E40 motorway toward Brussels Centre, exit at Rue de la Loi. Free street parking available nearby on weekends.',
              },
              {
                icon: Train,
                label: t('venue.byTransit'),
                desc: 'Metro Line 1 or 5 to "Arts-Loi". Trams 92 & 94 also stop nearby. Journey ~15 min from Brussels-Midi station.',
              },
              {
                icon: ParkingCircle,
                label: t('venue.parking'),
                desc: 'Parking Cinquantenaire (0.5 km) and Parking Louise (0.9 km) offer paid underground parking from €3/hour.',
              },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="glass-card rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <p className="font-sans-elegant text-sm font-semibold text-foreground mb-2">{label}</p>
                <p className="font-sans-elegant text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Accommodation */}
        <motion.div
          initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.35 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl glass-card flex items-center justify-center">
              <Hotel className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-serif-display text-2xl font-semibold text-foreground">{t('venue.accommodation')}</h2>
              <p className="font-sans-elegant text-xs text-muted-foreground">{t('venue.accommodation.subtitle')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOTELS.map((hotel, i) => (
              <motion.div
                key={hotel.name}
                initial="hidden" animate="show" variants={fadeUp}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="glass-card-strong rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-sans-elegant text-sm font-semibold text-foreground">{hotel.name}</p>
                    <span className="font-sans-elegant text-xs font-bold text-primary">{hotel.price}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: hotel.stars }).map((_, j) => (
                      <span key={j} className="text-amber-400 text-xs">★</span>
                    ))}
                  </div>
                  <p className="font-sans-elegant text-xs text-muted-foreground mb-3">{hotel.desc}</p>
                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="font-sans-elegant text-xs text-muted-foreground">{hotel.distance} from venue</span>
                  </div>
                </div>
                <a
                  href={hotel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline font-sans-elegant"
                >
                  <ExternalLink className="w-3 h-3" />
                  {t('venue.bookNow')}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Venue;
