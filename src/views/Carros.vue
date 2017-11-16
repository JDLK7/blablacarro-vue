<template>
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
</template>

<script>
import Carro from '../components/Carro';

export default {
  components: {
    Carro,
  },
  computed: {
    cars() {
      return this.$store.state.cars;
    },
  },
  beforeMount() {
    this.$store.dispatch('fetchCars');
  },
};
</script>