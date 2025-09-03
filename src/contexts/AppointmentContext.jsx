import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  doctors,
  appointments as initialAppointments,
} from '../data/dummyData';
import { useOffline } from './OfflineContext';

const AppointmentContext = createContext();

export const useAppointments = () => {
  return useContext(AppointmentContext);
};

const AppointmentProvider = ({ children }) => {
  const { isOnline, queuedActions, syncQueuedActions } = useOffline();

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

  // Sync queued appointment actions when coming back online
  useEffect(() => {
    if (isOnline && queuedActions.length > 0) {
      const appointmentActions = queuedActions.filter(action => action.type === 'bookAppointment');
      if (appointmentActions.length > 0) {
        const syncedIds = [];
        appointmentActions.forEach(action => {
          try {
            bookAppointment(action.data);
            syncedIds.push(action.id);
          } catch (error) {
            console.error('Failed to sync appointment action:', action, error);
          }
        });
        // Clear the synced actions from the queue
        if (syncedIds.length > 0) {
          syncQueuedActions(syncedIds);
        }
      }
    }
  }, [isOnline, queuedActions, syncQueuedActions]);

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
