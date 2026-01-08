import { useState } from "react";
import { Link } from "react-router-dom";
import { Activity, Shield, User, Settings, ChevronLeft, ChevronRight, Menu, Search, Bell, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";

const activities = [
  { id: 1, action: "Threat Blocked", user: "System", type: "security", time: "2 mins ago", details: "Phishing attempt blocked on john@email.com" },
  { id: 2, action: "Login Successful", user: "John Smith", type: "auth", time: "15 mins ago", details: "Logged in from iPhone 14 Pro" },
  { id: 3, action: "Device Scan Complete", user: "System", type: "scan", time: "1 hour ago", details: "MacBook Pro scan completed - 0 threats found" },
  { id: 4, action: "Settings Changed", user: "Admin", type: "settings", time: "2 hours ago", details: "Notification preferences updated" },
  { id: 5, action: "New Device Added", user: "Sarah Johnson", type: "device", time: "3 hours ago", details: "iPad Air added to family protection" },
  { id: 6, action: "Database Updated", user: "System", type: "system", time: "4 hours ago", details: "Threat database updated with 1,234 new signatures" },
  { id: 7, action: "Password Changed", user: "Mike Brown", type: "auth", time: "5 hours ago", details: "Account password successfully updated" },
];

export default function ActivityLog() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "security": return Shield;
      case "auth": return User;
      case "settings": return Settings;
      default: return Activity;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "security": return "from-red-500 to-orange-500";
      case "auth": return "from-green-500 to-emerald-500";
      case "settings": return "from-purple-500 to-pink-500";
      case "scan": return "from-blue-500 to-cyan-500";
      default: return "from-gray-500 to-gray-600";
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
              <Input type="text" placeholder="Search activities..." className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] h-10 rounded-lg" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#F9FAFB]">Activity Log</h1>
              <p className="text-[#9CA3AF]">Complete history of all system activities</p>
            </div>
            <Link to="/admin">
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => {
                  const Icon = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-[#1F2937] border border-gray-800">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${getActivityColor(activity.type)}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-[#F9FAFB]">{activity.action}</p>
                          <span className="text-sm text-[#9CA3AF]">{activity.time}</span>
                        </div>
                        <p className="text-sm text-[#9CA3AF] mt-1">{activity.details}</p>
                        <p className="text-xs text-[#6B7280] mt-1">By: {activity.user}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
