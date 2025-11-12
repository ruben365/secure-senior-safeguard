import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAIChat } from "@/contexts/AIChatContext";
import { MessageSquare, Phone, Mail, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export const FloatingActionButton = () => {
  const { openChat } = useAIChat();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="icon"
          className="h-14 w-14 rounded-full shadow-xl bg-gradient-to-br from-primary/90 to-accent/90 hover:from-primary hover:to-accent hover:scale-110 transition-all duration-300 animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Quick Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-16 w-16 rounded-full shadow-2xl bg-gradient-to-br from-secondary to-accent hover:scale-110 transition-all duration-300 hover:shadow-glow-purple animate-gentle-pulse"
            aria-label="Quick actions menu"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 hover:opacity-20 transition-opacity" />
              <MessageSquare className="h-6 w-6 relative z-10" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          side="right"
          className="w-56 animate-scale-in"
        >
          <DropdownMenuItem
            onClick={openChat}
            className="cursor-pointer py-3 focus:bg-primary/10"
          >
            <MessageSquare className="mr-3 h-5 w-5 text-primary" />
            <div className="flex flex-col">
              <span className="font-semibold">Chat with Lora</span>
              <span className="text-xs text-muted-foreground">Press Ctrl+L</span>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild className="cursor-pointer py-3 focus:bg-primary/10">
            <a href="tel:9375550199">
              <Phone className="mr-3 h-5 w-5 text-accent" />
              <div className="flex flex-col">
                <span className="font-semibold">Call Us</span>
                <span className="text-xs text-muted-foreground">(937) 555-0199</span>
              </div>
            </a>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild className="cursor-pointer py-3 focus:bg-primary/10">
            <Link to="/contact">
              <Mail className="mr-3 h-5 w-5 text-secondary" />
              <div className="flex flex-col">
                <span className="font-semibold">Contact Us</span>
                <span className="text-xs text-muted-foreground">Send a message</span>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
