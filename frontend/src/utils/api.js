import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
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
  addFunds: (data) => api.post('/wallet/add-funds', data),
  makePayment: (data) => api.post('/wallet/pay', data),
};

export const dbtAPI = {
  getStatus: () => api.get('/dbt/status'),
};

export const grievanceAPI = {
  create: (data) => api.post('/grievance/create', data),
  list: (status) => api.get('/grievance/list', { params: { status } }),
  classify: (data) => api.post('/grievance/classify', data),
};

export const marketplaceAPI = {
  getProducts: (category) => api.get('/marketplace/products', { params: { category } }),
};

export const adminAPI = {
  getAnalytics: () => api.get('/admin/analytics'),
  getBlockchain: () => api.get('/admin/blockchain'),
  getHeatmap: () => api.get('/admin/heatmap'),
  getGrievanceClassify: () => api.get('/admin/grievance/classify'),
  getRevenueTrends: () => api.get('/admin/revenue-trends'),
};

export const publicAPI = {
  getStats: () => api.get('/public/stats'),
};

export const eligibilityAPI = {
  check: (params) => api.get('/eligibility/check', { params }),
};

export const utilitiesAPI = {
  getBills: () => api.get('/utilities/bills'),
  pay: (data) => api.post('/utilities/pay', data),
  getUsage: () => api.get('/utilities/usage'),
};

export const securityAPI = {
  getSessions: () => api.get('/security/sessions'),
  toggleMFA: (data) => api.post('/security/mfa/toggle', data),
};

export const landAPI = {
  verify: (params) => api.get('/land/verify', { params }),
};

export const fundTransparencyAPI = {
  get: () => api.get('/fund-transparency'),
};

export const documentsAPI = {
  upload: (data) => api.post('/documents/upload', data),
  list: () => api.get('/documents/list'),
};

export const taxAdvisorAPI = {
  recommend: (params) => api.get('/tax-advisor/recommend', { params }),
};

export const healthScoreAPI = {
  getScore: () => api.get('/health-score'),
};

export const aiHubAPI = {
  getRecommendations: () => api.get('/ai-hub/recommendations'),
};

export default api;
