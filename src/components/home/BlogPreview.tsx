import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import heroArticles1 from "@/assets/hero-articles-1.jpg";
import heroArticles2 from "@/assets/hero-articles-2.jpg";
import heroArticles3 from "@/assets/hero-articles-3.jpg";

const articles = [
  {
    image: heroArticles1,
    category: "Security Tips",
    title: "The Ultimate Guide to Protecting Your Family From AI Scams",
    date: "Dec 2024",
  },
  {
    image: heroArticles2,
    category: "AI Awareness",
    title: "How To Recognize AI-Generated Voice Scams",
    date: "Dec 2024",
  },
  {
    image: heroArticles3,
    category: "Prevention",
    title: "Why Do Scam Tactics Keep Evolving?",
    date: "Dec 2024",
  },
];

export const BlogPreview = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Learn From Our <span className="font-display italic text-primary">Latest Blog</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Stay informed with the latest cybersecurity tips and protection strategies.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {articles.map((article, index) => (
            <div key={index} className="group">
              <Link to="/articles" className="block">
                <div className="bg-card rounded-3xl overflow-hidden border border-border/30 shadow-sm hover:-translate-y-2 transition-all duration-300">
                  <div className="relative p-5 pb-0">
                    <div className="rounded-2xl overflow-hidden aspect-square border border-border/20">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                      <span className="inline-block px-4 py-1.5 bg-foreground text-background text-xs font-semibold rounded-full shadow-sm">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">{article.date}</span>
                    </div>
                    <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug">
                      {article.title}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-full h-11 px-8 font-semibold border-foreground/20 hover:bg-foreground hover:text-background transition-all">
            <Link to="/articles">
              View All Articles
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
