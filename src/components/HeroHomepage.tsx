 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { ArrowRight } from "lucide-react";
 import { motion } from "framer-motion";
 
 export const HeroHomepage = () => {
   return (
     <section className="relative min-h-screen overflow-hidden bg-[#030508]">
       {/* Luxurious Gradient Background */}
       <div className="absolute inset-0">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(139,92,246,0.15),transparent_50%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_80%_50%,rgba(212,175,55,0.08),transparent_50%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_20%_80%,rgba(248,146,106,0.06),transparent_50%)]" />
       </div>
 
       {/* Animated Gold Particles */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {[...Array(20)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute w-1 h-1 rounded-full bg-[#D4AF37]/40"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
             }}
             animate={{
               y: [0, -30, 0],
               opacity: [0.2, 0.6, 0.2],
             }}
             transition={{
               duration: 3 + Math.random() * 2,
               repeat: Infinity,
               delay: Math.random() * 2,
             }}
           />
         ))}
       </div>
 
       {/* Ornamental Corner Accents */}
       <div className="absolute top-8 left-8 w-24 h-24 border-l-2 border-t-2 border-[#D4AF37]/20 rounded-tl-3xl" />
       <div className="absolute top-8 right-8 w-24 h-24 border-r-2 border-t-2 border-[#D4AF37]/20 rounded-tr-3xl" />
       <div className="absolute bottom-32 left-8 w-24 h-24 border-l-2 border-b-2 border-[#D4AF37]/20 rounded-bl-3xl" />
       <div className="absolute bottom-32 right-8 w-24 h-24 border-r-2 border-b-2 border-[#D4AF37]/20 rounded-br-3xl" />
 
       {/* Main Content */}
       <div className="container mx-auto px-4 lg:px-8 relative z-10">
         <div className="min-h-screen flex flex-col justify-center items-center text-center py-32">
           
           {/* Luxury Emblem */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1 }}
             className="mb-10"
           >
             <div className="relative">
               {/* Outer Ring */}
               <div className="w-20 h-20 rounded-full border border-[#D4AF37]/30 flex items-center justify-center">
                 {/* Inner Ring */}
                 <div className="w-14 h-14 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#D4AF37]/5 backdrop-blur-sm">
                   {/* Shield Icon */}
                   <svg className="w-7 h-7 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                     <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
                     <path d="M9 12l2 2 4-4" />
                   </svg>
                 </div>
               </div>
               {/* Glow Effect */}
               <div className="absolute inset-0 rounded-full bg-[#D4AF37]/20 blur-xl -z-10" />
             </div>
           </motion.div>
 
           {/* Premium Badge */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="mb-8"
           >
             <div className="inline-flex items-center gap-2 text-[#D4AF37]/80 tracking-[0.3em] text-xs font-medium uppercase">
               <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/60" />
               Veteran-Supporting • Est. 2020
               <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/60" />
             </div>
           </motion.div>
 
           {/* Ultra Premium Headline */}
           <motion.h1 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, delay: 0.3 }}
             className="mb-6 max-w-5xl"
           >
             <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight text-white/90 leading-[1.1] tracking-tight mb-4"
               style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
               The Art of
             </span>
             <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] font-black leading-[0.9] tracking-tight"
               style={{ 
                 fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                 background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 25%, #D4AF37 50%, #B8860B 75%, #D4AF37 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 textShadow: '0 0 80px rgba(212,175,55,0.3)',
               }}>
               Digital Protection
             </span>
           </motion.h1>
 
           {/* Elegant Ornament */}
           <motion.div 
             initial={{ opacity: 0, scaleX: 0 }}
             animate={{ opacity: 1, scaleX: 1 }}
             transition={{ duration: 1, delay: 0.5 }}
             className="flex items-center gap-6 mb-10"
           >
             <div className="w-20 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-[#D4AF37]/60" />
             <div className="w-2 h-2 rotate-45 border border-[#D4AF37]/60" />
             <div className="w-20 h-px bg-gradient-to-l from-transparent via-[#D4AF37]/40 to-[#D4AF37]/60" />
           </motion.div>
 
           {/* Refined Subheadline */}
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.6 }}
             className="text-base md:text-lg lg:text-xl text-white/50 mb-14 leading-relaxed max-w-2xl font-light tracking-wide"
           >
             Enterprise-grade AI security for discerning families and businesses.
             <br className="hidden md:block" />
             <span className="text-white/70">Trusted by 500+ households across Ohio.</span>
           </motion.p>
 
           {/* Luxury CTA */}
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.7 }}
             className="flex flex-col sm:flex-row gap-6"
           >
             <Button asChild size="lg"
               className="group h-16 px-14 text-base font-semibold rounded-none tracking-wider uppercase transition-all duration-700 border border-[#D4AF37] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
               style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)', color: '#030508' }}>
               <Link to="/training" className="flex items-center gap-4">
                 Begin Protection
                 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
               </Link>
             </Button>
             
             <Button asChild variant="outline" size="lg"
               className="h-16 px-14 text-base font-semibold rounded-none tracking-wider uppercase border border-white/20 text-white/80 bg-transparent hover:bg-white/5 hover:border-white/40 hover:text-white transition-all duration-500">
               <Link to="/business">
                 Enterprise
               </Link>
             </Button>
           </motion.div>
 
           {/* Bottom Stats - Ultra Minimal */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1 }}
             className="absolute bottom-16 left-0 right-0"
           >
             <div className="container mx-auto px-4">
               <div className="flex justify-center items-center gap-12 md:gap-20 text-center">
                 {[
                   { value: "99.8%", label: "Success Rate" },
                   { value: "500+", label: "Protected" },
                   { value: "4+", label: "Years" },
                 ].map((stat, i) => (
                   <div key={stat.label} className="group">
                     <div className="text-2xl md:text-3xl font-light text-[#D4AF37] mb-1" 
                       style={{ fontFamily: "'Clash Display', sans-serif" }}>
                       {stat.value}
                     </div>
                     <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/30 group-hover:text-white/50 transition-colors">
                       {stat.label}
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </motion.div>
         </div>
       </div>
 
       {/* Premium Bottom Line */}
       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
     </section>
   );
 };
 
 export default HeroHomepage;