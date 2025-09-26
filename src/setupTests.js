import React, { useState, useEffect } from 'react';

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(() => {
    try {
      return !navigator.onLine;
    } catch (error) {
      console.error("Error accessing navigator.onLine:", error);
      return false;
    }
  });

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    try {
      window.addEventListener('offline', handleOffline);
      window.addEventListener('online', handleOnline);
    } catch (error) {
      console.error("Error adding online/offline event listeners:", error);
    }

    return () => {
      try {
        window.removeEventListener('offline', handleOffline);
        window.removeEventListener('online', handleOnline);
      } catch (error) {
        console.error("Error removing online/offline event listeners:", error);
      }
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '1rem',
        backgroundColor: '#ffc107',
        color: '#000',
        textAlign: 'center',
        zIndex: 1000,
        transition: 'transform 0.3s ease-in-out',
        transform: isOffline ? 'translateY(0)' : 'translateY(100%)',
      }}
    >
      You are currently offline. Some features may not be available.
    </div>
  );
};

export default OfflineBanner;
