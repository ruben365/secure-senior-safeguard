import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import { SEO } from "@/components/SEO";
import heroContact from "@/assets/hero-contact-new.jpg";

function Contact() {
  return (
    <>
      <SEO title="Contact Us" description="Get in touch with InVision Network" />
      <Navigation />
      <Hero backgroundImage={heroContact} headline="Contact Us" subheadline="We're here to help" />
      <TrustBar />
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
        <p className="text-center text-muted-foreground">Contact form coming soon</p>
      </div>
      <Footer />
    </>
  );
}

export default Contact;
