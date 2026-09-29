<template>
  <section class="hero">
    <div class="container hero__content">
      <!-- Левая часть: изображение, скрывается на мобилках -->
      <div class="hero__left">
        <img src="/men1.png" alt="Hero image" />
      </div>

      <!-- Правая часть: текст -->
      <div class="hero__right">
        <div class="text-box">
          <div class="line"></div>
          <div class="titles">
            <h1><span>THE BRAND</span></h1>
            <h2>
              <span>OF LUXERIOUS</span>
              <span class="pink">FASHION</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  background-color: #fdecec;
  padding: 0;

  .hero__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 16px;

    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .hero__left {
    flex: 1;
    img {
      max-width: 100%;
      height: auto;
      margin-bottom: -4px;
    }

    @media (max-width: 767px) {
      display: none;
    }
  }

  .hero__right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    text-align: left;
    padding: 40px 0;

    @media (max-width: 767px) {
      justify-content: center;
      width: 100%;
    }

    .text-box {
      display: flex;
      align-items: flex-start;

      .line {
        width: 11px;
        height: 100%;
        background-color: #f16d7f;
        margin-right: 16px;
      }

      .titles {
        h1,
        h2 {
          margin: 0;
          line-height: 1.1;
        }

        h1 span {
          font-size: 42px;
          font-weight: 700;
          color: #000;

          @media (max-width: 767px) {
            font-size: 28px;
          }
        }

        h2 span {
          font-size: 30px;
          font-weight: 600;
          color: #000;

          @media (max-width: 767px) {
            font-size: 20px;
          }

          &.pink {
            color: #f16d7f;
            margin-left: 10px;
          }
          
        }
      }
    }
  }
}
</style>