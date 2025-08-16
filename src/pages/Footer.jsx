import { HeartIcon } from "@heroicons/react/24/solid";
import {
  FaceSmileIcon,
  BriefcaseIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  const linkSections = [
    {
      title: "Product",
      links: [
        { name: "Features", href: "#features", isRoute: false },
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
        { name: "Careers", href: "#", isRoute: false },
        { name: "Press", href: "#", isRoute: false },
        { name: "Partners", href: "#", isRoute: false },
        { name: "Contact", href: "#contact-form", isRoute: false },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "#", isRoute: false },
        { name: "Help Center", href: "#", isRoute: false },
        { name: "Community", href: "#", isRoute: false },
        { name: "Webinars", href: "#", isRoute: false },
        { name: "Status", href: "#", isRoute: false },
      ],
    },
  ];

  const [isVisible, setIsVisible] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      id="contact"
      className="bg-primary-100 dark:bg-primary-900/10 text-primary-900 dark:text-primary-50 w-full z-50"
    >
      {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed h-10 w-10 text-xl z-1000 bottom-8 right-8 bg-gradient-to-r from-medical-500 to-primary-600 text-white p-2 rounded-lg font-bold cursor-pointer hover:bg-gradient-to-r hover:from-primary-500 hover:to-medical-600 hover:scale-110 transition-colors"
        >
          <ChevronDoubleUpIcon />{" "}
        </button>
      )}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + Social */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <HeartIcon className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold">CareSync</span>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
              Revolutionizing healthcare through seamless collaboration between
              patients, doctors, and pharmacists.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Social 1"
                className="w-10 h-10 bg-gray-300 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-400 dark:hover:bg-primary-600 transition-colors"
              >
                <FaceSmileIcon className="h-5 w-5 text-gray-700 dark:text-white" />
              </a>
              <a
                href="#"
                aria-label="Social 2"
                className="w-10 h-10 bg-gray-300 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-400 dark:hover:bg-primary-600 transition-colors"
              >
                <BookOpenIcon className="h-5 w-5 text-gray-700 dark:text-white" />
              </a>
              <a
                href="#"
                aria-label="Social 3"
                className="w-10 h-10 bg-gray-300 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-400 dark:hover:bg-primary-600 transition-colors"
              >
                <BriefcaseIcon className="h-5 w-5 text-gray-700 dark:text-white" />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
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
        <div className="mt-10 border-t border-gray-400 dark:border-gray-800 pt-6 text-xs text-gray-600 dark:text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} CareSync. All rights reserved.
          </span>
          <div className="flex gap-4">
            <a 
              className="hover:text-gray-900 dark:hover:text-white"
              onClick={() => navigate("/privacy-policy")}
            >
              Privacy
            </a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">
              Terms
            </a>
            <a href="#" className="hover:text-gray-900 dark:hover:text-white">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
