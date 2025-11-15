import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { SEO } from "@/components/SEO";
import heroCareers from "@/assets/hero-careers-new.jpg";

function Careers() {
  return (
    <>
      <SEO title="Careers" description="Join the InVision Network team" />
      <Navigation />
      <Hero backgroundImage={heroCareers} headline="Join Our Team" subheadline="Help us protect families" />
      <TrustBar />
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-8">Open Positions</h2>
        <p className="text-center text-muted-foreground">Job listings coming soon</p>
      </div>
      <Footer />
    </>
  );
}

export default Careers;
