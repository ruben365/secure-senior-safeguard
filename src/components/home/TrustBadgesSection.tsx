import { Shield, Award, Clock, Heart, CheckCircle2, MapPin } from "lucide-react";
import { SITE } from "@/config/site";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const trustIndicators = [
  {
    icon: Shield,
    title: "Veteran-Founded",
    description: "Built by veterans who understand the importance of protecting what matters.",
    stat: "Est. 2024",
    gradient: "from-primary/20 to-accent/5",
  },
  {
    icon: MapPin,
    title: "Ohio-Based",
    description: `Local, personalized cybersecurity for ${SITE.location.areaLabel}.`,
    stat: "Local Team",
    gradient: "from-accent/20 to-primary/5",
  },
  {
    icon: Clock,
    title: "24/7 Human Support",
    description: "Real people ready to help when you need us. No bots, ever.",
    stat: "Always On",
    gradient: "from-primary/15 to-accent/10",
  },
  {
    icon: Heart,
    title: "Family-First",
    description: "Every client is part of our extended family. Your safety is personal.",
    stat: "5,000+",
    gradient: "from-accent/15 to-primary/10",
  },
];

const guarantees = [
  `${SITE.moneyBackGuaranteeDays}-Day Money-Back Guarantee`,
  "Privacy-First Practices",
  `${SITE.veteranDiscountPercent}% Veteran & Senior Discount`,
  "Same-Day Threat Response",
];

export const TrustBadgesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-16 md:py-28 bg-muted/30 relative overflow-hidden" ref={ref}>
      {/* Decorative */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-12 relative">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            Why Choose Us
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Built on Trust & Integrity
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            We're your neighbors, committed to keeping Ohio families safe.
          </p>
        </motion.div>

        {/* Trust Grid — 3D glassmorphism cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14" style={{ perspective: 1200 }}>
          {trustIndicators.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
              whileHover={{
                y: -10,
                rotateX: -4,
                rotateY: 5,
                scale: 1.03,
                boxShadow: "0 30px 60px -15px hsl(288 25% 20% / 0.2)",
              }}
              className="relative p-6 rounded-2xl border border-border/50 bg-card text-center overflow-hidden shadow-3d cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 pointer-events-none`} />
              {/* Top-lit highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent" />

              <div className="relative" style={{ transform: "translateZ(12px)" }}>
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center mx-auto mb-4 shadow-sm border border-primary/10"
                  whileHover={{ rotate: 8, scale: 1.1 }}
                >
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="pt-3 border-t border-border/50">
                  <p className="text-xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{item.stat}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantees Bar — 3D elevated */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateX: 8 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ y: -4, boxShadow: "0 20px 40px -10px hsl(288 25% 20% / 0.12)" }}
          className="rounded-2xl border border-border/50 bg-card p-7 shadow-3d overflow-hidden relative"
          style={{ transformStyle: "preserve-3d", perspective: 800 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {guarantees.map((text) => (
              <motion.div
                key={text}
                className="flex items-center gap-3"
                whileHover={{ x: 4 }}
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
