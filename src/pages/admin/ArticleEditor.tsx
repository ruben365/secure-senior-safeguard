import { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useArticle } from "@/hooks/useArticle";
import { useArticleMutations } from "@/hooks/useArticleMutations";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { ArticlePublishingSidebar } from "@/components/admin/ArticlePublishingSidebar";
import { PublishConfirmationModal } from "@/components/admin/PublishConfirmationModal";
import { PublishSuccessModal } from "@/components/admin/PublishSuccessModal";
import {
  Save,
  Eye,
  Check,
  Lock,
  Unlock,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface ArticleData {
  title: string;
  slug: string;
  content: string;
  categories: string[];
  status: "draft" | "scheduled" | "published";
  visibility: "public" | "password" | "private";
  password?: string;
  featuredImage?: string;
  excerpt?: string;
  author: string;
  tags: string[];
  scheduledDate?: string;
  focusKeyword?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

export default function ArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Fetch existing article if editing
  const { data: existingArticle, isLoading: loadingArticle } = useArticle(id);
  const { createArticle, updateArticle, publishArticle } = useArticleMutations();
  
  const [article, setArticle] = useState<ArticleData>({
    title: "",
    slug: "",
    content: "",
    categories: [],
    status: "draft",
    visibility: "public",
    author: "Current User",
    tags: [],
  });

  const [slugLocked, setSlugLocked] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [readingTime, setReadingTime] = useState(0);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [articleId, setArticleId] = useState<string | null>(id || null);

  // Load existing article data
  useEffect(() => {
    if (existingArticle) {
      setArticle({
        title: existingArticle.title || "",
        slug: existingArticle.slug || "",
        content: existingArticle.content || "",
        categories: existingArticle.category ? [existingArticle.category] : [],
        status: existingArticle.status as "draft" | "scheduled" | "published",
        visibility: "public",
        author: "Current User",
        tags: existingArticle.tags || [],
        featuredImage: existingArticle.featured_image_url,
        excerpt: existingArticle.excerpt,
        scheduledDate: existingArticle.scheduled_for,
        seoTitle: existingArticle.seo_title,
        seoDescription: existingArticle.seo_description,
      });
      setSlugLocked(true);
      setArticleId(existingArticle.id);
    }
  }, [existingArticle]);

  // Validation for required fields
  const requiredFieldsComplete = () => {
    return !!(
      article.title &&
      article.content &&
      article.categories.length > 0 &&
      article.author
    );
  };

  const getPublishingChecklist = () => {
    return [
      { id: "title", label: "Title entered", completed: !!article.title },
      { id: "content", label: "Content added (min 300 words)", completed: wordCount >= 300 },
      { id: "image", label: "Featured image set", completed: !!article.featuredImage },
      { id: "category", label: "Category selected", completed: article.categories.length > 0 },
      { id: "excerpt", label: "Excerpt added", completed: !!article.excerpt },
      { id: "seo", label: "SEO title and description", completed: !!(article.seoTitle && article.seoDescription) },
    ];
  };

  const getSEOScore = () => {
    const checks = [
      { completed: !!article.title, weight: 15 },
      { completed: wordCount >= 300, weight: 20 },
      { completed: !!article.focusKeyword, weight: 15 },
      { completed: !!article.seoTitle && article.seoTitle.length >= 50 && article.seoTitle.length <= 60, weight: 10 },
      { completed: !!article.seoDescription && article.seoDescription.length >= 120 && article.seoDescription.length <= 160, weight: 15 },
      { completed: !!article.featuredImage, weight: 15 },
      { completed: article.focusKeyword && article.content ? (article.content.toLowerCase().split(article.focusKeyword.toLowerCase()).length - 1) / article.content.split(/\s+/).length * 100 >= 0.5 && (article.content.toLowerCase().split(article.focusKeyword.toLowerCase()).length - 1) / article.content.split(/\s+/).length * 100 <= 2.5 : false, weight: 10 },
    ];
    const totalWeight = checks.reduce((sum, check) => sum + check.weight, 0);
    const earnedWeight = checks.filter(check => check.completed).reduce((sum, check) => sum + check.weight, 0);
    return Math.round((earnedWeight / totalWeight) * 100);
  };

  const getMissingFields = () => {
    const missing: string[] = [];
    if (!article.title) missing.push("Title");
    if (!article.content) missing.push("Content");
    if (article.categories.length === 0) missing.push("Category");
    if (!article.author) missing.push("Author");
    return missing;
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") {
        e.preventDefault();
        handleSave(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "p") {
        e.preventDefault();
        handlePreview();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "P") {
        e.preventDefault();
        if (requiredFieldsComplete()) {
          handlePublish();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [article, wordCount]);

  // Exit warning for unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
        return e.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Track changes
  useEffect(() => {
    if (article.title || article.content) {
      setHasUnsavedChanges(true);
    }
  }, [article]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugLocked && article.title) {
      setArticle(prev => ({ ...prev, slug: generateSlug(article.title) }));
    }
  }, [article.title, slugLocked]);

  // Calculate word count, character count, and reading time
  useEffect(() => {
    const text = article.content.replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).filter(Boolean);
    const chars = text.length;
    const reading = Math.ceil(words.length / 200);

    setWordCount(words.length);
    setCharCount(chars);
    setReadingTime(reading);
  }, [article.content]);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (article.title || article.content) {
        handleSave(true);
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [article]);

  // Restore from localStorage on load (only for new articles)
  useEffect(() => {
    if (!id) {
      const savedDraft = localStorage.getItem("article-draft");
      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);
          if (draft.title || draft.content) {
            setArticle(prev => ({
              ...prev,
              title: draft.title || "",
              slug: draft.slug || "",
              content: draft.content || "",
            }));
            toast({
              title: "Draft Restored",
              description: "Your previous work has been restored",
            });
          }
        } catch (error) {
          console.error("Failed to restore draft:", error);
        }
      }
    }
  }, [id]);

  // Save to localStorage for offline support
  useEffect(() => {
    if (!id) {
      const draft = {
        title: article.title,
        slug: article.slug,
        content: article.content,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem("article-draft", JSON.stringify(draft));
    }
  }, [article.title, article.slug, article.content, id]);

  const handleSave = async (silent = false) => {
    try {
      setSaving(true);

      const articlePayload = {
        title: article.title,
        slug: article.slug || generateSlug(article.title),
        content: article.content,
        category: article.categories[0] || "News",
        status: article.status as "draft" | "scheduled" | "published",
        excerpt: article.excerpt,
        featured_image_url: article.featuredImage,
        tags: article.tags,
        scheduled_for: article.scheduledDate,
        seo_title: article.seoTitle,
        seo_description: article.seoDescription,
      };

      if (articleId) {
        // Update existing article
        await updateArticle.mutateAsync({ id: articleId, ...articlePayload });
      } else {
        // Create new article
        const result = await createArticle.mutateAsync(articlePayload);
        setArticleId(result.id);
        navigate(`/admin/content/articles/${result.id}`, { replace: true });
        // Clear localStorage draft after successful save
        localStorage.removeItem("article-draft");
      }

      setLastSaved(new Date());
      setHasUnsavedChanges(false);

      if (!silent) {
        toast({
          title: "Draft Saved",
          description: "Your article has been saved successfully",
        });
      }
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Save Failed",
        description: "Failed to save article. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!requiredFieldsComplete()) {
      toast({
        title: "Cannot Publish",
        description: `Please complete these required fields: ${getMissingFields().join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    setShowPublishModal(true);
  };

  const confirmPublish = async (options?: { sendNewsletter?: boolean; shareOnSocial?: boolean }) => {
    try {
      setPublishing(true);
      setShowPublishModal(false);

      // First save the article to get an ID if new
      let currentArticleId = articleId;
      
      const articlePayload = {
        title: article.title,
        slug: article.slug || generateSlug(article.title),
        content: article.content,
        category: article.categories[0] || "News",
        status: "published" as const,
        excerpt: article.excerpt,
        featured_image_url: article.featuredImage,
        tags: article.tags,
        seo_title: article.seoTitle,
        seo_description: article.seoDescription,
        published_at: new Date().toISOString(),
      };

      if (currentArticleId) {
        // Update and publish existing article
        await updateArticle.mutateAsync({ id: currentArticleId, ...articlePayload });
      } else {
        // Create and publish new article
        const result = await createArticle.mutateAsync(articlePayload);
        currentArticleId = result.id;
        setArticleId(result.id);
        navigate(`/admin/content/articles/${result.id}`, { replace: true });
        localStorage.removeItem("article-draft");
      }

      // Update local state
      setArticle(prev => ({ ...prev, status: "published" }));
      setHasUnsavedChanges(false);
      setPublishing(false);
      setShowSuccessModal(true);

      // Handle newsletter sending
      if (options?.sendNewsletter && currentArticleId) {
        try {
          const { error } = await supabase.functions.invoke("send-article-newsletter", {
            body: { articleId: currentArticleId },
          });
          if (error) {
            console.error("Newsletter send error:", error);
            toast({
              title: "Newsletter not sent",
              description: "Article published but newsletter delivery failed.",
              variant: "destructive",
            });
          }
        } catch (err) {
          console.error("Newsletter invocation error:", err);
        }
      }

      // Handle social sharing
      if (options?.shareOnSocial) {
        console.log("Social sharing would be triggered here");
      }

      toast({
        title: articleId ? "Article Updated!" : "Article Published!",
        description: "Your article is now live",
      });
    } catch (error) {
      console.error("Publish error:", error);
      toast({
        title: "Publish Failed",
        description: "Failed to publish article. Please try again.",
        variant: "destructive",
      });
      setPublishing(false);
    }
  };

  const handlePreview = async () => {
    await handleSave(true);

    const previewData = {
      ...article,
      readingTime: Math.ceil(wordCount / 200),
    };

    localStorage.setItem("article-preview", JSON.stringify(previewData));
    window.open("/admin/articles/preview", "_blank");
  };

  const getTimeSinceLastSave = () => {
    if (!lastSaved) return null;
    const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  };

  if (loadingArticle && id) {
    return (
      <div className="flex min-h-screen bg-background items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} />
      <AdminTopBar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main
        className={`flex-1 transition-all duration-300 pt-16 ${
          sidebarOpen ? "md:ml-[260px]" : "md:ml-[70px]"
        }`}
      >
        {/* Top Action Bar */}
        <div className="sticky top-16 z-10 bg-background border-b px-8 py-4">
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">
              {/* Auto-save Indicator */}
              <AnimatePresence mode="wait">
                {saving ? (
                  <motion.div
                    key="saving"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Clock className="h-4 w-4 animate-spin" />
                    Saving...
                  </motion.div>
                ) : lastSaved ? (
                  <motion.div
                    key="saved"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="h-4 w-4 text-green-500" />
                    Last saved: {getTimeSinceLastSave()}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <Button variant="outline" onClick={() => handleSave(false)} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>

              <Button variant="outline" onClick={handlePreview} disabled={!article.title || !article.content}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        onClick={handlePublish}
                        disabled={!requiredFieldsComplete() || saving || publishing}
                        className="relative min-w-[120px]"
                      >
                        {publishing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Publishing...
                          </>
                        ) : articleId && article.status === "published" ? (
                          "Update"
                        ) : (
                          "Publish"
                        )}
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {!requiredFieldsComplete() && (
                    <TooltipContent side="bottom" className="max-w-xs">
                      <div className="space-y-1">
                        <p className="font-semibold flex items-center gap-2">
                          <AlertCircle className="h-4 w-4" />
                          Complete required fields:
                        </p>
                        <ul className="text-sm list-disc list-inside">
                          {getMissingFields().map((field) => (
                            <li key={field}>{field}</li>
                          ))}
                        </ul>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Keyboard Shortcuts Hint */}
          {articleId && article.status === "published" && (
            <div className="text-xs text-muted-foreground">
              Last updated: {getTimeSinceLastSave() || "Just now"}
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="flex gap-8 p-8">
          {/* Left Column - Editor */}
          <div className="flex-1 max-w-[70%] space-y-6">
            {/* Title Input */}
            <div className="space-y-2">
              <Input
                value={article.title}
                onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter article title..."
                className="text-4xl font-bold border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                maxLength={100}
                autoFocus
              />
              {article.title.length >= 80 && (
                <p className="text-sm text-muted-foreground text-right">
                  {article.title.length}/100 characters
                </p>
              )}
            </div>

            {/* Slug Input */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm text-muted-foreground">
                URL Slug
              </Label>
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 px-3 py-2 border rounded-lg bg-muted/50">
                  <span className="text-sm text-muted-foreground">
                    invisionnetwork.org/blog/
                  </span>
                  <Input
                    id="slug"
                    value={article.slug}
                    onChange={(e) => {
                      setArticle(prev => ({ ...prev, slug: generateSlug(e.target.value) }));
                      setSlugLocked(true);
                    }}
                    className="border-0 bg-transparent px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
                    placeholder="article-slug"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSlugLocked(!slugLocked)}
                  title={slugLocked ? "Unlock to auto-generate" : "Lock to prevent auto-generation"}
                >
                  {slugLocked ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Unlock className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {article.slug && (
                <div className="flex items-center gap-2 text-sm">
                  <Check className="h-3 w-3 text-green-500" />
                  <span className="text-muted-foreground">Available</span>
                </div>
              )}
            </div>

            {/* Rich Text Editor */}
            <div className="space-y-2">
              <RichTextEditor
                content={article.content}
                onChange={(content) => setArticle(prev => ({ ...prev, content }))}
                placeholder="Start writing your article..."
              />

              {/* Editor Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-4">
                  <span>{wordCount} words</span>
                  <span>{charCount} characters</span>
                  <span>{readingTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Publishing Sidebar */}
          <div className="w-[30%]">
            <ArticlePublishingSidebar
              article={article}
              onChange={setArticle}
              onSave={() => handleSave(false)}
              publishingChecklist={getPublishingChecklist()}
            />
          </div>
        </div>
      </main>

      {/* Publish Confirmation Modal */}
      <PublishConfirmationModal
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={confirmPublish}
        article={article}
        seoScore={getSEOScore()}
      />

      {/* Success Modal */}
      <PublishSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        articleUrl={`https://invisionnetwork.org/articles/${articleId}`}
        articleTitle={article.title}
        onViewArticle={() => {
          window.open(`/articles/${articleId}`, "_blank");
        }}
        onEditArticle={() => {
          setShowSuccessModal(false);
        }}
        onCreateAnother={() => {
          navigate("/admin/content/articles/new");
          setShowSuccessModal(false);
        }}
      />
    </div>
  );
}
