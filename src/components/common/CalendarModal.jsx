import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // react-calendar default CSS
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";

const CalendarModal = ({ onClose, onSelectDate }) => {
  const [value, onChange] = useState(new Date());
  const { isDark } = useTheme();

  const handleDateClick = (date) => {
    onSelectDate(date);
    onClose();
  };

  // Today tile highlight
  const tileClassName = ({ date, view }) => {
    if (view === "month" && date.toDateString() === new Date().toDateString()) {
      return "bg-cyan-100 text-cyan-700 font-semibold rounded-lg";
    }
    // weekends (Saturday/Sunday)
    if (view === "month" && (date.getDay() === 0 || date.getDay() === 6)) {
      return "text-red-500";
    }
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[1050]">
      <div
        className={`w-11/12 max-w-md max-h-[90vh] rounded-2xl shadow-xl p-6 flex flex-col ${
          isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Schedule a Demo</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Select an available date to book your demo.
        </p>

        {/* Calendar */}
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={handleDateClick}
          tileClassName={tileClassName}
          className={`
            w-full rounded-3xl p-4
            border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-cyan-200"}
            [&_.react-calendar__navigation]:flex 
            [&_.react-calendar__navigation]:mb-3
            [&_.react-calendar__navigation button]:min-w-[44px]
            [&_.react-calendar__navigation button]:font-bold
            [&_.react-calendar__navigation button]:text-lg
            [&_.react-calendar__navigation button]:rounded-lg
            [&_.react-calendar__navigation button:hover]:bg-cyan-100
            dark:[&_.react-calendar__navigation button:hover]:bg-cyan-800
            [&_.react-calendar__month-view__weekdays__weekday]:text-cyan-600
            [&_.react-calendar__month-view__weekdays__weekday]:font-medium
            dark:[&_.react-calendar__month-view__weekdays__weekday]:text-cyan-400
            [&_.react-calendar__tile]:p-2 [&_.react-calendar__tile]:rounded-lg
            [&_.react-calendar__tile:enabled:hover]:bg-cyan-50
            [&_.react-calendar__tile:enabled:hover]:text-cyan-700
            dark:[&_.react-calendar__tile:enabled:hover]:bg-cyan-900
            dark:[&_.react-calendar__tile:enabled:hover]:text-cyan-100
            [&_.react-calendar__tile--active]:bg-emerald-600
            [&_.react-calendar__tile--active]:text-white
          `}
        />

        {/* Footer */}
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
