import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // react-calendar default styles
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";

const CalendarModal = ({ onClose, onSelectDate }) => {
  const [value, onChange] = useState(new Date());
  const { isDark } = useTheme();

  const handleDateClick = (date) => {
    onSelectDate(date);
    onClose();
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month" && date.toDateString() === new Date().toDateString()) {
      return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100 rounded-lg";
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[1000]">
      <div
        className={`flex flex-col p-6 rounded-2xl w-[90%] max-w-lg max-h-[90vh] shadow-xl ${
          isDark ? "bg-neutral-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`text-xl font-semibold ${isDark ? "text-neutral-50" : "text-neutral-900"}`}>
            Schedule a Demo
          </h2>
          <button
            onClick={onClose}
            className={`transition-colors ${
              isDark
                ? "text-neutral-500 hover:text-neutral-300"
                : "text-neutral-400 hover:text-neutral-600"
            }`}
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Subtext */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Select an available date to book your demo.
        </p>

        {/* Calendar */}
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDateClick}
          className={`w-full max-w-md p-4 rounded-3xl border font-sans
            ${isDark ? "bg-neutral-900 border-neutral-700" : "bg-white border-primary-200"}
          `}
          tileClassName={tileClassName}
        />

        {/* Footer Buttons */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg 
              text-gray-700 dark:text-gray-300 
              bg-gray-100 dark:bg-gray-800 
              hover:bg-gray-200 dark:hover:bg-gray-700 
              transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
