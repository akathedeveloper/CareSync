import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.eventListeners = new Map();
  }

  connect(token) {
    if (this.socket) {
      this.disconnect();
    }

    this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
      auth: {
        token: token
      },
      autoConnect: false
    });

    this.socket.connect();

    // Set up connection event listeners
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.isConnected = true;
      this.joinConversations();
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Disconnected from server:', reason);
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      this.isConnected = false;
    });

    // Auto-reconnection handling
    this.socket.on('reconnect', () => {
      console.log('Reconnected to server');
      this.isConnected = true;
      this.joinConversations();
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  joinConversations() {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-conversations');
    }
  }

  joinConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('join-conversation', { conversationId });
    }
  }

  leaveConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leave-conversation', { conversationId });
    }
  }

  sendMessage(conversationId, content, messageType = 'text') {
    return new Promise((resolve, reject) => {
      if (!this.socket || !this.isConnected) {
        reject(new Error('Not connected to server'));
        return;
      }

      this.socket.emit('send-message', {
        conversationId,
        content,
        messageType
      });

      // Listen for confirmation
      const handleMessageSent = (data) => {
        this.socket.off('message-sent', handleMessageSent);
        this.socket.off('message-error', handleMessageError);
        resolve(data);
      };

      const handleMessageError = (error) => {
        this.socket.off('message-sent', handleMessageSent);
        this.socket.off('message-error', handleMessageError);
        reject(error);
      };

      this.socket.on('message-sent', handleMessageSent);
      this.socket.on('message-error', handleMessageError);
    });
  }

  startTyping(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing-start', { conversationId });
    }
  }

  stopTyping(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing-stop', { conversationId });
    }
  }

  markMessagesRead(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('mark-messages-read', { conversationId });
    }
  }

  // Event listener management
  on(event, callback) {
    if (this.socket) {
      this.socket.on(event, callback);
      
      // Store listener for cleanup
      if (!this.eventListeners.has(event)) {
        this.eventListeners.set(event, []);
      }
      this.eventListeners.get(event).push(callback);
    }
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
      
      // Remove from stored listeners
      if (this.eventListeners.has(event)) {
        const listeners = this.eventListeners.get(event);
        const index = listeners.indexOf(callback);
        if (index > -1) {
          listeners.splice(index, 1);
        }
      }
    }
  }

  // Clean up all event listeners
  removeAllListeners() {
    this.eventListeners.forEach((listeners, event) => {
      listeners.forEach(callback => {
        if (this.socket) {
          this.socket.off(event, callback);
        }
      });
    });
    this.eventListeners.clear();
  }

  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      socketId: this.socket?.id || null
    };
  }
}

// Create and export a singleton instance
export const socketService = new SocketService();

export default socketService;
