import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Award,
  BookOpen,
  Users,
  GraduationCap,
  X,
  Star,
  Briefcase,
} from "lucide-react";
import { motion } from "framer-motion";

import instructorMichael from "@/assets/instructor-michael.jpg";
import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";
import instructorAlex from "@/assets/instructor-alex.jpg";

interface Instructor {
  id: string;
  name: string;
  title: string;
  specialty: string;
  image: string;
  shortBio: string;
  fullBio: string;
  achievements: string[];
  yearsExperience: number;
  studentsHelped: string;
}

const instructors: Instructor[] = [
  {
    id: "instructor-1",
    name: "Dr. Michael Thompson",
    title: "Senior Cybersecurity Instructor",
    specialty: "AI & Deepfake Detection",
    image: instructorMichael,
    shortBio: "At 45, a dynamic FBI cyber analyst veteran with 20+ years protecting families from digital threats.",
    fullBio: "At 45, Dr. Michael Thompson brings two decades of FBI Cyber Division experience to his teaching. Specializing in fraud prevention and digital forensics, he's dedicated his career to educating families about emerging cyber threats. His approachable teaching style makes complex security concepts easy to understand for people of all ages.",
    achievements: ["FBI Distinguished Service Medal", "Author of 'Digital Defense for Families'", "Trained 50,000+ individuals nationwide", "PhD in Computer Science, MIT"],
    yearsExperience: 20,
    studentsHelped: "50,000+",
  },
  {
    id: "instructor-2",
    name: "Margaret Stevens",
    title: "Family Safety Specialist",
    specialty: "Senior & Family Protection",
    image: instructorSarah,
    shortBio: "Dedicated to making cybersecurity accessible for seniors and multi-generational families.",
    fullBio: "Margaret Stevens brings warmth and patience to every classroom. With a background in social work and technology education, she understands the unique challenges that seniors face in the digital world. Her programs are designed with empathy, ensuring everyone feels comfortable asking questions.",
    achievements: ["AARP Cybersecurity Educator of the Year", "Masters in Gerontology Technology", "Created 'Scam-Proof Seniors' program", "Featured in NBC News safety segment"],
    yearsExperience: 20,
    studentsHelped: "30,000+",
  },
  {
    id: "instructor-3",
    name: "Robert Mitchell",
    title: "Corporate Security Trainer",
    specialty: "Business & Enterprise Security",
    image: instructorJames,
    shortBio: "At 45, a Fortune 500 security consultant helping businesses protect their teams and data.",
    fullBio: "At 45, Robert Mitchell has consulted for some of the world's largest corporations on cybersecurity training and awareness programs. His engaging presentation style and real-world case studies make security training memorable and actionable.",
    achievements: ["CISSP & CISM Certified", "Consulted for Fortune 500 companies", "Keynote speaker at DEF CON", "MBA, Stanford University"],
    yearsExperience: 20,
    studentsHelped: "25,000+",
  },
  {
    id: "instructor-4",
    name: "Dr. Catherine Brooks",
    title: "Digital Wellness Expert",
    specialty: "Privacy & Social Media Safety",
    image: instructorPriya,
    shortBio: "Helping families navigate social media, privacy settings, and online reputation safely.",
    fullBio: "Dr. Catherine Brooks combines her psychology background with deep technical knowledge to help families understand the emotional and practical aspects of online safety. Her research on social engineering and manipulation tactics has been published in leading journals.",
    achievements: ["Published researcher in Cyber Psychology", "TEDx Speaker on Digital Wellness", "Author of 'Connected & Protected'", "PhD in Behavioral Science"],
    yearsExperience: 15,
    studentsHelped: "20,000+",
  },
  {
    id: "instructor-5",
    name: "David Anderson",
    title: "Emerging Threats Analyst",
    specialty: "AI Scams & Modern Threats",
    image: instructorAlex,
    shortBio: "At 55, a seasoned expert on cutting-edge AI scams, voice cloning, and next-generation threats.",
    fullBio: "At 55, David Anderson represents experienced leadership in cybersecurity education. With extensive hands-on experience tracking emerging threats, David brings seasoned perspectives to our workshop programs. His workshops on AI-powered scams, voice cloning detection, and cryptocurrency fraud are among our most requested sessions.",
    achievements: ["Certified Ethical Hacker (CEH)", "Contributor to WIRED Magazine", "Developed AI scam detection tools", "BS Computer Science, Carnegie Mellon"],
    yearsExperience: 25,
    studentsHelped: "35,000+",
  },
];

