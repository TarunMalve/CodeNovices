import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const walletAPI = {
  getBalance: () => api.get('/wallet/balance'),
  getTransactions: () => api.get('/wallet/transactions'),
};

export const dbtAPI = {
  getStatus: () => api.get('/dbt/status'),
};

export const grievanceAPI = {
  create: (data) => api.post('/grievance/create', data),
  list: (status) => api.get('/grievance/list', { params: { status } }),
};

export const marketplaceAPI = {
  getProducts: (category) => api.get('/marketplace/products', { params: { category } }),
};

export const adminAPI = {
  getAnalytics: () => api.get('/admin/analytics'),
  getBlockchain: () => api.get('/admin/blockchain'),
};

export default api;
