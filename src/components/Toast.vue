<template>
  <div style="position: fixed; top: 20px; right: 20px; min-width: 300px; z-index: 11000;">
    <div v-for="(item, i) in messages"
      :key="i"
      :id="`toast-${i}`"
      class="toast fade show"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-autohide="false"
      >
      <div class="toast-header">
        <div
          class="inline-block rounded mr-2"
          style="width: 20px; height: 20px"
          :class="`bg-${ item.status }`">
        </div>
        <strong class="mr-auto logo-ff">迴圈 ∞ 選框</strong>
        <small>現在</small>
        <button
          type="button"
          class="ml-2 mb-1 close"
          data-dismiss="toast"
          aria-label="Close"
          @click="closeToast(`toast-${ i }`)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{ item.message }}
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */
export default {
  name: 'Toast',
  data() {
    return {
      messages: [],
    };
  },
  created() {
    const vm = this;
    // eventBus 接收外部回傳的訊息
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status);
    });
  },
  methods: {
    updateMessage(message, status) {
      // 取的時間戳記
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        message, // 訊息
        status, // 顏色
        timestamp, // id
      });
      this.removeMessageWithTiming(timestamp);
    },
    // 手動關閉
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    // 讓訊息顯示後5秒自動消失
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
    closeToast(element) {
      $(`#${element}`).toast('hide');
    },
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
