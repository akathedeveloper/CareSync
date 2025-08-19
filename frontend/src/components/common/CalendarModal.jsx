import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Load default styles first
import "./CalendarModal.css"; // Then load our custom styles to override them
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
    // Custom class for today's date
    if (view === "month" && date.toDateString() === new Date().toDateString()) {
      return "react-calendar__tile--today-custom";
    }
    return null;
  };

  return (
    <div className="calendar-modal-overlay">
      <div className={`calendar-modal-content ${isDark ? "dark" : "light"}`}>
        <div className="calendar-modal-header">
          <h2 className="text-xl font-semibold">Schedule a Demo</h2>
          <button onClick={onClose} className="calendar-modal-close-button">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Select an available date to book your demo.
        </p>
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDateClick}
          className="react-calendar-custom"
          tileClassName={tileClassName}
        />
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
