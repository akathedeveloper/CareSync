import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  ChatBubbleLeftRightIcon,
  CogIcon,
  ChevronRightIcon,
  BellIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";

const patientMenuItems = [
  { name: "Dashboard", href: "/patient", icon: HomeIcon },
  {
    name: "Appointments",
    href: "/patient/appointments",
    icon: ClipboardDocumentListIcon,
  },
  {
    name: "Prescriptions",
    href: "/patient/prescriptions",
    icon: ClipboardDocumentListIcon,
  },
  { name: "Health Logs", href: "/patient/health-logs", icon: UserGroupIcon },
  {
    name: "Notifications",
    href: "/notifications",
    icon: BellIcon,
  },
  {
    name: "Messages",
    href: "/patient/messages",
    icon: ChatBubbleLeftRightIcon,
  },
  { name: "Settings", href: "/patient/settings", icon: CogIcon },
];

const doctorMenuItems = [
  { name: "Dashboard", href: "/doctor", icon: HomeIcon },
  {
    name: "Schedule",
    href: "/doctor/schedule",
    icon: ClipboardDocumentListIcon,
  },
  { name: "Patients", href: "/doctor/patients", icon: UserGroupIcon },
  {
    name: "Notifications",
    href: "/notifications",
    icon: BellIcon,
  },
  { name: "Messages", href: "/doctor/messages", icon: ChatBubbleLeftRightIcon },
  
  { name: "Settings", href: "/doctor/settings", icon: CogIcon },
];

const pharmacistMenuItems = [
  { name: "Dashboard", href: "/pharmacist", icon: HomeIcon },
  {
    name: "Prescriptions",
    href: "/pharmacist/prescriptions",
    icon: ClipboardDocumentListIcon,
  },
  { name: "Inventory", href: "/pharmacist/inventory", icon: UserGroupIcon },
  {
    name: "Notifications",
    href: "/notifications",
    icon: BellIcon,
  },
  {
    name: "Messages",
    href: "/pharmacist/messages",
    icon: ChatBubbleLeftRightIcon,
  },
  { name: "Settings", href: "/pharmacist/settings", icon: CogIcon },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);

  const menuItems =
    user?.role === "doctor"
      ? doctorMenuItems
      : user?.role === "pharmacist"
      ? pharmacistMenuItems
      : patientMenuItems;

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const sidebarWidth = "w-64";

  const getPanelInfo = () => {
    switch (user?.role) {
      case "patient":
        return { title: "Patient Panel", subtitle: "Your Health Hub" };
      case "doctor":
        return { title: "Doctor Panel", subtitle: "Your Practice Hub" };
      case "pharmacist":
        return { title: "Pharmacist Panel", subtitle: "Your Pharmacy Hub" };
      default:
        return { title: "CareSync", subtitle: "Integrated Health" };
    }
  };

  const panelInfo = getPanelInfo();

  return (
    <>
      {/* Mobile open button */}
      <button
        aria-label="Open Sidebar"
        className="fixed z-40 left-0 top-1/2 -translate-y-1/2 bg-primary-600 text-white rounded-r-full shadow-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-400 transition hover:bg-primary-700 lg:hidden"
        onClick={() => setOpen(true)}
        tabIndex={open ? -1 : 0}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Sidebar overlay"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 min-h-screen ${sidebarWidth} bg-gradient-to-b from-primary-50/90 via-white to-medical-50/90 shadow-xl border-r border-subtle flex flex-col z-50 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:h-auto dark:from-gray-950 dark:via-gray-900/95 dark:to-gray-950`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 h-20 border-b border-subtle bg-surface/90 backdrop-blur">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100/90 shadow-inner dark:bg-primary-900/30">
            <span className="text-primary text-2xl font-bold">🩺</span>
          </div>
          <div>
            <span className="block text-lg font-bold text-primary-700 tracking-wide dark:text-primary-300">
              {panelInfo.title}
            </span>
            <span className="block text-xs text-gray-400 dark:text-gray-500">
              {panelInfo.subtitle}
            </span>
          </div>
          <div className="ml-auto lg:hidden">
            <button
              aria-label="Close Sidebar"
              className="p-1"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-7 w-7 text-gray-500 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 px-2 lg:px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-2 text-base rounded-lg transition-colors group ${
                      isActive
                        ? "bg-primary-100 text-primary-700 font-semibold shadow-inner dark:bg-primary-900/20 dark:text-primary-200"
                        : "text-gray-700 hover:bg-primary-50 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-200"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-6 w-6 ${
                        isActive
                          ? "text-primary-500 dark:text-primary-300"
                          : "text-gray-400 group-hover:text-primary-400 dark:text-gray-500 dark:group-hover:text-primary-300"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Quick Stats */}
        <div className="mt-auto mb-6 mx-4 p-4 bg-medical-50 rounded-xl shadow-sm hidden md:block dark:bg-gray-900 dark:border dark:border-gray-800">
          <h3 className="text-sm font-medium text-primary-700 mb-2 tracking-wide dark:text-primary-300">
            Quick Stats
          </h3>
          <div className="text-xs text-gray-600 space-y-1 font-mono dark:text-gray-400">
            <p>• 3 pending reminders</p>
            <p>• 1 new prescription</p>
            <p>• Next appointment: Tomorrow</p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="hidden lg:block mt-auto px-6 pb-6">
          <div className="h-2 w-full rounded-xl bg-gradient-to-r from-primary-200 via-medical-200 to-primary-100 opacity-70 dark:from-primary-900 dark:via-medical-900 dark:to-primary-900" />
        </div>
      </aside>
    </>
  );
}
