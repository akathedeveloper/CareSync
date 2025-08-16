import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "./Footer";
import { useTheme } from "../contexts/ThemeContext";

export default function PrivacyPolicy() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme } = useTheme(); // ✅ get theme ("light" | "dark")

  // Navbar hide/show on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* Navbar with scroll-hide */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Navbar />
      </div>

      {/* Page Wrapper with dark mode from context */}
      <div
        className={`pt-16 min-h-screen flex flex-col ${
          theme === "dark"
            ? "dark bg-secondary text-gray-300"
            : "bg-gray-50 text-gray-800"
        }`}
      >
        {/* Page Title */}
        <section className="bg-gray-100 dark:bg-gray-800/40 py-12 text-center border-b border-gray-300 dark:border-gray-700">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                Privacy Policy
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
                Last Updated: August 16, 2025
            </p>
         </section>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-12 space-y-8 flex-1">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Welcome to CareSync. Your privacy is important to us. This Privacy
              Policy explains how we collect, use, and safeguard your personal
              information when you use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              2. Information We Collect
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Personal information such as name, email, and phone number</li>
              <li>Healthcare-related information provided by you or your provider</li>
              <li>Technical data like IP address, browser type, and usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use your data to provide and improve our services, ensure
              security, comply with legal obligations, and communicate updates
              about the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              CareSync implements industry-standard security measures, including
              256-bit encryption, HIPAA compliance, and multi-factor
              authentication to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              5. Your Rights
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Access your personal information</li>
              <li>Request correction or deletion of your data</li>
              <li>Opt out of certain data processing activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              6. Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              If you have questions about this Privacy Policy, please contact us
              at{" "}
              <a
                href="mailto:privacy@caresync.com"
                className="text-primary hover:underline"
              >
                privacy@caresync.com
              </a>
              .
            </p>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
