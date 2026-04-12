import { api } from './client';

export async function quoteRmbTransfer(payload: {
  source_wallet: 'NGN';
  recipient_type: string;
  payment_method: 'alipay' | 'wechat';
  amount_rmb: number;
}) {
  const { data } = await api.post('/transfers/rmb/quote', payload);
  return data;
}
