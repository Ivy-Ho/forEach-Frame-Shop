<template>
  <div class="layout">
    <Navbar></Navbar>
    <main>

      <router-view/>

      <!-- subscribe start -->
      <section class="subscribe py-3 bg-light">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 col-md-6 py-2">
              <label class="mb-0 h4" for="email">
                <i class="far fa-paper-plane mr-2"></i>取得最新消息
              </label>
            </div>
            <form class="col-12 col-md-6 py-2" @submit.prevent="subscribe">
              <div class="input-group">
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="example@email.com"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                  v-model="email"
                  required>
                <div class="input-group-append">
                  <button
                  class="btn btn-outline-danger"
                  type="submit"
                  id="button-addon2">
                    訂閱
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      <!-- subscribe end -->

      <Gotop></Gotop>
    </main>

    <!-- footer start -->
    <div class="bg-dark pt-4 pb-1 py-sm-5">
      <div class="container">
        <div class="row align-items-center flex-wrap text-white">
          <!-- copyright start -->
          <div class="col-12 col-sm-8">
            <p class="h5 mb-sm-0 mb-3">© Copyright 2020 <span class="logo-ff">迴圈 ∞ 選框</span></p>
          </div>
          <!-- copyright end -->
          <div class="col-12 col-sm-4">
            <!-- social icons start -->
            <ul class="d-flex justify-content-sm-end
             justify-content-start list-unstyled h4 ml-md-3 mb-sm-0 mb-3">
              <li>
                <a href="#" class="text-white ml-0 mr-3">
                  <i class="fab fa-facebook"></i>
                </a>
              </li>
              <li><a href="#" class="text-white mx-3"><i class="fab fa-instagram"></i></a></li>
              <li><a href="#" class="text-white ml-3"><i class="fab fa-line"></i></a></li>
            </ul>
            <!-- social icons end -->
          </div>

        </div>
      </div>
    </div>
    <!-- footer end -->

  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Gotop from '@/components/Gotop.vue';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Gotop,
  },
  data() {
    return {
      email: '',
    };
  },
  methods: {
    subscribe() {
      this.$bus.$emit('message:push',
        '感謝您的訂閱!',
        'success');
      this.email = '';
    },
  },
};
</script>
