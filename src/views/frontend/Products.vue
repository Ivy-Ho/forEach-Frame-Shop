<template>
  <div class="products">
    <loading :active.sync="isLoading"></loading>

    <!-- discount modal start -->
    <div class="modal fade" id="discountModal"
     tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="position-relative discount-bgimg
           background-size-cover background-position-center min-height-300">
            <div class="position-absolute tbrl-0 bg-white opacity05 w-100 h-100 py-5">
            </div>
            <div class="position-absolute tbrl-0 top-150
             text-center d-flex flex-column align-items-center">
              <p class="h3">開幕期間全館特價再 8 折!</p>
              <p class="h3 mb-0">
                折扣碼 : <span class="text-danger">forEach2020</span>
              </p>
            </div>
          </div>
          <div class="modal-footer border-0">
            <button type="button" class="btn btn-secondary text-white"
             data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- discount modal end -->

    <header class="py-4 mt-5">
      <div class="position-relative" style="min-height: 400px;">
        <div class="position-absolute bg-third"
         style="top:0; bottom: 0; left: 0; right: 0;
        background-image:url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/bZi0dUcwgiACYkis1NokYswLXZPP4zfkvxUHDLD0BYJpLS76hJSAL47cigdcZhsBFc5T07JK52LKr3yuxquad923aTrrpUetCVkviD6MNRtM5siIPXwh4kfdhtYzXsdG.jpg);
        background-position: center center; background-repeat: no-repeat; opacity: 0.9;">
          <div class="container h-100">
            <div class="row justify-content-end align-items-center h-100">
              <div class="col-12 col-sm-6 col-md-6">
                <p class="font-weight-light mt-5 comming-up-text ">輕薄極簡「 回字框 」，即將上架。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="py-4">
      <div class="container">
        <div class="row">

          <!-- sidebar start-->
          <div class="col-12 col-md-3 mb-5">
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action border-bottom active"
               data-toggle="list" role="tab"
               @click.prevent="selectCategory('all')">
                全部商品
              </a>
              <a href="#"
              class="list-group-item border-bottom list-group-item-action"
              data-toggle="list" role="tab"
              @click.prevent="selectCategory('basic')">
                基本款
              </a>
              <a href="#"
              class="list-group-item border-bottom list-group-item-action"
              data-toggle="list" role="tab"
              @click.prevent="selectCategory('design')">
                設計款
              </a>
              <a href="#"
              class="list-group-item border-bottom list-group-item-action"
              data-toggle="list" role="tab"
              @click.prevent="selectCategory('exclusive')">
                獨家款
              </a>
            </div>
          </div>
          <!-- sidebar end-->

          <!-- 產品列表 start -->
          <div class="col-12 col-md-9">
            <div class="row">
              <ul class="col-md-6 mb-4" v-for="item in filterProducts" :key="item.id">
                <li class="card border-0 shadow-sm">
                  <a href="#" @click.prevent="goPage(item)" class="text-description-none">
                    <div style="height: 150px; background-size: cover; background-position: center"
                      :style="{backgroundImage: `url(${item.imageUrl})`}">
                      <div class="w-100 h-100 d-flex justify-content-center align-items-center
                       see-more">
                          查看更多
                      </div>
                    </div>
                  </a>
                  <div class="card-body text-left">
                    <span
                    class="badge badge-warning float-right py-1 ml-2">
                      {{ item.category }}
                    </span>
                    <h5 class="card-title">
                      <a href="#" @click.prevent="goPage(item)"
                       class="link-color-default">
                        {{ item.title }}
                      </a>
                    </h5>

                    <!-- price start -->
                    <!-- 售價(price)欄位是可選的，因此售價若為空，就顯示原價(origin_price)
                          售價若不為空，就顯示原價(origin_price)與售價(price) -->
                    <div v-if="!item.price" class="h5">
                      {{ item.origin_price | thousands }} 元
                    </div>
                    <div v-else>
                      <del><small>原價 {{ item.origin_price | thousands }} 元</small></del>
                      <div class="h5">
                        特價 <span class="text-danger">{{ item.price | thousands }}</span>元
                      </div>
                    </div>
                    <!-- price end -->

                    <!-- cart button start -->
                    <button type="button" class="btn btn-outline-danger btn-sm ml-auto w-100"
                      @click="addToCart(item.id)" :disabled="status.loadingCart === item.id">
                      <i v-if="status.loadingCart === item.id"
                      class="spinner-grow spinner-grow-sm align-middle"></i>
                      <i class="fas fa-cart-plus"></i> 加入購物車
                    </button>
                    <!-- cart button end -->

                  </div>
                </li>
              </ul>
            </div>
            <!-- <div class="d-flex justify-content-end">
              <Pagination :pages="pagination" @update="getProducts"></Pagination>
            </div> -->
          </div>
          <!-- 產品列表 end -->

        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* global $ */
