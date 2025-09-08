import { useEffect, useRef, useCallback } from 'react';
import { measureComponentRender, measureRouteChange, reportCustomMetric } from '../utils/performance';

/**
 * Hook for monitoring component performance
 */
export const usePerformanceMetrics = (componentName) => {
  const renderCountRef = useRef(0);
  const mountTimeRef = useRef(null);

  useEffect(() => {
    mountTimeRef.current = performance.now();
    renderCountRef.current++;

    // Report component mount
    reportCustomMetric(`component.mount.${componentName}`, {
      timestamp: Date.now()
    });

    return () => {
      const unmountTime = performance.now();
      const lifespan = unmountTime - mountTimeRef.current;
      
      // Report component unmount and lifespan
      reportCustomMetric(`component.unmount.${componentName}`, {
        lifespan,
        renderCount: renderCountRef.current,
        timestamp: Date.now()
      });
    };
  }, [componentName]);

  const measureRender = useCallback((renderFn) => {
    return measureComponentRender(componentName, renderFn);
  }, [componentName]);

  const measureOperation = useCallback((operationName, operationFn) => {
    const startTime = performance.now();
    const result = operationFn();
    const duration = performance.now() - startTime;

    reportCustomMetric(`operation.${componentName}.${operationName}`, {
      value: duration,
      timestamp: Date.now()
    });

    return result;
  }, [componentName]);

  return {
    measureRender,
    measureOperation,
    renderCount: renderCountRef.current
  };
};

/**
 * Hook for monitoring route changes and navigation performance
 */
export const useRoutePerformance = (routeName) => {
  const routeTimerRef = useRef(null);

  useEffect(() => {
    // Start measuring route change
    routeTimerRef.current = measureRouteChange(routeName);

    return () => {
      // Complete route change measurement
      if (routeTimerRef.current) {
        routeTimerRef.current.complete();
      }
    };
  }, [routeName]);

  return {
    completeRouteChange: () => {
      if (routeTimerRef.current) {
        routeTimerRef.current.complete();
        routeTimerRef.current = null;
      }
    }
  };
};

/**
 * Hook for monitoring API call performance
 */
export const useAPIPerformance = () => {
  const measureAPICall = useCallback(async (apiName, apiCall) => {
    const startTime = performance.now();
    
    try {
      const result = await apiCall();
      const duration = performance.now() - startTime;
      
      reportCustomMetric(`api.${apiName}`, {
        value: duration,
        status: 'success',
        timestamp: Date.now()
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - startTime;
      
      reportCustomMetric(`api.${apiName}`, {
        value: duration,
        status: 'error',
        error: error.message,
        timestamp: Date.now()
      });
      
      throw error;
    }
  }, []);

  return { measureAPICall };
};

/**
 * Hook for monitoring user interactions
 */
export const useInteractionPerformance = () => {
  const measureInteraction = useCallback((interactionName, interactionFn) => {
    const startTime = performance.now();
    
    return (...args) => {
      const result = interactionFn(...args);
      const duration = performance.now() - startTime;
      
      reportCustomMetric(`interaction.${interactionName}`, {
        value: duration,
        timestamp: Date.now()
      });
      
      return result;
    };
  }, []);

  const measureAsyncInteraction = useCallback((interactionName, asyncFn) => {
    return async (...args) => {
      const startTime = performance.now();
      
      try {
        const result = await asyncFn(...args);
        const duration = performance.now() - startTime;
        
        reportCustomMetric(`interaction.${interactionName}`, {
          value: duration,
          status: 'success',
          timestamp: Date.now()
        });
        
        return result;
      } catch (error) {
        const duration = performance.now() - startTime;
        
        reportCustomMetric(`interaction.${interactionName}`, {
          value: duration,
          status: 'error',
          timestamp: Date.now()
        });
        
        throw error;
      }
    };
  }, []);

  return {
    measureInteraction,
    measureAsyncInteraction
  };
};

/**
 * Hook for monitoring memory usage
 */
export const useMemoryMonitoring = (intervalMs = 30000) => {
  useEffect(() => {
    if (!('memory' in performance)) {
      return; // Memory API not supported
    }

    const measureMemory = () => {
      const memInfo = performance.memory;
      
      reportCustomMetric('memory.usage', {
        usedJSHeapSize: memInfo.usedJSHeapSize,
        totalJSHeapSize: memInfo.totalJSHeapSize,
        jsHeapSizeLimit: memInfo.jsHeapSizeLimit,
        timestamp: Date.now()
      });

      // Warn if memory usage is high
      const usagePercentage = (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100;
      if (usagePercentage > 80) {
        console.warn(`High memory usage: ${usagePercentage.toFixed(2)}%`);
      }
    };

    // Initial measurement
    measureMemory();

    // Set up interval
    const interval = setInterval(measureMemory, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);
};

/**
 * Hook for monitoring bundle load performance
 */
export const useBundlePerformance = () => {
  useEffect(() => {
    // Monitor resource loading for JS bundles
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.name.includes('.js') && entry.name.includes('assets')) {
            reportCustomMetric('bundle.load', {
              name: entry.name,
              duration: entry.duration,
              transferSize: entry.transferSize,
              timestamp: Date.now()
            });
          }
        });
      });

      observer.observe({ entryTypes: ['resource'] });

      return () => observer.disconnect();
    }
  }, []);
};
