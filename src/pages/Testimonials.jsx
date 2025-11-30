import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  StarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayIcon,
  PauseIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Testimonials() {
  const { t } = useTranslation();
  const testimonials = [
    {
      name: t("testimonials.sarah.name", "Dr. Sarah Johnson"),
      role: t("testimonials.sarah.role", "Cardiologist"),
      hospital: t("testimonials.sarah.hospital", "Metro General Hospital"),
      content: t(
        "testimonials.sarah.content",
        "CareSync has revolutionized how I manage my patients. The AI-powered insights help me make better diagnoses, and the seamless communication with pharmacists ensures my patients get the right medications quickly."
      ),
      rating: 5,
    },
    {
      name: t("testimonials.michael.name", "Michael Chen"),
      role: t("testimonials.michael.role", "Pharmacist"),
      hospital: t("testimonials.michael.hospital", "HealthPlus Pharmacy"),
      content: t(
        "testimonials.michael.content",
        "The prescription management system is incredibly efficient. We've reduced processing time by 60% and eliminated prescription errors. The integration with doctors' systems is flawless."
      ),
      rating: 5,
    },
    {
      name: t("testimonials.emma.name", "Emma Rodriguez"),
      role: t("testimonials.emma.role", "Patient"),
      hospital: t("testimonials.emma.hospital", "User since 2024"),
      content: t(
        "testimonials.emma.content",
        "As someone with chronic conditions, CareSync has been a lifesaver. I never miss medications thanks to smart reminders, and I can easily track my health progress and communicate with my care team."
      ),
      rating: 5,
    },
    {
      name: t("testimonials.john.name", "John Williams"),
      role: t("testimonials.john.role", "Surgeon"),
      hospital: t("testimonials.john.hospital", "City Hospital"),
      content: t(
        "testimonials.john.content",
        "The scheduling and patient management tools have significantly improved our workflow. Highly recommended for busy hospital environments."
      ),
      rating: 5,
    },
    {
      name: t("testimonials.sophia.name", "Sophia Patel"),
      role: t("testimonials.sophia.role", "Nurse"),
      hospital: t("testimonials.sophia.hospital", "Green Valley Clinic"),
      content: t(
        "testimonials.sophia.content",
        "Real-time updates and patient monitoring make my job much easier. The interface is intuitive and easy to use."
      ),
      rating: 4,
    },
    {
      name: t("testimonials.david.name", "David Lee"),
      role: t("testimonials.david.role", "Orthopedic Specialist"),
      hospital: t("testimonials.david.hospital", "Sunrise Medical Center"),
      content: t(
        "testimonials.david.content",
        "CareSync integrates seamlessly with our existing systems. The analytics help in identifying patient trends effectively."
      ),
      rating: 5,
    },
    {
      name: t("testimonials.olivia.name", "Olivia Brown"),
      role: t("testimonials.olivia.role", "General Practitioner"),
      hospital: t("testimonials.olivia.hospital", "Community Health Hub"),
      content: t(
        "testimonials.olivia.content",
        "The mobile app is a game-changer. I can check patient records and respond to messages even when I'm out of the clinic."
      ),
      rating: 4,
    },
    {
      name: t("testimonials.james.name", "James Anderson"),
      role: t("testimonials.james.role", "Physician"),
      hospital: t("testimonials.james.hospital", "Central Health"),
      content: t(
        "testimonials.james.content",
        "Customer support is responsive and helpful. The software is reliable and easy to adopt."
      ),
      rating: 5,
    },
  ];

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardsPerPage, setCardsPerPage] = useState(3);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: cardsPerPage,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  useEffect(() => {
    const updateCardsPerPage = () => {
      if (window.innerWidth < 640) setCardsPerPage(1);
      else if (window.innerWidth < 1024) setCardsPerPage(2);
      else setCardsPerPage(3);
    };

    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      rotateY: dir > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      rotateY: dir > 0 ? -15 : 15,
    }),
  };
  return (
    <section
      id="testimonials"
      className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-emerald-600/10 dark:from-emerald-400/10 dark:to-emerald-600/5 rounded-full blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-400/20 to-gray-600/10 dark:from-gray-400/10 dark:to-gray-600/5 rounded-full blur-3xl"
        />

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, -60, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute w-1 h-1 bg-emerald-400 dark:bg-emerald-300 rounded-full opacity-30"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(156,163,175,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(156,163,175,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(75,85,99,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(75,85,99,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 rounded-2xl mb-6 shadow-lg"
          >
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
          </motion.div>

          <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 bg-clip-text text-transparent mb-6 leading-tight">
            {t("testimonials.title", "What Our Users Say")}
          </h2>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t(
              "testimonials.subtitle",
              "Join thousands of healthcare professionals who trust CareSync to deliver exceptional patient care"
            )}
          </p>
        </motion.div>

        {/* Testimonials Slider */}
        <div className="relative min-h-[450px] lg:min-h-[425px] overflow-hidden">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={`${currentSlide}-${index}`}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: "easeOut" }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative px-4 py-6 flex h-full"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-emerald-400/30 to-emerald-600/20 dark:from-emerald-400/10 dark:via-emerald-300/15 dark:to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-3xl blur-2xl scale-110" />
                
                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-xl dark:shadow-gray-900/50 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl border border-gray-200/50 dark:border-gray-700/50 h-full w-full flex flex-col min-h-[380px]">
                  <motion.div
                    animate={
                      hoveredCard === index
                        ? { rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-400 dark:to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  </motion.div>

                  <div className="flex items-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 200 }}
                      >
                        <StarIcon
                          className={`h-5 w-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          } fill-current drop-shadow-sm`}
                        />
                      </motion.div>
                    ))}
                  </div>

                  <blockquote className="text-gray-700 dark:text-gray-200 mb-8 leading-relaxed text-base flex-grow relative">
                    <span className="text-1xl text-emerald-500 dark:text-emerald-400 font-serif align-top mr-2">
                      "
                    </span>
                    <span className="relative z-10 italic">{testimonial.content}</span>
                    <span className="text-1xl text-emerald-500 dark:text-emerald-400 font-serif align-bottom ml-2">
                      "
                    </span>
                  </blockquote>

                  <div className="flex items-center mt-auto">
                    <div className="relative">
                      <motion.div
                        animate={hoveredCard === index ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/50 dark:to-emerald-800/50 rounded-2xl flex items-center justify-center mr-4 font-bold text-emerald-600 dark:text-emerald-400 text-lg shadow-lg border border-emerald-200/50 dark:border-emerald-700/50"
                      >
                        {testimonial.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </motion.div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 to-emerald-600/30 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div>
                      <div className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-emerald-600 dark:text-emerald-400 font-medium mb-1">
                        {testimonial.role}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.hospital}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Slider>
        </div>
        {/* Control Panel & Auto Scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12"
        >
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sliderRef.current.slickPrev()}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl dark:shadow-gray-900/50 rounded-2xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group"
              aria-label={t("controls.prev", "Previous testimonials")}
            >
              <ChevronLeftIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sliderRef.current.slickNext()}
              className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl dark:shadow-gray-900/50 rounded-2xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50 group"
              aria-label={t("controls.next", "Next testimonials")}
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
            </motion.button>
          </div>

          <div className="flex items-center gap-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-2xl px-6 py-4 shadow-xl">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleAutoScroll}
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-300 font-medium"
            >
              {isAutoScrolling ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5" />
              )}
              <span className="hidden sm:inline">
                {isAutoScrolling ? t("controls.pause", "Pause") : t("controls.play", "Play")}
              </span>
            </motion.button>

            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

            <span className="text-gray-600 dark:text-gray-300 font-medium">
              {currentSlide + 1} of {Math.ceil(testimonials.length)}
            </span>

            {isAutoScrolling && (
              <motion.div
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 bg-emerald-500 dark:bg-emerald-400 rounded-full"
              />
            )}
          </div>
        </motion.div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => sliderRef.current.slickGoTo(index)}
              className="relative overflow-hidden rounded-full transition-all duration-500"
            >
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  index === currentSlide
                    ? "w-10 bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg"
                    : "w-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
              {index === currentSlide && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-emerald-400/50 rounded-full blur-sm"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
