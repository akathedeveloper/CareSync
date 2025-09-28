import { HeartIcon } from "@heroicons/react/24/solid";
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
        { nameKey: "nav.features", href: "/feature", isRoute: true },
        { nameKey: "nav.pricing", href: "#pricing", isRoute: false },
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
        { nameKey: "footer.contactUs", href: "/contact", isRoute: true },
      ],
    },
    {
      titleKey: "footer.resources",
      links: [
        { nameKey: "footer.blog", href: "/blog", isRoute: true },
        { nameKey: "footer.helpCenter", href: "#", isRoute: false },
        { nameKey: "footer.community", href: "#", isRoute: false },
        { nameKey: "footer.webinars", href: "#", isRoute: false },
        { nameKey: "footer.security", href: "#", isRoute: false },
      ],
    },
    {
      titleKey: "footer.legal",
      links: [
        { nameKey: "footer.privacyPolicy", href: "/privacy-policy", isRoute: true },
        { nameKey: "footer.termsOfService", href: "/terms", isRoute: true },
        { nameKey: "footer.cookiePolicy", href: "/cookie-policy", isRoute: true },
        { nameKey: "footer.gdprCompliance", href: "/gdpr-compliance", isRoute: true },
        { nameKey: "footer.licenses", href: "/license", isRoute: true },
      ],
    },
  ];

  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      id="contact"
      className="z-50 w-full bg-white dark:bg-[#1f2937] text-gray-900 dark:text-white"
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

      <div className="px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand + Description */}
          <div className="flex flex-col items-start space-y-4 md:col-span-1">
            <div className="flex items-center">
              <img
                src="/CareSync-Logo.png"
                alt={t("footer.logoAlt")}
                className="object-contain h-10"
              />
              <span className="ml-3 text-xl font-bold">CareSync</span>
            </div>
            <p
              className="max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400"
              dangerouslySetInnerHTML={{ __html: t("footer.tagline") }}
            />
          </div>

          {/* Link Sections */}
          <div className="grid grid-cols-2 col-span-3 gap-8 md:grid-cols-4 ">
            {linkSections.map((section) => (
              <div key={section.titleKey}>
                <h3 className="mb-4 text-base font-semibold text-gray-900 dark:text-gray-400">
                  {t(section.titleKey)}
                </h3>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.nameKey}>
                      {link.isRoute ? (
                        <Link
                          to={link.href}
                          className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
                        >
                          {t(link.nameKey)}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="text-gray-600 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"
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
        </div>

        {/* Bottom bar (centered layout) */}
        <div className="pt-8 mt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center gap-4 text-sm text-gray-900 dark:text-white">
            <div className="flex flex-wrap justify-center gap-5 text-center ">
              <span>© {new Date().getFullYear()} CareSync. {t("footer.allRightsReserved")}</span>
              <button
                onClick={() => navigate("/privacy-policy")}
                className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
              >
                {t("footer.privacy")}
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
              >
                {t("footer.terms")}
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
              >
                {t("nav.contact")}
              </button>
              <a
                href="https://github.com/akathedeveloper/CareSync"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-gray-900 dark:hover:text-gray-300"
              >
                {t("footer.openSource")}
              </a>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span>{t("footer.madeWith")}</span>
              <HeartIcon className="w-5 h-5 text-red-500" />
              <span>{t("footer.byTeam")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
