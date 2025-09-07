import React, { createContext, useState, useContext, useEffect } from 'react';

const OfflineContext = createContext();

export const useOffline = () => {
  return useContext(OfflineContext);
};

const OfflineProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedActions, setQueuedActions] = useState(() => {
    try {
      const stored = localStorage.getItem('queuedActions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error parsing queued actions from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncQueuedActions();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('queuedActions', JSON.stringify(queuedActions));
    } catch (error) {
      console.error("Error saving queued actions to localStorage", error);
    }
  }, [queuedActions]);

  const queueAction = (action) => {
    const queuedAction = {
      id: `action${Date.now()}`,
      ...action,
      timestamp: new Date().toISOString(),
    };
    setQueuedActions(prev => [...prev, queuedAction]);
  };

  const syncQueuedActions = (syncedActionIds = []) => {
    if (!isOnline || queuedActions.length === 0) return;

    // If specific action IDs are provided, only remove those
    if (syncedActionIds.length > 0) {
      setQueuedActions(prev => prev.filter(action => !syncedActionIds.includes(action.id)));
      return;
    }

    // Otherwise, sync all actions
    const actionsToSync = [...queuedActions];
    const syncedIds = [];
    const failedActions = [];

    for (const action of actionsToSync) {
      try {
        if (action.type === 'bookAppointment') {
          // In a real implementation, you would call the API here
          // For demo purposes, we'll simulate the booking by logging it
          console.log('Syncing appointment booking:', action.data);
          syncedIds.push(action.id);
        } else {
          console.log('Syncing action:', action);
          syncedIds.push(action.id);
        }
      } catch (error) {
        console.error('Failed to sync action:', action, error);
        failedActions.push(action);
      }
    }

    // Update the queue to only contain failed actions
    setQueuedActions(failedActions);
  };

  const removeQueuedAction = (id) => {
    setQueuedActions(prev => prev.filter(action => action.id !== id));
  };

  const value = {
    isOnline,
    queuedActions,
    queueAction,
    syncQueuedActions,
    removeQueuedAction,
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
};

export { OfflineProvider };
