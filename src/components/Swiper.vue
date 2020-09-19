<template>
    <swiper class="swiper"
     :options="swiperOption">
    <swiper-slide v-for="item in popProducts" :key="item.id">
      <router-link :to="`/product/${item.id}`" target="_blank">
        <div class="pop-pic mb-1 mb-md-3">
          <span class="sale-icon bg-warning text-white">sale</span>
          <img :src="`${item.img[0]}`" alt="">
        </div>
        <div class="text-dark text-center">
          <h5 class="mb-2">{{ item.title }}</h5>
          <div class="d-flex justify-content-center">
            <p class="mr-2">{{ item.price | thousands }}</p>
            <del class="text-third"><small>{{ item.origin_price | thousands }}</small></del>
          </div>
        </div>
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
    <!-- <div class="swiper-button-next" slot="button-next"></div> -->
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
// import 'swiper/css/swiper.css';
import 'swiper/swiper-bundle.css';

export default {
  name: 'swiper-example-free-mode',
  title: 'Free mode / No fixed positions',
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 5,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          // when window width is >= 896px
          897: {
            slidesPerView: 4,
          },
          // when window width is >= 668px
          668: {
            slidesPerView: 3,
          },
          // when window width is >= 569px
          569: {
            slidesPerView: 2,
          },
        },
      },
      popProducts: [
        {
          id: '0EIdvmIaR4de5OWWaW8CT9BC5XSOv3ZldcMsFrtyaLXpwwOcjAFKdi2RujzhFFvu',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/FjhWJrGDsXr5zKtBdLafu2gDrcWMT2yM3jC1Iqrju5pxE5yUio9AYHR8JyAL9mcDIHfTCO7Y8doeAtbxXW0pnt2QBHxpqr3qwtKvAdsvsGLDUL6d2eW18gsg4MMVvuXi.jpg',
          ],
          title: '北歐極簡床頭相框-簡約白',
          price: 329,
          origin_price: 400,
        },
        {
          id: 'BZaZG9vuu0AIZn1Ini72MmOwGakDJM8id1LDsrxstgsWcHKohYE911CB5p0emFlr',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/apeklq1IW0BtkvasBOyx5LwXdUfZ0F4AJJh7bI1tWaAU8WfFWgMkub0kpbKiN6WSgg81K60seJce36dsfNfoyb1ileKfsqEz0SDeFpK6nwezx9LHsd6XmjHSSZhY9Iyg.jpg',
          ],
          title: '森林系木紋三件組',
          price: 999,
          origin_price: 1380,
        },
        {
          id: 'gspmPIPiJUHq86PitMOH9p5zf8KTGkC1A7MKSJVlV0zLRnHVsKXoVvnBLi6iaRcb',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/1ddF78g7I6RsldLWvFfjItpaWSXaBa0L0L00gLhQwE9JyBYdkdcMhgYXaEpneVMzSnUKKRfmZxAMUZD6CJpaL4KYdh9S4c8TauaGqBoEIum48YCkQbxRkUvhTYCnxesB.jpg',
          ],
          title: '丹麥銅邊畫框',
          price: 1050,
          origin_price: 1390,
        },
        {
          id: '1wThN2ceAiqhMSZ0bcd2OkASdKwKdQZFYJM6GdajZMbWIafmv3KHk8gmpYCWP7p3',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/tpfwwu7YHV1ahH8ofaouPu64HR06GQtCaj48ChFchzxwwwAsyT6TDtwmirNKRfIosuKoMMIrQ64r55gSLYSuCl80X7zqDELgoO0yn2VSPRLgPzj30967nW9hIRbU8MzQ.jpg',
          ],
          title: '細邊幾何金屬設計框-質感黑',
          price: 599,
          origin_price: 720,
        },
        {
          id: 'lgUlxENCaUb8QExvczlZNUt0P0oPwKoB0r5ndFATVh0divsiXW7IybKlSlD4su4U',
          img: [
            'https://hexschool-api.s3.us-west-2.amazonaws.com/custom/bBZ1oxu1gGdv7kejwhvf96rHrmgwehuA5NHMWEwIdrCuhpnkGrR64uFoENjCsxEpltjHmQ6NA3GkMsprxj2vK93GO9venGx7sTjbFyfoy5k4QV1IX1SFuJdVX7uHSXfb.jpg',
          ],
          title: '細窄邊金屬畫框-香檳金',
          price: 499,
          origin_price: 650,
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
  img {
    max-width: 100%;
    height: auto;
  }
  .swiper-slide a{
    text-decoration: none;
  }
  .pop-pic {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  .sale-icon {
    padding: 2px 5px;
    position: absolute;
    top: 0;
    left: 0;
  }
  // sm
  @media (min-width: 568px) {
    .pop-pic {
      height: 150px;
    }
  }
  // md
  @media (min-width: 768px) {
    .pop-pic {
      height: 180px;
    }
  }
</style>
