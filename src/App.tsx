import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Training from "./pages/Training";
import Business from "./pages/Business";
import About from "./pages/About";
import Resources from "./pages/Resources";
import SafetyVault from "./pages/SafetyVault";
import Articles from "./pages/Articles";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Auth from "./pages/Auth";
import Signup from "./pages/Signup";
import ApplicationPending from "./pages/ApplicationPending";
import Portal from "./pages/Portal";
import AdminDashboard from "./pages/portal/AdminDashboard";
import AnalystDashboard from "./pages/portal/AnalystDashboard";
import TrainerDashboard from "./pages/portal/TrainerDashboard";
import DeveloperDashboard from "./pages/portal/DeveloperDashboard";
import StaffDashboard from "./pages/portal/StaffDashboard";
import SeniorDashboard from "./pages/portal/SeniorDashboard";
import CaregiverDashboard from "./pages/portal/CaregiverDashboard";
import HealthcareDashboard from "./pages/portal/HealthcareDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { AIChat } from "./components/AIChat";
import { AIChatProvider } from "./contexts/AIChatContext";

const queryClient = new QueryClient();

// Page transition wrapper component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div 
      key={location.pathname}
      className="animate-fade-in"
      style={{ 
        animationDuration: '0.4s',
        animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {children}
    </div>
  );
};

const App = () => {
  // Add smooth scroll behavior for anchor links
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AIChatProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/training" element={<PageTransition><Training /></PageTransition>} />
            <Route path="/business" element={<PageTransition><Business /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
            <Route path="/safety-vault" element={<PageTransition><SafetyVault /></PageTransition>} />
            <Route path="/articles" element={<PageTransition><Articles /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
            <Route path="/auth" element={<PageTransition><Auth /></PageTransition>} />
            <Route path="/signup" element={<PageTransition><Signup /></PageTransition>} />
            <Route path="/application-pending" element={<PageTransition><ApplicationPending /></PageTransition>} />
            <Route path="/portal" element={<PageTransition><ProtectedRoute><Portal /></ProtectedRoute></PageTransition>} />
            <Route path="/portal/admin" element={<PageTransition><ProtectedRoute><AdminDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="/portal/analyst" element={<PageTransition><ProtectedRoute><AnalystDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="/portal/trainer" element={<PageTransition><ProtectedRoute><TrainerDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="/portal/developer" element={<PageTransition><ProtectedRoute><DeveloperDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="/portal/staff" element={<PageTransition><ProtectedRoute><StaffDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="/portal/senior" element={<PageTransition><ProtectedRoute><SeniorDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="/portal/caregiver" element={<PageTransition><ProtectedRoute><CaregiverDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="/portal/healthcare" element={<PageTransition><ProtectedRoute><HealthcareDashboard /></ProtectedRoute></PageTransition>} />
            <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
            <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
          <AIChat />
        </BrowserRouter>
        </AIChatProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
