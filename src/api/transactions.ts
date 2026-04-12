import { api } from './client';

export async function getTransactions() {
  const { data } = await api.get('/transactions');
  return data;
}
