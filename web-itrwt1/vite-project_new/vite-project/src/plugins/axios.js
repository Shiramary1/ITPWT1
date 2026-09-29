// /src/plugins/axios.js
import axios from 'axios';

export const apiClient = axios.create({
  // baseURL = '/api'
  // Иначе укажите полный путь: 'http://localhost:3000/api'
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
});
