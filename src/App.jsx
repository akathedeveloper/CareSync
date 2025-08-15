import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";
import Layout from "./components/common/Layout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PatientDashboard from "./components/patient/PatientDashboard";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import PharmacistDashboard from "./components/pharmacist/PharmacistDashboard";
import LoadingSpinner from "./components/common/LoadingSpinner";
import ProfilePage from "./pages/ProfilePage";
import "./index.css";
import Prescriptions from "./components/patient/Prescriptions";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import Appointments from "./components/patient/Appointments";
import Schedule from "./components/doctor/Schedule";
import HealthLogs from "./components/patient/HealthLogs";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Main App Routes
const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Loading CareSync...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route
        path="/login"
        element={user ? <Navigate to={`/${user.role}`} /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate to={`/${user.role}`} /> : <Register />}
      />

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="health-logs" element={<HealthLogs />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorDashboard />} />
        <Route path="schedule" element={<Schedule />} />
      </Route>

      {/* Pharmacist Routes */}
      <Route
        path="/pharmacist"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PharmacistDashboard />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Router>
          <div className="App bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <AppRoutes />
          </div>
        </Router>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
