import { GraduationCap, Trophy, Star, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const trainingModules = [
  { id: 1, name: "Phishing 101", progress: 100, badge: "🎯" },
  { id: 2, name: "Voice Scam Defense", progress: 75, badge: null },
  { id: 3, name: "AI Deepfake Detection", progress: 30, badge: null },
  { id: 4, name: "Financial Fraud", progress: 0, badge: null },
];

export function TrainingProgressCard() {
  const navigate = useNavigate();
  const completedModules = trainingModules.filter(m => m.progress === 100).length;
  const overallProgress = Math.round(
    trainingModules.reduce((acc, m) => acc + m.progress, 0) / trainingModules.length
  );

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Training Progress
          </CardTitle>
          <Badge variant="secondary" className="bg-primary/10 text-primary">
            <Trophy className="w-3 h-3 mr-1" />
            {completedModules} / {trainingModules.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Overall Mastery</span>
            <span className="text-primary font-bold">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Module List */}
        <div className="space-y-2">
          {trainingModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
              onClick={() => navigate("/learn-and-train")}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                module.progress === 100 
                  ? "bg-green-500/20 text-green-600" 
                  : module.progress > 0 
                    ? "bg-blue-500/20 text-blue-600"
                    : "bg-muted text-muted-foreground"
              }`}>
                {module.badge || (module.progress === 100 ? "✓" : `${module.progress}%`)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{module.name}</p>
                <Progress value={module.progress} className="h-1 mt-1" />
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          ))}
        </div>

        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => navigate("/learn-and-train")}
        >
          <Star className="w-4 h-4 mr-2" />
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  );
}
