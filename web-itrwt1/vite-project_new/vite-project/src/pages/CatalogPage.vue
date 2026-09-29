<script setup>
import Header from '@/components/Header.vue';
import Navigation from '@/components/catalog/Navigation.vue';
import FiltersPanel from '@/components/catalog/FiltersPanel.vue';
import FeaturedItems from '@/components/FeaturedItems.vue';
import Pagination from '@/components/Pagination.vue';
import InfoBanner from '@/components/InfoBanner.vue';
import SubscribeBanner from '@/components/SubscribeBanner.vue';
import FooterBlock from '@/components/FooterBlock.vue';

import { onMounted, ref } from 'vue';
import { useCatalogStore } from '@/stores/catalogStore';

const catalogStore = useCatalogStore();
const page = ref(1);

onMounted(() => {
  // При маунте подгружаем первую страницу (page = 1)
  catalogStore.getCatalog({ page: page.value });
});

// При клике на пагинацию
function onPageChange(newPage) {
  page.value = newPage;
  catalogStore.setPage(newPage);
}
</script>

<template>
  <main>
    <div class="home">
      <Header />
      <Navigation
        :show-left="true"
        :show-right="true"
        left-text="NEW ARRIVALS"
        :right-items="['HOME', 'MEN', 'NEW ARRIVALS']"
        active-item="NEW ARRIVALS"
      />

      <!-- Передаём текущие фильтры и колбэк -->
      <FiltersPanel
        :filters="catalogStore.filters"
        @changeFilter="(key, val) => catalogStore.setFilter(key, val)"
      />

      <!-- Здесь отображаются товары (масcив items из стора) -->
      <FeaturedItems
        :products="catalogStore.items"
        :show-header="false"
        :show-footer="false"
      />

      <!-- Пагинация: текущая страница и общее число страниц -->
      <Pagination
        :current="catalogStore.currentPage"
        :total="Math.ceil(catalogStore.totalItems / catalogStore.pageSize)"
        @page-change="onPageChange"
      />

      <InfoBanner />
      <SubscribeBanner />
      <FooterBlock />
    </div>
  </main>
</template>
