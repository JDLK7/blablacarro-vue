<template>
  <div>
    <header class="navbar navbar-dark bg-primary">
      <a class="navbar-brand">
        <img class="primary" src="static/img/blablacarro1.svg"><img class="secondary" src="static/img/blablacarro2.svg"> 
        <span class="brand-name">Blablacarro</span>
      </a>
    </header>

    <div class="container" style="margin-top: 5em; margin-bottom: 5em;">
      <div class="row">
        <div class="col-md-3">
          <sidebar v-bind:user="user" v-bind:pages="pages"></sidebar>
        </div>

        <div class="col-md-9">
          <transition name="slide-fade">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar';

export default {
  name: 'app',
  components: {
    sidebar: Sidebar,
  },
  data() {
    return {
      pages: [
        { title: 'Carros', url: '/carros' },
        { title: 'Ciudades', url: '/cities' },
        { title: 'Viajes', url: '/journeys' },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.loggedUser;
    },
  },
  beforeMount() {
    this.$store.dispatch('fetchCities');
  },
};
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .navbar-brand > .primary {
    height: 32px;
  }

  .navbar-brand > .secondary {
    height: 16px;
    margin-bottom: 10%;
  }

  .navbar-brand > .brand-name {
    font-family: Arial;
    font-size: 1.1em;
  }

  .btn-circle {
    width: 50px;
    height: 50px;
    padding: 10px 16px;
    font-size: 20px;
    line-height: 1.33;
    border-radius: 25px;
  }

  .btn-circle.btn-sm {
    transform: scale(0.8);
  }

  .btn-circle.btn-danger,
  .btn-circle.btn-primary {
    color: #fff;
    font-weight: bold;
  }

  .material-box-shadow {
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  }

  .alert {
    margin-left: 1rem;
    margin-right: 1rem;
  }

  /* Enter and leave animations can use different */
  /* durations and timing functions.              */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    display: none;
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(20px);
    opacity: 0;
  }
</style>
