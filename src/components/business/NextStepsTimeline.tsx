import { Card } from "@/components/ui/card";
import { FileText, Phone, Rocket } from "lucide-react";

function NextStepsTimeline() {
  const steps = [
    {
      icon: FileText,
      title: "Submit Request",
      description: "Fill out the intake form with your requirements",
      time: "Day 1"
    },
    {
      icon: Phone,
      title: "Discovery Call",
      description: "We review your needs and create a custom proposal",
      time: "Day 2-3"
    },
    {
      icon: Rocket,
      title: "Begin Implementation",
      description: "After approval, we start building your solution",
      time: "Week 1"
    }
  ];

  return (
    <Card className="p-8 bg-gradient-to-br from-success/5 to-success/10 border-success/20">
      <h3 className="text-xl font-bold text-center mb-8">What Happens After You Submit?</h3>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-4 flex-1">
            {/* Step Content */}
            <div className="flex items-start gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center">
                  <step.icon className="w-6 h-6 text-success" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <div>
                <p className="text-xs text-success font-medium mb-1">{step.time}</p>
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
            
            {/* Connector Arrow (hidden on last item and mobile) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block text-success/50 text-2xl mx-2">→</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default NextStepsTimeline;
