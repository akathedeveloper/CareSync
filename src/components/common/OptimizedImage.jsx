import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { reportCustomMetric } from '../../utils/performance';

/**
 * OptimizedImage component with lazy loading, WebP support, and responsive loading
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  sizes,
  priority = false,
  loading = 'lazy',
  placeholder = null,
  fallback = null,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : null);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  // Generate WebP source if supported
  const webpSrc = src && src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const isWebPSupported = useWebPSupport();

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setImageSrc(src);
          observerRef.current?.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [src, priority, isInView]);

  const handleLoad = (event) => {
    const loadTime = performance.now();
    setIsLoaded(true);
    
    // Report image loading performance
    reportCustomMetric('image.load', {
      src: src,
      loadTime,
      size: event.target.naturalWidth * event.target.naturalHeight,
      timestamp: Date.now()
    });

    onLoad?.(event);
  };

  const handleError = (event) => {
    setHasError(true);
    
    // Report image loading error
    reportCustomMetric('image.error', {
      src: src,
      timestamp: Date.now()
    });

    onError?.(event);
  };

  // Generate responsive srcSet if sizes are provided
  const generateSrcSet = () => {
    if (!sizes || !src) return undefined;
    
    const extension = src.split('.').pop();
    const baseName = src.replace(`.${extension}`, '');
    
    return sizes.map(size => 
      `${baseName}_${size}.${extension} ${size}w`
    ).join(', ');
  };

  const shouldShowImage = isInView || priority;
  const actualSrc = isWebPSupported && webpSrc ? webpSrc : imageSrc;

  if (hasError && fallback) {
    return fallback;
  }

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder while loading */}
      {!isLoaded && placeholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          {placeholder}
        </div>
      )}

      {/* Blur placeholder */}
      {!isLoaded && !placeholder && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse" />
      )}

      {/* Main image */}
      {shouldShowImage && (
        <picture>
          {/* WebP source for supporting browsers */}
          {webpSrc && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          
          <img
            src={actualSrc}
            alt={alt}
            width={width}
            height={height}
            loading={loading}
            srcSet={generateSrcSet()}
            sizes={sizes ? sizes.join(', ') : undefined}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      )}

      {/* Error state */}
      {hasError && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <div className="text-2xl mb-2">🖼️</div>
            <div className="text-sm">Image failed to load</div>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook to check WebP support
function useWebPSupport() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, 1, 1);
      
      const dataURL = canvas.toDataURL('image/webp');
      setIsSupported(dataURL.indexOf('data:image/webp') === 0);
    };

    checkWebPSupport();
  }, []);

  return isSupported;
}

/**
 * Avatar component with optimized loading
 */
export const OptimizedAvatar = ({ 
  src, 
  alt, 
  size = 'md', 
  fallbackText = '',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
    xl: 'w-24 h-24 text-lg',
  };

  const fallback = (
    <div className={`flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium ${sizeClasses[size]} rounded-full`}>
      {fallbackText.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      fallback={fallback}
      priority={size === 'sm'} // Prioritize small avatars as they're often critical
      {...props}
    />
  );
};

/**
 * Hero image component with optimized loading
 */
export const OptimizedHeroImage = ({ 
  src, 
  alt, 
  className = '',
  overlay = false,
  children,
  ...props 
}) => {
  const placeholder = (
    <div className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 animate-pulse" />
  );

  return (
    <div className={`relative ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        placeholder={placeholder}
        priority={true} // Hero images are critical
        sizes={['640', '768', '1024', '1280', '1536']}
        {...props}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      )}
      
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sizes: PropTypes.arrayOf(PropTypes.string),
  priority: PropTypes.bool,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  placeholder: PropTypes.node,
  fallback: PropTypes.node,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

export default OptimizedImage;
