<template>
  <main>
    <div class="home">
      <Header />
      <Navigation :show-left="true" :show-right="true" left-text="NEW ARRIVALS" />
      <!-- Без v-if, просто рендерим статику, если данных нет -->
      <Slider :images="productData?.images || ['/products/Image10.jpg']" />
      <ProductInformation
        :product="productData || {
          collectionTitle: 'LOADING...',
          title: 'LOADING...',
          description: 'LOADING...',
          price: '0'
        }"
      />
      <FeaturedItems :products="relatedItems" />
      <SubscribeBanner />
      <FooterBlock />
    </div>
  </main>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/catalog/Navigation.vue'
import Slider from '@/components/product/Slider.vue'
import ProductInformation from '@/components/product/ProductInformation.vue'
import FeaturedItems from '@/components/FeaturedItems.vue'
import SubscribeBanner from '@/components/SubscribeBanner.vue'
import FooterBlock from '@/components/FooterBlock.vue'

import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/productStore'

console.log('>>> Product.vue загружается')
const route = useRoute()
const productStore = useProductStore()

onMounted(() => {
  const id = route.params.id
  console.log('>>> вызываем getProduct с id=', id)
  productStore.getProduct(id)
})

const productData = computed(() => productStore.product)
const relatedItems = computed(() => productStore.relatedItems)
</script>
