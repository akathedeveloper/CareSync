import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import {
  HeartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    userType: 'patient'
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus('error');
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormStatus('error');
      return;
    }

    // Simulate form submission (replace with actual API call)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        userType: 'patient'
      });
    } catch (error) {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg border-b border-gray-200/50 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center">
              <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center shadow-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">
                CareSync
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {["Features", "Pricing", "Testimonials", "Contact"].map((item) => (
                  item === "Contact" ? (
                    <a
                      key={item}
                      href="#contact-form"
                      className="text-gray-600 hover:text-emerald-600 transition-colors font-medium relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-accent group-hover:w-full transition-all duration-300" />
                    </a>
                  ) : (
                    <a
                      key={item}
                      href={`/#${item.toLowerCase()}`}
                      className="text-gray-600 hover:text-emerald-600 transition-colors font-medium relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 gradient-accent group-hover:w-full transition-all duration-300" />
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
                {isMobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
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
                className="gradient-accent text-white px-6 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold transform hover:scale-105"
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
                  <a
                    key={item}
                    href="#contact-form"
                    className="block px-3 py-2 text-gray-600 hover:text-emerald-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ) : (
                  <a
                    key={item}
                    href={`/#${item.toLowerCase()}`}
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
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm mb-8">
            💬 We're Here to Help
          </div>

          <h1 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
            Get in Touch with
            <span className="gradient-accent bg-clip-text text-transparent"> CareSync</span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-medium max-w-3xl mx-auto mb-12">
            Have questions about our healthcare platform? Need support or want to partner with us? 
            We're here to help you transform healthcare delivery.
          </p>

          {/* Quick Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: ChatBubbleLeftRightIcon,
                title: "General Inquiries",
                description: "Questions about our platform",
                action: "Send Message",
                href: "#contact-form"
              },
              {
                icon: UserGroupIcon,
                title: "Sales & Partnerships",
                description: "Interested in working together",
                action: "Contact Sales",
                href: "#contact-form"
              },
              {
                icon: ShieldCheckIcon,
                title: "Technical Support",
                description: "Need help with the platform",
                action: "Get Support",
                href: "#contact-form"
              }
            ].map((option, index) => (
              <a
                key={index}
                href={option.href}
                className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                <span className="inline-flex items-center text-emerald-600 font-semibold group-hover:text-emerald-700">
                  {option.action}
                  <ArrowRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="space-y-8" id="contact-form">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                  Send us a Message
                </h2>
                <p className="text-lg text-gray-600">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Form Status Messages */}
              {formStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-800 font-semibold">Message sent successfully!</h4>
                    <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {formStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <ExclamationCircleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <h4 className="text-red-800 font-semibold">Please check your information</h4>
                    <p className="text-red-700 text-sm">Make sure all fields are filled out correctly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="userType" className="block text-sm font-semibold text-gray-700 mb-2">
                    I am a...
                  </label>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Healthcare Provider</option>
                    <option value="pharmacist">Pharmacist</option>
                    <option value="administrator">Healthcare Administrator</option>
                    <option value="partner">Potential Partner</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full gradient-accent text-white px-8 py-4 rounded-xl 
                  hover:shadow-lg transition-all duration-300 font-bold text-lg transform hover:scale-105 
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  flex items-center justify-center space-x-2"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <div className="spinner" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                  Contact Information
                </h2>
                <p className="text-lg text-gray-600">
                  Reach out to us through any of these channels. We're always ready to help.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: EnvelopeIcon,
                    title: "Email Us",
                    content: "support@caresync.com",
                    subContent: "We typically respond within 2-4 hours",
                    action: "mailto:support@caresync.com"
                  },
                  {
                    icon: PhoneIcon,
                    title: "Call Us",
                    content: "+1 (555) 123-4567",
                    subContent: "Mon-Fri 8:00 AM - 8:00 PM PST",
                    action: "tel:+15551234567"
                  },
                  {
                    icon: MapPinIcon,
                    title: "Visit Us",
                    content: "123 Healthcare Blvd, Suite 500",
                    subContent: "San Francisco, CA 94105",
                    action: "https://maps.google.com"
                  },
                  {
                    icon: ClockIcon,
                    title: "Business Hours",
                    content: "Monday - Friday: 8:00 AM - 8:00 PM",
                    subContent: "Saturday: 9:00 AM - 5:00 PM PST",
                    action: null
                  }
                ].map((contact, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 gradient-accent rounded-xl flex items-center justify-center flex-shrink-0">
                        <contact.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {contact.title}
                        </h3>
                        {contact.action ? (
                          <a
                            href={contact.action}
                            className="text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                          >
                            {contact.content}
                          </a>
                        ) : (
                          <p className="text-gray-900 font-semibold">{contact.content}</p>
                        )}
                        <p className="text-gray-600 text-sm mt-1">{contact.subContent}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Links */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Additional Resources</h3>
                <div className="space-y-3">
                  {[
                    { label: "Help Center & Documentation", href: "#" },
                    { label: "API Documentation", href: "#" },
                    { label: "System Status", href: "#" },
                    { label: "Privacy Policy", href: "#" },
                    { label: "Terms of Service", href: "#" }
                  ].map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="flex items-center text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <ArrowRightIcon className="h-4 w-4 mr-2" />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  {[
                    { platform: "LinkedIn", href: "https://www.linkedin.com/in/akathedeveloper/" },
                    { platform: "GitHub", href: "https://github.com/akathedeveloper/CareSync/" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-100 hover:bg-emerald-100 text-gray-600 hover:text-emerald-600 p-3 rounded-xl transition-all duration-300 font-semibold"
                    >
                      {social.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl lg:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
            Join thousands of healthcare providers who trust CareSync to transform their patient care
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="bg-white text-emerald-600 px-10 py-4 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              Start Free Trial
            </Link>
            
            <a
              href="#contact-form"
              className="border-2 border-white text-white px-10 py-4 rounded-xl hover:bg-white hover:text-emerald-600 transition-all duration-300 font-bold text-lg backdrop-blur-sm transform hover:scale-105"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactPage;
