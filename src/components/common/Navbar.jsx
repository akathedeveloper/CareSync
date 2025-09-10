import React, { useState, useEffect, useRef } from "react";

import { Link, useLocation } from "react-router-dom";

import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { useTheme } from "../../contexts/ThemeContext";

import { useAuth } from "../../contexts/AuthContext";

import Contributor from "./Contributor";

import { useNavigate } from "react-router-dom";

import useScrollSpy from "../../hooks/useScrollSpy";

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isDark, toggleTheme } = useTheme();

  const { user } = useAuth();

  const location = useLocation();

  const mobileMenuRef = useRef(null);

  const navigate = useNavigate();

  // check if current page is login or register

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  // Define section IDs for scroll spy

  const sectionIds = ['home', 'features', 'pricing', 'testimonials', 'contact-form'];

  const activeSection = useScrollSpy(sectionIds, 100);

  // Close mobile menu when clicking outside or pressing ESC

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {

        setIsMobileMenuOpen(false);

      }

    };

    const handleEsc = (e) => {

      if (e.key === "Escape") setIsMobileMenuOpen(false);

    };

    if (isMobileMenuOpen) {

      document.body.classList.add("no-scroll");

      document.addEventListener("mousedown", handleClickOutside);

      document.addEventListener("keydown", handleEsc);

    } else {

      document.body.classList.remove("no-scroll");

    }

    return () => {

      document.removeEventListener("mousedown", handleClickOutside);

      document.removeEventListener("keydown", handleEsc);

    };

  }, [isMobileMenuOpen]);
  // Function to handle navigation to sections
  const handleNavigation = (id) => {
    // If we're already on the home page, just scroll to the section
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on a different page, navigate to home and then scroll to section
      navigate('/', { 
        state: { scrollTo: id }
      });
    }
  };

  // Function to handle logo click
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      // If already on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If on different page, navigate to home
      navigate('/');
    }
  };

  // Function to scroll to section after page load
  useEffect(() => {
    // Check if we have a scroll target in location state
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Small timeout to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          // Clear the state to prevent scrolling on every render
          window.history.replaceState({}, document.title);
        }, 100);
      }
    }
  }, [location]);

  // show only home link on auth pages
  const menuItems = isAuthPage 
    ? [{ name: "Home", id: "home" }]
    : [
        { name: "Home", id: "home" },
        { name: "Features", id: "features" },
        { name: "Pricing", id: "pricing" },
        { name: "Testimonials", id: "testimonials" },
        { name: "Contact", id: "contact-form" }
      ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

{/* Logo and Home link section */}

<div className="flex items-center space-x-4 md:space-x-6">

  <a

    key="Logo"

    href="/"

    onClick={handleLogoClick}

    aria-label="Go to homepage"

    className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-md"

  >   

    <div className="flex items-center">

      <div className="w-8 h-8 md:w-10 md:h-10">

        <img

          src="/CareSync-Logo.png"

          alt="CareSync Logo"

          className="w-full h-full"

        />

      </div>

      <span

        className="ml-2 md:ml-3 font-bold text-emerald-600 dark:text-emerald-400 text-lg md:text-xl"

      >

        CareSync

      </span>

    </div>

  </a>

  

  {/* Home link on auth pages - Only show on desktop */}

  {isAuthPage && (

    <a

      href="/"

      onClick={(e) => {

        e.preventDefault();

        navigate('/');

      }}

      className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-md"

      aria-label="Go to Home"

    >

      Home

    </a>

  )}

</div>
{/* Mobile Menu Button */}

<div className="md:hidden">

  <button

    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

    onKeyDown={(e) => {

      if (e.key === "Enter" || e.key === " ") setIsMobileMenuOpen(!isMobileMenuOpen);

    }}

    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-md"

    aria-label="Toggle menu"

    aria-controls="mobile-menu"

    aria-expanded={isMobileMenuOpen}

  >

    <Bars3Icon className="h-6 w-6" />

  </button>

</div>

{/* Desktop Menu with navigation functionality - Show only on large screens */}

{!isAuthPage && (

  <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">

    {menuItems.map((item) => (

      <a

        key={item.id}

        href={`#${item.id}`}

        onClick={(e) => {

          e.preventDefault();

          handleNavigation(item.id);

        }}

        className={`relative transition-all duration-300 font-medium group px-2 py-1 rounded-md text-sm xl:text-base focus:outline-none focus:ring-2 focus:ring-primary-400 ${

          activeSection === item.id

            ? "text-emerald-600 dark:text-emerald-400 font-semibold drop-shadow-sm bg-emerald-50 dark:bg-emerald-900/20"

            : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"

        }`}

        aria-label={`Navigate to ${item.name}`}

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

)}

{/* Right side controls */}

<div className="flex items-center space-x-3 md:space-x-4">

  {/* Theme toggle - visible on all screens */}

  <button

    onClick={toggleTheme}

    onKeyDown={(e) => {

      if (e.key === "Enter" || e.key === " ") toggleTheme();

    }}

    className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"

    title={isDark ? "Switch to light mode" : "Switch to dark mode"}

    aria-label="Toggle dark mode"

  >

    {isDark ? (

      <SunIcon className="h-6 w-6" />

    ) : (

      <MoonIcon className="h-6 w-6" />

    )}

  </button>

</div>
{/* Theme toggle */}

<button

  onClick={toggleTheme}

  onKeyDown={(e) => {

    if (e.key === "Enter" || e.key === " ") toggleTheme();

  }}

  className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"

  title={isDark ? "Switch to light mode" : "Switch to dark mode"}

  aria-label="Toggle dark mode"

>

  {isDark ? (

    <SunIcon className="h-5 w-5 md:h-6 md:w-6" />

  ) : (

    <MoonIcon className="h-5 w-5 md:h-6 md:w-6" />

  )}

</button>

{/* Auth / Dashboard Links */}

{user ? (

  <Link

    to={`/${user.role}`}

    className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-md"

    aria-label="Go to Dashboard"

  >

    Dashboard

  </Link>

) : (

  <>

    <Link

      to="/login"

      className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-md"

      aria-label="Sign In"

    >

      Sign In

    </Link>

    <Link

      to="/register"

      className="gradient-accent text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"

      aria-label="Get Started"

    >

      Register

    </Link>

  </>

)}
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button - visible on small and medium screens (tablets) */}
            <div className="lg:hidden flex items-center space-x-2">
              {/* Contributors icon for mobile/tablet */}
              <button
                onClick={() => navigate("/contributor")}
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-1.5"
                title="Contributors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
              
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors p-1.5"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

{/* Mobile Menu with Slide-In */}

<div className={`fixed inset-0 z-40 lg:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>

  <div 

    className="fixed inset-0 bg-black/20 dark:bg-black/40"

    onClick={() => setIsMobileMenuOpen(false)}

  />

  <div 

    ref={mobileMenuRef}

    className={`fixed right-0 top-20 w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}

  >

    <div className="pt-4 pb-6">

      {menuItems.map((item) => (

        <a

          key={item.id}

          href={`#${item.id}`}

          className={`block py-3 px-6 transition-all duration-300 font-medium relative group text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400`}

          onClick={(e) => { e.preventDefault(); handleNavigation(item.id); setIsMobileMenuOpen(false); }}

          aria-label={`Navigate to ${item.name}`}

        >

          {item.name}

        </a>

      ))}

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 px-6 flex flex-col space-y-2">

        <button

          onClick={toggleTheme}

          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleTheme(); }}

          className="flex items-center justify-center gap-2 py-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary-400"

          aria-label="Toggle dark mode"

        >

          {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}

          {isDark ? "Light Mode" : "Dark Mode"}

        </button>

        {user ? (

          <Link

            to={`/${user.role}`}

            className="block py-3 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"

            onClick={() => setIsMobileMenuOpen(false)}

            aria-label="Go to Dashboard"

          >

            Dashboard

          </Link>

        ) : (

          <>

            <Link

              to="/login"

              className="block py-3 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"

              onClick={() => setIsMobileMenuOpen(false)}

              aria-label="Sign In"

            >

              Sign In

            </Link>

            <Link

              to="/register"

              className="block gradient-accent text-white px-4 py-3 rounded-lg text-center font-semibold mt-2"

              onClick={() => setIsMobileMenuOpen(false)}

              aria-label="Get Started"

            >

              Get Started

            </Link>

          </>

        )}

      </div>

    </div>

  </div>

</div>
    </nav>
  );
};

export default Navbar;