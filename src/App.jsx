import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
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
import Blog from "./pages/blog";
import Career from "./pages/Career1";
import Notifications from "./pages/Notifications";

import PrivacyPolicy from "./pages/privacy";


import Feature from "./pages/Feature";

import Patients from "./components/doctor/Patients";
import Messages from "./components/common/Messages";
import Settings from "./components/common/Settings";
import Inventory from "./components/patient/Inventory";
import Prescription from "./components/pharmacist/Prescriptions";
import PharmacistInventory from "./components/pharmacist/Inventory";
import { Toaster } from "react-hot-toast";
import CookiePolicy from "./pages/CookiePolicy";
import GDPRCompliance from "./pages/GDPRCompliance";


// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  console.log(
    "ProtectedRoute - user:",
    user,
    "loading:",
    loading,
    "requiredRole:",
    requiredRole
  );

  if (loading) {
    console.log("ProtectedRoute - showing loading spinner");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute - no user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.log("ProtectedRoute - role mismatch, redirecting to user role");
    return <Navigate to={`/${user.role}`} replace />;
  }

  console.log("ProtectedRoute - rendering children");
  return children;
};

// Public Route Component - Redirects authenticated users for auth pages only
const PublicRoute = ({ children, authOnly = false }) => {
  const { user, loading } = useAuth();

  console.log("PublicRoute - user:", user, "loading:", loading, "authOnly:", authOnly);

  if (loading) {
    console.log("PublicRoute - showing loading spinner");
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // Only redirect authenticated users from auth pages (login/register)
  if (user && authOnly) {
    console.log("PublicRoute - user authenticated, redirecting to dashboard");
    return <Navigate to={`/${user.role}`} replace />;
  }

  console.log("PublicRoute - rendering public content");
  return children;
};

// Main App Routes
const AppRoutes = () => {
  const { user, loading } = useAuth();

  console.log("AppRoutes - user:", user, "loading:", loading);

  if (loading) {
    console.log("AppRoutes - showing loading spinner");
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

  console.log("AppRoutes - rendering routes, user:", user);
  return (

    <Routes>
      {/* Public Routes - Accessible to all users */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cookie-policy" element={<CookiePolicy/>} />
      <Route path="/feature" element={<Feature />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/gdpr-compliance" element={<GDPRCompliance/>} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/career" element={<Career />} />

      {/* Auth Routes - Redirect authenticated users */}

      <Route
        path="/login"
        element={
          <PublicRoute authOnly={true}>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute authOnly={true}>
            <Register />
          </PublicRoute>
        }
      />

      {/* General Authenticated Routes */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/notifications" element={<Notifications />} />
        {/* Other shared authenticated routes can go here */}
      </Route>

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute requiredRole="patient">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="prescriptions" element={<Prescriptions />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="health-logs" element={<HealthLogs />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="inventory" element={<Inventory />} />
      </Route>

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute requiredRole="doctor">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DoctorDashboard />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="patients" element={<Patients />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Pharmacist Routes */}
      <Route
        path="/pharmacist"
        element={
          <ProtectedRoute requiredRole="pharmacist">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PharmacistDashboard />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="prescriptions" element={<Prescription />} />
        <Route path="inventory" element={<PharmacistInventory />} />
      </Route>

      {/* Catch all - Redirect to appropriate dashboard or landing */}
      <Route
        path="*"
        element={
          user ? (
            <Navigate to={`/${user.role}`} replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>

  );
};

function App() {
  useEffect(() => {
    // Register the service worker...        (Note: Use Only in `Production`...)
    if ('serviceWorker' in navigator && window.location.hostname !== "localhost") {
      navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
        .then((registration) => {
          console.log('Service Worker registered with scope: ', registration.scope)
        })
        .catch((error) => {
          console.error('Service Worker Registration failed: ', error)
        })
    }
  }, []);

  return (
    <AuthProvider>
      <AppointmentProvider>
        <Router>
          <div className="App bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
            <AppRoutes />
            <Toaster
              position="bottom-right" // Change this to alter the position of the toast.
              toastOptions={{
                duration: 4000,
                style: {
                  background: "var(--toast-bg, #fff)",
                  color: "var(--toast-color, #333)",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
                  border: "1px solid var(--toast-border, #e5e7eb)",
                },
                success: {
                  iconTheme: {
                    primary: "#10b981",
                    secondary: "#fff",
                  },
                  style: {
                    background: "#f0fdf4",
                    color: "#065f46",
                    border: "1px solid #bbf7d0",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#fff",
                  },
                  style: {
                    background: "#fef2f2",
                    color: "#991b1b",
                    border: "1px solid #fecaca",
                  },
                },
              }}
              containerStyle={{
                top: 20,
                right: 20,
              }}
            />
          </div>
        </Router>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
