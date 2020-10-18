<template>
  <div class="images">
    <loading :active.sync="isLoading"></loading>
    <h2 class="mt-3 text-center">後台圖片管理列表</h2>
    <div class="container">
      <div class="text-right">
        <label for="customFile"
        class="py-2 px-3 bg-primary text-white rounded" role="button">
            <i class="fas fa-cloud-upload-alt"></i> 上傳檔案
        </label>
        <input id="customFile" type="file" class="form-control d-none" @change="uploadFile">
      </div>
      <!-- card list start -->
      <ul v-if="imgs.length" class="list-unstyled row mt-3">
        <li v-for="(item, key) in imgs"
              :key="key"
              class="col-6 h-100">
          <div class="card mb-3" style="max-width: 540px;">
            <div class="row no-gutters">
              <div class="col-md-4">
                <img :src="item.path"
                class="img-fluid card-img">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">Image file no.{{key+1}}</h5>
                  <div class="btn-group btn-grousp-md" role="group">
                    <button type="button" class="clipboardBtn btn btn-outline-primary"
                      :data-clipboard-text="tempPath" @click="copy(item)">複製圖片網址</button>
                    <button
                      type="button"
                      class="btn btn-outline-danger"
                      :disabled="loadingBtn === item.id"
                      @click.prevent="deleteFile(item)">
                      <span class="spinner-border spinner-border"
                        role="status" aria-hidden="true" v-if="loadingBtn === item.id"></span>
                      <span v-else>
                        刪除檔案
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <!-- card list end -->
      <Pagination :pages="pagination" @update="getFile"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Clipboard from 'clipboard';

export default {
  data() {
    return {
      filePath: '',
      imgs: {},
      tempPath: '',
      pagination: {},
      loadingBtn: '',
      isLoading: false,
      fullPage: true,
      copyBtn: null,
    };
  },
  components: {
    Pagination,
  },
  props: ['token'],
  methods: {
    getFile(num = 1) {
      this.isLoading = true;

      // 後台 取得所有檔案列表 GET api/{uuid}/admin/storage
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage?page=${num}`;

      this.$http.get(url)
        .then((res) => {
          this.isLoading = false;
          this.imgs = res.data.data;
          this.pagination = res.data.meta.pagination;
        });
    },
    uploadFile() {
      this.isLoading = true;
      // 選取 DOM 中的檔案資訊
      const uploadedfile = document.querySelector('#customFile').files[0];

      // 轉成 Form Data
      const formData = new FormData();
      formData.append('file', uploadedfile);

      // 後台 更新指定檔案 POST api/{uuid}/admin/storage
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage`;

      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        this.isLoading = false;
        this.getFile();
      }).catch(() => {
        this.isLoading = false;
      });
    },
    deleteFile(item) {
      this.loadingBtn = item.id;

      // 後台 刪除指定檔案 DELETE api/{uuid}/admin/storage/{id}
      const url = `${process.env.VUE_APP_APIPATH}api/${process.env.VUE_APP_UUID}/admin/storage/${item.id}`;

      this.$http.delete(url)
        .then(() => {
          this.$bus.$emit('message:push',
            '刪除成功!',
            'success');
          this.getFile();
          this.loadingBtn = '';
        }).catch(() => {
          this.$bus.$emit('message:push',
            '出現錯誤!',
            'danger');
          this.loadingBtn = '';
        });
    },
    copy(item) {
      this.tempPath = item.path;
      const clipboard = new Clipboard('.clipboardBtn');
      clipboard.on('success', () => {
        this.$bus.$emit('message:push',
          '複製成功!',
          'success');
        // 釋放內存
        clipboard.destroy();
      });
      clipboard.on('error', () => {
        this.$bus.$emit('message:push',
          '該瀏覽器不支持自動複製!',
          'danger');
        // 釋放内存
        clipboard.destroy();
      });
    },
  },
  created() {
    this.getFile();
  },
};
</script>

<style>
input[type="file"] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
}
</style>
