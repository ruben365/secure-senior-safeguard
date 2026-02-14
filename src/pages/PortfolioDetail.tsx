import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGDProject } from "@/hooks/useGraphicDesignCMS";
import {
  ArrowLeft,
  Calendar,
  ExternalLink,
  Star,
  Wrench,
  User,
} from "lucide-react";

const PortfolioDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: project, isLoading } = useGDProject(slug || "");

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-28 pb-20 container mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-96 bg-muted rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="pt-28 pb-20 container mx-auto px-6 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Project not found
          </h1>
          <Button asChild variant="outline">
            <Link to="/portfolio">Back to Portfolio</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO
        title={project.seo_title || `${project.title} | Portfolio`}
        description={
          project.seo_meta_description ||
          project.short_description ||
          `${project.title} graphic design project`
        }
      />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Back */}
          <AnimatedSection animation="fade-up">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
          </AnimatedSection>

          {/* Hero Image */}
          {project.hero_image_url && (
            <AnimatedSection animation="fade-up" delay={100}>
              <div className="rounded-2xl overflow-hidden mb-10 aspect-[16/9] bg-muted">
                <img
                  src={project.hero_image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </AnimatedSection>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Content */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection animation="fade-up" delay={200}>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  {project.category && (
                    <Badge variant="secondary">{project.category.name}</Badge>
                  )}
                  {project.is_featured && (
                    <Badge className="bg-amber-500 text-white">
                      <Star className="w-3 h-3 mr-1 fill-current" /> Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4">
                  {project.title}
                </h1>
                {project.short_description && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {project.short_description}
                  </p>
                )}
              </AnimatedSection>

              {project.full_description && (
                <AnimatedSection animation="fade-up" delay={300}>
                  <div className="prose prose-sm max-w-none text-foreground">
                    {project.full_description.split("\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <AnimatedSection animation="fade-up" delay={350}>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Link
                        key={tag.id}
                        to={`/portfolio?tag=${tag.slug}`}
                        className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/18 transition border border-primary/15"
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </AnimatedSection>
              )}
            </div>

            {/* Sidebar */}
            <AnimatedSection animation="fade-up" delay={400}>
              <div className="space-y-4">
                <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                    Project Details
                  </h3>

                  {project.client_name && (
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Client</p>
                        <p className="text-sm font-medium text-foreground">
                          {project.client_name}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Year</p>
                      <p className="text-sm font-medium text-foreground">
                        {project.project_year}
                      </p>
                    </div>
                  </div>

                  {project.tools_used && (
                    <div className="flex items-center gap-3">
                      <Wrench className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Tools</p>
                        <p className="text-sm font-medium text-foreground">
                          {project.tools_used}
                        </p>
                      </div>
                    </div>
                  )}

                  {project.live_link && (
                    <Button asChild className="w-full mt-2">
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Live <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  )}
                </div>

                <Button asChild variant="outline" className="w-full">
                  <Link to="/contact">
                    Start a Similar Project
                  </Link>
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PortfolioDetail;
