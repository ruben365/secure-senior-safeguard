import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PAGE_SEO } from "@/config/pageSeo";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  usePortfolioProjects,
  usePortfolioCategories,
  usePortfolioTags,
} from "@/hooks/usePortfolioCMS";
import {
  ArrowRight,
  Star,
  Filter,
  Palette,
  X,
  Eye,
} from "lucide-react";
import { TREND_AGES } from "@/config/portfolioDesignSystem";

const STATIC_PROJECTS = [
  {
    id: "exodus-health",
    slug: "exodus-health-couriers",
    title: "Exodus Health Couriers",
    short_description: "Full brand identity and HIPAA-compliant website for a healthcare logistics company serving the Dayton region. Clean, trustworthy design built for compliance and conversion.",
    thumbnail_url: null,
    featured: true,
    category: { name: "Web Design" },
    project_date: "2025-10-01",
    tags: [{ name: "Healthcare" }, { name: "Branding" }, { name: "Web Design" }],
    external_url: "https://exodushealthcouriers.com",
    gradient: "from-teal-500/20 to-emerald-500/20",
  },
  {
    id: "invision-network",
    slug: "invision-network-site",
    title: "InVision Network",
    short_description: "End-to-end design and development of the InVision Network platform — AI scam protection, training portal, client dashboard, and multi-role staff tools built on React and Supabase.",
    thumbnail_url: null,
    featured: true,
    category: { name: "Full-Stack Development" },
    project_date: "2025-12-01",
    tags: [{ name: "React" }, { name: "AI" }, { name: "Cybersecurity" }],
    external_url: "https://www.invisionnetwork.org",
    gradient: "from-orange-500/20 to-primary/20",
  },
  {
    id: "ai-scam-scanner",
    slug: "ai-scam-scanner",
    title: "AI Scam Scanner",
    short_description: "Real-time AI analysis tool that scans uploaded files, screenshots, and messages for phishing, deepfakes, and social engineering. Built with GPT-4 Vision and Supabase Edge Functions.",
    thumbnail_url: null,
    featured: false,
    category: { name: "AI Development" },
    project_date: "2026-01-01",
    tags: [{ name: "AI" }, { name: "Security" }, { name: "Edge Functions" }],
    external_url: "/training/ai-analysis",
    gradient: "from-violet-500/20 to-blue-500/20",
  },
  {
    id: "cybersecurity-training",
    slug: "cybersecurity-training-portal",
    title: "Cybersecurity Training Portal",
    short_description: "Interactive learning platform with workshops, live sessions, and a member portal for seniors and families. Features Zoom integration, booking calendar, and role-based access control.",
    thumbnail_url: null,
    featured: false,
    category: { name: "Web Application" },
    project_date: "2026-02-01",
    tags: [{ name: "Training" }, { name: "React" }, { name: "Supabase" }],
    external_url: "/training",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
];

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const activeTag = searchParams.get("tag") || "";
  const [showFilters, setShowFilters] = useState(false);

  const { data: primaryCategories } = usePortfolioCategories("primary");
  const { data: allTags } = usePortfolioTags();
  const { data: projects, isLoading } = usePortfolioProjects({
    categorySlug: activeCategory || undefined,
    tagSlug: activeTag || undefined,
  });

  const setFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key === "category") params.delete("tag");
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  // Group tags by type for secondary filters
  const tagGroups = useMemo(() => {
    if (!allTags) return {};
    const groups: Record<string, typeof allTags> = {};
    allTags.forEach((t) => {
      if (!groups[t.tag_type]) groups[t.tag_type] = [];
      groups[t.tag_type].push(t);
    });
    return groups;
  }, [allTags]);

  const hasFilters = !!activeCategory || !!activeTag;

  return (
    <div className="min-h-screen">
      <SEO
        title={PAGE_SEO.portfolio.title}
        description={PAGE_SEO.portfolio.description}
        keywords={PAGE_SEO.portfolio.keywords}
        breadcrumbs={[...PAGE_SEO.portfolio.breadcrumbs]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "InVision Network Portfolio",
          description: "Web design, AI automation, and cybersecurity projects by InVision Network in Kettering, Ohio",
          url: "https://www.invisionnetwork.org/portfolio",
          publisher: {
            "@type": "Organization",
            name: "InVision Network",
            url: "https://www.invisionnetwork.org",
          },
        }}
      />
      <Navigation overlay />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-6">
            <Palette className="w-3.5 h-3.5" />
            Our Work
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
            Design{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto lede">
            From brand identity to motion graphics, explore our work across
            every design discipline.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
            <div className="text-center">
              <p className="text-2xl font-black text-primary">{projects?.length || 0}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Projects</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black text-primary">{primaryCategories?.length || 0}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Disciplines</p>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="text-center">
              <p className="text-2xl font-black text-primary">{projects?.filter(p => p.featured).length || 0}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Featured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Category Navigation */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto py-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => clearFilters()}
              className="flex-shrink-0 rounded-full"
            >
              All
            </Button>
            {primaryCategories?.map((cat) => (
              <Button
                key={cat.slug}
                variant={activeCategory === cat.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter("category", activeCategory === cat.slug ? "" : cat.slug)}
                className="flex-shrink-0 rounded-full"
              >
                {cat.name}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex-shrink-0 ml-auto"
            >
              <Filter className="w-4 h-4 mr-1" />
              Filters
            </Button>
          </div>

          {/* Secondary Tag Filters */}
          {showFilters && (
            <div className="pt-3 pb-1 space-y-2">
              {Object.entries(tagGroups).map(([type, tags]) => (
                <div key={type} className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold w-16 flex-shrink-0 capitalize">
                    {type}
                  </span>
                  {tags.map((tag) => (
                    <button
                      key={tag.slug}
                      onClick={() => setFilter("tag", activeTag === tag.slug ? "" : tag.slug)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        activeTag === tag.slug
                          ? "bg-accent text-white"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {tag.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          )}

          {hasFilters && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">Active:</span>
              {activeCategory && (
                <Badge variant="secondary" className="text-xs">
                  {primaryCategories?.find((c) => c.slug === activeCategory)?.name}
                  <button onClick={() => setFilter("category", "")} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {activeTag && (
                <Badge variant="secondary" className="text-xs">
                  {allTags?.find((t) => t.slug === activeTag)?.name}
                  <button onClick={() => setFilter("tag", "")} className="ml-1">
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              <button onClick={clearFilters} className="text-xs text-destructive hover:underline ml-2">
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <main className="py-12">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl bg-muted animate-pulse h-72" />
              ))}
            </div>
          ) : !projects?.length && !hasFilters ? (
            <div>
              <p className="text-sm text-muted-foreground text-center mb-8">
                More projects coming soon — here's a look at our featured work.
              </p>
              <div className="gx-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {STATIC_PROJECTS.map((project) => (
                  <a
                    key={project.id}
                    href={project.external_url}
                    target={project.external_url.startsWith("http") ? "_blank" : undefined}
                    rel={project.external_url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group block rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className={`aspect-[4/3] overflow-hidden relative bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                      <Palette className="w-12 h-12 text-muted-foreground/30" />
                      {project.featured && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/90 text-white text-[10px] font-bold uppercase tracking-wider">
                            <Star className="w-2.5 h-2.5 fill-current" />
                            Featured
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {project.category && (
                          <Badge variant="secondary" className="text-[10px]">
                            {project.category.name}
                          </Badge>
                        )}
                        {project.project_date && (
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(project.project_date).getFullYear()}
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.short_description && (
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                          {project.short_description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag.name} className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                            {tag.name}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary group-hover:gap-2 transition-all">
                        <Eye className="w-3.5 h-3.5" />
                        View Project
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : !projects?.length ? (
            <div className="text-center py-20">
              <Palette className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                No projects found for this filter
              </p>
              {hasFilters && (
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="gx-gallery grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/portfolio/${project.slug}`}
                  className="group block rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                    {project.thumbnail_url ? (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <Palette className="w-10 h-10 text-muted-foreground/30" />
                      </div>
                    )}
                    {project.featured && (
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Featured
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="px-4 py-2 bg-background/90 rounded-full text-sm font-bold text-foreground flex items-center gap-2">
                        <Eye className="w-4 h-4" /> View Case Study
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      {project.category && (
                        <Badge variant="secondary" className="text-[10px]">
                          {project.category.name}
                        </Badge>
                      )}
                      {project.project_date && (
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(project.project_date).getFullYear()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    {project.short_description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.short_description}
                      </p>
                    )}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag.id}
                            className="px-2 py-0.5 rounded-full bg-primary/8 text-primary text-[10px] font-medium"
                          >
                            {tag.name}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[10px] text-muted-foreground">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* CTA */}
      <section className="py-16 bg-muted/30 border-t border-border/50">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
            Ready to Start Your Project?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            We bring the same level of craft and attention to every client engagement.
          </p>
          <Button asChild size="lg" className="rounded-full font-bold px-8">
            <Link to="/contact">
              Get in Touch <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
