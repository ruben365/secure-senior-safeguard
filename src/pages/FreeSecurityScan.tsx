import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/config/site";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Lock,
  Globe,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Loader2,
  Phone,
  Calendar,
} from "lucide-react";

interface ScanResult {
  grade: "A" | "B" | "C" | "D" | "F";
  ssl: { pass: boolean; detail: string };
  headers: { pass: boolean; detail: string };
  finding: string;
}

function gradeColor(grade: string) {
  if (grade === "A") return "text-emerald-600";
  if (grade === "B") return "text-green-500";
  if (grade === "C") return "text-yellow-500";
  if (grade === "D") return "text-orange-500";
  return "text-destructive";
}

function gradeBg(grade: string) {
  if (grade === "A") return "bg-emerald-50 border-emerald-200";
  if (grade === "B") return "bg-green-50 border-green-200";
  if (grade === "C") return "bg-yellow-50 border-yellow-200";
  if (grade === "D") return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}

function gradeIcon(grade: string) {
  if (grade === "A") return <ShieldCheck className="w-10 h-10 text-emerald-600" />;
  if (grade === "B") return <ShieldCheck className="w-10 h-10 text-green-500" />;
  if (grade === "C") return <ShieldAlert className="w-10 h-10 text-yellow-500" />;
  if (grade === "D") return <ShieldAlert className="w-10 h-10 text-orange-500" />;
  return <ShieldX className="w-10 h-10 text-destructive" />;
}

async function runBasicScan(url: string): Promise<ScanResult> {
  let normalized = url.trim();
  if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;

  let parsedHostname: string;
  try {
    parsedHostname = new URL(normalized).hostname;
  } catch {
    throw new Error("Please enter a valid website URL (e.g. example.com)");
  }

  // SSL check: attempt to fetch via https
  const httpsUrl = "https://" + parsedHostname;
  let sslPass = false;
  let sslDetail = "Could not verify SSL — site may be unreachable or blocking cross-origin requests.";

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(httpsUrl, {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal,
    });
    clearTimeout(id);
    // no-cors fetch resolves with opaque response if site is reachable over HTTPS
    if (res.type === "opaque" || res.ok) {
      sslPass = true;
      sslDetail = "Site responded over HTTPS — SSL certificate appears valid.";
    }
  } catch {
    sslPass = false;
    sslDetail = "Site did not respond over HTTPS. SSL certificate may be missing or expired.";
  }

  // Header check: cannot read response headers cross-origin regardless of SSL.
  // headerPass is evaluated independently — SSL reachability does not imply
  // headers are present, so sites with HTTPS don't get an inflated grade.
  const headerPass = false;
  const headerDetail = sslPass
    ? "Security headers (HSTS, CSP, X-Frame-Options) cannot be inspected cross-origin — a full server-side audit is required."
    : "Cannot verify security headers — site does not appear to use HTTPS.";

  // Grade logic — SSL and headers are independent axes
  let grade: ScanResult["grade"];
  if (sslPass && headerPass) {
    grade = "B"; // Full pass (requires server-side scan; headerPass is always false here)
  } else if (sslPass) {
    grade = "C"; // SSL present but headers unverified
  } else {
    grade = "D"; // No SSL
  }

  const finding = sslPass
    ? "Your site uses HTTPS, which is a good baseline. A full audit checks 20+ security headers, open ports, malware signatures, blacklist status, and more."
    : "Your site does not appear to use HTTPS. This is a critical security gap — visitors' data is sent unencrypted, and modern browsers will warn users before entering your site.";

  return { grade, ssl: { pass: sslPass, detail: sslDetail }, headers: { pass: headerPass, detail: headerDetail }, finding };
}

