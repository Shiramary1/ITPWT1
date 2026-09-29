<template>
  <main>
    <div class="home">
      <Header />
      <Navigation
        :show-left="true"
        :show-right="false"
        left-text="REGISTRATION"
      />
      <Registration
        :benefits="userStore.benefits"
        :isLoading="userStore.isLoading"
        :error="userStore.error"
        :isAuthenticated="userStore.isAuthenticated"
        @submitRegistration="userStore.registration"
      />
      <SubscribeBanner />
      <FooterBlock />
    </div>
  </main>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Navigation from '@/components/catalog/Navigation.vue'
import Registration from '@/components/Registration/Registration.vue'
import SubscribeBanner from '@/components/SubscribeBanner.vue'
import FooterBlock from '@/components/FooterBlock.vue'

import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  userStore.getUser() // подтягиваем benefits
})
</script>