// import Pagination from '@/components/Pagination.vue';

export default {
  name: 'Products',
  components: {
    // Pagination,
  },
  data() {
    return {
      products: [],
      isLoading: false,
      fullPage: true,
      pagination: {},
      category: 'all',
      filterProducts: [],
      status: {
        loadingItem: '',
        loadingCart: '',
      },
    };
  },
  methods: {
    openModal() {
      $('#discountModal').modal('show');
    },
    goPage(item) {
      this.$router.push(`/product/${item.id}`);
    },
    getProducts(num = 1) {
      this.isLoading = true;

      // 取得前台所有商品列表 GET api/{uuid}/ec/products
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/products?page=${num}`;

      this.$http.get(url)
        .then((res) => {
          this.products = res.data.data;
          this.filterProducts = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        }).catch(() => {
          this.$bus.$emit('message:push',
            '產品列表載入失敗',
            'danger');
          this.isLoading = false;
        });
    },
    addToCart(id, quantity = 1) {
      this.status.loadingCart = id;

      // 前台新增某一筆購物車資料 POST api/{uuid}/ec/shopping
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;

      const cart = {
        product: id,
        quantity,
      };

      this.$http.post(url, cart)
        .then(() => {
          this.$bus.$emit('get-cart');
          this.$bus.$emit('message:push',
            '加入成功!',
            'success');
          this.status.loadingCart = '';
        }).catch(() => {
          this.$bus.$emit('message:push',
            '加入失敗!該產品已在購物車內~',
            'danger');
          this.status.loadingCart = '';
        });
    },
    selectCategory(status) {
      const vm = this;
      switch (status) {
        case 'all':
          vm.category = '全部產品';
          vm.filterProducts = vm.products;
          break;

        case 'basic':
          vm.filterProducts = [];
          vm.category = '基本款';
          vm.products.forEach((item) => {
            if (item.category === vm.category) {
              vm.filterProducts.push(item);
            }
          });
          break;

        case 'design':
          vm.filterProducts = [];
          vm.category = '設計款';
          vm.products.forEach((item) => {
            if (item.category === vm.category) {
              vm.filterProducts.push(item);
            }
          });
          break;

        case 'exclusive':
          vm.filterProducts = [];
          vm.category = '獨家款';
          vm.products.forEach((item) => {
            if (item.category === vm.category) {
              vm.filterProducts.push(item);
            }
          });
          break;

        default:
      }
    },
  },
  created() {
    this.getProducts();
  },
  mounted() {
    this.openModal();
  },
};
</script>

<style scoped>
  .discount-bgimg {
    background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/3Fy09A1uzZNZKIIKfzvog7Qqyza3XFapScyEzOL0Rebnofu0tVG47xzG0D6c0jpHZZJsM3QtY14JTEf5tYDQfcaPz73uSfzXdBGZMAKLXnBSqWJsfIOydB95dIRYbGrv.jpg);
  }
  .top-150 {
    top: 150px;
  }
  .min-height-300 {
    min-height: 300px
  }
  .text-description-none {
    text-decoration: none;
  }
  .link-color-default {
    color: #000;
  }
  .see-more {
    color: transparent;
  }
  .see-more:hover {
    background-color: white;
    opacity: 0.7;
    color: #000;
    transition:.5s;
  }
  .comming-up-text {
    background-color: white;
    opacity: 0.7;
    text-align: center;
  }
  @media (min-width: 575px) {
    .comming-up-text {
      background-color: transparent;
      font-size: 28px;
      text-align: left;
    }
  }
</style>
