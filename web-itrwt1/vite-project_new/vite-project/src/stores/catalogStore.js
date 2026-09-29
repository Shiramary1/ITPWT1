import { defineStore } from 'pinia';
import { apiClient } from '@/plugins/axios';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    items: [],
    currentPage: 1,
    pageSize: 6,
    totalItems: 0,
    filters: {
      category: null,
      searchQuery: '',
      sortBy: null
    },
    isLoading: false,
    error: null
  }),

  actions: {
    async getCatalog({ page = 1, filters = {} } = {}) {
      this.isLoading = true;
      this.error = null;
      this.currentPage = page;
      this.filters = { ...this.filters, ...filters };

      try {
        const params = {
          page: this.currentPage,
          pageSize: this.pageSize,
          category: this.filters.category,
          search: this.filters.searchQuery,
          sortBy: this.filters.sortBy
        };
        const response = await apiClient.get('/catalog', { params });
        const { items, totalItems } = response.data;
        this.items = items || [];
        this.totalItems = totalItems ?? 0;
      } catch (err) {
        this.error = err;
        this.items = [];
        this.totalItems = 0;
      } finally {
        this.isLoading = false;
      }
    },
    setPage(pageNumber) {
      this.getCatalog({ page: pageNumber, filters: this.filters });
    },
    setFilter(key, value) {
      this.getCatalog({ page: 1, filters: { ...this.filters, [key]: value } });
    },
    resetFilters() {
      this.getCatalog({ page: 1, filters: { category: null, searchQuery: '', sortBy: null } });
    }
  }
});
