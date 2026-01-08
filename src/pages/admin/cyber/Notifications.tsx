import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Shield, AlertTriangle, Info, CheckCircle, ChevronLeft, ChevronRight, Menu, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";

const notifications = [
  { id: 1, title: "Critical Threat Detected", message: "A phishing attempt was blocked on john@email.com", type: "critical", time: "2 mins ago", read: false },
  { id: 2, title: "Device Scan Complete", message: "MacBook Pro scan completed successfully with no threats found", type: "success", time: "15 mins ago", read: false },
  { id: 3, title: "New Device Added", message: "iPad Air was added to family protection by Sarah", type: "info", time: "1 hour ago", read: true },
  { id: 4, title: "Database Updated", message: "Threat database updated with 1,234 new signatures", type: "info", time: "2 hours ago", read: true },
  { id: 5, title: "Subscription Renewal", message: "Your family protection plan renews in 7 days", type: "warning", time: "1 day ago", read: true },
];

export default function Notifications() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "critical": return Shield;
      case "warning": return AlertTriangle;
      case "success": return CheckCircle;
      default: return Info;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "critical": return "from-red-500 to-orange-500 text-red-400";
      case "warning": return "from-yellow-500 to-orange-500 text-yellow-400";
      case "success": return "from-green-500 to-emerald-500 text-green-400";
      default: return "from-blue-500 to-cyan-500 text-blue-400";
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
              <Input type="text" placeholder="Search notifications..." className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] h-10 rounded-lg" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full" />
            </Button>
          </div>
        </div>
      </header>

      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#F9FAFB]">Notifications</h1>
              <p className="text-[#9CA3AF]">Stay updated on security events and alerts</p>
            </div>
            <div className="flex gap-3">
              <Link to="/admin">
                <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-[#F9FAFB]">
                  Back to Dashboard
                </Button>
              </Link>
              <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-[#F9FAFB]">
                Mark all as read
              </Button>
            </div>
          </div>

          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
                <Bell className="h-5 w-5" />
                All Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => {
                  const Icon = getNotificationIcon(notification.type);
                  const colorClass = getNotificationColor(notification.type);
                  return (
                    <div 
                      key={notification.id} 
                      className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                        notification.read 
                          ? 'bg-[#1F2937] border-gray-800' 
                          : 'bg-[#1F2937]/80 border-gray-700 ring-1 ring-[#3B82F6]/20'
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-[#F9FAFB]">{notification.title}</p>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-[#3B82F6] rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-[#9CA3AF] mt-1">{notification.message}</p>
                        <p className="text-xs text-[#6B7280] mt-2">{notification.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
