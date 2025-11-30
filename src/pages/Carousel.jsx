import React, { useState } from "react";

const slides = [
  {
    img: "/public/screenshot-desktop.png",
    title: "",
    description: "",
  },
  {
    img: "/public/g1.jpg",
    title: "Cloud Infrastructure",
    description: "99.9% uptime guarantee with optimal performance",
  },
  {
    img: "/public/omnichannel.jpg",
    title: "Omnichannel Access",
    description: "Responsive web portals for workflow continuity",
  },
  {
    img: "/public/collaboration.jpg",
    title: "Care Team Collaboration",
    description: "Seamless communication between doctors and nurses",
  },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));

  return (
    <div className="relative w-full h-[80vh] overflow-hidden bg-gray-100 dark:bg-gray-900">
      {/* Slides */}
      {slides.map((slide, i) => {
        // Make text black only for the two specific slides
        const isBlackText =
          slide.title === "Omnichannel Access" ||
          slide.title === "Care Team Collaboration";

        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 text-center max-w-2xl px-4 ${
                isBlackText ? "text-black" : "text-white"
              }`}
            >
              <h2 className="text-4xl lg:text-6xl font-bold drop-shadow-lg">
                {slide.title}
              </h2>
              <p className="mt-4 text-lg lg:text-2xl drop-shadow-md">
                {slide.description}
              </p>
            </div>
          </div>
        );
      })}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full hover:bg-white hover:text-black transition-colors z-20"
      >
        {"<"}
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white w-10 h-10 rounded-full hover:bg-white hover:text-black transition-colors z-20"
      >
        {">"}
      </button>

      {/* Thumbnails */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`w-24 h-32 rounded-lg overflow-hidden shadow-lg cursor-pointer transition-transform ${
              i === current ? "scale-110 border-2 border-blue-500" : ""
            }`}
            onClick={() => setCurrent(i)}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
