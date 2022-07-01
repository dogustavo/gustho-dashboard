import axios from 'axios';

export * from './auth';
export * from './products';
export * from './users';
export * from './checkout';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
