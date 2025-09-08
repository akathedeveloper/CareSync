import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Performance monitoring utilities for CareSync
 * Tracks Core Web Vitals and custom performance metrics
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
    this.isEnabled = this.shouldEnableMonitoring();
    
    if (this.isEnabled) {
      this.initializeWebVitals();
      this.initializeCustomMetrics();
    }
  }

  shouldEnableMonitoring() {
    // Only enable in production or when specifically requested
    return process.env.NODE_ENV === 'production' || 
           localStorage.getItem('enablePerformanceMonitoring') === 'true';
  }

  initializeWebVitals() {
    // Core Web Vitals monitoring
    onCLS(this.onVital.bind(this));
    onINP(this.onVital.bind(this)); // Interaction to Next Paint (replaces FID)
    onFCP(this.onVital.bind(this));
    onLCP(this.onVital.bind(this));
    onTTFB(this.onVital.bind(this));
  }

  onVital(metric) {
    this.metrics.set(metric.name, metric);
    this.reportMetric(metric);
    
    // Log performance issues
    if (this.isMetricPoor(metric)) {
      console.warn(`Poor ${metric.name} performance:`, metric);
    }
  }

  isMetricPoor(metric) {
    const thresholds = {
      CLS: 0.25,  // Cumulative Layout Shift
      INP: 500,   // Interaction to Next Paint (ms)
      FCP: 3000,  // First Contentful Paint (ms)
      LCP: 4000,  // Largest Contentful Paint (ms)
      TTFB: 800   // Time to First Byte (ms)
    };
    
    return metric.value > (thresholds[metric.name] || Infinity);
  }

  initializeCustomMetrics() {
    // Monitor resource loading
    this.observeResourceTiming();
    
    // Monitor long tasks
    this.observeLongTasks();
    
    // Monitor navigation timing
    this.observeNavigationTiming();
  }

  observeResourceTiming() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.transferSize > 1024 * 1024) { // > 1MB
            console.warn('Large resource detected:', {
              name: entry.name,
              size: entry.transferSize,
              duration: entry.duration
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
      this.observers.push(observer);
    }
  }

  observeLongTasks() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          console.warn('Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime
          });
          
          this.reportCustomMetric('longTask', {
            duration: entry.duration,
            timestamp: Date.now()
          });
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      this.observers.push(observer);
    }
  }

  observeNavigationTiming() {
    if (window.performance && window.performance.navigation) {
      const navigation = performance.getEntriesByType('navigation')[0];
      if (navigation) {
        const metrics = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart
        };
        
        Object.entries(metrics).forEach(([name, value]) => {
          this.reportCustomMetric(`navigation.${name}`, { value, timestamp: Date.now() });
        });
      }
    }
  }

  reportMetric(metric) {
    // Report to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 ${metric.name}: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`);
    }

    // Report to analytics service (placeholder)
    this.sendToAnalytics('web-vital', metric);
  }

  reportCustomMetric(name, data) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📈 Custom metric ${name}:`, data);
    }

    this.sendToAnalytics('custom-metric', { name, ...data });
  }

  sendToAnalytics(type, data) {
    // Send to Google Analytics if available
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        event_category: 'Performance',
        event_label: type,
        custom_parameter_1: data.name || type,
        value: Math.round(data.value || 0),
      });
    }

    // Send to custom analytics endpoint
    if (this.analyticsEndpoint) {
      fetch(this.analyticsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, data, timestamp: Date.now() })
      }).catch(error => {
        console.warn('Failed to send analytics:', error);
      });
    }
  }

  // Monitor specific component render times
  measureComponentRender(componentName, renderFn) {
    if (!this.isEnabled) return renderFn();

    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();
    const duration = endTime - startTime;

    this.reportCustomMetric(`component.${componentName}`, {
      value: duration,
      timestamp: Date.now()
    });

    if (duration > 16) { // > 1 frame at 60fps
      console.warn(`Slow component render: ${componentName} took ${duration.toFixed(2)}ms`);
    }

    return result;
  }

  // Monitor route changes
  measureRouteChange(routeName) {
    if (!this.isEnabled) return;

    const startTime = performance.now();
    
    return {
      complete: () => {
        const duration = performance.now() - startTime;
        this.reportCustomMetric(`route.${routeName}`, {
          value: duration,
          timestamp: Date.now()
        });
      }
    };
  }

  // Get performance summary
  getSummary() {
    const summary = {
      webVitals: {},
      customMetrics: {},
      timestamp: Date.now()
    };

    // Web Vitals
    this.metrics.forEach((metric, name) => {
      summary.webVitals[name] = {
        value: metric.value,
        rating: this.getMetricRating(metric)
      };
    });

    return summary;
  }

  getMetricRating(metric) {
    const goodThresholds = {
      CLS: 0.1,
      INP: 200,
      FCP: 1800,
      LCP: 2500,
      TTFB: 800
    };

    const poorThresholds = {
      CLS: 0.25,
      INP: 500,
      FCP: 3000,
      LCP: 4000,
      TTFB: 1800
    };

    const good = goodThresholds[metric.name];
    const poor = poorThresholds[metric.name];

    if (good && metric.value <= good) return 'good';
    if (poor && metric.value >= poor) return 'poor';
    return 'needs-improvement';
  }

  // Clean up observers
  destroy() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Singleton instance
const performanceMonitor = new PerformanceMonitor();

// Export utilities
export default performanceMonitor;

export const measureComponentRender = (componentName, renderFn) => 
  performanceMonitor.measureComponentRender(componentName, renderFn);

export const measureRouteChange = (routeName) => 
  performanceMonitor.measureRouteChange(routeName);

export const getPerformanceSummary = () => 
  performanceMonitor.getSummary();

export const reportCustomMetric = (name, data) => 
  performanceMonitor.reportCustomMetric(name, data);

// Helper to measure async operations
export const measureAsync = async (name, asyncFn) => {
  const startTime = performance.now();
  try {
    const result = await asyncFn();
    const duration = performance.now() - startTime;
    reportCustomMetric(`async.${name}`, { value: duration, status: 'success' });
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    reportCustomMetric(`async.${name}`, { value: duration, status: 'error' });
    throw error;
  }
};

// Initialize performance monitoring
export const initializePerformanceMonitoring = () => {
  console.log('🚀 Performance monitoring initialized');
  return performanceMonitor;
};
