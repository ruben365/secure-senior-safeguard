import { motion } from "framer-motion";
import { Camera, Lock, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

export const AIImageDisclaimer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-muted/50 to-muted/20 border-border/50 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              Privacy-First Imagery
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              🎨 <strong>AI-Generated Images:</strong> To protect the privacy and identity of our clients, partners, and team members, 
              many images on this website are AI-generated. We prioritize your privacy and security above all else.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Shield className="w-3 h-3" />
                Privacy Protected
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-xs font-medium">
                <Camera className="w-3 h-3" />
                AI-Generated
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                <Lock className="w-3 h-3" />
                Identity Secure
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
