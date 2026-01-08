import { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Shield, UserPlus, ChevronLeft, ChevronRight, Menu, Search, Bell, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const users = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "Admin", status: "Active", devices: 3 },
  { id: 2, name: "Sarah Johnson", email: "sarah@example.com", role: "User", status: "Active", devices: 2 },
  { id: 3, name: "Mike Brown", email: "mike@example.com", role: "User", status: "Active", devices: 1 },
  { id: 4, name: "Emily Davis", email: "emily@example.com", role: "Moderator", status: "Inactive", devices: 2 },
  { id: 5, name: "Kids Account", email: "kids@example.com", role: "Restricted", status: "Active", devices: 2 },
];

export default function UserManagement() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin": return "text-purple-400 bg-purple-500/10";
      case "Moderator": return "text-blue-400 bg-blue-500/10";
      case "Restricted": return "text-orange-400 bg-orange-500/10";
      default: return "text-gray-400 bg-gray-500/10";
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
              <Input type="text" placeholder="Search users..." className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] h-10 rounded-lg" />
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
              <h1 className="text-3xl font-bold text-[#F9FAFB]">User Management</h1>
              <p className="text-[#9CA3AF]">Manage family members and their permissions</p>
            </div>
            <div className="flex gap-3">
              <Link to="/admin">
                <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-[#F9FAFB]">
                  Back to Dashboard
                </Button>
              </Link>
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>

          <Card className="bg-[#111827] border-gray-800">
            <CardHeader>
              <CardTitle className="text-[#F9FAFB]">Family Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-[#1F2937] border border-gray-800">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 bg-gradient-to-br from-[#3B82F6] to-[#06B6D4]">
                        <AvatarFallback className="text-white bg-transparent">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-[#F9FAFB]">{user.name}</p>
                        <p className="text-sm text-[#9CA3AF]">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                      <div className="text-center">
                        <p className="text-lg font-bold text-[#F9FAFB]">{user.devices}</p>
                        <p className="text-xs text-[#9CA3AF]">Devices</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'}`} />
                      <Button variant="ghost" size="icon" className="text-[#9CA3AF] hover:text-[#F9FAFB]">
                        <MoreVertical className="h-5 w-5" />
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
