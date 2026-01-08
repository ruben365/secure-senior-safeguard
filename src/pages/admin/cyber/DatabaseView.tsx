import { useState } from "react";
import { Link } from "react-router-dom";
import { Database, RefreshCw, Download, ChevronLeft, ChevronRight, Menu, Search, Bell, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
import { Progress } from "@/components/ui/progress";

const databases = [
  { id: 1, name: "Threat Signatures", records: "2.4M", lastUpdate: "32ms ago", size: "1.2 GB", status: "Synced" },
  { id: 2, name: "User Profiles", records: "1,234", lastUpdate: "5 mins ago", size: "45 MB", status: "Synced" },
  { id: 3, name: "Device Registry", records: "5,678", lastUpdate: "10 mins ago", size: "120 MB", status: "Synced" },
  { id: 4, name: "Activity Logs", records: "12.5M", lastUpdate: "Now", size: "2.8 GB", status: "Syncing" },
  { id: 5, name: "Blocked URLs", records: "8.9M", lastUpdate: "1 hour ago", size: "890 MB", status: "Synced" },
];

export default function DatabaseView() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
              <Input type="text" placeholder="Search databases..." className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] h-10 rounded-lg" />
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
              <h1 className="text-3xl font-bold text-[#F9FAFB]">Database</h1>
              <p className="text-[#9CA3AF]">Security databases and threat intelligence</p>
            </div>
            <div className="flex gap-3">
              <Link to="/admin">
                <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-[#F9FAFB]">
                  Back to Dashboard
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                Sync All
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="bg-[#111827] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <HardDrive className="h-5 w-5 text-[#06B6D4]" />
                  <span className="text-[#9CA3AF]">Total Storage</span>
                </div>
                <p className="text-3xl font-bold text-[#F9FAFB]">5.1 GB</p>
                <Progress value={51} className="mt-2 h-2" />
                <p className="text-xs text-[#9CA3AF] mt-1">51% of 10 GB used</p>
              </CardContent>
            </Card>
            <Card className="bg-[#111827] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Database className="h-5 w-5 text-[#10B981]" />
                  <span className="text-[#9CA3AF]">Total Records</span>
                </div>
                <p className="text-3xl font-bold text-[#F9FAFB]">24.5M</p>
              </CardContent>
            </Card>
            <Card className="bg-[#111827] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-2">
                  <RefreshCw className="h-5 w-5 text-[#F59E0B]" />
                  <span className="text-[#9CA3AF]">Last Full Sync</span>
                </div>
                <p className="text-3xl font-bold text-[#F9FAFB]">32ms</p>
                <p className="text-xs text-[#9CA3AF] mt-1">ago</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Database Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {databases.map((db) => (
                  <div key={db.id} className="flex items-center justify-between p-4 rounded-lg bg-[#1F2937] border border-gray-800">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20">
                        <Database className="h-5 w-5 text-[#06B6D4]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#F9FAFB]">{db.name}</p>
                        <p className="text-sm text-[#9CA3AF]">{db.records} records • {db.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-[#9CA3AF]">Last updated</p>
                        <p className="text-sm text-[#F9FAFB]">{db.lastUpdate}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        db.status === 'Syncing' ? 'text-yellow-400 bg-yellow-500/10' : 'text-green-400 bg-green-500/10'
                      }`}>
                        {db.status}
                      </span>
                      <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-[#F9FAFB]">
                        <Download className="h-4 w-4" />
                      </Button>
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
