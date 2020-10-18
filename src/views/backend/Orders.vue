<template>
  <div class="orders container">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mt-3 text-center">後台訂單管理列表</h2>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>
            訂單編號
          </th>
          <th>
            下單時間
          </th>
          <th>
              付款方式
          </th>
          <th>
              付款狀態
          </th>
          <th>
              應付金額
          </th>
          <th>
              編輯
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in orders" :key="item.id">
          <td>{{ item.created.timestamp }}</td>
          <td>{{ item.created.datetime }}</td>
          <td>
            {{ item.payment }}
          </td>
          <td>
              <input class="form-check-input ml-1" type="checkbox" id="paid"
                  v-model="item.paid" @change="setOrderPaid(item)">
              <label class="form-check-label ml-4" for="paid">
                <span v-if="item.paid" class="text-success">已付款</span>
                <span class="text-danger" v-else>未付款</span>
              </label>
          </td>
          <td class="text-right">
              {{ item.amount | thousands }}
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              type="button"
              :disabled="loadingBtn === item.id"
              @click="openModal(item)">
              <span class="spinner-border spinner-border-sm"
                role="status" aria-hidden="true" v-if="loadingBtn === item.id"></span>
              訂單明細
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination :pages="pagination" @update="getOrders"></Pagination>

    <!-- 訂單明細 Ordermodal start -->
      <div id="orderModal" class="modal" tabindex="-1"
       aria-labelledby="orderModal" aria-hidden="true">
        <Ordermodal v-if="tempOrder.user"
           :temp-order="tempOrder" @update="closeModal"></Ordermodal>
      </div>
    <!-- 訂單明細 Ordermodal end -->
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Ordermodal from '@/components/Ordermodal.vue';

/* global $ */
export default {
  name: 'Orders',
  components: {
    Ordermodal,
    Pagination,
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      token: '',
      isNew: '',
      loadingBtn: '',
      isLoading: false,
      fullPage: true,
    };
  },
  props: [' token '],
  methods: {
    openModal(item) {
      this.loadingBtn = item.id;

      // 後台取得單一訂單細節 GET api/{uuid}/admin/ec/orders/{id}
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}`;

      this.$http.get(url)
        .then((res) => {
          this.tempOrder = res.data.data;
          $('#orderModal').modal('show');
          this.loadingBtn = '';
        }).catch(() => {
          this.loadingBtn = '';
        });
    },
    getOrders(num = 1) {
      this.isLoading = true;

      // 取得所有訂單列表 GET api/{uuid}/admin/ec/orders
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders?page= ${num}`;

      this.$http.get(url)
        .then((res) => {
          this.orders = res.data.data;
          this.pagination = res.data.meta.pagination;
          this.isLoading = false;
        }).catch(() => {
          this.isLoading = false;
        });
    },
    closeModal() {
      this.getOrders();
      $('#orderModal').modal('hide');
    },
    setOrderPaid(item) {
      this.isLoading = true;
      let paidStatus = '';
      let url = '';
      if (item.paid) {
        // 後台 設定指定訂單為已付款 PATCH api/{uuid}/admin/ec/orders/{id}/paid
        url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/paid`;
        paidStatus = '已付款';
      } else {
        // 後台 設定指定訂單為尚未付款PATCH api/{uuid}/admin/ec/orders/{id}/unpaid
        url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/orders/${item.id}/unpaid`;
        paidStatus = '未付款';
      }

      this.$http.patch(url, item.id)
        .then(() => {
          this.$bus.$emit('message:push',
            `已修改訂單付款狀態為 ${paidStatus}`,
            'success');
          this.getOrders();
          this.isLoading = false;
        }).catch(() => {
          this.$bus.$emit('message:push',
            '出現錯誤!',
            'danger');
          this.isLoading = false;
        });
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
