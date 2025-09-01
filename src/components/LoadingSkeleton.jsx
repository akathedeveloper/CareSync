import React from "react";

const LoadingSkeleton = ({ width = "100%", height = "20px", count = 1 }) => {
  const skeletons = Array.from({ length: count });

  return (
    <div className="animate-pulse space-y-2">
      {skeletons.map((_, index) => (
        <div
          key={index}
          style={{ width, height }}
          className="bg-gray-300 rounded-md"
        ></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;