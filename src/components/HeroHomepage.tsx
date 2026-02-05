 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { ArrowRight, Shield, Star, Crown } from "lucide-react";
 import { motion } from "framer-motion";
 import heroFamilySafe from "@/assets/hero-home-family-safe.jpg";
 
 export const HeroHomepage = () => {
   return (
     <section className="relative min-h-screen overflow-hidden bg-[#0a1628]">
       {/* Cinematic Background Image */}
       <div className="absolute inset-0">
         <img 
           src={heroFamilySafe} 
           alt="Protected family"
           width={1920}
           height={1080}
           loading="eager"
           decoding="async"
           className="w-full h-full object-cover opacity-40"
         />
         {/* Noble Dark Overlay */}
         <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#0a1628]/90 to-[#1a0a28]/80" />
       </div>
 
       {/* Luxury Accent Orbs */}
       <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
         style={{ background: 'radial-gradient(circle, #F8926A 0%, transparent 70%)', filter: 'blur(80px)' }}
       />
       <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
         style={{ background: 'radial-gradient(circle, #BB81B5 0%, transparent 70%)', filter: 'blur(100px)' }}
       />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
         style={{ background: 'radial-gradient(circle, #D4AF37 0%, transparent 60%)', filter: 'blur(120px)' }}
       />
 
       {/* Decorative Lines */}
       <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
       <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/5 to-transparent" />
 
       {/* Main Content */}
       <div className="container mx-auto px-4 lg:px-8 relative z-10">
         <div className="min-h-screen flex flex-col justify-center items-center text-center py-32">
           
           {/* Crown Badge */}
           <motion.div 
             initial={{ opacity: 0, y: 20, scale: 0.9 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="mb-8"
           >
             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 backdrop-blur-sm">
               <Crown className="w-5 h-5 text-[#D4AF37]" />
               <span className="text-sm font-semibold text-[#D4AF37] tracking-[0.2em] uppercase">
                 Ohio's Premier Protection
               </span>
               <Crown className="w-5 h-5 text-[#D4AF37]" />
             </div>
           </motion.div>
 
           {/* Majestic Headline */}
           <motion.h1 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 0.2 }}
             className="mb-8 max-w-5xl"
           >
             <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-black text-white leading-[0.95] tracking-tight"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               Defending What
             </span>
             <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7rem] font-black leading-[0.95] tracking-tight mt-2"
               style={{ 
                 fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                 background: 'linear-gradient(135deg, #D4AF37 0%, #F8926A 30%, #BB81B5 70%, #D4AF37 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
               }}>
               Matters Most
             </span>
           </motion.h1>
 
           {/* Elegant Divider */}
           <motion.div 
             initial={{ opacity: 0, scaleX: 0 }}
             animate={{ opacity: 1, scaleX: 1 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="flex items-center gap-4 mb-8"
           >
             <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
             <Shield className="w-6 h-6 text-[#D4AF37]" />
             <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
           </motion.div>
 
           {/* Noble Subheadline */}
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="text-lg md:text-xl lg:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl font-light"
           >
             Veteran-owned. Enterprise-grade AI security protecting 
             <span className="text-white font-medium"> 500+ families </span>
             and businesses from sophisticated digital threats.
           </motion.p>
 
           {/* CTA Buttons */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="flex flex-col sm:flex-row gap-5 mb-16"
           >
             <Button asChild size="lg"
               className="h-16 px-12 text-lg font-bold rounded-full shadow-2xl hover:scale-105 transition-all duration-500 border-2 border-[#D4AF37]/30"
               style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 50%, #D4AF37 100%)', color: '#0a1628' }}>
               <Link to="/training">
                 Begin Your Protection
                 <ArrowRight className="ml-3 w-6 h-6" />
               </Link>
             </Button>
             
             <Button asChild variant="outline" size="lg"
               className="h-16 px-12 text-lg font-semibold rounded-full border-2 border-white/20 text-white bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all duration-500">
               <Link to="/business">
                 Enterprise Solutions
               </Link>
             </Button>
           </motion.div>
 
           {/* Trust Indicators */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.8 }}
             className="flex flex-wrap justify-center gap-8 md:gap-12"
           >
             {[
               { label: "Veteran Owned", icon: Shield },
               { label: "99.8% Success", icon: Star },
               { label: "60-Day Guarantee", icon: Crown },
             ].map((item, index) => (
               <div key={item.label} className="flex items-center gap-3 group">
                 <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-all">
                   <item.icon className="w-5 h-5 text-[#D4AF37]" />
                 </div>
                 <span className="text-sm md:text-base font-medium text-white/70 group-hover:text-white/90 transition-colors">
                   {item.label}
                 </span>
               </div>
             ))}
           </motion.div>
         </div>
       </div>
 
       {/* Premium Bottom Accent */}
       <div className="absolute bottom-0 left-0 right-0">
         <div className="h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />
         <div className="h-24 bg-gradient-to-t from-white to-transparent" />
       </div>
     </section>
   );
 };
 
 export default HeroHomepage;