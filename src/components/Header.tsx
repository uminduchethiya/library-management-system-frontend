import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store"; 

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { 
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate("/");
  };

  return (
    <header className="text-white py-4 px-6 flex justify-between items-center bg-gray-900 shadow-lg">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="Library Logo" className="h-12" />
      </div>

      <nav className="space-x-6">
        <button onClick={() => navigate("/")} className="text-blue-400 hover:text-white transition-colors">
          Home
        </button>
        <button onClick={() => navigate("/about")} className="hover:text-blue-400 transition-colors">
          About Us
        </button>
        <button onClick={() => navigate("/browse")} className="hover:text-blue-400 transition-colors">
          Browse Books
        </button>
        <button onClick={() => navigate("/membership")} className="hover:text-blue-400 transition-colors">
          Membership
        </button>
        <button onClick={() => navigate("/blog")} className="hover:text-blue-400 transition-colors">
          Blog
        </button>
      </nav>

      <div className="relative" ref={dropdownRef}>
        {isAuthenticated ? (
          <>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-lg focus:outline-none hover:text-blue-400 transition-colors p-2 rounded-full hover:bg-gray-800"
              aria-label="User menu"
            >
              👤
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg z-50 border">
                <div className="px-4 py-2 border-b">
                  <p className="font-semibold">{user?.name || "User"}</p>
                  <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
                </div>
                <div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <button
            onClick={() => navigate("/")}
            className="text-sm text-blue-400 border border-blue-400 px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
