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
    createJourneyResult: null,
    createJourneyMessage: '',
    cars: [],
    cities: [],
    users: [],
    journeys: [],
  },
  mutations: {
    updateCarsData(state, cars) {
      this.state.cars = cars;
    },
    updateCitiesData(state, cities) {
      this.state.cities = cities;
    },
    updateJourneysData(state, journeys) {
      this.state.journeys = journeys;
    },
    updateUsersData(state, users) {
      this.state.users = users;
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
    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    addUser(state, user) {
      if (this.state.users.findIndex(u => u._id === user._id) === -1) {
        this.state.users.push(user);
      }
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
    fetchJourneys(context, onlyUserJourneys = false) {
      if (onlyUserJourneys) {
        Vue.http.get(`api/users/${this.state.loggedUser._id}/journeys`, {
          headers: {
            Authorization: `Bearer ${context.state.token}`,
          },
        })
        .then((response) => {
          context.commit('updateJourneysData', response.body);
        });
      } else {
        Vue.http.get('api/journeys', {
          headers: {
            Authorization: `Bearer ${context.state.token}`,
          },
        })
        .then((response) => {
          context.commit('updateJourneysData', response.body);
        });
      }
    },
    fetchUsers(context) {
      Vue.http.get('api/users')
      .then((response) => {
        context.commit('updateUsersData', response.body);
      });
    },
    fetchJourneyUsers(context, journey) {
      journey.occupants.forEach((occupant) => {
        Vue.http.get(`api/users/${occupant}`, {
          headers: {
            Authorization: `Bearer ${context.state.token}`,
          },
        })
        .then((response) => {
          context.commit('addUser', response.body);
        });
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
    createJourney(context, data) {
      Vue.http.post('api/journeys', data, {
        headers: {
          Authorization: `Bearer ${context.state.token}`,
        },
      })
      .then((response) => {
        this.state.createJourneyResult = true;
        this.state.createJourneyMessage = response.body.message;

        context.dispatch('fetchJourneys');
      },
      (errorResponse) => {
        this.state.createJourneyResult = false;
        this.state.createJourneyMessage = errorResponse.body.message;
      });
    },
    deleteJourney(context, journey) {
      Vue.http.delete(`api/journeys/${journey._id}`, {
        headers: {
          Authorization: `Bearer ${context.state.token}`,
        },
      })
      .then(() => {
        const journeyIndex = this.state.journeys.indexOf(journey);
        this.state.journeys.splice(journeyIndex, 1);
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
      context.commit('updateToken', null);
      context.commit('updateLoggedUser', null);

      clearSession();
    },
  },
});
