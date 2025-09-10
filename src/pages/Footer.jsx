import { HeartIcon } from "@heroicons/react/24/solid";
import {
  EnvelopeIcon,
  DocumentTextIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";

export default function Footer() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const linkSections = [
    {
      title: "Product",
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
        { name: "Licenses", href: "#", isRoute: false },
      ],
    },
  ];

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      id="contact"
      className="z-50 w-full bg-primary-100 dark:bg-primary-900/10 text-primary-900 dark:text-primary-50"
    >
      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          tabIndex="0"
          className="fixed w-10 h-10 p-2 text-xl font-bold text-white transition rounded-lg cursor-pointer bottom-8 right-8 bg-gradient-to-r from-medical-500 to-primary-600 hover:from-primary-500 hover:to-medical-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500"
          aria-label="Scroll to Top"
        >
          <ChevronDoubleUpIcon />
        </button>
      )}

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Brand + Social (centered) */}
        <div className="flex flex-col items-center mb-10 space-y-4 text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
              <HeartIcon className="w-6 h-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold">CareSync</span>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Revolutionizing healthcare through seamless collaboration between
            patients, doctors, and pharmacists.
          </p>

          {/* Social icons */}
          <div className="flex justify-center gap-3">
            <a
              href="/contact"
              tabIndex="0"
              aria-label="Contact Us"
              title="Contact Us"
              className="flex items-center justify-center w-10 h-10 transition bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-emerald-400 dark:hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <EnvelopeIcon className="w-5 h-5 text-gray-700 dark:text-white hover:text-white" />
            </a>
            <a
              href="/privacy-policy"
              tabIndex="0"
              aria-label="Terms & Conditions"
              title="Terms & Conditions"
              className="flex items-center justify-center w-10 h-10 transition bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-blue-400 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <DocumentTextIcon className="w-5 h-5 text-gray-700 dark:text-white hover:text-white" />
            </a>
            <a
              href="https://github.com/akathedeveloper/CareSync"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex="0"
              aria-label="GitHub Repository"
              title="GitHub Repository"
              className="flex items-center justify-center w-10 h-10 transition bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              <CodeBracketIcon className="w-5 h-5 text-gray-700 dark:text-white hover:text-white" />
            </a>
          </div>
        </div>

        {/* Link Sections (under social) */}
        <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4 md:text-left">
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        tabIndex="0"
                        className="text-gray-600 transition dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        tabIndex="0"
                        className="text-gray-600 transition dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 mt-10 text-xs text-gray-600 border-t border-gray-400 dark:border-gray-800 dark:text-gray-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} CareSync. All rights reserved.
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/privacy-policy")}
              tabIndex="0"
              className="transition-colors hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Privacy
            </button>
            <button
              onClick={() => navigate("/gdpr-compliance")}
              tabIndex="0"
              className="transition-colors hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Terms
            </button>
            <a
              href="https://github.com/akathedeveloper/CareSync"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex="0"
              className="transition-colors hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Open Source
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}