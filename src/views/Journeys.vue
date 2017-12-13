<template>
  <div v-if="!newJourney" class="card">
    
    <div class="card-header">
      {{ title }}
      <div class="form-check">
        <label class="form-check-label">
          <input v-model="onlyUserJourneys" type="checkbox" class="form-check-input">
          Show user journeys only
        </label>
      </div>
    </div>

    <div class="card-body">

      <div v-if="success !== null" 
      v-bind:class="{ 'alert-danger': !success, 'alert-success': success  }"  
      class="alert alert-dismissible fade show" role="alert">
        {{ journeyMessage }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

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

    <div class="card-footer">
      <button class="btn btn-circle btn-primary material-box-shadow" v-on:click="newJourney = !newJourney">&#43;</button>
    </div>

  </div>

  <div v-else class="card">

    <div class="card-header">
      New journey
    </div>

    <div class="card-body journey-form">
      <div class="form-group">
        <label for="cities">Cities</label>
        <select v-model="selectedCities"
        multiple class="form-control" name="cities">
          <option v-for="city in cities" v-bind:key="city._id" v-bind:value="city._id">{{ city.name }} ({{ city.state }})</option>
        </select>
      </div>
      <div class="form-group">
        <label for="occupants">Journey occupants</label>
        <select v-model="selectedOccupants"
        multiple class="form-control" name="occupants">
          <option v-for="user in users" v-bind:key="user.login" v-bind:value="user._id">{{ user.login }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="price">Price (€)</label>
        <input class="form-control" type="number" name="price" v-model="price" min="0" step="0.5"></input>
      </div>
    </div>

    <div class="card-footer">
      <button v-on:click="newJourney = false" class="btn btn-default material-box-shadow">Cancel</button>
      <button v-on:click="createJourney" class="btn btn-success material-box-shadow">Create</button>
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
        newJourney: false,
        onlyUserJourneys: false,
        selectedCities: [],
        selectedOccupants: [],
        price: 0,
      };
    },
    computed: {
      journeys() {
        return this.$store.state.journeys;
      },
      users() {
        return this.$store.state.users;
      },
      cities() {
        return this.$store.state.cities;
      },
      driver() {
        return this.$store.state.loggedUser;
      },
      success() {
        return this.$store.state.createJourneyResult;
      },
      journeyMessage() {
        return this.$store.state.createJourneyMessage;
      },
    },
    watch: {
      newJourney(val) {
        if (val === true) {
          if (this.cities.length === 0) {
            this.$store.dispatch('fetchCities');
          }
          if (this.users.length === 0) {
            this.$store.dispatch('fetchUsers');
          }
        }
      },
      onlyUserJourneys(onlyUsers) {
        this.$store.dispatch('fetchJourneys', onlyUsers);
      },
    },
    methods: {
      closeJourneyForm() {
        this.selectedCities = [];
        this.selectedOccupants = [];
        this.price = 0;
        this.newJourney = false;
      },
      /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
      createJourney() {
        this.$store.dispatch('createJourney', {
          cities: this.selectedCities,
          driver: this.driver._id,
          occupants: this.selectedOccupants,
          price: this.price,
        });
        this.closeJourneyForm();
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

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .card-header > .form-check {
    margin-bottom: 0;
  }

  .card-footer {
    background-color: transparent;
    border: 0;
    display: flex;
    justify-content: flex-end;
  }

  .card-footer > button:not(:last-child) {
    margin-right: 1em;
  }
</style>

