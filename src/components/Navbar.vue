<template>
  <!-- navebar start -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light opacity09">
      <div class="container">
        <router-link class="navbar-brand" :to="{name: 'Home'}">
          <h1 class="logo-ff logo-fz text-secondary mb-0">
            迴圈 ∞ 選框
          </h1>
        </router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse"
          data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">首頁
                <span class="sr-only">(current)</span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">品牌故事</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products">產品列表</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/checkout">結帳({{ cart.length }})
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- navebar end -->
</template>

<script>

export default {
  name: 'Navbar',
  components: {
  },
  data() {
    return {
      cart: [],
    };
  },
  created() {
    this.getCart();
    this.$bus.$on('get-cart', () => {
      this.getCart();
    });
  },
  methods: {
    getCart() {
      // 取得前台購物車列表 GET api/{uuid}/ec/shopping
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.$http.get(url)
        .then((res) => {
          this.cart = res.data.data;
          this.updateTotal();
        }).catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}
.bage-position {
  top: -1px;
  right: -1px;
}
</style>
