import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckIcon,
  StarIcon,
  PlayIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
  HeartIcon,
  DevicePhoneMobileIcon,
  CloudIcon,
  LockClosedIcon,
  XMarkIcon,
  Bars3Icon,
  CalendarDaysIcon,
  BellIcon,
  UserGroupIcon,
  DocumentTextIcon,
  PlusCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Typewriter } from "react-simple-typewriter";
import StatsSection from "./StatsSection";
import Pricing from "./PriceSection";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

const LandingPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">
                CareSync
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {["Features", "Pricing", "Testimonials", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-emerald-600 transition-colors font-medium relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:w-full transition-all duration-300" />
                    </a>
                  )
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>

            {/* Desktop Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["Features", "Pricing", "Testimonials", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block px-3 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="flex flex-col space-y-2 mt-4 px-3">
                <Link
                  to="/login"
                  className="text-center py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-lg text-center font-semibold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 bg-gradient-to-b from-emerald-50 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-center">
            {/* Left Content */}
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">
                  Revolutionize Healthcare Coordination
                </span>
                <span className="block text-emerald-600 mt-2">
                  <Typewriter
                    words={[
                      "Streamline Patient Care",
                      "Enhance Communication",
                      "Improve Outcomes",
                    ]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={50}
                    delaySpeed={2000}
                  />
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 sm:mt-8 sm:text-xl sm:max-w-xl sm:mx-auto lg:mx-0">
                CareSync is your all-in-one platform for seamless healthcare
                management, connecting patients, providers, and facilities in
                real-time for optimal care delivery.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                <Link
                  to="/register"
                  className="px-8 py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Get Started
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </Link>
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="px-8 py-4 text-lg font-semibold rounded-xl bg-white text-emerald-600 border-2 border-emerald-500 hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center"
                >
                  <PlayIcon className="mr-2 h-5 w-5" />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Image / Video Placeholder */}
            <div className="mt-12 relative lg:mt-0 lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-lg">
                <img
                  className="w-full rounded-2xl shadow-2xl"
                  src="/images/healthcare-dashboard.png"
                  alt="Healthcare Dashboard"
                />
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-r from-pink-400 to-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-8 -right-6 w-28 h-28 bg-gradient-to-r from-green-300 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sections */}
      <StatsSection />
      <Pricing />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
