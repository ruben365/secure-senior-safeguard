import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GuestScanUpload } from "@/components/scanner/GuestScanUpload";
import { PaymentDialog } from "@/components/scanner/PaymentDialog";
import { ScanResults } from "@/components/scanner/ScanResults";
import { useGuestScanner } from "@/hooks/useGuestScanner";
import { calculateScanCost, GUEST_SCAN_PRICING } from "@/lib/guestScannerUtils";
import { Loader2, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";

const GuestScanner = () => {
  const uploadRef = useRef<HTMLDivElement>(null);
  const [paymentOpen, setPaymentOpen] = useState(false);

  const {
    file,
    cost,
    analysis,
    status,
    error,
    progress,
    expiresAt,
    prepareFile,
    clearFile,
    startScan,
    restartScan,
    markExpired,
  } = useGuestScanner();

  const isProcessing = status === "uploading" || status === "analyzing";
  const canPay = file && status === "ready";

  const handleScanNow = () => {
    uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handlePaymentSuccess = (payload: { scanId: string; filePath: string; paymentIntentId: string }) => {
    setPaymentOpen(false);
    startScan({ scanId: payload.scanId, filePath: payload.filePath });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Guest File Scanner"
        description="Upload a file without creating an account. Pay per use with Stripe and get instant threat analysis."
        keywords="guest file scanner, pay per scan, phishing detection, malware scan, deepfake detection"
      />
      <Navigation />

      <main className="relative">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute -top-20 right-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/10 blur-3xl rounded-full" />

          <div className="relative container mx-auto px-6 py-20">
            <div className="max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-border/60 shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  Guest Scanner · No login required
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Scan a file in minutes. Pay only when you use it.
              </h1>

              <p className="text-lg text-muted-foreground">
                Upload a file, review the cost, and pay securely with Stripe. Your file is analyzed
                instantly and deleted within 10 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="h-12 px-6" onClick={handleScanNow}>
                  <UploadCloud className="w-4 h-4 mr-2" />
                  Scan Now
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-6">
                  <Link to="/training">Learn how scans work</Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  "Phishing & malware indicators",
                  "Deepfake & voice-clone checks",
                  "Suspicious links & content",
                ].map((item) => (
                  <Card key={item} className="p-4 bg-white/80 border border-border/60">
                    <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      {item}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section ref={uploadRef} className="container mx-auto px-6 py-16 space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              <GuestScanUpload file={file} onFileSelect={prepareFile} onClear={clearFile} />

              <div className="rounded-2xl border border-border/60 bg-muted/40 p-4 text-sm text-muted-foreground">
                Your file will be analyzed and permanently deleted within 10 minutes. We do not store
                your file or personal information. Guest scans are anonymous.
              </div>
            </div>

            <Card className="p-6 border border-border/60 bg-white/80 shadow-lg">
              <h2 className="text-xl font-semibold text-foreground mb-3">Pricing</h2>
              <p className="text-muted-foreground mb-4">
                ${GUEST_SCAN_PRICING.ratePerMb.toFixed(2)} per MB · minimum $
                {GUEST_SCAN_PRICING.minimumCharge.toFixed(2)}
              </p>

              {file ? (
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground">
                    File size: {calculateScanCost(file.size).sizeMb.toFixed(2)} MB
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {calculateScanCost(file.size).formatted}
                  </div>
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setPaymentOpen(true)}
                    disabled={!canPay || isProcessing}
                  >
                    {isProcessing ? "Processing..." : "Proceed to Secure Payment"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>Select a file to see your exact cost.</p>
                  <Button size="lg" className="w-full" onClick={handleScanNow}>
                    Choose a file
                  </Button>
                </div>
              )}
            </Card>
          </div>

          {isProcessing && (
            <Card className="p-6 border border-border/60 bg-white/80">
              <div className="flex items-center gap-3 mb-4">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <div>
                  <p className="font-semibold text-foreground">Analyzing your file...</p>
                  <p className="text-sm text-muted-foreground">This usually takes less than 60 seconds.</p>
                </div>
              </div>
              <Progress value={progress} className="h-2" />
            </Card>
          )}

          {error && (
            <Card className="p-6 border border-rose-200 bg-rose-50/60 space-y-3">
              <p className="text-sm text-rose-700">{error}</p>
              <Button variant="outline" onClick={restartScan} className="w-fit">
                Try again
              </Button>
            </Card>
          )}

          {analysis && file && status === "completed" && expiresAt && (
            <ScanResults
              analysis={analysis}
              file={file}
              expiresAt={expiresAt}
              onExpired={markExpired}
              onRestart={restartScan}
            />
          )}

          {status === "expired" && (
            <Card className="p-6 border border-emerald-200 bg-emerald-50/60 text-emerald-700">
              Your data has been permanently deleted. We do not store your files or results.
            </Card>
          )}
        </section>
      </main>

      <Footer />

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        file={file}
        amount={cost}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default GuestScanner;
