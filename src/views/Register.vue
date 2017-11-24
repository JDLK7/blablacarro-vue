<template>
  <div class="card" v-bind:class="{ 'border-danger': success === false  }">
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
    <div v-if="success !== null" 
    v-bind:class="{ 'alert-danger': !success, 'alert-success': success  }"  
    class="alert alert-dismissible fade show" role="alert">
      {{ registerMessage }}
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
    };
  },
  computed: {
    success() {
      return this.$store.state.registerResult;
    },
    registerMessage() {
      return this.$store.state.registerResultMessage;
    },
  },
  methods: {
    registerUser() {
      this.$store.dispatch('registerUser', {
        login: this.login,
        password: this.password,
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
