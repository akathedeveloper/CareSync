import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MessageProvider } from "./contexts/MessageContext";
import { AppointmentProvider } from "./contexts/AppointmentContext";
import { OfflineProvider } from "./contexts/OfflineContext";
import LoadingSpinner from "./components/common/LoadingSpinner";
import LazyWrapper from "./components/common/LazyWrapper";
import PerformanceMonitor from "./components/common/PerformanceMonitor";
import { Toaster } from "react-hot-toast";
import { initializePerformanceMonitoring } from "./utils/performance";
import { 
  usePerformanceMetrics, 
  useMemoryMonitoring, 
  useBundlePerformance 
} from "./hooks/usePerformanceMetrics";
import "./index.css";

// Lazy-loaded components
import {
  LazyLandingPage,
  LazyContactPage,
  LazyAboutPage,
  LazyBlog,
  LazyCareer,
  LazyFeature,
  LazyPrivacyPolicy,
  LazyCookiePolicy,
  LazyGDPRCompliance,
  LazyTermsOfServices,
  LazyLicensePage,
  LazyContributors,
  LazyLogin,
  LazyRegister,
  LazyForgotPassword,
  LazyPatientDashboard,
  LazyDoctorDashboard,
  LazyPharmacistDashboard,
  LazyPrescriptions,
  LazyAppointments,
  LazyHealthLogs,
  LazyInventory,
  LazySchedule,
  LazyPatients,
  LazyPharmacistPrescriptions,
  LazyPharmacistInventory,
  LazyMessages,
  LazySettings,
  LazyProfilePage,
  LazyNotifications,
  LazyLayout,
  preloadCriticalRoutes,
  preloadUserRoutes,
} from "./components/lazy/LazyRoutes";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole)
    return <Navigate to={`/${user.role}`} replace />;

  return children;
};

