import { useState, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  MessageCircle,
  Send,
  CheckCircle,
  Heart,
  HelpCircle,
  ArrowRight,
  Package,
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useCartFeedback } from "@/contexts/CartFeedbackContext";

// Thank You Notification Component
export const PurchaseThankYouNotification = forwardRef<HTMLDivElement>(function PurchaseThankYouNotification(_props, _ref) {
  const { showThankYou, dismissAll } = useCartFeedback();

  if (!showThankYou) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 56 }}
        animate={{ y: 0 }}
        exit={{ y: 20 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="site-notification-anchor"
      >
        <Card className="site-notification-card p-5 shadow-xl border-success/30">
          {/* Decorative gradient top */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-success via-primary to-accent" />

          <button
            onClick={dismissAll}
            className="absolute top-3 right-3 p-1 text-white/56 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-4">
            <motion.div
              className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <CheckCircle className="w-6 h-6 text-success" />
            </motion.div>

            <div className="flex-1">
              <motion.h3
                className="font-bold text-lg text-white mb-1"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Thank You! 🎉
              </motion.h3>
              <motion.p
                className="text-sm text-white/78 mb-3"
                transition={{ delay: 0.4 }}
              >
                Your order is being processed. Check your email for confirmation
                and details.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 text-xs text-white/68"
              >
                <Heart className="w-3 h-3 text-destructive" />
                <span>We appreciate your trust in InVision Network</span>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="mt-4 pt-3 border-t border-border/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              asChild
              size="sm"
              className="w-full text-xs bg-white/8 border-white/18 text-white hover:bg-white/14 hover:text-white"
              variant="outline"
            >
              <Link to="/resources">
                <Package className="w-3 h-3 mr-1.5" />
                Continue Shopping
                <ArrowRight className="w-3 h-3 ml-1.5" />
              </Link>
            </Button>
          </motion.div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
});

// Empty Cart Help Notification Component
export const CartEmptyHelpNotification = forwardRef<HTMLDivElement>(function CartEmptyHelpNotification(_props, _ref) {
  const { showEmptyCartHelp, dismissAll } = useCartFeedback();
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");

  if (!showEmptyCartHelp) return null;

  const handleSubmitFeedback = () => {
    if (feedback.trim()) {
      toast.success("Thank you for your feedback! We'll use it to improve.");
    }
    setShowFeedback(false);
    dismissAll();
    setFeedback("");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 56 }}
        animate={{ y: 0 }}
        exit={{ y: 20 }}
        transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
        className="site-notification-anchor"
      >
        <Card className="site-notification-card p-5 shadow-xl border-primary/25">
          <button
            onClick={dismissAll}
            className="absolute top-3 right-3 p-1 text-white/56 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {!showFeedback ? (
            <div className="pr-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">Need Help?</p>
                  <p className="text-xs text-white/62">
                    Your cart is now empty
                  </p>
                </div>
              </div>

              <p className="text-sm text-white/78 mb-4">
                Is everything okay? Let us know if you need any assistance or
                have questions about our products.
              </p>

              <div className="space-y-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFeedback(true)}
                  className="w-full text-xs justify-start bg-white/8 border-white/18 text-white hover:bg-white/14 hover:text-white"
                >
                  <MessageCircle className="w-3 h-3 mr-2" />
                  Share Feedback
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="w-full text-xs justify-start bg-[linear-gradient(135deg,#ea580c,#c2410c)] border border-[#7c2d12] text-white hover:brightness-110"
                >
                  <Link to="/contact">
                    <HelpCircle className="w-3 h-3 mr-2" />
                    Contact Support
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={dismissAll}
                  className="w-full text-xs text-white/72 hover:text-white hover:bg-white/8"
                >
                  I'm Just Browsing
                </Button>
              </div>
            </div>
          ) : (
            <div className="pr-6">
              <p className="font-semibold text-sm text-white mb-2">How can we improve?</p>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what would make your experience better..."
                className="mb-3 text-sm min-h-[80px] bg-white/8 border-white/16 text-white placeholder:text-white/45"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 text-xs bg-white/8 border-white/18 text-white hover:bg-white/14 hover:text-white"
                >
                  Back
                </Button>
                <Button
                  size="sm"
                  onClick={handleSubmitFeedback}
                  className="flex-1 text-xs bg-[linear-gradient(135deg,#ea580c,#c2410c)] border border-[#7c2d12] text-white hover:brightness-110"
                >
                  <Send className="w-3 h-3 mr-1" />
                  Submit
                </Button>
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </AnimatePresence>
  );
});

// Combined Feedback Notifications Component
export const CartFeedbackNotifications = forwardRef<HTMLDivElement>(function CartFeedbackNotifications(_props, _ref) {
  return (
    <>
      <PurchaseThankYouNotification />
      <CartEmptyHelpNotification />
    </>
  );
});
