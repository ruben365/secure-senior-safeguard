import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useFeaturedArticles } from "@/hooks/useArticles";

export function LatestArticles() {
  const { data: articles, isLoading } = useFeaturedArticles(3);

  if (isLoading || !articles || articles.length === 0) return null;

  return (
    <section
      aria-label="Latest cybersecurity articles"
      className="relative z-10 py-14 md:py-20 bg-[#F9F8F6]"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="hss-overline mb-4">
              <span className="hss-overline-dot" />
              Resource Hub
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight leading-tight mt-4">
              Latest Security Articles
            </h2>
            <p className="text-[#6B7280] mt-2 max-w-xl">
              Fresh guidance on scam trends, deepfake tactics, and how to stay
              protected.
            </p>
          </div>
          <Link
            to="/articles"
            className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6B7280] hover:text-[#111111] transition-colors whitespace-nowrap pb-1"
            aria-label="View all articles"
          >
            All articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => {
            const date = article.published_at || article.created_at;
            const readMin = Math.max(1, Math.ceil((article.content?.length || 0) / 1000));
            return (
              <Link
                key={article.id}
                to={`/articles/${article.slug}`}
                className="group flex flex-col rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {article.featured_image_url && (
                  <div className="overflow-hidden h-44">
                    <img
                      src={article.featured_image_url}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 p-5">
                  {article.category && (
                    <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#d96c4a] mb-2">
                      {article.category}
                    </span>
                  )}
                  <h3 className="font-bold text-[#111111] leading-snug mb-2 group-hover:text-[#d96c4a] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-[13px] text-[#6B7280] leading-relaxed line-clamp-2 mb-4 flex-1">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-[11px] text-[#9CA3AF] mt-auto">
                    {date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {readMin} min read
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/articles"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#d96c4a] hover:text-[#c45e3b] transition-colors"
          >
            All articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
