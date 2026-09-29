// src/stores/productStore.js
import { defineStore } from 'pinia';
import { apiClient } from '@/plugins/axios';

export const useProductStore = defineStore('product', {
  state: () => ({
    product: null,
    relatedItems: [],
    isLoading: false,
    error: null
  }),

  actions: {
    async getProduct(productId) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await apiClient.get(`/product/${productId}`);
        // Ожидаем response.data = { product: {...}, related: [ ... ] }
        this.product = response.data.product;
        this.relatedItems = response.data.related;
      } catch (err) {
        this.error = err;
        this.product = null;
        this.relatedItems = [];
      } finally {
        this.isLoading = false;
      }
    },

    clearProduct() {
      this.product = null;
      this.relatedItems = [];
      this.error = null;
    }
  }
});