// Public Route Component
const PublicRoute = ({ children, authOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (user && authOnly) return <Navigate to={`/${user.role}`} replace />;
  return children;
};

// Main App Routes
const AppRoutes = () => {
  const { user, loading } = useAuth();

  // Preload routes based on user authentication
  useEffect(() => {
    preloadCriticalRoutes();
    
    if (user && user.role) {
      preloadUserRoutes(user.role);
    }
  }, [user]);

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
      <Route
        path="/"
        element={
          <LazyWrapper>
            <LazyLandingPage />
          </LazyWrapper>
        }
      />
      <Route 
        path="/contact" 
        element={
          <LazyWrapper>
            <LazyContactPage />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/cookie-policy" 
        element={
          <LazyWrapper>
            <LazyCookiePolicy />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/feature" 
        element={
          <LazyWrapper>
            <LazyFeature />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/privacy-policy" 
        element={
          <LazyWrapper>
            <LazyPrivacyPolicy />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/gdpr-compliance" 
        element={
          <LazyWrapper>
            <LazyGDPRCompliance />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/about" 
        element={
          <LazyWrapper>
            <LazyAboutPage />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/blog" 
        element={
          <LazyWrapper>
            <LazyBlog />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/career" 
        element={
          <LazyWrapper>
            <LazyCareer />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/terms" 
        element={
          <LazyWrapper>
            <LazyTermsOfServices />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/contributor" 
        element={
          <LazyWrapper>
            <LazyContributors />
          </LazyWrapper>
        } 
      />
      <Route 
        path="/license" 
        element={
          <LazyWrapper>
            <LazyLicensePage />
          </LazyWrapper>
        } 
      />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute authOnly={true}>
            <LazyWrapper>
              <LazyLogin />
            </LazyWrapper>
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute authOnly={true}>
            <LazyWrapper>
              <LazyRegister />
            </LazyWrapper>
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute authOnly={true}>
            <LazyWrapper>
              <LazyForgotPassword />
            </LazyWrapper>
          </PublicRoute>
        }
      />

      {/* Shared Authenticated Routes */}
      <Route
        element={
          <ProtectedRoute>
            <LazyWrapper>
              <LazyLayout />
            </LazyWrapper>
          </ProtectedRoute>
        }
      >
        <Route 
          path="/notifications" 
          element={
            <LazyWrapper>
              <LazyNotifications />
            </LazyWrapper>
          } 
        />
      </Route>

      {/* Patient Routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute requiredRole="patient">
            <LazyWrapper>
              <LazyLayout />
            </LazyWrapper>
          </ProtectedRoute>
        }
      >
        <Route 
          index 
          element={
            <LazyWrapper>
              <LazyPatientDashboard />
            </LazyWrapper>
          } 
        />
        <Route 
          path="prescriptions" 
          element={
            <LazyWrapper>
              <LazyPrescriptions />
            </LazyWrapper>
          } 
        />
        <Route 
          path="appointments" 
          element={
            <LazyWrapper>
              <LazyAppointments />
            </LazyWrapper>
          } 
        />
        <Route 
          path="health-logs" 
          element={
            <LazyWrapper>
              <LazyHealthLogs />
            </LazyWrapper>
          } 
        />
        <Route 
          path="messages" 
          element={
            <LazyWrapper>
              <LazyMessages />
            </LazyWrapper>
          } 
        />
        <Route 
          path="profile" 
          element={
            <LazyWrapper>
              <LazyProfilePage />
            </LazyWrapper>
          } 
        />
        <Route 
          path="settings" 
          element={
            <LazyWrapper>
              <LazySettings />
            </LazyWrapper>
          } 
        />
        <Route 
          path="inventory" 
          element={
            <LazyWrapper>
              <LazyInventory />
            </LazyWrapper>
          } 
        />
      </Route>

      {/* Doctor Routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute requiredRole="doctor">
            <LazyWrapper>
              <LazyLayout />
            </LazyWrapper>
          </ProtectedRoute>
        }
      >
        <Route 
          index 
          element={
            <LazyWrapper>
              <LazyDoctorDashboard />
            </LazyWrapper>
          } 
        />
        <Route 
          path="schedule" 
          element={
            <LazyWrapper>
              <LazySchedule />
            </LazyWrapper>
          } 
        />
        <Route 
          path="patients" 
          element={
            <LazyWrapper>
              <LazyPatients />
            </LazyWrapper>
          } 
        />
        <Route 
          path="messages" 
          element={
            <LazyWrapper>
              <LazyMessages />
            </LazyWrapper>
          } 
        />
        <Route 
          path="profile" 
          element={
            <LazyWrapper>
              <LazyProfilePage />
            </LazyWrapper>
          } 
        />
        <Route 
          path="settings" 
          element={
            <LazyWrapper>
              <LazySettings />
            </LazyWrapper>
          } 
        />
      </Route>

      {/* Pharmacist Routes */}
      <Route
        path="/pharmacist"
        element={
          <ProtectedRoute requiredRole="pharmacist">
            <LazyWrapper>
              <LazyLayout />
            </LazyWrapper>
          </ProtectedRoute>
        }
      >
        <Route 
          index 
          element={
            <LazyWrapper>
              <LazyPharmacistDashboard />
            </LazyWrapper>
          } 
        />
        <Route 
          path="messages" 
          element={
            <LazyWrapper>
              <LazyMessages />
            </LazyWrapper>
          } 
        />
        <Route 
          path="profile" 
          element={
            <LazyWrapper>
              <LazyProfilePage />
            </LazyWrapper>
          } 
        />
        <Route 
          path="settings" 
          element={
            <LazyWrapper>
              <LazySettings />
            </LazyWrapper>
          } 
        />
        <Route 
          path="prescriptions" 
          element={
            <LazyWrapper>
              <LazyPharmacistPrescriptions />
            </LazyWrapper>
          } 
        />
        <Route 
          path="inventory" 
          element={
            <LazyWrapper>
              <LazyPharmacistInventory />
            </LazyWrapper>
          } 
        />
      </Route>

      {/* Catch-All Redirect */}
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
  const { measureOperation } = usePerformanceMetrics('App');
  
  // Initialize performance monitoring
  useEffect(() => {
    measureOperation('initialize', () => {
      initializePerformanceMonitoring();
    });
  }, [measureOperation]);

  // Monitor memory usage
  useMemoryMonitoring();
  
  // Monitor bundle performance
  useBundlePerformance();

  useEffect(() => {
    if (
      "serviceWorker" in navigator &&
      window.location.hostname !== "localhost"
    ) {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => {
          console.log("Service Worker registered with scope: ", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker Registration failed: ", error);
        });
    }
  }, []);

  return (
    <AuthProvider>
      <AppointmentProvider>
        <OfflineProvider>
          <MessageProvider>
            <Router>
              <div className="App bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
                <AppRoutes />
                <PerformanceMonitor />
                <Toaster
                  position="bottom-right"
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
          </MessageProvider>
        </OfflineProvider>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
