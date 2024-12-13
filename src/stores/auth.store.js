import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { login, logout } from '@/services/auth.services';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    authenticated: false,
  }),
  actions: {
    async login({ email, password }) {
      const response = await login(email, password);
      if (response?.status === 200) {
        if (response?.data?.token) {
          this.authenticated = true;
          this.token = response?.data?.token;
          this.user = response?.data?.user;
        }
      } else {
        this.authenticated = false;
        this.token = null;
        this.user = null;
      }
    },
    async logout() {
      const response = await logout();
      if (response?.status === 200) {
        this.authenticated = false;
        this.token = null;
        this.user = null;
      }
    },
  },
  persist: true,
});
