import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  updateProgress: async (progressData) => {
    const response = await api.post('/auth/progress', progressData);
    return response.data;
  }
};

// AI API calls
export const aiAPI = {
  askQuestion: async (question, context) => {
    const response = await api.post('/ai/ask', { question, context });
    return response.data;
  }
};

// Articles API calls
export const articlesAPI = {
  getArticles: async (params = {}) => {
    const response = await api.get('/articles', { params });
    return response.data;
  },

  getArticleBySlug: async (slug) => {
    const response = await api.get(`/articles/${slug}`);
    return response.data;
  }
};

// Defense API calls
export const defenseAPI = {
  logCommand: async (logData) => {
    const response = await api.post('/defense/log', logData);
    return response.data;
  },

  getStatus: async (userId) => {
    const response = await api.get(`/defense/status/${userId}`);
    return response.data;
  },

  resetProgress: async (userId) => {
    const response = await api.post('/defense/reset', { userId });
    return response.data;
  }
};

export default api;