import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import useScrollSpy from "../../hooks/useScrollSpy";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  
  const handleMenuClick = (id) => (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };
    
  // Define section IDs for scroll spy
  const sectionIds = ['home', 'features', 'pricing', 'testimonials', 'contact-form'];
  const activeSection = useScrollSpy(sectionIds, 100);

  const navigate = useNavigate();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isMobileMenuOpen]);

  const menuItems = [
    { name: "Home", id: "home" },
    { name: "Features", id: "features" },
    { name: "Pricing", id: "pricing" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact-form" }
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with smooth scroll functionality */}
          <a
            key="Home"
            href="#home"
            onClick={handleMenuClick('home')}
          >   
            <div className="flex items-center">
              <div className="w-10 h-10">
                <img
                  src="/CareSync-Logo.png"
                  alt="CareSync Logo"
                  className="w-full h-full"
                />
              </div>
              <span
                className="ml-3 font-bold text-emerald-600 dark:text-emerald-400"
                style={{ fontSize: "1.375rem" }}
              >
                CareSync
              </span>
            </div>
          </a>

          {/* Desktop Menu with scroll spy functionality */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={handleMenuClick(item.id)}
                className={`relative transition-all duration-300 font-medium group px-2 py-1 rounded-md ${
                  activeSection === item.id
                    ? "text-emerald-600 dark:text-emerald-400 font-semibold drop-shadow-sm bg-emerald-50 dark:bg-emerald-900/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                {item.name}
                <span 
                  className={`absolute left-0 -bottom-1 h-[2px] bg-emerald-600 transition-all duration-300 ${
                    activeSection === item.id ? "w-full" : "w-0 group-hover:w-full"
                  }`} 
                />
                {activeSection === item.id && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                )}
              </a>
            ))}
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop Auth / Theme Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => navigate("/contributor")}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
            >
              Contributors
            </button>

            {user ? (
              <Link
                to={`/${user.role}`}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="gradient-accent text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="relative md:hidden">
          <div className="absolute right-0 w-52 h-dvh pt-10 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`block text-center py-3 transition-all duration-300 font-medium relative group
                after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[2px] after:w-full after:bg-emerald-600 after:scale-x-0 after:origin-center after:transition-transform after:duration-300
                hover:after:scale-x-100 ${
                  activeSection === item.id
                    ? "text-emerald-600 dark:text-emerald-400 after:scale-x-100 bg-emerald-50 dark:bg-emerald-900/20 font-semibold shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
                onClick={(e) => {
                  handleMenuClick(item.id)(e);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col space-y-2 mt-20 px-3">
              <button
                onClick={toggleTheme}
                className="text-center py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors flex items-center justify-center gap-2"
              >
                {isDark ? (
                  <SunIcon className="h-5 w-5" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
                {isDark ? "Light Mode" : "Dark Mode"}
              </button>

              {user ? (
                <Link
                  to={`/${user.role}`}
                  className="text-center py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-center py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="gradient-accent text-white px-4 py-2 rounded-lg text-center font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
