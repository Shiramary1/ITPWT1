import { defineStore } from 'pinia';
import { apiClient } from '@/plugins/axios';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isLoading: false,
    error: null
  }),

  getters: {
    totalCount: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    subTotal: (state) => {
      const total = state.items.reduce((sum, item) => {
        let priceNum = 0;
        if (typeof item.product.price === 'string') {
          priceNum = parseFloat(item.product.price.replace(/[^0-9.]/g, '')) || 0;
        } else {
          priceNum = Number(item.product.price) || 0;
        }
        return sum + priceNum * item.quantity;
      }, 0);
      return '$' + total.toFixed(2);
    }
  },

  actions: {
    async getCart() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await apiClient.get('/cart');
        this.items = response.data.items || [];
      } catch (err) {
        this.error = err;
        this.items = [];
      } finally {
        this.isLoading = false;
      }
    },

    async addToCart(product, quantity = 1) {
      this.isLoading = true;
      this.error = null;
      try {
        await apiClient.post('/cart', { product, quantity });
        await this.getCart();
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

    async updateQuantity(itemId, newQuantity) {
      this.isLoading = true;
      this.error = null;
      try {
        await apiClient.put(`/cart/${itemId}`, { quantity: newQuantity });
        await this.getCart();
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

    async removeFromCart(itemId) {
      this.isLoading = true;
      this.error = null;
      try {
        await apiClient.delete(`/cart/${itemId}`);
        await this.getCart();
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    },

    async clearCart() {
      this.isLoading = true;
      this.error = null;
      try {
        await apiClient.delete('/cart');
        this.items = [];
      } catch (err) {
        this.error = err;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
