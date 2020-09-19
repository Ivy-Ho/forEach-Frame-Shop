<template>
  <div class="checkout">
    <loading :active.sync="isLoading"></loading>
    <section class="mt-75 py-3">
      <div v-if="cart.length" class="container min-vh-100">
        <div class="row">
          <div class="col-12 col-lg-8">
            <h3 class="mb-3">
              <small class="rounded-circle bg-dark text-white num-icon-padding">1</small>
              購物車
            </h3>
            <table class="table">
              <thead>
                <th>商品</th>
                <th>數量</th>
                <th></th>
                <th class="text-center">單價</th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="item in cart" :key="item.id">
                  <td class="align-middle d-flex align-items-center flex-wrap flex-lg-nowrap">
                    <img
                    class="mr-2 mb-2 mb-lg-0 d-none d-sm-block"
                    style="width: 100px;"
                    :src="item.product.imageUrl[0]" alt="product image" />
                    <p class="mb-0">
                      {{ item.product.title }}
                    </p>
                  </td>
                  <td class="align-middle">
                    <div class="input-group d-flex">
                      <div class="input-group-prepend">
                        <button class="btn btn-outline-dark qty-btn-border"
                        type="button"
                        @click="item.quantity--; updateQuantity(item.product.id, item.quantity)"
                        :disabled="item.quantity === 1">
                        -
                        </button>
                      </div>
                      <input id="inlineFormInputGroupUsername"
                      class="form-control text-center qty-input-border input-width"
                      v-model="item.quantity"
                      onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
                      @change="updateQuantity(item.product.id, item.quantity)"
                      min="1">
                      <div class="input-group-append">
                        <button class="btn btn-outline-dark qty-btn-border"
                        type="button"
                        @click="item.quantity++; updateQuantity(item.product.id, item.quantity)"
                        :disabled="status.loadingUpdateCart === item.product.id">
                        +
                        </button>
                      </div>
                    </div>
                  </td>
                  <td class="align-middle text-center">
                    <p class="d-none d-md-block mb-0">
                      {{ item.product.unit }}
                    </p>
                  </td>
                  <td class="align-middle text-right">
                    {{ item.product.price | thousands }}
                  </td>
                  <td class="align-middle text-center">
                    <button type="button" class="btn btn-sm"
                    @click="removeCartItem(item.product.id)"
                    :disabled="status.loadingDeleteCart === item.product.id">
                    <span class="spinner-border spinner-border-sm"
                      role="status" aria-hidden="true"
                      v-if="status.loadingDeleteCart === item.product.id"></span>
                      <span aria-hidden="true" v-else>&times;</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="col-12 col-lg-4">
            <!-- total start -->
            <div class="py-3 py-sm-0">
              <h3 class="mb-0 border-bottom pb-3">
                <small class="rounded-circle bg-dark text-white num-icon-padding">2</small>
                訂單金額確認
              </h3>
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row" class="border-0 px-0
                      font-weight-normal text-muted">小計</th>
                    <td class="text-right border-0 px-0 text-muted">
                      {{ cartTotal | thousands}}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 pt-4
                      font-weight-normal text-muted">運費</th>
                    <td class="text-right border-0 px-0 pt-4 text-muted">
                      NT$100
                    </td>
                  </tr>
                  <tr v-if="coupon.enabled">
                    <th scope="row" class="border-0 px-0 pt-0 pb-4
                    font-weight-normal text-muted">優惠促銷</th>
                    <td class="text-right border-0 px-0 pt-0 pb-4 text-muted">
                      - {{ couponInt | thousands}}
                    </td>
                  </tr>
                  <tr v-if="coupon.enabled">
                    <th scope="row" class="border-0 p-0 font-weight-normal">
                      <small class="text-success">
                        <i class="far fa-check-circle"></i> {{ coupon.title }}
                      </small>
                    </th>
                  </tr>
                  <tr>
                    <td colspan="2"  class="border-bottom border-dark border-top-0
                    px-0 pt-0 pb-4 font-weight-normal">
                      <div class="input-group">
                        <input type="text" class="form-control"
                        v-model="coupon_code"
                        placeholder="請輸入折扣碼"
                        aria-label="Recipient's username"
                          aria-describedby="button-addon2">
                        <div class="input-group-append">
                          <button
                          class="btn btn-outline-warning"
                          @click="addCoupon"
                          type="button" id="button-addon2">
                            套用
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 pb-4 font-weight-normal">總金額</th>
                    <td v-if="coupon.enabled" class="text-right h4 border-0 px-0 pb-4">
                      {{ cartTotal - couponInt + deliveryFee | thousands }}
                    </td>
                    <td v-else class="text-right h4 border-0 px-0">
                      {{ cartTotal + deliveryFee | thousands }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" class="border-0 px-0 pb-4 font-weight-normal"></th>
                    <td colspan="2"  class="border-0 px-0 pt-0 pb-4 font-weight-normal
                    d-flex justify-content-end w-100">
                      <a class="goto-form link link-primary h5 d-none d-md-block"
                      @click.prevent="gotoForm">
                      <p>
                        <i class="fas fa-chevron-circle-down"></i> 下一步
                      </p>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- total end -->
          </div>
        </div>
      </div>

      <div v-else
        class="vh-100 d-flex
        align-items-center checkout-bg checkout-bg-size">
        <div class="container text-center text-lg-left">
          <div class="opacity09 py-4 px-1 bg-sm-none">
            <h4 class="mb-3 text-muted">您的購物車中沒有商品!</h4>
            <router-link class="btn btn-primary" :to="{name: 'Products'}">
                繼續選購
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <hr v-if="cart.length" id="orderForm" class="pt-75 d-none d-md-block">

    <section v-if="cart.length">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8">
            <h3 class="mb-3">
              <small class="rounded-circle bg-dark text-white num-icon-padding">3</small>
              填寫訂單
            </h3>
            <validation-observer v-slot="{ invalid }" class="col-md-6">
              <form @submit.prevent="createOrder">
                <div class="form-group">
                  <validation-provider rules="required" v-slot="{ errors, classes}">
                    <label for="username">*收件人姓名</label>
                    <input id="username" type="text" name="username"
                      v-model="form.name" class="form-control"
                      :class="classes">
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider rules="required|email" v-slot="{ errors, classes}">
                    <label for="email">*Email</label>
                    <input id="email" type="email" name="email"
                    v-model="form.email" class="form-control" :class="classes">
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider rules="required|min:8" v-slot="{ errors, classes}">
                    <label for="tel">*電話</label>
                    <input id="tel" type="tel" name="tel"
                    v-model="form.tel" class="form-control" :class="classes">
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider rules="required" v-slot="{ errors, classes}">
                    <label for="address">*地址</label>
                    <input id="address" type="text" name="address"
                    v-model="form.address" class="form-control" :class="classes">
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <validation-provider rules="required" v-slot="{ errors}">
                    <label for="payment">*付款方式</label>
                    <select id="payment" name="payment" v-model="form.payment" class="form-control">
                      <option value="" disabled>
                        請選擇付款方式
                      </option>
                      <option value="WebATM">
                        WebATM
                      </option>
                      <option value="ATM">
                        ATM
                      </option>
                      <option value="CVS">
                        CVS
                      </option>
                      <option value="Barcode">
                        Barcode
                      </option>
                      <option value="Credit">
                        Credit
                      </option>
                      <option value="ApplePay">
                        ApplePay
                      </option>
                      <option value="GooglePay">
                        GooglePay
                      </option>
                    </select>
                    <!-- 錯誤訊息 -->
                    <span class="invalid-feedback">{{ errors[0] }}</span>
                  </validation-provider>
                </div>
                <div class="form-group">
                  <label for="message">留言</label>
                  <textarea id="message" type="message" v-model="form.message"
                  class="form-control" cols="30" rows="3"></textarea>
                </div>
                <div class="text-right">
                  <button type="submit" class="btn btn-primary" :disabled="invalid">確認結帳</button>
                </div>
              </form>
            </validation-observer>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'cart',
  data() {
    return {
      cart: [], // 購物車產品資訊
      cartTotal: 0, // 購物車總價
      deliveryFee: 100,
      isLoading: false,
      fullPage: true,
      status: {
        loadingUpdateCart: '',
        loadingDeleteCart: '',
      },
      form: {
        name: '',
        email: '',
        phone: '',
        address: '',
        purchase: '',
        message: '',
      },
      coupon_code: '',
      coupon: {},
      couponInt: 0,
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;

      // 取得前台購物車列表 GET api/{uuid}/ec/shopping
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.cart = res.data.data;
          this.updateTotal();
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    updateTotal() {
      this.cartTotal = 0;
      this.cart.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity;
      });
    },
    updateQuantity(id, quantity) {
      this.isLoading = true;

      //  更新前台某一筆購物車資料 PATCH api/{uuid}/ec/shopping
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;

      const cart = {
        product: id,
        quantity,
      };

      this.$http.patch(url, cart)
        .then(() => {
          this.isLoading = false;
          this.$bus.$emit('get-cart');
          this.getCart();
        }).catch((err) => {
          this.isLoading = false;
          console.log(err);
        });
    },
    removeCartItem(id) {
      this.status.loadingDeleteCart = id;

      //  刪除前台某一筆購物車資料 DELETE api/{uuid}/ec/shopping/{pid}
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;

      this.$http.delete(url, id)
        .then(() => {
          this.status.loadingDeleteCart = id;
          this.$bus.$emit('get-cart');
          this.getCart();
        }).catch((err) => {
          console.log(err);
        });
    },
    createOrder() {
      this.isLoading = true;
      // 前台新增一筆訂單 POST api/{uuid}/ec/orders
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/orders`;
      const order = { ...this.form };
      if (this.coupon.enabled) {
        order.coupon = this.coupon.code;
      } else {
        order.coupon = '';
      }
      this.$http.post(url, order)
        .then((res) => {
          console.log(res);
          this.isLoading = false;
          this.$bus.$emit('get-cart');
          // 清空表單資料
          this.$data.form = this.$options.data().form;
          // 跳轉頁面
          this.$router.push('/Checkout-2');
        }).catch((err) => {
          this.isLoading = false;
          console.log(err.response);
          this.$bus.$emit('message:push',
            '糟糕!訂單送出失敗!',
            'danger');
        });
    },
    addCoupon() {
      this.isLoading = true;
      // 前台透過優惠券 Code 去搜尋優惠券。 POST api/{uuid}/ec/coupon/search
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/coupon/search`;
      this.$http.post(url, { code: this.coupon_code })
        .then((res) => {
          console.log('取得優惠券', res);
          this.coupon = res.data.data;
          this.form.coupon = res.data.data.code;
          const total = this.cartTotal * ((100 - this.coupon.percent) / 100);
          this.couponInt = parseInt(total, 10);
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err.response);
          this.coupon_code = '';
          this.isLoading = false;
        });
    },
    gotoForm() {
      $('html,body').animate({ scrollTop: $('#orderForm').offset().top }, 'show');
      return false;
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style scoped>
  .mt-75 {
    margin-top: 75px;
  }
  .pt-75 {
    padding-top: 75px;
  }
  .num-icon-padding {
    padding: 5px 15px;
  }
  .goto-form {
    transition: all 0.5s;
    cursor: pointer;
  }
  .checkout-bg {
    background-image: url(https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80);
    background-repeat: no-repeat;
    background-position: right;
  }
  .checkout-bg-size {
    background-size: cover;
  }
  .bg-sm-none{
    background-color: #fff;
  }
  @media (min-width: 992px) {
    .bg-sm-none{
      background-color: transparent;
    }
    .checkout-bg-size {
      background-size: auto;
    }
  }
</style>
