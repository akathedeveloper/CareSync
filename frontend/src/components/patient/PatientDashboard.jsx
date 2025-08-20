import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppointments } from "../../contexts/AppointmentContext";
import Prescriptions from "./Prescriptions";
import Appointments from "./Appointments";
import HealthLogs from "./HealthLogs";
import MedicineReminders from "./MedicineReminders";
import {
  HeartIcon,
  ClockIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

const PatientDashboard = ({ activeTab }) => {
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const patientAppointments = appointments.filter(
    (apt) => apt.patientId === user?.id
  );
  const apptCount = patientAppointments.length;

  const renderContent = () => {
    switch (activeTab) {
      case "prescriptions":
        return <Prescriptions />;
      case "appointments":
        return <Appointments />;
      case "health-logs":
        return <HealthLogs />;
      case "medicine-reminders":
        return <MedicineReminders />;
      default:
        return <DashboardOverview user={user} apptCount={apptCount} />;
    }
  };

  return (
    <div className="p-6 bg-subtle min-h-full">
      {renderContent()}
    </div>
  );
};

const DashboardOverview = ({ user, apptCount }) => {
  const stats = [
    {
      name: "Active Prescriptions",
      value: "3",
      icon: DocumentTextIcon,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Medicine Reminders",
      value: "5",
      icon: ClockIcon,
      color: "text-green-600 dark:text-green-400",
    },
    {
      name: "Health Logs",
      value: "12",
      icon: HeartIcon,
      color: "text-red-600 dark:text-red-400",
    },
    {
      name: "Appointments",
      value: String(apptCount),
      icon: ClockIcon,
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here's your health overview for today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-surface p-6 rounded-lg shadow-sm border border-subtle hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div
                className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${stat.color}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MedicineReminders />
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Recent Health Logs
          </h3>
          <div className="space-y-3">
            {[
              {
                date: "Today",
                type: "Blood Pressure",
                value: "120/80 mmHg",
                status: "normal",
              },
              {
                date: "Yesterday",
                type: "Weight",
                value: "70 kg",
                status: "normal",
              },
              {
                date: "2 days ago",
                type: "Temperature",
                value: "98.6°F",
                status: "normal",
              },
            ].map((log, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {log.type}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {log.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {log.value}
                  </p>
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full">
                    {log.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
