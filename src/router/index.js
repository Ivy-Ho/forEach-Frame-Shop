import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/frontend/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('../views/frontend/About.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/frontend/Products.vue'),
      },
      { //  動態路由
        path: '/product/:id',
        name: 'Product',
        component: () => import('../views/frontend/Product.vue'),
      },
      {
        path: '/cart',
        name: 'Cart',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: '/checkout',
        name: 'Checkout',
        component: () => import('../views/frontend/Checkout.vue'),
      },
      {
        path: '/checkoutFinished',
        name: 'CheckoutFinished',
        component: () => import('../views/frontend/CheckoutFinished.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/backend/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'adminProducts',
        name: 'AdminProducts',
        component: () => import('../views/backend/AdminProducts.vue'),
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/backend/Orders.vue'),
      },
      {
        path: 'images',
        name: 'Images',
        component: () => import('../views/backend/Images.vue'),
      },
      {
        path: 'coupons',
        name: 'Coupons',
        component: () => import('../views/backend/Coupons.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/home',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