export const InstructorShowcase = () => {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null);

  return (
    <>
      <section className="py-10 sm:py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-block text-xs uppercase tracking-[0.15em] font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
              Meet Your Instructors
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground mb-4">
              Learn From Industry <span className="text-primary">Experts</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our instructors combine decades of real-world experience with a passion for teaching.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="group p-5 text-center cursor-pointer bg-card border border-border/60 rounded-2xl shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                onClick={() => setSelectedInstructor(instructor)}
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 rounded-full overflow-hidden ring-2 ring-border group-hover:ring-primary/40 transition-all">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    width={96}
                    height={96}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-bold text-sm md:text-base mb-1 text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {instructor.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                  {instructor.title}
                </p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] md:text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {instructor.specialty}
                </span>
                <p className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  View Bio →
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-6 sm:gap-10 bg-card border border-border/60 rounded-2xl px-6 sm:px-10 py-4 shadow-sm">
              <div className="text-center">
                <p className="text-2xl font-black text-primary">80+</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">Years Combined</p>
              </div>
              <div className="w-px h-10 bg-border/60" />
              <div className="text-center">
                <p className="text-2xl font-black text-primary">140K+</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">Students Helped</p>
              </div>
              <div className="w-px h-10 bg-border/60" />
              <div className="text-center">
                <p className="text-2xl font-black text-primary">5</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-bold">Specialists</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        Instructor Biography Modal — refined compact panel.
        Small-to-medium width (460px), tight vertical rhythm, premium
        layered header + body. No full-screen container.
      */}
      <Dialog open={!!selectedInstructor} onOpenChange={() => setSelectedInstructor(null)}>
        <DialogContent className="sm:max-w-[460px] p-0 overflow-hidden bg-card border border-border/60 gap-0">
          <DialogTitle className="sr-only">
            {selectedInstructor?.name} - Instructor Profile
          </DialogTitle>
          <DialogDescription className="sr-only">
            View the biography, achievements, and experience of {selectedInstructor?.name}
          </DialogDescription>

          <button
            onClick={() => setSelectedInstructor(null)}
            className="absolute top-2.5 right-2.5 z-50 w-7 h-7 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-3.5 h-3.5" />
          </button>

          {selectedInstructor && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header — smaller avatar + tighter rhythm */}
              <div className="bg-gradient-to-b from-muted/60 to-muted/20 px-5 pt-5 pb-4 text-center border-b border-border/50">
                <div className="w-16 h-16 mx-auto mb-2.5 rounded-full overflow-hidden ring-2 ring-primary/30 ring-offset-2 ring-offset-card">
                  <img
                    src={selectedInstructor.image}
                    alt={selectedInstructor.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-base font-bold text-foreground leading-tight mb-0.5">
                  {selectedInstructor.name}
                </h2>
                <p className="text-[11px] text-muted-foreground mb-2">{selectedInstructor.title}</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary border border-primary/20">
                  {selectedInstructor.specialty}
                </span>
              </div>

              {/* Body — denser spacing, smaller type */}
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-muted/40 rounded-lg border border-border/40">
                    <Briefcase className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground leading-tight">Experience</p>
                      <p className="font-bold text-xs text-foreground leading-tight">
                        {selectedInstructor.yearsExperience} Years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 bg-muted/40 rounded-lg border border-border/40">
                    <Users className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[10px] text-muted-foreground leading-tight">Students</p>
                      <p className="font-bold text-xs text-foreground leading-tight">
                        {selectedInstructor.studentsHelped}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-[11px] uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-foreground">
                    <BookOpen className="w-3 h-3 text-primary" />
                    About
                  </h3>
                  <p className="text-[12.5px] text-muted-foreground leading-relaxed">
                    {selectedInstructor.fullBio}
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[11px] uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-foreground">
                    <Award className="w-3 h-3 text-primary" />
                    Achievements
                  </h3>
                  <ul className="space-y-1">
                    {selectedInstructor.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-[12px]">
                        <Star className="w-2.5 h-2.5 text-primary mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground leading-snug">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  size="sm"
                  className="w-full rounded-full font-bold h-9 text-xs"
                  onClick={() => setSelectedInstructor(null)}
                >
                  Book a Session with {selectedInstructor.name.split(" ")[0]}
                </Button>
              </div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
