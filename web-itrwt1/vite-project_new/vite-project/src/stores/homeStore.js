import { defineStore } from 'pinia'
import { apiClient } from '@/plugins/axios'

export const useHomeStore = defineStore('home', {
  state: () => ({
    products: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async getHome() {
      this.isLoading = true
      this.error = null
      try {
        const response = await apiClient.get('/home')
        this.products = response.data.products || []
      } catch (err) {
        this.error = err
        this.products = []
      } finally {
        this.isLoading = false
      }
    }
  }
})
