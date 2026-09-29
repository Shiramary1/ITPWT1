<template>
  <div class="navigation-wrapper" v-if="showLeft || showRight">
    <nav class="navigation">
      <div class="navigation__left" v-if="showLeft">
        {{ leftText }}
      </div>
      <div class="navigation__right" v-if="showRight">
        <template v-for="(item, index) in rightItems" :key="index">
          <a href="#" class="navigation__link">
            <span :class="{ active: item === activeItem }">{{ item }}</span>
          </a>
          <span v-if="index < rightItems.length - 1"> / </span>
        </template>
      </div>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  showLeft: {
    type: Boolean,
    default: true,
  },
  showRight: {
    type: Boolean,
    default: true,
  },
  leftText: {
    type: String,
    default: '',
  },
  rightItems: {
    type: Array,
    default: () => [],
  },
  activeItem: {
    type: String,
    default: '',
  },
});
</script>

<style scoped lang="scss">
.navigation-wrapper {
  width: 100%;
  background-color: #f8f3f4;
  padding: 60px 0;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 20px;

  &__left {
    color: #f16d7f;
    font-size: 1.6rem;
  }

  &__right {
    font-size: 0.9rem;

    .navigation__link {
      color: #333;
      text-decoration: none;
      margin: 0 4px;

      &:hover {
        text-decoration: underline;
      }

      .active {
        color: #f16d7f;
        font-weight: 400;
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 8px;

    &__left,
    &__right {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
