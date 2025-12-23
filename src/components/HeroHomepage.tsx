import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Lock, Eye, Fingerprint, ShieldCheck, Zap, Globe } from "lucide-react";
import heroSecurityCamera from "@/assets/hero-security-camera.jpg";
import heroHome1 from "@/assets/hero-home-1.jpg";
import heroAbout1 from "@/assets/hero-about-1.jpg";
import heroBusiness1 from "@/assets/hero-business-1.jpg";

const heroImages = [
  { src: heroSecurityCamera, alt: "Security monitoring" },
  { src: heroHome1, alt: "Family protection" },
  { src: heroAbout1, alt: "Professional security" },
  { src: heroBusiness1, alt: "Business security" },
];

const securityFeatures = [
  { icon: Lock, label: "End-to-End Encryption", delay: 0 },
  { icon: Eye, label: "24/7 Threat Monitoring", delay: 0.1 },
  { icon: Fingerprint, label: "Identity Protection", delay: 0.2 },
  { icon: ShieldCheck, label: "Scam Prevention", delay: 0.3 },
];

export const HeroHomepage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[700px] sm:min-h-[750px] md:min-h-[850px] lg:min-h-[900px] overflow-hidden">
      {/* Transitioning Background Images - NO OVERLAY */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Subtle gradient for text readability only */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Animated cyber grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
        
        {/* Floating cyber particles */}
        <motion.div 
          className="absolute top-20 left-[10%] w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(0,255,255,0.8)]"
          animate={{ 
            y: [0, -100, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-40 right-[30%] w-1.5 h-1.5 bg-purple-400 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)]"
          animate={{ 
            y: [0, -80, 0],
            opacity: [0.2, 1, 0.2]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div 
          className="absolute bottom-40 left-[20%] w-3 h-3 bg-accent rounded-full shadow-[0_0_25px_rgba(var(--accent),0.8)]"
          animate={{ 
            y: [0, -60, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="container mx-auto px-4 h-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[700px] sm:min-h-[750px] md:min-h-[850px] lg:min-h-[900px] py-16 lg:py-0">
          
          {/* Left Content */}
          <motion.div 
            className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/20"
            >
              <Shield className="w-4 h-4 text-accent" />
              <span>Veteran-Owned & Ohio-Based</span>
            </motion.div>
            
            {/* Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.1] mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="font-serif italic text-accent">Secure </span>
              <br />
              Protection
              <br />
              <span className="text-white/90">Starts Here</span>
            </motion.h1>
            
            {/* Description */}
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-white/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Protecting Ohio families from AI-powered scams with professional cybersecurity services.
            </motion.p>
            
            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <Button asChild size="lg" className="group bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-6 text-lg">
                <Link to="/services">
                  Get Protected
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm">
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </motion.div>

            {/* Image indicators */}
            <motion.div 
              className="flex gap-2 mt-12 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex 
                      ? "bg-accent w-20" 
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>
          
          {/* Right Content - Cybersecurity Visual */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Central Shield Icon */}
              <motion.div 
                className="relative mx-auto w-48 h-48 md:w-64 md:h-64"
                animate={{ 
                  rotateY: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {/* Outer rotating ring */}
                <motion.div 
                  className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Middle pulsing ring */}
                <motion.div 
                  className="absolute inset-4 rounded-full border border-accent/50"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Inner glow */}
                <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/80 to-accent/60 blur-lg" />
                
                {/* Shield icon center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    className="relative"
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Shield className="w-20 h-20 md:w-28 md:h-28 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
                    <motion.div 
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Lock className="w-8 h-8 md:w-10 md:h-10 text-accent" />
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating feature badges */}
              <div className="absolute inset-0">
                {securityFeatures.map((feature, index) => {
                  const positions = [
                    { top: '0%', left: '50%', transform: 'translateX(-50%)' },
                    { top: '50%', right: '-10%', transform: 'translateY(-50%)' },
                    { bottom: '0%', left: '50%', transform: 'translateX(-50%)' },
                    { top: '50%', left: '-10%', transform: 'translateY(-50%)' },
                  ];
                  return (
                    <motion.div
                      key={feature.label}
                      className="absolute"
                      style={positions[index]}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + feature.delay, duration: 0.5 }}
                    >
                      <motion.div 
                        className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 shadow-lg"
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
                        animate={{ 
                          y: [0, -5, 0],
                        }}
                        transition={{ 
                          y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                        }}
                      >
                        <feature.icon className="w-4 h-4 text-accent" />
                        <span className="text-xs md:text-sm text-white font-medium whitespace-nowrap">{feature.label}</span>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats below */}
              <motion.div 
                className="mt-20 grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {[
                  { icon: Globe, value: "500+", label: "Protected" },
                  { icon: Zap, value: "24/7", label: "Support" },
                  { icon: ShieldCheck, value: "99.9%", label: "Success" },
                ].map((stat, index) => (
                  <motion.div 
                    key={stat.label}
                    className="text-center p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <stat.icon className="w-5 h-5 text-accent mx-auto mb-1" />
                    <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/60">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;
