<template>
  <div class="card">
    <img v-if="loggedIn" class="card-img-top" v-bind:src="userImage" alt="Card image cap">
    <div class="card-body">
      <h4 v-if="loggedIn" class="card-title">{{ user.login }}</h4>
      <template v-else>
        <login></login>
      </template>
      <hr>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <router-link v-bind:to="page.url" v-for="page in pages" v-bind:key="page.title"
            class="nav-link" data-toggle="pill" role="tab" aria-selected="false">
          {{ page.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login';

export default {
  name: 'Sidebar',
  props: ['user', 'pages'],
  components: {
    login: Login,
  },
  computed: {
    userImage() {
      return 'static/img/user.jpeg';
    },
    loggedIn() {
      return typeof (this.user) !== 'undefined' && this.user !== null;
    },
  },
};
</script>

