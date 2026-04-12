import { api } from './client';

export async function login(payload: { email: string; password: string }) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}
