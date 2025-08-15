import { div } from "framer-motion/client";
import React from "react";

const ContactUs = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-100 dark:hover:shadow-green-900/20 hover:-translate-y-1">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Have any question? 📩
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 text-center">
          Drop your query below. We’ll get back
          to you soon!
        </p>
        <form className="flex flex-col sm:flex-col gap-3 mb-6"
          onSubmit={(e) => e.preventDefault()}
        > 
          <input
            type="name"
            placeholder="Enter your full name"
            required
            className="flex-1 px-5 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
          />

           <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-5 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
          />
          <textarea
            placeholder="Write your message..."
            rows={3}
            className="w-full px-5 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
          />
          <button
            type="submit"
            className="px-6 py-2.5 justify-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md text-sm md:text-base"
          >
            Send Message
          </button>
        </form>
      </div>
          <div className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-xl hover:shadow-green-100 dark:hover:shadow-green-900/20 hover:-translate-y-1">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 text-center">
          Enter your email to receive latest news.
        </p>
         <form
          className="flex flex-col sm:flex-col gap-3 mb-6"
          onSubmit={(e) => e.preventDefault()}
          >
           <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-5 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
           />
            <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md text-sm md:text-base"
           >
            Subscribe
           </button>
          </form>
        </div>
    </div>
  );
};

export default ContactUs;