<template>
  <div class="checkout-2">
    <section>
      <loading :active.sync="isLoading"></loading>
        <div class="vh-100 d-flex
         align-items-center checkout2-bg checkout2-bg-size">
          <div class="container text-center text-lg-left">
            <div class="opacity09 py-4 px-1 bg-sm-none">
              <h2 class="mb-3">訂購成功!</h2>
              <p class="mb-3 text-muted">感謝您的訂購，商品將為您準備出貨。</p>
              <router-link class="btn btn-primary" :to="{name: 'Products'}">
                  繼續選購
              </router-link>
            </div>
          </div>
        </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'checkout-2',
};
</script>

<style scoped>
  .checkout2-bg {
    background-image: url(https://hexschool-api.s3.us-west-2.amazonaws.com/custom/FNjKfGuE2VuF4YGuDHEHGsLdmNRkbWAdCqcwe4Xdy1HvUWQgZq5q3KR1uG5lI0ZB5HkyyS0Efcgmyf9S0IHdi2eqWBrDtdAW08WUpUPLqDODLXBWuLgHnWN7mJMtPuuf.jpg);
    background-repeat: no-repeat;
    background-position: right;
  }
  .checkout2-bg-size {
    background-size: cover;
  }
  .bg-sm-none{
    background-color: #fff;
  }
  @media (min-width: 992px) {
    .bg-sm-none{
      background-color: transparent;
    }
    .checkout2-bg-size {
      background-size: auto;
    }
  }
</style>
