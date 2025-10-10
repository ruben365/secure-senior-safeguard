import { Star } from "lucide-react";

const partners = [
  { name: "Anthropic", logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Anthropic_logo.svg" },
  { name: "OpenAI", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" },
  { name: "Meta AI", logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png" },
  { name: "Google Cloud AI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Google_Cloud_logo.svg" },
  { name: "Microsoft Azure", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg" },
  { name: "Hugging Face", logo: "https://huggingface.co/front/assets/huggingface_logo.svg" },
  { name: "Cohere", logo: "https://cohere.com/favicon.svg" },
  { name: "Twilio", logo: "https://www.twilio.com/content/dam/twilio-com/global/en/logo/twilio-logo-red.svg" },
  { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
];

const AIPartnersCarousel = () => {
  return (
    <section className="py-16 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Powered by Industry-Leading AI Partners
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          We partner with the world's most trusted AI platforms to deliver cutting-edge security and training solutions
        </p>

        {/* Logo Carousel */}
        <div className="relative mb-8">
          <div className="flex animate-scroll space-x-12 items-center">
            {/* Duplicate partners array for seamless loop */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-w-full max-h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Star Reviews */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            ★★★★★ Trusted by our users • Rated 5.0 on Google Reviews
          </p>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default AIPartnersCarousel;
