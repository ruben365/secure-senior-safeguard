import { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, TrendingDown, ChevronLeft, ChevronRight, Menu, Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const threatData = [
  { name: "Mon", blocked: 120, detected: 140 },
  { name: "Tue", blocked: 180, detected: 200 },
  { name: "Wed", blocked: 150, detected: 170 },
  { name: "Thu", blocked: 200, detected: 220 },
  { name: "Fri", blocked: 170, detected: 190 },
  { name: "Sat", blocked: 90, detected: 100 },
  { name: "Sun", blocked: 80, detected: 95 },
];

const categoryData = [
  { name: "Phishing", value: 450 },
  { name: "Malware", value: 300 },
  { name: "Ransomware", value: 150 },
  { name: "Scam", value: 200 },
  { name: "Spam", value: 380 },
];

export default function CyberAnalytics() {
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
              <Input type="text" placeholder="Search analytics..." className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] h-10 rounded-lg" />
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
              <h1 className="text-3xl font-bold text-[#F9FAFB]">Analytics Overview</h1>
              <p className="text-[#9CA3AF]">Security metrics and threat intelligence</p>
            </div>
            <Link to="/admin">
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-4 mb-8">
            {[
              { label: "Threats Blocked", value: "1,234", change: "+12%", up: true },
              { label: "Protection Rate", value: "99.2%", change: "+0.5%", up: true },
              { label: "Active Devices", value: "5", change: "+1", up: true },
              { label: "Response Time", value: "32ms", change: "-8ms", up: true },
            ].map((stat) => (
              <Card key={stat.label} className="bg-[#111827] border-gray-800">
                <CardContent className="p-6">
                  <p className="text-[#9CA3AF] text-sm">{stat.label}</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-3xl font-bold text-[#F9FAFB]">{stat.value}</p>
                    <div className={`flex items-center gap-1 ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                      {stat.up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                      <span className="text-sm">{stat.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-[#F9FAFB]">Weekly Threat Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={threatData}>
                    <defs>
                      <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDetected" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Area type="monotone" dataKey="detected" stroke="#F97316" strokeWidth={2} fill="url(#colorDetected)" />
                    <Area type="monotone" dataKey="blocked" stroke="#3B82F6" strokeWidth={2} fill="url(#colorBlocked)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-[#F9FAFB]">Threats by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#F97316" />
                        <stop offset="100%" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                      labelStyle={{ color: '#F9FAFB' }}
                    />
                    <Bar dataKey="value" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
