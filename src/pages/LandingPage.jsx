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
  }, [currentIndex]);

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

      {/* ✅ Carousel Slider */}
      {/* <Carousel /> */}
      
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
              <div className="flex flex-col gap-4 sm:flex-row">
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
              {user ? (
                // AUTHENTICATED: show professional dashboard preview
                <div className="p-6 bg-white border border-gray-100 shadow-2xl dark:bg-gray-800 rounded-3xl dark:border-gray-700">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg gradient-accent">
                        <HeartIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {t('landing.welcomeUserName', { name: user.name || user.email })}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.role === 'doctor' ? t('landing.doctorDashboard', 'Doctor Dashboard') : user.role === 'patient' ? t('landing.patientPortal', 'Patient Portal') : t('landing.pharmacyDashboard', 'Pharmacy Dashboard')}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <BellIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-red-500 rounded-full -top-1 -right-1">
                        <span className="text-xs font-bold text-white">3</span>
                      </span>
                    </div>
                  </div>

                  {/* Stats Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">{t('landing.activePatients', 'Active Patients')}</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">1,247</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">{t('landing.todaysTasks', "Today's Tasks")}</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">12</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                      <span className="text-gray-600 dark:text-gray-300">{t('landing.responseTime', 'Response Time')}</span>
                      <span className="font-bold text-gray-900 dark:text-gray-100">2min</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-700">
                    <Link
                      to={`/${user.role}`}
                      className="flex items-center justify-center w-full px-4 py-3 space-x-2 font-semibold text-white transition-colors duration-300 rounded-lg gradient-accent"
                    >
                      <span>{t('landing.goToDashboard', 'Go to Dashboard')}</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ) : (
                // VISITOR: show professional dashboard preview
                <div className="p-3 bg-white border border-gray-100 shadow-2xl dark:bg-gray-800 rounded-3xl dark:border-gray-700">
                  {/* Dashboard Header */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                        <img
                          src="/CareSync-Logo.png"
                          alt="CareSync Logo"
                          className="h-8 w-8 object-contain"
                        />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {t('landing.caresyncDashboard', 'CareSync Dashboard')}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {t('landing.sampleDoctorName', 'Dr. Sarah Johnson')}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <BellIcon className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                      <span className="absolute flex items-center justify-center w-3 h-3 bg-red-500 rounded-full -top-1 -right-1">
                        <span className="text-xs font-bold text-white">3</span>
                      </span>
                    </div>
                  </div>

                  {/* Professional Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        label: t('landing.todaysAppointments', "Today's Appointments"),
                        value: "12",
                        icon: CalendarDaysIcon,
                        color: "text-blue-600",
                        bg: "bg-blue-50",
                        darkBg: "dark:bg-blue-900/20"
                      },
                      {
                        label: t('landing.pendingReports', 'Pending Reports'),
                        value: "5",
                        icon: DocumentTextIcon,
                        color: "text-orange-600",
                        bg: "bg-orange-50",
                        darkBg: "dark:bg-orange-900/20"
                      },
                      {
                        label: t('landing.activePatients', 'Active Patients'),
                        value: "1,247",
                        icon: UserGroupIcon,
                        color: "text-emerald-600",
                        bg: "bg-emerald-50",
                        darkBg: "dark:bg-emerald-900/20"
                      },
                      {
                        label: t('landing.urgentCases', 'Urgent Cases'),
                        value: "3",
                        icon: ExclamationTriangleIcon,
                        color: "text-red-600",
                        bg: "bg-red-50",
                        darkBg: "dark:bg-red-900/20"
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="p-4 border border-gray-100 bg-gray-50 dark:bg-gray-700 rounded-xl dark:border-gray-600"
                      >
                        <div className="flex items-center space-x-3">
                          <div
                             className={`w-10 h-10 ${stat.bg} ${stat.darkBg} rounded-lg flex items-center justify-center`}
                          >
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                              {stat.value}
                            </p>
                            <p className="text-xs leading-tight text-gray-500 dark:text-gray-400">
                              {stat.label}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent Activity */}
<div className="space-y-3">
  <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
    {t('landing.recentActivity', 'Recent Activity')}
  </h4>
  {[
    {
      patient: t('landing.patientJohnSmith', 'John Smith'),
      action: t('landing.prescriptionUpdated', 'Prescription updated'),
      time: t('landing.time10m', '10 min ago'),
      status: "completed",
    },
    {
      patient: t('landing.patientMariaGarcia', 'Maria Garcia'),
      action: t('landing.labResultsAvailable', 'Lab results available'),
      time: t('landing.time25m', '25 min ago'),
      status: "new",
    },
    {
      patient: t('landing.patientRobertChen', 'Robert Chen'),
      action: t('landing.appointmentScheduled', 'Appointment scheduled'),
      time: t('landing.time1h', '1 hour ago'),
      status: "scheduled",
    },
  ].map((activity, index) => (
    <div
      key={index}
      className="flex items-center justify-between p-3 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <div className="flex items-center space-x-3">
        <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-white rounded-full gradient-accent">
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
          className={`inline-block w-2 h-2 rounded-full mr-2 ${activity.status === "completed"
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


                  {/* CTA Button */}
                  <div className="pt-4 mt-6 border-t border-gray-100 dark:border-gray-700">
                    <button onClick={handleNewPatientClick} className="flex items-center justify-center w-full px-4 py-3 space-x-2 font-semibold text-white transition-colors duration-300 rounded-lg gradient-accent">
                      <PlusCircleIcon className="w-5 h-5" />
                      <span>{t('landing.newPatient', 'New Patient')}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Subtle Decorative Elements */}
              <div className="flex items-center justify-center gap-6 mt-8 mb-6">
                <div className="group relative">
                  <div className="flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 p-5 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    <HeartIcon className="h-8 w-8" />
                  </div>
                </div>

                <div className="group relative">
                  <div className="flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-5 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    <ShieldCheckIcon className="h-8 w-8" />
                  </div>
                </div>

                <div className="group relative">
                  <div className="flex items-center justify-center bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-5 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                    <ChartBarIcon className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <Feature />

      {/* Pricing Section */}
      <Pricing />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Professional CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full transform -skew-y-12 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="relative max-w-5xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <h2 className="mb-8 text-4xl font-black text-white lg:text-5xl">
            {t('landing.ctaHeadlineLine1', 'Ready to Transform')}
            <br className="hidden sm:block" />
            {t('landing.ctaHeadlineLine2', 'Your Healthcare Practice?')}
          </h2>
          <p className="max-w-3xl mx-auto mb-12 text-xl font-medium leading-relaxed lg:text-2xl text-white/90">
            {t('landing.ctaSubhead', "Join over 500 healthcare providers who have transformed their patient care with CareSync's comprehensive platform")}
          </p>

          <div className="flex flex-col justify-center gap-6 mb-8 sm:flex-row">
            <Link
              to="/register"
              className="px-10 py-4 text-lg font-bold transition-all duration-300 bg-white shadow-xl text-emerald-600 rounded-xl hover:bg-gray-50"
            >
              {t('landing.ctaStartTrialToday', 'Start Free Trial Today')}
            </Link>

            <button
              onClick={handleScheduleDemoClick}
              className="px-10 py-4 text-lg font-bold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-emerald-600 backdrop-blur-sm"
            >
              {t('landing.scheduleDemo', 'Schedule Demo')}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center space-y-2 font-medium sm:flex-row sm:space-y-0 sm:space-x-8 text-white/80">
            <span className="flex items-center">
              <CheckIcon className="w-5 h-5 mr-2" />
              {t('landing.hipaaCompliant', 'HIPAA Compliant')}
            </span>
            <span className="flex items-center">
              <CheckIcon className="w-5 h-5 mr-2" />
              {t('landing.freeTrial30', '30-day free trial')}
            </span>
            <span className="flex items-center">
              <CheckIcon className="w-5 h-5 mr-2" />
              {t('landing.support247', '24/7 support')}
            </span>
          </div>
        </div>
      </section>

         
      {/* Contact Us */}
      <ContactUs />
      <FAQSection />
      {/* Footer */}
      <Footer />

      {/* Professional Video Modal */}
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

      {/* Calendar Modal */}
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
