import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Play, ChevronRight, Sparkles, Star, TrendingUp, Award, Users } from "lucide-react";
import { useRef, useMemo, useState, useEffect } from "react";
import heroVideoFamily from "@/assets/hero-video-family.mp4";
import heroVideoCybersecurity from "@/assets/hero-video-cybersecurity.mp4";

const heroVideos = [heroVideoFamily, heroVideoCybersecurity];

export const HeroHomepage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const selectedVideo = useMemo(() => heroVideos[Math.floor(Math.random() * heroVideos.length)], []);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setShowDisclaimer(true), 7000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActiveMetric(prev => (prev + 1) % 3), 3000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { num: "500+", label: "Families Protected", icon: Users },
    { num: "99.8%", label: "Success Rate", icon: TrendingUp },
    { num: "#1", label: "Ohio Rated", icon: Award },
  ];
  
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Split Background - Editorial Style */}
      <div className="absolute inset-0 flex">
        {/* Left Panel - Pure Dark */}
        <div className="w-full lg:w-[55%] bg-[#0a0a0a] relative">
          {/* Subtle grain texture */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }} />
          
          {/* Premium Gradient Orb */}
          <div className="absolute -right-40 top-1/4 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ 
              background: 'conic-gradient(from 180deg, #F8926A, #BB81B5, #18305A, #F8926A)',
              filter: 'blur(120px)'
            }} />
        </div>
        
        {/* Right Panel - Video/Image */}
        <div className="hidden lg:block w-[45%] relative">
          <video 
            ref={videoRef} 
            autoPlay loop muted playsInline preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={selectedVideo} type="video/mp4" />
          </video>
          {/* Gradient overlay from left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a]/40" />
        </div>
      </div>

      {/* Mobile Video Background */}
      <div className="lg:hidden absolute inset-0">
        <video 
          autoPlay loop muted playsInline preload="none"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src={selectedVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0a0a0a]/80" />
      </div>

      {/* Editorial Grid Lines */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <div className="absolute left-[55%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-coral-400/20 via-transparent to-transparent" />
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-0">
          <div className="max-w-4xl">
            {/* Editorial Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="h-px w-12 bg-gradient-to-r from-coral-400 to-transparent" />
              <span className="text-coral-400 text-xs font-bold tracking-[0.3em] uppercase">Est. 2020 • Ohio</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-coral-400 text-coral-400" />
                ))}
              </div>
            </div>
          
            {/* Giant Editorial Headline */}
            <h1 className="mb-8">
              <span className="block text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85]"
                style={{ fontFamily: "'Clash Display', 'DM Sans', sans-serif" }}>
                AI Scam
              </span>
              <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.85] mt-2"
                style={{ 
                  fontFamily: "'Clash Display', 'DM Sans', sans-serif",
                  background: 'linear-gradient(135deg, #F8926A 0%, #F6D7DD 40%, #BB81B5 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 4px 30px rgba(248,146,106,0.3))'
                }}>
                Protection
              </span>
            </h1>

            {/* Editorial Subline with Vertical Divider */}
            <div className="flex items-start gap-6 mb-10">
              <div className="w-px h-20 bg-gradient-to-b from-coral-400 to-lavender-500 flex-shrink-0 hidden sm:block" />
              <div>
                <p className="text-white/60 text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-xl">
                  Veteran-owned. Ohio-based. <span className="text-white font-medium">Protecting families</span> and <span className="text-coral-300 font-medium">automating businesses</span> with enterprise-grade AI security.
                </p>
              </div>
            </div>

            {/* Premium Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <Button asChild size="lg" 
                className="group relative h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-semibold rounded-none overflow-hidden border-0"
                style={{
                  background: 'linear-gradient(135deg, #F8926A 0%, #F6D7DD 50%, #BB81B5 100%)',
                }}>
                <Link to="/training" className="text-[#050508]">
                  Protect My Family
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild size="lg" 
                className="group h-14 sm:h-16 px-8 sm:px-10 text-base sm:text-lg font-semibold rounded-none text-white bg-transparent"
                style={{
                  border: '1px solid rgba(255,255,255,0.2)',
                }}>
                <Link to="/business">
                  Business Solutions
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>

            {/* Animated Metric Ticker */}
            <div className="flex items-center gap-8">
              {metrics.map((metric, i) => (
                <div 
                  key={metric.label}
                  className={`transition-all duration-500 cursor-pointer ${activeMetric === i ? 'opacity-100' : 'opacity-30 hover:opacity-50'}`}
                  onClick={() => setActiveMetric(i)}
                >
                  <div className="flex items-center gap-3">
                    <metric.icon className={`w-5 h-5 ${activeMetric === i ? 'text-coral-400' : 'text-white/40'}`} />
                    <span className={`text-3xl sm:text-4xl font-black ${activeMetric === i ? 'text-white' : 'text-white/40'}`}
                      style={{ fontFamily: "'Clash Display', sans-serif" }}>
                      {metric.num}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 ${activeMetric === i ? 'text-white/60' : 'text-white/30'}`}>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Shield Badge - Desktop Only */}
      <div className="hidden lg:flex absolute right-[15%] top-1/2 -translate-y-1/2 z-20">
        <div className="relative w-40 h-40">
          {/* Rotating ring */}
          <div className="absolute inset-0 rounded-full border border-dashed border-coral-400/30 animate-spin" 
            style={{ animationDuration: '20s' }} />
          
          {/* Shield icon */}
          <div className="absolute inset-4 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #F8926A, #BB81B5)',
              boxShadow: '0 0 60px rgba(248,146,106,0.4)'
            }}>
            <Shield className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Bottom Bar - Editorial Footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Trust badges */}
            <div className="flex items-center gap-6">
              {['Veteran Owned', 'HIPAA Compliant', '60-Day Guarantee'].map((badge) => (
                <div key={badge} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-coral-400" />
                  <span className="text-white/50 text-xs font-medium">{badge}</span>
                </div>
              ))}
            </div>
            
            {/* Watch demo button */}
            <button className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-coral-400 group-hover:bg-coral-400/10 transition-all">
                <Play className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-medium">Watch Demo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Disclaimer */}
      <div className={`absolute bottom-20 left-1/2 -translate-x-1/2 z-20 transition-all duration-1000 ${showDisclaimer ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-white/10">
          <Sparkles className="w-3 h-3 text-coral-400" />
          <span className="text-xs text-white/70">
            <span className="text-coral-400 font-medium">Privacy:</span> AI-generated imagery
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroHomepage;