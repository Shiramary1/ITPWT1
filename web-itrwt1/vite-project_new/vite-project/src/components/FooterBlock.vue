<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <p class="footer__text">© 2021 Brand All Rights Reserved.</p>
        <div class="footer__socials">
          <a
            v-for="(icon, index) in socialIcons"
            :key="index"
            :href="icon.link"
            class="footer__icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img :src="icon.src" :alt="icon.alt" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const socialIcons = [
  {
    src: '/icons/facebook.svg',
    alt: 'Facebook',
    link: '#',
  },
  {
    src: '/icons/instagram.svg',
    alt: 'Instagram',
    link: '#',
  },
  {
    src: '/icons/pinterest.svg',
    alt: 'Pinterest',
    link: '#',
  },
  {
    src: '/icons/twitter.svg',
    alt: 'Twitter',
    link: '#',
  },
];
</script>

<style scoped lang="scss">
.footer {
  background-color: #222224;
  padding: 20px 0;

  .container {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 16px;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;

    /* Mobile: 0-767px */
    @media (max-width: 767px) {
      flex-direction: column;
      gap: 16px;
      text-align: center;
      justify-content: center;
    }

    /* Tablet: 768-1599px */
    @media (min-width: 768px) and (max-width: 1599px) {
      justify-content: space-around;
    }

    /* Desktop: 1600px+ */
    @media (min-width: 1600px) {
      justify-content: space-between;
      padding: 0 32px;
    }
  }

  &__text {
    color: white;
    font-size: 14px;
    
    /* Mobile */
    @media (max-width: 767px) {
      order: 2;
      padding: 0;
    }
    
    /* Tablet */
    @media (min-width: 768px) and (max-width: 1599px) {
      padding-left: 8px;
    }
    
    /* Desktop */
    @media (min-width: 1600px) {
      padding-left: 16px;
    }
  }

  &__socials {
    display: flex;
    gap: 10px;
    
    /* Mobile */
    @media (max-width: 767px) {
      order: 1;
      padding: 0;
    }
    
    /* Tablet */
    @media (min-width: 768px) and (max-width: 1599px) {
      padding-right: 8px;
    }
    
    /* Desktop */
    @media (min-width: 1600px) {
      padding-right: 16px;
    }
  }

  &__icon {
    width: 31px;
    height: 31px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.3s ease;

    img {
      width: 16px;
      height: 16px;
      transition: filter 0.3s ease;
    }

    &:hover {
      transform: scale(1.1);
      background-color: #F16D7F;
      
      img {
        filter: brightness(0) invert(1); /* Делаем иконки белыми при наведении */
      }
    }
  }
}
</style>