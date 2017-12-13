// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App';
import Carros from './views/Carros';
import Cities from './views/Cities';
import Home from './views/Home';
import Register from './views/Register';
import Journeys from './views/Journeys';

import store from './store';

Vue.use(VueRouter);
Vue.use(VueResource);

Vue.config.productionTip = false;
Vue.http.options.root = 'https://hidden-earth-27442.herokuapp.com';

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/register',
      component: Register,
    },
    {
      path: '/carros',
      component: Carros,
    },
    {
      path: '/cities',
      component: Cities,
    },
    {
      path: '/journeys',
      component: Journeys,
      beforeEnter(to, from, next) {
        if (!store.state.token) {
          next(false);
        } else {
          next();
        }
      },
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
