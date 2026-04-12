import axios from 'axios';
import { useAuthStore } from '../state/authStore';

export const api = axios.create({
  baseURL: 'https://api.solvi.app/api/v1',
  timeout: 15000
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
