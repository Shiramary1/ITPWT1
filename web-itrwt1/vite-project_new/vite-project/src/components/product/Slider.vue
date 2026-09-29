<template>
  <section class="product-slider" v-if="images && images.length">
    <!-- Стрелка слева -->
    <button class="arrow left" @click="prevImage">
      <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.6998 3.7499L4.9498 11.4999L12.6998 19.2499L11.1498 22.3499L0.299805 11.4999L11.1498 0.649902L12.6998 3.7499Z" fill="black"/>
      </svg>
    </button>

    <div class="slider-wrapper">
      <div class="image-container">
        <!-- :src = текущий URL из массива images -->
        <img :src="images[currentIndex]" alt="Product image" />
      </div>
    </div>

    <!-- Стрелка справа -->
    <button class="arrow right" @click="nextImage">
      <svg width="13" height="23" viewBox="0 0 13 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.299805 19.2499L8.0498 11.4999L0.299805 3.7499L1.8498 0.649902L12.6998 11.4999L1.8498 22.3499L0.299805 19.2499Z" fill="black"/>
      </svg>  
    </button>
  </section>
</template>

<script setup>
import { defineProps, ref, watch } from 'vue'

// Принимаем массив изображений через пропсы
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
})

// Локальный индекс текущей картинки
const currentIndex = ref(0)

// Если проп images поменялась (при загрузке / обновлении), обнуляем currentIndex
watch(
  () => props.images,
  (newImages) => {
    if (!newImages || newImages.length === 0) {
      currentIndex.value = 0
    } else if (currentIndex.value >= newImages.length) {
      currentIndex.value = 0
    }
  }
)

function prevImage() {
  currentIndex.value =
    (currentIndex.value - 1 + props.images.length) % props.images.length
}

function nextImage() {
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}
</script>


<style lang="scss" scoped>
.product-slider {
  width: 100%;
  background-color: #f7f7f7;
  position: relative; // родитель для абсолютных стрелок
  height: 480px;

  .slider-wrapper {
    max-width: 1140px;
    margin: 0 auto;
    height: 100%;

    .image-container {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 12px;

      img {
        width: 300px;
        height: 100%;
        margin: 0 auto;
        object-fit: cover;
        display: block;
      }
    }
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 2.5rem;
    color: #333;
    cursor: pointer;
    padding: 10px;
    z-index: 10;
    width: 60px;
    background-color: #2a2a2a15;

      svg path {
    fill: black; // базовый цвет
    transition: fill 0.3s ease;
    }

    &:hover svg path {
        fill: #F16D7F; // цвет при наведении
    }

    &.left {
      left: 0; // край экрана
    }

    &.right {
      right: 0; // край экрана
    }

    span {
      display: block;
      line-height: 1;
    }
  }

  @media (max-width: 767px) {
    height: 400px;

    .arrow {
      font-size: 2rem;

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }
    }
  }
}
</style>
