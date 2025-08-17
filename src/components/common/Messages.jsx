import React, { useState, useRef, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

// Mock data - replace with API calls in a real application
const conversations = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Cardiologist',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
    lastMessage: 'I have reviewed the lab results. Everything looks stable.',
    timestamp: '10:42 AM',
    unread: 2,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Pharmacist',
    avatar: 'https://i.pravatar.cc/150?u=michael',
    lastMessage: 'Your prescription is ready for pickup.',
    timestamp: 'Yesterday',
    unread: 0,
  },
  {
    id: 3,
    name: 'Support Team',
    role: 'CareSync Support',
    avatar: '/CareSync-Logo.png',
    lastMessage: 'Welcome! How can we assist you today?',
    timestamp: '2 days ago',
    unread: 0,
  },
    {
    id: 4,
    name: 'Dr Aashutosh',
    role: 'Psychatrist',
    avatar: '',
    lastMessage: 'How can i help you ?',
    timestamp: '1 days ago',
    unread: 0,
  },
];

const messagesData = {
  1: [
    { id: 1, sender: 'other', text: 'Hello, I have a question about my medication.', timestamp: '10:25 AM' },
    { id: 2, sender: 'me', text: 'Hi Dr. Johnson, please go ahead.', timestamp: '10:26 AM' },
    { id: 3, sender: 'other', text: 'I wanted to confirm the dosage for the new prescription. Is it one or two tablets per day?', timestamp: '10:28 AM' },
    { id: 4, sender: 'me', text: 'It is one tablet per day, to be taken in the morning.', timestamp: '10:35 AM' },
    { id: 5, sender: 'other', text: 'Thank you for the clarification. Also, I have sent you my latest lab results.', timestamp: '10:40 AM' },
    { id: 6, sender: 'other', text: 'I have reviewed the lab results. Everything looks stable.', timestamp: '10:42 AM' },
  ],
  2: [
    { id: 1, sender: 'other', text: 'Your prescription is ready for pickup.', timestamp: 'Yesterday' },
  ],
  3: [
    { id: 1, sender: 'other', text: 'Welcome! How can we assist you today?', timestamp: '2 days ago' },
  ],
  4: [
    { id: 1, sender: 'other', text: 'How can i help you?', timestamp: '1 days ago' },
  ],
};

const Messages = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [messages, setMessages] = useState(messagesData[activeConversation.id]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages list when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
    setMessages(messagesData[conversation.id] || []);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMessageObj = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar with conversations */}
      <aside className="w-full md:w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">Chats</h2>
          <div className="relative mt-2">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((convo) => (
            <div
              key={convo.id}
              onClick={() => handleSelectConversation(convo)}
              className={`flex items-center p-4 cursor-pointer transition-colors ${
                activeConversation.id === convo.id
                  ? 'bg-primary-50 dark:bg-primary-900/30'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <img src={convo.avatar} alt={convo.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
              <div className="flex-1 overflow-hidden">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold truncate">{convo.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">{convo.timestamp}</span>
                </div>
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{convo.lastMessage}</p>
                  {convo.unread > 0 && (
                    <span className="bg-primary-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center flex-shrink-0 ml-2">
                      {convo.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main chat area */}
      <main className="hidden md:w-2/3 md:flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <img src={activeConversation.avatar} alt={activeConversation.name} className="w-10 h-10 rounded-full mr-4 object-cover" />
              <div>
                <h3 className="font-semibold">{activeConversation.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{activeConversation.role}</p>
              </div>
            </div>

            {/* Messages List */}
            <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800/50">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'other' && (
                      <img src={activeConversation.avatar} alt="Sender" className="w-8 h-8 rounded-full object-cover" />
                    )}
                    <div
                      className={`max-w-md p-3 rounded-2xl ${
                        msg.sender === 'me'
                          ? 'bg-primary-600 text-white rounded-br-none'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>
                      <span className={`text-xs mt-1 block text-right ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                     {msg.sender === 'me' && (
                      <UserCircleIcon className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50"
                  disabled={!newMessage.trim()}
                >
                  <PaperAirplaneIcon className="h-6 w-6" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a conversation to start chatting.
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
