
//   Updated FAQ Data Array
import React, { useState, useRef, useEffect} from "react";
import { useTranslation } from "react-i18next";


const faqs = [
  {
    qKey: "faq.items.0.q",
    aKey: "faq.items.0.a",
  },
  {
    qKey: "faq.items.1.q",
    aKey: "faq.items.1.a",
  },
  {
    qKey: "faq.items.2.q",
    aKey: "faq.items.2.a",
  },
  {
    qKey: "faq.items.3.q",
    aKey: "faq.items.3.a",
  },
  {
    qKey: "faq.items.4.q",
    aKey: "faq.items.4.a",
  },
  {
    qKey: "faq.items.5.q",
    aKey: "faq.items.5.a",
  },
  {
    qKey: "faq.items.6.q",
    aKey: "faq.items.6.a",
  },
  {
    qKey: "faq.items.7.q",
    aKey: "faq.items.7.a",
  },
  {
    qKey: "faq.items.8.q",
    aKey: "faq.items.8.a",
  },
  {
    qKey: "faq.items.9.q",
    aKey: "faq.items.9.a",
  },
  {
    qKey: "faq.items.10.q",
    aKey: "faq.items.10.a",
  },
  {
    qKey: "faq.items.11.q",
    aKey: "faq.items.11.a",
  },
  {
    qKey: "faq.items.12.q",
    aKey: "faq.items.12.a",
  },
  {
    qKey: "faq.items.13.q",
    aKey: "faq.items.13.a",
  },
  {
    qKey: "faq.items.14.q",
    aKey: "faq.items.14.a",
  },
  {
    qKey: "faq.items.15.q",
    aKey: "faq.items.15.a",
  },
  {
    qKey: "faq.items.16.q",
    aKey: "faq.items.16.a",
  },
  {
    qKey: "faq.items.17.q",
    aKey: "faq.items.17.a",
  }
];

const FAQSection = () => {
  const { t } = useTranslation();
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
       {t('faq.title', 'Frequently Asked Questions')}
    </h2>

    <div className="flex flex-col gap-4 max-w-3xl mx-auto">
    {faqs.map((faq, idx) => (
      <div
        key={idx}
        className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer p-8 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300/50 dark:hover:border-emerald-600/50 hover:[box-shadow:0_0_15px_rgba(52,211,153,0.2)] dark:hover:[box-shadow:0_0_15px_rgba(52,211,153,0.3)]"
        onClick={() => toggle(idx)}
      >
      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
          {t(faq.qKey)}
      </h3>

      

  <div
  ref={(el) => (contentRefs.current[idx] = el)}
  style={{
    height: openIndex === idx ? "auto" : "0",
    overflow: "hidden",
    transition: "height 0.3s ease",
  }}
>
  <div className="p-6 mb-1">{t(faq.aKey)}</div>
</div>
    </div>
 ))}
</div>
</section>
  );
};

export default FAQSection;
