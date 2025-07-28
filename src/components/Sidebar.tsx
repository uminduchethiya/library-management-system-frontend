import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  X, 
  LayoutDashboard, 
  Book, 
  Users, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  setIsOpen, 
  isCollapsed, 
  setIsCollapsed 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    // Note: localStorage is not supported in Claude artifacts
    // In a real app, you would use: localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/addbooks", label: "Books", icon: Book },
    { path: "/users", label: "Users", icon: Users },
  ];

  const isActiveRoute = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:fixed inset-y-0 left-0 z-50
        ${isCollapsed ? 'w-16' : 'w-64'} 
        bg-[#22152E] text-white 
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col justify-between min-h-screen
      `}>
        
        {/* Header Section */}
        <div className={`${isCollapsed ? 'p-2' : 'p-3 sm:p-4'}`}>
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 lg:hidden">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="App Logo" className="w-6 h-6 sm:w-8 sm:h-8" />
              {!isCollapsed && <span className="font-semibold text-sm sm:text-base">Admin Panel</span>}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 sm:p-2 hover:bg-gray-700 rounded-md transition-colors"
            >
              <X size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Desktop Logo and Collapse Button */}
          <div className="hidden lg:flex items-center justify-between mb-6">
            <div 
              onClick={() => navigate("/dashboard")} 
              className={`flex items-center cursor-pointer transition-all duration-300 ${
                isCollapsed ? 'justify-center' : 'space-x-2'
              }`}
            >
              <img 
                src={logo} 
                alt="App Logo" 
                className={`transition-all duration-300 ${
                  isCollapsed ? 'w-8 h-8' : 'w-10 h-10 xl:w-12 xl:h-12'
                }`}
              />
              {!isCollapsed && (
                <span className="font-semibold text-base xl:text-lg whitespace-nowrap">
                  Admin Panel
                </span>
              )}
            </div>
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-gray-700 rounded-md transition-colors flex-shrink-0"
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
              </button>
            )}
          </div>

          {/* Collapse button for collapsed state */}
          {isCollapsed && (
            <div className="hidden lg:flex justify-center mb-6">
              <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="p-2 hover:bg-gray-700 rounded-md transition-colors"
                title="Expand sidebar"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}

          {/* Menu Items */}
          <nav className={`space-y-1 sm:space-y-2 ${isCollapsed ? 'px-1' : ''}`}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = isActiveRoute(item.path);
              
              return (
                <Link key={item.path} to={item.path}>
                  <div 
                    className={`
                      flex items-center rounded-lg transition-all duration-200 group relative
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : 'hover:bg-gray-700 text-gray-300 hover:text-white'
                      }
                      ${isCollapsed 
                        ? 'justify-center p-3 mx-auto' 
                        : 'space-x-2 sm:space-x-3 p-2.5 sm:p-3'
                      }
                    `}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon size={18} className="flex-shrink-0 sm:w-5 sm:h-5" />
                    {!isCollapsed && (
                      <span className="font-medium text-sm sm:text-base whitespace-nowrap">
                        {item.label}
                      </span>
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Section */}
        <div className={`border-t border-gray-600 ${isCollapsed ? 'p-2' : 'p-3 sm:p-4'}`}>
          <button
            onClick={handleLogoutClick}
            className={`
              flex items-center rounded-lg w-full group relative
              text-gray-300 hover:text-white hover:bg-red-600 
              transition-all duration-200
              ${isCollapsed 
                ? 'justify-center p-3' 
                : 'space-x-2 sm:space-x-3 p-2.5 sm:p-3'
              }
            `}
            title={isCollapsed ? "Logout" : undefined}
          >
            <LogOut size={18} className="flex-shrink-0 sm:w-5 sm:h-5" />
            {!isCollapsed && (
              <span className="font-medium text-sm sm:text-base whitespace-nowrap">
                Logout
              </span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                Logout
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;