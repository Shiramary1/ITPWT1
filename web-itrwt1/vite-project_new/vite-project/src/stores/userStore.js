import { defineStore } from 'pinia';
import { apiClient } from '@/plugins/axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
  }),

  getters: {
    benefits: (state) => state.userData?.benefits || []
  },

  actions: {
    async getUser() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiClient.get('/user');
        this.userData = response.data; // { benefits: [...] }
      } catch (err) {
        this.error = err;
        this.userData = null;
      } finally {
        this.isLoading = false;
      }
    },

    async registration(formData) {
      this.isLoading = true;
      this.error = null;
      try {
        // formData = { firstName, lastName, gender, email, password }
        const response = await apiClient.post('/user', formData);
        // response.data = { id, firstName, lastName, email }
        this.userData = {
          ...(this.userData || {}),
          user: response.data
        };
        this.isAuthenticated = true;
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

    logout() {
      this.userData = null;
      this.isAuthenticated = false;
      this.error = null;
    }
  }
});
