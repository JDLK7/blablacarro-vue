<template>
  <div class="card">
    <img class="card-img-top" v-bind:src="userImage" alt="Card image cap">
    <div class="card-body">
      <h4 class="card-title">{{ user.login }}</h4>
      <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <a v-for="page in pages" 
          v-bind:href="page.url" 
          v-bind:key="page.title" 
          v-bind:class="{ active: page.isActive }"
            class="nav-link" data-toggle="pill" role="tab" aria-selected="false">
          {{ page.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['user', 'pages'],
  computed: {
    userImage() {
      console.log(this.user);
      return 'static/img/user.jpeg';
    },
  },
};
</script>

