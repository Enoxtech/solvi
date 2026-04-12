import { create } from 'zustand';

type AuthState = {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  accessToken: string | null;
  setSession: (payload: { accessToken: string; user: { name: string; email: string } }) => void;
  clearSession: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  setSession: ({ accessToken, user }) =>
    set({ isAuthenticated: true, accessToken, user }),
  clearSession: () => set({ isAuthenticated: false, accessToken: null, user: null })
}));
