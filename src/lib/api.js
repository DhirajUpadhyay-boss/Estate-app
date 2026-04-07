import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3055';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

const TOKEN_KEY = 'realEstateAuthToken';

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.code === 'ERR_NETWORK' || err.message === 'Network Error' || !err.response) {
      err.friendlyMessage = `Cannot reach API at ${baseURL}. Start the backend (cd src/Backend && npm start), confirm MongoDB is running, and set VITE_API_URL if needed.`;
    }
    return Promise.reject(err);
  }
);

export default api;
export { TOKEN_KEY, baseURL };
