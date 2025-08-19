import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useAppointments } from "../../contexts/AppointmentContext";
import { Outlet, useLocation } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DoctorDashboard = () => {
  const { user } = useAuth();
  const { appointments } = useAppointments();
  const location = useLocation();

  const doctorAppointments = appointments.filter(
    (apt) => apt.doctorId === user.id
  );

  const pendingAppointments = doctorAppointments.filter(
    (apt) => apt.status === "Pending"
  );
  const confirmedAppointments = doctorAppointments.filter(
    (apt) => apt.status === "Confirmed"
  );
  const rejectedAppointments = doctorAppointments.filter(
    (apt) => apt.status === "Rejected"
  );

  // Show dashboard only on /doctor route
  const isDashboard =
    location.pathname === "/doctor" || location.pathname === "/doctor/";

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-full">
      {isDashboard ? (
        <DashboardOverview
          user={user}
          appointments={doctorAppointments}
          pendingAppointments={pendingAppointments}
          confirmedAppointments={confirmedAppointments}
          rejectedAppointments={rejectedAppointments}
        />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

const DashboardOverview = ({
  user,
  appointments,
  pendingAppointments,
  confirmedAppointments,
  rejectedAppointments,
}) => {
  // Chart Data
  const chartData = {
    labels: ["Accepted", "Rejected", "Pending"],
    datasets: [
      {
        label: "Appointments",
        data: [
          confirmedAppointments.length,
          rejectedAppointments.length,
          pendingAppointments.length,
        ],
        backgroundColor: [
          "rgba(34,197,94,0.7)", // green
          "rgba(239,68,68,0.7)", // red
          "rgba(253,224,71,0.7)", // yellow
        ],
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Appointment Status Overview",
        color: "#2563eb",
        font: { size: 18, weight: "bold" },
      },
    },
    animation: {
      duration: 1200,
      easing: "easeOutBounce",
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#2563eb", font: { size: 14, weight: "bold" } },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#e0e7ff" },
        ticks: { color: "#2563eb", font: { size: 14, weight: "bold" } },
      },
    },
  };

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-100 mb-2 animate-fade-in">
        Welcome, Dr. {user.name}!
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6 animate-fade-in-slow">
        Here’s a quick overview of your dashboard.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Appointments"
          value={appointments.length}
          color="from-blue-400 to-blue-600"
          icon="📅"
        />
        <StatCard
          title="Accepted"
          value={confirmedAppointments.length}
          color="from-green-400 to-green-600"
          icon="✅"
        />
        <StatCard
          title="Rejected"
          value={rejectedAppointments.length}
          color="from-red-400 to-red-600"
          icon="❌"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-10 animate-fade-in-slow">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <QuickCard
          title="Pending Requests"
          value={pendingAppointments.length}
          description="New appointment requests awaiting your action."
          color="bg-yellow-100 text-yellow-800"
          icon="⏳"
        />
        <QuickCard
          title="Open Patient Cases"
          value={appointments.length}
          description="Total open cases you are handling."
          color="bg-blue-100 text-blue-800"
          icon="🩺"
        />
        <QuickCard
          title="Your Performance"
          value={
            appointments.length > 0
              ? `${Math.round(
                  (confirmedAppointments.length / appointments.length) * 100
                )}%`
              : "0%"
          }
          description="Acceptance rate of appointments."
          color="bg-green-100 text-green-800"
          icon="📈"
        />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color, icon }) => (
  <div
    className={`bg-gradient-to-br ${color} rounded-xl shadow-md p-6 flex flex-col items-center justify-center animate-fade-in`}
  >
    <span className="text-4xl mb-2">{icon}</span>
    <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const QuickCard = ({ title, value, description, color, icon }) => (
  <div
    className={`rounded-xl shadow-md p-6 flex flex-col gap-2 ${color} animate-fade-in`}
  >
    <div className="flex items-center gap-2">
      <span className="text-2xl">{icon}</span>
      <h4 className="font-bold text-lg">{title}</h4>
    </div>
    <p className="text-3xl font-extrabold">{value}</p>
    <p className="text-sm">{description}</p>
  </div>
);

// Simple fade-in animation (add to your CSS or tailwind.config.js if using Tailwind)
const style = document.createElement("style");
style.innerHTML = `
@keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;} }
.animate-fade-in { animation: fade-in 0.8s ease; }
.animate-fade-in-slow { animation: fade-in 1.5s ease; }
`;
document.head.appendChild(style);

export default DoctorDashboard;