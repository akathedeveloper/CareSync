import React from "react";
import { useAppointments } from "../../contexts/AppointmentContext";
import { useAuth } from "../../contexts/AuthContext";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-green-100 text-green-800",
};

const Patients = () => {
  const { user } = useAuth();
  const { appointments, deleteAppointment } = useAppointments(); // deleteAppointment function

  // Doctor ke active appointments se unique patients nikaal lo
  const doctorAppointments = appointments.filter(
    (apt) =>
      apt.doctorId === user.id &&
      (apt.status === "Pending" || apt.status === "Confirmed")
  );

  // Unique patients map
  const patientsMap = {};
  doctorAppointments.forEach((apt) => {
    if (apt.patient && apt.patient.name) {
      patientsMap[apt.patient.name] = {
        ...apt.patient,
        status: apt.status,
        date: apt.date,
        appointmentId: apt.id, // delete karne ke liye id chahiye
      };
    }
  });
  const patients = Object.values(patientsMap);

  const handleDelete = (appointmentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this patient record?"
    );
    if (confirmDelete) {
      deleteAppointment(appointmentId); // delete function call
      alert("Patient record deleted successfully!");
    }
  };

  return (
    <div className="p-8 bg-gradient-to-b from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg min-h-screen">
      <header className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-green-700 dark:text-green-100">
          Your Patients
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          View all patients with active appointments.
        </p>
      </header>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {patients.length > 0 ? (
          patients.map((patient, idx) => (
            <div
              key={patient.email + idx}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col gap-2 relative"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-green-700 dark:text-green-200">
                  {patient.name}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    statusColors[patient.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {patient.status}
                </span>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Email:</strong> {patient.email}
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                <strong>Next Appointment:</strong> {patient.date}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(patient.appointmentId)}
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete Record
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
            No active patients found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Patients;