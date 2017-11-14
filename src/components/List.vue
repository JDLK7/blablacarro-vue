<template>
  <div class="card">
    <div class="card-header">
      {{ currentPage }}
    </div>
    <li class="list-group list-group-flush">
      <template v-if="currentPage === 'Carros'">
        <Carro v-for="car in data"  
                v-bind:brand="car.brand" 
                v-bind:model="car.model" 
                v-bind:key="car.model"></Carro>
      </template>
    </li>
  </div>
</template>

<script>
import Carro from './Carro';

export default {
  components: {
    Carro,
  },
  props: ['currentPage', 'data'],
};
</script>

