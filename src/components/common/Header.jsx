import React from "react";
import { Link } from "react-router-dom";
import {
  BellIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
  };

  const getRoleDisplay = (role) => {
    switch (role) {
      case "patient":
        return "👤 Patient";
      case "doctor":
        return "👩‍⚕️ Doctor";
      case "pharmacist":
        return "💊 Pharmacist";
      default:
        return role;
    }
  };

  const displayName = user?.name || user?.displayName || user?.email || "User";

  return (
    <header className="bg-surface border-subtle border-b shadow-sm">
      <div className="px-6 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">
              CareSync
            </h1>
            <span className="ml-2 px-2 py-1 bg-primary-100/80 text-primary-800 text-xs rounded-full dark:bg-primary-900/30 dark:text-primary-200">
              Beta
            </span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
              aria-label="Toggle dark mode"
            >
              {isDark ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 relative dark:text-gray-300 dark:hover:text-white">
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>

            <div className="flex items-center space-x-2">
              <Link
                to="/dashboard/profile"
                className="flex items-center space-x-2 hover:bg-gray-100 rounded-md p-2 dark:hover:bg-gray-800"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {displayName}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {getRoleDisplay(user?.role)}
                  </p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-red-950/30"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
