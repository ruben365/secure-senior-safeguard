import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ_ITEMS = [
  {
    q: { fr: 'Quel est le code vestimentaire ?', en: 'What is the dress code?', es: '¿Cuál es el código de vestimenta?' },
    a: { fr: 'Tenue de soirée conseillée — robes longues ou cocktail pour les femmes, costume ou smoking pour les hommes. Nous vous invitons à exprimer votre style avec élégance. Évitez le blanc et le noir intégral.', en: 'Smart evening attire — long or cocktail dresses for women, suit or tuxedo for men. We encourage you to express your style elegantly. Please avoid all-white or all-black outfits.', es: 'Ropa de etiqueta — vestidos largos o de cóctel para las mujeres, traje o esmoquin para los hombres. Evita el blanco completo o negro completo.' },
  },
  {
    q: { fr: 'Puis-je venir avec un accompagnant ?', en: 'Can I bring a plus-one?', es: '¿Puedo traer un acompañante?' },
    a: { fr: 'Les accompagnants doivent être indiqués dans votre RSVP. Si vous souhaitez en ajouter un, veuillez nous contacter directement via la page Questions.', en: 'Plus-ones must be listed in your RSVP. If you\'d like to add one, please contact us directly via the Enquiries page.', es: 'Los acompañantes deben listarse en tu RSVP. Si deseas agregar uno, contáctanos a través de la página de Preguntas.' },
  },
  {
    q: { fr: 'Les enfants sont-ils les bienvenus ?', en: 'Are children welcome?', es: '¿Los niños son bienvenidos?' },
    a: { fr: 'Oui ! Notre mariage est un événement familial. Des espaces et activités seront prévus pour les plus petits pendant la soirée.', en: 'Yes! Our wedding is a family-friendly event. Spaces and activities will be available for little ones throughout the evening.', es: 'Sí, nuestra boda es un evento familiar. Habrá espacios y actividades para los más pequeños durante la velada.' },
  },
  {
    q: { fr: 'Quelles options alimentaires sont disponibles ?', en: 'What dietary options are available?', es: '¿Qué opciones dietéticas hay?' },
    a: { fr: 'Des options végétariennes, véganes et sans gluten seront disponibles. Veuillez indiquer vos restrictions lors de votre RSVP ou nous contacter à l\'avance.', en: 'Vegetarian, vegan, and gluten-free options will be available. Please indicate your dietary requirements during RSVP or contact us in advance.', es: 'Habrá opciones vegetarianas, veganas y sin gluten. Indica tus restricciones durante el RSVP o contáctanos con anticipación.' },
  },
  {
    q: { fr: 'Quelle est la date limite pour répondre au RSVP ?', en: 'What is the RSVP deadline?', es: '¿Cuál es la fecha límite del RSVP?' },
    a: { fr: 'Nous vous demandons de confirmer votre présence avant le 1er juin 2027, afin que nous puissions organiser au mieux votre accueil.', en: 'Please confirm your attendance by June 1, 2027, so we can make the best arrangements for your arrival.', es: 'Por favor confirma tu asistencia antes del 1 de junio de 2027, para que podamos hacer los mejores arreglos.' },
  },
  {
    q: { fr: 'Y a-t-il du stationnement sur place ?', en: 'Is there parking available?', es: '¿Hay estacionamiento disponible?' },
    a: { fr: 'Un parking payant se trouve à 0,5 km du lieu de réception. La rue est également gratuite le week-end. Nous vous recommandons de covoiturer ou d\'utiliser les transports en commun.', en: 'Paid parking is available 0.5 km from the venue. Street parking is free on weekends. We recommend carpooling or using public transit.', es: 'Hay estacionamiento de pago a 0.5 km del lugar. El estacionamiento en calle es gratuito los fines de semana. Recomendamos compartir coche o usar transporte público.' },
  },
  {
    q: { fr: 'Peut-on prendre des photos pendant la cérémonie ?', en: 'Can I take photos during the ceremony?', es: '¿Puedo tomar fotos durante la ceremonia?' },
    a: { fr: 'Nous vous demandons de ranger vos appareils photo et téléphones pendant la cérémonie afin de vivre pleinement le moment. Le photographe officiel capturera tout ! Les photos sont les bienvenues pendant le cocktail et la réception.', en: 'We ask guests to put away cameras and phones during the ceremony so everyone can be present in the moment. Our photographer will capture everything! Photos are very welcome during the cocktail hour and reception.', es: 'Pedimos a los invitados que guarden cámaras y teléfonos durante la ceremonia. Nuestro fotógrafo lo capturará todo. ¡Las fotos son bienvenidas durante el cóctel y la recepción!' },
  },
  {
    q: { fr: 'Comment puis-je offrir un cadeau ?', en: 'How can I give a gift?', es: '¿Cómo puedo dar un regalo?' },
    a: { fr: 'Nous préférons les cadeaux en espèces pour contribuer à notre voyage de noces et à notre nouveau foyer. Vous pouvez offrir via notre page Cadeaux sur ce site. Votre présence est déjà le plus beau des cadeaux !', en: 'We prefer monetary gifts to contribute to our honeymoon and new home. You can give via our Gifts page on this website. Your presence is already the greatest gift!', es: 'Preferimos regalos en efectivo para nuestro viaje de luna de miel y nuevo hogar. Puedes dar a través de nuestra página de Regalos. ¡Tu presencia ya es el mejor regalo!' },
  },
  {
    q: { fr: 'À quelle heure dois-je arriver ?', en: 'What time should I arrive?', es: '¿A qué hora debo llegar?' },
    a: { fr: 'La cérémonie commence à 14h00. Nous vous demandons d\'arriver entre 13h15 et 13h45 pour vous installer confortablement. L\'accueil aura lieu dès 13h30.', en: 'The ceremony begins at 14:00. Please arrive between 13:15 and 13:45 to get settled comfortably. Guest arrival starts at 13:30.', es: 'La ceremonia comienza a las 14:00. Por favor llega entre las 13:15 y las 13:45 para instalarte cómodamente. La bienvenida comienza a las 13:30.' },
  },
  {
    q: { fr: 'Y aura-t-il du transport organisé ?', en: 'Will there be organised transport?', es: '¿Habrá transporte organizado?' },
    a: { fr: 'Un service de navette sera organisé entre le lieu de cérémonie et le lieu de réception. Plus de détails seront communiqués à l\'approche du grand jour.', en: 'A shuttle service will be arranged between the ceremony and reception venues. More details will be shared as the big day approaches.', es: 'Se organizará un servicio de transporte entre el lugar de la ceremonia y la recepción. Más detalles se compartirán a medida que se acerque el día.' },
  },
];

