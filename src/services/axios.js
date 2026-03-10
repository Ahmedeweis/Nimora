import axios from "axios";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Set token if it exists in localStorage
const token = localStorage.getItem('access_token');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
export default api;