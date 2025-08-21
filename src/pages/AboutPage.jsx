import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { 
  HeartIcon, 
  UserGroupIcon, 
  ShieldCheckIcon, 
  LightBulbIcon, 
  GlobeAltIcon, 
  CodeBracketIcon,
  StarIcon,
  CheckCircleIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  BeakerIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { GitBranch } from "lucide-react";
import GitHubStatsSection from '../components/common/GitHubStatsSection';
import { motion } from 'framer-motion';
import Footer from './Footer';
import { useTheme } from "../contexts/ThemeContext";
import BackToTop from "../components/common/BackToTop";

const AboutPage = () => {
  const [activeValue, setActiveValue] = useState(0);
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMobileMenuOpen]);

  const values = [
    {
      icon: HeartIcon,
      title: "Open Source First",
      description: "Built by the community, for the community. Every line of code is transparent and accessible.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: ShieldCheckIcon,
      title: "Security & Privacy",
      description: "Healthcare data security is paramount. HIPAA compliant with robust encryption and privacy controls.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: LightBulbIcon,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to solve real healthcare challenges through collaborative development.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: UserGroupIcon,
      title: "Community Driven",
      description: "Powered by GSSoC'25 participants and healthcare professionals working together.",
      color: "from-blue-500 to-indigo-500"
    }
  ];

  // Real open source maintainers and contributors
  const team = [
    {
      name: "Adhiraj (Admin)",
      role: "Project Maintainer",
      image: "👨‍💻",
      bio: "Leading the CareSync open source initiative under GSSoC'25",
      specialties: ["Open Source", "Healthcare Tech", "Community Building"]
    },
    {
      name: "Core Contributors",
      role: "Development Team",
      image: "👥",
      bio: "Passionate developers contributing to healthcare innovation",
      specialties: ["React", "Node.js", "Healthcare APIs"]
    },
    {
      name: "GSSoC Participants",
      role: "Student Developers",
      image: "🎓",
      bio: "Students from around the globe contributing during GSSoC'25",
      specialties: ["Full Stack", "UI/UX", "Testing"]
    },
    {
      name: "Healthcare Advisors",
      role: "Domain Experts",
      image: "👩‍⚕️",
      bio: "Medical professionals guiding feature development",
      specialties: ["Clinical Workflow", "Healthcare Standards", "User Experience"]
    }
  ];

  // Realistic project milestones
  const milestones = [
    { year: "2024", title: "Project Inception", description: "CareSync started as an open source healthcare management solution" },
    { year: "2025", title: "GSSoC Selection", description: "Selected as an official GSSoC'25 project for student contributions" },
    { year: "2025", title: "First 35 Contributors", description: "Growing community of developers and healthcare enthusiasts" },
    { year: "2025", title: "Beta Release", description: "Launch of beta version with core healthcare management features" },
    { year: "2025", title: "Community Growth", description: "Expanding contributor base and feature set through open collaboration" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.6 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardHover = {
    scale: 1.05,
    y: -5,
    transition: { duration: 0.3, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
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
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {["Home", "Features", "Pricing", "Testimonials", "Contact"].map(
                  (item) => (
                    <Link
                      key={item}
                      to={item === "Home" ? "/" : `/#${item.toLowerCase()}`}
                      className="flex gap-2 items-center text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium relative group
              after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-emerald-600 after:scale-x-0 after:origin-center after:transition-transform after:duration-300
              hover:after:scale-x-100"
                    >
                      {item}
                    </Link>
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
                className="gradient-accent text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="relative md:hidden">
            <div className="absolute right-0 w-52 h-dvh pt-10 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800">
              {["Home", "Features", "Pricing", "Testimonials", "Contact"].map(
                (item) => (
                  <Link
                    key={item}
                    to={item === "Home" ? "/" : `/#${item.toLowerCase()}`}
                    className="block text-center py-3 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium relative group
              after:content-[''] after:absolute after:left-0 after:bottom-1 after:h-[2px] after:w-full after:bg-emerald-600 after:scale-x-0 after:origin-center after:transition-transform after:duration-300
              hover:after:scale-x-100"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </Link>
                )
              )}
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

      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-400/10 dark:to-teal-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
          <motion.div 
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 dark:from-teal-400/10 dark:to-blue-400/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0] 
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-700 dark:text-emerald-300 px-6 py-3 rounded-full text-sm font-semibold shadow-sm mb-8"
            >
              🏥 Open Source Healthcare • GSSoC'25 Project
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-8"
            >
              About
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                {" "}CareSync
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12 font-medium"
            >
              An open source healthcare management platform built collaboratively by developers worldwide through GSSoC'25, connecting patients, doctors, and pharmacies with transparent, secure technology.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-base text-gray-600 dark:text-gray-400"
            >
              {["Open Source Community", "GSSoC'25 Project", "MIT Licensed"].map((text, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <motion.a
                href="https://github.com/akathedeveloper/CareSync"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                View on GitHub
              </motion.a>
              
              <motion.Link
                to="/register"
                className="inline-flex items-center gradient-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BeakerIcon className="w-5 h-5 mr-2" />
                Try Beta Version
              </motion.Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6">
                  <HeartIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  To democratize healthcare technology through open source collaboration, creating accessible tools that empower healthcare providers and improve patient outcomes worldwide.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                  <LightBulbIcon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Vision</h3>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  A world where healthcare technology is transparent, collaborative, and accessible to all, built by a global community of developers and healthcare professionals working together.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GitHub Stats Section - Using the API Component */}
      <GitHubStatsSection />

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Our Core Values
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              The principles that drive our open source healthcare initiative
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onMouseEnter={() => setActiveValue(index)}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-emerald-200 dark:hover:border-emerald-800">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Team */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Our Community
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Meet the passionate individuals building CareSync together
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center h-full">
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {member.image}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="https://github.com/akathedeveloper/CareSync/graphs/contributors"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gradient-accent text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UsersIcon className="w-5 h-5 mr-2" />
              View All Contributors
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Project Timeline
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Key milestones in our open source journey
            </motion.p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-16' : 'lg:pl-16'}`}>
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-sm">{milestone.year}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {milestone.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full border-4 border-white dark:border-gray-950 shadow-lg"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contribution CTA Section */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div 
          className="absolute inset-0 opacity-20"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-y-12" />
        </motion.div>

        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-black text-white mb-8"
            >
              Ready to Contribute to Open Source Healthcare?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-3xl mx-auto"
            >
              Join our growing community of developers, designers, and healthcare professionals building the future of healthcare technology together.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
            >
              <motion.a
                href="https://github.com/akathedeveloper/CareSync"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-emerald-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Contributing
              </motion.a>
              
              <motion.Link
                to="/register"
                className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try CareSync
              </motion.Link>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-white/80 font-medium"
            >
              <div className="flex items-center space-x-2">
                <CodeBracketIcon className="h-5 w-5" />
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserGroupIcon className="h-5 w-5" />
                <span>GSSoC'25 Project</span>
              </div>
              <div className="flex items-center space-x-2">
                <HeartIcon className="h-5 w-5" />
                <span>Community Driven</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AboutPage;
