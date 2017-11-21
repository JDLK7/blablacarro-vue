<template>
  <div class="card" v-bind:class="{ 'border-danger': hasErrors  }">
    <div class="card-header">
      Registro de usuario
    </div>
    <div class="px-4 py-3">
      <div class="form-group">
        <label for="input-username">Nombre de usuario</label>
        <input v-model="login" type="text" class="form-control" aria-describedby="emailHelp" placeholder="Usuario">
      </div>
      <div class="form-group">
        <label for="input-password">Contraseña</label>
        <input v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <button v-on:click="registerUser" type="button" class="btn btn-primary">Registrar</button>
    </div>
    <div v-if="hasErrors" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ errorMessage }}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      hasErrors: false,
      errorMessage: '',
    };
  },
  methods: {
    registerUser() {
      const body = {
        login: this.login,
        password: this.password,
      };
      this.$http.post('api/users', body)
      .then(() => {
        this.hasErrors = false;
      },
      (errorResponse) => {
        this.hasErrors = true;
        if (!errorResponse.ok) {
          this.errorMessage = errorResponse.bodyText;
        }
      });
    },
  },
};
</script>

<style scoped>
  .alert {
    margin-left: 1rem;
    margin-right: 1rem;
  }
</style>
