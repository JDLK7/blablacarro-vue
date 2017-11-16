<template>
  <div class="card">
    <div class="card-header">
      {{ title }}
    </div>
    <li class="list-group list-group-flush">
      <carro v-for="car in cars"  
        v-bind:brand="car.brand" 
        v-bind:model="car.model" 
        v-bind:key="car.model"></carro>
    </li>
  </div>
</template>

<script>
import Carro from '../components/Carro';

export default {
  components: {
    carro: Carro,
  },
  data() {
    return {
      title: 'Listado de carros',
    };
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