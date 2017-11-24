import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedUser: null,
    registerResult: null,
    registerResultMessage: '',
    cars: {},
    cities: {},
    users: {},
    journeys: {},
    token: '',
  },
  mutations: {
    updateCarsData(state, cars) {
      this.state.cars = cars;
    },
    updateCitiesData(state, cities) {
      this.state.cities = cities;
    },
    updateToken(state, token) {
      this.state.token = token;
    },
    updateLoggedUser(state, loggedUser) {
      this.state.loggedUser = loggedUser;
    },
    updateRegisterResult(state, registerResult) {
      this.state.registerResult = registerResult;
    },
    updateRegisterResultMessage(state, registerResultMessage) {
      this.state.registerResultMessage = registerResultMessage;
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
    registerUser(context, loginData) {
      Vue.http.post('api/users', loginData)
      .then((response) => {
        context.commit('updateRegisterResult', true);
        context.commit('updateRegisterResultMessage', response.body.message);
      },
      (errorResponse) => {
        context.commit('updateRegisterResult', false);
        context.commit('updateRegisterResultMessage', errorResponse.bodyText);
      });
    },
    setToken(context, token) {
      context.commit('updateToken', token);
    },
    setLoggedUser(context, loggedUser) {
      context.commit('updateLoggedUser', loggedUser);
    },
  },
});
