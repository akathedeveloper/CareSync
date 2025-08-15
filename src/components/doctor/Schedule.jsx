import React, { useMemo } from "react";
import { useAppointments } from "../../contexts/AppointmentContext";
import { useAuth } from "../../contexts/AuthContext";
import { findPatientById } from "../../data/dummyData";

const getStatusClass = (status) => {
  switch (status) {
    case "completed":
      return "bg-medical-500 dark:bg-medical-600";
    case "pending":
      return "bg-yellow-500 dark:bg-yellow-600";
    case "cancelled":
    case "rejected":
      return "bg-red-500 dark:bg-red-600";
    default:
      return "bg-gray-500 dark:bg-gray-600";
  }
};

const Schedule = () => {
  const { user } = useAuth();
  const { appointments, updateAppointmentStatus, cancelAppointment } =
    useAppointments();

  const doctorAppointments = useMemo(() => {
    const now = new Date();
    return appointments
      .filter((apt) => apt.doctorId === user.id)
      .map((apt) => ({
        ...apt,
        patient: findPatientById(apt.patientId),
        isUpcoming:
          new Date(`${apt.date}T${apt.time.replace(" ", "")}`) >= now &&
          apt.status !== "Cancelled" &&
          apt.status !== "Rejected",
      }))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [appointments, user.id]);

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const AppointmentCard = ({ apt }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 overflow-hidden relative">
      <div
        className={`absolute top-4 right-4 px-3 py-1 text-white text-xs font-bold rounded-full ${
          apt.isUpcoming ? "bg-primary-500 dark:bg-primary-600" : "bg-gray-500 dark:bg-gray-600"
        }`}
      >
        {apt.isUpcoming ? "Upcoming" : "Past"}
      </div>
      <div className={`h-2 ${getStatusClass(apt.status)}`}></div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-default mb-4">
          Patient: {apt.patient?.name || "N/A"}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-2">
          <strong>Date:</strong> {apt.date}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          <strong>Time:</strong> {apt.time}
        </p>
        <div className="flex justify-between items-center">
          <span
            className={`px-4 py-1 text-white text-sm font-semibold rounded-full ${getStatusClass(
              apt.status
            )}`}
          >
            {apt.status}
          </span>
          {apt.status === "Pending" && (
            <div className="flex gap-2">
              <button
                onClick={() => updateAppointmentStatus(apt.id, "Confirmed")}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => updateAppointmentStatus(apt.id, "Rejected")}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          )}
          {apt.status === "Confirmed" && apt.isUpcoming && (
            <button
              onClick={() => cancelAppointment(apt.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg">
      <header className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100">
          Your Appointment Schedule
        </h2>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {doctorAppointments.length > 0 ? (
          doctorAppointments.map((apt) => (
            <AppointmentCard key={apt.id} apt={apt} />
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            You have no appointments.
          </p>
        )}
      </div>
    </div>
  );
};

export default Schedule;
