 import { Link } from "react-router-dom";
import { ArrowRight, Shield, Award, Star, Eye, Sparkles, Zap, CheckCircle, Users, TrendingUp, Clock } from "lucide-react";
 import { motion } from "framer-motion";
import heroSeniorsProtected from "@/assets/hero-seniors-protected.jpg";
 
 export const HeroHomepage = () => {
   return (
    <section className="relative min-h-[130vh] overflow-hidden bg-[#FAF9F7]">
       {/* Split Background */}
      <div className="absolute inset-0 grid lg:grid-cols-[50%_50%]">
         {/* Left - Light Premium */}
         <div className="bg-gradient-to-br from-[#FAF9F7] via-[#F8F5F2] to-[#F0EBE5] relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_150%_150%_at_0%_0%,rgba(248,146,106,0.30),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_100%_100%,rgba(187,129,181,0.25),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,rgba(124,58,237,0.10),transparent)]" />
           {/* Floating Orbs */}
           <motion.div 
            animate={{ y: [-40, 40, -40], x: [-20, 20, -20] }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[0%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F8926A]/35 to-[#BB81B5]/35 blur-3xl"
           />
           <motion.div 
            animate={{ y: [40, -40, 40], x: [20, -20, 20] }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] right-[-5%] w-96 h-96 rounded-full bg-gradient-to-br from-[#7C3AED]/30 to-[#BB81B5]/30 blur-3xl"
          />
          <motion.div 
            animate={{ y: [-25, 25, -25], scale: [1, 1.15, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[55%] left-[25%] w-72 h-72 rounded-full bg-gradient-to-br from-[#22C55E]/20 to-[#7C3AED]/20 blur-3xl"
          />
          <motion.div 
            animate={{ y: [20, -20, 20], x: [-10, 10, -10] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[80%] left-[60%] w-48 h-48 rounded-full bg-gradient-to-br from-[#3B82F6]/15 to-[#22C55E]/15 blur-3xl"
           />
         </div>
         {/* Right - Hero Image */}
         <div className="relative hidden lg:block overflow-hidden">
           <img 
            src={heroSeniorsProtected} 
            alt="Protected seniors using technology safely"
            width={1920}
             height={1080}
             loading="eager"
             decoding="async"
            className="w-full h-full object-cover scale-115"
           />
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F7] via-[#FAF9F7]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F7]/60 via-transparent to-[#FAF9F7]/5" />
          {/* Glowing accent overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/8 via-transparent to-[#F8926A]/15" />
           {/* Decorative frame */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute inset-5 border-3 border-white/50 rounded-[2.5rem] pointer-events-none shadow-2xl" 
          />
          
          {/* Floating Widgets on Image */}
          {/* Widget 1 - Protected Families */}
           <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            whileHover={{ scale: 1.05 }}
            className="absolute top-20 right-20 bg-white/95 backdrop-blur-2xl rounded-3xl p-7 shadow-2xl border border-white/60"
           >
            <div className="flex items-center gap-5">
              <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-xl">
                <Shield className="w-10 h-10 text-white" />
               </div>
               <div>
                <div className="text-base font-bold text-[#22C55E] uppercase tracking-wider">Protected</div>
                <div className="text-3xl font-black text-[#1a1a2e]">500+ Families</div>
               </div>
             </div>
           </motion.div>
          
          {/* Widget 2 - Success Rate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="absolute top-48 right-8 bg-gradient-to-br from-[#7C3AED] to-[#BB81B5] rounded-2xl p-6 shadow-2xl"
          >
            <div className="text-white text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-4xl font-black">99.8%</div>
              <div className="text-base font-medium text-white/90">Success Rate</div>
            </div>
          </motion.div>
          
          {/* Widget 3 - Active Users */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-44 right-24 bg-white/95 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl border border-white/60"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#1a1a2e]">24/7</div>
                <div className="text-sm font-medium text-[#1a1a2e]/60">Expert Support</div>
              </div>
            </div>
          </motion.div>
          
          {/* Widget 4 - Verified Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            whileHover={{ rotate: 5, scale: 1.1 }}
            className="absolute bottom-28 left-8 bg-gradient-to-br from-[#F8926A] to-[#E879A9] rounded-full p-4 shadow-2xl"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          {/* Widget 5 - Years Active */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="absolute top-40 left-12 bg-white/95 backdrop-blur-2xl rounded-xl p-4 shadow-xl border border-white/60"
          >
            <div className="flex items-center gap-3">
              <Clock className="w-8 h-8 text-[#F8926A]" />
              <div>
                <div className="text-xl font-black text-[#1a1a2e]">4+ Years</div>
                <div className="text-xs font-medium text-[#1a1a2e]/60">Experience</div>
              </div>
            </div>
          </motion.div>
         </div>
       </div>
 
       {/* Decorative Accent Lines */}
      <div className="absolute top-0 left-[50%] w-[2px] h-full bg-gradient-to-b from-transparent via-[#BB81B5]/40 to-transparent hidden lg:block" />
      <div className="absolute top-[20%] left-[48%] w-[1px] h-[30%] bg-gradient-to-b from-transparent via-[#F8926A]/30 to-transparent hidden lg:block" />
 
       {/* Main Content */}
      <div className="relative z-10 min-h-[120vh] flex items-center">
        <div className="container mx-auto px-6 lg:px-24">
          <div className="max-w-3xl py-44 lg:py-0 pb-72">
             
             {/* Prestige Marker */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
              className="flex items-center gap-6 mb-18"
             >
               <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="w-7 h-7 text-[#F8926A]" />
                </motion.div>
                <div className="w-24 h-2 rounded-full bg-gradient-to-r from-[#F8926A] via-[#E879A9] to-[#BB81B5]" />
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
              <h1 className="mb-14">
                <span className="block text-[4rem] sm:text-8xl md:text-9xl lg:text-[7.5rem] font-light text-[#1a1a2e] leading-[1] tracking-[-0.03em] mb-6"
                   style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                   Uncompromising
                 </span>
                <span className="block text-[4.5rem] sm:text-9xl md:text-[10rem] lg:text-[9rem] font-black leading-[0.9] tracking-[-0.03em]"
                   style={{ 
                     fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                    background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 25%, #BB81B5 50%, #7C3AED 75%, #6366F1 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 10px 40px rgba(187, 129, 181, 0.5))',
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
              className="text-2xl md:text-3xl lg:text-4xl text-[#1a1a2e]/70 mb-18 leading-[1.7] max-w-2xl font-light"
             >
               Veteran-supporting. Enterprise-caliber AI security safeguarding 
              <span className="text-[#1a1a2e] font-bold bg-gradient-to-r from-[#F8926A]/30 to-[#BB81B5]/30 px-4 py-2 rounded-2xl"> over 500 families </span>
               and businesses from evolving digital threats.
             </motion.p>
 
             {/* Luxe CTAs */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-7"
             >
               <Link 
                 to="/training"
                className="group inline-flex items-center justify-center gap-4 h-20 px-16 rounded-full font-black text-xl tracking-wide text-white shadow-2xl hover:shadow-[0_25px_70px_-15px_rgba(248,146,106,0.7)] hover:scale-105 transition-all duration-500"
                 style={{ 
                   background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 50%, #BB81B5 100%)',
                  boxShadow: '0 20px 60px -12px rgba(248, 146, 106, 0.7)'
                 }}
               >
                <Zap className="w-7 h-7" />
                 Begin Protection
                <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform" />
               </Link>
               
               <Link 
                 to="/business"
                className="inline-flex items-center justify-center h-20 px-16 rounded-full border-4 border-[#1a1a2e]/20 text-[#1a1a2e]/80 font-black text-xl tracking-wide hover:border-[#BB81B5] hover:text-[#1a1a2e] hover:bg-white/70 hover:shadow-2xl transition-all duration-500"
               >
                 For Businesses
               </Link>
             </motion.div>
 
             {/* Quick Stats Row */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-14 mt-18 pt-14 border-t-2 border-[#1a1a2e]/10"
             >
               {[
                 { value: "17%", label: "Veteran Discount" },
                 { value: "60", label: "Day Guarantee" },
                { value: "24/7", label: "Support" },
                { value: "100%", label: "Satisfaction" }
               ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  className="text-center"
                  whileHover={{ scale: 1.15, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-5xl lg:text-6xl font-black mb-3" style={{
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #7C3AED 50%, #BB81B5 100%)',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent'
                   }}>{stat.value}</div>
                  <div className="text-base font-bold text-[#1a1a2e]/60 uppercase tracking-wider">{stat.label}</div>
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
        className="absolute top-12 left-1/2 -translate-x-1/2 z-20"
       >
        <div className="flex items-center gap-5 px-8 py-5 bg-white/95 backdrop-blur-2xl rounded-full border border-[#1a1a2e]/10 shadow-2xl">
          <Eye className="w-7 h-7 text-[#BB81B5]" />
          <span className="text-lg text-[#1a1a2e]/70">
            <span className="font-semibold text-[#1a1a2e]/80">Privacy Notice:</span> Images are AI-generated to protect member identities
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
        <div className="bg-white/95 backdrop-blur-3xl border-t-2 border-[#1a1a2e]/10 shadow-[0_-20px_60px_rgba(0,0,0,0.10)]">
          <div className="container mx-auto px-6 lg:px-12 py-12">
            <div className="flex flex-wrap items-center justify-between gap-12">
               
               {/* Trust Circles + Stars */}
              <div className="flex items-center gap-8">
                <div className="flex -space-x-5">
                   {['#EAB308', '#3B82F6', '#10B981', '#8B5CF6'].map((color, i) => (
                     <motion.div 
                       key={i}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.2, zIndex: 10 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl border-4 border-white shadow-2xl cursor-pointer"
                      style={{ backgroundColor: color, boxShadow: `0 8px 25px ${color}60` }}
                     >
                       {['S', 'T', 'C', 'F'][i]}
                     </motion.div>
                   ))}
                 </div>
                 <div>
                  <div className="flex gap-1.5 mb-3">
                     {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-7 h-7 fill-[#EAB308] text-[#EAB308] drop-shadow-lg" />
                     ))}
                   </div>
                  <span className="text-xl font-bold text-[#1a1a2e]/80">Trusted by Ohio Families</span>
                 </div>
               </div>
 
               {/* Badges */}
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { num: "01", icon: Shield, label: "Verified Experts" },
                  { num: "02", icon: Award, label: "Ohio Certified" },
                  { num: "03", icon: Star, label: "Top Rated" }
                ].map((badge, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="flex items-center gap-4 px-7 py-5 bg-gradient-to-r from-[#7C3AED]/10 to-[#BB81B5]/10 rounded-2xl border-2 border-[#7C3AED]/25 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                  >
                    <span className="text-lg font-black text-[#7C3AED]">{badge.num}</span>
                    <badge.icon className="w-7 h-7 text-[#7C3AED]" />
                    <span className="text-xl font-bold text-[#1a1a2e]">{badge.label}</span>
                  </motion.div>
                ))}
               </div>
 
               {/* Stats */}
              <div className="hidden xl:flex items-center gap-14">
                {[
                  { value: "17%", label: "Veteran Discount", gradient: true },
                  { value: "60", label: "Day Guarantee", gradient: false }
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.15 }}
                    className="text-center"
                  >
                    <div className="text-6xl font-black" style={ stat.gradient ? { 
                      background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 50%, #BB81B5 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    } : { color: '#1a1a2e' }}>{stat.value}</div>
                    <div className="text-lg font-bold text-[#1a1a2e]/60 uppercase tracking-wider">{stat.label}</div>
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