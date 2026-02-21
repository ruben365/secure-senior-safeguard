import { Shield, Award, Building2, GraduationCap, Heart, Landmark } from "lucide-react";

const partners = [
  { name: "FBI Cyber Division", icon: Shield },
  { name: "Ohio Attorney General", icon: Landmark },
  { name: "AARP Ohio", icon: Heart },
  { name: "Dayton Chamber", icon: Building2 },
  { name: "Wright State University", icon: GraduationCap },
  { name: "BBB Accredited", icon: Award },
];

export const PartnerLogosSection = () => {
  return (
    <section className="py-12 md:py-16 border-y border-border/40">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-8">
          Trusted Partners & Affiliations
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <partner.icon className="w-8 h-8 text-muted-foreground/60" />
              <span className="text-xs font-medium text-muted-foreground text-center leading-tight">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogosSection;
