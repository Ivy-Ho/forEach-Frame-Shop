<template>
  <div>
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">訂單明細</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <section class="mb-4">
            <h3 class="border-bottom pb-2">訂購人資料</h3>
            <p>姓名 : {{ tempOrder.user.name }}</p>
            <p>電話 : {{ tempOrder.user.tel }}</p>
            <p>信箱 : {{ tempOrder.user.email }}</p>
            <p>地址 : {{ tempOrder.user.address }}</p>
          </section>
          <section>
            <h3 class="border-bottom pb-2">訂單資訊</h3>
            <p>訂購商品項目 :</p>
            <ul v-for="(item) in tempOrder.products" :key="item.product.title">
              <li>{{ item.product.title }}
                <small>
                  {{item.product.price | thousands }}
                  x {{ item.quantity }} {{ item.product.unit }}
                </small>
              </li>
            </ul>
            <p v-if="tempOrder.coupon">優惠券 : {{ tempOrder.coupon.title }}</p>
            <p>應付總金額 : {{ parseInt(tempOrder.amount) + 100 | thousands }}</p>
            <p>訂單備註 : {{ tempOrder.message }}</p>
            <p>付款方式 : {{ tempOrder.payment }}</p>
            <p>付款狀態 :
              <span v-if="tempOrder.paid" class="text-success">已付款</span>
              <span class="text-danger" v-else>未付款</span>
            </p>
          </section>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary text-white"
           data-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Ordermodal',
  props: ['tempOrder'],
};
</script>

<style>
  .close {
    z-index: 1000;
  }
</style>
