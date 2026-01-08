import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, AlertTriangle, CheckCircle, XCircle, ChevronLeft, ChevronRight, Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";

const threats = [
  { id: 1, type: "Phishing", severity: "High", status: "Blocked", time: "2 mins ago", target: "john@email.com" },
  { id: 2, type: "Malware", severity: "Critical", status: "Quarantined", time: "15 mins ago", target: "Desktop-01" },
  { id: 3, type: "Suspicious Login", severity: "Medium", status: "Investigating", time: "1 hour ago", target: "admin@company.com" },
  { id: 4, type: "Data Exfiltration", severity: "High", status: "Blocked", time: "3 hours ago", target: "Server-03" },
  { id: 5, type: "Brute Force", severity: "Low", status: "Blocked", time: "5 hours ago", target: "SSH Port" },
];

export default function ThreatMonitor() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "text-red-500 bg-red-500/10";
      case "High": return "text-orange-500 bg-orange-500/10";
      case "Medium": return "text-yellow-500 bg-yellow-500/10";
      case "Low": return "text-green-500 bg-green-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Blocked": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Quarantined": return <Shield className="h-4 w-4 text-blue-500" />;
      case "Investigating": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F19] w-full">
      <CyberSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      <header className={`fixed top-0 right-0 left-0 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800 z-40 
        transition-all duration-300 ${sidebarOpen ? 'md:left-[260px]' : 'md:left-[70px]'}`}>
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.innerWidth < 768 ? setMobileSidebarOpen(!mobileSidebarOpen) : setSidebarOpen(!sidebarOpen)}
              className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </Button>
            
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={() => window.history.back()} className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => window.history.forward()} className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="relative hidden sm:block max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <Input type="text" placeholder="Search threats..." className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] h-10 rounded-lg" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
            </Button>
          </div>
        </div>
      </header>

      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#F9FAFB]">Threat Monitor</h1>
              <p className="text-[#9CA3AF]">Real-time threat detection and response</p>
            </div>
            <Link to="/admin">
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4 mb-8">
            {[
              { label: "Active Threats", value: "3", color: "from-red-500 to-orange-500" },
              { label: "Blocked Today", value: "127", color: "from-green-500 to-emerald-500" },
              { label: "Under Review", value: "5", color: "from-yellow-500 to-orange-500" },
              { label: "Resolved", value: "1,234", color: "from-blue-500 to-cyan-500" },
            ].map((stat) => (
              <Card key={stat.label} className="bg-[#111827] border-gray-800">
                <CardContent className="p-6">
                  <p className="text-[#9CA3AF] text-sm">{stat.label}</p>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Recent Threats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threats.map((threat) => (
                  <div key={threat.id} className="flex items-center justify-between p-4 rounded-lg bg-[#1F2937] border border-gray-800">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getSeverityColor(threat.severity)}`}>
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-[#F9FAFB]">{threat.type}</p>
                        <p className="text-sm text-[#9CA3AF]">Target: {threat.target}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(threat.status)}
                        <span className="text-sm text-[#9CA3AF]">{threat.status}</span>
                      </div>
                      <span className="text-sm text-[#9CA3AF]">{threat.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
