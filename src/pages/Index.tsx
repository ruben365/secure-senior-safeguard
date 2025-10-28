import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  LogOut,
  Bell,
  Calendar,
  ChevronRight,
  Filter,
  Mail,
  MessageSquare,
  Link as LinkIcon,
  FileText,
  TrendingUp,
} from "lucide-react";

const ThreatAnalystDashboard = () => {
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());

  const handleLogout = () => {
    navigate("/portal/login");
  };

  const stats = [
    { label: "My Open Cases", value: "8", icon: AlertTriangle, color: "accent" },
    { label: "Closed Today", value: "5", icon: CheckCircle, color: "primary" },
    { label: "Avg Response Time", value: "2.3h", icon: Clock, color: "primary" },
    { label: "This Week", value: "32", icon: TrendingUp, color: "accent" },
  ];

  const caseQueue = [
    {
      id: "SC-1245",
      client: "Margaret R.",
      type: "Email",
      risk: "CRITICAL",
      priority: "HIGH",
      submitted: "15 min ago",
      description: "Suspicious email claiming to be from Chase Bank",
    },
    {
      id: "SC-1246",
      client: "James K.",
      type: "SMS",
      risk: "HIGH",
      priority: "NORMAL",
      submitted: "45 min ago",
      description: "Text message about package delivery",
    },
    {
      id: "SC-1247",
      client: "Patricia L.",
      type: "Voice Call",
      risk: "MEDIUM",
      priority: "NORMAL",
      submitted: "2 hours ago",
      description: "Suspicious call from 'Microsoft support'",
    },
    {
      id: "SC-1248",
      client: "Robert K.",
      type: "Link",
      risk: "HIGH",
      priority: "HIGH",
      submitted: "3 hours ago",
      description: "Suspicious link received via social media",
    },
  ];

  const myActiveCases = [
    {
      id: "SC-1240",
      client: "Sarah M.",
      type: "Email",
      status: "In Progress",
      progress: 60,
      deadline: "2 hours",
    },
    {
      id: "SC-1241",
      client: "William C.",
      type: "SMS",
      status: "Waiting on Client",
      progress: 80,
      deadline: "Today",
    },
    {
      id: "SC-1242",
      client: "Jennifer W.",
      type: "Voice",
      status: "In Progress",
      progress: 40,
      deadline: "4 hours",
    },
  ];

  const todaySchedule = [
    { time: "9:00 AM", task: "Review new case submissions", type: "case" },
    { time: "10:30 AM", task: "Team case review meeting", type: "meeting" },
    { time: "2:00 PM", task: "Training: New scam patterns", type: "training" },
    { time: "4:00 PM", task: "Weekly report submission", type: "admin" },
  ];

  const recentAlerts = [
    { time: "10 min ago", alert: "New CRITICAL case assigned", case: "SC-1245" },
    { time: "1 hour ago", alert: "Case deadline approaching", case: "SC-1240" },
    { time: "2 hours ago", alert: "Client responded to case", case: "SC-1241" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-card border-b border-border/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-bold text-lg">InVision Network</h1>
                  <p className="text-xs text-muted-foreground">Threat Analyst Portal</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2">
                <Search className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Lisa</h2>
          <p className="text-muted-foreground">
            {currentDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-strong transition-all duration-500 hover:-translate-y-2 hover:scale-105 rounded-2xl border-border/50 group animate-fade-in-up bg-gradient-to-br from-card to-card/50 backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Case Queue */}
          <div className="lg:col-span-2 space-y-8">
            {/* New Case Queue */}
            <Card className="p-6 rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-bold">New Case Queue</h3>
                  <span className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full font-semibold">
                    {caseQueue.length} New
                  </span>
                </div>
                <Button size="sm" variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {caseQueue.map((caseItem, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border-2 hover:shadow-md transition-all duration-300 group cursor-pointer"
                    style={{
                      borderColor:
                        caseItem.risk === "CRITICAL"
                          ? "rgb(220, 38, 38)"
                          : caseItem.risk === "HIGH"
                            ? "rgb(249, 115, 22)"
                            : caseItem.risk === "MEDIUM"
                              ? "rgb(234, 179, 8)"
                              : "rgb(34, 197, 94)",
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary">#{caseItem.id}</span>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-bold ${
                            caseItem.risk === "CRITICAL"
                              ? "bg-red-500 text-white"
                              : caseItem.risk === "HIGH"
                                ? "bg-orange-500 text-white"
                                : caseItem.risk === "MEDIUM"
                                  ? "bg-yellow-500 text-white"
                                  : "bg-green-500 text-white"
                          }`}
                        >
                          {caseItem.risk}
                        </span>
                        {caseItem.priority === "HIGH" && (
                          <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-semibold">
                            Priority
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{caseItem.submitted}</span>
                    </div>
                    <div className="mb-3">
                      <p className="font-semibold mb-1">Client: {caseItem.client}</p>
                      <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {caseItem.type === "Email" && <Mail className="w-4 h-4 text-muted-foreground" />}
                        {caseItem.type === "SMS" && <MessageSquare className="w-4 h-4 text-muted-foreground" />}
                        {caseItem.type === "Voice Call" && <Clock className="w-4 h-4 text-muted-foreground" />}
                        {caseItem.type === "Link" && <LinkIcon className="w-4 h-4 text-muted-foreground" />}
                        <span className="text-sm text-muted-foreground">{caseItem.type}</span>
                      </div>
                      <Button size="sm" variant="default">
                        Claim Case
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="ghost" className="gap-2">
                  View All Cases
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* My Active Cases */}
            <Card className="p-6 rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">My Active Cases</h3>
              </div>

              <div className="space-y-4">
                {myActiveCases.map((caseItem, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl border border-border/50 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-primary">#{caseItem.id}</span>
                        <span className="text-sm">{caseItem.client}</span>
                      </div>
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                        {caseItem.status}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-semibold">{caseItem.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${caseItem.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Due: {caseItem.deadline}</span>
                      <Button size="sm" variant="outline">
                        Continue
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Schedule & Alerts */}
          <div className="space-y-8">
            {/* Today's Schedule */}
            <Card className="p-6 rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-primary" />
                <h3 className="text-xl font-bold">Today</h3>
              </div>

              <div className="space-y-4">
                {todaySchedule.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 w-16 text-right">
                      <p className="text-xs font-semibold text-primary">{item.time}</p>
                    </div>
                    <div className="flex-grow p-3 rounded-lg border border-border/50 hover:shadow-md transition-all duration-300">
                      <p className="text-sm font-medium">{item.task}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                          item.type === "case"
                            ? "bg-accent/10 text-accent"
                            : item.type === "meeting"
                              ? "bg-primary/10 text-primary"
                              : item.type === "training"
                                ? "bg-primary/10 text-primary"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Alerts */}
            <Card className="p-6 rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
              <div className="flex items-center gap-3 mb-6">
                <Bell className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold">Alerts</h3>
              </div>

              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex gap-3 pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-medium">{alert.alert}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Case #{alert.case} • {alert.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Analysis Tools */}
            <Card className="p-6 rounded-2xl border-border/50 animate-fade-in-up bg-gradient-to-br from-card to-card/50">
              <h3 className="text-xl font-bold mb-4">Analysis Tools</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Mail className="w-4 h-4" />
                  Email Header Analyzer
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <LinkIcon className="w-4 h-4" />
                  Link Scanner
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <MessageSquare className="w-4 h-4" />
                  Voice Analysis Tool
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <FileText className="w-4 h-4" />
                  Scam Pattern Database
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatAnalystDashboard;
