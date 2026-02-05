import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Star, Eye } from "lucide-react";
 import { motion } from "framer-motion";
 import heroFamilySafe from "@/assets/hero-home-family-safe.jpg";
 
 export const HeroHomepage = () => {
   return (
    <section className="relative min-h-screen overflow-hidden bg-[#FAF9F7]">
       {/* Split Background */}
       <div className="absolute inset-0 grid lg:grid-cols-2">
        {/* Left - Light Premium */}
        <div className="bg-gradient-to-br from-[#FAF9F7] via-[#F5F3F0] to-[#EDE9E3] relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_30%_20%,rgba(248,146,106,0.08),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_70%_80%,rgba(187,129,181,0.06),transparent)]" />
         </div>
         {/* Right - Hero Image */}
         <div className="relative hidden lg:block">
           <img 
             src={heroFamilySafe} 
             alt="Protected family"
             width={960}
             height={1080}
             loading="eager"
             decoding="async"
             className="w-full h-full object-cover"
           />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F7] via-[#FAF9F7]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F7]/90 via-transparent to-[#FAF9F7]/30" />
         </div>
       </div>
 
      {/* Decorative Accent Lines */}
      <div className="absolute top-0 left-[50%] w-px h-full bg-gradient-to-b from-transparent via-[#BB81B5]/15 to-transparent hidden lg:block" />
 
       {/* Main Content */}
       <div className="relative z-10 min-h-screen flex items-center">
         <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl py-32 lg:py-0 pb-48">
             
             {/* Prestige Marker */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="flex items-center gap-4 mb-12"
             >
              <div className="w-12 h-px bg-gradient-to-r from-[#F8926A] to-[#BB81B5]" />
              <span className="text-[11px] font-medium tracking-[0.35em] text-[#1a1a2e] uppercase">
                 Est. 2020 — Ohio
               </span>
             </motion.div>
 
             {/* Monumental Headline */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
             >
               <h1 className="mb-8">
                <span className="block text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-light text-[#1a1a2e] leading-[1.1] tracking-[-0.02em] mb-3"
                   style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                   Uncompromising
                 </span>
                 <span className="block text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1] tracking-[-0.02em]"
                   style={{ 
                     fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                    background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 50%, #7C3AED 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                   }}>
                   Protection
                 </span>
               </h1>
             </motion.div>
 
             {/* Refined Body */}
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-lg text-[#1a1a2e]/60 mb-12 leading-[1.8] max-w-lg font-light"
             >
               Veteran-supporting. Enterprise-caliber AI security safeguarding 
              <span className="text-[#1a1a2e] font-medium"> over 500 families </span>
               and businesses from evolving digital threats.
             </motion.p>
 
             {/* Luxe CTAs */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
             >
               <Link 
                 to="/training"
                className="group inline-flex items-center justify-center gap-3 h-14 px-10 rounded-full font-semibold text-sm tracking-wider text-white hover:shadow-lg transition-all duration-500"
                style={{ background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)' }}
               >
                 Begin Protection
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
               
               <Link 
                 to="/business"
                className="inline-flex items-center justify-center h-14 px-10 rounded-full border-2 border-[#1a1a2e]/20 text-[#1a1a2e]/70 font-medium text-sm tracking-wider hover:border-[#BB81B5] hover:text-[#1a1a2e] transition-all duration-500"
               >
                 For Businesses
               </Link>
             </motion.div>
           </div>
         </div>
       </div>
 
      {/* Privacy Notice */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20"
       >
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-[#1a1a2e]/10 shadow-sm">
          <Eye className="w-4 h-4 text-[#BB81B5]" />
          <span className="text-xs text-[#1a1a2e]/60">
            <span className="font-medium text-[#1a1a2e]/80">Privacy Notice:</span> Images are AI-generated to protect member identities
          </span>
        </div>
      </motion.div>

      {/* Trust Bar - Bottom */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <div className="bg-white/70 backdrop-blur-md border-t border-[#1a1a2e]/5">
          <div className="container mx-auto px-6 lg:px-12 py-6">
            <div className="flex flex-wrap items-center justify-between gap-6">
              
              {/* Trust Circles + Stars */}
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['#EAB308', '#3B82F6', '#10B981', '#8B5CF6'].map((color, i) => (
                    <div 
                      key={i}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      {['S', 'T', 'C', 'F'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#EAB308] text-[#EAB308]" />
                    ))}
                  </div>
                  <span className="text-sm text-[#1a1a2e]/70">Trusted by Ohio Families</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#1a1a2e]/10 shadow-sm">
                  <span className="text-xs font-bold text-[#7C3AED]">01</span>
                  <Shield className="w-4 h-4 text-[#7C3AED]" />
                  <span className="text-sm font-medium text-[#1a1a2e]">Verified Experts</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#1a1a2e]/10 shadow-sm">
                  <span className="text-xs font-bold text-[#7C3AED]">02</span>
                  <Award className="w-4 h-4 text-[#7C3AED]" />
                  <span className="text-sm font-medium text-[#1a1a2e]">Ohio Certified</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#1a1a2e]/10 shadow-sm">
                  <span className="text-xs font-bold text-[#7C3AED]">03</span>
                  <Star className="w-4 h-4 text-[#7C3AED]" />
                  <span className="text-sm font-medium text-[#1a1a2e]">Top Rated</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{ 
                    background: 'linear-gradient(135deg, #7C3AED 0%, #BB81B5 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}>17%</div>
                  <div className="text-xs text-[#1a1a2e]/60 uppercase tracking-wide">Veteran Discount</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1a1a2e]">60</div>
                  <div className="text-xs text-[#1a1a2e]/60 uppercase tracking-wide">Day Guarantee</div>
                </div>
              </div>

            </div>
           </div>
         </div>
       </motion.div>
     </section>
   );
 };
 
 export default HeroHomepage;