import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (serverPath) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const newSocket = io(serverPath, {
      auth: { token }
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to messaging server');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from messaging server');
    });

    newSocket.on('new-message', (data) => {
      setNewMessage(data.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [serverPath]);

  const sendMessage = (conversationId, content) => {
    if (socket && isConnected) {
      socket.emit('send-message', {
        conversationId,
        content
      });
    }
  };

  return {
    socket,
    isConnected,
    newMessage,
    sendMessage
  };
};

export default useSocket;
