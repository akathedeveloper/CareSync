// src/components/patient/MedicineReminders.jsx
import React, { useState } from "react";
import { ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

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

  const markAsTaken = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id ? { ...reminder, taken: !reminder.taken } : reminder
      )
    );
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
            className={`p-4 rounded-lg border-2 transition-colors ${
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
                onClick={() => markAsTaken(reminder.id)}
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

      <button className="w-full mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 transition-colors">
        Set New Reminder
      </button>
    </div>
  );
};

export default MedicineReminders;
