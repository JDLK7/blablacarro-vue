<template>
  <div>
    <header class="navbar navbar-dark bg-primary">
      <a class="navbar-brand">
        <img class="primary" src="static/img/blablacarro1.svg"><img class="secondary" src="static/img/blablacarro2.svg"> 
        <span class="brand-name">Blablacarro</span>
      </a>
      <form class="form-inline">
        <input v-on:keydown="search" id="search-input"
          class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      </form>
    </header>

    <div class="container" style="margin-top: 5em;">
      <div class="row">
        <div class="col-md-3">
          <Sidebar v-bind:user="user" v-bind:pages="pages"></Sidebar>
        </div>

        <div class="col-md-9">
          <List v-bind:currentPage="currentPage" v-bind:data="data"></List>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from './components/List';
import Sidebar from './components/Sidebar';

export default {
  name: 'app',
  components: {
    List,
    Sidebar,
  },
  data() {
    return {
      currentPage: 'Carros',
      data: [],
      user: {
        login: 'JDLK7',
      },
      pages: [
        {
          title: 'Carros',
          url: '#carros',
          isActive: true,
        },
        {
          title: 'Cities',
          url: '#cities',
          isActive: false,
        },
      ],
    };
  },
  methods: {
    search() {
      const searchText = document.getElementById('search-input').value;
      const models = this.cars.map(car => car.model);
      const brands = this.cars.map(car => car.brand);

      for (let i = 0; i < this.cars.length; i += 1) {
        if (!models[i].includes(searchText) && !brands[i].includes(searchText)) {
          this.cars.splice(i, 1);
        }
      }
    },
    fetchCars() {
      fetch('https://hidden-earth-27442.herokuapp.com/api/cars')
      .then(response => response.json())
      .then((json) => {
        this.data = json;
      });
    },
    fetchCities() {
      fetch('https://hidden-earth-27442.herokuapp.com/api/cities')
      .then(response => response.json())
      .then((json) => {
        this.data = json;
      });
    },
    changeCurrentPage(event) {
      console.log(event);
    },
  },
  beforeMount() {
    switch (this.currentPage) {
      case 'Carros': this.fetchCars();
        break;
      case 'Cities': this.fetchCities();
        break;
      default: break;
    }
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
</style>
