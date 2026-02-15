import { Shield, Award, Users, Heart, Clock, MapPin, CheckCircle2, Zap } from 'lucide-react';
import { AnimatedSection } from '@/components/AnimatedSection';
import { SITE } from '@/config/site';

const trustIndicators = [
  {
    icon: Shield,
    title: 'Veteran-Founded & Operated',
    description: 'Built by veterans who understand the importance of protecting what matters most',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: MapPin,
    title: 'Proudly Ohio-Based',
    description: `Supporting ${SITE.location.areaLabel} with local, personalized cybersecurity`,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Clock,
    title: '24/7 Real Human Support',
    description: 'No bots, no wait times—real people ready to help when you need us',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Heart,
    title: 'Family-First Approach',
    description: 'We treat every client like family because protecting yours means everything',
    color: 'from-rose-500 to-pink-600',
  },
];

const guarantees = [
  {
    icon: CheckCircle2,
    text: `${SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee`,
  },
  {
    icon: Shield,
    text: 'Privacy-First—Your Data Stays Yours',
  },
  {
    icon: Award,
    text: `${SITE.veteranDiscountPercent}% Veteran & Senior Discount`,
  },
  {
    icon: Zap,
    text: 'Same-Day Response to Threats',
  },
];

export const TrustBadgesSection = () => {
  return (
    <section className="section-padding-lg bg-background">
      <div className="center-container">
        {/* Section Header */}
        <AnimatedSection animation="fade-up">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-widget mb-6">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground/80 tracking-wider uppercase">
                Why Choose Us
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Built on{' '}
              <span className="gradient-text-primary">Trust & Integrity</span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're not just another security company—we're your neighbors, committed to keeping Ohio families safe
            </p>
          </div>
        </AnimatedSection>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {trustIndicators.map((indicator, index) => (
            <AnimatedSection
              key={indicator.title}
              animation="fade-up"
              delay={index * 100}
            >
              <div className="glass-card rounded-2xl card-padding-lg h-full flex flex-col items-center text-center transition-all duration-300 hover:scale-105 group">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${indicator.color} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                  <indicator.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-lg font-bold text-foreground mb-3">
                  {indicator.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {indicator.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Guarantees Bar */}
        <AnimatedSection animation="scale-up">
          <div className="glass-heavy rounded-3xl card-padding-lg specular-highlight">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {guarantees.map((guarantee, index) => (
                <div
                  key={guarantee.text}
                  className="flex items-center gap-3 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <guarantee.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-foreground">
                    {guarantee.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Mission Statement */}
        <AnimatedSection animation="fade-up">
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <div className="glass-card rounded-3xl card-padding-xl">
              <div className="inline-flex items-center gap-2 mb-6">
                <Users className="w-6 h-6 text-primary" />
                <span className="text-sm font-semibold text-foreground/80 uppercase tracking-wider">
                  Our Commitment
                </span>
              </div>

              <p className="text-2xl font-medium text-foreground leading-relaxed mb-6">
                "We started this company because we saw our own loved ones being targeted.
                Every client isn't just a number—you're part of our extended family."
              </p>

              <div className="flex items-center justify-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent" />
                <div className="text-left">
                  <div className="font-semibold text-foreground">The {SITE.name} Team</div>
                  <div className="text-sm">Protecting Ohio Since 2024</div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
