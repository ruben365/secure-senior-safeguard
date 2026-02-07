import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Sparkles, Shield, Phone, BookOpen, MessageSquare, Building2 } from "lucide-react";
import { SITE } from "@/config/site";

const HIDDEN_PATH_PREFIXES = ["/admin", "/portal"];

export const GlassQuickMenu = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (HIDDEN_PATH_PREFIXES.some((prefix) => location.pathname.startsWith(prefix))) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-32 right-6 z-50 hidden md:flex items-center gap-2 glass-heavy rounded-full px-4 py-3 shadow-3d hover:shadow-3d-lg transition-all duration-300 border border-white/30 micro-tilt-3d tactile-button"
        aria-label="Open quick menu"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="text-sm font-semibold text-foreground">Quick Menu</span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl glass-heavy border border-white/30">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-5 h-5 text-primary" />
              Quick Actions
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
            <Button asChild className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/training#pricing">
                <BookOpen className="w-4 h-4" />
                Book Training
              </Link>
            </Button>
            <Button asChild variant="secondary" className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/training#scamshield">
                <Shield className="w-4 h-4" />
                Analyze a Message
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/business">
                <Building2 className="w-4 h-4" />
                Business Solutions
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/resources">
                <Sparkles className="w-4 h-4" />
                Resources & Guides
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-12 justify-start gap-3 rounded-xl">
              <Link to="/contact">
                <MessageSquare className="w-4 h-4" />
                Contact Support
              </Link>
            </Button>
            <Button asChild variant="ghost" className="h-12 justify-start gap-3 rounded-xl">
              <a href={SITE.phone.tel}>
                <Phone className="w-4 h-4" />
                Call {SITE.phone.display}
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlassQuickMenu;
