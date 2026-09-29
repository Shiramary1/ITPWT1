<template>
  <section class="categories">
    <div class="container">
      <div class="categories__grid">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="categories__item"
          :class="{ 'categories__item--wide': category.wide }"
        >
          <img :src="category.image" :alt="category.title" />
          <div class="categories__overlay">
            <p class="categories__subtitle">{{ category.subtitle }}</p>
            <p class="categories__title">{{ category.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const categories = [
  {
    image: '/images/women.jpg',
    subtitle: '30% OFF',
    title: 'FOR WOMEN',
    wide: false,
  },
  {
    image: '/images/men2.jpg',
    subtitle: 'HOT DEAL',
    title: 'FOR MEN',
    wide: false,
  },
  {
    image: '/images/kid.jpg',
    subtitle: 'NEW ARRIVALS',
    title: 'FOR KIDS',
    wide: false,
  },
  {
    image: '/images/accessories.jpg',
    subtitle: 'LUXURIOUS & TRENDY',
    title: 'ACCESSORIES',
    wide: true,
  },
];
</script>

<style scoped lang="scss">
.categories {
  padding: 40px 0;

  .container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 16px;
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 300px);
    gap: 20px;

    @media (max-width: 1139px) and (min-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 300px);
    }

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(4, 300px);
    }
  }

  &__item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.3s;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }

    &:hover img {
      transform: scale(1.1);
    }

    &--wide {
      grid-column: span 3;

      @media (max-width: 767px) {
        grid-column: span 1;
      }
    }
  }

  &__overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 1;

    .categories__subtitle {
      font-size: 14px;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }

    .categories__title {
      font-size: 20px;
      font-weight: bold;
      color: #f16d7f;
    }
  }

  &__item::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 0;
  }
}
</style>
