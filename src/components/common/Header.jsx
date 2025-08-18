import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
 feat/logout-confirmation-modal
import PropTypes from "prop-types";

const ConfirmationModal = ({ onClose, onConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform scale-95 transition-transform duration-300">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Confirm Logout</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Are you sure you want to log out?
                </p>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

ConfirmationModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};
import NotificationDropdown from "../NotificationDropdown";
 main

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to login page after successful logout
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Even if logout fails, redirect to login
      navigate("/login");
    }
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
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <h1 className="text-2xl font-bold text-primary">CareSync</h1>
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
            
            <NotificationDropdown />

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
                onClick={() => setIsLogoutModalOpen(true)}
                className="ml-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-red-950/30"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isLogoutModalOpen && (
                <ConfirmationModal
                    onClose={() => setIsLogoutModalOpen(false)}
                    onConfirm={handleLogout}
                />
            )}
    </header>
  );
};

export default Header;
