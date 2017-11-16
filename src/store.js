import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cars: {},
    cities: {},
    users: {},
    journeys: {},
  },
  mutations: {
    updateCarsData(state, cars) {
      this.state.cars = cars;
    },
    updateCitiesData(state, cities) {
      this.state.cities = cities;
    },
  },
  actions: {
    fetchCars(context) {
      fetch('https://hidden-earth-27442.herokuapp.com/api/cars')
      .then(response => response.json())
      .then((cars) => {
        context.commit('updateCarsData', cars);
      });
    },
    fetchCities(context) {
      fetch('https://hidden-earth-27442.herokuapp.com/api/cities')
      .then(response => response.json())
      .then((cities) => {
        context.commit('updateCitiesData', cities);
      });
    },
  },
});