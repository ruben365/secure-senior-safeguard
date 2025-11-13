import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Smartphone, Download, Home, CheckCircle } from "lucide-react";

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full mb-6">
              <Smartphone className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Install InVision Network</h1>
            <p className="text-xl text-muted-foreground">
              Access scam protection anytime, anywhere with our mobile app
            </p>
          </div>

          {isInstalled ? (
            <Card className="p-8 text-center bg-gradient-to-br from-success/10 to-success/5 border-success/30">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">App Already Installed!</h2>
              <p className="text-muted-foreground mb-6">
                You can find InVision Network on your home screen
              </p>
              <Button asChild size="lg">
                <a href="/">Go to App</a>
              </Button>
            </Card>
          ) : (
            <>
              {isInstallable && (
                <Card className="p-8 mb-8 bg-gradient-to-br from-primary/10 to-accent/5">
                  <div className="text-center">
                    <Download className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Ready to Install</h2>
                    <p className="text-muted-foreground mb-6">
                      Install InVision Network for quick access and offline capabilities
                    </p>
                    <Button onClick={handleInstallClick} size="xl" className="min-w-[200px]">
                      <Download className="w-5 h-5 mr-2" />
                      Install Now
                    </Button>
                  </div>
                </Card>
              )}

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-center mb-8">Installation Guide</h2>
                
                {/* iPhone Instructions */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Smartphone className="w-6 h-6" />
                    iPhone / iPad (Safari)
                  </h3>
                  <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                    <li>Tap the <strong>Share button</strong> (square with arrow pointing up) at the bottom of Safari</li>
                    <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                    <li>Tap <strong>"Add"</strong> in the top right corner</li>
                    <li>Find the InVision Network app icon on your home screen</li>
                  </ol>
                </Card>

                {/* Android Instructions */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Smartphone className="w-6 h-6" />
                    Android (Chrome)
                  </h3>
                  <ol className="space-y-3 list-decimal list-inside text-muted-foreground">
                    <li>Tap the <strong>three-dot menu</strong> in the top right corner</li>
                    <li>Tap <strong>"Add to Home screen"</strong> or <strong>"Install app"</strong></li>
                    <li>Tap <strong>"Add"</strong> or <strong>"Install"</strong> to confirm</li>
                    <li>Find the InVision Network app icon on your home screen</li>
                  </ol>
                </Card>

                {/* Benefits */}
                <Card className="p-6 bg-gradient-to-br from-muted/50 to-muted/30">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-success" />
                    Why Install?
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Quick access from your home screen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Works offline - access protection features anytime</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Faster loading and better performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Full-screen experience like a native app</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InstallApp;
