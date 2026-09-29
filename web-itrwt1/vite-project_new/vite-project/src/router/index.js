import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '@/pages/Home.vue'
import CatalogPage from '@/pages/CatalogPage.vue'
import ProductPage from '@/pages/Product.vue'
import CartPage from '@/pages/Cart.vue'
import Registration from '@/pages/RegistrationPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: CatalogPage
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: ProductPage
  },
  {
    path: '/cart',
    name: 'Cart',
    component: CartPage
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
