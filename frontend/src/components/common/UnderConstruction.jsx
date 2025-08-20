import React from "react";
import { motion } from "framer-motion";

const UnderConstruction = ({ title = "Under Construction", message = "This feature is currently being developed. Please check back soon!" }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-2xl mx-auto text-center px-6">
        {/* SVG Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src="/underconstruction.svg"
            alt="Under Construction"
            className="w-64 h-64 mx-auto drop-shadow-2xl"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6"
        >
          {title}
        </motion.h1>

        {/* Message */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
        >
          {message}
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          className="w-full bg-gray-200 rounded-full h-3 mb-8 dark:bg-gray-700"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 10 }}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full shadow-lg"
          />
        </motion.div>

        {/* Status Info */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="text-blue-600 dark:text-blue-400 font-semibold mb-1">Development</div>
            <div className="text-gray-600 dark:text-gray-300">In Progress</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="text-purple-600 dark:text-purple-400 font-semibold mb-1">Testing</div>
            <div className="text-gray-600 dark:text-gray-300">Pending</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-4 shadow-lg backdrop-blur-sm">
            <div className="text-green-600 dark:text-green-400 font-semibold mb-1">Release</div>
            <div className="text-gray-600 dark:text-gray-300">Coming Soon</div>
          </div>
        </motion.div>

        {/* Back Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.history.back()}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:from-blue-700 hover:to-purple-700"
        >
          Go Back
        </motion.button>
      </div>
    </div>
  );
};

export default UnderConstruction;
