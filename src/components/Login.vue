<template>
  <div class="btn-group">
    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      Iniciar sesión
    </button>
    <div class="dropdown-menu">
      <div class="px-4 py-3">
        <div class="form-group">
          <label for="input-username">Nombre de usuario</label>
          <input type="text" class="form-control form-control-sm" name="input-username" placeholder="Usuario">
        </div>
        <div class="form-group">
          <label for="input-password">Contraseña</label>
          <input type="password" class="form-control form-control-sm" name="input-password" placeholder="Contraseña">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </div>
      <div class="dropdown-divider"></div>
      <a class="dropdown-item" href="#">Registro</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
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

