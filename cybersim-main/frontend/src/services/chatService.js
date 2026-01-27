import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const chatService = {
  // Get all messages from a chat session
  async getMessages(sessionId) {
    try {
      const response = await api.get(`/chat/messages/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching chat messages:', error);
      throw error;
    }
  },

  // Send a message and get bot response
  async sendMessage(sessionId, message) {
    try {
      const response = await api.post('/chat/message', {
        sessionId,
        message
      });
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  },

  // Clear a chat session
  async clearSession(sessionId) {
    try {
      const response = await api.delete(`/chat/session/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error clearing chat session:', error);
      throw error;
    }
  },

  // Generate a unique session ID
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
};

export default chatService;
