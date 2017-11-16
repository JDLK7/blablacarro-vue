<template>
  <div class="card">
    <div class="card-header">
      {{ title }}
    </div>
    <li class="list-group list-group-flush">
      <city v-for="city in cities"  
        v-bind:name="city.name" 
        v-bind:state="city.state" 
        v-bind:key="city.name"></city>
    </li>
  </div>
</template>

<script>
import City from '../components/City';

export default {
  components: {
    city: City,
  },
  data() {
    return {
      title: 'Listado de ciudades',
    };
  },
  computed: {
    cities() {
      return this.$store.state.cities;
    },
  },
  beforeMount() {
    this.$store.dispatch('fetchCities');
  },
};
</script>