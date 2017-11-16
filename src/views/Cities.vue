<template>
  <div class="card">
    <div class="card-header">
      Cities
    </div>
    <li class="list-group list-group-flush">
      <City v-for="city in cities"  
        v-bind:name="city.name" 
        v-bind:state="city.state" 
        v-bind:key="city.name"></City>
    </li>
  </div>
</template>

<script>
import City from '../components/City';

export default {
  components: {
    City,
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