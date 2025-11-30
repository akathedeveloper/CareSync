import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

/**
 * Custom hook for Socket.IO connections with authentication and message handling
 * @param {string} serverPath - Socket server URL
 * @returns {object} - { socket, isConnected, newMessage, sendMessage }
 */
export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('useSocket: No auth token found in localStorage');
      return;
    }

    try {
      const newSocket = io(serverPath, {
        auth: { token },
        reconnectionAttempts: 5, // Optional: auto-reconnect attempts
        transports: ['websocket']
      });

      socketRef.current = newSocket;

      newSocket.on('connect', () => {
        setIsConnected(true);
        console.log('Connected to messaging server');
      });

      newSocket.on('disconnect', (reason) => {
        setIsConnected(false);
        console.warn('Disconnected from server:', reason);
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error.message);
      });

      newSocket.on('new-message', (data) => {
        if (data && data.message) {
          setNewMessage(data.message);
        } else {
          console.warn('Received malformed new-message event:', data);
        }
      });

      setSocket(newSocket);
    } catch (err) {
      console.error('useSocket: Failed to initialize socket', err);
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [serverPath]);

  const sendMessage = (conversationId, content) => {
    if (!socketRef.current) {
      console.error('sendMessage: Socket is not initialized');
      return;
    }

    if (!isConnected) {
      console.warn('sendMessage: Socket is not connected');
      return;
    }

    if (!conversationId || !content) {
      console.warn('sendMessage: conversationId and content are required');
      return;
    }

    socketRef.current.emit('send-message', { conversationId, content });
  };

  return {
    socket,
    isConnected,
    newMessage,
    sendMessage
  };
};

export default useSocket;
