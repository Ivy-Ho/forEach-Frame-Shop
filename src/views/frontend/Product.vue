<template>
  <div class="product">
    <loading :active.sync="isLoading"></loading>

    <section class="container py-5 mt-5">
      <div class="row mb-3">
        <!-- product img start -->
        <div class="col-12 col-md-6">
          <img :src="product.imageUrl" class="w-100" alt="產品圖片">
        </div>
        <!-- product img end -->

        <!-- product detail start -->
        <div class="col-12 col-md-6">
          <h3 class="mb-3">{{ product.title }}</h3>
          <div v-if="!product.price" class="h5">
            {{ product.origin_price | thousands }} 元
          </div>
          <div class="mb-3" v-else>
            <del><small>原價 {{ product.origin_price | thousands }} 元</small></del>
            <div class="h4 text-primary">
             <span>{{ product.price | thousands }}</span>元
            </div>
          </div>

          <!-- Qty Input start -->
          <form class="mb-3 d-flex text-third">
            <div class="input-group">
              <button type="button"
               class="btn btn-outline-dark qty-btn-border text-third"
               @click="productQty = (productQty - 1)"
                :disabled="productQty === 1">
                <i class="fa fa-minus"></i>
              </button>
              <input
               class= "text-center qty-input-w qty-input-border text-third"
               :value= "productQty"
                onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
              <button type="button"
               class="btn btn-outline-dark qty-btn-border text-third"
               @click="productQty = (productQty + 1)">
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </form>
          <!-- Qty Input end -->

          <!-- cart button start  -->
          <button type="button" class="btn btn-danger text-white w-100 mb-1"
            @click="addToCart(product.id, productQty)"
             :disabled="status.loadingCart === product.id">
            <i v-if="status.loadingCart === product.id"
            class="spinner-grow spinner-grow-sm align-middle"></i>
            加入購物車
          </button>
          <!-- cart button end  -->

          <hr>
          <div class="d-none d-lg-block">
            <h5 class="font-weight-normal">
              <span>產品描述</span>
            </h5>
            <p class="text-third">
              {{ product.description }}
            </p>
            <h5 class="font-weight-normal">
              <span>產品規格</span>
            </h5>
            <p class="text-third">
              {{ product.content }}
            </p>
          </div>

        </div>
        <!-- product detail end -->
      </div>

      <div class="row d-lg-none">
        <div class="col-12">
          <h5 class="font-weight-normal">
            <span>產品描述</span>
          </h5>
          <p class="text-third">
            {{ product.description }}
          </p>
        </div>
        <div class="col-12 col-sm-6">
          <h5 class="font-weight-normal">
            <span>產品規格</span>
          </h5>
          <p class="text-third">
            {{ product.content }}
          </p>
        </div>
      </div>
    </section>

    <!-- popular products swiper start -->
    <section class="bg-white">
      <div class="container py-3">
        <h4 class="mb-3 font-weight-normal">精選人氣商品</h4>
        <Swiper></Swiper>
      </div>
    </section>
    <!-- popular products start -->
  </div>
</template>

<script>
import Swiper from '@/components/Swiper.vue';

export default {
  components: {
    Swiper,
  },
  data() {
    return {
      product: {},
      isLoading: false,
      fullPage: true,
      productQty: 1,
      status: {
        loadingCart: '',
      },
    };
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.isLoading = true;
      const { id } = this.$route.params;
      this.$http.get(`${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/product/${id}`)
        .then((res) => {
          this.product = res.data.data;
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
  },
};
</script>

<style scoped>
  /* qty input group start*/
  .qty-btn-border {
    border: 1px solid #848484;
  }
  .qty-input-border {
    border-top: 1px solid #848484;
    border-bottom: 1px solid#848484;
    border-right: none;
    border-left: none;
  }
  /* qty input group end*/
</style>
