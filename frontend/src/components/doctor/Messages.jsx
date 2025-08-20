import React, { useState } from "react";

const dummyMessages = [
  {
    id: 1,
    sender: "Patient: Rahul Sharma",
    time: "Today, 10:30 AM",
    text: "Doctor, I have a question about my prescription.",
    unread: true,
  },
  {
    id: 2,
    sender: "Patient: Priya Singh",
    time: "Yesterday, 5:15 PM",
    text: "Thank you for your advice!",
    unread: false,
  },
  {
    id: 3,
    sender: "Admin",
    time: "Yesterday, 2:00 PM",
    text: "Your schedule has been updated.",
    unread: false,
  },
];

const Messages = () => {
  const [messages, setMessages] = useState(dummyMessages);

  const markAsRead = (id) => {
    setMessages((msgs) =>
      msgs.map((msg) =>
        msg.id === id ? { ...msg, unread: false } : msg
      )
    );
  };

  return (
    <div className="p-8 bg-gradient-to-b from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg min-h-screen">
      <header className="mb-8 text-center">
        <h2 className="text-4xl font-extrabold text-purple-700 dark:text-purple-100">
          Messages
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          View and manage your recent messages.
        </p>
      </header>
      <div className="space-y-6 max-w-2xl mx-auto">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`rounded-xl shadow-md p-6 flex flex-col gap-2 bg-white dark:bg-gray-800 border-l-4 ${
                msg.unread
                  ? "border-purple-500"
                  : "border-gray-300 dark:border-gray-700"
              } animate-fade-in`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-purple-700 dark:text-purple-200">
                  {msg.sender}
                </span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>
              <div className="text-gray-700 dark:text-gray-300 mb-2">
                {msg.text}
              </div>
              {msg.unread && (
                <button
                  onClick={() => markAsRead(msg.id)}
                  className="self-end px-4 py-1 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No messages found.
          </p>
        )}
      </div>
    </div>
  );
};

// Simple fade-in animation (add to your CSS or tailwind.config.js if using Tailwind)
const style = document.createElement("style");
style.innerHTML = `
@keyframes fade-in { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none;} }
.animate-fade-in { animation: fade-in 0.8s ease; }
`;
document.head.appendChild(style);

export default Messages;