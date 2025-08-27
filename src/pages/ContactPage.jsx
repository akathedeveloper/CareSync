import React, { useState } from "react";
import Navbar from "../components/common/Navbar";
import { ThemeProvider } from "../contexts/ThemeContext";
import Footer from "../pages/Footer";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

// Reusable Button Component
const Button = ({
  children,
  variant = "primary", // "primary" or "secondary"
  size = "lg", // "sm" or "lg"
  disabled = false,
  onClick,
  href,
  type = "button",
  className = "",
  icon,
}) => {
  const baseClasses = `flex items-center justify-center font-bold rounded-xl transition-all duration-300 ${
    size === "lg" ? "px-8 py-4 text-lg" : "px-4 py-2 text-sm"
  } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  const primaryClasses =
    "gradient-accent text-white hover:shadow-lg transform hover:scale-105";
  const secondaryClasses =
    "border-2 border-white text-white hover:bg-white hover:text-emerald-600 backdrop-blur-sm";

  const combinedClasses = `${baseClasses} ${
    variant === "primary" ? primaryClasses : secondaryClasses
  } ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedClasses}>
        {children}
        {icon && <span className="ml-2">{icon}</span>}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: "patient",
  });

  const [formStatus, setFormStatus] = useState("idle"); // idle, loading, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("loading");

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus("error");
      return;
    }

    if (!validateEmail(formData.email)) {
      setFormStatus("error");
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        userType: "patient",
      });
    } catch (error) {
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold shadow-sm border border-emerald-200 mb-6">
            💬 We're Here to Help
          </div>

          <h1 className="text-4xl lg:text-6xl font-black mb-6">
            Get in Touch with
            <span className="gradient-accent bg-clip-text text-transparent">
              {" "}
              CareSync
            </span>
          </h1>

          <p className="text-xl lg:text-2xl text-gray-600 font-medium max-w-3xl mx-auto mb-12">
            Have questions about our healthcare platform? Need support or want
            to partner with us? We're here to help you transform healthcare
            delivery.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8 border rounded-2xl p-4" id="contact-form">
              <h2 className="text-3xl lg:text-4xl font-black mb-4">Send us a Message</h2>
              <p className="text-lg text-gray-600 dark:text-white">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {formStatus === "success" && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                  <div>
                    <h4 className="text-green-800 font-semibold">Message sent successfully!</h4>
                    <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                  </div>
                </div>
              )}

              {formStatus === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                  <div>
                    <h4 className="text-red-800 font-semibold">Please check your information</h4>
                    <p className="text-red-700 text-sm">Make sure all fields are filled out correctly.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Full Name *"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address *"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
                    required
                  />
                </div>

                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Healthcare Provider</option>
                  <option value="pharmacist">Pharmacist</option>
                  <option value="administrator">Healthcare Administrator</option>
                  <option value="partner">Potential Partner</option>
                  <option value="other">Other</option>
                </select>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject *"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
                  required
                />

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message *"
                  rows={6}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
                  required
                />

                <Button
                  type="submit"
                  disabled={formStatus === "loading"}
                  icon={formStatus !== "loading" ? <ArrowRightIcon className="h-5 w-5" /> : null}
                >
                  {formStatus === "loading" ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Contact Information (remains the same) */}
            <div className="space-y-8 border rounded-2xl p-4">
              {/* ... your contact info blocks ... */}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-emerald-500 via-teal-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-8">Ready to Get Started?</h2>
          <p className="text-xl lg:text-2xl text-white/90 mb-12 font-medium leading-relaxed max-w-3xl mx-auto">
            Join thousands of healthcare providers who trust CareSync to transform their patient care
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button href="/register" variant="primary" size="lg">
              Start Free Trial
            </Button>

            <Button href="#contact-form" variant="secondary" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
