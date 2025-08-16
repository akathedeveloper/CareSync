import React from "react";

const ContactUs = () => {
  return (
    <div
      id="contact-form"
      className="pt-24 pb-16 flex justify-center items-start px-4 min-h-[70vh] md:min-h-[90vh]"
    >
      <div className="w-full md:max-w-4xl bg-gray-300/70 dark:bg-gray-800/70 rounded-2xl p-6 md:p-12 shadow-xl border border-gray-400 dark:border-gray-700">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4 text-center">
          Have any questions? 📩
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 text-center">
          Subscribe to our newsletter or drop your query below. We’ll get back
          to you soon!
        </p>

        <form
          className="flex flex-col sm:flex-row gap-3 mb-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md text-sm md:text-base"
          >
            Subscribe
          </button>
        </form>

        <div>
          <textarea
            placeholder="Write your message..."
            rows={3}
            className="w-full px-5 py-2.5 rounded-lg bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm md:text-base"
          />
          <button
            type="button"
            className="mt-3 w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg font-semibold transition-all duration-200 shadow-md text-sm md:text-base"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
