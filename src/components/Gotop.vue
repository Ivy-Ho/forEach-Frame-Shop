<template>
    <div
     @click.prevent="top()"
     id="myBtn"
     class="gotop text-primary"
     :class="{ 'show': show }"
     title="Go to top">
      <i class="fas fa-chevron-circle-up"></i>
      <p>Top</p>
    </div>
</template>

<script>
/* global $ */
export default {
  name: 'Gotop',
  data() {
    return {
      show: false,
    };
  },
  created() {
    window.addEventListener('scroll', this.showGotop);
  },
  methods: {
    showGotop() {
      if (window.pageYOffset > 400) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    top() {
      $('html,body').animate({ scrollTop: 0 }, 'slow');
      return false;
    },
  },
};
</script>

<style scoped>
  .gotop {
    position: fixed;
    z-index: 90;
    right: 10px;
    bottom: 10px;
    font-size: 30px;
    line-height: 1;
    transition: all 0.5s;
    text-align: center;
    cursor: pointer;
    opacity: 0;
  }
  .show {
    opacity: 1;
  }
</style>
