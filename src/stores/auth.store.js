import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { login } from '@/services/auth.services';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    authenticated: false,
  }),
  actions: {
    async login({ email, password }) {
      const response = await login(email, password);
      if (response?.status === 200) {
        if (response?.data?.token) {
          this.authenticated = true;
          this.token = response?.data?.token;
        }
      } else {
        this.authenticated = false;
        this.token = null;
      }
    }
  },
  persist: true,
});
