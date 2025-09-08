import { createLazyComponents, preloadComponent } from '../../utils/loadable.jsx';

/**
 * Lazy-loaded route components for optimal code splitting
 * Each route is loaded only when needed, reducing initial bundle size
 */

// Public Pages
export const LazyLandingPage = createLazyComponents({
  LandingPage: () => import('../../pages/LandingPage'),
}).LandingPage;

export const LazyContactPage = createLazyComponents({
  ContactPage: () => import('../../pages/ContactPage'),
}).ContactPage;

export const LazyAboutPage = createLazyComponents({
  AboutPage: () => import('../../pages/AboutPage'),
}).AboutPage;

export const LazyBlog = createLazyComponents({
  Blog: () => import('../../pages/Blog'),
}).Blog;

export const LazyCareer = createLazyComponents({
  Career: () => import('../../pages/Career1'),
}).Career;

export const LazyFeature = createLazyComponents({
  Feature: () => import('../../pages/Feature'),
}).Feature;

// Policy and Legal Pages
export const LazyPrivacyPolicy = createLazyComponents({
  PrivacyPolicy: () => import('../../pages/privacy'),
}).PrivacyPolicy;

export const LazyCookiePolicy = createLazyComponents({
  CookiePolicy: () => import('../../pages/Policy'),
}).CookiePolicy;

export const LazyGDPRCompliance = createLazyComponents({
  GDPRCompliance: () => import('../../pages/GDPRCompliance'),
}).GDPRCompliance;

export const LazyTermsOfServices = createLazyComponents({
  TermsOfServices: () => import('../../pages/TermsOfServices'),
}).TermsOfServices;

export const LazyLicensePage = createLazyComponents({
  LicensePage: () => import('../../pages/License'),
}).LicensePage;

export const LazyContributors = createLazyComponents({
  Contributors: () => import('../common/Contributor'),
}).Contributors;

// Auth Pages
export const LazyLogin = createLazyComponents({
  Login: () => import('../../pages/auth/Login'),
}).Login;

export const LazyRegister = createLazyComponents({
  Register: () => import('../../pages/auth/Register'),
}).Register;

export const LazyForgotPassword = createLazyComponents({
  ForgotPassword: () => import('../../pages/auth/ForgotPassword'),
}).ForgotPassword;

// Dashboard Components
export const LazyPatientDashboard = createLazyComponents({
  PatientDashboard: () => import('../patient/PatientDashboard'),
}).PatientDashboard;

export const LazyDoctorDashboard = createLazyComponents({
  DoctorDashboard: () => import('../doctor/DoctorDashboard'),
}).DoctorDashboard;

export const LazyPharmacistDashboard = createLazyComponents({
  PharmacistDashboard: () => import('../pharmacist/PharmacistDashboard'),
}).PharmacistDashboard;

// Patient Components
export const LazyPrescriptions = createLazyComponents({
  Prescriptions: () => import('../patient/Prescriptions'),
}).Prescriptions;

export const LazyAppointments = createLazyComponents({
  Appointments: () => import('../patient/Appointments'),
}).Appointments;

export const LazyHealthLogs = createLazyComponents({
  HealthLogs: () => import('../patient/HealthLogs'),
}).HealthLogs;

export const LazyInventory = createLazyComponents({
  Inventory: () => import('../patient/Inventory'),
}).Inventory;

// Doctor Components
export const LazySchedule = createLazyComponents({
  Schedule: () => import('../doctor/Schedule'),
}).Schedule;

export const LazyPatients = createLazyComponents({
  Patients: () => import('../doctor/Patients'),
}).Patients;

// Pharmacist Components
export const LazyPharmacistPrescriptions = createLazyComponents({
  PharmacistPrescriptions: () => import('../pharmacist/Prescriptions'),
}).PharmacistPrescriptions;

export const LazyPharmacistInventory = createLazyComponents({
  PharmacistInventory: () => import('../pharmacist/Inventory'),
}).PharmacistInventory;

// Shared Components
export const LazyMessages = createLazyComponents({
  Messages: () => import('../common/Messages'),
}).Messages;

export const LazySettings = createLazyComponents({
  Settings: () => import('../common/Settings'),
}).Settings;

export const LazyProfilePage = createLazyComponents({
  ProfilePage: () => import('../../pages/ProfilePage'),
}).ProfilePage;

export const LazyNotifications = createLazyComponents({
  Notifications: () => import('../../pages/Notifications'),
}).Notifications;

export const LazyLayout = createLazyComponents({
  Layout: () => import('../common/Layout'),
}).Layout;

/**
 * Preload critical route components
 * These are components that are likely to be needed soon
 */
export const preloadCriticalRoutes = () => {
  // Preload auth components as they are commonly accessed
  preloadComponent(() => import('../../pages/auth/Login'));
  preloadComponent(() => import('../../pages/auth/Register'));
  
  // Preload layout component as it's used by all authenticated routes
  preloadComponent(() => import('../common/Layout'));
};

/**
 * Preload user-specific routes based on role
 * @param {string} userRole - The role of the authenticated user
 */
export const preloadUserRoutes = (userRole) => {
  switch (userRole) {
    case 'patient':
      preloadComponent(() => import('../patient/PatientDashboard'));
      preloadComponent(() => import('../patient/Appointments'));
      preloadComponent(() => import('../patient/Prescriptions'));
      break;
    case 'doctor':
      preloadComponent(() => import('../doctor/DoctorDashboard'));
      preloadComponent(() => import('../doctor/Schedule'));
      preloadComponent(() => import('../doctor/Patients'));
      break;
    case 'pharmacist':
      preloadComponent(() => import('../pharmacist/PharmacistDashboard'));
      preloadComponent(() => import('../pharmacist/Prescriptions'));
      preloadComponent(() => import('../pharmacist/Inventory'));
      break;
    default:
      console.warn('Unknown user role for preloading:', userRole);
  }
  
  // Always preload common components
  preloadComponent(() => import('../common/Messages'));
  preloadComponent(() => import('../common/Settings'));
  preloadComponent(() => import('../../pages/ProfilePage'));
};
