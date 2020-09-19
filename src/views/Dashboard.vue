<template>
  <div class="dashboard">
    <!-- navebar start -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" :to="{name: 'Home'}">
        <h1 class="logo-fz logo-ff text-secondary mb-0">
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
            <router-link class="nav-link" to="/admin/AdminProducts">產品管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders">訂單管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/images">圖片管理</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons">優惠券管理</router-link>
          </li>
          <button class="btn btn-primary ml-2" @click.prevent="signout">登出</button>
        </ul>
      </div>
    </nav>
    <!-- navebar end -->
    <router-view :token="token" v-if="checkSuccess"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      token: '',
      // 驗證登入是否成功，先預設為失敗狀態
      checkSuccess: false,
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      // 取得token
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      // 將token作為預設值
      this.$http.defaults.headers.common.Authorization = `Bearer ${this.token}`;

      // 確認 Token 狀態 POST api/auth/check
      const url = `${process.env.VUE_APP_APIPATH}api/auth/check`;
      this.$http.post(url, { api_token: this.token })
        .then((res) => {
          // 登入沒有問題
          console.log(res);
          this.checkSuccess = true;
        }).catch((err) => {
          // 驗證失敗，轉回登入頁
          console.log(err.response);
          this.$router.push('/login');
        });
    },
    signout() {
      document.cookie = 'hexToken=;expires=;';
      console.log('token 已清除');
      this.$router.push('/login');
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/earlyaccess/cwtexyen.css);
@import url(https://fonts.googleapis.com/css2?family=Baloo+Tamma+2&display=swap);

</style>
