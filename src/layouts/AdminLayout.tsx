import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        
        setIsSidebarOpen(true);
        
        if (window.innerWidth < 1280) {
          setIsSidebarCollapsed(true);
        }
      } else {
       
        setIsSidebarOpen(false);
        setIsSidebarCollapsed(false);
      }
    };

    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content */}
      <div className={`
        flex-1 flex flex-col min-h-screen transition-all duration-300
        ${isSidebarOpen && !isSidebarCollapsed ? 'lg:ml-64' : ''}
        ${isSidebarOpen && isSidebarCollapsed ? 'lg:ml-16' : ''}
      `}>
        
        {/* Mobile Header Bar */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between p-3 sm:p-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open sidebar"
            >
              <Menu size={20} className="text-gray-600 sm:w-6 sm:h-6" />
            </button>
            <h1 className="text-base sm:text-lg font-semibold text-gray-800 truncate">
              Admin Panel
            </h1>
            <div className="w-9 sm:w-10" /> 
          </div>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8">
            <div className="max-w-full mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;