const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class MessageAPI {
  constructor() {
    this.baseUrl = `${API_BASE_URL}/api/messages`;
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  async getUserConversations() {
    try {
      const response = await fetch(`${this.baseUrl}/conversations`, {
        method: 'GET',
        headers: this.getAuthHeader()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get conversations error:', error);
      throw error;
    }
  }

  async getConversationMessages(conversationId, page = 1, limit = 50) {
    try {
      const response = await fetch(
        `${this.baseUrl}/conversations/${conversationId}?page=${page}&limit=${limit}`,
        {
          method: 'GET',
          headers: this.getAuthHeader()
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Get messages error:', error);
      throw error;
    }
  }

  async createOrGetConversation(participantId) {
    try {
      const response = await fetch(`${this.baseUrl}/conversations`, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify({ participantId })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Create conversation error:', error);
      throw error;
    }
  }

  async sendMessage(conversationId, content, messageType = 'text') {
    try {
      const response = await fetch(`${this.baseUrl}/send`, {
        method: 'POST',
        headers: this.getAuthHeader(),
        body: JSON.stringify({
          conversationId,
          content,
          messageType
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Send message error:', error);
      throw error;
    }
  }
}

export const messageAPI = new MessageAPI();
export default messageAPI;
