// src/components/patient/MedicineReminders.jsx
import React, { useState } from "react";
import {
  ClockIcon,
  CheckCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";



const MedicineReminders = () => {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      medicine: "Vitamin D3",
      dosage: "1000 IU",
      time: "08:00 AM",
      taken: false,
      frequency: "Daily",
    },
    {
      id: 2,
      medicine: "Metformin",
      dosage: "500mg",
      time: "12:00 PM",
      taken: true,
      frequency: "Twice daily",
    },
    {
      id: 3,
      medicine: "Lisinopril",
      dosage: "10mg",
      time: "08:00 PM",
      taken: false,
      frequency: "Daily",
    },
  ]);

  const timePresets = [
    { label: "Morning", time: "08:00" },
    { label: "Noon", time: "12:00" },
    { label: "Evening", time: "20:00" },
    { label: "Custom", time: "custom" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timePreset, setTimePreset] = useState("Morning");
  const [newReminder, setNewReminder] = useState({
    medicine: "",
    dosage: "",
    time: "08:00",
    frequency: "Daily",
  });

  const markAsTaken = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, taken: !reminder.taken }
          : reminder
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "time") {
      setTimePreset("Custom");
    }
    setNewReminder({ ...newReminder, [name]: value });
  };

  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!newReminder.medicine || !newReminder.time) {
    
      return;
    }

    const newReminderObj = {
      id:
        reminders.length > 0 ? Math.max(...reminders.map((r) => r.id)) + 1 : 1,
      ...newReminder,
      taken: false,
    };

    setReminders([...reminders, newReminderObj]);
    setIsModalOpen(false);
  };

  const handleTimePresetChange = (preset) => {
    setTimePreset(preset.label);
    if (preset.time !== "custom") {
      setNewReminder({ ...newReminder, time: preset.time });
    } else {
      setNewReminder({ ...newReminder, time: "" });

    }
  };

  return (
    <div className="bg-surface p-6 rounded-lg shadow-sm border border-subtle">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-default">
          Medicine Reminders
        </h3>
        <button className="text-primary hover:text-primary-700 text-sm font-medium">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {reminders.map((reminder) => (
          <div
            key={reminder.id}
            onClick={() => handleTap(reminder.id)}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
              reminder.taken
                ? "border-medical-200 bg-medical-50/80 dark:border-medical-800 dark:bg-medical-900/20"
                : "border-subtle bg-surface hover:border-primary-200 dark:hover:border-primary-500"
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4
                    className={`font-medium ${
                      reminder.taken
                        ? "text-green-800 dark:text-green-300 line-through"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {reminder.medicine}
                  </h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    ({reminder.dosage})
                  </span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  <span>
                    {reminder.time} • {reminder.frequency}
                  </span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent conflict with card click
                  markAsTaken(reminder.id);
                }}
                className={`p-2 rounded-full transition-colors ${
                  reminder.taken
                    ? "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30"
                    : "text-gray-400 hover:text-green-600 hover:bg-green-50 dark:text-gray-500 dark:hover:text-green-400 dark:hover:bg-green-900/20"
                }`}
              >
                <CheckCircleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          // Reset form state when opening modal
          setNewReminder({ medicine: "", dosage: "", time: "08:00", frequency: "Daily" });
          setTimePreset("Morning");
          setIsModalOpen(true);
        }}
        className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors"
      >
        Set New Reminder
      </button>

      {/* Add Reminder Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Set New Reminder
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleAddReminder}>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="medicine"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Medicine Name
                  </label>
                  <input
                    type="text"
                    name="medicine"
                    id="medicine"
                    value={newReminder.medicine}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="dosage"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Dosage (e.g., 500mg)
                  </label>
                  <input
                    type="text"
                    name="dosage"
                    id="dosage"
                    value={newReminder.dosage}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                    {timePresets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handleTimePresetChange(preset)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          timePreset === preset.label
                            ? "bg-primary-600 text-white shadow-sm"
                            : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  {timePreset === "Custom" && (
                    <div className="relative mt-2">
                      <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="time"
                        name="time"
                        id="time"
                        value={newReminder.time}
                        onChange={handleInputChange}
                        className="pl-10 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        required
                        autoFocus
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="frequency"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Frequency
                  </label>
                  <select
                    name="frequency"
                    id="frequency"
                    value={newReminder.frequency}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option>Daily</option>
                    <option>Twice daily</option>
                    <option>Weekly</option>
                    <option>As needed</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-500 rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none"
                >
                  Add Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineReminders;
