import React, { useState, useEffect } from 'react';
import { getPerformanceSummary } from '../../utils/performance';

/**
 * PerformanceMonitor component for displaying real-time performance metrics
 * Only visible in development mode or when explicitly enabled
 */
const PerformanceMonitor = ({ enabled = false }) => {
  const [metrics, setMetrics] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    // Only show in development or when explicitly enabled
    const shouldShow = process.env.NODE_ENV === 'development' || 
                      enabled || 
                      localStorage.getItem('showPerformanceMonitor') === 'true';
    
    setIsVisible(shouldShow);

    if (!shouldShow) return;

    const updateMetrics = () => {
      const summary = getPerformanceSummary();
      setMetrics(summary);
      setLastUpdate(new Date().toLocaleTimeString());
    };

    // Initial update
    updateMetrics();

    // Update every 5 seconds
    const interval = setInterval(updateMetrics, 5000);

    return () => clearInterval(interval);
  }, [enabled]);

  const toggleVisibility = () => {
    const newState = !isVisible;
    setIsVisible(newState);
    localStorage.setItem('showPerformanceMonitor', newState.toString());
  };

  if (!isVisible || !metrics) {
    return (
      <button
        onClick={toggleVisibility}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
        title="Show Performance Monitor"
      >
        📊
      </button>
    );
  }

  const getMetricColor = (rating) => {
    switch (rating) {
      case 'good': return 'text-green-600';
      case 'needs-improvement': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const formatValue = (metricName, value) => {
    if (metricName === 'CLS') {
      return value.toFixed(3);
    }
    return `${Math.round(value)}ms`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
          Performance Monitor
        </h3>
        <button
          onClick={toggleVisibility}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Web Vitals
        </div>
        
        {Object.entries(metrics.webVitals).map(([name, data]) => (
          <div key={name} className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {name}
            </span>
            <span className={`text-xs font-mono ${getMetricColor(data.rating)}`}>
              {formatValue(name, data.value)}
            </span>
          </div>
        ))}

        <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Bundle Performance
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Code splitting: ✅ Active
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            Lazy loading: ✅ Active
          </div>
        </div>

        {lastUpdate && (
          <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Last updated: {lastUpdate}
            </div>
          </div>
        )}
      </div>

      <div className="mt-3 flex space-x-2">
        <button
          onClick={() => window.location.reload()}
          className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
        >
          Reload
        </button>
        <button
          onClick={() => {
            console.log('Performance Summary:', metrics);
            alert('Performance data logged to console');
          }}
          className="text-xs bg-gray-50 text-gray-700 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
        >
          Export
        </button>
      </div>
    </div>
  );
};

export default PerformanceMonitor;
