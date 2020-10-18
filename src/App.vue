<template>
  <div id="app">
    <Toast></Toast>
    <router-view/>
  </div>
</template>

<script>
import Toast from '@/components/Toast.vue';

export default {
  components: {
    Toast,
  },
};
</script>

<style lang="scss">
@import './assets/scss/all';
@import url(https://fonts.googleapis.com/earlyaccess/notosanstc.css);
@import url(https://fonts.googleapis.com/earlyaccess/cwtexyen.css);
@import url(https://fonts.googleapis.com/css2?family=Baloo+Tamma+2&display=swap);

#app {
  font-family: 'Noto Sans TC',Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
