import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LandingPage from './pages/LandingPage'
import ContactPage from './pages/ContactPage'
import Layout from './components/common/Layout'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import PatientDashboard from './components/patient/PatientDashboard'
import DoctorDashboard from './components/doctor/DoctorDashboard'
import PharmacistDashboard from './components/pharmacist/PharmacistDashboard'
import LoadingSpinner from './components/common/LoadingSpinner'
import ProfilePage from './pages/ProfilePage'
import './index.css'
import Prescriptions from './components/patient/Prescriptions';
import { AppointmentProvider } from './contexts/AppointmentContext';
import Appointments from './components/patient/Appointments';
import Schedule from './components/doctor/Schedule';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }
  
  return user ? children : <Navigate to="/login" />
}

// Main App Routes
const AppRoutes = () => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="xl" />
          <p className="mt-4 text-gray-600">Loading CareSync...</p>
        </div>
      </div>
    )
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
      
      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to={`/${user?.role || 'login'}`} />} />
        <Route path="patient" element={<PatientDashboard />} />
        <Route path="doctor" element={<DoctorDashboard />} />
        <Route path="pharmacist" element={<PharmacistDashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="appointments" element={<Appointments />} />
        <Route path="schedule" element={<Schedule />} />
      </Route>
      
      {/* Role-specific routes */}
      <Route path="/patient" element={
        <ProtectedRoute>
          <Layout><PatientDashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/doctor" element={
        <ProtectedRoute>
          <Layout><DoctorDashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/pharmacist" element={
        <ProtectedRoute>
          <Layout><PharmacistDashboard /></Layout>
        </ProtectedRoute>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <Router>
          <div className="App">
            <AppRoutes />
          </div>
        </Router>
      </AppointmentProvider>
    </AuthProvider>
  )
}

export default App
