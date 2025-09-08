import { lazy } from 'react';

/**
 * Enhanced lazy loading utility with retry functionality
 * and better error handling for code splitting
 */

// Retry function for failed lazy loading
const retryImport = (fn, retriesLeft = 3, interval = 1000) => {
  return new Promise((resolve, reject) => {
    fn()
      .then(resolve)
      .catch((error) => {
        console.warn(`Failed to load component, retries left: ${retriesLeft}`, error);
        
        if (retriesLeft === 0) {
          reject(error);
          return;
        }

        setTimeout(() => {
          retryImport(fn, retriesLeft - 1, interval).then(resolve, reject);
        }, interval);
      });
  });
};

/**
 * Creates a lazy component with retry functionality
 * @param {Function} importFn - Dynamic import function
 * @param {Object} options - Configuration options
 * @returns {React.LazyExoticComponent}
 */
export const createLazyComponent = (importFn, options = {}) => {
  const {
    retries = 3,
    retryInterval = 1000,
    componentName = 'LazyComponent',
  } = options;

  return lazy(() => 
    retryImport(importFn, retries, retryInterval)
      .catch((error) => {
        console.error(`Failed to load ${componentName} after ${retries} retries:`, error);
        // Return a fallback component for catastrophic failures
        return {
          default: () => (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
              <div className="text-center p-8">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                  <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Component Unavailable
                  </h2>
                  <p className="text-yellow-600 dark:text-yellow-300 mb-4">
                    The {componentName} component could not be loaded. This might be due to a network issue.
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )
        };
      })
  );
};

/**
 * Preload a lazy component
 * @param {Function} importFn - Dynamic import function
 */
export const preloadComponent = (importFn) => {
  const componentImport = importFn();
  if (componentImport && typeof componentImport.then === 'function') {
    componentImport.catch(error => {
      console.warn('Failed to preload component:', error);
    });
  }
  return componentImport;
};

/**
 * Create multiple lazy components at once
 * @param {Object} components - Object with component names as keys and import functions as values
 * @returns {Object} Object with lazy components
 */
export const createLazyComponents = (components) => {
  const lazyComponents = {};
  
  Object.entries(components).forEach(([name, importFn]) => {
    lazyComponents[name] = createLazyComponent(importFn, { componentName: name });
  });
  
  return lazyComponents;
};

// Utility to check if browser supports dynamic imports
export const supportsDynamicImport = () => {
  try {
    new Function('import("")');
    return true;
  } catch (error) {
    return false;
  }
};

// Performance monitoring for lazy loading
export const measureLazyLoadTime = (componentName) => {
  const startTime = performance.now();
  
  return {
    start: startTime,
    end: () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      
      console.log(`${componentName} lazy load time: ${loadTime.toFixed(2)}ms`);
      
      // Report to analytics if available
      if (window.gtag) {
        window.gtag('event', 'component_load_time', {
          event_category: 'Performance',
          event_label: componentName,
          value: Math.round(loadTime),
        });
      }
      
      return loadTime;
    }
  };
};