const FAQ = () => {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-28 pb-20 relative">
      <div className="container mx-auto px-6 md:px-12 max-w-2xl relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-block px-5 py-2 rounded-full glass-card-strong mb-5">
            <p className="font-sans-elegant text-xs tracking-[0.25em] uppercase text-muted-foreground font-medium">{t('faq.badge')}</p>
          </div>
          <h1 className="font-serif-display text-4xl md:text-6xl text-foreground mb-4 font-semibold" style={{ letterSpacing: '-0.5px' }}>
            {t('faq.title')}
          </h1>
          <p className="font-sans-elegant text-base text-muted-foreground">{t('faq.subtitle')}</p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="glass-card-strong rounded-3xl overflow-hidden divide-y divide-border/30 mb-10"
        >
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-7 py-5 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                    <span className="font-sans-elegant text-sm font-semibold text-foreground">
                      {item.q[language]}
                    </span>
                  </div>
                  <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0">
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-7 pb-5 pl-[3.75rem]">
                        <p className="font-sans-elegant text-sm text-muted-foreground leading-relaxed">
                          {item.a[language]}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="glass-card-strong rounded-3xl p-8 text-center"
        >
          <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 text-primary-foreground fill-primary-foreground" />
          </div>
          <h2 className="font-serif-display text-xl font-semibold text-foreground mb-2">{t('faq.stillQuestions')}</h2>
          <p className="font-sans-elegant text-sm text-muted-foreground mb-5">
            {language === 'fr' ? 'Notre équipe est là pour vous aider.' : language === 'es' ? 'Nuestro equipo está aquí para ayudarte.' : 'Our team is here to help.'}
          </p>
          <Link to="/enquiries" className="btn-primary inline-flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            {t('faq.contactUs')}
          </Link>
        </motion.div>

      </div>
    </div>
  );
};

export default FAQ;
