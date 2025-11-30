"use client";
import React, { useEffect, useRef, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// 🔹 Reusable Button
const Button = ({ children, onClick, className = "", type = "button", disabled }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-2 py-1 rounded-lg font-semibold transition ${className}`}
  >
    {children}
  </button>
);

export default function NotificationDropdown({ apiBase = "/api/notifications" }) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const unreadCount = items.filter(i => !i.read).length;

  // close on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // fetch notifications
  const load = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiBase}/me`, { credentials: "include" });
      const data = await res.json();
      setItems(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markOne = async (id) => {
    await fetch(`${apiBase}/${id}/read`, { method: "PUT", credentials: "include" });
    setItems(prev => prev.map(i => (i._id === id ? { ...i, read: true } : i)));
  };

  const markAll = async () => {
    await fetch(`${apiBase}/read-all`, { method: "PUT", credentials: "include" });
    setItems(prev => prev.map(i => ({ ...i, read: true })));
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        onClick={() => setOpen(o => !o)}
        className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 
                           bg-red-500 text-white text-[10px] leading-[18px] 
                           font-bold rounded-full text-center">
            {unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 mt-2 w-96 max-w-[92vw] z-50
                       bg-white dark:bg-gray-800 rounded-2xl shadow-xl
                       border border-gray-200 dark:border-gray-700"
          >
            {/* header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                Notifications
              </h3>
              <Button
                onClick={markAll}
                className="text-xs inline-flex items-center gap-1 px-2 py-1
                           bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600
                           text-gray-700 dark:text-gray-200"
              >
                <CheckCheck className="w-4 h-4" /> Mark all read
              </Button>
            </div>

            {/* list */}
            <div className="max-h-80 overflow-y-auto">
              {loading && <div className="p-4 text-sm text-gray-500">Loading…</div>}
              {!loading && items.length === 0 && <div className="p-4 text-sm text-gray-500">No notifications</div>}

              {items.map(item => (
                <Button
                  key={item._id}
                  onClick={async () => { if (!item.read) await markOne(item._id); }}
                  className={`w-full text-left px-4 py-3 border-b 
                             border-gray-100 dark:border-gray-700 hover:bg-gray-50
                             dark:hover:bg-gray-700 transition
                             ${!item.read ? "bg-blue-50/40 dark:bg-blue-900/20" : ""}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-sm text-gray-800 dark:text-gray-100">{item.message}</div>
                    <div className="shrink-0 text-[11px] text-gray-500">{new Date(item.createdAt).toLocaleString()}</div>
                  </div>
                  {!item.read && (
                    <span className="mt-1 inline-block text-[10px] text-blue-600 dark:text-blue-400">
                      Unread
                    </span>
                  )}
                </Button>
              ))}
            </div>

            {/* footer */}
            <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-center">
              <Link
                 to="/notifications"
                 className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                 View all notifications
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
