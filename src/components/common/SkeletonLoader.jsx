import React from 'react';

const SkeletonLoader = ({ className = '', variant = 'default' }) => {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';

  const variants = {
    default: '',
    text: 'h-4',
    title: 'h-6',
    avatar: 'h-10 w-10 rounded-full',
    card: 'h-32',
    button: 'h-10 w-24',
    input: 'h-12',
  };

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
};

// Specific skeleton components for common use cases
export const SkeletonText = ({ lines = 1, className = '' }) => (
  <div className={`space-y-2 ${className}`}>
    {Array.from({ length: lines }).map((_, index) => (
      <SkeletonLoader
        key={index}
        variant="text"
        className={index === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div className={`p-6 border border-gray-200 dark:border-gray-700 rounded-lg ${className}`}>
    <div className="flex items-center space-x-4 mb-4">
      <SkeletonLoader variant="avatar" />
      <div className="flex-1 space-y-2">
        <SkeletonLoader variant="title" className="w-1/2" />
        <SkeletonLoader variant="text" className="w-1/3" />
      </div>
    </div>
    <div className="space-y-3">
      <SkeletonLoader variant="text" className="w-full" />
      <SkeletonLoader variant="text" className="w-4/5" />
      <SkeletonLoader variant="text" className="w-2/3" />
    </div>
  </div>
);

export const SkeletonStats = ({ count = 4, className = '' }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}>
    {Array.from({ length: count }).map((_, index) => (
      <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <SkeletonLoader variant="avatar" className="mr-4" />
          <div className="flex-1 space-y-2">
            <SkeletonLoader variant="text" className="w-3/4" />
            <SkeletonLoader variant="title" className="w-1/2" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5, columns = 4, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    {/* Table Header */}
    <div className="flex space-x-4 pb-2 border-b border-gray-200 dark:border-gray-700">
      {Array.from({ length: columns }).map((_, index) => (
        <SkeletonLoader key={index} variant="text" className="flex-1" />
      ))}
    </div>
    {/* Table Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="flex space-x-4 py-3">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <SkeletonLoader
            key={colIndex}
            variant="text"
            className={`flex-1 ${colIndex === columns - 1 ? 'w-1/2' : ''}`}
          />
        ))}
      </div>
    ))}
  </div>
);

export default SkeletonLoader;
