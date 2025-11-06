import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { ParticleBackground } from "@/components/ParticleBackground";
import { FloatingShapes } from "@/components/FloatingShapes";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted to-background">
      {/* Full-page background effects */}
      <ParticleBackground />
      <FloatingShapes />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 animate-fade-in">
        <div className="mb-8 inline-block">
          <h1 className="text-8xl md:text-9xl font-bold gradient-text-primary mb-4 animate-scale-in">
            404
          </h1>
          <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-pulse" />
        </div>
        
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home className="w-5 h-5" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
