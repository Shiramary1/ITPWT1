<template>
  <section class="featured">
    <div class="container">
      <!-- Header -->
      <div v-if="showHeader" class="featured__header">
        <h2 v-if="title" class="featured__title">{{ title }}</h2>
        <p v-if="subtitle" class="featured__subtitle">{{ subtitle }}</p>
      </div>

      <div class="featured__grid">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="featured__card"
        >
          <div class="featured__card-image-wrapper">
            <img
              :src="product.image"
              :alt="product.title"
              class="featured__card-image"
            />
            <div class="featured__card-overlay">
              <!-- Обработчик клика вызывает addToCart(product) -->
              <button class="featured__add-to-cart" @click="addToCart(product)">
                <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21.876 22.2662C21.921 22.2549 21.9423 22.2339 21.96 22.2129C21.9678 22.2037 21.9756 22.1946 21.9835 22.1855C22.02 22.1438 22.0233 22.0553 22.0224 22.0105C22.0092 21.9044 21.9185 21.8315 21.8412 21.8315C21.8375 21.8315 21.8336 21.8317 21.8312 21.8318C21.7531 21.8372 21.6653 21.9409 21.6719 22.0625C21.6813 22.1793 21.7675 22.2662 21.8392 22.2662H21.876ZM8.21954 22.2599C8.31873 22.2599 8.39935 22.1655 8.39935 22.0496C8.39935 21.9341 8.31873 21.8401 8.21954 21.8401C8.12042 21.8401 8.03973 21.9341 8.03973 22.0496C8.03973 22.1655 8.12042 22.2599 8.21954 22.2599ZM21.9995 24.2662C21.9517 24.2662 21.8878 24.2662 21.8392 24.2662C20.7017 24.2662 19.7567 23.3545 19.6765 22.198C19.5964 20.9929 20.4937 19.9183 21.6953 19.8364C21.7441 19.8331 21.7928 19.8315 21.8412 19.8315C22.9799 19.8315 23.9413 20.7324 24.019 21.8884C24.0505 22.4915 23.8741 23.0612 23.4898 23.5012C23.1055 23.9575 22.5764 24.2177 21.9995 24.2662ZM8.21954 24.2599C7.01532 24.2599 6.03973 23.2709 6.03973 22.0496C6.03973 20.8291 7.01532 19.8401 8.21954 19.8401C9.42371 19.8401 10.3994 20.8291 10.3994 22.0496C10.3994 23.2709 9.42371 24.2599 8.21954 24.2599ZM21.1984 17.3938H9.13306C8.70013 17.3938 8.31586 17.1005 8.20331 16.6775L4.27753 2.24768H1.52173C0.993408 2.24768 0.560547 1.80859 0.560547 1.27039C0.560547 0.733032 0.993408 0.292969 1.52173 0.292969H4.99933C5.43134 0.292969 5.81561 0.586304 5.9281 1.01025L9.85394 15.4391H20.5576L24.1144 7.13379H12.2578C11.7286 7.13379 11.2957 6.69373 11.2957 6.15649C11.2957 5.61914 11.7286 5.17908 12.2578 5.17908H25.5886C25.9091 5.17908 26.2141 5.34192 26.3896 5.61914C26.566 5.89539 26.5984 6.23743 26.4697 6.547L22.0795 16.807C21.9193 17.1653 21.5827 17.3938 21.1984 17.3938Z" fill="white"/>
                </svg>
                Add to Cart
              </button>
            </div>
          </div>

          <h3 class="featured__card-title">{{ product.title }}</h3>
          <p class="featured__card-desc">{{ product.description }}</p>
          <p class="featured__card-price">{{ product.price }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div v-if="showFooter" class="featured__button-wrap">
        <button class="featured__button">{{ footerButtonText }}</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';
import { useCartStore } from '@/stores/cartStore'; // подключаем Pinia-стор корзины

// Получаем пропсы
const props = defineProps({
  products: {
    type: Array,
    required: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Featured Items'
  },
  subtitle: {
    type: String,
    default: 'Shop for items based on what we featured in this week'
  },
  showFooter: {
    type: Boolean,
    default: true
  },
  footerButtonText: {
    type: String,
    default: 'Browse All Products'
  }
});

// Создаём экземпляр стора
const cartStore = useCartStore();

/**
 * Обработчик клика по кнопке “Add to Cart”
 * @param {Object} product – объект товара, переданный из родителя
 */
function addToCart(product) {
  // Передаём в стора всю информацию о продукте и количество
  // Если хотите всегда класть quantity=1, то:
  cartStore.addToCart(product, 1);
}
</script>




<style scoped lang="scss">

.featured__card {
  position: relative;
}

.featured__card-image-wrapper {
  position: relative;
  /* ... стили ... */
}

.featured__card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  /* фон затемнения, центрирование кнопки и т.п. */
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}

