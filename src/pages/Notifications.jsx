// src/pages/Notifications.jsx
import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/notifications/me", { credentials: "include" })
      .then((r) => r.json())
      .then(setItems)
      .catch((err) => console.error("Error fetching notifications:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Notifications</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 divide-y">
        {items.length > 0 ? (
          items.map((n) => (
            <div
              key={n._id}
              className="p-4 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {n.message}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(n.createdAt).toLocaleString()}
                </div>
              </div>
              {!n.read && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  Unread
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="p-6 text-sm text-gray-500 text-center">
            No notifications
          </div>
        )}
      </div>
    </div>
  );
}
