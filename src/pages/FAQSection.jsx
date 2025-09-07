
//   Updated FAQ Data Array
import React, { useState, useRef, useEffect} from "react";


const faqs = [
  {
    question: "What is CareSync and who can benefit from it?",
    answer:
      "CareSync is a role-based healthcare assistant platform tailored for patients, doctors, and pharmacists. It streamlines prescription management, reminders, appointment coordination, and secure communication.",
  },
  {
    question: "How do I manage my prescriptions using CareSync?",
    answer:
      "Within your dashboard, you can add, view, and update prescriptions. CareSync also sends real-time reminders to help patients stay on track with their medication.",
  },
  {
    question: "How secure is my data with CareSync?",
    answer:
      "CareSync is HIPAA-compliant and uses industry-standard encryption and authentication to safeguard all your personal and medical information.",
  },
  {
    question: "Can I access CareSync on any device?",
    answer:
      "Absolutely—CareSync is fully responsive, supporting usage on desktops, tablets, and mobile devices through modern browsers.",
  },
  {
    question: "How do I switch between Dark Mode and Light Mode?",
    answer:
      "You can toggle between themes using the sun/moon icon in the navigation bar—this ensures a comfortable experience in any lighting condition.",
  },
  {
    question: "What if I forget my password?",
    answer:
      "Simply click the 'Forgot Password' link on the login page and follow the steps. A password reset link will be sent to your registered email.",
  },
  {
    question: "How do I reach out for help or support?",
    answer:
      "Head to the Contact section and fill out the form or use the provided contact details—you’ll get help promptly from our 24/7 support team.",
  },
  {
    question: "Is CareSync free to use?",
    answer:
      "CareSync offers a free tier with core features. Enhanced tools and integrations are available via premium subscription plans.",
  },
  {
      question: "How much does CareSync cost?",
      answer:
        "CareSync offers flexible pricing based on your organization’s size and needs. Visit our Pricing page or contact our sales team for a custom quote.",
    },
  {
    question: "How does CareSync ensure secure communication between users?",
    answer:
      "All communications—whether between doctors, pharmacists, and patients—are protected using encrypted channels and access controls to maintain privacy.",
  },
  {
    question: "Can I sync my care data across multiple accounts?",
    answer:
      "CareSync supports synchronized access across your devices using the same account, ensuring a seamless experience wherever you log in.",
  },
  {
    question: "Does CareSync send appointment reminders as well?",
    answer:
      "Yes! In addition to prescription reminders, CareSync can notify you about upcoming appointments if your provider sets them in the system.",
  },
  {
    question: "Where can I find more information about CareSync’s compliance and privacy policies?",
    answer:
      "Visit the GDPR Compliance, Privacy, or Terms of Service sections in the footer for full details on policies, legal standards, and data handling practices.",
  }, {
      question: "Does CareSync offer an API?",
      answer:
        "Yes, CareSync provides a secure API with detailed documentation, allowing healthcare providers and partners to integrate our platform with their existing systems.",
    },
    {
      question: "What integrations are available with CareSync?",
      answer:
        "CareSync integrates with major Electronic Health Record (EHR) systems, scheduling tools, and other healthcare software to ensure smooth data flow and collaboration.",
    },
    {
      question: "Where can I find product documentation?",
      answer:
        "You can access our full API documentation and user guides from the Documentation section of the website.",
    },
    {
      question: "What resources does CareSync provide for support?",
      answer:
        "We offer a Help Center, a Community forum, Webinars, and a Status page to keep you updated. You can also contact support anytime through our Contact page.",
    },
    {
      question: "How does CareSync comply with privacy laws?",
      answer:
        "CareSync follows GDPR, HIPAA, and other international compliance standards. You can review details in our Privacy Policy, Terms of Service, and Cookie Policy pages.",
    },
    {
      question: "Where can I learn about careers at CareSync?",
      answer:
        "Check out the Careers page to explore open positions and learn about our culture and values.",
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
