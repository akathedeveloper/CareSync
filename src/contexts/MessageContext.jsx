import React, { createContext, useReducer, useEffect } from 'react';
import { socketService } from '../services/socketService';
import { messageAPI } from '../services/messageAPI';
import { useAuth } from './AuthContext';

// Initial state
const initialState = {
  conversations: [],
  currentConversation: null,
  messages: [],
  loading: false,
  error: null,
  typingUsers: new Set(),
  isConnected: false,
  unreadCounts: {}
};

// Action types
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CONVERSATIONS: 'SET_CONVERSATIONS',
  SET_CURRENT_CONVERSATION: 'SET_CURRENT_CONVERSATION',
  SET_MESSAGES: 'SET_MESSAGES',
  ADD_MESSAGE: 'ADD_MESSAGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',
  ADD_TYPING_USER: 'ADD_TYPING_USER',
  REMOVE_TYPING_USER: 'REMOVE_TYPING_USER',
  UPDATE_UNREAD_COUNT: 'UPDATE_UNREAD_COUNT',
  MARK_CONVERSATION_READ: 'MARK_CONVERSATION_READ'
};

// Reducer function
const messageReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };

    case ACTIONS.SET_CONVERSATIONS:
      return { ...state, conversations: action.payload };

    case ACTIONS.SET_CURRENT_CONVERSATION:
      return { ...state, currentConversation: action.payload };

    case ACTIONS.SET_MESSAGES:
      return { ...state, messages: action.payload };

    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };

    case ACTIONS.UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map(msg =>
          msg._id === action.payload._id ? action.payload : msg
        )
      };

    case ACTIONS.SET_CONNECTION_STATUS:
      return { ...state, isConnected: action.payload };

    case ACTIONS.ADD_TYPING_USER: {
      const newTypingUsers = new Set(state.typingUsers);
      newTypingUsers.add(action.payload);
      return { ...state, typingUsers: newTypingUsers };
    }

    case ACTIONS.REMOVE_TYPING_USER: {
      const updatedTypingUsers = new Set(state.typingUsers);
      updatedTypingUsers.delete(action.payload);
      return { ...state, typingUsers: updatedTypingUsers };
    }

    case ACTIONS.UPDATE_UNREAD_COUNT:
      return {
        ...state,
        unreadCounts: {
          ...state.unreadCounts,
          [action.payload.conversationId]: action.payload.count
        }
      };

    case ACTIONS.MARK_CONVERSATION_READ: {
      const updatedUnreadCounts = { ...state.unreadCounts };
      delete updatedUnreadCounts[action.payload];
      return { ...state, unreadCounts: updatedUnreadCounts };
    }

    default:
      return state;
  }
};

// Create context
const MessageContext = createContext();

// Provider component
export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);
  const { user, token } = useAuth();

  // Initialize socket connection
  useEffect(() => {
    if (user && token) {
      try {
        socketService.connect(token);
        
        // Set up socket event listeners
        const setupSocketListeners = () => {
          // Connection status
          socketService.on('connect', () => {
            dispatch({ type: ACTIONS.SET_CONNECTION_STATUS, payload: true });
          });

          socketService.on('disconnect', () => {
            dispatch({ type: ACTIONS.SET_CONNECTION_STATUS, payload: false });
          });

          // New messages
          socketService.on('new-message', (data) => {
            dispatch({ type: ACTIONS.ADD_MESSAGE, payload: data.message });
            
            // Update unread count if not in current conversation
            if (state.currentConversation?._id !== data.conversationId) {
              const currentCount = state.unreadCounts[data.conversationId] || 0;
              dispatch({
                type: ACTIONS.UPDATE_UNREAD_COUNT,
                payload: {
                  conversationId: data.conversationId,
                  count: currentCount + 1
                }
              });
            }
          });

          // Typing indicators
          socketService.on('user-typing', (data) => {
            if (state.currentConversation?._id === data.conversationId) {
              dispatch({ 
                type: ACTIONS.ADD_TYPING_USER, 
                payload: data.userName 
              });
            }
          });

          socketService.on('user-stopped-typing', (data) => {
            if (state.currentConversation?._id === data.conversationId) {
              dispatch({ 
                type: ACTIONS.REMOVE_TYPING_USER, 
                payload: data.userName 
              });
            }
          });

          // Error handling
          socketService.on('error', (error) => {
            dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
          });
        };

        setupSocketListeners();

        return () => {
          socketService.removeAllListeners();
          socketService.disconnect();
        };
      } catch (error) {
        console.error('Socket connection error:', error);
        dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to connect to messaging service' });
      }
    }
  }, [user, token]);

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await messageAPI.getUserConversations();
      
      if (response.success) {
        dispatch({ type: ACTIONS.SET_CONVERSATIONS, payload: response.data });
      }
    } catch (error) {
      console.error('Fetch conversations error:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load conversations' });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      const response = await messageAPI.getConversationMessages(conversationId);
      
      if (response.success) {
        dispatch({ type: ACTIONS.SET_MESSAGES, payload: response.data });
      }
    } catch (error) {
      console.error('Fetch messages error:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to load messages' });
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Send message
  const sendMessage = async (content, messageType = 'text') => {
    if (!state.currentConversation || !content.trim()) {
      return;
    }

    try {
      await socketService.sendMessage(
        state.currentConversation._id, 
        content, 
        messageType
      );
    } catch (error) {
      console.error('Send message error:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to send message' });
    }
  };

  // Set current conversation
  const setCurrentConversation = async (conversation) => {
    if (state.currentConversation?._id !== conversation._id) {
      // Leave previous conversation
      if (state.currentConversation) {
        socketService.leaveConversation(state.currentConversation._id);
      }

      // Set new conversation
      dispatch({ type: ACTIONS.SET_CURRENT_CONVERSATION, payload: conversation });
      
      // Join new conversation
      socketService.joinConversation(conversation._id);
      
      // Fetch messages
      await fetchMessages(conversation._id);
      
      // Mark as read
      socketService.markMessagesRead(conversation._id);
      dispatch({ type: ACTIONS.MARK_CONVERSATION_READ, payload: conversation._id });
    }
  };

  // Start typing
  const startTyping = () => {
    if (state.currentConversation) {
      socketService.startTyping(state.currentConversation._id);
    }
  };

  // Stop typing
  const stopTyping = () => {
    if (state.currentConversation) {
      socketService.stopTyping(state.currentConversation._id);
    }
  };

  // Create new conversation
  const createConversation = async (participantId) => {
    try {
      const response = await messageAPI.createOrGetConversation(participantId);
      
      if (response.success) {
        // Add to conversations if it's new
        const existingConversation = state.conversations.find(
          conv => conv._id === response.data._id
        );
        
        if (!existingConversation) {
          dispatch({
            type: ACTIONS.SET_CONVERSATIONS,
            payload: [response.data, ...state.conversations]
          });
        }
        
        return response.data;
      }
    } catch (error) {
      console.error('Create conversation error:', error);
      dispatch({ type: ACTIONS.SET_ERROR, payload: 'Failed to create conversation' });
      return null;
    }
  };

  // Context value
  const value = {
    ...state,
    fetchConversations,
    fetchMessages,
    sendMessage,
    setCurrentConversation,
    startTyping,
    stopTyping,
    createConversation
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContext;
