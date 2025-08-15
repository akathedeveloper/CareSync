import { HeartIcon } from "@heroicons/react/24/solid";
import {
  FaceSmileIcon,
  BriefcaseIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  const linkSections = [
    {
      title: "Product",
      links: ["Features", "Pricing", "API Documentation", "Integrations", "Security"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Press", "Partners", "Contact"],
    },
    {
      title: "Resources",
      links: ["Blog", "Help Center", "Community", "Webinars", "Status"],
    },
  ];

  return (
    <footer className="bg-gray-900 text-white w-full z-50">
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

            <p className="text-gray-400 text-sm leading-relaxed">
              Revolutionizing healthcare through seamless collaboration between patients, doctors, and pharmacists.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Social 1"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <FaceSmileIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Social 2"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <BookOpenIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                aria-label="Social 3"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
              >
                <BriefcaseIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {linkSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter / Query Section */}
<div className="mt-12 flex justify-center">
      <div className="mx-auto md:mx-0 md:max-w-3xl w-full bg-gray-800/70 rounded-2xl p-6 shadow-xl border border-gray-700">
    <h3 className="text-xl font-semibold mb-2">Have any questions? 📩</h3>
    <p className="text-gray-400 text-sm mb-4">
      Subscribe to our newsletter or drop your query below. We’ll get back to you soon!
    </p>

    <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Enter your email"
        className="flex-1 px-5 py-2.5 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
      />
      <button
        type="submit"
        className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600  text-white rounded-lg font-semibold transition-all duration-200 shadow-md text-sm"
      >
        Subscribe
      </button>
    </form>

    <div className="mt-4">
      <textarea
        placeholder="Write your message..."
        rows={2}
        className="w-full px-5 py-2.5 rounded-lg bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
      />
      <button
        type="button"
        className="mt-3 w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md text-sm"
      >
        Send Message
      </button>
    </div>
  </div>
</div>


        {/* Bottom bar */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} CareSync. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
