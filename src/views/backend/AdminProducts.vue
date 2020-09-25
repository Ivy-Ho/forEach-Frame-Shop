<template>
  <div class="products container">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mt-3 text-center">後台產品管理列表</h2>
    <div>
      <div class="text-right">
        <button class="btn btn-primary" @click="openModal('new')">
            建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">
                分類
            </th>
            <th>產品名稱</th>
            <th width="120">
                原價
            </th>
            <th width="120">
                售價
            </th>
            <th width="100">
                是否上架
            </th>
            <th width="150">
                編輯
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">
                {{ item.origin_price | thousands }}
            </td>
            <td class="text-right">
                {{ item.price | thousands }}
            </td>
            <td>
                <span v-if="item.enabled" class="text-success">已上架</span>
                <span  v-else>未上架</span>
            </td>
            <td>
              <div class="btn-group">
                <button class="btn btn-outline-primary btn-sm"
                 :disabled="loadingBtn === item.id" @click="openModal('edit', item)">
                  <span class="spinner-border spinner-border-sm"
                   role="status" aria-hidden="true" v-if="loadingBtn === item.id"></span>
                    編輯
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="openModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @update="getProducts"></Pagination>
      <!-- 新增、編輯 Modal -->
      <div id="productModal" class="modal fade" tabindex="-1"
       role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <Productmodal :temp-product="tempProduct" @update="closeModal"></Productmodal>
      </div>
      <!-- 刪除 Modal -->
      <div id="delProductModal" class="modal fade" tabindex="-1"
       role="dialog" aria-labelledby="exampleModalLabel"
          aria-hidden="true">
          <Deletemodal :temp-product="tempProduct"
           @update-delete="closeDeleteModal"></Deletemodal>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Productmodal from '@/components/Productmodal.vue';
import Deletemodal from '@/components/delProductModal.vue';

/* global $ */
export default {
  name: 'AdminProducts',
  components: {
    Productmodal,
    Deletemodal,
    Pagination,
  },
  props: [' token '],
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imageUrl: [],
      },
      token: '',
      isNew: '',
      loadingBtn: '',
      isLoading: false,
      fullPage: true,
    };
  },
  methods: {
    openModal(isNew, item) {
      switch (isNew) {
        // 新增
        case 'new':
          this.tempProduct = { imageUrl: [] };
          $('#productModal').modal('show');
          break;
          // 編輯
        case 'edit': {
          this.loadingBtn = item.id;
          // 取得單一商品細節 GET api/{uuid}/admin/ec/product/{id}
          const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`;
          // 取得遠端單筆資料
          this.$http.get(url)
            .then((res) => {
              this.tempProduct = res.data.data;
              $('#productModal').modal('show');
              this.loadingBtn = ''; // 清除
            });
          break;
        }
        // 刪除
        case 'delete':
          $('#delProductModal').modal('show');
          this.tempProduct = { ...item };
          break;
        default:
          break;
      }
    },
    getProducts(num = 1) {
      this.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/ec/products?page= ${num}`;
      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.data;
          this.pagination = res.data.meta.pagination;
        }).catch(() => {
          this.isLoading = false;
        });
    },
    closeModal() {
      this.getProducts();
      $('#productModal').modal('hide');
    },
    closeDeleteModal() {
      this.getProducts();
      $('#delProductModal').modal('hide');
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
