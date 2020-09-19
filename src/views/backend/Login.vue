<template>
  <div class="login">
    <div class="d-flex align-items-center justify-content-center vh-100">
      <div class="login-inner rotate mr-5 mb-5">
        <loading :active.sync="isLoading"></loading>
        <div class="container">
            <form class="form-signin" @submit.prevent="signin">
                <h1 class="h2 mb-3 text-center text-white font-weight-normal">
                    Admin Login
                    <br>∞
                </h1>
                <div class="form-group">
                    <input id="inputEmail" v-model="user.email" type="email"
                     class="form-control bg-transparent border-0 input-line text-white"
                        placeholder="Email" required autofocus>
                </div>
                <div class="form-group">
                    <input id="inputPassword" v-model="user.password"
                      type="password"
                      class="form-control bg-transparent border-0 input-line text-white"
                      placeholder="Password" required>
                    </div>
                <button class="btn btn-md btn-outline-light btn-block" type="submit">
                    Login
                </button>
            </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      token: '',
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    signin() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_APIPATH}api/auth/login`;
      this.$http.post(api, this.user)
        .then((res) => {
          const { token } = res.data;
          const { expired } = res.data;
          document.cookie = `hexToken=${token}; expired=${new Date(expired * 1000)}; path=/`;

          this.isLoading = false;
          //  跳轉至後台產品列表
          this.$router.push('/admin/AdminProducts');
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
          alert('登入失敗! 請重新輸入~');
        });
    },
  },
};
</script>

<style scoped>
  .login {
    background: url(https://images.unsplash.com/photo-1508004680771-708b02aabdc0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80);
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: grid;
    height: 100vh;
    place-items: center;
  }
  .rotate {
    transform: rotate(-2deg);
  }
  ::placeholder {
    color: #fff;
  }
</style>
