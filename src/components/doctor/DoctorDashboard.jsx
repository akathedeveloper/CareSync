import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppointments } from "../../contexts/AppointmentContext";
import Schedule from "./Schedule";
import { findPatientById } from "../../data/dummyData";

const DoctorDashboard = ({ activeTab }) => {
  const { user } = useAuth();
  const { appointments } = useAppointments();

  const doctorAppointments = appointments
    .filter((apt) => apt.doctorId === user.id)
    .map((apt) => ({ ...apt, patient: findPatientById(apt.patientId) }));

  const pendingAppointments = doctorAppointments.filter(
    (apt) => apt.status === "Pending"
  );

  const renderContent = () => {
    switch (activeTab) {
      case "schedule":
        return <Schedule />;
      default:
        return (
          <DashboardOverview
            user={user}
            appointments={doctorAppointments}
            pendingAppointments={pendingAppointments}
          />
        );
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-full">
      {renderContent()}
    </div>
  );
};

const DashboardOverview = ({ user, appointments, pendingAppointments }) => (
  <div>
    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
      Welcome, {user.name}!
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mt-2">
      Here's a quick overview of your dashboard.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Total Appointments
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          You have {appointments.length} total appointments.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Pending Requests
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {pendingAppointments.length} new appointment requests.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-900/50">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Open Patient Cases
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          You have 8 open cases.
        </p>
      </div>
    </div>
  </div>
);

export default DoctorDashboard;
