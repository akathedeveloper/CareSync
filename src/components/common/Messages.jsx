import React, { useState, useRef, useEffect } from 'react';
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { socketService } from '../../services/socketService';
import { messageAPI } from '../../services/messageAPI';
import { useAuth } from '../../contexts/AuthContext';

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Initialize Socket.IO and fetch conversations
  useEffect(() => {
    const initializeMessaging = async () => {
      const token = localStorage.getItem('token');
      if (!user) {
        console.log('No user found, skipping messaging initialization');
        setLoading(false);
        return;
      }

      console.log('Initializing messaging for user:', user);
      
      if (!token || !user.isBackendUser) {
        console.log('No JWT token or not a backend user, skipping initialization');
        setLoading(false);
        setError('Please log in with your CareSync account to access messaging');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Initialize Socket.IO connection
        socketService.connect(token);
        
        // Set up Socket.IO event listeners
        socketService.on('connect', () => {
          setIsConnected(true);
          console.log('Connected to messaging service');
        });

        socketService.on('disconnect', () => {
          setIsConnected(false);
          console.log('Disconnected from messaging service');
        });

        socketService.on('new-message', (data) => {
          // Add real-time message to current conversation
          if (activeConversation && data.conversationId === activeConversation._id) {
            setMessages(prev => [...prev, data.message]);
          }
        });

        socketService.on('user-typing', (data) => {
          if (activeConversation && data.conversationId === activeConversation._id) {
            setTypingUsers(prev => new Set(prev).add(data.userName));
          }
        });

        socketService.on('user-stopped-typing', (data) => {
          if (activeConversation && data.conversationId === activeConversation._id) {
            setTypingUsers(prev => {
              const updated = new Set(prev);
              updated.delete(data.userName);
              return updated;
            });
          }
        });

        // Fetch conversations from API
        const response = await messageAPI.getUserConversations();
        if (response.success) {
          setConversations(response.data);
          if (response.data.length > 0) {
            setActiveConversation(response.data[0]);
          }
        }

      } catch (error) {
        console.error('Failed to initialize messaging:', error);
        setError('Failed to load conversations');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      initializeMessaging();
    } else {
      setLoading(false);
    }

    return () => {
      socketService.removeAllListeners();
      socketService.disconnect();
    };
  }, [user]);

  // Load messages when active conversation changes
  useEffect(() => {
    const loadMessages = async () => {
      if (!activeConversation) return;

      const token = localStorage.getItem('token');
      
      if (!token || !user.isBackendUser) {
        console.log('No JWT token or not backend user, skipping message loading');
        return;
      }

      try {
        setLoading(true);
        const response = await messageAPI.getConversationMessages(activeConversation._id);
        if (response.success) {
          setMessages(response.data);
        }
        
        // Join the conversation room
        socketService.joinConversation(activeConversation._id);
        
      } catch (error) {
        console.error('Failed to load messages:', error);
        setError('Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Cleanup: leave previous conversation
    return () => {
      if (activeConversation) {
        socketService.leaveConversation(activeConversation._id);
      }
    };
  }, [activeConversation, user]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (conversation) => {
    setActiveConversation(conversation);
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
    
    // Send typing indicator
    if (e.target.value.length > 0 && isConnected && activeConversation) {
      socketService.startTyping(activeConversation._id);
      
      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Stop typing after 3 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        socketService.stopTyping(activeConversation._id);
      }, 3000);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeConversation) return;

    const messageContent = newMessage.trim();
    setNewMessage('');

    const token = localStorage.getItem('token');
    
    // If no token, handle auth error
    if (!token || !user.isBackendUser) {
      console.log('No JWT token or not backend user, cannot send message');
      setError('Please log in with your CareSync account to send messages');
      setNewMessage(messageContent);
      return;
    }

    if (!isConnected) {
      setError('Not connected to messaging service');
      setNewMessage(messageContent);
      return;
    }

    try {
      // Send message via Socket.IO
      await socketService.sendMessage(activeConversation._id, messageContent);
      
      // Stop typing indicator
      socketService.stopTyping(activeConversation._id);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

    } catch (error) {
      console.error('Failed to send message:', error);
      setError('Failed to send message');
      // Re-add message to input on failure
      setNewMessage(messageContent);
    }
  };

  // Helper functions
  const getOtherParticipant = (conversation) => {
    if (!conversation?.participants || !user) return null;
    return conversation.participants.find(participant => 
      participant._id !== user._id
    );
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffInDays} days ago`;
    }
  };

  if (loading && conversations.length === 0) {
    return (
      <div className="flex h-[calc(100vh-80px)] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Connection Status Indicator */}
      {!isConnected && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm z-50">
          Disconnected
        </div>
      )}
      {isConnected && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm z-50">
          Real-time
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="absolute top-16 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm z-50">
          {error}
        </div>
      )}

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
          {conversations.length > 0 ? (
            conversations.map((convo) => {
              const otherParticipant = getOtherParticipant(convo);
              if (!otherParticipant) return null;
              
              return (
                <div
                  key={convo._id}
                  onClick={() => handleSelectConversation(convo)}
                  className={`flex items-center p-4 cursor-pointer transition-colors ${
                    activeConversation?._id === convo._id
                      ? 'bg-primary-50 dark:bg-primary-900/30'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold mr-4">
                    {otherParticipant.name?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold truncate">{otherParticipant.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                        {convo.lastMessageTime ? formatTimestamp(convo.lastMessageTime) : ''}
                      </span>
                    </div>
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {convo.lastMessage?.content || 'No messages yet'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-gray-500">
              <p>No conversations yet</p>
              <p className="text-sm mt-2">Start chatting with other users</p>
            </div>
          )}
        </div>
      </aside>

      {/* Main chat area */}
      <main className="hidden md:w-2/3 md:flex flex-col">
        {activeConversation ? (
          <>
            {(() => {
              const otherParticipant = getOtherParticipant(activeConversation);
              if (!otherParticipant) return null;
              
              return (
                <>
                  {/* Chat Header */}
                  <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-semibold mr-4">
                      {otherParticipant.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{otherParticipant.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {otherParticipant.email} {isConnected && '• Online'}
                      </p>
                    </div>
                  </div>

                  {/* Messages List */}
                  <div className="flex-1 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800/50">
                    {loading && messages.length === 0 ? (
                      <div className="flex justify-center items-center h-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {messages.length > 0 ? (
                          messages.map((msg) => (
                            <div
                              key={msg._id}
                              className={`flex items-end gap-2 ${
                                msg.sender._id === user._id ? 'justify-end' : 'justify-start'
                              }`}
                            >
                              {msg.sender._id !== user._id && (
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-semibold">
                                  {msg.sender.name?.charAt(0).toUpperCase()}
                                </div>
                              )}
                              <div
                                className={`max-w-md p-3 rounded-2xl ${
                                  msg.sender._id === user._id
                                    ? 'bg-primary-600 text-white rounded-br-none'
                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'
                                }`}
                              >
                                <p>{msg.content}</p>
                                <span className={`text-xs mt-1 block text-right ${
                                  msg.sender._id === user._id ? 'text-blue-200' : 'text-gray-500 dark:text-gray-400'
                                }`}>
                                  {formatTimestamp(msg.createdAt)}
                                </span>
                              </div>
                              {msg.sender._id === user._id && (
                                <UserCircleIcon className="w-8 h-8 text-gray-400" />
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="flex justify-center items-center h-full text-gray-500">
                            No messages yet. Start the conversation!
                          </div>
                        )}
                        
                        {/* Typing Indicator */}
                        {typingUsers.size > 0 && (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                              <div className="flex space-x-1">
                                <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce"></div>
                                <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-1 h-1 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">
                              {Array.from(typingUsers).join(', ')} {typingUsers.size === 1 ? 'is' : 'are'} typing...
                            </div>
                          </div>
                        )}
                        
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={handleInputChange}
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
                    {localStorage.getItem('token') && user?.isBackendUser ? (
                      isConnected ? (
                        <div className="text-xs text-green-600 mt-1">Real-time messaging active</div>
                      ) : (
                        <div className="text-xs text-red-600 mt-1">Connecting to messaging service...</div>
                      )
                    ) : (
                      <div className="text-xs text-orange-600 mt-1">Please log in with CareSync account for messaging</div>
                    )}
                  </div>
                </>
              );
            })()}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            {conversations.length > 0 ? (
              "Select a conversation to start chatting."
            ) : (
              "No conversations available."
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Messages;
