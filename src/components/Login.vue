<template>
  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Iniciar sesión
    </button>
    <div class="dropdown-menu" v-bind:class="{ 'border-danger': hasErrors  }">
      <div class="px-4 py-3">
        <div class="form-group">
          <label for="input-username">Nombre de usuario</label>
          <input v-model="login" type="text" class="form-control form-control-sm" name="input-username" placeholder="Usuario">
        </div>
        <div class="form-group">
          <label for="input-password">Contraseña</label>
          <input v-model="password" type="password" class="form-control form-control-sm" name="input-password" placeholder="Contraseña">
        </div>
        <button v-on:click.stop.prevent="loginUser" type="button" class="btn btn-primary">Login</button>
      </div>
      <div class="dropdown-divider"></div>
      <router-link class="dropdown-item" to="/register">Registro</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      login: '',
      password: '',
      hasErrors: false,
    };
  },
  methods: {
    loginUser() {
      const body = {
        login: this.login,
        password: this.password,
      };
      this.$http.post('api/login', body)
      .then((response) => {
        this.hasErrors = false;
        this.login = '';
        this.password = '';

        this.$store.dispatch('setToken', response.body.jwt);
      },
      (errorResponse) => {
        this.hasErrors = true;
        console.log(errorResponse);
      });
    },
  },
};
</script>

<style scoped>
  button[type="submit"] {
    display: block;
    margin: 0 auto;
  }

  .dropdown-menu {
    width: 300px;
  }
</style>

