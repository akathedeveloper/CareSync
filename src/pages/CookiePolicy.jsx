import React, { useState, useEffect } from 'react';
import { 
  ShieldCheckIcon,
  CogIcon,
  ChartBarIcon,
  GlobeAltIcon,
  EyeIcon,
  ClockIcon,
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  ArrowTopRightOnSquareIcon,
 
 
} from '@heroicons/react/24/outline';
import { Cookie } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from './Footer';
import Navbar from '../components/common/Navbar';

const CookiePolicy = () => {
  const [cookieSettings, setCookieSettings] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  const [showSettings, setShowSettings] = useState(false);
  const [lastUpdated] = useState(new Date('2024-08-17'));

  const cookieTypes = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'Required for basic website functionality and security. Cannot be disabled.',
      icon: ShieldCheckIcon,
      color: 'from-emerald-500 to-teal-500',
      required: true,
      examples: [
        'User authentication',
        'Security tokens',
        'Session management',
        'CSRF protection'
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website to improve user experience.',
      icon: ChartBarIcon,
      color: 'from-blue-500 to-indigo-500',
      required: false,
      examples: [
        'Google Analytics',
        'Page view tracking',
        'User journey analysis',
        'Performance monitoring'
      ]
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'Used to deliver personalized advertisements and measure campaign effectiveness.',
      icon: GlobeAltIcon,
      color: 'from-purple-500 to-pink-500',
      required: false,
      examples: [
        'Social media pixels',
        'Advertising networks',
        'Retargeting campaigns',
        'Conversion tracking'
      ]
    },
    {
      id: 'preferences',
      title: 'Preference Cookies',
      description: 'Store your settings and preferences to enhance your browsing experience.',
      icon: AdjustmentsHorizontalIcon,
      color: 'from-orange-500 to-red-500',
      required: false,
      examples: [
        'Language selection',
        'Theme preferences',
        'Display settings',
        'Notification preferences'
      ]
    }
  ];

  const policySections = [
    {
      title: 'What Are Cookies?',
      icon: Cookie,
      content: `Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you signed in, and helping us understand how you use our services.`
    },
    {
      title: 'How We Use Cookies',
      icon: CogIcon,
      content: `We use cookies for various purposes including website functionality, security, analytics, and personalization. Our cookies help us maintain your session, protect against security threats, analyze website performance, and provide personalized content and advertisements.`
    },
    {
      title: 'Cookie Retention',
      icon: ClockIcon,
      content: `Different cookies have different lifespans. Session cookies are deleted when you close your browser, while persistent cookies remain on your device for a specified period or until you delete them. Most of our cookies expire within 1-2 years, though some essential security cookies may last longer.`
    },
    {
      title: 'Third-Party Cookies',
      icon: EyeIcon,
      content: `Some cookies are set by third-party services we use, such as Google Analytics for website analytics or social media platforms for sharing features. These cookies are governed by the respective third party's privacy policy.`
    },
    {
      title: 'Your Choices',
      icon: AdjustmentsHorizontalIcon,
      content: `You can control cookies through your browser settings or our cookie preference center. While you can disable most cookies, some are essential for website functionality and cannot be turned off without affecting your ability to use our services.`
    },
    {
      title: 'Updates to This Policy',
      icon: DocumentTextIcon,
      content: `We may update this Cookie Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify users of any significant changes and update the "Last Updated" date at the top of this policy.`
    }
  ];

  const handleCookieToggle = (cookieId) => {
    if (cookieId === 'essential') return; // Essential cookies cannot be disabled
    
    setCookieSettings(prev => ({
      ...prev,
      [cookieId]: !prev[cookieId]
    }));
  };

  const handleAcceptAll = () => {
    setCookieSettings({
      essential: true,
      analytics: true,
      marketing: true,
      preferences: true
    });
  };

  const handleRejectOptional = () => {
    setCookieSettings({
      essential: true,
      analytics: false,
      marketing: false,
      preferences: false
    });
  };

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
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Navbar/>
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
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
              🍪 Last Updated: {lastUpdated.toLocaleDateString()}
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl lg:text-7xl font-black text-gray-900 dark:text-gray-100 leading-tight mb-8"
            >
              Cookie
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Policy
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12 font-medium"
            >
              Understanding how CareSync uses cookies to enhance your healthcare platform experience while protecting your privacy and data.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-base text-gray-600 dark:text-gray-400"
            >
              {["GDPR Compliant", "Transparent Data Use", "Full User Control"].map((text, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircleIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Cookie Settings Panel */}
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
              Cookie Preferences
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Customize your cookie settings to control how we collect and use data
            </motion.p>
          </motion.div>

          {/* Cookie Controls */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl mb-12"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Manage Your Cookie Settings
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Choose which types of cookies you want to allow on your device.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAcceptAll}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Accept All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleRejectOptional}
                  className="border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-xl hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-semibold transition-all duration-300"
                >
                  Reject Optional
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {cookieTypes.map((cookie, index) => (
                <motion.div
                  key={cookie.id}
                  variants={itemVariants}
                  whileHover={cardHover}
                  className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${cookie.color} rounded-xl flex items-center justify-center`}>
                        <cookie.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                          {cookie.title}
                        </h4>
                        {cookie.required && (
                          <span className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-medium mt-1">
                            Required
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleCookieToggle(cookie.id)}
                        disabled={cookie.required}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          cookieSettings[cookie.id]
                            ? 'bg-emerald-500'
                            : 'bg-gray-300 dark:bg-gray-600'
                        } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            cookieSettings[cookie.id] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {cookie.description}
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {cookie.examples.map((example, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-md text-xs"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Save Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-12 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Save Preferences
            </motion.button>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
              Your preferences will be saved and applied across all CareSync services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Details */}
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
              Detailed Cookie Information
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Everything you need to know about our cookie practices
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {policySections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={cardHover}
                viewport={{ once: true }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
                    <section.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browser Settings Guide */}
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
              Browser Cookie Settings
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Learn how to manage cookies in your browser
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: 'Chrome', icon: '🌐', guide: 'Settings > Privacy > Cookies' },
                { name: 'Firefox', icon: '🦊', guide: 'Options > Privacy > Cookies' },
                { name: 'Safari', icon: '🧭', guide: 'Preferences > Privacy > Cookies' },
                { name: 'Edge', icon: '🔵', guide: 'Settings > Privacy > Cookies' }
              ].map((browser, index) => (
                <motion.div
                  key={browser.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 group-hover:bg-gradient-to-br group-hover:from-emerald-50 group-hover:to-teal-50 dark:group-hover:from-emerald-900/20 dark:group-hover:to-teal-900/20 transition-all duration-300">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {browser.icon}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {browser.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {browser.guide}
                    </p>
                    <ArrowTopRightOnSquareIcon className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border border-blue-200 dark:border-blue-800"
            >
              <div className="flex items-start space-x-3">
                <InformationCircleIcon className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    Important Note
                  </h4>
                  <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                    Disabling all cookies may affect website functionality and your ability to access certain features of the CareSync platform. Essential cookies are necessary for security and basic functionality.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact & Support */}
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
              Questions About Our Cookie Policy?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl lg:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-3xl mx-auto"
            >
              Our privacy team is here to help you understand how we use cookies and protect your data.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-emerald-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl"
              >
              <a href="/contact">  Contact Privacy Team</a>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm"
              >
               <a href="/privacy-policy"> View Privacy Policy</a>
              </motion.button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-12 text-white/80 font-medium"
            >
              <div className="flex items-center space-x-2">
                <CheckCircleIcon className="h-5 w-5" />
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheckIcon className="h-5 w-5" />
                <span>Data Protection Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <DocumentTextIcon className="h-5 w-5" />
                <span>Transparent Practices</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default CookiePolicy;