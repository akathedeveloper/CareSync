import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
  QuestionMarkCircleIcon,
  WifiIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useOffline } from "../../contexts/OfflineContext";
import PropTypes from "prop-types";
import NotificationDropdown from "../NotificationDropdown";

const ConfirmationModal = ({ onClose, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
    >
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-4 transform scale-95 transition-transform duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3
            id="logout-title"
            className="text-xl font-bold text-gray-900 dark:text-gray-100"
          >
            Confirm Logout
          </h3>
          <button
            onClick={onClose}
            aria-label="Close logout confirmation"
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-400"
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
            aria-label="Cancel logout"
            className="px-6 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            aria-label="Confirm logout"
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-red-400"
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

const Header = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { isOnline, queuedActions } = useOffline();
  const navigate = useNavigate();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
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

  const displayName =
    user?.name || user?.displayName || user?.email || "User";

  return (

<>

  <header className="bg-surface border-subtle border-b shadow-sm">

    <div className="px-6 py-2">

      <div className="flex justify-between items-center">

        {/* Logo button for homepage */}

        <button

          onClick={() => navigate("/")}

          aria-label="Go to homepage"

          className="flex items-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-400 rounded-md"

          tabIndex={0}

        >

          <h1 className="text-2xl font-bold text-primary">CareSync</h1>

          <span className="ml-2 px-2 py-1 bg-primary-100/80 text-primary-800 text-xs rounded-full dark:bg-primary-900/30 dark:text-primary-200">

            Beta

          </span>

        </button>

        <div className="flex items-center space-x-2 sm:space-x-4">

          {!isOnline && (

            <div

              className="flex items-center space-x-2 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-lg"

              tabIndex={0}

            >

              <ExclamationTriangleIcon className="h-5 w-5" />

              <span className="text-sm font-medium">Offline</span>

              {queuedActions.length > 0 && (

                <span className="text-xs bg-red-200 dark:bg-red-800 px-2 py-1 rounded-full">

                  {queuedActions.length} queued

                </span>

              )}

            </div>

          )}

          {/* Theme toggle button */}

          <button

            onClick={toggleTheme}

            className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400"

            title={isDark ? "Switch to light mode" : "Switch to dark mode"}

            aria-label="Toggle dark mode"

            tabIndex={0}

          >

            {isDark ? (

              <SunIcon className="h-6 w-6" />

            ) : (

              <MoonIcon className="h-6 w-6" />

            )}

          </button>

          {/* Profile button */}

          <Link

            to="/dashboard/profile"

            aria-label="Go to profile"

            className="flex items-center space-x-2 hover:bg-gray-100 rounded-md p-2 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-400"

            tabIndex={0}

          >

            <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-300" />

            <div className="text-sm text-left">

              <p className="font-medium text-gray-900 dark:text-gray-100">

                {displayName}

              </p>

              <p className="text-gray-500 dark:text-gray-400">

                {getRoleDisplay(user?.role)}

              </p>

            </div>

          </Link>

          {/* Logout button */}

          <button

            onClick={() => setIsLogoutModalOpen(true)}

            aria-label="Logout"

            className="ml-2 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-red-950/30 focus:outline-none focus:ring-2 focus:ring-red-400"

            title="Logout"

            tabIndex={0}

          >

            Logout

          </button>

        </div>

      </div>

    </div>

  </header>

</>
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
      </header>

      {!isOnline && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-6 py-3">
          <div className="flex items-center justify-center space-x-2 text-yellow-800 dark:text-yellow-200">
            <WifiIcon className="h-5 w-5" />
            <span className="text-sm font-medium">
              You're currently offline. Your actions will be synced when connection is restored.
            </span>
            {queuedActions.length > 0 && (
              <span className="text-xs bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded-full">
                {queuedActions.length} action{queuedActions.length !== 1 ? 's' : ''} queued
              </span>
            )}
          </div>
        </div>
      )}

      {isLogoutModalOpen && (
        <ConfirmationModal
          onClose={() => setIsLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default Header;
