import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckIcon,
  PlayIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  UsersIcon,
  HeartIcon,
  BellIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  ExclamationTriangleIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  CalendarDaysIcon
} from "@heroicons/react/24/outline";
import { Typewriter } from "react-simple-typewriter";
import StatsSection from "./StatsSection";
import Pricing from "./PriceSection";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import Contributor from "../components/common/Contributor";
import { useTheme } from "../contexts/ThemeContext";

// Import the new CalendarModal component from the correct path
import CalendarModal from "../components/common/CalendarModal";

const LandingPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to manage the visibility of the calendar modal
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  // Handler to open the calendar modal
  const handleScheduleDemoClick = () => {
    setIsCalendarOpen(true);
  };

  // Handler to close the calendar modal
  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  // Handler for when a date is selected in the calendar
  const handleDateSelection = (selectedDate) => {
    console.log("Selected demo date:", selectedDate);
    // You would typically send the selected date to an API here
    // or perform a follow-up action.
    setIsCalendarOpen(false); // Close the modal after selection
  };

  useEffect(() => {   // handle the no-scroll CSS class in the <body>
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {["Home", "Features", "Pricing", "Testimonials", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="flex gap-2 items-center text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium relative group
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-emerald-600 after:scale-x-0 after:origin-center after:transition-transform after:duration-300
              hover:after:scale-x-100"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
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

            <div className="hidden md:flex items-center space-x-4">
              {/* Dark Mode Toggle */}
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

              <Link
                to="/login"
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="gradient-accent text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="relative md:hidden">
            <div className="absolute right-0 w-52 h-dvh pt-10 bg-white dark:bg-gray-900">
              {["Home", "Features", "Pricing", "Testimonials", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block text-center py-3 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium relative group
              after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[2px] after:w-full after:bg-emerald-600 after:scale-x-0 after:origin-center after:transition-transform after:duration-300
              hover:after:scale-x-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
              )}
              <div className="flex flex-col space-y-2 mt-20 px-3">
                {/* Dark Mode Toggle for Mobile */}
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
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden pt-16"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 dark:from-teal-400/10 dark:to-blue-400/10 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                🏥 Trusted by 500+ Healthcare Providers
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 leading-tight">
                Healthcare
                <span className="gradient-accent bg-clip-text text-transparent">
                  {" "}
                  Management
                </span>
                <br />
                Made Simple
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                Streamline patient care with our comprehensive healthcare
                platform. Connect doctors, patients, and pharmacies in one
                secure ecosystem.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="gradient-accent text-white px-8 py-4 rounded-xl
                  flex items-center justify-center space-x-2 font-bold text-lg shadow-xl hover:shadow-2xl
                  transition-all duration-300 transform hover:scale-105"
                >
                  <span>Start Free Trial</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>

                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-4 rounded-xl
                  hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20
                  flex items-center justify-center space-x-2 font-bold text-lg
                  transition-all duration-300 transform hover:scale-105"
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Enhanced Features with Typewriter */}
              <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-3 sm:space-y-0 text-base text-gray-600 dark:text-gray-400">
                {["HIPAA Compliant & Secure", "24/7 Support Available"].map(
                  (text, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-6 w-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                        <CheckIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="font-medium">
                        <Typewriter
                          words={[text]}
                          loop={1}
                          cursor
                          typeSpeed={50}
                          delaySpeed={index * 1000}
                        />
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Healthcare Dashboard Preview */}
            <div className="relative">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 gradient-accent rounded-lg flex items-center justify-center">
                      <HeartIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                        CareSync Dashboard
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Dr. Sarah Johnson
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <BellIcon className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">3</span>
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    {
                      label: "Today's Appointments",
                      value: "12",
                      icon: CalendarDaysIcon,
                      color: "text-blue-600",
                      bg: "bg-blue-100",
                    },
                    {
                      label: "Pending Reports",
                      value: "5",
                      icon: DocumentTextIcon,
                      color: "text-orange-600",
                      bg: "bg-orange-100",
                    },
                    {
                      label: "Active Patients",
                      value: "1,247",
                      icon: UserGroupIcon,
                      color: "text-emerald-600",
                      bg: "bg-emerald-100",
                    },
                    {
                      label: "Urgent Cases",
                      value: "3",
                      icon: ExclamationTriangleIcon,
                      color: "text-red-600",
                      bg: "bg-red-100",
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 ${stat.bg} dark:bg-opacity-20 rounded-lg flex items-center justify-center`}
                        >
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            {stat.value}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Recent Activity
                  </h4>
                  {[
                    {
                      patient: "John Smith",
                      action: "Prescription updated",
                      time: "10 min ago",
                      status: "completed",
                    },
                    {
                      patient: "Maria Garcia",
                      action: "Lab results available",
                      time: "25 min ago",
                      status: "new",
                    },
                    {
                      patient: "Robert Chen",
                      action: "Appointment scheduled",
                      time: "1 hour ago",
                      status: "scheduled",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 gradient-accent rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {activity.patient
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {activity.patient}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {activity.action}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${
                            activity.status === "completed"
                              ? "bg-green-500"
                              : activity.status === "new"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                        />
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Action */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="w-full gradient-accent text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300">
                    <PlusCircleIcon className="h-5 w-5" />
                    <span>New Patient</span>
                  </button>
                </div>
              </div>

              {/* Healthcare-themed Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-4 rounded-2xl shadow-lg animate-bounce">
                <HeartIcon className="h-8 w-8" />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-4 rounded-2xl shadow-lg animate-pulse">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>

              <div className="absolute top-1/2 -right-8 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-3 rounded-xl shadow-lg animate-pulse delay-1000">
                <BellIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
            Ready to Revolutionize
            <br className="hidden sm:block" />
            Your Healthcare Practice?
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
            Join over 500 healthcare providers who have transformed their
            patient care with CareSync's comprehensive platform
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link
              to="/register"
              className="bg-white text-emerald-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Start Free Trial Today
            </Link>

            {/* This is the button that now correctly opens the modal */}
            <button
              onClick={handleScheduleDemoClick}
              className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm transform hover:scale-105"
            >
              Schedule Demo
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-white/80 font-medium">
            <span className="flex items-center">
              <CheckIcon className="h-5 w-5 mr-2" />
              HIPAA Compliant
            </span>
            <span className="flex items-center">
              <CheckIcon className="h-5 w-5 mr-2" />
              30-day free trial
            </span>
            <span className="flex items-center">
              <CheckIcon className="h-5 w-5 mr-2" />
              24/7 support
            </span>
          </div>
        </div>
      </section>
      {/* Contributor */}
      <Contributor />
      {/* Footer */}
      <Footer />

      {/* Video Modal */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-4xl w-full transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                CareSync Platform Demo
              </h3>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PlayIcon className="h-16 w-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Healthcare platform demo video
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  See how CareSync transforms patient care
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal - Conditionally rendered */}
      {isCalendarOpen && (
        <CalendarModal
          onClose={handleCalendarClose}
          onSelectDate={handleDateSelection}
        />
      )}
    </div>
  );
};

export default LandingPage;
