<template>
  <section class="cart-page">
    <div class="container">
      <div class="cart-page__body">
        <!-- Левая колонка: товары -->
        <div class="cart-page__items">
          <div
            v-for="(item, idx) in cartStore.items"
            :key="idx"
            class="cart-item"
          >
            <div class="cart-item__image">
              <img :src="item.product.image" :alt="item.product.title" />
            </div>
            <div class="cart-item__info">
              <!-- Удаление по клику вызывает removeFromCart -->
              <button
                class="cart-item__remove"
                @click="cartStore.removeFromCart(item.id)"
              >
                ×
              </button>
              <h3 class="cart-item__title">{{ item.product.title }}</h3>
              <p class="cart-item__detail">
                <span>Price:</span>
                <span class="highlight">{{ item.product.price }}</span>
              </p>
              <p class="cart-item__detail">
                <span>Color:</span> {{ item.product.color || '-' }}
              </p>
              <p class="cart-item__detail">
                <span>Size:</span> {{ item.product.size || '-' }}
              </p>
              <p class="cart-item__detail">
                <span>Quantity:</span>
                <input
                  type="number"
                  v-model.number="item.quantity"
                  min="1"
                  @change="onQuantityChange(item)"
                />
              </p>
            </div>
          </div>

          <div class="cart-page__actions">
            <!-- Очищаем корзину -->
            <button class="btn-outline" @click="cartStore.clearCart()">
              Clear Shopping Cart
            </button>
            
            <button class="btn-outline">
              Continue Shopping
            </button>
          </div>
        </div>

        <!-- Правая колонка: форма и summary -->
        <aside class="cart-page__sidebar">
          <div class="shipping">
            <h4 class="shipping__title">Shipping Address</h4>
            <form class="shipping__form" @submit.prevent>
              <input type="text" placeholder="Country" />
              <input type="text" placeholder="State" />
              <input type="text" placeholder="Postcode / Zip" />
              <button class="btn-outline" type="submit">
                Get a Quote
              </button>
            </form>
          </div>
          <div class="summary">
            <div class="summary__row">
              <span>Sub Total</span>
              <!-- Используем getter subTotal из стора -->
              <span>{{ cartStore.subTotal }}</span>
            </div>
            <div class="summary__row summary__row--total">
              <span>Grand Total</span>
              <span class="highlight">{{ cartStore.subTotal }}</span>
            </div>
            <div class="line"></div>
            <button class="btn-primary">Proceed to Checkout</button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

// Получаем экземпляр стора
const cartStore = useCartStore()

// При изменении инпута количества – используем action updateQuantity
function onQuantityChange(item) {
  cartStore.updateQuantity(item.product.title, item.product.quantity)
}
</script>


<style lang="scss" scoped>
@use '/src/styles/main.scss';    

.cart-page {
  padding: 60px 0;

  .container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 16px;
    @media (max-width: 374px) { min-width: 375px; }
  }

  &__body {
    width: 100%;
    display: flex;
    gap: 40px;

    @media (max-width: 1599px) {
        width: 100%;
        flex-direction: column;
    }
  }

  &__items {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 24px;

    .cart-item {
      display: flex;
      background: #fff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      border-radius: 6px;
      overflow: hidden;

      &__image {
        flex: 1;
        background: #f8f3f4;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          max-width: 100%;
          height: auto;
        }
      }

      &__info {
        flex: 2;
        padding: 24px;
        position: relative;

        .cart-item__remove {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
        }

        &__title {
          font-size: 1.1rem;
          margin-bottom: 12px;
        }
      }

      &__detail {
        margin-bottom: 8px;
        font-size: 0.9rem;
        span {
          &.highlight {
            color: #EF5B70;
            font-weight: 600;
          }
        }
        input {
          width: 48px;
          padding: 4px;
          margin-left: 25px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      }
    }
  }

  &__actions {
    display: flex;
    gap: 16px;
    margin-top: 16px;

    .btn-outline {
      flex: 1;
      padding: 12px 16px;
      background: none;
      border: 1px solid #ccc;
      text-transform: uppercase;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;

      &:hover {
        border-color: #EF5B70;
        color: #EF5B70;
      }
    }
  }

  &__sidebar {
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 40px;

    .shipping {
      .shipping__title {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 16px;
      }

      &__form {
        display: flex;
        flex-direction: column;
        gap: 12px;

        input {
          padding: 8px 12px;
          border: 1px solid #ccc;
          font-size: 0.9rem;
        }

        .btn-outline {
          align-self: start;
          padding: 8px 16px;
          background: none;
          border: 1px solid #ccc;
          text-transform: uppercase;
          font-size: 0.9rem;
          color: #4A4A4A;
          cursor: pointer;
        }
      }
    }

    .summary {
      background-color: #F5F3F3;
      padding: 24px;

      &__row {
        text-align: right;
        justify-content: space-between;
        font-size: 0.95rem;
        margin-bottom: 12px;
        text-transform: uppercase;
        font-family: 'Lato-Regular';

        &--total {
          font-family: 'Lato-Light';
        }

        span {
          color: #4A4A4A;
          margin-left: 30px;
        }

        .highlight {
          color: #EF5B70;
          font-size: 1.1rem;
        }
      }

      .line {
        background-color: #E2E2E2;
        width: 100%;
        height: 1px;
        margin: 10px 0;
      }

      .btn-primary {
        width: 100%;
        padding: 12px;
        background: #EF5B70;
        color: #fff;
        border: none;
        text-transform: uppercase;
        cursor: pointer;
        transition: background 0.2s;

        &:hover {
          background: rgba(224, 79, 95, 1);
        }
      }
    }
  }

  // 📱 Mobile: вертикальная колонка
  @media (max-width: 767px) {
    &__sidebar {
      width: 100%;
      flex-direction: column;
      gap: 20px;
    }
  }

  // 📱📲 Tablet: горизонтальная разбивка внутри sidebar
  @media (min-width: 768px) and (max-width: 1599px) {
    &__sidebar {
      width: 100%;
      flex-direction: row;
      justify-content: space-between;
      gap: 40px;

      .shipping,
      .summary {
        flex: 1;
      }

      .summary {
        max-width: 300px;
      }
    }
  }
}

</style>
