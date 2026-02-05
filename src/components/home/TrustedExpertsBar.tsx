 import { motion } from "framer-motion";
 import { Star, Shield, Award, Users, TrendingUp, Sparkles } from "lucide-react";
 
 const stats = [
   { label: "Happy Clients", value: "500+", icon: Users },
   { label: "Success Rate", value: "99.8%", icon: TrendingUp },
   { label: "Years Active", value: "4+", icon: Award },
   { label: "Expert Rating", value: "5.0", icon: Star },
 ];
 
 const logos = [
   "TechGuard", "SecureOhio", "FamilySafe", "BizShield", "CyberWatch"
 ];
 
 export const TrustedExpertsBar = () => {
   return (
     <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #faf9f7 50%, #fff5f0 100%)' }}>
       {/* Decorative Elements */}
       <motion.div 
         className="absolute top-0 left-[20%] w-[300px] h-[300px] opacity-30 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(248,146,106,0.3) 0%, transparent 60%)',
           filter: 'blur(60px)',
         }}
       />
       <motion.div 
         className="absolute bottom-0 right-[30%] w-[250px] h-[250px] opacity-20 pointer-events-none"
         style={{
           background: 'radial-gradient(circle at center, rgba(187,129,181,0.4) 0%, transparent 60%)',
           filter: 'blur(80px)',
         }}
       />
       <div className="container mx-auto px-4">
         {/* Partner Logos */}
         <div className="text-center mb-12 relative z-10">
           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-coral-200/50 shadow-lg mb-4">
             <Sparkles className="w-4 h-4 text-coral-500" />
             <span className="text-sm font-semibold text-[#18305A] uppercase tracking-wide">Our Impact</span>
           </div>
           <p className="text-sm font-medium text-foreground/50 uppercase tracking-wider">
             Trusted by Leading Organizations
           </p>
           <div className="flex items-center justify-center gap-8 lg:gap-16 flex-wrap">
             {logos.map((logo, i) => (
               <motion.div 
                 key={logo}
                 initial={{ opacity: 0, y: 10 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ delay: i * 0.1 }}
                 viewport={{ once: true }}
                 className="px-6 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-coral-100/50 shadow-sm"
               >
                 <span className="text-lg font-bold text-[#18305A]/40 hover:text-[#18305A]/60 transition-colors cursor-default"
                   style={{ fontFamily: "'DM Sans', sans-serif" }}>
                   {logo}
                 </span>
               </motion.div>
             ))}
           </div>
         </div>
 
         {/* Stats Grid */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 relative z-10">
           {stats.map((stat, i) => (
             <motion.div 
               key={stat.label}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="text-center group"
             >
               <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-md border border-coral-200/50 shadow-lg mb-4 group-hover:scale-110 transition-transform">
                 <stat.icon className="w-7 h-7 text-coral-500" />
               </div>
               <div className="text-3xl lg:text-4xl font-black mb-1"
                 style={{ 
                   fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                   background: 'linear-gradient(135deg, #18305A 0%, #BB81B5 100%)',
                   WebkitBackgroundClip: 'text',
                   WebkitTextFillColor: 'transparent',
                 }}>
                 {stat.value}
               </div>
               <div className="text-sm text-foreground/50 font-medium">{stat.label}</div>
             </motion.div>
           ))}
         </div>
       </div>
     </section>
   );
 };