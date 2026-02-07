import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { PageTransition } from "@/components/PageTransition";
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { GuestScannerSection } from "@/components/training/GuestScannerSection";
import { usePrerenderReady } from "@/contexts/PrerenderContext";
import { SITE } from "@/config/site";
import { Bookmark, Code2, LayoutGrid, Moon, MoreHorizontal, RefreshCw } from "lucide-react";

export default function TrainingAiAnalysis() {
  usePrerenderReady(true);

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen">
        <SEO
          title="AI Analysis & Secure File Scan"
          description="Run instant AI analysis on suspicious files, messages, and screenshots. Secure guest scan workflow with automatic deletion in 10 minutes."
          keywords="AI analysis, file scan, scam detection, document scanning, secure analysis"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "AI Analysis & Secure File Scan",
            "description": "Run instant AI analysis on suspicious files, messages, and screenshots.",
            "url": "https://invisionnetwork.org/training/ai-analysis",
            "publisher": {
              "@type": "Organization",
              "name": SITE.name,
              "telephone": SITE.phone.e164,
            },
          }}
        />

        <main className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#b9c8ea_0%,#c9c3e3_30%,#d8b8d6_55%,#e5b7b4_70%,#f0b36e_85%,#e59f5a_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(235,134,60,0.45)_0%,rgba(0,0,0,0)_65%)]" />

          <div className="relative min-h-[80vh] flex items-center justify-center px-6">
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                <button className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition">
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition">
                  <Moon className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
              <Link
                to="/training"
                className="hidden sm:inline-flex text-xs font-medium text-white/70 hover:text-white transition"
              >
                Back to Learn & Train
              </Link>
            </div>

            <div className="absolute top-6 right-6">
              <div className="flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-3 py-2 shadow-xl">
                <button className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition">
                  <Code2 className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className="h-8 w-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="w-full max-w-xl">
              <PromptInputBox
                variant="minimal"
                placeholder="Type your message here..."
                onSend={(message, files) => console.log("AI prompt:", message, files)}
              />
            </div>
          </div>

          <div className="bg-background">
            <GuestScannerSection />
            <Footer />
          </div>
        </main>
      </div>
    </PageTransition>
  );
}
