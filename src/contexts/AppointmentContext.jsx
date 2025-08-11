import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  doctors,
  appointments as initialAppointments,
} from '../data/dummyData';

const AppointmentContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentContext);
};

const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    try {
      const storedAppointments = localStorage.getItem('appointments');
      return storedAppointments ? JSON.parse(storedAppointments) : initialAppointments;
    } catch (error) {
      console.error("Error parsing appointments from localStorage", error);
      return initialAppointments;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('appointments', JSON.stringify(appointments));
    } catch (error) {
      console.error("Error saving appointments to localStorage", error);
    }
  }, [appointments]);

  const bookAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: `apt${Date.now()}`,
      status: 'Pending',
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const updateAppointmentStatus = (appointmentId, status) => {
    setAppointments(prev => 
      prev.map((apt) =>
        apt.id === appointmentId ? { ...apt, status } : apt
      )
    );
  };

  const cancelAppointment = (appointmentId) => {
    updateAppointmentStatus(appointmentId, 'Cancelled');
  };

  const value = {
    appointments,
    doctors,
    bookAppointment,
    updateAppointmentStatus,
    cancelAppointment,
  };

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};

export { AppointmentProvider };
