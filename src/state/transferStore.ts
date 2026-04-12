import { create } from 'zustand';

type TransferMethod = 'alipay' | 'wechat';

type TransferState = {
  amountRmb: string;
  amountNgn: string;
  rate: number;
  fee: number;
  recipientType: string;
  method: TransferMethod;
  beneficiaryLabel?: string;
  recipientDetails: string;
  setField: <K extends keyof Omit<TransferState, 'setField' | 'reset'>>(key: K, value: TransferState[K]) => void;
  reset: () => void;
};

export const useTransferStore = create<TransferState>((set) => ({
  amountRmb: '',
  amountNgn: '',
  rate: 206.5,
  fee: 0,
  recipientType: 'personal_wallet',
  method: 'alipay',
  beneficiaryLabel: undefined,
  recipientDetails: '',
  setField: (key, value) => set((state) => ({ ...state, [key]: value })),
  reset: () =>
    set({
      amountRmb: '',
      amountNgn: '',
      rate: 206.5,
      fee: 0,
      recipientType: 'personal_wallet',
      method: 'alipay',
      beneficiaryLabel: undefined,
      recipientDetails: ''
    })
}));
