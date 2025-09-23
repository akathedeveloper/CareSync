// src/components/common/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Skip link for screen readers and keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only absolute top-2 left-2 bg-primary text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      <Header />
      <div className="flex">
        <Sidebar />
        <main
          id="main-content"
          className="flex-1 p-6 bg-white dark:bg-gray-900 focus:outline-none"
          tabIndex={-1} // allow programmatic focus when skipping
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
