import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState";

export default function Career() {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);

  const careers = [
    // your careers array
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 min-h-screen py-16 px-6 lg:px-20">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 dark:text-green-300 font-medium hover:scale-105 transition-transform"
      >
        <ArrowLeft size={20} /> Back
      </button>

      <h1 className="text-4xl font-bold text-center text-green-900 dark:text-green-100 mb-12">
        Healthcare Careers
      </h1>

      {careers.length === 0 ? (
        <EmptyState message="No career openings available!" />
      ) : (
        <div className="space-y-6 max-w-4xl mx-auto">
          {careers.map((career) => (
            <motion.div
              key={career.id}
              layout
              className="bg-white dark:bg-green-900/50 rounded-2xl shadow-md hover:shadow-xl p-6 cursor-pointer transition"
              onClick={() =>
                setExpandedCard(expandedCard === career.id ? null : career.id)
              }
            >
              <motion.h2
                layout
                className="text-2xl font-semibold text-green-800 dark:text-green-100"
              >
                {career.title}
              </motion.h2>
              <motion.p layout className="text-gray-600 dark:text-gray-300 mt-2">
                {career.description}
              </motion.p>

              <AnimatePresence>
                {expandedCard === career.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="mt-4 text-gray-700 dark:text-gray-200"
                  >
                    {career.details}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 transition"
              >
                {expandedCard === career.id ? "Show Less" : "Learn More"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}