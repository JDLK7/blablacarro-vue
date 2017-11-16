// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';
import Carros from './views/Carros';
import Cities from './views/Cities';

import store from './store';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/carros',
      component: Carros,
    },
    {
      path: '/cities',
      component: Cities,
    },
  ],
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
