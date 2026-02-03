import axios from 'axios';

const api = axios.create({
  // This automatically uses the live Render URL if it exists, otherwise localhost
  baseURL: 'https://event-ticketing-rnae.onrender.com', 
});

// Add token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;