import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  email?: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      email: null,
      login(email: string) {
        // generate a simple fake token
        const token = typeof window !== 'undefined'
          ? btoa(`${email}:${Date.now()}`)
          : `${email}:${Date.now()}`;
        set({ token, email });
      },
      logout() {
        set({ token: null, email: null });
      },
      isAuthenticated() {
        return !!get().token;
      },
    }),
    {
      name: 'cinedash-auth',
      getStorage: () => localStorage,
    }
  )
);

export default useAuthStore;
