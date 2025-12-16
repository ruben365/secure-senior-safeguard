import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import TestimonialCard from "@/components/TestimonialCard";

import MakingADifference from "@/components/MakingADifference";
import { VideoLightbox } from "@/components/VideoLightbox";
import { ScamShieldSubmission } from "@/components/ScamShieldSubmission";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SEO, PAGE_SEO } from "@/components/SEO";
import { ArrowRight } from "lucide-react";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { RotatingHeroText } from "@/components/RotatingHeroText";
import { motion } from "framer-motion";
import { HomeIntroSection } from "@/components/HomeIntroSection";
import HeroValueCards from "@/components/HeroValueCards";

// Hero images
import heroSlideshow1 from "@/assets/hero-home-1.jpg";
import heroSlideshow2 from "@/assets/hero-home-2.jpg";
import heroSlideshow3 from "@/assets/hero-home-3.jpg";
import heroSlideshow4 from "@/assets/hero-home-4.jpg";
import heroSlideshow5 from "@/assets/hero-home-5.jpg";
import heroSlideshow6 from "@/assets/hero-business-1.jpg";
import heroSlideshow7 from "@/assets/hero-training-1.jpg";

function Index() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [videoTestimonials, setVideoTestimonials] = useState<any[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<{ src: string; title: string } | null>(null);
  const [scamShieldOpen, setScamShieldOpen] = useState(false);

  const heroImages = [
    { src: heroSlideshow1, alt: "Multigenerational family learning scam prevention together" },
    { src: heroSlideshow2, alt: "Veteran protected from online scams" },
    { src: heroSlideshow3, alt: "Diverse community workshop on cybersecurity" },
    { src: heroSlideshow4, alt: "Grandfather and granddaughter using technology safely" },
    { src: heroSlideshow5, alt: "Couple receiving emergency scam assistance" },
    { src: heroSlideshow6, alt: "Veteran woman business owner with AI protection" },
    { src: heroSlideshow7, alt: "Youth teaching seniors about online safety" }
  ];

  const rotatingMessages = [
    {
      headline: "Protecting Ohio Families from AI-Powered Scams",
      subheadline: "Your parents didn't grow up with technology. Don't let scammers take advantage of that."
    },
    {
      headline: "Don't Let Scammers Steal Your Life Savings",
      subheadline: "Seniors lose $28.3 billion to scams every year. We're here to stop that."
    },
    {
      headline: "Expert Cybersecurity for Seniors & Families",
      subheadline: "Veteran-owned, Ohio-based protection you can trust."
    },
    {
      headline: "AI-Powered Protection, Human-Powered Care",
      subheadline: "Technology that protects. People who care. Results that matter."
    },
    {
      headline: "Veteran-Owned. Ohio-Based. Family-Focused.",
      subheadline: "Serving Dayton & Miami Valley with 24-hour response times."
    }
  ];

  // Counter animations
  const stat1 = useCounterAnimation({ end: 28.3, duration: 2500, prefix: "$", suffix: "B" });
  const stat2 = useCounterAnimation({ end: 87, duration: 2500, suffix: "%" });
  const stat3 = useCounterAnimation({ end: 3.4, duration: 2500, suffix: "M" });
  const stat4 = useCounterAnimation({ end: 14, duration: 2500, suffix: " sec" });

  useEffect(() => {
    checkAdminStatus();
    fetchVideoTestimonials();
  }, []);

  const fetchVideoTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials_public")
        .select(`*, testimonial_media (*)`)
        .eq("has_video", true)
        .eq("featured", true)
        .order("created_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setVideoTestimonials(data || []);
    } catch (error) {
      console.error("Error fetching video testimonials:", error);
    }
  };

  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }

      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .in("role", ["admin", "staff"]);

      if (error) {
        console.error("Error checking admin status:", error);
        setIsAdmin(false);
      } else {
        setIsAdmin(roles && roles.length > 0);
      }
    } catch (error) {
      console.error("Error in checkAdminStatus:", error);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <SEO {...PAGE_SEO.home} />
      <Navigation />
      <main id="main-content">

        {/* Hero Section */}
        <Hero
          backgroundImages={heroImages}
          showScrollIndicator={true}
          overlay={true}
        >
          <RotatingHeroText messages={rotatingMessages} interval={6000} />
        </Hero>

        <TrustBar />

        {/* Home Intro Section */}
        <HomeIntroSection />

        {/* Hero Value Cards - 3 Ways to Get Protected */}
        <HeroValueCards />

        {/* Stats Section - Clean & Professional */}
        <section className="relative py-24 bg-foreground text-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                { ref: stat1.ref, value: stat1.displayValue, label: "Lost to scams annually" },
                { ref: stat2.ref, value: stat2.displayValue, label: "Go unreported" },
                { ref: stat3.ref, value: stat3.displayValue, label: "Seniors targeted yearly" },
                { ref: stat4.ref, value: stat4.displayValue, label: "Between each victim" },
              ].map((stat, index) => (
                <div key={index} ref={stat.ref} className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-sm text-background/60 uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simple Protection Steps */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-6">
                How It Works
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Protection in four simple steps
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { num: "01", title: "Forward", desc: "Send us any suspicious email, text, or voicemail" },
                { num: "02", title: "Analyze", desc: "Our AI scans for threats in under 60 seconds" },
                { num: "03", title: "Report", desc: "Receive a detailed threat assessment" },
                { num: "04", title: "Protect", desc: "Get guidance on next steps to stay safe" },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.num}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16"
            >
              <Button asChild size="lg">
                <Link to="/training#pricing">
                  Start Your Protection
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section - Clean */}
        <section className="py-24 lg:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center mb-16"
            >
              <span className="inline-block text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-6">
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                Trusted by Ohio families
              </h2>
            </motion.div>

            {videoTestimonials.length > 0 && (
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {videoTestimonials.map((testimonial) => {
                  const videoMedia = testimonial.testimonial_media?.find((m: any) => m.media_type === "video");
                  return (
                    <motion.div 
                      key={testimonial.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                    >
                      <TestimonialCard
                        name={testimonial.name}
                        location={testimonial.location}
                        quote={testimonial.story.substring(0, 150) + "..."}
                        image={testimonial.primary_media_url || ""}
                        rating={testimonial.rating}
                        videoUrl={videoMedia?.media_url}
                        onVideoClick={() => setSelectedVideo({
                          src: videoMedia?.media_url,
                          title: `${testimonial.name}'s Story`
                        })}
                      />
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Admin prompt */}
            {!isLoading && isAdmin && videoTestimonials.length === 0 && (
              <div className="max-w-md mx-auto text-center p-12 border-2 border-dashed border-border rounded-2xl">
                <p className="text-muted-foreground mb-4">No testimonials yet</p>
                <Button asChild variant="outline">
                  <Link to="/admin/content/testimonials">Add Testimonials</Link>
                </Button>
              </div>
            )}
          </div>

          <VideoLightbox
            isOpen={selectedVideo !== null}
            onClose={() => setSelectedVideo(null)}
            videoSrc={selectedVideo?.src || ""}
            title={selectedVideo?.title}
          />
        </section>

        {/* Making a Difference */}
        <MakingADifference />

        {/* Final CTA - Simplified */}
        <section className="py-24 lg:py-32 bg-foreground text-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Ready to get protected?
            </h2>
            <p className="text-lg text-background/70 max-w-xl mx-auto mb-10">
              Join 500+ Ohio families who trust InVision Network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link to="/training#pricing">
                  View Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-background/30 text-background hover:bg-background/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
        
        <ScamShieldSubmission open={scamShieldOpen} onOpenChange={setScamShieldOpen} />
      </main>
    </div>
  );
}

export default Index;
