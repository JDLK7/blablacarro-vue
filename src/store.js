import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

function saveSession(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
}

function getSessionToken() {
  return localStorage.getItem('token');
}

function getSessionUser() {
  return JSON.parse(localStorage.getItem('user'));
}

function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

export default new Vuex.Store({
  getters: {

  },
  state: {
    loggedUser: getSessionUser(),
    token: getSessionToken(),
    loginResult: null,
    registerResult: null,
    registerResultMessage: '',
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
    updateToken(state, token) {
      this.state.token = token;
    },
    updateLoggedUser(state, loggedUser) {
      this.state.loggedUser = loggedUser;
    },
    updateLoginResult(state, loginResult) {
      this.state.loginResult = loginResult;
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
    registerUser(context, registerData) {
      Vue.http.post('api/users', registerData)
      .then((response) => {
        context.commit('updateRegisterResult', true);
        context.commit('updateRegisterResultMessage', response.body.message);
      },
      (errorResponse) => {
        context.commit('updateRegisterResult', false);
        context.commit('updateRegisterResultMessage', errorResponse.bodyText);
      });
    },
    loginUser(context, loginData) {
      Vue.http.post('api/login', loginData)
      .then((response) => {
        context.commit('updateLoginResult', true);
        context.commit('updateToken', response.body.jwt);
        context.commit('updateLoggedUser', response.body.user.user);

        saveSession(response.body.jwt, response.body.user.user);
      },
      () => {
        context.commit('updateLoginResult', false);
      });
    },
    logoutUser(context) {
      context.commit('updateToken', '');
      context.commit('updateLoggedUser', null);

      clearSession();
    },
  },
});
