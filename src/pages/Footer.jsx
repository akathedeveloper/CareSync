
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";





export default function Footer() {
  const { isDark } = useTheme();

  const footerLinks = [
    {
      title: "Products",
      links: [
        { name: "Features", href: "/feature", isRoute: true },
        { name: "Pricing", href: "#pricing", isRoute: false },
        { name: "API Documentation", href: "#", isRoute: false },
        { name: "Integrations", href: "#", isRoute: false },
        { name: "Security", href: "#", isRoute: false },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about", isRoute: true },
        { name: "Careers", href: "/career", isRoute: true },
        { name: "Press", href: "#", isRoute: false },
        { name: "Partners", href: "#", isRoute: false },
        { name: "Contact", href: "/contact", isRoute: true },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog", isRoute: true },
        { name: "Help Center", href: "#", isRoute: false },
        { name: "Community", href: "#", isRoute: false },
        { name: "Webinars", href: "#", isRoute: false },
        { name: "Status", href: "#", isRoute: false },
      ],
    },
    {
      title: "Legal",
      links: [
  { name: "Privacy Policy", href: "/privacy-policy", isRoute: true },
  { name: "Terms of Service", href: "/terms", isRoute: true },
        { name: "Cookie Policy", href: "/cookie-policy", isRoute: true },
        { name: "GDPR Compliance", href: "/gdpr-compliance", isRoute: true },
        { name: "Licenses", href: "/license", isRoute: true },
      ],
    },
  ];

  return (
    <footer
      className={`w-full min-h-[500px] flex flex-col justify-between transition-colors duration-300 ${
        isDark ? "bg-[#1f2937] text-gray-300" : "bg-[#fafaf9] text-gray-900"
      }`}
    >
      {/* Upper content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-start gap-12 px-4 pt-12">
        {/* Logo & description */}
        <div className="md:w-1/4 flex-shrink-0 mb-8 md:mb-0">
          <div className="flex items-center mb-3">
            <img
              src="/CareSync-Logo.png"
              alt="CareSync Logo"
              className="object-contain h-10 mr-2"
            />
            <span
              className={`text-2xl font-semibold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              CareSync
            </span>
          </div>
          <p
            className={`mb-2 text-sm ${
              isDark ? "text-[#DEE2E6BF]" : "text-gray-600"
            }`}
          >
            Revolutionizing healthcare through seamless collaboration between
            patients, doctors, and pharmacists. <br />
            <b>CareSync team</b> with help of our <b>contributors</b>.
          </p>
        </div>

        {/* Dynamic sections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3
                className={`mb-3 font-semibold text-lg ${
                  isDark ? "text-[#DEE2E6BF]" : "text-gray-800"
                }`}
              >
                {section.title}
              </h3>
              <ul
                className={`space-y-3 text-sm ${
                  isDark ? "text-[#f8f9fafb]" : "text-gray-700"
                }`}
              >
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="hover:text-blue-500 hover:underline"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="hover:text-blue-500 hover:underline"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className={`border-t mt-10 ${
          isDark ? "border-gray-700" : "border-gray-300"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-3 py-4 px-4 text-sm">
          {/* Copyright + Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <span>© {new Date().getFullYear()} CareSync. All rights reserved.</span>
            <Link to="/privacy-policy" className="hover:text-blue-500">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-blue-500">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-blue-500">
              Contact
            </Link>
            <a
              href="https://github.com/akathedeveloper/CareSync"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Open Source
            </a>
          </div>

          {/* Made with ❤️ */}
          <div className="text-s mt-3">
            Made with <span className="text-red-500">❤️</span> by CareSync Team
          </div>
        </div>
      </div>
    </footer>
  );
}

