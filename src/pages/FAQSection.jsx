import React, { useState, useRef, useEffect} from "react";

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
  const contentRefs = useRef([]);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  useEffect(() => {
    const handleResize = () => {
      contentRefs.current.forEach((ref, idx) => {
        if (ref) {
          ref.style.maxHeight = openIndex === idx? 
             `${ref.scrollHeight}px`
            : "0px";
        }
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openIndex]);



  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-4 md:px-8">
    <h2 className="text-3xl font-semibold text-center mb-8">
       Frequently Asked Questions
    </h2>

    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
    {faqs.map((faq, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer p-8"
        onClick={() => toggle(idx)}
      >
      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          {faq.question}
      </h3>

      

  <div
  ref={(el) => (contentRefs.current[idx] = el)}
  style={{
    height: openIndex === idx ? "auto" : "0",
    overflow: "hidden",
    transition: "height 0.3s ease",
  }}
>
  <div className="p-6 mb-1">{faq.answer}</div>
</div>
    </div>
 ))}
</div>
</section>
  );
};

export default FAQSection;
