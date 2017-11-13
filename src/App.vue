<template>
  <div class="row">
    
    <div class="col-md-3">
      <Sidebar v-bind:user="user" v-bind:pages="pages"></Sidebar>
    </div>

    <div class="col-md-9">
      <div class="card">
        <div class="card-header">
          Carros
        </div>
        <li class="list-group list-group-flush">
          <Carro v-for="car in cars"  
                  v-bind:brand="car.brand" 
                  v-bind:model="car.model" 
                  v-bind:key="car.model"></Carro>
        </li>
      </div>
    </div>

  </div>
</template>

<script>
import Carro from './components/Carro';
import Sidebar from './components/Sidebar';

export default {
  name: 'app',
  components: {
    Carro,
    Sidebar,
  },
  data() {
    return {
      cars: [],
      user: {
        login: 'JDLK7',
      },
      pages: [
        { title: 'Carros', url: '#carros', isActive: true },
        { title: 'Cities', url: '#cities', isActive: false },
      ],
    };
  },
  beforeCreate() {
    fetch('https://hidden-earth-27442.herokuapp.com/api/cars')
    .then(response => response.json())
    .then((json) => {
      this.cars = json;
    });
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
</style>
