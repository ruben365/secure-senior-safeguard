import { Shield, CheckCircle, Activity, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface ProtectionStatusHeroProps {
  planName?: string;
  status?: "active" | "inactive" | "pending";
  protectionScore?: number;
}

export function ProtectionStatusHero({ 
  planName = "ScamShield", 
  status = "active",
  protectionScore = 94 
}: ProtectionStatusHeroProps) {
  const isActive = status === "active";

  return (
    <Card className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20">
      {/* Animated background pulse */}
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      <div className="relative p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          {/* Shield Icon with Status Ring */}
          <div className="relative">
            <motion.div
              className={`w-20 h-20 rounded-full flex items-center justify-center ${
                isActive 
                  ? "bg-gradient-to-br from-green-500 to-emerald-600" 
                  : "bg-muted"
              }`}
              animate={isActive ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            {isActive && (
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
            )}
          </div>

          {/* Status Info */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">{planName}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isActive 
                  ? "bg-green-500/20 text-green-600" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {isActive ? "Active Protection" : "Inactive"}
              </span>
            </div>
            
            <p className="text-muted-foreground">
              {isActive 
                ? "Your family is protected from AI-powered scams, phishing, and fraud attempts."
                : "Activate your protection to secure your family."}
            </p>

            {/* Protection Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Activity className="w-4 h-4 text-primary" />
                  Protection Score
                </span>
                <span className="font-semibold text-primary">{protectionScore}%</span>
              </div>
              <Progress value={protectionScore} className="h-2" />
            </div>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            <div className="flex items-center gap-2 bg-card/80 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Threats Blocked</p>
                <p className="font-bold text-lg">247</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-card/80 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Shield className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Days Protected</p>
                <p className="font-bold text-lg">32</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
