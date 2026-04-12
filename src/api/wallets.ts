import { api } from './client';

export async function getWallets() {
  const { data } = await api.get('/wallets');
  return data;
}

export async function getRates() {
  const { data } = await api.get('/wallets/rates');
  return data;
}
