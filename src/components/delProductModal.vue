<template>
    <div class="delProductModal">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 id="ProductDelModal" class="modal-title">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-danger" @click="deleteProduct">
              <span class="spinner-border spinner-border-sm"
                   role="status" aria-hidden="true" v-if="loadingBtn === tempProduct.id"></span>
              確認刪除
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'delProductModal',
  props: ['tempProduct'],
  data() {
    return {
      loadingBtn: '',
    };
  },
  methods: {
    deleteProduct() {
      this.loadingBtn = this.tempProduct.id;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`;
      // 使用 delete 刪除資料
      this.$http.delete(url, this.tempProduct)
        .then(() => {
          this.loadingBtn = '';
          this.$bus.$emit('message:push',
            '產品刪除成功!',
            'success');
          // 觸發外部事件
          this.$emit('update-delete');
        }).catch((err) => {
          this.loadingBtn = '';
          this.$bus.$emit('message:push',
            '出現錯誤!',
            'danger');
          console.log(err.response);
        });
    },
  },
};
</script>
