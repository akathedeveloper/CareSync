import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import FAQSection from "./FAQSection";
import {
  CheckIcon,
  StarIcon,
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
  CalendarDaysIcon,
  LockClosedIcon,
  ClockIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Typewriter } from "react-simple-typewriter";
import StatsSection from "./StatsSection";
import Pricing from "./PriceSection";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
// import Carousel from "./Carousel";
import { useTheme } from "../contexts/ThemeContext";
import ContactUs from "./ContactUs";
import Navbar from "../components/common/Navbar";
import CalendarModal from "../components/common/CalendarModal";
import Feature from "./Feature";
import ScrollProgress from "../components/common/ScrollProgress";
import { useTranslation } from "react-i18next";

//Make the heading typewriter
const HeadingTypewriter = () => {
  const { t } = useTranslation();
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const fullText = t('landing.heroHeadline', 'Healthcare Management Made Simple');
  const managementStartIndex = 11;
  const managementEndIndex = 21;

  useEffect(() => {
    const typeInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typeInterval);
      }
    }, 70);

    return () => clearInterval(typeInterval);
  }, [currentIndex, fullText]);

  const renderText = () => {
    const beforeManagement = displayedText.slice(0, managementStartIndex);
    const management = displayedText.slice(
      managementStartIndex,
      managementEndIndex
    );
    const afterManagement = displayedText.slice(managementEndIndex);

    return (
      <>
        {beforeManagement}
        <span className="gradient-accent bg-clip-text text-transparent">
          {management}
        </span>
        {afterManagement}
      </>
    );
  };

  return (
    <h1 className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 leading-tight">
      {renderText()}
    </h1>
  );
};

const LandingPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { user, loading } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleScheduleDemoClick = () => {
    setIsCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    setIsCalendarOpen(false);
  };

  const handleDateSelection = (selectedDate) => {
    console.log("Selected demo date:", selectedDate);
    setIsCalendarOpen(false);
  };

  const handleNewPatientClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role === "doctor") {
      navigate("/doctor/patients/new");
      return;
    }

    navigate(`/${user.role}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-b-2 rounded-full animate-spin border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 mt-20">
      <ScrollProgress />
      <Navbar />

      {/* Professional Hero Section */}
      <section
        id="home"
        className="relative flex items-center min-h-screen pt-16 overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 dark:from-emerald-400/5 dark:to-teal-400/5 blur-3xl" />
          <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/10 to-blue-400/10 dark:from-teal-400/5 dark:to-blue-400/5 blur-3xl" />
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid items-center grid-cols-1 gap-16 lg:grid-cols-2">
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 text-sm font-semibold border rounded-full shadow-sm bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                <ShieldCheckIcon className="w-4 h-4 mr-2" />
                {t('landing.trustBadge', 'Trusted by 500+ Healthcare Providers')}
              </div>

              <HeadingTypewriter />

              <p className="max-w-2xl text-xl font-medium leading-relaxed text-gray-600 lg:text-2xl dark:text-gray-300">
                {t('landing.heroSubhead', "Streamline patient care with our comprehensive healthcare platform. Connect doctors, patients, and pharmacies in one secure ecosystem.")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* ✅ ADDED THE APPOINTMENT BUTTON HERE */}
                <Link
                  to="/patient/appointments"
                  className="flex items-center justify-center px-8 py-4 space-x-2 text-lg font-bold text-white transition-all duration-300 shadow-xl bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                >
                  <span>Book Appointment</span>
                  <CalendarDaysIcon className="w-5 h-5" />
                </Link>

                <Link
                  to="/register"
                  className="flex items-center justify-center px-8 py-4 space-x-2 text-lg font-bold text-white transition-all duration-300 shadow-xl gradient-accent rounded-xl"
                >
                  <span>{t('landing.ctaStartTrial', 'Start Free Trial')}</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="flex items-center justify-center px-8 py-4 space-x-2 text-lg font-bold text-gray-700 transition-all duration-300 border-2 border-gray-300 dark:border-gray-600 dark:text-gray-300 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                >
                  <PlayIcon className="w-5 h-5" />
                  <span>{t('landing.ctaWatchDemo', 'Watch Demo')}</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col items-center space-y-3 text-base text-gray-600 sm:flex-row sm:space-x-8 sm:space-y-0 dark:text-gray-400">
                {[
                  { icon: ShieldCheckIcon, text: t('landing.hipaaSecure', 'HIPAA Compliant & Secure') },
                  { icon: ClockIcon, text: t('landing.support247', '24/7 Support Available') }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <item.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className="relative p-4">
              {/* This is the missing right column content */}
            </div>
          </div>
        </div>
      </section>

      {/* Other Sections */}
      <StatsSection />
      <Feature />
      <Pricing />
      <Testimonials />
      <ContactUs />
      <FAQSection />
      <Footer />

      {/* Modals */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsVideoPlaying(false)}
        >
          <div
            className="w-full max-w-4xl p-8 transition-all duration-300 transform bg-white dark:bg-gray-800 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                CareSync Platform Demo
              </h3>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-400 transition-colors hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
            </div>
            <div className="flex items-center justify-center bg-gray-100 aspect-video dark:bg-gray-700 rounded-xl">
              <div className="text-center">
                <PlayIcon className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Healthcare platform demo video
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  See how CareSync transforms patient care
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

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

