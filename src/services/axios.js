import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Request interceptor: Always attach the latest token from storage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    const userStr = localStorage.getItem('user');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        // Try to get tenant_id, fallback to merchant_id or id if not found
        const tenantId = user.tenant_id || user.merchant_id || user.id;
        if (tenantId) {
          config.headers['X-Tenant-ID'] = tenantId;
        }
      } catch (e) {
        console.error('[Axios] Failed to parse user for tenant ID', e);
      }
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login page
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;