.featured__card:hover .featured__card-overlay {
  display: flex;
}

.featured__add-to-cart {
  /* ваши стили кнопки */
  background-color: #EF5B70;
  color: white;
  border: none;
  padding: 0.5em 1em;
  cursor: pointer;
  border-radius: 4px;
}






.featured {
  padding: 40px 0;

  .container {
    display: block; 
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 16px;
  }

  &__header {
    text-align: center;
    margin-bottom: 40px;

    .featured__title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 10px;

      @media (min-width: 1600px) {
        font-size: 28px;
      }

      @media (max-width: 1139px) and (min-width: 768px) {
        font-size: 22px;
      }

      @media (max-width: 767px) {
        font-size: 20px;
      }
    }

    .featured__subtitle {
      font-size: 16px;
      color: #7d7d7d;

      @media (min-width: 1600px) {
        font-size: 18px;
      }

      @media (max-width: 1139px) and (min-width: 768px) {
        font-size: 15px;
      }

      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
  }

  &__grid {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 1599px) and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 767px) {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

.featured__add-to-cart {
  background: none;
  border: 1px solid white;
  padding: 12px;
  color: white;

  svg {
    margin-bottom: -7px;
    margin-right: 4px;
  }
}

  &__card {
    background: #F8F8F8;
    padding: 15px;
    display: flex;
    flex-direction: column;
    text-align: left;

    &-image-wrapper {
      position: relative;
      width: 100%;
      margin-bottom: 15px;
      overflow: hidden;
    }

    &-image {
      width: 100%;
      height: auto;
      display: block;
      transition: all 0.3s ease;
    }

    &-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(58, 56, 56, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    &:hover &-overlay {
      opacity: 1;
    }

    &:hover &-image {
      transform: scale(1.05);
    }

    &-add-to-cart {
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #fff;
      padding: 10px 15px;
      color: white;
      font-size: 14px;
      cursor: pointer;
      background-color: transparent;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      svg {
        margin-right: 10px;
        width: 20px;
        height: 20px;
      }
    }

    &-title {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;

      @media (min-width: 1600px) {
        font-size: 16px;
      }

      @media (max-width: 767px) {
        font-size: 15px;
      }
    }

    &-desc {
      font-size: 13px;
      color: #7d7d7d;
      margin-bottom: 10px;

      @media (min-width: 1600px) {
        font-size: 14px;
      }

      @media (max-width: 767px) {
        font-size: 12px;
      }
    }

    &-price {
      color: #f16d7f;
      font-size: 16px;
      font-weight: 600;

      @media (min-width: 1600px) {
        font-size: 18px;
      }

      @media (max-width: 767px) {
        font-size: 15px;
      }
    }
  }

  &__button-wrap {
    text-align: center;
    margin-top: 40px;

    .featured__button {
      padding: 12px 30px;
      border: 1px solid #f16d7f;
      color: #f16d7f;
      font-size: 14px;
      font-weight: 500;
      background: transparent;
      cursor: pointer;
      transition: background 0.3s, color 0.3s;

      @media (min-width: 1600px) {
        font-size: 16px;
        padding: 14px 35px;
      }

      @media (max-width: 767px) {
        font-size: 13px;
        padding: 10px 25px;
      }

      &:hover {
        background: #f16d7f;
        color: white;
      }
    }
  }
}
</style>