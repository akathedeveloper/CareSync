import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Career() {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState(null);

  const careers = [
    {
      id: 1,
      title: "General Surgeon",
      description:
        "Perform surgeries to treat injuries, diseases, and deformities.",
      details:
        "General surgeons handle a wide range of surgical conditions, including abdominal organs, skin, breast, soft tissue, and hernias. They play a crucial role in emergencies, such as appendicitis or trauma cases.",
    },
    {
      id: 2,
      title: "Pediatrician",
      description:
        "Specialize in diagnosing and treating illnesses in children.",
      details:
        "Pediatricians monitor growth, development, and provide preventive care. They handle acute and chronic health issues in infants, children, and adolescents.",
    },
    {
      id: 3,
      title: "Cardiologist",
      description:
        "Focus on diseases and conditions of the heart and blood vessels.",
      details:
        "Cardiologists manage heart attacks, high blood pressure, arrhythmias, and perform procedures like angioplasty and echocardiography to ensure cardiac health.",
    },
    {
      id: 4,
      title: "Orthopedic Surgeon",
      description:
        "Treat conditions related to the musculoskeletal system.",
      details:
        "Orthopedic surgeons handle fractures, joint replacements, spine disorders, and sports injuries, ensuring mobility and quality of life for patients.",
    },
    {
      id: 5,
      title: "Dermatologist",
      description:
        "Specialize in skin, hair, and nail health.",
      details:
        "Dermatologists diagnose and treat skin conditions like acne, eczema, psoriasis, and skin cancers, often combining medical and cosmetic expertise.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 min-h-screen py-16 px-6 lg:px-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 dark:text-green-300 font-medium hover:scale-105 transition-transform"
      >
        <ArrowLeft size={20} /> Back
      </button>

      {/* Heading */}
      <h1 className="text-4xl font-bold text-center text-green-900 dark:text-green-100 mb-12">
        Healthcare Careers
      </h1>

      {/* Career Cards */}
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
            <motion.p
              layout
              className="text-gray-600 dark:text-gray-300 mt-2"
            >
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
    </div>
  );
}
