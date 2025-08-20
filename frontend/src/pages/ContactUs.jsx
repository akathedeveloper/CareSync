import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const ContactUs = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 3000);
      setEmail("");
    }
  };

  const handleSendMessage = () => {
    if (message) {
      setIsMessageSent(true);
      setTimeout(() => setIsMessageSent(false), 3000);
      setMessage("");
    }
  };

  const contactInfo = [
    {
      icon: PhoneIcon,
      title: "Call Us",
      info: "+1 (555) 123-4567",
      subInfo: "Mon-Fri 9AM-6PM EST"
    },
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      info: "support@caresync.com",
      subInfo: "We respond within 24h"
    },
    {
      icon: MapPinIcon,
      title: "Visit Us",
      info: "123 Healthcare Ave",
      subInfo: "San Francisco, CA 94102"
    }
  ];

  return (
    <section
      id="contact-form"
      className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/15 to-emerald-600/10 dark:from-emerald-400/8 dark:to-emerald-600/5 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-400/15 to-gray-600/10 dark:from-gray-400/8 dark:to-gray-600/5 rounded-full blur-3xl"
        />

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.2, 0.6, 0.2],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute w-2 h-2 bg-emerald-400/40 dark:bg-emerald-300/30 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${10 + (i % 4) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(75,85,99,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(75,85,99,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 rounded-3xl mb-8 shadow-2xl"
          >
            <ChatBubbleLeftRightIcon className="w-10 h-10 text-white" />
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent mb-6 leading-tight">
            Get in Touch
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about CareSync? We're here to help you transform your healthcare experience
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="lg:col-span-1 space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                Contact Information
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Ready to revolutionize your healthcare workflow? Reach out to our team for personalized assistance.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
                  className="group flex items-start space-x-4 p-4 rounded-2xl bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-700 dark:text-gray-200 font-medium">
                      {item.info}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.subInfo}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-2xl p-6 border border-emerald-200/50 dark:border-emerald-700/50"
            >
              <div className="flex items-center mb-4">
                <ClockIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  Response Time
                </h4>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Our support team typically responds to queries within 2-4 hours during business hours.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              {/* Newsletter Subscription */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <EnvelopeIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Stay Updated
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Subscribe to our newsletter for the latest healthcare technology insights and CareSync updates.
                </p>

                <div className="space-y-4">
                  <div className="relative">
                    <motion.div
                      animate={focusedField === 'email' ? { scale: 1.02 } : { scale: 1 }}
                      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                        focusedField === 'email' 
                          ? 'ring-2 ring-emerald-500 dark:ring-emerald-400 shadow-lg' 
                          : 'ring-1 ring-gray-300 dark:ring-gray-600'
                      }`}
                    >
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg"
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubscribe}
                    disabled={isSubscribed}
                    className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-2 ${
                      isSubscribed
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white hover:shadow-xl'
                    }`}
                  >
                    {isSubscribed ? (
                      <>
                        <CheckCircleIcon className="w-5 h-5" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <EnvelopeIcon className="w-5 h-5" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-12">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
                    Or send us a message
                  </span>
                </div>
              </div>

              {/* Message Form */}
              <div>
                <div className="flex items-center mb-6">
                  <ChatBubbleLeftRightIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    Send Message
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                  Have a specific question or need personalized assistance? Drop us a message and we'll get back to you promptly.
                </p>

                <div className="space-y-6">
                  <div className="relative">
                    <motion.div
                      animate={focusedField === 'message' ? { scale: 1.01 } : { scale: 1 }}
                      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                        focusedField === 'message' 
                          ? 'ring-2 ring-emerald-500 dark:ring-emerald-400 shadow-lg' 
                          : 'ring-1 ring-gray-300 dark:ring-gray-600'
                      }`}
                    >
                      <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Tell us about your needs, questions, or how we can help..."
                        rows={6}
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-lg resize-none"
                      />
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendMessage}
                    disabled={isMessageSent}
                    className={`w-full px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 shadow-lg flex items-center justify-center space-x-3 ${
                      isMessageSent
                        ? 'bg-green-500 text-white'
                        : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white hover:shadow-xl'
                    }`}
                  >
                    {isMessageSent ? (
                      <>
                        <CheckCircleIcon className="w-6 h-6" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-6 h-6" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span>HIPAA Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span>Secure Communication</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;