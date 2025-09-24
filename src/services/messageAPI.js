const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class MessageAPI {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/messages`;
    this.defaultTimeout = 10000; // 10 seconds
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('MessageAPI: No token found in localStorage');
    }
    return {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  }

  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.defaultTimeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: { ...this.getAuthHeader(), ...(options.headers || {}) },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out:', endpoint);
      } else {
        console.error(`Request error (${endpoint}):`, error);
      }
      throw error;
    }
  }

  getUserConversations() {
    return this.request('/conversations', { method: 'GET' });
  }

  getConversationMessages(conversationId, page = 1, limit = 50) {
    return this.request(`/conversations/${conversationId}?page=${page}&limit=${limit}`, { method: 'GET' });
  }

  createOrGetConversation(participantId) {
    return this.request('/conversations', {
      method: 'POST',
      body: JSON.stringify({ participantId }),
    });
  }

  sendMessage(conversationId, content, messageType = 'text') {
    return this.request('/send', {
      method: 'POST',
      body: JSON.stringify({ conversationId, content, messageType }),
    });
  }
}

export const messageAPI = new MessageAPI();
export default messageAPI;
