import { useState } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import teamRuben from '@/assets/team-ruben.jpg';
import teamCorine from '@/assets/team-corine.jpg';
import teamDavid from '@/assets/team-david.jpg';
import teamSarah from '@/assets/team-sarah.jpg';
import teamMichael from '@/assets/team-michael.jpg';
import teamPriya from '@/assets/team-priya.jpg';
import teamJames from '@/assets/team-james.jpg';
import teamMaria from '@/assets/team-maria.jpg';
import teamAlex from '@/assets/team-alex.jpg';
import teamEmily from '@/assets/team-emily.jpg';
import teamJordan from '@/assets/team-jordan.jpg';

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
    title: "CEO & Founder",
    summary: "Visionary leader in AI strategy and security innovation.",
    bio: "Ruben founded InVision Network with a mission to protect families and businesses from AI-powered threats. With over 15 years of experience in cybersecurity and AI strategy, he leads our team in developing cutting-edge training programs and security solutions. His expertise spans threat intelligence, risk assessment, and building resilient communities.",
    image: teamRuben,
    linkedin: "https://www.linkedin.com/",
    email: "ruben@invisionnetwork.com"
  },
  {
    name: "Corine Mitchell",
    title: "Director of Health & Community Outreach",
    summary: "Connecting families with AI safety education and support.",
    bio: "Corine specializes in bringing AI safety training to families, seniors, and community organizations. She designs accessible workshops that empower non-technical audiences to recognize and defend against scams. Her background in healthcare and community advocacy makes her uniquely positioned to bridge the gap between technology and human connection.",
    image: teamCorine,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "David Chen",
    title: "Chief Technology Officer",
    summary: "Building secure AI infrastructure for businesses.",
    bio: "David leads our technical team in developing advanced AI security tools and automation solutions. With expertise in machine learning, cloud infrastructure, and cybersecurity, he ensures our clients receive enterprise-grade protection. He's passionate about making complex technology accessible and practical for small businesses.",
    image: teamDavid,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Sarah Williams",
    title: "VP of Training & Education",
    summary: "Creating transformative learning experiences.",
    bio: "Sarah designs and delivers our comprehensive training programs for individuals and organizations. Her expertise in adult education and instructional design ensures every participant gains practical skills to protect themselves and their businesses. She's committed to making AI literacy accessible to everyone.",
    image: teamSarah,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Michael Hassan",
    title: "Lead Security Analyst",
    summary: "Expert in threat detection and response strategies.",
    bio: "Michael monitors emerging AI-powered threats and develops defensive strategies for our clients. His background in cybersecurity and threat intelligence helps us stay ahead of evolving scam tactics. He conducts security assessments and trains teams on incident response protocols.",
    image: teamMichael,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Priya Patel",
    title: "Director of Business Solutions",
    summary: "Empowering SMBs with AI automation and security.",
    bio: "Priya works directly with small and medium businesses to implement AI solutions that improve efficiency while maintaining security. She specializes in workflow automation, customer service AI, and building privacy-first systems. Her goal is to make enterprise-level AI accessible to growing businesses.",
    image: teamPriya,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "James Robinson",
    title: "Senior Training Specialist",
    summary: "Delivering hands-on AI safety workshops.",
    bio: "James brings AI security concepts to life through interactive training sessions and simulations. He specializes in teaching seniors and families how to recognize deepfakes, phishing attempts, and social engineering tactics. His engaging teaching style makes complex topics easy to understand.",
    image: teamJames,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Maria Rodriguez",
    title: "Customer Success Manager",
    summary: "Ensuring every client achieves their security goals.",
    bio: "Maria guides clients through their journey with InVision Network, from onboarding to ongoing support. She tracks success metrics, gathers feedback, and ensures our solutions deliver measurable results. Her dedication to client outcomes drives continuous improvement across our services.",
    image: teamMaria,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Alex Thompson",
    title: "Operations Manager",
    summary: "Streamlining processes for maximum efficiency.",
    bio: "Alex ensures our operations run smoothly, coordinating between teams and managing resources effectively. He optimizes workflows, implements quality controls, and maintains the high standards our clients expect. His organizational skills keep InVision Network operating at peak performance.",
    image: teamAlex,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Emily Zhang",
    title: "Marketing & Communications Lead",
    summary: "Spreading awareness about AI safety.",
    bio: "Emily manages our marketing campaigns and community outreach initiatives. She creates educational content, coordinates events, and builds partnerships that expand our reach. Her creative approach helps us connect with diverse audiences and grow our impact.",
    image: teamEmily,
    linkedin: "https://www.linkedin.com/"
  },
  {
    name: "Jordan Brooks",
    title: "Cybersecurity Research Analyst",
    summary: "Investigating emerging AI threats and vulnerabilities.",
    bio: "Jordan researches the latest AI-powered attack vectors and develops countermeasures. He publishes threat reports, conducts security audits, and keeps our team informed about evolving risks. His research directly informs our training curriculum and security protocols.",
    image: teamJordan,
    linkedin: "https://www.linkedin.com/"
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <Hero
          useTransitioningBackground={true}
          headline="Meet the InVision Network Team"
          subheadline="Dedicated professionals protecting families from AI-powered scams with expertise, empathy, and unwavering commitment."
          showScrollIndicator={true}
        />

        {/* Team Grid */}
        <section className="pb-24 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {teamMembers.map((member, index) => (
                <article 
                  key={index}
                  className="group bg-card rounded-xl p-4 shadow-subtle hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
                  itemScope
                  itemType="https://schema.org/Person"
                >
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.title}`}
                    className="w-full aspect-square object-cover rounded-xl mb-3"
                    itemProp="image"
                    loading="lazy"
                  />
                  <h2 className="text-lg font-bold mb-1" itemProp="name">{member.name}</h2>
                  <p className="text-primary font-semibold text-sm mb-2" itemProp="jobTitle">{member.title}</p>
                  <p className="text-muted-foreground text-xs mb-3 line-clamp-2">{member.summary}</p>
                  
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
                    size="sm"
                    className="w-full text-xs"
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
              className="w-24 h-24 rounded-xl object-cover mx-auto"
            />
            <p className="text-muted-foreground leading-relaxed text-sm">{selectedMember?.bio}</p>
            
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
