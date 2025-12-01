import { useState, ReactNode } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background w-full overflow-x-hidden">
      <AdminSidebar 
        isOpen={sidebarOpen} 
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />
      
      <AdminTopBar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={() => {
          if (window.innerWidth < 768) {
            setMobileSidebarOpen(!mobileSidebarOpen);
          } else {
            setSidebarOpen(!sidebarOpen);
          }
        }} 
      />
      
      <main className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? 'md:ml-[260px]' : 'md:ml-[70px]'}`}>
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
