import { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface TeamMember {
  name: string;
  title: string;
  summary: string;
  bio: string;
  image: string;
  linkedin?: string;
  email?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Ruben Mukala",
    title: "Founder & AI Safety Lead",
    summary: "AI security education and community safety advocate.",
    bio: "Leads senior/family AI safety curriculum, threat modeling, and partnerships.",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/",
    email: "contact@invisionnetwork.com"
  },
  {
    name: "Corine M.",
    title: "Community Health & Training",
    summary: "Bridges healthcare literacy with AI risk awareness.",
    bio: "Designs safety workshops for seniors, caregivers, and churches.",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "James K.",
    title: "Automation Architect",
    summary: "SMB workflow and cost‑savings automations.",
    bio: "Builds privacy‑first automations for small businesses.",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Debbie N.",
    title: "Client Success Director",
    summary: "Onboarding, metrics, and trust programs.",
    bio: "Owns outcomes, NPS, and testimonial pipeline.",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Alex P.",
    title: "Cybersecurity Analyst",
    summary: "Phishing, deepfake, and fraud response.",
    bio: "Runs tabletop drills and scam‑shield playbooks.",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Maya L.",
    title: "Learning Experience Designer",
    summary: "Hands‑on AI literacy for non‑technical users.",
    bio: "Creates accessible curricula and visuals.",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Omar R.",
    title: "Partnerships & Grants",
    summary: "Coalitions with civic, veteran, and faith groups.",
    bio: "Grows reach via mission‑aligned partners.",
    image: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/"
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-primary/5">
        <Navigation />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Meet the InVision Network Team
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate experts dedicated to AI safety education and empowering families to navigate the digital age securely.
            </p>
          </div>
        </section>

        {/* Team Grid */}
        <section className="pb-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <article 
                  key={index}
                  className="group bg-card rounded-2xl p-6 shadow-subtle hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.title}`}
                    className="w-full aspect-square object-cover rounded-2xl mb-4"
                    itemProp="image"
                    loading="lazy"
                  />
                  <h2 className="text-xl font-bold mb-1" itemProp="name">{member.name}</h2>
                  <p className="text-primary font-semibold mb-2" itemProp="jobTitle">{member.title}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.summary}</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    {member.linkedin && (
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`${member.name}'s LinkedIn profile`}
                        itemProp="sameAs"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.email && (
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                  </div>

                  <Button 
                    onClick={() => setSelectedMember(member)}
                    variant="outline"
                    className="w-full"
                  >
                    View Bio
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

      <Footer />

      {/* Bio Modal */}
      <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedMember?.name}</DialogTitle>
            <DialogDescription className="text-primary font-semibold">
              {selectedMember?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <img 
              src={selectedMember?.image} 
              alt={selectedMember?.name}
              className="w-32 h-32 rounded-2xl object-cover mx-auto"
            />
            <p className="text-muted-foreground leading-relaxed">{selectedMember?.bio}</p>
            <p className="text-sm text-muted-foreground italic">{selectedMember?.summary}</p>
            
            <div className="flex items-center gap-3 pt-4 justify-center">
              {selectedMember?.linkedin && (
                <a 
                  href={selectedMember.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              {selectedMember?.email && (
                <a 
                  href={`mailto:${selectedMember.email}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Team;