export default function FreeSecurityScan() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await runBasicScan(url);
      setResult(res);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed. Please check the URL and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition variant="fade">
      <div className="min-h-screen bg-background">
        <SEO
          title="Free Website Security Scan | InVision Network"
          description="Get an instant free security grade for your website. Check SSL, security headers, and top vulnerabilities. Free basic scan from InVision Network."
          keywords="free website security scan, website security check, SSL check, website security grade, Ohio cybersecurity"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Free Website Security Scan",
            description: "Free basic security scan for your website — SSL check, header check, and security grade.",
            url: "https://www.invisionnetwork.org/free-scan",
            publisher: {
              "@type": "Organization",
              name: SITE.name,
              telephone: SITE.phone.e164,
            },
          }}
        />
        <Navigation overlay />

        <main>
          {/* Hero */}
          <section className="relative overflow-hidden min-h-[60dvh] flex items-center pt-[clamp(100px,14vw,140px)] pb-10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-success/10" />
            <div className="container mx-auto relative text-center animate-fade-in">
              <Badge variant="outline" className="mb-6 px-4 py-2 text-sm border-primary/30 bg-primary/5">
                <Shield className="w-4 h-4 mr-2" />
                Free Security Check
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text-primary">How Secure</span>
                <br />Is Your Website?
              </h1>
              <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">
                Enter your website URL below for an instant basic security grade.
                No account required — completely free.
              </p>
              <p className="text-sm text-muted-foreground mb-10 max-w-xl mx-auto">
                Our full audit checks 20+ security factors. The basic scan gives you an instant snapshot.
              </p>

              {/* Scan form */}
              <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <div className="relative flex-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="yourwebsite.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-9 h-12 text-base"
                    disabled={loading}
                  />
                </div>
                <Button type="submit" size="lg" variant="heroPrimary" className="h-12 px-8" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 mr-2" />
                      Scan Now
                    </>
                  )}
                </Button>
              </form>

              {error && (
                <p className="mt-4 text-sm text-destructive font-medium">{error}</p>
              )}
            </div>
          </section>

          {/* Results */}
          {result && (
            <section className="py-12 animate-fade-in">
              <div className="container mx-auto max-w-3xl">
                {/* Grade card */}
                <Card className={`border-2 mb-6 ${gradeBg(result.grade)}`}>
                  <CardContent className="py-8">
                    <div className="flex flex-col sm:flex-row items-center gap-6">
                      <div className="flex flex-col items-center gap-2">
                        {gradeIcon(result.grade)}
                        <div className={`text-7xl font-black leading-none ${gradeColor(result.grade)}`}>
                          {result.grade}
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">Security Grade</p>
                      </div>
                      <div className="flex-1 text-left space-y-2">
                        <p className="font-semibold text-lg text-foreground">Basic Scan Complete</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{result.finding}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Findings */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Lock className="w-4 h-4 text-primary" />
                        SSL Certificate
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-2">
                        {result.ssl.pass
                          ? <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                          : <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />}
                        <p className="text-sm text-muted-foreground">{result.ssl.detail}</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        Security Headers
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{result.headers.detail}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* What full audit covers */}
                <Card className="border-primary/20 bg-primary/5 mb-8">
                  <CardHeader>
                    <CardTitle className="text-base text-primary">What a Full Audit Checks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {[
                        "20+ HTTP security headers",
                        "Malware & blacklist status",
                        "Open port vulnerability scan",
                        "SSL certificate expiry & chain",
                        "Outdated CMS & plugin detection",
                        "HSTS, CSP, X-Frame-Options",
                        "Cross-site scripting (XSS) risks",
                        "SQL injection surface assessment",
                        "Mixed content warnings",
                        "Google Safe Browsing status",
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* CTA */}
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold">Want the Full Detailed Report?</h2>
                  <p className="text-muted-foreground max-w-lg mx-auto">
                    Our complete security audit gives you a detailed report with every vulnerability ranked by severity, plus a step-by-step remediation plan. Contact InVision Network for a full audit.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button asChild size="lg" variant="heroPrimary">
                      <Link to="/contact">
                        Get Full Security Audit
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <a href={`tel:${SITE.phone.e164}`}>
                        <Phone className="mr-2 w-4 h-4" />
                        {SITE.phone.display}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* What we check (shown before scan) */}
          {!result && !loading && (
            <section className="py-16">
              <div className="container mx-auto max-w-4xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
                  What the Basic Scan Checks
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                  {[
                    {
                      icon: Lock,
                      title: "SSL Certificate",
                      desc: "Verifies your site uses HTTPS — the baseline requirement for any website that handles visitor data.",
                    },
                    {
                      icon: Shield,
                      title: "Security Headers",
                      desc: "Checks whether your server sends key HTTP headers that protect against common browser-based attacks.",
                    },
                    {
                      icon: Globe,
                      title: "Security Grade",
                      desc: "Gives your site an A–F grade based on the findings, so you instantly know where you stand.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <Card key={title} className="border-border/50 text-center">
                      <CardContent className="pt-8 pb-6">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* CTA strip */}
                <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-background to-success/10 border border-border/50 p-8 text-center">
                  <h3 className="text-xl font-bold mb-3">Need More Than a Basic Scan?</h3>
                  <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                    InVision Network's full security audit covers 20+ vulnerability categories and comes with a complete remediation report. Book a free 15-minute consultation to get started.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild size="heroPill" variant="heroPrimary">
                      <Link to="/contact">
                        Book Free Consultation
                        <Calendar className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild size="heroPill" variant="outline">
                      <a href={`tel:${SITE.phone.e164}`}>
                        <Phone className="mr-2 w-4 h-4" />
                        {SITE.phone.display}
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Post-result CTA strip */}
          {result && (
            <section className="py-12 bg-gradient-to-br from-primary/10 via-background to-success/10">
              <div className="container mx-auto text-center">
                <h2 className="text-2xl font-bold mb-3">Protect Your Website Today</h2>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Website Insurance plans starting at $39/month include daily backups, security monitoring, malware removal, and 99.9% uptime guarantee.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button asChild size="heroPill" variant="heroPrimary">
                    <Link to="/business/website-insurance">
                      View Protection Plans
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  <Button asChild size="heroPill" variant="outline">
                    <Link to="/contact">Contact InVision Network</Link>
                  </Button>
                </div>
              </div>
            </section>
          )}
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
}
