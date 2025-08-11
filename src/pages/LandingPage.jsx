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
      {/* Enhanced Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
                {["Features", "Pricing", "Testimonials", "Contact"].map((item) => (
                  item === "Contact" ? (
                    <Link
                      key={item}
                      to="/contact"
                      className="text-gray-600 hover:text-emerald-600 transition-colors font-medium relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:w-full transition-all duration-300" />
                    </Link>
                  ) : (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-emerald-600 transition-colors font-medium relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-600 group-hover:w-full transition-all duration-300" />
                    </a>
                  )
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>

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
                item === "Contact" ? (
                  <Link
                    key={item}
                    to="/contact"
                    className="block px-3 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ) : (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-3 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                )
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

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden pt-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm">
                🏥 Trusted by 500+ Healthcare Providers
              </div>

              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
                Healthcare
                <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"> Management</span>
                <br />
                Made Simple
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium">
                Streamline patient care with our comprehensive healthcare platform. 
                Connect doctors, patients, and pharmacies in one secure ecosystem.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl 
                  flex items-center justify-center space-x-2 font-bold text-lg shadow-xl hover:shadow-2xl 
                  transition-all duration-300 transform hover:scale-105"
                >
                  <span>Start Free Trial</span>
                  <ArrowRightIcon className="h-5 w-5" />
                </Link>

                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl 
                  hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 
                  flex items-center justify-center space-x-2 font-bold text-lg 
                  transition-all duration-300 transform hover:scale-105"
                >
                  <PlayIcon className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Enhanced Features with Typewriter */}
              <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-3 sm:space-y-0 text-base text-gray-600">
                {[
                  "HIPAA Compliant & Secure",
                  "24/7 Support Available"
                ].map((text, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-6 w-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckIcon className="h-4 w-4 text-emerald-600" />
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
                ))}
              </div>
            </div>

            {/* Healthcare Dashboard Preview */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-all duration-500 hover:scale-105">
                {/* Dashboard Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <HeartIcon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">CareSync Dashboard</h3>
                      <p className="text-sm text-gray-500">Dr. Sarah Johnson</p>
                    </div>
                  </div>
                  <div className="relative">
                    <BellIcon className="h-6 w-6 text-gray-400" />
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
                      bg: "bg-blue-100"
                    },
                    { 
                      label: "Pending Reports", 
                      value: "5", 
                      icon: DocumentTextIcon, 
                      color: "text-orange-600",
                      bg: "bg-orange-100"
                    },
                    { 
                      label: "Active Patients", 
                      value: "1,247", 
                      icon: UserGroupIcon, 
                      color: "text-emerald-600",
                      bg: "bg-emerald-100"
                    },
                    { 
                      label: "Urgent Cases", 
                      value: "3", 
                      icon: ExclamationTriangleIcon, 
                      color: "text-red-600",
                      bg: "bg-red-100"
                    }
                  ].map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${stat.bg} rounded-lg flex items-center justify-center`}>
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className="text-xs text-gray-500 leading-tight">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Recent Activity</h4>
                  {[
                    { 
                      patient: "John Smith", 
                      action: "Prescription updated", 
                      time: "10 min ago",
                      status: "completed"
                    },
                    { 
                      patient: "Maria Garcia", 
                      action: "Lab results available", 
                      time: "25 min ago",
                      status: "new"
                    },
                    { 
                      patient: "Robert Chen", 
                      action: "Appointment scheduled", 
                      time: "1 hour ago",
                      status: "scheduled"
                    }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {activity.patient.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.patient}</p>
                          <p className="text-xs text-gray-500">{activity.action}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                          activity.status === 'completed' ? 'bg-green-500' :
                          activity.status === 'new' ? 'bg-blue-500' : 'bg-yellow-500'
                        }`} />
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Action */}
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all duration-300">
                    <PlusCircleIcon className="h-5 w-5" />
                    <span>New Patient</span>
                  </button>
                </div>
              </div>

              {/* Healthcare-themed Floating Elements */}
              <div className="absolute -top-6 -left-6 bg-emerald-100 text-emerald-600 p-4 rounded-2xl shadow-lg animate-bounce">
                <HeartIcon className="h-8 w-8" />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-blue-100 text-blue-600 p-4 rounded-2xl shadow-lg animate-pulse">
                <ShieldCheckIcon className="h-8 w-8" />
              </div>

              <div className="absolute top-1/2 -right-8 bg-orange-100 text-orange-600 p-3 rounded-xl shadow-lg animate-pulse delay-1000">
                <BellIcon className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Enhanced Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
              Complete Healthcare 
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent"> Management Suite</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto font-medium leading-relaxed">
              From patient records to prescription management, everything healthcare providers need in one secure platform
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: HeartIcon,
                title: "Patient Care Portal",
                description: "Comprehensive patient management with secure medical records, appointment scheduling, and health tracking.",
                features: ["Electronic Health Records", "Appointment Management", "Medication Tracking", "Health Monitoring"],
                gradient: "from-emerald-500 to-teal-600"
              },
              {
                icon: UsersIcon,
                title: "Doctor Dashboard",
                description: "Powerful tools for healthcare providers with AI-assisted diagnosis and treatment planning.",
                features: ["Patient Management", "AI Diagnosis Assistant", "Digital Prescriptions", "Clinical Analytics"],
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: ShieldCheckIcon,
                title: "Pharmacy Network",
                description: "Integrated pharmacy services with prescription processing and medication delivery.",
                features: ["Prescription Processing", "Inventory Management", "Delivery Coordination", "Drug Interaction Alerts"],
                gradient: "from-purple-500 to-pink-600"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="bg-white border border-gray-200 rounded-3xl p-8 h-full hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 from-emerald-500 to-teal-600" />
                  
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {feature.features.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-700 font-medium"
                      >
                        <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                          <CheckIcon className="h-3 w-3 text-emerald-600" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            Join over 500 healthcare providers who have transformed their patient care with CareSync's comprehensive platform
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <Link
              to="/register"
              className="bg-white text-emerald-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Start Free Trial Today
            </Link>
            
            <button className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm transform hover:scale-105">
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

      {/* Footer */}
      <Footer />

      {/* Video Modal */}
      {isVideoPlaying && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoPlaying(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-4xl w-full transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">CareSync Platform Demo</h3>
              <button
                onClick={() => setIsVideoPlaying(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-8 w-8" />
              </button>
            </div>
            <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <PlayIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">Healthcare platform demo video</p>
                <p className="text-gray-500 text-sm">See how CareSync transforms patient care</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
