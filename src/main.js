import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import thousandsFilter from '@/assets/js/thousands';
import axios from 'axios';
import $ from 'jquery';
import VueAxios from 'vue-axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

import {
  ValidationObserver, ValidationProvider, extend, localize, configure,
} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import TW from 'vee-validate/dist/locale/zh_TW.json';

import 'bootstrap';
import './bus';
import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;

// vue-loading-overlay
Vue.component('Loading', Loading);

// 數字加上千分號
Vue.filter('thousands', thousandsFilter);

//  將 vue-axios 套件加到原型那一層
Vue.use(VueAxios, axios);

// jQuery
window.$ = $;

// 安裝所有 vee-alidate 規則
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize('zh_TW', TW);

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'],
  },
});

// AOS
AOS.init();

// swiper
Vue.use(VueAwesomeSwiper);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
