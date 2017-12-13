<template>
  <div class="card">
    <div class="card-header">
      {{ title }}
    </div>
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li v-if="journeys == false" class="list-group-item">
          <h4>No existen viajes</h4>
        </li>
        <template v-else>
          <journey-item v-for="journey in journeys" v-bind:key="journey._id" v-bind:journey="journey">
          </journey-item>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
  import JourneyItem from '../components/JourneyItem';

  export default {
    components: {
      'journey-item': JourneyItem,
    },
    data() {
      return {
        title: 'Viajes publicados',
      };
    },
    computed: {
      journeys() {
        return this.$store.state.journeys;
      },
    },
    beforeMount() {
      this.$store.dispatch('fetchJourneys');
    },
  };
</script>

<style scoped>
  .card {
    height: 100%;
  }
</style>

