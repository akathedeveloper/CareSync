import React, { useState } from "react";

const faqs = [
  {
    question: "What is CareSync?",
    answer:
      "CareSync is a role‑based healthcare assistant platform that simplifies communication between doctors, pharmacists, and patients.",
  },
  {
    question: "How do I manage prescriptions?",
    answer:
      "You can manage prescriptions in your dashboard—add, view, and receive reminders in real time.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, the platform is designed with security in mind, using modern best practices to protect your health data.",
  },
  {
    question: "Who can use CareSync?",
    answer:
      "CareSync is designed for patients, pharmacists, and doctors—each user sees tools relevant to their role.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4 md:px-8">
  <h2 className="text-3xl font-semibold text-center mb-8">
    Frequently Asked Questions
  </h2>

  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
    {faqs.map((faq, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
        onClick={() => toggle(idx)}
      >
        <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
          {faq.question}
        </h3>

        <p
          className={`mt-2 text-gray-700 dark:text-gray-300 transition-[max-height] duration-300 overflow-hidden ${
            openIndex === idx ? "max-h-96" : "max-h-0"
          }`}
        >
          {faq.answer}
        </p>
      </div>
    ))}
  </div>
</section>
  );
};

export default FAQSection;
