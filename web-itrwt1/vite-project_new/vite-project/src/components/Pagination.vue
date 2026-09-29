<template>
  <nav class="pagination">
    <ul class="pagination__list">
      <!-- Prev Arrow -->
      <li class="pagination__item">
        <button class="pagination__arrow" :disabled="true">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.99512 2L2.99512 7L7.99512 12L6.99512 14L-0.00488281 7L6.99512 0L7.99512 2Z" fill="black"/>
          </svg>
        </button>
      </li>

      <!-- Page buttons -->
      <li v-for="page in [1, 2, 3, 4, 5, 6]" :key="page" class="pagination__item">
        <button
          class="pagination__button"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </li>

      <!-- Ellipsis -->
      <li class="pagination__item">
        <span class="pagination__ellipsis">...</span>
      </li>

      <!-- Last page -->
      <li class="pagination__item">
        <button
          class="pagination__button"
          :class="{ active: currentPage === 20 }"
          @click="goToPage(20)"
        >
          20
        </button>
      </li>

      <!-- Next Arrow -->
      <li class="pagination__item">
        <button class="pagination__arrow">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M-0.00500488 12L4.995 7L-0.00500488 2L0.994995 0L7.995 7L0.994995 14L-0.00500488 12Z" fill="black"/>
          </svg>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const currentPage = ref(1)

const goToPage = (page) => {
  currentPage.value = page
}
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  padding: 10px 0 100px 0;
  

  &__list {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    border: 1px solid #dedede;

  }

  &__item {
    display: flex;
  }

  &__button,
  &__arrow {
    padding: 10px 8px;
    border: none;
    background: white;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      color: #ef5b70;
      border-color: #ef5b70;
    }

    &.active {
      color: #ef5b70;
      font-weight: 600;
      border-color: #ef5b70;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  // Стили для многоточия
  &__ellipsis {
    padding: 8px 12px;
    color: #333;
    font-size: 14px;
  }

  // Стили для стрелок
  .pagination__arrow {
    svg {
      width: 14px;
      height: 14px;
    }
  }
}
</style>
