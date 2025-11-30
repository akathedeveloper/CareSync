import React, { useState, useEffect } from 'react';

const OfflineBanner = () => {
  const [isOffline, setIsOffline] = useState(() => {
    try { return !navigator.onLine; } catch { return false; }
  });

  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline) return null;
  return <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', padding: '1rem', backgroundColor: '#ffc107', color: '#000', textAlign: 'center', zIndex: 1000 }}>You are currently offline. Some features may not be available.</div>;
};

export default OfflineBanner;
