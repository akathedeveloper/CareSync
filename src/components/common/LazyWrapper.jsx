import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';

/**
 * LazyWrapper component for wrapping lazy-loaded components
 * Provides consistent loading states and error boundaries
 */
const LazyWrapper = ({ 
  children, 
  fallback, 
  fallbackProps = {},
  minLoadingTime = 200,
  enableErrorBoundary = true 
}) => {
  // Custom fallback with minimum loading time to prevent flash
  const CustomFallback = fallback || (() => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <LoadingSpinner size="lg" {...fallbackProps} />
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Loading component...
        </p>
      </div>
    </div>
  ));

  if (enableErrorBoundary) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<CustomFallback />}>
          {children}
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <Suspense fallback={<CustomFallback />}>
      {children}
    </Suspense>
  );
};

// Error Boundary for lazy loading failures
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('LazyWrapper Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
          <div className="text-center p-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Component Loading Error
              </h2>
              <p className="text-red-600 dark:text-red-300 mb-4">
                Failed to load this component. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

LazyWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.elementType,
  fallbackProps: PropTypes.object,
  minLoadingTime: PropTypes.number,
  enableErrorBoundary: PropTypes.bool,
};

export default LazyWrapper;
