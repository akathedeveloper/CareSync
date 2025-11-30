import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { XMarkIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../contexts/ThemeContext";

const CalendarModal = ({ onClose }) => {
  const [value, setValue] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const { isDark } = useTheme();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setValue(date);
  };

  const handleSchedule = () => {
    if (!selectedDate) return;

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 3000);
  };

  // Today tile highlight
  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected =
        selectedDate && date.toDateString() === selectedDate.toDateString();

      //  Highlight selected date in green
      if (isSelected) {
        return "bg-emerald-600 text-white font-semibold rounded-lg";
      }

      //  Show today highlight ONLY if no date is selected
      if (!selectedDate && isToday) {
        return "bg-cyan-100 text-cyan-700 font-semibold rounded-lg";
      }

      //  Weekends in red
      if (date.getDay() === 0 || date.getDay() === 6) {
        return "text-red-500";
      }
    }
    return "";
  };

  return (
    <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[1050]">
      <div
        className={`relative w-11/12 max-w-md max-h-[90vh] rounded-2xl shadow-xl p-6 flex flex-col ${
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
          onChange={setValue}
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
          `}
        />

        {/* Footer */}
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSchedule}
            className={`px-4 py-2 text-sm font-medium rounded-lg text-white ${
              selectedDate
                ? "bg-emerald-600 hover:bg-emerald-700"
                : "bg-gray-400 cursor-not-allowed"
            } transition-colors`}
            disabled={!selectedDate}
          >
            Schedule
          </button>
        </div>

        {/* Success Popup */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl">
            <div
              className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg ${
                isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
              }`}
            >
              <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
              <span className="font-medium">
                Demo successfully scheduled on{" "}
                {selectedDate?.toLocaleDateString()}!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarModal;
