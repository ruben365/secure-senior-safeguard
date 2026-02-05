 import { Link } from "react-router-dom";
 import { ArrowRight, Shield, Award, Star, Eye, Sparkles, Zap, CheckCircle, Users, TrendingUp, Clock, Heart, Globe, Lock } from "lucide-react";
 import { motion } from "framer-motion";
 import heroSeniorsProtected from "@/assets/hero-seniors-protected.jpg";
 
 export const HeroHomepage = () => {
   return (
     <section className="relative min-h-[85vh] overflow-hidden bg-[#FAF9F7]">
       {/* Split Background */}
       <div className="absolute inset-0 grid lg:grid-cols-[48%_52%]">
         {/* Left - Light Premium */}
         <div className="bg-gradient-to-br from-[#FAF9F7] via-[#F8F5F2] to-[#F0EBE5] relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_120%_at_0%_0%,rgba(248,146,106,0.25),transparent)]" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_100%_100%,rgba(187,129,181,0.20),transparent)]" />
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(124,58,237,0.08),transparent)]" />
           {/* Floating Orbs */}
           <motion.div 
             animate={{ 
               y: [-20, 20, -20], 
               x: [-10, 10, -10],
               scale: [1, 1.1, 1]
             }}
             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[5%] left-[-5%] w-64 h-64 rounded-full bg-gradient-to-br from-[#F8926A]/20 to-[#BB81B5]/20 blur-3xl pointer-events-none"
           />
           <motion.div 
             animate={{ 
               y: [20, -20, 20], 
               x: [10, -10, 10],
               opacity: [0.6, 1, 0.6]
             }}
             transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
             className="absolute bottom-[10%] right-[-10%] w-56 h-56 rounded-full bg-gradient-to-br from-[#7C3AED]/15 to-[#BB81B5]/15 blur-3xl pointer-events-none"
           />
           <motion.div 
             animate={{ 
               y: [-15, 15, -15], 
               scale: [1, 1.2, 1],
               rotate: [0, 5, 0]
             }}
             transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
             className="absolute top-[50%] left-[20%] w-40 h-40 rounded-full bg-gradient-to-br from-[#22C55E]/12 to-[#7C3AED]/12 blur-3xl pointer-events-none"
           />
         </div>
         {/* Right - Hero Image */}
         <div className="relative hidden lg:block overflow-hidden">
           <img 
             src={heroSeniorsProtected} 
             alt="Protected seniors using technology safely"
             width={800}
             height={600}
             loading="eager"
             decoding="async"
             className="w-full h-full object-cover"
           />
           {/* Premium overlays */}
           <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F7] via-[#FAF9F7]/20 to-transparent" />
           <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F7]/30 via-transparent to-transparent" />
           <motion.div 
             animate={{ opacity: [0.3, 0.6, 0.3] }}
             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/5 via-transparent to-[#F8926A]/8 pointer-events-none"
           />
           {/* Decorative frame */}
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.8, duration: 1 }}
             className="absolute inset-3 border border-white/30 rounded-xl pointer-events-none" 
           />
           
           {/* Premium Floating Widgets - Repositioned */}
           {/* Widget 1 - Protected Families - Top Right */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8, y: -20 }}
             animate={{ opacity: 1, scale: 1, y: 0 }}
             transition={{ delay: 1.0, duration: 0.7 }}
             whileHover={{ scale: 1.08, y: -3 }}
             className="absolute top-6 right-6 bg-white/95 backdrop-blur-2xl rounded-2xl p-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60"
           >
             <motion.div 
               animate={{ rotate: [0, 5, 0] }}
               transition={{ duration: 3, repeat: Infinity }}
               className="flex items-center gap-2.5"
             >
               <motion.div 
                 animate={{ scale: [1, 1.1, 1] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg"
               >
                 <Shield className="w-5 h-5 text-white" />
               </motion.div>
               <div>
                 <div className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider">Protected</div>
                 <div className="text-lg font-black text-[#1a1a2e]">500+ Families</div>
               </div>
             </motion.div>
           </motion.div>
           
           {/* Widget 2 - Success Rate - Top Left */}
           <motion.div
             initial={{ opacity: 0, x: -30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 1.3, duration: 0.6 }}
             whileHover={{ scale: 1.08, rotate: 2 }}
             className="absolute top-8 left-6 bg-gradient-to-br from-[#7C3AED] to-[#BB81B5] rounded-xl p-3 shadow-[0_8px_32px_rgba(124,58,237,0.3)]"
           >
             <motion.div 
               animate={{ y: [0, -2, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="text-white text-center"
             >
               <TrendingUp className="w-4 h-4 mx-auto mb-0.5" />
               <div className="text-xl font-black">99.8%</div>
               <div className="text-[10px] font-medium text-white/90">Success Rate</div>
             </motion.div>
           </motion.div>
           
           {/* Widget 3 - 24/7 Support - Middle Right */}
           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1.6, duration: 0.6 }}
             whileHover={{ scale: 1.08, x: -3 }}
             className="absolute top-[45%] right-4 bg-white/95 backdrop-blur-2xl rounded-xl p-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/60"
           >
             <motion.div 
               animate={{ scale: [1, 1.05, 1] }}
               transition={{ duration: 2.5, repeat: Infinity }}
               className="flex items-center gap-2"
             >
               <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#1D4ED8] flex items-center justify-center shadow-md">
                 <Users className="w-4 h-4 text-white" />
               </div>
               <div>
                 <div className="text-base font-black text-[#1a1a2e]">24/7</div>
                 <div className="text-[10px] font-medium text-[#1a1a2e]/60">Support</div>
               </div>
             </motion.div>
           </motion.div>
           
           {/* Widget 4 - Verified Badge - Bottom Left */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1.9, duration: 0.5 }}
             whileHover={{ rotate: 10, scale: 1.15 }}
             className="absolute bottom-[30%] left-5 bg-gradient-to-br from-[#F8926A] to-[#E879A9] rounded-full p-2.5 shadow-[0_8px_24px_rgba(248,146,106,0.4)]"
           >
             <motion.div
               animate={{ rotate: [0, 360] }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             >
               <CheckCircle className="w-5 h-5 text-white" />
             </motion.div>
           </motion.div>
           
           {/* Widget 5 - Experience - Bottom Right */}
           <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 2.1, duration: 0.5 }}
             whileHover={{ scale: 1.08 }}
             className="absolute bottom-[18%] right-8 bg-white/95 backdrop-blur-2xl rounded-lg p-2.5 shadow-[0_8px_24px_rgba(0,0,0,0.10)] border border-white/60"
           >
             <motion.div 
               animate={{ opacity: [0.8, 1, 0.8] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="flex items-center gap-2"
             >
               <Clock className="w-4 h-4 text-[#F8926A]" />
               <div>
                 <div className="text-sm font-black text-[#1a1a2e]">4+ Years</div>
                 <div className="text-[9px] font-medium text-[#1a1a2e]/60">Experience</div>
               </div>
             </motion.div>
           </motion.div>
           
           {/* Widget 6 - Ohio Love - Middle Left */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 2.3, duration: 0.5 }}
             whileHover={{ scale: 1.1 }}
             className="absolute top-[55%] left-4 bg-gradient-to-br from-[#EC4899]/90 to-[#F43F5E]/90 backdrop-blur-xl rounded-lg p-2 shadow-[0_6px_20px_rgba(236,72,153,0.3)]"
           >
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }}
               transition={{ duration: 1.5, repeat: Infinity }}
               className="flex items-center gap-1.5"
             >
               <Heart className="w-4 h-4 text-white fill-white" />
               <span className="text-xs font-bold text-white">Ohio</span>
             </motion.div>
           </motion.div>
           
           {/* Widget 7 - Secure Badge - Top Center */}
           <motion.div
             initial={{ opacity: 0, x: 30 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 2.5, duration: 0.5 }}
             whileHover={{ scale: 1.1, y: -2 }}
             className="absolute top-[25%] left-[40%] bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-full p-2 shadow-[0_6px_20px_rgba(14,165,233,0.35)]"
           >
             <motion.div
               animate={{ rotate: [0, -360] }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
             >
               <Lock className="w-4 h-4 text-white" />
             </motion.div>
           </motion.div>
           
           {/* Widget 8 - Globe - Bottom Center */}
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 2.7, duration: 0.5 }}
             whileHover={{ scale: 1.1, rotate: -5 }}
             className="absolute bottom-[25%] left-[35%] bg-white/95 backdrop-blur-2xl rounded-lg p-2 shadow-lg border border-white/60"
           >
             <motion.div
               animate={{ rotate: [0, 360] }}
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
             >
               <Globe className="w-4 h-4 text-[#7C3AED]" />
             </motion.div>
           </motion.div>
         </div>
       </div>
 
       {/* Decorative Accent Lines */}
       <motion.div 
         animate={{ opacity: [0.2, 0.5, 0.2] }}
         transition={{ duration: 4, repeat: Infinity }}
         className="absolute top-0 left-[48%] w-px h-full bg-gradient-to-b from-transparent via-[#BB81B5]/25 to-transparent hidden lg:block pointer-events-none"
       />
 
       {/* Main Content */}
       <div className="relative z-10 min-h-[70vh] flex items-center">
         <div className="container mx-auto px-6 lg:px-12">
           <div className="max-w-xl py-20 lg:py-0 pb-28">
             
             {/* Prestige Marker */}
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               className="flex items-center gap-3 mb-6"
             >
               <div className="flex items-center gap-2">
                 <motion.div
                   animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
                   transition={{ duration: 4, repeat: Infinity }}
                 >
                   <Sparkles className="w-4 h-4 text-[#F8926A]" />
                 </motion.div>
                 <motion.div 
                   animate={{ scaleX: [1, 1.2, 1] }}
                   transition={{ duration: 3, repeat: Infinity }}
                   className="w-12 h-1 rounded-full bg-gradient-to-r from-[#F8926A] via-[#E879A9] to-[#BB81B5]"
                 />
               </div>
               <span className="text-[10px] font-bold tracking-[0.25em] text-[#1a1a2e]/60 uppercase">
                 Est. 2020 — Ohio
               </span>
             </motion.div>
 
             {/* Monumental Headline */}
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, delay: 0.2 }}
             >
               <h1 className="mb-5">
                 <motion.span 
                   animate={{ opacity: [0.9, 1, 0.9] }}
                   transition={{ duration: 3, repeat: Infinity }}
                   className="block text-3xl sm:text-4xl md:text-5xl font-light text-[#1a1a2e] leading-[1.1] tracking-[-0.02em] mb-2"
                   style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                   Uncompromising
                 </motion.span>
                 <motion.span 
                   animate={{ 
                     backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                   }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   className="block text-4xl sm:text-5xl md:text-6xl font-black leading-[0.95] tracking-[-0.02em]"
                   style={{ 
                     fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                     background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 20%, #BB81B5 40%, #7C3AED 60%, #6366F1 80%, #F8926A 100%)',
                     backgroundSize: '200% 200%',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     filter: 'drop-shadow(0 2px 12px rgba(187, 129, 181, 0.25))',
                   }}>
                   Protection
                 </motion.span>
               </h1>
             </motion.div>
 
             {/* Refined Body */}
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.4 }}
               className="text-base md:text-lg text-[#1a1a2e]/65 mb-8 leading-relaxed max-w-md font-light"
             >
               Veteran-supporting. Enterprise-caliber AI security safeguarding 
               <motion.span 
                 animate={{ opacity: [0.8, 1, 0.8] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="text-[#1a1a2e] font-medium bg-gradient-to-r from-[#F8926A]/15 to-[#BB81B5]/15 px-1.5 py-0.5 rounded-md"
               > over 500 families </motion.span>
               and businesses from evolving digital threats.
             </motion.p>
 
             {/* Luxe CTAs */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.5 }}
               className="flex flex-col sm:flex-row gap-4"
             >
               <motion.div
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.98 }}
               >
                 <Link 
                   to="/training"
                   className="group inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full font-bold text-sm tracking-wide text-white shadow-lg hover:shadow-[0_12px_35px_-8px_rgba(248,146,106,0.6)] transition-all duration-300"
                   style={{ 
                     background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 50%, #BB81B5 100%)',
                     boxShadow: '0 8px 25px -6px rgba(248, 146, 106, 0.45)'
                   }}
                 >
                   <Zap className="w-4 h-4" />
                   Begin Protection
                   <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                 </Link>
               </motion.div>
               
               <motion.div
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.98 }}
               >
                 <Link 
                   to="/business"
                   className="inline-flex items-center justify-center h-12 px-8 rounded-full border-2 border-[#1a1a2e]/12 text-[#1a1a2e]/65 font-bold text-sm tracking-wide hover:border-[#BB81B5]/50 hover:text-[#1a1a2e] hover:bg-white/40 hover:shadow-md transition-all duration-300"
                 >
                   For Businesses
                 </Link>
               </motion.div>
             </motion.div>
 
             {/* Quick Stats Row */}
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, delay: 0.7 }}
               className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[#1a1a2e]/8"
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
                   whileHover={{ scale: 1.15, y: -2 }}
                   transition={{ type: "spring", stiffness: 300 }}
                 >
                   <motion.div 
                     animate={{ opacity: [0.85, 1, 0.85] }}
                     transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                     className="text-2xl lg:text-3xl font-black" 
                     style={{
                       background: 'linear-gradient(135deg, #1a1a2e 0%, #7C3AED 50%, #BB81B5 100%)',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent'
                     }}>{stat.value}</motion.div>
                   <div className="text-[10px] font-semibold text-[#1a1a2e]/45 uppercase tracking-wide">{stat.label}</div>
                 </motion.div>
               ))}
             </motion.div>
           </div>
         </div>
       </div>
 
       {/* Privacy Notice */}
       <motion.div 
         initial={{ opacity: 0, scale: 0.9 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.6, delay: 1 }}
         whileHover={{ scale: 1.02 }}
         className="absolute top-5 left-1/2 -translate-x-1/2 z-20"
       >
         <div className="flex items-center gap-2 px-4 py-2 bg-white/85 backdrop-blur-xl rounded-full border border-[#1a1a2e]/8 shadow-md">
           <motion.div
             animate={{ opacity: [0.7, 1, 0.7] }}
             transition={{ duration: 2, repeat: Infinity }}
           >
             <Eye className="w-3.5 h-3.5 text-[#BB81B5]" />
           </motion.div>
           <span className="text-xs text-[#1a1a2e]/55">
             <span className="font-medium text-[#1a1a2e]/70">Privacy:</span> AI-generated images protect identities
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
         <div className="bg-white/85 backdrop-blur-2xl border-t border-[#1a1a2e]/8 shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
           <div className="container mx-auto px-6 lg:px-8 py-4">
             <div className="flex flex-wrap items-center justify-between gap-6">
               
               {/* Trust Circles + Stars */}
               <div className="flex items-center gap-4">
                 <div className="flex -space-x-2">
                   {['#EAB308', '#3B82F6', '#10B981', '#8B5CF6'].map((color, i) => (
                     <motion.div 
                       key={i}
                       initial={{ scale: 0, opacity: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
                       whileHover={{ scale: 1.2, zIndex: 10, y: -2 }}
                       className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-md cursor-pointer"
                       style={{ backgroundColor: color, boxShadow: `0 3px 12px ${color}45` }}
                     >
                       {['S', 'T', 'C', 'F'][i]}
                     </motion.div>
                   ))}
                 </div>
                 <div>
                   <div className="flex gap-0.5 mb-0.5">
                     {[...Array(5)].map((_, i) => (
                       <motion.div
                         key={i}
                         animate={{ scale: [1, 1.15, 1] }}
                         transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                       >
                         <Star className="w-3 h-3 fill-[#EAB308] text-[#EAB308]" />
                       </motion.div>
                     ))}
                   </div>
                   <span className="text-xs font-medium text-[#1a1a2e]/60">Trusted by Ohio</span>
                 </div>
               </div>
 
               {/* Badges */}
               <div className="flex flex-wrap items-center gap-3">
                 {[
                   { num: "01", icon: Shield, label: "Verified Experts" },
                   { num: "02", icon: Award, label: "Ohio Certified" },
                   { num: "03", icon: Star, label: "Top Rated" }
                 ].map((badge, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ scale: 1.08, y: -1 }}
                     className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#7C3AED]/6 to-[#BB81B5]/6 rounded-lg border border-[#7C3AED]/15 hover:shadow-sm transition-all cursor-pointer"
                   >
                     <span className="text-[10px] font-bold text-[#7C3AED]">{badge.num}</span>
                     <badge.icon className="w-3 h-3 text-[#7C3AED]" />
                     <span className="text-xs font-medium text-[#1a1a2e]">{badge.label}</span>
                   </motion.div>
                 ))}
               </div>
 
               {/* Stats */}
               <div className="hidden xl:flex items-center gap-6">
                 {[
                   { value: "17%", label: "Veteran Discount", gradient: true },
                   { value: "60", label: "Day Guarantee", gradient: false }
                 ].map((stat, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ scale: 1.12 }}
                     className="text-center"
                   >
                     <div className="text-2xl font-black" style={ stat.gradient ? { 
                       background: 'linear-gradient(135deg, #F8926A 0%, #E879A9 50%, #BB81B5 100%)',
                       WebkitBackgroundClip: 'text',
                       WebkitTextFillColor: 'transparent'
                     } : { color: '#1a1a2e' }}>{stat.value}</div>
                     <div className="text-[10px] font-medium text-[#1a1a2e]/45 uppercase tracking-wide">{stat.label}</div>
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