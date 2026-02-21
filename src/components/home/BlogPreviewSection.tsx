import { Link } from "react-router-dom";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const posts = [
  {
    category: "AI Threats",
    title: "How Voice Cloning Scams Tripled in 2025",
    excerpt:
      "New FBI data shows voice cloning attacks against seniors increased 300% this year. Here is what your family needs to know right now.",
    readTime: "4 min read",
    date: "Feb 2026",
  },
  {
    category: "Protection Tips",
    title: "5 Signs That Phone Call Is a Deepfake",
    excerpt:
      "Scammers are getting better, but these five telltale signs still give them away every time.",
    readTime: "3 min read",
    date: "Feb 2026",
  },
  {
    category: "Business Security",
    title: "Why Ohio Businesses Are the #1 Target for AI Fraud",
    excerpt:
      "Mid-market companies in the Midwest face a unique set of AI-powered threats. Our analysis breaks down the data.",
    readTime: "5 min read",
    date: "Jan 2026",
  },
];

export const BlogPreviewSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Latest Insights
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-[1.1]">
              Security News & Tips
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-sm font-semibold rounded-lg"
          >
            <Link to="/articles">
              View All Articles <ArrowRight className="ml-2 w-3.5 h-3.5" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {posts.map((post) => (
            <Link
              key={post.title}
              to="/articles"
              className="group flex flex-col p-6 rounded-lg border border-border/60 bg-card hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  {post.category}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
                <span>{post.date}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
