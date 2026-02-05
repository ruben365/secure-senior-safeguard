 import { Link } from "react-router-dom";
 import { ArrowRight, Shield, Award, Star, Eye, Sparkles, Zap } from "lucide-react";
 import { motion } from "framer-motion";
import heroProtectionTeam from "@/assets/hero-protection-team.jpg";
 
 export const HeroHomepage = () => {
   return (
    <section className="relative min-h-[120vh] overflow-hidden bg-[#FAF9F7]">
       {/* Split Background */}
      <div className="absolute inset-0 grid lg:grid-cols-[50%_50%]">
         {/* Left - Light Premium */}
         <div className="bg-gradient-to-br from-[#FAF9F7] via-[#F8F5F2] to-[#F0EBE5] relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_10%_0%,rgba(248,146,106,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_90%_100%,rgba(187,129,181,0.20),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(124,58,237,0.08),transparent)]" />
           {/* Floating Orbs */}
           <motion.div 
            animate={{ y: [-30, 30, -30], x: [-15, 15, -15] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] left-[5%] w-96 h-96 rounded-full bg-gradient-to-br from-[#F8926A]/30 to-[#BB81B5]/30 blur-3xl"
           />
           <motion.div 
            animate={{ y: [30, -30, 30], x: [15, -15, 15] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[25%] right-[0%] w-72 h-72 rounded-full bg-gradient-to-br from-[#7C3AED]/25 to-[#BB81B5]/25 blur-3xl"
          />
          <motion.div 
            animate={{ y: [-20, 20, -20], scale: [1, 1.1, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[60%] left-[30%] w-56 h-56 rounded-full bg-gradient-to-br from-[#22C55E]/15 to-[#7C3AED]/15 blur-3xl"
           />
         </div>
         {/* Right - Hero Image */}
         <div className="relative hidden lg:block overflow-hidden">
           <img 
            src={heroProtectionTeam} 
            alt="Professional protection team"
            width={1920}
             height={1080}
             loading="eager"
             decoding="async"
            className="w-full h-full object-cover scale-110"
           />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F7] via-[#FAF9F7]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F7]/70 via-transparent to-[#FAF9F7]/10" />
          {/* Glowing accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 via-transparent to-[#F8926A]/10" />
           {/* Decorative frame */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute inset-6 border-2 border-white/40 rounded-[2rem] pointer-events-none shadow-2xl" 
          />
           {/* Floating badge on image */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute top-16 right-16 bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/60"
           >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg">
                <Shield className="w-8 h-8 text-white" />
               </div>
               <div>
                <div className="text-sm font-bold text-[#22C55E] uppercase tracking-wider">Protected</div>
                <div className="text-2xl font-black text-[#1a1a2e]">500+ Families</div>
               </div>
             </div>
           </motion.div>
          {/* Additional floating stat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-32 right-16 bg-gradient-to-br from-[#7C3AED] to-[#BB81B5] rounded-2xl p-5 shadow-2xl"
          >
            <div className="text-white text-center">
              <div className="text-3xl font-black">99.8%</div>
              <div className="text-sm font-medium text-white/80">Success Rate</div>
            </div>
          </motion.div>
         </div>
       </div>
 
       {/* Decorative Accent Lines */}
      <div className="absolute top-0 left-[50%] w-[2px] h-full bg-gradient-to-b from-transparent via-[#BB81B5]/40 to-transparent hidden lg:block" />
 
       {/* Main Content */}
      <div className="relative z-10 min-h-[110vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="max-w-3xl py-40 lg:py-0 pb-64">
             
             {/* Prestige Marker */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
              className="flex items-center gap-6 mb-16"
             >
               <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-6 h-6 text-[#F8926A]" />
                </motion.div>
                <div className="w-20 h-1.5 rounded-full bg-gradient-to-r from-[#F8926A] via-[#E879A9] to-[#BB81B5]" />
               </div>
              <span className="text-sm font-bold tracking-[0.4em] text-[#1a1a2e]/80 uppercase">
                 Est. 2020 — Ohio
               </span>
             </motion.div>
 
             {/* Monumental Headline */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
             >
              <h1 className="mb-12">
                <span className="block text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[6.5rem] font-light text-[#1a1a2e] leading-[1.02] tracking-[-0.03em] mb-5"
                   style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                   Uncompromising
                 </span>
                <span className="block text-[4rem] sm:text-8xl md:text-9xl lg:text-[8rem] font-black leading-[0.92] tracking-[-0.03em]"
                   style={{ 
                     fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                    background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 25%, #BB81B5 50%, #7C3AED 75%, #6366F1 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 8px 30px rgba(187, 129, 181, 0.4))',
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
              className="text-xl md:text-2xl lg:text-3xl text-[#1a1a2e]/70 mb-16 leading-[1.8] max-w-2xl font-light"
             >
               Veteran-supporting. Enterprise-caliber AI security safeguarding 
              <span className="text-[#1a1a2e] font-bold bg-gradient-to-r from-[#F8926A]/25 to-[#BB81B5]/25 px-3 py-1.5 rounded-xl"> over 500 families </span>
               and businesses from evolving digital threats.
             </motion.p>
 
             {/* Luxe CTAs */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6"
             >
               <Link 
                 to="/training"
                className="group inline-flex items-center justify-center gap-4 h-18 px-14 rounded-full font-bold text-lg tracking-wide text-white shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(248,146,106,0.6)] hover:scale-105 transition-all duration-500"
                 style={{ 
                   background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 50%, #BB81B5 100%)',
                  boxShadow: '0 15px 50px -12px rgba(248, 146, 106, 0.6)'
                 }}
               >
                <Zap className="w-6 h-6" />
                 Begin Protection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </Link>
               
               <Link 
                 to="/business"
                className="inline-flex items-center justify-center h-18 px-14 rounded-full border-3 border-[#1a1a2e]/20 text-[#1a1a2e]/80 font-bold text-lg tracking-wide hover:border-[#BB81B5] hover:text-[#1a1a2e] hover:bg-white/60 hover:shadow-xl transition-all duration-500"
               >
                 For Businesses
               </Link>
             </motion.div>
 
             {/* Quick Stats Row */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-12 mt-16 pt-12 border-t-2 border-[#1a1a2e]/10"
             >
               {[
                 { value: "17%", label: "Veteran Discount" },
                 { value: "60", label: "Day Guarantee" },
                 { value: "24/7", label: "Support" }
               ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl lg:text-5xl font-black mb-2" style={{
                     background: 'linear-gradient(135deg, #1a1a2e 0%, #7C3AED 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent'
                   }}>{stat.value}</div>
                  <div className="text-sm font-semibold text-[#1a1a2e]/60 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
               ))}
             </motion.div>
           </div>
         </div>
       </div>
 
       {/* Privacy Notice */}
       <motion.div 
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 1 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 z-20"
       >
        <div className="flex items-center gap-4 px-6 py-4 bg-white/95 backdrop-blur-2xl rounded-full border border-[#1a1a2e]/10 shadow-xl">
          <Eye className="w-6 h-6 text-[#BB81B5]" />
          <span className="text-base text-[#1a1a2e]/70">
             <span className="font-medium text-[#1a1a2e]/80">Privacy Notice:</span> Images are AI-generated to protect member identities
           </span>
         </div>
       </motion.div>
 
       {/* Trust Bar - Bottom */}
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, delay: 0.9 }}
         className="absolute bottom-0 left-0 right-0 z-20"
       >
        <div className="bg-white/90 backdrop-blur-2xl border-t-2 border-[#1a1a2e]/10 shadow-[0_-15px_50px_rgba(0,0,0,0.08)]">
          <div className="container mx-auto px-6 lg:px-12 py-10">
            <div className="flex flex-wrap items-center justify-between gap-10">
               
               {/* Trust Circles + Stars */}
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                   {['#EAB308', '#3B82F6', '#10B981', '#8B5CF6'].map((color, i) => (
                     <motion.div 
                       key={i}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.15, zIndex: 10 }}
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg border-4 border-white shadow-xl cursor-pointer"
                      style={{ backgroundColor: color, boxShadow: `0 6px 20px ${color}50` }}
                     >
                       {['S', 'T', 'C', 'F'][i]}
                     </motion.div>
                   ))}
                 </div>
                 <div>
                  <div className="flex gap-1 mb-2">
                     {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-[#EAB308] text-[#EAB308] drop-shadow-md" />
                     ))}
                   </div>
                  <span className="text-lg font-semibold text-[#1a1a2e]/80">Trusted by Ohio Families</span>
                 </div>
               </div>
 
               {/* Badges */}
              <div className="flex flex-wrap items-center gap-5">
                {[
                  { num: "01", icon: Shield, label: "Verified Experts" },
                  { num: "02", icon: Award, label: "Ohio Certified" },
                  { num: "03", icon: Star, label: "Top Rated" }
                ].map((badge, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#7C3AED]/8 to-[#BB81B5]/8 rounded-2xl border-2 border-[#7C3AED]/20 shadow-md hover:shadow-xl transition-all cursor-pointer"
                  >
                    <span className="text-base font-black text-[#7C3AED]">{badge.num}</span>
                    <badge.icon className="w-6 h-6 text-[#7C3AED]" />
                    <span className="text-lg font-bold text-[#1a1a2e]">{badge.label}</span>
                  </motion.div>
                ))}
               </div>
 
               {/* Stats */}
              <div className="hidden xl:flex items-center gap-12">
                {[
                  { value: "17%", label: "Veteran Discount", gradient: true },
                  { value: "60", label: "Day Guarantee", gradient: false }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="text-center"
                  >
                    <div className="text-5xl font-black" style={ stat.gradient ? { 
                      background: 'linear-gradient(135deg, #F8926A 0%, #BB81B5 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    } : { color: '#1a1a2e' }}>{stat.value}</div>
                    <div className="text-base font-semibold text-[#1a1a2e]/60 uppercase tracking-wider">{stat.label}</div>
                  </motion.div>
                ))}
               </div>
 
             </div>
           </div>
         </div>
       </motion.div>
     </section>
   );
 };
 
 export default HeroHomepage;