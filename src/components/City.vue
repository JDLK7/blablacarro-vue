<template>
  <li class="list-group-item">
    <a href="javascript:void(0)" v-on:click="zoom">
      <img class="pull-left" v-bind:src="image">
    </a>

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

  .zoomed {
    position: absolute;
      left: 50%;
      top: 120%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    border-radius: 50%;
    width: 500px;
    height: 500px;
    z-index: 1030;
    background-color: #fff;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  }

  .zoomed > img {
    max-width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0
  }
</style>

