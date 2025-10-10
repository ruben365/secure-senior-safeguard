import { ExternalLink } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

interface Partner {
  name: string;
  logo: string;
  url: string;
  use: string;
  badge?: string;
}

const aiPartners: Partner[] = [
  {
    name: "Anthropic — Claude",
    logo: "/placeholder.svg",
    url: "https://www.anthropic.com/claude",
    use: "Model safety research & AI literacy",
    badge: "Responsible AI"
  },
  {
    name: "OpenAI",
    logo: "/placeholder.svg",
    url: "https://openai.com/",
    use: "Education tools & prototyping",
    badge: "Privacy-First"
  },
  {
    name: "Microsoft Azure AI",
    logo: "/placeholder.svg",
    url: "https://azure.microsoft.com/",
    use: "Enterprise integrations"
  },
  {
    name: "Google Cloud AI",
    logo: "/placeholder.svg",
    url: "https://cloud.google.com/ai",
    use: "Data & infrastructure"
  },
  {
    name: "Hugging Face",
    logo: "/placeholder.svg",
    url: "https://huggingface.co/",
    use: "Models & evaluation",
    badge: "Responsible AI"
  },
  {
    name: "Meta AI",
    logo: "/placeholder.svg",
    url: "https://ai.meta.com/",
    use: "Open models"
  },
  {
    name: "Cohere",
    logo: "/placeholder.svg",
    url: "https://cohere.com/",
    use: "LLM & embeddings"
  },
  {
    name: "Twilio",
    logo: "/placeholder.svg",
    url: "https://www.twilio.com/",
    use: "SMS alerts"
  },
  {
    name: "Retell AI",
    logo: "/placeholder.svg",
    url: "https://www.retellai.com/",
    use: "Voice agent"
  },
  {
    name: "Stripe",
    logo: "/placeholder.svg",
    url: "https://stripe.com/",
    use: "Payments & invoicing",
    badge: "Privacy-First"
  }
];

const Partners = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              AI Partners & Technology
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Collaborating with industry-leading AI companies to deliver safe, responsible, and accessible AI education.
            </p>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="pb-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {aiPartners.map((partner, index) => (
                <a
                  key={index}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-card rounded-2xl p-6 shadow-subtle hover:shadow-strong transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center"
                >
                  <div className="w-full h-24 flex items-center justify-center mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
                    <img 
                      src={partner.logo} 
                      alt={`${partner.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  
                  <h3 className="font-bold mb-2 text-sm">{partner.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{partner.use}</p>
                  
                  {partner.badge && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                      {partner.badge}
                    </span>
                  )}
                  
                  <ExternalLink className="w-4 h-4 mt-2 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 px-4">
          <div className="container mx-auto">
            <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Interested in Partnership?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join us in making AI education accessible, safe, and responsible for everyone.
              </p>
              <Button size="lg" asChild>
                <a href="/contact?type=partner">
                  Become a Partner
                </a>
              </Button>
            </div>
          </div>
        </section>

      <Footer />
    </div>
  );
};

export default Partners;
