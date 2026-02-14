import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  useGDProjects,
  useGDCategories,
  useGDTags,
} from "@/hooks/useGraphicDesignCMS";
import {
  ArrowRight,
  Star,
  ExternalLink,
  Filter,
  Palette,
  X,
} from "lucide-react";

const Portfolio = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const activeTag = searchParams.get("tag") || "";
  const [showFilters, setShowFilters] = useState(false);

  const { data: categories } = useGDCategories();
  const { data: allTags } = useGDTags();
  const { data: projects, isLoading } = useGDProjects({
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
    // Reset tag when switching category
    if (key === "category") params.delete("tag");
    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  // Tags filtered by active category
  const filteredTags = useMemo(() => {
    if (!allTags || !activeCategory) return allTags || [];
    const cat = categories?.find((c) => c.slug === activeCategory);
    if (!cat) return allTags;
    return allTags.filter((t) => t.category_id === cat.id);
  }, [allTags, activeCategory, categories]);

  const hasFilters = !!activeCategory || !!activeTag;

  return (
    <div className="min-h-screen">
      <SEO
        title="Graphic Design Portfolio | InVision Network"
        description="Explore our graphic design portfolio featuring branding, print, digital, illustration, and motion design projects."
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <AnimatedSection animation="fade-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-[0.15em] mb-6">
              <Palette className="w-3.5 h-3.5" />
              Our Work
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-4">
              Graphic Design{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Portfolio
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From brand identity to motion graphics, explore our work across
              every design discipline.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 lg:px-12 py-3">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              variant={!activeCategory ? "default" : "outline"}
              size="sm"
              onClick={() => clearFilters()}
              className="flex-shrink-0 rounded-full"
            >
              All
            </Button>
            {categories?.map((cat) => (
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
              Tags
            </Button>
          </div>

          {/* Tag Filters */}
          {showFilters && filteredTags && filteredTags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-3 pb-1">
              {filteredTags.map((tag) => (
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
          )}

          {hasFilters && (
            <div className="flex items-center gap-2 pt-2">
              <span className="text-xs text-muted-foreground">Active:</span>
              {activeCategory && (
                <Badge variant="secondary" className="text-xs">
                  {categories?.find((c) => c.slug === activeCategory)?.name}
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
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <main className="py-12">
        <div className="container mx-auto px-6 lg:px-12">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-muted animate-pulse h-72"
                />
              ))}
            </div>
          ) : !projects?.length ? (
            <div className="text-center py-20">
              <Palette className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">
                No projects found
              </p>
              {hasFilters && (
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <AnimatedSection
                  key={project.id}
                  animation="fade-up"
                  delay={Math.min(index * 80, 400)}
                >
                  <Link
                    to={`/portfolio/${project.slug}`}
                    className="group block rounded-2xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] bg-muted overflow-hidden relative">
                      {project.thumbnail_url ? (
                        <img
                          src={project.thumbnail_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Palette className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                      )}
                      {project.is_featured && (
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" /> Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2">
                        {project.category && (
                          <Badge variant="secondary" className="text-[10px]">
                            {project.category.name}
                          </Badge>
                        )}
                        <span className="text-[10px] text-muted-foreground">
                          {project.project_year}
                        </span>
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
                </AnimatedSection>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
