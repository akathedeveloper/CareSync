import React, { useState, useEffect, useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { Bars3Icon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";

import { useTheme } from "../../contexts/ThemeContext";

import { useAuth } from "../../contexts/AuthContext";

import useScrollSpy from "../../hooks/useScrollSpy";

import { useTranslation } from "react-i18next";

const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isDark, toggleTheme } = useTheme();

  const { user } = useAuth();

  const mobileMenuRef = useRef(null);

  const location = useLocation();

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  // Check if current page is auth page

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  // Scroll spy sections

  const sectionIds = ["home", "features", "pricing", "testimonials", "contact-form"];

  const activeSection = useScrollSpy(sectionIds, 100);

  // Close mobile menu on outside click

  useEffect(() => {

    const handleClickOutside = (e) => {

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {

        setIsMobileMenuOpen(false);

      }

    };

    if (isMobileMenuOpen) document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, [isMobileMenuOpen]);

  // Scroll to section after page load if state.scrollTo exists

  useEffect(() => {

    if (location.state?.scrollTo) {

      const el = document.getElementById(location.state.scrollTo);

      if (el) {

        setTimeout(() => {

          el.scrollIntoView({ behavior: "smooth" });

          window.history.replaceState({}, document.title);

        }, 100);

      }

    }

  }, [location]);

  const handleNavigation = (id, isSection = true, path = null) => {

    if (path) {

      navigate(path, { replace: true });

      return;

    }

    if (!isSection) {

      navigate(`/${id}`, { replace: true });

      return;

    }

    if (location.pathname === "/") {

      const el = document.getElementById(id);

      if (el) el.scrollIntoView({ behavior: "smooth" });

    } else {

      navigate("/", { state: { scrollTo: id } });

    }

  };

  const handleLogoClick = (e) => {

    e.preventDefault();

    if (location.pathname === "/") window.scrollTo({ top: 0, behavior: "smooth" });

    else navigate("/");

  };

  const menuItems = isAuthPage

    ? [{ name: t("nav.home"), id: "home" }]

    : [

        { name: t("nav.home"), id: "home", isSection: true },

        { name: t("nav.features"), id: "features", isSection: true },

        { name: t("nav.pricing"), id: "pricing", isSection: true },

        { name: t("nav.blog"), path: "/blog", isSection: false },

        { name: t("nav.testimonials"), id: "testimonials", isSection: true },

        { name: t("nav.contact"), id: "contact-form", isSection: true },

      ];

  return (

    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-sm">

      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <div className="flex items-center space-x-4 md:space-x-6">

            <a href="/" onClick={handleLogoClick} className="flex items-center">

              <div className="w-8 h-8 md:w-10 md:h-10">

                <img

                  src="/CareSync-Logo.png"

                  alt="CareSync Logo"

                  className="w-full h-full transition animate-beats"

                />

              </div>

              <span className="ml-2 md:ml-3 font-bold text-emerald-600 dark:text-emerald-400 text-lg md:text-xl">

                CareSync

              </span>

            </a>

            {/* Home link on auth pages */}

            {isAuthPage && (

              <a

                href="/"

                onClick={(e) => {

                  e.preventDefault();

                  navigate("/");

                }}

                className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm md:text-base"

              >

                {t("nav.home")}

              </a>

            )}

          </div>

          {/* Desktop Menu */}

          {!isAuthPage && (

            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">

              {menuItems.map((item) => (

                <a

                  key={item.id}

                  href={item.path ? item.path : `#${item.id}`}

                  onClick={(e) => {

                    e.preventDefault();

                    handleNavigation(item.id, item.isSection, item.path);

                  }}

                  className={`relative transition-all duration-300 font-medium group px-2 py-1 rounded-md text-sm xl:text-base ${

                    item.path

                      ? location.pathname === item.path

                        ? "text-emerald-600 dark:text-emerald-400 font-semibold drop-shadow-sm bg-emerald-50 dark:bg-emerald-900/20"

                        : "text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"

                      : activeSection === item.id

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

          )}

          {/* Right Controls */}

          <div className="flex items-center space-x-3 md:space-x-4">

            {/* Theme Toggle */}

            <button

              onClick={toggleTheme}

              className="p-1.5 md:p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"

              title={isDark ? "Switch to light mode" : "Switch to dark mode"}

              aria-label="Toggle dark mode"

            >

              {isDark ? <SunIcon className="h-5 w-5 md:h-6 md:w-6" /> : <MoonIcon className="h-5 w-5 md:h-6 md:w-6" />}

            </button>

            {/* Language Switcher */}

            <select

              value={i18n.language}

              onChange={(e) => i18n.changeLanguage(e.target.value)}

              className="text-sm bg-transparent border border-gray-300 dark:border-gray-700 rounded-md px-2 py-1 text-gray-700 dark:text-gray-200"

              aria-label="Select language"

              title="Language"

            >

              <option value="en">EN</option>

              <option value="hi">HI</option>

            </select>

            {/* Auth/Desktop */}

            <div className="hidden lg:flex items-center space-x-4">

              <button

                onClick={() => navigate("/contributor")}

                className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm"

              >

                {t("nav.contributors")}

              </button>

              {user ? (

                <Link

                  to={`/${user.role}`}

                  className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm"

                >

                  {t("nav.dashboard")}

                </Link>

              ) : (

                <>

                  <Link

                    to="/login"

                    className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium text-sm"

                  >

                    {t("auth.signIn")}

                  </Link>

                  <Link

                    to="/register"

                    className="gradient-accent text-white px-4 py-2 rounded-xl text-sm font-semibold"

                  >

                    {t("auth.getStarted")}

                  </Link>

                </>

              )}

            </div>

            {/* Mobile Menu Button */}

            <div className="lg:hidden flex items-center space-x-2">

              <button

                onClick={() => navigate("/contributor")}

                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors p-1.5"

                title="Contributors"

              >

                <svg

                  xmlns="http://www.w3.org/2000/svg"

                  className="h-5 w-5"

                  fill="none"

                  viewBox="0 0 24 24"

                  stroke="currentColor"

                >

                  <path

                    strokeLinecap="round"

                    strokeLinejoin="round"

                    strokeWidth={2}

                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"

                  />

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

      {/* Mobile Menu */}

      <div

        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${

          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"

        }`}

      >

        <div

          className={`fixed inset-0 bg-black/20 dark:bg-black/40 transition-opacity duration-300 ${

            isMobileMenuOpen ? "opacity-100" : "opacity-0"

          }`}

          onClick={() => setIsMobileMenuOpen(false)}

        />

        <div

          ref={mobileMenuRef}

          className={`fixed right-0 top-20 w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${

            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"

          }`}

        >

          <div className="pt-4 pb-6">

            {menuItems.map
  

          
            