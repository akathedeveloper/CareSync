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
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const linkSections = [
    {
      titleKey: "footer.product",
      links: [
        { nameKey: "Features", href: "/feature", isRoute: true },
        { nameKey: "Pricing", href: "#pricing", isRoute: false },
        { nameKey: "footer.apiDocs", href: "#", isRoute: false },
        { nameKey: "footer.integrations", href: "#", isRoute: false },
        { nameKey: "footer.security", href: "#", isRoute: false },
      ],
    },
    {
      titleKey: "footer.company",
      links: [
        { nameKey: "footer.aboutUs", href: "/about", isRoute: true },
        { nameKey: "footer.careers", href: "/career", isRoute: true },
        { nameKey: "footer.press", href: "#", isRoute: false },
        { nameKey: "footer.partners", href: "#", isRoute: false },
        { nameKey: "footer.contactUs", href: "/contact", isRoute: true }, // ✅ fixed
      ],
    },
    {
      titleKey: "footer.resources",
      links: [
        { nameKey: "footer.blog", href: "/blog", isRoute: true }, // ✅ fixed
        { nameKey: "footer.helpCenter", href: "#", isRoute: false },
        { nameKey: "footer.community", href: "#", isRoute: false },
        { nameKey: "footer.webinars", href: "#", isRoute: false },
        { nameKey: "footer.status", href: "#", isRoute: false },
      ],
    },

    {
      titleKey: "footer.legal",
      links: [
        {
          nameKey: "footer.privacyPolicy",
          href: "/privacy-policy",
          isRoute: true,
        },
        { nameKey: "footer.termsOfService", href: "/terms", isRoute: true },
        {
          nameKey: "footer.cookiePolicy",
          href: "/cookie-policy",
          isRoute: true,
        },
        {
          nameKey: "footer.gdprCompliance",
          href: "/gdpr-compliance",
          isRoute: true,
        },
        { nameKey: "footer.licenses", href: "/license", isRoute: true },
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
          className="fixed z-50 w-10 h-10 p-2 mb-6 text-xl font-bold text-white transition rounded-lg cursor-pointer bottom-1 right-6 bg-gradient-to-r from-medical-500 to-primary-600 hover:from-primary-500 hover:to-medical-600 hover:scale-110"
        >
          <ChevronDoubleUpIcon />
        </button>
      )}

      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Brand + Social */}
        <div className="flex flex-col items-center mb-10 space-y-4 text-center">
          <div className="flex items-center justify-center">
            <img
              src="/CareSync-Logo.png"
              alt={t("footer.logoAlt")}
              className="object-contain h-12"
            />
          </div>

          <p className="max-w-md text-md leading-relaxed text-gray-600 dark:text-gray-400">
            {t("footer.description")}
          </p>

          {/* Social icons */}
          <div className="flex justify-center gap-3">
            <a
              href="/contact"
              aria-label={t("footer.contactUs")}
              title={t("footer.contactUs")}
              className="flex items-center justify-center w-10 h-10 transition-transform duration-300 transform bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-emerald-400 dark:hover:bg-emerald-600 hover:scale-110"
            >
              <EnvelopeIcon className="w-5 h-5 text-gray-700 dark:text-white hover:text-white dark:hover:text-white" />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 transition-transform duration-300 transform bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-blue-500 hover:scale-110"
            >
              <i className="fa-brands fa-linkedin text-gray-700 dark:text-white hover:text-white dark:hover:text-white transition-colors duration-300"></i>
            </a>

            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 transition-transform duration-300 transform bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-sky-400 dark:hover:bg-sky-400 hover:scale-110"
            >
              <i className="fa-brands fa-x-twitter text-gray-700 dark:text-white hover:text-white dark:hover:text-white transition-colors duration-300"></i>
            </a>

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-10 h-10 transition-transform duration-300 transform bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-600 hover:scale-110"
            >
              <i className="fa-brands fa-facebook text-gray-700 dark:text-white hover:text-white dark:hover:text-white transition-colors duration-300"></i>
            </a>

            <a
              href="/privacy-policy"
              aria-label={t("footer.termsAndConditions")}
              title={t("footer.termsAndConditions")}
              className="flex items-center justify-center w-10 h-10 transition-transform duration-300 transform bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-violet-500 dark:hover:bg-violet-600 hover:scale-110"
            >
              <DocumentTextIcon className="w-5 h-5 text-gray-700 dark:text-white hover:text-white dark:hover:text-white" />
            </a>

            <a
              href="https://github.com/akathedeveloper/CareSync"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("footer.githubRepo")}
              title={t("footer.githubRepo")}
              className="flex items-center justify-center w-10 h-10 transition-transform duration-300 transform bg-gray-300 rounded-lg dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-600 hover:scale-110"
            >
              <CodeBracketIcon className="w-5 h-5 text-gray-700 dark:text-white hover:text-white dark:hover:text-white" />
            </a>
          </div>
        </div>

        {/* Link Sections */}
        <div className="grid grid-cols-2 gap-10 text-center md:grid-cols-4 md:text-left">
          {linkSections.map((section) => (
            <div key={section.titleKey}>
              <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.nameKey}>
                    {link.isRoute ? (
                      <Link
                        to={link.href}
                        className="text-gray-600 transition dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        {t(link.nameKey)}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-600 transition dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      >
                        {t(link.nameKey)}
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
            © {new Date().getFullYear()} CareSync.{" "}
            {t("footer.allRightsReserved")}
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/privacy-policy")}
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              {t("footer.privacy")}
            </button>
            <button
              onClick={() => navigate("/gdpr-compliance")}
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              {t("footer.terms")}
            </button>
            <a
              href="https://github.com/akathedeveloper/CareSync"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gray-900 dark:hover:text-white"
            >
              {t("footer.openSource")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
