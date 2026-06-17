import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:5000/api' 
});

// Add a request interceptor to include the JWT token in headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  signup: (userData) => API.post('/auth/signup', userData),
  login: (userData) => API.post('/auth/login', userData),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const productService = {
  getAll: (params) => API.get('/products', { params }),
  getById: (id) => API.get(`/products/${id}`),
  create: (data, formData) => API.post('/products', formData),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
};

export const orderService = {
  placeOrder: (orderData) => API.post('/orders', orderData),
  getMyOrders: () => API.get('/orders/my-orders'),
  updateStatus: (id, statusData) => API.put(`/orders/${id}/status`, statusData),
  assignDriver: (id, driverData) => API.put(`/orders/${id}/driver`, driverData),
};

export default API;
