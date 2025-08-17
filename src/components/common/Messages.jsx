import React, { useState, useRef, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  ArrowLeftIcon,
  PhoneIcon,
  VideoCameraIcon,
  InformationCircleIcon,
  FaceSmileIcon,
  PaperClipIcon,
} from "@heroicons/react/24/outline";

const conversations = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    lastMessage: "I have reviewed the lab results. Everything looks stable.",
    timestamp: "10:42 AM",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Pharmacist",
    avatar: "https://i.pravatar.cc/150?u=michael",
    lastMessage: "Your prescription is ready for pickup.",
    timestamp: "Yesterday",
    unread: 0,
    online: false,
  },
  {
    id: 3,
    name: "Support Team",
    role: "CareSync Support",
    avatar: "/CareSync-Logo.png",
    lastMessage: "Welcome! How can we assist you today?",
    timestamp: "2 days ago",
    unread: 0,
    online: false,
  },
];

const messagesData = {
  1: [
    { id: 1, sender: "other", text: "Hello, I have a question about my medication.", timestamp: "10:25 AM" },
    { id: 2, sender: "me", text: "Hi Dr. Johnson, please go ahead.", timestamp: "10:26 AM" },
    { id: 3, sender: "other", text: "Is it one or two tablets per day?", timestamp: "10:28 AM" },
    { id: 4, sender: "me", text: "It is one tablet per day, in the morning.", timestamp: "10:35 AM" },
    { id: 5, sender: "other", text: "Thank you. I’ve sent you my lab results.", timestamp: "10:40 AM" },
    { id: 6, sender: "other", text: "I have reviewed the lab results. Everything looks stable.", timestamp: "10:42 AM" },
  ],
  2: [{ id: 1, sender: "other", text: "Your prescription is ready for pickup.", timestamp: "Yesterday" }],
  3: [{ id: 1, sender: "other", text: "Welcome! How can we assist you today?", timestamp: "2 days ago" }],
};

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages(messagesData[conversation.id] || []);
    setIsMobileChatOpen(true); // On mobile, switch to chat view
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMessageObj = {
      id: messages.length + 1,
      sender: "me",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar (hidden on mobile if chat is open) */}
      <aside
        className={`w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-white dark:bg-gray-950 transition-all duration-300 ${
          isMobileChatOpen ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Chats</h2>
          <div className="relative mt-3">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <h4 className="px-4 pt-3 pb-2 text-xs text-gray-500 uppercase tracking-wide">Recent</h4>
          {conversations.map((convo) => (
            <div
              key={convo.id}
              onClick={() => handleSelectConversation(convo)}
              className={`flex items-center p-4 cursor-pointer transition-all border-l-4 ${
                activeConversation?.id === convo.id
                  ? "bg-blue-50 dark:bg-blue-900/20 border-blue-600"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800 border-transparent"
              }`}
            >
              <div className="relative">
                <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
                {convo.online && <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold truncate">{convo.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">{convo.timestamp}</span>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{convo.lastMessage}</p>
                  {convo.unread > 0 && (
                    <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Area (hidden on mobile until chat is open) */}
      <main
        className={`flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
          isMobileChatOpen ? "flex" : "hidden md:flex"
        }`}
      >
        {activeConversation ? (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
              <div className="flex items-center gap-3">
                {/* Back button for mobile */}
                <button className="md:hidden" onClick={() => setIsMobileChatOpen(false)}>
                  <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                </button>
                <div className="relative">
                  <img
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {activeConversation.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{activeConversation.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activeConversation.online ? "Online" : "Last seen " + activeConversation.timestamp}
                  </p>
                </div>
              </div>
              <div className="hidden md:flex gap-3 text-gray-500">
                <PhoneIcon className="w-6 h-6 cursor-pointer hover:text-blue-500" />
                <VideoCameraIcon className="w-6 h-6 cursor-pointer hover:text-blue-500" />
                <InformationCircleIcon className="w-6 h-6 cursor-pointer hover:text-blue-500" />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-xs px-4 py-2 rounded-2xl shadow-sm animate-fade-in ${
                        msg.sender === "me"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span
                        className={`text-xs mt-1 block text-right ${
                          msg.sender === "me" ? "text-blue-200" : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input */}
            <div className="p-3 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <button type="button">
                  <FaceSmileIcon className="w-6 h-6 text-gray-500 hover:text-blue-500" />
                </button>
                <button type="button">
                  <PaperClipIcon className="w-6 h-6 text-gray-500 hover:text-blue-500" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-blue-600 text-white p-3 rounded-full hover:scale-105 transition-transform disabled:opacity-50"
                >
                  <PaperAirplaneIcon className="h-5 w-5 rotate-45" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">Select a conversation to start chatting.</div>
        )}
      </main>
    </div>
  );
};

export default Messages;
