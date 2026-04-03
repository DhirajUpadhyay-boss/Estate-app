import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3055';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

const TOKEN_KEY = 'realEstateAuthToken';

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
export { TOKEN_KEY };
