<template>
  <li class="list-group-item">
    <span class="heading">{{ name }}</span>
    <span>{{ state }}</span>
  </li>
</template>

<script>
export default {
  name: 'City',
  props: ['name', 'state'],
};
</script>

<style scoped>
  .heading {
    font-weight: bold;
  }

  .list-group-item {
    text-align: left;
  }
</style>

