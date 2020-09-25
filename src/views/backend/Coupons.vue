<template>
  <div class="coupons container">
    <Loading :active.sync="isLoading" />
    <div class="text-right mt-4">
      <button
        class="btn btn-primary"
        @click="openCouponModal('created')"
      >
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in coupons"
          :key="key"
        >
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}</td>
          <td>{{ item.deadline.datetime }}</td>
          <td>
            <span
              v-if="item.enabled"
              class="text-success"
            >啟用</span>
            <span
              v-else
              class="text-muted"
            >未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-outline-primary btn-sm"
                @click="openCouponModal('edit', item)"
              >
                編輯
              </button>
              <button
                class="btn btn-outline-danger btn-sm"
                @click="openCouponModal('delete', item)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- couponModal start -->
    <div
      id="couponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              建立優惠券
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                id="title"
                v-model="tempCoupon.title"
                type="text"
                class="form-control"
                placeholder="請輸入標題"
              >
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input
                id="coupon_code"
                v-model="tempCoupon.code"
                type="text"
                class="form-control"
                placeholder="請輸入優惠碼"
              >
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input
                id="due_date"
                v-model="due_date"
                type="date"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="due_time">到期時間</label>
              <input
                id="due_time"
                v-model="due_time"
                type="time"
                step="1"
                class="form-control"
              >
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input
                id="price"
                v-model="tempCoupon.percent"
                type="number"
                class="form-control"
                placeholder="請輸入折扣數量"
              >
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  id="enabled"
                  v-model="tempCoupon.enabled"
                  class="form-check-input"
                  type="checkbox"
                >
                <label
                  class="form-check-label"
                  for="enabled"
                >是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              關閉
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateCoupon"
            >
              {{ status === 'created' ? '新增優惠卷' : '更新優惠券' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- couponModal end -->

    <!-- delCouponModal start -->
    <div
      id="delCouponModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog"
        role="document"
      >
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5
              id="exampleModalLabel"
              class="modal-title"
            >
              <span>刪除優惠卷</span>
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-dismiss="modal"
            >
              取消
            </button>

            <button
              type="button"
              class="btn btn-danger"
              @click="delCoupon"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- delCouponModal end -->

  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Coupons',
  props: [' token '],
  data() {
    return {
      coupons: {},
      tempCoupon: {
        title: '',
        enabled: false,
        percent: 100,
        deadline_at: 0,
        code: '',
      },
      due_date: '',
      due_time: '',
      status: '',
      isLoading: false,
    };
  },
  created() {
    this.getCoupons();
  },
  methods: {
    openCouponModal(status, item) {
      this.status = status;
      switch (status) {
        // 新增
        case 'created':
          this.tempCoupon = {};
          $('#couponModal').modal('show');
          break;

        // 編輯
        // 由於 const 與 let 宣告環境較特別，故需要在 case 外層宣告一個 {} 確保作用域
        case 'edit': {
          this.tempCoupon = { ...item };
          // 使用 split 切割相關時間戳
          const dedlineAt = this.tempCoupon.deadline.datetime.split(' ');
          [this.due_date, this.due_time] = dedlineAt; // 日期
          $('#couponModal').modal('show');
          break;
        }

        // 刪除
        case 'delete':
          this.tempCoupon = { ...item };
          $('#delCouponModal').modal('show');
          break;
        default:
          break;
      }
    },
    getCoupons() {
      this.isLoading = true;
      // 後台取得所有優惠券列表 GET api/{uuid}/admin/ec/coupons
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupons`;
      this.$http.get(url)
        .then((res) => {
          this.coupons = res.data.data;
          this.isLoading = false;
        });
    },
    updateCoupon() {
      this.isLoading = true;
      // 後台新增優惠券 POST api/{uuid}/admin/ec/coupon
      let api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon`;
      let httpMethod = '';
      let status = '優惠券新增成功!';
      if (this.status === 'created') {
        httpMethod = 'post';
      } else {
        // 後台更新指定優惠券內容 PATCH api/{uuid}/admin/ec/coupon/{id}
        api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
        status = '優惠券更新成功!';
        httpMethod = 'patch';
      }
      // 針對日期做組合重新寫入到物件中
      // 日期格式 Y-m-d H:i:s，例如：「2020-06-16 09:31:18」
      this.tempCoupon.deadline_at = `${this.due_date} ${this.due_time}`;
      this.$http[httpMethod](api, this.tempCoupon)
        .then(() => {
          $('#couponModal').modal('hide');
          // 傳送資料至 Toast.vue 元件
          this.$bus.$emit('message:push',
            status,
            'success');
          this.getCoupons();
        }).catch(() => {
          this.$bus.$emit('message:push',
            '出現錯誤!',
            'danger');
          this.isLoading = false;
        });
    },
    delCoupon() {
      this.isLoading = true;
      // 後台刪除指定的優惠券 DELETE api/{uuid}/admin/ec/coupon/{id}
      const api = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/coupon/${this.tempCoupon.id}`;
      this.$http.delete(api)
        .then(() => {
          $('#delCouponModal').modal('hide');
          this.$bus.$emit('message:push',
            '優惠券刪除成功!',
            'success');
          this.getCoupons();
          this.isLoading = false;
        }).catch(() => {
          this.$bus.$emit('message:push',
            '出現錯誤!',
            'danger');
          this.isLoading = false;
        });
    },
  },
};
</script>
