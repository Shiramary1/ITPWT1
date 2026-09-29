<template>
  <div class="container filters-panel">
    <!-- Блок 1: Filter -->
    <div class="filters-panel__filter" @click="toggleDropdown">
        <span class="filters-panel__label">Filter</span>
        <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z" fill="black"/>
        </svg>


      <!-- Выпадающее меню -->
      <div v-if="dropdownOpen" class="filters-panel__dropdown">
        <span class="filters-panel__label">Filter</span>
        <svg width="15" height="10" viewBox="0 0 15 10" fill="red" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z" fill="#EF5B70"/>
        </svg>
        <div class="filters-panel__section">
          <h4 class="filters-panel__section-title">Category</h4>
          <ul class="filters-panel__list">
            <li v-for="item in categories" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div class="filters-panel__section">
          <h4 class="filters-panel__section-title">Brand</h4>
        </div>
        <div class="filters-panel__section">
          <h4 class="filters-panel__section-title">Designer</h4>
        </div>
      </div>
    </div>

<!-- Блок 2: Кнопки -->
    <div class="filters-panel__controls">
      <button class="filters-panel__button">
        TRENDING NOW <span class="arrow">▼</span>
      </button>

      <div class="filters-panel__size-wrapper">
        <button class="filters-panel__button" @click="toggleSizeMenu">
          SIZE <span class="arrow">▼</span>
        </button>

        <div v-if="sizeMenuOpen" class="filters-panel__size-menu">
          <label v-for="size in sizes" :key="size" class="filters-panel__checkbox">
            <input type="checkbox" :value="size" v-model="selectedSizes" />
            {{ size }}
          </label>
        </div>
      </div>

      <button class="filters-panel__button">
        PRICE <span class="arrow">▼</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FiltersPanel',
  data() {
    return {
      dropdownOpen: false,
      sizeMenuOpen: false,
      selectedSizes: [],
      sizes: ['XS', 'S', 'M', 'L'],
      categories: [
        'Accessories', 'Bags', 'Denim', 'Hoodies & Sweatshirts',
        'Jackets & Coats', 'Polos', 'Shirts', 'Shoes',
        'Sweaters & Knits', 'T-Shirts', 'Tanks'
      ]
    };
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    toggleSizeMenu() {
      this.sizeMenuOpen = !this.sizeMenuOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.filters-panel {
  position: relative;
  padding: 80px 20px;
  display: flex;
  align-items: center;
  min-width: 375px;
  
  .container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 16px;

    @media (max-width: 374px) {
      min-width: 375px;
    }
  }

  .filters-panel__dropdown {
    color: #F16D7F;
  }

  &__filter {
    display: flex;
    align-items: center;
    cursor: pointer;

    .filters-panel__icon {
      font-size: 20px;
      color: #F16D7F;
    }

    .filters-panel__label {
      font-weight: 600;
      margin-left: 8px;
      margin-right: 15px;
      text-transform: uppercase;

      @media (max-width: 767px) {
        display: none;
      }
    }
  }

  &__dropdown {
    position: absolute;
    top: 48px;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    padding: 16px;
    width: 250px;
    z-index: 10;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  &__section {
    margin-bottom: 16px;
  }

  &__section-title {
    font-weight: 600;
    color: #F16D7F;
    border-left: 4px solid #F16D7F;
    padding-left: 8px;
    margin-bottom: 8px;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin: 6px 0;
      color: #333;
      cursor: pointer;
    }
  }

  &__controls {
    position: absolute;
    display: flex;
    gap: 12px;

    @media (max-width: 767px) {
      right: 0;
    }

    @media (min-width: 768px) and (max-width: 1599px) {
      right: 0;
    }

    @media (min-width: 1600px) {
      left: 50%;
      transform: translateX(-50%);
    }
  }

&__button {
    background: none;
    border: none;
    font-weight: 500;
    cursor: pointer;
    color: #333;
    display: flex;
    align-items: center;
    gap: 4px;

    .arrow {
      font-size: 12px;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  &__size-wrapper {
    position: relative;
  }

  &__size-menu {
    position: absolute;
    top: 36px;
    left: 0;
    background: white;
    border: 1px solid #ddd;
    padding: 12px;
    z-index: 999;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  &__checkbox {
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
    color: #333;
  }
}
</style>
