<template>
  <li class="list-group-item">

    <div class="journey">
      <div class="city">
        <img src="static/img/marker.svg">
        <span class="text-center">{{ departureCityName }}<br>({{ departureCityState }})</span>
      </div>

      <div class="city">
        <img src="static/img/finish.svg">
        <span class="text-center">{{ destinationCityName }}<br>({{ destinationCityState }})</span>
      </div>

      <h2 class="journey-price">
        <strong>{{ journey.price }}</strong> €
      </h2>
      
      <button v-on:click="toggleDetailMode" type="button" class="btn btn-primary material-box-shadow">Details</button>
    </div>
    
    <transition name="slide-fade">
      <div v-if="detailMode" class="journey-occupants">
        <span><strong>Occupants: </strong>
          <router-link v-for="occupant in occupants" 
            v-bind:to="`users/${occupant._id}`" 
            v-bind:key="occupant._id">
            {{ occupant.login }}&nbsp;
          </router-link>
        </span>

        <span>
          <strong class="text-danger">Delete journey</strong>&nbsp;
          <button v-on:click="deleteJourney" type="button" class="btn btn-sm btn-circle btn-danger material-box-shadow">&times;</button>
        </span>
      </div>
    </transition>

  </li>
</template>

<script>
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  export default {
    props: ['journey'],
    data() {
      return {
        detailMode: false,
      };
    },
    computed: {
      departureCity() {
        const city = this.$store.state.cities.filter(c => c._id === this.journey.departureCity);
        return city[0];
      },
      departureCityName() {
        return this.departureCity.name;
      },
      departureCityState() {
        return this.departureCity.state;
      },
      destinationCity() {
        const city = this.$store.state.cities.filter(c => c._id === this.journey.destinationCity);
        return city[0];
      },
      destinationCityName() {
        return this.destinationCity.name;
      },
      destinationCityState() {
        return this.destinationCity.state;
      },
      occupants() {
        return this.$store.state.users.filter(user => this.journey.occupants.includes(user._id));
      },
    },
    methods: {
      toggleDetailMode() {
        if (!this.detailMode) {
          this.getJourneyUsers();
        }
        this.detailMode = !this.detailMode;
      },
      getJourneyUsers() {
        this.$store.dispatch('fetchJourneyUsers', this.journey);
      },
      deleteJourney() {
        this.$store.dispatch('deleteJourney', this.journey);
      },
    },
  };
</script>

<style scoped>
  .journey {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .journey-occupants {
    margin-top: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .journey img {
    max-height: 30px;
  }

  .city {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
</style>

