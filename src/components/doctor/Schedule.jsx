import React, { useState, useMemo } from "react";
import { useAppointments } from "../../contexts/AppointmentContext";
import { useAuth } from "../../contexts/AuthContext";
import { findPatientById } from "../../data/dummyData";

const statusColors = {
  confirmed: "bg-green-500",
  pending: "bg-yellow-500",
  cancelled: "bg-red-500",
  rejected: "bg-red-500",
};

// 🔹 Reusable Button component
const Button = ({ children, onClick, type = "button", className, disabled }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg text-white font-semibold transition ${className}`}
  >
    {children}
  </button>
);

const Schedule = () => {
  const { user } = useAuth();
  const {
    appointments,
    bookAppointment,
    updateAppointmentStatus,
    cancelAppointment,
  } = useAppointments();

  const [form, setForm] = useState({ patientName: "", date: "", time: "" });

  const doctorAppointments = useMemo(() => {
    const now = new Date();
    return appointments
      .filter((apt) => apt.doctorId === user.id)
      .map((apt) => {
        const time = apt.time || "09:00";
        const patient =
          apt.patient ||
          (apt.patientId ? findPatientById(apt.patientId) : { name: "N/A" });
        const status = apt.status || "Pending";
        let aptDate = new Date(`${apt.date}T${time.replace(" ", "")}`);
        if (isNaN(aptDate)) aptDate = new Date(apt.date);

        return {
          ...apt,
          patient,
          time,
          status,
          isUpcoming: aptDate >= now && status !== "Cancelled" && status !== "Rejected",
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [appointments, user.id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.patientName && form.date) {
      bookAppointment({
        doctorId: user.id,
        patient: { name: form.patientName, email: `${form.patientName}@demo.com` },
        date: form.date,
        time: form.time || "09:00",
      });
      setForm({ patientName: "", date: "", time: "" });
    }
  };

  const getStatusClass = (status) => statusColors[status.toLowerCase()] || "bg-gray-500";

  const AppointmentCard = ({ apt }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden relative flex flex-col justify-between transition hover:scale-[1.02] duration-200">
      <div className="absolute top-4 right-4 px-3 py-1 text-white text-xs font-bold rounded-full bg-blue-500">
        {apt.isUpcoming ? "Upcoming" : "Past"}
      </div>
      <div className={`h-2 ${getStatusClass(apt.status)}`}></div>
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-xl font-bold text-blue-700 dark:text-blue-200 mb-2">
          {apt.patient?.name || "N/A"}
        </h3>
        <div className="flex flex-col gap-1 text-gray-700 dark:text-gray-300 mb-2">
          <span>
            <strong>Date:</strong> {apt.date || "N/A"}
          </span>
          <span>
            <strong>Time:</strong> {apt.time || "N/A"}
          </span>
          <span>
            <strong>Email:</strong> {apt.patient?.email || "N/A"}
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span
            className={`px-4 py-1 text-white text-sm font-semibold rounded-full ${getStatusClass(
              apt.status
            )}`}
          >
            {apt.status}
          </span>
          <div className="flex gap-2">
            {apt.status === "Pending" && (
              <>
                <Button
                  onClick={() => updateAppointmentStatus(apt.id, "Confirmed")}
                  className="bg-green-500 hover:bg-green-600"
                >
                  Accept
                </Button>
                <Button
                  onClick={() => updateAppointmentStatus(apt.id, "Rejected")}
                  className="bg-red-500 hover:bg-red-600"
                >
                  Reject
                </Button>
              </>
            )}
            {apt.status === "Confirmed" && apt.isUpcoming && (
              <Button
                onClick={() => cancelAppointment(apt.id)}
                className="bg-red-500 hover:bg-red-600"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gradient-to-b from-purple-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg min-h-screen">
      <header className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-blue-700 dark:text-blue-100">
          Your Appointment Schedule
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Add new appointments and manage your schedule.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center justify-center mb-10"
      >
        <input
          type="text"
          name="patientName"
          value={form.patientName}
          onChange={handleChange}
          placeholder="Patient Name"
          className="border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          className="border border-blue-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Add Appointment
        </Button>
      </form>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {doctorAppointments.length > 0 ? (
          doctorAppointments.map((apt) => <AppointmentCard key={apt.id} apt={apt} />)
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
