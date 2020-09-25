<template>
  <div class="cart">
    <loading :active.sync="isLoading"></loading>

    <section class="container mt-5 py-3">
      <div class="my-5 row justify-content-center">
        <div class="col-md-8">
          <div class="text-right mb-3">
            <button type="button" class="btn btn-outline-danger btn-sm" @click="removeAllCartItem">
              <i class="far fa-trash-alt"> 刪除所有品項</i>
            </button>
          </div>
          <table class="table">
            <thead>
              <th>刪除</th>
              <th>品名</th>
              <th width="200px">
                數量
              </th>
              <th>單位</th>
              <th>單價</th>
            </thead>
            <tbody v-if="cart.length">
              <tr v-for="item in cart" :key="item.id">
                <td class="align-middle">
                  <button type="button" class="btn btn-outline-danger btn-sm"
                  @click="removeCartItem(item.product.id)"
                  :disabled="status.loadingDeleteCart === item.product.id">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"
                    v-if="status.loadingDeleteCart === item.product.id"></span>
                    <i class="far fa-trash-alt" v-else></i>
                  </button>
                </td>
                <td class="align-middle">
                  {{ item.product.title }}
                </td>
                <td class="align-middle">

                  <!-- Qty Input start -->
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button class="btn btn-outline-primary"
                      type="button"
                      @click="item.quantity--; updateQuantity(item.product.id, item.quantity)"
                      :disabled="item.quantity === 1">
                      <span
                       class="spinner-border spinner-border-sm"
                       role="status" aria-hidden="true"
                        v-if="status.loadingUpdateCart === item.product.id"></span>
                        <span v-else>-</span>
                      </button>
                    </div>
                    <input id="inlineFormInputGroupUsername"
                    type="number"
                    class="form-control text-center"
                    v-model="item.quantity"
                    @change="updateQuantity(item.product.id, item.quantity)"
                    min="1">
                    <div class="input-group-append">
                      <button class="btn btn-outline-primary"
                      type="button"
                      @click="item.quantity++; updateQuantity(item.product.id, item.quantity)"
                      :disabled="status.loadingUpdateCart === item.product.id">
                      <span
                        class="spinner-border spinner-border-sm"
                        role="status" aria-hidden="true"
                        v-if="status.loadingUpdateCart === item.product.id"></span>
                      <span v-else>+</span>
                      </button>
                    </div>
                  </div>
                  <!-- Qty Input end -->

                </td>
                <td class="align-middle">
                  {{ item.product.unit }}
                </td>
                <td class="align-middle text-right">
                  {{ item.product.price | thousands }}
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" class="text-right">
                  總計
                </td>
                <td class="text-right">
                  {{ cartTotal | thousands }}
                </td>
              </tr>
            </tfoot>
          </table>
          <router-link to="/checkout">
            <button class="btn btn-primary w-100">訂單結帳</button>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
export default {
  name: 'cart',
  data() {
    return {
      cart: [], // 購物車產品資訊
      cartTotal: 0, // 購物車總價
      isLoading: false,
      fullPage: true,
      status: {
        loadingUpdateCart: '',
        loadingDeleteCart: '',
      },
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
        }).catch(() => {
          this.isLoading = false;
        });
    },
    updateTotal() {
      this.cartTotal = 0;
      this.cart.forEach((item) => {
        this.cartTotal += item.product.price * item.quantity;
      });
    },
    updateQuantity(id, quantity) {
      this.status.loadingUpdateCart = id;

      //  更新前台某一筆購物車資料 PATCH api/{uuid}/ec/shopping
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping`;

      const cart = {
        product: id,
        quantity,
      };

      this.$http.patch(url, cart)
        .then(() => {
          this.status.loadingUpdateCart = '';
          this.getCart();
        }).catch(() => {
          this.status.loadingUpdateCart = '';
        });
    },
    removeAllCartItem() {
      this.isLoading = true;
      //   前台刪除購物車全部資料 DELETE api/{uuid}/ec/shopping/all/product
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping/all/product`;
      this.$http.delete(url)
        .then(() => {
          this.isLoading = false;
          this.getCart();
        }).catch(() => {
          this.isLoading = false;
        });
    },
    removeCartItem(id) {
      this.status.loadingDeleteCart = id;

      //  刪除前台某一筆購物車資料 DELETE api/{uuid}/ec/shopping/{pid}
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/ec/shopping/${id}`;

      this.$http.delete(url, id)
        .then(() => {
          this.status.loadingDeleteCart = id;
          this.getCart();
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
