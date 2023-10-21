<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BottomControls from './components/BottomControls.vue';
import Banner from './components/Banner.vue';
</script>

<template>
  <div class="container">
    <Banner/>
    <BottomControls/>
    <RouterView />
  </div>
</template>

<style scoped>
body {
  font-family: 'Roboto';
}
</style>
