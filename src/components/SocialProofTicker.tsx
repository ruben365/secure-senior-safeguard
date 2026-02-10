import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Shield, Star, Users, CheckCircle2 } from "lucide-react";
interface ProofItem {
  id: number;
  type: "signup" | "review" | "protection" | "milestone";
  location: string;
  message: string;
  time: string;
}
const proofData: Omit<ProofItem, "id">[] = [{
  type: "signup",
  location: "Columbus, OH",
  message: "Family in Columbus enrolled in GUARD plan",
  time: "Moments ago"
}, {
  type: "review",
  location: "Cleveland, OH",
  message: "Sample review: \"Clear, patient guidance\"",
  time: "5 min ago"
}, {
  type: "protection",
  location: "Cincinnati, OH",
  message: "Sample: Suspicious call flagged for review",
  time: "8 min ago"
}, {
  type: "signup",
  location: "Toledo, OH",
  message: "Veteran family joined with 10% discount",
  time: "12 min ago"
}, {
  type: "milestone",
  location: "Ohio",
  message: "100+ families now protected statewide",
  time: "Just now"
}, {
  type: "review",
  location: "Akron, OH",
  message: "Sample review: \"We feel safer and prepared\"",
  time: "15 min ago"
}, {
  type: "protection",
  location: "Dayton, OH",
  message: "Sample: Scam attempt neutralized",
  time: "18 min ago"
}, {
  type: "signup",
  location: "Canton, OH",
  message: "Business upgraded to SENTINEL tier",
  time: "22 min ago"
}, {
  type: "review",
  location: "Youngstown, OH",
  message: "Sample review: \"Helpful and respectful\"",
  time: "25 min ago"
}, {
  type: "protection",
  location: "Springfield, OH",
  message: "Sample: Gift card scam blocked",
  time: "30 min ago"
}];
const typeConfig = {
  signup: {
    icon: Users,
    color: "text-primary",
    bg: "from-primary/20 to-primary/5"
  },
  review: {
    icon: Star,
    color: "text-amber-500",
    bg: "from-amber-500/20 to-amber-500/5"
  },
  protection: {
    icon: Shield,
    color: "text-green-500",
    bg: "from-green-500/20 to-green-500/5"
  },
  milestone: {
    icon: CheckCircle2,
    color: "text-accent",
    bg: "from-accent/20 to-accent/5"
  }
};
export const SocialProofTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Show after delay
    const showTimer = setTimeout(() => setIsVisible(true), 3000);

    // Rotate items
    const rotateInterval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % proofData.length);
    }, 5000);
    return () => {
      clearTimeout(showTimer);
      clearInterval(rotateInterval);
    };
  }, []);
  const currentItem = proofData[currentIndex];
  const TypeIcon = typeConfig[currentItem.type].icon;
  return <AnimatePresence>
      {isVisible && <motion.div initial={{
      opacity: 0,
      y: 50,
      x: -20
    }} animate={{
      opacity: 1,
      y: 0,
      x: 0
    }} exit={{
      opacity: 0,
      y: 50
    }} transition={{
      duration: 0.5,
      type: "spring"
    }} className="fixed bottom-6 left-6 z-50 max-w-xs">
          <motion.div key={currentIndex} initial={{
        opacity: 0,
        scale: 0.95
      }} animate={{
        opacity: 1,
        scale: 1
      }} exit={{
        opacity: 0,
        scale: 0.95
      }} transition={{
        duration: 0.4
      }} className="relative overflow-hidden">
            {/* Main Card */}
            
          </motion.div>
        </motion.div>}
    </AnimatePresence>;
};
export default SocialProofTicker;