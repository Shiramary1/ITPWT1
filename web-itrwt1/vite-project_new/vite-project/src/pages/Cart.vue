<template>
  <main>
    <div class="home">
      <Header />
      <Navigation
        :show-left="true"
        :show-right="false"
        left-text="SHOPPING CART"
      />
      <!-- Просто рендерим CartPage: он внутри сам берёт данные из стора -->
      <CartPage />
      <SubscribeBanner />
      <FooterBlock />
    </div>
  </main>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/catalog/Navigation.vue'
import CartPage from '@/components/Cart/CartPage.vue'
import SubscribeBanner from '@/components/SubscribeBanner.vue'
import FooterBlock from '@/components/FooterBlock.vue'

import { onMounted } from 'vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

onMounted(() => {
  // Загружаем данные корзины из JSON при маунте страницы
  cartStore.getCart()
})
</script>
