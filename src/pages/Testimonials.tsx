// src/components/Testimonials.tsx
import { useState } from "react";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      role: "Cardiologist",
      hospital: "Metro General Hospital",
      content:
        "CareSync has revolutionized how I manage my patients. The AI-powered insights help me make better diagnoses, and the seamless communication with pharmacists ensures my patients get the right medications quickly.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Pharmacist",
      hospital: "HealthPlus Pharmacy",
      content:
        "The prescription management system is incredibly efficient. We've reduced processing time by 60% and eliminated prescription errors. The integration with doctors' systems is flawless.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Patient",
      hospital: "User since 2024",
      content:
        "As someone with chronic conditions, CareSync has been a lifesaver. I never miss medications thanks to smart reminders, and I can easily track my health progress and communicate with my care team.",
      rating: 5,
    },
    {
      name: "John Williams",
      role: "Surgeon",
      hospital: "City Hospital",
      content:
        "The scheduling and patient management tools have significantly improved our workflow. Highly recommended for busy hospital environments.",
      rating: 5,
    },
    {
      name: "Sophia Patel",
      role: "Nurse",
      hospital: "Green Valley Clinic",
      content:
        "Real-time updates and patient monitoring make my job much easier. The interface is intuitive and easy to use.",
      rating: 4,
    },
    {
      name: "David Lee",
      role: "Orthopedic Specialist",
      hospital: "Sunrise Medical Center",
      content:
        "CareSync integrates seamlessly with our existing systems. The analytics help in identifying patient trends effectively.",
      rating: 5,
    },
    {
      name: "Olivia Brown",
      role: "General Practitioner",
      hospital: "Community Health Hub",
      content:
        "The mobile app is a game-changer. I can check patient records and respond to messages even when I'm out of the clinic.",
      rating: 4,
    },
    {
      name: "James Anderson",
      role: "Physician",
      hospital: "Central Health",
      content:
        "Customer support is responsive and helpful. The software is reliable and easy to adopt.",
      rating: 5,
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const cardsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / cardsPerPage);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const currentCards = testimonials.slice(
    currentPage * cardsPerPage,
    currentPage * cardsPerPage + cardsPerPage
  );

  // Animation variants
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Healthcare Professionals
          </h2>
          <p className="text-xl text-gray-600">
            See what our users are saying about CareSync
          </p>
        </div>

        {/* Cards with animation */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPage} // Ensures re-render on page change
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {currentCards.map((t, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              >
                {/* Stars */}
                <div className="flex items-center mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 italic">"{t.content}"</p>

                {/* User Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 font-semibold text-primary-600">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{t.name}</div>
                    <div className="text-sm text-gray-600">{t.role}</div>
                    <div className="text-sm text-gray-500">{t.hospital}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Prev/Next Buttons */}
        <div className="flex justify-center items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
          </button>
          <span className="text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition"
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
}
