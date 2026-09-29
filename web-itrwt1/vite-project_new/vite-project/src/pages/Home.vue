<template>
  <main>
    <div class="home">
      <Header />
      <HeroBanner />
      <section>
        <div class="container">
          <CategoriesSection />
        </div>
      </section>
      <FeaturedItems
        :products="homeStore.products"
        :show-header="true"
        title="Featured Items"
        subtitle="Shop for items based on what we featured this week"
        :show-footer="true"
        footer-button-text="Browse All Products"
      />
      <InfoBanner />
      <SubscribeBanner />
      <FooterBlock />
    </div>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import { useHomeStore } from '@/stores/homeStore'

import Header from '@/components/Header.vue'
import HeroBanner from '@/components/HeroBanner.vue'
import CategoriesSection from '@/components/CategoriesSection.vue'
import FeaturedItems from '@/components/FeaturedItems.vue'
import InfoBanner from '@/components/InfoBanner.vue'
import SubscribeBanner from '@/components/SubscribeBanner.vue'
import FooterBlock from '@/components/FooterBlock.vue'

const homeStore = useHomeStore()

onMounted(() => {
  homeStore.getHome()
})
</script>
